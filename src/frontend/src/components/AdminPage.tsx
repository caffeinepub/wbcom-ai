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
import { Principal } from "@dfinity/principal";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  BookOpen,
  CheckCircle,
  FileText,
  Loader2,
  MessageSquare,
  Pencil,
  Plus,
  Reply,
  ShieldCheck,
  Trash2,
  Trophy,
  Upload,
  Users,
  X,
  XCircle,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import {
  useAddAdminQuestion,
  useAdminQuizQuestions,
  useDeleteQuizQuestion,
  useGetAllAccessRequests,
  useGetAllNotesList,
  useGetCustomerMessages,
  useGetUserCount,
} from "../hooks/useQueries";

const QUIZ_TOPICS = [
  // Accountancy
  { label: "Journal Entry", value: "journal" },
  { label: "Partnership", value: "partnership" },
  { label: "Depreciation", value: "depreciation" },
  { label: "NPO", value: "npo" },
  { label: "Company Accounts", value: "company" },
  { label: "Cash Flow", value: "cashflow" },
  { label: "Balance Sheet", value: "balance" },
  { label: "Ledger", value: "ledger" },
  { label: "Appropriation", value: "appropriation" },
  // Science
  { label: "Physics - Class 11", value: "physics_11" },
  { label: "Physics - Class 12", value: "physics_12" },
  { label: "Chemistry - Class 11", value: "chemistry_11" },
  { label: "Chemistry - Class 12", value: "chemistry_12" },
  { label: "Biology - Class 11", value: "biology_11" },
  { label: "Biology - Class 12", value: "biology_12" },
  { label: "Mathematics - Class 11", value: "math_11" },
  { label: "Mathematics - Class 12", value: "math_12" },
  // Arts
  { label: "Arts - Bengali", value: "arts_bengali" },
  { label: "Arts - English", value: "arts_english" },
  { label: "Arts - History", value: "arts_history" },
  { label: "Arts - Geography", value: "arts_geography" },
  { label: "Arts - Political Science", value: "arts_politicalscience" },
  { label: "Arts - Philosophy", value: "arts_philosophy" },
  { label: "Arts - Sociology", value: "arts_sociology" },
  { label: "Arts - Sanskrit", value: "arts_sanskrit" },
  // Commerce
  { label: "Commerce - Business Studies", value: "commerce_businessstudies" },
  { label: "Commerce - Economics", value: "commerce_economics" },
  {
    label: "Commerce - Commercial Mathematics",
    value: "commerce_commercialmathematics",
  },
  {
    label: "Commerce - Computer Application",
    value: "commerce_computerapplication",
  },
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

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-600 border-red-200",
};

