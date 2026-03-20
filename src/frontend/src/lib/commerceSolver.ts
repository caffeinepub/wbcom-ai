export interface CommerceSolverInput {
  subject: string;
  classLevel: number;
  chapter: string;
  question: string;
  type: "essay" | "short" | "mcq" | "problem";
}

function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    businessstudies: "Business Studies",
    economics: "Economics / অর্থনীতি",
    commercialmathematics: "Commercial Mathematics",
    computerapplication: "Computer Application",
  };
  return labels[subject] ?? subject;
}

function getMathSolution(chapter: string, question: string): string {
  const q = question.toLowerCase();

  // Compound Interest
  if (
    q.includes("compound interest") ||
    q.includes("ci") ||
    chapter.includes("Compound")
  ) {
    return `📐 COMPOUND INTEREST — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formula: A = P(1 + r/n)^(nt)
Where:
  P = Principal, r = Rate (decimal), n = times per year, t = time (years)

📌 Example Problem:
Principal (P) = ₹10,000
Rate (r) = 10% per annum
Time (t) = 3 years, Compounded Annually

Step 1: Write formula → A = P(1 + r)^t
Step 2: Substitute → A = 10000 × (1 + 0.10)^3
Step 3: Calculate → A = 10000 × (1.10)^3
Step 4: (1.10)^3 = 1.331
Step 5: A = 10000 × 1.331 = ₹13,310

Compound Interest = A - P = 13,310 - 10,000 = ₹3,310

✅ Answer: Amount = ₹13,310 | Compound Interest = ₹3,310

💡 Key Concepts:
• CI > SI always (because interest is earned on interest)
• When compounded half-yearly: r becomes r/2, t becomes 2t
• When compounded quarterly: r becomes r/4, t becomes 4t`;
  }

  // Simple Interest
  if (
    q.includes("simple interest") ||
    q.includes("si") ||
    chapter.includes("Simple Interest")
  ) {
    return `📐 SIMPLE INTEREST — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formula: SI = (P × R × T) / 100
Amount: A = P + SI

📌 Example Problem:
Principal (P) = ₹5,000
Rate (R) = 8% per annum
Time (T) = 4 years

Step 1: Write formula → SI = (P × R × T) / 100
Step 2: Substitute → SI = (5000 × 8 × 4) / 100
Step 3: Numerator = 5000 × 8 × 4 = 1,60,000
Step 4: SI = 1,60,000 / 100 = ₹1,600
Step 5: Amount = P + SI = 5000 + 1600 = ₹6,600

✅ Answer: SI = ₹1,600 | Amount = ₹6,600

💡 Tips:
• Finding Rate: R = (SI × 100) / (P × T)
• Finding Time: T = (SI × 100) / (P × R)
• Finding Principal: P = (SI × 100) / (R × T)`;
  }

  // Profit and Loss
  if (
    q.includes("profit") ||
    q.includes("loss") ||
    q.includes("discount") ||
    chapter.includes("Profit")
  ) {
    return `📐 PROFIT, LOSS & DISCOUNT — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key Formulas:
• Profit = SP - CP
• Loss = CP - SP
• Profit% = (Profit / CP) × 100
• Loss% = (Loss / CP) × 100
• SP = CP × (100 + Profit%) / 100
• Discount = Marked Price - Selling Price
• Discount% = (Discount / Marked Price) × 100

📌 Example Problem:
Cost Price (CP) = ₹800
Selling Price (SP) = ₹960

Step 1: Profit = SP - CP = 960 - 800 = ₹160
Step 2: Profit% = (160 / 800) × 100 = 20%

✅ Answer: Profit = ₹160 | Profit% = 20%

📌 Discount Example:
Marked Price = ₹1,200, Discount = 15%
Discount Amount = 1200 × 15/100 = ₹180
Selling Price = 1200 - 180 = ₹1,020

💡 Tip: Successive discounts of x% and y% ≠ (x+y)%
Equivalent single discount = x + y - (xy/100)`;
  }

  // Depreciation
  if (q.includes("depreciation") || chapter.includes("Depreciation")) {
    return `📐 DEPRECIATION — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Methods of Depreciation:
1. Straight Line Method (SLM)
2. Written Down Value Method (WDV)

Formulas:
• SLM: Annual Depreciation = (Cost - Scrap Value) / Useful Life
• WDV: Book Value = Cost × (1 - r)^n

📌 SLM Example:
Machine Cost = ₹1,00,000 | Scrap Value = ₹10,000 | Life = 9 years

Step 1: Depreciable Cost = 1,00,000 - 10,000 = ₹90,000
Step 2: Annual Depreciation = 90,000 / 9 = ₹10,000
Step 3: Book Value after 3 years = 1,00,000 - (3 × 10,000) = ₹70,000

📌 WDV Example:
Cost = ₹50,000 | Rate = 20% | After 2 years

Year 1: Depreciation = 50,000 × 20% = ₹10,000 → Book Value = ₹40,000
Year 2: Depreciation = 40,000 × 20% = ₹8,000 → Book Value = ₹32,000

✅ WDV Book Value after 2 years = ₹32,000`;
  }

  // Annuities
  if (q.includes("annuit") || chapter.includes("Annuit")) {
    return `📐 ANNUITIES — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Annuity: A series of equal payments at equal intervals.

Types:
1. Annuity Due — payment at beginning of period
2. Ordinary Annuity — payment at end of period

Future Value of Ordinary Annuity:
FV = R × [(1+i)^n - 1] / i

Present Value of Ordinary Annuity:
PV = R × [1 - (1+i)^-n] / i

Where: R = payment per period, i = interest per period, n = no. of periods

📌 Example:
Annual payment R = ₹5,000, i = 10%, n = 4 years

FV = 5000 × [(1.10)^4 - 1] / 0.10
(1.10)^4 = 1.4641
FV = 5000 × [1.4641 - 1] / 0.10
FV = 5000 × 0.4641 / 0.10
FV = 5000 × 4.641 = ₹23,205

✅ Future Value of Annuity = ₹23,205`;
  }

  // Statistics / Mean
  if (
    q.includes("mean") ||
    q.includes("median") ||
    q.includes("mode") ||
    chapter.includes("Statistics")
  ) {
    return `📐 MEASURES OF CENTRAL TENDENCY — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ MEAN (গড়)
Formula: Mean = Σx / n (for ungrouped data)

📌 Example: Marks: 45, 52, 60, 38, 71, 55
Step 1: Σx = 45+52+60+38+71+55 = 321
Step 2: n = 6
Step 3: Mean = 321 / 6 = 53.5

2️⃣ MEDIAN (মধ্যমা)
Arrange in ascending order: 38, 45, 52, 55, 60, 71
n = 6 (even)
Median = (3rd term + 4th term) / 2 = (52+55)/2 = 53.5

3️⃣ MODE (সংখ্যাগুরু)
Mode = Value that appears most frequently.
Example: 4, 5, 6, 5, 7, 5, 8 → Mode = 5 (appears 3 times)

💡 Relationship: Mode = 3 Median - 2 Mean (empirical)

✅ For grouped data, use class boundaries, frequency tables, and cumulative frequency curves (ogive).`;
  }

  // Probability
  if (q.includes("probabilit") || chapter.includes("Probability")) {
    return `📐 PROBABILITY — Step-by-Step Solution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formula: P(E) = Number of Favourable Outcomes / Total Outcomes

Key Rules:
• P(E) is always between 0 and 1
• P(E) + P(E') = 1 (complementary events)
• P(A∪B) = P(A) + P(B) - P(A∩B)

📌 Example 1: Tossing a coin
P(Head) = 1/2 = 0.5

📌 Example 2: Rolling a die, P(even number)
Favourable outcomes: {2, 4, 6} → 3
Total outcomes: 6
P(even) = 3/6 = 1/2

📌 Example 3: Drawing a red card from a deck
Favourable: 26 red cards
Total: 52 cards
P(red) = 26/52 = 1/2

✅ Tips: Always list the sample space first, then count favourable outcomes.`;
  }

  // Generic math solution
  return `📐 COMMERCIAL MATHEMATICS — ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question: ${question || `(MCQ / Problem from ${chapter})`}

Approach:
1. Identify the formula applicable to this problem type
2. List all given values clearly
3. Substitute into formula step-by-step
4. Compute and verify the answer

Key Formulas for ${chapter}:
• Use your WBCHSE textbook formula list for this chapter
• Always write units (₹, %, years)
• Show every calculation step for full marks

💡 Tip: In WBCHSE exams, showing the working process earns partial marks even if the final answer has a mistake. Always write: Given → Formula → Substitution → Answer.`;
}

