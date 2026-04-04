import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Newspaper,
  Search,
  Star,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ExamType = "CGL" | "CHSL" | "MTS" | "GD" | "CPO" | "Steno";
type AnswerType = "concept" | "short" | "mcq" | "pyq";
type SubjectKey = "gk" | "math" | "english" | "reasoning" | "current";

const SSC_EXAMS: Array<{
  id: ExamType;
  name: string;
  fullName: string;
  eligibility: string;
  posts: string;
  salary: string;
  color: string;
  tier: string;
}> = [
  {
    id: "CGL",
    name: "CGL",
    fullName: "Combined Graduate Level",
    eligibility: "স্নাতক (Graduate)",
    posts: "Inspector, ASO, Auditor, Tax Assistant",
    salary: "₹25,500 – ₹1,12,400",
    color: "#f59e0b",
    tier: "Tier I, II, III",
  },
  {
    id: "CHSL",
    name: "CHSL",
    fullName: "Combined Higher Secondary Level",
    eligibility: "উচ্চ মাধ্যমিক (Class 12)",
    posts: "DEO, LDC, Postal Assistant",
    salary: "₹19,900 – ₹63,200",
    color: "#3b82f6",
    tier: "Tier I, II",
  },
  {
    id: "MTS",
    name: "MTS",
    fullName: "Multi-Tasking Staff",
    eligibility: "মাধ্যমিক (Class 10)",
    posts: "Multi-Tasking Staff (Non-Technical)",
    salary: "₹18,000 – ₹56,900",
    color: "#10b981",
    tier: "Paper I, II",
  },
  {
    id: "GD",
    name: "GD",
    fullName: "GD Constable",
    eligibility: "মাধ্যমিক (Class 10)",
    posts: "Constable GD in BSF, CISF, CRPF",
    salary: "₹21,700 – ₹69,100",
    color: "#8b5cf6",
    tier: "CBT + PET",
  },
  {
    id: "CPO",
    name: "CPO",
    fullName: "Central Police Organisation",
    eligibility: "স্নাতক (Graduate)",
    posts: "Sub-Inspector in CAPF, ASI in CISF",
    salary: "₹35,400 – ₹1,12,400",
    color: "#ef4444",
    tier: "Paper I, PET, Paper II",
  },
  {
    id: "Steno",
    name: "Steno",
    fullName: "Stenographer C & D",
    eligibility: "উচ্চ মাধ্যমিক (Class 12)",
    posts: "Stenographer Grade C & D",
    salary: "₹25,500 – ₹81,100",
    color: "#ec4899",
    tier: "CBT + Skill Test",
  },
];

const SUBJECTS: Array<{
  id: SubjectKey;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  desc: string;
}> = [
  {
    id: "gk",
    label: "General Knowledge",
    icon: <Globe className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    desc: "ইতিহাস · ভূগোল · বিজ্ঞান · সংবিধান",
  },
  {
    id: "math",
    label: "Quantitative Aptitude",
    icon: <Calculator className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    desc: "গণিত · সূত্র · Shortcut · সমস্যা সমাধান",
  },
  {
    id: "english",
    label: "English Language",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    desc: "Grammar · Vocabulary · Comprehension",
  },
  {
    id: "reasoning",
    label: "Reasoning Ability",
    icon: <Brain className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    desc: "Analogy · Series · Coding · Puzzle",
  },
  {
    id: "current",
    label: "Current Affairs",
    icon: <Newspaper className="w-6 h-6" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    desc: "জাতীয় · আন্তর্জাতিক · পুরস্কার · খেলা",
  },
];

const CHAPTER_MAP: Record<SubjectKey, string[]> = {
  gk: [
    "ভারতের ইতিহাস (প্রাচীন)",
    "ভারতের ইতিহাস (মধ্যযুগ)",
    "আধুনিক ইতিহাস ও স্বাধীনতা সংগ্রাম",
    "ভারতের ভূগোল",
    "বিশ্ব ভূগোল",
    "ভারতীয় রাজনীতি ও সংবিধান",
    "ভারতীয় অর্থনীতি",
    "সাধারণ বিজ্ঞান (পদার্থ)",
    "সাধারণ বিজ্ঞান (রসায়ন)",
    "সাধারণ বিজ্ঞান (জীববিজ্ঞান)",
    "Static GK - পুরস্কার ও সম্মান",
    "Static GK - খেলাধুলা",
    "Static GK - বই ও লেখক",
  ],
  math: [
    "সংখ্যা পদ্ধতি (Number System)",
    "শতকরা (Percentage)",
    "লাভ-ক্ষতি (Profit & Loss)",
    "সরল ও চক্রবৃদ্ধি সুদ",
    "সময় ও কাজ (Time & Work)",
    "গতি, দূরত্ব ও সময়",
    "বীজগণিত (Algebra)",
    "জ্যামিতি (Geometry)",
    "ত্রিকোণমিতি (Trigonometry)",
    "পরিসংখ্যান (Statistics)",
    "Ratio & Proportion",
    "Mensuration",
  ],
  english: [
    "Grammar - Tenses",
    "Grammar - Active & Passive Voice",
    "Grammar - Direct & Indirect Speech",
    "Synonyms & Antonyms",
    "One Word Substitution",
    "Idioms & Phrases",
    "Reading Comprehension",
    "Error Detection",
    "Fill in the Blanks",
    "Spelling Correction",
    "Cloze Test",
  ],
  reasoning: [
    "সাদৃশ্য (Analogy)",
    "শ্রেণিবিন্যাস (Classification)",
    "সিরিজ (Series)",
    "কোডিং-ডিকোডিং",
    "রক্ত সম্পর্ক (Blood Relations)",
    "দিকনির্ণয় (Direction)",
    "ধাঁধা (Puzzle)",
    "Syllogism",
    "Matrix",
    "Venn Diagram",
    "Clock & Calendar",
    "Non-Verbal Reasoning",
  ],
  current: [
    "জাতীয় সংবাদ ২০২৪",
    "আন্তর্জাতিক সংবাদ ২০২৪",
    "পুরস্কার ও সম্মান ২০২৪",
    "খেলাধুলা ২০২৪",
    "বিজ্ঞান ও প্রযুক্তি ২০২৪",
    "ভারত সরকারের প্রকল্প",
    "আন্তর্জাতিক চুক্তি ও সম্মেলন",
    "বই ও লেখক ২০২৪",
  ],
};

