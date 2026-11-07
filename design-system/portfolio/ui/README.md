# UI alternatives: hero, project card, case-study layout (7 Nov 2026)

Owner: `design-ui-designer`. Brief: `critique-2026-11-07-expert.md` (25/40) plus
John's two decisions: (1) the hero's CRT-starburst art becomes a static
`desk_assist.exe` window with the 6-step flow, step 5 "Agent reviews" lit
orange; (2) one palette with meaning: **orange = AI, teal = data**.

Everything here is a standalone HTML/CSS mockup. Tokens come from
`client/src/index.css`; fonts are local copies in `fonts/` (Press Start 2P
from `client/public/fonts`, Courier Prime 400/700 latin subset, OFL). Images are
read straight from `attached_assets/` and `client/public/assets/`. Copy is from
`copy.md`, `copy-case-studies.md` and the live components. Nothing in
`client/src/` was changed.

| Mockup | 1366×900 | 375×812 | Full page |
|---|---|---|---|
| `hero-1-name-first.html` | `hero-1-name-first-1366.png` | `hero-1-name-first-375.png` | |
| `hero-2-proof-first.html` | `hero-2-proof-first-1366.png` | `hero-2-proof-first-375.png` | |
| `project-card.html` (Projects band, 5 cards) | `project-card-1366.png` (full) | `project-card-375.png` (full) | |
| `case-study.html` (SilverLink SG) | `case-study-1366.png` | `case-study-375.png` | `case-study-1366-full.png`, `case-study-375-full.png` |

Renders were made with Playwright (Chromium, `prefers-reduced-motion: reduce`
so the cursor is static). No horizontal scroll at either width (scrollWidth =
innerWidth in every render). The fixed Pause / Sound / Chat buttons are drawn
in to check overlap. Dashed boxes marked `MOCKUP`, `SLOT` or `NEEDS JOHN` are
annotations, not design.

---

## 1. Recommendation: Hero 1, "name first"

**Pick Hero 1**, with the key-figures band restyled (section 5, `StatsBand`)
directly under it.

| | Hero 1: name first | Hero 2: proof first |
|---|---|---|
| Idea | Name window left (7/12), `desk_assist.exe` right (5/12). One loud thing, one proof. | Name and intro on row 1; row 2 is the proof: `desk_assist.exe` (7/12) + `key_figures.csv` (5/12). StatsBand is removed from Home. |
| 30-second read at 1366 | Name → role → "tools people can trust" → flow with "Agent reviews" lit → resume. All in 900px, scroll cue visible. | Same, plus four figures. Fold content runs to ~850px; the hero is 949px, so the figures window sits under the docked Pause/Chat buttons. |
| 375 | Name, lead, two buttons, contact row in the first screen; the flow window starts at ~700px and peeks. | Figures come before the flow, so Desk Assist starts ~1150px down; hero is ~1800px. |
| Risk | Figures wait one scroll (they are directly below). | Four of the five proof items are pending John (copy.md B1–B4). Three windows in one fold is busier; figures beside `desk_assist.exe` can be misread as Desk Assist results even with source tags. |

Why 1: the critique's art direction is "one palette, one story, told twice";
Hero 1 tells the Desk Assist story once, cleanly, and lets the real-work
numbers follow as the second beat. It spends boldness in one place (the name)
and keeps the trust story legible (frontend-design: "let one element be the
memorable thing"; Impeccable layout: squint test still shows name → flow →
buttons in that order). Hero 2 is ready if John confirms the figures and wants
numbers above the fold.

