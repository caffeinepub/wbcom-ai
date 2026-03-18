# WBCom AI

## Current State
Science theory answer generation uses keyword-based detection in `scienceSolver.ts`. The `detectKeywords` function uses regex patterns to identify topics. The meiosis pattern is `meiosis|মিয়োসিস|হ্রাসমূলক বিভাজন|হ্রাস বিভাজন`, which doesn't match common romanized Bengali spellings like "miyosis", "meyosis", "miosis", or "mayosis".

## Requested Changes (Diff)

### Add
- Spelling variants for meiosis: `miyosis|meyosis|miosis|mayosis`
- Spelling variants for mitosis: `maytosis|maeitosis|maitoysis`
- Spelling variants for photosynthesis: `saloksangshleshan|shaloksangshleshan`
- Chapter-name-based topic detection as a secondary fallback (if chapter name contains topic keywords, use that topic's content)
- More Bengali romanization variants for physics, chemistry, biology keywords

### Modify
- `detectKeywords` function: extend all biology patterns with common romanized Bengali spelling variants
- `solveTheory` function: add chapter-name based detection as additional signal when keyword detection fails

### Remove
- Nothing removed

## Implementation Plan
1. Extend meiosis pattern with: `miyosis|meyosis|miosis|mayosis|মিয়সিস`
2. Extend mitosis pattern with: `maytosis|mytosis`
3. Extend photosynthesis pattern with romanized variants
4. Add chapter-name fallback in `solveTheory` - check if `chapter.toLowerCase()` contains topic keywords
5. Improve generic biology fallback to also scan question for topic clues more broadly