export function AdminPage() {
  const { data: userCount, isLoading: loadingCount } = useGetUserCount();
  const { data: messages, isLoading: loadingMessages } =
    useGetCustomerMessages();
  const { data: quizQuestions, isLoading: loadingQuiz } =
    useAdminQuizQuestions();
  const { data: notesList, isLoading: loadingNotesList } = useGetAllNotesList();
  const { data: accessRequests, isLoading: loadingRequests } =
    useGetAllAccessRequests();
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

  // Premium Notes state
  const [newNote, setNewNote] = useState({
    title: "",
    subject: "",
    content: "",
  });
  const [addingNote, setAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<bigint | null>(null);
  const [editNote, setEditNote] = useState({
    title: "",
    subject: "",
    content: "",
  });
  const [newNoteAttachments, setNewNoteAttachments] = useState<
    Array<{ name: string; type: string; data: string }>
  >([]);
  const [editNoteAttachments, setEditNoteAttachments] = useState<
    Array<{ name: string; type: string; data: string }>
  >([]);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<bigint | null>(null);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(
    null,
  );

  // Notice Board state
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [addingNotice, setAddingNotice] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<bigint | null>(null);
  const [editNoticeData, setEditNoticeData] = useState({
    title: "",
    content: "",
  });
  const [savingNoticeEdit, setSavingNoticeEdit] = useState(false);
  const [deletingNoticeId, setDeletingNoticeId] = useState<bigint | null>(null);

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

  function buildContentWithAttachments(
    content: string,
    attachments: Array<{ name: string; type: string; data: string }>,
  ): string {
    if (attachments.length === 0) return content;
    return `__ATTACHMENTS__${JSON.stringify(attachments)}\n__CONTENT__\n${content}`;
  }

  async function handleFileSelect(
    files: FileList,
    setter: React.Dispatch<
      React.SetStateAction<Array<{ name: string; type: string; data: string }>>
    >,
  ) {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    let totalSize = 0;
    const results: Array<{ name: string; type: string; data: string }> = [];
    for (const file of Array.from(files)) {
      totalSize += file.size;
      if (totalSize > 5 * 1024 * 1024) {
        toast.error("মোট file size 5MB-এর বেশি হতে পারবে না");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} 2MB-এর বেশি বড়`);
        continue;
      }
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      results.push({ name: file.name, type: file.type, data: base64 });
    }
    setter((prev) => [...prev, ...results]);
  }

  async function handleAddNote() {
    if (!newNote.title.trim() || !newNote.subject.trim()) {
      toast.error("শিরোনাম এবং বিষয় লিখুন");
      return;
    }
    if (!newNote.content.trim() && newNoteAttachments.length === 0) {
      toast.error("Content লিখুন অথবা ফাইল সংযুক্ত করুন");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setAddingNote(true);
    try {
      await readyActor.addPremiumNote(
        newNote.title.trim(),
        newNote.subject.trim(),
        buildContentWithAttachments(newNote.content.trim(), newNoteAttachments),
      );
      toast.success("Note যোগ হয়েছে!");
      setNewNote({ title: "", subject: "", content: "" });
      setNewNoteAttachments([]);
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Note যোগ করা যায়নি");
    } finally {
      setAddingNote(false);
    }
  }

  function startEditNote(note: { id: bigint; title: string; subject: string }) {
    setEditingNoteId(note.id);
    setEditNote({ title: note.title, subject: note.subject, content: "" });
  }

  async function handleSaveEdit() {
    if (!editingNoteId) return;
    if (!editNote.title.trim() || !editNote.subject.trim()) {
      toast.error("শিরোনাম এবং বিষয় লিখুন");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setSavingEdit(true);
    try {
      await readyActor.editPremiumNote(
        editingNoteId,
        editNote.title.trim(),
        editNote.subject.trim(),
        buildContentWithAttachments(
          editNote.content.trim(),
          editNoteAttachments,
        ),
      );
      toast.success("Note আপডেট হয়েছে");
      setEditNoteAttachments([]);
      setEditingNoteId(null);
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Note আপডেট বিফল হয়েছে");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteNote(id: bigint) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setDeletingNoteId(id);
    try {
      await readyActor.deletePremiumNote(id);
      toast.success("Note মুছে ফেলা হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Note মুছতে বিফল");
    } finally {
      setDeletingNoteId(null);
    }
  }

  // Notice Board handlers
  async function handleAddNotice() {
    if (!newNotice.title.trim() || !newNotice.content.trim()) {
      toast.error("শিরোনাম এবং বার্তা লিখুন");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setAddingNotice(true);
    try {
      await readyActor.addPremiumNote(
        newNotice.title.trim(),
        "notice",
        newNotice.content.trim(),
      );
      toast.success("Notice পোস্ট হয়েছে!");
      setNewNotice({ title: "", content: "" });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Notice পোস্ট করা যায়নি");
    } finally {
      setAddingNotice(false);
    }
  }

  async function handleSaveNoticeEdit() {
    if (!editingNoticeId) return;
    if (!editNoticeData.title.trim()) {
      toast.error("শিরোনাম লিখুন");
      return;
    }
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setSavingNoticeEdit(true);
    try {
      await readyActor.editPremiumNote(
        editingNoticeId,
        editNoticeData.title.trim(),
        "notice",
        editNoticeData.content.trim(),
      );
      toast.success("Notice আপডেট হয়েছে");
      setEditingNoticeId(null);
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Notice আপডেট বিফল");
    } finally {
      setSavingNoticeEdit(false);
    }
  }

  async function handleDeleteNotice(id: bigint) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setDeletingNoticeId(id);
    try {
      await readyActor.deletePremiumNote(id);
      toast.success("Notice মুছে ফেলা হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["premiumNotesList"] });
      queryClient.invalidateQueries({ queryKey: ["premiumNotesWithContent"] });
    } catch {
      toast.error("Notice মুছতে বিফল");
    } finally {
      setDeletingNoticeId(null);
    }
  }

  async function handleApproveRequest(userId: string) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setProcessingRequestId(userId);
    try {
      // userId is a Principal string — pass as-is; backend accepts Principal
      await (readyActor as any).approveAccessRequest(
        Principal.fromText(userId),
      );
      toast.success("Access approved!");
      queryClient.invalidateQueries({ queryKey: ["allAccessRequests"] });
    } catch (err) {
      console.error(err);
      toast.error("Approve বিফল হয়েছে");
    } finally {
      setProcessingRequestId(null);
    }
  }

  async function handleRevokeAccess(userId: string) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setProcessingRequestId(userId);
    try {
      await (readyActor as any).revokeAccess(Principal.fromText(userId));
      toast.success("Access revoked.");
      queryClient.invalidateQueries({ queryKey: ["allAccessRequests"] });
    } catch (err) {
      console.error(err);
      toast.error("Revoke বিফল হয়েছে");
    } finally {
      setProcessingRequestId(null);
    }
  }

  async function handleRejectRequest(userId: string) {
    const readyActor = await waitForActor();
    if (!readyActor) {
      toast.error("সংযোগ নেই");
      return;
    }
    setProcessingRequestId(userId);
    try {
      await (readyActor as any).rejectAccessRequest(Principal.fromText(userId));
      toast.success("Request rejected.");
      queryClient.invalidateQueries({ queryKey: ["allAccessRequests"] });
    } catch (err) {
      console.error(err);
      toast.error("Reject বিফল হয়েছে");
    } finally {
      setProcessingRequestId(null);
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
        <TabsList className="mb-6 bg-navy/5 border border-navy/10 flex-wrap h-auto gap-1 p-1">
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
          <TabsTrigger
            value="notes"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.tab"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Premium Notes
          </TabsTrigger>
          <TabsTrigger
            value="noticeboard"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
          >
            <Bell className="w-3.5 h-3.5 mr-1.5" />
            Notice Board
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
                      <SelectItem
                        value="__acc_header__"
                        disabled
                        className="text-xs font-bold text-navy/50 uppercase"
                      >
                        — হিসাববিজ্ঞান (Accountancy) —
                      </SelectItem>
                      {QUIZ_TOPICS.filter((t) => !t.value.includes("_")).map(
                        (t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ),
                      )}
                      <SelectItem
                        value="__sci_header__"
                        disabled
                        className="text-xs font-bold text-emerald-700/60 uppercase"
                      >
                        — বিজ্ঞান (Science) —
                      </SelectItem>
                      {QUIZ_TOPICS.filter((t) => t.value.includes("_")).map(
                        (t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ),
                      )}
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
                              className={`text-[10px] border-0 ${
                                q.topic.includes("_")
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-navy/10 text-navy"
                              }`}
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
                                className={`text-xs ${
                                  i === Number(q.correctIndex)
                                    ? "text-green-700 font-semibold"
                                    : "text-muted-foreground"
                                }`}
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

        {/* Premium Notes Tab */}
        <TabsContent value="notes">
          {/* Add Note Form */}
          <Card className="border-navy/20 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Plus className="w-4 h-4" />
                নতুন Note যোগ করুন
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    শিরোনাম / Title *
                  </Label>
                  <Input
                    placeholder="Note-এর শিরোনাম..."
                    className="text-sm border-navy/20"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote((p) => ({ ...p, title: e.target.value }))
                    }
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    বিষয় / Subject *
                  </Label>
                  <Input
                    placeholder="যেমন: Accountancy, Physics, Biology..."
                    className="text-sm border-navy/20"
                    value={newNote.subject}
                    onChange={(e) =>
                      setNewNote((p) => ({ ...p, subject: e.target.value }))
                    }
                    data-ocid="admin.input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    Content (Markdown supported) *
                  </Label>
                  <Textarea
                    placeholder="Note-এর content লিখুন... (Markdown ব্যবহার করতে পারেন)"
                    className="min-h-32 text-sm border-navy/20 font-mono"
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote((p) => ({ ...p, content: e.target.value }))
                    }
                    data-ocid="admin.textarea"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    ফাইল সংযুক্ত করুন (PDF/Image)
                  </Label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-navy/30 text-navy"
                      onClick={() =>
                        document.getElementById("add-note-file-input")?.click()
                      }
                      data-ocid="admin.upload_button"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      ফাইল বেছে নিন
                    </Button>
                    <input
                      id="add-note-file-input"
                      type="file"
                      accept="application/pdf,image/*"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        handleFileSelect(e.target.files, setNewNoteAttachments)
                      }
                    />
                  </label>
                  {newNoteAttachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {newNoteAttachments.map((att, i) => (
                        <div
                          key={`${att.name}-${i}`}
                          className="flex items-center gap-2 text-xs bg-navy/5 rounded px-2 py-1"
                        >
                          <span>
                            {att.type === "application/pdf" ? "📄" : "🖼️"}
                          </span>
                          <span className="flex-1 truncate">{att.name}</span>
                          <span className="text-muted-foreground">
                            {((att.data.length * 0.75) / 1024).toFixed(1)}KB
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setNewNoteAttachments((p) =>
                                p.filter((_, j) => j !== i),
                              )
                            }
                            className="text-red-400 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Button
                className="bg-navy text-white hover:bg-navy/90"
                onClick={handleAddNote}
                disabled={addingNote}
                data-ocid="admin.submit_button"
              >
                {addingNote ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    যোগ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Note যোগ করুন
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Notes List */}
          <Card className="border-navy/20 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                সব Notes ({notesList?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingNotesList ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : !notesList || notesList.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.empty_state"
                >
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">কোনো note নেই — উপরে যোগ করুন।</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notesList.map((note, idx) => (
                    <div
                      key={String(note.id)}
                      className="border border-navy/15 rounded-lg p-3 bg-white/60"
                      data-ocid={`admin.row.${idx + 1}`}
                    >
                      {editingNoteId === note.id ? (
                        <div className="space-y-3">
                          <Input
                            className="text-sm border-navy/20"
                            value={editNote.title}
                            onChange={(e) =>
                              setEditNote((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                            placeholder="Title"
                            data-ocid="admin.input"
                          />
                          <Input
                            className="text-sm border-navy/20"
                            value={editNote.subject}
                            onChange={(e) =>
                              setEditNote((p) => ({
                                ...p,
                                subject: e.target.value,
                              }))
                            }
                            placeholder="Subject"
                            data-ocid="admin.input"
                          />
                          <Textarea
                            className="min-h-24 text-sm border-navy/20 font-mono"
                            value={editNote.content}
                            onChange={(e) =>
                              setEditNote((p) => ({
                                ...p,
                                content: e.target.value,
                              }))
                            }
                            placeholder="Content (leave empty to keep existing)"
                            data-ocid="admin.textarea"
                          />
                          <div>
                            <Label className="text-xs font-semibold text-navy mb-1 block">
                              নতুন ফাইল যোগ করুন (পুরনো ফাইল replace হবে না)
                            </Label>
                            <label className="flex items-center gap-2 cursor-pointer w-fit">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="border-navy/30 text-navy"
                                onClick={() =>
                                  document
                                    .getElementById("edit-note-file-input")
                                    ?.click()
                                }
                                data-ocid="admin.upload_button"
                              >
                                <Upload className="w-3.5 h-3.5 mr-1" />
                                ফাইল বেছে নিন
                              </Button>
                              <input
                                id="edit-note-file-input"
                                type="file"
                                accept="application/pdf,image/*"
                                multiple
                                className="hidden"
                                onChange={(e) =>
                                  e.target.files &&
                                  handleFileSelect(
                                    e.target.files,
                                    setEditNoteAttachments,
                                  )
                                }
                              />
                            </label>
                            {editNoteAttachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {editNoteAttachments.map((att, i) => (
                                  <div
                                    key={`${att.name}-${i}`}
                                    className="flex items-center gap-2 text-xs bg-navy/5 rounded px-2 py-1"
                                  >
                                    <span>
                                      {att.type === "application/pdf"
                                        ? "📄"
                                        : "🖼️"}
                                    </span>
                                    <span className="flex-1 truncate">
                                      {att.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {(
                                        (att.data.length * 0.75) /
                                        1024
                                      ).toFixed(1)}
                                      KB
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEditNoteAttachments((p) =>
                                          p.filter((_, j) => j !== i),
                                        )
                                      }
                                      className="text-red-400 hover:text-red-600"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-navy text-white hover:bg-navy/90"
                              onClick={handleSaveEdit}
                              disabled={savingEdit}
                              data-ocid="admin.save_button"
                            >
                              {savingEdit ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                "Save"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingNoteId(null)}
                              data-ocid="admin.cancel_button"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Badge
                              variant="outline"
                              className="text-[10px] mb-1"
                            >
                              {note.subject}
                            </Badge>
                            <p className="text-sm font-semibold text-navy">
                              {note.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-navy/20"
                              onClick={() => startEditNote(note)}
                              data-ocid={`admin.edit_button.${idx + 1}`}
                            >
                              <Pencil className="w-3.5 h-3.5 text-navy" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteNote(note.id)}
                              disabled={deletingNoteId === note.id}
                              data-ocid={`admin.delete_button.${idx + 1}`}
                            >
                              {deletingNoteId === note.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Access Requests */}
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Users className="w-4 h-4" />
                Access Requests ({accessRequests?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRequests ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : !accessRequests || accessRequests.length === 0 ? (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="admin.empty_state"
                >
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">কোনো access request নেই।</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {accessRequests.map((req, idx) => {
                    const userIdStr = String(req.userId);
                    const isProcessing = processingRequestId === userIdStr;
                    return (
                      <div
                        key={String(req.id)}
                        className="border border-navy/15 rounded-lg p-4 bg-white/60"
                        data-ocid={`admin.row.${idx + 1}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-navy text-sm">
                                {req.userName || "Unknown"}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${STATUS_COLORS[req.status] ?? "bg-muted text-muted-foreground"}`}
                              >
                                {req.status === "pending"
                                  ? "প্রতীক্ষারত"
                                  : req.status === "approved"
                                    ? "অনুমোদিত"
                                    : "প্রত্যাখ্যাত"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(
                                  safeTimestamp(req.requestedAt),
                                ).toLocaleDateString("bn-IN")}
                              </span>
                            </div>
                            {req.message && (
                              <p className="text-sm text-muted-foreground italic">
                                "{req.message}"
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {req.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3"
                                  onClick={() =>
                                    handleApproveRequest(userIdStr)
                                  }
                                  disabled={isProcessing}
                                  data-ocid={`admin.confirm_button.${idx + 1}`}
                                >
                                  {isProcessing ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                                      Approve
                                    </>
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 text-destructive hover:bg-destructive/10 text-xs px-2"
                                  onClick={() => handleRejectRequest(userIdStr)}
                                  disabled={isProcessing}
                                  data-ocid={`admin.delete_button.${idx + 1}`}
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </Button>
                              </>
                            )}
                            {req.status === "approved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleRevokeAccess(userIdStr)}
                                disabled={isProcessing}
                                data-ocid={`admin.delete_button.${idx + 1}`}
                              >
                                {isProcessing ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  "Revoke Access"
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notice Board Tab */}
        <TabsContent value="noticeboard">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notice Board পরিচালনা
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add new notice */}
              <div className="bg-navy/5 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-navy text-sm">
                  নতুন Notice যোগ করুন
                </h3>
                <div className="space-y-2">
                  <Label className="text-xs text-navy/70">শিরোনাম (Title)</Label>
                  <Input
                    value={newNotice.title}
                    onChange={(e) =>
                      setNewNotice((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Notice-এর শিরোনাম লিখুন"
                    className="border-navy/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-navy/70">বার্তা (Message)</Label>
                  <Textarea
                    value={newNotice.content}
                    onChange={(e) =>
                      setNewNotice((p) => ({ ...p, content: e.target.value }))
                    }
                    placeholder="Notice-এর বিবরণ লিখুন"
                    rows={3}
                    className="border-navy/20 resize-none"
                  />
                </div>
                <Button
                  onClick={handleAddNotice}
                  disabled={addingNotice}
                  size="sm"
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  {addingNotice ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Notice পোস্ট করুন
                </Button>
              </div>

              {/* Existing notices */}
              <div className="space-y-3">
                <h3 className="font-medium text-navy text-sm">বর্তমান Notices</h3>
                {loadingNotesList ? (
                  <Skeleton className="h-20 w-full" />
                ) : (notesList ?? []).filter(
                    (n: { subject: string }) => n.subject === "notice",
                  ).length === 0 ? (
                  <p className="text-sm text-navy/50">কোনো notice নেই।</p>
                ) : (
                  <div className="space-y-3">
                    {(notesList ?? [])
                      .filter(
                        (n: { subject: string }) => n.subject === "notice",
                      )
                      .map(
                        (notice: {
                          id: bigint;
                          title: string;
                          subject: string;
                          content?: string;
                        }) => (
                          <div
                            key={String(notice.id)}
                            className="border border-navy/10 rounded-lg p-3 space-y-2"
                          >
                            {editingNoticeId === notice.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={editNoticeData.title}
                                  onChange={(e) =>
                                    setEditNoticeData((p) => ({
                                      ...p,
                                      title: e.target.value,
                                    }))
                                  }
                                  placeholder="শিরোনাম"
                                  className="border-navy/20 text-sm"
                                />
                                <Textarea
                                  value={editNoticeData.content}
                                  onChange={(e) =>
                                    setEditNoticeData((p) => ({
                                      ...p,
                                      content: e.target.value,
                                    }))
                                  }
                                  placeholder="বার্তা"
                                  rows={2}
                                  className="border-navy/20 resize-none text-sm"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={handleSaveNoticeEdit}
                                    disabled={savingNoticeEdit}
                                    className="bg-navy text-white hover:bg-navy/90 text-xs"
                                  >
                                    {savingNoticeEdit ? (
                                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : null}
                                    সংরক্ষণ
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingNoticeId(null)}
                                    className="text-xs border-navy/20"
                                  >
                                    বাতিল
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-medium text-navy text-sm">
                                    {notice.title}
                                  </p>
                                  <div className="flex gap-1 shrink-0">
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 text-navy/60 hover:text-navy"
                                      onClick={() => {
                                        setEditingNoticeId(notice.id);
                                        setEditNoticeData({
                                          title: notice.title,
                                          content: "",
                                        });
                                      }}
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 text-red-400 hover:text-red-600"
                                      onClick={() =>
                                        handleDeleteNotice(notice.id)
                                      }
                                      disabled={deletingNoticeId === notice.id}
                                    >
                                      {deletingNoticeId === notice.id ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <Trash2 className="w-3.5 h-3.5" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ),
                      )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
