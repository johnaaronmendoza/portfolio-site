# Portfolio design system: neo-brutalist retro web

Source of truth for every page of John Aaron's portfolio. Page files in
`pages/` override this file only where they say so. CLAUDE.md's design and
honesty rules win over anything here; if the two disagree, CLAUDE.md is right
and this file has a bug.

Direction in one line: a 90s web desktop rebuilt with modern discipline. Dark
navy page with a faint pixel grid, cream OS windows with violet title bars,
solid orange and teal blocks, 3px black outlines, hard offset shadows, pixel
type, straight marquee strips.

The one memorable thing: **the window**. Every section is a window or sits on
a solid band; nothing else competes. The hero's `welcome.exe` window with
John's two-tone scrambling name is the single loud moment of the page.

---

## 1. Tokens

### 1.1 Colour

Defined as CSS variables in `client/src/index.css` and used through Tailwind
arbitrary values (`bg-[var(--orange)]`). Never write raw hex in components.

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#16163F` | Page base |
| `--ink` | `#000000` | Outlines, shadows, text on light/accent fills |
| `--cream` | `#F4EAD5` | Window bodies, light text on navy/violet |
| `--orange` | `#FF7A2F` | Primary accent: primary buttons, stats strip, marquee, active chip |
| `--teal` | `#2EC4B6` | Secondary accent: secondary buttons, Projects band, marquee, highlights |
| `--violet` | `#6C4AD0` | Window title bars, footer band |
| `--amber` | `#F59E0B` | Only the AI keys on the Skills keyboard (the AI story). Nowhere else |
| `--focus` | per surface | Focus ring colour; set by the surface, see 1.7 |

Page grid texture (already built in `body::before`): 24px cells, 1px lines,
teal at 7% and violet at 12% alpha. It is the only alpha colour on the page and
it never sits on top of a window or band (they are opaque).

No gradients, no tints, no `#111`-style near-blacks, no greys. `bg-zinc-*`
and `text-zinc-*` are off-palette and should be replaced with tokens.
One functional alpha exception: the modal scrim behind the command palette,
terminal and shortcuts overlay is `bg-black/70` (never `bg-opacity-*`, which
Tailwind v4 removed).

The shadcn variables in `index.css` (`--primary`, `--ring`, `--border`,
`--card`...) and the `.shadow-8bit*` utilities alias these tokens; they never
hold their own hex: `--background: var(--navy)`, `--foreground` /
`--primary-foreground`... see section 2.10 for the full map.

### 1.2 Contrast: every text pairing (WCAG 2.x relative luminance, computed)

Approved pairings (CLAUDE.md). "Large" = 24px+ regular or 18.66px+ bold.

| Text | On | Ratio | AA normal (4.5) | Used for |
|---|---|---|---|---|
| cream | navy | **14.40** | pass | Body and headings on the page |
| orange | navy | **6.62** | pass | Section heading first word, role-line prompt |
| teal | navy | **7.94** | pass | Section heading rest, Skills group labels |
| navy | cream | **14.40** | pass | Window body text |
| ink | cream | **17.58** | pass | Window headings, chips, tags |
| ink | orange | **8.08** | pass | Primary button, stats strip, orange marquee, year badge |
| ink | teal | **9.69** | pass | Secondary button, teal marquee, Projects band heading |
| white | violet | **5.95** | pass | Title bar (if white is ever needed) |
| cream | violet | **4.98** | pass | Title bars, footer text |
| ink | amber | **9.78** | pass | Skills AI keycaps |
| cream | ink | **17.58** | pass | `welcome.exe` terminal body (hero variant) |
| orange | ink | **8.08** | pass | Hero name line 1 on the terminal body |
| teal | ink | **9.69** | pass | Hero name line 2 on the terminal body |
| amber | navy | **8.01** | pass | Legacy AI highlight on navy (Skills only) |

The last four rows are the hero terminal variant and the existing Skills
keyboard. "On ink" is the same physics as "on navy" for these colours but
CLAUDE.md does not list it; the lead should confirm the terminal variant
(see 2.1).

Banned pairings, with the numbers that justify the ban:

