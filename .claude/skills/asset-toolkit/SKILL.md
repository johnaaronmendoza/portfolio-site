---
name: asset-toolkit
description: Local render and review tools for this repo's asset work, and the map from design-agent's /workspace sandbox paths to what exists here. Read before using the stills, image-ops, visual-verify, brand-design or image-generation skills.
---

# Asset toolkit (local equivalents)

The `brand-design`, `stills`, `visual-verify`, `image-ops` and `image-generation` skills are vendored
unmodified from langchain-ai/design-agent. They were written for that project's sandbox. In this
repo, read their paths and tools through this map:

| design-agent says | Use here |
| --- | --- |
| brand pack, `/workspace/brand/tokens.css`, `brand.toml`, `graphic-language.md` | The palette and design rules in `CLAUDE.md`, plus `design-system/portfolio/MASTER.md` and `assets.md`. Colours as `var(--navy)` etc. in pages; hex only inside standalone SVGs, and only palette hexes. |
| `/workspace/brand/logos/` | No logo exists. Never invent one; ask the lead. |
| `/workspace/tools/html2png.mjs` | `node .claude/skills/asset-toolkit/scripts/html2png.mjs` (same idea: `--out --name --size WxH [--scale 2] [--transparent] [--require-font F]`; also renders a bare `.svg`) |
| `/workspace/tools/review-thumb.mjs` (`--sheet`) | `python3 .claude/skills/asset-toolkit/scripts/review.py thumb|sheet`, then Read the PNG to look at it |
| image-ops `img.mjs` crop/resize for zoomed checks | `python3 .claude/skills/asset-toolkit/scripts/review.py crop <img> <out> L,T,W,H --zoom 4` |
| image-ops `img.mjs` other ops (tint, composite, compress) | Needs `sharp` (`npm i -D sharp` on a machine with registry access). Otherwise use Pillow in a short Python script. |
| `brand-lint.mjs` | Manual: palette hexes only, approved text pairings (CLAUDE.md), `review.py contrast <fg> <bg>` for every text pair |
| `generate_image` (image-generation skill) | **Not available.** No image model is connected. Make the picture in code (genclaw-method). Use image-generation only for its judgment on when a picture needs a painterly model; flag such cases to the lead. |
| `/workspace/projects/<slug>/` | Work in `design-system/portfolio/asset-work/<slug>/`; ship finals to `client/public/assets/` (pixel art in `pixel/`) |
| `upload_files` | Hand files back to the lead with paths |

**Fonts:** load them from the repo, not Google Fonts (the render must not depend on the network):
`@font-face{font-family:"Press Start 2P";src:url("<relative path>/client/public/fonts/PressStart2P.woff2")}`,
and pass `--require-font "Press Start 2P"` so a missing font fails the render instead of falling back.

Playwright and Chromium are installed in the cloud workspace (`require('playwright')`). On John's
machine run `npx playwright install chromium` once.

Web assets (favicons, app icons, Open Graph images) use the `web-asset-generator` skill's Python
scripts (Pillow). Emoji features need its optional dependency; the site does not use emoji favicons.
