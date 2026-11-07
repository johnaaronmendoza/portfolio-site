# HOTO: portfolio-site handover (3 Nov 2026)

Handover/takeover notes from the Claude Code cloud session that worked on John Aaron Branzuela's portfolio. Read this file, then `CLAUDE.md`, before continuing.

## Where things are

| Item | Value |
|---|---|
| Repo | `johnaaronmendoza/portfolio-site` |
| Working branch | `rebrand` (all work below is pushed here) |
| Open PR | [#1 rebrand → main](https://github.com/johnaaronmendoza/portfolio-site/pull/1): **do not merge yet** (see Decisions) |
| Vercel preview | https://portfolio-site-lh1v-git-rebrand-dragonraged101-5570s-projects.vercel.app |
| Production | deploys from `main` (unchanged this session) |
| Old design backup | branch `design-retro-v1` (and `retro-web`), frozen at `80840c6` |

**Not on GitHub:** John's local rebrand commits on his own computer. They have never been pushed. To push them, on his machine:

```bash
git fetch origin && git rebase origin/rebrand
```

```bash
git push origin HEAD:rebrand
```

The rebase may conflict where his commits touch files deleted in the cleanup (see below). Keep the deletion unless his change matters.

## What was done (commits on `rebrand`, oldest first)

| Commit | What |
|---|---|
| `80840c6` | `.graphifyignore`; `graphify-out/` ignored |
| `d828784` | Vendored ponytail skills (`.claude/skills/ponytail*`, opt-in, no hooks) |
| `bcff97a` | Cleanup: removed the Manus runtime (367 kB inline script with an unchecked postMessage listener), 25 unused app files, 52 unused shadcn UI files, `shared/`, 48 unused deps; case-study pages lazy-loaded. `index.html` 371 kB → 4 kB |
| `607f4a1` | Impeccable critique snapshot of the home page: **26/40** (`.impeccable/critique/`) |
| `0806f57` | 28 self-hosted keycap icons (`client/public/assets/skills/`, CREDITS.md) |
| `cf54038` | Skills keyboard rebuilt as a real three.js 3D board in John's keycap style (blue/amber/cream), lazy chunk, 2D fallback, a11y buttons |
| `ae53b51` | CLAUDE.md: John's motion exception for the 3D keyboard |
| `337262e` | Self-hosted Lil Johnny expression frames (idle/happy/worry/wrong, 39x64) |
| `9dbdd98` | 11 Lil Johnny pose frames, 47x64 shared canvas (`client/public/assets/mascot/poses/`) |
| `4c13b13` | Share image 1200x630, favicon + app icon set, manifest, `index.html` head tags; John's photo kept at `assets/john-photo.jpg` |
| `9c95edb` | Keyboard motion: entrance, cursor tilt, hover lift + `*.info` tooltip, press + detail window, scroll-linked perspective, category filters, mascot reactions |
| (this commit) | HOTO.md + reference images in `design-system/portfolio/asset-work/references/` |

Checks at handover: `pnpm check` and `pnpm build` pass; Impeccable detector clean on the keyboard files. Main JS chunk 561.6 kB (179 kB gzip); `Keyboard3D` chunk 902 kB (246 kB gzip, loaded only near Skills).

## Key files

- `client/src/components/skills3d/Keyboard3D.tsx`: 3D scene (three.js + @react-three/fiber), motion layers entrance > scroll > tilt > board, per-key offsets. Credits nareshkhatri.dev as inspiration (no code reused).
- `client/src/components/skills3d/keys.ts`: skill content (do not invent), colourways, labels, numbers, category map for filters.
- `client/src/components/SkillKeyboard.tsx`: hidden a11y buttons, tooltip, detail window, filters, 2D fallback, mascot.
- `client/src/lib/mascot.ts`: frame map → `/assets/mascot/poses/<pose>.png`, preloading.
- `client/src/lib/motion-tokens.ts`: all timings (including `motionTokens.mascot`).
- Asset build scripts: `design-system/portfolio/asset-work/` (`skill-legends/`, `mascot-poses/`, `share-and-icons/`).
- Reference images from John: `design-system/portfolio/asset-work/references/`.

## Unfinished work

1. **Four new mascot poses** (wave, point-right, think "?", typing on laptop). Source: `design-system/portfolio/asset-work/references/mascot-poses-sheet-2-unprocessed.webp` (500x141, transparent, small: ~1.3x native scale). The clean-up agent was stopped before writing anything. To resume: rerun the `asset-generator` agent with the same process as `mascot-poses/build_poses.py` (snap to the 17-colour palette of `lil-johnny-idle.png`, re-stamp eyes/smile, add the cowlick, output to `client/public/assets/mascot/poses/`).
2. **Placing those poses** (proposed, not approved): wave in the footer "Let's talk", point-right in the Projects intro, think for an empty filter state, typing beside the Skills heading. Static frames only.
3. **Critique fixes not yet done** (from the 26/40 critique): sound on by default with no mute + achievement toast covering Back (P1); stats band leads with coursework (P1); mobile has no section navigation (P2); About is thin (P2). Run `/impeccable polish`, which reads the saved critique.
4. **Small leftovers:** dead `.border-8bit` classes in `client/src/index.css` (~line 392); old `client/public/assets/mascot/lil-johnny-*.png` no longer referenced (kept as source art); the chat-widget mascot is drawn at a non-integer scale in 32–40px boxes.

## Decisions waiting on John

1. Merge PR #1 only after his rebrand commits are pushed and the preview is checked: merging publishes the whole retro-web redesign plus everything above to production.
2. Umami analytics: if used, set `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` in Vercel; if not, delete the script tag in `client/index.html`. Right now every page makes a failing request.
3. Share image: OK to show Lil Johnny on it, and OK for the keycap blue/amber to appear in the share image and favicon? Square version for WhatsApp?
4. Add the missing cowlick to the 7 ChatGPT-generated poses?
5. Real-device check of the 3D keyboard: iOS Safari, Firefox, touch on a phone (only headless Chromium was tested). Known: back-row tooltips can overlap the filter row; empty navy around the board on phones; scroll tilt set to 5° (low end of 5–8°).

## Rules that bind future work

See `CLAUDE.md`: design rules (palette, Window motif, hard shadows, readable-first), honesty rules (no invented metrics, Desk Assist "in progress"), working agreement (feature branch, `pnpm check` + `pnpm build` before handover, check 375px and 1366px), and the agent team (`coder` is the only agent that edits `client/src/`). The 3D keyboard's scroll-linked motion is an approved exception for that component only.

## Tooling notes

- **Graphify:** code graph for this repo with `graphify update .` (offline, code only; `.graphifyignore` excludes `.claude/` and `attached_assets/`). Output in `graphify-out/` (gitignored).
- **Impeccable:** the design skill/plugin. `.impeccable/config.json` holds one scoped ignore (cramped-padding false positive in `share-and-icons/og.html`). No `PRODUCT.md`/`DESIGN.md` yet; `/impeccable init` then `/impeccable document` are the recommended next setup steps, especially before the rebrand.
- **OmniRoute:** a local AI gateway (`localhost:20128`) on John's machine. Cloud sessions do not route through it. Its `context-relay` combo can hand conversation summaries between models; it does not write a handover file (this HOTO.md is that file).
- **ChatGPT assets:** reference files and prompts for more Lil Johnny poses were given in chat. Results always need the pixel-grid/palette clean-up step above.
