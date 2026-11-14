# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (port 3000, Vite + Express)
pnpm build        # Build frontend (Vite) + bundle server (esbuild) → dist/
pnpm start        # Run production server from dist/
pnpm check        # TypeScript type check (no emit)
pnpm format       # Format with Prettier
```

## Architecture

This is the personal portfolio site of John Aaron Mendoza Branzuela, a Computing Science student at Singapore Institute of Technology × University of Glasgow (graduating April 2027), currently a Service Desk Operations & AI Integration Intern at LGA Telecom. It is deployed on Vercel from `main`; every other branch gets a Vercel preview. Monorepo layout:

- **`client/`** — React 19 + TypeScript SPA (Vite root)
- **`server/`** — Minimal Express server that only serves static files from `dist/public`

The server has no API routes; all content is static/client-side.

### Path aliases (defined in `vite.config.ts`)

| Alias | Resolves to |
|---|---|
| `@/` | `client/src/` |
| `@assets` | `attached_assets/` |

### Routing

Uses **wouter** (not React Router). Routes are defined in `client/src/App.tsx`:
- `/` → `Home` (scrollable single-page portfolio)
- `/projects/silverlink`, `/projects/scs`, `/projects/ai-finance`, `/projects/uwb`, `/projects/uat`, `/projects/firesafety` → case-study pages in `client/src/pages/`, lazy-loaded with `React.lazy` inside one `<Suspense>` so each ships as its own chunk

### Home page structure

`pages/Home.tsx` composes sections in order, separated by marquee strips (`Ribbon`), with a `StatsBand` after the hero; sections are built from the `Window` component:
`Hero → About → Experience → Projects → Skills → Footer`

Each section has a corresponding `id` attribute (`#hero`, `#about`, etc.) used by keyboard navigation and the command palette.

### Global UI features

- **`MascotChatWidget`** — Floating chat bot (bottom-right corner). Uses a local keyword-based `knowledgeBase` object in the component for responses. No backend API.
- **`CommandPalette`** — `Ctrl+K` / `Cmd+K` opens an OS-style command menu for section navigation and chat shortcuts.
- Arrow-key section jumping was removed (it fought text inputs and dialogs); a skip link to `#main` and the section nav handle navigation.
- **`ThemeProvider`** — Theme is currently locked to `"light"` (`switchable` is commented out in `App.tsx`). Dark mode CSS is wired up but not exposed to users.
- **`FramerReveal`** — now a static wrapper (scroll reveals were removed on purpose). Unused effect components (`ScreenTear`, `LoadingBar`, `BootScreen` and others) were deleted in the Nov 2026 cleanup; they are recoverable from the `design-retro-v1` branch. Don't reintroduce them without a reason that serves the recruiter. `Particles` stays (the hero uses it).

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- Design language: **neo-brutalist retro web** — see Design rules below for palette and limits
- Typography ("Plex Desktop", John, Nov 2026): `font-sans` = IBM Plex Sans for reading text; `font-display` = condensed bold Plex Sans for headings; `font-label` / `font-mono` = IBM Plex Mono for title bars, badges, figures, tags and terminals; `font-pixel` (Press Start 2P) only for the hero name and the HELLO sticker; `font-comic` (Bangers) only for comic lettering (section titles, captions, sound effects). Plex and Bangers load from Google Fonts in `client/index.html`.
- Hard drop shadows use the custom `shadow-8bit` utility; no blur/soft shadows
- Animations via **Framer Motion** — keep transitions snappy; take values from `client/src/lib/motion-tokens.ts`

### UI components

Only `client/src/components/ui/sonner.tsx` remains (achievement toasts); the unused shadcn/Radix kit and its dependencies were removed in Nov 2026. `components.json` still holds the shadcn config, so `npx shadcn add <component>` can bring one back if a feature needs it. Build UI from the house components (`Window`, `SectionHeading`, `Hierarchy`, `PixelArt`) first.

## Who the site is for

Recruiters for AI, data and software graduate roles (currently the DBS 2027 Management Associate Programme, AI & Data Science track). In 30 seconds they should understand: John builds AI and data tools people can trust, his best work is SilverLink SG and the SCS Awareness Platform, and he is currently building Desk Assist (an AI assistant for service desk agents) at LGA Telecom.

## Design rules (binding)

