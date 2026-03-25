export interface CASolverInput {
  level: "foundation" | "intermediate" | "final";
  subject: string;
  chapter: string;
  question: string;
  questionType: "theory" | "practical" | "mcq" | "short";
}

// ─── Structured Study Guide Builder ───────────────────────────────────────────────
function buildStudyGuide(p: {
  title: string;
  quickAnswer: string;
  breakdown: string;
  keyElements: string[];
  scenario: string[];
  comparison?: string;
  proTip: string;
  bengali?: string;
}): string {
  const elemLines = p.keyElements.map((e) => `- ${e}`).join("\n");
  const scenarioLines = p.scenario.map((s, i) => `${i + 1}. ${s}`).join("\n");

  let out = `## ${p.title}\n\n---\n\n`;
  out += `## \u26a1 Quick Answer (The Core)\n${p.quickAnswer}\n\n---\n\n`;
  out += `## \ud83d\udcd6 Simplified Breakdown (Concept)\n${p.breakdown}\n\n---\n\n`;
  out += `## \ud83d\udd11 Key Elements / Parties\n${elemLines}\n\n---\n\n`;
  out += `## \ud83c\udfaf Practical Application (The Scenario)\n${scenarioLines}\n`;

  if (p.comparison) {
    out += `\n---\n\n## \ud83d\udcca Comparative Analysis\n${p.comparison}\n`;
  }

  out += `\n---\n\n## \ud83d\udca1 Pro-Tip for Exams\n${p.proTip}`;

  if (p.bengali) {
    out += `\n\n---\n\n## \ud83d\udd35 \u09ac\u09be\u0982\u09b2\u09be \u09b8\u09be\u09b0\u09b8\u0982\u0995\u09cd\u09b7\u09c7\u09aa\n${p.bengali}`;
  }

  return out;
}

function caLevel(level: string): string {
  return level === "foundation"
    ? "Foundation"
    : level === "intermediate"
      ? "Intermediate"
      : "Final";
}

// ─── Topic-specific guides ──────────────────────────────────────────────────────────

function getBillOfExchangeGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Bill of Exchange`,
    quickAnswer:
      "A **Bill of Exchange** is a written, unconditional order signed by the **Drawer**, directing the **Drawee** to pay a specified sum to the **Payee** on demand or at a fixed future date. [Negotiable Instruments Act, 1881 \u2014 Section 5]",
    breakdown:
      "Think of a Bill of Exchange like a formal IOU with three parties. When Ramesh sells goods worth \u20b950,000 to Suresh on credit, Ramesh (Drawer) can draw a bill ordering Suresh (Drawee) to pay \u20b950,000 after 3 months to the bearer (Payee).\n\nThe 'Why': It converts a credit transaction into a negotiable instrument \u2014 Ramesh can **discount** this bill at a bank to get immediate cash, even before the 3-month period ends.\n\nThe 'How': Drawer writes the bill \u2192 Drawee **accepts** it by signing \u2192 Bill becomes an **Accepted Bill** \u2192 can be discounted, endorsed, or held till maturity.",
    keyElements: [
      "**Drawer** \u2014 The creditor who creates (draws) the bill (e.g., Seller/Ramesh)",
      "**Drawee** \u2014 The debtor on whom the bill is drawn; becomes **Acceptor** after signing",
      "**Payee** \u2014 The person who receives payment (may be same as Drawer)",
      "**Amount** \u2014 Fixed, certain sum of money",
      "**Date of Maturity** \u2014 3 days of grace added to the period",
      "**Stamp Duty** \u2014 Must be properly stamped as per Stamp Act",
      "**Acceptance** \u2014 Drawee's signature making the bill valid",
    ],
    scenario: [
      "**Step 1 \u2014 Drawing the Bill:** Ramesh (Seller) sold goods \u20b910,000 to Suresh on 1 Jan. Ramesh draws a 3-month bill on Suresh. Suresh accepts it. Entry in Ramesh's books: *Bills Receivable A/c Dr \u20b910,000 | To Suresh A/c \u20b910,000*",
      "**Step 2 \u2014 Discounting the Bill:** On 5 Jan, Ramesh discounts the bill at bank @ 12% p.a. Discount = \u20b910,000 \u00d7 12% \u00d7 3/12 = \u20b9300. Entry: *Bank A/c Dr \u20b99,700 | Discount A/c Dr \u20b9300 | To Bills Receivable A/c \u20b910,000*",
      "**Step 3 \u2014 Maturity & Dishonour:** On maturity (4 Apr with grace), if Suresh dishonours: Bank notifies Ramesh \u2192 *Suresh A/c Dr \u20b910,000 | To Bank A/c \u20b910,000* (Noting charges extra if any).",
    ],
    comparison:
      "| Feature | **Bill of Exchange** | **Promissory Note** |\n|---|---|---|\n| Parties | 3 (Drawer, Drawee, Payee) | 2 (Maker, Payee) |\n| Who initiates | Creditor (Drawer) | Debtor (Maker) |\n| Acceptance | Required by Drawee | Not required |\n| Defined in | NI Act, Sec 5 | NI Act, Sec 4 |\n| Applicable to | Trade transactions | Loan/borrowing |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** 'The **D**rawer **D**raws on the **D**rawee' \u2014 all three D's! A common exam mistake: Students forget to add **3 days of grace** when calculating maturity date. Always add grace days unless the bill is 'on demand'.",
    bengali:
      "\u09ac\u09bf\u09a8\u09bf\u09ae\u09af\u09bc \u09ac\u09bf\u09b2 \u09b9\u09b2\u09cb \u098f\u0995\u099f\u09bf \u09b2\u09bf\u0996\u09bf\u09a4, \u09a8\u09bf\u0983\u09b6\u09b0\u09cd\u09a4 \u0986\u09a6\u09c7\u09b6 \u09af\u09c7\u0996\u09be\u09a8\u09c7 Drawer, Drawee-\u0995\u09c7 \u09a8\u09bf\u09b0\u09cd\u09a6\u09bf\u09b7\u09cd\u099f \u0985\u09b0\u09cd\u09a5 Payee-\u0995\u09c7 \u09aa\u09b0\u09bf\u09b6\u09cb\u09a7 \u0995\u09b0\u09a4\u09c7 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6 \u09a6\u09c7\u09a8\u0964 \u098f\u099f\u09bf NI Act 1881, Section 5 \u09a6\u09cd\u09ac\u09be\u09b0\u09be \u09b8\u0982\u099c\u09cd\u099e\u09be\u09af\u09bc\u09bf\u09a4\u0964 \u09ae\u09c7\u09af\u09bc\u09be\u09a6 \u09b6\u09c7\u09b7\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996\u09c7 3 \u09a6\u09bf\u09a8 grace \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u0964",
  });
}

function getDepreciationGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Depreciation`,
    quickAnswer:
      "**Depreciation** is the systematic allocation of the depreciable amount of an asset over its useful life. [AS 10 \u2014 Property, Plant and Equipment; Companies Act 2013, Schedule II]",
    breakdown:
      "Imagine you buy a car for \u20b95,00,000. After 5 years, it's worth only \u20b91,00,000. The \u20b94,00,000 'lost value' is Depreciation \u2014 it must be charged to P&L each year, not all at once.\n\nThe 'Why': Matching Principle \u2014 the cost of the asset must be matched against the revenue it helps generate over its useful life.\n\nThe 'How': Two main methods \u2014 **SLM** (equal charge every year) and **WDV** (higher charge early, reduces each year).",
    keyElements: [
      "**Cost of Asset** \u2014 Original purchase price including installation",
      "**Residual / Scrap Value** \u2014 Estimated value at end of useful life",
      "**Depreciable Amount** = Cost \u2212 Scrap Value",
      "**Useful Life** \u2014 Estimated years of productive use",
      "**SLM Rate** = (Cost \u2212 Scrap) / Useful Life",
      "**WDV Rate** = Fixed % applied on reducing book value each year",
      "**Accumulated Depreciation** \u2014 Total dep charged from date of purchase",
    ],
    scenario: [
      "**Step 1 \u2014 Data:** Machine cost \u20b91,20,000 | Scrap Value \u20b920,000 | Life 10 years. SLM Dep = (1,20,000 \u2212 20,000) / 10 = **\u20b910,000/year**.",
      "**Step 2 \u2014 Journal Entry (Year 1):** *Depreciation A/c Dr \u20b910,000 | To Accumulated Depreciation A/c \u20b910,000*. At year end: *P&L A/c Dr \u20b910,000 | To Depreciation A/c \u20b910,000*. Book Value = \u20b91,10,000.",
      "**Step 3 \u2014 WDV Comparison:** Same machine at 20% WDV: Year 1 Dep = 1,20,000 \u00d7 20% = \u20b924,000 \u2192 BV \u20b996,000. Year 2 = 96,000 \u00d7 20% = \u20b919,200 \u2192 BV \u20b976,800. Notice: WDV dep **decreases** each year.",
    ],
    comparison:
      "| Feature | **SLM** | **WDV** |\n|---|---|---|\n| Dep amount | Equal every year | Decreases each year |\n| Suitable for | Assets with uniform use | Assets with higher early use |\n| Book Value | Reaches scrap value | Never becomes zero |\n| Preferred by AS 10 | Both allowed | Both allowed |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** SLM = **S**ame every year. WDV = **W**aning (decreasing) every year. Common mistake: Forgetting to deduct scrap value in SLM \u2014 always calculate on **Depreciable Amount** (Cost \u2212 Scrap), not Cost.",
    bengali:
      "\u0985\u09ac\u099a\u09af\u09bc \u09b9\u09b2\u09cb \u098f\u0995\u099f\u09bf \u09b8\u09ae\u09cd\u09aa\u09a6\u09c7\u09b0 \u09ae\u09c2\u09b2\u09cd\u09af\u09c7\u09b0 \u09aa\u09a6\u09cd\u09a7\u09a4\u09bf\u0997\u09a4 \u09b9\u09cd\u09b0\u09be\u09b8 \u09af\u09be P&L-\u098f \u09ac\u09a8\u09cd\u099f\u09a8 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u0964 SLM: \u09aa\u09cd\u09b0\u09a4\u09bf \u09ac\u099b\u09b0 \u09b8\u09ae\u09be\u09a8 \u0985\u09ac\u099a\u09af\u09bc\u0964 WDV: \u09aa\u09cd\u09b0\u09a4\u09bf \u09ac\u099b\u09b0 \u0995\u09ae\u09a4\u09c7 \u09a5\u09be\u0995\u09c7\u0964",
  });
}

function getGSTGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | GST \u2014 Goods and Services Tax`,
    quickAnswer:
      "**GST** is a comprehensive, destination-based, dual indirect tax levied on supply of goods and services in India, introduced on **1st July 2017**, replacing VAT, Service Tax, Excise Duty and other levies. [101st Constitutional Amendment Act, 2016]",
    breakdown:
      "Before GST, a manufacturer paid Excise Duty, then a trader paid VAT on the same goods \u2014 this was 'tax on tax' or **cascading effect**. GST solved this with seamless **Input Tax Credit (ITC)** flow across the supply chain.\n\nThe 'Why': Create one unified national market, eliminate multiple state taxes, single tax system across India.\n\nThe 'How': Dual structure \u2014 **CGST** goes to Centre, **SGST** goes to State for intra-state supply; **IGST** for inter-state supply.",
    keyElements: [
      "**CGST** \u2014 Central GST (Central Government's share for intra-state)",
      "**SGST** \u2014 State GST (State Government's share for intra-state)",
      "**IGST** \u2014 Integrated GST for inter-state and import transactions",
      "**Input Tax Credit (ITC)** \u2014 Tax paid on purchases set-off against tax on sales",
      "**GSTIN** \u2014 15-digit GST Identification Number",
      "**Threshold** \u2014 Turnover below \u20b920 lakhs (\u20b910 lakhs special states) is exempt",
      "**GST Council** \u2014 Constitutional body (Article 279A) for rate and policy decisions",
      "**Composition Scheme** \u2014 Small businesses below \u20b91.5 cr pay flat rate",
    ],
    scenario: [
      "**Step 1 \u2014 Intra-state Supply:** Rohit (Maharashtra) sells goods to Vijay (Maharashtra) for \u20b91,00,000. GST rate = 18%. CGST = \u20b99,000 | SGST = \u20b99,000 | Invoice = \u20b91,18,000.",
      "**Step 2 \u2014 ITC Set-off:** Vijay paid \u20b99,000 CGST + \u20b99,000 SGST as Input. When Vijay sells for \u20b91,40,000, Output Tax = \u20b925,200 (CGST \u20b912,600 + SGST \u20b912,600). Net payable: CGST = 12,600 \u2212 9,000 = **\u20b93,600** | SGST = **\u20b93,600**.",
      "**Step 3 \u2014 Inter-state Supply:** Mohan (Delhi) sells to Priya (Mumbai) for \u20b950,000 @ 12%. IGST = \u20b96,000 (goes to Centre). Invoice = \u20b956,000. Priya claims full \u20b96,000 IGST as ITC.",
    ],
    comparison:
      "| Feature | **Pre-GST** | **Post-GST** |\n|---|---|---|\n| Number of taxes | 17+ indirect taxes | One GST |\n| Tax-on-tax | Yes (Cascading) | No (ITC available) |\n| Compliance | State-wise different | Uniform GSTN portal |\n| Revenue split | Centre or State only | Shared \u2014 CGST/SGST |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** **IGST = Inter-state, Goes to Centre first**. **CGST + SGST = Intra-state (same state)**. Common mistake: Writing CGST for inter-state transactions \u2014 IGST always applies for inter-state!",
    bengali:
      "GST \u09b9\u09b2\u09cb \u09b8\u09be\u09ae\u0997\u09cd\u09b0\u09bf\u0995, \u0997\u09a8\u09cd\u09a4\u09ac\u09cd\u09af-\u09ad\u09bf\u09a4\u09cd\u09a4\u09bf\u0995 \u09a6\u09cd\u09ac\u09c8\u09a4 \u0995\u09b0 \u09ac\u09cd\u09af\u09ac\u09b8\u09cd\u09a5\u09be\u0964 CGST \u0995\u09c7\u09a8\u09cd\u09a6\u09cd\u09b0 \u09aa\u09be\u09af\u09bc, SGST \u09b0\u09be\u099c\u09cd\u09af \u09aa\u09be\u09af\u09bc, IGST \u0986\u09a8\u09cd\u09a4\u0983\u09b0\u09be\u099c\u09cd\u09af \u09b2\u09c7\u09a8\u09a6\u09c7\u09a8\u09c7 \u09aa\u09cd\u09b0\u09af\u09cb\u099c\u09cd\u09af\u0964 ITC cascading effect \u09a6\u09c2\u09b0 \u0995\u09b0\u09c7\u0964",
  });
}

function getPartnershipGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Partnership Accounts`,
    quickAnswer:
      "A **Partnership** is a relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all. [Indian Partnership Act, 1932 \u2014 Section 4]",
    breakdown:
      "Partnership is the middle ground between a sole proprietorship and a company. Two or more people pool resources, skills, and share profits (and losses) as per an agreed ratio.\n\nThe 'Why': Accounts must reflect the interests of each partner separately through **Capital Accounts**, **Current Accounts**, and **Profit Sharing**.\n\nKey complication: When a **new partner is admitted** or a partner **retires**, the existing profit-sharing ratio changes \u2014 requiring **Goodwill** adjustment and recalculation of capital.",
    keyElements: [
      "**Profit Sharing Ratio (PSR)** \u2014 Agreed ratio to divide net profits/losses",
      "**Capital Account** \u2014 Fixed or fluctuating, records each partner's investment",
      "**Current Account** \u2014 Used in fixed capital method for drawings, interest, salary",
      "**Interest on Capital** \u2014 Paid to partners at agreed rate (debit to P&L)",
      "**Partner's Salary/Commission** \u2014 Charged before profit distribution",
      "**Drawings** \u2014 Amount withdrawn by partner (debit to Capital/Current A/c)",
      "**Goodwill** \u2014 Invisible asset; adjusted when ratio changes or partner joins/leaves",
      "**Sacrifice Ratio** = Old Ratio \u2212 New Ratio | **Gaining Ratio** = New \u2212 Old",
    ],
    scenario: [
      "**Step 1 \u2014 Admission:** A & B share profits 3:2. C admitted for 1/5 share. Goodwill of firm = \u20b950,000. C brings \u20b910,000 cash for goodwill (his share = 1/5 \u00d7 50,000). Entry: *Cash A/c Dr \u20b910,000 | To Premium for Goodwill A/c \u20b910,000*",
      "**Step 2 \u2014 Distribution to Sacrificers:** Sacrifice Ratio of A & B = 3:2. Entry: *Premium for Goodwill A/c Dr \u20b910,000 | To A's Capital \u20b96,000 | To B's Capital \u20b94,000*",
      "**Step 3 \u2014 New Profit Sharing Ratio:** A's new share = 3/5 \u00d7 4/5 = 12/25 | B's = 8/25 | C's = 5/25. **New PSR = 12:8:5**. Verify: sum = 25/25 = 1. \u2705",
    ],
    comparison:
      "| Feature | **Fixed Capital Method** | **Fluctuating Capital Method** |\n|---|---|---|\n| Accounts | Capital + Current A/c | Only Capital A/c |\n| Capital balance | Remains constant | Changes every year |\n| Entries like salary | In Current A/c | In Capital A/c |\n| Clarity | Easier to track | Simpler to maintain |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** **SACRIFICE = Old \u2212 New** (old partners give up share). **GAIN = New \u2212 Old** (gaining partners get more). Common mistake: Forgetting to check if the question asks for **Gaining Ratio** or **Sacrifice Ratio** when a partner retires vs is admitted.",
    bengali:
      "\u0985\u0982\u09b6\u09c0\u09a6\u09be\u09b0\u09bf\u09a4\u09cd\u09ac \u09b9\u09b2\u09cb \u09a6\u09c1\u0987 \u09ac\u09be \u09a4\u09a4\u09cb\u09a7\u09bf\u0995 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09ac\u09cd\u09af\u09ac\u09b8\u09be\u09b0 \u09ae\u09c1\u09a8\u09be\u09ab\u09be \u09ad\u09be\u0997 \u0995\u09b0\u09be\u09b0 \u099a\u09c1\u0995\u09cd\u09a4\u09bf\u0964 Sacrifice = Old \u2212 New Ratio. Goodwill \u09b8\u09ae\u09a8\u09cd\u09ac\u09af\u09bc \u09b8\u09ac\u09b8\u09ae\u09af\u09bc \u09b8\u09be\u09a4\u09bf\u09ab\u09be\u0987\u09df\u09bf\u0982 \u09aa\u09be\u09b0\u09cd\u099f\u09a8\u09be\u09b0\u09a6\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09ac\u09a8\u09cd\u099f\u09a8 \u0995\u09b0\u09a4\u09c7 \u09b9\u09af\u09bc\u0964",
  });
}

function getCompanyLawGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Company Law \u2014 Directors`,
    quickAnswer:
      "A **Director** is a person duly appointed to direct and manage the affairs of a company. [Companies Act, 2013 \u2014 Section 2(34)]. They are agents, not owners, of the company.",
    breakdown:
      "The board of directors is the brain of a company. Shareholders own the company, but directors **run** it. This separation of ownership and management is the essence of corporate governance.\n\nThe 'Why': Companies need professional managers (directors) to make strategic and operational decisions, accountable to shareholders through annual general meetings.\n\nThe 'How': Directors are appointed at AGM, hold DIN numbers, and are bound by duties and disqualifications under the Companies Act 2013.",
    keyElements: [
      "**DIN** \u2014 Director Identification Number (mandatory for all directors)",
      "**Minimum Directors**: Private Co. = 2 | Public Co. = 3 | OPC = 1",
      "**Maximum Directors**: 15 (can be increased by Special Resolution)",
      "**Resident Director** \u2014 At least 1 director must stay in India \u2265182 days/year [Sec 149(3)]",
      "**Independent Director** \u2014 No material relationship with company [Sec 149]",
      "**Nominee Director** \u2014 Appointed by lender or shareholder",
      "**Disqualification [Sec 164]** \u2014 Conviction \u22656 months, non-filing 3 years, deposit defaults",
      "**Duties [Sec 166]** \u2014 Act in good faith, avoid conflict of interest, no secret profits",
    ],
    scenario: [
      "**Step 1 \u2014 Appointment:** ABC Ltd (Public Co.) holds AGM on 30 Sep. Resolution passed to appoint Mr. Sharma as Director. He must have a valid DIN and not be disqualified under Sec 164.",
      "**Step 2 \u2014 Powers:** Board passes resolution to borrow \u20b95 crores. Under Sec 179, Board can borrow but if amount exceeds paid-up capital + free reserves, shareholders' approval needed [Sec 180].",
      "**Step 3 \u2014 Vacation of Office:** If Mr. Sharma remains absent from all Board meetings for 12 months (without leave), his office becomes vacant automatically under Sec 167.",
    ],
    comparison:
      "| Feature | **Executive Director** | **Independent Director** |\n|---|---|---|\n| Day-to-day role | Yes | No |\n| Paid salary | Yes | Sitting fees only |\n| Relationship | Employed by company | Arms-length |\n| Tenure | As per contract | 2 consecutive terms of 5 years |\n| Purpose | Management | Governance / checks |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** **'2-3-1' Rule** \u2014 Private needs 2, Public needs 3, OPC needs 1 director. **Max = 15**. Common mistake: Confusing 'Independent Director' with 'Non-Executive Director' \u2014 they are NOT the same. An ID must have NO material relationship with the company.",
    bengali:
      "\u09aa\u09b0\u09bf\u099a\u09be\u09b2\u0995 \u0995\u09cb\u09ae\u09cd\u09aa\u09be\u09a8\u09bf\u09b0 \u09ac\u09cd\u09af\u09ac\u09b8\u09cd\u09a5\u09be\u09aa\u09a8\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09a6\u09be\u09af\u09bc\u09bf\u09a4\u09cd\u09ac\u09b6\u09c0\u09b2 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0964 Companies Act 2013, Sec 2(34) \u0985\u09a8\u09c1\u09af\u09be\u09af\u09bc\u09c0 \u09a8\u09bf\u09af\u09bc\u09cb\u0997, \u0995\u09cd\u09b7\u09ae\u09a4\u09be, \u09a6\u09be\u09af\u09bc\u09bf\u09a4\u09cd\u09ac \u0993 \u0985\u09af\u09cb\u0997\u09cd\u09af\u09a4\u09be \u09a8\u09bf\u09b0\u09cd\u09a7\u09be\u09b0\u09bf\u09a4\u0964 DIN \u09a8\u09ae\u09cd\u09ac\u09b0 \u09ac\u09be\u09a7\u09cd\u09af\u09a4\u09be\u09ae\u09c2\u09b2\u0995\u0964",
  });
}

function getAuditingGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Auditing \u2014 Nature & Objectives`,
    quickAnswer:
      "**Auditing** is an independent examination of financial information of any entity, whether profit-oriented or not, to express an opinion on the financial statements. [ICAI / SA 200]",
    breakdown:
      "Auditing is like a quality check on financial statements. A doctor diagnoses a patient; an auditor 'diagnoses' the health of a company's financials.\n\nThe 'Why': Stakeholders (investors, banks, government) cannot verify every transaction \u2014 they rely on the auditor's independent opinion for decision-making.\n\nThe 'How': Auditor collects **evidence** through inspection, observation, inquiry, and confirmation \u2192 forms an **opinion** \u2192 issues an **Audit Report**.",
    keyElements: [
      "**Auditor** \u2014 Qualified CA who conducts the audit",
      "**Auditee / Client** \u2014 The entity whose accounts are audited",
      "**Audit Evidence** \u2014 Information collected to support the audit opinion",
      "**True and Fair View** \u2014 Financial statements show the real financial position",
      "**Materiality** \u2014 Misstatements are material if they could influence decisions",
      "**Audit Risk** \u2014 Risk of wrong opinion [Inherent + Control + Detection Risk]",
      "**Audit Report** \u2014 Final document expressing auditor's opinion",
      "**Independence** \u2014 Auditor must be free from management influence",
    ],
    scenario: [
      "**Step 1 \u2014 Appointment:** XYZ Ltd appoints CA Neha as Statutory Auditor at AGM. She checks she has no financial relationship with XYZ (independence check) and accepts the engagement.",
      "**Step 2 \u2014 Audit Procedures:** CA Neha examines purchase invoices (inspection), sends confirmation letters to debtors (confirmation), observes physical stock count (observation), and inquires management about any litigation.",
      "**Step 3 \u2014 Audit Report:** After gathering sufficient evidence, CA Neha concludes accounts show True and Fair View \u2192 issues **Unqualified/Clean Report**. If material misstatement found \u2192 issues **Qualified Report** or **Adverse Opinion**.",
    ],
    comparison:
      "| Feature | **Internal Audit** | **Statutory/External Audit** |\n|---|---|---|\n| Appointed by | Management | Shareholders (AGM) |\n| Objective | Operational review | Financial statement opinion |\n| Independence | Less | High (legally required) |\n| Report to | Management | Shareholders / Regulator |\n| Mandatory | No (generally) | Yes (for companies) |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** Audit = **3 P's** \u2014 **P**revent fraud, **P**rotect assets, **P**rovide assurance. Common mistake: Confusing 'True and Fair' with 'True and Correct' \u2014 accounts need not be 100% precise, but must give a **fair** picture within acceptable accounting limits.",
    bengali:
      "\u0985\u09a1\u09bf\u099f\u09bf\u0982 \u09b9\u09b2\u09cb \u0986\u09b0\u09cd\u09a5\u09bf\u0995 \u09ac\u09bf\u09ac\u09b0\u09a3\u09c0\u09b0 \u09b8\u09cd\u09ac\u09be\u09a7\u09c0\u09a8 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09af\u09be \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c7 \u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f \u09b8\u09a4\u09cd\u09af \u0993 \u09a8\u09cd\u09af\u09be\u09af\u09bc\u09ad\u09be\u09ac\u09c7 \u0989\u09aa\u09b8\u09cd\u09a5\u09be\u09aa\u09bf\u09a4\u0964 Statutory Audit \u09b6\u09c7\u09af\u09bc\u09be\u09b0\u09b9\u09cb\u09b2\u09cd\u09a1\u09be\u09b0\u09a6\u09c7\u09b0 \u09b8\u09c1\u09b0\u0995\u09cd\u09b7\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09ac\u09be\u09a7\u09cd\u09af\u09a4\u09be\u09ae\u09c2\u09b2\u0995\u0964",
  });
}

function getContractActGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Indian Contract Act \u2014 Valid Contract`,
    quickAnswer:
      "A **Contract** is an agreement enforceable by law. For an agreement to be a valid contract, it must satisfy the essentials under **Section 10 of the Indian Contract Act, 1872**.",
    breakdown:
      "Not every agreement is a contract. A mother promising sweets to her child is an agreement \u2014 but not a contract (not legally enforceable). For legal enforceability, essential elements must be present.\n\nThe 'Why': Law cannot enforce every social/domestic agreement \u2014 only those made with free consent, lawful consideration, and competent parties qualify.\n\nThe 'How': Offer \u2192 Acceptance \u2192 Consideration \u2192 Capacity \u2192 Free Consent \u2192 Lawful Object \u2192 Certainty.",
    keyElements: [
      "**Offer (Proposal)** \u2014 Signifies willingness to do or abstain [Sec 2(a)]",
      "**Acceptance** \u2014 Absolute, unconditional acceptance of offer [Sec 2(b)]",
      "**Consideration** \u2014 'Something in return' \u2014 must be lawful [Sec 2(d)]",
      "**Capacity [Sec 11]** \u2014 Both parties must be major (18+), sane, not disqualified by law",
      "**Free Consent [Sec 14]** \u2014 No coercion, undue influence, fraud, misrepresentation, or mistake",
      "**Lawful Object [Sec 23]** \u2014 Purpose must not be illegal, immoral, or against public policy",
      "**Not Void** \u2014 Agreement must not be void under Sections 24\u201330",
      "**Certainty** \u2014 Terms must be clear and certain [Sec 29]",
    ],
    scenario: [
      "**Step 1 \u2014 Valid Contract:** Ram (25) offers to sell his bike to Shyam (30) for \u20b940,000. Shyam accepts. Both are majors, sane, free consent, lawful consideration and object. \u2705 Valid Contract \u2014 fully enforceable.",
      "**Step 2 \u2014 Void Contract:** Ram (25) offers to sell goods to Mohan (16, minor). Mohan accepts. Minor cannot enter a contract [Mohori Bibee v Dharmodas Ghose, 1903] \u2014 **Void ab initio** (void from the start).",
      "**Step 3 \u2014 Voidable Contract:** Priya forces Ravi to sign a sale deed under threat (coercion). Ravi's consent was NOT free. Contract is **Voidable at Ravi's option** \u2014 Ravi can repudiate it [Sec 19].",
    ],
    comparison:
      "| Feature | **Void Contract** | **Voidable Contract** | **Valid Contract** |\n|---|---|---|---|\n| Enforceability | Not enforceable | Enforceable until repudiated | Fully enforceable |\n| Status | Dead from start | Alive until avoided | Alive |\n| Example | Agreement with minor | Consent by coercion | Normal trade deal |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** **'OFCCLLN'** \u2014 **O**ffer, **F**ree Consent, **C**onsideration, **C**apacity, **L**awful Object, **L**egality, **N**ot Void. Common mistake: A contract with a **minor is void ab initio** \u2014 NOT voidable \u2014 even if the minor misrepresented his age.",
    bengali:
      "\u099a\u09c1\u0995\u09cd\u09a4\u09bf \u0986\u0987\u09a8 1872 \u0985\u09a8\u09c1\u09af\u09be\u09af\u09bc\u09c0 Offer, Acceptance, Consideration, Capacity, Free Consent, Lawful Object \u098f\u09ac\u0982 Certainty \u09aa\u09cd\u09b0\u09af\u09bc\u09cb\u099c\u09a8\u0964 \u0985\u09aa\u09cd\u09b0\u09be\u09aa\u09cd\u09a4\u09ac\u09af\u09bc\u09b8\u09cd\u0995\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u099a\u09c1\u0995\u09cd\u09a4\u09bf \u09b8\u09b0\u09cd\u09ac\u09a6\u09be Void ab initio\u0964",
  });
}

function getCapitalBudgetingGuide(subject: string, level: string): string {
  return buildStudyGuide({
    title: `CA ${caLevel(level)} | ${subject} | Capital Budgeting \u2014 NPV & IRR`,
    quickAnswer:
      "**Capital Budgeting** is the process of evaluating and selecting long-term investment proposals to maximise shareholders' wealth. **NPV** is the most preferred method as it considers time value of money.",
    breakdown:
      "Would you prefer \u20b91,00,000 today or \u20b91,00,000 after 5 years? Today \u2014 because money has **time value** (can be invested and earn returns). This is the foundation of Capital Budgeting.\n\nThe 'Why': Companies have limited funds and must choose which long-term projects to invest in to maximize returns.\n\nThe 'How': Estimate future cash flows \u2192 Discount them to present value \u2192 Compare PV of inflows with initial investment. If NPV > 0, accept the project.",
    keyElements: [
      "**Initial Investment** \u2014 Cash outflow at time zero (cost of project)",
      "**Cash Inflows** \u2014 Future benefits expected from the project each year",
      "**Discount Rate (WACC)** \u2014 Minimum required rate of return",
      "**NPV** = PV of Cash Inflows \u2212 Initial Investment",
      "**IRR** \u2014 Discount rate at which NPV = 0 (accept if IRR > Cost of Capital)",
      "**Payback Period** \u2014 Time to recover initial investment (ignores time value)",
      "**PI (Profitability Index)** = PV of Inflows / Initial Investment (accept if PI > 1)",
      "**ARR** = Average Net Income / Average Investment \u00d7 100",
    ],
    scenario: [
      "**Step 1 \u2014 Data:** Project Cost = \u20b91,00,000. Annual Cash Inflow = \u20b940,000 for 3 years. Discount Rate = 10%. PV Factors: Year 1 = 0.909, Year 2 = 0.826, Year 3 = 0.751.",
      "**Step 2 \u2014 NPV Calculation:** PV of inflows = (40,000\u00d70.909) + (40,000\u00d70.826) + (40,000\u00d70.751) = 36,360 + 33,040 + 30,040 = **\u20b999,440**. NPV = 99,440 \u2212 1,00,000 = **\u2212\u20b9560. Decision: REJECT** (NPV is negative).",
      "**Step 3 \u2014 Payback Period:** Cumulative cash: Year 1 = \u20b940,000 | Year 2 = \u20b980,000 | Year 3 = \u20b91,20,000. Payback = 2 years + (20,000/40,000)\u00d712 = **2 years 6 months**.",
    ],
    comparison:
      "| Feature | **NPV** | **IRR** | **Payback** |\n|---|---|---|---|\n| Time Value | Yes | Yes | No |\n| Decision rule | NPV > 0 | IRR > Cost of Capital | PP < Target period |\n| Unit | \u20b9 Absolute | % Rate | Years |\n| Best for | Mutually exclusive projects | Ranking | Liquidity check |",
    proTip:
      "\ud83e\udde0 **Memory Trick:** **NPV > 0 = Accept** (project adds value). Common mistake: Using the wrong PV factor year \u2014 ICAI tables give **end-of-year** PV factors. Always match year-end cash flows with correct discount factor row.",
    bengali:
      "Capital Budgeting \u09b9\u09b2\u09cb \u09a6\u09c0\u09b0\u09cd\u0998\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09c0 \u09ac\u09bf\u09a8\u09bf\u09af\u09bc\u09cb\u0997 \u09b8\u09bf\u09a6\u09cd\u09a7\u09be\u09a8\u09cd\u09a4 \u09aa\u09cd\u09b0\u0995\u09cd\u09b0\u09bf\u09af\u09bc\u09be\u0964 NPV > 0 \u09b9\u09b2\u09c7 \u09aa\u09cd\u09b0\u0995\u09b2\u09cd\u09aa \u0997\u09cd\u09b0\u09b9\u09a3\u09af\u09cb\u0997\u09cd\u09af\u0964 \u0985\u09b0\u09cd\u09a5\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc\u09ae\u09c2\u09b2\u09cd\u09af \u09ac\u09bf\u09ac\u09c7\u099a\u09a8\u09be \u0995\u09b0\u09c7 NPV \u09aa\u09a6\u09cd\u09a7\u09a4\u09bf \u09b8\u09b0\u09cd\u09ac\u09cb\u09a4\u09cd\u09a4\u09ae\u0964",
  });
}

function getMCQs(level: string, subject: string, chapter: string): string {
  const mcqs = [
    {
      q: "Which Accounting Standard deals with Disclosure of Accounting Policies?",
      opts: ["AS 2", "AS 1", "AS 5", "AS 9"],
      ans: "B",
      exp: "AS 1 deals with Disclosure of Accounting Policies. Three fundamental assumptions: Going Concern, Consistency, and Accrual.",
    },
    {
      q: "What is the ideal Current Ratio?",
      opts: ["1:1", "3:1", "2:1", "0.5:1"],
      ans: "C",
      exp: "Current Ratio of 2:1 is ideal \u2014 current assets are twice current liabilities, ensuring comfortable liquidity.",
    },
    {
      q: "Under GST, IGST is applicable on:",
      opts: ["Intra-state supply", "Inter-state supply", "Both", "Neither"],
      ans: "B",
      exp: "IGST applies to inter-state supplies. Intra-state supply attracts CGST + SGST. Remember: I in IGST = Interstate.",
    },
    {
      q: "NPV method is superior because it:",
      opts: [
        "Ignores time value of money",
        "Considers only initial investment",
        "Considers time value of money and all cash flows",
        "Is the simplest method",
      ],
      ans: "C",
      exp: "NPV considers ALL cash flows over the project life AND applies discounting (time value of money). It's the best capital budgeting method.",
    },
    {
      q: "Minimum directors in a Public Limited Company:",
      opts: ["1", "2", "3", "7"],
      ans: "C",
      exp: "Section 149, Companies Act 2013: Public = 3, Private = 2, OPC = 1. Remember: 3-2-1 rule.",
    },
    {
      q: "In Standard Costing, Material Price Variance formula:",
      opts: [
        "(SQ \u2212 AQ) \u00d7 SP",
        "(SP \u2212 AP) \u00d7 AQ",
        "(SQ \u2212 AQ) \u00d7 AP",
        "(SP \u2212 AP) \u00d7 SQ",
      ],
      ans: "B",
      exp: "MPV = (Standard Price \u2212 Actual Price) \u00d7 Actual Quantity. It isolates variance due to price change only.",
    },
    {
      q: "Section 80C deduction limit under Income Tax Act:",
      opts: [
        "\u20b91,00,000",
        "\u20b91,50,000",
        "\u20b92,00,000",
        "\u20b92,50,000",
      ],
      ans: "B",
      exp: "Section 80C: maximum deduction of \u20b91,50,000 for investments in LIC, PPF, ELSS, NSC, PF, etc.",
    },
    {
      q: "A Bill of Exchange is defined under:",
      opts: [
        "Indian Contract Act 1872, Sec 5",
        "Negotiable Instruments Act 1881, Sec 5",
        "Companies Act 2013, Sec 5",
        "Transfer of Property Act, Sec 5",
      ],
      ans: "B",
      exp: "Section 5 of NI Act 1881 defines a Bill of Exchange as an unconditional order in writing signed by the drawer.",
    },
    {
      q: "Agreement with a minor under Indian Contract Act is:",
      opts: ["Valid", "Voidable", "Void ab initio", "Illegal"],
      ans: "C",
      exp: "Contract with a minor is Void ab initio \u2014 void from the start, cannot be ratified even when minor becomes major. [Mohori Bibee v Dharmodas Ghose, 1903]",
    },
    {
      q: "Goodwill by Super Profit method:",
      opts: [
        "Average Profit \u00d7 Years",
        "Super Profit \u00d7 Years of Purchase",
        "Net Assets \u00d7 Rate",
        "Capital Employed \u00d7 Rate",
      ],
      ans: "B",
      exp: "Goodwill = Super Profit \u00d7 Number of Years' Purchase. Super Profit = Actual Avg Profit \u2212 Normal Profit.",
    },
  ];

  const selected = mcqs.sort(() => 0.5 - Math.random()).slice(0, 5);
  const formatted = selected
    .map(
      (m, i) =>
        `**Q${i + 1}:** ${m.q}\n- (A) ${m.opts[0]}\n- (B) ${m.opts[1]}\n- (C) ${m.opts[2]}\n- (D) ${m.opts[3]}\n\n\u2705 **Answer: (${m.ans})** \u2014 ${m.exp}`,
    )
    .join("\n\n---\n\n");

  return `## \ud83d\udcdd MCQ Practice Set \u2014 CA ${caLevel(level)} | ${subject} | ${chapter}\n\n---\n\n${formatted}\n\n---\n\n## \ud83d\udca1 Pro-Tip for MCQs\n\ud83e\udde0 **Strategy:** Eliminate obviously wrong options first. For numerical MCQs, work backwards from answer choices. Always look for ICAI-defined terms \u2014 they appear verbatim in options.`;
}

