# Case-study page template

One template for the six case pages: `/projects/{silverlink, scs, ai-finance,
uwb, uat, firesafety}`. This file overrides MASTER.md only where stated (the case
`h1`/`h2` sizes, the figure window, the header status bar, the taskbar). Shared
tokens added for these components are in MASTER 2.11.

All copy is existing case-page copy (branch `retro-web`). Section headings and
button labels are design labels for the copywriter to confirm in `copy.md`.
Nothing here adds a fact.

The 30-second read for a recruiter: **project name + one-line summary** →
**four real figures** (the header window's status bar) → **what the problem
was** → **what John did**, when the page says so.

The one memorable thing on this page is **the header window with a status
bar**. The project opens as a program (`fire_safety.apk`) and its key
figures sit in an orange status bar along the bottom edge, like a 90s app's
status line. Everything below is quiet, readable cream windows.

---

## 1. Page skeleton (every case page, this order)

```
<header>  CaseTaskbar (sticky): Back to projects
<main id="main" tabIndex=-1>
  Breadcrumb            nav[aria-label="Breadcrumb"]
  CaseHeader            window: h1, summary, meta, links, status bar (stats)
  CaseSection problem   h2 "The problem"     window problem.txt
  CaseSection built     h2 "What was built"  window what_was_built.md
  CaseSection part      h2 "My part"         window my_part.log    (only where stated, §4)
  CaseSection how       h2 "How it works"    window how_it_works.md
  ScreenGallery         h2 "Screens"         figure windows        (omitted when none)
  CaseSection results   h2 "Results"         window results.txt    (omitted when none)
  CaseSection stack     h2 "Tech stack"      window stack.txt
  NextProject           teal band, nav[aria-label="More projects"]
</main>
<Footer />              existing Home footer (violet band, contact)
```

Two of the lead's headings are renamed for honesty:
- **"How it works"** replaces "Key decisions". The six pages describe
  architecture, method and pipeline, but none of them says why one option was
  picked over another. A "decisions" heading would suggest reasons the pages
  don't give.
- **"Results"** replaces "Outcome". What the pages have are measured figures
  (accuracy, RMSE, SUS, line counts), not adoption or impact. "Outcome" would
  suggest impact the pages don't claim.

No marquee strips on case pages. This is a reading page, and the header status
bar is the loud moment. With no strips, nothing moves on its own, so the page
doesn't need the Pause motion toggle (SectionNav is Home-only).

Colour rhythm down the page:

```
violet ▒ taskbar (sticky)                         ▒
navy   ░ breadcrumb + header window (cream)       ░
         └ orange status bar inside the window    █
navy   ░ section windows (cream), headings on navy ░
navy   ░ screens: figure windows (cream)           ░
teal   ▓ Next project band                         ▓
violet ▒ Footer                                    ▒
```

Container: `max-w-5xl` (1024px) for everything, gutters `px-4 sm:px-8
lg:px-16` (MASTER 1.4), left-aligned. One left edge for header, sections and
gallery. Section gap: 64px (375) / 80px (`lg`). Heading-to-window gap: 24px.

---

## 2. Wireframes

### 375

```
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  CaseTaskbar: violet, sticky, h 56 + 3px ink
 ┌──────────────────────┐              ghost button (cream border, cream text)
 │ ← ▣ Back to projects │              ▣ = icon-projects 16px
 └──────────────────────┘
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 Home / Projects / Fire Safety Drill    breadcrumb, mono 15, cream; wraps
 Companion
┌───────────────────────────────────┐
│▓ fire_safety.apk          ○ □ ✕ ▓│  violet bar
├───────────────────────────────────┤
│ [2025] [Team project]             │  badges (orange, teal), no shadow
│ FIRE SAFETY                       │  h1 pixel 22px, ink, balance
│ DRILL                             │
│ COMPANION                         │
│                                   │
│ Native Android app empowering HDB │  summary: lead step 16 bold, navy
│ residents to rehearse fire ...    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  3px ink rule
│ Course                            │  MetaList: dt mono bold 15 ink
│ INF2007 Mobile App Dev            │            dd mono 15 navy
│ Team                              │
│ Group 16, SIT                     │
│ Platform                          │
│ Android (Pixel 6a)                │
│ Built with                        │
│ [Kotlin] [ARCore] [TFLite]        │  tags (MASTER 2.4), wrap
│ [Jetpack Compose]                 │
│                                   │
│ ┌───────────────────────────────┐ │
│ │ GitHub profile                │ │  btn-ghost-ink, full width
│ └───────────────────────────────┘ │█
├────────────────┬──────────────────┤  status bar: orange cells, 3px ink gaps
│ 79/100         │ ~80%             │  stat 20px pixel, tabular-nums
│ SUS score      │ test coverage    │  label mono 15
├────────────────┼──────────────────┤
│ 120            │ 4                │
│ Git commits    │ languages        │
└────────────────┴──────────────────┘█
                                       64px
 ▣ THE PROBLEM ━━━━━━━━━━━━━           h2 20px two-tone + 6px teal rule
┌───────────────────────────────────┐  icon-about 32px
│▓ problem.txt              ○ □ ✕ ▓│
├───────────────────────────────────┤
│ Singapore's ~1.1 million HDB      │  body 15, navy, max 65ch
│ flats house 80% of ...            │
└───────────────────────────────────┘█
 ▣ WHAT WAS BUILT ━━━━━━
┌───────────────────────────────────┐
│▓ what_was_built.md        ○ □ ✕ ▓│
│ The Fire Safety Drill Companion   │
│ lets residents rehearse ...       │
│ ┌───────────────────────────────┐ │  Card: 2px ink, no shadow, cream
│ │ SENSOR FUSION PDR (h3 14px)   │ │
│ │ Weinberg stride estimation... │ │
│ └───────────────────────────────┘ │
└───────────────────────────────────┘█
 ▣ MY PART ━━━━━━━━━━━━━              only SCS, UWB, Fire Safety (§4)
┌───────────────────────────────────┐
│▓ my_part.log              ○ □ ✕ ▓│
│ John Aaron: Algorithms & AR       │  lead step, ink
│ (49 commits)                      │
│ ■ Dijkstra shortest-path with ... │  10px orange square, 2px ink
│ ■ ARCore session lifecycle ...    │
└───────────────────────────────────┘█
 ▣ HOW IT WORKS ━━━━━━━━
 ... (same window anatomy)
 ▣ SCREENS ━━━━━━━━━━━━━━
┌───────────────────────────────────┐  figure window: shadow 4px, no padding
│▓ onboarding.png           ○ □ ✕ ▓│
├───────────────────────────────────┤
│[        screenshot, full w      ] │  width/height attrs, lazy
├───────────────────────────────────┤  3px ink rule
│ Onboarding                        │  figcaption mono 15 navy
│ Open full size                    │  text link, 44px row
└───────────────────────────────────┘█
                                       24px
┌───────────────────────────────────┐
│▓ main_dashboard.png       ○ □ ✕ ▓│  ... one column at 375
 ▣ RESULTS ━━━━━━━━━━━━━━
┌───────────────────────────────────┐
│▓ results.txt              ○ □ ✕ ▓│
│ 10,984         lines of Kotlin    │  FigureList: value pixel 15 ink,
│ 5,458          lines of test code │  tabular-nums; label mono 15
│ 26             test files         │
│ 9/9 + 6 bonus  backlog items      │
└───────────────────────────────────┘█
 ▣ TECH STACK ━━━━━━━━━━━              floppy 32px
┌───────────────────────────────────┐
│▓ stack.txt                ○ □ ✕ ▓│
│ [Kotlin] [Jetpack Compose] [MVVM] │  tags, wrap
│ [Hilt DI] [ARCore] [TFLite] ...   │
└───────────────────────────────────┘█
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  teal band, 3px ink top/bottom
 NEXT PROJECT ━━━━━━━━━━━━━━          h2 ink + ink rule
┌───────────────────────────────────┐
│ [   SilverLink screenshot 192   ] │  project tile (MASTER 2.7), whole tile
├───────────────────────────────────┤  is one link
│ SilverLink SG             [2025]  │
│ Connects seniors and youth ...    │
│ [React] [gRPC] [K8s] [PostgreSQL] │
└───────────────────────────────────┘█
┌───────────────────────────────────┐
│ ← Back to all projects            │  btn-primary (orange), full width
└───────────────────────────────────┘█
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▒ Footer (violet, existing) ▒
```

### 1366

```
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   [← ▣ Back to projects]                       (taskbar content in max-w-5xl)
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   Home / Projects / SilverLink SG
  ┌──────────────────────────────────────────────────────────────────────┐
  │▓ silverlink_sg.exe                                            ○ □ ✕ ▓│
  ├──────────────────────────────────────────────────────────────────────┤
  │ [2025] [Team project]                  ┌───────────────────────────┐ │
  │ SILVERLINK SG          (h1 40px)       │                           │ │
  │                                        │  cover: Home tile image   │ │
  │ Connects seniors and youth through     │  3px ink frame, no shadow │ │
  │ skill-sharing and live events ...      │  (lg+ only)               │ │
  │ (lead 18, max 52ch)                    │                           │ │
  │ [GitHub profile]█                      └───────────────────────────┘ │
  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
  │ Institution              Team                                        │
  │ University of Glasgow &  Group 20: Danish, John, Thomas, Hanaa,      │
  │ SIT                      Habib, Joshua                               │
  │ Built with                                                           │
  │ [React] [gRPC] [Kubernetes] [PostgreSQL]                             │
  ├────────────────┬────────────────┬────────────────┬──────────────────┤
  │ 4              │ 6              │ 7              │ 8                 │ 28px
  │ gRPC           │ team members   │ Agile sprints  │ cluster nodes     │
  │ microservices  │                │                │                   │
  └────────────────┴────────────────┴────────────────┴──────────────────┘█
                                                                         ██
   ▣ THE PROBLEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ (32px)
  ┌──────────────────────────────────────────────────────────────────────┐
  │▓ problem.txt                                                  ○ □ ✕ ▓│
  ├──────────────────────────────────────────────────────────────────────┤
  │ By 2030, 1 in 4 Singaporeans will be over 65. Many seniors     │      │
  │ face isolation ... (body 16, 65ch, left)                       │      │
  │ ┃ "How might we leverage technology in ways that are ..."      │      │
  └──────────────────────────────────────────────────────────────────────┘█
   ▣ WHAT WAS BUILT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  │ SilverLink SG transforms potential social fragmentation into ...     │
  │ ■ Skill-sharing workshops and mentorship  ■ Micro-volunteering ...   │  FeatureList,
  │ ■ Event booking with seat management      ■ Live video streaming ... │  2 cols from sm
   ▣ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  │ Architecture (h3)                                                    │
  │ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐              │  CardGrid, 4 cols
  │ │CLOUD LAYER│ │MICROSERV. │ │DATABASE   │ │DEVOPS     │              │
  │ └───────────┘ └───────────┘ └───────────┘ └───────────┘              │
  │ Key algorithms (h3)                                                  │
  │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐       │  3 cols
   ▣ SCREENS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ┌──────────────────────────────────────────────────────────────────────┐
  │▓ onboarding_flow.png                                          ○ □ ✕ ▓│  span full
  │[                          screenshot                               ]│
  │ Onboarding flow                                    Open full size    │
  └──────────────────────────────────────────────────────────────────────┘█
  ┌─────────────────────────────────┐ ┌──────────────────────────────────┐
  │▓ event_detail.png       ○ □ ✕ ▓│ │▓ livestream_studio.png   ○ □ ✕ ▓│  span half
  │[         screenshot           ]│ │[          screenshot            ]│  gap 24
  │ Event detail and booking        │ │ Live streaming studio            │
  └─────────────────────────────────┘█└──────────────────────────────────┘█
   ▣ TECH STACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
   NEXT PROJECT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ┌──────────────────────────────────────────┐
  │ [ SCS screenshot 288 ]                   │   tile, lg:col-span-8
  │ SCS Awareness Platform           [2025]  │   ┌─────────────────────────┐
  │ Teaches cancer awareness through ...     │   │ ← Back to all projects  │ col 9-12,
  │ [React 19] [TypeScript] [Supabase] ...   │   └─────────────────────────┘█ bottom
  └──────────────────────────────────────────┘█
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

768: as 375 but gutter 32px, body 16px, window padding 40px, MetaList in 2
columns, FeatureList 2 columns, CardGrid 2 columns, gallery 2 columns (half
spans side by side). The status bar stays 2×2 and the cover stays hidden until
`lg`.

---

## 3. Shared components (build once, map six pages onto them)

Put the project list in **`client/src/data/projects.ts`** (moved out of
`Projects.tsx`): `name, slug, year, description, facts, tags, image, link`.
Home tiles, case headers and NextProject then read one source, so name, year
and summary can't drift. Order = Home tile order.

| Component | Props | Notes |
|---|---|---|
| `CaseLayout` | `slug: CaseSlug; children` | Sets `document.title` (existing pattern), calls `trackProjectVisit(slug)`, renders `CaseTaskbar`, `<main id="main" tabIndex={-1}>`, `Breadcrumb`, `children`, `NextProject`, then `<Footer />`. Adds `scroll-padding-top: 72px` while mounted (§7). |
| `CaseTaskbar` | none | Sticky violet bar. `<header>` with one link: `<Link href="/#projects" replace>` (already wired; keep `replace` and `play('back')`), `btn btn-ghost`, `icon-projects` 16px + "Back to projects", leading `←` `aria-hidden`. `--focus: cream`. |
| `Breadcrumb` | `current: string` | `<nav aria-label="Breadcrumb"><ol>`: Home (`/`), Projects (`/#projects`), current (`<span aria-current="page">`). Separators `/` in `aria-hidden` spans. Links cream, underlined (2px, offset 4px), each `inline-flex min-h-[44px] items-center`; current crumb cream bold, not a link. Wraps; never truncates. |
| `CaseHeader` | `file: string; name: string; summary: string; badges: string[]; meta: MetaItem[]; links: CaseLink[]; stats: Stat[] (exactly 4); cover?: {src,width,height}` | Window (default variant). `h1` = `name`. Body sections in this order: badges, h1, summary, links, rule, MetaList. Then `StatStrip variant="status"` as the window's last child, outside the padded body (§5). |
| `MetaList` | `items: {label: string; value: ReactNode; wide?: boolean}[]` | `<dl>`, 1 col (375), 2 cols (`sm`+). `wide` spans both columns (long team lists, "Built with" tags). dt mono bold 15/16 ink; dd mono 15/16 navy. Not all caps. |
| `StatStrip` | `stats: {value: string; label: string}[]; variant: 'band' \| 'status'` | Extract the cell markup from Home's `StatsBand` so both use it. `status` = inside the header window (§5). `<dl>`, label first in DOM, number shown on top (`flex-col-reverse`), `tabular-nums`. Values render final. No CountUp. |
| `CaseSection` | `id: string; heading: string; icon?: PixelArtName; file: string; children` | `<section aria-labelledby>`. `SectionHeading size="case"` (MASTER 2.11) on navy, then a `Window title={file}`. |
| `Prose` | `children` | Wrapper: `max-w-[65ch] space-y-4 text-[15px] sm:text-base leading-[1.65] text-pretty`. Optional `lead` paragraph style: bold, 16/18. |
| `Quote` | `children; cite?: string` | `<blockquote>`: 6px ink left border, padding-left 16px, mono bold, navy. For SilverLink's PB-2 question only. |
| `FeatureList` | `items: string[]; columns?: 1 \| 2` | `<ul>`, 10px orange square bullet with 2px ink border (`aria-hidden`), as Experience. 2 columns from `sm` when `columns=2`. |
| `CardGrid` | `cards: {title: string; items?: string[]; body?: string}[]; cols: 2 \| 3 \| 4; headingLevel?: 3 \| 4` | Static cards: cream fill, **2px** ink border, **no shadow, no hover, no tap** (not pressable; MASTER 1.5). Title pixel 12/14px ink, `balance`, 3px ink rule below, then `FeatureList` or a `Prose` paragraph. Grid 1 → 2 (`sm`) → `cols` (`lg`), gap 16/24. |
| `ScreenGallery` | `heading?: 'Screens' \| 'Charts'; shots: Shot[]` | `<section aria-labelledby>` + heading, then a grid of `ScreenFigure`. Not wrapped in a window (no windows inside windows). 1 col; 2 cols from `md`; `items-start`; gap 24. |
| `ScreenFigure` | `Shot = {file: string; src: string; width: number; height: number; alt: string; caption: string; span: 'full' \| 'half'}` | §6. |
| `FigureList` | `items: {value: string; label: string}[]` | Results. `<dl>` rows: value pixel 15/18 ink `tabular-nums`, label mono 15/16 navy. Two columns `[minmax(8ch,max-content)_1fr]`, gap 8/24, row rule 2px ink. |
| `TechStack` | `tags: string[]` | Tags per MASTER 2.4 (Courier Prime bold 14, 2px ink, no shadow), wrap, gap 8. Underscores become spaces (`Prisma_ORM` → `Prisma ORM`), and the `--` prefix and `#353535` chips go. |
| `NextProject` | `slug: CaseSlug` | §8. |

Page-local, built from the same tokens (one page each, not worth sharing):
`PipelineSteps` (AI Finance), `ModuleTable`, `SeverityList`, `TestCaseRecord`
(UAT).

### Heading order

`h1` project name (CaseHeader) → `h2` each section and "Next project" → `h3`
card titles and sub-blocks ("Architecture", "Key algorithms") → `h4` card
titles only inside an `h3` sub-block (UAT). Window title bars stay `<p>`.
`ScrollToTop` already focuses `main h1` after navigation, so the h1 must stay
inside `<main>`.

---

## 4. Content mapping (existing content only)

**Header**

| Page | `file` | Badges | Meta (label: value) | Links | Status bar (4) |
|---|---|---|---|---|---|
| SilverLink SG | `silverlink_sg.exe` | 2025, Team project | Institution: University of Glasgow & SIT; Team (wide): Group 20: Danish, John, Thomas, Hanaa, Habib, Joshua; Built with (wide): React, gRPC, Kubernetes, PostgreSQL | GitHub profile | 4 gRPC microservices · 6 team members · 7 Agile sprints · 8 cluster nodes |
| SCS Awareness Platform | `scs_awareness.exe` | 2025, Team project | Institution: SIT + University of Glasgow; Team: Group D2, 4 members; Built with: React 19, TypeScript, Supabase, Vercel | GitHub profile | 4 languages · 4 question types · 7 Agile sprints · 4 team members |
| AI Finance Insights Engine | `ai_finance_engine.py` | 2024 | Type: ETL + AI pipeline; Domain: Shipping & logistics; Built with: Python, Pandas, ETL, NLP, Power BI | GitHub profile | 5 data sources · 5 pipeline stages · 9 news sectors · 100% Pytest coverage |
| UWB Indoor Localization | `uwb_localization.py` | 2025, Team project | Course: CSC3105 Data Analytics; Team: Group CS05, SIT; Built with: Python, SVM, PCA, scikit-learn | GitHub profile | 89.61% SVM accuracy · 0.9612 SVM ROC-AUC · 41,996 samples · 7 indoor environments |
| UAT Testing Dashboard | `uat_dashboard.exe` | 2024 | Type: Full-stack web app, course project; Scenario: Hospital appointment system; User roles: PM, QA lead, tester, developer; Built with: React 18, Node.js, Express, SQLite | View repository (the real repo URL) | 25 defects logged · 35 test cases · 8 modules tested · 31% pass rate |
| Fire Safety Drill Companion | `fire_safety.apk` | 2025, Team project | Course: INF2007 Mobile App Dev; Team: Group 16, SIT; Platform: Android (Pixel 6a); Sprints: 3 Agile sprints; Built with: Kotlin, ARCore, TFLite, Jetpack Compose | GitHub profile | 79/100 SUS score · ~80% test coverage · 120 Git commits · 4 languages |

- File extensions follow the stated platform: `.apk` for Android, `.py` for
  the two Python projects, `.exe` for the web apps. They carry information;
  don't make them all `.exe`.
- "Built with" uses the Home tile tags (spell out K8s), so the header and the
  tile agree. The full list goes in Tech stack.
- Summary = the Home tile `description` from `projects.ts` (copy.md §7,
  already fact-checked), not the older case-page hero text.
- Status-bar values are at most 6 glyphs (they must fit a 2×2 cell at 375).
  Non-numeric "stats" move out of the bar: "WebRTC" goes to What was built,
  "No-code" goes into SCS's What was built lead, and "Star" schema goes into
  How it works. Every figure is already on the site (case page or Home facts).
- Links: "GitHub profile" points to the profile, not a repo, so the label must
  not say "source code". It uses `btn-ghost-ink`. UAT's "View repository" is
  the only project-specific repo, so it gets `btn-secondary` (teal). Both
  open in a new tab, with sr-only "(opens in a new tab)" and no visible ↗
  (copy.md).
- "Team project" badge only where a team is stated. AI Finance and UAT state
  no team, so they get the year only.
- Flag for copywriter: UAT's "31% pass rate" is a real figure, but as a headline
  it reads as a failure. The label should frame it as the share of the 35 test
  cases that passed in the UAT scenario. Wording is copy's call. Keep the
  number.

**Sections** (✓ = present, — = omitted)

| Page | The problem | What was built | My part | How it works | Screens | Results |
|---|---|---|---|---|---|---|
| SilverLink | ✓ para 1 + `Quote` (PB-2 question) | ✓ solution para + `FeatureList` 8 (2 col) | — | ✓ h3 Architecture: `CardGrid` 4 (Cloud, Microservices, Database, DevOps); h3 Key algorithms: `CardGrid` 3 with body | ✓ 5 | — |
| SCS | ✓ 1 para | ✓ admin-panel para ("A full no-code CMS…") + `CardGrid` 3: Visitor experience, Admin panel, Gamification engine | ✓ | ✓ the "Architecture" group as `FeatureList` | ✓ 5 | — |
| AI Finance | ✓ para 1 | ✓ para 2 + `CardGrid` 4: Data quality gates, Financial analytics, AI NLP engine, Power BI ready | — | ✓ h3 Pipeline: `PipelineSteps`; h3 Engineering practices: `CardGrid` 2 (Auditability, Test-driven) | — (see note) | — |
| UWB | ✓ para 1 | ✓ para 2 | ✓ | ✓ `CardGrid` 4: Data preparation, Classification, Range regression, Evaluation | ✓ 5, heading "Charts" | ✓ LR accuracy 85.75%, LR ROC-AUC 0.9195, Range RMSE 1.757 m, Path 1 R² 0.458, Path 2 R² 0.6809 |
| UAT | ✓ para 1 | ✓ para 2 + `CardGrid` 4: Defect management, Test case management, Analytics dashboard, Reporting and export | — | ✓ h3 Test scope: `ModuleTable`; h3 Severity and priority; h3 Sample test case TC-022; h3 Requirements by stakeholder role (`CardGrid` 4, h4); h3 Architecture (`CardGrid` 3, h4) | ✓ 5 (tabs removed) | — |
| Fire Safety | ✓ para 1 | ✓ para 2 (now plain body, no amber) | ✓ | ✓ `CardGrid` 6 with body (Sensor fusion PDR … Firebase FCM), 3 cols | ✓ 8 | ✓ 10,984 lines of Kotlin, 5,458 lines of test code, 26 test files, 9/9 backlog items + 6 bonus |

**My part: correction to the brief.** Three pages state John's part, not only
SCS. All three lines are on the current pages:
- SCS: "John Aaron: core engine and media systems" + 8 items
- UWB: "John Aaron: Data Mining Methodology" + 8 items
- Fire Safety: "John Aaron: Algorithms & AR (49 commits)" + 8 items

Render the line as the `lead` paragraph and the items as a 2-column
`FeatureList`. On SilverLink, AI Finance and UAT the section is **omitted
entirely**: no "Team project" placeholder and no role wording. SilverLink's
team is already in the header meta. AI Finance and UAT state no team, so
writing "Team project" there would itself be a claim. **NEEDS JOHN:** were AI
Finance and UAT solo or team projects, and what was your part in SilverLink?

**Results** appears only where figures remain after the four in the status
bar. Don't write outcome sentences.

**AI Finance screens:** there are none on the case page. The Home tile image
(`aifinance_dashboard.jpg`) could become one figure, but only if John confirms
it is the project's real Power BI output. Until then, omit the section.

**Section icons** (32px, `aria-hidden`, existing assets unless noted):
Problem `icon-about` (document) · What was built `icon-projects` (folder) ·
My part `icon-experience` (briefcase) · How it works `icon-skills` (keycap) ·
Screens/Charts `icon-screens` (**new**) · Results `icon-results` (**new**) ·
Tech stack `floppy`. The two new icons are briefed in `assets.md`. Until they
land, those two headings render without an icon (`icon` is optional). No other
new art.

### Page-local blocks

- **`PipelineSteps` (AI Finance):** a real sequence, so an `<ol>` with
  numbers is right. Five cards: Extract, Validate (raw gate), Transform,
  Validate (clean gate), Load. Each card is cream with a 2px ink border and an
  orange badge holding the step number. The NLP engine follows as a sixth card
  with a teal "AI" badge, introduced by its existing description, not
  numbered. Connectors are 3px ink rules between cards (`aria-hidden`): vertical
  at 375, a 3+3 grid with horizontal rules from `lg`. Step titles sentence case.
- **`ModuleTable` (UAT):** a real `<table>` with caption "Test scope: 8
  modules". Columns: Module, Defects, Risk. The module name wraps, defects are
  right-aligned `tabular-nums`, and risk is a badge. Fits 289px at 375 with
  wrapping. Drop the 01–08 numbers: the module order isn't a sequence.
- **Risk / severity badges (UAT):** the word carries the meaning; the fill
  helps scanning. Critical → orange; High → teal; Medium and Low → cream with
  2px ink border. Ink text on all (8.08 / 9.69 / 17.58). Sentence case
  ("Critical", not "CRITICAL"). Replaces red/amber/blue/zinc.
- **`TestCaseRecord` (UAT TC-022):** a card holding a `<dl>` (Code, Module,
  Status, Linked defect, Title, Preconditions), with test steps as an `<ol>`.
  Expected result: teal block, ink text, label "Expected". Actual result:
  orange block, ink text, label "Actual". Status "Fail" is an orange badge.
  Replaces the green/red tints.
- **Severity and priority (UAT):** a `<dl>` of four rows (badge + P1–P4 +
  description), not cards.

---

## 5. Header window detail

- Window default variant (cream body). Not the terminal variant, which stays
  hero-only.
- Body padding 24 / 40 / 56. Order: badges (gap 8) → h1 (margin-top 16) →
  summary (margin-top 16) → links (margin-top 24) → 3px ink rule (margin-y 24)
  → MetaList.
- **h1:** pixel, ink, `uppercase` via CSS (source text keeps its real case for
  screen readers), `text-wrap: balance`, `break-words`, line-height 1.3. Size
  `clamp(20px,6vw,24px)` at 375 (22.5px: "Localization", the longest word,
  fits 289px), 32px at `sm`, 40px at `lg`. Ink only: orange or teal on cream
  fails (2.18 / 1.81), so the two-tone treatment stays on navy headings.
- **Summary:** `lead` step (16/18, bold, navy), `max-w-[52ch]`, `pretty`.
- **Cover (lg+ only):** `lg:grid-cols-12`. Text cols 1–7; cover cols 8–12,
  top-aligned, 3px ink frame, no shadow (not pressable), `alt=""` (illustrative;
  the h1 names it), the Home tile image with `width`/`height` attributes,
  `hidden lg:block`, `loading="lazy"`. A lazy image in a `display:none` box
  isn't fetched, so phones don't download it; at `lg` it's in view and loads
  straight away. Below `lg` it isn't shown: the h1, summary and status bar stay
  near the top at 375, and the screenshots follow in Screens.
- **Status bar (`StatStrip variant="status"`):** the window's last row,
  full-bleed to the window's inner edges (outside the body padding), with a
  3px ink top rule. Cells are orange with ink text (8.08), separated by 3px
  ink gaps (`gap-[3px] bg-black`). 2×2 below `lg`, 4 in a row from `lg`. Cell
  padding 16. Value `clamp(18px,5.4vw,24px)` below `lg` (20px at 375: 6
  glyphs = 120px in a 135px cell), **28px** from `lg` (6 glyphs = 168px in a
  188px cell at 1024). Label mono 15/16, `max-w-[18ch]`. No HELLO cell.
  `aria-label="Key figures"` on the `<dl>`.

---

## 6. Screenshot treatment (`ScreenFigure`)

```
┌──────────────────────────────┐  .window + figure variant (MASTER 2.11):
│▓ event_detail.png     ○ □ ✕ ▓│  shadow-raised (4px), body padding 0
├──────────────────────────────┤
│[ img, flush to the frame    ]│  full-bleed; portrait: centred, padded 16
├──────────────────────────────┤  3px ink rule
│ Event detail and booking     │  <figcaption> mono 15/16 navy, pretty
│              Open full size  │  link, 44px row; right-aligned from sm
└──────────────────────────────┘█
```

- Markup: `<figure class="window window--figure">` → `WindowBar` (title = the
  file name) → image → `<figcaption>`. The bar is a `<p>` and decorative; the
  caption names the figure.
- **Title:** lower snake case from the existing label, `.png`, ≤ 24
  characters so it rarely truncates at 375: `onboarding_flow.png`,
  `events_discovery.png`, `event_detail.png`, `livestream_studio.png`,
  `system_metrics.png`; `admin_dashboard.png`, `panel_editor.png`,
  `story_stats.png`, `asset_manager.png`, `admin_accounts.png`;
  `class_distribution.png`, `confusion_matrices.png`, `model_comparison.png`,
  `tree_depth.png`, `decision_boundaries.png`; `dashboard.png`,
  `defects.png`, `defect_detail.png`, `test_cases.png`, `reports.png`;
  `onboarding.png`, `dashboard.png`, `drill_setup.png`, `floor_plan.png`,
  `ar_navigation.png`, `extinguisher_id.png`, `safety_quiz.png`,
  `analytics.png`.
- **Caption:** the existing label in sentence case (e.g. "AR corridor
  navigation: live breadcrumb arrows"). UAT keeps its longer existing
  captions. Every screenshot is now always visible, so the old tab label and
  caption merge into one caption.
- **Alt rule:** describe what the screen shows: its visible parts and, for a
  chart, what it plots and any result the page already states. Don't repeat
  the caption, don't start with "Screenshot of", and stay under about 150
  characters. Examples, from content already on the page, to check against
  each image: UAT dashboard: "Defect count tiles above a severity bar chart
  and a monthly defect trend chart". UWB class distribution: "Bar chart of LOS
  and NLOS samples, split 50/50". The copywriter writes all 28 in `copy.md`
  after looking at each image. Current alts ("Dashboard", "Analytics") are
  too thin.
- **Open full size:** `<a href={src} target="_blank" rel="noopener">`, visible
  text "Open full size" plus sr-only `: {caption} (opens in a new tab)`.
  Underlined ink text, `min-h-[44px] inline-flex`, `--focus: ink`. It's there
  because dashboard text can't be read at 375; no lightbox or modal.
- **No layout shift:** every `<img>` gets its intrinsic `width` and `height`
  attributes plus `w-full h-auto`, so the browser reserves the box from the
  aspect ratio before the file loads. Read sizes from the files, or use the
  table below.
- **Lazy loading:** every gallery image gets `loading="lazy" decoding="async"`
  (the gallery is several windows below the fold). Next-project tile image is
  lazy too. Only the `lg` header cover is in view on load.
- **Spans:** `full` = both columns from `md`; `half` = one. Default: aspect
  ≥ 1.75 → full, else half. Keep the existing groupings.
- **Portrait images** (aspect < 0.9): `half`, image `w-auto mx-auto
  max-h-[min(70svh,560px)]` inside 16px cream padding, so a 0.56 floor plan
  doesn't make a 900px-tall cell.
- Image edge: the 3px ink frame and caption rule define it. No alpha outline
  (MASTER bans alpha colours) and no hover zoom (figures are not links).
- Perf (optional, coder's call): the Fire Safety p30 PNGs are 330–345 KB. WebP
  would cut them. It isn't required for this template.

Intrinsic sizes (w×h → span):

| Page | Shots |
|---|---|
| SilverLink | p14 1172×599 full · p19 873×560 full · p21 640×428 half · p22 700×392 half · p23 862×415 full |
| SCS | p71_img1 1887×1006 full · p72_img0 1278×985 half · p72_img1 1915×1003 half · p73 1884×1005 half · p74 1917×1003 half |
| UWB | p9 989×490 full · p40 1229×490 full · p41 1389×490 full · p35 1013×646 half · p39 1097×1120 half |
| UAT | dashboard_full 1440×922 full · defects 1440×900 half · defect_detail 1440×900 half · testcases 1440×900 half · reports_full 1440×1146 half |
| Fire Safety | p29_img1 896×564 · p29_img2 605×520 · p29_img3 790×487 · p29_img4 586×1041 (portrait) · p29_img5 436×737 (portrait) · p30_img0 911×744 · p30_img1 947×642 · p30_img3 754×872 (portrait): all half |

---

## 7. Navigation, landmarks, focus

- **Top:** `CaseTaskbar`, `<header>`, sticky `top-0 z-30`. Height 56px + 3px
  ink bottom border. Violet, `--focus: cream` (4.98:1). Link: `btn btn-ghost`
  (cream text and border on violet 4.98; hover cream fill, navy text 14.40;
  press translate). Label "Back to projects" (sentence case; replaces "←
  Back"). `href="/#projects"` with `replace`, as wired today.
- **Breadcrumb:** inside `<main>`, above the header window, on navy. Cream
  text (14.40), `--focus: orange` (6.62). Margin 24px above and 16px below.
- **Bottom:** `NextProject` (§8) offers the next case and "Back to all
  projects". Then the existing Footer gives contact links on every case page
  (currently they have none).
- **Skip link:** reuse Home's skip link (move it into a shared component).
  Only one link sits before `<main>`, but the pages should behave the same.
- **Sticky bar vs focus (WCAG 2.4.11):** set `scroll-padding-top: 72px` on
  `html` while a case page is mounted (keep the existing `scroll-padding-bottom:
  88px`), so headings and controls tabbed or anchored into view aren't hidden
  under the taskbar.
- **Landmarks:** `header` (taskbar), `nav "Breadcrumb"`, `main`, a `section`
  per case section labelled by its h2, `nav "More projects"` (NextProject, in
  main), `footer`.

Focus ring per surface (3px solid, 3px offset, `:focus-visible`):

| Surface | `--focus` | Ratio |
|---|---|---|
| violet taskbar | cream | 4.98 |
| navy page (breadcrumb) | orange | 6.62 |
| cream windows and figures | ink | 17.58 |
| teal NextProject band | ink | 9.69 |
| next tile (on teal) | ink, offset 6px (clear of the shadow) | 9.69 |

---

## 8. NextProject band

- Full-bleed teal band, 3px ink top and bottom, padding-y 64/80, `--focus:
  ink`. `<nav aria-label="More projects">` containing `h2` "Next project"
  (`SectionHeading tone="ink" size="case"`, no icon).
- **Next tile:** the Home project tile (MASTER 2.7). Export `ProjectTile`
  from `Projects.tsx` and reuse it, with the same anatomy and states (hover
  lift, press sinks) and `alt=""`. Not featured: no badge, image 192px (375) /
  288px (`lg`). Next = the following entry in Home tile order, wrapping:
  SilverLink → SCS → AI Finance → UWB → UAT → Fire Safety → SilverLink
  (GreenLoopFarms is external and has no case page). This replaces today's
  ad-hoc chain. Normal push navigation, not `replace`.
- **Back to all projects:** `btn btn-primary` (orange, ink 8.08, the one
  primary in view), leading `←` `aria-hidden`, `<Link href="/#projects"
  replace>`. Full width at 375. From `lg`: tile `col-span-8`, button in
  `col-span-4`, aligned to the tile's bottom edge.
- No teal tile or teal button on the teal band; the tile is cream.

---

## 9. Motion and reduced motion

- **Nothing animates on its own:** no load-in, no scroll reveal, no marquee.
  The only motion is feedback: button press (150ms translate), next-tile
  hover/press (MASTER 2.7) and the taskbar button hover.
- **Remove from all six pages:** `FramerReveal` wrappers (static anyway; drop
  the import), every `motion.div` with `whileHover={{ y: -4 }}` /
  `whileTap={{ scale: 0.98 }}` on static cards (they suggest a click that does
  nothing), the CTA card `group-hover:translate-x-1` arrow, and UAT's
  `AnimatePresence` tab swap. The UAT tabs become the static gallery: hidden
  panels and a motion swap for five images is worse than showing all five.
  No `CountUp` or `whileInView` (none on these pages today; keep it that way).
- **Under `prefers-reduced-motion: reduce`:** `.btn` and tile transitions are
  instant (already the rule in MASTER 3.6). Lenis already respects the
  setting. Nothing else to gate.
- Transitions list properties explicitly (`translate, box-shadow,
  background-color, color`), never `all`.

---

## 10. Readability and accessibility checks

- Body 15px (375) / 16px (`sm`+), line-height 1.65, `max-w-[65ch]` (Courier
  Prime: 65ch ≈ 65 characters). Captions, meta and labels are 15/16 too.
  Nothing below 12px. The smallest is the pixel card title at 12px, which is
  sentence case and short.
- All pairings are approved (MASTER 1.2): navy/ink on cream (14.40 / 17.58),
  ink on orange (8.08), ink on teal (9.69), cream on violet (4.98), cream /
  orange / teal on navy (14.40 / 6.62 / 7.94). **No new pairings.** No cream on
  black: the header uses the cream window, not the terminal body.
- Targets: taskbar button, breadcrumb links, link buttons, "Open full size"
  links and the next tile all ≥ 44px tall, ≥ 8px apart.
- No horizontal scroll at 375: window shadow 6px < 16px gutter; tags, badges,
  breadcrumb and h1 wrap; status values ≤ 6 glyphs; tables wrap the text
  column; `break-words` on h1 and window titles.
- Colour never carries meaning alone: risk badges and expected/actual blocks
  carry words.

---

## 11. Hand-off notes for the coder (current build vs this spec)

1. Replace the six bespoke layouts with `CaseLayout` + shared components (§3);
   move project data to `client/src/data/projects.ts`.
2. Off-palette classes to remove: `bg-black` page, `bg-zinc-*`, `bg-[#353535]`,
   `text-amber-*`, `text-blue-*`, `text-gray-*`, `text-zinc-*`,
   `text-red/green-*`, `bg-[#0d2318]`/`bg-[#230d0d]`, `border-amber-500/*`,
   `border-8bit*`, `bg-amber-500` CTA card ("GitHub profile" becomes a header
   link button).
3. Labels: drop `uppercase tracking-widest` labels and the `--tag` prefix;
   sentence case everywhere except pixel h1/h2.
4. `<main>` gets `id="main" tabIndex={-1}`; the back nav moves to `<header>`
   outside it.
5. Next-project order per §8; "Back to portfolio" → "Back to all projects".
6. Image `width`/`height`, `loading="lazy"`, real alts (copywriter), and
   figure windows per §6.
7. Remove motion per §9.
