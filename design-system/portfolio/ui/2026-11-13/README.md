# Review items 8–11: one world, AI proof in the hero (13 Nov 2026)

Owner: `design-ui-designer`. Brief: `design-system/portfolio/review-2026-11-13.md` items 8–11 (approved by John on 13 Nov) plus the lead's correction: step 5 "Agent reviews" is the one **human** step, so it is not yellow. Copy is final, from `copy.md` § "2026-11-13: Copy for review items 8–10"; there are no `[COPY]` placeholders left. Nothing in `client/src/` was changed by this pass.

The mockups are standalone HTML that shares `mock.css`. Its tokens are copied from `client/src/index.css`. The fonts are local copies in `fonts/` (OFL): Plex Sans variable, Plex Mono 400/600/700, Bangers and Press Start 2P. The images are the real files from `client/public/assets/` and `attached_assets/`. Renders were made with Playwright (Chromium, `reducedMotion: 'reduce'`, so the cursor and Johnny are static). There is no horizontal scroll in any render (`scrollWidth = innerWidth` at every size). Dashed boxes are annotations, not design.

| Mockup | Renders |
|---|---|
| `hero.html` (item 8) | `hero-1366.png`, `hero-1280.png`, `hero-375.png`, `hero-375-full.png` |
| `projects-strip.html` (item 9: captions, badges, chips, bursts, ribbons) | `projects-strip-1366-full.png`, `projects-strip-375-full.png` |
| `stats-band.html` (item 10) | `stats-band-1366.png`, `stats-band-375.png`, `stats-band-320.png` |
| `skills-phone.html` (item 11) | `skills-phone-375-full.png`, `skills-phone-320-full.png` |
| `stickers-check.html` (item 9c) | `stickers-check-1366-full.png`, `stickers-check-1440-full.png` |
| `preview-tile_{silverlink,uat}-page-ground.webp` | Previews only: what the asset re-export in §6 should look like |

---

## 1. Recommendation

**One world: the retro desktop is the world, comic is the narrator's voice, and yellow means AI.**

- **Hero (8):** the big `lil_johnny.gif` comic panel is replaced by a real `desk_assist.exe` window showing how Desk Assist will draft a reply.
  - Steps 2–4 carry a yellow `AI` tag.
  - Step 5 "Agent reviews" is the only black (`--bar`) step, with paper text and a raised 4px shadow, plus its detail line and an `Agent` chip.
  - Steps 5 and 6 share the last row (`5 → 6`), so the review step reads as the gate before anything is sent.
  - From 1280px, Lil Johnny (point-right, 2× = 94×144) stands on the window's bottom edge, carried left as a 3px ledge, and points at step 5. His bubble ("The AI drafts, an agent decides. Ask me how.") is the one button that opens the chat.
  - The left column is unchanged.
  - The recruiter's 30-second path at 1366 is name → lead ("tools people can trust") → the flow with the human step standing out → resume. All of it fits in 900px, with the scroll cue visible.
- **Why ink for step 5, not yellow or blue:** yellow now means AI, and blue means data or action. Black is the house's neutral "strongest" colour (title bars, the footer). A black step in a white window with a hard shadow is the loudest thing in the window without claiming a category.
  - The meaning never rests on colour alone: steps 2–4 say `AI`, step 5 says `Agent` and "Every draft, before it's sent."
  - This matches the HUMAN key's own copy ("The AI drafts, a person decides"). (ui-ux-pro-max `ux` "Color Only": use text with colour.)
- **Johnny's placement:** "on the bottom edge, pointing at step 5" only works geometrically with the shared last row. His hand is 24 art pixels (48px at 2×) above his feet, which lines up with the last row and not with a fifth row in a vertical list.
  - The bubble needs a 148px rail beside him. So at xl the right column borrows 64px of the empty gutter on its left (`xl:-ml-16`). Below the welcome window, the left column's content stops about 540px in (lead `max-w-[42ch]`), so nothing collides. This is checked at 1280 and 1366.
  - From 1024 to 1279px the right column is 354–461px wide. That leaves no room for a rail, so Johnny and the bubble are not mounted there; the window shows alone, and the chat launcher stays bottom-right.
- **Mobile (<1024):** the same window, full width, below the CTAs. The intro line is hidden (the lead above already says Desk Assist at LGA Telecom), and there is no mascot. It starts at about 725px on a 375×812 screen, so its title bar peeks above the fold. The hero grows by about 610px, which is acceptable for the one piece of AI proof on Home.
- **Motion:**
  - One loop only: Johnny's two-frame bob, 1 art pixel (2px), `steps(1)` every 1.2s. It stops with Pause motion (`data-motion="paused"`) and is static under reduced motion.
  - Removed: the panel halftone drift, the bubble bob, the auto-wave, the hop and the second blinking cursor (the role line). The name cursor stays.
  - The yellow floating pixels become blue/ink. (ui-ux-pro-max `ux` "Excessive Motion": 1–2 animated elements per view.)
