# Vidya Setu AI

## Current State
Full educational platform with Law section (lawSolver.ts, 8124 lines), navbar with hamburger, dark/light theme toggle, font size controls in AppContext, PDF upload in notes. Recent build adding large law database failed.

## Requested Changes (Diff)

### Add
- Additional IPC sections: 1-5 (preliminary), 34 (acts done by several persons), 96-106 (private defence), 107-120 (abetment), 121-130 (offences against state), 141-160 (unlawful assembly), 299-304 (culpable homicide), 319-338 (hurt), 359-374 (kidnapping), 375-377 (sexual offences), 380-388 (property), 415-424 (cheating/mischief), 441-462 (house trespass/forgery), 493-498A (marriage), 499-502 (defamation)
- BNS key sections: 2-20 (definitions, punishments, general exceptions), 45-56 (hurt), 57-63 (grievous hurt), 84-102 (culpable homicide/murder alt sections), 115-127 (kidnapping), 155-176 (sexual offences updates), 303-320 (property), 318-330 (cheating)
- Contract Act key sections: 2 (definitions), 10-11 (valid contract), 13-19 (consent), 23-30 (object/consideration), 37-67 (performance), 73-75 (breach/damages), 148-181 (bailment), 182-238 (agency)
- Constitution key articles: 12-13, 17-18, 19-22, 23-24, 25-30, 32-35, 44, 51A, 72-74, 123, 141, 226, 368

### Modify
- PDF upload size limit: increase from current 2MB/5MB to 10MB per file, 50MB total in AdminPage
- Ensure font size CSS variable is actually applied to `html` element (currently on `body` but `--base-font-size` may not cascade)
- Color contrast: ensure all text on cards, badges, inputs have sufficient contrast in both dark and light modes
- Light mode: ensure card backgrounds, input backgrounds, text colors all visible

### Remove
- Nothing

## Implementation Plan
1. In AdminPage.tsx: increase PDF/image size limits to 10MB per file, 50MB total
2. In index.css: apply font-size on `html` element to ensure full cascade
3. Add ~60 new law entries to lawSolver.ts spanning IPC, BNS, Contract Act, Constitution
4. Light mode contrast: review card/input/text colors in LawPage, HomePage, PremiumNotesPage
5. Validate and deploy
