# Pixel assets

Original pixel art for the neo-brutalist retro web design, drawn to the brief
in `design-system/portfolio/assets.md` (placement: `pages/home.md` §9).

Every file is a hand-authored SVG: `viewBox` = `width` = `height` = grid,
`shape-rendering="crispEdges"`, integer coordinates, one `<path>` per colour,
1-unit ink outlines, shading only by ink checkerboard dither (light from top
left). Colours are only ink `#000000`, cream `#F4EAD5`, orange `#FF7A2F`,
teal `#2EC4B6` and navy `#16163F`. No amber, white or greys, and no text,
letters or numerals.

Use at integer multiples of the grid with `image-rendering: pixelated`.
All twelve are **decorative**: `<img alt="">` or inline with
`aria-hidden="true"`. If one is ever the only content of a link or button,
put an `aria-label` on the control, not on the image.

Served from `/assets/pixel/<file>`.

| File | Grid | Depicts | Placement (size) | Accessibility |
|---|---|---|---|---|
| `crt-computer.svg` | 64×64 | Generic cream desktop computer: monitor with a navy screen showing four teal output bars and a teal block cursor, orange 2×2 power light, base unit with vents and a floppy slot, keyboard slab of 2×2 keys; right and bottom faces dithered | Hero art column over the starburst (256px, `lg`+) | Decorative, `alt=""` |
| `starburst.svg` | 48×48 | Orange 16-point burst with slightly uneven points and an empty cream centre disc | Behind the CRT (384px, `lg`+); footer sign-off sticker (96px, `md`+) | Decorative, `alt=""` |
| `sparkle.svg` | 16×16 | Cream four-point sparkle with stepped, pinched centre | Marquee separator (16px); two in the hero art (32px) | Decorative, `alt=""` |
| `smiley.svg` | 16×16 | Orange face, 1×2 eyes, slightly tilted smile, one cream highlight | Above "HELLO!" in the stats strip (32px, `md`+) | Decorative, `alt=""` |
| `floppy.svg` | 16×16 | Teal diskette with clipped corner, cream shutter with ink slot, blank cream label | Left of "Resume (PDF)" in the hero button (16px) | Decorative, `alt=""` |
| `icon-home.svg` | 16×16 | House: orange roof with cream highlight, cream walls, ink window frame and ink door | Command palette "Hero" row; dot-nav tooltip (16px) | Decorative, `alt=""` |
| `icon-about.svg` | 16×16 | Cream page with a dithered folded corner and three teal content bars | Left of the About heading (32px) | Decorative, `alt=""` |
| `icon-experience.svg` | 16×16 | Orange briefcase, ink handle and seam, cream clasp and highlight | Left of the Experience heading (32px) | Decorative, `alt=""` |
| `icon-projects.svg` | 16×16 | Cream folder with tab and an orange sheet sticking out of the top | Left of the Projects heading on the teal band (32px) | Decorative, `alt=""` |
| `icon-skills.svg` | 16×16 | Single blank keycap: cream top, teal bevels, dithered front face | Left of the Skills heading (32px) | Decorative, `alt=""` |
| `icon-contact.svg` | 16×16 | Cream envelope, ink V flap, orange 2×2 seal where the flap meets | Footer "Let's build something" (32px); beside the email link and in the Email me button (16px) | Decorative, `alt=""` |
| `globe.svg` | 24×24 | Teal globe with made-up cream land blobs, ink equator and one curved meridian | Before the SGT clock in the footer (24px) | Decorative, `alt=""` |
