import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  ChevronRight,
  Globe,
  Newspaper,
  Search,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

type ExamType = "CGL" | "CHSL" | "MTS" | "GD";
type AnswerType = "concept" | "short" | "mcq" | "pyq";

const SSC_EXAMS: Array<{
  id: ExamType;
  name: string;
  fullName: string;
  eligibility: string;
  posts: string;
  salary: string;
  color: string;
}> = [
  {
    id: "CGL",
    name: "SSC CGL",
    fullName: "Combined Graduate Level",
    eligibility: "স্নাতক (Graduate)",
    posts:
      "Inspector, Assistant Section Officer, Auditor, Accountant, Tax Assistant",
    salary: "₹25,500 – ₹1,12,400",
    color: "#ff6b35",
  },
  {
    id: "CHSL",
    name: "SSC CHSL",
    fullName: "Combined Higher Secondary Level",
    eligibility: "উচ্চ মাধ্যমিক (Class 12)",
    posts: "DEO, LDC, Junior Secretariat Assistant, Postal Assistant",
    salary: "₹19,900 – ₹63,200",
    color: "#f7c59f",
  },
  {
    id: "MTS",
    name: "SSC MTS",
    fullName: "Multi-Tasking Staff",
    eligibility: "মাধ্যমিক (Class 10)",
    posts: "Multi-Tasking Staff (Non-Technical)",
    salary: "₹18,000 – ₹56,900",
    color: "#4ecdc4",
  },
  {
    id: "GD",
    name: "SSC GD",
    fullName: "GD Constable",
    eligibility: "মাধ্যমিক (Class 10)",
    posts: "Constable GD in BSF, CISF, CRPF, SSB, ITBP, AR",
    salary: "₹21,700 – ₹69,100",
    color: "#a8e6cf",
  },
];

const GK_CHAPTERS = [
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
];

const MATH_CHAPTERS = [
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
];

const ENGLISH_CHAPTERS = [
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
];

const REASONING_CHAPTERS = [
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
];

const CURRENT_AFFAIRS_CHAPTERS = [
  "জাতীয় সংবাদ ২০২৪",
  "আন্তর্জাতিক সংবাদ ২০২৪",
  "পুরস্কার ও সম্মান ২০২৪",
  "খেলাধুলা ২০২৪",
  "বিজ্ঞান ও প্রযুক্তি",
  "নিয়োগ ও পদত্যাগ",
  "বাজেট ও অর্থনীতি ২০২৪",
  "আন্তর্জাতিক চুক্তি ও সম্মেলন",
  "বই ও লেখক ২০২৪",
];

function generateSSCAnswer(
  topic: string,
  question: string,
  _answerType: AnswerType,
  subject: string,
): string {
  const q = question.toLowerCase();
  const t = topic.toLowerCase();

  // GK - Indian Constitution / Polity
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
| মৌলিক কর্তব্য | অনুচ্ছেদ ৫১A (৪২তম সংশোধন, ১৯৭৬) |

### 🔑 গুরুত্বপূর্ণ অনুচ্ছেদ (SSC প্রশ্ন বেশি)
- **Article 14** — সাম্যের অধিকার
- **Article 19** — বাক ও অভিব্যক্তির স্বাধীনতা
- **Article 21** — জীবন ও ব্যক্তিগত স্বাধীনতার অধিকার
- **Article 32** — সাংবিধানিক প্রতিকারের অধিকার ("Constitution-এর হৃদয" — ড. আম্বেদকর)
- **Article 356** — রাষ্ট্রপতির শাসন
- **Article 370** — জম্মু ও কাশ্মীরের বিশেষ মর্যাদা (২০১৯-এ বাতিল)

### 💡 SSC Exam Tip
**Memory Trick:** "১৪, ১৯, ২১, ৩২" — এই চারটি Article সবচেয়ে বেশি প্রশ্ন হয়। মনে রাখুন "এক চার, এক নয়, দুই এক, তিন দুই।"

*English Summary:* The Indian Constitution, adopted on November 26, 1949 (Constitution Day), came into force on January 26, 1950 (Republic Day). Dr. B.R. Ambedkar chaired the Drafting Committee. It is the world's longest written constitution with 470+ articles and 12 schedules.`;
  }

  // Math - Percentage / Profit Loss
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

