import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Loader2, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetMyCustomerMessages, useSaveProblem } from "../hooks/useQueries";

export function CustomerCasePage() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const { mutate: saveProblem } = useSaveProblem();
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const [supportName, setSupportName] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [isSendingSupport, setIsSendingSupport] = useState(false);

  const { data: myMessages, isLoading: loadingMyMessages } =
    useGetMyCustomerMessages();

  const actorRef = useRef(actor);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  const isFetchingRef = useRef(isFetching);
  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  async function waitForActor() {
    for (let i = 0; i < 30; i++) {
      const currentActor = actorRef.current;
      const currentlyFetching = isFetchingRef.current;
      if (currentActor && !currentlyFetching) return currentActor;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return null;
  }

  async function handleSolve() {
    if (!problem.trim()) {
      toast.error("সমস্যাটি লিখুন / Please type your problem");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ স্থাপন হচ্ছে, একটু পরে আবার চেষ্টা করুন।");
      return;
    }
    setIsSolving(true);
    setSolution("");
    try {
      const sol = generateLocalSolution(problem);
      setSolution(sol);
      if (identity) {
        saveProblem(
          { type: ProblemType.journalEntry, jsonInput: problem, solution: sol },
          { onError: () => {} },
        );
      }
    } catch {
      const sol = generateLocalSolution(problem);
      setSolution(sol);
    } finally {
      setIsSolving(false);
    }
  }

  async function handleSendSupport() {
    if (!supportName.trim() || !supportMessage.trim()) {
      toast.error("নাম ও বার্তা দুটোই লিখুন / Please fill name and message");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ স্থাপন হচ্ছে, একটু পরে আবার চেষ্টা করুন।");
      return;
    }
    setIsSendingSupport(true);
    try {
      await readyActor.submitCustomerMessage(
        supportName.trim(),
        supportMessage.trim(),
      );
      toast.success("আপনার বার্তা পাঠানো হয়েছে / Message sent to support!");
      setSupportName("");
      setSupportMessage("");
    } catch {
      toast.error("বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSendingSupport(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {isFetching && (
        <div
          data-ocid="customercase.loading_state"
          className="mb-4 flex items-center gap-2 rounded-lg bg-navy/10 border border-navy/20 px-4 py-3 text-navy text-sm font-medium"
        >
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          সংযোগ স্থাপন হচ্ছে...
        </div>
      )}

      {/* Problem Solver Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Customer Case
          </h1>
          <p className="text-muted-foreground text-sm">
            যেকোনো হিসাবের সমস্যা লিখুন
          </p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-navy">
            আপনার সমস্যা লিখুন / Type Your Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            data-ocid="customercase.textarea"
            placeholder="যেমন: A, B এবং C অংশীদার। তাদের মূলধন যথাক্রমে ₹1,00,000, ₹80,000, ₹60,000। সুদের হার 6% প্রতি বছর। লাভের অনুপাত 3:2:1। সমাপনী মূলধন হিসাব তৈরি করুন।"
            className="min-h-36 resize-y font-body text-sm"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <Button
            data-ocid="customercase.submit_button"
            onClick={handleSolve}
            disabled={isSolving || !problem.trim()}
            className="w-full bg-navy text-white hover:bg-navy/90 font-semibold py-5"
          >
            {isSolving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                সমাধান করা হচ্ছে...
              </>
            ) : (
              "Solve / সমাধান করুন"
            )}
          </Button>
        </CardContent>
      </Card>

      {isSolving && (
        <Card className="mt-6 border-gold/30 bg-gold/5">
          <CardContent className="py-8 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
            <p className="text-navy font-medium">সমাধান তৈরি হচ্ছে...</p>
            <p className="text-muted-foreground text-sm">
              Please wait while we solve your problem
            </p>
          </CardContent>
        </Card>
      )}

      {solution && !isSolving && (
        <Card
          className="mt-6 border-green-200 bg-green-50/50"
          data-ocid="customercase.success_state"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-800 flex items-center gap-2">
              ✅ Solution / সমাধান
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-navy whitespace-pre-wrap font-mono text-xs leading-relaxed overflow-x-auto">
              {solution}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support Section */}
      <div className="mt-10 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-navy/80 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-navy">
            Contact Support
          </h2>
          <p className="text-muted-foreground text-sm">
            সাপোর্টে যোগাযোগ করুন — আমরা সাহায্য করব
          </p>
        </div>
      </div>

      <Card className="border-navy/20 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-navy">
            বার্তা পাঠান / Send a Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="support-name" className="text-sm font-medium">
              আপনার নাম / Your Name
            </Label>
            <Input
              id="support-name"
              data-ocid="support.input"
              placeholder="আপনার নাম লিখুন"
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              className="border-navy/20 focus-visible:ring-navy/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="support-message" className="text-sm font-medium">
              বার্তা / Message
            </Label>
            <Textarea
              id="support-message"
              data-ocid="support.textarea"
              placeholder="আপনার সমস্যা বা প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন..."
              className="min-h-28 resize-y border-navy/20 focus-visible:ring-navy/30"
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
            />
          </div>
          <Button
            data-ocid="support.submit_button"
            onClick={handleSendSupport}
            disabled={
              isSendingSupport || !supportName.trim() || !supportMessage.trim()
            }
            className="w-full bg-navy text-white hover:bg-navy/90 font-semibold py-5"
          >
            {isSendingSupport ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                পাঠানো হচ্ছে...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                বার্তা পাঠান / Send Message
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* My Support Replies Section */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-navy">
              আমার বার্তার উত্তর / My Support Replies
            </h2>
            <p className="text-muted-foreground text-sm">
              অ্যাডমিনের দেওয়া উত্তর দেখুন
            </p>
          </div>
        </div>

        {loadingMyMessages ? (
          <div className="space-y-3" data-ocid="support.loading_state">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : !myMessages || myMessages.length === 0 ? (
          <div
            className="text-center py-10 border border-dashed border-navy/20 rounded-xl text-muted-foreground"
            data-ocid="support.empty_state"
          >
            <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-25" />
            <p className="font-medium">এখনো কোনো বার্তা পাঠানো হয়নি</p>
            <p className="text-sm mt-1">
              No messages sent yet. Use the form above to contact support.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myMessages.map((msg, idx) => {
              // adminReply is Candid optional: [] | [string]
              const adminReply =
                msg.adminReply && msg.adminReply.length > 0
                  ? msg.adminReply[0]
                  : null;

              return (
                <Card
                  key={String(msg.id)}
                  className="border-navy/15 shadow-sm"
                  data-ocid={`support.item.${idx + 1}`}
                >
                  <CardContent className="pt-4 pb-4 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Number(msg.timestamp / 1_000_000n),
                      ).toLocaleString("bn-IN")}
                    </p>

                    <div className="rounded-md bg-navy/5 border border-navy/10 px-3 py-2">
                      <p className="text-xs font-semibold text-navy mb-0.5">
                        আপনার বার্তা / Your Message:
                      </p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>

                    {adminReply ? (
                      <div className="rounded-md bg-teal-50 border border-teal-200 px-3 py-2">
                        <p className="text-xs font-semibold text-teal-700 mb-0.5">
                          ✅ Admin Reply / অ্যাডমিনের উত্তর:
                        </p>
                        <p className="text-sm text-teal-800 whitespace-pre-wrap">
                          {adminReply}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-600 text-xs">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        উত্তরের অপেক্ষায়... / Awaiting reply
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function generateLocalSolution(problem: string): string {
  const lower = problem.toLowerCase();
  let hint = "";
  if (lower.includes("journal") || lower.includes("জার্নাল")) {
    hint =
      "\n\n[Journal Entry Format]\nDate | Particulars | L.F. | Dr. (₹) | Cr. (₹)";
  } else if (lower.includes("depreciation") || lower.includes("অবচয়")) {
    hint =
      "\n\n[Depreciation Calculation]\nSLM: (Cost - Salvage) ÷ Useful Life\nWDV: Book Value × Rate%";
  } else if (lower.includes("capital") || lower.includes("মূলধন")) {
    hint =
      "\n\n[Capital Account Format]\nDr side: Drawings, Interest on Drawings, Closing Balance\nCr side: Opening Balance, Interest on Capital, Salary, Share of Profit";
  } else if (lower.includes("goodwill") || lower.includes("গুডউইল")) {
    hint =
      "\n\n[Goodwill Methods]\nAverage Profit Method: Avg Profit × Years of Purchase\nSuper Profit Method: (Avg Profit - Normal Profit) × Years\nCapitalisation: Super Profit × (100 ÷ Normal Rate%)";
  }
  return `📚 WBCom AI — Step-by-Step Solution
════════════════════════════════════

Problem analysed: ${problem.slice(0, 120)}${problem.length > 120 ? "..." : ""}

Please use the specific topic solvers on the Home page for detailed step-by-step solutions:
• Partnership & Goodwill → Partnership solver
• Appropriation & Capital A/c → Appropriation solver  
• Depreciation (SLM/WDV) → Depreciation solver
• Balance Sheet → Balance Sheet solver
• Cash Flow Statement → Cash Flow solver
• Journal Entries → Journal Entry solver
• NPO Accounts → NPO solver
• Share Issue → Company Accounts solver
${hint}

💡 টিপস: নির্দিষ্ট বিষয়ের সমাধানের জন্য Home পেজে Topic Grid থেকে বিষয়টি বেছে নিন।

— WBCom AI | Founder: Bikram Mandal, C.R.G.S`;
}
