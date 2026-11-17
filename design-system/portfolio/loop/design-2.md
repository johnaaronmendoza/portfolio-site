# Design-only rating 2 (cb036ce): 72/100 (round 1: 66)

Criteria now / r1: first impression 7/6 · hierarchy 8/7 · typography 7/7 · colour 8/7 · composition 7/6 · consistency 8/8 · motion 7/6 · imagery 6/6 · polish 7/6 · distinctiveness 7/7.
Ceiling for this direction with excellent execution ≈ 80–82; execution can still gain ≈ +4–6.

## FIX-NOW (design round 3)
1. Control lane at 1024–1535: About.tsx:28, Experience.tsx:122, Projects.tsx:214, Skills.tsx:61, Footer.tsx:44 and the Hero section padding `lg:px-16` → `lg:px-[88px] 2xl:px-16` so the fixed dock / chat launcher / section dots never touch content or window shadows at 1280 (content stays 1152 at 1366).
2. UWB case-study charts pca_variance.png, tree_depth.png, decision_boundaries.png (UWBProject.tsx:23, :36, …) re-rendered in Paper & Ink like the confusion matrix (paper ground, ink axes, #3A66FF + ink series, Plex Mono labels) — design-visual-storyteller; same figures.
3. One thumbnail treatment: every screenshot fully inside the tile on the page colour with a 16px margin and a 3px frame (no mid-word bleed off the right edge); BOOKED! burst hangs off the tile corner (-bottom-3 -right-3, Projects.tsx:98), not over screenshot UI.
4. About fills its width: About.tsx:34 drop md:w-fit; About.tsx:44 drop md:self-stretch and justify-between (facts right under prose); from lg the two facts in a third column; prose ≤60ch.
5. Phone dock: full-width page-colour band at max-lg (inset-x-0 bottom-0 px-4 py-2 bg page, 3px ink top border) so content doesn't slide under loose chips; fixed width on the section button (w-[7.5rem], SectionNav.tsx:125) so Pause/Off don't shift.
6. Hero.tsx:127 lg:items-center → lg:items-start (welcome.exe and desk_assist.exe share a top edge).
7. Chat as one surface: MascotChatWidget.tsx:374 drop the bordered chat-log-box frame (window body + 3px top rule); no timestamp on the greeting.
8. Projects.tsx:138 featured tiles mt-auto → mt-5 (no ~120px dead band).
9. Footer.tsx:130 remove the starburst; hide "Ctrl K commands" in menu.exe on coarse pointers; phone case-page header sound toggle "Sound off"; hide the hero Scroll cue below sm.

## NEEDS JOHN
10. Featured imagery: (a) one pixel-art key image per featured project for tiles (screenshots stay on case pages); (b) screenshots framed as browser.exe windows at one fixed crop; (c) as is.
11. Hero name window weight: (a) shrink welcome.exe to fit and move the role line inside it; (b) sparse particles inside the black body; (c) keep.
12. Phone first screen: (a) drop the full-height intro so desk_assist.exe's title peeks above the fold; (b) keep.
