import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardList, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useSaveQuizResult } from "../hooks/useQueries";
import { markTopicStudied } from "../utils/progressTracker";

const SUBJECTS = [
  { value: "journal", label: "Accountancy — Journal Entry" },
  { value: "partnership", label: "Accountancy — Partnership" },
  { value: "physics_11", label: "Physics Class 11" },
  { value: "physics_12", label: "Physics Class 12" },
  { value: "chemistry_11", label: "Chemistry Class 11" },
  { value: "biology_11", label: "Biology Class 11" },
  { value: "arts_history", label: "Arts — History" },
  { value: "arts_bengali", label: "Arts — Bengali" },
  { value: "commerce_economics", label: "Commerce — Economics" },
  { value: "law_ipc", label: "Law — IPC" },
  { value: "law_crpc", label: "Law — CrPC" },
  { value: "neet_biology", label: "NEET — Biology" },
  { value: "neet_chemistry", label: "NEET — Chemistry" },
  { value: "ca_accounting", label: "CA Foundation — Accounting" },
];

const STATIC_MCQ: Record<
  string,
  Array<{ q: string; options: string[]; correct: number; explanation: string }>
> = {
  journal: [
    {
      q: "Journal entry records transactions in:",
      options: ["Ledger", "Journal", "Cash Book", "Trial Balance"],
      correct: 1,
      explanation:
        "Journal is the book of original entry where transactions are first recorded.",
    },
    {
      q: "Debit the receiver, Credit the giver is the rule for:",
      options: ["Real Account", "Nominal Account", "Personal Account", "None"],
      correct: 2,
      explanation:
        "Personal account rule: Debit the receiver, Credit the giver.",
    },
    {
      q: "When goods are purchased for cash, which account is debited?",
      options: [
        "Cash Account",
        "Purchases Account",
        "Sales Account",
        "Capital Account",
      ],
      correct: 1,
      explanation: "Purchases Account is debited when goods are bought.",
    },
    {
      q: "The journal entry for salary paid is:",
      options: [
        "Cash Dr., Salary Cr.",
        "Salary Dr., Cash Cr.",
        "Capital Dr., Cash Cr.",
        "Cash Dr., Capital Cr.",
      ],
      correct: 1,
      explanation:
        "Salary is an expense (Nominal account) — Debit all expenses.",
    },
    {
      q: "A credit sale is recorded in:",
      options: ["Purchase Book", "Cash Book", "Sales Book", "Journal"],
      correct: 2,
      explanation:
        "Credit sales are recorded in the Sales Book (Sales Journal).",
    },
    {
      q: "Depreciation reduces value of:",
      options: ["Current Asset", "Fixed Asset", "Current Liability", "Capital"],
      correct: 1,
      explanation:
        "Depreciation is the reduction in value of Fixed Assets over time.",
    },
    {
      q: "The rule for Nominal Account is:",
      options: [
        "Debit receiver, Credit giver",
        "Debit what comes in, Credit what goes out",
        "Debit all expenses, Credit all incomes",
        "None",
      ],
      correct: 2,
      explanation:
        "Nominal account: Debit all expenses/losses, Credit all incomes/gains.",
    },
    {
      q: "Opening entry is passed at:",
      options: ["End of year", "Beginning of year", "During the year", "None"],
      correct: 1,
      explanation:
        "Opening entry records balance b/d at the start of a new financial year.",
    },
    {
      q: "Goods returned to supplier is recorded in:",
      options: ["Sales Book", "Purchase Return Book", "Cash Book", "Journal"],
      correct: 1,
      explanation:
        "Goods returned to supplier are recorded in Purchase Return Book.",
    },
    {
      q: "Capital account is a:",
      options: ["Real Account", "Nominal Account", "Personal Account", "None"],
      correct: 2,
      explanation:
        "Capital account belongs to the owner, hence it is a Personal Account.",
    },
  ],
  physics_11: [
    {
      q: "SI unit of force is:",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correct: 1,
      explanation: "Newton (N) is the SI unit of force.",
    },
    {
      q: "Newton's first law is also called:",
      options: [
        "Law of acceleration",
        "Law of inertia",
        "Law of action-reaction",
        "Law of gravitation",
      ],
      correct: 1,
      explanation: "Newton's First Law is the Law of Inertia.",
    },
    {
      q: "Velocity is a:",
      options: ["Scalar", "Vector", "Tensor", "None"],
      correct: 1,
      explanation:
        "Velocity has both magnitude and direction, so it is a vector quantity.",
    },
    {
      q: "SI unit of work is:",
      options: ["Newton", "Watt", "Joule", "Pascal"],
      correct: 2,
      explanation: "Joule (J) is the SI unit of work and energy.",
    },
    {
      q: "Which law states F = ma?",
      options: ["First law", "Second law", "Third law", "Law of gravitation"],
      correct: 1,
      explanation: "Newton's Second Law: F = ma.",
    },
    {
      q: "Unit of pressure is:",
      options: ["Newton", "Joule", "Pascal", "Watt"],
      correct: 2,
      explanation: "Pascal (Pa) is the SI unit of pressure.",
    },
    {
      q: "Speed of light in vacuum is:",
      options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁵ m/s", "3×10⁹ m/s"],
      correct: 0,
      explanation: "Speed of light = 3×10⁸ m/s (approximately 3×10⁸ m/s).",
    },
    {
      q: "Kinetic energy formula is:",
      options: ["mgh", "½mv²", "mv", "Fd"],
      correct: 1,
      explanation: "Kinetic energy = ½mv².",
    },
    {
      q: "Universal law of gravitation was given by:",
      options: ["Einstein", "Galileo", "Newton", "Faraday"],
      correct: 2,
      explanation: "Newton gave the Universal Law of Gravitation.",
    },
    {
      q: "Momentum = ",
      options: [
        "Force × Time",
        "Mass × Velocity",
        "Mass × Acceleration",
        "Force × Displacement",
      ],
      correct: 1,
      explanation: "Momentum p = mv (mass × velocity).",
    },
  ],
  arts_history: [
    {
      q: "When did the First War of Independence (Sepoy Mutiny) occur?",
      options: ["1847", "1857", "1867", "1877"],
      correct: 1,
      explanation:
        "The First War of Independence (Sepoy Mutiny) occurred in 1857.",
    },
    {
      q: "Who founded the Indian National Congress?",
      options: [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "A.O. Hume",
        "B.G. Tilak",
      ],
      correct: 2,
      explanation:
        "The Indian National Congress was founded by A.O. Hume in 1885.",
    },
    {
      q: "The Non-Cooperation Movement was launched in:",
      options: ["1919", "1920", "1921", "1922"],
      correct: 1,
      explanation:
        "The Non-Cooperation Movement was launched by Gandhi in 1920.",
    },
    {
      q: "Partition of Bengal happened in:",
      options: ["1901", "1903", "1905", "1907"],
      correct: 2,
      explanation: "Bengal was partitioned in 1905 by Lord Curzon.",
    },
    {
      q: "Dandi March took place in:",
      options: ["1928", "1929", "1930", "1931"],
      correct: 2,
      explanation: "The Dandi March or Salt March took place in 1930.",
    },
    {
      q: "Who gave the slogan 'Jai Hind'?",
      options: ["Gandhi", "Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
      correct: 2,
      explanation: "'Jai Hind' slogan was given by Netaji Subhas Chandra Bose.",
    },
    {
      q: "India got independence on:",
      options: [
        "15 August 1947",
        "26 January 1950",
        "15 August 1950",
        "26 January 1947",
      ],
      correct: 0,
      explanation: "India got independence on 15 August 1947.",
    },
    {
      q: "The Indian Constitution came into force on:",
      options: [
        "15 August 1947",
        "26 January 1950",
        "26 November 1949",
        "15 August 1950",
      ],
      correct: 1,
      explanation:
        "The Constitution came into force on 26 January 1950 (Republic Day).",
    },
    {
      q: "Who was the first President of India?",
      options: [
        "Jawaharlal Nehru",
        "Rajendra Prasad",
        "Sardar Patel",
        "B.R. Ambedkar",
      ],
      correct: 1,
      explanation: "Dr. Rajendra Prasad was the first President of India.",
    },
    {
      q: "Quit India Movement was started in:",
      options: ["1940", "1941", "1942", "1943"],
      correct: 2,
      explanation: "The Quit India Movement was started in 1942.",
    },
  ],
  law_ipc: [
    {
      q: "IPC Section 302 deals with:",
      options: ["Theft", "Murder", "Cheating", "Defamation"],
      correct: 1,
      explanation: "IPC Section 302 deals with punishment for murder.",
    },
    {
      q: "IPC Section 420 deals with:",
      options: ["Murder", "Robbery", "Cheating", "Rape"],
      correct: 2,
      explanation:
        "IPC Section 420 deals with cheating and dishonestly inducing delivery of property.",
    },
    {
      q: "FIR stands for:",
      options: [
        "Final Investigation Report",
        "First Information Report",
        "First Investigation Request",
        "Final Information Record",
      ],
      correct: 1,
      explanation:
        "FIR = First Information Report, filed under CrPC Section 154.",
    },
    {
      q: "IPC Section 498A deals with:",
      options: ["Rape", "Murder", "Dowry cruelty", "Theft"],
      correct: 2,
      explanation: "Section 498A deals with cruelty by husband or relatives.",
    },
    {
      q: "Anticipatory bail is provided under CrPC:",
      options: ["Section 436", "Section 437", "Section 438", "Section 439"],
      correct: 2,
      explanation: "CrPC Section 438 provides for anticipatory bail.",
    },
    {
      q: "IPC was enacted in:",
      options: ["1850", "1860", "1870", "1880"],
      correct: 1,
      explanation: "The Indian Penal Code was enacted in 1860.",
    },
    {
      q: "The BNS (Bharatiya Nyaya Sanhita) replaced:",
      options: ["CrPC", "IPC", "Constitution", "Evidence Act"],
      correct: 1,
      explanation: "BNS 2023 replaced the Indian Penal Code, 1860.",
    },
    {
      q: "IPC Section 376 deals with:",
      options: ["Murder", "Robbery", "Rape", "Cheating"],
      correct: 2,
      explanation: "Section 376 deals with punishment for rape.",
    },
    {
      q: "Cognizable offence means:",
      options: [
        "Bail allowed",
        "Police can arrest without warrant",
        "Minor offence",
        "Civil wrong",
      ],
      correct: 1,
      explanation:
        "In a cognizable offence, police can arrest without warrant.",
    },
    {
      q: "Habeas Corpus is filed to:",
      options: [
        "Compel an act",
        "Challenge unlawful detention",
        "File FIR",
        "Seek compensation",
      ],
      correct: 1,
      explanation: "Habeas Corpus is used to challenge unlawful detention.",
    },
  ],
};

// fill missing topics with law_ipc fallback
for (const sub of SUBJECTS) {
  if (!STATIC_MCQ[sub.value]) {
    STATIC_MCQ[sub.value] = STATIC_MCQ.law_ipc;
  }
}

interface MCQ {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

type TestState = "setup" | "running" | "result";

export function MockTestPage() {
  const { actor, isFetching } = useActor();
  const saveResult = useSaveQuizResult();
  const [subject, setSubject] = useState("");
  const [testState, setTestState] = useState<TestState>("setup");
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function generateTest() {
    if (!subject) return;
    setIsLoading(true);
    let qs: MCQ[] = [];
    // Try backend first
    if (actor && !isFetching) {
      try {
        const backendQs = await actor.getQuizQuestions(subject);
        if (backendQs && backendQs.length > 0) {
          qs = backendQs.slice(0, 10).map((q) => ({
            q: q.question,
            options: [q.optionA, q.optionB, q.optionC, q.optionD],
            correct: Number(q.correctIndex),
            explanation: q.explanation || "",
          }));
        }
      } catch {
        // fall through to static
      }
    }
    // fallback to static
    if (qs.length === 0) {
      qs = (STATIC_MCQ[subject] || STATIC_MCQ.journal).slice(0, 10);
    }
    setQuestions(qs);
    setAnswers({});
    setSubmitted(false);
    setTestState("running");
    setIsLoading(false);
    const subLabel =
      SUBJECTS.find((s) => s.value === subject)?.label ?? subject;
    markTopicStudied(
      subLabel.split(" — ")[0] ?? subLabel,
      subLabel.split(" — ")[1] ?? "Mock Test",
    );
  }

  function submitTest() {
    setSubmitted(true);
    setTestState("result");
    const score = questions.filter((q, i) => answers[i] === q.correct).length;
    const wrongIds = questions
      .map((q, i) => (answers[i] !== q.correct ? BigInt(i) : null))
      .filter((x): x is bigint => x !== null);
    saveResult.mutate({
      topic: subject,
      score: BigInt(score),
      total: BigInt(questions.length),
      wrongQuestionIds: wrongIds,
    });
  }

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.correct).length
    : 0;
  const pct =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div data-ocid="mocktest.page">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
          <ClipboardList className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">
            Mock Test Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            বিষয় বেছে 10 প্রশ্নের মোক টেস্ট দিন
          </p>
        </div>
      </div>

      {testState === "setup" && (
        <Card data-ocid="mocktest.card">
          <CardHeader>
            <CardTitle className="text-base">Test Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-semibold block mb-1">
                বিষয় / Subject
              </span>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger data-ocid="mocktest.select">
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={generateTest}
              disabled={!subject || isLoading}
              className="w-full"
              data-ocid="mocktest.primary_button"
            >
              {isLoading ? "Generating..." : "Generate Test (10 Questions)"}
            </Button>
          </CardContent>
        </Card>
      )}

      {testState === "running" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {questions.length} questions
            </p>
            <Badge variant="outline">
              {SUBJECTS.find((s) => s.value === subject)?.label}
            </Badge>
          </div>
          {questions.map((q, qi) => (
            <Card key={q.q} data-ocid={`mocktest.item.${qi + 1}`}>
              <CardContent className="pt-4">
                <p className="font-semibold mb-3 text-sm">
                  {qi + 1}. {q.q}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm ${
                        answers[qi] === oi
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:bg-muted/50"
                      }`}
                      data-ocid={`mocktest.radio.${qi + 1}`}
                    >
                      {["A", "B", "C", "D"][oi]}) {opt}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={submitTest}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full"
            data-ocid="mocktest.submit_button"
          >
            Submit Test ({Object.keys(answers).length}/{questions.length}{" "}
            answered)
          </Button>
        </div>
      )}

      {testState === "result" && (
        <div className="space-y-6">
          <Card data-ocid="mocktest.success_state">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold mb-1">
                {score}/{questions.length}
              </p>
              <p className="text-muted-foreground text-sm mb-4">{pct}% score</p>
              <Progress value={pct} className="mb-4" />
              <Badge variant={pct >= 60 ? "default" : "destructive"}>
                {pct >= 80
                  ? "Excellent!"
                  : pct >= 60
                    ? "Good"
                    : "Needs Improvement"}
              </Badge>
            </CardContent>
          </Card>
          {questions.map((q, qi) => (
            <Card
              key={`result-${q.q}`}
              className={`border-2 ${answers[qi] === q.correct ? "border-green-500/40" : "border-red-500/40"}`}
            >
              <CardContent className="pt-4">
                <p className="font-semibold mb-2 text-sm">
                  {qi + 1}. {q.q}
                </p>
                <div className="space-y-1">
                  {q.options.map((opt, oi) => (
                    <div
                      key={`result-opt-${opt}`}
                      className={`px-3 py-1.5 rounded-lg text-sm border ${
                        oi === q.correct
                          ? "border-green-500 bg-green-500/10 text-green-400"
                          : answers[qi] === oi
                            ? "border-red-500 bg-red-500/10 text-red-400"
                            : "border-border"
                      }`}
                    >
                      {["A", "B", "C", "D"][oi]}) {opt}
                      {oi === q.correct && " ✔"}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {q.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() => setTestState("setup")}
            className="w-full"
            data-ocid="mocktest.secondary_button"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Take Another Test
          </Button>
        </div>
      )}
    </div>
  );
}
