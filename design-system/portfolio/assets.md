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

## Delivery checklist

- [ ] 12 files with exactly these names in `client/public/assets/pixel/`
- [ ] Each `viewBox` equals its grid; integer coordinates only;
      `shape-rendering="crispEdges"`
- [ ] Only the six palette hex values appear (grep the files)
- [ ] No `<text>`, letters, numerals, logos or known characters
- [ ] Previewed at 1×, 2× and 4× on navy, cream, orange, teal and violet;
      silhouette reads on navy through its fill, not its outline
- [ ] File sizes within budget
- [ ] A one-line note per file to the lead on anything you changed from this
      brief
