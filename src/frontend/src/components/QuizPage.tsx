import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  RotateCcw,
  Scale,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { QuizQuestion } from "../hooks/useQueries";
import { useQuizQuestions, useSaveQuizResult } from "../hooks/useQueries";

const ACCOUNTANCY_TOPICS = [
  { label: "All Topics", value: null, bengali: "সব বিষয়" },
  { label: "Journal Entry", value: "journal", bengali: "জার্নাল এন্ট্রি" },
  { label: "Partnership", value: "partnership", bengali: "অংশীদারিত্ব" },
  { label: "Depreciation", value: "depreciation", bengali: "অবচয়" },
  { label: "NPO", value: "npo", bengali: "এনপিও" },
  { label: "Company Accounts", value: "company", bengali: "কোম্পানি" },
  { label: "Cash Flow", value: "cashflow", bengali: "নগদ প্রবাহ" },
  { label: "Balance Sheet", value: "balance", bengali: "ব্যালেন্স শিট" },
  { label: "Ledger", value: "ledger", bengali: "খাতা" },
  { label: "Appropriation", value: "appropriation", bengali: "বরাদ্দ" },
];

const SCIENCE_TOPICS = [
  {
    label: "Physics - Class 11",
    value: "physics_11",
    bengali: "পদার্থবিজ্ঞান - Class 11",
  },
  {
    label: "Physics - Class 12",
    value: "physics_12",
    bengali: "পদার্থবিজ্ঞান - Class 12",
  },
  {
    label: "Chemistry - Class 11",
    value: "chemistry_11",
    bengali: "রসায়ন - Class 11",
  },
  {
    label: "Chemistry - Class 12",
    value: "chemistry_12",
    bengali: "রসায়ন - Class 12",
  },
  {
    label: "Biology - Class 11",
    value: "biology_11",
    bengali: "জীববিজ্ঞান - Class 11",
  },
  {
    label: "Biology - Class 12",
    value: "biology_12",
    bengali: "জীববিজ্ঞান - Class 12",
  },
  {
    label: "Mathematics - Class 11",
    value: "math_11",
    bengali: "গণিত - Class 11",
  },
  {
    label: "Mathematics - Class 12",
    value: "math_12",
    bengali: "গণিত - Class 12",
  },
];

const LAW_TOPICS = [
  {
    label: "IPC — Criminal Law",
    value: "law_ipc",
    bengali: "IPC — ফৌজদারি আইন",
  },
  {
    label: "CrPC — Procedure",
    value: "law_crpc",
    bengali: "CrPC — আদালত প্রক্রিয়া",
  },
  { label: "Constitution", value: "law_constitution", bengali: "সংবিধান" },
  { label: "Hindu Marriage Act", value: "law_hma", bengali: "হিন্দু বিবাহ আইন" },
  {
    label: "IT Act / Cyber Law",
    value: "law_it",
    bengali: "IT আইন / সাইবার আইন",
  },
  { label: "All Law Topics", value: "law_all", bengali: "সব আইন বিষয়" },
];

