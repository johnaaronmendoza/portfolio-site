---
name: genclaw-method
description: Code-driven image making, after GenClaw (yejy53/GenClaw). Think, sketch the image as code (SVG or HTML/CSS), render it, review it against the brief, refine. Use for any illustration, icon, poster or social image where counts, layout or exact text must be right.
---

# GenClaw method: think, sketch with code, render, review

Adapted from GenClaw ("code-driven agentic image generation", MIT, see `LICENSE`). GenClaw's own
agent calls image models (t2i / i2i) for the final photoreal pass. This project has no image model,
and its style is pixel art and flat retro-web blocks, which code renders exactly. So here **code is
the final canvas**, not just the draft: the SVG or HTML you write is the asset.

Original prompts, kept for reference: `references/genclaw-system-prompt.md` and the tool cards
`references/code_scene_draft.yaml`, `code_text_draft.yaml`, `vlm_review.yaml`, `format_prompt.yaml`.

## The loop

1. **Plan (GenClaw `todo_write`).** Write the steps as a short task list before drawing.
2. **Think (GenClaw `reason` / perception).** From the brief, pull out every hard constraint:
   - exact counts, colours (palette tokens only), positions, relative sizes;
   - exact text strings, copied character for character from the brief (never paraphrased);
   - the one idea the image must say, in one sentence;
   - the target sizes and where it will sit (navy page, cream window body, black hero).
   Anything you would have to invent (a fact, a number, a logo) is a question for the lead, not a guess.
3. **Sketch as code (GenClaw `code_scene_draft` / `code_text_draft`).**
   - Geometry, counts and layout → SVG on a pixel grid (`shape-rendering="crispEdges"`, integer
     coordinates, one grid unit = one "pixel").
   - Readable text → HTML/CSS with real fonts (`Press Start 2P`, `VT323`, the site mono), never text
     drawn as paths and never text inside a generated bitmap.
   - Write down a layout description beside the code (what sits where and why), as GenClaw's
     `svg_description` does; it is what a reviewer checks against.
4. **Render.** `node .claude/skills/asset-toolkit/scripts/html2png.mjs <file> --out <dir> --name <n> --size WxH`
   at every size it will appear, including the smallest.
5. **Review (GenClaw `vlm_review`).** Look at the render (Read the PNG) with one specific question,
   and check each hard constraint from step 2 as PASS / FIX:
   counts, colours, positions, text exact and legible, contrast on its real ground
   (`review.py contrast`), legible at the smallest size, nothing clipped.
6. **Refine, bounded.** At most 3 review → fix rounds (GenClaw's limit). If it still fails, return
   the best version with the failing constraint named, rather than nudging forever.

## Rules carried over from GenClaw

- Thread exact file paths from the previous step; never guess a filename.
- Keep each derived conclusion (a count, a colour, a string) intact through every later step.
- The review is against the brief, not your taste.
