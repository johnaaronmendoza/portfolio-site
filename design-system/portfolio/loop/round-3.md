# Improvement loop, final round (c894879): 39/40 — Excellent

Scores H1–H10: 4,4,4,4,4,4,4,3,4,4 (round 2: 36; round 1: 30; start: 26). All 14 round-2 items verified fixed; no regressions; detector findings all John's binding style. Verdict: near-perfect for the DBS AI & Data recruiter; highest-value next step is John's open facts (SilverLink "my part", Desk Assist deployed?).

## Remaining (39 → 40, FIX-NOW)
1. UWB decision-boundaries figure half-width orphan at 1366 — ScreenGallery.tsx:97 / UWBProject.tsx:41: optional `span` on Shot → md:col-span-2.
2. 200% zoom (683x450): dock covers the hero lead — raise the dock's max-height breakpoint 420 → 500px (SoundToggle.tsx:10,26; SectionNav.tsx:130).
3. Chat log ~240px tall at 1366x900 — index.css:883-884 height min(680px, calc(100dvh - 6rem)) or collapse topic keys after the first answer.
4. Skills phone sticker near the Chat launcher at 1366x900 — Stickers.tsx:34 top 70 → 45.
5. "ROC‑AUC" non-breaking hyphen — UWBProject.tsx:66.
6. Projects marquee: add 'UWB INDOOR LOCALIZATION' — Home.tsx:75.
7. Chat fallback email as a mailto link or "Go to Contact ↓" — MascotChatWidget.tsx:115-116.
8. Skills intro "Press a key for details." (no "hover" on touch) — Skills.tsx:65.
9. Analytics tag loads the literal %VITE_ANALYTICS_ENDPOINT% when unset — inject from main.tsx only when the env var exists (index.html:84).
10. UWB phone chart tick labels ~10px → ≥12px at 360 wide (asset-work/uwb-charts/build.py).

## NEEDS JOHN
Facts: decision-boundaries title says "7 Classifiers" but shows 6 panels; UWB raw data (to restyle PCA / tree-depth / decision-boundaries charts); SilverLink my part; EMA recommends vs autoscales, nodes vs containers, 212 ms load-tested; 40% baseline; Desk Assist deployed?; app.silverlink.cc live?; SCS visitor-facing still.
Decisions: hero loops; phone dock hide-until-past-hero / auto-hide.