const OFFLINE_LAW_QUESTIONS: QuizQuestion[] = [
  {
    id: BigInt(1001),
    topic: "law_ipc",
    isAdminAdded: false,
    question: "Under IPC Section 302, what is the punishment for murder?",
    optionA: "Maximum 10 years imprisonment",
    optionB: "Death or life imprisonment with fine",
    optionC: "Minimum 7 years imprisonment",
    optionD: "Fine only",
    correctIndex: BigInt(1),
    explanation:
      "IPC Section 302 prescribes death or life imprisonment and fine for murder. The 'rarest of rare' doctrine (Bachan Singh case) guides when death penalty is given.",
  },
  {
    id: BigInt(1002),
    topic: "law_ipc",
    isAdminAdded: false,
    question:
      "Which Supreme Court case established the 'rarest of rare' doctrine for death penalty?",
    optionA: "Maneka Gandhi v. Union of India",
    optionB: "Bachan Singh v. State of Punjab (1980)",
    optionC: "Machhi Singh v. State of Punjab",
    optionD: "Olga Tellis v. BMC",
    correctIndex: BigInt(1),
    explanation:
      "Bachan Singh v. State of Punjab (1980) established the 'rarest of rare' doctrine, holding that death penalty should be awarded only in the most heinous cases.",
  },
  {
    id: BigInt(1003),
    topic: "law_constitution",
    isAdminAdded: false,
    question: "Article 21 of the Constitution of India guarantees:",
    optionA: "Right to Equality",
    optionB: "Right to Freedom of Speech",
    optionC: "Right to Life and Personal Liberty",
    optionD: "Right to Constitutional Remedies",
    correctIndex: BigInt(2),
    explanation:
      "Article 21 guarantees the right to life and personal liberty. After Maneka Gandhi case, 'procedure' must be just, fair, and reasonable.",
  },
  {
    id: BigInt(1004),
    topic: "law_constitution",
    isAdminAdded: false,
    question:
      "Which article of the Constitution is called the 'heart and soul' by Dr. Ambedkar?",
    optionA: "Article 14",
    optionB: "Article 19",
    optionC: "Article 21",
    optionD: "Article 32",
    correctIndex: BigInt(3),
    explanation:
      "Article 32 (Right to Constitutional Remedies) was called the 'heart and soul of the Constitution' by Dr. B.R. Ambedkar.",
  },
  {
    id: BigInt(1005),
    topic: "law_ipc",
    isAdminAdded: false,
    question: "IPC Section 498A deals with:",
    optionA: "Cheating and fraud",
    optionB: "Husband or relative of husband subjecting woman to cruelty",
    optionC: "Attempt to murder",
    optionD: "Sexual harassment",
    correctIndex: BigInt(1),
    explanation:
      "IPC Section 498A (inserted in 1983) punishes husband or relatives for subjecting a married woman to cruelty, including dowry harassment.",
  },
  {
    id: BigInt(1006),
    topic: "law_crpc",
    isAdminAdded: false,
    question:
      "Under which section of CrPC can police arrest without a warrant for cognizable offences?",
    optionA: "Section 41",
    optionB: "Section 161",
    optionC: "Section 164",
    optionD: "Section 313",
    correctIndex: BigInt(0),
    explanation:
      "CrPC Section 41 empowers police to arrest without warrant for cognizable offences. Post-Arnesh Kumar case (2014), police must record written reasons before arresting.",
  },
  {
    id: BigInt(1007),
    topic: "law_constitution",
    isAdminAdded: false,
    question: "Article 14 of the Constitution guarantees:",
    optionA: "Right to Life",
    optionB: "Freedom of Speech",
    optionC: "Equality before law and equal protection of laws",
    optionD: "Right against exploitation",
    correctIndex: BigInt(2),
    explanation:
      "Article 14 guarantees two rights: equality before law (no one is above law) and equal protection of laws (equals to be treated equally). Reasonable classification is permissible.",
  },
  {
    id: BigInt(1008),
    topic: "law_ipc",
    isAdminAdded: false,
    question: "IPC Section 420 deals with:",
    optionA: "Murder",
    optionB: "Theft",
    optionC: "Cheating and dishonestly inducing delivery of property",
    optionD: "Rape",
    correctIndex: BigInt(2),
    explanation:
      "IPC Section 420 punishes cheating resulting in delivery of property — maximum 7 years imprisonment and fine. Fraudulent intent at the time of promise is essential.",
  },
  {
    id: BigInt(1009),
    topic: "law_constitution",
    isAdminAdded: false,
    question:
      "Which landmark case revolutionized the interpretation of Article 21?",
    optionA: "Romesh Thappar v. State of Madras",
    optionB: "Maneka Gandhi v. Union of India (1978)",
    optionC: "Bachan Singh v. State of Punjab",
    optionD: "Bandhua Mukti Morcha v. UOI",
    correctIndex: BigInt(1),
    explanation:
      "Maneka Gandhi v. Union of India (1978) held that 'procedure established by law' under Article 21 must be just, fair, and reasonable — linking Articles 14, 19, and 21.",
  },
  {
    id: BigInt(1010),
    topic: "law_it",
    isAdminAdded: false,
    question: "IT Act Section 66C deals with:",
    optionA: "Publishing obscene content online",
    optionB: "Computer related offences generally",
    optionC: "Identity theft using electronic signature or password",
    optionD: "Cyber terrorism",
    correctIndex: BigInt(2),
    explanation:
      "IT Act Section 66C punishes identity theft — fraudulently using another person's electronic signature, password, or unique identifier. Punishable with 3 years imprisonment and Rs. 1 lakh fine.",
  },
  {
    id: BigInt(1011),
    topic: "law_hma",
    isAdminAdded: false,
    question:
      "Under Hindu Marriage Act Section 13, what is NOT a ground for divorce?",
    optionA: "Adultery",
    optionB: "Cruelty",
    optionC: "Poverty",
    optionD: "Desertion for 2+ years",
    correctIndex: BigInt(2),
    explanation:
      "Hindu Marriage Act Section 13 grounds for divorce include adultery, cruelty, desertion, unsoundness of mind, conversion etc. Poverty is NOT a legal ground for divorce.",
  },
  {
    id: BigInt(1012),
    topic: "law_crpc",
    isAdminAdded: false,
    question: "CrPC Section 164 allows recording of confession/statement by:",
    optionA: "Police officer",
    optionB: "Judicial Magistrate",
    optionC: "Sessions Judge",
    optionD: "High Court",
    correctIndex: BigInt(1),
    explanation:
      "CrPC Section 164 allows Judicial Magistrates (not police) to record confessions and statements. These are admissible as evidence in court, unlike police statements under Section 161.",
  },
  {
    id: BigInt(1013),
    topic: "law_it",
    isAdminAdded: false,
    question:
      "The Shreya Singhal v. Union of India case (2015) struck down which section?",
    optionA: "IT Act Section 66",
    optionB: "IT Act Section 66A",
    optionC: "IT Act Section 67",
    optionD: "IPC Section 499",
    correctIndex: BigInt(1),
    explanation:
      "The Supreme Court struck down IT Act Section 66A in Shreya Singhal v. Union of India (2015) as an unconstitutional restriction on freedom of speech under Article 19(1)(a).",
  },
  {
    id: BigInt(1014),
    topic: "law_constitution",
    isAdminAdded: false,
    question:
      "Article 32 of the Constitution empowers the Supreme Court to issue how many types of writs?",
    optionA: "3 writs",
    optionB: "4 writs",
    optionC: "5 writs",
    optionD: "7 writs",
    correctIndex: BigInt(2),
    explanation:
      "Article 32 empowers SC to issue 5 writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto for enforcement of fundamental rights.",
  },
  {
    id: BigInt(1015),
    topic: "law_crpc",
    isAdminAdded: false,
    question:
      "In the Arnesh Kumar v. State of Bihar (2014) case, what did the Supreme Court restrict?",
    optionA: "Use of Article 21",
    optionB:
      "Automatic arrest under Section 498A IPC without proper justification",
    optionC: "Bail in murder cases",
    optionD: "Use of DNA evidence",
    correctIndex: BigInt(1),
    explanation:
      "In Arnesh Kumar case (2014), SC restricted mechanical arrest under Section 498A IPC, directing police to record written reasons and apply Section 41 CrPC checklist before arresting.",
  },
];

