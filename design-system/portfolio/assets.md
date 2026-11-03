# Asset brief: original pixel-art SVGs

For the `asset-artist`. Deliver to `client/public/assets/pixel/`. Placement is
specified in `pages/home.md` §9; tokens in `MASTER.md` §1.

These play the role the reference's beige computer, small labelled icons and
sign-off dog play: they make the page feel like a hand-made 90s web desktop.
They must be **original**: no known characters or mascots, no logos or brand
marks, no recognisable commercial product silhouettes (for example, don't draw
a specific vintage Mac or IBM model), and **no text, letters or numerals baked
in**.

## Shared rules (all 12)

- **Format:** hand-authored SVG, `viewBox="0 0 N N"` where N is the grid,
  `width` and `height` = N, `shape-rendering="crispEdges"`. Only `<rect>` and
  `<path>` with integer coordinates. Merge same-colour runs into one `<path>`
  per colour. No strokes (half-pixel blur), no gradients, no filters, no
  opacity, no `<text>`, no embedded raster, no `<title>` (all are decorative).
- **Palette (hex literals of the tokens, nothing else):**
  ink `#000000`, cream `#F4EAD5`, orange `#FF7A2F`, teal `#2EC4B6`,
  violet `#6C4AD0`, navy `#16163F`. **No amber** (reserved for the Skills AI
  keys). No white, no greys.
- **Outline:** 1 grid unit of ink around every shape. On navy the ink outline
  nearly disappears (1.22:1), so the **fill must carry the silhouette**: every
  asset's outer fill is cream, orange or teal, never navy or violet.
- **Light:** from top-left. Shade only with an ink 1-unit checkerboard dither
  (every other pixel), never with extra colours.
- **Size budget:** ≤ 4 KB each; the CRT and starburst ≤ 8 KB.
- **Rendering:** used at integer multiples only (1×, 2×, 4×, 8×) with
  `image-rendering: pixelated`.
- **Accessibility:** every asset sits next to text that says the same thing
  or is pure ornament, so all are **decorative**: `<img alt="">` or inline
  with `aria-hidden="true"`. None needs alt text. If one is ever used alone as
  the only content of a link or button, the control gets an `aria-label`,
  not the image.
- **Backgrounds it must survive:** check each one on navy, cream, orange,
  teal and violet as listed per asset.

---

## The 12 assets

### 1. `crt-computer.svg` (hero illustration)

- **Grid:** 64×64. Shown at 256px (4×).
- **Palette:** cream (casing), ink (outline, dither, vents), navy (screen),
  teal (screen content), orange (power light).
- **Drawing:** a chunky generic desktop computer: wide monitor with a thick
  bezel (screen about 36×26 units, inset 1 unit of ink), on a flat base unit
  with a single floppy slot and a few vent lines, a small keyboard slab in
  front (keys as a grid of 2×2 cream blocks separated by ink, no legends).
  On the screen: a teal block cursor and three or four short teal horizontal
  bars of different lengths suggesting lines of output (abstract, not
  letters). Orange 2×2 power light bottom-right of the bezel. Right and bottom
  faces shaded with ink dither for depth. Slight three-quarter view is fine;
  straight-on is fine too.
- **Purpose:** the hero's object, the "retro web desktop" in one picture,
  balancing the `welcome.exe` window.
- **Placement:** hero art column, centred over the starburst, `lg`+ only.
- **Backgrounds:** navy (sits on orange starburst mostly).
- **Decorative:** yes, `alt=""`.

### 2. `starburst.svg` (badge / backdrop)

- **Grid:** 48×48. Shown at 384px (8×) in the hero, 96px (2×) in the footer.
- **Palette:** orange (burst), ink (outline), cream (inner disc).
- **Drawing:** a 16- to 20-point jagged burst, points of slightly uneven
  length so it looks hand-cut, with a cream disc in the centre (about 40% of
  the diameter) outlined in ink. The disc is empty: no text.
