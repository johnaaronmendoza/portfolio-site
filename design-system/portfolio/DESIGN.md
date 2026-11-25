---
version: 1.0
name: portfolio-paper-and-ink
updated: 2026-11-24
source: "Derived from shipped code at dea5abd (client/src/index.css, Window.tsx, Section.tsx, Hierarchy.tsx, SectionHeading.tsx, StatStrip.tsx, lib/motion-tokens.ts). CLAUDE.md design, honesty and accessibility rules win over this file."
description: "Neo-brutalist retro web: a warm paper page, retro OS windows with black title bars, 3px ink outlines, hard offset shadows, solid colour blocks and marquee strips. Two accents only: blue for action and data, yellow for AI. Plex Sans reads, Plex Mono labels, Bangers letters section titles, Press Start 2P sets the hero name."

colors:                     # CSS vars in :root (index.css), used as bg-[var(--x)] / text-[color:var(--x)]
  page:      { value: "#EFEAE0", role: "page ground (halftone dots over it on Home)" }
  ink:       { value: "#000000", role: "outlines, hard shadows, black text on blue/yellow" }
  text:      { value: "#111111", role: "reading text on page and paper" }
  paper:     { value: "#FFFFFF", role: "window bodies, chips, secondary buttons; light text on bar" }
  bar:       { value: "#111111", role: "title bars, footer band, ink badges, selected chips" }
  blue:      { value: "#3A66FF", role: "primary button, Projects band, hover fill; as a marker = data or link" }
  yellow:    { value: "#FFD23F", role: "AI only (plus the hero name's second line)" }
  blue-text: { value: "#2347D6", role: "blue text: role line, links, prompts" }
  focus:     { value: "var(--ink)", role: "focus ring; set to paper on dark surfaces" }

contrast:                   # computed, WCAG 2.x relative luminance
  - { fg: text,      bg: page,   ratio: 15.75 }
  - { fg: text,      bg: paper,  ratio: 18.88 }
  - { fg: ink,       bg: yellow, ratio: 14.54 }
  - { fg: ink,       bg: blue,   ratio: 4.52 }
  - { fg: paper,     bg: blue,   ratio: 4.64 }
  - { fg: paper,     bg: bar,    ratio: 18.88 }
  - { fg: yellow,    bg: bar,    ratio: 13.08 }
  - { fg: blue-text, bg: page,   ratio: 5.95 }
  - { fg: blue-text, bg: paper,  ratio: 7.13 }
  banned:
    - { fg: yellow, bg: page,  ratio: 1.20 }
    - { fg: blue,   bg: page,  ratio: 3.87, note: "fills, rules and shadows only (passes 3:1 non-text)" }
    - { fg: blue,   bg: paper, ratio: 4.64, note: "use blue-text for text" }

typography:                 # @theme --text-* (size only; line height stays with each element)
  fonts:
    sans:    "IBM Plex Sans (font-sans): reading text"
    display: "IBM Plex Sans 700, font-stretch 85%, -0.01em, lh 1.15 (.font-display, all h1-h6)"
    label:   "IBM Plex Mono 600, lh 1.3 (.font-label / font-mono): titles, badges, figures, tags"
    comic:   "Bangers 400, 0.03em, lh 1 (.font-comic): section titles, one tile sfx"
    pixel:   "Press Start 2P, 0.05em, lh 1.2 (.font-pixel): hero name only (self-hosted, swap)"
  scale:
    text-section:    72px   # 4.5rem
    text-h1:         56px   # 3.5rem
    text-card-lead:  32px   # 2rem
    text-card-title: 24px   # 1.5rem
    text-lead:       20px   # 1.25rem
    text-lead-sm:    18px   # 1.125rem
    text-body:       16px   # 1rem
    text-body-sm:    15px   # 0.9375rem
    text-label:      13px   # 0.8125rem, the label floor

spacing:
  base: 4px                 # Tailwind default scale
  gutters: "px-4 sm:px-8 lg:px-[88px] 2xl:px-16"   # GUTTERS = 16 / 32 / 88 / 64
  section-y: "py-20 sm:py-28"                       # 80 / 112
  footer-y: "pt-16 sm:pt-20 pb-28"
  content-max: 1152px       # max-w-6xl, centred
  tile-grid-gap: 24px       # gap-6
  chip-gap: "8px, 12px from sm"
  measure: { body: 60ch, lead: 42ch, label-in-cell: 18ch }