- **Colour (9a):** yellow only marks AI: the AI keycaps, the AI flow tags and the AI legend swatch. The two exceptions are John's name on the black `welcome.exe` (the identity signature from CLAUDE.md, a name and not a marker) and the AI Finance tile ground (its NLP engine is the one AI project).
  - Every other yellow becomes ink (selected/on states, Featured, Internship, ribbons), paper (secondary buttons, stat cells, bursts, year badge) or page (hovers).
  - Blue keeps two roles. As a **marker** (badge, tag, keycap, the burst behind a figure) it means data or a link. As a **field or action** (primary button, Projects band, heading rule, hovers) it is the house action colour.
  - I don't propose using it anywhere new except the stat burst, where it sits behind a figure, which is data.
- **Primary CTA:** stays blue (it already is). Yellow is not needed for it, so no exception is required.

---

## 2. Coder spec, file by file

Tokens are unchanged. The new shared marker classes go in `index.css` (§2.1) and replace the ad-hoc badge strings. Spacing follows the house 4px scale. Check at 375 and 1366 (plus 1280 for the narrator).

### 2.1 `client/src/index.css`

1. **Badges.** Add these to `@layer components`. Every badge on the site uses them:
   ```css
   .badge { display: inline-block; border: 2px solid var(--ink); padding: 4px 8px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-weight: 600; font-size: 0.75rem; line-height: 1.3; color: #000; white-space: nowrap; }
   .badge--ai { background-color: var(--yellow); }            /* AI only */
   .badge--data { background-color: var(--blue); }            /* data / links (Live site) */
   .badge--ink { background-color: var(--bar); color: var(--paper); }
   .badge--paper { background-color: var(--paper); }
   .badge--status { background-color: var(--paper); border-style: dashed; } /* In progress: unfinished */
   ```
2. **`.btn-secondary`** → `background-color: var(--paper); color: var(--ink);`. Update the comment to "secondary: paper with ink". Hover and press are unchanged.
3. **Delete `.comic-caption`.** Its only user is the Projects caption (§2.6).
4. **`.chat-key:hover`** → `background-color: var(--page);` (was yellow).
5. **shadcn aliases** (`:root` and `.dark`):
   - `--primary: var(--blue)` with `--primary-foreground: #fff`
   - `--ring: var(--ink)` and `--sidebar-ring: var(--ink)`
   - `--destructive: var(--bar)` with `--destructive-foreground: var(--paper)`
   - `--sidebar-primary: var(--blue)` with `--sidebar-primary-foreground: #fff`
   - `--chart-1: var(--blue)` and `--chart-2: var(--bar)`

   Check that the sonner toasts still read.
6. **Johnny's one loop:**
   ```css
   @keyframes johnny-bob { 0% { translate: 0 0; } 50% { translate: 0 -2px; } }
   .johnny-bob { animation: johnny-bob 1.2s steps(1) infinite; }
   :root[data-motion="paused"] .johnny-bob { animation: none; }
   ```
   The existing reduced-motion block already stops it, ending at frame A.
7. **Desk Assist flow connectors.** All decorative; the arrowhead copies `.flow--row .flow-link::after`:
   ```css
   .da-flow > li { position: relative; }
   .da-flow > li:not(:first-child):not(:last-child)::before { content: ''; position: absolute; left: 22px; top: -12px; width: 3px; height: 10px; background: var(--ink); }
   .da-flow > li:nth-child(5)::after { content: ''; position: absolute; right: -27px; top: 50%; width: 22px; height: 3px; background: var(--ink); }
   .da-flow > li:last-child::before { content: ''; position: absolute; left: -9px; top: 50%; width: 9px; height: 12px; translate: 0 -50%; background: var(--ink); clip-path: polygon(0 0, 34% 0, 34% 25%, 67% 25%, 67% 42%, 100% 42%, 100% 58%, 67% 58%, 67% 75%, 34% 75%, 34% 100%, 0 100%); }
   ```
8. **`--focus` comment:** dark surfaces now set `paper`, not yellow (§2.12).

### 2.2 New `client/src/components/DeskAssistWindow.tsx` (about 70 lines)

This is a static window with no motion of its own. The copy is word for word from `copy.md`.

```tsx
const STEPS = [
  { label: 'Ticket' },
  { label: 'Reads the thread', ai: true },
  { label: 'Finds KB guidance', ai: true },
  { label: 'Drafts a reply', ai: true },
  { label: 'Agent reviews', detail: "Every draft, before it's sent." }, // the human step
  { label: 'Sent' },
];
```

