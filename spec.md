# Vidya Setu AI

## Current State
Full-stack educational platform with: Home page, Science, Arts, Commerce, NEET, CA, Law, Quiz, Q&A Bank, Premium Notes, Admin Panel, Customer Support, Terms pages. Uses 3D animations (Three.js/React Three Fiber via HeroScene3D, Card3D, ParticleBackground components), motion/framer-motion page transitions, glassmorphism dark theme.

Backend: ICP Motoko with actors for users, notes, quiz, customer messages, login history.

## Requested Changes (Diff)

### Add
1. **Mock Test Generator** - new page/section; user picks subject + chapter, auto-generates 10-question MCQ test from existing quiz bank or built-in questions; tracks score
2. **Progress Tracker** - per-user localStorage tracking of which topics/chapters have been studied; shows studied vs remaining counts per subject
3. **Bookmark System** - localStorage bookmarks for notes and Q&A items; dedicated bookmarks page/tab
4. **Revision Reminders** - based on last-studied timestamps, shows topics that haven't been reviewed in >3 days
5. **Case Finder** - new tab in Law section; search landmark cases by topic keyword; shows case name, citation, relevance, summary
6. **IPC vs BNS Comparison** - new tab in Law section; side-by-side table of IPC section vs BNS 2023 equivalent
7. **Legal Glossary** - new tab in Law section; alphabetically sorted list of 50+ legal terms with simple Bengali + English explanations
8. **Dark/Light Mode toggle** - CSS variable-based theme toggle; persisted in localStorage; toggle button in Navbar
9. **Font Size Control** - small/medium/large option in settings or navbar; adjusts base font size via CSS variable; persisted in localStorage
10. **Multilingual Toggle** - Bengali/English preference stored in context/localStorage; affects display language of UI labels across app (section headers, nav items, buttons); already exists in Q&A/Law/solvers but needs global preference
11. **Analytics Dashboard** - new tab in Admin Panel; shows: most-used subjects (count of problems/quiz by subject), most-searched questions (from customer messages), quiz scores chart, user count
12. **Bulk Notes Upload** - new tab/section in Admin Panel Notes management; paste/upload multiple notes at once via JSON or form with multiple entries
13. **Scheduled Notices** - extend Notice Board in Admin Panel; add "publish date" field; notices with future publish dates only appear on home page after that time
14. **Doubt Section** - new page; students post questions (stored locally as frontend state, or in customerMessage backend); others can see and admin can reply; show list of doubts with replies
15. **Leaderboard** - new tab; shows top quiz scorers using `getQuizHistory` (per-user) or aggregate from admin analytics; display top 10 with score, topic, date

### Modify
- **App.tsx**: Remove AnimatePresence/motion wrappers, remove ParticleBackground, remove 3D components usage; add new page routes for mockTest, progress, bookmarks, caseFinder, doubt, leaderboard; add Dark/Light theme context; add global language preference context; add font size context
- **Navbar.tsx**: Add Dark/Light toggle button, Font Size control, Language toggle
- **HomePage.tsx**: Remove 3D hero/animated cards; keep structure but static; add scheduled notices filter
- **AdminPage.tsx**: Add Analytics tab, Bulk Upload tab, Scheduled Notices field
- **LawPage.tsx**: Add Case Finder tab, IPC vs BNS Comparison tab, Legal Glossary tab
- **index.css**: Remove 3D/particle CSS; add CSS variables for theme (light/dark) and font size

### Remove
- All animation effects: remove `motion/react` (AnimatePresence, motion.div) from App.tsx and all components
- Remove `ParticleBackground` component usage from App.tsx
- Remove `HeroScene3D`, `Card3D` 3D component usage
- Remove Three.js / React Three Fiber imports where present

## Implementation Plan
1. Update index.css with light/dark CSS variables and font-size variables
2. Create AppContext.tsx (theme + fontSize + language globals)
3. Update App.tsx: remove animations, remove ParticleBackground, add new routes
4. Update Navbar.tsx: add theme/font/language toggles
5. Create MockTestPage.tsx
6. Create ProgressTrackerPage.tsx (localStorage-based)
7. Create BookmarksPage.tsx (localStorage-based)
8. Create RevisionRemindersPage.tsx (localStorage-based)
9. Update LawPage.tsx: add CaseFinder, IPCvsBNS, LegalGlossary tabs
10. Update HomePage.tsx: static (no 3D/animations), filter scheduled notices
11. Update AdminPage.tsx: add Analytics tab, BulkUpload tab, Scheduled Notices field
12. Create DoubtPage.tsx
13. Create LeaderboardPage.tsx
14. Wire all new pages in App.tsx
