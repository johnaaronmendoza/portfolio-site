# Design skills audit, 24 Nov 2026 (design-skills-audit @ cae5096)

Four newly vendored skills used as audit lenses on the live design (main @ 7d23b59 plus the skills commit). Two read-only `design-reviewer` agents, each in its own worktree. Both ran `pnpm build`, served `dist/` and rendered in headless Chromium (swiftshader) — 1366 and 375 for the guidelines audit; 1440, 1366, 1024, 768 and 390 for the art-direction audit. Screenshots stayed in the session scratchpad (not kept).

CLAUDE.md wins every conflict. Rules that clash with John's choices are listed in §3 and are not counted as failures.

## 1. Scores

| Lens | Skill | Score |
|---|---|---|
| Web Interface Guidelines | `web-design-guidelines` (Vercel) | **~77%** of applicable rules (68.5 / 89) |
| Taste (anti-slop art direction) | `design-taste-frontend` 2.5.1 | **62/100** (13 / 21 applicable rules) |
| Image-to-code quality bar | `image-to-code` | **63/100** (7.5 / 12) |
| Design-system maturity vs DESIGN.md library | `awesome-design-md` (IBM, PostHog, Vercel, Wired, Dell 1996, Nintendo 2001) | **64/100** (9 / 14) |

**Fully met:**
- focus states;
- hover and press states;
- layout and safe areas (no horizontal scroll at any width);
- accessibility basics;
- reduced motion and the Pause control;
- tabular figures, `text-wrap`;
- clean copy (no slop words, em dashes or stock lines);
- colour discipline (yellow = AI);
- one card and one button style;
- motion restraint;
- tap targets at 390.

**Weakest:**
- i18n (~35%);
- typography details (~50%);
- forms and touch (~55%);
- the design system has no written source of truth (MASTER.md still describes the retired navy/violet palette and Courier type).

## 2. Ranked improvements (combined, non-conflicting)