**Direction: neo-brutalist retro web** (chosen by John, Oct 2026, replacing "maximalist 8-bit"; palette changed to **Paper & Ink** and type to **Plex Desktop** by John, Nov 2026). Think a 90s web desktop rebuilt with modern discipline: warm paper page, retro OS windows with black title bars, chunky solid colour blocks, thick black outlines, hard offset shadows, marquee strips. References: a Netscape-style retro web studio page, a neo-brutalist design system sheet, and a pixel-font Web3 landing page with window cards.

- **Palette tokens** (CSS variables in `client/src/index.css`, used through Tailwind arbitrary values):
  - page `#EFEAE0` (warm off-white ground), ink `#000000` (outlines, shadows), text `#111111` (reading text), paper `#FFFFFF` (window bodies, chips; light text on dark)
  - bar `#111111` (window title bars, footer band, case-study header)
  - blue `#3A66FF` (primary buttons with white text 4.64:1; fills with black text 4.52:1) As a marker (badge, tag, keycap, the stats burst) blue means data or a link; as a field, button or hover it is the house action colour.
  - yellow `#FFD23F` = **AI only** (John, 13 Nov 2026): AI keycaps, AI tags in flows, the AI legend, and the AI Finance tile; the one exception is John's name on `welcome.exe`. Black text on it 14.6:1. Secondary buttons are paper; selected/on states (chips, toggles, Featured/Internship badges, Projects/Skills marquees) are ink with paper text; status badges use `.badge--ink/--paper/--status`.
  - blue-text `#2347D6` (blue text on page 5.95:1 or paper 7.13:1: section-heading second word, role line, links)
  - Skills keyboard keycaps carry meaning (John, Nov 2026): **AI = yellow, Data/ML = blue, Build/infra = white, Ways of working = black**; muted (filtered-out) keys are flat warm grey and sit flush. The old navy/orange/teal/cream/violet palette is retired (preserved in branch history).
  - Approved text pairings only: text/ink on page, paper or yellow; black or white on blue; white or yellow on bar/black; blue-text on page or paper. Never yellow text on the page or paper, never plain blue `#3A66FF` as body text on the page.
- **Window component** is the core motif: white body, 3px black border, hard black offset shadow, black title bar with a Plex Mono filename-style title (e.g. `about_me.txt`) and decorative ○ □ ✕ controls (`aria-hidden`). Square corners or a very small radius only. Exception: the hero `welcome.exe` window has a black body so the particles and the two-tone (white/yellow) pixel name read.
- **Skills keyboard exception:** the 3D sculpted keycaps (rounded, lit, in perspective) stay by John's choice, coloured by category as above; keycap labels must be at least 12px and every legend AA. Filter state must not rely on colour alone. Below 640px or on coarse pointers the flat 2D board is served and the 3D chunk is never requested. No mascot on the board.
- **Type:** one role per face (see Styling): Plex Sans for reading, condensed bold Plex Sans for card and page headings, Bangers for section titles (comic layer), Plex Mono for labels and data, Press Start 2P only for the hero name. No monospace or pixel type for paragraphs; no all-caps for long text.
- **Comic layer (John, Nov 2026; trimmed 13 Nov):** halftone dots on the page; section titles in Bangers with a hard offset shadow; three featured projects (SilverLink SG, SCS, UWB — UWB added by John 14 Nov so ML evidence is featured for the AI & Data track); Bangers otherwise only for the two featured-tile sound-effect bursts (SilverLink, SCS; none on UWB) (`sfx` in `data/projects.ts`, each true to what the project does); project tiles carry a Plex Mono `{year} · {caption}` meta line (no comic caption boxes); one blue `Burst` behind one work figure in the stats band (`components/comic/Burst.tsx`). Stickers (`components/comic/Stickers.tsx`) sit static in the side gutters of Home sections where the gutter fits them: **work objects only** (retro computer, cursor arrow, folder, notepad, CD, magnifier, phone), at most two per section, clear of content; the other stickers (ace, anatomical heart, arcade, coffee, cookie, eyeball, pixel heart, striped roll) stay in `public/assets/stickers/` unused, see its README. No brand icons or known characters. Comic lettering never sets paragraphs; any words in a bubble or burst that matter also exist as real text; no recognisable comic characters, logos or panels.
- **Hard shadows only**, thick black borders, solid colour blocks. Faint halftone dots on the page are allowed; no CRT scanline overlay (removed Nov 2026; it sat over body text). No gradients as decoration, no blur shadows.
- **Motion:** the hero keeps John's original effects by his choice (WebGL particles, scrambling name, floating pixels — outer gutters only, never near text (John, 14 Nov) — blinking cursor; the magnetic resume button and scroll-linked card shadow were dropped in favour of press-down buttons; particles skipped under `prefers-reduced-motion`); don't add particles elsewhere. The hero's right column is a `desk_assist.exe` window (`components/DeskAssistWindow.tsx`, John, 13 Nov 2026): the six Desk Assist steps, AI steps tagged yellow, the human agent-review step in ink, and "will" until John confirms deployment. From 1280px Lil Johnny (`components/comic/HeroNarrator.tsx`, point-right at 2×) stands on its bottom edge pointing at the review step; his bubble is the one button that opens the chat. His only motion is a 2px two-frame bob, stopped by Pause motion, reduced motion and when off screen. One blinking cursor only (the name's). The mascot appears only in the hero and the chat. Marquee strips are allowed: straight (not slanted), CSS transform only, pause on hover, a visible "Pause motion" toggle (WCAG 2.2.2; keep it), static under `prefers-reduced-motion`. Buttons may press down (translate into their shadow) on click. No scroll-triggered fades or passive pop-ups. **Exception (John, Nov 2026): the 3D Skills keyboard** (`components/skills3d/`) may play a one-time entrance when it first enters view and a subtle, reversible scroll-linked perspective shift (5–8°, no pinning or scroll hijacking), plus cursor tilt (±3°, pointer devices only), key hover lift with a `*.info` tooltip, mechanical press and a skill detail window. All of it is off under `prefers-reduced-motion` (2D fallback). Don't extend scroll-linked motion to other sections.
- **No self-rated skill levels.** Stats must be real figures already on the site or resume.
- **Readable first:** body 15–16px+ on mobile, lines under 80 characters, WCAG AA contrast, 44px tap targets, visible keyboard focus. Decoration never sits on top of body text.
- **Explicit transitions only;** never `transition: all`.