const MOCK_TEST_QUESTIONS = [
  {
    id: 1,
    subject: "gk",
    question: "ভারতের সংবিধান কত সালে কার্যকর হয়?",
    options: [
      "১৯৪৭ সালের ১৫ই আগস্ট",
      "১৯৪৯ সালের ২৬শে নভেম্বর",
      "১৯৫০ সালের ২৬শে জানুয়ারি",
      "১৯৫২ সালের ২৬শে জানুয়ারি",
    ],
    correct: 2,
    explanation:
      "ভারতের সংবিধান ১৯৫০ সালের ২৬শে জানুয়ারি কার্যকর হয়, যা প্রজাতন্ত্র দিবস হিসেবে পালিত হয়।",
  },
  {
    id: 2,
    subject: "math",
    question: "একটি জিনিস ₹800-তে কিনে ₹1000-তে বিক্রি করলে লাভের শতকরা হার কত?",
    options: ["20%", "25%", "30%", "15%"],
    correct: 1,
    explanation: "লাভ = 1000 - 800 = ₹200। লাভ% = (200/800)×100 = 25%",
  },
  {
    id: 3,
    subject: "english",
    question: "Choose the correct synonym of 'BENEVOLENT':",
    options: ["Cruel", "Kind", "Angry", "Lazy"],
    correct: 1,
    explanation:
      "'Benevolent' means showing kindness or goodwill. Its synonym is 'Kind'.",
  },
  {
    id: 4,
    subject: "reasoning",
    question: "সিরিজ পূরণ করুন: 2, 4, 8, 16, ___",
    options: ["24", "30", "32", "36"],
    correct: 2,
    explanation: "প্রতিটি সংখ্যা আগেরটির ২ গুণ। সুতরাং 16×2 = 32।",
  },
  {
    id: 5,
    subject: "gk",
    question: "'মহাভারত' কে রচনা করেন?",
    options: ["বাল্মীকি", "বেদব্যাস", "কালিদাস", "তুলসীদাস"],
    correct: 1,
    explanation: "মহাভারত মহর্ষি বেদব্যাস রচনা করেন। রামায়ণ রচনা করেন বাল্মীকি।",
  },
  {
    id: 6,
    subject: "math",
    question: "A ১০ দিনে ও B ১৫ দিনে একটি কাজ করতে পারে। একসাথে কতদিনে শেষ করবে?",
    options: ["5 দিন", "6 দিন", "8 দিন", "12 দিন"],
    correct: 1,
    explanation: "A+B = 1/10+1/15 = 3/30+2/30 = 5/30 = 1/6। সময় = 6 দিন।",
  },
  {
    id: 7,
    subject: "english",
    question: "Fill in the blank: She ___ reading a book when I arrived.",
    options: ["is", "was", "were", "has been"],
    correct: 1,
    explanation:
      "Past continuous tense: was + V-ing. So 'was reading' is correct.",
  },
  {
    id: 8,
    subject: "reasoning",
    question: "Doctor : Hospital :: Teacher : ___",
    options: ["Office", "Library", "School", "College"],
    correct: 2,
    explanation: "Doctor কাজ করেন Hospital-এ, Teacher কাজ করেন School-এ।",
  },
  {
    id: 9,
    subject: "gk",
    question: "ভারতের জাতীয় পশু কোনটি?",
    options: ["সিংহ", "হাতি", "বাঘ", "ময়ূর"],
    correct: 2,
    explanation: "ভারতের জাতীয় পশু রয়েল বেঙ্গল টাইগার (বাঘ)। ময়ূর হল জাতীয় পাখি।",
  },
  {
    id: 10,
    subject: "math",
    question: "যদি x + y = 10 এবং xy = 21 হয়, তাহলে x² + y² কত?",
    options: ["58", "62", "100", "79"],
    correct: 0,
    explanation: "x²+y² = (x+y)² - 2xy = 100 - 42 = 58",
  },
  {
    id: 11,
    subject: "gk",
    question: "ভারতের প্রথম মহিলা প্রধানমন্ত্রী কে ছিলেন?",
    options: ["প্রতিভা পাটিল", "ইন্দিরা গান্ধী", "সোনিয়া গান্ধী", "সুষমা স্বরাজ"],
    correct: 1,
    explanation:
      "ইন্দিরা গান্ধী ছিলেন ভারতের প্রথম এবং এখন পর্যন্ত একমাত্র মহিলা প্রধানমন্ত্রী।",
  },
  {
    id: 12,
    subject: "reasoning",
    question: "ABCD → BCDE, তাহলে PQRS → ___",
    options: ["QRST", "PQRS", "RSTU", "OPQR"],
    correct: 0,
    explanation:
      "প্রতিটি অক্ষর একটি করে এগিয়ে যায়। P→Q, Q→R, R→S, S→T। সুতরাং QRST।",
  },
  {
    id: 13,
    subject: "english",
    question: "One word substitution: 'A person who loves books'",
    options: ["Bibliophile", "Misanthrope", "Philanthropist", "Lexicographer"],
    correct: 0,
    explanation:
      "Bibliophile মানে বইপ্রেমী মানুষ। 'Biblio' = book, 'phile' = lover।",
  },
  {
    id: 14,
    subject: "gk",
    question: "কোন বছর ভারত প্রথম ক্রিকেট বিশ্বকাপ জেতে?",
    options: ["1979", "1983", "1987", "2003"],
    correct: 1,
    explanation:
      "ভারত ১৯৮৩ সালে কপিল দেবের নেতৃত্বে প্রথম ICC Cricket World Cup জেতে।",
  },
  {
    id: 15,
    subject: "math",
    question: "একটি বৃত্তের ব্যাসার্ধ ৭ সে.মি.। এর ক্ষেত্রফল কত?",
    options: ["154 বর্গসে.মি.", "44 সে.মি.", "22 সে.মি.", "308 বর্গসে.মি."],
    correct: 0,
    explanation: "ক্ষেত্রফল = πr² = (22/7)×7×7 = 154 বর্গসে.মি.।",
  },
];

