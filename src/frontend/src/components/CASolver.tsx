import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignLeft,
  BookOpen,
  Calculator,
  ChevronLeft,
  FileText,
  ListChecks,
  Loader2,
  Save,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { type CALevel, CA_LEVEL_META, CA_SUBJECTS } from "../data/caSubjects";
import { useActor } from "../hooks/useActor";
import { generateCASolution } from "../lib/caSolver";

interface CASolverProps {
  level: CALevel;
  subjectId: string;
  onBack: () => void;
}

type QType = "theory" | "practical" | "mcq" | "short";

const QTYPES: Array<{
  type: QType;
  label: string;
  bengali: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { type: "theory", label: "Theory", bengali: "তত্ত্ব", icon: FileText },
  {
    type: "practical",
    label: "Practical",
    bengali: "ব্যবহারিক",
    icon: Calculator,
  },
  { type: "short", label: "Short Answer", bengali: "সংক্ষিপ্ত", icon: AlignLeft },
  { type: "mcq", label: "MCQ", bengali: "বহুনির্বাচনি", icon: ListChecks },
];

const PLACEHOLDER: Record<QType, string> = {
  theory:
    "তত্ত্ব প্রশ্নটি লিখুন... (উদাহরণ: What is a Bill of Exchange? / Explain the features of GST / Define Auditing)",
  practical:
    "গাণিতিক প্রশ্নটি লিখুন... (উদাহরণ: Calculate NPV / Compute depreciation / Partnership goodwill)",
  short: "সংক্ষিপ্ত প্রশ্নটি লিখুন... (উদাহরণ: Define Goodwill / What is DIN?)",
  mcq: "MCQ প্রশ্ন লিখুন অথবা ফাঁকা রাখুন — AI স্বয়ংক্রিয়ভাবে MCQ তৈরি করবে",
};