| Text | On | Ratio | Why banned |
|---|---|---|---|
| orange | teal | 1.20 | Unreadable |
| orange | violet | 2.29 | Fails even large text |
| teal | violet | 2.75 | Fails even large text |
| orange | cream | 2.18 | Fails; never put orange text inside a window |
| teal | cream | 1.81 | Fails; never put teal text inside a window |
| ink | violet | 3.53 | Large text only; don't use, cream is better |
| ink | navy | 1.22 | Invisible. Black text never sits on the page |
| violet | navy | 2.89 | Fails |

Non-text contrast (WCAG 1.4.11, 3:1) for component edges:

| Edge | Against | Ratio | Verdict |
|---|---|---|---|
| ink border | cream, orange, teal | 17.58 / 8.08 / 9.69 | pass |
| ink border | violet | 3.53 | pass |
| cream window body | navy | 14.40 | pass: the window shape reads from its fill |
| ink border/shadow | navy | **1.22** | **decorative only** |

The last row matters: on the navy page the black outline and hard shadow are
almost invisible. The window still reads because its cream fill is 14.40:1,
but the shadow does little. Rules that follow from this:
- Never rely on an ink border or ink shadow to make something visible on navy.
  The fill must do it (cream, orange, teal), or the border must be cream (ghost
  button).
- Windows on navy use the larger shadow offset (8px from `lg`, see 1.5) so the
  shift is visible as a dark "gap" against the grid texture.
- On orange, teal, cream and violet surfaces the ink shadow reads fully; that
  is where the neo-brutalist depth shows best.

### 1.3 Typography

Families (already loaded): `Press Start 2P` (`font-pixel`) for display,
title bars, chips and badges; `Courier Prime` (`font-mono`, body);
`VT323` reserved for the Skills keyboard legends only, if it uses it already.
Two families do the work: one pixel, one mono. Don't add a third.

Scale, in px. "375" is the base, "1366" applies from `lg` (1024) up unless
noted. `sm` (640) and `md` (768) values sit between; pick the nearest step.

| Step | Family | 375 | 1366 | Line height | Use |
|---|---|---|---|---|---|
| `display-xl` | pixel | `clamp(20px,7vw,30px)` (26 at 375) | 48 | 1.25 | Hero name (h1). 30px at 375 overflows: 9 glyphs + cursor ≈ 296px vs 289px body |
| `display-l` | pixel | 26 | 48 | 1.2 | Section headings (h2) |
| `display-m` | pixel | 18 | 24 | 1.35 | Featured tile titles, footer h2 (22/28 ok) |
| `display-s` | pixel | 15 | 18 | 1.5 | Org names, tile titles, footer h3 (14) |
| `stat` | pixel | 24 | 38 | 1.0 | Stats strip numbers, `tabular-nums` |
| `marquee` | pixel | 14 | 16 | 1.0 | Marquee strip phrases |
| `label` | pixel | 12 | 12 | 1.5 | Title bars, chips, badges. Never below 12 |
| `lead` | mono bold | 16 | 18 | 1.6 | First line of a bio, positioning line |
| `body` | mono | 15 | 16 | 1.65 | All paragraphs and list items |
| `meta` | mono | 15 | 16 | 1.5 | Dates, facts lists, role line |
| `fine` | mono | 14 | 14 | 1.5 | Copyright line only |

Rules:
- Press Start 2P is only for short strings (≤ 5 words, or a name). Never a
  sentence, never a paragraph. It is about 1em wide per glyph, so a 15px
  pixel title fits ~20 characters per line at 375. Titles may wrap; use
  `text-wrap: balance` and `break-words`.
- Body measure: `max-w-[65ch]` (Courier Prime is monospace, so 65ch ≈ 65
  characters; always under 80).
- Use `text-wrap: pretty` on body paragraphs and tile descriptions,
  `balance` on headings and tile titles.
- Numbers that update or align (stats, SGT clock) use `tabular-nums`.
- Case: sentence case for buttons, chips, tags and body copy. Pixel display
  headings may be upper case (the pixel font reads as a logotype there).
  Don't set labels in all caps just because they are labels.
- Display headings are two-tone on navy: first word orange, rest teal (6.62
  and 7.94). One-word headings stay orange and the 6px teal rule beside them
  carries the second tone. On the teal band, headings are ink only.