**Mobile flow (Hero 1, decided):** the full 6-step list, vertical, below the
contact row. Not a horizontal scroller (ui-ux-pro-max `ux` "Horizontal Scroll:
avoid"), and not a condensed 3-step summary: I mocked a folded "1–3" node in an
earlier pass and it rewrote John's steps ("Reads the ticket, finds KB
guidance") to save only ~100px. The compact node (40px, 16px label) keeps all
six steps in ~420px.

**CTAs (both heroes):** 2 buttons + 1 grouped link row, down from 5 buttons.
`Download resume` (primary), `See projects` (secondary), then
`Reach me: Email  GitHub  LinkedIn` as underlined 44px text links
(ui-ux-pro-max quick-reference `primary-action`: one primary CTA, secondary
actions visually subordinate). Contact stays above the fold, as copy.md wanted.

**One cursor:** only the block cursor after `BRANZUELA` stays. The role-line
cursor goes (`Hero.tsx:198`).

---

## 2. Colour meaning (decision 2, applied)

Orange is now a word: **AI**. Teal: **Data & ML**. Cream with an ink frame:
**Full-stack** (John's "Build" keycaps). Labels say the word too, so colour is
never the only cue (WCAG 1.4.1).

| Surface | Before | After |
|---|---|---|
| Flow actor tag `AI` | teal | **orange** |
| Flow step numbers | orange chip | cream chip (neutral; numbers are order, not AI) |
| Flow emphasis (step 5 "Agent reviews") | orange fill, 3px | unchanged: orange fill, 3px ink, plus detail line "Every draft, before it's sent" |
| `In progress` badge | teal | cream (status, not data) |
| Project domain badge (new) | none | `AI` orange / `Data & ML` teal / `Full-stack` cream |
| Project year badge, `Featured` badge | orange | year as plain text; Featured dropped (size and the Lead say it) |
| Active filter chip | orange, pressed | **ink fill, cream text, pressed in** (shape + inversion, not hue) |
| Stat cells (StatsBand, case status bar, inline) | orange | **cream cells, ink figures**, 3px ink gaps |
| Spot plates on cards | orange/teal alternating, meaningless | removed from cards; case header plate cream |
| Primary buttons, marquee strips, section-heading first word | orange | unchanged: these are actions or display type, not labels |

One tension, flagged for John (NEEDS JOHN J1): in the flow, orange marks both
the AI steps' tags and the lit human step 5. I kept step 5 orange as he
decided; read it as "the moment the AI story earns trust". The alternative is
step 5 lit cream-on-ink (inverted) so orange stays strictly "AI did this".

On today's projects only Desk Assist is AI; SilverLink, SCS and UAT are
Full-stack; UWB and AI Finance are Data & ML. Orange stays rare, so it means
something.

---

## 3. What each mockup fixes

### Hero (both options)
- CRT/starburst art → `desk_assist.exe`: spot `spot-desk-assist` on an orange
  plate (AI), heading "How Desk Assist will draft a reply" (mono bold 17, not
  pixel: it is 7 words), `In progress` badge, the six steps from
  `Experience.tsx:33-40` unchanged, "More in Experience" link (44px) to
  `#experience`. The "will draft" framing stays; no outcome is claimed.
- Study chip split in two (`SIT × University of Glasgow`, `Graduating April
  2027`), per visual-hierarchy §2.1, so neither wraps mid-phrase at 375.
- Name window body padding 40 (lg) / 24 (375); name size unchanged.

### Project card (`project-card.html`)
Fixes "nested framing in Projects (tile shadows inside window inside teal
band)". Now two levels: **teal band → cards**. The `projects/` window wrapper
is gone; filters sit on the band.

Card anatomy, top to bottom (one link wraps the card):
1. **Thumbnail**, 200px (375) / 260px featured, 180px regular (lg), 3px ink
   rule below. **Crop, don't shrink:** `object-fit: none` with a per-project
   `object-position`, so the screenshot shows at its real pixel size and its UI
   text stays legible. SilverLink now shows two whole event cards ("Online
   Morning Tai Chi", "Smartphone Basics for Seniors") instead of a 6-card grid
   shrunk to mush. No greyscale, no hover zoom (zooming a crop blurs text).
   Neutral 1px `rgb(0 0 0 / .1)` inset outline (make-interfaces-feel-better).
2. **Meta row:** domain badge(s) left, year right (mono 15 navy, tabular).
3. **Title:** pixel 16 (regular) / 18 → 24 (featured), ink, `text-wrap: balance`.
4. **One-line outcome:** `projects.ts` `description`, mono 16/1.6 navy, ≤ 48ch.
5. **Role tag** (where known): `Team project · my part: …`, chip style (2px
   ink, no shadow, 16px team icon). SilverLink shows `Team project, 6 people`
   until John answers Q1.
6. **Tech tags:** first 3 only, mono bold 15.
7. **Link line:** `Read case study`, underlined, pinned to the bottom
   (`margin-top: auto`), no arrow.

States: rest 4px shadow; hover (fine pointers) `translate -2px -2px`, 6px
shadow; active `translate 4px 4px`, no shadow; focus-visible 3px ink ring,
offset 4px (ink on teal 9.69); reduced motion: no transition. Transitions list
`translate, box-shadow` only.

Filters become the legend and one taxonomy with the badges and the Skills
groups: `All`, `AI`, `Data & ML`, `Full-stack`, each with a 14px swatch. Four
chips wrap to at most two rows at 375 (critique: seven chips wrapped to four).

### Case study (`case-study.html`, SilverLink SG)
- **Top fold = the answer:** header window with domain badge + year, h1, lead,
  then a 3-column `<dl>`: **Role** / **My part** / **Outcome** (stacked at 375),
  GitHub button, status bar of four figures (cream cells). "My part" is
  `NEEDS JOHN Q1` and is hidden until answered (copy-case-studies rule: no "I
  built" on this page yet).
- **Order:** The problem → How it works → Key decision → Evidence → What's next
  → Next project band.
  - How it works holds "What people can do" (the 3 feature bullets), the
    **architecture slot** (dashed, for `design-visual-storyteller`'s
    `architecture.svg`; interim content is today's `FlowDiagram` tiers), and
    "Built with" (full stack tags; the separate Tech stack section goes).
  - Key decision: one lead decision ("No double-booking", 3px frame, 17px
    body) + two supporting (2px), from copy-case-studies §1 Key decisions 1–3.
    "Scale before the rush" keeps "recommended" (Q2).
  - Evidence: `event_detail.png` full width first (it shows the booking and
    capacity behaviour the outcome claims), then metrics and livestream.
  - What's next: pending John (Q2, Q14). If nothing comes back, drop it and the
    TOC item.
- **Sticky mini-TOC** from `lg` only: 216px column, `top: 88px` (clears the
  56px taskbar), "ON THIS PAGE" pixel 12 teal, 3px violet rail, links mono 16
  cream, 44px tall; current item bold with an orange `>` on the rail and
  `aria-current="true"`. No TOC below `lg`.
- Container widens from `max-w-5xl` to `max-w-6xl` (1152) so TOC + 65ch text fit.
- **Chat-launcher safety:** the overlap at 375 came from the full-width
  `GitHub profile` button running under the launcher column. Header links are
  `w-auto` at every width; the footer already has `pb-28` (112px), which clears
  the 56px launcher + 16px offset; keep it. `scroll-padding-bottom: 88px` stays.
- Breadcrumb links get `min-w-11` (the `Home` link measured 36×44).

---

## 4. Type and spacing scale (one table, replaces MASTER 1.3 / 1.4 for these roles)

Two families only (pixel display, mono body). Pixel sizes snap to multiples of
8 at `lg` where the face draws crisply (Press Start 2P is drawn on an 8px
grid); 12px stays the floor for labels. Body rises to **16px at every width**
(Impeccable typeset: 16px body floor; Courier Prime's small x-height makes 15px
read small), meta stays 15.

| Step | Family | 375 | 1366 (`lg`+) | Line height | Use |
|---|---|---|---|---|---|
| `px-hero` | pixel | `clamp(20px,7vw,30px)` ≈ 26 | 48 | 1.25 | Hero name (h1) |
| `px-h2` | pixel | `clamp(20px,6.5vw,26px)` | 48 | 1.2 | Home section h2 |
| `px-h1-case` | pixel | `clamp(20px,6vw,24px)` | 40 | 1.3 | Case h1 |
| `px-h2-case` | pixel | `clamp(18px,5.3vw,22px)` | 32 | 1.3 | Case h2 |
| `px-h3-feature` | pixel | 18 | 24 | 1.3 | Featured card title |
| `px-h3` | pixel | 16 | 16 | 1.4 | Card title, key-decision title (14 for supporting), Next project title |
| `px-stat` | pixel | 24 (`min(…,14cqi)` in cells) | 32 | 1.0 | Figures, `tabular-nums` |
| `px-label` | pixel | 12 | 12 | 1.5 | Title bars, badges, actor tags, step numbers, TOC label, `<dt>` |
| `mono-lead` | mono 700 | 18 | 22 | 1.4 | Hero lead, section leads, case header lead (≤ 40–46ch, balance) |
| `mono-h` | mono 700 | 17 | 17 | 1.35 | In-window heading (`desk_assist.exe`), lead decision body |
| `mono-body` | mono 400 | 16 | 16 | 1.6 on cream, 1.7 on navy | Paragraphs, bullets, card outcome, flow labels (700) |
| `mono-meta` | mono 400/700 | 15 | 15 | 1.4–1.5 | Year, captions, stat labels, source tags (700), tags (700), role tag (700), contact row |
| `mono-fine` | mono 400 | 14 | 14 | 1.5 | Copyright only |

| Space role | 375 | `lg` | Use |
|---|---|---|---|
| `s-in` | 8 | 8 | Chip↔chip, tag↔tag, badge↔year |
| `s-item` | 10–12 | 12 | Flow node↔node (10), bullet↔bullet, card body rows |
| `s-group` | 16–24 | 24–32 | Lead → window; chips → CTAs; card thumb → body padding 20/24 |
| `s-block` | 32 | 40 | Block↔block inside a window, 3px ink rule between unrelated blocks |
| `s-pad` | 20–24 | 24–40 | Window body padding (compact windows 20/28, reading windows 24/40) |
| `s-section` | 64 | 80 | Case section↔section (Home stays 80/112) |
| `gutter` | 16 | 64 | Page gutter (32 at `sm`), always ≥ shadow offset |

Rule kept from visual-hierarchy §1.7: the gap below a level is at least double
the gap inside it.

---

## 5. Spec for the coder, file by file

### `client/src/components/Hero.tsx`
- Delete the art block (`~264-272`: starburst, CRT, sparkles) and render
  `<DeskAssistWindow />` in `lg:col-span-5`. Grid becomes
  `lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start` (tops align).
- Remove the role-line `<Cursor>` (`~198`). Keep the name cursor.
- Study: two `Chip`s in a `<ul aria-label="Study">` (`chip-school`
  "SIT × University of Glasgow", `chip-calendar` "Graduating April 2027").
- CTAs: keep the two `btn`s (`w-full sm:w-auto`, gap-4). Replace the three ghost
  buttons with `<p className="mt-4 flex flex-wrap items-center gap-x-4 font-mono text-[15px]">Reach me: <a…>Email</a> <a…>GitHub</a> <a…>LinkedIn</a></p>`;
  links `inline-flex items-center gap-2 min-h-11 font-bold underline decoration-2 underline-offset-4`,
  16px pixel icon on Email; keep sr-only "(opens in a new tab)" and the
  `NETWORKER` achievement on GitHub/LinkedIn.
- Name window body: `p-6 sm:p-10` (drop `xl:p-12`).
- Scroll cue: keep; it already sits in flow.

### New `client/src/components/DeskAssistWindow.tsx` + `client/src/data/deskAssist.ts`
- Move `DESK_ASSIST_FLOW` out of `Experience.tsx:33-40` into
  `data/deskAssist.ts`; add `detail: "Every draft, before it's sent"` to step 5.
  Experience and the hero import the same array (no drift).
- `<Window title="desk_assist.exe" bodyClassName="p-5 sm:px-7 sm:py-6">`, a
  `<figure aria-labelledby="desk-assist-hero">`; head row: `SpotPlate`
  (`spot-desk-assist`, tone orange, `size-12`) + `<h2 id="desk-assist-hero" className="font-mono font-bold text-[17px] leading-[1.35] text-black">How Desk Assist will draft a reply</h2>`
  + `In progress` badge (cream). Then `<FlowDiagram steps={…} labelledBy="desk-assist-hero" density="compact" />`,
  then the "More in Experience" link (`min-h-11`, `scrollToSection('experience', reduced)`).
- Static: no motion of any kind.

### `client/src/components/FlowDiagram.tsx` + `client/src/index.css`
- `ACTOR_FILL.AI` → `bg-[var(--orange)]`.
- Step-number chip: always `bg-[var(--cream)]` (drop the orange/cream swap).
- Emphasis node unchanged (orange, `border-[3px]`).
- `detail` renders on its own row under the label: node inner becomes
  `grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5`, detail
  `col-start-2 col-span-2 text-balance`.
- New prop `density?: 'default' | 'compact'`. Compact: `gap-2.5` between
  nodes, node `min-h-10 px-2.5 py-1.5`, emphasis `py-2`, label `text-base
  leading-[1.3]`; `.flow--compact .flow-link { top: -10px; height: 10px; left: 1.4rem }`.
  Compact never switches to the lg row layout.
- (Hero 2 only) `lgSplit` that renders two columns 1–3 / 4–6 via CSS columns
  and `break-before: column` on the 4th node; not needed for Hero 1.

### `client/src/components/Experience.tsx`
- Import the shared flow data. `BADGE_FILL`: `Internship`, `In progress`,
  `Education` → `bg-[var(--cream)]` (badges are words; orange and teal now mean
  AI and data). Nothing else changes.

### `client/src/components/StatStrip.tsx`, `StatsBand.tsx`
- Cells `bg-[var(--cream)]`, figures `text-black`, labels
  `text-[color:var(--navy)]`. Gaps stay black (3px). Add optional
  `source?: string` per copy.md 2026-11-07, rendered as
  `<span class="block mt-1.5 font-bold text-black">` inside the `dt`.
- `StatsBand`: the 2026-11-07 figures **only after John answers B1–B4**; until
  then keep today's four. `HELLO!` cell → `bg-[var(--violet)] text-[color:var(--cream)]`
  (pixel 20/24: large text, 4.98 passes) so it still reads as a separate cell.
- `status` and `inline` variants get the same cream cells.

### `client/src/data/projects.ts`
Add per project: `domains: ('ai'|'data'|'fullstack')[]`, `role?: string`,
`thumbFocus: string` (CSS `object-position`). Values:

| Project | domains | role | thumbFocus |
|---|---|---|---|
| SilverLink SG | fullstack | `Team project, 6 people` (Q1 pending) | `11% 7%` |
| SCS Awareness Platform | fullstack | `Team project · my part: core engine and media` | `50% 22%` (NEEDS J4) |
| AI Finance Insights Engine | data (+ ai if Q5 confirms a model) | none (Q4) | `0% 0%` |
| UWB Indoor Localization | data | `Team project · my part: data mining method` (Q8) | `75% 0%` |
| UAT Testing Dashboard | fullstack | none (Q6) | `18% 0%` |
| Fire Safety Drill Companion | data, fullstack | `Team project · my part: routing and AR` (Q11) | set when built |
| GreenLoopFarms | none; badge text `Pitch` (cream) | none | keep |

Drop `featured` styling except span and image height. `facts` stay for the
case header but leave the card.

### `client/src/components/Projects.tsx`
- Remove `<Window title="projects/">`; filters and grid sit on the teal band.
- `FILTERS` → `All`, `AI` (match `domains`), `Data & ML`, `Full-stack`; each
  chip gets a `14px` swatch `<i aria-hidden>` with a 2px ink border.
- `chipClass(active)`: active `bg-black text-[color:var(--cream)] translate-x-[3px] translate-y-[3px] shadow-none`;
  inactive unchanged. Swatch border turns cream when active. (Skills keyboard
  filters share `chipClass`; same result there, which fixes the critique's
  colour-only filter state.)
- `ProjectTile` body order per section 3; remove the `SpotPlate` sticker, the
  `Featured` badge, the orange year badge, `grayscale` and `group-hover:scale`.
  Image: `object-fit: none` + `style={{ objectPosition: project.thumbFocus }}`,
  `outline outline-1 -outline-offset-1 outline-black/10`. Height `h-[200px]`,
  featured `lg:h-[260px]`, regular `lg:h-[180px]`. Tags `slice(0, 3)`.
  Focus `outline-offset-4`. Link text `Read case study`, no arrow.
- Grid gap `gap-x-6 gap-y-8` at `lg`.

### `client/src/components/case/CaseHeader.tsx`
- Replace `facts` chips with `role`, `part?`, `outcome` props rendered as
  `<dl className="col-span-2 mt-6 pt-6 border-t-[3px] border-black grid gap-5 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-8">`;
  `dt` pixel 12 ink, `dd` mono 16/1.6 navy. Omit the `My part` cell when `part`
  is undefined (SilverLink, AI Finance, UAT for now).
- Grid `grid-cols-[minmax(0,1fr)_auto]` (the 1fr min-content overflowed at 375
  in the first mockup pass). Top row: domain badge + year (plain text), `flex-wrap`.
- Spot plate tone `cream` (add `cream` to `PlateTone`); `size-24 lg:size-36`.
- Link buttons `w-auto` at every width (fixes the chat-launcher overlap).

### `client/src/components/case/CaseLayout.tsx`
- `max-w-5xl` → `max-w-6xl` for the taskbar, breadcrumb and body.
- Body: `lg:grid lg:grid-cols-[216px_minmax(0,1fr)] lg:gap-x-14`. New
  `<CaseToc items={[{id,label}]} />` in the first column: `hidden lg:block sticky top-[88px] self-start`;
  current item via one `IntersectionObserver` (`rootMargin: '-72px 0px -60% 0px'`)
  setting `aria-current="true"`. No animation; clicks use
  `scrollToSection(id, reduced)`.
- `CRUMB_LINK` + `min-w-11 justify-center`.
- `NextProject`: horizontal mini card (thumb 240px left from `sm`, body right).

### `client/src/components/case/CaseBlocks.tsx`
- Add `KeyDecisions({ main, more })`: main `border-[3px] p-5 lg:px-6`, title
  pixel 16, body mono 17; supporting `border-2 p-4`, title pixel 14, body 16;
  `lg:grid-cols-2`, main spans both. No shadows (not pressable).
- Add `DiagramSlot({ src?, alt, fallback })`: renders the storyteller's SVG in
  a `figure` when `src` exists, else `fallback` (the current `FlowDiagram`).

### `client/src/pages/SilverLinkProject.tsx`
- Sections and ids: `problem`, `how` (feature bullets + `DiagramSlot` + Built
  with tags), `decision`, `evidence` (`ScreenGallery` with event detail first
  and wide, then metrics, livestream; onboarding and the events hero shot can
  go to "Open full size" or be dropped), `next` (only when John answers).
  Remove the standalone `what` and `stack` sections. Copy is
  copy-case-studies §1 verbatim; the Key decision lead is "Bookings never
  overbook, even when many people book at once." (from the deck's header line).

Other case pages follow the same order in a later pass.

---

## 6. Contrast and target checks (computed, WCAG 2.x)

| Text / element | On | Ratio | Where |
|---|---|---|---|
| ink | orange | 8.08 | AI tag, AI badge, lit step 5, primary button |
| ink | teal | 9.69 | Data & ML badge, swatch-free text on the band, secondary button |
| ink | cream | 17.58 | Full-stack badge, figures, tags, titles, flow labels |
| navy | cream | 14.40 | Outcome, labels, year, captions |
| cream | ink | 17.58 | Active filter chip; hero terminal body |
| orange / teal | ink | 8.08 / 9.69 | Two-tone name |
| cream | navy | 14.40 | Leads, TOC links, contact row |
| teal | navy | 7.94 | Role line, TOC label |
| orange | navy | 6.62 | `>` prompts, TOC current marker |
| cream | violet | 4.98 | Title bars, taskbar, `HELLO!` cell (12px pixel passes 4.5) |
| ink ring | teal / cream | 9.69 / 17.58 | Card and chip focus |
| orange ring | navy | 6.62 | Focus on the page |

Decorative only (each has a text label or an ink frame doing the work):
orange swatch on cream 2.18, teal swatch on cream 1.81, violet TOC rail on
navy 2.89, ink shadows on navy 1.22. No banned pairing is used.

Targets (measured in the renders): buttons 48px tall; filter chips 44px;
contact links, "More in Experience", TOC links and breadcrumb links 44px tall
and ≥ 44px wide after the `min-w-11` fix; whole cards are the link; ≥ 8px
between targets everywhere. Smallest text: 12px pixel labels; all body,
captions, tags and labels ≥ 15px.

---

## 7. NEEDS JOHN

- **J1.** Flow colour: keep step 5 "Agent reviews" orange (your call) even
  though orange now also means "AI"? Or light it inverted (ink with cream text)?
- **J2.** OK for orange to leave non-AI labels (stat cells, year and Featured
  badges, active filter, step numbers), keeping it on buttons, marquees and
  headings?
- **J3.** Hero 1 or Hero 2. Hero 2 only makes sense once the figures are
  confirmed (copy.md **B1–B4**).
- **J4.** SCS thumbnail: the current image (`scs_p65_img0.png`) contains a
  template placeholder "Enter your text here…" below the crop. Is there a real
  story screen to use instead?
- **J5.** Card role tags: confirm `my part: core engine and media` (SCS),
  `data mining method` (UWB, case Q8), `routing and AR` (Fire Safety, Q11), and
  what you built on SilverLink (case Q1).
- **J6.** AI Finance: does the NLP use a model (case Q5)? If yes it gets the
  orange `AI` badge too.
- **J7.** SilverLink "What's next": is `app.silverlink.cc` live and linkable
  (Q2)? Any real-world result (Q14)? If not, the section is dropped.

---

## Skills used

- **ui-ux-pro-max** (`search.py --help` first): `--domain landing "portfolio
  hero social proof"` (Portfolio Grid: hero name/role → work; confirmed the
  name-first order), `--domain ux "type scale line height"` (1.5–1.75 body
  leading, consistent modular scale → section 4), `--domain ux "fixed element
  covers content mobile"` (account for other fixed elements → chat-safe
  padding and `w-auto` header links), `--domain ux "horizontal scroll mobile
  carousel"` (avoid horizontal scroll → vertical mobile flow, wrapping
  filters), `--domain typography "pixel font monospace"` (Press Start 2P is
  wide → never for the 7-word desk_assist heading). Quick-reference rule
  `primary-action` settled the CTA grouping. `"primary CTA count competing
  actions"` and `"sticky table of contents long article"` returned no direct
  match; one narrower retry each; TOC behaviour is from Impeccable layout and
  the existing taskbar rules, stated as fallback.
- **Impeccable** `typeset` (16px body floor, light-on-dark leading
  compensation, balance/pretty wrapping), `layout` (squint test, group by
  proximity before containers → removing the `projects/` window), `adapt`
  (rethink for mobile instead of scaling → TOC removed, flow kept vertical).
  The plugin's write hook scanned every mockup: no findings.
- **frontend-design**: one memorable element (the name), structure as
  information (numbers only on a real sequence), no `→` on link text, no
  all-caps labels beyond pixel display.
- **make-interfaces-feel-better**: explicit transition properties, tabular
  numbers in figures and years, neutral image outline on thumbnails,
  `text-wrap: balance` on titles and the step-5 detail, 44px hit areas.