// ─── Markdown-style renderer ──────────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let key = 0;

  function flushTable() {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer.filter((r) => !/^\|[-:\s|]+\|$/.test(r.trim()));
    const headers = rows[0]
      ?.split("|")
      .filter((_, i, a) => i > 0 && i < a.length - 1)
      .map((h) => h.trim());
    const bodyRows = rows.slice(1);
    if (headers) {
      nodes.push(
        <div key={key++} className="overflow-x-auto my-4">
          <table className="w-full text-xs border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-violet-700 text-white">
                {headers.map((h) => (
                  <th
                    key={`h-${h}`}
                    className="px-3 py-2 text-left font-semibold border border-violet-600"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => {
                const cells = row
                  .split("|")
                  .filter((_, ci, a) => ci > 0 && ci < a.length - 1)
                  .map((c) => c.trim());
                return (
                  <tr
                    key={`r-${ri}-${row.slice(0, 10)}`}
                    className={ri % 2 === 0 ? "bg-white" : "bg-violet-50"}
                  >
                    {cells.map((cell) => (
                      <td
                        key={`c-${ri}-${cell.slice(0, 10)}`}
                        className="px-3 py-2 border border-gray-200 text-foreground"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>,
      );
    }
    tableBuffer = [];
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong
          key={`inline-${i}-${part.slice(0, 5)}`}
          className="font-bold text-navy"
        >
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    );
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table rows
    if (line.trim().startsWith("|")) {
      tableBuffer.push(line);
      continue;
    }
    flushTable();

    // H2
    if (line.startsWith("## ")) {
      const text = line.slice(3);
      nodes.push(
        <h2
          key={key++}
          className="text-base font-bold text-violet-800 mt-6 mb-2 flex items-center gap-2"
        >
          {text}
        </h2>,
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="text-sm font-bold text-navy mt-4 mb-1">
          {line.slice(4)}
        </h3>,
      );
      continue;
    }

    // Divider
    if (line.trim() === "---") {
      nodes.push(<hr key={key++} className="my-3 border-border" />);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      nodes.push(
        <div
          key={key++}
          className="flex gap-2 text-sm text-foreground leading-relaxed mb-1.5"
        >
          <span className="font-bold text-violet-700 shrink-0 w-5">
            {line.match(/^(\d+)\./)?.[1]}.
          </span>
          <span>{renderInline(line.replace(/^\d+\.\s/, ""))}</span>
        </div>,
      );
      continue;
    }

    // Bullet list
    if (line.startsWith("- ")) {
      nodes.push(
        <div
          key={key++}
          className="flex gap-2 text-sm text-foreground leading-relaxed mb-1.5"
        >
          <span className="text-violet-500 shrink-0 mt-0.5">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>,
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      nodes.push(<div key={key++} className="h-1" />);
      continue;
    }

    // Normal paragraph
    nodes.push(
      <p key={key++} className="text-sm text-foreground leading-relaxed mb-1">
        {renderInline(line)}
      </p>,
    );
  }

  flushTable();
  return nodes;
}

export function CASolver({ level, subjectId, onBack }: CASolverProps) {
  const subjects = CA_SUBJECTS[level];
  const subject = subjects.find((s) => s.id === subjectId) ?? subjects[0];
  const levelMeta = CA_LEVEL_META[level];

  const [chapter, setChapter] = useState("");
  const [qType, setQType] = useState<QType>("theory");
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { actor } = useActor();

  const colorMap: Record<string, string> = {
    teal: "bg-teal-700",
    blue: "bg-blue-700",
    indigo: "bg-indigo-700",
    orange: "bg-orange-600",
    green: "bg-green-700",
    amber: "bg-amber-600",
    violet: "bg-violet-700",
    rose: "bg-rose-600",
    sky: "bg-sky-600",
    emerald: "bg-emerald-700",
  };
  const headerBg = colorMap[subject.color] ?? "bg-violet-700";

  async function handleSolve() {
    if (!chapter) {
      toast.error("অনুগ্রহ করে একটি chapter বেছে নিন");
      return;
    }
    if (qType !== "mcq" && !question.trim()) {
      toast.error("প্রশ্নটি লিখুন");
      return;
    }
    setIsSolving(true);
    setSolution("");
    await new Promise((r) => setTimeout(r, 300));
    const result = generateCASolution({
      level,
      subject: subject.label,
      chapter,
      question: question.trim(),
      questionType: qType,
    });
    setSolution(result);
    setIsSolving(false);
  }

  async function handleSave() {
    if (!actor || !solution) return;
    setIsSaving(true);
    try {
      const jsonInput = JSON.stringify({
        level,
        subject: subject.label,
        chapter,
        question: question.trim(),
        questionType: qType,
        type: "ca",
      });
      await actor.saveProblem(ProblemType.journalEntry, jsonInput, solution);
      toast.success("সমাধান সংরক্ষিত হয়েছে! ✅");
    } catch {
      toast.error("সংরক্ষণ করতে সমস্যা হয়েছে");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3 text-muted-foreground hover:text-navy -ml-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> CA Preparation Hub-এ ফিরুন
        </Button>
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${headerBg}`}
          >
            <span>{subject.icon}</span>
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl text-navy leading-tight">
              {subject.label}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subject.bengali} | {levelMeta.label}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs border ${levelMeta.badge}`}
          >
            {levelMeta.label}
          </Badge>
        </div>
      </motion.div>

      {/* Professor badge */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-5 flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5"
      >
        <span className="text-lg">🎓</span>
        <div>
          <p className="text-xs font-bold text-violet-800">
            Senior CA Professor Mode
          </p>
          <p className="text-xs text-violet-600">
            প্রতিটি উত্তর: Quick Answer → Concept → Key Elements → Scenario →
            Pro-Tip সহ
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-5"
      >
        {/* Chapter */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            Chapter / অধ্যায়
          </Label>
          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chapter বেছে নিন..." />
            </SelectTrigger>
            <SelectContent>
              {subject.chapters.map((ch) => (
                <SelectItem key={ch} value={ch}>
                  {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question Type */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            প্রশ্নের ধরন / Question Type
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QTYPES.map(({ type, label, bengali, icon: Icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => setQType(type)}
                className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  qType === type
                    ? "border-violet-600 bg-violet-50 text-violet-800"
                    : "border-border text-muted-foreground hover:border-violet-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-semibold text-xs">{bengali}</div>
                  <div className="text-xs opacity-70">{label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question input */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            প্রশ্ন লিখুন / Write Your Question
          </Label>
          <Textarea
            placeholder={PLACEHOLDER[qType]}
            className="min-h-[100px] resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSolve}
          disabled={isSolving}
          className="w-full bg-violet-700 text-white hover:bg-violet-800 font-semibold"
        >
          {isSolving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Study Guide তৈরি
              হচ্ছে...
            </>
          ) : (
            "Study Guide তৈরি করুন 🎓"
          )}
        </Button>
      </motion.div>

      {/* Solution Output */}
      <AnimatePresence>
        {solution && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-card rounded-2xl border border-border shadow-card overflow-hidden"
          >
            {/* Output header */}
            <div
              className={`${headerBg} px-5 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-white/80" />
                <span className="font-display font-bold text-white text-sm">
                  🎓 CA Study Guide — High Retention Format
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleSave}
                disabled={isSaving}
                className="text-xs bg-white/20 text-white hover:bg-white/30 border-0 h-7"
              >
                {isSaving ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Save className="w-3 h-3 mr-1" />
                )}
                Save
              </Button>
            </div>

            {/* Section tags */}
            <div className="px-5 pt-3 pb-1 flex flex-wrap gap-1.5">
              {[
                "⚡ Quick Answer",
                "📖 Breakdown",
                "🔑 Key Elements",
                "🎯 Scenario",
                "📊 Comparison",
                "💡 Pro-Tip",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-violet-100 text-violet-700 font-medium px-2 py-0.5 rounded-full border border-violet-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rendered content */}
            <div className="p-5 pt-3">{renderMarkdown(solution)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
