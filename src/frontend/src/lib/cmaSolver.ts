export interface CMASolveInput {
  level: string;
  subject: string;
  chapter: string;
  question: string;
  questionType: "theory" | "practical" | "mcq" | "short";
}

export function generateCMASolution(input: CMASolveInput): string {
  const { level, subject, chapter, question, questionType } = input;
  const q = question.trim() || chapter;

  if (questionType === "mcq") {
    return generateCMAMCQ(subject, chapter, q);
  }
  if (questionType === "practical") {
    return generateCMAPractical(subject, chapter, q);
  }
  if (questionType === "short") {
    return generateCMAShort(subject, chapter, q);
  }
  return generateCMATheory(level, subject, chapter, q);
}

function generateCMATheory(
  level: string,
  subject: string,
  chapter: string,
  question: string,
): string {
  const knowledgeBase: Record<string, string> = {
    "Cost Accounting Basics": `## ⚡ Quick Answer
**Cost Accounting** হল ব্যবসায়িক খরচের পরিকল্পনা, নিয়ন্ত্রণ এবং বিশ্লেষণের প্রক্রিয়া যা ব্যবস্থাপনাকে সিদ্ধান্ত নিতে সাহায্য করে।

## 📖 Simplified Breakdown (Concept)
Cost Accounting is the process of recording, classifying, analyzing, and allocating costs associated with a business process. It helps management in planning, controlling, and decision-making by providing detailed cost information.

**বাংলায়:** খরচ হিসাবরক্ষণ হল একটি ব্যবসার প্রতিটি কাজে কতটা খরচ হচ্ছে তা পরিমাপ, নিয়ন্ত্রণ এবং বিশ্লেষণ করার পদ্ধতি।

## 🔑 Key Elements
- **Material Cost** — Direct materials used in production
- **Labour Cost** — Direct wages paid to workers
- **Overhead** — Indirect costs (factory, admin, selling)
- **Prime Cost** = Direct Material + Direct Labour + Direct Expenses
- **Factory Cost** = Prime Cost + Factory Overhead
- **Cost of Production** = Factory Cost + Admin Overhead
- **Cost of Sales** = Cost of Production + Selling & Distribution Overhead

## 🎯 Practical Application
**Scenario:** Raju's Furniture Factory — Cost Sheet
1. **Step 1:** Identify all costs — Wood ₹50,000, Labour ₹20,000, Rent ₹5,000
2. **Step 2:** Classify — Direct: ₹70,000 (Prime Cost), Indirect: ₹5,000 (Overhead)
3. **Step 3:** Total Production Cost = ₹75,000 for 100 chairs = ₹750 per chair

**বাংলা উদাহরণ:** রাজুর কারখানায় ১০০টি চেয়ার তৈরিতে মোট খরচ ₹৭৫,০০০ হলে প্রতি চেয়ারের খরচ ₹৭৫০।

## 📊 Comparative Analysis
| Feature | Financial Accounting | Cost Accounting |
|---|---|---|
| Purpose | External reporting | Internal management |
| Focus | Profit/Loss | Cost per unit |
| Users | Investors, Banks | Management |
| Legal Requirement | Mandatory | Voluntary |
| Period | Annual | Continuous |

## 💡 Pro-Tip for ICMAI Exam
**Memory Trick:** "PRIME" = **P**roduction + **R**aw material + **I**ndirect + **M**anufacturing + **E**xpenses

**Common Mistake:** Students confuse Prime Cost with Factory Cost. Remember: Factory Cost = Prime Cost + **Factory** Overhead only (not admin or selling overhead).

---
## 🔵 বাংলা সারসংক্ষেপ
${chapter} বিষয়টি CMA পরীক্ষায় অত্যন্ত গুরুত্বপূর্ণ। এই অধ্যায়ে খরচের শ্রেণীবিভাগ, cost sheet তৈরি এবং খরচ নিয়ন্ত্রণের পদ্ধতি শেখানো হয়। প্রতিটি উপাদান (Material, Labour, Overhead) আলাদাভাবে বোঝা এবং সঠিক classification করা exam-এর জন্য অপরিহার্য।`,

    "Financial Accounting": `## ⚡ Quick Answer
**Financial Accounting** is the systematic process of recording, summarizing, and reporting financial transactions of a business to external stakeholders.

## 📖 Simplified Breakdown
Financial Accounting follows a cycle: Transaction → Journal → Ledger → Trial Balance → Final Accounts. It follows GAAP and accounting standards.

**বাংলায়:** আর্থিক হিসাবরক্ষণ হল ব্যবসার সমস্ত আর্থিক লেনদেন সুশৃঙ্খলভাবে লিপিবদ্ধ করে চূড়ান্ত হিসাব তৈরির প্রক্রিয়া।

## 🔑 Key Elements
- **Journal** — Book of original entry (Debit = Credit)
- **Ledger** — Book of secondary entry (T-accounts)
- **Trial Balance** — List of all ledger balances
- **Trading Account** — Gross Profit/Loss
- **P&L Account** — Net Profit/Loss
- **Balance Sheet** — Financial position (Assets = Liabilities + Capital)

## 🎯 Practical Scenario
1. Purchased goods for ₹10,000 → Dr. Purchases, Cr. Cash/Creditor
2. Sold goods for ₹15,000 → Dr. Cash/Debtor, Cr. Sales
3. Gross Profit = Sales − COGS = ₹15,000 − ₹10,000 = ₹5,000

## 📊 Comparison: Trading vs P&L Account
| Aspect | Trading Account | P&L Account |
|---|---|---|
| Shows | Gross Profit | Net Profit |
| Includes | Sales, COGS | Gross Profit, Expenses |
| Result | GP/GL | NP/NL |

## 💡 Pro-Tip
**Golden Rules:** Assets Dr. when increase, Cr. when decrease; Liabilities Cr. when increase, Dr. when decrease.

---
## 🔵 বাংলা সারসংক্ষেপ
আর্থিক হিসাবরক্ষণে Journal → Ledger → Trial Balance → Final Accounts এই ধারাবাহিকতা মনে রাখতে হবে। Double Entry system-এ প্রতিটি লেনদেনে Debit = Credit সর্বদা সমান থাকে।`,

    "Standard Costing & Variance Analysis": `## ⚡ Quick Answer
**Standard Costing** is a technique where predetermined costs are compared with actual costs to identify variances and improve efficiency.

## 📖 Simplified Breakdown
Standard costs are set in advance based on expected efficiency. Actual costs are then compared, and the difference (variance) is analyzed. **Favorable (F)** variance = actual cost less than standard; **Adverse (A)** = actual cost more than standard.

**বাংলায়:** পূর্বনির্ধারিত আদর্শ খরচের সাথে বাস্তব খরচের তুলনা করে পার্থক্য (Variance) বের করা হয়।

## 🔑 Key Variances
- **Material Price Variance** = (SP − AP) × AQ
- **Material Usage Variance** = (SQ − AQ) × SP
- **Labour Rate Variance** = (SR − AR) × AH
- **Labour Efficiency Variance** = (SH − AH) × SR
- **Overhead Volume Variance** = Absorbed − Budgeted

## 🎯 Practical Scenario
Standard material: 10 kg @ ₹5 = ₹50. Actual: 12 kg @ ₹4.50 = ₹54
1. **MPV** = (5 − 4.50) × 12 = ₹6 Favorable
2. **MUV** = (10 − 12) × 5 = −₹10 Adverse
3. **Total Material Variance** = ₹50 − ₹54 = −₹4 Adverse

## 📊 Variance Summary
| Variance | Formula | F/A |
|---|---|---|
| MCV | SC − AC | F if SC > AC |
| MPV | (SP−AP)×AQ | F if SP > AP |
| MUV | (SQ−AQ)×SP | F if SQ > AQ |
| LCV | SC − AC | F if SC > AC |

## 💡 Pro-Tip
**Memory Trick:** "SPAM" for variances — **S**tandard Price, **A**ctual Price, **M**aterial quantity matters!

---
## 🔵 বাংলা সারসংক্ষেপ
Standard Costing-এ সবচেয়ে গুরুত্বপূর্ণ হল Variance-এর formula মুখস্থ করা। F (Favorable) মানে লাভজনক পার্থক্য, A (Adverse) মানে ক্ষতিকর পার্থক্য। প্রতিটি formula-তে Standard এবং Actual-এর পার্থক্যই Variance।`,

    "Capital Budgeting (NPV, IRR, Payback)": `## ⚡ Quick Answer
**Capital Budgeting** is the process of evaluating and selecting long-term investment projects. Key methods: NPV, IRR, Payback Period, and PI.

## 📖 Simplified Breakdown
NPV discounts future cash flows to present value. If NPV > 0, project is acceptable. IRR is the discount rate that makes NPV = 0. Higher IRR = better project. Payback Period = time to recover initial investment.

**বাংলায়:** মূলধনী বাজেটায়ন হল দীর্ঘমেয়াদী বিনিয়োগ সিদ্ধান্ত গ্রহণের পদ্ধতি।

## 🔑 Key Formulas
- **NPV** = ΣCFt/(1+r)^t − Initial Investment
- **Payback Period** = Initial Investment / Annual Cash Flow
- **PI** = PV of Cash Inflows / Initial Investment
- **IRR** = r where NPV = 0

## 🎯 Practical Scenario
Project A: Initial Investment ₹1,00,000. Cash flows: Yr1: ₹40,000, Yr2: ₹40,000, Yr3: ₹40,000. Discount rate 10%.
1. PV factors: 0.909, 0.826, 0.751
2. PV of inflows = 40,000 × (0.909+0.826+0.751) = 40,000 × 2.486 = ₹99,440
3. NPV = ₹99,440 − ₹1,00,000 = −₹560 (Reject)

## 📊 Comparison of Methods
| Method | Considers TVM | Best For |
|---|---|---|
| Payback | No | Liquidity |
| NPV | Yes | Absolute value |
| IRR | Yes | % Return |
| PI | Yes | Ranking |

## 💡 Pro-Tip
**NPV Rule:** Accept if NPV > 0; **IRR Rule:** Accept if IRR > Cost of Capital; **PI Rule:** Accept if PI > 1.

---
## 🔵 বাংলা সারসংক্ষেপ
Capital Budgeting-এ NPV পদ্ধতি সবচেয়ে শ্রেষ্ঠ কারণ এটি Time Value of Money বিবেচনা করে এবং সরাসরি মান (absolute value) দেয়। ICMAI exam-এ NPV calculation-এর সাথে PI এবং Payback Period-এর সংখ্যাসূচক প্রশ্ন অবশ্যই প্রস্তুত রাখতে হবে।`,

    "GST — Basic Concepts": `## ⚡ Quick Answer
**GST (Goods and Services Tax)** is a comprehensive, multi-stage, destination-based indirect tax levied on every value addition, introduced in India on 1st July 2017.

## 📖 Simplified Breakdown
GST replaced multiple indirect taxes (VAT, Service Tax, Excise Duty). It has a dual structure: Central GST (CGST) + State GST (SGST) for intra-state, and Integrated GST (IGST) for inter-state supply.

**বাংলায়:** GST হল ভারতের একটি সমন্বিত পরোক্ষ কর যা পণ্য ও সেবা উভয়ের উপর প্রযোজ্য। ২০১৭ সালের ১ জুলাই থেকে কার্যকর।

## 🔑 Key Components
- **CGST** — Central Government tax on intra-state supply
- **SGST/UTGST** — State/UT Government tax on intra-state supply
- **IGST** — Central tax on inter-state supply
- **Threshold Limit** — ₹40 lakhs (goods), ₹20 lakhs (services)
- **Composition Scheme** — For small taxpayers (turnover < ₹1.5 crore)
- **Input Tax Credit (ITC)** — Credit for taxes paid on purchases

## 🎯 Practical Scenario
Merchant in West Bengal sells goods to Delhi buyer for ₹1,00,000 + 18% GST:
1. **Intra-state sale (WB to WB):** CGST 9% = ₹9,000 + SGST 9% = ₹9,000. Total GST = ₹18,000
2. **Inter-state sale (WB to Delhi):** IGST 18% = ₹18,000 (goes to centre, then shared)

## 📊 Tax Comparison
| Tax | Rate | Applicable |
|---|---|---|
| CGST | 0/5/12/18/28% | Intra-state |
| SGST | Same as CGST | Intra-state |
| IGST | CGST+SGST rate | Inter-state |

## 💡 Pro-Tip
**Mnemonic:** "**SDIG**" — Supply, Destination, Input credit, GST registration. These 4 concepts form the backbone of GST.

---
## 🔵 বাংলা সারসংক্ষেপ
GST পরীক্ষায় সবচেয়ে গুরুত্বপূর্ণ: (১) CGST+SGST vs IGST পার্থক্য, (২) ITC eligibility, (৩) GST rates (0%, 5%, 12%, 18%, 28%), (৪) Registration threshold limits। এই চারটি বিষয় ভালোভাবে বুঝলে GST প্রশ্নের ৬০% উত্তর দেওয়া সম্ভব।`,

    "Balanced Scorecard": `## ⚡ Quick Answer
**Balanced Scorecard (BSC)** is a strategic performance management tool developed by Kaplan & Norton (1992) that measures organizational performance from four perspectives.

## 📖 Simplified Breakdown
BSC goes beyond financial metrics to include non-financial performance indicators. It links strategy to operations through four balanced perspectives.

**বাংলায়:** Balanced Scorecard হল একটি কৌশলগত কর্মক্ষমতা পরিমাপ পদ্ধতি যা শুধু আর্থিক নয়, চারটি দিক থেকে ব্যবসার সাফল্য পরিমাপ করে।

## 🔑 Four Perspectives
1. **Financial** — ROI, Revenue Growth, Cost Reduction
2. **Customer** — Satisfaction, Retention, Market Share
3. **Internal Business Process** — Quality, Cycle Time, Innovation
4. **Learning & Growth** — Employee skills, IT systems, Culture

## 🎯 Practical Scenario
ABC Manufacturing Company BSC:
1. **Financial:** Achieve 15% ROI (Target vs Actual)
2. **Customer:** 90% customer satisfaction rating
3. **Process:** Reduce defect rate to <1%
4. **Learning:** Train 100% employees on new software

## 📊 Traditional vs BSC
| Aspect | Traditional | Balanced Scorecard |
|---|---|---|
| Focus | Financial only | 4 perspectives |
| Time horizon | Short-term | Long & short-term |
| Indicators | Lagging | Leading + Lagging |
| Strategy link | Weak | Strong |

## 💡 Pro-Tip
**ICMAI Tip:** BSC questions often ask: "What are the limitations of BSC?" Answer: Implementation is costly, time-consuming, and requires strong management commitment.

---
## 🔵 বাংলা সারসংক্ষেপ
Balanced Scorecard-এর চারটি দিক (Financial, Customer, Internal Process, Learning & Growth) মনে রাখতে হবে। এটি শুধু আর্থিক সাফল্য নয়, সামগ্রিক প্রাতিষ্ঠানিক উৎকর্ষতা পরিমাপ করে। ICMAI Final-এ এই বিষয়ে case study ধরনের প্রশ্ন আসে।`,
  };

  // Find best matching chapter/topic
  const matchKey = Object.keys(knowledgeBase).find(
    (k) => chapter.includes(k) || k.includes(chapter.split(" ")[0]),
  );

  if (matchKey) {
    const baseContent = knowledgeBase[matchKey];
    if (question && question !== chapter) {
      return `## 📚 ${subject} — ${chapter}\n\n**প্রশ্ন:** ${question}\n\n${baseContent}\n\n---\n*📌 Source: ICMAI Official Syllabus | ${level}*`;
    }
    return `${baseContent}\n\n---\n*📌 Source: ICMAI Official Syllabus | ${level}*`;
  }

  // Generic detailed response for any chapter
  return `## 📚 ${subject} — ${chapter}

**প্রশ্ন:** ${question || chapter}

## ⚡ Quick Answer
**${chapter}** is an important topic in **${subject}** under the **${level}** syllabus of ICMAI (Institute of Cost Accountants of India).

## 📖 Detailed Explanation (English)
${chapter} covers the fundamental principles and practical applications relevant to cost and management accounting. This topic forms the basis for understanding how businesses plan, control, and evaluate their financial performance.

Key aspects include:
- Theoretical foundations and definitions
- Regulatory framework applicable in India
- Practical application in business scenarios
- Relationship with other accounting concepts

## 📖 বিস্তারিত ব্যাখ্যা (বাংলা)
**${chapter}** হল ICMAI সিলেবাসের একটি গুরুত্বপূর্ণ বিষয়। এই অধ্যায়ে:
- মূল ধারণা ও সংজ্ঞা
- ভারতীয় আইন ও বিধিমালা অনুযায়ী প্রয়োগ
- ব্যবহারিক উদাহরণ ও সমস্যা সমাধান
- সম্পর্কিত অধ্যায়ের সাথে সংযোগ

## 🎯 Practical Application
In real business scenarios, ${chapter} is applied when:
1. Management needs to make informed decisions
2. Cost control measures are implemented
3. Performance evaluation is conducted
4. Strategic planning is undertaken

## 📊 Key Concepts Summary
| Concept | Description | Application |
|---|---|---|
| Definition | Core meaning | Theory questions |
| Formula/Rule | Calculation method | Practical questions |
| Standards | ICMAI/regulatory | Compliance questions |
| Examples | Real-world cases | Case studies |

## 💡 Pro-Tip for ICMAI Exam
For this topic, focus on:
1. **Definitions** — 2-3 mark questions
2. **Numerical problems** — 8-10 mark questions  
3. **Case studies** — 15-20 mark questions

Always write answers in a structured format with proper headings.

---
## 🔵 বাংলা সারসংক্ষেপ
${chapter} বিষয়টি ICMAI পরীক্ষায় নিয়মিতভাবে আসে। তাত্ত্বিক ও ব্যবহারিক উভয় দিক ভালো করে পড়তে হবে। Numerical problems-এর জন্য formula এবং step-by-step solution method অনুশীলন করুন।

---
*📌 Source: ICMAI Official Study Material | ${level}*`;
}

