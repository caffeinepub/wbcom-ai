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
  BarChart2,
  BookOpen,
  Calculator,
  ChevronLeft,
  FileText,
  ListChecks,
  Loader2,
  Monitor,
  Save,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { COMMERCE_CHAPTERS } from "../data/commerceChapters";
import { useActor } from "../hooks/useActor";
import { generateCommerceSolution } from "../lib/commerceSolver";
import { ProblemSolver } from "./ProblemSolver";
import { TopicGrid } from "./TopicGrid";

interface CommerceSolverProps {
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
  accountancy: {
    label: "Accountancy",
    bengali: "হিসাববিজ্ঞান",
    icon: BookOpen,
    headerClass: "bg-teal-700",
    badgeClass: "bg-teal-100 text-teal-700 border-teal-200",
  },
  businessstudies: {
    label: "Business Studies",
    bengali: "ব্যবসায় শিক্ষা",
    icon: ShoppingBag,
    headerClass: "bg-blue-700",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  economics: {
    label: "Economics",
    bengali: "অর্থনীতি",
    icon: TrendingUp,
    headerClass: "bg-green-700",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
  },
  commercialmathematics: {
    label: "Commercial Mathematics",
    bengali: "বাণিজ্যিক গণিত",
    icon: Calculator,
    headerClass: "bg-orange-600",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
  },
  computerapplication: {
    label: "Computer Application",
    bengali: "কম্পিউটার অ্যাপ্লিকেশন",
    icon: Monitor,
    headerClass: "bg-violet-700",
    badgeClass: "bg-violet-100 text-violet-700 border-violet-200",
  },
};

type QuestionType = "essay" | "short" | "mcq" | "problem";

const ALL_QUESTION_TYPES: Array<{
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
    sub: "Long Answer",
    icon: FileText,
  },
  {
    type: "short",
    label: "Short Answer",
    bengali: "সংক্ষিপ্ত",
    sub: "Short Answer",
    icon: AlignLeft,
  },
  {
    type: "mcq",
    label: "MCQ",
    bengali: "বহুনির্বাচনি",
    sub: "Multiple Choice",
    icon: ListChecks,
  },
  {
    type: "problem",
    label: "Problem Solving",
    bengali: "সমস্যা সমাধান",
    sub: "Math / Numerical",
    icon: Calculator,
  },
];

const getMathTypes = (subject: string): QuestionType[] =>
  subject === "commercialmathematics"
    ? ["problem", "mcq", "short"]
    : ["essay", "short", "mcq"];

const PLACEHOLDER: Record<QuestionType, string> = {
  essay: "রচনামূলক প্রশ্নটি এখানে লিখুন... (উদাহরণ: ব্যবস্থাপনার নীতিগুলো বর্ণনা করো)",
  short: "সংক্ষিপ্ত প্রশ্নটি এখানে লিখুন... (উদাহরণ: GDP কী?)",
  mcq: "MCQ প্রশ্ন লিখুন অথবা শূন্য রাখুন — AI নিজেই প্রশ্ন তৈরি করবে",
  problem: "গণিতের সমস্যাটি লিখুন... (উদাহরণ: ₹5000 টাকা 10% সরল সুদে 3 বছরে কত হবে?)",
};

function AccountancySolver({
  classLevel,
  onBack,
}: { classLevel: number; onBack: () => void }) {
  const [activeTopic, setActiveTopic] = useState("journal");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4 text-muted-foreground hover:text-navy -ml-2"
        data-ocid="accountancy.back_button"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> বাণিজ্য বিভাগে ফিরুন
      </Button>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-navy leading-tight">
            Accountancy — Class {classLevel}
          </h1>
          <p className="text-sm text-muted-foreground">
            হিসাববিজ্ঞান | WBCHSE Syllabus
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TopicGrid activeTopic={activeTopic} onSelect={setActiveTopic} />
          <div className="mt-6 bg-navy rounded-xl p-5 text-white">
            <h3 className="font-display font-bold text-base mb-3">
              Quick Tips 💡
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Select a topic card on the left to switch the solver</li>
              <li>• Fill in the required fields and click Solve</li>
              <li>• Solutions follow WBCHSE &amp; CU exam format</li>
            </ul>
          </div>
        </div>
        <div>
          <ProblemSolver activeTopic={activeTopic} />
        </div>
      </div>
    </div>
  );
}

export function CommerceSolver({
  subject,
  classLevel,
  onBack,
}: CommerceSolverProps) {
  // Handle accountancy separately — uses the original Accountancy solver UI
  if (subject === "accountancy") {
    return <AccountancySolver classLevel={classLevel} onBack={onBack} />;
  }

  return (
    <CommerceSubjectSolver
      subject={subject}
      classLevel={classLevel}
      onBack={onBack}
    />
  );
}

function CommerceSubjectSolver({
  subject,
  classLevel,
  onBack,
}: CommerceSolverProps) {
  const defaultType = subject === "commercialmathematics" ? "problem" : "essay";
  const [chapter, setChapter] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>(defaultType);
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { actor } = useActor();

  const meta = SUBJECT_META[subject] ?? SUBJECT_META.businessstudies;
  const Icon = meta.icon;
  const chapters = COMMERCE_CHAPTERS[subject]?.[classLevel] ?? [];
  const availableTypes = ALL_QUESTION_TYPES.filter((qt) =>
    getMathTypes(subject).includes(qt.type),
  );

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
    await new Promise((r) => setTimeout(r, 300));
    const result = generateCommerceSolution({
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
        type: "commerce",
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
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> বাণিজ্য বিভাগে ফিরুন
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
            <SelectTrigger className="w-full">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableTypes.map(({ type, bengali, sub, icon: QIcon }) => (
              <button
                key={type}
                type="button"
                onClick={() => setQuestionType(type)}
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
        >
          {isSolving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> সমাধান তৈরি
              হচ্ছে...
            </>
          ) : (
            "সমাধান দিন ✨"
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
          >
            <div
              className={`${meta.headerClass} px-5 py-3 flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-white/80" />
                <span className="font-display font-bold text-white text-sm">
                  ✅ সমাধান / Solution
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