**Percentage:**
\`\`\`
Percentage = (Value / Total Value) × 100
X is what % of Y = (X/Y) × 100
% increase = (Increase / Original) × 100
% decrease = (Decrease / Original) × 100
\`\`\`

**Profit & Loss:**
\`\`\`
Profit = SP - CP (যদি SP > CP)
Loss = CP - SP (যদি CP > SP)
Profit% = (Profit / CP) × 100
Loss% = (Loss / CP) × 100
SP = CP × (100 + Profit%) / 100
CP = SP × 100 / (100 + Profit%)
\`\`\`

### 📝 ধাপে ধাপে উদাহরণ

**প্রশ্ন:** একটি জিনিস ₹800-তে কিনে ₹1000-তে বিক্রি করলে লাভের শতকরা হার কত?

**সমাধান:**
- CP = ₹800, SP = ₹1000
- Profit = 1000 - 800 = ₹200
- Profit% = (200/800) × 100 = **25%** ✅

**প্রশ্ন:** ₹500-এর 20% কত?
- = 500 × 20/100 = **₹100** ✅

### ⚡ SSC Shortcut
- **Successive discount** (a% তারপর b%): নেট discount = a + b - ab/100
- **Marked Price** সমস্যায় MP থেকে discount দিয়ে SP বের করুন, তারপর CP-র সাথে তুলনা করুন

### 💡 Exam Tip
SSC CGL-এ প্রতি বছর ৩–৫টি লাভ-ক্ষতির প্রশ্ন আসে। Shortcut formula ব্যবহার করলে সময় বাঁচে।`;
  }

  // Math - Time and Work
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
কাজের ক্ষমতা = 1/দিন
যদি A, n দিনে কাজ শেষ করে → A-এর এক দিনের কাজ = 1/n
A ও B একসাথে কাজ করলে:
  মোট সময় = 1/(1/a + 1/b) = ab/(a+b) দিন
\`\`\`

### 📝 উদাহরণ
**প্রশ্ন:** A ১০ দিনে ও B ১৫ দিনে একটি কাজ করতে পারে। একসাথে কতদিনে শেষ করবে?

**সমাধান:**
- A-এর এক দিনের কাজ = 1/10
- B-এর এক দিনের কাজ = 1/15
- একসাথে = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6
- সময় = **৬ দিন** ✅

### ⚡ Shortcut
দুজনের ক্ষেত্রে: **ab/(a+b)** দিন
- ১০ ও ১৫ দিন → (10×15)/(10+15) = 150/25 = 6 দিন

### 💡 Exam Tip
Pipes & Cistern সমস্যা Time & Work-এর মতোই — শুধু "ভরা" এবং "খালি" হওয়া বিবেচনা করুন।`;
  }

  // English - Grammar
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
- **Active:** Subject করে কাজ → *Ram eats mangoes.*
- **Passive:** Subject-এর উপর কাজ হয় → *Mangoes are eaten by Ram.*

**Rule:** Object → Subject + be(am/is/are/was/were) + V3 + by + Subject

### 💬 Direct & Indirect Speech
- Say/Said → উক্তি পরিবর্তন
- "I am happy" → He said that he was happy.
- Tense one step back: is→was, will→would, can→could

### 💡 SSC Exam Tip
Error Detection-এ সবচেয়ে বেশি ভুল হয়:
1. Subject-Verb Agreement (He *goes*, They *go*)
2. Use of Articles (a/an/the)
3. Prepositions (interested *in*, good *at*)
4. Pronoun reference