const PYQ_DATA = [
  {
    year: "SSC CGL 2024",
    subject: "GK",
    question: "কে 'আধুনিক ভারতের জনক' নামে পরিচিত?",
    answer:
      "রাজা রামমোহন রায় — তিনি সতীদাহ প্রথা বিলোপে এবং শিক্ষা সংস্কারে গুরুত্বপূর্ণ ভূমিকা পালন করেন। তাঁকে 'ভারতীয় রেনেসাঁর জনক'ও বলা হয়।",
  },
  {
    year: "SSC CHSL 2024",
    subject: "Math",
    question: "যদি কোনো সংখ্যার ২০% = ৫০ হয়, তাহলে সেই সংখ্যার ৮০% কত?",
    answer: "সংখ্যা = 50×100/20 = 250। ৮০% = 250×80/100 = 200।",
  },
  {
    year: "SSC CGL 2023",
    subject: "English",
    question: "The antonym of 'OBSEQUIOUS' is:",
    answer:
      "ASSERTIVE / BOLD — Obsequious মানে অতিরিক্ত মাত্রায় মেনে চলা, বা চাটুকারিতা করা। এর বিপরীত হল দৃঢ়, স্বাধীনচেতা (assertive/bold)।",
  },
  {
    year: "SSC MTS 2023",
    subject: "Reasoning",
    question: "Coding: CAT = 3120, DOG = ___",
    answer:
      "DOG = 4157। পদ্ধতি: প্রতিটি অক্ষরের বর্ণমালায় অবস্থান। D=4, O=15, G=7 → 4157।",
  },
  {
    year: "SSC GD 2023",
    subject: "GK",
    question: "'মিশন চন্দ্রযান-৩' কবে চাঁদে সফলভাবে অবতরণ করে?",
    answer:
      "২৩শে আগস্ট ২০২৩ — ভারতের Chandrayaan-3 চাঁদের দক্ষিণ মেরু অঞ্চলে সফলভাবে অবতরণ করে। এই সাফল্যের পর ২৩ আগস্ট ভারতে 'জাতীয় মহাকাশ দিবস' ঘোষিত হয়।",
  },
];

