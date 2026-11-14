# Improvement loop, round 1 (PR #7 @ 44788b0): 30/40

Scores (H1–H10): 3,3,3,3,3,3,3,3,3,3 (was 3,2,3,2,3,3,3,2,3,2 = 26). Target ≥36/40. Reviewer: `design-reviewer` (Impeccable method). No functional regressions.

## What makes each heuristic a 4
1 Status: visible Projects filter count ("Showing 2 of 7"); chat input stays enabled with a visible "Johnny is typing…" line; phone Menu button shows the current section ("Menu · Projects").
2 Real world: legend says White/Black not Paper/Ink; "knowledge-base guidance" in full; (John) "PLOT TWIST!".
3 Control: A11 (chat input disabled while replying), A7 (single-key shortcuts), chat at 400% zoom, a 404 page.
4 Consistency: blue key-term fill only on figures (others bold); one name for AI across chips/filters; no stale palette comments.
5 Error prevention: "Download resume (PDF)"; shortcuts need a modifier.
6 Recognition: visible Ctrl+K / ? hint (menu or footer); Skills legend beside the filters.
7 Flexibility: SectionNav/dock after <main> in DOM (resume within 2 tab stops); optional deep-linkable filters.
8 Aesthetic: dock off content; ≤3 hero loops; About composition filled; (John) halftone behind leads.
9 Error recovery: 404 page; chat unknown-question reply offers the topic keys.
10 Help: shortcut hint; chat answers link to their sections; taller chat log on phones.

## FIX-NOW items (team can do without John)
3. Fixed dock covers content (1366 SilverLink tile/About chips; 1024 hero CTAs; 375 case "GitHub profile" + desk_assist.exe title). SectionNav.tsx:189 + SoundToggle.tsx:31 `sr-only sm:not-sr-only` → `sr-only 2xl:not-sr-only` (icon-only below 1536, 44px, names kept); CaseLayout.tsx:117 shares the dock; at 375 ensure the desk_assist title isn't covered.
4. A13: render <SectionNav /> after </main> in Home.tsx (fixed positions unchanged).
5. A11: MascotChatWidget.tsx:430 remove disabled={isTyping}; keep aria-disabled on Ask; ignore submits while typing; visible "Johnny is typing…".
6. A7: `?` (KeyboardShortcuts.tsx:27) and `` ` `` (SecretTerminal.tsx:253) need Ctrl/Cmd (Ctrl+/ and Ctrl+`); update any hints/text that mention them.
7. A4/A5: CommandPalette.tsx combobox/listbox semantics (role=combobox, aria-expanded, aria-controls, aria-activedescendant; listbox; option + aria-selected; scroll active into view).
8. Chat at 400% (341×225 log ≈0px): MascotChatWidget.tsx:339/:359 under @media (max-height: 420px) hide prompt header, Johnny and topic keys so the log gets the height.
9. Blue key-term fill (Hierarchy.tsx:11-13) only for figures (1,000+, 40%, 50+ defects, 4 gRPC services, 4 languages); other **terms** bold, no fill (About "clear requirements"; SilverLink "Optimistic concurrency", "Idempotency keys", "EMA load forecast"; SCS "stigma", "learned little", "without code").
10a. Hero.tsx:298 scroll-cue bounce repeat: Infinity → repeat: 3.
12. About.tsx:45 move <FactChips> into the bio column so the right half isn't empty at 1366.
13. Floating pixels touching content (Hero.tsx:38-41): left-side pixels to left 1.5–3% or hidden below 2xl — keep the effect (John's), just clear the text.
14. StatStrip.tsx:68 burst -ml-[0.4em] → -ml-[0.2em] (≥14px from the edge at 320).
15. Skills.tsx:71 legend: paper → "White", ink → "Black".
16. DeskAssistWindow.tsx:12 "Finds KB guidance" → "Finds knowledge-base guidance" (resume wording).
17. DeskAssistWindow.tsx:40-47 move "See experience" after </figure>.
18. "no remote code" → "no remotely hosted code" in skills3d/keys.ts:62 and MascotChatWidget.tsx:36.
19. 404 page: App.tsx:87 — a `404.exe` Window with links to Home and Projects (noindex not needed for SPA; set document.title).
20. Projects.tsx:248 make the filter status visible ("Showing 2 of 7").
21. Stickers.tsx:51 right-side stickers ≥60px from the screen edge at lg+ (clear of the nav dots).
22. Hero.tsx:113 add lg:pb-24 xl:pb-6 so the Chat launcher doesn't cover desk_assist.exe at 1024–1279.
23. Stale palette comments: About.tsx:2-3, Projects.tsx:219, SoundToggle.tsx:11, Window.tsx:13,47, case/CaseBlocks.tsx:14,26,47, case/CaseHeader.tsx:38, case/ScreenGallery.tsx:34,100.
24. (asset-artist) gRPC (14) and SKLEARN (08) keycap icons are faint wordmarks → readable pixel glyphs.
25. MascotChatWidget.tsx:161 chat typing cursor → solid (one blinking cursor rule).
26. Keyboard3D camera: ~130px dead space under the filters at 1366 and bottom row cut in a 900px viewport — tighten framing (3D exception unchanged).
27. Experience.tsx: move LGA's "In progress" badge onto the Desk Assist bullet.
Also from heuristics: "Download resume (PDF)"; visible shortcut hint (e.g. footer or menu.exe: "Ctrl K commands · Ctrl / shortcuts"); "AI" naming consistent between Projects chips and Skills filters; chat unknown reply offers topic keys; phone Menu shows current section; Skills legend beside filters; taller chat log at 375.

## NEEDS JOHN
Facts: SilverLink "my part" (Q1); EMA forecast recommends vs autoscales, nodes vs containers, 212 ms load-tested (Q2/N4); 40% baseline/period (B2); Desk Assist deployed? app.silverlink.cc live?; SCS visitor-facing still, is Lil Johnny in SCS (N9).
Decisions: featured projects for the AI & Data track (keep SilverLink+SCS / feature UWB / change the lead); hero floating pixels (keep / drop / gutters only); guardrails text line (N7); "PLOT TWIST!" (keep / "YOUR MOVE!" / remove); HELLO! cell in the stats band (keep / smiley / drop); halftone behind leads; nested frames in Projects.

## John's decisions (14 Nov)
- **Featured:** add UWB as a third featured tile (SilverLink, SCS stay featured). Update the Projects lead line to include it, factually.
- **Floating pixels:** keep, but only in the outer gutters, never near text.
- **Trust line:** yes — one line in About or under LGA, resume wording only: "least-privilege permissions, no remotely hosted code, AI calls through a company-controlled backend". Desk Assist stays "in progress".
- **PLOT TWIST!** on the SCS tile → **YOUR MOVE!**
- Not changed (John kept them): HELLO! cell, halftone behind leads, Projects frames.
