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
- **`shared/`** — Shared constants (cookie name, session duration)

The server has no API routes; all content is static/client-side.

### Path aliases (defined in `vite.config.ts`)

| Alias | Resolves to |
|---|---|
| `@/` | `client/src/` |
| `@shared` | `shared/` |
| `@assets` | `attached_assets/` |

### Routing

Uses **wouter** (not React Router). Routes are defined in `client/src/App.tsx`:
- `/` → `Home` (scrollable single-page portfolio)
- `/projects/silverlink`, `/projects/scs`, `/projects/ai-finance`, `/projects/uwb`, `/projects/uat`, `/projects/firesafety` → case-study pages in `client/src/pages/`

### Home page structure

`pages/Home.tsx` composes sections in order, separated by scrolling `Ribbon` bands (plus a `StatsBand` after the hero):
`Hero → About → Experience → Projects → Skills → Footer`

Each section has a corresponding `id` attribute (`#hero`, `#about`, etc.) used by keyboard navigation and the command palette.

### Global UI features

- **`MascotChatWidget`** — Floating chat bot (bottom-right corner). Uses a local keyword-based `knowledgeBase` object in the component for responses. No backend API.
- **`CommandPalette`** — `Ctrl+K` / `Cmd+K` opens an OS-style command menu for section navigation and chat shortcuts.
- **`useKeyboardNavigation`** hook — Arrow keys scroll between the named sections.
- **`ThemeProvider`** — Theme is currently locked to `"light"` (`switchable` is commented out in `App.tsx`). Dark mode CSS is wired up but not exposed to users.
- **`FramerReveal`** — now a static wrapper (scroll reveals were removed on purpose). `ScreenTear`, `LoadingBar`, `BootScreen`, `Particles` and similar effect components still exist in the repo but are not used; don't reintroduce them without a reason that serves the recruiter.

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- Design language: **maximalist 8-bit** — see Design rules below for palette and limits
- Typography: pixel fonts (`Press Start 2P` / `VT323`) via `font-pixel` class for headings; `font-mono` for body
- Hard drop shadows use the custom `shadow-8bit` utility; no blur/soft shadows
- Animations via **Framer Motion** — keep transitions snappy; take values from `client/src/lib/motion-tokens.ts`

### UI components

shadcn/ui component config is in `components.json`. Pre-built Radix UI components live in `client/src/components/ui/`.

## Who the site is for

Recruiters for AI, data and software graduate roles (currently the DBS 2027 Management Associate Programme, AI & Data Science track). In 30 seconds they should understand: John builds AI and data tools people can trust, his best work is SilverLink SG and the SCS Awareness Platform, and he is currently building Desk Assist (an AI assistant for service desk agents) at LGA Telecom.

## Design rules (binding)

**Direction: maximalist 8-bit** (chosen by John, Oct 2026). Loud, poster-like and dense, but still an 8-bit arcade identity, and still readable. Inspiration: bold colour bands, slanted scrolling ribbons, sticker tiles, poster collages and big stat numbers.

- **Palette tokens** (defined in `client/src/index.css` as CSS variables and used through Tailwind arbitrary values):
  - ink `#000000` (base), paper `#FAFAFA`
  - amber `#F59E0B` (the AI story and primary accent; keep)
  - lime `#C6FF3D` (loud bands, neon glow, highlights)
  - cobalt `#2B35FF` (full-width bands)
  - signal red `#FF3B30` (stickers only)
  - Approved text pairings only: white or lime or amber on black; black on lime or amber; white on cobalt; black on signal red (stickers only). Never amber or lime text on cobalt, never white on signal red.
- **Type:** pixel fonts (`Press Start 2P` / `VT323`) for display, set large; `font-mono` for body. Neon glow (lime `text-shadow`) is allowed on the hero name only.
- **Hard shadows only** (`shadow-8bit` style, offset, no blur), thick black borders, slight rotations (±2–6°) on stickers and ribbons.
- **Motion:** the hero reveal is the one load-in moment. Scrolling ribbons are allowed as the site's signature texture: CSS transform only, pause on hover, a visible "Pause motion" toggle (WCAG 2.2.2; keep it), and completely static under `prefers-reduced-motion`. Stickers may wiggle on hover only. The hero keeps John's original effects by his choice: WebGL particles, the scrambling name, floating pixels and the blinking cursor (particles are skipped under `prefers-reduced-motion`). Don't add particles elsewhere. Still no scroll-triggered fades or passive pop-ups.
- **No self-rated skill levels.** Stats must be real figures already on the site or resume.
- **Readable first, even when loud:** body 15–16px+ on mobile, lines under 80 characters, WCAG AA contrast, 44px tap targets, visible keyboard focus. Decoration never sits on top of body text.
- **Explicit transitions only;** never `transition: all`.

## Honesty rules (binding)

- Never invent metrics, roles, outcomes or dates. Use only facts already on the site, in `client/public/resume.pdf`, or given by John.
- Describe Desk Assist as in progress unless John confirms it is deployed.
- If a change needs a fact you don't have, ask John.

## Working agreement

- Work on a feature branch; never commit or push to `main` without John's explicit approval.
- Before handing work over: `pnpm check` and `pnpm build` must pass.
- Check every visual change at 375px and 1366px.
- Agent team: `portfolio-lead` (manager), `coder` (only agent that edits), `design-reviewer` (read-only, scores against a rubric). Definitions are in `.claude/agents/`.