shadows:                    # @utility, all 0 blur, ink
  shadow-8bit-sm:    "2px 2px 0 0 var(--ink)"   # filter chips, tags
  shadow-8bit:       "4px 4px 0 0 var(--ink)"   # buttons, tiles, keycaps, windows below lg
  shadow-8bit-hover: "6px 6px 0 0 var(--ink)"   # the one hover lift step
  shadow-8bit-lg:    "8px 8px 0 0 var(--ink)"   # windows from lg
  pressed:           "none, element translated by its shadow offset"

borders:
  frame: "3px solid ink"    # windows, buttons, tiles, filter chips, bands, title-bar rule
  small: "2px solid ink"    # badges, fact chips, tags, step numbers
  dashed: "2px dashed ink"  # .badge--status (unfinished work)
  rule: "6px"               # SectionHeading rule beside the title

rounded:
  none: 0                   # --radius: 0; windows, buttons, chips, tiles, badges
  chat-key: 4px
  keycap: 6px               # 2D Skills keycaps (John's exception)
  board: 10px               # 3D board focus frame
  bubble: "24px (.comic-bubble), 20px narrator"

breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px                # Lil Johnny mounts
  2xl: 1536px
  custom: { stickers-left: 1360px, dock-words-and-chat-label: 1440px, stickers-right: 1450px }
  variants:
    short-phone: "max-width 639px and max-height 660px"
    short-desk:  "min-width 1024px and max-height 820px"
    hero-fold:   "min-width 1024px and height 821-1079px"
  check-at: [375, 768, 1366]

motion:                     # lib/motion-tokens.ts (seconds) and :root easings
  css-ease-out: "cubic-bezier(0.23, 1, 0.32, 1)"
  css-state-duration: 150ms
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6 }
  easing: { smooth: [0.22, 1, 0.36, 1], sharp: [0.4, 0, 0.2, 1], out: [0.23, 1, 0.32, 1] }
  distance: { xs: 4, sm: 8, md: 16 }
  hero: { window: 0.4, line: 0.55, lineStart: 0.2, lineStagger: 0.18, role: 0.9, body: 1.0, ctas: 1.1, cue: 2.0 }
  loop: { blink: 0.5, bounce: 1.2 }
  springs: { snappy: "300 / 30", instant: "600 / 35" }
  keyboard: { enter: 0.7, rowStagger: 0.07, settle: 0.4, tilt: 3, scrollTilt: 5, lift: 5, press: 3.5 }
---

# Design system: Paper & Ink

This is the single source of truth for how the portfolio looks and moves. It
records what ships; when code and this file disagree, fix one of them in the
same change. CLAUDE.md is binding and outranks this file.

## Overview

A 90s web desktop rebuilt with modern discipline. Content sits in retro OS
windows (white body, 3px ink frame, black title bar with a Plex Mono filename)
on a warm paper page with faint halftone dots. Depth comes from hard offset
shadows only; things press down into their shadow. Colour is rationed: ink and
paper do the work, blue means action or data, yellow means AI. A comic layer
(Bangers section titles, one sound-effect burst, gutter stickers) adds voice
without touching reading text. Audience: recruiters, who should get the point in
30 seconds, so readability beats decoration every time.

## Colour

### Roles

- **Page / paper / text / ink / bar** are the structure. Text is `#111` for
  reading; pure `#000` is for outlines, shadows and text on blue or yellow.
- **Blue `#3A66FF`.** As a field, button or hover fill it is the house action
  colour (primary buttons, the Projects band, chip and ghost-button hover). As a
  marker (badge, keycap, figure block) it means **data or a link**:
  `.badge--data`, the "Live site" badge, Data/ML keycaps, the UWB proof figure,
  key-term figure fills (`KeyText`).