function generateSSCAnswer(
  topic: string,
  question: string,
  _answerType: AnswerType,
  subject: string,
): string {
  const q = question.toLowerCase();
  const t = topic.toLowerCase();

  if (
    subject === "gk" &&
    (q.includes("constitution") || q.includes("সংবিধান") || t.includes("রাজনীতি"))
  ) {
    return `## 🏛️ ভারতীয় সংবিধান ও রাজনীতি

**Quick Answer:** ভারতের সংবিধান ১৯৪৯ সালের ২৬শে নভেম্বর গৃহীত হয় এবং ১৯৫০ সালের ২৬শে জানুয়ারি কার্যকর হয়।

---

### 📋 মূল তথ্যাবলী
| বিষয় | তথ্য |
|---|---|
| সংবিধান রচনার সময়কাল | ২ বছর ১১ মাস ১৮ দিন |
| প্রথম খসড়া কমিটির চেয়ারম্যান | ড. ভীমরাও আম্বেদকর |
| মোট অনুচ্ছেদ (মূল) | ৩৯৫টি অনুচ্ছেদ, ৮টি তফসিল |
| বর্তমান অনুচ্ছেদ | ৪৭০+ অনুচ্ছেদ, ১২টি তফসিল |
| মৌলিক অধিকার | অনুচ্ছেদ ১২–৩৫ |
| নির্দেশমূলক নীতি | অনুচ্ছেদ ৩৬–৫১ |

### 🔑 গুরুত্বপূর্ণ অনুচ্ছেদ (SSC প্রশ্ন বেশি)
- **Article 14** — সাম্যের অধিকার
- **Article 19** — বাক ও অভিব্যক্তির স্বাধীনতা
- **Article 21** — জীবন ও ব্যক্তিগত স্বাধীনতার অধিকার
- **Article 32** — সাংবিধানিক প্রতিকারের অধিকার (Constitution-এর হৃদয)
- **Article 356** — রাষ্ট্রপতির শাসন

### 💡 SSC Exam Tip
**Memory Trick:** 14, 19, 21, 32 — এই চারটি Article সবচেয়ে বেশি প্রশ্ন হয়।

*English Summary:* The Indian Constitution came into force on January 26, 1950. Dr. B.R. Ambedkar chaired the Drafting Committee. It is the world's longest written constitution.`;
  }

  if (
    subject === "math" &&
    (q.includes("percent") ||
      q.includes("শতকরা") ||
      q.includes("profit") ||
      q.includes("লাভ") ||
      t.includes("শতকরা") ||
      t.includes("লাভ"))
  ) {
    return `## 🧮 শতকরা ও লাভ-ক্ষতি (Percentage & Profit-Loss)

### 📐 মূল সূত্র
\`\`\`
Profit% = (Profit / CP) × 100
Loss% = (Loss / CP) × 100
SP = CP × (100 + Profit%) / 100
\`\`\`

### 📝 উদাহরণ
**প্রশ্ন:** ₹800-তে কিনে ₹1000-তে বিক্রি করলে লাভ%?
- Profit = 1000 - 800 = ₹200
- Profit% = (200/800) × 100 = **25%** ✅

### ⚡ SSC Shortcut
- Successive discount: নেট discount = a + b - ab/100

### 💡 Exam Tip
SSC CGL-এ প্রতি বছর ৩–৫টি লাভ-ক্ষতির প্রশ্ন আসে।`;
  }

  if (
    subject === "math" &&
    (q.includes("time") ||
      q.includes("work") ||
      q.includes("কাজ") ||
      t.includes("সময় ও কাজ"))
  ) {
    return `## ⏱️ সময় ও কাজ (Time & Work)

### 📐 মূল সূত্র
\`\`\`
A ও B একসাথে = ab/(a+b) দিন
\`\`\`

### 📝 উদাহরণ
**প্রশ্ন:** A ১০ দিনে ও B ১৫ দিনে কাজ করে। একসাথে?
- 1/10 + 1/15 = 5/30 = 1/6
- সময় = **৬ দিন** ✅

### 💡 Exam Tip
Pipes & Cistern সমস্যা Time & Work-এর মতোই।`;
  }

  if (
    subject === "english" &&
    (q.includes("tense") ||
      q.includes("grammar") ||
      q.includes("voice") ||
      t.includes("grammar"))
  ) {
    return `## 📖 English Grammar for SSC

### ⏰ Tenses (কাল)
| Tense | Structure | Example |
|---|---|---|
| Simple Present | Subject + V1 | He reads books. |
| Present Continuous | Subject + is/am/are + V-ing | She is reading. |
| Present Perfect | Subject + has/have + V3 | They have finished. |
| Simple Past | Subject + V2 | He read books. |
| Simple Future | Subject + will + V1 | She will read. |

### 🔄 Active & Passive Voice
- **Active:** *Ram eats mangoes.*
- **Passive:** *Mangoes are eaten by Ram.*

### 💡 SSC Exam Tip
Error Detection-এ সবচেয়ে বেশি ভুল Subject-Verb Agreement-এ।

*বাংলা:* SSC পরীক্ষায় Tense, Voice এবং Error Detection থেকে সবচেয়ে বেশি প্রশ্ন আসে।`;
  }

  if (
    subject === "english" &&
    (q.includes("synonym") ||
      q.includes("antonym") ||
      q.includes("vocabulary") ||
      t.includes("synonyms"))
  ) {
    return `## 📚 Synonyms & Antonyms for SSC

### 🔤 Important Word Pairs
| Word | Synonym | Antonym |
|---|---|---|
| Benevolent | Kind, Generous | Malevolent, Cruel |
| Eloquent | Fluent, Articulate | Inarticulate |
| Diligent | Hardworking | Lazy, Idle |
| Candid | Frank, Honest | Deceptive |
| Austere | Strict, Stern | Lenient |
| Frugal | Thrifty | Lavish |
| Obstinate | Stubborn | Flexible |

### 💡 One Word Substitutions
- **Bibliophile** — বইপ্রেমী
- **Omnipotent** — সর্বশক্তিমান
- **Philanthropist** — মানবদরদী
- **Posthumous** — মৃত্যুর পর

*বাংলা:* SSC পরীক্ষায় Synonyms ও Antonyms থেকে ৫–১০টি প্রশ্ন আসে।`;
  }

  if (
    subject === "reasoning" &&
    (q.includes("analogy") ||
      q.includes("সাদৃশ্য") ||
      q.includes("series") ||
      q.includes("সিরিজ") ||
      t.includes("সাদৃশ্য") ||
      t.includes("সিরিজ"))
  ) {
    return `## 🧠 Analogy & Series — General Intelligence

### 🔗 Analogy (সাদৃশ্য)
- Doctor : Hospital :: Teacher : **School**
- Book : Library :: Money : **Bank**
- Pen : Write :: Knife : **Cut**

### 🔢 Number Series
- 2, 4, 8, 16, 32 → **×2** (উত্তর: 64)
- 1, 4, 9, 16, 25 → **Perfect Squares** (উত্তর: 36)
- 3, 6, 11, 18, 27 → **+3, +5, +7, +9** (উত্তর: 38)

### 💡 SSC Tip
Pattern খোঁজার অভ্যাস করুন। প্রতিদিন ২০টি practice করুন।`;
  }

  // Default answer
  return `## 📚 ${topic || subject.toUpperCase()} — SSC Preparation Guide

### 🎯 বিষয়ের সারসংক্ষেপ

SSC পরীক্ষায় এই বিষয়টি অত্যন্ত গুরুত্বপূর্ণ। নিচে মূল বিষয়গুলো দেওয়া হল:

### 📋 মূল তথ্যাবলী
- এই chapter-এর সমস্ত concepts বুঝে পড়ুন
- Previous year questions solve করুন
- Shortcut formula মনে রাখুন
- Regular revision করুন

### 📝 অনুশীলন প্রশ্ন (MCQ)
Q: এই topic সম্পর্কিত SSC পরীক্ষায় প্রায়ই যে প্রশ্নগুলো আসে সেগুলো practice করুন।

### 💡 Exam Strategy
- প্রতিদিন ৪–৫ ঘণ্টা পড়ুন
- Mock Test দিন নিয়মিত  
- পুরনো প্রশ্নপত্র সমাধান করুন
- Weak topics-এ বেশি সময় দিন

*বাংলা সারসংক্ষেপ:* ${question || "এই বিষয়টি"} SSC পরীক্ষার জন্য গুরুত্বপূর্ণ। নিয়মিত practice এবং revision করলে এই বিষয়ে ভালো নম্বর পাওয়া সম্ভব।

*English Summary: This topic is frequently tested in SSC CGL/CHSL/MTS exams. Understanding the fundamental concepts and practicing with previous year questions is the best preparation strategy.*`;
}

