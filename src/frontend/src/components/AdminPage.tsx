import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Loader2,
  MessageSquare,
  Plus,
  Reply,
  ShieldCheck,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import {
  useAddAdminQuestion,
  useAdminQuizQuestions,
  useDeleteQuizQuestion,
  useGetCustomerMessages,
  useGetUserCount,
} from "../hooks/useQueries";

const QUIZ_TOPICS = [
  { label: "Journal Entry", value: "journal" },
  { label: "Partnership", value: "partnership" },
  { label: "Depreciation", value: "depreciation" },
  { label: "NPO", value: "npo" },
  { label: "Company Accounts", value: "company" },
  { label: "Cash Flow", value: "cashflow" },
  { label: "Balance Sheet", value: "balance" },
  { label: "Ledger", value: "ledger" },
  { label: "Appropriation", value: "appropriation" },
];

function safeTimestamp(ts: unknown): number {
  if (typeof ts === "bigint") return Number(ts / 1_000_000n);
  return Number(ts ?? 0);
}

const CORRECT_OPTIONS = [
  { label: "A", value: "0" },
  { label: "B", value: "1" },
  { label: "C", value: "2" },
  { label: "D", value: "3" },
];

const OPTION_KEYS = ["optionA", "optionB", "optionC", "optionD"] as const;

