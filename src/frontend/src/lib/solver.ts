// ============================================================
// WBCom AI — Client-Side Accounting Solver Engine
// ============================================================

export interface DepreciationRow {
  year: number;
  opening: number;
  depreciation: number;
  closing: number;
}

export function solveDepreciation(
  cost: number,
  salvage: number,
  life: number,
  method: "SLM" | "WDV",
  wdvRate?: number,
): DepreciationRow[] {
  const rows: DepreciationRow[] = [];
  let book = cost;
  for (let y = 1; y <= life; y++) {
    const dep =
      method === "SLM"
        ? (cost - salvage) / life
        : book * ((wdvRate ?? 20) / 100);
    const closing = Math.max(book - dep, salvage);
    rows.push({ year: y, opening: book, depreciation: dep, closing });
    book = closing;
    if (closing <= salvage) break;
  }
  return rows;
}

export interface GoodwillResult {
  superProfit: number;
  goodwillCap: number;
  goodwillYears: number;
  normalProfit: number;
  avgProfit: number;
}

export function solveGoodwill(
  avgProfit: number,
  normalProfit: number,
  capRate: number,
  yearsOfPurchase: number,
): GoodwillResult {
  const superProfit = avgProfit - normalProfit;
  const goodwillYears = superProfit * yearsOfPurchase;
  const goodwillCap = superProfit * (100 / capRate);
  return { superProfit, goodwillCap, goodwillYears, normalProfit, avgProfit };
}

export interface SacrificeRow {
  name: string;
  oldRatio: number;
  newRatio: number;
  sacrifice: number;
  gain: number;
}

export function solveSacrificeRatio(
  partners: { name: string; oldRatio: number; newRatio: number }[],
): SacrificeRow[] {
  return partners.map((p) => {
    const diff = p.oldRatio - p.newRatio;
    return {
      name: p.name,
      oldRatio: p.oldRatio,
      newRatio: p.newRatio,
      sacrifice: diff > 0 ? diff : 0,
      gain: diff < 0 ? -diff : 0,
    };
  });
}

export interface BalanceSheetResult {
  totalAssets: number;
  totalLiabilities: number;
  balanced: boolean;
  difference: number;
}

export function solveBalanceSheet(
  assets: number,
  liabilities: number,
  capital: number,
): BalanceSheetResult {
  const totalLiabilities = liabilities + capital;
  const difference = assets - totalLiabilities;
  return {
    totalAssets: assets,
    totalLiabilities,
    balanced: Math.abs(difference) < 0.01,
    difference,
  };
}

export interface CashFlowResult {
  operatingActivities: number;
  investingActivities: number;
  financingActivities: number;
  netChange: number;
  openingCash: number;
  closingCash: number;
}

export function solveCashFlow(
  netProfit: number,
  workingCapitalChanges: number,
  investing: number,
  financing: number,
  openingCash = 0,
): CashFlowResult {
  const operatingActivities = netProfit + workingCapitalChanges;
  const netChange = operatingActivities + investing + financing;
  return {
    operatingActivities,
    investingActivities: investing,
    financingActivities: financing,
    netChange,
    openingCash,
    closingCash: openingCash + netChange,
  };
}

export interface JournalEntry {
  particulars: string;
  debit: number | string;
  credit: number | string;
  narration?: string;
}

export function solveJournalEntry(
  description: string,
  amount: number,
): JournalEntry[] {
  const desc = description.toLowerCase();
  if (desc.includes("cash") && desc.includes("purchase")) {
    return [
      { particulars: "Purchases A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Cash A/c",
        debit: "-",
        credit: amount,
        narration: "(Being goods purchased for cash)",
      },
    ];
  }
  if (desc.includes("credit") && desc.includes("purchase")) {
    return [
      { particulars: "Purchases A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Creditors A/c",
        debit: "-",
        credit: amount,
        narration: "(Being goods purchased on credit)",
      },
    ];
  }
  if (desc.includes("cash") && desc.includes("sale")) {
    return [
      { particulars: "Cash A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Sales A/c",
        debit: "-",
        credit: amount,
        narration: "(Being goods sold for cash)",
      },
    ];
  }
  if (desc.includes("credit") && desc.includes("sale")) {
    return [
      { particulars: "Debtors A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Sales A/c",
        debit: "-",
        credit: amount,
        narration: "(Being goods sold on credit)",
      },
    ];
  }
  if (desc.includes("salary") || desc.includes("wages")) {
    return [
      { particulars: "Salary/Wages A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Cash/Bank A/c",
        debit: "-",
        credit: amount,
        narration: "(Being salary/wages paid)",
      },
    ];
  }
  if (desc.includes("rent")) {
    return [
      { particulars: "Rent A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Cash/Bank A/c",
        debit: "-",
        credit: amount,
        narration: "(Being rent paid)",
      },
    ];
  }
  if (desc.includes("capital") || desc.includes("invest")) {
    return [
      { particulars: "Cash/Bank A/c   Dr.", debit: amount, credit: "-" },
      {
        particulars: "    To Capital A/c",
        debit: "-",
        credit: amount,
        narration: "(Being capital introduced)",
      },
    ];
  }
  // Generic fallback
  return [
    { particulars: "[Debit Account]   Dr.", debit: amount, credit: "-" },
    {
      particulars: "    To [Credit Account]",
      debit: "-",
      credit: amount,
      narration: `(Being ${description})`,
    },
  ];
}