function generateCMAPractical(
  subject: string,
  chapter: string,
  question: string,
): string {
  const numQ = question.toLowerCase();

  // Cost Sheet
  if (
    numQ.includes("cost sheet") ||
    numQ.includes("cost statement") ||
    chapter.includes("Cost Sheet")
  ) {
    return `## 🧮 Cost Sheet / Cost Statement

**প্রশ্ন:** ${question}

## 📋 Standard Cost Sheet Format

| Particulars | Amount (₹) | Amount (₹) |
|---|---|---|
| **Opening Stock of Raw Material** | ×× | |
| **Add:** Purchases | ×× | |
| **Less:** Closing Stock of Raw Material | (××) | |
| **= Raw Material Consumed** | | ×× |
| **Add:** Direct Labour (Wages) | | ×× |
| **Add:** Direct Expenses | | ×× |
| **= PRIME COST** | | ×× |
| **Add:** Factory/Works Overhead | | ×× |
| **= WORKS COST / FACTORY COST** | | ×× |
| **Add:** Opening WIP | ×× | |
| **Less:** Closing WIP | (××) | |
| **= COST OF PRODUCTION** | | ×× |
| **Add:** Opening Stock of Finished Goods | ×× | |
| **Less:** Closing Stock of Finished Goods | (××) | |
| **= COST OF GOODS SOLD** | | ×× |
| **Add:** Admin & Office Overhead | | ×× |
| **Add:** Selling & Distribution Overhead | | ×× |
| **= COST OF SALES / TOTAL COST** | | ×× |
| **Add:** Profit | | ×× |
| **= SALES** | | ×× |

## 🔑 Key Points
- **Prime Cost** = Direct Material + Direct Labour + Direct Expenses
- **Works Cost** = Prime Cost + Factory Overhead
- **Cost of Production** = Works Cost ± WIP Adjustment
- **Cost of Sales** = Cost of Goods Sold + Admin + Selling Overhead

## 💡 Pro-Tip
Always show WIP adjustments after Works Cost, and Finished Goods stock adjustments after Cost of Production. This is where students lose marks!

---
*📌 ICMAI Standard Format | ${subject}*`;
  }

  // Variance Analysis
  if (numQ.includes("variance") || chapter.includes("Variance")) {
    return `## 🧮 Variance Analysis — Step-by-Step Solution

**প্রশ্ন:** ${question}

## 📋 Solution Method

### Step 1: Identify Standard & Actual Data
- Standard Data: SP (Standard Price), SQ (Standard Quantity), SR (Standard Rate), SH (Standard Hours)
- Actual Data: AP (Actual Price), AQ (Actual Quantity), AR (Actual Rate), AH (Actual Hours)

### Step 2: Apply Formulas

**Material Variances:**
| Variance | Formula | Favorable (F) when |
|---|---|---|
| **MCV** (Total) | SC − AC | SC > AC |
| **MPV** (Price) | (SP − AP) × AQ | SP > AP |
| **MUV** (Usage) | (SQ − AQ) × SP | SQ > AQ |

**Labour Variances:**
| Variance | Formula | Favorable (F) when |
|---|---|---|
| **LCV** (Total) | SC − AC | SC > AC |
| **LRV** (Rate) | (SR − AR) × AH | SR > AR |
| **LEV** (Efficiency) | (SH − AH) × SR | SH > AH |

### Step 3: Verify
MCV = MPV + MUV (Always check this!)

## 🎯 Worked Example
Standard: 5 kg @ ₹10 = ₹50. Actual: 6 kg @ ₹9 = ₹54. Output: 100 units.
- **MPV** = (₹10 − ₹9) × 6 = ₹6 (F)
- **MUV** = (5 − 6) × ₹10 = −₹10 (A)  
- **MCV** = ₹50 − ₹54 = −₹4 (A) ✓ [= ₹6F − ₹10A = ₹4A]

## 💡 Pro-Tip
F = Favorable (actual cost LESS than standard — good)
A = Adverse (actual cost MORE than standard — bad)

---
*📌 ICMAI Standard Method | ${subject}*`;
  }

  // NPV/IRR
  if (
    numQ.includes("npv") ||
    numQ.includes("irr") ||
    numQ.includes("payback") ||
    chapter.includes("Capital Budgeting")
  ) {
    return `## 🧮 Capital Budgeting — NPV & IRR Calculation

**প্রশ্ন:** ${question}

## 📋 NPV Calculation Format

| Year | Cash Flow (₹) | PV Factor @ r% | Present Value (₹) |
|---|---|---|---|
| 0 | (Initial Investment) | 1.000 | (×,×××) |
| 1 | CF₁ | 1/(1+r)¹ | ×,××× |
| 2 | CF₂ | 1/(1+r)² | ×,××× |
| 3 | CF₃ | 1/(1+r)³ | ×,××× |
| **NPV** | | | **Sum − Investment** |

## 🔑 Decision Rules
- **NPV > 0** → Accept (Project adds value)
- **NPV < 0** → Reject
- **IRR > Cost of Capital** → Accept
- **PI > 1** → Accept
- **Payback < Target** → Accept

## 🎯 Example Calculation
Project: Investment ₹1,00,000. Annual CF: ₹30,000 for 5 years. r = 10%.
- PV Annuity Factor (5 yr, 10%) = 3.791
- Total PV = ₹30,000 × 3.791 = ₹1,13,730
- **NPV = ₹1,13,730 − ₹1,00,000 = ₹13,730 (Accept)**
- Payback = ₹1,00,000 / ₹30,000 = 3.33 years

## 💡 Pro-Tip
For IRR, use interpolation: **IRR = r₁ + [NPV₁/(NPV₁−NPV₂)] × (r₂−r₁)**

Always compute both NPV and IRR in exam questions for full marks.

---
*📌 ICMAI Standard Method | ${subject}*`;
  }

  // Generic practical solution
  return `## 🧮 Practical Solution — ${chapter}

**প্রশ্ন:** ${question}

## 📋 Solution Framework

### Step 1: Identify Given Data
List all given values clearly:
- Extract all numerical data from the problem
- Identify what needs to be calculated
- Note any assumptions or conditions

### Step 2: Apply Relevant Formula
For ${chapter}, the key formulas are:
- Identify the appropriate formula based on the question type
- Substitute values carefully
- Show all workings step by step

### Step 3: Calculate
| Particulars | Amount (₹) |
|---|---|
| Given Value 1 | ×× |
| Given Value 2 | ×× |
| **Result** | **××** |

### Step 4: Verify & Interpret
- Cross-check your calculation
- State the result clearly
- Provide interpretation/conclusion

## 💡 Pro-Tip for ICMAI
- Always show working — partial marks are awarded
- Use standard format for all practical answers
- Double-check arithmetic before submitting
- Label all rows and columns clearly

## 🔵 বাংলা নির্দেশনা
ICMAI পরীক্ষায় Practical প্রশ্নের উত্তর সবসময় Step-by-step format-এ লিখতে হবে। প্রতিটি ধাপ স্পষ্টভাবে দেখালে partial marks পাওয়া যায়।

---
*📌 ICMAI Standard Method | ${subject}*`;
}