### 1.4 Spacing (4px base; density 5 = standard)

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | Icon-to-text nudge, tag inner y |
| `space-2` | 8 | Chip gap at 375, tag padding x |
| `space-3` | 12 | Chip gap at 1366, title bar padding x |
| `space-4` | 16 | Page gutter at 375, tile inner gap |
| `space-6` | 24 | Window body padding at 375, tile grid gap |
| `space-8` | 32 | Page gutter at 640, stack gap between items |
| `space-10` | 40 | Window body padding at 640, gap between windows |
| `space-12` | 48 | Heading-to-content gap |
| `space-14` | 56 | Window body padding at 1024+ |
| `space-16` | 64 | Page gutter at 1024+ |
| `space-20` | 80 | Section padding y at 375 |
| `space-28` | 112 | Section padding y at 1024+ |

Containers: text sections `max-w-5xl` (1024px); Projects and Footer
`max-w-6xl` (1152px). Gutters `px-4 sm:px-8 lg:px-16`. The gutter must be at
least the shadow offset, so a window's shadow never causes horizontal scroll.

### 1.5 Borders, shadows, radii

| Token | Value | Use |
|---|---|---|
| `border-frame` | 3px solid ink | Windows, buttons, chips, tiles, bands, strips, photo |
| `border-fine` | 2px solid ink | Tags and badges (small, static) |
| `rule-heading` | 6px solid teal (ink on teal band) | Section heading rule |
| `shadow-window` | `6px 6px 0 0 ink`; `8px 8px 0 0 ink` from `lg` | Windows |
| `shadow-raised` | `4px 4px 0 0 ink` | Buttons, project tiles, photo |
| `shadow-chip` | `3px 3px 0 0 ink` | Filter chips |
| `shadow-none` | none | Pressed state, tags, badges, strips, bands |
| `radius` | 0 | Everything. No rounded corners anywhere |

Shadow meaning: among small elements, **a shadow means you can press it**.
Buttons and chips have shadows; tags and badges never do. Windows and tiles
have shadows because they are surfaces you open. Never blur, never stack
soft shadows, never animate shadow size on scroll.

### 1.6 Motion tokens (`client/src/lib/motion-tokens.ts`, CSS `--ease-out`)

| Token | Value | Use |
|---|---|---|
| `press` | 150ms, `--ease-out` | Button/chip/tile press and release |
| `hover` | 150ms, `--ease-out` | Hover colour and lift |
| `exit` | 150ms | Filtered tile leaving |
| `enter` | 200ms | Filtered tile arriving (opacity + 12px y) |
| `hero` | 550ms per line, 180ms stagger, starts at 200ms; whole hero done by ~1.6s | The one load-in moment |
| `marquee` | linear, 60px/s | Marquee strips |

Transition properties are always listed: `transition-property: translate,
box-shadow, background-color, color`. Never `transition: all`.

### 1.7 Focus

All focus uses `:focus-visible` (not `:focus`), 3px solid outline, 3px offset,
colour from `--focus`, which each surface sets:

| Surface | `--focus` | Ring vs surface |
|---|---|---|
| navy page | orange | 6.62:1 |
| cream window body | ink | 17.58:1 |
| teal band (outside windows) | ink | 9.69:1 |
| orange strip | ink | 8.08:1 |
| violet footer | cream | 4.98:1 |
| black terminal body | orange | 8.08:1 |

Floating controls (Pause motion, chat launcher, command palette) cross every
band, so they use `outline-offset: 0`: the ring hugs the 3px ink border, which
guarantees at least 3:1 against one adjacent colour on any band. Keep sticky
or floating UI from covering a focused control (WCAG 2.4.11): leave
`scroll-padding-bottom: 88px` so content tabbed into view isn't hidden behind
the bottom-left Pause button or bottom-right chat launcher.

---

## 2. Components

### 2.1 Window (core motif)

```
┌─────────────────────────────────────────────┐ ← 3px ink border
│▓ about_me.txt                         ○ □ ✕▓│ ← title bar: violet, min-h 36px
├─────────────────────────────────────────────┤ ← 3px ink rule
│                                             │
│  body: cream, navy text, padding 24/40/56   │
│                                             │
└─────────────────────────────────────────────┘█
 █████████████████████████████████████████████  ← 6px (8px lg) ink shadow
```

