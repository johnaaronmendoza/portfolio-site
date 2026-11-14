# Improvement loop, round 2 (8b8b80c): 36/40 — Excellent (lower edge)

Scores H1–H10: 4,4,4,3,4,3,4,3,4,3 (round 1: all 3 = 30). No heuristic capped only by John items.

## What makes the remaining 3s a 4
- H4 Consistency: chat shows one topic set (reply topics only when keys are hidden, ≤420px tall); UWB confusion matrix + LR/SVM chart re-rendered in Paper & Ink from the figures in their alt text (originals behind "Open full size"); one shortcut notation by platform (Ctrl K / ⌘ K).
- H6 Recognition: dock state readable without hover (❚❚↔▶ glyph by state; ♪ / muted glyph by state; short visible labels where the gutter allows, e.g. stacked dock at lg+); case pages: Sound in the header bar beside "All projects" with a label; shortcut hint also in menu.exe.
- H8 Aesthetic: no fixed control over an interactive element at first paint at 320×640+; dock icon-only/hidden at max-height 420px; duplicate chat topics removed; Skills board ≤32px under the legend; UWB featured thumbnail on palette.
- H10 Help: each chat answer ends with a "Go to <section> ↓" link; shortcut hint in menu.exe.

## FIX-NOW
1. (regression) Icon-only dock: SectionNav.tsx:205, SoundToggle.tsx:34-36 — glyph by state (❚❚/▶ via motionPaused; ♪/muted via on); FLOAT_DOCK (SoundToggle.tsx:7) `lg:flex-col` stacked (~72px) with short labels ("Pause", "Sound off") at text-xs where they fit; restore a visible ON/OFF cue on phones.
2. Case pages: lone ♪ covers the first figure at 375 — CaseLayout.tsx:117-118 move SoundToggle into the header bar beside "All projects", drop the floating dock there.
3. Duplicate chat topics: MascotChatWidget.tsx:375 add class `chat-topics`; index.css chat block ~878 `.chat-panel .chat-topics{display:none}`, re-show inside the existing @media (max-height:420px).
4. Chat answers → section link: KNOWLEDGE_BASE entries get a section id; render "Go to <Section> ↓" under system replies (scrollToSection; close panel below 640px).
5. 320×700: Hero.tsx secondary links (Email/GitHub/LinkedIn) one grid-cols-3 row of icon+label 44px buttons so the first screen fits above the dock; at max-height 420px hide the Menu label (☰ only, sr-only name kept) and the Pause button.
6. Shortcut hint: Footer.tsx:117 ⌘ on Mac (navigator.platform /Mac|iPhone|iPad/); same notation in the CommandPalette footer; add the line at the bottom of menu.exe (SectionNav SectionMenu).
7. UWB charts + tile (design-visual-storyteller): re-render confusion matrices (3,928 / 272 / 601 / 3,599 and 3,809 / 391 / 806 / 3,394) and LR vs SVM bar chart in blue/ink/paper from the alt-text figures; use the restyled confusion matrix as UWB `image` in data/projects.ts.
8. Non-breaking hyphen (U+2011) in "knowledge‑base" (DeskAssistWindow.tsx:12) and "full‑stack" (Hero.tsx:21).
9. Skills dead band ~90px at 1366: SkillKeyboard.tsx:415 `sm:aspect-[9/4]` or camera target/FOV in skills3d so the board top is ≤32px under the legend (3D exception unchanged).
10. Stickers.tsx:33 cursor sticker top 15→4 or edge calc 88→96 (11px from Skills intro at 1366).
11. Hero.tsx:127 lg:pb-24 → lg:pb-28 (chat launcher vs desk_assist.exe corner at 1024×768).
12. Projects.tsx filtered grid: xl:col-span-4 for every tile when a filter is on (no gap).
13. NotFound.tsx: list the six case studies; robots noindex meta in the effect.
14. MascotChatWidget.tsx:136 TypingMessage: no typewriter for role === 'user'.

## NEEDS JOHN
Facts: SilverLink my part; EMA recommends vs autoscales, nodes vs containers, 212 ms load-tested; 40% baseline/period; Desk Assist deployed?; app.silverlink.cc live?; SCS visitor-facing still / Lil Johnny in SCS; UWB raw data (for PCA/tree-depth charts).
Decisions: hero loops (keep / pixels stop after a few cycles / drop the bob); phone dock (keep / hide until past the hero / auto-hide on scroll down).
