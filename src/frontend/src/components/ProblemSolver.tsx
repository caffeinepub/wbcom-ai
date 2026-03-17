import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Save } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProblemType } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveProblem } from "../hooks/useQueries";
import {
  type AppropriationPartner,
  fmt,
  solveAppropriation,
  solveBalanceSheet,
  solveCashFlow,
  solveDepreciation,
  solveGoodwill,
  solveJournalEntry,
  solveNPO,
  solveSacrificeRatio,
  solveShareIssue,
} from "../lib/solver";

interface ProblemSolverProps {
  activeTopic: string;
}

const ENCOURAGING = [
  "Excellent work! Keep practising! 🌟",
  "শাবাশ! তুমি দারুণ করছ! 🎉",
  "Well done! Accountancy is your superpower! 💪",
  "অসাধারণ! এভাবেই এগিয়ে যাও! 🏆",
  "Great solution! Top of the class! ⭐",
];

function pickEncouraging(i: number) {
  return ENCOURAGING[i % ENCOURAGING.length];
}

export function ProblemSolver({ activeTopic }: ProblemSolverProps) {
  const { identity } = useInternetIdentity();
  const { mutate: saveProblem, isPending: isSaving } = useSaveProblem();
  const [solveCount, setSolveCount] = useState(0);
  const [solution, setSolution] = useState<React.ReactNode | null>(null);
  const [rawSolution, setRawSolution] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [solved, setSolved] = useState(false);

  // === Depreciation form state ===
  const [depForm, setDepForm] = useState({
    cost: "",
    salvage: "",
    life: "",
    method: "SLM",
    wdvRate: "20",
  });

  // === Goodwill form state ===
  const [gwForm, setGwForm] = useState({
    avgProfit: "",
    normalProfit: "",
    capRate: "",
    years: "",
  });

  // === Sacrifice ratio form state ===
  const [srPartners, setSrPartners] = useState([
    { name: "A", oldRatio: "3", newRatio: "2" },
    { name: "B", oldRatio: "2", newRatio: "2" },
    { name: "C", oldRatio: "0", newRatio: "1" },
  ]);

  // === Balance Sheet form ===
  const [bsForm, setBsForm] = useState({
    assets: "",
    liabilities: "",
    capital: "",
  });

  // === Cash Flow form ===
  const [cfForm, setCfForm] = useState({
    netProfit: "",
    wcChanges: "",
    investing: "",
    financing: "",
    openingCash: "",
  });

  // === Journal Entry form ===
  const [jeForm, setJeForm] = useState({ description: "", amount: "" });

  // === Share Issue form ===
  const [siForm, setSiForm] = useState({
    shares: "",
    faceValue: "",
    issuePrice: "",
  });

  // === NPO form ===
  const [npoForm, setNpoForm] = useState({
    incomeItems: "Subscriptions: 50000\nDonations: 10000\nGrant: 5000",
    expenditureItems: "Salaries: 30000\nRent: 8000\nStationary: 2000",
  });

  // === Appropriation form state ===
  const [appForm, setAppForm] = useState({
    netProfit: "",
    reserve: "",
    iocRate: "6",
  });
  const [appPartners, setAppPartners] = useState<AppropriationPartner[]>([
    {
      name: "A",
      capital: 100000,
      profitRatio: 3,
      salary: 0,
      commission: 0,
      drawings: 10000,
      interestOnDrawings: 0,
    },
    {
      name: "B",
      capital: 80000,
      profitRatio: 2,
      salary: 0,
      commission: 0,
      drawings: 8000,
      interestOnDrawings: 0,
    },
  ]);

  function parseItems(text: string): { label: string; amount: number }[] {
    return text
      .split("\n")
      .map((line) => {
        const parts = line.split(":");
        if (parts.length < 2) return null;
        return {
          label: parts[0].trim(),
          amount: Number.parseFloat(parts[1].trim()) || 0,
        };
      })
      .filter(Boolean) as { label: string; amount: number }[];
  }

  function handleSolve() {
    let node: React.ReactNode = null;
    let jsonIn = "";
    let solStr = "";

    if (activeTopic === "depreciation") {
      const cost = Number.parseFloat(depForm.cost);
      const salvage = Number.parseFloat(depForm.salvage);
      const life = Number.parseInt(depForm.life);
      const wdvRate = Number.parseFloat(depForm.wdvRate);
      if (!cost || !life) {
        toast.error("Please fill all required fields");
        return;
      }
      const rows = solveDepreciation(
        cost,
        salvage || 0,
        life,
        depForm.method as "SLM" | "WDV",
        wdvRate,
      );
      jsonIn = JSON.stringify(depForm);
      solStr = JSON.stringify(rows);
      node = (
        <div>
          <WorkingNote>
            <p>Cost of Asset = ₹{fmt(cost)}</p>
            <p>Residual Value = ₹{fmt(salvage || 0)}</p>
            {depForm.method === "SLM" ? (
              <p>
                Annual Depreciation (SLM) = (Cost - Salvage) / Life = ₹
                {fmt((cost - (salvage || 0)) / life)}
              </p>
            ) : (
              <p>WDV Rate = {wdvRate}% per year</p>
            )}
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Year</th>
                <th>Opening Value (₹)</th>
                <th>Depreciation (₹)</th>
                <th>Closing Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year}>
                  <td>{r.year}</td>
                  <td className="text-right">{fmt(r.opening)}</td>
                  <td className="text-right text-destructive">
                    {fmt(r.depreciation)}
                  </td>
                  <td className="text-right">{fmt(r.closing)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "partnership") {
      // Show Goodwill sub-solver
      const avgProfit = Number.parseFloat(gwForm.avgProfit);
      const normalProfit = Number.parseFloat(gwForm.normalProfit);
      const capRate = Number.parseFloat(gwForm.capRate);
      const years = Number.parseFloat(gwForm.years);
      if (!avgProfit || !capRate || !years) {
        toast.error("Please fill required fields");
        return;
      }
      const res = solveGoodwill(avgProfit, normalProfit || 0, capRate, years);
      jsonIn = JSON.stringify(gwForm);
      solStr = JSON.stringify(res);
      node = (
        <div>
          <WorkingNote>
            <p>Average Profit = ₹{fmt(res.avgProfit)}</p>
            <p>Normal Profit = ₹{fmt(res.normalProfit)}</p>
            <p>
              Super Profit = Avg Profit − Normal Profit = ₹
              {fmt(res.superProfit)}
            </p>
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average Profit</td>
                <td className="text-right">{fmt(res.avgProfit)}</td>
              </tr>
              <tr>
                <td>Less: Normal Profit</td>
                <td className="text-right">({fmt(res.normalProfit)})</td>
              </tr>
              <tr>
                <td>
                  <strong>Super Profit</strong>
                </td>
                <td className="text-right font-bold">{fmt(res.superProfit)}</td>
              </tr>
              <tr>
                <td>
                  Goodwill (Capitalisation Method) = Super Profit × 100 /{" "}
                  {capRate}%
                </td>
                <td className="text-right">{fmt(res.goodwillCap)}</td>
              </tr>
              <tr>
                <td>
                  Goodwill (Years Purchase) = Super Profit × {years} years
                </td>
                <td className="text-right">{fmt(res.goodwillYears)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "ledger") {
      const rows = solveSacrificeRatio(
        srPartners.map((p) => ({
          name: p.name,
          oldRatio: Number.parseFloat(p.oldRatio) || 0,
          newRatio: Number.parseFloat(p.newRatio) || 0,
        })),
      );
      jsonIn = JSON.stringify(srPartners);
      solStr = JSON.stringify(rows);
      node = (
        <div>
          <WorkingNote>
            <p>Sacrifice = Old Ratio − New Ratio (if positive)</p>
            <p>Gain = New Ratio − Old Ratio (if positive)</p>
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Old Ratio</th>
                <th>New Ratio</th>
                <th>Sacrifice</th>
                <th>Gain</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td className="text-center">{r.oldRatio}</td>
                  <td className="text-center">{r.newRatio}</td>
                  <td className="text-center text-destructive">
                    {r.sacrifice > 0 ? r.sacrifice : "—"}
                  </td>
                  <td className="text-center text-green-700">
                    {r.gain > 0 ? r.gain : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "balancesheet") {
      const assets = Number.parseFloat(bsForm.assets);
      const liabilities = Number.parseFloat(bsForm.liabilities);
      const capital = Number.parseFloat(bsForm.capital);
      if (!assets) {
        toast.error("Enter total assets");
        return;
      }
      const res = solveBalanceSheet(assets, liabilities || 0, capital || 0);
      jsonIn = JSON.stringify(bsForm);
      solStr = JSON.stringify(res);
      node = (
        <div>
          <WorkingNote>
            <p>Total Assets = ₹{fmt(res.totalAssets)}</p>
            <p>Total Liabilities + Capital = ₹{fmt(res.totalLiabilities)}</p>
            <p>
              {res.balanced
                ? "✅ Balance Sheet is BALANCED"
                : `⚠️ Difference = ₹${fmt(res.difference)}`}
            </p>
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Liabilities &amp; Capital</th>
                <th>₹</th>
                <th>Assets</th>
                <th>₹</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Capital</td>
                <td className="text-right">{fmt(capital || 0)}</td>
                <td>Total Assets</td>
                <td className="text-right">{fmt(assets)}</td>
              </tr>
              <tr>
                <td>Other Liabilities</td>
                <td className="text-right">{fmt(liabilities || 0)}</td>
                <td />
                <td />
              </tr>
              <tr>
                <td className="font-bold">Total</td>
                <td className="text-right font-bold">
                  {fmt(res.totalLiabilities)}
                </td>
                <td className="font-bold">Total</td>
                <td className="text-right font-bold">{fmt(assets)}</td>
              </tr>
            </tbody>
          </table>
          {!res.balanced && (
            <p className="mt-2 text-sm text-destructive">
              ⚠️ Difference of ₹{fmt(Math.abs(res.difference))} — Please recheck
              your figures.
            </p>
          )}
        </div>
      );
    } else if (activeTopic === "cashflow") {
      const netProfit = Number.parseFloat(cfForm.netProfit);
      const wcChanges = Number.parseFloat(cfForm.wcChanges);
      const investing = Number.parseFloat(cfForm.investing);
      const financing = Number.parseFloat(cfForm.financing);
      const openingCash = Number.parseFloat(cfForm.openingCash) || 0;
      if (!netProfit) {
        toast.error("Enter net profit");
        return;
      }
      const res = solveCashFlow(
        netProfit,
        wcChanges || 0,
        investing || 0,
        financing || 0,
        openingCash,
      );
      jsonIn = JSON.stringify(cfForm);
      solStr = JSON.stringify(res);
      node = (
        <div>
          <WorkingNote>
            <p>Operating Activities = Net Profit + Working Capital Changes</p>
            <p>Net Cash Change = Operating + Investing + Financing</p>
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Net Profit (after tax)</td>
                <td className="text-right">{fmt(netProfit)}</td>
              </tr>
              <tr>
                <td>Add/Less: Working Capital Changes</td>
                <td className="text-right">{fmt(wcChanges || 0)}</td>
              </tr>
              <tr>
                <td className="font-bold">A. Cash from Operating Activities</td>
                <td className="text-right font-bold">
                  {fmt(res.operatingActivities)}
                </td>
              </tr>
              <tr>
                <td>B. Cash from/(used in) Investing Activities</td>
                <td className="text-right">{fmt(investing || 0)}</td>
              </tr>
              <tr>
                <td>C. Cash from/(used in) Financing Activities</td>
                <td className="text-right">{fmt(financing || 0)}</td>
              </tr>
              <tr>
                <td className="font-bold">
                  Net Increase/(Decrease) in Cash (A+B+C)
                </td>
                <td className="text-right font-bold">{fmt(res.netChange)}</td>
              </tr>
              <tr>
                <td>Opening Cash Balance</td>
                <td className="text-right">{fmt(openingCash)}</td>
              </tr>
              <tr>
                <td className="font-bold">Closing Cash Balance</td>
                <td className="text-right font-bold">{fmt(res.closingCash)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "journal") {
      if (!jeForm.description || !jeForm.amount) {
        toast.error("Enter description and amount");
        return;
      }
      const entries = solveJournalEntry(
        jeForm.description,
        Number.parseFloat(jeForm.amount),
      );
      jsonIn = JSON.stringify(jeForm);
      solStr = JSON.stringify(entries);
      node = (
        <div>
          <WorkingNote>
            <p>
              Identify the accounts involved and their nature
              (Real/Personal/Nominal).
            </p>
            <p>Apply the Golden Rules of Accounting.</p>
          </WorkingNote>
          <table className="accounting-table mt-4">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Dr (₹)</th>
                <th>Cr (₹)</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.particulars}>
                  <td>
                    {e.particulars}
                    {e.narration && (
                      <div className="text-xs text-muted-foreground italic mt-0.5">
                        {e.narration}
                      </div>
                    )}
                  </td>
                  <td className="text-right">
                    {e.debit === "-" ? "" : `₹${fmt(e.debit as number)}`}
                  </td>
                  <td className="text-right">
                    {e.credit === "-" ? "" : `₹${fmt(e.credit as number)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "company") {
      const shares = Number.parseFloat(siForm.shares);
      const faceValue = Number.parseFloat(siForm.faceValue);
      const issuePrice = Number.parseFloat(siForm.issuePrice);
      if (!shares || !faceValue || !issuePrice) {
        toast.error("Fill all fields");
        return;
      }
      const entries = solveShareIssue(shares, faceValue, issuePrice);
      jsonIn = JSON.stringify(siForm);
      solStr = JSON.stringify(entries);
      const stages = [...new Set(entries.map((e) => e.stage))];
      node = (
        <div>
          <WorkingNote>
            <p>Total Shares = {shares.toLocaleString("en-IN")}</p>
            <p>
              Face Value = ₹{fmt(faceValue)} | Issue Price = ₹{fmt(issuePrice)}
            </p>
            {issuePrice > faceValue && (
              <p>Premium per share = ₹{fmt(issuePrice - faceValue)}</p>
            )}
          </WorkingNote>
          {stages.map((stage) => (
            <div key={stage} className="mt-4">
              <h4 className="text-sm font-semibold text-navy mb-1">{stage}</h4>
              <table className="accounting-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    <th>Dr (₹)</th>
                    <th>Cr (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .filter((e) => e.stage === stage)
                    .map((e) => (
                      <tr key={e.particulars}>
                        <td>{e.particulars}</td>
                        <td className="text-right">
                          {e.debit === "-" ? "" : `₹${fmt(e.debit as number)}`}
                        </td>
                        <td className="text-right">
                          {e.credit === "-"
                            ? ""
                            : `₹${fmt(e.credit as number)}`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      );
    } else if (activeTopic === "npo") {
      const incomeItems = parseItems(npoForm.incomeItems);
      const expenditureItems = parseItems(npoForm.expenditureItems);
      const res = solveNPO(incomeItems, expenditureItems);
      jsonIn = JSON.stringify(npoForm);
      solStr = JSON.stringify(res);
      node = (
        <div>
          <WorkingNote>
            <p>Total Income = ₹{fmt(res.totalIncome)}</p>
            <p>Total Expenditure = ₹{fmt(res.totalExpenditure)}</p>
            {res.surplus > 0 && (
              <p className="text-green-700">Surplus = ₹{fmt(res.surplus)}</p>
            )}
            {res.deficit > 0 && (
              <p className="text-destructive">Deficit = ₹{fmt(res.deficit)}</p>
            )}
          </WorkingNote>
          <h4 className="text-sm font-semibold text-navy mt-4 mb-1">
            Income &amp; Expenditure Account
          </h4>
          <table className="accounting-table">
            <thead>
              <tr>
                <th>Expenditure</th>
                <th>₹</th>
                <th>Income</th>
                <th>₹</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const maxLen = Math.max(
                  incomeItems.length,
                  expenditureItems.length,
                );
                return maxLen > 0
                  ? Array.from({ length: maxLen }).map((_, ri) => {
                      const expItem = expenditureItems[ri];
                      const incItem = incomeItems[ri];
                      const rowKey = `${expItem?.label ?? "exp"}-${incItem?.label ?? "inc"}-${ri}`;
                      return (
                        <tr key={rowKey}>
                          <td>{expItem?.label ?? ""}</td>
                          <td className="text-right">
                            {expItem ? fmt(expItem.amount) : ""}
                          </td>
                          <td>{incItem?.label ?? ""}</td>
                          <td className="text-right">
                            {incItem ? fmt(incItem.amount) : ""}
                          </td>
                        </tr>
                      );
                    })
                  : null;
              })()}
              {res.surplus > 0 && (
                <tr>
                  <td className="font-bold text-green-700">
                    Surplus (Excess of Income)
                  </td>
                  <td className="text-right font-bold text-green-700">
                    {fmt(res.surplus)}
                  </td>
                  <td />
                  <td />
                </tr>
              )}
              {res.deficit > 0 && (
                <tr>
                  <td />
                  <td />
                  <td className="font-bold text-destructive">
                    Deficit (Excess of Expenditure)
                  </td>
                  <td className="text-right font-bold text-destructive">
                    {fmt(res.deficit)}
                  </td>
                </tr>
              )}
              <tr>
                <td className="font-bold">Total</td>
                <td className="text-right font-bold">
                  {fmt(Math.max(res.totalIncome, res.totalExpenditure))}
                </td>
                <td className="font-bold">Total</td>
                <td className="text-right font-bold">
                  {fmt(Math.max(res.totalIncome, res.totalExpenditure))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (activeTopic === "appropriation") {
      const netProfit = Number.parseFloat(appForm.netProfit);
      const reserve = Number.parseFloat(appForm.reserve) || 0;
      const iocRate = Number.parseFloat(appForm.iocRate) || 6;
      if (!netProfit) {
        toast.error("Enter Net Profit");
        return;
      }
      if (appPartners.length < 1) {
        toast.error("Add at least one partner");
        return;
      }
      const res = solveAppropriation(netProfit, reserve, iocRate, appPartners);
      jsonIn = JSON.stringify({ appForm, appPartners });
      solStr = JSON.stringify(res);

      // Build appropriation account T-format totals
      const drTotal =
        reserve +
        res.totalInterestOnCapital +
        res.totalSalary +
        res.totalCommission +
        res.partners.reduce((s, p) => s + Math.max(p.shareOfProfit, 0), 0);
      const crTotal = netProfit;

      node = (
        <div className="space-y-6">
          {/* Working Notes */}
          <WorkingNote>
            <p>Net Profit (b/d) = ₹{fmt(netProfit)}</p>
            {reserve > 0 && (
              <p>Transfer to General Reserve = ₹{fmt(reserve)}</p>
            )}
            <p>Interest on Capital Rate = {iocRate}%</p>
            {res.partners.map((p) => (
              <p key={p.name}>
                IOC ({p.name}) = ₹{fmt(p.openingCapital)} × {iocRate}% = ₹
                {fmt(p.interestOnCapital)}
              </p>
            ))}
            <p>Total IOC = ₹{fmt(res.totalInterestOnCapital)}</p>
            {res.totalSalary > 0 && (
              <p>Total Partner Salary = ₹{fmt(res.totalSalary)}</p>
            )}
            {res.totalCommission > 0 && (
              <p>Total Commission = ₹{fmt(res.totalCommission)}</p>
            )}
            <p>
              Distributable Profit = {fmt(netProfit)} − {fmt(reserve)} −{" "}
              {fmt(res.totalInterestOnCapital)}
              {res.totalSalary > 0 ? ` − ${fmt(res.totalSalary)}` : ""}
              {res.totalCommission > 0 ? ` − ${fmt(res.totalCommission)}` : ""}{" "}
              = ₹{fmt(res.distributableProfit)}
            </p>
            {res.partners.map((p, i) => (
              <p key={p.name}>
                {p.name}&apos;s Share = ₹{fmt(res.distributableProfit)} ×{" "}
                {appPartners[i].profitRatio}/{res.totalRatio} = ₹
                {fmt(p.shareOfProfit)}
              </p>
            ))}
            {res.deficiency && (
              <p className="text-destructive font-semibold">
                ⚠️ Deficiency: Profit insufficient to cover all charges. Loss
                shared in ratio.
              </p>
            )}
          </WorkingNote>

          {/* Table 1: P&L Appropriation Account */}
          <div>
            <h4 className="text-sm font-bold text-navy mb-2">
              Profit &amp; Loss Appropriation Account
            </h4>
            <table className="accounting-table">
              <thead>
                <tr>
                  <th>Dr — Particulars</th>
                  <th>₹</th>
                  <th>Cr — Particulars</th>
                  <th>₹</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Reserve | Net Profit b/d */}
                <tr>
                  <td>Transfer to General Reserve</td>
                  <td className="text-right">{fmt(reserve)}</td>
                  <td>Net Profit b/d</td>
                  <td className="text-right">{fmt(netProfit)}</td>
                </tr>
                {/* IOC rows */}
                {res.partners.map((p) => (
                  <tr key={`ioc-${p.name}`}>
                    <td>Interest on Capital — {p.name}</td>
                    <td className="text-right">{fmt(p.interestOnCapital)}</td>
                    <td />
                    <td />
                  </tr>
                ))}
                {/* Salary rows */}
                {res.partners
                  .filter((p) => p.salary > 0)
                  .map((p) => (
                    <tr key={`sal-${p.name}`}>
                      <td>Partner Salary — {p.name}</td>
                      <td className="text-right">{fmt(p.salary)}</td>
                      <td />
                      <td />
                    </tr>
                  ))}
                {/* Commission rows */}
                {res.partners
                  .filter((p) => p.commission > 0)
                  .map((p) => (
                    <tr key={`com-${p.name}`}>
                      <td>Partner Commission — {p.name}</td>
                      <td className="text-right">{fmt(p.commission)}</td>
                      <td />
                      <td />
                    </tr>
                  ))}
                {/* Share of profit rows */}
                {res.partners.map((p) => (
                  <tr key={`sop-${p.name}`}>
                    <td>Share of Profit — {p.name}</td>
                    <td className="text-right">{fmt(p.shareOfProfit)}</td>
                    <td />
                    <td />
                  </tr>
                ))}
                {/* Totals */}
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="text-right font-bold">
                    {fmt(Math.max(drTotal, crTotal))}
                  </td>
                  <td className="font-bold">Total</td>
                  <td className="text-right font-bold">
                    {fmt(Math.max(drTotal, crTotal))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Partners' Capital Accounts */}
          <div>
            <h4 className="text-sm font-bold text-navy mb-2">
              Partners&apos; Capital Accounts (Columnar)
            </h4>
            <div className="overflow-x-auto">
              <table className="accounting-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    {res.partners.map((p) => (
                      <th key={`dr-hdr-${p.name}`} className="text-center">
                        {p.name} (Dr) ₹
                      </th>
                    ))}
                    <th className="border-l-2 border-border">Particulars</th>
                    {res.partners.map((p) => (
                      <th key={`cr-hdr-${p.name}`} className="text-center">
                        {p.name} (Cr) ₹
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Dr: Drawings */}
                  <tr>
                    <td>Drawings</td>
                    {res.partners.map((p) => (
                      <td key={`dr-draw-${p.name}`} className="text-right">
                        {fmt(p.drawings)}
                      </td>
                    ))}
                    <td className="border-l-2 border-border">
                      Balance b/d (Opening Capital)
                    </td>
                    {res.partners.map((p) => (
                      <td key={`cr-bal-${p.name}`} className="text-right">
                        {fmt(p.openingCapital)}
                      </td>
                    ))}
                  </tr>
                  {/* Dr: Interest on Drawings */}
                  <tr>
                    <td>Interest on Drawings</td>
                    {res.partners.map((p) => (
                      <td key={`dr-iod-${p.name}`} className="text-right">
                        {fmt(p.interestOnDrawings)}
                      </td>
                    ))}
                    <td className="border-l-2 border-border">
                      Interest on Capital
                    </td>
                    {res.partners.map((p) => (
                      <td key={`cr-ioc-${p.name}`} className="text-right">
                        {fmt(p.interestOnCapital)}
                      </td>
                    ))}
                  </tr>
                  {/* Cr: Salary (if any) */}
                  {res.partners.some((p) => p.salary > 0) && (
                    <tr>
                      <td />
                      {res.partners.map((p) => (
                        <td key={`dr-sal-${p.name}`} />
                      ))}
                      <td className="border-l-2 border-border">Salary</td>
                      {res.partners.map((p) => (
                        <td key={`cr-sal-${p.name}`} className="text-right">
                          {p.salary > 0 ? fmt(p.salary) : "—"}
                        </td>
                      ))}
                    </tr>
                  )}
                  {/* Cr: Commission (if any) */}
                  {res.partners.some((p) => p.commission > 0) && (
                    <tr>
                      <td />
                      {res.partners.map((p) => (
                        <td key={`dr-com-${p.name}`} />
                      ))}
                      <td className="border-l-2 border-border">Commission</td>
                      {res.partners.map((p) => (
                        <td key={`cr-com-${p.name}`} className="text-right">
                          {p.commission > 0 ? fmt(p.commission) : "—"}
                        </td>
                      ))}
                    </tr>
                  )}
                  {/* Cr: Share of Profit */}
                  <tr>
                    <td />
                    {res.partners.map((p) => (
                      <td key={`dr-sop-${p.name}`} />
                    ))}
                    <td className="border-l-2 border-border">
                      Share of Profit
                    </td>
                    {res.partners.map((p) => (
                      <td key={`cr-sop-${p.name}`} className="text-right">
                        {fmt(p.shareOfProfit)}
                      </td>
                    ))}
                  </tr>
                  {/* Dr: Balance c/d */}
                  <tr>
                    <td>Balance c/d (Closing Capital)</td>
                    {res.partners.map((p) => (
                      <td
                        key={`dr-clos-${p.name}`}
                        className="text-right font-semibold"
                      >
                        {fmt(p.closingCapital)}
                      </td>
                    ))}
                    <td className="border-l-2 border-border" />
                    {res.partners.map((p) => (
                      <td key={`cr-clos-${p.name}`} />
                    ))}
                  </tr>
                  {/* Totals */}
                  <tr>
                    <td className="font-bold">Total</td>
                    {res.partners.map((p) => {
                      const drSide =
                        p.drawings + p.interestOnDrawings + p.closingCapital;
                      return (
                        <td
                          key={`tot-dr-${p.name}`}
                          className="text-right font-bold"
                        >
                          {fmt(drSide)}
                        </td>
                      );
                    })}
                    <td className="border-l-2 border-border font-bold">
                      Total
                    </td>
                    {res.partners.map((p) => {
                      const crSide =
                        p.openingCapital +
                        p.interestOnCapital +
                        p.salary +
                        p.commission +
                        p.shareOfProfit;
                      return (
                        <td
                          key={`tot-cr-${p.name}`}
                          className="text-right font-bold"
                        >
                          {fmt(crSide)}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    setSolution(node);
    setRawSolution(solStr);
    setRawInput(jsonIn);
    setSolveCount((c) => c + 1);
    setSolved(true);
  }

  function handleSave() {
    const typeMap: Record<string, ProblemType> = {
      journal: ProblemType.journalEntry,
      cashflow: ProblemType.cashFlowStatement,
      balancesheet: ProblemType.balanceSheet,
      ledger: ProblemType.ledgerPostings,
      depreciation: ProblemType.incomeStatement,
      partnership: ProblemType.trialBalance,
      npo: ProblemType.incomeStatement,
      company: ProblemType.journalEntry,
      appropriation: ProblemType.trialBalance,
    };
    const type = typeMap[activeTopic] ?? ProblemType.journalEntry;
    saveProblem(
      { type, jsonInput: rawInput, solution: rawSolution },
      {
        onSuccess: () => toast.success("Saved to your history! ✅"),
        onError: () => toast.error("Failed to save. Please try again."),
      },
    );
  }

  const topicLabel: Record<string, string> = {
    partnership: "Partnership — Goodwill Calculation",
    depreciation: "Depreciation Schedule",
    npo: "NPO Income & Expenditure",
    company: "Share Issue Journal Entries",
    journal: "Journal Entry",
    cashflow: "Cash Flow Statement",
    balancesheet: "Balance Sheet",
    ledger: "Sacrifice / Gain Ratio",
    appropriation: "Appropriation A/c & Partners\u2019 Capital A/c",
  };

  return (
    <div className="space-y-4">
      {/* Form Panel */}
      <div
        className="bg-card rounded-xl border border-border shadow-xs p-5"
        data-ocid="solver.panel"
      >
        <h2 className="font-display text-lg font-bold text-navy mb-1">
          {topicLabel[activeTopic] ?? "Problem Solver"}
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          সমস্যার তথ্য প্রবেশ করুন
        </p>

        <div className="space-y-4">
          {activeTopic === "depreciation" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Cost of Asset (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 100000"
                  value={depForm.cost}
                  onChange={(e) =>
                    setDepForm((f) => ({ ...f, cost: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Salvage / Residual Value (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 10000"
                  value={depForm.salvage}
                  onChange={(e) =>
                    setDepForm((f) => ({ ...f, salvage: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Useful Life (Years) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 5"
                  value={depForm.life}
                  onChange={(e) =>
                    setDepForm((f) => ({ ...f, life: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Method</Label>
                <Select
                  value={depForm.method}
                  onValueChange={(v) =>
                    setDepForm((f) => ({ ...f, method: v }))
                  }
                >
                  <SelectTrigger data-ocid="solver.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SLM">Straight Line (SLM)</SelectItem>
                    <SelectItem value="WDV">
                      Written Down Value (WDV)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {depForm.method === "WDV" && (
                <div>
                  <Label className="text-xs text-muted-foreground">
                    WDV Rate (%)
                  </Label>
                  <Input
                    data-ocid="solver.input"
                    placeholder="e.g. 20"
                    value={depForm.wdvRate}
                    onChange={(e) =>
                      setDepForm((f) => ({ ...f, wdvRate: e.target.value }))
                    }
                  />
                </div>
              )}
            </div>
          )}

          {activeTopic === "partnership" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Average Profit (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 80000"
                  value={gwForm.avgProfit}
                  onChange={(e) =>
                    setGwForm((f) => ({ ...f, avgProfit: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Normal Profit (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 50000"
                  value={gwForm.normalProfit}
                  onChange={(e) =>
                    setGwForm((f) => ({ ...f, normalProfit: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Capitalisation Rate (%) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 10"
                  value={gwForm.capRate}
                  onChange={(e) =>
                    setGwForm((f) => ({ ...f, capRate: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Years of Purchase *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 3"
                  value={gwForm.years}
                  onChange={(e) =>
                    setGwForm((f) => ({ ...f, years: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "ledger" && (
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground">
                Partners (Name, Old Ratio, New Ratio)
              </Label>
              {srPartners.map((p, i) => (
                <div
                  key={`partner-${i}-${p.name}`}
                  className="grid grid-cols-3 gap-2"
                >
                  <Input
                    data-ocid={"solver.input"}
                    placeholder="Name"
                    value={p.name}
                    onChange={(e) =>
                      setSrPartners((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, name: e.target.value } : x,
                        ),
                      )
                    }
                  />
                  <Input
                    data-ocid={"solver.input"}
                    placeholder="Old Ratio"
                    value={p.oldRatio}
                    onChange={(e) =>
                      setSrPartners((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, oldRatio: e.target.value } : x,
                        ),
                      )
                    }
                  />
                  <Input
                    data-ocid={"solver.input"}
                    placeholder="New Ratio"
                    value={p.newRatio}
                    onChange={(e) =>
                      setSrPartners((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, newRatio: e.target.value } : x,
                        ),
                      )
                    }
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSrPartners((p) => [
                    ...p,
                    { name: "", oldRatio: "0", newRatio: "0" },
                  ])
                }
                className="text-navy border-navy/20"
              >
                + Add Partner
              </Button>
            </div>
          )}

          {activeTopic === "balancesheet" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Total Assets (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 500000"
                  value={bsForm.assets}
                  onChange={(e) =>
                    setBsForm((f) => ({ ...f, assets: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Other Liabilities (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 100000"
                  value={bsForm.liabilities}
                  onChange={(e) =>
                    setBsForm((f) => ({ ...f, liabilities: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Capital (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 400000"
                  value={bsForm.capital}
                  onChange={(e) =>
                    setBsForm((f) => ({ ...f, capital: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "cashflow" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Net Profit (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 150000"
                  value={cfForm.netProfit}
                  onChange={(e) =>
                    setCfForm((f) => ({ ...f, netProfit: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Working Capital Changes (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="+ or - value"
                  value={cfForm.wcChanges}
                  onChange={(e) =>
                    setCfForm((f) => ({ ...f, wcChanges: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Investing Activities (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. -50000"
                  value={cfForm.investing}
                  onChange={(e) =>
                    setCfForm((f) => ({ ...f, investing: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Financing Activities (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 20000"
                  value={cfForm.financing}
                  onChange={(e) =>
                    setCfForm((f) => ({ ...f, financing: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Opening Cash Balance (₹)
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 10000"
                  value={cfForm.openingCash}
                  onChange={(e) =>
                    setCfForm((f) => ({ ...f, openingCash: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "journal" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Transaction Description *
                </Label>
                <Textarea
                  data-ocid="solver.textarea"
                  placeholder="e.g. Cash purchase of goods, Credit sale of goods, Salary paid..."
                  rows={3}
                  value={jeForm.description}
                  onChange={(e) =>
                    setJeForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Amount (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 25000"
                  value={jeForm.amount}
                  onChange={(e) =>
                    setJeForm((f) => ({ ...f, amount: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "company" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Number of Shares *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 10000"
                  value={siForm.shares}
                  onChange={(e) =>
                    setSiForm((f) => ({ ...f, shares: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Face Value per Share (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 10"
                  value={siForm.faceValue}
                  onChange={(e) =>
                    setSiForm((f) => ({ ...f, faceValue: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Issue Price per Share (₹) *
                </Label>
                <Input
                  data-ocid="solver.input"
                  placeholder="e.g. 12"
                  value={siForm.issuePrice}
                  onChange={(e) =>
                    setSiForm((f) => ({ ...f, issuePrice: e.target.value }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "npo" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  Income Items (Label: Amount, one per line)
                </Label>
                <Textarea
                  data-ocid="solver.textarea"
                  rows={5}
                  value={npoForm.incomeItems}
                  onChange={(e) =>
                    setNpoForm((f) => ({ ...f, incomeItems: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  Expenditure Items (Label: Amount)
                </Label>
                <Textarea
                  data-ocid="solver.textarea"
                  rows={5}
                  value={npoForm.expenditureItems}
                  onChange={(e) =>
                    setNpoForm((f) => ({
                      ...f,
                      expenditureItems: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          {activeTopic === "appropriation" && (
            <div className="space-y-4">
              {/* Top inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Net Profit (₹) *
                  </Label>
                  <Input
                    data-ocid="appropriation.input"
                    placeholder="e.g. 120000"
                    value={appForm.netProfit}
                    onChange={(e) =>
                      setAppForm((f) => ({ ...f, netProfit: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Transfer to Reserve (₹)
                  </Label>
                  <Input
                    data-ocid="appropriation.input"
                    placeholder="e.g. 10000"
                    value={appForm.reserve}
                    onChange={(e) =>
                      setAppForm((f) => ({ ...f, reserve: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Interest on Capital Rate (%)
                  </Label>
                  <Input
                    data-ocid="appropriation.input"
                    placeholder="e.g. 6"
                    value={appForm.iocRate}
                    onChange={(e) =>
                      setAppForm((f) => ({ ...f, iocRate: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Partners table */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Partners&apos; Details
                </Label>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-2 py-1.5 text-left font-semibold">
                          Name
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Opening Capital (₹)
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Profit Ratio
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Salary (₹)
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Commission (₹)
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Drawings (₹)
                        </th>
                        <th className="px-2 py-1.5 text-right font-semibold">
                          Int. on Drawings (₹)
                        </th>
                        <th className="px-2 py-1.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {appPartners.map((p, i) => (
                        <tr
                          key={`app-partner-${i}-${p.name}`}
                          className="border-t border-border"
                        >
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs"
                              value={p.name}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? { ...x, name: e.target.value }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.capital}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? {
                                          ...x,
                                          capital: Number(e.target.value),
                                        }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.profitRatio}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? {
                                          ...x,
                                          profitRatio: Number(e.target.value),
                                        }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.salary}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? { ...x, salary: Number(e.target.value) }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.commission}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? {
                                          ...x,
                                          commission: Number(e.target.value),
                                        }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.drawings}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? {
                                          ...x,
                                          drawings: Number(e.target.value),
                                        }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Input
                              data-ocid={`appropriation.input.${i + 1}`}
                              className="h-7 text-xs text-right"
                              type="number"
                              value={p.interestOnDrawings}
                              onChange={(e) =>
                                setAppPartners((prev) =>
                                  prev.map((x, j) =>
                                    j === i
                                      ? {
                                          ...x,
                                          interestOnDrawings: Number(
                                            e.target.value,
                                          ),
                                        }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              data-ocid={`appropriation.delete_button.${i + 1}`}
                              onClick={() =>
                                setAppPartners((prev) =>
                                  prev.filter((_, j) => j !== i),
                                )
                              }
                            >
                              ×
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="appropriation.button"
                  onClick={() =>
                    setAppPartners((prev) => [
                      ...prev,
                      {
                        name: "",
                        capital: 0,
                        profitRatio: 1,
                        salary: 0,
                        commission: 0,
                        drawings: 0,
                        interestOnDrawings: 0,
                      },
                    ])
                  }
                  className="mt-2 text-navy border-navy/20"
                >
                  + Add Partner
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={handleSolve}
          data-ocid="solver.submit_button"
          className="mt-5 w-full bg-navy text-white hover:bg-navy/90 font-semibold"
        >
          Solve Problem → সমাধান করুন
        </Button>
      </div>

      {/* Solution Panel */}
      <AnimatePresence>
        {solved && solution && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="bg-card rounded-xl border border-border shadow-xs p-5"
            data-ocid="solution.panel"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-display font-bold text-navy text-base">
                  Solution (সমাধান)
                </h3>
              </div>
              {identity && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSave}
                  disabled={isSaving}
                  data-ocid="solution.save_button"
                  className="border-gold text-gold hover:bg-gold/10 gap-1.5"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  Save
                </Button>
              )}
            </div>

            <div className="overflow-x-auto">{solution}</div>

            <div className="mt-5 p-3 rounded-lg bg-navy/5 border border-navy/10 text-center">
              <p className="text-sm font-medium text-navy">
                {pickEncouraging(solveCount - 1)}
              </p>
              {!identity && (
                <p className="text-xs text-muted-foreground mt-1">
                  Login to save this solution to your history.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorkingNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary/60 border border-border rounded-lg p-4 text-sm text-foreground space-y-1">
      <p className="text-xs font-bold text-navy uppercase tracking-wide mb-2">
        Working Notes (কার্যকরী নোট)
      </p>
      {children}
    </div>
  );
}