| Part | Markup / classes |
|---|---|
| Window | `<Window title="desk_assist.exe" bodyClassName="p-4 sm:p-5">` |
| Header | `<div className="grid gap-2">` |
| Status | `<span className="badge badge--status justify-self-start">In progress</span>` |
| Heading | `<h2 id="desk-assist-flow" className="font-display text-xl lg:text-[22px] text-black">How Desk Assist will draft a reply</h2>`. It stays "will" until John confirms the tool is deployed (honesty rule). |
| Intro | `<p className="hidden lg:block font-sans text-[15px] leading-normal">A Chrome extension for service desk agents at LGA Telecom.</p>` |
| Link | `<a href="#experience" onClick={e => { e.preventDefault(); scrollToSection('experience', reduced); }} className="justify-self-start inline-flex min-h-11 items-center gap-2 font-sans text-[15px] font-bold underline underline-offset-4 decoration-2">See experience <span aria-hidden="true" className="block size-[9px] border-r-[3px] border-b-[3px] border-current rotate-45 -translate-y-0.5" /></a>`. This is a 44px-tall target. |
| Figure | `<figure aria-labelledby="desk-assist-flow" className="mt-1">` containing `<ol className="da-flow grid grid-cols-[minmax(0,1fr)_22px_auto] gap-y-2.5">`, with **six `<li>`s, one per step**. Grid placement puts 5 and 6 on one row; the list order stays 1..6. |
| Steps 1–4 | `<li className="col-span-full flex items-center gap-2 min-h-11 px-3 py-2 border-2 border-black bg-[var(--paper)]">` |
| Step number | `<span className="flex-shrink-0 min-w-[22px] text-center border-2 border-black bg-[var(--paper)] px-1 py-px font-label text-xs text-black tabular-nums">{i+1}</span>` (12px) |
| Label | `<span className="flex-1 min-w-0 font-sans font-bold text-[15px] sm:text-base leading-[1.35]">` |
| AI tag (2–4) | `<span className="badge badge--ai">AI</span>` |
| Step 5 | `<li className="col-start-1 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2 gap-y-1.5 px-3 pt-2.5 pb-3 border-[3px] border-black bg-[var(--bar)] text-[color:var(--paper)] shadow-[4px_4px_0_0_var(--ink)]">` holds the number chip (paper), the label, `<span className="col-start-2 font-sans text-[15px] leading-[1.4]">Every draft, before it's sent.</span>` and `<span className="badge badge--paper col-start-2 justify-self-start">Agent</span>` |
| Step 6 | `<li className="col-start-3 self-center flex items-center gap-2 min-h-11 px-3 py-2 border-2 border-black bg-[var(--paper)]">` |

### 2.3 `client/src/components/comic/HeroNarrator.tsx` (rewrite, about 30 lines)

- One `<button type="button">` dispatches `open-chat`, as today. Its accessible name is the bubble text plus " Opens the chat."
- Delete `useAnimationControls`, `useInView`, the wave and hop logic, the `WAVE` frame, the panel, the halftone and the floor.

```tsx
<button type="button" onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
  className="group flex flex-col items-start gap-[22px] -mr-3 pr-3 border-b-[3px] border-black text-left outline-offset-[6px]">
  <span className="comic-bubble block font-sans text-[15px] leading-[1.4] px-4 py-3 rounded-[20px] shadow-[4px_4px_0_0_var(--ink)] [--tail-x:26px] transition-[translate,box-shadow] duration-150 group-hover:underline underline-offset-4 decoration-2 group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none">
    The AI drafts, an agent decides. Ask me how.<span className="sr-only"> Opens the chat.</span>
  </span>
  <img src="/assets/mascot/poses/point-right.png" alt="" aria-hidden="true" width={47} height={72}
    className="johnny-bob ml-1 h-[144px] w-[94px] max-w-none [image-rendering:pixelated]" />
</button>
```

- **Size:** the button is about 148×300px, which is the tap target. The `border-b` is the ledge, level with the window's bottom border. Do not mirror Johnny: he points right, at step 5.
- **States:**
  - Hover: the bubble text is underlined.
  - Focus: the ink ring with a 6px offset (global `:focus-visible`), 17.5:1 on the page.
  - Pressed: the bubble sinks into its shadow.
  - Reduced motion or paused: completely still.
- **Delete** `motionTokens.narrator`.

### 2.4 `client/src/components/Hero.tsx`

1. **Right column:** replace the `{wide && <HeroNarrator />}` block with:
   ```tsx
   const xl = useMediaQuery('(min-width: 1280px)'); // narrator mounts only where it shows
   ...
   <motion.div className="mt-12 lg:mt-0 lg:col-span-5 xl:-ml-16 xl:grid xl:grid-cols-[148px_minmax(0,1fr)] xl:gap-x-3 xl:items-end"
     initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }}
     transition={{ duration: HERO.line, delay: HERO.ctas, ease: easing.out }}>
     {xl && <HeroNarrator />}
     <DeskAssistWindow />
   </motion.div>
   ```
   - Remove the `hidden lg:flex` wrapper and the `wide` query (1024).
   - It stays a sibling after the left column, so the DOM and tab order run: name → CTAs → narrator → flow link.
