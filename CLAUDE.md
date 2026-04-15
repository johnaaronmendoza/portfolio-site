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

This is a personal portfolio site (John Aaron — Computing Science student, Ngee Ann Polytechnic) built with a monorepo layout:

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
- `/projects/silverlink` → `SilverLinkProject` (detail page)

### Home page structure

`pages/Home.tsx` composes sections in order with `PixelDivider` separators:
`Hero → About → Experience → Projects → Skills → Footer`

Each section has a corresponding `id` attribute (`#hero`, `#about`, etc.) used by keyboard navigation and the command palette.

### Global UI features

- **`MascotChatWidget`** — Floating chat bot (bottom-right corner). Uses a local keyword-based `knowledgeBase` object in the component for responses. No backend API.
- **`CommandPalette`** — `Ctrl+K` / `Cmd+K` opens an OS-style command menu for section navigation and chat shortcuts.
- **`useKeyboardNavigation`** hook — Arrow keys scroll between the named sections.
- **`ThemeProvider`** — Theme is currently locked to `"light"` (`switchable` is commented out in `App.tsx`). Dark mode CSS is wired up but not exposed to users.
- **`ScreenTear`** / **`LoadingBar`** / **`FramerReveal`** — Decorative effects consistent with the 8-bit aesthetic.

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- Design language: **Industrial Retro-Futurism** — true black background, amber/gold (`#F59E0B`) primary accent, electric blue (`#3B82F6`) secondary, `#18181B` zinc for card surfaces
- Typography: pixel fonts (`Press Start 2P` / `VT323`) via `font-pixel` class for headings; `font-mono` for body
- Hard drop shadows use the custom `shadow-8bit` utility; no blur/soft shadows
- Animations via **Framer Motion** — keep transitions snappy (`duration: 0.2`) per the design philosophy

### UI components

shadcn/ui component config is in `components.json`. Pre-built Radix UI components live in `client/src/components/ui/`.