- **Yellow `#FFD23F` = AI only.** AI keycaps, `.badge--ai`, AI actor tags in
  flows (`FlowDiagram`, `desk_assist.exe`), the AI legend. The one exception is
  the second line of the hero name (and its block cursor) on the black
  `welcome.exe` body. Never decoration, never a button.
- **Selected / on** is ink with paper text: active filter chips, Featured
  badges, the ink marquees, pressed dock buttons.
- **Blue-text `#2347D6`** is the only blue for words on light surfaces: the hero
  role line, `>` prompts on the page, proof.txt's evidence links.

### Approved pairings

text/ink on page, paper or yellow; black or white on blue; white or yellow on
bar/black; blue-text on page or paper. Nothing else. Keycap colourways add
shades for the cap strip and sides (`skills3d/keys.ts`, below); every legend
there is AA.

## Typography

One role per face. No mono or pixel type for paragraphs, no all-caps for long
text (Bangers is caps-only and never sets more than a title or a sound effect).

| Token | px | Face | Used for |
|---|---|---|---|
| `text-section` | 72 | Bangers | Home h2 from sm (below sm: `clamp(40px,12vw,52px)` so a 10-letter word fits at 320px) |
| `text-h1` | 56 | display | Case-study h1 from sm (`text-card-lead` below) |
| `text-card-lead` | 32 | display / Bangers | Case h2 from sm, Experience lead role, featured tile title from lg, footer h2 |
| `text-card-title` | 24 | display | Card and window h3, tile titles, case h3 from sm, case h2 below sm |
| `text-lead` | 20 | Sans bold | `Lead` from lg, desk_assist.exe h2 (below lg), footer h3 |
| `text-lead-sm` | 18 | Sans bold | `Lead` on phones, case h3 below sm |
| `text-body` | 16 | Sans | Reading text from sm |
| `text-body-sm` | 15 | Sans | Reading text on phones; `.btn` label (15px literal) |
| `text-label` | 13 | Mono 600 | Window titles, badges, filter chips, chat keys (literal 0.8125rem) |

Headings step at least 1.3x down the ladder on a page (72 > 32 > 24; case 56 >
32 > 24). Line heights: headings 1.15, Bangers 1, labels 1.3, `Lead` 1.4 / 1.35
at lg, lists 1.65, tile copy `leading-relaxed`. Headings get `text-wrap:
balance`, `p, li` get `pretty`; figures use `tabular-nums`.

**Fluid one-offs kept on purpose:** hero name (`clamp(20px,7vw,30px)` > 36 > 36
> 48 at sm/lg/xl), StatStrip figures (`min(Npx, 22cqi)` caps), tile sfx 17px,
3D keyboard legends.

**Off-ladder steps still in use:** Tailwind `text-sm` (14px) for tile meta
lines, tags, the Projects status line, marquee on phones, proof.txt links and
the footer clock; `text-base` (16px, same as `text-body`) in overlays and the
marquee from sm; `text-xl / sm:text-2xl` for proof.txt figures. Move these onto
tokens when next touched.

## Spacing and layout

- **Section shell (`Section.tsx`):** full-width band with `GUTTERS` (16 / 32 /
  88 / 64 at base / sm / lg / 2xl) and `py-20 sm:py-28`; content in a centred
  `max-w-6xl` (1152px) column. The hero and case pages reuse `GUTTERS`. Bands
  that change colour (Projects blue, footer bar) carry a 3px ink top/bottom rule.
- **Heading rhythm:** with a lead, `SectionHeading mb-4 lg:mb-5`, then `Lead
  mb-6 lg:mb-8`. Without one, Experience uses `mb-16` and Skills `mb-10`
  (known drift; align on the next pass).
- **Window body padding:** 16-32px for working windows (`projects/` `p-4 sm:p-6
  lg:p-8`, `desk_assist.exe` `p-4 sm:p-5`); 24-56px for reading and hero windows
  (`about_me.txt` `p-6 sm:p-8 lg:p-10`, `welcome.exe` `p-6 sm:p-10 xl:p-12`,
  case header `p-6 sm:p-10 lg:p-14`).