2. **Role line:** delete the second `<Cursor … className="w-2 h-4" />`. Only the name's cursor blinks.
3. **`PIXELS`:** replace `YELLOW` with `BLUE` or `INK`, then delete the `YELLOW` const. `particleColors={['#3A66FF', '#111111']}`.
4. **`welcome.exe` body:** `[--focus:var(--yellow)]` → `[--focus:var(--paper)]`.
5. **The name** stays white/yellow. This is the identity exception, with no change.

### 2.5 `client/src/components/Experience.tsx`

- `BADGE_FILL` → `BADGE_CLASS: Record<Badge, string> = { Internship: 'badge badge--ink', 'In progress': 'badge badge--status', Education: 'badge badge--paper' }`.
- Render `<span className={BADGE_CLASS[badge]}>`. Fix the comment.
- Optional and pending John (N7): the copy deck's "Designed in:" guardrails caption under the LGA entry. It is not in the hero.

### 2.6 `client/src/components/Projects.tsx` and `client/src/data/projects.ts`

1. **`projects.ts`:**
   - Add `caption: string` to `Project`, with the values: SilverLink `team of 6`, SCS `team of 4`, AI Finance `data pipeline`, UWB `team coursework`, UAT `coursework`, Fire Safety `team coursework`, GreenLoop `team pitch`.
   - Remove the facts `"6-person team"` and `"4-person team"`.
   - Optional, from the copy deck: UAT description → `Links each failed test to its defect to show what blocks go-live.` It is also the case-study lead, which keeps its own "Course project" chip.
2. **Caption:** replace the `<div className="flex"><span className="comic-caption …">Issue #…</span></div>` with:
   ```tsx
   {/* Year and team context, from projects.ts */}
   <p className="font-label text-sm text-[color:var(--text)] -mb-2">
     {project.year}<span aria-hidden="true"> · </span><span className="sr-only">, </span>{project.caption}
   </p>
   ```
   This is a Plex Mono 14px/600 meta line, 18.9:1 on paper. It is not a box: `-mb-2` tucks it against the `h3`, so caption and title read as one group, inside the tile's existing `gap-4`.
3. **Badges:**
   - Featured → `badge badge--ink`
   - Live site → `badge badge--data`
   - COMING SOON → `badge badge--paper`

   Keep the `absolute top-2 left-2` and `right-2` positions.
4. **SFX burst:** `fill="var(--paper)"` on both tiles, with `text-black`. Delete the odd/even fill and text logic; the rotation can stay odd/even.
5. **`chipClass` active:** `bg-[var(--bar)] text-[color:var(--paper)] translate-x-[3px] translate-y-[3px] shadow-none`. Inactive and hover (blue) are unchanged. Update the comment.

### 2.7 `client/src/components/StatsBand.tsx`, `StatStrip.tsx`, `comic/Burst.tsx`

1. **`STATS`:** exactly the copy deck's block. In short: `40%` with the burst, `1,000+`, `50+`, `89.61%` (no burst), each with a `source`.
2. **`StatStrip`:**
   - Add `source?: string` to `Stat`. Render it inside the `dt`, after the label:
     ```tsx
     {source && <span className="mt-2 block w-fit border-2 border-black px-2 py-0.5 font-label text-[15px] leading-[1.35]">{source}</span>}
     ```
   - Cells: `bg-[var(--yellow)]` → `bg-[var(--paper)]` for every variant (the case headers too). Black-on-paper dividers stay.
   - Burst: `fill="var(--blue)"`. The `dd` burst classes become `px-[0.8em] pt-[0.5em] pb-[0.45em] -ml-[0.4em] -mt-[0.5em]`, and the `Burst` className becomes `absolute inset-0 -z-10 pointer-events-none`.
   - Why this doesn't clip: both negative margins stay inside the band cell's padding. The left 0.4em is 14px at 36px (cell padding 16px) and 22px at 56px (cell padding 24px). The top 0.5em is 18px against 24px, and 28px against 32px. So the star never reaches the cell edge, and the digits line up with their neighbours (`stats-band-320.png`).
   - Bursts are allowed in the `band` variant only.
3. **`Burst.tsx`:** default `fill = 'var(--paper)'`, and update the doc example.

### 2.8 `client/src/components/comic/Stickers.tsx` (plus assets)

- `SETS` becomes the following (seven work objects, at most two per section, none repeated):
  ```ts
  about:      [{ src: P('notepad'), side: 'right', top: 30, rotate: 6, pixel: true }],
  experience: [{ src: J('retro-computer'), side: 'right', top: 8, rotate: 6 },
               { src: P('folder'), side: 'left', top: 45, rotate: -6, pixel: true }],
  projects:   [{ src: P('cd'), side: 'right', top: 25, rotate: 10, pixel: true },
               { src: P('magnifier'), side: 'left', top: 65, rotate: -6, pixel: true }],
  skills:     [{ src: J('cursor-arrow'), side: 'left', top: 15, rotate: -4 },
               { src: P('phone'), side: 'right', top: 70, rotate: -5, pixel: true }],
  ```
