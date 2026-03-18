# WBCom AI

## Current State
App has 9 accounting topics with client-side solvers. Depreciation topic exists with basic SLM/WDV schedule. Other topics (partnership, balance sheet, cash flow, journal, company, NPO, appropriation) have basic solvers. User reports advanced math problems are not being solved properly.

## Requested Changes (Diff)

### Add
- Advanced Depreciation solver: Asset Account format (Machinery A/c + Provision for Depreciation A/c + Depreciation A/c) as used in WBCHSE exams
- Depreciation: Sale/Disposal of asset mid-year calculation
- Partnership: Revaluation of assets scenario (Revaluation A/c format)
- Partnership: Retirement/Death of partner with goodwill adjustment
- Company Accounts: Share forfeiture and reissue
- Enhanced NPO: Receipt & Payment Account format alongside I&E

### Modify
- Depreciation form: Add "Format" selector (Schedule / Asset Account Format)
- Depreciation form: Add sale of asset option with sale price and year of sale
- Partnership form: Add sub-type selector (Goodwill, Sacrifice Ratio, Revaluation, Retirement)
- solver.ts: Add solveDepreciationAccounts(), solveRevaluation(), solveRetirement(), solveShareForfeiture()
- ProblemSolver.tsx: Update forms to show more advanced scenarios with proper WBCHSE format output

### Remove
- Nothing

## Implementation Plan
1. Update solver.ts with new advanced solver functions
2. Update ProblemSolver.tsx depreciation section to support Account Format and Sale scenarios
3. Update Partnership section to support Revaluation and Retirement sub-types
4. Update Company section to support Share Forfeiture and Reissue
5. Ensure all outputs are in proper WBCHSE exam table/account format
