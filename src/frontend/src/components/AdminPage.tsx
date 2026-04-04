import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { Principal } from "@dfinity/principal";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Gavel,
  History,
  Images,
  Library,
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
import type { LoginRecord } from "../backend";
import { loadConfig } from "../config";
import {
  QA_DATABASE,
  QUESTION_TYPE_LABELS,
  SUBJECT_AREA_LABELS,
} from "../data/qaDatabase";
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
import { StorageClient } from "../utils/StorageClient";
import { MessageImages, parseImagesFromMessage } from "./ImageUploader";
import { loadJudgments, saveJudgments } from "./LawNewsTicker";
import type { JudgmentEntry } from "./LawNewsTicker";

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
  // Law
  { label: "Law - IPC", value: "law_ipc" },
  { label: "Law - BNS", value: "law_bns" },
  { label: "Law - CrPC", value: "law_crpc" },
  { label: "Law - Constitution", value: "law_constitution" },
  { label: "Law - Contract Act", value: "law_contract" },
  { label: "Law - Cyber Law", value: "law_cyber" },
  // NEET
  { label: "NEET - Physics", value: "neet_physics" },
  { label: "NEET - Chemistry", value: "neet_chemistry" },
  { label: "NEET - Biology", value: "neet_biology" },
  // CA
  { label: "CA Foundation - Accounts", value: "ca_foundation_accounts" },
  { label: "CA Foundation - Laws", value: "ca_foundation_laws" },
  { label: "CA Inter - Accounts", value: "ca_inter_accounts" },
  { label: "CA Inter - Taxation", value: "ca_inter_taxation" },
  // CMA
  { label: "CMA Foundation", value: "cma_foundation" },
  { label: "CMA Intermediate", value: "cma_intermediate" },
  // SSC
  { label: "SSC - GK", value: "ssc_gk" },
  { label: "SSC - Math", value: "ssc_math" },
  { label: "SSC - English", value: "ssc_english" },
  { label: "SSC - Reasoning", value: "ssc_reasoning" },
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

