import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  CLASS_LEVEL_LABELS,
  QA_DATABASE,
  QUESTION_TYPE_LABELS,
  SUBJECT_AREA_LABELS,
  filterQuestions,
  getChaptersBySubject,
  getSubjectsByArea,
} from "../data/qaDatabase";
import type { QAEntry, QuestionType, SubjectArea } from "../data/qaDatabase";

type Language = "en" | "bn";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  hard: "bg-red-100 text-red-700 border-red-200",
};

const DIFFICULTY_LABELS: Record<string, { en: string; bn: string }> = {
  easy: { en: "Easy", bn: "সহজ" },
  medium: { en: "Medium", bn: "মাধ্যম" },
  hard: { en: "Hard", bn: "কঠিন" },
};

const AREA_COLORS: Record<SubjectArea, string> = {
  arts: "bg-amber-500",
  science: "bg-emerald-600",
  commerce: "bg-blue-600",
  law: "bg-indigo-600",
  neet: "bg-teal-600",
  ca: "bg-violet-600",
};

const TYPE_COLORS: Record<QuestionType, string> = {
  chapter_wise: "bg-sky-100 text-sky-700 border-sky-200",
  short_answer: "bg-lime-100 text-lime-700 border-lime-200",
  long_answer: "bg-purple-100 text-purple-700 border-purple-200",
  mcq: "bg-orange-100 text-orange-700 border-orange-200",
  important_exam: "bg-rose-100 text-rose-700 border-rose-200",
};

