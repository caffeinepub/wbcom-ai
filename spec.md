# Vidya Setu AI

## Current State
Comprehensive educational platform with NEET, CA, CMA, Law, Arts, Commerce, Science sections. Law section has professional UI with filter system but filters only hide/show the current single search result instead of browsing the database. Logo (vidya-setu-logo-transparent.dim_400x200.png) file exists but is not displaying due to missing CSS animation class. No SSC Job Preparation section exists.

## Requested Changes (Diff)

### Add
- SSC Job Preparation section: SSC CGL, CHSL, MTS, GD Constable exam prep with subjects: General Knowledge (History, Geography, Polity, Economy, Science), Quantitative Aptitude (Math formulas, shortcuts, practice), English (Grammar, Vocabulary, Comprehension), General Reasoning (Logical, Verbal, Non-verbal), Current Affairs. Each subject has chapter-wise notes, MCQ practice, previous year questions, and question input for detailed bilingual answers. Add SSC to navbar and home page Quick Access.

### Modify
- Logo fix: Remove `animate-logo-float` class from logo in Navbar.tsx and LoginPage.tsx (class doesn't exist in CSS), use plain img tag styling instead
- Law filter fix: When any filter is set (not "All"), show a browsable list of all matching database entries instead of just filtering the current single result. Filters should query the LAW_DATABASE and show matching sections as cards. When all filters are "All", show normal search interface.

### Remove
- Nothing

## Implementation Plan
1. Fix logo in Navbar.tsx and LoginPage.tsx - remove animate-logo-float class
2. Fix Law filter in LawPage.tsx - when filter != 'All', show LAW_DATABASE entries filtered by act/category/punishment as a browsable list
3. Create SSCPage.tsx - full SSC job prep section with subjects, chapters, Q&A
4. Add SSC route in App.tsx
5. Add SSC to Navbar.tsx and HomePage.tsx Quick Access buttons