function renderAnswer(text: string) {
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const i = idx;
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-yellow-400">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-base font-bold mt-3 mb-1.5 text-yellow-300/80"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("| ") && line.endsWith(" |")) {
      return (
        <div
          key={i}
          className="font-mono text-xs py-0.5 text-slate-300 overflow-x-auto"
        >
          {line}
        </div>
      );
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <li key={i} className="text-sm ml-4 py-0.5 text-slate-200 list-disc">
          {line.replace(/^[\-\*] /, "")}
        </li>
      );
    }
    if (/^\d+\./.test(line)) {
      return (
        <li key={i} className="text-sm ml-4 py-0.5 text-slate-200 list-decimal">
          {line.replace(/^\d+\.\s*/, "")}
        </li>
      );
    }
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return (
        <p key={i} className="text-sm font-bold py-0.5 text-amber-300">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (line.startsWith("*") && !line.startsWith("**")) {
      return (
        <p key={i} className="text-xs italic text-slate-400 py-0.5">
          {line.replace(/\*/g, "")}
        </p>
      );
    }
    if (line === "---") {
      return <hr key={i} className="border-slate-600 my-2" />;
    }
    if (line.startsWith("```")) return null;
    if (line.trim() === "") return <div key={i} className="h-1.5" />;
    const boldParts = line.split(/(\*\*[^*]+\*\*)/);
    return (
      <p key={i} className="text-sm py-0.5 text-slate-200 leading-relaxed">
        {boldParts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable text parts
            <strong key={`b-${i}-${j}`} className="text-amber-300">
              {part.slice(2, -2)}
            </strong>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable text parts
            <span key={`t-${i}-${j}`}>{part}</span>
          ),
        )}
      </p>
    );
  });
}