const OPTIONS: Array<{
  key: "optionA" | "optionB" | "optionC" | "optionD";
  label: string;
}> = [
  { key: "optionA", label: "A" },
  { key: "optionB", label: "B" },
  { key: "optionC", label: "C" },
  { key: "optionD", label: "D" },
];

type QuizPhase = "select" | "quiz" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const circumference = 2 * Math.PI * 42;
  const strokeDash = (pct / 100) * circumference;
  const color = pct >= 70 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full -rotate-90"
        role="img"
        aria-label="Score ring"
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {pct}%
        </span>
        <span className="text-xs text-muted-foreground">
          {score}/{total}
        </span>
      </div>
    </div>
  );
}

export function QuizPage({
  onNavigate,
}: { onNavigate?: (page: string) => void }) {
  const [phase, setPhase] = useState<QuizPhase>("select");
  const [selectedTopic, setSelectedTopic] = useState<{
    label: string;
    value: string | null;
  }>(ACCOUNTANCY_TOPICS[0]);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wrongIds, setWrongIds] = useState<bigint[]>([]);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);

  const { data: rawQuestions, isLoading } = useQuizQuestions(
    selectedTopic.value,
    fetchEnabled,
  );
  const saveQuizResult = useSaveQuizResult();

  function handleStartClick() {
    const isLaw = selectedTopic.value?.startsWith("law_");
    if (isLaw) {
      const picked = shuffle(OFFLINE_LAW_QUESTIONS).slice(0, 10);
      setQuestions(picked);
      setCurrentIdx(0);
      setChosenIndex(null);
      setAnswered(false);
      setWrongIds([]);
      setScore(0);
      setPhase("quiz");
      return;
    }
    setFetchEnabled(true);
    if (rawQuestions && rawQuestions.length > 0) {
      const picked = shuffle(rawQuestions).slice(0, 10);
      setQuestions(picked);
      setCurrentIdx(0);
      setChosenIndex(null);
      setAnswered(false);
      setWrongIds([]);
      setScore(0);
      setPhase("quiz");
    } else if (!isLoading) {
      toast.info("প্রশ্ন লোড হচ্ছে...");
    }
  }

  if (
    fetchEnabled &&
    !isLoading &&
    rawQuestions &&
    rawQuestions.length > 0 &&
    phase === "select" &&
    questions.length === 0
  ) {
    const picked = shuffle(rawQuestions).slice(0, 10);
    setQuestions(picked);
    setCurrentIdx(0);
    setChosenIndex(null);
    setAnswered(false);
    setWrongIds([]);
    setScore(0);
    setPhase("quiz");
  }

  function handleAnswer(idx: number) {
    if (answered) return;
    setChosenIndex(idx);
    setAnswered(true);
    const q = questions[currentIdx];
    const correct = Number(q.correctIndex);
    if (idx === correct) {
      setScore((s) => s + 1);
    } else {
      setWrongIds((w) => [...w, q.id]);
    }
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setChosenIndex(null);
      setAnswered(false);
    }
  }

  async function handleSaveAndFinish() {
    setSaving(true);
    try {
      await saveQuizResult.mutateAsync({
        topic: selectedTopic.value ?? "all",
        score: BigInt(score),
        total: BigInt(questions.length),
        wrongQuestionIds: wrongIds,
      });
      toast.success("ফলাফল সংরক্ষিত হয়েছে!");
      if (onNavigate) onNavigate("history");
    } catch {
      toast.error("সংরক্ষণ ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  function handleRetry() {
    if (selectedTopic.value?.startsWith("law_")) {
      const picked = shuffle(OFFLINE_LAW_QUESTIONS).slice(0, 10);
      setQuestions(picked);
      setCurrentIdx(0);
      setChosenIndex(null);
      setAnswered(false);
      setWrongIds([]);
      setScore(0);
      setPhase(picked.length > 0 ? "quiz" : "select");
      return;
    }
    const picked = shuffle(rawQuestions ?? []).slice(0, 10);
    setQuestions(picked);
    setCurrentIdx(0);
    setChosenIndex(null);
    setAnswered(false);
    setWrongIds([]);
    setScore(0);
    setPhase(picked.length > 0 ? "quiz" : "select");
  }

  function selectTopic(t: { label: string; value: string | null }) {
    setSelectedTopic(t);
    setFetchEnabled(false);
    setQuestions([]);
  }

  // ── SELECT PHASE ──
  if (phase === "select") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-navy">
                Quiz Mode
              </h1>
              <p className="text-sm text-muted-foreground">
                একটি বিষয় বেছে নিন এবং পরীক্ষা দিন
              </p>
            </div>
          </div>

          <Card className="border-navy/20 shadow-sm mb-6">
            <CardContent className="pt-4">
              <Tabs defaultValue="accountancy">
                <TabsList className="w-full mb-4 bg-navy/5 border border-navy/10">
                  <TabsTrigger
                    value="accountancy"
                    className="flex-1 data-[state=active]:bg-navy data-[state=active]:text-white text-navy"
                    data-ocid="quiz.tab"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    হিসাববিজ্ঞান
                  </TabsTrigger>
                  <TabsTrigger
                    value="science"
                    className="flex-1 data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-emerald-700"
                    data-ocid="quiz.tab"
                  >
                    <FlaskConical className="w-3.5 h-3.5 mr-1.5" />
                    বিজ্ঞান
                  </TabsTrigger>
                  <TabsTrigger
                    value="law"
                    className="flex-1 data-[state=active]:bg-indigo-800 data-[state=active]:text-white text-indigo-800"
                    data-ocid="quiz.tab"
                  >
                    <Scale className="w-3.5 h-3.5 mr-1.5" />
                    আইন (Law)
                  </TabsTrigger>
                </TabsList>

                {/* Accountancy Topics */}
                <TabsContent value="accountancy">
                  <p className="text-xs font-semibold text-navy/70 mb-2 uppercase tracking-wide">
                    Accountancy — WBCHSE / Calcutta University
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ACCOUNTANCY_TOPICS.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        data-ocid="quiz.tab"
                        onClick={() => selectTopic(t)}
                        className={`flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                          selectedTopic.value === t.value
                            ? "border-navy bg-navy text-white"
                            : "border-border bg-card text-foreground hover:border-navy/40 hover:bg-navy/5"
                        }`}
                      >
                        <span className="font-semibold text-xs">{t.label}</span>
                        <span
                          className={`text-[10px] ${
                            selectedTopic.value === t.value
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t.bengali}
                        </span>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Science Topics */}
                <TabsContent value="science">
                  <p className="text-xs font-semibold text-emerald-700/70 mb-2 uppercase tracking-wide">
                    বিজ্ঞান — WBCHSE Class 11 & 12
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SCIENCE_TOPICS.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        data-ocid="quiz.tab"
                        onClick={() => selectTopic(t)}
                        className={`flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                          selectedTopic.value === t.value
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : "border-border bg-card text-foreground hover:border-emerald-500/40 hover:bg-emerald-50"
                        }`}
                      >
                        <span className="font-semibold text-xs">{t.label}</span>
                        <span
                          className={`text-[10px] ${
                            selectedTopic.value === t.value
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t.bengali}
                        </span>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                {/* Law Topics */}
                <TabsContent value="law">
                  <p className="text-xs font-semibold text-indigo-700/70 mb-2 uppercase tracking-wide">
                    আইন — Indian Law (IPC, CrPC, Constitution, HMA, IT Act)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {LAW_TOPICS.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        data-ocid="quiz.tab"
                        onClick={() => selectTopic(t)}
                        className={`flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                          selectedTopic.value === t.value
                            ? "border-indigo-800 bg-indigo-800 text-white"
                            : "border-border bg-card text-foreground hover:border-indigo-400/40 hover:bg-indigo-50"
                        }`}
                      >
                        <span className="font-semibold text-xs">{t.label}</span>
                        <span
                          className={`text-[10px] ${
                            selectedTopic.value === t.value
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t.bengali}
                        </span>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="bg-navy/5 rounded-xl p-4 mb-6 text-sm text-navy/80">
            <p className="font-semibold mb-1 text-navy">📋 Quiz সম্পর্কে</p>
            <ul className="space-y-1 text-xs">
              <li>• প্রতিটি quiz-এ সর্বোচ্চ ১০টি MCQ প্রশ্ন থাকবে</li>
              <li>• প্রতিটি প্রশ্নের উত্তরের পরে ব্যাখ্যা দেখাবে</li>
              <li>• শেষে ফলাফল বিশ্লেষণ ও History-তে save করতে পারবেন</li>
            </ul>
          </div>

          {isLoading && fetchEnabled ? (
            <div className="space-y-2" data-ocid="quiz.loading_state">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-3/4 rounded-lg" />
            </div>
          ) : (
            <Button
              data-ocid="quiz.primary_button"
              className="w-full bg-navy text-white hover:bg-navy/90 h-12 text-base font-semibold"
              onClick={handleStartClick}
              disabled={isLoading && fetchEnabled}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Quiz শুরু করুন / Start Quiz
            </Button>
          )}
        </motion.div>
      </div>
    );
  }

  // ── QUIZ PHASE ──
  if (phase === "quiz" && questions.length > 0) {
    const q = questions[currentIdx];
    const correct = Number(q.correctIndex);
    const progress =
      ((currentIdx + (answered ? 1 : 0)) / questions.length) * 100;
    const isScienceTopic =
      selectedTopic.value?.includes("_") &&
      !selectedTopic.value?.startsWith("law_");
    const isLawTopic = selectedTopic.value?.startsWith("law_");

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isScienceTopic ? (
              <FlaskConical className="w-5 h-5 text-emerald-600" />
            ) : isLawTopic ? (
              <Scale className="w-5 h-5 text-indigo-700" />
            ) : (
              <Trophy className="w-5 h-5 text-gold" />
            )}
            <span className="font-display font-bold text-navy text-sm">
              {selectedTopic.label}
            </span>
          </div>
          <Badge variant="outline" className="border-navy/20 text-navy text-xs">
            প্রশ্ন {currentIdx + 1} / {questions.length}
          </Badge>
        </div>

        <Progress value={progress} className="h-2 mb-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="border-navy/20 shadow-sm mb-4">
              <CardContent className="pt-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  প্রশ্ন / Question
                </p>
                <p className="text-base font-medium text-foreground leading-relaxed">
                  {q.question}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2 mb-4">
              {OPTIONS.map((opt, idx) => {
                const optVal = q[opt.key];
                let extraClass =
                  "border-border hover:border-navy/40 hover:bg-navy/5 text-foreground";

                if (answered) {
                  if (idx === correct) {
                    extraClass =
                      "border-green-500 bg-green-50 text-green-800 hover:bg-green-50";
                  } else if (idx === chosenIndex && idx !== correct) {
                    extraClass =
                      "border-red-400 bg-red-50 text-red-800 hover:bg-red-50";
                  } else {
                    extraClass =
                      "border-border text-muted-foreground opacity-60";
                  }
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    data-ocid={`quiz.radio.${idx + 1}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                      answered ? "cursor-default" : "cursor-pointer"
                    } ${extraClass}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 border-current">
                      {opt.label}
                    </span>
                    <span className="text-sm">{optVal}</span>
                    {answered && idx === correct && (
                      <CheckCircle2 className="w-4 h-4 ml-auto text-green-600 shrink-0" />
                    )}
                    {answered && idx === chosenIndex && idx !== correct && (
                      <XCircle className="w-4 h-4 ml-auto text-red-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {chosenIndex === correct ? (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 mb-4">
                    <p className="text-sm font-semibold text-green-700 mb-1">
                      ✅ সঠিক উত্তর! / Correct!
                    </p>
                    {q.explanation && (
                      <p className="text-xs text-green-800">{q.explanation}</p>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-4">
                    <p className="text-sm font-semibold text-red-700 mb-1">
                      ❌ ভুল উত্তর / Incorrect
                    </p>
                    <p className="text-xs text-red-600 mb-1">
                      সঠিক উত্তর:{" "}
                      <strong>
                        {OPTIONS[correct].label}) {q[OPTIONS[correct].key]}
                      </strong>
                    </p>
                    {q.explanation && (
                      <p className="text-xs text-red-800">{q.explanation}</p>
                    )}
                  </div>
                )}
                <Button
                  data-ocid="quiz.primary_button"
                  className="w-full bg-navy text-white hover:bg-navy/90"
                  onClick={handleNext}
                >
                  {currentIdx + 1 >= questions.length ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      ফলাফল দেখুন / See Result
                    </>
                  ) : (
                    <>
                      পরের প্রশ্ন / Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── RESULT PHASE ──
  if (phase === "result") {
    const total = questions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const grade =
      pct >= 70
        ? {
            label: "ভালো! / Good",
            color: "text-green-600",
            bg: "bg-green-50 border-green-200",
          }
        : pct >= 50
          ? {
              label: "মোটামুটি / Fair",
              color: "text-amber-600",
              bg: "bg-amber-50 border-amber-200",
            }
          : {
              label: "আরো পড়ো / Needs Improvement",
              color: "text-red-600",
              bg: "bg-red-50 border-red-200",
            };

    const wrongQuestions = questions.filter((q) => wrongIds.includes(q.id));

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-gold" />
            <h1 className="font-display font-bold text-2xl text-navy">
              ফলাফল / Result
            </h1>
          </div>

          <Card className="border-navy/20 shadow-sm mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={score} total={total} />
                <div className="flex-1 text-center sm:text-left">
                  <div
                    className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold mb-2 ${grade.bg} ${grade.color}`}
                  >
                    {grade.label}
                  </div>
                  <p className="text-3xl font-display font-bold text-navy mb-1">
                    {score} / {total}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedTopic.label} Quiz
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" /> {score} সঠিক
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-4 h-4" /> {total - score} ভুল
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {wrongQuestions.length > 0 && (
            <Card className="border-red-200 shadow-sm mb-6">
              <CardContent className="pt-4">
                <p className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> ভুল উত্তরগুলো / Wrong Answers (
                  {wrongQuestions.length})
                </p>
                <div className="space-y-3">
                  {wrongQuestions.map((q, idx) => (
                    <div
                      key={q.id.toString()}
                      className="rounded-lg bg-red-50/60 border border-red-100 p-3"
                      data-ocid={`quiz.item.${idx + 1}`}
                    >
                      <p className="text-xs font-medium text-foreground mb-1">
                        {idx + 1}. {q.question}
                      </p>
                      <p className="text-xs text-green-700">
                        ✅ সঠিক উত্তর: {OPTIONS[Number(q.correctIndex)].label}){" "}
                        {q[OPTIONS[Number(q.correctIndex)].key]}
                      </p>
                      {q.explanation && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              data-ocid="quiz.primary_button"
              className="flex-1 bg-navy text-white hover:bg-navy/90"
              onClick={handleSaveAndFinish}
              disabled={saving}
            >
              {saving ? (
                "সংরক্ষণ হচ্ছে..."
              ) : (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  সংরক্ষণ করুন / Save & Finish
                </>
              )}
            </Button>
            <Button
              data-ocid="quiz.secondary_button"
              variant="outline"
              className="flex-1 border-navy/30 text-navy hover:bg-navy/5"
              onClick={handleRetry}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              আবার চেষ্টা / Try Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
