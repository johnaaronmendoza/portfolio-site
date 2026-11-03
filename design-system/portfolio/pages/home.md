# Home page spec

Overrides MASTER.md only where stated. Order:
Hero → StatsBand → strip → About → strip → Experience → strip → Projects
(teal band) → strip → Skills → Footer (violet band).

The 30-second read for a recruiter, top to bottom: **name + "AI and data tools
people can trust"** (hero) → **real figures** (stats) → **who he is** (About)
→ **Desk Assist in progress at LGA Telecom** (first Experience window) →
**SilverLink SG and SCS Awareness Platform** as the two featured tiles.

All copy below is existing site copy (components as of branch `retro-web`).
Nothing new is invented. Where a label is reworded (button text) the facts
are unchanged.

Asset file names refer to `design-system/portfolio/assets.md`; the
asset-artist delivers them to `client/public/assets/pixel/`.

---

## Rhythm of colour down the page

```
navy   ░ Hero: welcome.exe (black terminal window) + CRT ░
orange █ Stats strip (cream HELLO! cell)                 █
teal   ▓ marquee  HELLO ✦ AI ✦ DATA ✦ FULL-STACK          ▓
navy   ░ About: about_me.txt (cream window)               ░
teal   ▓ marquee  EXPERIENCE ✦ LGA TELECOM ✦ ...           ▓
navy   ░ Experience: 3 cream windows                       ░
orange █ marquee  PROJECTS ✦ SILVERLINK SG ✦ ...           █
teal   ▓ Projects band: featured_projects window           ▓
orange █ marquee  SKILLS ✦ PRESS A KEY                     █
navy   ░ Skills: keyboard + plain list                     ░
violet ▒ Footer: 3 columns                                 ▒
```

Never two same-colour blocks touching: the teal Projects band is fenced by
orange strips; the stats strip (orange) is followed by a teal strip.

---

## 1. Hero `#hero`

Purpose: the one loud moment. Name, positioning line, Resume.

### 375

```
┌───────────────────────────────────┐  navy + particles + floating pixels
│                                   │
│ ┌───────────────────────────────┐ │
│ │▓ welcome.exe          ○ □ ✕ ▓│ │  violet bar
│ ├───────────────────────────────┤ │
│ │ JOHN AARON          (orange)  │ │  black terminal body
│ │ BRANZUELA█          (teal)    │ │  display-xl 30px, cursor orange
│ └───────────────────────────────┘ │█
│                                   │
│ > AI · DATA · FULL-STACK▌         │  > orange, text teal, 15px
│                                   │
│ I build AI and data tools that    │  body 15px cream, max 60ch
│ people can trust. Right now that  │
│ means an AI assistant that helps  │
│ service desk agents at LGA ...    │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ ▣ Resume (PDF)                │ │  primary, full width at 375
│ └───────────────────────────────┘ │█
│ ┌──────────────┐ ┌──────────────┐ │
│ │ GitHub ↗     │ │ LinkedIn ↗   │ │  ghost, cream border
│ └──────────────┘ └──────────────┘ │
│              ⌄                    │  scroll cue
└───────────────────────────────────┘
```

### 1366

```
┌──────────────────────────────────────────────────────────────────────┐
│  navy page, WebGL particles full-bleed, floating pixels at edges      │
│                                                                      │
│   ┌──────────────────────────────────────┐        ✦                 │
│   │▓ welcome.exe                 ○ □ ✕ ▓│      \  |  /             │
│   ├──────────────────────────────────────┤    ── ┌──────┐ ──         │
│   │                                      │   ── │▒▒▒▒▒▒│ ──  starburst│
│   │  JOHN AARON            (orange 48px) │   ── │ >_   │ ──  + CRT   │
│   │  BRANZUELA█            (teal 48px)   │      └──┬───┘    256px    │
│   │                                      │      ▄▄▄▄█▄▄▄▄            │
│   └──────────────────────────────────────┘█    /  |  \     ✦         │
│    ████████████████████████████████████████                          │
│   > AI · DATA · FULL-STACK▌                                          │
│   I build AI and data tools that people can trust. Right now that    │
│   means an AI assistant that helps service desk agents at LGA ...    │
│                                                                      │
│   [▣ Resume (PDF)]█   [GitHub ↗]  [LinkedIn ↗]                       │
│                                   ⌄                                  │
└──────────────────────────────────────────────────────────────────────┘
   grid: 12 cols in max-w-6xl; text column cols 1–7, art cols 8–12
```

### Spec

