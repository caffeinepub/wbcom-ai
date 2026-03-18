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

// ============================================================
// Depreciation Account Format (T-Account / WBCHSE style)
// ============================================================
export interface AssetAccountRow {
  year: number;
  dr_particulars: string;
  dr_amount: number;
  cr_particulars: string;
  cr_amount: number;
}

export interface ProvisionRow {
  year: number;
  particulars: string;
  dr: number;
  cr: number;
  balance: number;
}

export interface DepreciationAccountResult {
  assetAccount: AssetAccountRow[];
  provisionAccount: ProvisionRow[];
}

export function solveDepreciationAccounts(
  cost: number,
  salvage: number,
  life: number,
  method: "SLM" | "WDV",
  wdvRate?: number,
): DepreciationAccountResult {
  const rows = solveDepreciation(cost, salvage, life, method, wdvRate);
  const assetAccount: AssetAccountRow[] = rows.map((r) => ({
    year: r.year,
    dr_particulars: r.year === 1 ? "To Bank A/c (Purchase)" : "To Balance b/d",
    dr_amount: r.year === 1 ? cost : r.opening,
    cr_particulars: "By Depreciation A/c / By Balance c/d",
    cr_amount: r.opening,
  }));

  let provBalance = 0;
  const provisionAccount: ProvisionRow[] = rows.map((r) => {
    provBalance += r.depreciation;
    return {
      year: r.year,
      particulars: `Year ${r.year} — Depreciation on Asset`,
      dr: 0,
      cr: r.depreciation,
      balance: provBalance,
    };
  });

  return { assetAccount, provisionAccount };
}

// ============================================================
// Asset Disposal / Sale
// ============================================================
export interface AssetDisposalResult {
  bookValueAtSale: number;
  salePrice: number;
  profitOrLoss: number;
  isProfit: boolean;
  depreciationRows: DepreciationRow[];
}

export function solveAssetDisposal(
  cost: number,
  purchaseYear: number,
  saleYear: number,
  salePrice: number,
  salvage: number,
  method: "SLM" | "WDV",
  wdvRate?: number,
): AssetDisposalResult {
  const life = saleYear - purchaseYear + 1;
  const rows = solveDepreciation(
    cost,
    salvage,
    Math.max(life, 1),
    method,
    wdvRate,
  );
  const lastRow = rows[rows.length - 1];
  const bookValueAtSale = lastRow ? lastRow.closing : cost;
  const diff = salePrice - bookValueAtSale;
  return {
    bookValueAtSale,
    salePrice,
    profitOrLoss: Math.abs(diff),
    isProfit: diff >= 0,
    depreciationRows: rows,
  };
}

// ============================================================
// Revaluation Account (Partnership)
// ============================================================
export interface RevaluationItem {
  name: string;
  type: "asset" | "liability";
  increase: number;
  decrease: number;
}

export interface RevaluationResult {
  revaluationItems: RevaluationItem[];
  netGainOrLoss: number;
  partnerShares: { name: string; share: number }[];
  isGain: boolean;
}

export function solveRevaluation(
  assets: { name: string; oldValue: number; newValue: number }[],
  liabilities: { name: string; oldValue: number; newValue: number }[],
  partners: { name: string; ratio: number }[],
): RevaluationResult {
  const items: RevaluationItem[] = [];

  for (const a of assets) {
    const diff = a.newValue - a.oldValue;
    items.push({
      name: a.name,
      type: "asset",
      increase: diff > 0 ? diff : 0,
      decrease: diff < 0 ? -diff : 0,
    });
  }

  for (const l of liabilities) {
    const diff = l.newValue - l.oldValue;
    // Liability increase = loss (debit), decrease = gain (credit)
    items.push({
      name: l.name,
      type: "liability",
      increase: diff > 0 ? diff : 0,
      decrease: diff < 0 ? -diff : 0,
    });
  }

  // Net: asset increases + liability decreases = gain side
  //      asset decreases + liability increases = loss side
  const gainSide = items.reduce((s, i) => {
    if (i.type === "asset") return s + i.increase;
    return s + i.decrease; // liability decrease = gain
  }, 0);
  const lossSide = items.reduce((s, i) => {
    if (i.type === "asset") return s + i.decrease;
    return s + i.increase; // liability increase = loss
  }, 0);

  const net = gainSide - lossSide;
  const isGain = net >= 0;
  const totalRatio = partners.reduce((s, p) => s + p.ratio, 0);

  const partnerShares = partners.map((p) => ({
    name: p.name,
    share: totalRatio > 0 ? (Math.abs(net) * p.ratio) / totalRatio : 0,
  }));

  return {
    revaluationItems: items,
    netGainOrLoss: Math.abs(net),
    partnerShares,
    isGain,
  };
}