- **Internal gaps:** tile body `p-5 gap-4`; tile grid `gap-6` (1 / 2 / 6 / 12
  columns); chip rows `gap-2 sm:gap-3`; bullet lists `space-y-3 lg:space-y-4`;
  hero contact links `gap-x-6 sm:gap-x-8`.
- **Measure:** body lists 60ch, `Lead` 42ch, StatStrip labels 18ch.
- **Fixed chrome:** `html { scroll-padding-bottom: 88px }` keeps focused
  controls clear of the dock and chat launcher; `scrollbar-gutter: stable`.

## Elevation

| Level | Shadow | Use |
|---|---|---|
| 0 | none | Fact chips, tags, badges, bands, pressed state |
| 1 | `shadow-8bit-sm` 2px | Filter chips (idle) |
| 2 | `shadow-8bit` 4px | Buttons, tiles, keycaps, `.window` below lg, `.window--figure`, narrator bubble, agent-review step |
| 2+ | `shadow-8bit-hover` 6px | Hover lift on primary/secondary buttons and tiles (with -2px translate) |
| 3 | `shadow-8bit-lg` 8px | `.window` from lg |

**Press-down:** the element translates by its shadow offset and the shadow goes
to none (buttons `translate: 4px 4px`; tiles and keycaps 4px; chips 2px).
Selected chips, muted keycaps and pressed dock buttons stay sunk. Stickers use
`drop-shadow(4px 4px 0 ink)`, zero blur. No other shadow exists.

## Components

### Window (`Window.tsx`, `.window`)
3px ink frame, paper body, 4px shadow (8px from lg), square corners.
`WindowBar`: bar fill, paper text, 3px bottom rule, `min-height 36px`, padding
6/12, title in `font-label text-label`, truncated, `translate="no"`.
Decorative `○□✕` is `aria-hidden`. Overlays pass `onClose`: the ✕ becomes a
44x44 button with a paper focus ring, blue on hover. Variants: `welcome.exe`
black body (`--focus: paper`); `.window--figure` keeps the 4px shadow at all
widths for case screenshots.

### Buttons (`.btn`)
Mono 600 15px, `min-height 44px`, padding 10/20, 3px frame, 4px shadow.
Transitions `translate, box-shadow, background-color, color` 150ms `--ease-out`.
- `btn-primary`: blue, white text (4.64:1). One per view.
- `btn-secondary`: paper, ink text.
- `btn-ghost`: paper; hover fills blue with ink text. `btn-ghost-ink`:
  transparent on paper surfaces, same hover.
- Hover (fine pointers, primary/secondary only): -2px lift, 6px shadow.
- Disabled (`aria-disabled`): paper, ink, no shadow, `not-allowed`; never opacity.

### Hero text links
Email / GitHub / LinkedIn under the two buttons: `font-label` 15/16px, text
colour, underline 2px at 4px offset (removed on hover), 16px house pixel icon,
`min-h-11` (44px). New-tab links carry sr-only "(opens in a new tab)". No brand
logos.

### Chips
- **Fact chip** (`Chip`, static): 2px frame, paper, Mono bold 15/16px, 16px
  icon, `min-h-9`, no shadow, not pressable.
- **Filter chip** (`chipClass`, Projects and Skills): `text-label`, 3px frame,
  `min-h-[44px]`; idle paper + 2px shadow, hover blue; active ink with paper
  text, pressed 2px; state also in `aria-pressed`.
- **Tag** (tiles): 2px frame, no fill, Mono 14px bold.

### Badges (`.badge`)
2px frame, padding 4/8, Mono 600 13px, `nowrap`, black text.
`--ai` yellow, `--data` blue, `--ink` bar + paper text (Featured, Internship),
`--paper`, `--status` paper with dashed frame (In progress, unfinished work).

### Project tiles (`ProjectTile`)
3px frame, paper, 4px shadow; hover -2px and 6px shadow, press +4px and none
(150ms `--ease-out`). The **still sits flush** at the top, cut 2:1, over a 3px
rule; `alt=""` because the link names the project; scales to 1.03 on hover
(hover-capable pointers only). Body `p-5 gap-4`: **meta line** in `font-label`
14px reads `[Featured] file.png  year · caption`, each part wrapping whole;
then title (`text-card-title`, featured `lg:text-card-lead`), one-line
description, bullet facts, tags, then "Read case study". Featured: SilverLink
SG, SCS, UWB. The only sfx burst is SilverLink's "Booked!" (paper `Burst`,
80px, ±8°, 17px Bangers, `aria-hidden`). Focus outline offset 10px clears the
shadow. Filter exit: opacity 0, y 8, 0.18s.