- `edge`: change `- 80px` to `- 88px`, with the comment "ends 16px short of the content". Measured gaps to the content box are 10–14px at 1280, 1366 and 1440 (rotation takes about 4px), and the distance to the screen edge is at least 13px. The `LAYOUT` thresholds are unchanged.
- Delete the eight dropped PNGs from `client/public/assets/stickers/`; they are recoverable from git at `84db30d`. Update its README: keep only `retro-computer.png` and `cursor-arrow.png`, and record why the others went.

### 2.9 `client/src/components/SkillKeyboard.tsx` (item 9d mascot removal + item 11 phones)

1. **Phones get the flat board and never download the 3D chunk:**
   ```ts
   const handheld = useMediaQuery('(max-width: 639.98px), (pointer: coarse)');
   const flat = reduced || handheld || stage === '2d';
   ```
   - The IntersectionObserver effect already returns early when `flat`. `Keyboard3D` is `lazy()` and only renders when `!flat && stage === '3d'`, so `import('./skills3d/Keyboard3D')` never runs.
   - Verify in DevTools Network at 375 and with touch emulation: no `Keyboard3D-*.js` or three.js chunk.
   - Widening past 640 on a fine pointer loads 3D as normal.
2. **Remove the mascot.** Delete:
   - the imports `MASCOT`, `MASCOT_PX`, `preloadMascot`, `Pose`, and `useMotionValue` if it becomes unused
   - `mascotRef`, plus the `selected`, `taps`, `dir`, `hop` and `seq` state
   - `leanPose`, `frame` and `mascotStyle`
   - the `preloadMascot` effect
   - `mx`, `my`, `ms`, `perch` and `followMascot`
   - the lean effect and the press-sequence effect
   - from `openKey`: the perch/hop block, `setSelected` and `setTaps`
   - both mascot JSX blocks (the 3D `motion.div` and the flat `img`)

   Pass `onFrame={placeTip}`. In `motion-tokens.ts`, delete `keyboard.hop` and the `mascot` block. `lib/mascot.ts` stays (the chat uses it).
3. **Board padding:** `pt-14 sm:pt-16 lg:pt-20` was the mascot's headroom. Try `pt-6 sm:pt-8` and check that a top-row tooltip still fits (`placeTip` falls back below the key).
4. **Flat legends:** confirmed at 12px or more at 320 and 375. The number is `text-xs` (12px) and the legend is `text-xs sm:text-sm lg:text-base` (12px on phones); "SKLEARN" and "PROMPT" fit at 320 (`skills-phone-320-full.png`). All legend contrasts are in §5.

### 2.10 `client/src/components/Ribbon.tsx` and `client/src/pages/Home.tsx`

- `RibbonTone = 'ink' | 'blue'`, with `ink: 'bg-[var(--bar)] text-[color:var(--paper)]'` (18.9:1). Drop `yellow` and make `'ink'` the default.
- In `Home.tsx`, the Projects and Skills ribbons become `tone="ink"`. Ink either side of the blue band still separates it (4.07:1 band to band).
- The sparkle separator is white with an ink outline, so it reads on the bar.

### 2.11 Selected and on states → ink with paper text (state also shown by press-in and words)

| File | Change |
|---|---|
| `SectionNav.tsx` Pause button (pressed) | `bg-[var(--bar)] text-[color:var(--paper)]` and keep the press-in; `text-black` only when not pressed |
| `SectionNav.tsx` menu item, current | `bg-[var(--bar)] text-[color:var(--paper)]` |
| `SectionNav.tsx` dots | current: `bg-[var(--bar)] border-black`; hover: `group-hover:bg-[var(--blue)]` |
| `SoundToggle.tsx` (on) | `bg-[var(--bar)] text-[color:var(--paper)]` plus the press-in; ON/OFF already in words |
| `MascotChatWidget.tsx` launcher (open) | `bg-[var(--page)]` plus the press-in (`translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]`) |
| `CommandPalette.tsx` selected row | `bg-[var(--paper)] text-black` (inverted on the black list); `>` prompt and focus-within outline → `var(--paper)` |

### 2.12 Dark surfaces: yellow → paper

`[--focus:var(--yellow)]` → `[--focus:var(--paper)]` in `Hero.tsx` (welcome), `CommandPalette.tsx`, `KeyboardShortcuts.tsx` and `SecretTerminal.tsx`. Also:

- `KeyboardShortcuts.tsx`: the `kbd` becomes `bg-[var(--paper)] text-black border-[color:var(--paper)]`; the "?" becomes `text-[color:var(--paper)]`.
- `SecretTerminal.tsx`: the `$` input line and prompt become `text-[color:var(--paper)] font-bold`; the error line becomes `bg-[var(--paper)] text-black` (the "error:" prefix carries the meaning).
- `KonamiOverlay.tsx`: the label becomes `text-[color:var(--paper)]`.