function getEssayAnswer(
  subject: string,
  chapter: string,
  question: string,
): string {
  const q = question.toLowerCase();

  const contentMap: Record<string, Record<string, string>> = {
    businessstudies: {
      "Chapter 1: Nature and Purpose of Business": `ব্যবসার প্রকৃতি ও উদ্দেশ্য (Nature and Purpose of Business)

ব্যবসা হলো সেই অর্থনৈতিক কার্যকলাপ যেখানে পণ্য বা সেবা উৎপাদন, ক্রয়-বিক্রয় বা বিনিময়ের মাধ্যমে মুনাফা অর্জন করা হয়।

🔑 ব্যবসার বৈশিষ্ট্য:
1. পণ্য বা সেবার লেনদেন — কেনাবেচা বা বিনিময় হয়
2. নিয়মিত কার্যকলাপ — একটি একক লেনদেন ব্যবসা নয়
3. মুনাফার উদ্দেশ্য — লাভজনকতা প্রাথমিক লক্ষ্য
4. ঝুঁকি ও অনিশ্চয়তা — ক্ষতির সম্ভাবনা সবসময় থাকে
5. গ্রাহক সন্তুষ্টি — সফল ব্যবসার অপরিহার্য শর্ত

🔑 ব্যবসার উদ্দেশ্য:
• অর্থনৈতিক: মুনাফা অর্জন, বিনিয়োগে রিটার্ন, অর্থনৈতিক প্রবৃদ্ধি
• সামাজিক: কর্মসংস্থান সৃষ্টি, গুণমানসম্পন্ন পণ্য সরবরাহ
• মানবিক: কর্মচারীদের কল্যাণ, সম্প্রদায়ের উন্নয়ন

📌 উদাহরণ: Tata Group শুধু মুনাফা নয়, সামাজিক দায়বদ্ধতার মাধ্যমে জাতীয় উন্নয়নেও অবদান রাখে।

✅ সারসংক্ষেপ: আধুনিক ব্যবসা কেবল মুনাফার জন্য নয় — এটি সমাজের প্রয়োজনীয়তা পূরণ করে অর্থনৈতিক উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করে।`,
      "Chapter 2: Forms of Business Organisation": `ব্যবসায়িক সংগঠনের রূপ (Forms of Business Organisation)

🔑 প্রধান রূপসমূহ:

1. একমালিকানা (Sole Proprietorship):
   • একজন মালিক পুরো ব্যবসা পরিচালনা করেন
   • সুবিধা: সহজ শুরু, পূর্ণ নিয়ন্ত্রণ, সম্পূর্ণ মুনাফা
   • অসুবিধা: সীমাহীন দায়, সীমিত পুঁজি
   • উদাহরণ: ছোট মুদিখানা, দর্জির দোকান

2. অংশীদারিত্ব (Partnership):
   • দুই বা তারও বেশি ব্যক্তি চুক্তির ভিত্তিতে ব্যবসা করেন
   • সুবিধা: বেশি পুঁজি, বিভিন্ন দক্ষতার সমন্বয়
   • অসুবিধা: মতভেদের সম্ভাবনা, অসীম দায়
   • সর্বোচ্চ অংশীদার: ব্যাংক ছাড়া ১০০ জন (Companies Act 2013)

3. কোম্পানি (Company):
   • Private Limited: ২-২০০ সদস্য, শেয়ার হস্তান্তরে বিধিনিষেধ
   • Public Limited: ৭+ সদস্য, স্টক মার্কেটে তালিকাভুক্ত হতে পারে
   • সুবিধা: সীমিত দায়, স্থায়ী অস্তিত্ব

📌 উদাহরণ: Reliance Industries হলো একটি Public Limited Company।

✅ নির্বাচনের ভিত্তি: পুঁজির পরিমাণ, ঝুঁকি বহনের ক্ষমতা ও ব্যবসার আয়তন অনুযায়ী সঠিক রূপ বেছে নিতে হয়।`,
      default: `ব্যবসায় শিক্ষা (Business Studies) — ${chapter}

প্রশ্ন: ${question}

✅ মূল ধারণা:
ব্যবসায় শিক্ষায় ব্যবসার তত্ত্ব, ব্যবস্থাপনা এবং বাণিজ্যিক কার্যক্রম অধ্যয়ন করা হয়। এই অধ্যায়ে যে মূল ধারণাগুলো আছে তা হলো ব্যবসার সংগঠন, পরিচালনা, অর্থায়ন এবং বিপণন।

📌 বিস্তারিত উত্তর:
WBCHSE সিলেবাস অনুযায়ী এই অধ্যায়ের মূল বিষয়গুলো:
• সংজ্ঞা ও সংক্ষিপ্ত বিবরণ
• মূল বৈশিষ্ট্যসমূহ
• সুবিধা ও সীমাবদ্ধতা
• বাস্তব উদাহরণ (Tata, Reliance, Infosys)

💡 পরীক্ষার টিপস:
• সংজ্ঞা মুখস্থ করুন
• বৈশিষ্ট্যগুলো numbered points-এ লিখুন
• উদাহরণ সবসময় দিন`,
    },
    economics: {
      "Chapter 2: Theory of Consumer Behaviour": `ভোক্তার আচরণ তত্ত্ব (Theory of Consumer Behaviour)

🔑 Utility (উপযোগ):
উপযোগ হলো কোনো পণ্য ভোগ করার ফলে যে সন্তুষ্টি পাওয়া যায়।

Marginal Utility (প্রান্তিক উপযোগ):
একটি অতিরিক্ত একক ভোগ করলে মোট উপযোগ যতটুকু বাড়ে তাকে প্রান্তিক উপযোগ বলে।

গাউসেনের প্রথম সূত্র (Law of Diminishing Marginal Utility):
পণ্য ভোগ বাড়ানোর সাথে সাথে প্রান্তিক উপযোগ কমতে থাকে।

📌 সারণি উদাহরণ:
আম খাওয়া  | মোট উপযোগ | প্রান্তিক উপযোগ
1টি        |     10     |      10
2টি        |     18     |       8
3টি        |     24     |       6
4টি        |     28     |       4
5টি        |     28     |       0 (saturation)
6টি        |     25     |      -3 (disutility)

ভোক্তার ভারসাম্য (Consumer's Equilibrium):
যেখানে MUx/Px = MUy/Py = MU per rupee সমান হয়

✅ সারসংক্ষেপ: একজন বুদ্ধিমান ভোক্তা সীমিত আয়ে সর্বোচ্চ সন্তুষ্টি পেতে প্রতিটি পণ্যে প্রান্তিক উপযোগকে দাম অনুপাতে সমান রাখে।`,
      "Chapter 3: Production and Costs": `উৎপাদন ও ব্যয় (Production and Costs)

🔑 উৎপাদন অপেক্ষক (Production Function):
Q = f(L, K) → আউটপুট = শ্রম ও পুঁজির ফাংশন

📌 স্বল্পকালীন উৎপাদন আইন (Law of Variable Proportions):
ঘটনা: এক উপকরণ পরিবর্তন, বাকি স্থির।
তিনটি পর্যায়:
• Stage I: Increasing Returns (প্রান্তিক উৎপাদন বাড়ে)
• Stage II: Diminishing Returns (প্রান্তিক উৎপাদন কমে) ← সর্বোত্তম
• Stage III: Negative Returns (প্রান্তিক উৎপাদন ঋণাত্মক)

🔑 ব্যয়ের প্রকারভেদ:
• Fixed Cost (FC): উৎপাদন নির্বিশেষে স্থির (ভাড়া, বেতন)
• Variable Cost (VC): উৎপাদন বাড়লে বাড়ে (কাঁচামাল)
• Total Cost (TC) = FC + VC
• Average Cost (AC) = TC / Q
• Marginal Cost (MC) = ΔTC / ΔQ

📌 সম্পর্ক: MC curve U-আকৃতির; যেখানে MC = AC, সেখানে AC minimum।

✅ উৎপাদক কোন বিন্দুতে সর্বোচ্চ মুনাফা করবে: যেখানে MR = MC।`,
      default: `অর্থনীতি (Economics) — ${chapter}

প্রশ্ন: ${question}

✅ মূল ধারণা:
অর্থনীতি হলো সম্পদের সুষ্ঠু বণ্টন ও ব্যবহারের বিজ্ঞান। ব্যষ্টিক অর্থনীতিতে ব্যক্তিগত সিদ্ধান্ত ও বাজার বিশ্লেষণ করা হয়, আর সামষ্টিক অর্থনীতিতে জাতীয় উৎপাদন, কর্মসংস্থান ও মূল্যস্তর আলোচিত হয়।

এই অধ্যায়ের মূল বিষয়:
• সংজ্ঞা ও তত্ত্ব
• গাণিতিক উদাহরণ ও সূত্র
• রেখাচিত্র / তালিকা বিশ্লেষণ
• বাস্তব জীবনে প্রয়োগ

💡 পরীক্ষার টিপস:
• সংজ্ঞা ও সূত্র আলাদাভাবে লিখুন
• রেখাচিত্র এঁকে লেবেল করুন
• উদাহরণ দিয়ে ব্যাখ্যা শেষ করুন`,
    },
    computerapplication: {
      "Chapter 1: Introduction to Computers": `কম্পিউটার পরিচিতি (Introduction to Computers)

🔑 কম্পিউটার কী?
কম্পিউটার একটি ইলেকট্রনিক যন্ত্র যা তথ্য গ্রহণ (Input), প্রক্রিয়া (Process) এবং ফলাফল প্রদর্শন (Output) করে।

📌 কম্পিউটারের বৈশিষ্ট্য:
1. গতি (Speed): মাইক্রোসেকেন্ডে কাজ সম্পন্ন করে
2. নির্ভুলতা (Accuracy): কোনো গণনায় ভুল করে না
3. স্মৃতিশক্তি (Memory): বিশাল পরিমাণ তথ্য সঞ্চয় করে
4. বহুমুখিতা (Versatility): বিভিন্ন ধরনের কাজ করতে পারে
5. অক্লান্ততা (Diligence): ক্লান্তিহীনভাবে কাজ করে

📌 কম্পিউটারের প্রজন্ম (Generations):
• ১ম প্রজন্ম (1946-56): Vacuum Tube — ENIAC
• ২য় প্রজন্ম (1956-63): Transistor
• ৩য় প্রজন্ম (1964-71): Integrated Circuit (IC)
• ৪র্থ প্রজন্ম (1971-বর্তমান): Microprocessor
• ৫ম প্রজন্ম (ভবিষ্যৎ): Artificial Intelligence

📌 হার্ডওয়্যার বনাম সফটওয়্যার:
• Hardware: ছোঁয়া যায় — CPU, RAM, Hard Disk, Monitor
• Software: ছোঁয়া যায় না — Windows, MS Office, Chrome

✅ সারসংক্ষেপ: কম্পিউটার আধুনিক জীবনের অপরিহার্য অংশ — ব্যবসা, শিক্ষা, চিকিৎসা সর্বত্র এর প্রয়োগ।`,
      "Chapter 7: E-Commerce": `ই-কমার্স (E-Commerce)

🔑 সংজ্ঞা:
ইন্টারনেটের মাধ্যমে পণ্য বা সেবা ক্রয়-বিক্রয়ের প্রক্রিয়াকে ই-কমার্স বলে।

📌 ই-কমার্সের প্রকারভেদ:
1. B2C (Business to Consumer): Amazon, Flipkart, Meesho
2. B2B (Business to Business): Alibaba, IndiaMart
3. C2C (Consumer to Consumer): OLX, eBay
4. G2C (Government to Consumer): IRCTC, DigiLocker

📌 সুবিধা:
• ২৪×৭ কেনাকাটা সম্ভব
• ভৌগোলিক সীমাবদ্ধতা নেই
• দাম তুলনা সহজ
• কম অপারেটিং খরচ

📌 অসুবিধা:
• নিরাপত্তা ঝুঁকি (Cyber Fraud)
• পণ্য না দেখে কেনার সমস্যা
• ডেলিভারি সমস্যা
• ইন্টারনেট নির্ভরতা

📌 ভারতে ই-কমার্স:
UPI, Digital Wallet (PhonePe, Paytm) ই-কমার্স বিকাশে সহায়তা করেছে। ২০২৩ সালে ভারতের ই-কমার্স বাজার $৭০ বিলিয়ন ছাড়িয়েছে।

✅ সারসংক্ষেপ: ই-কমার্স ব্যবসার ধারণাকে আমূল বদলে দিয়েছে — এটি ক্ষুদ্র উদ্যোক্তাদেরও বৈশ্বিক বাজারে প্রবেশের সুযোগ করে দিয়েছে।`,
      default: `কম্পিউটার অ্যাপ্লিকেশন (Computer Application) — ${chapter}

প্রশ্ন: ${question}

✅ মূল ধারণা:
কম্পিউটার অ্যাপ্লিকেশন বিষয়টি তত্ত্ব (Theory) ও ব্যবহারিক (Practical) উভয় অংশ নিয়ে গঠিত।

এই অধ্যায়ের মূল বিষয়:
• সংজ্ঞা ও সংক্ষিপ্ত বিবরণ
• প্রকারভেদ ও উদাহরণ
• সুবিধা ও সীমাবদ্ধতা
• বাস্তব ব্যবহার ও উদাহরণ

💡 পরীক্ষার টিপস:
• Full form মনে রাখুন (CPU, RAM, ROM, HTTP, HTML)
• পার্থক্য প্রশ্নে টেবিল ফরম্যাট ব্যবহার করুন
• ডায়াগ্রাম এঁকে দেখালে নম্বর বাড়ে`,
    },
  };

  const chapterContent = contentMap[subject]?.[chapter];
  if (chapterContent) return chapterContent;

  // Try keyword matching
  const subjectContent = contentMap[subject] ?? {};
  for (const [key, value] of Object.entries(subjectContent)) {
    if (
      key !== "default" &&
      (chapter.includes(key.split(":")[1]?.trim().split(" ")[0] ?? "") ||
        q.includes(key.toLowerCase().substring(0, 10)))
    ) {
      return value;
    }
  }

  return (
    subjectContent.default ??
    `${getSubjectLabel(subject)} — ${chapter}\n\nপ্রশ্ন: ${question}\n\n✅ WBCHSE সিলেবাস অনুযায়ী এই অধ্যায়ের মূল বিষয়গুলো:\n• সংজ্ঞা ও ধারণা\n• মূল বৈশিষ্ট্য ও প্রকারভেদ\n• উদাহরণ ও ব্যাখ্যা\n• সুবিধা ও অসুবিধা\n\n💡 বিস্তারিত উত্তরের জন্য আপনার প্রশ্নটি আরও নির্দিষ্টভাবে লিখুন।`
  );
}

