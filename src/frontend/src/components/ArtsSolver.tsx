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
  BookMarked,
  BookOpen,
  Brain,
  ChevronLeft,
  FileText,
  Globe,
  Landmark,
  ListChecks,
  Loader2,
  Palette,
  Save,
  Scale,
  ScrollText,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { ARTS_CHAPTERS } from "../data/artsChapters";
import { useActor } from "../hooks/useActor";
import { generateArtsSolution } from "../lib/artsSolver";

interface ArtsSolverProps {
  subject: string;
  classLevel: number;
  onBack: () => void;
}

const SUBJECT_META: Record<
  string,
  {
    label: string;
    bengali: string;
    icon: React.ComponentType<{ className?: string }>;
    headerClass: string;
    badgeClass: string;
  }
> = {
  bengali: {
    label: "Bengali",
    bengali: "বাংলা",
    icon: BookOpen,
    headerClass: "bg-rose-600",
    badgeClass: "bg-rose-100 text-rose-700 border-rose-200",
  },
  english: {
    label: "English",
    bengali: "ইংরেজি",
    icon: BookMarked,
    headerClass: "bg-blue-600",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  history: {
    label: "History",
    bengali: "ইতিহাস",
    icon: Landmark,
    headerClass: "bg-amber-600",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  geography: {
    label: "Geography",
    bengali: "ভূগোল",
    icon: Globe,
    headerClass: "bg-green-600",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
  },
  politicalscience: {
    label: "Political Science",
    bengali: "রাষ্ট্রবিজ্ঞান",
    icon: Scale,
    headerClass: "bg-indigo-600",
    badgeClass: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  philosophy: {
    label: "Philosophy",
    bengali: "দর্শন",
    icon: Brain,
    headerClass: "bg-violet-600",
    badgeClass: "bg-violet-100 text-violet-700 border-violet-200",
  },
  sociology: {
    label: "Sociology",
    bengali: "সমাজবিজ্ঞান",
    icon: Users,
    headerClass: "bg-teal-600",
    badgeClass: "bg-teal-100 text-teal-700 border-teal-200",
  },
  sanskrit: {
    label: "Sanskrit",
    bengali: "সংস্কৃত",
    icon: ScrollText,
    headerClass: "bg-orange-600",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

type QuestionType = "essay" | "short" | "mcq";

const QUESTION_TYPES: Array<{
  type: QuestionType;
  label: string;
  bengali: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    type: "essay",
    label: "Essay",
    bengali: "রচনামূলক",
    sub: "Long Answer (৪০০-৬০০ words)",
    icon: FileText,
  },
  {
    type: "short",
    label: "Short Answer",
    bengali: "সংক্ষিপ্ত",
    sub: "Short Answer (১৫০-২০০ words)",
    icon: AlignLeft,
  },
  {
    type: "mcq",
    label: "MCQ",
    bengali: "বহুনির্বাচনি",
    sub: "Multiple Choice Question",
    icon: ListChecks,
  },
];

const PLACEHOLDER: Record<QuestionType, string> = {
  essay:
    "রচনামূলক প্রশ্নটি এখানে লিখুন... (উদাহরণ: মৌর্য সাম্রাজ্যের উত্থান ও পতনের কারণ বর্ণনা করো)",
  short: "সংক্ষিপ্ত প্রশ্নটি এখানে লিখুন... (উদাহরণ: সন্ধি কাকে বলে?)",
  mcq: "MCQ প্রশ্নটি লিখুন বা শূন্য রাখুন — AI নিজেই প্রশ্ন তৈরি করবে",
};

export function ArtsSolver({ subject, classLevel, onBack }: ArtsSolverProps) {
  const [chapter, setChapter] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("essay");
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { actor } = useActor();

  const meta = SUBJECT_META[subject] ?? SUBJECT_META.history;
  const Icon = meta.icon;
  const chapters = ARTS_CHAPTERS[subject]?.[classLevel] ?? [];

  async function handleSolve() {
    if (!chapter) {
      toast.error("অনুগ্রহ করে একটি অধ্যায় বেছে নিন");
      return;
    }
    if (questionType !== "mcq" && !question.trim()) {
      toast.error("প্রশ্নটি লিখুন");
      return;
    }
    setIsSolving(true);
    setSolution("");
    await new Promise((r) => setTimeout(r, 350));
    const result = generateArtsSolution({
      subject,
      classLevel,
      chapter,
      question: question.trim(),
      type: questionType,
    });
    setSolution(result);
    setIsSolving(false);
  }

  async function handleSave() {
    if (!actor || !solution) return;
    setIsSaving(true);
    try {
      const jsonInput = JSON.stringify({
        subject,
        chapter,
        classLevel,
        question: question.trim(),
        type: "arts",
        questionType,
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
          data-ocid="arts.secondary_button"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> কলা বিভাগে ফিরুন
        </Button>
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${meta.headerClass}`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-navy leading-tight">
              {meta.label} — Class {classLevel}
            </h1>
            <p className="text-sm text-muted-foreground">
              {meta.bengali} | WBCHSE Syllabus
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`ml-auto text-xs ${meta.badgeClass} border`}
          >
            Class {classLevel}
          </Badge>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-5"
      >
        {/* Chapter selector */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            অধ্যায় / Chapter
          </Label>
          <Select value={chapter} onValueChange={setChapter}>
            <SelectTrigger data-ocid="arts.select" className="w-full">
              <SelectValue placeholder="অধ্যায় বেছে নিন..." />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((ch) => (
                <SelectItem key={ch} value={ch}>
                  {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question type */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            প্রশ্নের ধরন / Question Type
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {QUESTION_TYPES.map(({ type, bengali, sub, icon: QIcon }) => (
              <button
                key={type}
                type="button"
                onClick={() => setQuestionType(type)}
                data-ocid="arts.toggle"
                className={`flex flex-col items-start gap-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  questionType === type
                    ? "border-navy bg-navy/5 text-navy"
                    : "border-border text-muted-foreground hover:border-navy/40"
                }`}
              >
                <QIcon className="w-4 h-4 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-xs">{bengali}</div>
                  <div className="text-xs opacity-70 leading-tight">{sub}</div>
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
            data-ocid="arts.textarea"
            placeholder={PLACEHOLDER[questionType]}
            className="min-h-[100px] resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSolve}
          disabled={isSolving}
          className="w-full bg-navy text-white hover:bg-navy/90 font-semibold"
          data-ocid="arts.submit_button"
        >
          {isSolving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> উত্তর তৈরি
              হচ্ছে...
            </>
          ) : (
            "উত্তর দিন ✨"
          )}
        </Button>
      </motion.div>

      {/* Solution */}
      <AnimatePresence>
        {solution && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-card rounded-2xl border border-border shadow-card overflow-hidden"
            data-ocid="arts.panel"
          >
            <div
              className={`${meta.headerClass} px-5 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-white/80" />
                <span className="font-display font-bold text-white text-sm">
                  ✅ উত্তর / Answer
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleSave}
                disabled={isSaving}
                className="text-xs bg-white/20 text-white hover:bg-white/30 border-0 h-7"
                data-ocid="arts.save_button"
              >
                {isSaving ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Save className="w-3 h-3 mr-1" />
                )}
                Save
              </Button>
            </div>
            <div className="p-5">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-body leading-relaxed">
                {solution}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