// ─── Hidden images LS key ─────────────────────────────────────────────────────
const HIDDEN_IMAGES_KEY = "admin_hidden_image_urls";
function getHiddenImages(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HIDDEN_IMAGES_KEY) || "[]");
  } catch {
    return [];
  }
}
function hideImage(url: string) {
  const hidden = getHiddenImages();
  if (!hidden.includes(url)) {
    hidden.push(url);
    localStorage.setItem(HIDDEN_IMAGES_KEY, JSON.stringify(hidden));
  }
}

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

  // Reply state
  const [openReplyId, setOpenReplyId] = useState<bigint | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [sendingId, setSendingId] = useState<bigint | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  // Quiz form state
  const [newQ, setNewQ] = useState({
    topic: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "0",
    explanation: "",
  });
  const { mutate: addQuestion, isPending: addingQuestion } =
    useAddAdminQuestion();
  const { mutate: deleteQuestion } = useDeleteQuizQuestion();

  // Notes state
  const [addingNote, setAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<{
    id: bigint;
    title: string;
    subject: string;
    content: string;
    attachments: Array<{ name: string; type: string; data: string }>;
  } | null>(null);
  const [noteForm, setNoteForm] = useState({
    title: "",
    subject: "",
    content: "",
  });
  const [noteAttachments, setNoteAttachments] = useState<
    Array<{ name: string; type: string; data: string }>
  >([]);
  const [editAttachments, setEditAttachments] = useState<
    Array<{ name: string; type: string; data: string }>
  >([]);
  const [processingRequestId, setProcessingRequestId] = useState<bigint | null>(
    null,
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Notice board state
  const [notices, setNotices] = useState<
    Array<{ id: string; title: string; content: string; date: string }>
  >([]);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [editingNotice, setEditingNotice] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState("");

  // Q&A Bank state
  const [qaSubjectFilter, setQaSubjectFilter] = useState("all");

  // Login history state
  const [loginHistory, setLoginHistory] = useState<LoginRecord[]>([]);
  const [loadingLoginHistory, setLoadingLoginHistory] = useState(false);
  const loginHistoryFetched = useRef(false);

  // Law Judgments state
  const [judgments, setJudgments] = useState<JudgmentEntry[]>(() =>
    loadJudgments(),
  );
  const [judgmentFormOpen, setJudgmentFormOpen] = useState(false);
  const [editingJudgment, setEditingJudgment] = useState<JudgmentEntry | null>(
    null,
  );
  const [judgmentForm, setJudgmentForm] = useState({
    case: "",
    court: "",
    date: "",
    summary: "",
  });

  // Photos gallery state
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [hiddenImages, setHiddenImages] = useState<string[]>(() =>
    getHiddenImages(),
  );

  useEffect(() => {
    // Load notices
    try {
      const stored = localStorage.getItem("vidyasetu_notices");
      if (stored) setNotices(JSON.parse(stored));
    } catch {}
  }, []);

  async function waitForActor() {
    for (let i = 0; i < 30; i++) {
      const a = actorRef.current;
      const f = isFetchingRef.current;
      if (a && !f) return a;
      await new Promise((r) => setTimeout(r, 500));
    }
    return null;
  }

  // ─── Message reply ────────────────────────────────────────────────────────────
  async function handleSendReply(msgId: bigint) {
    const key = String(msgId);
    const replyText = replyTexts[key]?.trim();
    if (!replyText) {
      toast.error("উত্তর লিখুন");
      return;
    }
    setSendingId(msgId);
    try {
      const a = await waitForActor();
      if (!a) throw new Error("Actor not ready");
      await a.replyToCustomerMessage(msgId, replyText);
      setReplyTexts((prev) => ({ ...prev, [key]: "" }));
      setOpenReplyId(null);
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      toast.success("উত্তর পাঠানো হয়েছে");
    } catch {
      toast.error("উত্তর পাঠানো যায়নি");
    } finally {
      setSendingId(null);
    }
  }

  async function handleDeleteMessage(msgId: bigint) {
    setDeletingId(msgId);
    try {
      const a = await waitForActor();
      if (!a) throw new Error("Actor not ready");
      await a.deleteCustomerMessage(msgId);
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      toast.success("মুছে ফেলা হয়েছে");
    } catch {
      toast.error("মুছে ফেলা যায়নি");
    } finally {
      setDeletingId(null);
    }
  }

  // ─── File upload helper ───────────────────────────────────────────────────────
  async function handleFileUpload(
    files: FileList | null,
    setter: React.Dispatch<
      React.SetStateAction<Array<{ name: string; type: string; data: string }>>
    >,
  ) {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} খুব বড় (সর্বোচ্চ 50MB)`);
        continue;
      }

      try {
        toast.info(`${file.name} upload হচ্ছে...`);
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        if (file.size > 500 * 1024) {
          const config = await loadConfig();
          const agent = new HttpAgent({ host: config.backend_host });
          const storageClient = new StorageClient(
            config.bucket_name,
            config.storage_gateway_url,
            config.backend_canister_id,
            config.project_id,
            agent,
          );
          const { hash } = await storageClient.putFile(bytes, (p) =>
            setUploadProgress(p),
          );
          const url = await storageClient.getDirectURL(hash);
          setter((prev) => [
            ...prev,
            { name: file.name, type: file.type, data: url },
          ]);
        } else {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve((reader.result as string).split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          setter((prev) => [
            ...prev,
            { name: file.name, type: file.type, data: base64 },
          ]);
        }
        setUploadProgress(null);
        toast.success(`${file.name} upload সম্পন্ন!`);
      } catch {
        setUploadProgress(null);
        toast.error(`${file.name} upload করা যায়নি`);
      }
    }
  }

  // ─── Notes ────────────────────────────────────────────────────────────────────
  async function handleAddNote() {
    if (!noteForm.title.trim() || !noteForm.subject.trim()) {
      toast.error("শিরোনাম ও বিষয় দিন");
      return;
    }
    const a = await waitForActor();
    if (!a) {
      toast.error("সংযোগ নেই");
      return;
    }
    setAddingNote(true);
    try {
      const attachStr =
        noteAttachments.length > 0
          ? `__ATTACHMENTS__${JSON.stringify(noteAttachments)}`
          : "";
      const fullContent = noteForm.content + attachStr;
      await a.addPremiumNote(
        noteForm.title.trim(),
        noteForm.subject.trim(),
        fullContent,
      );
      setNoteForm({ title: "", subject: "", content: "" });
      setNoteAttachments([]);
      queryClient.invalidateQueries({ queryKey: ["allNotesList"] });
      toast.success("Note যোগ হয়েছে");
    } catch {
      toast.error("Note যোগ করা যায়নি");
    } finally {
      setAddingNote(false);
    }
  }

  async function handleUpdateNote() {
    if (!editingNote) return;
    const a = await waitForActor();
    if (!a) {
      toast.error("সংযোগ নেই");
      return;
    }
    try {
      const attachStr =
        editAttachments.length > 0
          ? `__ATTACHMENTS__${JSON.stringify(editAttachments)}`
          : "";
      const baseContent = editingNote.content.replace(/__ATTACHMENTS__.*$/, "");
      const fullContent = baseContent + attachStr;
      await a.editPremiumNote(
        editingNote.id,
        editingNote.title,
        editingNote.subject,
        fullContent,
      );
      setEditingNote(null);
      setEditAttachments([]);
      queryClient.invalidateQueries({ queryKey: ["allNotesList"] });
      toast.success("Note আপডেট হয়েছে");
    } catch {
      toast.error("আপডেট করা যায়নি");
    }
  }

  async function handleDeleteNote(id: bigint) {
    const a = await waitForActor();
    if (!a) {
      toast.error("সংযোগ নেই");
      return;
    }
    try {
      await a.deletePremiumNote(id);
      queryClient.invalidateQueries({ queryKey: ["allNotesList"] });
      toast.success("Note মুছে ফেলা হয়েছে");
    } catch {
      toast.error("মুছে ফেলা যায়নি");
    }
  }

  async function handleApproveRequest(requestId: bigint, userId: Principal) {
    setProcessingRequestId(requestId);
    try {
      const a = await waitForActor();
      if (!a) throw new Error("Actor not ready");
      await a.approveAccessRequest(userId);
      queryClient.invalidateQueries({ queryKey: ["allAccessRequests"] });
      toast.success("Access approved!");
    } catch {
      toast.error("Failed to approve request");
    } finally {
      setProcessingRequestId(null);
    }
  }

  async function handleRejectRequest(requestId: bigint, userId: Principal) {
    setProcessingRequestId(requestId);
    try {
      const a = await waitForActor();
      if (!a) throw new Error("Actor not ready");
      await a.rejectAccessRequest(userId);
      queryClient.invalidateQueries({ queryKey: ["allAccessRequests"] });
      toast.success("Request rejected");
    } catch {
      toast.error("Failed to reject request");
    } finally {
      setProcessingRequestId(null);
    }
  }

  // ─── renderMessages ───────────────────────────────────────────────────────────
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
        const isDeleting = deletingId !== null && String(deletingId) === key;
        const { text: msgText, imageUrls } = parseImagesFromMessage(
          msg.message,
        );

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
                  disabled={isDeleting}
                  data-ocid={`admin.delete_button.${idx + 1}`}
                  title="Remove message"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap mb-2">
              {msgText}
            </p>
            {imageUrls.length > 0 && (
              <MessageImages
                imageUrls={imageUrls}
                onImageClick={setLightboxUrl}
              />
            )}
            {existingReply && (
              <div className="rounded-md bg-teal-50 border border-teal-200 px-3 py-2 mb-3 mt-2">
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
                  disabled={isSending || !replyTexts[key]?.trim()}
                  data-ocid="admin.submit_button"
                >
                  {isSending ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Reply className="w-3 h-3 mr-1" />
                  )}
                  পাঠান / Send
                </Button>
              </div>
            )}
          </div>,
        );
      } catch {
        // skip broken messages
      }
    }
    return <div className="space-y-3">{items}</div>;
  }

  // ─── Photos Gallery ───────────────────────────────────────────────────────────
  function renderPhotosGallery() {
    if (!messages || messages.length === 0) {
      return (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.photos.empty_state"
        >
          <Images className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">কোনো ছবি পাওয়া যায়নি</p>
          <p className="text-sm mt-1">
            Students submit photos via Customer Support or Doubt Section.
          </p>
        </div>
      );
    }

    // Collect all images from all messages
    const allImages: Array<{
      url: string;
      senderName: string;
      timestamp: unknown;
      msgId: string;
    }> = [];

    for (const msg of messages) {
      const { imageUrls } = parseImagesFromMessage(msg.message);
      for (const url of imageUrls) {
        if (!hiddenImages.includes(url)) {
          allImages.push({
            url,
            senderName: msg.senderName || "Anonymous",
            timestamp: msg.timestamp,
            msgId: String(msg.id),
          });
        }
      }
    }

    if (allImages.length === 0) {
      return (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="admin.photos.empty_state"
        >
          <Images className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">এখনো কোনো ছবি পাঠানো হয়নি</p>
          <p className="text-sm mt-1">
            When students attach photos to their messages, they will appear
            here.
          </p>
        </div>
      );
    }

    return (
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          {allImages.length}টি ছবি পাওয়া গেছে / {allImages.length} images found
        </p>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          data-ocid="admin.photos.table"
        >
          {allImages.map((img, idx) => (
            <div
              key={`${img.msgId}-${idx}`}
              className="relative group rounded-lg overflow-hidden border border-navy/10 bg-navy/5"
              data-ocid={`admin.photos.item.${idx + 1}`}
            >
              <button
                type="button"
                className="w-full aspect-square overflow-hidden"
                onClick={() => setLightboxUrl(img.url)}
                aria-label="View image"
              >
                <img
                  src={img.url}
                  alt={`Submitted by ${img.senderName}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </button>
              <div className="p-2 bg-background">
                <p className="text-xs font-semibold text-navy truncate">
                  {img.senderName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(safeTimestamp(img.timestamp)).toLocaleDateString(
                    "bn-IN",
                  )}
                </p>
              </div>
              {/* Hover overlay with actions */}
              <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
                <a
                  href={img.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-black/60 rounded flex items-center justify-center hover:bg-black/80 transition-colors"
                  title="Download"
                >
                  <Download className="w-3 h-3 text-white" />
                </a>
                <button
                  type="button"
                  className="w-6 h-6 bg-red-500/80 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
                  onClick={() => {
                    hideImage(img.url);
                    setHiddenImages(getHiddenImages());
                    toast.success("ছবি লুকানো হয়েছে");
                  }}
                  title="Hide image"
                  data-ocid={`admin.photos.delete_button.${idx + 1}`}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Notice Board ─────────────────────────────────────────────────────────────
  function saveNotices(
    updated: Array<{
      id: string;
      title: string;
      content: string;
      date: string;
    }>,
  ) {
    setNotices(updated);
    localStorage.setItem("vidyasetu_notices", JSON.stringify(updated));
  }

  function handleAddNotice() {
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) {
      toast.error("শিরোনাম ও বিষয়বস্তু দিন");
      return;
    }
    const newNotice = {
      id: Date.now().toString(),
      title: noticeForm.title.trim(),
      content: noticeForm.content.trim(),
      date: scheduledDate || new Date().toISOString(),
    };
    const updated = [newNotice, ...notices].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    saveNotices(updated);
    setNoticeForm({ title: "", content: "", date: "" });
    setScheduledDate("");
    toast.success("Notice যোগ হয়েছে");
  }

  function handleDeleteNotice(id: string) {
    const updated = notices.filter((n) => n.id !== id);
    saveNotices(updated);
    toast.success("Notice মুছে ফেলা হয়েছে");
  }

  function handleUpdateNotice() {
    if (!editingNotice) return;
    const updated = notices.map((n) =>
      n.id === editingNotice
        ? {
            ...n,
            title: noticeForm.title,
            content: noticeForm.content,
            date: scheduledDate || n.date,
          }
        : n,
    );
    saveNotices(updated);
    setEditingNotice(null);
    setNoticeForm({ title: "", content: "", date: "" });
    setScheduledDate("");
    toast.success("Notice আপডেট হয়েছে");
  }

  // ─── Law Judgments ────────────────────────────────────────────────────────────
  function handleSaveJudgment() {
    if (!judgmentForm.case.trim() || !judgmentForm.summary.trim()) {
      toast.error("Case name ও summary দিন");
      return;
    }
    let updated: JudgmentEntry[];
    if (editingJudgment) {
      updated = judgments.map((j) =>
        j.id === editingJudgment.id ? { ...j, ...judgmentForm } : j,
      );
    } else {
      updated = [
        {
          id: Date.now(),
          ...judgmentForm,
          fullSummary: judgmentForm.summary,
        },
        ...judgments,
      ];
    }
    setJudgments(updated);
    saveJudgments(updated);
    setJudgmentFormOpen(false);
    setEditingJudgment(null);
    setJudgmentForm({ case: "", court: "", date: "", summary: "" });
    toast.success(editingJudgment ? "Updated" : "Judgment যোগ হয়েছে");
  }

  // ─── Main render ──────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Vidya Setu AI — Admin Control Panel
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="border-navy/15">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-navy" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Users
              </p>
            </div>
            {loadingCount ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-bold text-navy">
                {userCount !== undefined ? String(userCount) : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Registered users
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/15">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-navy" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Messages
              </p>
            </div>
            {loadingMessages ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-bold text-navy">
                {messages ? messages.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Support messages
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/15">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-navy" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Notes
              </p>
            </div>
            {loadingNotesList ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-bold text-navy">
                {notesList ? notesList.length : "—"}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">Premium notes</p>
          </CardContent>
        </Card>
        <Card className="border-navy/15">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-navy" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Questions
              </p>
            </div>
            {loadingQuiz ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-bold text-navy">
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
            data-ocid="admin.messages.tab"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="quiz"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.quiz.tab"
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
            data-ocid="admin.noticeboard.tab"
          >
            <Bell className="w-3.5 h-3.5 mr-1.5" />
            Notice Board
          </TabsTrigger>
          <TabsTrigger
            value="qabank"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.tab"
          >
            <Library className="w-3.5 h-3.5 mr-1.5" />
            Q&A Bank
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.tab"
          >
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="loginhistory"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.tab"
            onClick={async () => {
              if (loginHistoryFetched.current) return;
              loginHistoryFetched.current = true;
              setLoadingLoginHistory(true);
              try {
                const data = await actor?.getLoginHistory();
                setLoginHistory(data ?? []);
              } catch {
                toast.error("Failed to load login history");
              } finally {
                setLoadingLoginHistory(false);
              }
            }}
          >
            <History className="w-3.5 h-3.5 mr-1.5" />
            লগইন ইতিহাস
          </TabsTrigger>
          <TabsTrigger
            value="lawjudgments"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.tab"
          >
            <Gavel className="w-3.5 h-3.5 mr-1.5" />
            Law Judgments
          </TabsTrigger>
          <TabsTrigger
            value="photos"
            className="data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
            data-ocid="admin.photos.tab"
          >
            <Images className="w-3.5 h-3.5 mr-1.5" />📸 ছবি গ্যালারি
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
                {OPTION_KEYS.map((key, i) => (
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
                ))}
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    সঠিক উত্তর / Correct Answer *
                  </Label>
                  <Select
                    value={newQ.correctOption}
                    onValueChange={(v) =>
                      setNewQ((p) => ({ ...p, correctOption: v }))
                    }
                  >
                    <SelectTrigger
                      className="border-navy/20"
                      data-ocid="admin.select"
                    >
                      <SelectValue placeholder="Option বেছে নিন" />
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
                    Topic *
                  </Label>
                  <Select
                    value={newQ.topic}
                    onValueChange={(v) => setNewQ((p) => ({ ...p, topic: v }))}
                  >
                    <SelectTrigger
                      className="border-navy/20"
                      data-ocid="admin.select"
                    >
                      <SelectValue placeholder="Topic বেছে নিন" />
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
                    Explanation (optional)
                  </Label>
                  <Textarea
                    placeholder="ব্যাখ্যা লিখুন (ঐচ্ছিক)..."
                    className="min-h-16 text-sm border-navy/20"
                    value={newQ.explanation}
                    onChange={(e) =>
                      setNewQ((p) => ({ ...p, explanation: e.target.value }))
                    }
                    data-ocid="admin.textarea"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  if (
                    !newQ.question.trim() ||
                    !newQ.optionA.trim() ||
                    !newQ.optionB.trim() ||
                    !newQ.optionC.trim() ||
                    !newQ.optionD.trim() ||
                    !newQ.topic
                  ) {
                    toast.error("সব required field পূরণ করুন");
                    return;
                  }
                  addQuestion(
                    {
                      question: newQ.question.trim(),
                      optionA: newQ.optionA.trim(),
                      optionB: newQ.optionB.trim(),
                      optionC: newQ.optionC.trim(),
                      optionD: newQ.optionD.trim(),
                      correctIndex: BigInt(newQ.correctOption),
                      explanation: newQ.explanation.trim(),
                      topic: newQ.topic,
                    },
                    {
                      onSuccess: () => {
                        setNewQ({
                          topic: "",
                          question: "",
                          optionA: "",
                          optionB: "",
                          optionC: "",
                          optionD: "",
                          correctOption: "0",
                          explanation: "",
                        });
                        toast.success("প্রশ্ন যোগ হয়েছে");
                      },
                      onError: () => toast.error("প্রশ্ন যোগ করা যায়নি"),
                    },
                  );
                }}
                disabled={addingQuestion}
                className="bg-navy text-white hover:bg-navy/90"
                data-ocid="admin.submit_button"
              >
                {addingQuestion ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                প্রশ্ন যোগ করুন
              </Button>
            </CardContent>
          </Card>

          {/* Questions list */}
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy">
                Admin Questions ({quizQuestions ? quizQuestions.length : 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingQuiz ? (
                <Skeleton className="h-12 w-full" />
              ) : !quizQuestions || quizQuestions.length === 0 ? (
                <p className="text-muted-foreground text-sm">কোনো প্রশ্ন নেই।</p>
              ) : (
                <div className="space-y-2" data-ocid="admin.quiz.list">
                  {quizQuestions.map((q, idx) => (
                    <div
                      key={String(q.id)}
                      className="flex items-start gap-2 p-3 border border-navy/10 rounded-lg"
                      data-ocid={`admin.quiz.item.${idx + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy truncate">
                          {q.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Topic: {q.topic} | Correct: Option{" "}
                          {["A", "B", "C", "D"][Number(q.correctIndex)]}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive shrink-0"
                        onClick={() =>
                          deleteQuestion(q.id, {
                            onSuccess: () => toast.success("মুছে ফেলা হয়েছে"),
                            onError: () => toast.error("মুছে ফেলা যায়নি"),
                          })
                        }
                        data-ocid={`admin.quiz.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          {/* Add Note Form */}
          <Card className="border-navy/20 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingNote ? "Note সম্পাদনা করুন" : "নতুন Note যোগ করুন"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    শিরোনাম / Title *
                  </Label>
                  <Input
                    placeholder="Note-এর শিরোনাম"
                    className="border-navy/20"
                    value={editingNote ? editingNote.title : noteForm.title}
                    onChange={(e) =>
                      editingNote
                        ? setEditingNote({
                            ...editingNote,
                            title: e.target.value,
                          })
                        : setNoteForm((p) => ({ ...p, title: e.target.value }))
                    }
                    data-ocid="admin.notes.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    বিষয় / Subject *
                  </Label>
                  <Input
                    placeholder="বিষয় (যেমন: Accountancy Class 12)"
                    className="border-navy/20"
                    value={editingNote ? editingNote.subject : noteForm.subject}
                    onChange={(e) =>
                      editingNote
                        ? setEditingNote({
                            ...editingNote,
                            subject: e.target.value,
                          })
                        : setNoteForm((p) => ({
                            ...p,
                            subject: e.target.value,
                          }))
                    }
                    data-ocid="admin.notes.input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    বিষয়বস্তু / Content
                  </Label>
                  <Textarea
                    placeholder="Note-এর বিষয়বস্তু..."
                    className="min-h-24 border-navy/20"
                    value={
                      editingNote
                        ? editingNote.content.replace(/__ATTACHMENTS__.*$/, "")
                        : noteForm.content
                    }
                    onChange={(e) =>
                      editingNote
                        ? setEditingNote({
                            ...editingNote,
                            content: e.target.value,
                          })
                        : setNoteForm((p) => ({
                            ...p,
                            content: e.target.value,
                          }))
                    }
                    data-ocid="admin.notes.textarea"
                  />
                </div>
                {/* File upload */}
                <div className="sm:col-span-2">
                  <Label className="text-xs font-semibold text-navy mb-1 block">
                    Files (PDF / Image)
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      multiple
                      className="hidden"
                      id="note-file-upload"
                      onChange={(e) =>
                        handleFileUpload(
                          e.target.files,
                          editingNote ? setEditAttachments : setNoteAttachments,
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-navy/20 text-navy text-xs"
                      onClick={() =>
                        document.getElementById("note-file-upload")?.click()
                      }
                      data-ocid="admin.notes.upload_button"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      ফাইল যোগ করুন
                    </Button>
                    {uploadProgress !== null && (
                      <span className="text-xs text-muted-foreground">
                        Uploading... {uploadProgress}%
                      </span>
                    )}
                  </div>
                  {/* Show attachments */}
                  {(editingNote ? editAttachments : noteAttachments).length >
                    0 && (
                    <div className="mt-2 space-y-1">
                      {(editingNote ? editAttachments : noteAttachments).map(
                        (att, i) => (
                          <div
                            key={`${att.name}-${i}`}
                            className="flex items-center gap-2 text-xs text-navy"
                          >
                            <FileText className="w-3 h-3" />
                            <span className="truncate max-w-xs">
                              {att.name}
                            </span>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                if (editingNote) {
                                  setEditAttachments((prev) =>
                                    prev.filter((_, j) => j !== i),
                                  );
                                } else {
                                  setNoteAttachments((prev) =>
                                    prev.filter((_, j) => j !== i),
                                  );
                                }
                              }}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  disabled={addingNote}
                  className="bg-navy text-white hover:bg-navy/90"
                  data-ocid="admin.notes.submit_button"
                >
                  {addingNote ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : editingNote ? (
                    <Pencil className="w-4 h-4 mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingNote ? "আপডেট করুন" : "Note যোগ করুন"}
                </Button>
                {editingNote && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingNote(null);
                      setEditAttachments([]);
                    }}
                    data-ocid="admin.notes.cancel_button"
                  >
                    বাতিল
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Access Requests */}
          {!loadingRequests && accessRequests && accessRequests.length > 0 && (
            <Card className="border-amber-200 bg-amber-50/30 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-amber-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Access Requests ({accessRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accessRequests.map((req, idx) => (
                    <div
                      key={String(req.id)}
                      className="flex items-center justify-between gap-2 p-3 border border-amber-200 rounded-lg bg-white"
                      data-ocid={`admin.notes.request.${idx + 1}`}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {req.userName || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            safeTimestamp(req.requestedAt),
                          ).toLocaleString("bn-IN")}
                        </p>
                        <Badge
                          className={`text-[10px] mt-1 ${STATUS_COLORS[req.status] || ""}`}
                        >
                          {req.status}
                        </Badge>
                      </div>
                      {req.status === "pending" && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="bg-green-600 text-white h-7 px-2 text-xs hover:bg-green-700"
                            disabled={processingRequestId !== null}
                            onClick={() =>
                              handleApproveRequest(req.id, req.userId)
                            }
                            data-ocid="admin.notes.confirm_button"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 h-7 px-2 text-xs"
                            disabled={processingRequestId !== null}
                            onClick={() =>
                              handleRejectRequest(req.id, req.userId)
                            }
                            data-ocid="admin.notes.cancel_button"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes list */}
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy">
                Premium Notes ({notesList ? notesList.length : 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingNotesList ? (
                <Skeleton className="h-12 w-full" />
              ) : !notesList || notesList.length === 0 ? (
                <p
                  className="text-muted-foreground text-sm"
                  data-ocid="admin.notes.empty_state"
                >
                  কোনো note নেই।
                </p>
              ) : (
                <div className="space-y-2">
                  {notesList.map((note, idx) => (
                    <div
                      key={String(note.id)}
                      className="flex items-start gap-2 p-3 border border-navy/10 rounded-lg"
                      data-ocid={`admin.notes.item.${idx + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy truncate">
                          {note.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {note.subject}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-navy"
                          onClick={() => {
                            const attachStr =
                              note.content.match(/__ATTACHMENTS__(.*)$/);
                            const parsedAttachments = attachStr
                              ? JSON.parse(attachStr[1])
                              : [];
                            setEditingNote({
                              id: note.id,
                              title: note.title,
                              subject: note.subject,
                              content: note.content.replace(
                                /__ATTACHMENTS__.*$/,
                                "",
                              ),
                              attachments: parsedAttachments,
                            });
                            setEditAttachments(parsedAttachments);
                          }}
                          data-ocid={`admin.notes.edit_button.${idx + 1}`}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-500"
                          onClick={() => handleDeleteNote(note.id)}
                          data-ocid={`admin.notes.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notice Board Tab */}
        <TabsContent value="noticeboard">
          <Card className="border-navy/20 shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Bell className="w-4 h-4" />
                {editingNotice ? "Notice সম্পাদনা" : "নতুন Notice যোগ করুন"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-navy mb-1 block">
                  শিরোনাম / Title *
                </Label>
                <Input
                  placeholder="Notice-এর শিরোনাম"
                  className="border-navy/20"
                  value={noticeForm.title}
                  onChange={(e) =>
                    setNoticeForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="admin.noticeboard.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-navy mb-1 block">
                  বিষয়বস্তু / Content *
                </Label>
                <Textarea
                  placeholder="Notice-এর বিষয়বস্তু..."
                  className="min-h-32 border-navy/20"
                  value={noticeForm.content}
                  onChange={(e) =>
                    setNoticeForm((p) => ({ ...p, content: e.target.value }))
                  }
                  data-ocid="admin.noticeboard.textarea"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-navy mb-1 block">
                  Schedule Date (optional)
                </Label>
                <Input
                  type="datetime-local"
                  className="border-navy/20"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  data-ocid="admin.noticeboard.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={editingNotice ? handleUpdateNotice : handleAddNotice}
                  className="bg-navy text-white hover:bg-navy/90"
                  data-ocid="admin.noticeboard.submit_button"
                >
                  {editingNotice ? "আপডেট করুন" : "Notice যোগ করুন"}
                </Button>
                {editingNotice && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingNotice(null);
                      setNoticeForm({ title: "", content: "", date: "" });
                      setScheduledDate("");
                    }}
                    data-ocid="admin.noticeboard.cancel_button"
                  >
                    বাতিল
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notices List */}
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy">
                Notice Board ({notices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notices.length === 0 ? (
                <p
                  className="text-muted-foreground text-sm"
                  data-ocid="admin.noticeboard.empty_state"
                >
                  কোনো notice নেই।
                </p>
              ) : (
                <div className="space-y-3" data-ocid="admin.noticeboard.list">
                  {notices.map((n, idx) => (
                    <div
                      key={n.id}
                      className="p-3 border border-navy/10 rounded-lg"
                      data-ocid={`admin.noticeboard.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-navy">
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(n.date).toLocaleString("bn-IN")}
                          </p>
                          <p className="text-sm mt-1 text-foreground/80 whitespace-pre-wrap line-clamp-3">
                            {n.content}
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-navy"
                            onClick={() => {
                              setEditingNotice(n.id);
                              setNoticeForm({
                                title: n.title,
                                content: n.content,
                                date: n.date,
                              });
                              setScheduledDate(n.date);
                            }}
                            data-ocid={`admin.noticeboard.edit_button.${idx + 1}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-500"
                            onClick={() => handleDeleteNotice(n.id)}
                            data-ocid={`admin.noticeboard.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Q&A Bank Tab */}
        <TabsContent value="qabank">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                  <Library className="w-4 h-4" />
                  Q&A Bank Management
                </CardTitle>
                <Select
                  value={qaSubjectFilter}
                  onValueChange={setQaSubjectFilter}
                >
                  <SelectTrigger
                    className="w-40 border-navy/20 text-xs"
                    data-ocid="admin.qabank.select"
                  >
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {Object.entries(SUBJECT_AREA_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(() => {
                  const filtered =
                    qaSubjectFilter === "all"
                      ? QA_DATABASE
                      : QA_DATABASE.filter(
                          (q) => q.subjectArea === qaSubjectFilter,
                        );
                  if (filtered.length === 0) {
                    return (
                      <p
                        className="text-muted-foreground text-sm py-4"
                        data-ocid="admin.qabank.empty_state"
                      >
                        কোনো প্রশ্ন নেই।
                      </p>
                    );
                  }
                  return filtered.slice(0, 50).map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-3 border border-navy/10 rounded-lg"
                      data-ocid={`admin.qabank.item.${idx + 1}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy line-clamp-2">
                            {q.questionEn}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px]">
                              {SUBJECT_AREA_LABELS[q.subjectArea]?.en ||
                                q.subjectArea}
                            </Badge>
                            <Badge variant="outline" className="text-[10px]">
                              {QUESTION_TYPE_LABELS[q.questionType]?.en ||
                                q.questionType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
                <p className="text-xs text-muted-foreground mt-4">
                  Showing first 50 of {QA_DATABASE.length} questions. Filter by
                  subject to see specific questions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Users className="w-4 h-4" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">Total Users</TableCell>
                    <TableCell>
                      {loadingCount ? (
                        <Skeleton className="h-4 w-8" />
                      ) : (
                        String(userCount ?? 0)
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">
                      Support Messages
                    </TableCell>
                    <TableCell>{messages ? messages.length : 0}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Total
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">Premium Notes</TableCell>
                    <TableCell>{notesList ? notesList.length : 0}</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        Published
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">
                      Quiz Questions
                    </TableCell>
                    <TableCell>
                      {quizQuestions ? quizQuestions.length : 0}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        Admin-added
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">Q&A Database</TableCell>
                    <TableCell>{QA_DATABASE.length}</TableCell>
                    <TableCell>
                      <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                        Static
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-ocid="admin.analytics.row">
                    <TableCell className="font-medium">
                      Access Requests
                    </TableCell>
                    <TableCell>
                      {accessRequests ? accessRequests.length : 0}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        Pending Review
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Login History Tab */}
        <TabsContent value="loginhistory">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <History className="w-4 h-4" />
                User Login History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingLoginHistory ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.loginhistory.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : loginHistory.length === 0 ? (
                <div
                  className="text-center py-10 text-muted-foreground"
                  data-ocid="admin.loginhistory.empty_state"
                >
                  <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>কোনো লগইন ইতিহাস নেই।</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Login Time</TableHead>
                      <TableHead>Principal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...loginHistory]
                      .sort(
                        (a, b) =>
                          safeTimestamp(b.loginAt) - safeTimestamp(a.loginAt),
                      )
                      .map((record, idx) => (
                        <TableRow
                          key={`${String(record.principal)}-${idx}`}
                          data-ocid={`admin.loginhistory.row.${idx + 1}`}
                        >
                          <TableCell className="font-medium">
                            {record.name || "Unknown"}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              safeTimestamp(record.loginAt),
                            ).toLocaleString("bn-IN")}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {record.principal
                              ? `${record.principal.toString().slice(0, 12)}...`
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Law Judgments Tab */}
        <TabsContent value="lawjudgments">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                  <Gavel className="w-4 h-4" />
                  Law Judgments Ticker
                </CardTitle>
                <Button
                  size="sm"
                  className="bg-navy text-white hover:bg-navy/90 text-xs"
                  onClick={() => {
                    setEditingJudgment(null);
                    setJudgmentForm({
                      case: "",
                      court: "",
                      date: "",
                      summary: "",
                    });
                    setJudgmentFormOpen(true);
                  }}
                  data-ocid="admin.judgment.open_modal_button"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  নতুন Judgment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {judgmentFormOpen && (
                <div className="border border-navy/20 rounded-lg p-4 mb-4 space-y-3 bg-navy/5">
                  <h3 className="text-sm font-semibold text-navy">
                    {editingJudgment
                      ? "Judgment সম্পাদনা"
                      : "নতুন Judgment যোগ করুন"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">
                        Case Name *
                      </Label>
                      <Input
                        placeholder="Case Name v. Respondent (Year)"
                        className="text-sm border-navy/20"
                        value={judgmentForm.case}
                        onChange={(e) =>
                          setJudgmentForm((p) => ({
                            ...p,
                            case: e.target.value,
                          }))
                        }
                        data-ocid="admin.judgment.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">
                        Court
                      </Label>
                      <Input
                        placeholder="Supreme Court of India"
                        className="text-sm border-navy/20"
                        value={judgmentForm.court}
                        onChange={(e) =>
                          setJudgmentForm((p) => ({
                            ...p,
                            court: e.target.value,
                          }))
                        }
                        data-ocid="admin.judgment.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">
                        Date
                      </Label>
                      <Input
                        placeholder="2024-01-15"
                        className="text-sm border-navy/20"
                        value={judgmentForm.date}
                        onChange={(e) =>
                          setJudgmentForm((p) => ({
                            ...p,
                            date: e.target.value,
                          }))
                        }
                        data-ocid="admin.judgment.input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs font-semibold mb-1 block">
                        Summary *
                      </Label>
                      <Textarea
                        placeholder="One-line summary of the judgment..."
                        className="min-h-16 text-sm border-navy/20"
                        value={judgmentForm.summary}
                        onChange={(e) =>
                          setJudgmentForm((p) => ({
                            ...p,
                            summary: e.target.value,
                          }))
                        }
                        data-ocid="admin.judgment.textarea"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-navy text-white hover:bg-navy/90 text-xs"
                      onClick={handleSaveJudgment}
                      data-ocid="admin.judgment.confirm_button"
                    >
                      {editingJudgment ? "আপডেট করুন" : "যোগ করুন"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        setJudgmentFormOpen(false);
                        setEditingJudgment(null);
                      }}
                      data-ocid="admin.judgment.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              <div className="space-y-2" data-ocid="admin.judgment.list">
                {judgments.map((j, idx) => (
                  <div
                    key={j.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-navy/10 bg-white hover:bg-navy/2 transition-colors"
                    data-ocid={`admin.judgment.item.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-navy truncate">
                        {j.case}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {j.court} — {j.date}
                      </p>
                      <p className="text-[11px] text-foreground/70 mt-1 line-clamp-2">
                        {j.summary}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-navy"
                        onClick={() => {
                          setEditingJudgment(j);
                          setJudgmentForm({
                            case: j.case,
                            court: j.court,
                            date: j.date,
                            summary: j.summary,
                          });
                          setJudgmentFormOpen(true);
                        }}
                        data-ocid="admin.judgment.edit_button"
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-500"
                        onClick={() => {
                          const updated = judgments.filter(
                            (x) => x.id !== j.id,
                          );
                          setJudgments(updated);
                          saveJudgments(updated);
                          toast.success("Deleted");
                        }}
                        data-ocid="admin.judgment.delete_button"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Gallery Tab */}
        <TabsContent value="photos">
          <Card className="border-navy/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-navy flex items-center gap-2">
                <Images className="w-4 h-4" />
                Student Photo Gallery
                <span className="text-xs font-normal text-muted-foreground ml-2">
                  (ছাত্রদের পাঠানো সব ছবি)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMessages ? (
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                  data-ocid="admin.photos.loading_state"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              ) : (
                renderPhotosGallery()
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lightbox */}
      <Dialog open={!!lightboxUrl} onOpenChange={() => setLightboxUrl(null)}>
        <DialogContent
          className="max-w-3xl p-2 bg-black/90 border-none"
          data-ocid="admin.photos.dialog"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
          </DialogHeader>
          {lightboxUrl && (
            <img
              src={lightboxUrl}
              alt="Full size preview"
              className="w-full max-h-[80vh] object-contain rounded"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