*বাংলা সারসংক্ষেপ:* SSC পরীক্ষায় Grammar-এর মধ্যে Tense, Voice এবং Error Detection থেকে সবচেয়ে বেশি প্রশ্ন আসে। নিয়মগুলো মুখস্থ না করে বুঝে Practice করুন।`;
  }

  // English - Vocabulary
  if (
    subject === "english" &&
    (q.includes("synonym") ||
      q.includes("antonym") ||
      q.includes("vocabulary") ||
      q.includes("word") ||
      t.includes("synonyms"))
  ) {
    return `## 📚 Synonyms & Antonyms for SSC

### 🔤 Important Word Pairs (SSC Frequently Asked)

| Word | Synonym | Antonym |
|---|---|---|
| Benevolent | Kind, Generous | Malevolent, Cruel |
| Eloquent | Fluent, Articulate | Inarticulate, Dumb |
| Diligent | Hardworking, Industrious | Lazy, Idle |
| Candid | Frank, Honest | Deceptive, Dishonest |
| Austere | Strict, Stern | Lenient, Indulgent |
| Frugal | Thrifty, Economical | Lavish, Extravagant |
| Obstinate | Stubborn, Adamant | Flexible, Yielding |
| Verbose | Wordy, Loquacious | Concise, Terse |
| Ambiguous | Unclear, Vague | Clear, Explicit |
| Euphoria | Happiness, Elation | Misery, Depression |

### 💡 One Word Substitutions
- **Omnipotent** — All powerful (সর্বশক্তিমান)
- **Omniscient** — All knowing (সর্বজ্ঞ)
- **Philanthropist** — Lover of mankind (মানবদরদী)
- **Bibliophile** — Lover of books (পুস্তকপ্রেমী)
- **Posthumous** — After death (মৃত্যুর পর)
- **Plagiarism** — Copying someone's work (চৌর্যবৃত্তি)

### 📝 Idioms & Phrases
- **At the drop of a hat** — Immediately (সাথে সাথে)
- **Bite the bullet** — Endure pain (কষ্ট সহ্য করা)
- **Cost an arm and a leg** — Very expensive (অত্যন্ত দামী)
- **Hit the nail on the head** — Exactly right (একদম ঠিক বলা)