## Honesty rules (binding)

- Never invent metrics, roles, outcomes or dates. Use only facts already on the site, in `client/public/resume.pdf`, or given by John.
- Describe Desk Assist as in progress unless John confirms it is deployed.
- If a change needs a fact you don't have, ask John.

## Working agreement

- Work on a feature branch; never commit or push to `main` without John's explicit approval.
- Before handing work over: `pnpm check` and `pnpm build` must pass.
- Check every visual change at 375px and 1366px.
- Agent team (definitions in `.claude/agents/`): `portfolio-lead` (manager), `frontend-designer` (design specs in `design-system/portfolio/`, uses the ui-ux-pro-max skill), `ux-researcher` (journeys, IA and usability walkthroughs in `design-system/portfolio/ux.md`), `copywriter` (every word, in `design-system/portfolio/copy.md`, strictly factual), `asset-artist` (original pixel-art SVGs in `client/public/assets/pixel/`), `asset-generator` (rendered assets: favicons, app icons, OG images, banners; skills `genclaw-method`, `web-asset-generator`, `stills`, `brand-design`, `visual-verify`, `image-ops`, local tools in `asset-toolkit`), `coder` (the only agent that edits `client/src/`), `design-reviewer` (read-only, scores against a rubric), `design-ui-designer` (visual system and layout alternatives as mockups + specs in `design-system/portfolio/ui/`), `design-persona-walkthrough` (simulated recruiter / hiring-manager walkthroughs in `design-system/portfolio/personas.md`; hypotheses, not research), `design-visual-storyteller` (case-study storyboards, annotated screenshots and diagrams in `client/public/assets/case/`), `testing-accessibility-auditor` (independent WCAG 2.2 AA audit in `design-system/portfolio/a11y-audit.md`, Tested vs Assumed).
- The ui-ux-pro-max skill (MIT, nextlevelbuilder/ui-ux-pro-max-skill) is vendored in `.claude/skills/ui-ux-pro-max/`; run its search with `python3 .claude/skills/ui-ux-pro-max/scripts/search.py`.
- The ponytail skills (MIT, DietrichGebert/ponytail @ 96608e0) are vendored in `.claude/skills/ponytail*/` without the plugin's hooks, so they are opt-in per session: `/ponytail [lite|full|ultra]` for smallest-complete-change mode, `/ponytail-review` for a diff, `/ponytail-audit` for the repo, `/ponytail-debt` for `shortcut:` comments. Ponytail never overrides the design, honesty or accessibility rules above.
