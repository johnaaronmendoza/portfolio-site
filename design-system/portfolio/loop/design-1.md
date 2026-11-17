# Design-only rating 1 (design-rounds @ 16b3fe7): 66/100

Criteria (0–10): first impression 6 · hierarchy 7 · typography 7 · colour 7 · composition 6 · consistency 8 · motion craft 6 · imagery 6 · polish 6 · distinctiveness 7.

## FIX-NOW (design round 1)
2. Particle retune: Particles.tsx:9-11 SIZE steps 4/6/8 (drop 3px), ALPHA [0.9,1.0] so colours stay on tokens (keep edge + clear-box fades), NEAR_SHARE 0.25, MID_SHARE 0.35; Hero.tsx:141 density 5, maxCount 110 (~60–90 desktop, ~40 phone); Hero.tsx:32 colours mostly blue, ink only on the near tier; Particles.tsx:14 CLEAR_MAX 6 and add `particles-clear` to the CTA group (Hero.tsx:234) and the study chip (Hero.tsx:223); quantise drift to a 2px lattice for 8-bit stepping.
4. One content width: About.tsx:30, Experience.tsx:86, Skills.tsx:61 max-w-5xl → max-w-6xl (prose stays ≤60ch) so every section lines up with the hero and Projects.
5. Experience: from lg, window body as a 12-col grid — header (badges, org, role, period) lg:col-span-4, PixelList lg:col-span-8; LGA gets the lead treatment (larger, thicker shadow like the Projects lead tile); Sembcorp and Education side by side at lg.
6. Project thumbnails: Featured badge to bottom-2 left-2 (or into the meta line) so it doesn't hit the UWB chart title (Projects.tsx:91); per-project `imagePosition` (object-position) so crops start at a clean UI edge, not mid-word; SilverLink BOOKED! burst smaller (size-24) or a calmer corner.
7. `.btn-ghost` background paper (index.css:754-758; secondary buttons are paper) so particles/halftone don't show through; non-breaking spaces in "graduating Apr 2027" (Hero.tsx:230).
8. Fixed controls vs content at 1280–1439: Chat launcher icon-only below 1440 (MascotChatWidget.tsx:320, 44px+), Pause/Sound icon-only there too; nothing over proof.txt's "Case study" link.
9. Footer.tsx:130 yellow starburst → blue/ink (yellow = AI only); chat panel one window (drop the nested conversation.log title bar) and un-clip the mascot (MascotChatWidget.tsx ~371); section dots get a paper outline over dark bands; python.info shouldn't butt the marquee or cover filter chips.
About (weak section): cut the six chips to the two not stated elsewhere (Diploma NYP, Based in Singapore), set as Plex Sans labels not bold mono; photo top-left with prose beside it at 60ch; window fits its content. No new copy.
Skills: cut the ~160px dead space and the stray rule at the end.

## NEEDS JOHN
1. Playable Desk Assist demo (illustrative sample ticket; stops at "Agent reviews" with an Approve button the visitor presses; labelled as how it "will" work). Where: inline in the hero window / modal / LGA case page.
3. One ambient pixel system: drop the 9 floating pixels / keep both with different roles / add a sparse field inside welcome.exe.
10. Skills ending: frame the board in a keyboard.exe window with "All skills as a list" in its status bar / keep frameless and end on a short lead-in to the footer.