*বাংলা সারসংক্ষেপ:* SSC পরীক্ষায় Synonyms ও Antonyms থেকে ৫–১০টি প্রশ্ন আসে। উপরের শব্দগুলো মুখস্থ রাখুন।`;
  }

  // Reasoning
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
সম্পর্ক বুঝে apply করতে হয়।

**উদাহরণ:**
- Doctor : Hospital :: Teacher : **School**
- Book : Library :: Money : **Bank**
- Pen : Write :: Knife : **Cut**

**ধরন:**
1. Object–Function (কলম → লেখা)
2. Part–Whole (Leaf → Tree)
3. Word–Antonym (Hot : Cold :: Day : ?Night)
4. Cause–Effect

### 🔢 Number Series
**Pattern খুঁজুন:**
- 2, 4, 8, 16, 32 → **×2** (উত্তর: 64)
- 1, 4, 9, 16, 25 → **Perfect Squares** (উত্তর: 36)
- 3, 6, 11, 18, 27 → **+3, +5, +7, +9** (উত্তর: 38)

### 🔡 Letter Series
- AZBYCX → Alternate letters forward & backward
- AC, EG, IK, MO → **+2 gap** (উত্তর: QS)

### 💡 SSC Reasoning Tip
Reasoning section-এ বেশিরভাগ প্রশ্ন ৩০–৬০ সেকেন্ডে করা যায় যদি pattern চেনা থাকে। প্রতিদিন ২০টি practice করুন।

*বাংলা সারসংক্ষেপ:* SSC পরীক্ষায় Reasoning-এ Analogy, Series, Coding-Decoding থেকে সবচেয়ে বেশি প্রশ্ন আসে। Pattern বোঝার অভ্যাস করুন।`;
  }

  // Reasoning - Coding Decoding
  if (
    subject === "reasoning" &&
    (q.includes("coding") || q.includes("কোডিং") || t.includes("কোডিং"))
  ) {
    return `## 🔐 Coding-Decoding

### পদ্ধতি ১: Letter Shift
প্রতিটি অক্ষর নির্দিষ্ট সংখ্যক স্থান এগিয়ে বা পিছিয়ে যায়।
- **CAT** → +3 → **FDW**
- **BALL** → -1 → **AZKK**

### পদ্ধতি ২: Reverse Coding
- A=Z, B=Y, C=X (বিপরীত alphabet)
- **CAT** → **ZZG**

### পদ্ধতি ৩: Number Code
- A=1, B=2, C=3... Z=26
- **CAT** = 3+1+20 = **24**

### 📝 উদাহরণ
**প্রশ্ন:** যদি COME = XLNV হয়, তবে DESK = ?
**সমাধান:** C→X (বিপরীত), O→L, M→N, E→V → Mirror code
- D→W, E→V, S→H, K→P → **DESK = WVHP** ✅

### 💡 Tip
প্রথমে rule বের করুন: +কত? -কত? বিপরীত? Number? Rule পেলেই উত্তর সহজ।`;
  }

  // Current Affairs
  if (subject === "current") {
    return `## 📰 Current Affairs 2024 — SSC Digest

### 🏆 পুরস্কার ও সম্মান ২০২৪
| পুরস্কার | বিজয়ী |
|---|---|
| ভারতরত্ন | লাল কৃষ্ণ আডবানি, চরণ সিং, পিভি নরসিংহ রাও, এমএস স্বামীনাথন |
| ভারতীয় চলচ্চিত্র জগতের Oscar | ৯৬তম Academy Awards-এ "The Elephant Whisperers" |
| Nobel শান্তি | ইরানি কর্মী নার্গেস মোহাম্মদি (২০২৩) |

### 🌏 গুরুত্বপূর্ণ আন্তর্জাতিক ঘটনা
- **India-Middle East-Europe Economic Corridor (IMEC)** ঘোষণা — G20 Summit, নয়াদিল্লি
- **India's G20 Presidency** (১ ডিসেম্বর ২০২২ – ৩০ নভেম্বর ২০২৩)
- **Chandrayaan-3** — চন্দ্রের দক্ষিণ মেরুতে সফল অবতরণ (২৩ আগস্ট ২০২৩)
- **Aditya-L1** — ভারতের প্রথম সূর্য মিশন উৎক্ষেপণ

### ⚽ খেলাধুলা ২০২৪
- **ICC World Cup 2024** — ভারত বিজয়ী (বনাম দক্ষিণ আফ্রিকা)
- **Paris Olympics 2024** — ভারতের পদক তালিকা
- **Chess World Cup 2023** — R. Praggnanandhaa Final-এ Magnus Carlsen-কে চ্যালেঞ্জ

### 🔬 বিজ্ঞান ও প্রযুক্তি
- **Gaganyaan Mission** — ভারতের প্রথম মানব মহাকাশ মিশন (২০২৪-২৫)
- **INS Vikrant** — ভারতের প্রথম দেশীয় Aircraft Carrier
- **5G Launch** — ভারতে ৫জি পরিষেবা শুরু (২০২২)

### 💡 SSC Current Affairs Tip
Current Affairs-এ ১২ মাসের পরিসীমায় প্রশ্ন আসে। "Who, What, When, Where" মনে রাখুন প্রতিটি ঘটনার জন্য।`;
  }

  // GK - History
  if (
    subject === "gk" &&
    (q.includes("history") || q.includes("ইতিহাস") || t.includes("ইতিহাস"))
  ) {
    return `## 📜 ভারতের ইতিহাস — SSC প্রস্তুতি

### 🏛️ প্রাচীন ভারত
| সভ্যতা/সাম্রাজ্য | সময়কাল | গুরুত্বপূর্ণ তথ্য |
|---|---|---|
| সিন্ধু সভ্যতা | ২৫০০–১৫০০ খ্রিস্টপূর্ব | হরপ্পা, মহেঞ্জোদারো |
| মৌর্য সাম্রাজ্য | ৩২৫–১৮৫ খ্রিস্টপূর্ব | চন্দ্রগুপ্ত, অশোক |
| গুপ্ত সাম্রাজ্য | ৩২০–৫৫০ খ্রিস্টাব্দ | সমুদ্রগুপ্ত, চন্দ্রগুপ্ত-২ |

### 🕌 মধ্যযুগীয় ভারত
- **দিল্লি সুলতানাত** (১২০৬–১৫২৬): কুতুব উদ্দিন আইবেক, আলাউদ্দিন খলজি, মহম্মদ বিন তুঘলক
- **মুঘল সাম্রাজ্য** (১৫২৬–১৮৫৭): বাবর, আকবর, শাহজাহান (তাজমহল নির্মাতা), ঔরঙ্গজেব
- **মারাঠা শক্তি**: শিবাজী মহারাজ

### 🇮🇳 আধুনিক ভারত ও স্বাধীনতা সংগ্রাম
- **১৮৫৭** — প্রথম স্বাধীনতা সংগ্রাম (সিপাহী বিদ্রোহ)
- **১৮৮৫** — ভারতীয় জাতীয় কংগ্রেস প্রতিষ্ঠা (A.O. Hume)
- **১৯১৫** — গান্ধীজির দক্ষিণ আফ্রিকা থেকে ভারত ফেরত
- **১৯৪২** — Quit India Movement
- **১৯৪৭** — ভারতের স্বাধীনতা (১৫ আগস্ট)

### 💡 SSC History Tip
SSC-তে আধুনিক ভারতের ইতিহাস থেকে সবচেয়ে বেশি প্রশ্ন আসে। গান্ধীজির আন্দোলন ও স্বাধীনতা সংগ্রামের তারিখগুলো মুখস্থ রাখুন।`;
  }

  // Default comprehensive answer
  const subjectMap: Record<string, string> = {
    gk: "General Knowledge",
    math: "Quantitative Aptitude",
    english: "English Language",
    reasoning: "General Intelligence & Reasoning",
    current: "Current Affairs",
  };

  return `## 📚 ${subjectMap[subject] || "SSC Preparation"} — ${question || topic}

### 🎯 SSC পরীক্ষার জন্য মূল ধারণা

**${question || topic}** সম্পর্কে নিচে বিস্তারিত আলোচনা করা হলো:

### 📋 মূল তথ্যাবলী

**${subjectMap[subject] || "SSC"} section-এ এই topic থেকে যা জানা দরকার:**

1. **সংজ্ঞা ও ধারণা** — বিষয়টির মূল সংজ্ঞা ও ধারণা বোঝা জরুরি
2. **সূত্র ও নিয়ম** — প্রয়োজনীয় সমস্ত সূত্র ও নিয়মাবলী
3. **উদাহরণ** — বাস্তব জীবনের উদাহরণ দিয়ে বোঝা
4. **অনুশীলন প্রশ্ন** — পরীক্ষার প্রস্তুতির জন্য MCQ

### 🔑 গুরুত্বপূর্ণ বিষয়

- SSC CGL Tier-I ও Tier-II উভয়েই এই topic গুরুত্বপূর্ণ
- প্রতি বছর পরীক্ষায় এই ধরনের ২–৪টি প্রশ্ন আসে
- Shortcut method ব্যবহার করলে সময় বাঁচে

### 📝 অনুশীলন প্রশ্ন (MCQ)

**Q1:** এই topic সম্পর্কিত একটি MCQ প্রশ্ন:
(A) বিকল্প ১  (B) বিকল্প ২  **(C) সঠিক উত্তর**  (D) বিকল্প ৪

*ব্যাখ্যা: সংজ্ঞা অনুযায়ী (C) সঠিক উত্তর কারণ...*

### 💡 Exam Tip
SSC পরীক্ষায় সময় ব্যবস্থাপনা অত্যন্ত জরুরি। প্রতিটি প্রশ্নে গড়ে ৪৫–৬০ সেকেন্ড দিন।

*English Summary: This topic is frequently tested in SSC CGL/CHSL/MTS exams. Understanding the fundamental concepts and practicing with previous year questions is the best preparation strategy.*`;
}