// ============================================================
// Retirement of Partner
// ============================================================
export interface RetirementResult {
  amountDueToRetiredPartner: number;
  goodwillAdjustments: { name: string; dr: number; cr: number }[];
  closingEntries: string[];
}

export function solveRetirement(
  retiringPartner: {
    name: string;
    capitalBalance: number;
    goodwillShare: number;
    revaluationShare: number;
  },
  remainingPartners: { name: string; newRatio: number }[],
  _totalGoodwill: number,
): RetirementResult {
  const amountDueToRetiredPartner =
    retiringPartner.capitalBalance +
    retiringPartner.goodwillShare +
    retiringPartner.revaluationShare;

  const totalRatio = remainingPartners.reduce((s, p) => s + p.newRatio, 0);
  const goodwillAdjustments = remainingPartners.map((p) => ({
    name: p.name,
    dr:
      totalRatio > 0
        ? (retiringPartner.goodwillShare * p.newRatio) / totalRatio
        : 0,
    cr: 0,
  }));

  const closingEntries = [
    `${retiringPartner.name}'s Capital A/c   Dr.   ₹${retiringPartner.capitalBalance.toFixed(2)}`,
    `    To ${retiringPartner.name}'s Loan A/c / Bank A/c   ₹${amountDueToRetiredPartner.toFixed(2)}`,
    `(Being amount due to ${retiringPartner.name} on retirement)`,
  ];

  return { amountDueToRetiredPartner, goodwillAdjustments, closingEntries };
}

// ============================================================
// Share Forfeiture & Reissue
// ============================================================
export interface ShareForfeitureResult {
  forfeitureEntries: JournalEntry[];
  reissueEntries: JournalEntry[];
  capitalReserve: number;
}

export function solveShareForfeiture(
  shares: number,
  faceValue: number,
  paidUpValue: number,
  reissuePrice: number,
  sharesReissued: number,
): ShareForfeitureResult {
  const callInArrears = shares * (faceValue - paidUpValue);
  const shareCapitalDr = shares * faceValue;
  const forfeitureCr = shares * paidUpValue;

  const forfeitureEntries: JournalEntry[] = [
    {
      particulars: "Share Capital A/c   Dr.",
      debit: shareCapitalDr,
      credit: "-",
      narration: `(${shares} shares × ₹${faceValue} face value)`,
    },
    {
      particulars: "    To Calls-in-Arrears A/c",
      debit: "-",
      credit: callInArrears,
    },
    {
      particulars: "    To Share Forfeiture A/c",
      debit: "-",
      credit: forfeitureCr,
      narration: "(Being shares forfeited for non-payment of calls)",
    },
  ];

  const reissueTotal = sharesReissued * reissuePrice;
  const discountOnReissue = sharesReissued * (faceValue - reissuePrice);
  const forfeiturePerShare = paidUpValue;
  const capitalReserve =
    sharesReissued * forfeiturePerShare - Math.max(discountOnReissue, 0);

  const reissueEntries: JournalEntry[] = [
    {
      particulars: "Bank A/c   Dr.",
      debit: reissueTotal,
      credit: "-",
    },
  ];

  if (discountOnReissue > 0) {
    reissueEntries.push({
      particulars: "Share Forfeiture A/c   Dr.",
      debit: discountOnReissue,
      credit: "-",
    });
  }

  reissueEntries.push({
    particulars: "    To Share Capital A/c",
    debit: "-",
    credit: sharesReissued * faceValue,
    narration: "(Being forfeited shares reissued)",
  });

  reissueEntries.push({
    particulars: "Share Forfeiture A/c   Dr.",
    debit: capitalReserve,
    credit: "-",
  });
  reissueEntries.push({
    particulars: "    To Capital Reserve A/c",
    debit: "-",
    credit: capitalReserve,
    narration: "(Being balance of forfeiture transferred to Capital Reserve)",
  });

  return { forfeitureEntries, reissueEntries, capitalReserve };
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
// Receipt & Payment Account (NPO)
// ============================================================
export interface ReceiptPaymentResult {
  receipts: { label: string; amount: number }[];
  payments: { label: string; amount: number }[];
  totalReceipts: number;
  totalPayments: number;
  closingBalance: number;
}

export function solveReceiptPayment(
  openingBalance: number,
  receipts: { label: string; amount: number }[],
  payments: { label: string; amount: number }[],
): ReceiptPaymentResult {
  const totalReceipts =
    receipts.reduce((s, i) => s + i.amount, 0) + openingBalance;
  const totalPayments = payments.reduce((s, i) => s + i.amount, 0);
  const closingBalance = totalReceipts - totalPayments;
  return { receipts, payments, totalReceipts, totalPayments, closingBalance };
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
