# John Aaron Branzuela: portfolio

The personal portfolio of John Aaron Mendoza Branzuela, a Computing Science
student at Singapore Institute of Technology × University of Glasgow. One
scrollable home page (Hero, About, Experience, Projects, Skills) and six
case-study pages, in a neo-brutalist retro web style.

**Live:** https://portfolio-site-lh1v.vercel.app

## Stack

- React 19 + TypeScript, Vite 7, Tailwind CSS v4 (`@tailwindcss/vite`, no config file)
- Framer Motion for motion; values in `client/src/lib/motion-tokens.ts`
- wouter for routing; case-study pages are lazy-loaded
- three.js + @react-three/fiber for the 3D Skills keyboard (its own chunk; a 2D board on phones and under reduced motion); ogl for the hero particles
- Express, only to serve the built files locally (no API routes)

## Commands

```bash
pnpm install
pnpm dev      # dev server on port 3000 (Vite)
pnpm build    # Vite build to dist/public + server bundle to dist/index.js
pnpm start    # run the production server from dist/
pnpm check    # TypeScript type check (no emit)
pnpm format   # Prettier
```

## Structure

```
client/
  index.html          head tags, fonts, favicons
  public/             static files served as-is (resume.pdf, icons, fonts, /assets/...)
  src/
    pages/            Home, six case studies, NotFound
    components/       sections and house components (Window, SectionHeading, Hierarchy, PixelArt)
      case/           case-study layout, header, blocks, screenshot gallery
      comic/          Burst, stickers, hero narrator
      skills3d/       3D keyboard and the skills data (keys.ts)
    data/projects.ts  project tiles and case-study order
    hooks/, lib/      shared hooks, motion tokens, image and mascot helpers
server/index.ts       static server
attached_assets/      source screenshots imported by the pages (the `@assets` alias)
design-system/        design docs, specs and the scripts that build the site's assets
```

Path aliases (`vite.config.ts`): `@/` is `client/src/`, `@assets` is `attached_assets/`.

## Design docs

- `CLAUDE.md`: architecture, the binding design, honesty and accessibility rules, and the working agreement
- `design-system/portfolio/DESIGN.md`: the design system as shipped (tokens, type, components, motion)

## Deploy

Vercel builds `main` to production (`vercel.json`: `npm run build:vercel`, output
`dist/public`, SPA rewrites). Every other branch gets a preview deployment.

## Analytics

Umami loads only when both variables are set in Vercel; with either missing, no
analytics request is made.

| Variable | Value |
|---|---|
| `VITE_ANALYTICS_ENDPOINT` | Umami host, without a trailing slash (the script is `<endpoint>/umami`) |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website ID |