- Title bar: `font-pixel` 12px, cream on violet (4.98), padding 6px 12px,
  title truncates with ellipsis, never wraps. Title is filename style, lower
  case, from real content (`about_me.txt`, `lga_telecom.exe`). It is a `<p>`;
  the real heading lives in the body or above the window.
- Controls ○ □ ✕: `aria-hidden="true"`, not focusable, no hover state, default
  cursor. They are decoration and must not look clickable (no shadow, no
  border, letter-spacing 0.35em).
- Body: cream fill, navy text, ink headings, `--focus: ink`. Padding 24px at
  375, 40px at 640, 56px at 1024.
- Shadow: `shadow-window`.
- Variants:
  - `default`: as above.
  - `terminal`: black body, cream text, `--focus: orange`. Used by the hero
    `welcome.exe` (confirmed in CLAUDE.md, Oct 2026) and by the overlays in
    2.10, because orange/teal text needs a dark surface (orange on cream is
    2.18).
  - `wide`: Projects `featured_projects`, padding 16/24/32 so the tile grid
    gets the width.
- States: windows are not interactive. No hover lift, no reveal on scroll.
- Never nest a window inside a window. Tiles inside a window are "cards", not
  windows (no title bar).

### 2.2 Buttons

Shared anatomy: `inline-flex`, gap 8px, min-height 44px, padding 10px 20px,
3px ink border, `shadow-raised`, Courier Prime bold 15px, letter-spacing
0.04em, sentence case. Optional 16px pixel icon on the left (`aria-hidden`).
External links end with ↗ plus visually hidden "(opens in a new tab)".
No → arrows on labels.

| Variant | Fill | Text | Border | Ratio | Use |
|---|---|---|---|---|---|
| primary | orange | ink | ink | 8.08 | One per view: Resume, Email me |
| secondary | teal | ink | ink | 9.69 | Second action next to a primary (e.g. "Read case study") |
| ghost (on navy) | transparent | cream | cream | 14.40 | GitHub, LinkedIn in hero |
| ghost (on cream) | transparent | ink | ink | 17.58 | Low-emphasis action inside a window |

States (primary and secondary):

| State | Change |
|---|---|
| rest | `shadow-raised` (4px) |
| hover (only `@media (hover:hover) and (pointer:fine)`) | `translate: -2px -2px`, shadow 6px 6px |
| active / pressed | `translate: 4px 4px`, shadow 0: the button sinks into its shadow |
| focus-visible | 3px ring, colour from surface (1.7) |
| disabled | not used on this site. If ever needed: cream fill, ink text, no shadow, `aria-disabled="true"`, `cursor: not-allowed`; never lower text opacity |

Ghost hover: fills cream, text turns navy (14.40). Ghost active: same press
translate. No magnetic or cursor-following effects: they fight the press
metaphor and move the target away from the pointer.

### 2.3 Filter chips (Projects)

```
┌──────┐┐  ┌────────┐┐  ┌────────┐
│ All  │█  │ Python │█  │ React  │   ← active chip: orange, sunk, no shadow
└──────┘█  └────────┘█  └────────┘
 ███████    █████████
```

- `<button aria-pressed>` in a `role="group"` with `aria-label="Filter
  projects by technology"`.
- `font-pixel` 12px, ink text, padding 8px 12px, min-height 44px, 3px ink
  border, `shadow-chip`, `whitespace-nowrap`.
- Rest: cream fill (17.58). Hover: teal fill (9.69). Active (`aria-pressed=
  true`): orange fill (8.08), translated 3px 3px, no shadow. Pressing: same as
  active while held. Focus: ink ring (on cream body).
- Row: `flex-wrap`, gap 8px (375) / 12px (1366). Wraps, never scrolls
  sideways.
- Labels are the existing filter tags in their existing case (React, Python,
  Kotlin, K8s, TypeScript, gRPC, ML/AI) plus "All". Not uppercased.