- Layout: `min-h-[100svh]`, content vertically centred. Below `lg`: one
  column, `max-w-4xl`. From `lg`: `grid-cols-12` in `max-w-6xl`; text
  column `col-span-7`, art `col-span-5`, art vertically centred.
- `welcome.exe`: Window **terminal variant** (MASTER 2.1), padding 32/40/48.
  Name line 1 "JOHN AARON" orange (8.08 on black), line 2 "BRANZUELA" teal
  (9.69). Two-tone at line level, which matches the references' two-tone
  headline without accenting a single word. Blinking orange cursor after line
  2. `<h1>` accessible text stays "John Aaron Mendoza Branzuela"
  (`aria-label` on the h1 or a visually hidden span), since the visible name
  drops "Mendoza".
- Role line: existing `AI · DATA · FULL-STACK` with `>` prompt and block
  cursor. Raise to 15/16px (currently 14px).
- Positioning paragraph: existing copy, `body` step, `max-w-[60ch]`, cream.
- CTAs (lead decision, Oct 2026: Email me joins the hero; labels per
  `copy.md`):
  - Primary: label "Download resume", `floppy.svg` 16px left (`aria-hidden`),
    same href and `download` name as today. Full width at 375, auto from
    `sm`.
  - Ghost: "Email me" (`icon-contact.svg` 16px), "GitHub", "LinkedIn" with
    the pixel icons in `currentColor`, plus sr-only "(opens in a new tab)" on
    the two external links. No visible ↗ (copy.md).
- Art (≥ `lg` only, `aria-hidden`, `pointer-events: none`):
  `starburst.svg` at 384px (48×48 × 8) behind `crt-computer.svg` at 256px
  (64×64 × 4), CRT offset so the starburst shows on all sides. Two
  `sparkle.svg` at 32px near the top-right and bottom-left of the burst,
  static. Below `lg` the art is not rendered (keeps name + CTA above the fold
  at 375 and avoids art sitting under text).
- Keep: particles (skipped with reduced motion), scramble, floating pixels,
  blinking cursors, the load-in sequence.
- **Removed** (lead confirmed; CLAUDE.md now records it):
  1. the scroll-linked shadow growth and lift on the hero window
     (`useScroll`/`useTransform`): it is scroll-driven motion and makes the
     window shadow inconsistent with every other window. Use a static
     `shadow-window`.
  2. the magnetic Resume button: it moves the target away from the pointer and
     fights the press-into-shadow behaviour. Use the standard `.btn` press.
- Scroll cue: a real `<button aria-label="Skip to About">` (currently has no
  name, and `text-xs` at 70% opacity is under 15px and lowers contrast). 44px
  target, orange chevron at full opacity (6.62), bounce stops with reduced
  motion.

---

## 2. Stats strip (directly under hero)

### 375

```
┌────────────────┬────────────────┐  orange cells, 3px ink gaps
│ 2              │ 6              │  stat 24px
│ industry       │ projects       │  meta 15px
│ internships    │ built          │
├────────────────┼────────────────┤
│ 89.6%          │ 4              │
│ ML model       │ languages on   │
│ accuracy       │ the SCS        │
│                │ platform       │
└────────────────┴────────────────┘
```

### 1366

```
┌──────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│   ☺      │ 2            │ 6            │ 89.6%        │ 4            │
│ HELLO!   │ industry     │ projects     │ ML model     │ languages on │
│ (cream)  │ internships  │ built        │ accuracy     │ the SCS ...  │
└──────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

- Component per MASTER 2.6. Figures (existing, all traceable): 2 industry
  internships (Experience), 6 projects built (six case-study pages), 89.6% ML
  model accuracy (UWB, 89.61%), 4 languages on the SCS platform.
- `smiley.svg` at 32px above "HELLO!" in the cream cell (`md`+).
- The teal marquee "HELLO ✦ AI ✦ DATA ✦ FULL-STACK" follows with
  `-mt-[3px]`.

---

## 3. About `#about`

### 375

```
 ▣ ABOUT ME ━━━━━━━━━━━━━━           icon-about 32px, two-tone h2
┌───────────────────────────────┐
│▓ about_me.txt         ○ □ ✕ ▓│
├───────────────────────────────┤
│   ┌───────────────────────┐   │
│   │      photo 224px      │   │  3px ink, 4px shadow
│   └───────────────────────┘█  │
│ Studying:   SIT × University  │  facts dl, 15px
│             of Glasgow        │
│ Graduating: April 2027        │
│ Now:        LGA Telecom       │
│ Based in:   Singapore         │
│                               │
│ I build technology for the    │  lead, bold
│ people who have to use it.    │
│ Most projects don't fail on   │  body
│ the code. ...                 │
└───────────────────────────────┘█
```