- **Purpose:** the loud backdrop that pops the CRT off the navy page; reused
  as the footer's sign-off sticker.
- **Placement:** behind the CRT (hero, `lg`+); footer third column bottom
  (`md`+).
- **Backgrounds:** navy, violet.
- **Decorative:** yes.

### 3. `sparkle.svg`

- **Grid:** 16×16. Shown at 16px (1×) in marquee strips, 32px (2×) in the
  hero.
- **Palette:** cream (fill), ink (outline).
- **Drawing:** a four-point sparkle (long vertical and horizontal arms,
  pinched centre), 1-unit ink outline. Cream with ink outline reads on every
  surface it appears on.
- **Purpose:** marquee separator (replaces ★) and twinkles around the CRT.
- **Placement:** between phrases in every marquee strip; two static copies in
  the hero art area.
- **Backgrounds:** orange, teal, navy.
- **Decorative:** yes.

### 4. `smiley.svg`

- **Grid:** 16×16. Shown at 32px (2×).
- **Palette:** orange (face), ink (outline, eyes, mouth), cream (one 1-unit
  highlight top-left).
- **Drawing:** round pixel face, two 1×2 eyes, a wide simple smile. Generic;
  not a known emoji design or the classic "acid house" smiley with its exact
  proportions. Slight tilt of the smile line is welcome for character.
- **Purpose:** the friendly mark on the HELLO! cell, like the reference's
  greeting strip.
- **Placement:** above "HELLO!" in the stats strip, `md`+.
- **Backgrounds:** cream.
- **Decorative:** yes.

### 5. `floppy.svg`

- **Grid:** 16×16. Shown at 16px (1×).
- **Palette:** teal (body), ink (outline, shutter hole), cream (label area
  and shutter).
- **Drawing:** a 3.5-inch diskette: square body with one clipped corner,
  cream metal shutter at the top with an ink slot, blank cream label at the
  bottom (no writing).
- **Purpose:** "save a file" icon for the Resume (PDF) download button.
- **Placement:** left of the label in the hero primary button.
- **Backgrounds:** orange (button fill).
- **Decorative:** yes; the button says "Resume (PDF)".

### 6. `icon-home.svg`

- **Grid:** 16×16. Shown at 16px.
- **Palette:** cream (walls), orange (roof), ink (outline, door).
- **Drawing:** simple house: pitched orange roof, cream walls, ink door,
  optional one-unit chimney.
- **Purpose:** "top of page / hero" in the command palette and the section
  dot nav tooltip.
- **Placement:** command palette "Hero" row; dot nav tooltip.
- **Backgrounds:** navy, cream.
- **Decorative:** yes; label text sits beside it.

### 7. `icon-about.svg`

- **Grid:** 16×16. Shown at 32px (2×).
- **Palette:** cream (page), ink (outline, fold), teal (three content bars).
- **Drawing:** a sheet of paper with the top-right corner folded; three teal
  horizontal bars as lines of content (abstract, not letters).
- **Purpose:** marks the About section (`about_me.txt`).
- **Placement:** left of the "ABOUT ME" heading.
- **Backgrounds:** navy.
- **Decorative:** yes.

### 8. `icon-experience.svg`

- **Grid:** 16×16. Shown at 32px.
- **Palette:** orange (case), ink (outline, handle, seam), cream (clasp and
  highlight).
- **Drawing:** briefcase with a handle on top, a horizontal seam and a cream
  clasp in the middle.
- **Purpose:** marks the Experience section.
- **Placement:** left of the "EXPERIENCE" heading.
- **Backgrounds:** navy.
- **Decorative:** yes.

### 9. `icon-projects.svg`

- **Grid:** 16×16. Shown at 32px.
- **Palette:** cream (folder), ink (outline, tab line), orange (one sheet
  peeking out).
- **Drawing:** a file folder with a tab on the top-left and the edge of an
  orange sheet sticking out of the top. Cream body so it reads on the teal
  band.