export interface ShareIssueEntry {
  stage: string;
  particulars: string;
  debit: number | string;
  credit: number | string;
}

export function solveShareIssue(
  shares: number,
  faceValue: number,
  issuePrice: number,
): ShareIssueEntry[] {
  const premium = issuePrice - faceValue;
  const entries: ShareIssueEntry[] = [
    {
      stage: "On Application",
      particulars: "Bank A/c   Dr.",
      debit: shares * issuePrice,
      credit: "-",
    },
    {
      stage: "On Application",
      particulars: "    To Share Application A/c",
      debit: "-",
      credit: shares * issuePrice,
    },
    {
      stage: "On Allotment",
      particulars: "Share Application A/c   Dr.",
      debit: shares * issuePrice,
      credit: "-",
    },
    {
      stage: "On Allotment",
      particulars: "    To Share Capital A/c",
      debit: "-",
      credit: shares * faceValue,
    },
  ];
  if (premium > 0) {
    entries.push({
      stage: "On Allotment",
      particulars: "    To Securities Premium A/c",
      debit: "-",
      credit: shares * premium,
    });
  }
  return entries;
}

export interface NPOResult {
  totalIncome: number;
  totalExpenditure: number;
  surplus: number;
  deficit: number;
}

export function solveNPO(
  incomeItems: { label: string; amount: number }[],
  expenditureItems: { label: string; amount: number }[],
): NPOResult {
  const totalIncome = incomeItems.reduce((s, i) => s + i.amount, 0);
  const totalExpenditure = expenditureItems.reduce((s, i) => s + i.amount, 0);
  const surplus =
    totalIncome > totalExpenditure ? totalIncome - totalExpenditure : 0;
  const deficit =
    totalExpenditure > totalIncome ? totalExpenditure - totalIncome : 0;
  return { totalIncome, totalExpenditure, surplus, deficit };
}

// ============================================================
// Appropriation of Profit & Partners' Capital Account
// ============================================================

export interface AppropriationPartner {
  name: string;
  capital: number; // Opening capital
  profitRatio: number; // Profit sharing ratio (number, e.g. 3 for 3:2:1)
  salary: number; // Partner's salary (0 if none)
  commission: number; // Partner's commission (0 if none)
  drawings: number; // Drawings during the year
  interestOnDrawings: number; // Interest on drawings
}

export interface AppropriationPartnerResult {
  name: string;
  interestOnCapital: number;
  salary: number;
  commission: number;
  shareOfProfit: number; // share of distributable profit
  drawings: number;
  interestOnDrawings: number;
  closingCapital: number;
  openingCapital: number;
}

export interface AppropriationResult {
  netProfit: number;
  reserve: number;
  totalInterestOnCapital: number;
  totalSalary: number;
  totalCommission: number;
  distributableProfit: number;
  totalRatio: number;
  partners: AppropriationPartnerResult[];
  deficiency: boolean; // true if appropriations exceed net profit
}

export function solveAppropriation(
  netProfit: number,
  reserve: number,
  interestOnCapitalRate: number, // % e.g. 6
  partners: AppropriationPartner[],
): AppropriationResult {
  const totalRatio = partners.reduce((s, p) => s + p.profitRatio, 0);

  const partnerCalc: AppropriationPartnerResult[] = partners.map((p) => {
    const interestOnCapital = p.capital * (interestOnCapitalRate / 100);
    return {
      name: p.name,
      openingCapital: p.capital,
      interestOnCapital,
      salary: p.salary,
      commission: p.commission,
      shareOfProfit: 0, // calculated below
      drawings: p.drawings,
      interestOnDrawings: p.interestOnDrawings,
      closingCapital: 0, // calculated below
    };
  });

  const totalInterestOnCapital = partnerCalc.reduce(
    (s, p) => s + p.interestOnCapital,
    0,
  );
  const totalSalary = partnerCalc.reduce((s, p) => s + p.salary, 0);
  const totalCommission = partnerCalc.reduce((s, p) => s + p.commission, 0);

  const distributableProfit =
    netProfit -
    reserve -
    totalInterestOnCapital -
    totalSalary -
    totalCommission;

  const deficiency = distributableProfit < 0;

  // Distribute remaining profit (or loss) in ratio
  partnerCalc.forEach((p, i) => {
    const ratio = totalRatio > 0 ? partners[i].profitRatio / totalRatio : 0;
    p.shareOfProfit = distributableProfit * ratio;
    // Closing capital = Opening + IOC + Salary + Commission + Share of Profit - Drawings - IOD
    p.closingCapital =
      p.openingCapital +
      p.interestOnCapital +
      p.salary +
      p.commission +
      p.shareOfProfit -
      p.drawings -
      p.interestOnDrawings;
  });

  return {
    netProfit,
    reserve,
    totalInterestOnCapital,
    totalSalary,
    totalCommission,
    distributableProfit,
    totalRatio,
    partners: partnerCalc,
    deficiency,
  };
}

export function fmt(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
