---
target: home page (retro design on rebrand)
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/portfolio-site/client/src/pages/Home.tsx"
target_fingerprint: "sha256:78ada47eee275f3f352517326b8758096dbb0c195c3d4908e8c08d83f7ce64a8"
target_path: /home/user/portfolio-site/client/src/pages/Home.tsx
timestamp: 2026-11-03T05-47-01Z
slug: client-src-pages-home-tsx
---
Method: dual-agent (A: design review · B: detector + browser), retro design on `rebrand` (rebrand commits not yet pushed).

## Design Health Score: 26/40 (Acceptable)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Section dots lg-only (SectionNav.tsx:73); no location indicator on mobile |
| 2 | Match system / real world | 3 | Keycap abbreviations (SKLRN, TWIND, SUPA); unexplained "SCS" in StatsBand |
| 3 | User control and freedom | 2 | Sound on by default, no mute (setMuted unused, useSound.ts:80) |
| 4 | Consistency and standards | 3 | "AI keys are amber" vs teal highlight (Skills.tsx:470); grayscale tiles look disabled |
| 5 | Error prevention | 3 | Low-risk surface; filter empty state exists |
| 6 | Recognition rather than recall | 2 | Ctrl+K, ?, terminal, Konami unhinted; no mobile nav |
| 7 | Flexibility and efficiency | 3 | Skip link, palette, dots, filters; hidden from those who'd benefit |
| 8 | Aesthetic and minimalist design | 2 | 4 marquees, particles, pixels, 2 cursors, starbursts; Desk Assist told 4x |
| 9 | Error recovery | 3 | Filter empty state with "Show all projects" |
| 10 | Help and documentation | 2 | Chat and ? undiscoverable; chat launcher unlabeled at 375 |

## Design Specificity
Mostly authored, stock shell: welcome.exe/CRT/starburst/marquee/3D keyboard is the genre costume; sections share one template; "trust" idea (Desk Assist flow) only appears mid-page.
Detector: CLI 0 findings; rendered / 88 entries, /projects/silverlink 18. Real: 16 low-contrast keycap labels (2.1-4.0:1, SkillKeyboard.tsx), full-viewport CRT scanline layer over text (index.css:308-321, z-index 2), nested cards (Projects.tsx:179, judgment). False positives per CLAUDE.md: 67 hard-offset-shadow, 8 teal-on-navy ai-color-palette, 5 keycap gradients, marquee.

## Priority Issues
1. [P1] Unrequested audio + passive DEEP_DIVE toast covering case-study Back at 375 (useSound.ts:76-85, useAchievements.tsx:78). Fix: sound off by default + visible toggle; remove/silence auto toasts, move bottom-left. Cmd: harden, quieter.
2. [P1] StatsBand undersells (StatsBand.tsx:9-14): coursework 89.61% biggest; "6 projects" vs 7 tiles; SCS unexplained. Fix: lead with 40% fewer manual actions and 1,000+ configs migrated, keep 89.61%, origin labels; site facts only. Cmd: clarify.
3. [P1] Skills: 16 keycap labels fail AA; content triplicated (panel/keyboard/dl, Skills.tsx:469-487); amber/teal contradiction; usedIn never rendered (Skills.tsx:429); cryptic labels. Fix: darken keys or dark labels, render usedIn, dl primary, full labels. Cmd: clarify, typeset.
4. [P2] No mobile wayfinding: 13,424px at 375, dots lg-only, no menu/back-to-top; Projects ~5 screens down. Fix: compact sticky section bar or menu.exe (44px), back-to-top, consider Projects before Experience. Cmd: adapt.
5. [P2] About thin/redundant (About.tsx:9-20): 2-sentence bio repeats hero, 5 chips duplicate, empty cream at 1366, EE->Computing story untold. Fix: 3 short paragraphs from site/resume facts, 3 chips. Cmd: distill + copywriter.

## Persona Red Flags
Jordan: role line smallest hero text (Hero.tsx:197); "SCS languages" opaque; "PRESS A KEY" ribbon; .exe filenames noise; Education under Experience.
Casey: no section nav; 5 stacked hero CTAs; particles on phones; fixed Pause/Chat overlap content (Chat over GitHub profile on case study); toast covers Back.
Sam: Download resume is 9th tab stop; 8 filter chips + ~28 keys of tab stops; unmutable sound; keycap contrast.
Graduate recruiter (30s): fold passes; nothing evidences "trust" above fold; SilverLink/SCS named ~3.5 screens down; AI Finance/UWB tiles grayscale until hover.

## Minor Observations
Two blinking cursors (Hero.tsx:180,198); ribbons repeat next heading; CRT layer over text; "Home" breadcrumb 36-38px wide; badge colour meanings drift; SilverLink featured thumbnail unreadable; "sudo hire-me" unexplained. Keep: Projects lead and footer closer.

## Questions
1. Would a recruiter seeing only the stats band guess AI/data candidate?
2. What if the hero window were a Desk Assist ticket with the agent-review step?
3. Would cutting Skills to the dl (usedIn on tiles) lose anything?