- **Purpose:** marks the Projects section.
- **Placement:** left of the "PROJECTS" heading on the teal band.
- **Backgrounds:** teal.
- **Decorative:** yes.

### 10. `icon-skills.svg`

- **Grid:** 16×16. Shown at 32px.
- **Palette:** cream (key top), teal (key sides), ink (outline, dither on the
  front face).
- **Drawing:** a single chunky keycap in slight perspective: cream square
  top, teal bevelled sides, ink dither on the lower face. No letter on the
  key. Must echo, not copy, the Skills keyboard's keys; don't use amber.
- **Purpose:** marks the Skills section and hints "press a key".
- **Placement:** left of the "SKILLS" heading.
- **Backgrounds:** navy.
- **Decorative:** yes.

### 11. `icon-contact.svg`

- **Grid:** 16×16. Shown at 32px.
- **Palette:** cream (envelope), ink (outline and flap lines), orange (seal).
- **Drawing:** closed envelope, V flap lines in ink, a 2×2 orange seal where
  the flap meets. This is the new cream envelope that replaces the old
  amber-on-black `PixelEmail` in the footer.
- **Purpose:** marks the contact column; also used at 16px beside the email
  link and inside the Email me button.
- **Placement:** left of "Let's build something"; 16px beside the email link.
- **Backgrounds:** violet, orange (inside the Email me button at 16px).
- **Decorative:** yes.

### 12. `globe.svg`

- **Grid:** 24×24. Shown at 24px (1×).
- **Palette:** teal (ocean), cream (land masses), ink (outline, one meridian
  and one latitude line).
- **Drawing:** a small planet/globe with blobby, made-up land shapes (not an
  accurate world map, so no country reads as "the" subject), ink meridian
  and equator lines, an optional 1-unit cream ring tilted around it like a
  little planet.
- **Purpose:** gives the "SGT" clock a sense of place (John is in
  Singapore, time shown for overseas recruiters).
- **Placement:** before "SGT 14:02" in the footer.
- **Backgrounds:** violet.
- **Decorative:** yes.

---

## Case-study additions (2, Oct 2026)

Same shared rules as above. Placement: `pages/case-study.md` §4. Until they
land, those two headings render without an icon, so they don't block the build.

### 13. `icon-screens.svg`

- **Grid:** 16×16. Shown at 32px (2×).
- **Palette:** cream (frame body), violet (2-unit title strip), navy (pane),
  teal (two short content bars in the pane), ink (outline).
- **Drawing:** a tiny app window seen straight on. Outer fill cream so it
  reads on navy, violet title strip across the top, navy pane with two teal
  bars of different lengths. No ○ □ ✕ glyphs (no text-like marks).
- **Purpose:** marks the Screens gallery, the section made of window figures.
- **Placement:** left of the "Screens" / "Charts" h2 on case pages.
- **Backgrounds:** navy.
- **Decorative:** yes.

### 14. `icon-results.svg`

- **Grid:** 16×16. Shown at 32px (2×).
- **Palette:** cream (card), orange and teal (bars), ink (outline, baseline).
- **Drawing:** a cream card with three bars of **uneven, not ascending**
  heights (e.g. medium, tall, short) on an ink baseline, alternating orange
  and teal. Not a rising chart, trophy, tick or medal: the section lists
  measurements, and the icon must not suggest success or improvement.
- **Purpose:** marks the Results section (measured figures).
- **Placement:** left of the "Results" h2 on case pages.
- **Backgrounds:** navy.
- **Decorative:** yes.

---

## Visuals pass additions (13, Oct 2026)

Placement and sizes: `visual-hierarchy.md` §3. Same shared rules as above,
with these differences for the spot illustrations:

- **Spot illustrations (#15–22): grid 48×48**, shown at 96px (2×), 144px (3×)
  and 192px (4×). Never at 1×. Size budget ≤ 6 KB each.
- They always sit on a **colour plate** (3px ink border, solid orange or teal
  fill, set per spot below). Leave a 3-unit transparent margin inside the
  grid so the drawing doesn't touch the plate border. The plate colour must
  not be the drawing's main fill: on an orange plate, use cream and teal for
  the big shapes; on a teal plate, cream and orange.
- Check each one on its plate, on cream and on navy.
- Generic subjects only: no logos or brand marks, no known characters, no
  recognisable real product (no specific phone, headset or extinguisher
  brand shape), no text, letters, numerals, currency symbols or pictograms
  from real signage (no ISO running-man exit sign).
- All decorative: `<img alt="">` inside an `aria-hidden` plate. The project
  name sits beside every use.

Until these land, the plate renders empty and chips render without an icon,
so they don't block the build.

### 15. `spot-silverlink.svg`

- **Plate:** orange.
- **Palette:** cream, teal, navy, violet, ink.
- **Drawing:** two people side by side from the chest up, an older person
  (cream hair as a 2-unit cap, small ink glasses) and a younger person
  (navy hair), both with teal tops, turned slightly toward each other. Behind
  them a wide screen on a stand: navy screen, a cream play triangle in the
  middle and a single orange 2×2 "live" dot top-left. Two small cream
  speech-bubble shapes between the people (empty).
- **Purpose:** seniors and youth meeting through live events.
- **Placement:** SilverLink tile sticker (96), case header (96/144/192).

### 16. `spot-scs.svg`

- **Plate:** teal.
- **Palette:** cream, orange, navy, violet, ink.
- **Drawing:** a tablet in landscape, cream bezel, navy screen. On the screen
  a tiny story panel: a simple pixel figure (orange top, cream face, no
  features beyond 1-unit eyes) on the left, a cream text box along the bottom
  holding two short navy bars (abstract lines, not letters), and two small
  orange arrow buttons at the box's right end (back and next). A violet
  4-unit tab sticks up from the top edge like a panel bookmark. No ribbon
  symbols.
- **Purpose:** the branching story visitors play on a booth tablet.
- **Placement:** SCS tile sticker, case header.

### 17. `spot-ai-finance.svg`

- **Plate:** orange.
- **Palette:** cream, teal, navy, ink, violet.
- **Drawing:** a cream chart card (front-right) with three teal bars of
  uneven height and an ink zig-zag line over them; behind it, front-left, a
  navy oil barrel with two cream hoops and a teal top rim; a small cream
  sheet tucked behind the barrel with three violet bars (a news page,
  abstract lines). No currency signs, no stock tickers.
- **Purpose:** market and news data turned into one view.
- **Placement:** AI Finance tile sticker, case header. Important here: the
  case page has no confirmed screenshot, so this is its main image.

### 18. `spot-uwb.svg`

- **Plate:** teal.
- **Palette:** cream, orange, navy, violet, ink.
- **Drawing:** left, a small cream anchor box on a short stand with three
  stepped cream arcs radiating right (signal waves). Right, an orange
  location pin (round head with a cream 2×2 centre, pointed tail). Between
  them a navy wall block (brick seam in ink) that one of the arcs runs into
  and stops at, while the upper arc passes over the wall to reach the pin:
  one blocked path, one clear path.
- **Purpose:** telling clear signals from blocked (NLOS) ones indoors.
- **Placement:** UWB tile sticker, case header.

### 19. `spot-uat.svg`

- **Plate:** orange.
- **Palette:** cream, teal, navy, violet, ink.
- **Drawing:** a cream clipboard with an ink clip at the top and four rows:
  each row a small square box and a short navy bar. Two boxes hold teal
  ticks, one an ink cross, one is empty. A bug sits on the lower-right corner
  of the board, overlapping its edge: rounded navy body with a cream belly
  stripe, six ink legs, two short antennae, a violet 2×2 eye spot. Friendly,
  not gross.
- **Purpose:** test cases checked off and defects caught.
- **Placement:** UAT tile sticker, case header.

### 20. `spot-firesafety.svg`

- **Plate:** teal.
- **Palette:** cream, orange, navy, violet, ink.
- **Drawing:** a generic fire extinguisher, front-left: orange body with a
  cream band (blank label), ink handle and short hose. Behind it a corridor
  in one-point perspective: navy floor tapering to a cream doorway at the
  back, with three orange chevrons on the floor pointing toward the door
  (the AR arrows), each outlined in ink. No exit sign, no running figure.
- **Purpose:** AR arrows guiding residents to an exit.
- **Placement:** Fire Safety tile sticker, case header.

### 21. `spot-greenloop.svg`

- **Plate:** orange.
- **Palette:** cream, teal, navy, violet, ink.
- **Drawing:** a horizontal navy hydroponic pipe with two round holes; from
  each hole a teal sprout (two leaves) with cream root lines dropping into
  the pipe. Front-right, a single cream coin standing on its edge, seen at a
  slight angle, with an ink rim and a blank face (no symbol).
- **Purpose:** an urban farm idea that won a grant.
- **Placement:** GreenLoopFarms tile sticker.

### 22. `spot-desk-assist.svg`

- **Plate:** teal.
- **Palette:** cream, orange, navy, violet, ink.
- **Drawing:** left, a cream ticket card with a notched (perforated) left
  edge and two short navy bars. Centre, a larger cream chat bubble with an
  ink tail, holding three navy bars (a drafted reply) and a violet 2-unit
  cursor block at the end of the last bar. Right, a person from the chest up
  (orange top, navy hair, generic headset band in ink with a small mic arm)
  looking at the bubble, one hand raised with a small teal tick beside it:
  a person reviewing the draft. Ticket → bubble → person reads left to right.
- **Purpose:** Desk Assist: AI drafts, an agent reviews (in progress, not
  shipped; nothing in the drawing should suggest "sent" or "done").
- **Placement:** Experience, LGA window, Desk Assist block (96 / 144).

### 23–26. Fact-chip icons

**Grid:** 16×16, shown at 16px (1×). **Palette** as each says. Cream or
orange outer fill so they read on cream chips. Beside chip text that says
the same thing, so decorative.

| # | File | Drawing |
|---|---|---|
| 23 | `chip-school.svg` | Flat cream book standing open (two pages, ink spine), a small teal bookmark ribbon hanging from the top. Not a mortarboard |
| 24 | `chip-calendar.svg` | Cream page with an orange top band and two ink binder rings; a 3×2 grid of ink dots below (no numbers) |
| 25 | `chip-team.svg` | Two people heads-and-shoulders, overlapping: front one teal top, back one orange top, cream faces |
| 26 | `chip-phone.svg` | Generic upright phone: cream body, navy screen with one teal bar, ink outline; no notch or camera cluster shaped like a real model |

### 27. `bullet.svg`

- **Grid:** 8×8, shown at 16px (2×).
- **Palette:** orange (fill), ink (1-unit outline).
- **Drawing:** a stepped right-pointing arrowhead (DOS menu pointer):
  1-unit steps up to a point on the right, orange inside, ink outline.
- **Purpose:** the pixel list marker that replaces the 10px orange square.
- **Placement:** every bullet list (Experience, What it does, My part, card
  lists, tile facts).
- **Backgrounds:** cream, navy (the orange fill carries it).

---

## Delivery checklist

- [ ] 12 files (14 with the case-study additions, 27 with the visuals pass) with exactly these names in `client/public/assets/pixel/`
- [ ] Each `viewBox` equals its grid; integer coordinates only;
      `shape-rendering="crispEdges"`
- [ ] Only the six palette hex values appear (grep the files)
- [ ] No `<text>`, letters, numerals, logos or known characters
- [ ] Previewed at 1×, 2× and 4× on navy, cream, orange, teal and violet;
      silhouette reads on navy through its fill, not its outline
- [ ] File sizes within budget
- [ ] A one-line note per file to the lead on anything you changed from this
      brief