function generateShortAnswer(
  subject: string,
  chapter: string,
  question: string,
): string {
  const full = getEssayAnswer(subject, chapter, question);
  const lines = full.split("\n").filter((l) => l.trim());
  const condensed = lines.slice(0, 12).join("\n");
  return `📝 সংক্ষিপ্ত উত্তর / Short Answer\n━━━━━━━━━━━━━━━━━━━━━━━\n\n${condensed}\n\n[বিস্তারিত জানতে Essay ধরন বেছে নিন]`;
}

function generateMCQ(
  subject: string,
  classLevel: number,
  chapter: string,
): string {
  const mcqs: Record<string, string[]> = {
    businessstudies: [
      "❓ Q: ব্যবসায়িক সংগঠনের কোন রূপে মালিকের দায় সীমিত?\n   (A) একমালিকানা (B) অংশীদারিত্ব (C) প্রাইভেট লিমিটেড কোম্পানি (D) HUF\n   ✅ উত্তর: (C) — কোম্পানিতে শেয়ারহোল্ডারের দায় তাদের বিনিয়োগের মধ্যে সীমিত।",
      "❓ Q: Management-এর কোন কাজটি সবচেয়ে মৌলিক?\n   (A) Organising (B) Planning (C) Staffing (D) Controlling\n   ✅ উত্তর: (B) Planning — সব কার্যক্রমের ভিত্তি হলো পরিকল্পনা।",
      `❓ Q: 'Management by Objectives' (MBO) কে প্রবর্তন করেন?\n   (A) F.W. Taylor (B) Henry Fayol (C) Peter Drucker (D) Elton Mayo\n   ✅ উত্তর: (C) Peter Drucker`,
    ],
    economics: [
      "❓ Q: চাহিদা বিধির ব্যতিক্রম কোনটি?\n   (A) স্বাভাবিক পণ্য (B) গিফেন দ্রব্য (C) পরিপূরক দ্রব্য (D) স্বাধীন দ্রব্য\n   ✅ উত্তর: (B) গিফেন দ্রব্য — দাম বাড়লেও চাহিদা বাড়ে।",
      "❓ Q: GDP-তে কোনটি অন্তর্ভুক্ত নয়?\n   (A) সরকারি ব্যয় (B) বিনিয়োগ (C) পুরনো বাড়ি বিক্রি (D) রপ্তানি\n   ✅ উত্তর: (C) — পুরনো বাড়ি বিক্রি নতুন উৎপাদন নয়।",
      "❓ Q: নিখুঁত প্রতিযোগিতা বাজারে দীর্ঘকালে ফার্মের অর্থনৈতিক মুনাফা কত?\n   (A) সর্বোচ্চ (B) ঋণাত্মক (C) শূন্য (D) স্থির\n   ✅ উত্তর: (C) শূন্য — দীর্ঘকালে নতুন প্রবেশকারী মুনাফা শূন্যে নামিয়ে আনে।",
    ],
    commercialmathematics: [
      "❓ Q: ₹5,000 টাকা 2 বছরের জন্য 10% সরল সুদে বিনিয়োগ করলে সুদ কত?\n   (A) ₹500 (B) ₹1,000 (C) ₹1,100 (D) ₹1,500\n   ✅ উত্তর: (B) — SI = (5000 × 10 × 2)/100 = ₹1,000",
      "❓ Q: ₹10,000 টাকা 2 বছরের জন্য 10% চক্রবৃদ্ধি সুদে বিনিয়োগ করলে মোট পরিমাণ কত?\n   (A) ₹12,000 (B) ₹12,100 (C) ₹11,000 (D) ₹13,000\n   ✅ উত্তর: (B) — A = 10000 × (1.10)² = 10000 × 1.21 = ₹12,100",
      "❓ Q: CP = ₹200, SP = ₹250 হলে মুনাফার শতাংশ কত?\n   (A) 20% (B) 25% (C) 50% (D) 30%\n   ✅ উত্তর: (B) — Profit% = (50/200) × 100 = 25%",
    ],
    computerapplication: [
      "❓ Q: WWW-এর পূর্ণরূপ কী?\n   (A) World Wide Web (B) Wide World Web (C) World Web Wide (D) Web World Wide\n   ✅ উত্তর: (A) World Wide Web",
      "❓ Q: RAM-এর পূর্ণরূপ কী?\n   (A) Read Access Memory (B) Random Access Memory (C) Read All Memory (D) Random All Memory\n   ✅ উত্তর: (B) Random Access Memory",
      "❓ Q: HTML ফাইলের এক্সটেনশন কী?\n   (A) .doc (B) .html (C) .exe (D) .jpg\n   ✅ উত্তর: (B) .html",
    ],
  };

  const questions = mcqs[subject] ?? mcqs.businessstudies;
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);

  return `📝 MCQ — ${getSubjectLabel(subject)} | Class ${classLevel} | ${chapter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${selected.join("\n\n")}

💡 Tip: MCQ-তে প্রথমে যা নিশ্চিতভাবে ভুল তা বাদ দিন, তারপর বাকিগুলো যাচাই করুন।`;
}

export function generateCommerceSolution(input: CommerceSolverInput): string {
  const { subject, classLevel, chapter, question, type } = input;

  if (
    subject === "commercialmathematics" &&
    (type === "problem" || type === "short")
  ) {
    return getMathSolution(chapter, question);
  }

  if (type === "mcq") {
    return generateMCQ(subject, classLevel, chapter);
  }

  if (type === "short") {
    return generateShortAnswer(subject, chapter, question);
  }

  // Essay / Problem
  return getEssayAnswer(subject, chapter, question);
}
