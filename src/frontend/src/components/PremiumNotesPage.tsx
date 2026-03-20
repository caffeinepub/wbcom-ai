import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Clock,
  FileText,
  ImageIcon,
  Instagram,
  Lock,
  Search,
  Send,
  Star,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import {
  useGetAllNotesList,
  useGetMyAccessStatus,
  useGetPremiumNotesWithContent,
} from "../hooks/useQueries";

function safeTimestamp(ts: unknown): number {
  if (typeof ts === "bigint") return Number(ts / 1_000_000n);
  return Number(ts ?? 0);
}

function MarkdownContent({ content }: { content: string }) {
  // Simple renderer: bold, lists, paragraphs
  const lines = content.split("\n");
  return (
    <div className="prose prose-sm max-w-none text-foreground space-y-1.5">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return (
            <h3
              key={`line-${i}-${line.substring(0, 8)}`}
              className="font-bold text-base text-navy mt-3 mb-1"
            >
              {line.slice(3)}
            </h3>
          );
        if (line.startsWith("# "))
          return (
            <h2
              key={`line-${i}-${line.substring(0, 8)}`}
              className="font-bold text-lg text-navy mt-4 mb-1"
            >
              {line.slice(2)}
            </h2>
          );
        if (line.startsWith("- ") || line.startsWith("* "))
          return (
            <div
              key={`line-${i}-${line.substring(0, 8)}`}
              className="flex gap-2"
            >
              <span className="text-gold mt-0.5">•</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        if (line.trim() === "")
          return (
            <div key={`line-${i}-${line.substring(0, 8)}`} className="h-1" />
          );
        return (
          <p
            key={`line-${i}-${line.substring(0, 8)}`}
            className="leading-relaxed"
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

interface NoteAttachment {
  name: string;
  type: string;
  data: string;
}

function parseNoteContent(rawContent: string): {
  content: string;
  attachments: NoteAttachment[];
} {
  if (!rawContent.startsWith("__ATTACHMENTS__")) {
    return { content: rawContent, attachments: [] };
  }
  try {
    const firstNewline = rawContent.indexOf("\n");
    const attachmentsJson = rawContent.slice(
      "__ATTACHMENTS__".length,
      firstNewline,
    );
    const attachments = JSON.parse(attachmentsJson) as NoteAttachment[];
    const contentStart = rawContent.indexOf("\n__CONTENT__\n");
    const parsedContent =
      contentStart !== -1
        ? rawContent.slice(contentStart + "\n__CONTENT__\n".length)
        : "";
    return { content: parsedContent, attachments };
  } catch {
    return { content: rawContent, attachments: [] };
  }
}

function AttachmentsSection({
  attachments,
}: { attachments: NoteAttachment[] }) {
  if (attachments.length === 0) return null;
  const images = attachments.filter((a) => a.type.startsWith("image/"));
  const pdfs = attachments.filter((a) => a.type === "application/pdf");
  const others = attachments.filter(
    (a) => !a.type.startsWith("image/") && a.type !== "application/pdf",
  );
  return (
    <div className="mb-4 space-y-4">
      {images.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            ছবি ({images.length})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {images.map((a, i) => (
              <div
                key={`img-${a.name}-${i}`}
                className="rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={`data:${a.type};base64,${a.data}`}
                  alt={a.name}
                  className="w-full object-contain max-h-64"
                />
                <p className="text-[10px] text-muted-foreground px-2 py-1 truncate bg-muted/30">
                  {a.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {pdfs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <FileText className="w-3.5 h-3.5" />
            PDF ফাইল ({pdfs.length})
          </div>
          {pdfs.map((a, i) => (
            <div
              key={`pdf-${a.name}-${i}`}
              className="border border-border rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border">
                <span className="text-xs font-medium truncate">{a.name}</span>
                <a
                  href={`data:application/pdf;base64,${a.data}`}
                  download={a.name}
                  className="text-xs text-blue-600 hover:underline ml-2 shrink-0"
                >
                  ডাউনলোড
                </a>
              </div>
              <iframe
                src={`data:application/pdf;base64,${a.data}`}
                title={a.name}
                className="w-full"
                style={{ height: "600px" }}
              />
            </div>
          ))}
        </div>
      )}
      {others.length > 0 && (
        <div className="space-y-1">
          {others.map((a, i) => (
            <a
              key={`other-${a.name}-${i}`}
              href={`data:${a.type};base64,${a.data}`}
              download={a.name}
              className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              {a.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function PremiumNotesPage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: accessStatus, isLoading: loadingStatus } =
    useGetMyAccessStatus();
  const { data: notesList, isLoading: loadingList } = useGetAllNotesList();
  const { data: notesWithContent, isLoading: loadingContent } =
    useGetPremiumNotesWithContent(accessStatus === "approved");

  const [requestMessage, setRequestMessage] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  async function handleRequestAccess() {
    if (!requestMessage.trim()) {
      toast.error("একটি বার্তা লিখুন");
      return;
    }
    if (!actor || isFetching) {
      toast.error("লোড হচ্ছে, একটু অপেক্ষা করুন।");
      return;
    }
    setSendingRequest(true);
    try {
      // Ensure user is registered before requesting
      await actor.registerUser();
      await actor.requestNotesAccess(requestMessage.trim());
      toast.success("Request পাঠানো হয়েছে! Admin approval-এর জন্য অপেক্ষা করুন।");
      setRequestDialogOpen(false);
      setRequestMessage("");
      queryClient.invalidateQueries({ queryKey: ["myAccessStatus"] });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg.includes("already has premium")) {
        toast.info("আপনার ইতিমধ্যে access আছে!");
        queryClient.invalidateQueries({ queryKey: ["myAccessStatus"] });
      } else {
        toast.error("Request পাঠানো যায়নি। আবার চেষ্টা করুন।");
      }
    } finally {
      setSendingRequest(false);
    }
  }

  const subjects = Array.from(
    new Set(
      (notesWithContent ?? notesList ?? [])
        .map((n: { subject: string }) => n.subject)
        .filter(Boolean),
    ),
  );

  const filteredNotes = (notesWithContent ?? []).filter((n) => {
    const matchesSubject =
      subjectFilter === "all" || n.subject === subjectFilter;
    const matchesSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  if (loadingStatus) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-ocid="notes.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center shadow">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Premium Notes
          </h1>
          <p className="text-sm text-muted-foreground">
            WBCHSE Exclusive Study Materials
          </p>
        </div>
        {accessStatus === "approved" && (
          <Badge className="ml-auto bg-emerald-500 text-white">
            <Unlock className="w-3 h-3 mr-1" />
            Access Granted
          </Badge>
        )}
      </div>

      {/* Instagram DM Banner */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
          <Instagram className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-purple-900">
            Premium Notes Access পেতে
          </p>
          <p className="text-sm text-purple-700">
            Instagram-এ DM করুন:{" "}
            <a
              href="https://instagram.com/wbcomai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-900 hover:underline"
            >
              @wbcomai
            </a>
          </p>
        </div>
      </div>

      {/* ACCESS STATUS: none */}
      {(accessStatus === "none" ||
        accessStatus === undefined ||
        accessStatus === "") && (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex flex-col items-center gap-3 bg-navy/5 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-navy" />
              </div>
              <h2 className="font-bold text-lg text-navy">
                Premium Notes Locked
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                এই notes গুলো শুধুমাত্র approved users দেখতে পাবেন। Admin-এর কাছে
                access request করুন।
              </p>
              <Dialog
                open={requestDialogOpen}
                onOpenChange={setRequestDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="bg-navy text-white hover:bg-navy/90"
                    data-ocid="notes.open_modal_button"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Access Request করুন
                  </Button>
                </DialogTrigger>
                <DialogContent data-ocid="notes.dialog">
                  <DialogHeader>
                    <DialogTitle className="text-navy font-display">
                      Premium Notes Access Request
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      Admin-কে একটি বার্তা লিখুন কেন আপনার access দরকার।
                    </p>
                    <Textarea
                      placeholder="আপনার পরিচয় এবং কেন এই notes দরকার তা লিখুন..."
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      rows={4}
                      data-ocid="notes.textarea"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setRequestDialogOpen(false)}
                        data-ocid="notes.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRequestAccess}
                        disabled={sendingRequest || isFetching}
                        className="bg-navy text-white hover:bg-navy/90"
                        data-ocid="notes.submit_button"
                      >
                        {sendingRequest ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            পাঠানো হচ্ছে...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Request পাঠান
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Blurred locked notes preview */}
          {loadingList ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : notesList && notesList.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {notesList.length}টি Premium Notes available:
              </p>
              {notesList.map((note) => (
                <div
                  key={String(note.id)}
                  className="relative rounded-lg border border-navy/15 bg-white/70 p-4 overflow-hidden"
                >
                  <div className="blur-sm select-none pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                    </div>
                    <p className="font-semibold text-navy">{note.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1.5 shadow-sm border border-navy/10">
                      <Lock className="w-3.5 h-3.5 text-navy" />
                      <span className="text-xs font-medium text-navy">
                        Locked
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}

      {/* ACCESS STATUS: pending */}
      {accessStatus === "pending" && (
        <div className="text-center" data-ocid="notes.loading_state">
          <div className="inline-flex flex-col items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="font-bold text-lg text-amber-800">
              Request পর্যালোচনা চলছে
            </h2>
            <p className="text-sm text-amber-700 max-w-sm">
              আপনার request পাঠানো হয়েছে। Admin approval-এর জন্য অপেক্ষা করুন। Approved
              হলে এখানেই Notes দেখা যাবে।
            </p>
            <Badge className="bg-amber-500 text-white">Pending Approval</Badge>
          </div>

          {/* Blurred preview */}
          {loadingList ? (
            <div className="mt-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : notesList && notesList.length > 0 ? (
            <div className="mt-6 space-y-3">
              {notesList.map((note) => (
                <div
                  key={String(note.id)}
                  className="relative rounded-lg border border-navy/15 bg-white/70 p-4 overflow-hidden"
                >
                  <div className="blur-sm select-none pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                    </div>
                    <p className="font-semibold text-navy">{note.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 bg-amber-50/90 rounded-full px-3 py-1.5 shadow-sm border border-amber-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* ACCESS STATUS: rejected */}
      {accessStatus === "rejected" && (
        <div
          className="text-center bg-red-50 border border-red-200 rounded-2xl p-8"
          data-ocid="notes.error_state"
        >
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-bold text-lg text-red-800 mb-2">
            Request Rejected
          </h2>
          <p className="text-sm text-red-700 mb-4">
            আপনার request rejected হয়েছে। আরও তথ্যের জন্য Instagram-এ DM করুন:
            @wbcomai
          </p>
        </div>
      )}

      {/* ACCESS STATUS: approved */}
      {accessStatus === "approved" && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Notes খুঁজুন..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-ocid="notes.search_input"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSubjectFilter("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  subjectFilter === "all"
                    ? "bg-navy text-white"
                    : "bg-navy/10 text-navy hover:bg-navy/20"
                }`}
                data-ocid="notes.tab"
              >
                সব
              </button>
              {subjects.map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSubjectFilter(subj)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    subjectFilter === subj
                      ? "bg-navy text-white"
                      : "bg-navy/10 text-navy hover:bg-navy/20"
                  }`}
                  data-ocid="notes.tab"
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          {loadingContent ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredNotes.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="notes.empty_state"
            >
              <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">কোনো note পাওয়া যায়নি</p>
              <p className="text-sm mt-1">
                অন্য subject বা search keyword চেষ্টা করুন
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="notes.list">
              {filteredNotes.map((note, idx) => (
                <Card
                  key={String(note.id)}
                  className="border-navy/15 shadow-xs"
                  data-ocid={`notes.item.${idx + 1}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge
                            variant="outline"
                            className="text-xs border-navy/20 text-navy"
                          >
                            {note.subject}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              safeTimestamp(note.createdAt),
                            ).toLocaleDateString("bn-IN")}
                          </span>
                        </div>
                        <CardTitle className="text-base text-navy font-display">
                          {note.title}
                        </CardTitle>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const parsed = parseNoteContent(note.content);
                      return (
                        <>
                          <AttachmentsSection
                            attachments={parsed.attachments}
                          />
                          <MarkdownContent content={parsed.content} />
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
