# Visual hierarchy and visuals pass

John's feedback (Oct 2026): "I need more visuals and more hierarchy in
important text. Also feel like it's very wordy."

This file adds a **hierarchy system** (how important text pops) and a
**visuals plan** (spot illustrations, flow diagrams, bigger and earlier
screenshots, icon fact chips) to Home and the case-study template. It
overrides `MASTER.md`, `pages/home.md` and `pages/case-study.md` only where it
says so (list in §0). CLAUDE.md wins over all of it.

Words come from `copy-trim.md` (the copywriter's ~40–50% cut). Words the
copywriter wraps in `**double asterisks**` render as **key terms** (§1.3).
Nothing here adds a fact. Every number, node label and chip below is already
on the site (component files on `retro-web`) or in the resume; where the order
of steps isn't stated, it's flagged **NEEDS JOHN**.

The idea in one line: **the navy page is the skim layer, the windows are the
detail layer.** A recruiter who reads only the pixel headings, the `>` lead
lines on navy and the orange number cells gets the story in 30 seconds. The
windows hold the proof for anyone who stops.

---

## 0. What this overrides

| Where | Before | Now |
|---|---|---|
| MASTER 1.3 `lead` | mono bold 16/18, first bio line | `lead` 18/22 with a `>` prompt, sits on navy above the window (§1.2). The old 16/18 style is renamed `lead-s` (used inside windows) |
| MASTER 2.4 / 2.7 bullets | 10px orange square, 2px ink border | `bullet.svg` pixel arrow, 16px (§1.5) |
| MASTER 2.6 StatStrip | `band`, `status` | adds `inline` variant (§1.4) |
| case-study §1 order | header, problem, built, part, how, screens, results, stack | header, **hero shot**, problem, what it does, **screens**, my part, how it works (**diagram first**), results, stack (§4) |
| case-study §5 cover | Home tile image, `lg` only, right column | the project's **spot illustration** on a colour plate, all widths; the screenshot moves to the hero shot below the header, all widths (§4.1) |
| case-study §3 MetaList | label/value rows | **icon fact chips** (§3.4) |
| case-study §6 spans | full if aspect ≥ 1.75 | full if aspect ≥ 1.4 **and** intrinsic width ≥ 860px (§3.3) |
| home §4 Experience | badges, org, role, 7 bullets | Desk Assist block with spot + flow diagram, impact numbers, ≤ 4 bullets visible (§2.4) |
| home §5 tiles | screenshot, title, description, facts, tags | adds the spot "sticker" on the image edge (§3.1) |

---

## 1. Hierarchy system

### 1.1 The levels

Six levels, each with one job. A level is never styled like the one above or
below it.

| Level | Token | Looks like | Job | Where it lives |
|---|---|---|---|---|
| L1 | `display-l` / case h1/h2 (existing) | Press Start 2P, two-tone on navy | Name the section | Navy, teal band |
| L2 | **`lead`** (new) | Courier Prime **bold 18 → 22**, `>` prompt | The one sentence to read if you read nothing else | Navy, directly under the h2 |
| L3 | **`num`** (StatStrip `inline`, new variant) | Pixel figure on an orange cell | Proof, as a number | Inside windows |
| L4 | **`key`** (new) | **Bold**, ink on a teal block | The 1–4 words inside body text that carry the meaning | Inside body text |
| L5 | `body` / bullets (existing size) | Courier Prime 15/16, pixel arrow bullets | Detail | Inside windows |
| L6 | **`chip`** (new) / tags / badges | 16px icon + mono bold 15, cream, 2px ink | Facts that are labels, not sentences | Headers, About, Experience |

Rule of thumb for the coder: **if it's a sentence, it's L2 or L5; if it's a
number, it's L3; if it's a label, it's L6.** Never a sentence in a chip, never
a number buried in a paragraph when a cell can hold it.

### 1.2 `lead`: the one line that opens each section

```
 ▣ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━         L1 h2 (existing)
                                              16px (lg 20)
 > Now building Desk Assist, an AI            L2 lead: cream, bold, 18/22
   assistant for service desk agents.         prompt orange, aria-hidden
                                              24px (lg 32)
┌──────────────────────────────────────┐
│▓ lga_telecom.exe             ○ □ ✕ ▓│      detail layer
```

| Property | 375 | `lg` |
|---|---|---|
| Family / weight | Courier Prime 700 | same |
| Size / line height | 18px / 1.4 | 22px / 1.35 |
| Measure | `max-w-[40ch]` | `max-w-[40ch]` (≈ 530px) |
| Wrap | `text-wrap: balance` (it's short) | same |
| Length | one sentence, ≤ 90 characters (copy-trim's first sentence of the section, moved out of the window, not new words) | same |
| Prompt | `>` in its own `aria-hidden` span, hanging (text block indented 2ch, prompt in the gutter so wrapped lines align with the first word) | same |
| Margin | 16px below the h2, 24px above the window | 20 / 32 |

Colour by surface (all approved pairings, MASTER 1.2):

| Surface | Lead text | Prompt `>` |
|---|---|---|
| navy page | cream **14.40** | orange **6.62** |
| teal band (Projects, Next project) | ink **9.69** | ink **9.69** |
| cream window (case header summary only) | ink **17.58** | ink **17.58** (orange on cream is 2.18, banned) |

`lead-s` (the old MASTER `lead`): mono bold 16/18, ink on cream. For the
first line *inside* a window block (Desk Assist's one-liner, "My part"
intros). Never two leads in a row.

Section without a window: if copy-trim leaves a section with only one
sentence, that sentence is the lead and the window is dropped (fewer boxes,
fewer words). Applies to "The problem" on pages where it fits in one sentence.

### 1.3 `key`: the marked words

**Choice: a teal highlight block, not an underline bar.** Links on this site
are already underlined ink text (`Open full size`, breadcrumb, "Read case
study"). An underline bar under key terms would make them look clickable.
A solid block reads as a highlighter pen, matches the solid-colour-block
direction, and needs no new colour.

```
 Desk Assist reads the ticket thread and ▒drafts a reply▒. An agent
 ▒reviews every draft▒ before anything is sent.
           ▒ = teal block, ink text, bold
```

```css
.key {
  background-color: var(--teal);
  color: var(--ink);
  font-weight: 700;
  padding-inline: 0.25em;
  padding-block: 0.05em;          /* stays inside the 1.65 line box */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;    /* padding repeats on wrapped lines */
}
```

- Markup: `<strong class="key">` (importance, read normally by screen readers;
  `<mark>` gets announced as "highlight" in some readers, which is noise).
- **Contrast:** ink on teal **9.69** (AA normal text). The block's edge
  against cream is 1.81 and against navy 2.08; that's fine because the edge
  is decorative and the bold weight is a second, non-colour cue (WCAG 1.4.1).
- **Surface rule:** on cream windows and on navy, teal block. On the teal band
  or inside a teal or orange block (UAT expected/actual, status cells) a key
  term would vanish or clash: use **cream** fill instead (ink on cream
  **17.58**). Never a key term on violet (footer stays quiet).
- **Caps** (if copy-trim marks more, keep the first ones and send the rest
  back to the copywriter): ≤ 1 per bullet, ≤ 2 per paragraph, ≤ 1 per lead,
  ≤ 4 words each, ≤ 6 per window.
- **Never** in headings, h1, window titles, buttons, chips, tags, badges,
  captions, flow-node labels, links or alt text. Never combined with an
  underline.
- Wrapping: `box-decoration-break: clone`, so a term broken across lines
  keeps its padding on both pieces. Don't use `white-space: nowrap`; a
  4-word term must still wrap at 375.

### 1.4 `num`: big-number callouts

Reuse `StatStrip` (MASTER 2.6), new `variant="inline"`: the same orange cells
and 3px ink gaps, framed by a 3px ink border, placed inside a window body.
The number is the visual; the label is short.

```
┌──────────────┬──────────────┐      375: 2 columns
│ 1,000+       │ 40%          │      value pixel, ink on orange 8.08
│ network      │ fewer manual │      label mono 15, ≤ 5 words
│ configs      │ agent actions│
│ migrated     │              │
├──────────────┼──────────────┤
│ 15 min       │ 4 h          │
│ faster       │ of reporting │
│ incident     │ saved weekly │
│ resolution   │              │
└──────────────┴──────────────┘█  no shadow (not pressable)
```

| Property | Value |
|---|---|
| Value | Press Start 2P, `clamp(18px,5.4vw,24px)` below `lg`, 28px from `lg`, `tabular-nums`, ≤ 6 glyphs ("1,000+", "15 min", "89.61%") |
| Label | mono 15/16, ink on orange **8.08**, `max-w-[18ch]`, ≤ 5 words |
| Columns | 2 (375) → 3 or 4 from `lg` (as many as there are cells, max 4). Odd count at 375: last cell spans 2 |
| Frame | `border-[3px] border-black`, `gap-[3px] bg-black`, **no shadow** |
| Semantics | `<dl>`, label first in the DOM, number shown on top (existing pattern) |
| Spacing | 32px above and below inside the window |

Only figures already in the copy. When a number moves into a cell, the
copywriter drops it from the sentence it came from (no saying it twice).

### 1.5 Bullets: pixel arrow, key term first

```
 ▶ ▒Concurrency-safe booking▒: a clash returns 409 instead of
   overbooking.
                                       12px gap (lg 16)
 ▶ ▒Livestreams▒ over WebRTC, with live chat.
```

- Marker: `bullet.svg` (new, `assets.md` #27), 16px, `aria-hidden`, top
  aligned to the first line: `margin-top: calc((1lh - 16px) / 2)` with a
  `5px` fallback. Replaces the 10px orange square everywhere (Experience,
  FeatureList, CardGrid lists, tile facts).
- List stays a real `<ul>`; grid `[16px_1fr]`, column gap 12px, so wrapped
  lines align with the text, not the marker.
- Shape of a bullet: **key term or verb + object first (≤ 5 words), then the
  detail.** One idea per bullet. ≤ 2 lines at 1366 (≈ 120 characters),
  ≤ 4 lines at 375.
- Gap between bullets 12px (375) / 16px (`lg`); between the bullet list and
  the next block 32 / 40.
- Max 6 bullets per list on case pages. On Home, ≤ 4 visible per role; the
  rest go behind a disclosure (§2.4).

### 1.6 Line lengths

| Text | Max measure |
|---|---|
| `lead` | 40ch |
| Body paragraph | 65ch (60ch on navy) |
| Bullet text | 60ch |
| Card body (CardGrid) | 45ch, ≤ 2 sentences |
| Figure caption | 60ch, one sentence |
| Flow node label | ≤ 18 characters (≈ 3 words) |
| Flow node detail (optional) | ≤ 40 characters |
| Chip | ≤ 28 characters including the label word |
| Impact label | ≤ 5 words, `max-w-[18ch]` |

Courier Prime is monospace, so `ch` equals characters. All under 80.

### 1.7 Spacing that separates levels

Rule: **the gap below a level is at least double the gap inside it.** Items
in a group sit close; groups sit far apart; sections sit very far apart.

| Relation | 375 | `lg` |
|---|---|---|
| Chip ↔ chip, badge ↔ badge | 8 | 8 |
| Bullet ↔ bullet, paragraph ↔ paragraph | 12 / 16 | 16 |
| h3 or `lead-s` → its content | 12 | 16 |
| h2 → lead | 16 | 20 |
| Lead → window | 24 | 32 |
| Block ↔ block inside a window (diagram, impact row, bullets) | 32 | 40, with a 3px ink rule only between unrelated blocks |
| Window ↔ window (same section) | 40 | 40 |
| Section ↔ section | 80 Home / 64 case | 112 Home / 80 case |

---

## 2. Home, section by section

Before = branch `retro-web` today. After = this spec. Word cuts are
copy-trim's; this table says where the remaining words go.

### 2.1 Hero

| | Before | After |
|---|---|---|
| Name | two-tone, scrambling | unchanged |
| Role line | `> AI · DATA · FULL-STACK` | unchanged |
| Positioning | one 40-word paragraph, body 15/16 | **lead** "I build AI and data tools people can trust." (cream, 18/22, key term allowed: one) + one body line on Desk Assist ("in progress" stays) |
| Study facts | sentence: "Computing Science at SIT × University of Glasgow, graduating April 2027." | two **chips** on navy: `[school] SIT × University of Glasgow` `[calendar] Graduating April 2027` |
| CTAs | unchanged | unchanged |

```
375                                     1366 (text column, art unchanged)
┌───────────────────────────────┐       ┌─────────────────────────────────┐
│ welcome.exe  JOHN AARON       │       │ welcome.exe                     │
│              BRANZUELA█       │       │ JOHN AARON / BRANZUELA█         │
└───────────────────────────────┘█      └─────────────────────────────────┘█
 > AI · DATA · FULL-STACK▌               > AI · DATA · FULL-STACK▌
 > I build AI and data tools             > I build AI and data tools
   ▒people can trust▒.        (lead)       ▒people can trust▒.
 Now building Desk Assist at LGA         Now building Desk Assist at LGA
 Telecom (in progress).       (body)     Telecom (in progress).
 [▣ SIT × University of Glasgow]         [▣ SIT × University of Glasgow]
 [▦ Graduating April 2027]               [▦ Graduating April 2027]
 [▣ Download resume          ]█          [Download resume]█ [See projects]█
```

Chips on navy: cream fill carries the shape (14.40 vs navy); ink text on
cream **17.58**. The hero stays the one loud moment: no spot here (the CRT is
its illustration).

### 2.2 Stats strip

Unchanged. It's already L3 done right.

### 2.3 About

| | Before | After |
|---|---|---|
| Opening | bold first line inside the window | **lead** on navy above the window: "I build AI and data tools for the people who have to use them." |
| Facts | 5-row `dl` (Studying, Graduating, Now, Before, Based in) | 5 **chips** under the photo, wrapping: `[school] SIT × University of Glasgow` `[calendar] Graduating April 2027` `[briefcase] Intern, LGA Telecom` `[school] Diploma, Nanyang Polytechnic` `[globe] Singapore` |
| Bio | 3 paragraphs after the lead | ≤ 2 short paragraphs (copy-trim), ≤ 2 key terms each |

```
375                                   1366
 ▣ ABOUT ME ━━━━━━━━━━━━              ▣ ABOUT ME ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 > I build AI and data tools          > I build AI and data tools for the
   for the people who have to           people who have to use them.
   use them.                         ┌──────────────────────────────────────┐
┌──────────────────────────────┐     │▓ about_me.txt                ○ □ ✕ ▓│
│▓ about_me.txt        ○ □ ✕ ▓│     │ ┌──────────┐  Right now I'm building │
│ ┌──────────────────┐         │     │ │ photo    │  ▒Desk Assist▒ at LGA... │
│ │ photo 224        │         │     │ │ 288      │                         │
│ └──────────────────┘█        │     │ └──────────┘█ Before that: SilverLink │
│ [▣ SIT × University of       │     │ [▣ SIT × Univ…] SG, a UWB model, the  │
│    Glasgow] [▦ Grad. Apr 27] │     │ [▦ Graduating…] ▒SCS platform▒ ...    │
│ [▤ Intern, LGA Telecom]      │     │ [▤ Intern, LGA…]                      │
│ [▣ Diploma, NYP] [◍ SG]      │     │ [▣ Diploma…] [◍ Singapore]            │
│ Right now I'm building       │     └──────────────────────────────────────┘█
│ ▒Desk Assist▒ ...            │
└──────────────────────────────┘█
```

Chip text spells out what the old `dt` said where it's needed ("Graduating
April 2027", not "April 2027"). The photo column is 288px from `md`, so chips
wrap inside it.

### 2.4 Experience

The recruiter's "what is he doing now" moment gets the strongest treatment on
the page after the hero: a program icon, a flow diagram and four numbers.

| | Before | After |
|---|---|---|
| Opening | none | **lead** on navy: "Now building Desk Assist, an AI assistant for service desk agents." |
| LGA header | badges Internship + In progress, org, role, period text | badge Internship; org (display-s); role (mono bold); period as `[calendar]` chip. "In progress" badge moves to the Desk Assist block, where it describes the thing in progress |
| Desk Assist | bullet 1, ~45 words | **Desk Assist block**: spot `spot-desk-assist` on a teal plate + h4 "Desk Assist" + teal "In progress" badge + one `lead-s` line + **flow diagram** (§3.2.1). Bullet 1 is cut (the diagram says it) |
| LGA numbers | inside 4 bullets | **impact row**, 4 cells: `1,000+` network configs migrated · `40%` fewer manual agent actions · `15 min` faster incident resolution · `4 h` of reporting saved weekly. Labels are drafts from the bullet text; the copywriter owns the wording |
| LGA bullets | 7 | ≤ 4 visible, key term first; the rest in a disclosure |
| Sembcorp | 6 bullets | impact row, 3 cells: `240+` MWp portfolio on the new CRM · `50+` defects tracked to resolution · `10+` stakeholders per training session; ≤ 4 bullets |
| Education | 4 bullets | period chip; modules as tags (MASTER 2.4); certifications as 2 bullets |

**Disclosure** (lead's call; needs no new facts): `<details>` after the 4th
bullet, `<summary>` styled as the ghost-on-cream button (ink text and 3px ink
border on cream **17.58**, hover teal fill **9.69**, 44px min height, `--focus:
ink`), label "Show N more". Opens instantly (a person-triggered change, no
animation). Hidden bullets stay in the DOM.

```
375
 ▣ EXPERIENCE ━━━━━━━━━━━━━━━━━
 > Now building Desk Assist, an AI
   assistant for service desk agents.
┌─────────────────────────────────┐
│▓ lga_telecom.exe        ○ □ ✕ ▓│
├─────────────────────────────────┤
│ [Internship]                    │
│ LGA TELECOM                     │  display-s
│ Service Desk Operations & AI    │  mono bold
│ Integration Intern              │
│ [▦ Aug 2026 – Present]          │  chip
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  3px ink rule
│ ┏━━━━━━━━━━┓ DESK ASSIST        │  plate 96 (teal), h4 pixel 15
│ ┃  spot    ┃ [In progress]      │  teal badge
│ ┃  96px    ┃ Drafts replies     │  lead-s 16 bold
│ ┗━━━━━━━━━━┛ agents review.     │
│                                 │  32
│ ┌ 1 Ticket ─────────────────┐   │  flow, vertical (§3.2)
│ └───────────────────────────┘   │
│               ▼                 │
│ ╔═[AI, via company backend]═══╗ │
│ ║┌ 2 Reads the thread  [AI] ┐║ │
│ ║└──────────────────────────┘║ │
│ ║             ▼              ║ │
│ ║┌ 3 Finds KB guidance [AI] ┐║ │
│ ║             ▼              ║ │
│ ║┌ 4 Drafts a reply    [AI] ┐║ │
│ ╚════════════════════════════╝ │
│               ▼                 │
│ ┌ 5 Agent reviews  [Agent] ─┐   │  orange fill
│               ▼                 │
│ ┌ 6 Sent ───────────────────┐   │
│                                 │  32
│ ┌────────────┬────────────┐     │  impact row (inline StatStrip)
│ │ 1,000+     │ 40%        │     │
│ ├────────────┼────────────┤     │
│ │ 15 min     │ 4 h        │     │
│ └────────────┴────────────┘     │
│                                 │  32
│ ▶ ▒Security requirements▒ for   │  bullets, key term first
│   the extension: ...            │
│ ▶ ...  (4 max)                  │
│ [ Show 2 more ]                 │  disclosure
└─────────────────────────────────┘█

1366
┌─────────────────────────────────────────────────────────────────────┐
│▓ lga_telecom.exe                                           ○ □ ✕ ▓│
├─────────────────────────────────────────────────────────────────────┤
│ [Internship]                                                        │
│ LGA TELECOM                                   [▦ Aug 2026 – Present]│
│ Service Desk Operations & AI Integration Intern                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ┏━━━━━━━━━━━━━━┓  DESK ASSIST  [In progress]                        │
│ ┃              ┃  Drafts replies that service desk agents review    │
│ ┃  spot 144px  ┃  before anything is sent.                          │
│ ┗━━━━━━━━━━━━━━┛                                                    │
│      ╔═[AI, via company backend]════════════════╗                   │
│ ┌──────┐ ║┌────────┐ ┌────────┐ ┌────────┐║ ┌────────┐ ┌──────┐     │
│ │1     │▶║│2 Reads │▶│3 Finds │▶│4 Drafts│║▶│5 Agent │▶│6 Sent│     │
│ │Ticket│ ║│thread  │ │KB guid.│ │a reply │║ │reviews │ │      │     │
│ └──────┘ ║│   [AI] │ │   [AI] │ │   [AI] │║ │[Agent] │ └──────┘     │
│          ╚══════════════════════════════════╝ └────────┘ (orange)   │
│ ┌──────────────┬──────────────┬──────────────┬──────────────┐       │
│ │ 1,000+       │ 40%          │ 15 min       │ 4 h          │       │
│ │ network      │ fewer manual │ faster       │ of reporting │       │
│ └──────────────┴──────────────┴──────────────┴──────────────┘       │
│ ▶ bullets, 2 columns from lg if ≥ 4, max 60ch each                  │
└─────────────────────────────────────────────────────────────────────┘█
```

### 2.5 Projects (teal band)

| | Before | After |
|---|---|---|
| Opening | sentence inside the window: "Six projects I've built, plus one pitch. Start with…" | **lead** on the teal band (ink 9.69, ink prompt): "Start with SilverLink SG and the SCS Awareness Platform." The count sentence goes (the tiles show it) |
| Tile visual | screenshot only | screenshot + **spot sticker** on its bottom edge (§3.1) |
| Tile text | 2-sentence description (~40 words), facts, tags, "Read case study" | title → one sentence (copy-trim) with ≤ 1 key term → facts as pixel-arrow list → tags → "Read case study" |

### 2.6 Skills

| | Before | After |
|---|---|---|
| Intro | 2 sentences | **lead**: "What I use, and where I used it." The "AI keys are amber" and "press a key" sentences become the keyboard's own hint (copy's call) |
| Keyboard | unchanged | unchanged (CLAUDE.md exception) |
| List | group label + skills | unchanged; optional "Used in" line stays the lead's call |

### 2.7 Footer

Unchanged. Its heading and one sentence already work as L1 + L2.

---

## 3. Visuals

### 3.1 Spot illustrations as program icons

Concept: on a 90s desktop every program has an icon. Each project and Desk
Assist gets one: an original 48×48 pixel spot illustration (`assets.md`
#15–22) on a square **colour plate**. Same icon on the Home tile, the case
header and, for Desk Assist, the Experience window, so the project is
recognisable across pages.

**Plate:** square, 3px ink border, solid fill, **no shadow** (not pressable on
its own), spot at an integer multiple (48 → 96 / 144 / 192). `aria-hidden`
wrapper, `<img alt="">` inside. Plate colours alternate so neighbouring tiles
differ:

| Spot | Plate |
|---|---|
| `spot-silverlink` | orange |
| `spot-scs` | teal |
| `spot-ai-finance` | orange |
| `spot-uwb` | teal |
| `spot-uat` | orange |
| `spot-firesafety` | teal |
| `spot-greenloop` | orange |
| `spot-desk-assist` | teal |

Sizes:

| Place | 375 | `sm`–`md` | `lg`+ |
|---|---|---|---|
| Home tile sticker | 96 | 96 | 96 |
| Case header | 96 | 144 | 192 |
| Experience, Desk Assist block | 96 | 96 | 144 |
| Next project tile (case pages) | 96 | 96 | 96 (same tile) |

**Home tile sticker:**

```
375 (tile ≈ 305px wide)               1366 featured tile
┌─────────────────────────────┐       ┌─────────────────────────────────┐
│[Featured]                   │       │[Featured]                       │
│      screenshot 224         │       │       screenshot 288            │
│┏━━━━━━━━━┓                  │       │┏━━━━━━━━━┓                      │
├┃  spot   ┃──────────────────┤       ├┃  spot   ┃──────────────────────┤
│┃  96     ┃ SILVERLINK  [2025]│      │┃  96     ┃ SILVERLINK SG  [2025]│
│┗━━━━━━━━━┛ SG               │       │┗━━━━━━━━━┛                      │
│ Connects seniors and youth  │       │ Connects seniors and youth ...  │
│ ...                         │       │ ▶ 8-node cluster ▶ 4 services   │
│ ▶ 8-node cluster            │       │ [React] [gRPC] [K8s] ...        │
└─────────────────────────────┘█      └─────────────────────────────────┘█
```

- The plate straddles the image/body rule: in the body's first row,
  `flex gap-3 items-start`, plate `-mt-[51px]` (half of 96 + 3px border),
  title and year in the remaining width. It covers only the screenshot, never
  text (CLAUDE.md "decoration never on top of body text").
- At 375 the title column is ≈ 180px: featured titles wrap to 2–3 lines at
  18px, which is fine with `text-wrap: balance`.
- The plate doesn't move on tile hover/press separately; it's part of the
  tile and moves with it.
- GreenLoopFarms (no case page) still gets its sticker.

### 3.2 Flow diagrams (HTML, not images)

One shared component, `FlowDiagram`, generalising AI Finance's existing
`PipelineSteps`. Inside a cream window body. No motion of any kind.

**Anatomy**

| Part | Spec |
|---|---|
| Wrapper | `<figure aria-labelledby>`; the h3 (or h4) above it names it, e.g. "How a reply gets drafted". No extra caption (fewer words) |
| Nodes | `<ol>` of `<li>`; cream fill, 2px ink border, no shadow, padding 12px 14px, min-height 56px |
| Step number | Real sequences only: orange badge (pixel 12, 2px ink, ink text **8.08**), `<span class="sr-only">Step </span>N`. Parallel items (fork, tiers) get no numbers |
| Label | mono bold 15/16, ink on cream **17.58**, ≤ 18 characters, `text-wrap: balance` |
| Detail | optional, mono 15, navy on cream **14.40**, ≤ 40 characters |
| Actor badge | optional, pixel 12: "AI" teal (ink **9.69**), "Agent" / "Staff" / "Visitor" cream with 2px ink (**17.58**). The word carries the meaning, colour helps scanning |
| Emphasis node | the one step that matters most (Desk Assist's human review): orange fill, ink text **8.08**, 3px border. One per diagram, max |
| Connectors | `aria-hidden`; 3px ink rule + 9×9px ink pixel arrowhead (CSS `clip-path` stepped triangle). Vertical (24px) below `lg`, horizontal (24px) from `lg`. Ink on cream **17.58** non-text |
| Group frame | optional, wraps consecutive nodes that share a context: 2px ink border, 12px padding, a violet label tab (pixel 12, cream on violet **4.98**) |
| Loop note | a return step ("re-plans when a stairwell is blocked") is a bordered note under its node with a `↺` glyph (`aria-hidden`) + text. At `lg` an optional 3px ink return line may be drawn as an inline `<svg aria-hidden>`; the text note always stays |
| Width | 375: one column, full width. `lg`: one row if ≤ 6 nodes and every label ≤ 18 chars, else 3 + 3 rows (like PipelineSteps) |

**Layouts**

```
line (375)          line (lg)
┌──────────┐        ┌────┐ ┌────┐ ┌────┐ ┌────┐
│1 Label   │        │1   │▶│2   │▶│3   │▶│4   │
└──────────┘        └────┘ └────┘ └────┘ └────┘
     ▼
┌──────────┐        fork (both widths: branches side by side)
│2 Label   │        ┌──────────┐
└──────────┘        │3 Split   │
                    └────┬─────┘
tiers (SilverLink)   ┌───┴────┐
┌─────────────────┐  ▼        ▼
│ React front end │ ┌──────┐ ┌──────┐
└─────────────────┘ │Branch│ │Branch│
        ▼           └──┬───┘ └──┬───┘
┌─────────────────┐    └───┬────┘
│ API gateway     │        ▼
└─────────────────┘   ┌──────────┐
        ▼             │5 Evaluate│
┌───────┐┌───────┐    └──────────┘
│Event  ││Booking│  2×2 at 375,
├───────┤├───────┤  4 across from sm
│Volunt.││User   │
└───────┘└───────┘
        ▼
┌─────────────────┐
│ 8 schemas, PG   │
└─────────────────┘

lanes (SCS): two labelled rows, "Staff" above, "Visitor" below; at 375 the
lanes stack (Staff lane first), each a vertical line layout.
```

Semantics: `line` = one `<ol>`. `fork` and `tiers` = `<ol>` where a step's
`<li>` holds a nested `<ul>` of the parallel items. `lanes` = two `<ol>`s,
each with a visible lane h4 ("Staff", "Visitor"). Screen readers get the
order from the list; arrows add nothing they need.

#### 3.2.1 Desk Assist (Home, Experience, LGA window) — `line`

Source: Experience bullet 1 and 2 ("reads the ticket thread, finds matching
knowledge-base guidance and drafts a reply. The agent reviews every draft
before it's sent"; "AI calls routed through a company-controlled backend").

| # | Label | Actor | Note |
|---|---|---|---|
| 1 | Ticket | — | |
| 2 | Reads the thread | AI | in group "AI, via company backend" |
| 3 | Finds KB guidance | AI | in group |
| 4 | Drafts a reply | AI | in group |
| 5 | Agent reviews | Agent | **emphasis node** (orange) |
| 6 | Sent | — | |

h4 above it (copy's call), e.g. "How a reply gets drafted". This is the trust
story in one picture: the AI drafts, a person decides. Must still say "In
progress" (badge on the block).

#### 3.2.2 Case "How it works" diagrams

| Page | Layout | Nodes (existing content only) | Replaces |
|---|---|---|---|
| SilverLink SG | `tiers` | React front end → API gateway (detail "REST to gRPC") → [Event · Booking · Volunteer · User] services → 8 isolated schemas (detail "Neon PostgreSQL") | Card "One gateway, four services" and "Each service owns its data" (cut; the diagram says it). Keep the concurrency, idempotency, EMA and deploy cards |
| SCS | `lanes` | Staff (h4): 1 Edit panels (no code) → 2 Upload sprites → 3 Translate (MyMemory). Visitor (h4): 1 PDPA consent → 2 Story and questions (detail "4 question types, branching") → 3 Score → 4 Top-10 leaderboard. Staff lane's last node connects down into Visitor 2; a final Staff node "Export analytics" follows Visitor 3 | "What it does" card lists shrink to the items not in the diagram |
| AI Finance | `line`, 3 + 3 | existing `PipelineSteps`: Extract → Validate (raw gate) → Transform → Validate (clean gate) → Load → NLP engine (AI badge) | Already built; restyle with `FlowDiagram` tokens (pixel arrow connectors, actor badge) |
| UWB | `line` + `fork` | 1 41,996 samples (detail "7 environments") → 2 Prepare features (detail "PCA on 1,016 CIR dims") → 3 Split 80/20, scale on train → fork: [Classify LOS/NLOS (SVM-RBF)] [Estimate range (linear regression)] → 4 Evaluate | Cards "No leakage" and "Fewer, better inputs" shrink to what isn't in nodes. **NEEDS JOHN:** the page doesn't say whether PCA ran before or after the split; confirm node 2/3 order |
| UAT | `line` + loop | 1 Run test case → 2 Fail: log defect (detail "linked to the test") → 3 Triage (detail "severity + priority") → 4 In progress → 5 Resolved → 6 Closed; loop note on 6: "↺ Reopened if it fails again" → dashboard and CSV are the h3 below, not nodes | "What it does" bullets 1–4 shrink. **NEEDS JOHN / copy:** "Reopened if it fails again" is a reading of "Closed or Reopened"; copywriter to confirm the wording |
| Fire Safety | `line` + loop | 1 Choose block and unit → 2 Dijkstra: nearest exit (detail "floor-plan graph") → 3 Route to AR waypoints → 4 AR arrows + step tracking (detail "ARCore + PDR") → 5 Nearest exit; loop note on 2: "↺ Re-plans if a stairwell is blocked". Group frame over 2–4: "On the phone, works offline" | Cards "Routing", "AR on the camera feed", "Works when the network doesn't" shrink or go |

Diagram first in the How it works window, then the remaining cards (≤ 4,
each ≤ 2 sentences).

### 3.3 Screenshots: larger and earlier

1. **Hero shot.** One figure directly after the header window, before The
   problem, at every width (today the first screenshot is several windows
   down, and at 375 none shows before it). Figure-window anatomy unchanged
   (case-study §6). It is not repeated in the gallery.

   | Page | Hero shot | Why |
   |---|---|---|
   | SilverLink | `events_discovery.png` (873×560) | Shows the product at a glance; already the Home tile image |
   | SCS | `story_player.png` (532×843, portrait) | What a visitor at the booth sees |
   | AI Finance | none | No confirmed screenshot (case-study §4). The **pipeline diagram takes the hero slot**: How it works moves to directly after the header |
   | UWB | `model_comparison.png` (1389×490) | Puts the headline accuracy next to the baseline |
   | UAT | `dashboard.png` (1440×922) | The whole tool in one screen |
   | Fire Safety | `ar_navigation.png` (436×737, portrait) | AR is the hook |

   Landscape hero: full container width, `loading="eager"`,
   `fetchpriority="high"`. Portrait hero: from `md`, image left (`max-h-[560px]`,
   cream padding 16) and the figcaption + "Open full size" in the column to
   its right (`md:grid md:grid-cols-[auto_1fr]`), so the width isn't wasted;
   below `md`, stacked, `max-h-[min(70svh,560px)]`.

2. **Gallery moves up**: right after "What it does" (§4).

3. **Bigger spans**: `full` when aspect ≥ 1.4 **and** intrinsic width ≥ 860px
   (never upscale a small image to 912px). Result: SilverLink onboarding and
   metrics full, event detail (640) and livestream (700) half; all SCS
   landscape shots full; UAT defects, defect detail and test cases full,
   reports half; Fire Safety onboarding, drill setup and quiz full, the rest
   half.

### 3.4 Icon fact chips

Replace label/value rows with chips where the chip text is self-explanatory
without its icon. Icons are decorative (`aria-hidden`), so the words must
carry the meaning: "Group 16" alone is unclear, "Team: Group 16" is not.

```
┌──────────────────────────────┐ ┌──────────────────┐
│ ▣ SIT × University of Glasgow│ │ ☺☺ Group 20, 6 people│
└──────────────────────────────┘ └──────────────────┘
 16px icon, 8px gap, mono bold 15, ink on cream 17.58
```

| Property | Value |
|---|---|
| Box | cream fill, 2px ink border, **no shadow** (static), padding 6px 10px, min-height 36px (not interactive, so the 44px rule doesn't apply) |
| Icon | 16px pixel icon left, `aria-hidden` |
| Text | mono bold 15, ink on cream **17.58**; sentence case; ≤ 28 characters. In a 289px window body a long chip may wrap: `min-w-0`, text wraps inside the chip, icon stays top-left (`items-start`) |
| List | `<ul aria-label="Project facts">` (case), `aria-label="Quick facts"` (About), `flex flex-wrap gap-2` |
| On navy | same chip; the cream fill carries the shape (14.40 vs navy) |

Icon set (new ones briefed in `assets.md` #23–26; existing reused with the
same meaning they have elsewhere):

| Fact | Icon |
|---|---|
| Course, institution, education | `chip-school` (new) |
| Dates, period, sprints | `chip-calendar` (new) |
| Team | `chip-team` (new) |
| Platform / device | `chip-phone` (new) |
| Role ("My role") | `icon-experience` (briefcase; same as "My part") |
| Project type, scenario | `icon-projects` (folder) |
| Location, market | `globe` |

Case header chips (from the current `meta` props):

| Page | Chips |
|---|---|
| SilverLink | `[school] SIT × University of Glasgow` `[team] Group 20, 6 people`; member names stay a plain line below if the copywriter keeps them |
| SCS | `[folder] For Singapore Cancer Society` `[team] Group D2, 4 people` `[briefcase] Role: core engine and media` |
| AI Finance | `[folder] Data pipeline with NLP` `[globe] Shipping and logistics` |
| UWB | `[school] CSC3105 Data Analytics, SIT` `[team] Group CS05` `[briefcase] Role: data mining methods` |
| UAT | `[school] Course project` `[folder] Hospital appointment system` |
| Fire Safety | `[school] INF2007 Mobile App Dev, SIT` `[team] Group 16` `[briefcase] Role: algorithms and AR` `[calendar] 3 Agile sprints` `[phone] Android, Pixel 6a` |

Chip wording is shortened from the current values; the copywriter confirms.
The year stays the orange badge (not a chip).

---

## 4. Case-study template, section by section

New order:

```
CaseTaskbar → Breadcrumb
CaseHeader        badges + plate, h1, lead, chips, links, status bar
Hero shot         figure (or AI Finance: How it works moves here)
The problem       lead on navy; window only if more than one sentence
What it does      lead + bullets (key term first)
Screens           gallery, remaining shots, bigger spans
My part           (SCS, UWB, Fire Safety only) lead-s + 2-col bullets
How it works      lead + FlowDiagram first, then ≤ 4 cards
Results           inline StatStrip (UWB, Fire Safety)
Tech stack        tags
NextProject       teal band, tile with sticker
```

Rhythm: text (problem, what) → visual (screens) → text (my part) → visual
(diagram) → numbers (results). No two text-only sections in a row after the
header.

### 4.1 Header

| | Before | After |
|---|---|---|
| Visual | Home tile image at `lg` only, right column | spot plate: beside the badges at 375 (badges left, plate right), 144px at `sm`, 192px in the right column (cols 9–12) at `lg` |
| Summary | `lead-s` 16/18 bold navy | **lead** 18/22 bold ink, ink `>` prompt, ≤ 1 key term |
| Meta | MetaList rows | **fact chips** (§3.4) |
| Links | unchanged | unchanged |
| Status bar | unchanged | unchanged (already L3) |

```
375                                     1366
┌───────────────────────────────┐      ┌──────────────────────────────────────────┐
│▓ silverlink_sg.exe    ○ □ ✕ ▓│      │▓ silverlink_sg.exe                ○ □ ✕ ▓│
├───────────────────────────────┤      ├──────────────────────────────────────────┤
│ [2025] [Team      ┏━━━━━━━━┓  │      │ [2025] [Team project]       ┏━━━━━━━━━━━┓│
│  project]         ┃ spot   ┃  │      │ SILVERLINK SG    (h1 40)    ┃           ┃│
│                   ┃ 96     ┃  │      │ > Connects seniors and      ┃ spot 192  ┃│
│                   ┗━━━━━━━━┛  │      │   youth through ▒skill-     ┃ (orange   ┃│
│ SILVERLINK SG    (h1 22)      │      │   sharing▒ and live events. ┃  plate)   ┃│
│ > Connects seniors and youth  │      │ [▣ SIT × University of      ┗━━━━━━━━━━━┛│
│   through ▒skill-sharing▒ and │      │   Glasgow] [☺☺ Group 20, 6 people]       │
│   live events.     (lead 18)  │      │ [GitHub profile]█                        │
│ [▣ SIT × University of        │      ├──────────┬──────────┬──────────┬─────────┤
│    Glasgow]                   │      │ 4        │ 8        │ 8        │ 7       │
│ [☺☺ Group 20, 6 people]       │      └──────────┴──────────┴──────────┴─────────┘█
│ [GitHub profile             ]█│      ┌──────────────────────────────────────────┐
├───────────────┬───────────────┤      │▓ events_discovery.png             ○ □ ✕ ▓│
│ 4             │ 8             │      │[            hero shot, full width       ]│
│ gRPC services │ K8s nodes     │      │ Events: workshops and livestreams ...    │
├───────────────┼───────────────┤      │                          Open full size  │
│ 8 ...         │ 7 ...         │      └──────────────────────────────────────────┘█
└───────────────┴───────────────┘█
┌───────────────────────────────┐
│▓ events_discovery.png ○ □ ✕ ▓│      hero shot (landscape)
│[ screenshot, full width      ]│
│ Events: workshops ...         │
│ Open full size                │
└───────────────────────────────┘█
```

At 375 the h1 sits on its own row below the badges/plate row: beside a 96px
plate it would get ≈ 175px, and "LOCALIZATION" at 22px needs ≈ 265px.

### 4.2 Sections

| Section | Before | After |
|---|---|---|
| The problem | h2 + window with 1–2 paragraphs | h2 + **lead** (the problem in one sentence). Window only if copy-trim keeps a second sentence or the SilverLink quote. Key terms ≤ 2 |
| What it does | window: intro line + FeatureList or CardGrid | h2 + lead + window: ≤ 6 pixel-arrow bullets, key term first. SCS keeps its two audience cards (≤ 4 bullets each) |
| Screens | after How it works | after What it does; spans per §3.3 |
| My part | window: `lead-s` intro + 2-col list | unchanged structure; bullets key term first, ≤ 6 |
| How it works | CardGrid of 3–7 cards | h2 + lead + window: **FlowDiagram** (§3.2.2), then ≤ 4 cards |
| Results | FigureList rows (UWB 5, Fire Safety 4) | **inline StatStrip**. UWB: `85.75%` LR accuracy, `0.9195` LR ROC-AUC, `1.757m` range RMSE, `0.458` path 1 R², `0.6809` path 2 R² (5 cells: last spans 2 at 375; 3 + 2 at `lg`). "1.757 m" loses its space to stay ≤ 6 glyphs; label says "range error (RMSE, metres)" so the unit isn't lost. Fire Safety: `10,984` lines of Kotlin, `5,458` lines of tests, `26` test files, `120` commits |
| Tech stack | tags | unchanged |
| Next project | tile | tile with spot sticker (§3.1) |

Lead pattern for every case h2 (on navy, cream 14.40, orange prompt 6.62):

```
 ▣ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━
 > A gateway turns REST into gRPC for
   four services, each with its own data.     ← lead (copy-trim)
┌─────────────────────────────────────┐
│▓ how_it_works.md            ○ □ ✕ ▓│
│ [ FlowDiagram: tiers ]              │
│ ┌───────────┐ ┌───────────┐         │       ≤ 4 cards
│ │ NO DOUBLE-│ │ RETRIES   │         │
│ │ BOOKING   │ │ BOOK ONCE │         │
└─────────────────────────────────────┘█
```

---

## 5. Accessibility and motion checks

| Check | How this spec meets it |
|---|---|
| Contrast | Every pairing is from MASTER 1.2's approved list. New uses: key term ink/teal **9.69** (alt ink/cream **17.58**); lead cream/navy **14.40**, ink/teal **9.69**, ink/cream **17.58**; prompt orange/navy **6.62**; number cells ink/orange **8.08**; chips and nodes ink/cream **17.58**; node detail navy/cream **14.40**; emphasis node ink/orange **8.08**; actor badges ink/teal **9.69**, ink/cream **17.58**; group-frame tab cream/violet **4.98** (12px pixel: normal text, passes 4.5) |
| Non-text (1.4.11) | Connectors and chip/node borders ink on cream **17.58**. Plate borders are decorative. Key-term block edge (1.81 on cream) is decorative; bold weight is the non-colour cue |
| Colour alone (1.4.1) | Key terms are bold too; actor badges and step numbers are words; emphasis node also has the "Agent" badge |
| Body size | Body, bullets, chips, node labels, captions 15px (375) / 16px; pixel labels ≥ 12px |
| Targets | New interactive item is only the disclosure summary: 44px min, ≥ 8px from neighbours. Chips, plates, nodes and cells are not interactive and have no shadow |
| Focus | Disclosure summary uses the cream-surface ring (ink, 3px, offset 3px) |
| 375, no horizontal scroll | Chips and key terms wrap; values ≤ 6 glyphs; flow is one column; h1 below the plate; plate 102px + 12 gap leaves ≥ 175px for tile titles |
| Headings | Desk Assist h4 sits under the LGA org h3; flow diagram titles are h3 (case) / h4 (Home); lane names h4 (case) |
| Motion | Nothing new moves. No scroll reveals, no animated connectors or "flowing" dots, no count-up. Disclosure opens instantly. Hero, marquee and press rules unchanged |
| Images | Spots `alt=""` (the title beside names the project); hero shots keep their existing descriptive alt; landscape hero `fetchpriority="high"`, everything else lazy with `width`/`height` |

---

## 6. Hand-off notes for the coder (via the lead)

1. Tokens in `index.css`: `.lead`, `.lead-s`, `.key` (§1.3 CSS), `.chip`,
   bullet marker using `/assets/pixel/bullet.svg`.
2. Render `**…**` from copy-trim as `<strong class="key">`.
3. `StatStrip variant="inline"`; use it for Experience impact rows and case
   Results (replaces `FigureList`).
4. `FlowDiagram` component (§3.2), refactor `PipelineSteps` onto it.
5. `SpotPlate` component: `{ name, size: 96|144|192, tone: 'orange'|'teal' }`;
   add the 8 spot names, 4 chip icons and `bullet` to `PixelArtName`.
6. `CaseHeader`: plate instead of cover, `lead` summary, chips instead of
   `MetaList`; add `heroShot?: Shot` rendered after the window.
7. Case pages: new section order (§4), hero shot pulled out of `SHOTS`, AI
   Finance How it works moved up.
8. Experience: Desk Assist block, impact rows, ≤ 4 bullets + `<details>`.
9. `ScreenFigure` span rule (§3.3); portrait hero layout.
10. Until the new assets land, plates and chip icons render empty plates /
    icon-less chips, so assets don't block the build.

## 7. Open questions

- **NEEDS JOHN:** UWB step order (PCA before or after the 80/20 split).
- **Copy:** UAT loop note wording; impact-cell labels; chip wording; whether
  SilverLink keeps team member names.
- **Lead:** Home disclosure for bullets beyond 4 (on/off).

---

## Skills used

- **ui-ux-pro-max** searches: `--domain ux` "visual hierarchy scannability"
  (heading hierarchy kept), "line length readability" (65–75 chars, line
  height 1.5–1.75, balanced heading wrap: used), "content scanning headings"
  (consistent type scale; don't truncate essential text: used),
  "list item spacing" (8px between targets; reflow at narrow widths: used),
  "color not only indicator" (words on badges: used). `--domain landing`
  "portfolio case study sections" (Portfolio Grid: "visuals first", kept;
  "neutral background, minimal accent" discarded, CLAUDE.md palette wins).
  `--domain chart` "flow diagram process" (Sankey/process-map discarded as
  overkill; kept "label every node, don't rely on colour, text fallback").
  `--stack html-tailwind` "text-wrap balance pretty" (`text-balance` with a
  max width: used). No database match for "reading pattern F-pattern skim",
  "bullet list scannable", "highlight key term emphasis" (typography), or
  React SVG diagram accessibility; those rules are built-in defaults, stated
  as such.
- **frontend-design**: one memorable idea (spots as program icons), numbers
  only on real sequences, key-term accents kept out of headings.
- **make-interfaces-feel-better**: `box-decoration-break` on wrapped
  highlights, `text-wrap` balance/pretty, tabular numerals, hit area for the
  disclosure, no transitions added.