function QuestionCard({ entry, lang }: { entry: QAEntry; lang: Language }) {
  const [expanded, setExpanded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = lang === "en" ? entry.questionEn : entry.questionBn;
  const answer = lang === "en" ? entry.answerEn : entry.answerBn;
  const explanation = lang === "en" ? entry.explanationEn : entry.explanationBn;
  const options =
    lang === "en" ? entry.options : (entry.optionsBn ?? entry.options);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border border-navy/10 shadow-sm hover:shadow-md transition-shadow bg-white">
        <CardContent className="p-4">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <Badge
              className={`${AREA_COLORS[entry.subjectArea]} text-white border-0 text-[10px] px-2 py-0.5`}
            >
              {SUBJECT_AREA_LABELS[entry.subjectArea][lang]}
            </Badge>
            <Badge
              variant="outline"
              className={`text-[10px] px-2 py-0.5 ${TYPE_COLORS[entry.questionType]}`}
            >
              {QUESTION_TYPE_LABELS[entry.questionType][lang]}
            </Badge>
            <Badge
              variant="outline"
              className={`text-[10px] px-2 py-0.5 ${DIFFICULTY_COLORS[entry.difficulty]}`}
            >
              {DIFFICULTY_LABELS[entry.difficulty][lang]}
            </Badge>
            {entry.isImportant && (
              <Badge className="bg-yellow-400 text-yellow-900 border-0 text-[10px] px-2 py-0.5 flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-current" />
                {lang === "en" ? "Important" : "গুরুত্বপূর্ণ"}
              </Badge>
            )}
            <span className="ml-auto text-[10px] text-muted-foreground">
              {CLASS_LEVEL_LABELS[entry.classLevel][lang]}
            </span>
          </div>

          {/* Subject & Chapter */}
          <p className="text-[11px] text-muted-foreground mb-2 font-medium">
            {entry.subject} — {entry.chapter}
          </p>

          {/* Question */}
          <p className="text-sm font-semibold text-navy leading-snug mb-3">
            {question}
          </p>

          {/* MCQ Options */}
          {entry.questionType === "mcq" && options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
              {(["a", "b", "c", "d"] as const).map((opt) => (
                <div
                  key={opt}
                  className={`text-xs px-3 py-2 rounded-lg border ${
                    showAnswer && entry.correctOption === opt
                      ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold"
                      : "bg-navy/3 border-navy/10 text-navy/70"
                  }`}
                >
                  <span className="font-bold uppercase mr-1.5">{opt}.</span>
                  {options[opt]}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          {entry.questionType === "mcq" ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={showAnswer ? "default" : "outline"}
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-xs h-7 px-3"
                data-ocid="qa.toggle"
              >
                {showAnswer
                  ? lang === "en"
                    ? "Hide Answer"
                    : "উত্তর লুকাও"
                  : lang === "en"
                    ? "Show Answer"
                    : "উত্তর দেখো"}
              </Button>
              <AnimatePresence>
                {showAnswer && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-emerald-700 font-semibold"
                  >
                    ✓ {lang === "en" ? "Correct: " : "সঠিক: "}
                    {entry.correctOption?.toUpperCase()}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
              className="text-xs h-7 px-3 text-navy hover:text-navy hover:bg-navy/5"
              data-ocid="qa.toggle"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  {lang === "en" ? "Hide Answer" : "উত্তর লুকাও"}
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  {lang === "en" ? "Show Answer" : "উত্তর দেখো"}
                </>
              )}
            </Button>
          )}

          {/* Answer content */}
          <AnimatePresence>
            {(expanded || (entry.questionType === "mcq" && showAnswer)) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-navy/10">
                  {entry.questionType !== "mcq" && (
                    <div className="text-sm text-navy/80 leading-relaxed whitespace-pre-wrap">
                      {answer}
                    </div>
                  )}
                  {explanation && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-[11px] font-semibold text-blue-700 mb-1">
                        {lang === "en" ? "📝 Explanation" : "📝 ব্যাখ্যা"}
                      </p>
                      <p className="text-xs text-blue-800 leading-relaxed whitespace-pre-wrap">
                        {explanation}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function QAPage() {
  const [lang, setLang] = useState<Language>("en");
  const [selectedArea, setSelectedArea] = useState<SubjectArea | "all">("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<QuestionType | "all">("all");
  const [importantOnly, setImportantOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allAreas: SubjectArea[] = [
    "arts",
    "science",
    "commerce",
    "law",
    "neet",
    "ca",
  ];

  const subjectsForArea = useMemo(() => {
    if (selectedArea === "all") return [];
    return getSubjectsByArea(selectedArea);
  }, [selectedArea]);

  const chaptersForSubject = useMemo(() => {
    if (selectedSubject === "all") return [];
    return getChaptersBySubject(selectedSubject);
  }, [selectedSubject]);

  const filteredQuestions = useMemo(() => {
    return filterQuestions({
      subjectArea: selectedArea === "all" ? undefined : selectedArea,
      subject: selectedSubject === "all" ? undefined : selectedSubject,
      chapter: selectedChapter === "all" ? undefined : selectedChapter,
      questionType: selectedType === "all" ? undefined : selectedType,
      importantOnly: importantOnly ? true : undefined,
      searchQuery: searchQuery.trim() || undefined,
    });
  }, [
    selectedArea,
    selectedSubject,
    selectedChapter,
    selectedType,
    importantOnly,
    searchQuery,
  ]);

  const allTypes: QuestionType[] = [
    "chapter_wise",
    "short_answer",
    "long_answer",
    "mcq",
    "important_exam",
  ];

  function handleAreaChange(area: SubjectArea | "all") {
    setSelectedArea(area);
    setSelectedSubject("all");
    setSelectedChapter("all");
  }

  function handleSubjectChange(subject: string) {
    setSelectedSubject(subject);
    setSelectedChapter("all");
  }

  function clearFilters() {
    setSelectedArea("all");
    setSelectedSubject("all");
    setSelectedChapter("all");
    setSelectedType("all");
    setImportantOnly(false);
    setSearchQuery("");
  }

  const hasActiveFilters =
    selectedArea !== "all" ||
    selectedSubject !== "all" ||
    selectedChapter !== "all" ||
    selectedType !== "all" ||
    importantOnly ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="bg-navy text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold leading-tight">
                {lang === "en" ? "Q&A Question Bank" : "প্রশ্ন ব্যাংক"}
              </h1>
              <p className="text-xs text-white/70">
                {lang === "en"
                  ? `${QA_DATABASE.length} questions across all subjects`
                  : `সব বিষয়ে ${QA_DATABASE.length}টি প্রশ্ন`}
              </p>
            </div>
            {/* Language Toggle */}
            <div className="ml-auto flex items-center gap-1 bg-white/10 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  lang === "en"
                    ? "bg-white text-navy"
                    : "text-white/70 hover:text-white"
                }`}
                data-ocid="qa.toggle"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  lang === "bn"
                    ? "bg-white text-navy"
                    : "text-white/70 hover:text-white"
                }`}
                data-ocid="qa.toggle"
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Subject Area Tabs */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            {lang === "en" ? "Subject Area" : "বিষয় বিভাগ"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleAreaChange("all")}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
                selectedArea === "all"
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy/70 border-navy/20 hover:border-navy/40"
              }`}
              data-ocid="qa.tab"
            >
              {lang === "en" ? "All Subjects" : "সব বিষয়"}
            </button>
            {allAreas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleAreaChange(area)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
                  selectedArea === area
                    ? `${AREA_COLORS[area]} text-white border-transparent`
                    : "bg-white text-navy/70 border-navy/20 hover:border-navy/40"
                }`}
                data-ocid="qa.tab"
              >
                {SUBJECT_AREA_LABELS[area][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Subject select */}
          <Select
            value={selectedSubject}
            onValueChange={handleSubjectChange}
            disabled={subjectsForArea.length === 0}
          >
            <SelectTrigger
              className="text-sm border-navy/20 h-9"
              data-ocid="qa.select"
            >
              <SelectValue
                placeholder={lang === "en" ? "Select Subject" : "বিষয় বেছে নিন"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {lang === "en" ? "All Subjects" : "সব বিষয়"}
              </SelectItem>
              {subjectsForArea.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Chapter select */}
          <Select
            value={selectedChapter}
            onValueChange={setSelectedChapter}
            disabled={chaptersForSubject.length === 0}
          >
            <SelectTrigger
              className="text-sm border-navy/20 h-9"
              data-ocid="qa.select"
            >
              <SelectValue
                placeholder={lang === "en" ? "Select Chapter" : "অধ্যায় বেছে নিন"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {lang === "en" ? "All Chapters" : "সব অধ্যায়"}
              </SelectItem>
              {chaptersForSubject.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder={
                lang === "en" ? "Search questions..." : "প্রশ্ন খুঁজুন..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-sm border-navy/20 h-9"
              data-ocid="qa.search_input"
            />
          </div>
        </div>

        {/* Question Type Filter */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            {lang === "en" ? "Question Type" : "প্রশ্নের ধরন"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                selectedType === "all"
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy/70 border-navy/20 hover:border-navy/40"
              }`}
              data-ocid="qa.tab"
            >
              {lang === "en" ? "All Types" : "সব ধরন"}
            </button>
            {allTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                  selectedType === type
                    ? `${TYPE_COLORS[type].replace("border-", "")} border-current`
                    : "bg-white text-navy/70 border-navy/20 hover:border-navy/40"
                }`}
                data-ocid="qa.tab"
              >
                {QUESTION_TYPE_LABELS[type][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Important toggle + result count + clear filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setImportantOnly(!importantOnly)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                importantOnly
                  ? "bg-yellow-400 text-yellow-900 border-yellow-400"
                  : "bg-white text-navy/70 border-navy/20 hover:border-navy/40"
              }`}
              data-ocid="qa.toggle"
            >
              <Star
                className={`w-3 h-3 ${importantOnly ? "fill-current" : ""}`}
              />
              {lang === "en" ? "Important Only" : "শুধু গুরুত্বপূর্ণ"}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-medium transition-all"
                data-ocid="qa.button"
              >
                <X className="w-3 h-3" />
                {lang === "en" ? "Clear" : "মুছুন"}
              </button>
            )}
          </div>
          <div className="text-sm font-semibold text-navy bg-navy/5 px-3 py-1.5 rounded-lg">
            {filteredQuestions.length}{" "}
            {lang === "en" ? "questions found" : "টি প্রশ্ন পাওয়া গেছে"}
          </div>
        </div>

        {/* Results */}
        {filteredQuestions.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="qa.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold">
              {lang === "en" ? "No questions found" : "কোনো প্রশ্ন পাওয়া যায়নি"}
            </p>
            <p className="text-sm mt-1">
              {lang === "en"
                ? "Try adjusting your filters or search query"
                : "ফিল্টার বা সার্চ পরিবর্তন করে দেখুন"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((entry, idx) => (
              <div key={entry.id} data-ocid={`qa.item.${idx + 1}`}>
                <QuestionCard entry={entry} lang={lang} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