### Figures: proof.txt and StatStrip
Always **figure + clause**, never a bare number, and only figures already on the
site or resume.
- **proof.txt** (`ProofPoints`): each row is one link (`min-h-44`): the figure
  in a 3px-framed block (blue + white = data, bar + paper = work), then a bold
  lead clause and the rest of the sentence, then a blue-text "Case study →" /
  "Experience →" link label.
- **StatStrip**: paper cells on black, 3px gaps draw the dividers; label (`dt`)
  first in the DOM, figure (`dd`, Mono bold, `tabular-nums`, final value, no
  count-up) shown on top; optional source chip. Variants `status` (case header,
  own sr-only h2) and `inline` (inside a window). The `band` variant and its
  POW burst are unused since proof.txt replaced the band.

### Section heading (`SectionHeading`)
Bangers h2 in black with a 4px hard text shadow (blue on the page, paper on the
blue band), a 32px pixel icon left, and a 6px rule filling the row (blue, or
black on the band). `size="case"` is 24/32px.

### Keycaps (Skills)
Colour carries the category; the label and the filter state carry it too.

| Category | Face / strip | Legend | Contrast face / strip |
|---|---|---|---|
| AI | `#FFD23F` / `#E6B92A` | black | 14.54 / 11.34 |
| Data/ML | `#3A66FF` / `#2E55E0` | white | 4.64 / 6.01 |
| Build/infra | `#FFFFFF` / `#DCD7CB` | `#111` | 18.88 / 13.15 |
| Ways of working | `#2A2A2A` / `#111111` | white | 14.35 / 18.88 |
| Muted (filtered out) | `#CFCAC0` / `#BDB8AE` | `#3D3A35` | 6.93 / 5.73 |

2D cap: 6px radius, 3px frame, 4px shadow, number top-left, masked icon, Mono
bold label on a darker strip (12 / 14 / 16px at base / sm / lg). Muted and open
keys sit flush (+4px, no shadow), so the state never relies on colour. Grid 4
columns, 7 from sm. The board sits in `keyboard.exe` with "All skills as a
list" in its status bar. 3D board (from 640px, fine pointer, WebGL, motion
allowed): legends at least 12px (compact) or 13px; tooltip is a `*.info`
window.

### Marquee (`Ribbon`)
Straight strip, 3px ink rules top and bottom, `py-3 sm:py-4`, Mono 14/16px,
16px sparkle separators. Tones: `ink` (bar + paper, 18.88:1) and `blue` (blue +
black). Constant 60px/s whatever the length; transform only; pauses on hover
and with Pause motion; still under reduced motion; `aria-hidden` (its words
exist elsewhere).

### Stickers (`comic/Stickers`)
Work objects only (notepad, retro computer, folder, CD, magnifier, cursor arrow,
phone), at most two per section, 72px box, rotated -6° to 10°, static,
`aria-hidden`. Shown only where the gutter fits: left from 1360px, right from
1450px (clear of the section dots).

### Mascot (Lil Johnny)
Two places only. **Hero narrator** (from 1280px): stands on desk_assist.exe's
bottom edge, point-right pose at 2x (94x144), pixelated; his comic bubble
("The AI drafts, an agent decides. Ask me how.") is the button that opens the
chat; press sinks the bubble 4px. **Chat launcher:** fixed bottom-right `.btn`
with the mascot icon (word "Chat" from 1440px), pressed state while open.

## Motion

**Defaults:** state changes are CSS transitions of named properties, 150ms,
`--ease-out`. Framer values come from `motion-tokens.ts`. Overlays enter with
`duration.fast` (0.18s) and `easing.out`.