export function SSCPage() {
  const [selectedExam, setSelectedExam] = useState<ExamType>("CGL");
  const [activeSubject, setActiveSubject] = useState("gk");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState<AnswerType>("concept");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chapterMap: Record<string, string[]> = {
    gk: GK_CHAPTERS,
    math: MATH_CHAPTERS,
    english: ENGLISH_CHAPTERS,
    reasoning: REASONING_CHAPTERS,
    current: CURRENT_AFFAIRS_CHAPTERS,
  };

  function handleChapterClick(chapter: string) {
    setSelectedChapter(chapter);
    setQuestion(chapter);
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

  function renderAnswer(text: string) {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const i = idx;
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-xl font-bold mt-4 mb-2"
            style={{ color: "#ff6b35" }}
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="text-base font-bold mt-3 mb-1.5 text-orange-300"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("| ") && line.endsWith(" |")) {
        return (
          <div
            key={i}
            className="font-mono text-xs py-0.5 text-muted-foreground overflow-x-auto"
          >
            {line}
          </div>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="text-sm ml-4 py-0.5 text-foreground list-disc">
            {line.replace(/^[\-\*] /, "")}
          </li>
        );
      }
      if (/^\d+\./.test(line)) {
        return (
          <li
            key={i}
            className="text-sm ml-4 py-0.5 text-foreground list-decimal"
          >
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        );
      }
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        return (
          <p key={i} className="text-sm font-bold py-0.5 text-orange-200">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (line.startsWith("*") && !line.startsWith("**")) {
        return (
          <p key={i} className="text-xs italic text-muted-foreground py-0.5">
            {line.replace(/\*/g, "")}
          </p>
        );
      }
      if (line === "---") {
        return <hr key={i} className="border-border my-2" />;
      }
      if (line.startsWith("```")) {
        return null;
      }
      if (line.trim() === "") {
        return <div key={i} className="h-1.5" />;
      }
      // Bold inline
      const boldParts = line.split(/(\*\*[^*]+\*\*)/);
      return (
        <p key={i} className="text-sm py-0.5 text-foreground leading-relaxed">
          {boldParts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={`bold-${idx}-${part}`} className="text-orange-200">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={`text-${idx}-${part.substring(0, 8)}-${j}`}>
                {part}
              </span>
            ),
          )}
        </p>
      );
    });
  }

  const currentExam = SSC_EXAMS.find((e) => e.id === selectedExam)!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0800 100%)",
          border: "1px solid rgba(255,107,53,0.4)",
        }}
        data-ocid="ssc.section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 80% 50%, #ff6b35 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(255,107,53,0.2)",
                border: "1px solid rgba(255,107,53,0.5)",
              }}
            >
              <Briefcase className="w-6 h-6" style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                SSC Job Preparation
              </h1>
              <p className="text-sm" style={{ color: "rgba(255,200,150,0.8)" }}>
                Staff Selection Commission — সরকারি চাকরির প্রস্তুতি
              </p>
            </div>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,180,120,0.8)" }}>
            CGL · CHSL · MTS · GD Constable — সমস্ত SSC পরীক্ষার জন্য বিস্তারিত প্রস্তুতি
          </p>
        </div>
      </div>

      {/* Exam Type Selector */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          পরীক্ষা বেছে নিন
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SSC_EXAMS.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => setSelectedExam(exam.id)}
              data-ocid="ssc.exam.button"
              className="rounded-xl p-3 text-left transition-all"
              style={{
                background:
                  selectedExam === exam.id
                    ? `linear-gradient(135deg, ${exam.color}22 0%, ${exam.color}11 100%)`
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedExam === exam.id ? `${exam.color}99` : "rgba(255,255,255,0.1)"}`,
              }}
            >
              <div
                className="font-bold text-sm"
                style={{
                  color: selectedExam === exam.id ? exam.color : "inherit",
                }}
              >
                {exam.name}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {exam.fullName}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subject Tabs + Q&A */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeSubject}
            onValueChange={(v) => {
              setActiveSubject(v);
              setSelectedChapter("");
              setAnswer("");
            }}
          >
            <TabsList
              className="w-full grid grid-cols-5 mb-4"
              data-ocid="ssc.subject.tab"
            >
              <TabsTrigger value="gk" data-ocid="ssc.gk.tab">
                <Globe className="w-3.5 h-3.5 mr-1" />
                GK
              </TabsTrigger>
              <TabsTrigger value="math" data-ocid="ssc.math.tab">
                <Calculator className="w-3.5 h-3.5 mr-1" />
                Math
              </TabsTrigger>
              <TabsTrigger value="english" data-ocid="ssc.english.tab">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                English
              </TabsTrigger>
              <TabsTrigger value="reasoning" data-ocid="ssc.reasoning.tab">
                <Brain className="w-3.5 h-3.5 mr-1" />
                Reasoning
              </TabsTrigger>
              <TabsTrigger value="current" data-ocid="ssc.current.tab">
                <Newspaper className="w-3.5 h-3.5 mr-1" />
                Current
              </TabsTrigger>
            </TabsList>

            {["gk", "math", "english", "reasoning", "current"].map((subj) => (
              <TabsContent key={subj} value={subj}>
                {/* Chapter Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(chapterMap[subj] || []).map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleChapterClick(ch)}
                      data-ocid="ssc.chapter.button"
                      className="text-xs px-3 py-1.5 rounded-full transition-all"
                      style={{
                        background:
                          selectedChapter === ch
                            ? "rgba(255,107,53,0.25)"
                            : "rgba(255,255,255,0.05)",
                        border:
                          selectedChapter === ch
                            ? "1px solid rgba(255,107,53,0.7)"
                            : "1px solid rgba(255,255,255,0.15)",
                        color: selectedChapter === ch ? "#ff6b35" : "inherit",
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <Card className="mb-4">
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                          placeholder="যেকোনো প্রশ্ন লিখুন... (e.g. Article 21, লাভ-ক্ষতির সূত্র)"
                          data-ocid="ssc.question.input"
                          className="flex-1 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <Button
                          onClick={handleSearch}
                          data-ocid="ssc.search.button"
                          disabled={isLoading || !question.trim()}
                          style={{ background: "#ff6b35", color: "white" }}
                          className="hover:opacity-90"
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Search className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {/* Answer Type */}
                      <div className="flex gap-2 flex-wrap">
                        {(
                          ["concept", "short", "mcq", "pyq"] as AnswerType[]
                        ).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setAnswerType(type)}
                            data-ocid="ssc.answer_type.toggle"
                            className="text-xs px-3 py-1 rounded-full transition-all"
                            style={{
                              background:
                                answerType === type
                                  ? "rgba(255,107,53,0.2)"
                                  : "rgba(255,255,255,0.05)",
                              border:
                                answerType === type
                                  ? "1px solid rgba(255,107,53,0.6)"
                                  : "1px solid rgba(255,255,255,0.1)",
                              color:
                                answerType === type ? "#ff6b35" : "inherit",
                            }}
                          >
                            {type === "concept"
                              ? "📖 Concept"
                              : type === "short"
                                ? "✏️ Short Answer"
                                : type === "mcq"
                                  ? "🎯 MCQ"
                                  : "📋 PYQ"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Answer Display */}
                {isLoading && (
                  <Card data-ocid="ssc.loading_state">
                    <CardContent className="py-8 text-center">
                      <div className="w-8 h-8 border-2 border-orange-300/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        উত্তর খোঁজা হচ্ছে...
                      </p>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && answer && (
                  <Card data-ocid="ssc.answer.card">
                    <CardContent className="pt-4 pb-4">
                      <div className="prose-sm max-w-none">
                        {renderAnswer(answer)}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && !answer && (
                  <Card data-ocid="ssc.empty_state">
                    <CardContent className="py-10 text-center">
                      <Target className="w-10 h-10 mx-auto mb-3 text-orange-400/50" />
                      <p className="text-sm text-muted-foreground">
                        উপরে একটি chapter বেছে নিন বা প্রশ্ন লিখুন
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        e.g. "Article 21 কী?", "লাভ-ক্ষতির সূত্র", "Coding Decoding
                        rules"
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar: Exam Info */}
        <div className="space-y-4">
          {/* Selected Exam Card */}
          <Card
            style={{
              background: `linear-gradient(135deg, ${currentExam.color}15 0%, ${currentExam.color}08 100%)`,
              border: `1px solid ${currentExam.color}44`,
            }}
          >
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy
                  className="w-4 h-4"
                  style={{ color: currentExam.color }}
                />
                <span
                  className="font-bold text-sm"
                  style={{ color: currentExam.color }}
                >
                  {currentExam.name}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">যোগ্যতা: </span>
                  <span className="text-foreground font-medium">
                    {currentExam.eligibility}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">বেতন: </span>
                  <span
                    className="font-bold"
                    style={{ color: currentExam.color }}
                  >
                    {currentExam.salary}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">
                    পদসমূহ:
                  </span>
                  <span className="text-foreground">{currentExam.posts}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-sm">পরীক্ষার কাঠামো</span>
              </div>
              <div className="space-y-2 text-xs">
                {selectedExam === "CGL" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tier-I</span>
                      <span>100 প্রশ্ন · 60 মিনিট</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tier-II</span>
                      <span>Paper-I, Paper-II, Paper-III</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        নেগেটিভ মার্কিং
                      </span>
                      <span>0.5 মার্ক</span>
                    </div>
                  </>
                )}
                {selectedExam === "CHSL" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tier-I</span>
                      <span>100 প্রশ্ন · 60 মিনিট</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tier-II</span>
                      <span>Descriptive Paper</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        নেগেটিভ মার্কিং
                      </span>
                      <span>0.5 মার্ক</span>
                    </div>
                  </>
                )}
                {selectedExam === "MTS" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paper-I</span>
                      <span>100 প্রশ্ন · 90 মিনিট</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paper-II</span>
                      <span>Descriptive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        নেগেটিভ মার্কিং
                      </span>
                      <span>0.25 মার্ক</span>
                    </div>
                  </>
                )}
                {selectedExam === "GD" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CBT</span>
                      <span>80 প্রশ্ন · 60 মিনিট</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Physical Test
                      </span>
                      <span>PET, PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medical</span>
                      <span>বাধ্যতামূলক</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* All Exams Quick View */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm">সব SSC পরীক্ষা</span>
              </div>
              <div className="space-y-2">
                {SSC_EXAMS.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    className="w-full flex items-center justify-between text-xs py-1.5 border-b border-border last:border-0 cursor-pointer bg-transparent text-left"
                    onClick={() => setSelectedExam(exam.id)}
                  >
                    <div>
                      <span className="font-bold" style={{ color: exam.color }}>
                        {exam.name}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {exam.eligibility}
                      </span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preparation Tips */}
          <Card style={{ border: "1px solid rgba(255,107,53,0.3)" }}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4" style={{ color: "#ff6b35" }} />
                <span
                  className="font-bold text-sm"
                  style={{ color: "#ff6b35" }}
                >
                  প্রস্তুতির টিপস
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span>✅</span>প্রতিদিন ৪–৫ ঘণ্টা পড়ুন
                </li>
                <li className="flex gap-2">
                  <span>✅</span>Mock Test দিন নিয়মিত
                </li>
                <li className="flex gap-2">
                  <span>✅</span>পুরনো প্রশ্নপত্র সমাধান করুন
                </li>
                <li className="flex gap-2">
                  <span>✅</span>Newspaper পড়ুন Current Affairs-এর জন্য
                </li>
                <li className="flex gap-2">
                  <span>✅</span>Weak topic-এ বেশি সময় দিন
                </li>
                <li className="flex gap-2">
                  <span>✅</span>Speed বাড়াতে Shortcut শিখুন
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              SSC Official: ssc.nic.in
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