// ─── Main export ────────────────────────────────────────────────────────────

// NEW getGenericGuide - Topic-aware with real answers
function getTopicAnswer(
  subject: string,
  level: string,
  chapter: string,
  question: string,
  _qType: string,
): string | null {
  const q = `${question} ${chapter} ${subject}`.toLowerCase();
  const lvl = caLevel(level);

  // ── Accounting Equation ──
  if (q.includes("accounting equation") || q.includes("fundamental equation")) {
    return buildStudyGuide({
      title: `CA ${lvl} | Accounting Equation`,
      quickAnswer: `**Accounting Equation: Assets = Liabilities + Capital (Owner's Equity)**\n\nThis is the foundation of double-entry bookkeeping. Every financial transaction maintains this balance.`,
      breakdown:
        "The accounting equation shows that everything a business owns (Assets) is financed either by creditors (Liabilities) or by the owner (Capital).\n\n**Extended Form:** Assets = Liabilities + Capital + Revenue − Expenses\n\nEvery debit must have a corresponding credit — this is why the equation always balances.",
      keyElements: [
        "**Assets** — Resources owned by the business (Cash, Stock, Buildings, Debtors)",
        "**Liabilities** — Amounts owed to outsiders (Creditors, Bank Loan, Bank Overdraft)",
        "**Capital** — Owner's investment = Assets − Liabilities",
        "**Revenue** — Income earned increases Capital",
        "**Expenses** — Costs incurred decrease Capital",
      ],
      scenario: [
        "**Example 1:** Started business with ₹1,00,000 cash → Assets (Cash ₹1,00,000) = Capital ₹1,00,000 ✓",
        "**Example 2:** Bought goods on credit ₹20,000 → Assets (Stock +₹20,000) = Liabilities (Creditors +₹20,000) ✓",
        "**Example 3:** Paid rent ₹5,000 → Assets (Cash −₹5,000), Capital −₹5,000 (expense reduces capital) ✓",
      ],
      proTip:
        "🧠 **Trick:** A = L + C. If Assets go up, either Liability or Capital must go up by the same amount. This is your verification tool for every transaction.",
      bengali:
        "হিসাবের মূল সমীকরণ: সম্পদ = দায় + মালিকানা পুঁজি। প্রতিটি লেনদেনে এই সমীকরণ সবসময় সমান থাকে। সম্পদ বাড়লে দায় বা পুঁজিও বাড়ে।",
    });
  }

  // ── Journal Entry ──
  if (
    q.includes("journal") &&
    (q.includes("entry") ||
      q.includes("entries") ||
      q.includes("what is") ||
      q.includes("define") ||
      q.includes("meaning"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Journal Entry`,
      quickAnswer:
        "A **Journal** is the book of original/prime entry where all business transactions are first recorded in chronological order in debit-credit format.",
      breakdown: `The word "Journal" comes from the French word "Jour" meaning "Day". It is called the **Book of Original Entry** because every transaction is first entered here before being posted to ledger accounts.\n\n**Format of Journal Entry:**\n| Date | Particulars | L.F. | Debit (₹) | Credit (₹) |\n|---|---|---|---|---|\n| | Account to be Debited Dr. | | Amount | |\n| | To Account to be Credited | | | Amount |\n| | *(Narration)* | | | |`,
      keyElements: [
        "**Date** — Date of transaction",
        "**Particulars** — Names of accounts debited and credited",
        "**L.F. (Ledger Folio)** — Page number in ledger where posted",
        "**Debit Amount** — Amount debited",
        "**Credit Amount** — Amount credited (must equal debit)",
        "**Narration** — Brief explanation of the transaction in brackets",
      ],
      scenario: [
        "**Transaction:** Purchased goods for cash ₹10,000\n→ **Purchases A/c Dr. ₹10,000** / To Cash A/c ₹10,000\n*(Narration: Being goods purchased for cash)*",
        "**Transaction:** Received ₹5,000 from Ramesh (debtor)\n→ **Cash A/c Dr. ₹5,000** / To Ramesh A/c ₹5,000\n*(Narration: Being cash received from Ramesh)*",
        "**Transaction:** Paid salary ₹15,000\n→ **Salary A/c Dr. ₹15,000** / To Cash A/c ₹15,000\n*(Narration: Being salary paid to employees)*",
      ],
      proTip:
        "🧠 **Golden Rules:** Real A/c — Debit what comes in, Credit what goes out. Personal A/c — Debit the receiver, Credit the giver. Nominal A/c — Debit all expenses/losses, Credit all incomes/gains.",
      bengali:
        "জার্নাল হলো মূল হিসাবের বই যেখানে প্রতিটি লেনদেন প্রথমে ডেবিট-ক্রেডিট আকারে লেখা হয়। সোনালী নিয়ম: বাস্তব হিসাব — যা আসে তা ডেবিট, যা যায় তা ক্রেডিট। ব্যক্তিগত হিসাব — গ্রহণকারী ডেবিট, দাতা ক্রেডিট। নামিক হিসাব — সকল খরচ ডেবিট, সকল আয় ক্রেডিট।",
    });
  }

  // ── Ledger ──
  if (
    q.includes("ledger") &&
    (q.includes("what") ||
      q.includes("define") ||
      q.includes("meaning") ||
      q.includes("prepare") ||
      q.includes("format"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Ledger Account`,
      quickAnswer:
        "A **Ledger** is the principal/main book of accounts (Book of Final Entry) where all journal entries are classified and posted under separate account heads in **T-format**.",
      breakdown:
        "After journal, every transaction is posted to the ledger in a **T-account** format with Dr. side (left) and Cr. side (right).\n\n**Ledger Format (T-Account):**\n```\nDr.          [Account Name]          Cr.\nDate | Particulars | ₹  | Date | Particulars | ₹\n```\n\n**Balancing the Ledger:** At end of period, find the difference between Dr. total and Cr. total. The difference is the **closing balance** — if Dr. > Cr., balance is Dr. (Asset/Expense). If Cr. > Dr., balance is Cr. (Liability/Income).",
      keyElements: [
        "**Dr. Side (Left)** — Debit entries posted here",
        "**Cr. Side (Right)** — Credit entries posted here",
        "**Balance c/d** — Closing balance carried down",
        "**Balance b/d** — Opening balance brought down to next period",
        "**Debit Balance** — Assets and Expenses show Dr. balance",
        "**Credit Balance** — Liabilities, Capital, and Incomes show Cr. balance",
      ],
      scenario: [
        "**Step 1:** Post all journal debits to the Dr. side of the relevant account, and all credits to the Cr. side.",
        "**Step 2:** Total both sides. The larger side total is written on both sides. The difference is written on the smaller side as 'Balance c/d'.",
        "**Step 3:** At the start of next period, write 'Balance b/d' on the opposite side (Dr. balance → start on Dr. side as opening).",
      ],
      proTip:
        "🧠 **Memory:** Journal = Day Book (chronological order). Ledger = Class Register (sorted by account name). Ledger is called 'King of all Books' — the final destination of all entries.",
      bengali:
        "লেজার হলো প্রধান হিসাবের বই যেখানে জার্নাল থেকে সকল এন্ট্রি T-আকারে স্থানান্তরিত হয়। বাম দিক ডেবিট, ডান দিক ক্রেডিট। শেষে দুই দিকের পার্থক্য হলো ব্যালেন্স। সম্পদ ও খরচ — ডেবিট ব্যালেন্স; দায়, পুঁজি ও আয় — ক্রেডিট ব্যালেন্স।",
    });
  }

  // ── Trial Balance ──
  if (q.includes("trial balance")) {
    return buildStudyGuide({
      title: `CA ${lvl} | Trial Balance`,
      quickAnswer:
        "A **Trial Balance** is a statement prepared at the end of an accounting period listing all ledger account balances to verify that total Debits = total Credits, confirming arithmetical accuracy.",
      breakdown:
        "Trial Balance is prepared **after** all ledger accounts are balanced. It has two columns — Debit Balances and Credit Balances. If they agree, it confirms no arithmetic errors (but does NOT guarantee the books are completely correct).\n\n**Errors not revealed by Trial Balance:** Error of omission, Error of commission, Compensating errors, Error of principle.",
      keyElements: [
        "**Debit Balances** — Assets (Cash, Stock, Debtors, Fixed Assets), Expenses, Purchases, Drawings",
        "**Credit Balances** — Liabilities (Creditors, Loans), Capital, Sales, Income",
        "**Errors Revealed** — Wrong totals, posting wrong amount, posting to wrong side",
        "**Errors NOT Revealed** — Complete omission, wrong account (same side), compensating errors",
        "**Purpose** — Arithmetical accuracy check; basis for preparing final accounts",
      ],
      scenario: [
        "**Step 1:** Extract closing balance of every ledger account.",
        "**Step 2:** Assets/Expenses/Purchases/Drawings → Debit column. Liabilities/Capital/Sales/Income → Credit column.",
        "**Step 3:** Total both columns. Debit total must = Credit total. If not, there is an arithmetic error.",
      ],
      comparison:
        "| Feature | Trial Balance | Balance Sheet |\n|---|---|---|\n| Purpose | Check arithmetic accuracy | Show financial position |\n| Contains | All account balances | Only real accounts (assets/liabilities) |\n| Prepared | Before final accounts | After P&L |\n| Format | Two-column list | Assets = Liabilities + Capital |",
      proTip:
        "🧠 **Rule:** ALL accounts with a Debit balance → Debit column. ALL accounts with a Credit balance → Credit column. **Common Mistake:** Students often put expense accounts in Credit — remember Expenses are always Debit balance.",
      bengali:
        "ট্রায়াল ব্যালেন্স হলো একটি বিবৃতি যেখানে সকল লেজার অ্যাকাউন্টের ব্যালেন্স তালিকাভুক্ত করা হয়। ডেবিট মোট = ক্রেডিট মোট হলে গাণিতিক নির্ভুলতা নিশ্চিত। সম্পদ, খরচ → ডেবিট কলাম। দায়, পুঁজি, আয় → ক্রেডিট কলাম।",
    });
  }

  // ── Rectification of Errors ──
  if (
    q.includes("rectif") ||
    q.includes("suspense") ||
    (q.includes("error") && q.includes("correct"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Rectification of Errors`,
      quickAnswer:
        "**Rectification of Errors** means correcting mistakes found in books of accounts by passing correcting journal entries. Errors that create a Trial Balance difference are corrected via a **Suspense Account**.",
      breakdown: `**Types of Errors:**\n1. **Error of Omission** — Transaction completely omitted\n2. **Error of Commission** — Posted to wrong account (same type)\n3. **Error of Principle** — Posted to wrong type of account (e.g., asset treated as expense)\n4. **Compensating Error** — Two errors cancel each other out\n5. **Error of Original Entry** — Wrong amount in original entry\n\n**Suspense Account** is opened temporarily when Trial Balance doesn't agree. When all errors are found and corrected, Suspense Account balance becomes NIL.`,
      keyElements: [
        "**One-Sided Error** — Only one account affected → affects Trial Balance → use Suspense A/c",
        "**Two-Sided Error** — Both sides affected equally → does NOT affect Trial Balance",
        "**Suspense A/c** — Temporary account to make Trial Balance agree while searching for errors",
        "**Before Preparation of Final Accounts** — Pass correcting entry directly",
        "**After Preparation** — Pass rectifying entry through Profit & Loss Adjustment A/c",
      ],
      scenario: [
        "**Error:** Sales ₹5,000 not posted to Sales A/c (omission on Cr. side) → Trial Balance Dr. > Cr. by ₹5,000 → Open Suspense A/c Cr. ₹5,000",
        "**Rectification:** Sales A/c Dr. ₹5,000 / To Suspense A/c ₹5,000 — now Sales A/c is correctly credited and Suspense A/c is cleared.",
        "**Error of Principle:** Furniture purchased ₹10,000 debited to Purchases A/c → Rectify: Furniture A/c Dr. ₹10,000 / To Purchases A/c ₹10,000",
      ],
      proTip:
        "🧠 **Shortcut:** To rectify — first REVERSE the wrong entry, then pass the CORRECT entry. Or combine both steps in one rectification entry. For one-sided errors, always check if Suspense A/c Dr. or Cr. balance tells you which side is short.",
      bengali:
        "ভুল সংশোধন মানে হিসাবের ভুলগুলো সংশোধনী জার্নাল এন্ট্রির মাধ্যমে ঠিক করা। এক-পার্শ্বীয় ভুলের জন্য সাসপেন্স অ্যাকাউন্ট ব্যবহার করা হয়। ভুলের ধরন: বাদ পড়া, ভুল অ্যাকাউন্টে, ভুল নীতিতে, পূরকমূলক, এবং মূল এন্ট্রিতে ভুল।",
    });
  }

  // ── Bank Reconciliation ──
  if (
    q.includes("bank reconciliation") ||
    q.includes("brs") ||
    q.includes("pass book") ||
    (q.includes("bank") && q.includes("cash book"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Bank Reconciliation Statement (BRS)`,
      quickAnswer:
        "A **Bank Reconciliation Statement (BRS)** is a statement prepared to reconcile the difference between the **Cash Book balance** and the **Pass Book (Bank Statement) balance** on a given date.",
      breakdown:
        "Differences arise due to **timing differences** — transactions recorded in Cash Book but not yet in Pass Book, or vice versa.\n\n**Common Reasons for Difference:**\n- Cheques issued but not yet presented for payment\n- Cheques deposited but not yet cleared\n- Bank charges/interest directly debited by bank (not in Cash Book)\n- Direct credits by bank (dividends, interest received)\n- Errors in Cash Book or Pass Book",
      keyElements: [
        "**Unpresented Cheques** — Issued by us, not yet cleared by bank → In CB but not PB",
        "**Uncollected Cheques** — Deposited by us, not yet cleared → In CB but not PB",
        "**Bank Charges** — Debited by bank directly → In PB but not CB",
        "**Direct Deposits** — Credits received directly by bank → In PB but not CB",
        "**Dishonoured Cheques** — Returned unpaid → reduces PB but not updated in CB",
      ],
      scenario: [
        "**Start:** Cash Book balance ₹10,000 (Dr.) | Pass Book balance ₹8,000 (Cr.)",
        "**Reason:** Cheque of ₹2,000 issued but not yet presented → CB shows payment, PB doesn't yet.",
        "**BRS:** Start with CB balance ₹10,000, Deduct unpresented cheques ₹2,000 = Pass Book balance ₹8,000 ✓",
      ],
      proTip:
        "🧠 **Key Rule:** CB Dr. balance = Favourable (money in bank). PB Cr. balance = Favourable. Start BRS from either side and adjust systematically. Unpresented cheques: +to PB side, Uncollected deposits: −from PB side.",
      bengali:
        "ব্যাংক পুনর্মিলন বিবৃতি (BRS) হলো নগদ বই ও পাস বইয়ের ব্যালেন্সের পার্থক্য মিলিয়ে দেখার একটি বিবৃতি। পার্থক্যের কারণ: উপস্থাপিত না হওয়া চেক, পরিষ্কার না হওয়া আমানত, ব্যাংক চার্জ ও সরাসরি ক্রেডিট।",
    });
  }

  // ── Capital vs Revenue ──
  if (
    q.includes("capital") &&
    q.includes("revenue") &&
    (q.includes("expenditure") ||
      q.includes("receipt") ||
      q.includes("distinction") ||
      q.includes("difference"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Capital vs Revenue`,
      quickAnswer:
        "**Capital Expenditure** provides benefit for more than one accounting year (creates an Asset). **Revenue Expenditure** provides benefit within the current accounting year only (treated as Expense in P&L).",
      breakdown:
        "This distinction is critical because:\n- Capital Expenditure → shown in **Balance Sheet** as Asset\n- Revenue Expenditure → shown in **P&L Account** as Expense\n\nWrong classification = wrong profit figure = wrong tax.\n\n**Capital Receipt** — received for permanent capital (share issue, loan) → not shown in P&L. **Revenue Receipt** — earned in normal business (sales, rent received) → shown in P&L.",
      keyElements: [
        "**Capital Expenditure** — Buying assets (machinery, building, furniture), heavy installation charges, cost of acquisition",
        "**Revenue Expenditure** — Day-to-day expenses (salary, rent, repairs, electricity, stationery)",
        "**Deferred Revenue Expenditure** — Heavy expenditure with multi-year benefit but not an asset (heavy advertising) → written off gradually",
        "**Capital Receipt** — Sale of asset, issue of shares/debentures, loans received",
        "**Revenue Receipt** — Sales proceeds, interest received, rent received, commission earned",
      ],
      scenario: [
        "**Capital:** Purchased machinery ₹5,00,000 + Installation charges ₹50,000 → Total Capital Expenditure = ₹5,50,000 (debited to Machinery A/c)",
        "**Revenue:** Spent ₹10,000 on repairing the same machinery → Revenue Expenditure (Repairs A/c Dr.) → P&L Account",
        "**Mixed:** Heavy advertisement ₹90,000 for 3 years → Deferred Revenue: ₹30,000 per year to P&L, ₹60,000 carried forward in Balance Sheet",
      ],
      comparison:
        "| Feature | Capital Expenditure | Revenue Expenditure |\n|---|---|---|\n| Benefit | More than 1 year | Within 1 year |\n| Effect | Creates/improves asset | Maintains asset/day-to-day |\n| Shown in | Balance Sheet | P&L Account |\n| Example | Purchase of machine | Repairs of machine |",
      proTip:
        "🧠 **Rule of Thumb:** If the expense CREATES or IMPROVES an asset → Capital. If it MAINTAINS or is for day-to-day operations → Revenue. Error of Principle = treating Capital as Revenue or vice versa.",
      bengali:
        "মূলধনী ব্যয় একাধিক বছরের সুবিধা দেয় (সম্পদ তৈরি করে) — ব্যালেন্স শিটে দেখানো হয়। রাজস্ব ব্যয় শুধু চলতি বছরের — লাভ-ক্ষতি হিসাবে দেখানো হয়। সঠিক শ্রেণীবিভাগ সঠিক মুনাফা হিসাবের জন্য অত্যন্ত গুরুত্বপূর্ণ।",
    });
  }

  // ── Final Accounts / Financial Statements ──
  if (
    q.includes("final account") ||
    q.includes("trading account") ||
    q.includes("profit and loss") ||
    q.includes("p&l") ||
    q.includes("income statement")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Final Accounts (Financial Statements)`,
      quickAnswer:
        "**Final Accounts** consist of: (1) **Trading Account** — shows Gross Profit/Loss, (2) **Profit & Loss Account** — shows Net Profit/Loss, (3) **Balance Sheet** — shows financial position (Assets = Liabilities + Capital).",
      breakdown: `**Trading Account:** Records direct income (Sales) and direct expenses (Purchases, Carriage Inwards, Wages). Result = Gross Profit (Cr. side) or Gross Loss (Dr. side).\n\n**P&L Account:** Takes Gross Profit + indirect incomes, deducts indirect expenses. Result = Net Profit (Cr.) or Net Loss (Dr.).\n\n**Balance Sheet:** Snapshot of financial position on a specific date. Not an account — it's a statement. Assets side = Liabilities + Capital side (always balances).`,
      keyElements: [
        "**Gross Profit** = Net Sales − Cost of Goods Sold (Opening Stock + Purchases + Direct Expenses − Closing Stock)",
        "**Net Profit** = Gross Profit + Other Income − Indirect Expenses",
        "**Cost of Goods Sold** = Opening Stock + Purchases + Direct Expenses − Closing Stock",
        "**Current Assets** — Cash, Debtors, Stock, Prepaid expenses (liquid within 1 year)",
        "**Fixed Assets** — Machinery, Buildings, Furniture (long-term use)",
        "**Current Liabilities** — Creditors, Outstanding expenses, Bank Overdraft",
        "**Capital** = Opening Capital + Net Profit + Additional Capital − Drawings",
      ],
      scenario: [
        "**Trading A/c:** Sales ₹5,00,000 | Purchases ₹3,00,000 | Wages ₹50,000 | Closing Stock ₹80,000 → COGS = 3,00,000 + 50,000 − 80,000 = ₹2,70,000 | Gross Profit = 5,00,000 − 2,70,000 = **₹2,30,000**",
        "**P&L A/c:** Gross Profit ₹2,30,000 − Rent ₹30,000 − Salary ₹50,000 − Depreciation ₹20,000 = **Net Profit ₹1,30,000**",
        "**Balance Sheet:** Capital ₹4,00,000 + Net Profit ₹1,30,000 − Drawings ₹20,000 = ₹5,10,000 = Total Assets ₹5,10,000 ✓",
      ],
      proTip:
        "🧠 **Sequence:** Trial Balance → Trading Account (Gross Profit) → P&L Account (Net Profit) → Balance Sheet. Closing Stock always appears BOTH in Trading Account (Cr.) AND Balance Sheet (Asset). Never in P&L!",
      bengali:
        "চূড়ান্ত হিসাব = ট্রেডিং অ্যাকাউন্ট (স্থূল মুনাফা) + লাভ-ক্ষতি হিসাব (নিট মুনাফা) + ব্যালেন্স শিট (আর্থিক অবস্থান)। স্থূল মুনাফা = বিক্রয় − বিক্রিত পণ্যের মূল্য। নিট মুনাফা = স্থূল মুনাফা + পরোক্ষ আয় − পরোক্ষ খরচ।",
    });
  }

  // ── Inventory / Stock Valuation ──
  if (
    q.includes("inventory") ||
    q.includes("stock valuation") ||
    q.includes("fifo") ||
    q.includes("lifo") ||
    q.includes("weighted average") ||
    q.includes("closing stock")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Inventory / Stock Valuation`,
      quickAnswer:
        "**Inventory** is valued at **lower of Cost or Net Realisable Value (NRV)** as per **AS-2**. Common methods: FIFO (First In First Out), Weighted Average Cost (WAC). LIFO is not permitted under AS-2.",
      breakdown:
        "**Why value inventory?** Closing stock directly affects Gross Profit: Higher closing stock = Higher Gross Profit. Wrong valuation = manipulated profits.\n\n**AS-2 Rule:** Value at lower of Cost or NRV. Cost includes purchase price + direct costs. NRV = Estimated selling price − estimated costs to complete and sell.\n\n**Methods:**\n- **FIFO** — First batch purchased is first issued. Closing stock = most recent prices.\n- **Weighted Average** — Average cost of all units available. One average price for all issues.",
      keyElements: [
        "**FIFO** — Oldest stock issued first. Closing stock at latest prices. Good for non-perishables.",
        "**Weighted Average Cost (WAC)** — Average of all available units. Smooth pricing.",
        "**NRV (Net Realisable Value)** — Expected selling price minus selling costs",
        "**Lower of Cost or NRV** — Prudence concept (don't anticipate profits, but provide for losses)",
        "**AS-2** — Accounting Standard governing inventory valuation in India",
      ],
      scenario: [
        "**FIFO Example:** Opening 100 units @ ₹10, Purchased 200 units @ ₹12. Issued 150 units. → FIFO Issues: 100 @ ₹10 = ₹1,000 + 50 @ ₹12 = ₹600 = Total ₹1,600. Closing: 150 units @ ₹12 = ₹1,800.",
        "**WAC Example:** Available = 300 units worth ₹10+₹12 avg. WAC = (100×10 + 200×12)/300 = ₹3,400/300 = ₹11.33/unit. Issues 150 × ₹11.33 = ₹1,700.",
        "**AS-2 Application:** Cost ₹500, NRV ₹450 → Value at ₹450 (lower). Cost ₹500, NRV ₹600 → Value at ₹500 (lower = cost).",
      ],
      proTip:
        "🧠 **FIFO vs WAC:** FIFO gives higher closing stock (recent prices) in rising prices → higher profit. WAC smoothens fluctuations. AS-2 bans LIFO. Exam often asks: 'Calculate value of closing stock using FIFO/WAC and journal entry for closing stock.'",
      bengali:
        "স্টক মূল্যায়ন: AS-2 অনুযায়ী মূল্য বা NRV এর মধ্যে যেটি কম সেটিতে। FIFO — প্রথমে কেনা প্রথমে বিক্রি। ভারাক্রান্ত গড় — সমস্ত উপলব্ধ একক এর গড় মূল্য। AS-2 তে LIFO নিষিদ্ধ।",
    });
  }

  // ── Consignment ──
  if (q.includes("consignment")) {
    return buildStudyGuide({
      title: `CA ${lvl} | Consignment Accounts`,
      quickAnswer:
        "**Consignment** is a business arrangement where the **Consignor** sends goods to the **Consignee** to sell on their behalf. The Consignee sells the goods and remits proceeds (less commission) to the Consignor. Ownership remains with Consignor until sale.",
      breakdown: `**Key Feature:** Consignee is only an agent — NOT a buyer. They do not own the goods. They earn **commission** (del credere or ordinary) for selling.\n\n**Consignor's Books:** Open **Consignment A/c** (like a trading account for consignment). Consignee's Books: Open **Consignor's Personal A/c** — simple personal account.\n\n**Del Credere Commission** — Extra commission paid to consignee if they guarantee payment from customers (consignee bears bad debt risk).`,
      keyElements: [
        "**Consignor** — Sends goods, remains owner until sold",
        "**Consignee** — Sells goods as agent, earns commission, never owns goods",
        "**Proforma Invoice** — Document sent with goods (at cost or cost + profit)",
        "**Account Sales** — Statement sent by Consignee showing sales, expenses, commission, and net remittance",
        "**Del Credere Commission** — Higher commission for guaranteeing debts",
        "**Abnormal Loss** — Loss due to negligence (Consignee's fault) — excluded from consignment value",
        "**Normal Loss** — Unavoidable loss (evaporation etc.) — absorbed in remaining stock cost",
      ],
      scenario: [
        "**Step 1:** Consignor sends 100 units @ ₹100 each. Consignment A/c Dr. ₹10,000 / To Goods Sent on Consignment A/c ₹10,000",
        "**Step 2:** Consignee sells 80 units @ ₹150 = ₹12,000. Charges expenses ₹500 + commission 10% = ₹1,200. Remits ₹10,300.",
        "**Step 3:** Consignor's Profit = Sales ₹12,000 − Cost ₹8,000 − Expenses ₹500 − Commission ₹1,200 = **₹2,300**. Unsold stock 20 units valued at cost = ₹2,000.",
      ],
      proTip:
        "🧠 **Critical:** Consignment ≠ Sale. No sale entry when goods are sent on consignment. Profit on consignment = Credit side of Consignment A/c − Debit side. Closing stock in consignment = proportionate cost + proportionate non-recurring expenses.",
      bengali:
        "কনসাইনমেন্ট হলো এমন ব্যবস্থা যেখানে কনসাইনর পণ্য পাঠায় এবং কনসাইনি এজেন্ট হিসেবে বিক্রি করে কমিশন পায়। মালিকানা বিক্রয় পর্যন্ত কনসাইনরের কাছে থাকে। বিক্রয় না হলে পণ্য কনসাইনরের স্টক হিসেবে গণ্য।",
    });
  }

  // ── Shares and Share Capital (Company Accounts) ──
  if (
    q.includes("share") &&
    (q.includes("capital") ||
      q.includes("allotment") ||
      q.includes("forfeiture") ||
      q.includes("reissue") ||
      q.includes("issue"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Share Capital & Issue of Shares`,
      quickAnswer:
        "**Share Capital** is the amount of capital raised by a company by issuing shares. Shares can be issued at **Par** (face value), **Premium** (above FV), or **Discount** (below FV — rarely allowed). Share premium is credited to **Securities Premium Reserve A/c**.",
      breakdown:
        "**Types of Capital:**\n- **Authorised Capital** — Maximum capital as per Memorandum\n- **Issued Capital** — Part of authorised offered to public\n- **Subscribed Capital** — Part of issued actually applied for\n- **Called-up Capital** — Part of subscribed amount called\n- **Paid-up Capital** — Actually paid by shareholders\n\n**Issue Process:** Application → Allotment → First Call → Second Call → Final Call",
      keyElements: [
        "**Equity Shares** — Ordinary shares with voting rights and variable dividend",
        "**Preference Shares** — Fixed dividend, priority on winding up, usually no voting rights",
        "**Securities Premium** — Excess over face value → credited to Securities Premium Reserve A/c",
        "**Calls in Arrears** — Amount called but not paid by shareholders → deducted from paid-up capital",
        "**Calls in Advance** — Amount paid before called → credited to Calls in Advance A/c",
        "**Forfeiture** — Cancellation of shares for non-payment → credited to Share Forfeiture A/c",
        "**Reissue** — Forfeited shares reissued; profit on reissue → Capital Reserve",
      ],
      scenario: [
        "**Issue at Par:** 1,000 shares of ₹10 each, fully paid. Application Dr. ₹10,000 / Share Capital Cr. ₹10,000",
        "**Issue at Premium:** 1,000 shares ₹10 + ₹2 premium. Share Capital Cr. ₹10,000 + Securities Premium Cr. ₹2,000 = Total ₹12,000",
        "**Forfeiture:** Shareholder fails to pay Call ₹3/share on 100 shares → Share Capital Dr. ₹1,000 / Calls in Arrears Dr. ₹300 / Share Forfeiture Cr. ₹700 (amount paid up to allotment)",
      ],
      proTip:
        "🧠 **Forfeiture Journal:** Share Capital A/c Dr. (total called amount) / To Calls in Arrears (unpaid) / To Share Forfeiture (balance = amount already received). On Reissue: Share Forfeiture Dr. / To Share Capital / To Securities Premium (if any). Profit on reissue → Capital Reserve (not Revenue).",
      bengali:
        "শেয়ার মূলধন হলো শেয়ার ইস্যুর মাধ্যমে সংগৃহীত পুঁজি। সাধারণ শেয়ার (সমান মূল্যে), প্রিমিয়ামে বা ছাড়ে ইস্যু হতে পারে। প্রিমিয়াম → সিকিউরিটিজ প্রিমিয়াম রিজার্ভ অ্যাকাউন্টে। বাজেয়াপ্তকরণ ও পুনরায় ইস্যু গুরুত্বপূর্ণ পরীক্ষার বিষয়।",
    });
  }

  // ── Debentures ──
  if (q.includes("debenture")) {
    return buildStudyGuide({
      title: `CA ${lvl} | Debentures`,
      quickAnswer:
        "A **Debenture** is a long-term debt instrument (loan) issued by a company acknowledging its debt. Debenture holders are **creditors** (not owners), earn **fixed interest**, and get priority in repayment over shareholders.",
      breakdown:
        "**Debenture vs Share:**\n- Debenture = Debt (loan). Share = Equity (ownership).\n- Debentures earn fixed interest (charged to P&L). Shares earn dividend (from profit).\n- On winding up, debentures paid before shares.\n\n**Issue Methods:** At Par / Premium / Discount.\n**Redemption:** At Par / Premium (premium on redemption = expense, provided in advance via DRR).",
      keyElements: [
        "**Debenture Holder** — Creditor of company, entitled to fixed interest",
        "**Debenture Redemption Reserve (DRR)** — Mandatory reserve (as per Companies Act) for redemption",
        "**Interest on Debentures** — Fixed rate, charged to P&L (tax deductible)",
        "**Convertible Debentures** — Can be converted to equity shares",
        "**Secured Debentures** — Backed by specific assets (mortgage debentures)",
        "**Issue at Discount** — Discount = expense written off over life of debenture",
      ],
      scenario: [
        "**Issue at Par:** 1,000 12% Debentures @ ₹100. Bank Dr. ₹1,00,000 / 12% Debentures A/c Cr. ₹1,00,000",
        "**Interest Entry:** Interest on Debentures Dr. ₹12,000 / To Debenture Holders A/c ₹12,000 (and TDS deducted if applicable)",
        "**Redemption at Premium 10%:** Debentures Dr. ₹1,00,000 + Premium on Redemption Dr. ₹10,000 / To Debenture Holders A/c ₹1,10,000",
      ],
      proTip:
        "🧠 **Key:** Interest on debentures is an expense (P&L debit), while dividend on shares is an appropriation of profit. DRR must be created before redemption. Discount on issue of debentures = Fictitious Asset (written off over years).",
      bengali:
        "ডিবেঞ্চার হলো কোম্পানির দীর্ঘমেয়াদী ঋণপত্র। ডিবেঞ্চার হোল্ডার ঋণদাতা, মালিক নয়। নির্ধারিত সুদ পান। শেয়ারের তুলনায় বেশি নিরাপদ। ডিবেঞ্চার রিডেম্পশন রিজার্ভ (DRR) আবশ্যক।",
    });
  }

  // ── Cash Flow Statement ──
  if (
    q.includes("cash flow") ||
    q.includes("fund flow") ||
    q.includes("as-3") ||
    q.includes("as 3")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Cash Flow Statement (AS-3)`,
      quickAnswer:
        "A **Cash Flow Statement** (as per **AS-3**) shows inflows and outflows of cash and cash equivalents during an accounting period under three activities: **Operating, Investing, and Financing**.",
      breakdown:
        "**Why Cash Flow?** Profit ≠ Cash. A company can be profitable but have no cash (accrual accounting). Cash Flow Statement bridges this gap.\n\n**Methods:**\n- **Direct Method** — List actual cash receipts and payments\n- **Indirect Method** — Start with Net Profit, adjust for non-cash items and working capital changes\n\n**Cash Equivalents** = Short-term, highly liquid investments (≤3 months maturity).",
      keyElements: [
        "**Operating Activities** — Core business (cash sales, cash purchases, salaries paid, taxes paid)",
        "**Investing Activities** — Long-term assets (purchase/sale of fixed assets, investments)",
        "**Financing Activities** — Funding (issue of shares, debentures, repayment of loans, dividend paid)",
        "**Non-Cash Items (added back to profit)** — Depreciation, Amortisation, Loss on sale of assets",
        "**Working Capital Changes** — Increase in current assets = cash outflow; Increase in current liabilities = cash inflow",
      ],
      scenario: [
        "**Indirect Method Step 1:** Net Profit ₹50,000 + Depreciation ₹10,000 − Increase in Debtors ₹5,000 + Increase in Creditors ₹3,000 = Operating Cash Flow ₹58,000",
        "**Investing:** Purchased Machinery ₹1,00,000 (outflow), Sold investments ₹20,000 (inflow) = Net Investing CF = −₹80,000",
        "**Financing:** Issued shares ₹2,00,000 (inflow), Repaid loan ₹50,000 (outflow), Dividend paid ₹15,000 (outflow) = Net Financing CF = +₹1,35,000",
      ],
      proTip:
        "🧠 **Memory:** OIFA — Operating (day-to-day), Investing (buy/sell assets), Financing (raise/repay capital). Depreciation is NON-CASH — always added back in indirect method. Interest paid can be Operating or Financing (choose one, disclose consistently).",
      bengali:
        "নগদ প্রবাহ বিবৃতি (AS-3) তিনটি কার্যক্রমে নগদের আগমন-বহির্গমন দেখায়: পরিচালন (দৈনন্দিন ব্যবসা), বিনিয়োগ (সম্পদ ক্রয়-বিক্রয়), এবং অর্থায়ন (পুঁজি সংগ্রহ ও পরিশোধ)। পরোক্ষ পদ্ধতিতে নিট লাভ থেকে শুরু করে অ-নগদ আইটেম সমন্বয় করা হয়।",
    });
  }

  // ── Income Tax ──
  if (
    q.includes("income tax") ||
    q.includes("heads of income") ||
    q.includes("assessment year") ||
    q.includes("previous year") ||
    q.includes("residential status")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Income Tax Basics`,
      quickAnswer:
        "**Income Tax** in India is governed by the **Income Tax Act, 1961**. Tax is levied on income of a person during the **Previous Year** and assessed in the **Assessment Year** (AY = PY + 1 year).",
      breakdown:
        "**5 Heads of Income (Sec. 14):**\n1. Salaries (Sec. 15-17)\n2. Income from House Property (Sec. 22-27)\n3. Profits & Gains from Business/Profession (Sec. 28-44)\n4. Capital Gains (Sec. 45-55)\n5. Income from Other Sources (Sec. 56-59)\n\n**Residential Status (Sec. 6):** Determines what income is taxable in India — Resident (global income), Non-Resident (only Indian income).",
      keyElements: [
        "**Previous Year (PY)** — Year in which income is earned (April 1 to March 31)",
        "**Assessment Year (AY)** — Year in which income is assessed/taxed (AY = PY + 1)",
        "**Gross Total Income** — Sum of income under all 5 heads",
        "**Total Income** — GTI minus deductions under Chapter VI-A (80C, 80D etc.)",
        "**Tax Liability** — Computed on Total Income as per applicable slab rates",
        "**Deductions 80C** — LIC, PPF, ELSS, PF, home loan principal (max ₹1,50,000)",
        "**Deductions 80D** — Health insurance premium",
      ],
      scenario: [
        "**Salary Example:** Basic ₹5,00,000 + HRA ₹2,00,000 + Special Allowance ₹1,00,000. Standard Deduction ₹50,000. Taxable Salary = ₹7,50,000.",
        "**House Property:** Rent received ₹3,00,000. Less: Municipal Tax ₹20,000 = NAV ₹2,80,000. Less: 30% standard deduction ₹84,000 = Income from HP ₹1,96,000.",
        "**Total Income:** Salary ₹7,50,000 + HP ₹1,96,000 − 80C ₹1,50,000 = Total Income ₹7,96,000. Tax as per slab.",
      ],
      proTip:
        "🧠 **AY vs PY:** Income earned in FY 2024-25 (PY) → taxed in AY 2025-26. This is confusing but critical. Residential status: Present ≥ 182 days in India in PY → Resident. Section numbers are important for CA exams.",
      bengali:
        "ভারতে আয়কর আয়কর আইন ১৯৬১ দ্বারা পরিচালিত। আয়ের ৫টি মাথা: বেতন, গৃহসম্পত্তি, ব্যবসা/পেশা, মূলধনী লাভ, অন্যান্য উৎস। পূর্ববর্তী বছরে অর্জিত আয় → মূল্যায়ন বছরে কর। মোট আয় থেকে ৮০সি, ৮০ডি ছাড় কাটার পর করযোগ্য আয় নির্ধারণ।",
    });
  }

  // ── Demand & Supply (Economics) ──
  if (
    q.includes("demand") ||
    q.includes("supply") ||
    q.includes("elasticity") ||
    q.includes("market equilibrium")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Demand, Supply & Elasticity`,
      quickAnswer:
        "**Law of Demand:** As price increases, quantity demanded decreases (inverse relationship). **Law of Supply:** As price increases, quantity supplied increases (direct relationship). **Equilibrium** = price where Demand = Supply.",
      breakdown:
        "**Demand Curve** shifts right (increase in demand) due to: Rise in income, Rise in price of substitutes, Fall in price of complements, Change in taste/fashion, Increase in population.\n\n**Price Elasticity of Demand (PED)** = % change in Qty Demanded / % change in Price. PED > 1 = Elastic (luxury goods), PED < 1 = Inelastic (necessities), PED = 1 = Unitary elastic.",
      keyElements: [
        "**Substitute Goods** — Can replace each other (Tea & Coffee) — positive cross elasticity",
        "**Complementary Goods** — Used together (Car & Petrol) — negative cross elasticity",
        "**Normal Goods** — Demand increases with income (positive income elasticity)",
        "**Inferior Goods** — Demand decreases as income rises (negative income elasticity)",
        "**Giffen Goods** — Demand increases with price (exception to law of demand)",
        "**Consumer Surplus** — Difference between what consumers willing to pay vs actual price",
      ],
      scenario: [
        "**Elastic Demand:** Price of luxury watches rises 10% → Demand falls 20% → PED = 2.0 (elastic). Revenue falls.",
        "**Inelastic Demand:** Price of salt rises 10% → Demand falls 2% → PED = 0.2 (inelastic). Revenue rises.",
        "**Equilibrium:** At ₹50, Qd = 100 units, Qs = 100 units → Market clears at ₹50. If price rises to ₹60, Qs > Qd → surplus → price falls back.",
      ],
      proTip:
        "🧠 **PED Formula:** PED = (ΔQ/Q) ÷ (ΔP/P). For inelastic goods (necessities), suppliers can raise price and earn more revenue. For elastic goods (luxuries), lower price increases total revenue (TR = P × Q).",
      bengali:
        "চাহিদার নিয়ম: দাম বাড়লে চাহিদা কমে (বিপরীত সম্পর্ক)। যোগানের নিয়ম: দাম বাড়লে যোগান বাড়ে (সরল সম্পর্ক)। ভারসাম্য = চাহিদা = যোগান। মূল্য স্থিতিস্থাপকতা: বিলাসবহুল পণ্য স্থিতিস্থাপক (PED>1), আবশ্যক পণ্য অস্থিতিস্থাপক (PED<1)।",
    });
  }

  // ── Standard Costing ──
  if (
    q.includes("standard cost") ||
    q.includes("variance") ||
    (q.includes("material") && q.includes("variance")) ||
    (q.includes("labour") && q.includes("variance"))
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Standard Costing & Variance Analysis`,
      quickAnswer:
        "**Standard Costing** is a technique where pre-determined (standard) costs are set, and actual costs are compared to find **Variances**. Favourable variance = Actual < Standard (good). Adverse/Unfavourable variance = Actual > Standard (bad).",
      breakdown:
        "**Types of Variances:**\n1. **Material Cost Variance (MCV)** = Standard Cost − Actual Cost = (SQ × SP) − (AQ × AP)\n2. **Material Price Variance (MPV)** = AQ × (SP − AP)\n3. **Material Usage Variance (MUV)** = SP × (SQ − AQ)\n4. **Labour Efficiency Variance (LEV)** = SR × (SH − AH)\n5. **Labour Rate Variance (LRV)** = AH × (SR − AR)",
      keyElements: [
        "**SQ** = Standard Quantity, **AQ** = Actual Quantity",
        "**SP** = Standard Price, **AP** = Actual Price",
        "**SH** = Standard Hours, **AH** = Actual Hours",
        "**SR** = Standard Rate, **AR** = Actual Rate",
        "**Favourable (F)** = Better than standard → positive for company",
        "**Adverse/Unfavourable (A/U)** = Worse than standard → negative for company",
        "**MCV = MPV + MUV** (Material Cost Variance = Price Var + Usage Var)",
      ],
      scenario: [
        "**Given:** Standard: 5 kg @ ₹10 = ₹50. Actual: 6 kg @ ₹9 = ₹54.",
        "**MCV** = ₹50 − ₹54 = ₹4 (Adverse) — Actual cost more than standard.",
        "**MPV** = 6 × (₹10 − ₹9) = ₹6 (Favourable). **MUV** = ₹10 × (5 − 6) = ₹10 (Adverse). Check: MCV = MPV + MUV = 6F − 10A = 4A ✓",
      ],
      proTip:
        "🧠 **Memory:** MCV = MPV + MUV. LCV = LRV + LEV. Favourable = Standard > Actual (cost); Adverse = Standard < Actual (cost). Always label F or A. Reconcile: Total variance should equal sum of sub-variances.",
      bengali:
        "স্ট্যান্ডার্ড কস্টিং: পূর্বনির্ধারিত খরচের সাথে প্রকৃত খরচের তুলনা করে ভেরিয়েন্স বের করা হয়। অনুকূল ভেরিয়েন্স = প্রকৃত < মানক (ভালো)। প্রতিকূল = প্রকৃত > মানক (খারাপ)। উপাদান মূল্য ভেরিয়েন্স + ব্যবহার ভেরিয়েন্স = মোট উপাদান ভেরিয়েন্স।",
    });
  }

  // ── Marginal Costing ──
  if (
    q.includes("marginal cost") ||
    q.includes("contribution") ||
    q.includes("p/v ratio") ||
    q.includes("break even") ||
    q.includes("bep") ||
    q.includes("profit volume")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Marginal Costing`,
      quickAnswer:
        "**Marginal Cost** = Variable Cost per unit (cost of producing one additional unit). **Contribution** = Sales − Variable Cost. Fixed costs are treated as period costs (not included in product cost). Used for decision-making.",
      breakdown:
        "**Marginal Costing** separates fixed and variable costs. Products are valued at variable cost only. Fixed overheads are written off to P&L in the period incurred.\n\n**Key Formulae:**\n- Contribution = Sales − Variable Cost\n- P/V Ratio = (Contribution/Sales) × 100\n- BEP (units) = Fixed Cost / Contribution per unit\n- BEP (value) = Fixed Cost / P/V Ratio\n- Margin of Safety = Actual Sales − BEP Sales",
      keyElements: [
        "**Contribution** — Amount to cover fixed costs + profit",
        "**P/V Ratio (C/S Ratio)** — Contribution as % of Sales — higher is better",
        "**Break Even Point (BEP)** — Sales level where Profit = Zero (contribution = fixed costs)",
        "**Margin of Safety** — Sales above BEP — higher = safer",
        "**Angle of Incidence** — Angle between sales line and total cost line at BEP — steeper = more profitable",
      ],
      scenario: [
        "**Given:** SP ₹100/unit, Variable Cost ₹60/unit, Fixed Cost ₹2,00,000.",
        "**Contribution** = ₹100 − ₹60 = ₹40/unit. P/V Ratio = 40/100 = 40%.",
        "**BEP (units)** = ₹2,00,000 / ₹40 = **5,000 units**. BEP (value) = ₹2,00,000 / 40% = **₹5,00,000**.",
      ],
      proTip:
        "🧠 **Decisions using Marginal Costing:** Accept/Reject order (if contribution > 0), Make or Buy, Product mix (rank by P/V ratio when capacity constraint), Shut down (if contribution < fixed costs). NEVER include fixed costs in marginal cost per unit.",
      bengali:
        "প্রান্তিক ব্যয়: শুধু পরিবর্তনশীল খরচ পণ্যের মূল্যে অন্তর্ভুক্ত। অবদান = বিক্রয় − পরিবর্তনশীল খরচ। BEP = স্থায়ী খরচ / প্রতি একক অবদান। P/V অনুপাত = (অবদান/বিক্রয়) × ১০০। সিদ্ধান্ত গ্রহণের জন্য সর্বোত্তম হাতিয়ার।",
    });
  }

  // ── Working Capital ──
  if (
    q.includes("working capital") ||
    q.includes("current ratio") ||
    q.includes("liquidity") ||
    q.includes("quick ratio") ||
    q.includes("current asset") ||
    q.includes("current liabilit")
  ) {
    return buildStudyGuide({
      title: `CA ${lvl} | Working Capital Management`,
      quickAnswer:
        "**Working Capital** = Current Assets − Current Liabilities. It represents funds available for day-to-day operations. Adequate working capital ensures smooth business operations; excess ties up funds unnecessarily.",
      breakdown:
        "**Gross Working Capital** = Total Current Assets. **Net Working Capital** = Current Assets − Current Liabilities.\n\n**Working Capital Cycle (Operating Cycle):** Cash → Raw Materials → WIP → Finished Goods → Debtors → Cash. Shorter cycle = More efficient = Less working capital needed.\n\n**Liquidity Ratios:**\n- Current Ratio = CA / CL (ideal = 2:1)\n- Quick/Acid Test Ratio = (CA − Stock − Prepaid) / CL (ideal = 1:1)",
      keyElements: [
        "**Current Assets** — Cash, Debtors, Stock, Prepaid expenses, Marketable securities",
        "**Current Liabilities** — Creditors, Bank Overdraft, Outstanding expenses, Short-term loans",
        "**Current Ratio** = CA/CL. Ideal 2:1 (₹2 of CA for every ₹1 of CL)",
        "**Quick Ratio** = (CA − Stock)/CL. Ideal 1:1 (excludes illiquid stock)",
        "**Cash Conversion Cycle** = Debtors Days + Inventory Days − Creditors Days",
        "**Over-trading** — Too little working capital → business stress",
        "**Over-capitalisation** — Too much working capital → idle funds",
      ],
      scenario: [
        "**Given:** CA = ₹6,00,000, CL = ₹3,00,000, Stock = ₹1,50,000.",
        "**Current Ratio** = 6,00,000 / 3,00,000 = **2:1** (Ideal).",
        "**Quick Ratio** = (6,00,000 − 1,50,000) / 3,00,000 = 4,50,000 / 3,00,000 = **1.5:1** (Good — above 1:1).",
      ],
      proTip:
        "🧠 **Exam Tip:** Working capital requirement is estimated by: (Debtors × Credit Period/365 + Stock holding + WIP) − (Creditors × Credit Period/365). Always show the working capital cycle diagram in theory answers for extra marks.",
      bengali:
        "কার্যকরী মূলধন = চলতি সম্পদ − চলতি দায়। দৈনন্দিন কার্যক্রমের জন্য প্রয়োজনীয়। চলতি অনুপাত: ২:১ আদর্শ। দ্রুত অনুপাত: ১:১ আদর্শ। স্বল্প কার্যকরী মূলধন = ব্যবসায় সংকট; অতিরিক্ত = অলস তহবিল।",
    });
  }

  return null; // No specific match found
}

