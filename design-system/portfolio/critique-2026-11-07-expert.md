# Expert design critique, 7 Nov 2026 (rebrand @ c7686a6)

Reviewer: `design-reviewer` acting as design director, Impeccable critique method + detector + ui-ux-pro-max. Score **25/40** (previous 26/40, `.impeccable/critique/2026-11-03…`). Screenshots were in the session scratchpad (not kept).

Already fixed after this review (commit 690d181): sound off by default + Sound toggle; achievement toast only after a click, bottom-left; mobile `menu.exe` section menu + Back to top.

## John's decisions (7 Nov)
- **Keycap colours:** use the site palette with meaning — **AI = orange, Data/ML = teal, Build/infra = cream, Ways of working = violet**. Drop the blue `#1B67BA` / amber `#FFA502` colourways. Favicon becomes an orange `>_` on a navy/black cap; share card updated to match.
- **Hero:** replace the CRT-starburst art with a static `desk_assist.exe` window showing the 6-step Desk Assist flow ("AI drafts → agent reviews", step 5 lit orange). Designer mocks up two hero options for John to pick before the build.

## Priority issues
1. **[P1] Two palettes, colour without meaning** — keyboard blue/amber/cream fights navy/orange/teal/violet; amber `#FFA502` is a near-miss of orange `#FF7A2F` (1.32:1) right under the orange "All" chip; blue caps on navy 3.03:1; colourways cycle with no meaning (`skills3d/keys.ts:37-44`); favicon is the site's least-used colour. → decision above. (/impeccable colorize, polish)
2. **[P1] 30-second evidence misplaced** — biggest figure is coursework 89.61% (`StatsBand.tsx:9-14`); real outcomes are body copy in Experience; SilverLink/SCS first appear ~3.7k px down; hero right column is generic CRT art; meta/OG/Twitter descriptions still say "Cloud-native microservices, Android AR/ML…" (`index.html:9,25,38`), JSON-LD "Computing Science Student". → new StatsBand (copy.md 2026-11-07, waiting on John's answers), Desk Assist hero, rewrite meta via copywriter. (/impeccable clarify, layout)
3. **[P1] Sound + toast** — FIXED in 690d181.
4. **[P2] Skills on phones and filter state** — muted vs active caps differ by colour only (1.27–1.39:1, WCAG 1.4.1/1.4.11); 7 chips wrap to 4 rows at 375; back-row tooltips collide with the filter row; filter names (Infrastructure, Workflow) don't match group names (Backend & Cloud, Ways of working) — Docker shows "Backend & Cloud" but sits under "Infrastructure"; 3D chunk (245.7 kB gzip) also loads on phones. → state via press language (matched keys raised with shadow, others flush/no shadow + desaturated), one taxonomy (filters = groups), single scrollable chip row < 640px, clamp tooltips below the filter row; consider 2D board on coarse pointers / < 1024px (needs John). (/impeccable adapt, optimize)
5. **[P2] Mobile wayfinding** — menu FIXED in 690d181; still open: chat launcher overlaps case-study "GitHub profile" CTA at 375.

## Also open
Thin About (needs John's facts); two blinking cursors (`Hero.tsx:180,198`); CRT scanline layer over all text (`index.css:307-323`, fixed, z-index 2) against "decoration never sits on top of body text"; 4 marquees; nested framing in Projects (tile shadows inside window inside teal band, `Projects.tsx:179,225`); `maximum-scale=1` in `index.html:6` blocks pinch-zoom; 28 + 7 tab stops in Skills with no "skip keyboard" link; Umami placeholders (John's decision).

## What's working
Desk Assist flow (`Experience.tsx:52`) — the one place "trust" is shown, not told; Skills interaction a11y engineering (sr-only proxies, focus ring, modal, live region, "Used in" links, `<details>` list, 2D reduced-motion path); the share card composition.

## Art direction
One palette, one story, told twice: hero = name window + `desk_assist.exe` flow with "Agent reviews" lit orange; under it real work outcomes; the keyboard further down as the quieter echo where orange = AI and teal = data. Cut a cursor and a marquee.

## Detector
Source scan 0. URL scan: hard-offset-shadow (intentional, FP), marquee (approved, FP), repeating-stripes-gradient (grid OK; CRT scanline overlay real), nested-cards (partly valid). The canvas keyboard is invisible to DOM contrast checks — 3D legibility judged visually.