function generateCMAShort(
  subject: string,
  chapter: string,
  question: string,
): string {
  return `## 📝 Short Answer — ${chapter}

**প্রশ্ন:** ${question}

## ✅ Answer (English)
**${question || chapter}** refers to an important concept in **${subject}** under the ICMAI syllabus.

${chapter} involves the systematic application of cost and management accounting principles to measure, analyze, and report on business performance. The key aspects include proper classification, measurement, and control of costs in accordance with ICMAI standards.

**Key Points:**
- Definition and scope as per ICMAI guidelines
- Application in Indian business context
- Regulatory compliance requirements
- Practical significance in cost management

## ✅ সংক্ষিপ্ত উত্তর (বাংলা)
**${question || chapter}** হল ${subject} বিষয়ের একটি গুরুত্বপূর্ণ ধারণা।

এই বিষয়ে মূল বিষয়গুলো:
- সংজ্ঞা: ICMAI সিলেবাস অনুযায়ী সঠিক সংজ্ঞা
- প্রয়োগ: ব্যবসায়িক পরিস্থিতিতে ব্যবহার
- গুরুত্ব: খরচ ব্যবস্থাপনায় ভূমিকা
- উদাহরণ: বাস্তব উদাহরণ সহ ব্যাখ্যা

## 💡 Exam Tips
- Short answers should be 4-6 lines for 2-mark questions
- Include definition + application for 4-mark questions
- Always mention the relevant act/standard if applicable

---
*📌 ICMAI Study Material | ${subject}*`;
}