- Announce the result count in a polite live region after each change ("3
  projects shown"), without moving focus.
- Empty state: one line in mono ("No projects use {tag} yet.") and a
  secondary button "Show all projects".

### 2.4 Tags and badges (static)

- Tag (tech stack on tiles): Courier Prime bold 14px, ink text on cream,
  2px ink border, padding 2px 8px, **no shadow** (static). Gap 6px, wraps.
- Badge (year, "Internship", "Education", "Featured", "In progress"):
  `font-pixel` 12px, 2px ink border, padding 4px 8px, no shadow. Fills:
  orange (year, Internship, Featured), teal (Education, In progress). Text
  always ink. Badge copy sentence case.

### 2.5 Marquee strip

```
═══════════════════════════════════════════════════  ← 3px ink
 PROJECTS ✦ SILVERLINK SG ✦ SCS AWARENESS PLATFORM ✦ PRO…   (orange or teal fill)
═══════════════════════════════════════════════════  ← 3px ink
```

- Full-bleed, straight (no rotation), orange or teal fill, ink text,
  `font-pixel` 14/16px, padding-y 12px (375) / 16px (640+): total height
  ≈ 46px / 54px.
- Separator: the `sparkle.svg` asset at 16px (replaces the ★ glyph), ink.
- `aria-hidden="true"`; every phrase must also appear in real content.
- Motion: CSS `transform: translateX` only, linear at 60px/s, alternate
  direction on alternating strips. Pauses on hover, pauses when
  `html[data-motion="paused"]` (the visible "Pause motion" toggle, WCAG
  2.2.2), and is fully static under `prefers-reduced-motion` (no animation at
  all, first repeat left-aligned).
- Adjacency: a strip never touches a band of its own colour (no teal strip
  against the teal Projects band). Touching 3px borders collapse into one rule
  with `-mt-[3px]` / `-mb-[3px]`.
- At most one strip between any two sections. No strip directly above the
  footer.

### 2.6 Stats strip

```
┌────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ ☺      │ 2           │ 6           │ 89.6%       │ 4           │
│ HELLO! │ industry    │ projects    │ ML model    │ languages on│
│        │ internships │ built       │ accuracy    │ the SCS ... │
└────────┴─────────────┴─────────────┴─────────────┴─────────────┘
 cream    orange cells, ink text; 3px ink gaps are the dividers
```

- `<section aria-label="Key figures">` with a `<dl>`; label first in the DOM,
  number shown on top (`flex-col-reverse`).
- Number: `stat` step, `tabular-nums`. Label: `meta` step, `max-w-[18ch]`.
- Cells: orange, ink text (8.08). HELLO! cell: cream fill, ink text (17.58),
  `smiley.svg` at 32px above the word, both `aria-hidden` (HELLO! is a
  greeting, not data).
- Layout: 2×2 below `lg`; HELLO! cell + 4 cells in one row from `lg`. HELLO!
  cell hidden below `md`.
- Only figures already on the site (see `pages/home.md`). No count-up
  animation: numbers render final.

### 2.7 Project tile (card inside the `featured_projects` window)

```
┌──────────────────────────────┐
│  [ screenshot, 3px rule ]    │ h 192 (224/288 featured)
├──────────────────────────────┤
│ SilverLink SG        [2025]  │ title display-s/m + year badge
│ Cloud-native platform ...    │ body 15/16, pretty
│ ■ 8-node cluster             │ facts list, mono bold
│ ■ 4 services ■ WebRTC        │
│ [React] [gRPC] [K8s]         │ tags, no shadow
└──────────────────────────────┘█
 ██████████████████████████████
```

- One `<a>` (wouter `Link`, or external `<a>` for GreenLoopFarms) wraps the
  whole tile; no nested interactive elements. Accessible name = project name
  (the `<h3>`).
- Cream fill, 3px ink border, `shadow-raised`. Image: `object-cover`, 3px ink
  rule below, `alt=""` (the title names it; the screenshot is illustrative).
- Featured tiles (SilverLink SG, SCS Awareness Platform): taller image, title
  at `display-m`, always in colour, orange "Featured" badge top-left of the
  image.
- Facts line: split the existing metric string on "·" and render each part as
  a list item with a 10px ink square bullet; keep the original wording.
- States (hover-capable pointers only for hover):

  | State | Change |
  |---|---|
  | rest | 4px shadow; non-featured images greyscale |
  | hover | `translate: -2px -2px`, shadow 6px; image to colour (filter, 200ms) |
  | active | `translate: 4px 4px`, shadow 0 |
  | focus-visible | 3px ink ring, offset 6px (clear of the shadow) |

- No image zoom beyond `scale(1.03)`; no tilt; no wiggle.

### 2.8 Section heading

`<h2>` `display-l`, two-tone on navy (orange + teal) or ink on teal, followed
by a flexible 6px rule (`aria-hidden`). Optional 32px section icon (from
`assets.md`) to the left, `aria-hidden`, gap 16px. Margin below 48px.

### 2.9 Pause motion toggle

Existing `SectionNav` button. Keep: fixed bottom-left, cream fill / orange
when paused, `aria-pressed`, visible text "Pause motion" from `sm`, 44px min.
Hidden under `prefers-reduced-motion` (nothing moves to pause).

### 2.10 Overlays: chat panel, command palette, terminal, shortcuts

Each is a `terminal`-variant Window (`.window` + `.window-bar` + black body),
so it inherits the 3px ink frame, ink shadow and violet title bar. Title is a
filename: `chat.exe`, `commands.exe`, `terminal.sh`, `shortcuts.txt`. Close
control is a real 44×44 `<button aria-label="Close …">` in the bar, cream
text, `--focus: cream` (4.98 on violet).

Old class → token (all ratios on the black body unless noted):

| Old | New | Ratio |
|---|---|---|
| `bg-zinc-900` (bars, input rows) | bar: `.window-bar`; rows: `bg-black` | |
| `border-4 border-amber-400`, `shadow-8bit`, inline `#F59E0B` shadow | `.window` | |
| `border-amber-400` / `border-blue-400` / `border-zinc-800` (inner rules) | `border-[color:var(--cream)]` 2px, or drop the rule | 17.58 non-text |
| `text-white`, `text-gray-300` | `text-[color:var(--cream)]` | 17.58 |
| `text-gray-500/600`, `text-zinc-500/600` (meta, timestamps, hints) | `text-[color:var(--cream)]` | 17.58 |
| `text-amber-400` (prompts `>` `$`, typed input echo) | `text-[color:var(--orange)]` | 8.08 |
| `text-blue-400` (status, system lines) | `text-[color:var(--teal)]` | 9.69 |
| `text-red-400` (errors) | `bg-[var(--orange)] text-black px-1` + "error:" prefix | 8.08 |
| `caret-amber-400` | `caret-[var(--orange)]` | |
| selected row `bg-amber-400 text-black` | `bg-[var(--orange)] text-black` (description inherits) | 8.08 |
| row hover `hover:bg-zinc-900` | `hover:bg-[var(--teal)] hover:text-black` | 9.69 |
| user bubble | `bg-[var(--orange)] text-black` | 8.08 |
| bot bubble | `bg-[var(--cream)] text-[color:var(--navy)]` | 14.40 |
| quick-action buttons | `btn btn-ghost` (cream on black; hover cream fill, navy text) | 17.58 / 14.40 |
| SEND / submit | `btn btn-primary`, label "Send"; disabled = cream fill, no shadow, never `opacity-50` | 8.08 |
| input `outline-none` | keep it on the `<input>`, add to its row `focus-within:outline focus-within:outline-[3px] focus-within:outline-[var(--orange)] focus-within:outline-offset-2` | 8.08 |
| backdrop | `bg-black/70` | |

Sizes: message and output text 15px mono (`text-[15px]`), inputs 16px
(`text-base`, also stops iOS zoom), timestamps, shortcut hints and
descriptions 14px (`text-sm`, `fine` step). Nothing below 12px; no
`text-[9px]`/`text-[10px]`.

Shadcn alias map (`index.css` `:root` and `.dark`): `--background: navy`,
`--foreground: cream`, `--card`/`--popover`/`--muted`/`--input: cream`,
`--card-foreground`/`--popover-foreground`/`--muted-foreground: navy`,
`--primary: orange`, `--primary-foreground: ink`, `--secondary`/`--accent:
teal`, `--secondary-foreground`/`--accent-foreground: ink`, `--border: ink`,
`--ring: orange`, `--sidebar*` the same. `.shadow-8bit-sm/-/-lg` keep their
offsets with `var(--ink)`; delete `.shadow-8bit-blue`, `.shadow-8bit-dark`,
`.scroll-progress-glow`, `.border-8bit*`, `.hover-8bit*`.

Motion: open 150–200ms opacity + translate only; no white CRT flash.

---

## 3. Motion rules

1. The hero is the only load-in moment: window scales in (400ms), name lines
   reveal and scramble, role line and paragraph fade in, CTAs last. Done by
   ~1.6s.
2. John's hero effects stay: WebGL particles, scrambling name, floating
   pixels, blinking cursor. Nothing like them anywhere else.
3. Marquee strips: see 2.5.
4. Press: buttons, chips and tiles sink into their shadow (`translate`, not
   `scale`) in 150ms.
5. No scroll-triggered fades, no scroll-linked transforms, no parallax, no
   passive pop-ups. `FramerReveal` stays a static wrapper.
6. Under `prefers-reduced-motion: reduce`: no particles, name renders final
   (no scramble, no clip reveal), floating pixels and blinking cursors are
   static, marquee static, presses are instant colour/position changes with
   no transition. Framer Motion loops (floating pixels, cursor, scroll arrow)
   are JS and are **not** stopped by the CSS media query; wrap the app in
   `<MotionConfig reducedMotion="user">` or gate each loop on
   `useReducedMotion()`.

## 4. Responsive rules

| Width | Rules |
|---|---|
| 375 (base) | Single column. Gutter 16px. Body 15px. Windows full width minus gutter. Stats 2×2, no HELLO cell. Chips wrap. Hero CRT illustration hidden. Pause button icon-only |
| 640 `sm` | Gutter 32px. Body 16px. Window padding 40px. Project grid 2 columns |
| 768 `md` | HELLO! cell appears. About window goes side by side. Footer 3 columns |
| 1024 `lg` | Gutter 64px. Window shadow 8px. Project grid 6-col spans (3+3, 2+2+2, 3+3). Hero shows CRT. Stats in one row. Section dot nav visible |
| 1366 (check) | Content centred in 1024/1152 containers; nothing stretches past them except bands, strips and the hero particles |

Always: no horizontal scroll at 375 (shadow ≤ gutter, chips and tags wrap,
long words `break-words`), 44px targets with ≥ 8px between, decoration never
on top of body text.

## 5. Accessibility checklist (per component, before hand-off)

- [ ] Every text pairing is in table 1.2's approved list
- [ ] `:focus-visible` ring visible on every surface, colour from 1.7
- [ ] All targets ≥ 44×44px, ≥ 8px apart
- [ ] Decorative SVGs and glyphs (○□✕, ✦, ☺, icons beside text) `aria-hidden`
- [ ] Meaningful images have real `alt`; illustrative screenshots inside a
      named link use `alt=""`
- [ ] Marquee pauses on hover, on the toggle, and is static with reduced motion
- [ ] No `transition: all`, no blur shadows, no gradients
- [ ] 375 and 1366 checked, no horizontal scroll

## 6. Where ui-ux-pro-max was used

- `--design-system "creative portfolio retro web pixel neo-brutalism"
  --variance 8 --motion 4 --density 5`: kept Brutalism style (0 radius,
  visible borders, large blocks, asymmetric), Press Start 2P / VT323 pairing,
  standard 4px spacing scale, the reduced-motion and focus checklist items.
  Discarded: its pink/cyan palette (CLAUDE.md palette wins), "instant / no
  transitions" (we use 150ms press for feedback), "Scroll-Triggered
  Storytelling" pattern and GSAP scroll stagger (CLAUDE.md bans scroll-
  triggered motion), "hover transitions on every card" checklist line.
- `--domain ux`: focus states, focus not obscured (WCAG 2.4.11 → scroll
  padding for floating controls), reduced motion, excessive motion (1–2
  animated things per view), target size.
- `--domain typography "pixel font readability"`: "Press Start 2P is very
  wide; VT323 better for body". Kept the warning, but body stays Courier
  Prime (more legible than VT323 at 15–16px).
- `--domain icons "decorative icon aria hidden"`: decorative beside visible
  text → `aria-hidden`; meaningful alone → text alternative. Discarded the
  Phosphor/Heroicons library advice: icons here are original pixel SVGs.
- `--stack html-tailwind "focus-visible ring offset"`: `focus-visible`, not
  `focus`.
- `--stack react "focus ring keyboard"`: focus management for the command
  palette and chat dialog (trap and return focus).
- No database match (fallback to built-in rules, stated as such): window/card
  title bar style, marquee + reduced motion for React, decorative SVG alt for
  React. The quick-reference rule `auto-rotation-controls` (moving content
  needs pause/stop and stops on reduced motion) covers the marquee.