export function AdminPage() {
  const { data: userCount, isLoading: loadingCount } = useGetUserCount();
  const { data: messages, isLoading: loadingMessages } =
    useGetCustomerMessages();
  const { data: quizQuestions, isLoading: loadingQuiz } =
    useAdminQuizQuestions();
  const { actor, isFetching } = useActor();
  const actorRef = useRef(actor);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);
  const isFetchingRef = useRef(isFetching);
  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  const queryClient = useQueryClient();
  const addQuestion = useAddAdminQuestion();
  const deleteQuestion = useDeleteQuizQuestion();

  const [openReplyId, setOpenReplyId] = useState<bigint | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [sendingId, setSendingId] = useState<bigint | null>(null);

  // New question form
  const [newQ, setNewQ] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctIndex: "0",
    topic: "journal",
    explanation: "",
  });
  const [addingQ, setAddingQ] = useState(false);

  async function waitForActor() {
    for (let i = 0; i < 30; i++) {
      if (actorRef.current && !isFetchingRef.current) return actorRef.current;
      await new Promise((r) => setTimeout(r, 500));
    }
    return null;
  }

  async function handleDeleteMessage(id: bigint) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই, আবার চেষ্টা করুন।");
      return;
    }
    try {
      await readyActor.deleteCustomerMessage(id);
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      toast.success("Message removed.");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to remove message.");
    }
  }

  async function handleSendReply(id: bigint) {
    const key = String(id);
    const text = (replyTexts[key] || "").trim();
    if (!text) {
      toast.error("উত্তর লিখুন / Please enter a reply");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই, একটু পরে আবার চেষ্টা করুন।");
      return;
    }
    setSendingId(id);
    try {
      await readyActor.replyToCustomerMessage(id, text);
      toast.success("উত্তর পাঠানো হয়েছে / Reply sent!");
      setOpenReplyId(null);
      setReplyTexts((prev) => ({ ...prev, [key]: "" }));
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      queryClient.invalidateQueries({ queryKey: ["myCustomerMessages"] });
    } catch (err) {
      console.error("Reply error:", err);
      toast.error("উত্তর পাঠানো যায়নি / Failed to send reply");
    } finally {
      setSendingId(null);
    }
  }

  async function handleAddQuestion() {
    if (
      !newQ.question.trim() ||
      !newQ.optionA.trim() ||
      !newQ.optionB.trim() ||
      !newQ.optionC.trim() ||
      !newQ.optionD.trim()
    ) {
      toast.error("সব field পূরণ করুন");
      return;
    }
    setAddingQ(true);
    try {
      await addQuestion.mutateAsync({
        question: newQ.question,
        optionA: newQ.optionA,
        optionB: newQ.optionB,
        optionC: newQ.optionC,
        optionD: newQ.optionD,
        correctIndex: BigInt(newQ.correctIndex),
        topic: newQ.topic,
        explanation: newQ.explanation,
      });
      toast.success("প্রশ্ন যোগ হয়েছে!");
      setNewQ({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctIndex: "0",
        topic: "journal",
        explanation: "",
      });
    } catch {
      toast.error("প্রশ্ন যোগ করা যায়নি");
    } finally {
      setAddingQ(false);
    }
  }

  async function handleDeleteQuestion(id: bigint) {
    try {
      await deleteQuestion.mutateAsync(id);
      toast.success("প্রশ্ন মুছে ফেলা হয়েছে");
    } catch {
      toast.error("মুছতে পারা যায়নি");
    }
  }

  function renderMessages() {
    if (!messages || messages.length === 0) {
      return (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.empty_state"
        >
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">কোনো বার্তা নেই</p>
          <p className="text-sm mt-1">No customer messages yet.</p>
        </div>
      );
    }

    const items: React.ReactNode[] = [];
    for (let idx = 0; idx < messages.length; idx++) {
      try {
        const msg = messages[idx];
        const key = String(msg.id);
        const existingReply =
          Array.isArray(msg.adminReply) && msg.adminReply.length > 0
            ? msg.adminReply[0]
            : null;
        const isOpen = openReplyId !== null && String(openReplyId) === key;
        const isSending = sendingId !== null && String(sendingId) === key;

        items.push(
          <div
            key={key}
            className="border border-navy/15 rounded-lg p-4 bg-white/60"
            data-ocid={`admin.row.${idx + 1}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="font-semibold text-navy text-sm">
                  {msg.senderName || "Anonymous"}
                </span>
                <span className="ml-3 text-xs text-muted-foreground">
                  {new Date(safeTimestamp(msg.timestamp)).toLocaleString(
                    "bn-IN",
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2 text-xs border-navy/20 text-navy hover:bg-navy/10"
                  onClick={() => setOpenReplyId(isOpen ? null : msg.id)}
                  data-ocid={`admin.secondary_button.${idx + 1}`}
                >
                  <Reply className="w-3 h-3 mr-1" />
                  {isOpen ? "বন্ধ করুন" : "Reply"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                  onClick={() => handleDeleteMessage(msg.id)}
                  data-ocid={`admin.delete_button.${idx + 1}`}
                  title="Remove message"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap mb-3">
              {msg.message}
            </p>
            {existingReply && (
              <div className="rounded-md bg-teal-50 border border-teal-200 px-3 py-2 mb-3">
                <p className="text-xs font-semibold text-teal-700 mb-0.5">
                  ✅ Admin Reply / অ্যাডমিনের উত্তর:
                </p>
                <p className="text-sm text-teal-800 whitespace-pre-wrap">
                  {existingReply}
                </p>
              </div>
            )}
            {isOpen && (
              <div className="mt-2 space-y-2">
                <Textarea
                  placeholder="উত্তর লিখুন / Type your reply..."
                  className="min-h-20 text-sm border-navy/20 focus-visible:ring-navy/30"
                  value={replyTexts[key] || ""}
                  onChange={(e) =>
                    setReplyTexts((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  data-ocid="admin.textarea"
                />
                <Button
                  size="sm"
                  className="bg-navy text-white hover:bg-navy/90 text-xs px-4"
                  onClick={() => handleSendReply(msg.id)}
                  disabled={isSending}
                  data-ocid={`admin.submit_button.${idx + 1}`}
                >
                  {isSending ? (
                    "পাঠানো হচ্ছে..."
                  ) : (
                    <>
                      <Reply className="w-3 h-3 mr-1" />
                      উত্তর পাঠান / Send Reply
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>,
        );
      } catch {
        items.push(
          <div
            key={`error-${idx}`}
            className="border border-red-200 rounded-lg p-3 bg-red-50 text-sm text-red-600"
          >
            এই বার্তাটি লোড করা যায়নি। / Could not load this message.
          </div>,
        );
      }
    }
    return (
      <div className="space-y-4" data-ocid="admin.table">
        {items}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8" data-ocid="admin.page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center shadow-md">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            অ্যাডমিন ড্যাশবোর্ড — Bikram Mandal
          </p>
        </div>
        <Badge className="ml-auto bg-gold/20 text-gold border-gold/30 font-semibold">
          Admin
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট ব্যবহারকারী
            </CardTitle>
            <Users className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingCount ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {userCount !== undefined ? String(userCount) : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Registered users
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              মোট বার্তা
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            {loadingMessages ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {messages ? messages.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Support messages
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/20 shadow-sm" data-ocid="admin.card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quiz প্রশ্ন
            </CardTitle>
            <Trophy className="w-4 h-4 text-gold" />
          </CardHeader>
          <CardContent>
            {loadingQuiz ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <p className="text-4xl font-display font-bold text-navy">
                {quizQuestions ? quizQuestions.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Admin-added questions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="messages">
        <TabsList className="mb-6 bg-navy/5 border border-navy/10">
          <TabsTrigger
            value="messages"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
          >
            <Trophy className="w-3.5 h-3.5 mr-1.5" />
            Quiz Questions
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Customer Support Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div className="space-y-3" data-ocid="admin.loading_state">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                renderMessages()
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Questions Tab */}
        <TabsContent value="quiz">
          {/* Add Question Form */}
          <Card className="border-navy/20 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Plus className="w-4 h-4" />
                নতুন প্রশ্ন যোগ করুন / Add New Question
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    প্রশ্ন / Question *
                  </Label>
                  <Textarea
                    placeholder="প্রশ্নটি লিখুন..."
                    className="min-h-16 text-sm border-navy/20"
                    value={newQ.question}
                    onChange={(e) =>
                      setNewQ((p) => ({ ...p, question: e.target.value }))
                    }
                    data-ocid="admin.textarea"
                  />
                </div>
                {(["optionA", "optionB", "optionC", "optionD"] as const).map(
                  (key, i) => (
                    <div key={key}>
                      <Label className="text-xs font-semibold text-navy mb-1 block">
                        Option {["A", "B", "C", "D"][i]} *
                      </Label>
                      <Input
                        placeholder={`Option ${["A", "B", "C", "D"][i]}`}
                        className="text-sm border-navy/20"
                        value={newQ[key]}
                        onChange={(e) =>
                          setNewQ((p) => ({ ...p, [key]: e.target.value }))
                        }
                        data-ocid="admin.input"
                      />
                    </div>
                  ),
                )}
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    সঠিক উত্তর / Correct Answer *
                  </Label>
                  <Select
                    value={newQ.correctIndex}
                    onValueChange={(v) =>
                      setNewQ((p) => ({ ...p, correctIndex: v }))
                    }
                  >
                    <SelectTrigger
                      className="border-navy/20 text-sm"
                      data-ocid="admin.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CORRECT_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          Option {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    বিষয় / Topic *
                  </Label>
                  <Select
                    value={newQ.topic}
                    onValueChange={(v) => setNewQ((p) => ({ ...p, topic: v }))}
                  >
                    <SelectTrigger
                      className="border-navy/20 text-sm"
                      data-ocid="admin.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUIZ_TOPICS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    ব্যাখ্যা / Explanation
                  </Label>
                  <Textarea
                    placeholder="সঠিক উত্তরের ব্যাখ্যা লিখুন..."
                    className="min-h-12 text-sm border-navy/20"
                    value={newQ.explanation}
                    onChange={(e) =>
                      setNewQ((p) => ({ ...p, explanation: e.target.value }))
                    }
                    data-ocid="admin.textarea"
                  />
                </div>
              </div>
              <Button
                className="bg-navy text-white hover:bg-navy/90"
                onClick={handleAddQuestion}
                disabled={addingQ}
                data-ocid="admin.submit_button"
              >
                {addingQ ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    যোগ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    প্রশ্ন যোগ করুন
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Questions List */}
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                সব প্রশ্ন / All Questions ({quizQuestions?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingQuiz ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : !quizQuestions || quizQuestions.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.empty_state"
                >
                  <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">কোনো প্রশ্ন নেই — উপরে যোগ করুন।</p>
                </div>
              ) : (
                <div className="space-y-3" data-ocid="admin.table">
                  {quizQuestions.map((q, idx) => (
                    <div
                      key={q.id.toString()}
                      className="border border-navy/15 rounded-lg p-3 bg-white/60"
                      data-ocid={`admin.row.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-navy/10 text-navy border-0"
                            >
                              {QUIZ_TOPICS.find((t) => t.value === q.topic)
                                ?.label ?? q.topic}
                            </Badge>
                            {q.isAdminAdded && (
                              <Badge className="text-[10px] bg-gold/20 text-gold border-gold/30">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {q.question}
                          </p>
                          <div className="grid grid-cols-2 gap-x-4 mt-1">
                            {OPTION_KEYS.map((k, i) => (
                              <p
                                key={k}
                                className={`text-xs ${i === Number(q.correctIndex) ? "text-green-700 font-semibold" : "text-muted-foreground"}`}
                              >
                                {["A", "B", "C", "D"][i]}) {q[k]}
                                {i === Number(q.correctIndex) ? " ✅" : ""}
                              </p>
                            ))}
                          </div>
                          {q.explanation && (
                            <p className="text-xs text-muted-foreground mt-1 italic">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0 shrink-0"
                          onClick={() => handleDeleteQuestion(q.id)}
                          data-ocid={`admin.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
