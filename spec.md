# Vidya Setu AI

## Current State
App has Science, Arts, Commerce, Law sections with subject-specific solvers. Each solver lets users type questions and get detailed answers. NEET section was requested but failed to build previously.

## Requested Changes (Diff)

### Add
- NEET Preparation section with 3 subjects: Physics, Chemistry, Biology (NCERT syllabus)
- NeetHomePage.tsx: subject selection cards (Physics, Chemistry, Biology) with class/topic selection
- NeetSolver.tsx: question input + detailed answer display (bilingual English + Bengali)
  - When user types any NEET question/topic, gives detailed explanation with:
    - Concept explanation (English + Bengali)
    - Step-by-step solution (for numericals)
    - Key points / important formulas
    - Example problems
  - Answer type selector: Concept, Numerical, MCQ Practice
- Add NEET to Navbar (logged-in users only)
- Add NEET to HomePage Quick Access buttons
- Add NEET page type to App.tsx routing

### Modify
- App.tsx: add `neet` and `neetSolver` page types, routing, state
- Navbar.tsx: add NEET nav item (FlaskConical icon, teal color)
- HomePage.tsx: add NEET button to QUICK_ACCESS array

### Remove
- Nothing removed

## Implementation Plan
1. Create NeetHomePage.tsx with Physics/Chemistry/Biology subject cards
2. Create NeetSolver.tsx with question input and detailed bilingual answer generation
3. Update App.tsx with neet routing and state
4. Update Navbar.tsx with NEET nav item
5. Update HomePage.tsx with NEET quick access button