function getGenericGuide(
  subject: string,
  level: string,
  chapter: string,
  question: string,
  qType: string,
): string {
  // First try topic-specific answer
  const topicAnswer = getTopicAnswer(subject, level, chapter, question, qType);
  if (topicAnswer) return topicAnswer;

  const lvl = caLevel(level);
  const displayQ = question?.trim() || chapter;
  const subjectLower = subject.toLowerCase();
  const chapterLower = chapter.toLowerCase();

  // Determine subject area for targeted generic response
  const isAccounting =
    subjectLower.includes("account") || subjectLower.includes("financial");
  const isLaw =
    subjectLower.includes("law") ||
    subjectLower.includes("legal") ||
    subjectLower.includes("contract") ||
    subjectLower.includes("companies");
  const isCosting =
    subjectLower.includes("cost") || chapterLower.includes("cost");
  const isTax =
    subjectLower.includes("tax") ||
    subjectLower.includes("gst") ||
    subjectLower.includes("income tax");
  const isAudit = subjectLower.includes("audit");
  const _isEco =
    subjectLower.includes("econom") ||
    subjectLower.includes("business economics");
  const _isFM =
    subjectLower.includes("financial management") ||
    subjectLower.includes("fm");

  let quickAnswer = "";
  let breakdown = "";
  let keyElements: string[] = [];
  let scenario: string[] = [];
  let proTip = "";
  let bengali = "";

  if (isAccounting) {
    quickAnswer = `**${displayQ}** is a key concept in **${chapter}** (${subject}, CA ${lvl}). In accounting, every concept is built on the **double-entry system** — every debit has a corresponding credit, and the accounting equation (Assets = Liabilities + Capital) always holds.`;
    breakdown = `To answer **"${displayQ}"** thoroughly:\n\n1. **Definition** — State the precise definition as per ICAI / relevant Accounting Standard (AS)\n2. **Why it matters** — Explain the purpose and importance in financial reporting\n3. **Journal Treatment** — Show how it is recorded (Dr./Cr.)\n4. **Financial Statement Impact** — Where it appears (P&L / Balance Sheet / Cash Flow)\n5. **Accounting Standard** — Reference the relevant AS (e.g., AS-2 for inventory, AS-6 for depreciation, AS-9 for revenue)`;
    keyElements = [
      `**${chapter}** — Understand the core concept, definition, and types`,
      "**Journal Entry** — Dr./Cr. treatment with proper narration",
      "**Accounting Standard (AS)** — Reference the governing standard",
      "**Financial Statement Presentation** — P&L or Balance Sheet placement",
      "**Numerical Application** — Practice with figures and verify using accounting equation",
    ];
    scenario = [
      `**Step 1 — Define:** Write the definition of **${displayQ}** precisely. Quote the AS or Section if applicable.`,
      `**Step 2 — Explain:** Describe the concept with an analogy or simple example relevant to ${chapter}.`,
      "**Step 3 — Apply:** Show the journal entry or calculation. Prepare the account or statement as required.",
    ];
    proTip = `🧠 **ICAI Exam Tip:** For theory questions on ${chapter}, always: (1) Define, (2) List features/types, (3) Give example, (4) Reference AS/Section. For practical questions: Always show Working Notes (WN) — they carry separate marks.`;
    bengali = `${displayQ} — ${chapter} (${subject}) একটি গুরুত্বপূর্ণ বিষয়। সংজ্ঞা দিন, বৈশিষ্ট্য তালিকা করুন, উদাহরণ দিন এবং প্রাসঙ্গিক AS/ধারা উল্লেখ করুন। জার্নাল এন্ট্রি এবং ফিনান্সিয়াল স্টেটমেন্ট উপস্থাপনা অবশ্যই দেখান।`;
  } else if (isLaw) {
    quickAnswer = `**${displayQ}** — This is covered under **${chapter}** in ${subject} (CA ${lvl}). Business Law questions require precise legal language, correct Section numbers, and practical illustrations.`;
    breakdown = `**How to answer Law questions for CA exams:**\n\n1. **State the Law** — Cite the Act and Section number precisely\n2. **Explain the Provision** — What does the Section say in plain language?\n3. **Conditions/Requirements** — When does this provision apply?\n4. **Exceptions** — When does it NOT apply?\n5. **Case/Example** — Practical illustration\n\nFor **${displayQ}**, identify which Act it falls under and state the relevant section.`;
    keyElements = [
      `**Relevant Act** — Identify which Act governs ${displayQ}`,
      "**Section Reference** — Always cite Section number (e.g., Section 10 of Contract Act)",
      "**Conditions** — Pre-requisites for the provision to apply",
      "**Exceptions & Provisos** — Cases where the general rule doesn't apply",
      "**Consequences** — Legal effect / penalty / remedy for violation",
    ];
    scenario = [
      `**Step 1:** State the relevant Act and Section for ${displayQ}.`,
      "**Step 2:** Explain the provision — what it means in practical terms with a real-life scenario.",
      "**Step 3:** State any exceptions, and the legal consequence if the provision is violated.",
    ];
    proTip =
      "🧠 **Law Exam Tip:** Use the IRAC method: **Issue** (state the legal question), **Rule** (cite the Section/Act), **Application** (apply to facts), **Conclusion**. Section numbers carry marks — never skip them.";
    bengali = `${displayQ} — ${chapter} একটি আইনি বিষয়। প্রাসঙ্গিক আইন ও ধারা উল্লেখ করুন, শর্তাবলী ব্যাখ্যা করুন, ব্যতিক্রমগুলি উল্লেখ করুন এবং ব্যবহারিক উদাহরণ দিন। IRAC পদ্ধতি ব্যবহার করুন।`;
  } else if (isCosting) {
    quickAnswer = `**${displayQ}** is a cost accounting concept from **${chapter}** (CA ${lvl}). Cost accounting helps management make decisions by classifying, measuring, and controlling costs.`;
    breakdown = `For **${displayQ}** in ${chapter}:\n\n- **Classification** — What type of cost? (Fixed/Variable/Semi-variable; Direct/Indirect; Product/Period)\n- **Measurement** — How is it calculated? (Formula, base, rate)\n- **Control** — How can management control or reduce this cost?\n- **Relevance** — When is this cost relevant for decision-making?`;
    keyElements = [
      "**Cost Classification** — Fixed, Variable, Semi-variable",
      "**Direct Costs** — Directly traceable to product (Direct Material, Direct Labour)",
      "**Indirect/Overhead Costs** — Cannot be directly traced (Factory overhead, Admin overhead)",
      "**Cost Sheet** — Statement showing total cost: Prime Cost + Factory OH + Admin OH + Selling OH",
      "**Formula Application** — Always state formula, substitute values, show working",
    ];
    scenario = [
      `**Step 1:** Identify whether ${displayQ} is a direct or indirect cost, fixed or variable.`,
      "**Step 2:** Apply the relevant formula or cost statement format.",
      "**Step 3:** Prepare Cost Sheet or Variance Analysis as required.",
    ];
    proTip =
      "🧠 **Costing Tip:** Always prepare a **Cost Sheet** format for cost accounting answers. Label each line: Prime Cost → Works Cost → Cost of Production → Cost of Goods Sold → Total Cost → Profit → Selling Price. Show all Working Notes separately.";
    bengali = `${displayQ} — খরচ হিসাব একটি গুরুত্বপূর্ণ ব্যবস্থাপনা সরঞ্জাম। খরচ শ্রেণীবিভাগ (স্থায়ী/পরিবর্তনশীল, প্রত্যক্ষ/পরোক্ষ) বুঝুন। কস্ট শিট ফরম্যাটে উত্তর দিন এবং সকল কার্যকরী নোট দেখান।`;
  } else if (isTax) {
    quickAnswer = `**${displayQ}** — This falls under **${chapter}** in Taxation (CA ${lvl}). Tax questions require knowledge of the correct Act, Section, applicable rates, and exemptions.`;
    breakdown =
      "For any tax question:\n1. **Identify the Tax** — Income Tax / GST / Customs / Other\n2. **Relevant Act & Section** — Income Tax Act 1961 / CGST Act 2017\n3. **Computation Format** — Always use prescribed format\n4. **Exemptions & Deductions** — List eligible ones\n5. **Rate of Tax** — Apply correct slab/rate";
    keyElements = [
      "**Taxable Event** — What triggers the tax liability?",
      "**Computation** — Step-by-step calculation in prescribed format",
      "**Exemptions** — Incomes exempt from tax (Sec 10)",
      "**Deductions** — Chapter VI-A deductions (80C, 80D, 80G etc.)",
      "**Due Dates** — Filing deadlines and advance tax dates",
    ];
    scenario = [
      `**Step 1:** Identify the taxable event/income for ${displayQ}.`,
      "**Step 2:** Compute gross income, apply exemptions, compute Net Taxable Income.",
      "**Step 3:** Apply correct tax rate/slab to arrive at tax liability. Add surcharge/cess if applicable.",
    ];
    proTip =
      "🧠 **Tax Exam Tip:** Always present computation in tabular format with columns for Particulars, Amount (₹), and Remarks. Quote Section numbers. Surcharge + Health & Education Cess (4%) are added to computed tax.";
    bengali = `${displayQ} — কর হিসাব সঠিক আইন ও ধারা জ্ঞান প্রয়োজন। করযোগ্য আয় গণনা করুন, ছাড় প্রয়োগ করুন এবং সঠিক হারে কর নির্ধারণ করুন। ট্যাবুলার ফরম্যাটে উত্তর দিন এবং ধারা নম্বর উল্লেখ করুন।`;
  } else if (isAudit) {
    quickAnswer = `**${displayQ}** — This is an auditing concept from **${chapter}** (CA ${lvl}). Auditing is governed by **Standards on Auditing (SAs)** issued by ICAI. Auditors express opinion on whether financial statements show a **True and Fair View**.`;
    breakdown =
      "For auditing topics:\n1. **Definition** — As per relevant SA\n2. **Objective** — Why is this audit procedure/concept needed?\n3. **Procedure** — How does the auditor perform this?\n4. **Documentation** — What records/evidence are required?\n5. **Reporting** — How does this affect the audit report?\n\nKey SAs: SA 200 (Overall objectives), SA 315 (Risk assessment), SA 500 (Audit evidence), SA 700 (Audit report).";
    keyElements = [
      "**Audit Evidence** — Sufficient and appropriate evidence (SA 500)",
      "**Materiality** — Threshold below which misstatements are acceptable",
      "**Audit Risk** — Risk that auditor expresses wrong opinion",
      "**Internal Control** — Systems to prevent/detect errors (SA 315)",
      "**Audit Report** — Final communication: Unmodified / Modified opinion",
      "**True and Fair View** — Financial statements free from material misstatement",
    ];
    scenario = [
      `**Step 1:** Define ${displayQ} precisely, referencing the relevant SA number.`,
      "**Step 2:** Explain the objective and why it is important in the audit process.",
      "**Step 3:** Describe the audit procedure and what documentation/evidence is required.",
    ];
    proTip =
      "🧠 **Audit Exam Tip:** Always reference the SA number. Distinguish between Audit Procedures (what auditor does) and Audit Objectives (what auditor aims to achieve). Types of audit opinion: Unmodified, Qualified, Adverse, Disclaimer.";
    bengali = `${displayQ} — অডিটিং ধারণা নির্দিষ্ট SA (অডিটিং মান) দ্বারা পরিচালিত। সংজ্ঞা, উদ্দেশ্য, পদ্ধতি এবং প্রামাণিক তথ্য প্রয়োজনীয়তা ব্যাখ্যা করুন। অডিট রিপোর্টে প্রভাব উল্লেখ করুন।`;
  } else {
    // Default generic but still informative
    quickAnswer = `**${displayQ}** is part of **${chapter}** in ${subject} (CA ${lvl} — ICAI curriculum). Here is a structured explanation to help you understand and answer this in exams.`;
    breakdown = `**Understanding ${displayQ}:**\n\n${chapter} is an important topic in ${subject}. To answer exam questions on this:\n\n1. **Concept** — What is the core idea? Define precisely.\n2. **Principles/Rules** — What are the governing rules or standards?\n3. **Application** — How is it applied in practice?\n4. **Example** — Illustrate with a numerical or practical case.\n5. **Exam Presentation** — Use structured format with headings, bullet points, and numbered steps.`;
    keyElements = [
      `**Core Definition** — Precise definition of ${displayQ}`,
      "**Types / Classification** — Different categories or forms",
      "**Relevant Standard / Act / Section** — Governing authority",
      "**Conditions / Requirements** — When/how it applies",
      "**Exceptions** — Cases where normal rules differ",
      "**Practical Example** — Real-world application",
    ];
    scenario = [
      `**Step 1 — Define:** State the precise meaning of ${displayQ} with reference to ICAI study material or relevant Act/Standard.`,
      `**Step 2 — Explain:** Break down the concept with a suitable example from ${chapter}.`,
      "**Step 3 — Apply & Conclude:** Show how this concept applies in practice and what the outcome is.",
    ];
    proTip = `🧠 **Exam Strategy:** For CA ${lvl} ${subject}, always: (1) Use structured headings, (2) Reference Act/Section/AS numbers, (3) Provide a practical example, (4) Keep answers concise but complete. ICAI rewards clarity and structure.`;
    bengali = `${displayQ} — CA ${lvl} ${subject} একটি গুরুত্বপূর্ণ বিষয়। সংজ্ঞা দিন, নিয়ম/মান উল্লেখ করুন, ব্যবহারিক উদাহরণ দিন এবং কাঠামোবদ্ধ উত্তর লিখুন। পরীক্ষায় শিরোনাম, বুলেট পয়েন্ট এবং উদাহরণ ব্যবহার করুন।`;
  }

  return buildStudyGuide({
    title: `CA ${lvl} | ${subject} | ${chapter}`,
    quickAnswer,
    breakdown,
    keyElements,
    scenario,
    proTip,
    bengali,
  });
}

