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
  Atom,
  BookOpen,
  Calculator,
  ChevronLeft,
  Dna,
  FlaskConical,
  Loader2,
  Save,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { SCIENCE_CHAPTERS } from "../data/scienceChapters";
import { useActor } from "../hooks/useActor";
import { generateScienceSolution } from "../lib/scienceSolver";

interface ScienceSolverProps {
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
    color: string;
    headerClass: string;
    badgeClass: string;
  }
> = {
  physics: {
    label: "Physics",
    bengali: "পদার্থবিজ্ঞান",
    icon: Atom,
    color: "blue",
    headerClass: "bg-blue-600",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  chemistry: {
    label: "Chemistry",
    bengali: "রসায়নবিজ্ঞান",
    icon: FlaskConical,
    color: "emerald",
    headerClass: "bg-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  biology: {
    label: "Biology",
    bengali: "জীববিজ্ঞান",
    icon: Dna,
    color: "purple",
    headerClass: "bg-purple-600",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200",
  },
  mathematics: {
    label: "Mathematics",
    bengali: "গণিত",
    icon: Calculator,
    color: "orange",
    headerClass: "bg-orange-600",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-200",
  },
};

export function ScienceSolver({
  subject,
  classLevel,
  onBack,
}: ScienceSolverProps) {
  const [chapter, setChapter] = useState("");
  const [problemType, setProblemType] = useState<"theory" | "numerical">(
    "theory",
  );
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { actor } = useActor();

  const meta = SUBJECT_META[subject] ?? SUBJECT_META.physics;
  const Icon = meta.icon;
  const chapters = SCIENCE_CHAPTERS[subject]?.[classLevel] ?? [];

  async function handleSolve() {
    if (!chapter) {
      toast.error("অনুগ্রহ করে একটি অধ্যায় বেছে নিন");
      return;
    }
    if (!question.trim()) {
      toast.error("প্রশ্নটি লিখুন");
      return;
    }
    setIsSolving(true);
    setSolution("");
    await new Promise((r) => setTimeout(r, 400));
    const result = generateScienceSolution({
      subject,
      classLevel,
      chapter,
      question: question.trim(),
      type: problemType,
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
        type: "science",
        problemType,
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
          data-ocid="science.secondary_button"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> বিজ্ঞান বিভাগে ফিরুন
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
            <SelectTrigger data-ocid="science.select" className="w-full">
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

        {/* Problem type */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            প্রশ্নের ধরন / Problem Type
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setProblemType("theory")}
              data-ocid="science.toggle"
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                problemType === "theory"
                  ? "border-navy bg-navy/5 text-navy"
                  : "border-border text-muted-foreground hover:border-navy/40"
              }`}
            >
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-xs">Theory (তত্ত্ব)</div>
                <div className="text-xs opacity-70">
                  Definition, Law, Concept
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setProblemType("numerical")}
              data-ocid="science.toggle"
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                problemType === "numerical"
                  ? "border-navy bg-navy/5 text-navy"
                  : "border-border text-muted-foreground hover:border-navy/40"
              }`}
            >
              <Calculator className="w-4 h-4 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-xs">
                  Numerical (সংখ্যাতাত্ত্বিক)
                </div>
                <div className="text-xs opacity-70">Calculation, Problem</div>
              </div>
            </button>
          </div>
        </div>

        {/* Question input */}
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-navy">
            প্রশ্ন লিখুন / Write Your Question
          </Label>
          <Textarea
            data-ocid="science.textarea"
            placeholder={`আপনার ${problemType === "theory" ? "তত্ত্বীয়" : "সংখ্যাতাত্ত্বিক"} প্রশ্নটি এখানে লিখুন...`}
            className="min-h-[100px] resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSolve}
          disabled={isSolving}
          className="w-full bg-navy text-white hover:bg-navy/90 font-semibold"
          data-ocid="science.submit_button"
        >
          {isSolving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> সমাধান তৈরি
              হচ্ছে...
            </>
          ) : (
            "সমাধান করুন ✨"
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
            data-ocid="science.panel"
          >
            <div
              className={`${meta.headerClass} px-5 py-3 flex items-center justify-between`}
            >
              <span className="font-display font-bold text-white text-sm">
                ✅ সমাধান / Solution
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleSave}
                disabled={isSaving}
                className="text-xs bg-white/20 text-white hover:bg-white/30 border-0 h-7"
                data-ocid="science.save_button"
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
