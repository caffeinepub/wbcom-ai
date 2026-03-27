# Vidya Setu AI — Law Section Professional Upgrade

## Current State
The Law section (LawPage.tsx + lawSolver.ts) has:
- Search bar for law sections by keyword/section number
- Popular Acts quick chips
- Result display with sectionText, explanation, examples, landmark cases, exceptions, overriding effect, cross-laws, related sections
- Tabs: Search, Case Finder (landmark cases search), IPC vs BNS Comparison table, Legal Glossary
- Language toggle (Bengali/English)
- normalizeEntry() for schema compatibility
- Standard app styling (dark/light mode, glassmorphism)

## Requested Changes (Diff)

### Add
- Dark navy (#0a1628) + gold (#c9a84c) color scheme throughout the Law section only
- Official seal/badge header design (court emblem style using SVG or CSS)
- Slide-in animation for search result cards (CSS keyframes or framer-style)
- Filter system: filter by Act (IPC/BNS/CrPC/IT Act/Contract Act/HMA/Constitution), Category (Criminal/Civil/Constitutional), Punishment type (Imprisonment/Fine/Both/Death)
- Advanced search (keyword, section number, topic) — enhance existing search
- Recently Viewed: localStorage-based, last 10 sections viewed, shown in sidebar/panel
- Share button on each section card — copies URL with section ID as query param (e.g. ?law=IPC_302)
- Export to PDF button on each section — uses browser print/window.print() with a styled printable div for that section
- Punishment Severity Indicator badge: Minor/Moderate/Severe/Capital — map based on punishment data
- Legal disclaimer footer on every section card with link to indiacode.nic.in
- Two-column layout for section detail: left = original section text (English), right = Bengali explanation

### Modify
- LawPage.tsx: Full visual overhaul with navy/gold theme, new layout, new components integrated
- Section result card: redesign as official seal-style card with severity badge, share button, export button, recently viewed tracking
- IPC vs BNS Comparison: already exists, keep but restyle in navy/gold
- Case Finder: already exists, keep but restyle
- Legal Glossary: already exists, keep but restyle

### Remove
- Nothing removed; all existing features preserved

## Implementation Plan
1. Redesign LawPage.tsx with dark navy + gold CSS custom properties scoped to the law section wrapper
2. Add official seal SVG header badge and legal-themed typography
3. Add CSS slide-in animation for result cards (translateY + opacity keyframe)
4. Add filter bar component (Act, Category, Punishment type dropdowns/chips) — filter operates on search results
5. Enhance search to explicitly support keyword, section number, and topic patterns
6. Add Recently Viewed panel using localStorage (track last 10 viewed section IDs)
7. Add Share button (copies window.location + ?section= param to clipboard)
8. Add Export PDF button (opens print dialog with styled hidden printable div)
9. Add PunishmentSeverityBadge component — map section data to Minor/Moderate/Severe/Capital
10. Add two-column layout in result detail view (original text | Bengali explanation)
11. Add legal disclaimer footer with indiacode.nic.in link on each section card
12. Restyle existing tabs (Case Finder, IPC vs BNS, Glossary) in navy/gold theme