**Allowed, by John's choice:**
- Hero load-in, the page's one orchestrated moment (`hero.*` tokens): window
  scales 0.95 to 1 in 0.4s; name lines reveal 180ms apart from 200ms; role,
  lead, actions follow by 1.1s; scroll cue at 2.0s.
- Hero WebGL particles (blue, a few ink; paused when off screen or by Pause
  motion; skipped under reduced motion), scrambling name, one blinking cursor
  (0.5s).
- Lil Johnny's two-frame 2px bob (1.2s, `steps(1)`), only while on screen.
- Marquees; press-down buttons, tiles, chips, keycaps.
- 3D Skills keyboard: one entrance per load, 5° scroll-linked perspective,
  ±3° pointer tilt, 5px hover lift, 3.5px press. Nowhere else.

**Stops:** `prefers-reduced-motion` sets every animation and transition to
0.01ms and removes the marquee and bob; particles, scramble and clip reveal are
skipped; Skills serves the 2D board. The Pause motion dock toggle (WCAG 2.2.2)
stops the marquees, bob, particles and cursor.

**Never:** scroll-triggered fades or reveals, passive pop-ups, particles outside
the hero, a second blinking cursor, scroll hijacking or pinning,
`transition: all`, `will-change: all`.

## Accessibility floors

- **Contrast:** AA for every text pairing above; ink frames give 3:1+ on every
  light surface. Never yellow text on page or paper, never `#3A66FF` as text.
- **Size:** body 15px on phones, 16px from sm; labels 13px minimum. **Known
  12px (`text-xs`) exceptions still in code:**
  1. `SkillKeyboard.tsx:115` keycap number (decorative, `aria-hidden`).
  2. `SkillKeyboard.tsx:121` keycap label strip below sm (CLAUDE.md allows 12px
     keycap labels; the button's accessible name carries the full skill name).
  3. `skills3d/Keyboard3D.tsx:473` compact 3D legends (12px; 13px otherwise).
  4. `DeskAssistWindow.tsx:18` step numbers.
  5. `FlowDiagram.tsx:72` and `:79` step numbers and actor tags.
  6. `SoundToggle.tsx:24` dock button words (`dockButton`).
  7. `SectionNav.tsx:224` section-dot hover/focus tooltip.
  8. `MascotChatWidget.tsx:338` launcher word (from 1440px).
  9. `KonamiOverlay.tsx:33` and `:36` easter-egg overlay text.
- **Targets:** 44x44px for every control (`.btn`, filter chips, proof rows,
  contact links, window close, section dots, menu rows). Fact chips (36px) are
  not interactive.
- **Focus:** `:focus-visible` 3px solid `--focus` at 3px offset; `--focus` is
  ink on light surfaces and paper on dark ones (title bars, footer, hero
  window). Floating dock buttons add a 9px paper halo
  (`.focus-ring-float`). Script-focused headings (`tabindex="-1"`) show no ring.
- **Meaning:** never colour alone (muted keys sit flush, active chips sink and
  set `aria-pressed`, AI steps say "AI" in a badge). Decorative art is
  `aria-hidden`; words in a bubble or burst also exist as real text.
- **Layout:** no horizontal scroll at 320-375px; check 375 / 768 / 1366.

## Do / Don't

**Do**
- Build from `Window`, `Section`, `SectionHeading`, `Hierarchy` first.
- Take sizes from `--text-*`, shadows from `shadow-8bit-*`, motion from
  `motion-tokens.ts`; reference palette vars, never raw hex in components.
- Keep one primary (blue) button per view; secondary is paper.
- Pair every figure with a clause and a path to its evidence.
- Let buttons, tiles and chips press into their shadow.
- Use a filename-style title for every window (`about_me.txt`).

**Don't**
- Use yellow for anything that isn't AI (the hero name is the one exception).
- Add blur shadows, gradients, glassmorphism, rounded cards or a CRT overlay.
- Set paragraphs in Mono, Press Start 2P or Bangers, or in all caps.
- Go below 13px for labels or 15px for body (beyond the listed exceptions).
- Add scroll-triggered motion, new loops or particles outside the hero.
- Put decoration (stickers, bursts, mascot) over reading text.
- Invent figures, outcomes or dates; describe Desk Assist as in progress.