### 2.13 Case pages and FlowDiagram

| File | Change |
|---|---|
| `case/CaseHeader.tsx` year chip | `badge badge--paper` (repo button: `btn-secondary`, now paper via CSS) |
| `pages/UATProject.tsx` `LEVEL_FILL` | Critical → `bg-[var(--bar)] text-[color:var(--paper)]`; High stays blue (a data scale); Medium and Low stay paper |
| `pages/UATProject.tsx` Status "Fail" chip | `badge badge--ink` |
| `pages/UATProject.tsx` "Actual" box | `bg-[var(--bar)] text-[color:var(--paper)]` |
| `FlowDiagram.tsx` | `ACTOR_FILL.AI` → `bg-[var(--yellow)]` (AI = yellow; AI Finance's "NLP engine" step); numbers → `bg-[var(--paper)]` always; `emphasis` → `border-[3px] bg-[var(--bar)] text-[color:var(--paper)] shadow-[4px_4px_0_0_var(--ink)]`, with the detail in paper (no current page uses `emphasis`) |

---

## 3. Mascot appearances (item 9d)

| Where | Decision |
|---|---|
| Hero narrator (`comic/HeroNarrator.tsx`) | **Keep**, rewritten small (§2.3), xl only |
| Chat launcher + `ask_johnny.exe` dialog (`MascotChatWidget.tsx`) | **Keep** |
| Skills 3D board: perched behind the top-right key, hopping onto pressed keys (`SkillKeyboard.tsx`) | **Remove** (§2.9) |
| Skills flat board: corner image (`SkillKeyboard.tsx`) | **Remove** (§2.9) |
| OG image (`/og-image.png`) and its alt text in `client/index.html` ("…pointing at it from a yellow comic burst") | **asset-generator:** re-render the OG image without the burst (Johnny can stay; it is the hero) and update both alt texts |

---

## 4. Stickers: keep / drop (each image checked by eye on a contact sheet rendered this session)

| File | What it shows | Decision | Why |
|---|---|---|---|
| `stickers/retro-computer.png` | Beige desktop PC | **Keep** (Experience, right) | Work object, desktop world |
| `stickers/cursor-arrow.png` | Pixel mouse pointer | **Keep** (Skills, left) | Work object, "press a key" |
| `pixel/sticker-folder.svg` | Yellow file folder | **Keep** (Experience, left) | Work object. Its manila yellow is illustration, not a marker; asset-artist may tone it to `#E6DFCF` if John wants yellow-free gutters (optional) |
| `pixel/sticker-notepad.svg` | Notepad | **Keep** (About, right) | Work object |
| `pixel/sticker-cd.svg` | CD | **Keep** (Projects, right) | Work object |
| `pixel/sticker-magnifier.svg` | Magnifier | **Keep** (Projects, left) | Work object |
| `pixel/sticker-phone.svg` | Desk phone | **Keep** (Skills, right) | Work object (service desk) |
| `stickers/ace-card.png` | Ace of spades | **Drop** | Off-topic (gambling) |
| `stickers/anatomical-heart.png` | Bloody anatomical heart | **Drop** | Off-topic; tone risk for a bank |
| `stickers/eyeball.png` | Eyeball in a blood pool | **Drop** | Off-topic; tone risk for a bank |
| `stickers/arcade.png` | Arcade cabinet | **Drop** | Games, not work |
| `stickers/coffee-cup.png` | Coffee cup | **Drop** | Not a work object in this world |
| `stickers/cookie.png` | Cookie | **Drop** | Off-topic |
| `stickers/pixel-heart.png` | Pink pixel heart | **Drop** | Decoration with no work meaning |
| `stickers/striped-roll.png` | Unclear striped roll | **Drop** | Unreadable at 72px, off-topic |

Placement check (`stickers-check.html`, offset 88px): at 1366 the 1024-wide sections show their stickers 79–81px from the screen edge, 12–14px from the content. Projects shows them 13–15px from the edge, 10–12px from the content. At 1440 the figures are 116–118 / 12–14 and 50–52 / 10–12. At 1280, Projects stickers are hidden (`min-[1360px]`) and the others sit 36px from the edge. Nothing overlaps content at any of these widths.

---

## 5. Colour use, before → after (item 9a)

`grep -rn "yellow" client/src` plus the renders (which caught yellow baked into assets).

| Use | Where | Before | After | Reason |
|---|---|---|---|---|
| AI keycaps, AI legend swatch | `keys.ts`, `Skills.tsx` | yellow | **yellow** | AI |
| Desk Assist AI steps 2–4 | new `DeskAssistWindow` | – | **yellow** `AI` tag | AI |
| FlowDiagram AI actor | `FlowDiagram.tsx` | blue | **yellow** | AI |
| AI Finance tile ground | `tile_ai_finance.webp` | yellow | **yellow** | NLP engine, the AI project |
| Hero name "BRANZUELA" and its cursor | `Hero.tsx` | yellow on black | **unchanged** | Identity exception (CLAUDE.md); a name, not a marker |
| Desk Assist step 5 (human) | new | – | **ink**, paper text | Human step; not AI |
| Filter chip on-state | `Projects.tsx` `chipClass` (and Skills filters) | yellow | ink, paper text, pressed | State, not AI |
| Featured badge | `Projects.tsx` | yellow | ink | Status |
| Internship badge | `Experience.tsx` | yellow | ink | Status |
| In progress badge | `Experience.tsx`, hero window | blue | paper, dashed border | Unfinished; blue is data |
| Education badge | `Experience.tsx` | blue | paper | Not data |
| Issue caption | `Projects.tsx` | yellow comic box | Plex Mono meta line | One world |
| SFX bursts | `Projects.tsx` | blue / yellow | paper | Neither project is AI |
| Stat cells | `StatStrip.tsx` | yellow | paper | Figures are data, not AI |
| Stat burst (40%) | `StatStrip.tsx` | paper | **blue** | A figure = data |
| Marquee (Projects, Skills) | `Ribbon.tsx`, `Home.tsx` | yellow | ink, paper text | Decoration; not AI |
| Marquee (About, Experience) | same | blue | blue (unchanged) | Field, house colour |
| Secondary button (See projects, repo, empty state) | `index.css` | yellow | paper | Action, not AI |
| Pause pressed, Sound on, nav current, dots | `SectionNav.tsx`, `SoundToggle.tsx` | yellow | ink, paper text | State |
| Chat launcher open | `MascotChatWidget.tsx` | yellow | page + pressed | State |
| Chat topic key hover | `index.css` `.chat-key` | yellow | page | Hover |
| Command palette selection, prompt | `CommandPalette.tsx` | yellow | paper on black | State |
| Terminal prompt, input, error; shortcuts `kbd`; Konami label | `SecretTerminal`, `KeyboardShortcuts`, `KonamiOverlay` | yellow | paper | Easter eggs; not AI |
| Focus ring on dark surfaces | 4 files | yellow | paper (21:1) | Function, not AI |
| Case year chip | `CaseHeader.tsx` | yellow | paper | Meta |
| UAT Critical, Fail, Actual | `UATProject.tsx` | yellow | ink, paper text | Severity |
| Floating pixels, particles | `Hero.tsx` | blue/yellow/ink | blue/ink | Decoration |
| Narrator floor + blue panel | `HeroNarrator.tsx` | yellow / blue | deleted | Panel removed |
| shadcn `--primary`, `--ring`, `--destructive`, `--chart-1` | `index.css` | yellow | blue / ink / bar | Aliases |
| Fact bullet | `public/assets/pixel/bullet.svg` | yellow fill | paper fill (asset-artist: `#FFD23F` → `#FFFFFF`) | Repeated on every list |
| SilverLink, UAT tile grounds | `attached_assets/tile_{silverlink,uat}.webp` | yellow | page `#EFEAE0` (asset-generator; see previews) | Not AI |
| Small yellow accents in 13 pixel icons (chip-calendar, icon-*, smiley…) | `public/assets/pixel/` | yellow | **unchanged** | Illustration at 16–32px, aria-hidden; the rule governs UI fills |

**Blue, non-data uses (decided):** the primary button, Projects band, section-heading shadow and rule, About/Experience ribbons, chip/menu/palette hovers, the user's chat bubble, the case "Next project" band and the UWB/SCS/Fire Safety tile grounds all **stay**. Blue as a field or action is the house action colour. Blue as a *marker* (Live site badge, data keycaps, UAT "High", the stat burst) means data or a link. In progress and Education lose their blue (above).

---

## 6. Contrast for every new pair (WCAG 2.x, computed)

| Pair | Ratio | Where |
|---|---|---|
| Paper `#FFF` on bar `#111` | 18.88 | Step 5 text, ink badges, chip on, ribbons, Pause/Sound/nav on |
| Black on paper | 21.00 | Agent chip, source tags, bursts, secondary button, badges |
| Text `#111` on paper | 18.88 | Caption, bubble, flow labels, See experience |
| Text `#111` on page | 15.75 | Lead, role prompt |
| Black on yellow | 14.54 | AI tag, AI keycap face |
| Black on blue | 4.52 | Live site (12px/600: passes 4.5), `40%` on the burst (large) |
| White on blue | 4.64 | Primary button, data keycaps |
| Paper focus ring on black / bar | 21.00 / 18.88 | Dark surfaces |
| Ink focus ring on page | 17.52 | Narrator button, everything on the page |
| Step 5 bar vs window paper (non-text) | 18.88 | Emphasis edge |
| Yellow AI tag vs paper (non-text) | 1.44 | Passes because the 2px ink border carries the edge (21:1) |
| Bar ribbon vs blue band (non-text) | 4.07 | Band separation |
| Keycap legends: black on `#E6B92A`, white on `#2E55E0`, `#111` on `#DCD7CB`, white on `#2A2A2A` | 11.34 / 6.01 / 13.15 / 14.35 | Flat board legends at 12px |
| Muted key: `#3D3A35` on `#CFCAC0` (number), on `#BDB8AE` (legend) | 6.93 / 5.73 | Filtered-out keys |
| Blue-text `#2347D6` on paper | 7.13 | Unchanged links |

**Targets:**
- Narrator button: about 148×300.
- "See experience": 44px tall.
- Flow rows: `min-h-11`, but these are not interactive.
- Filter chips: 44px (unchanged).
- Flat keys at 375: 78×78; at 320: 64×64.

**Spacing:** 8px or more between adjacent targets everywhere above.

---

## 7. Impeccable detector (run on every file here)

`impeccable detect --json design-system/portfolio/ui/2026-11-13/*.html mock.css`. Every remaining finding is intentional:

- **`hard-offset-shadow` (advisory):** the binding neo-brutalist direction.
- **`wide-tracking` (hero):** `.font-pixel` 0.05em on the pixel name. That is a display face, and the house token.
- **`cramped-padding` "ribbon flush left":** a marquee runs edge to edge by design.
- **`cramped-padding` "band flush top/bottom":** the black band shows 3px rules between padded cells (24/32px inside).
- **`cramped-padding` on the `stickers-check` section:** this is the test harness, not design.
- **`cream-palette`:** page `#EFEAE0` is John's binding token. The lead suppressed it for the hero, projects strip and stats band; it still fires on `skills-phone` and `stickers-check` for the same token.

**Fixed after the hook's earlier flags:**
- Badges and tags now use a 4px/8px inset (house badge size).
- Flow rows are 8px/12px.
- The bubble is 12px/16px.
- The mocked dock buttons keep 12px side padding at 375.

**Intentional tight labels:**
- Step-number chips (`px-1 py-px`): a single digit in a 22px box, as in FlowDiagram.
- Stat source tags (`px-2 py-0.5`, 8px sides): a one-line label at 15px.

---

## 8. CLAUDE.md updates for the lead

1. **Palette:** "yellow `#FFD23F` (secondary buttons, badges, figures, marquee…)" → "**yellow = AI only**: AI keycaps, AI tags in flows, the AI legend; the one exception is John's name on `welcome.exe`. Secondary buttons are paper; selected/on states are ink with paper text; status badges use `.badge--ink/--paper/--status`."
2. **Blue:** add "as a marker (badge, tag, keycap, burst behind a figure) blue means data or a link; as a field, button or hover it is the house action colour."
3. **Comic layer:**
   - Replace "yellow `comic-caption` boxes on project tiles ('Issue #NN, year')" with "a Plex Mono `{year} · {caption}` meta line".
   - Bangers is for section titles and the two featured-tile SFX bursts only.
   - The POW burst is blue, behind one work figure in the stats band.
4. **Narrator:**
   - Replace the `lil_johnny.gif` panel paragraph with: "From 1280px, Lil Johnny (point-right, 2×) stands on the bottom edge of the hero's `desk_assist.exe` window, pointing at the human review step; his bubble is the one button that opens the chat."
   - Motion becomes: "one loop, a 2px two-frame bob, stopped by Pause motion and reduced motion."
   - "Mascot appears only in the hero and the chat."
5. **Hero:** "Right column = `desk_assist.exe`: six steps, AI steps tagged yellow, the agent-review step in ink; 'will' until John confirms deployment. One blinking cursor (the name's)."
6. **Stickers:** "Work objects only (retro computer, cursor arrow, folder, notepad, CD, magnifier, phone), at most two per section, 16px clear of content. Dropped Nov 2026: ace, anatomical heart, arcade, coffee, cookie, eyeball, pixel heart, striped roll."
7. **Skills exception:** "Below 640px or on coarse pointers the flat 2D board is served and the 3D chunk is never requested; no mascot on the board."

---

## 9. Out of scope / follow-ups

- **Asset-artist:** `bullet.svg` fill → `#FFFFFF`. Optionally tone `sticker-folder.svg` yellow down to warm grey.
- **Asset-generator:**
  - Re-export `tile_silverlink.webp` and `tile_uat.webp` on `#EFEAE0` (previews here were made by colour replacement, not production quality).
  - Re-render the OG image without the yellow burst and fix both alt texts.
- **Honesty:** `keys.ts` KUBE blurb still says "scales ahead of demand" (review item 3, which fixed the chat only). Copywriter's optional fix: "no remote code" → "no remotely hosted code" in `keys.ts:62` and the chat.
- **Not approved, so not specified:** items 12–14 (hero particles and floating pixels, halftone behind `Lead`, dock overlap). This spec already cuts the hero's loops: the narrator goes from 4 loops to 1, and the second cursor is removed.