### 1366

```
 ▣ ABOUT ME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────────────────┐
│▓ about_me.txt                                              ○ □ ✕ ▓│
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    I build technology for the people who have     │
│  │  photo 288   │    to use it.                                     │
│  │              │                                                   │
│  └──────────────┘█   Most projects don't fail on the code. They     │
│  Studying:   SIT ×   fail in the gap between ... (max 65ch)         │
│  Graduating: Apr 27                                                 │
│  Now:        LGA     My path started on-site at Sembcorp Solar ...  │
│  Based in:   SG                                                     │
│                      I learn fast, speak both engineer and ...      │
└─────────────────────────────────────────────────────────────────────┘█
```

- Section heading "ABOUT ME" with `icon-about.svg` (document) 32px left.
- Window `about_me.txt`, existing photo, facts and four bio paragraphs.
- Side by side from `md`: photo column fixed 288px, bio `flex-1`.
- Photo: `alt="John Aaron Mendoza Branzuela"` (meaningful: it's him).
- No CRT here (it lives in the hero). The About window is text-first; no
  decoration inside it.

Teal marquee follows: "EXPERIENCE ✦ LGA TELECOM ✦ SEMBCORP SOLAR".

---

## 4. Experience `#experience`

### 375

```
 ▣ EXPERIENCE ━━━━━━━━              icon-experience 32px
┌───────────────────────────────┐
│▓ lga_telecom.exe      ○ □ ✕ ▓│
├───────────────────────────────┤
│ [Internship] [In progress]    │  orange + teal badges, no shadow
│ LGA Telecom                   │  display-s 15px, ink
│ Service Desk Operations & AI  │  mono bold
│ Integration Intern            │
│ Aug 2026 – Present            │  meta
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  3px ink rule
│ ■ Designing and building Desk │  body 15px, 10px orange square
│   Assist, a Manifest V3 ...   │
│ ■ Handle Level 1 customer ... │
└───────────────────────────────┘█
         (40px gap)
┌───────────────────────────────┐
│▓ sembcorp_solar.exe   ○ □ ✕ ▓│  ...
```

### 1366

```
 ▣ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────────────────────────┐
│▓ lga_telecom.exe                                           ○ □ ✕ ▓│
├─────────────────────────────────────────────────────────────────────┤
│ [Internship] [In progress]                                          │
│ LGA Telecom                                     Aug 2026 – Present  │
│ Service Desk Operations & AI Integration Intern                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ■ Designing and building Desk Assist, a Manifest V3 Chrome          │
│   extension that reads the ticket thread ... (max 75ch)             │
│ ■ ...                                                               │
└─────────────────────────────────────────────────────────────────────┘█
 sembcorp_solar.exe, education.txt follow, same anatomy
```

- Heading with `icon-experience.svg` (briefcase) 32px.
- Three windows in existing order: `lga_telecom.exe`, `sembcorp_solar.exe`,
  `education.txt`. Existing roles, periods and bullets, unchanged.
- LGA window adds a teal **"In progress"** badge after "Internship": Desk
  Assist is described as in progress (CLAUDE.md honesty rule). This is the
  recruiter's "what is he doing now" moment, so it stays first.
- Badges sentence case ("Internship", "Education", "In progress").
- Period: below the org/role on mobile, right-aligned and `whitespace-nowrap`
  from `sm`.
- Bullets: 10px orange square with 2px ink border, `aria-hidden`; list stays a
  real `<ul>`.

Orange marquee follows: "PROJECTS ✦ SILVERLINK SG ✦ SCS AWARENESS PLATFORM"
with `-mb-[3px]`.

---

## 5. Projects `#projects` (teal band)

### 375

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  teal band, 3px ink top/bottom
 ▣ PROJECTS ━━━━━━━━━━━━              ink heading + ink rule
┌─────────────────────────────────┐
│▓ featured_projects      ○ □ ✕ ▓│
├─────────────────────────────────┤
│ [All]█ [React]█ [Python]█       │  chips wrap, gap 8px
│ [Kotlin]█ [K8s]█ [TypeScript]█  │
│ [gRPC]█ [ML/AI]█                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │[Featured]  screenshot 224   │ │
│ ├─────────────────────────────┤ │
│ │ SilverLink SG        [2025] │ │
│ │ Cloud-native platform ...   │ │
│ │ ■ 8-node cluster            │ │
│ │ ■ 4 services ■ WebRTC       │ │
│ │ [React][gRPC][K8s][Postgre…]│ │
│ └─────────────────────────────┘█│
│ (24px)                          │
│ ┌─────────────────────────────┐ │
│ │[Featured] SCS Awareness ... │ │
│ ...  7 tiles, single column     │
└─────────────────────────────────┘█
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### 1366

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 ▣ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌───────────────────────────────────────────────────────────────────────┐
│▓ featured_projects                                           ○ □ ✕ ▓│
├───────────────────────────────────────────────────────────────────────┤
│ [All]█ [React]█ [Python]█ [Kotlin]█ [K8s]█ [TypeScript]█ [gRPC]█ [ML/AI]█
│                                                                       │
│ ┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│ │[Featured]  SilverLink 288px     │ │[Featured]  SCS 288px            │
│ │ SilverLink SG            [2025] │ │ SCS Awareness Platform   [2025] │
│ │ ...                             │ │ ...                             │
│ └─────────────────────────────────┘█└─────────────────────────────────┘█
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│ │ AI Finance  192  │ │ UWB Indoor  192  │ │ UAT Dashboard    │        │
│ └──────────────────┘█└──────────────────┘█└──────────────────┘█       │
│ ┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│ │ Fire Safety Drill Companion     │ │ GreenLoopFarms        ↗ live    │
│ └─────────────────────────────────┘█└─────────────────────────────────┘█
└───────────────────────────────────────────────────────────────────────┘█
```

- Band: teal, 3px ink top and bottom, `--focus: ink`, padding-y 80/112.
- Heading "PROJECTS", ink, ink rule, `icon-projects.svg` (folder) 32px.
- Window `featured_projects`, `wide` variant.
- Chips per MASTER 2.3 with a polite live region for the result count.
- Grid: 1 col (375), 2 cols (`sm`, GreenLoopFarms spans 2), 6-col spans from
  `lg`: 3+3, 2+2+2, 3+3. Gap 24px.
- Tiles per MASTER 2.7, data unchanged. SilverLink SG and SCS Awareness
  Platform are featured (first row, larger, colour, orange "Featured" badge).
- GreenLoopFarms external tile: teal "↗ Live site" badge, link opens in a new
  tab with sr-only "(opens in a new tab)". Its tile body text is ink/navy on
  cream; the badge sits on the image, not on text.
- Empty state: "No projects use {tag} yet." + secondary button "Show all
  projects" (replaces `NO_PROJECTS_MATCH [ … ]` and "CLEAR FILTER →").

Orange marquee follows: "SKILLS ✦ PRESS A KEY" with `-mt-[3px]`.

---

## 6. Skills `#skills`

### 375

```
 ▣ SKILLS ━━━━━━━━━━━━━━━━          icon-skills (keycap) 32px
 Press a key to see what each       body 15px cream
 skill is and where I used it.
┌─────────────────────────────────┐
│  [ interactive pixel keyboard ] │  existing SkillKeyboard, unchanged
│  AI keys amber                  │
└─────────────────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  3px teal rule
 AI & LLMs                (orange)  dt bold
 Prompt engineering, RAG, ...       dd 15px cream
 Data & ML                (teal)
 Python, Pandas, ...
```

### 1366

```
 ▣ SKILLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Press a key to see what each skill is and where I used it.
 ┌───────────────────────────────────────────────────────────────────┐
 │                 interactive pixel keycap keyboard                  │
 └───────────────────────────────────────────────────────────────────┘
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 AI & LLMs          Prompt engineering, Retrieval-augmented ...
 Data & ML          Python, Pandas, NumPy, scikit-learn, SQL ...
 Backend & Cloud    Node.js, Express, gRPC, PostgreSQL ...
 Frontend & Mobile  TypeScript, JavaScript, React ...
 Ways of working    Agile / Scrum, User acceptance testing ...
```

- Keep the keyboard as is (it is the section's focal object). Amber stays
  only on the AI keys. Do not wrap it in a window: a window's cream body would
  change the keycaps' contrast context, and the keyboard is already a framed
  object.
- Plain list stays (skimmers, screen readers, search). Group labels: orange
  for AI & LLMs, teal for the rest (6.62 / 7.94 on navy). No levels, no bars.
- "Used in" lines exist in the data but aren't rendered; showing them under
  each group (mono 15px, cream) would add evidence without new facts.
  Optional, lead's call.

No strip after Skills; the footer's violet band starts directly.

---

## 7. Footer `#footer` (violet band)

### 375

```
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  violet, 3px ink top
 ✉ Let's build something            icon-contact 32px + display-m 22px
 Open to graduate roles,            body cream (4.98)
 collaborations and interesting
 projects. Graduating April 2027.
 ┌──────────────────────────────┐
 │ ✉ Email me                   │   primary (orange, ink border 3.53 vs violet)
 └──────────────────────────────┘█

 Find me on                          display-s 14px
 ⌂ GitHub ↗                          44px rows
 ⌂ LinkedIn ↗
 ✉ johnaaronmb@gmail.com

 ◍ SGT 14:02                         globe 24px + tabular-nums
 Open the terminal and try
 > sudo hire-me
 © 2026 John Aaron Mendoza Branzuela
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

### 1366

```
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
  ✉ Let's build something      Find me on             ◍ SGT 14:02
  Open to graduate roles,      GitHub ↗               Open the terminal
  collaborations and ...       LinkedIn ↗             and try > sudo hire-me
  [✉ Email me]█                johnaaronmb@gmail.com  © 2026 John Aaron ...
                                                            ✦      ☆
                                                        (starburst 96px,
                                                         bottom-right, md+)
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

- Existing three columns `[1.4fr_1fr_1fr]` from `md`; all text cream on
  violet (4.98); `--focus: cream`.
- `icon-contact.svg` (envelope) 32px left of "Let's build something".
- `globe.svg` 24px before "SGT 14:02" (`aria-hidden`).
- The reference's "WOOF!" sign-off moment, kept to one object: a single
  `starburst.svg` at 96px at the bottom of the third column, below the
  copyright, in normal flow (not absolutely positioned over content), from
  `md`. Hidden at 375.
- Social link icons: use `currentColor` versions so they render cream on
  violet (the current PixelEmail draws amber on a black square, an old-palette
  leftover).
- No marquee directly above the footer.

---

## 8. Global elements on this page

- Pause motion toggle (bottom-left), chat launcher (bottom-right): keep;
  see MASTER 2.9 and 1.7. Add `scroll-padding-bottom: 88px` on `html`.
- Section dot nav (right edge, `lg`+): currently 8×8px dots with 8px
  pixel-font labels and `bg-zinc-500`. Below the 44px/15px rules and off
  palette. Fix: 44×44 hit area per dot (pseudo-element), dot 12px; inactive
  = 2px cream outline with transparent fill, active = orange fill; name via
  `aria-label` plus a visible tooltip at 12px pixel font (label step), cream
  on navy.
- `body::before` grid texture stays; windows and bands are opaque above it.

---

## 9. Asset placement summary

| Asset | Where | Size on page | Breakpoints |
|---|---|---|---|
| `crt-computer.svg` | Hero art column, over the starburst | 256px | `lg`+ |
| `starburst.svg` | Behind the CRT (hero); footer bottom-right | 384px; 96px | `lg`+; `md`+ |
| `sparkle.svg` | Hero art (×2, 32px); marquee separator (16px) | 32 / 16px | hero `lg`+; strips all |
| `smiley.svg` | Stats strip HELLO! cell | 32px | `md`+ |
| `floppy.svg` | Resume button icon | 16px | all |
| `icon-home.svg` | Command palette "Hero" entry; section dot nav tooltip | 16px | all |
| `icon-about.svg` | About heading | 32px | all |
| `icon-experience.svg` | Experience heading | 32px | all |
| `icon-projects.svg` | Projects heading | 32px | all |
| `icon-skills.svg` | Skills heading | 32px | all |
| `icon-contact.svg` | Footer "Let's build something" | 32px | all |
| `globe.svg` | Footer SGT clock | 24px | all |

All of them are decorative (text beside them says the same thing), so
`alt=""` / `aria-hidden="true"`. Render at integer multiples of the grid with
`image-rendering: pixelated`.

---

## 10. Hand-off notes for the coder (current build vs this spec)

1. Hero: drop scroll-linked shadow/lift and the magnetic CTA (flagged above,
   lead to confirm); two-tone name lines; Resume label + floppy icon; scroll
   cue needs an accessible name and 44px target.
2. Reduced motion: floating pixels, blinking cursors and scroll-cue bounce
   are Framer Motion loops; the CSS media query doesn't stop them. Use
   `MotionConfig reducedMotion="user"` or `useReducedMotion()` gates.
3. Badges and chips: sentence case ("Internship", "In progress"; the "All"
   chip, not "ALL").
4. Marquee separator ★ → `sparkle.svg`.
5. Pixel icons with hard-coded amber/black → `currentColor`.
6. Experience LGA window: add teal "In progress" badge.
7. Projects: live region for the filter count; empty-state copy; tile
   `alt=""`; facts list from the metric string; tile hover/press per MASTER
   2.7 (no `whileTap` scale, use translate).
8. Section dot nav: 44px targets, tokens instead of `zinc`.
9. Windows on navy: shadow 8px from `lg`.