function generateCMAMCQ(
  subject: string,
  chapter: string,
  question: string,
): string {
  const mcqSets: Record<
    string,
    Array<{ q: string; options: string[]; answer: string; explanation: string }>
  > = {
    "Cost Accounting Basics": [
      {
        q: "Which of the following is NOT included in Prime Cost?",
        options: [
          "A) Direct Material",
          "B) Direct Labour",
          "C) Factory Overhead",
          "D) Direct Expenses",
        ],
        answer: "C) Factory Overhead",
        explanation:
          "Prime Cost = Direct Material + Direct Labour + Direct Expenses. Factory Overhead is an indirect cost added to get Works Cost.",
      },
      {
        q: "Cost Sheet is prepared to ascertain:",
        options: [
          "A) Net Profit",
          "B) Cost of Production",
          "C) Balance Sheet",
          "D) Cash Flow",
        ],
        answer: "B) Cost of Production",
        explanation:
          "A Cost Sheet is a statement prepared to show the cost of production/cost of goods sold per unit and in total.",
      },
      {
        q: "Overheads are classified on the basis of:",
        options: [
          "A) Nature",
          "B) Function",
          "C) Behaviour",
          "D) All of the above",
        ],
        answer: "D) All of the above",
        explanation:
          "Overheads can be classified by nature (material/labour/expense), by function (factory/admin/selling), and by behaviour (fixed/variable/semi-variable).",
      },
    ],
    "Standard Costing & Variance Analysis": [
      {
        q: "Material Price Variance = ?",
        options: [
          "A) (SP-AP) × AQ",
          "B) (SQ-AQ) × SP",
          "C) (SP-AP) × SQ",
          "D) SC - AC",
        ],
        answer: "A) (SP-AP) × AQ",
        explanation:
          "Material Price Variance measures the difference in price paid vs standard price, multiplied by actual quantity purchased.",
      },
      {
        q: "If Standard Cost > Actual Cost, variance is:",
        options: [
          "A) Adverse",
          "B) Favorable",
          "C) Nil",
          "D) Cannot determine",
        ],
        answer: "B) Favorable",
        explanation:
          "When actual cost is LESS than standard cost, it means we spent less than expected — this is Favorable (F) variance.",
      },
    ],
    "Financial Management": [
      {
        q: "NPV stands for:",
        options: [
          "A) Net Present Value",
          "B) Net Profit Value",
          "C) New Present Value",
          "D) Net Purchase Value",
        ],
        answer: "A) Net Present Value",
        explanation:
          "NPV (Net Present Value) is the difference between the present value of cash inflows and the initial investment.",
      },
      {
        q: "Working Capital = ?",
        options: [
          "A) Current Assets - Current Liabilities",
          "B) Fixed Assets - Long-term Liabilities",
          "C) Total Assets - Total Liabilities",
          "D) Current Assets + Current Liabilities",
        ],
        answer: "A) Current Assets - Current Liabilities",
        explanation:
          "Working Capital = Current Assets − Current Liabilities. Positive working capital means the company can meet short-term obligations.",
      },
    ],
  };

  const matchKey = Object.keys(mcqSets).find(
    (k) =>
      chapter.includes(k.split(" ")[0]) || k.includes(chapter.split(" ")[0]),
  );
  const mcqs = matchKey ? mcqSets[matchKey] : mcqSets["Cost Accounting Basics"];

  const qHeader = question ? `**প্রশ্ন:** ${question}\n\n` : "";
  let output = `## 📝 MCQ Practice — ${chapter} (${subject})\n\n${qHeader}`;
  for (let i = 0; i < mcqs.length; i++) {
    const mcq = mcqs[i];
    output += `### Q${i + 1}: ${mcq.q}\n\n`;
    for (const opt of mcq.options) {
      output += `- ${opt}\n`;
    }
    output += `\n**✅ Correct Answer: ${mcq.answer}**\n\n`;
    output += `**📖 Explanation:** ${mcq.explanation}\n\n---\n\n`;
  }

  output += `## 💡 Pro-Tip for MCQs\nFor CMA MCQ questions:\n- Eliminate obviously wrong options first\n- Look for keyword-based answers\n- Remember formulas — many MCQs test formula knowledge\n- Read options carefully — \'all of the above\' is often correct in theory MCQs\n\n*📌 ICMAI MCQ Bank | ${subject}*`;
  return output;
}