### A. Fix now — no decision needed
1. **Hero font preload.** Your name (Press Start 2P, `font-display: block`) can stay invisible for up to 3 s. Preload the woff2 in `client/index.html`; consider `swap`. (`index.css:5-11`)
2. **Scroll lock under overlays.** The page scrolls behind the CommandPalette, SecretTerminal and KeyboardShortcuts overlays (wheel moved the page 0 → 800). Copy SectionNav's lock + `touch-none` backdrop. Add `overscroll-contain` to the chat log, terminal and palette lists.
3. **Chat robustness.** A long unbroken message overflows sideways (`MascotChatWidget.tsx:165`, add `break-words [overflow-wrap:anywhere]`). The input needs `name`, `autoComplete="off"`, `enterKeyHint="send"`. Chat times are hardcoded `en-US` 12-hour; use the visitor's locale.
4. **Write DESIGN.md, retire MASTER.md.** One source of truth in the awesome-design-md shape (tokens, colour roles, type ladder, spacing, elevation, components, do/don't), generated from the code and CLAUDE.md. No visual change; stops agents reading the wrong system.
5. **Named type scale.** 11 arbitrary `text-[Npx]` sizes, h3 at 22/28/32/40. Add `--text-*` tokens in `@theme`; LGA lead 40 → 32 (`Experience.tsx:104`); tile title 22 → 24 (`Projects.tsx:116`); footer 36 → 32.
6. **Shadow ladder.** 6 ad hoc offsets. Use only `.shadow-8bit-sm/-/-lg` (2/4/8) + one hover step; `#000` → ink token (`SkillKeyboard.tsx:111,170`); 12px → lg (`Experience.tsx:89`).
7. **Projects filter in the URL** (`?filter=ai`) so a recruiter can share "AI projects" (`Projects.tsx:206`).
8. **Marquee DOM.** 268 sparkle `<img>` across 4 strips (1,862 nodes). Render the separator as a CSS background (`Ribbon.tsx:37-58`).
9. **Bundle.** Main chunk 546 KB (175 KB gzip). Lazy-load CommandPalette, SecretTerminal, Konami, KeyboardShortcuts. Drop `next-themes` (give sonner `theme="light"`, which also stops toasts following OS dark mode). Drop `lucide-react` (only ErrorBoundary).
10. **ErrorBoundary in house style.** An `error.exe` Window with Reload, Home and email. No raw stack trace shown to visitors.
11. **Images.** PNG/JPG only, no `srcset`. `firesafety_p30` is 348 KB; `system_metrics` is upscaled. WebP/AVIF at 1x/2x, each under 250 KB (asset-generator / image-ops).
12. **One `<Section>` shell** for the 5 copy-pasted section paddings. Decide whether case pages (`max-w-5xl`) share Home's `max-w-6xl` edges.
13. **Layout touch-ups.**
    - About has a ~280px empty band at 1440: photo `lg:size-64`, bio `lg:text-lg max-w-[62ch]`.
    - Featured meta "2025 · team / of 6" wraps at 1024: nowrap, or `pr-16` only at xl.
    - Skills filters scroll sideways on phones; wrap them like Projects.
14. **Label floor 13px.** Window titles and badges are 12px. Use `text-[13px]` / `.badge` 0.8125rem, then check the title bars at 390.
15. **Polish sweep.**
    - `...` → `…`; non-breaking space in `⌘ K`; curly apostrophes (126 straight vs 101 curly quotes).
    - Mixed case in palette commands; use sentence case.
    - `color-scheme: light` on `:root`.
    - `translate="no"` on brand names, window titles and tags.
    - Width/height on stickers and the chat launcher image; hero chip icon not lazy.
    - Canvas with empty alt → `aria-hidden` (`PixelatedImage.tsx:147`); `aria-hidden` on overlay backdrops.
    - Remove the no-op `suppresshydrationwarning`, dead CSS (`.glitch`, `screenTear`, `panGrid`, `sectionFadeIn`, `.grain`, old marquee classes) and unused shadcn chart/sidebar tokens.

### B. Needs John's decision
1. **Analytics tag (only high-severity finding).** `index.html:82-85` ships the literal `%VITE_ANALYTICS_ENDPOINT%`: a failed request plus a console error on every page. Do you use Umami? If yes, set the two Vercel env vars. If no, delete the tag. (Open since 3 Nov.)
2. **Project tiles: one frame too many.** Window → tile → beige matte → inner window → still. At 390 about 70px of width goes to frames, and SilverLink/SCS/UAT stills are unreadable at tile size.
   - (a) still flush at the top of the tile, filename moved to the meta line;
   - (b) keep the inner window, drop the matte;
   - (c) keep as is.
   Pair it with one legible 2:1 crop per featured project (UWB already works).
3. **Hero actions.** Five buttons compete; both lenses want at most two primary actions.
   - (a) Resume and See projects as buttons, Email/GitHub/LinkedIn as one 44px icon-link row;
   - (b) keep all five;
   - (c) Resume and Email as buttons, profiles in footer and chat.
4. **Lenis smooth scroll.** It overrides native wheel scrolling (1.2 s ease) and runs a rAF loop forever. It isn't in CLAUDE.md. Remove it (also trims the bundle), or keep it and record it as a house choice.
5. **Case-study stat strips.** Four bare figures over one-word labels read as a template tell. Either the copywriter turns each label into a short clause (e.g. "8 isolated database schemas, one per service"), or keep as is.

## 3. Where the skills disagree with CLAUDE.md (house rule wins)

| Skill rule | House rule that wins |
|---|---|
| Hero alone on the first screen, one section per screen | ProofPoints ends the hero (John, 16 Nov). Note: at 1440×900 the fold cuts the second proof row; a padding tweak could show all three or none |
| Real photographs and full-colour brand icons | No brand icons; pixel icons and real screenshots |
| No captions under visuals | Case-study captions stay |
| No floating chat, help pill or fixed extras | Chat widget, Pause (WCAG 2.2.2) and Sound stay. Note: on 390 case pages the chat button covers the 4th stat cell |
| No marquees; no tilted keyboard | Marquee strips and the 3D keyboard exception |
| At most two type families, no 700 weight | Plex Desktop four-face system |
| Title Case; second person | Sentence case; John's first-person voice |
| Animate transform/opacity only; soft hover shadows | Press-down buttons with hard shadows only |
| Mockup image first; no framing container per section; no filename micro-labels | The Window motif with `*.exe`/`*.txt` title bars is the identity |
| Autoplay motion limits; custom cursor | Hero particles, scramble and Lil Johnny's bob (with Pause); the pixel cursor |