// ===== Test Series Component =====
function TestSeries() {
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [selectedExamFilter, setSelectedExamFilter] = useState<ExamType>("CGL");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (testStarted && !testFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTestFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStarted, testFinished]);

  const questions = MOCK_TEST_QUESTIONS;
  const totalQ = questions.length;

  function handleAnswer(qId: number, optIdx: number) {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestFinished(true);
  }

  function handleNext() {
    if (currentQ < totalQ - 1) setCurrentQ((p) => p + 1);
  }

  function handlePrev() {
    if (currentQ > 0) setCurrentQ((p) => p - 1);
  }

  function calcScore() {
    return questions.reduce((acc, q) => {
      if (answers[q.id] === q.correct) return acc + 1;
      return acc;
    }, 0);
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (!testStarted) {
    return (
      <div className="space-y-6" data-ocid="ssc.test.panel">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Full Mock Test</h3>
              <p className="text-sm text-slate-400">
                {totalQ} Questions · 60 Minutes · All Subjects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "প্রশ্ন সংখ্যা", value: `${totalQ}টি`, icon: "❓" },
              { label: "সময়সীমা", value: "৬০ মিনিট", icon: "⏱️" },
              { label: "নম্বর", value: `${totalQ} মার্ক`, icon: "📊" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-3 text-center"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="font-bold text-white text-sm">{item.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-3">পরীক্ষা বেছে নিন:</p>
            <div className="flex flex-wrap gap-2">
              {SSC_EXAMS.map((exam) => (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => setSelectedExamFilter(exam.id)}
                  data-ocid="ssc.exam.button"
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background:
                      selectedExamFilter === exam.id
                        ? `${exam.color}33`
                        : "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedExamFilter === exam.id ? `${exam.color}99` : "rgba(255,255,255,0.1)"}`,
                    color:
                      selectedExamFilter === exam.id ? exam.color : "#94a3b8",
                  }}
                >
                  SSC {exam.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-300 font-semibold mb-2">
              📌 নির্দেশাবলী
            </p>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর</li>
              <li>• কোনো নেগেটিভ মার্কিং নেই (practice mode)</li>
              <li>• সময় শেষ হলে স্বয়ংক্রিয়ভাবে জমা হবে</li>
              <li>• সব প্রশ্নের উত্তর দেওয়ার চেষ্টা করুন</li>
            </ul>
          </div>

          <Button
            onClick={() => {
              setTestStarted(true);
              setCurrentQ(0);
              setAnswers({});
              setTimeLeft(60 * 60);
              setTestFinished(false);
            }}
            className="w-full h-12 text-base font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-900"
            data-ocid="ssc.test.primary_button"
          >
            <Trophy className="w-5 h-5 mr-2" />
            পরীক্ষা শুরু করুন
          </Button>
        </div>

        <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-6">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Quick Practice Sets
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SUBJECTS.map((subj) => (
              <div
                key={subj.id}
                className={`rounded-xl p-4 ${subj.bg} border ${subj.border} text-center`}
              >
                <div className={`${subj.color} mb-2 flex justify-center`}>
                  {subj.icon}
                </div>
                <p className="text-xs font-semibold text-white">{subj.label}</p>
                <p className={`text-xs mt-1 ${subj.color}`}>5 Questions</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (testFinished) {
    const score = calcScore();
    const pct = Math.round((score / totalQ) * 100);
    return (
      <div className="space-y-6" data-ocid="ssc.test.success_state">
        <div className="rounded-2xl p-8 text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-yellow-500/30">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500/40 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">পরীক্ষা সম্পন্ন!</h3>
          <p className="text-slate-400 mb-6">আপনার ফলাফল নিচে দেখুন</p>
          <div className="text-6xl font-bold text-yellow-400 mb-2">
            {score}/{totalQ}
          </div>
          <p className="text-slate-300 mb-4">সঠিক উত্তর — {pct}%</p>
          <Progress value={pct} className="h-3 mb-6 bg-slate-700" />
          <Badge
            className={`text-base px-4 py-1.5 mb-6 ${
              pct >= 80
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : pct >= 60
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-rose-500/20 text-rose-400 border-rose-500/30"
            } border`}
          >
            {pct >= 80 ? "🏆 অসাধারণ!" : pct >= 60 ? "👍 ভালো!" : "📚 আরও পড়ুন"}
          </Badge>
          <Button
            onClick={() => {
              setTestStarted(false);
              setTestFinished(false);
              setAnswers({});
              setCurrentQ(0);
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold"
            data-ocid="ssc.test.primary_button"
          >
            আবার পরীক্ষা দিন
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white">সঠিক উত্তর</h4>
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const correct = userAns === q.correct;
            return (
              <div
                key={q.id}
                className={`rounded-xl p-4 border ${correct ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}
                data-ocid={`ssc.test.item.${idx + 1}`}
              >
                <div className="flex items-start gap-3">
                  {correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-2">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-xs text-slate-400">
                      সঠিক উত্তর:{" "}
                      <span className="text-emerald-400 font-semibold">
                        {q.options[q.correct]}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const answered = Object.keys(answers).length;
  return (
    <div className="space-y-4" data-ocid="ssc.test.panel">
      {/* Timer bar */}
      <div className="flex items-center justify-between rounded-xl bg-slate-800/60 border border-slate-700/50 px-5 py-3">
        <div className="flex items-center gap-2">
          <Clock
            className={`w-4 h-4 ${timeLeft < 300 ? "text-rose-400" : "text-yellow-400"}`}
          />
          <span
            className={`font-bold font-mono text-lg ${timeLeft < 300 ? "text-rose-400" : "text-yellow-400"}`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="text-sm text-slate-400">
          উত্তর দিয়েছেন:{" "}
          <span className="text-white font-bold">
            {answered}/{totalQ}
          </span>
        </div>
        <Button
          size="sm"
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold"
          data-ocid="ssc.test.submit_button"
        >
          জমা দিন
        </Button>
      </div>

      <Progress
        value={(answered / totalQ) * 100}
        className="h-2 bg-slate-700"
      />

      {/* Question */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border text-xs">
            প্রশ্ন {currentQ + 1}/{totalQ}
          </Badge>
          <Badge className="bg-slate-700/60 text-slate-300 border-slate-600 border text-xs capitalize">
            {q.subject === "gk"
              ? "GK"
              : q.subject === "math"
                ? "Math"
                : q.subject === "english"
                  ? "English"
                  : "Reasoning"}
          </Badge>
        </div>
        <p className="text-base font-semibold text-white mb-6 leading-relaxed">
          {q.question}
        </p>

        <div className="grid gap-3">
          {q.options.map((opt, optIdx) => {
            const selected = answers[q.id] === optIdx;
            return (
              <button
                key={`${q.id}-opt-${optIdx}`}
                type="button"
                onClick={() => handleAnswer(q.id, optIdx)}
                data-ocid="ssc.test.toggle"
                className="w-full text-left rounded-xl px-5 py-3.5 text-sm font-medium transition-all border"
                style={{
                  background: selected
                    ? "rgba(251,191,36,0.15)"
                    : "rgba(255,255,255,0.03)",
                  borderColor: selected
                    ? "rgba(251,191,36,0.6)"
                    : "rgba(255,255,255,0.1)",
                  color: selected ? "#fbbf24" : "#cbd5e1",
                }}
              >
                <span className="font-bold mr-3">
                  {String.fromCharCode(65 + optIdx)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          data-ocid="ssc.test.pagination_prev"
        >
          ← আগের প্রশ্ন
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQ === totalQ - 1}
          className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold"
          data-ocid="ssc.test.pagination_next"
        >
          পরের প্রশ্ন →
        </Button>
      </div>

      {/* Question Navigator */}
      <div className="rounded-xl bg-slate-800/40 border border-slate-700/50 p-4">
        <p className="text-xs text-slate-400 mb-3">প্রশ্ন নম্বর</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((qItem, idx) => (
            <button
              key={qItem.id}
              type="button"
              onClick={() => setCurrentQ(idx)}
              className="w-9 h-9 rounded-lg text-xs font-bold transition-all border"
              style={{
                background:
                  currentQ === idx
                    ? "rgba(251,191,36,0.25)"
                    : answers[qItem.id] !== undefined
                      ? "rgba(16,185,129,0.15)"
                      : "rgba(255,255,255,0.05)",
                borderColor:
                  currentQ === idx
                    ? "rgba(251,191,36,0.7)"
                    : answers[qItem.id] !== undefined
                      ? "rgba(16,185,129,0.4)"
                      : "rgba(255,255,255,0.1)",
                color:
                  currentQ === idx
                    ? "#fbbf24"
                    : answers[qItem.id] !== undefined
                      ? "#34d399"
                      : "#94a3b8",
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Main SSCPage =====
export function SSCPage() {
  const [selectedExam, setSelectedExam] = useState<ExamType>("CGL");
  const [activeTab, setActiveTab] = useState<
    "study" | "test" | "pyq" | "strategy"
  >("study");
  const [activeSubject, setActiveSubject] = useState<SubjectKey>("gk");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState<AnswerType>("concept");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentExam = SSC_EXAMS.find((e) => e.id === selectedExam)!;
  const currentSubject = SUBJECTS.find((s) => s.id === activeSubject)!;

  function handleChapterClick(ch: string) {
    setSelectedChapter(ch);
    setQuestion(ch);
  }

  function handleSearch() {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer("");
    setTimeout(() => {
      const ans = generateSSCAnswer(
        selectedChapter || activeSubject,
        question,
        answerType,
        activeSubject,
      );
      setAnswer(ans);
      setIsLoading(false);
    }, 400);
  }

  const TABS = [
    { id: "study" as const, label: "📚 Study", shortLabel: "Study" },
    { id: "test" as const, label: "⏱️ Test Series", shortLabel: "Test" },
    { id: "pyq" as const, label: "📋 PYQ", shortLabel: "PYQ" },
    { id: "strategy" as const, label: "🎯 Strategy", shortLabel: "Strategy" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0f1929 100%)",
      }}
      data-ocid="ssc.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Hero Header */}
        <div
          className="rounded-2xl p-6 mb-8 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            border: "1px solid rgba(251,191,36,0.3)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.3) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.4)",
              }}
            >
              <Briefcase className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                SSC Job Preparation
              </h1>
              <p className="text-yellow-400/80 text-sm font-medium mb-2">
                Staff Selection Commission — সরকারি চাকরির প্রস্তুতি
              </p>
              <div className="flex flex-wrap gap-2">
                {["GK", "Math", "English", "Reasoning", "Current Affairs"].map(
                  (s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
                    >
                      {s}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">6+</div>
                <div className="text-xs text-slate-400">Exams</div>
              </div>
              <div className="w-px h-10 bg-slate-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">5</div>
                <div className="text-xs text-slate-400">Subjects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Type Selector */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            📋 পরীক্ষা বেছে নিন
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SSC_EXAMS.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelectedExam(exam.id)}
                data-ocid="ssc.exam.button"
                className="rounded-xl p-3 text-center transition-all relative overflow-hidden"
                style={{
                  background:
                    selectedExam === exam.id
                      ? `${exam.color}1a`
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedExam === exam.id ? `${exam.color}66` : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div
                  className="font-bold text-sm"
                  style={{
                    color: selectedExam === exam.id ? exam.color : "#94a3b8",
                  }}
                >
                  SSC {exam.name}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                  {exam.tier}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exam Info Bar */}
        <div
          className="rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center"
          style={{
            background: `${currentExam.color}0d`,
            border: `1px solid ${currentExam.color}33`,
          }}
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" style={{ color: currentExam.color }} />
            <span
              className="font-bold text-sm"
              style={{ color: currentExam.color }}
            >
              {currentExam.name} — {currentExam.fullName}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>
              📚 যোগ্যতা:{" "}
              <span className="text-white">{currentExam.eligibility}</span>
            </span>
            <span>
              💰 বেতন:{" "}
              <span className="font-bold" style={{ color: currentExam.color }}>
                {currentExam.salary}
              </span>
            </span>
            <span>
              🏢 পদ:{" "}
              <span className="text-white">
                {currentExam.posts.split(",")[0]}...
              </span>
            </span>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                data-ocid="ssc.tab"
                className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
                style={{
                  background:
                    activeTab === tab.id
                      ? "rgba(251,191,36,0.2)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeTab === tab.id ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activeTab === tab.id ? "#fbbf24" : "#94a3b8",
                }}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STUDY TAB */}
        {activeTab === "study" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Subject Cards */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  🎓 বিষয় বেছে নিন
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SUBJECTS.map((subj) => (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => {
                        setActiveSubject(subj.id);
                        setSelectedChapter("");
                        setAnswer("");
                      }}
                      data-ocid="ssc.tab"
                      className={`rounded-2xl p-4 text-left transition-all border ${
                        activeSubject === subj.id
                          ? `${subj.bg} ${subj.border}`
                          : "bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/60"
                      }`}
                    >
                      <div
                        className={`${activeSubject === subj.id ? subj.color : "text-slate-500"} mb-3`}
                      >
                        {subj.icon}
                      </div>
                      <div
                        className={`font-bold text-sm mb-1 ${activeSubject === subj.id ? "text-white" : "text-slate-300"}`}
                      >
                        {subj.label}
                      </div>
                      <div
                        className={`text-xs ${activeSubject === subj.id ? subj.color : "text-slate-500"}`}
                      >
                        {subj.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter Chips */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  📖 {currentSubject.label} — Chapter বেছে নিন
                </p>
                <div className="flex flex-wrap gap-2">
                  {CHAPTER_MAP[activeSubject].map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleChapterClick(ch)}
                      data-ocid="ssc.chapter.button"
                      className="text-xs px-3 py-2 rounded-full transition-all border font-medium"
                      style={{
                        background:
                          selectedChapter === ch
                            ? "rgba(251,191,36,0.15)"
                            : "rgba(255,255,255,0.04)",
                        borderColor:
                          selectedChapter === ch
                            ? "rgba(251,191,36,0.5)"
                            : "rgba(255,255,255,0.1)",
                        color: selectedChapter === ch ? "#fbbf24" : "#94a3b8",
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Input */}
              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/40 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  ❓ প্রশ্ন করুন
                </p>
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="যেকোনো প্রশ্ন লিখুন... (e.g. Article 21, লাভ-ক্ষতি সূত্র)"
                      data-ocid="ssc.search_input"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none text-white placeholder:text-slate-500"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading || !question.trim()}
                    className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-5"
                    data-ocid="ssc.search_input"
                  >
                    {isLoading ? "..." : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["concept", "short", "mcq", "pyq"] as AnswerType[]).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAnswerType(type)}
                        data-ocid="ssc.toggle"
                        className="text-xs px-3 py-1.5 rounded-full transition-all border"
                        style={{
                          background:
                            answerType === type
                              ? "rgba(251,191,36,0.15)"
                              : "rgba(255,255,255,0.03)",
                          borderColor:
                            answerType === type
                              ? "rgba(251,191,36,0.5)"
                              : "rgba(255,255,255,0.1)",
                          color: answerType === type ? "#fbbf24" : "#64748b",
                        }}
                      >
                        {type === "concept"
                          ? "📖 Concept"
                          : type === "short"
                            ? "✏️ Short"
                            : type === "mcq"
                              ? "🎯 MCQ"
                              : "📋 PYQ"}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Answer */}
              {isLoading && (
                <div
                  className="rounded-2xl bg-slate-800/40 border border-slate-700/40 p-6"
                  data-ocid="ssc.loading_state"
                >
                  <div className="space-y-3">
                    {["w-3/4", "w-full", "w-5/6", "w-2/3"].map((w) => (
                      <div
                        key={w}
                        className={`h-4 rounded-full bg-slate-700/60 animate-pulse ${w}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && answer && (
                <div
                  className="rounded-2xl bg-slate-800/40 border border-yellow-500/20 p-6"
                  data-ocid="ssc.success_state"
                >
                  <div className="leading-loose">{renderAnswer(answer)}</div>
                </div>
              )}

              {!isLoading && !answer && (
                <div
                  className="rounded-2xl bg-slate-800/20 border border-slate-700/30 p-10 text-center"
                  data-ocid="ssc.empty_state"
                >
                  <Target className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400 font-medium">
                    উপরে chapter বেছে নিন বা প্রশ্ন লিখুন
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    যেমন: "Article 21 কী?", "লাভ-ক্ষতির সূত্র", "Coding Decoding
                    rules"
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: `${currentExam.color}0d`,
                  border: `1px solid ${currentExam.color}33`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy
                    className="w-4 h-4"
                    style={{ color: currentExam.color }}
                  />
                  <span
                    className="font-bold text-sm"
                    style={{ color: currentExam.color }}
                  >
                    SSC {currentExam.name} Overview
                  </span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Full Name</span>
                    <span className="text-white font-medium text-right max-w-[60%]">
                      {currentExam.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Eligibility</span>
                    <span className="text-white font-medium">
                      {currentExam.eligibility}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Salary</span>
                    <span
                      className="font-bold"
                      style={{ color: currentExam.color }}
                    >
                      {currentExam.salary}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exam Tier</span>
                    <span className="text-white font-medium">
                      {currentExam.tier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/40 border border-slate-700/40 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-sm text-white">
                    সব SSC পরীক্ষা
                  </span>
                </div>
                <div className="space-y-2">
                  {SSC_EXAMS.map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => setSelectedExam(exam.id)}
                      className="w-full flex items-center justify-between text-xs py-2 border-b border-slate-700/30 last:border-0 cursor-pointer"
                    >
                      <div>
                        <span
                          className="font-bold"
                          style={{ color: exam.color }}
                        >
                          SSC {exam.name}
                        </span>
                        <span className="text-slate-500 ml-2">
                          {exam.eligibility}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/40 border border-yellow-500/20 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-sm text-yellow-400">
                    প্রস্তুতির টিপস
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {[
                    "প্রতিদিন ৪–৫ ঘণ্টা পড়ুন",
                    "Mock Test দিন নিয়মিত",
                    "পুরনো প্রশ্নপত্র সমাধান করুন",
                    "Current Affairs নিয়মিত পড়ুন",
                    "Weak topic-এ বেশি সময় দিন",
                    "Shortcut formula শিখুন",
                  ].map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span className="text-yellow-400">✅</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <Badge className="text-xs bg-slate-800 text-slate-400 border border-slate-700">
                  SSC Official: ssc.nic.in
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* TEST SERIES TAB */}
        {activeTab === "test" && (
          <div className="max-w-3xl">
            <TestSeries />
          </div>
        )}

        {/* PYQ TAB */}
        {activeTab === "pyq" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">
                📋 Previous Year Questions with Answers
              </p>
            </div>
            {PYQ_DATA.map((pyq, idx) => (
              <Card
                key={`${pyq.year}-${pyq.subject}`}
                className="bg-slate-800/40 border-slate-700/40"
                data-ocid={`ssc.pyq.item.${idx + 1}`}
              >
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="text-xs bg-yellow-500/15 text-yellow-400 border-yellow-500/25 border">
                      {pyq.year}
                    </Badge>
                    <Badge className="text-xs bg-slate-700/60 text-slate-300 border-slate-600 border">
                      {pyq.subject}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-white mb-3">
                    {pyq.question}
                  </p>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      ✅ উত্তর:
                    </p>
                    <p className="text-sm text-slate-200">{pyq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* STRATEGY TAB */}
        {activeTab === "strategy" && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {[
              {
                title: "SSC CGL 3-Month Plan",
                color: "amber",
                steps: [
                  {
                    month: "Month 1",
                    focus: "GK + Math Foundation",
                    detail:
                      "NCERT-based history, geography, basic arithmetic, percentages",
                  },
                  {
                    month: "Month 2",
                    focus: "English + Reasoning",
                    detail:
                      "Grammar rules, vocabulary, analogy, series, coding",
                  },
                  {
                    month: "Month 3",
                    focus: "Revision + Mock Tests",
                    detail:
                      "Full mock tests daily, weak area focus, current affairs",
                  },
                ],
              },
              {
                title: "Subject-Wise Weightage (CGL Tier-I)",
                color: "blue",
                steps: [
                  {
                    month: "GK",
                    focus: "25 Questions",
                    detail:
                      "History 5, Geography 5, Polity 5, Science 5, Economics 5",
                  },
                  {
                    month: "Math",
                    focus: "25 Questions",
                    detail: "Arithmetic 15, Algebra 5, Geometry 5",
                  },
                  {
                    month: "English",
                    focus: "25 Questions",
                    detail: "Grammar 10, Vocabulary 10, Comprehension 5",
                  },
                  {
                    month: "Reasoning",
                    focus: "25 Questions",
                    detail: "Analogy 5, Series 5, Coding 5, Misc 10",
                  },
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-2xl p-5 bg-slate-800/40 border border-slate-700/40"
              >
                <h3 className="font-bold text-white mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.steps.map((step) => (
                    <div key={step.month} className="flex gap-3">
                      <div
                        className="w-20 shrink-0 text-xs font-bold px-2 py-1 rounded-lg text-center"
                        style={{
                          background:
                            section.color === "amber"
                              ? "rgba(245,158,11,0.15)"
                              : "rgba(59,130,246,0.15)",
                          color:
                            section.color === "amber" ? "#f59e0b" : "#60a5fa",
                          border: `1px solid ${section.color === "amber" ? "rgba(245,158,11,0.3)" : "rgba(59,130,246,0.3)"}`,
                        }}
                      >
                        {step.month}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {step.focus}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