export function generateCASolution(input: CASolverInput): string {
  const { level, subject, chapter, question, questionType } = input;
  const q = `${question} ${chapter} ${subject}`.toLowerCase();

  if (questionType === "mcq") {
    return getMCQs(level, subject, chapter);
  }

  if (
    q.includes("bill of exchange") ||
    q.includes("negotiable") ||
    q.includes("promissory note") ||
    q.includes("cheque")
  ) {
    return getBillOfExchangeGuide(subject, level);
  }
  if (q.includes("depreciat")) {
    return getDepreciationGuide(subject, level);
  }
  if (
    q.includes("gst") ||
    q.includes("goods and service") ||
    q.includes("input tax credit")
  ) {
    return getGSTGuide(subject, level);
  }
  if (
    q.includes("partnership") ||
    q.includes("admission") ||
    q.includes("retirement") ||
    (q.includes("goodwill") && q.includes("partner"))
  ) {
    return getPartnershipGuide(subject, level);
  }
  if (
    q.includes("director") ||
    q.includes("companies act") ||
    q.includes("din") ||
    q.includes("board of director")
  ) {
    return getCompanyLawGuide(subject, level);
  }
  if (q.includes("audit")) {
    return getAuditingGuide(subject, level);
  }
  if (
    q.includes("contract") ||
    q.includes("offer") ||
    q.includes("acceptance") ||
    q.includes("consideration")
  ) {
    return getContractActGuide(subject, level);
  }
  if (
    q.includes("npv") ||
    q.includes("capital budgeting") ||
    q.includes("irr") ||
    q.includes("payback") ||
    q.includes("discounted")
  ) {
    return getCapitalBudgetingGuide(subject, level);
  }

  return getGenericGuide(subject, level, chapter, question, questionType);
}
