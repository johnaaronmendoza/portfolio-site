# Pixel assets

Original pixel art for the neo-brutalist retro web design. Every file is an SVG
with a `viewBox` only (no width/height), `shape-rendering="crispEdges"`, 1-cell
black outlines and only the palette tokens from CLAUDE.md (navy, ink, cream,
orange, teal, violet, amber, plus white highlights and beige `#D9CBA8` plastic).
No text is baked in. Scale in whole multiples of the grid (for example 16px
icons at 16, 32 or 48px) and add `image-rendering: pixelated` if rasterised.

Served from `/assets/pixel/<file>`.

| File | Grid | Depicts | Intended placement | Decorative or meaningful |
|---|---|---|---|---|
| `retro-computer.svg` | 64×64 | Beige CRT monitor with a teal screen showing an orange folder and a white arrow cursor, keyboard in front | Hero main illustration | Decorative next to the hero heading (`alt=""`). If used alone: alt "Pixel-art retro computer" |
| `starburst.svg` | 32×32 | Violet eight-point starburst badge | Behind the retro computer or behind a short label | Decorative (`alt=""` / `aria-hidden="true"`) |
| `icon-home.svg` | 16×16 | House with orange roof, cream walls, teal door and window | Nav / command palette item for the hero section | Decorative when next to the "Home" label (`alt=""`); otherwise alt "Home" |
| `icon-about.svg` | 16×16 | Cream document page with folded corner, orange title line, teal text lines | Nav item and `about_me.txt` window title bar | Decorative beside a label; otherwise alt "About" |
| `icon-experience.svg` | 16×16 | Orange briefcase with teal clasp | Nav item and Experience window title bar | Decorative beside a label; otherwise alt "Experience" |
| `icon-projects.svg` | 16×16 | Folder: amber back tab, orange front | Nav item and Projects window title bar | Decorative beside a label; otherwise alt "Projects" |
| `icon-skills.svg` | 16×16 | Single bevelled keyboard keycap, cream top with an orange home-row nub | Nav item and Skills window title bar | Decorative beside a label; otherwise alt "Skills" |
| `icon-contact.svg` | 16×16 | Cream envelope with orange flap | Nav item, footer / contact links | Decorative beside a label; otherwise alt "Contact" |
| `icon-smiley.svg` | 24×24 | Amber smiley with orange shading and white shine | HELLO strip / marquee | Decorative (`alt=""`) |
| `icon-sparkle.svg` | 12×12 | Amber four-point sparkle | Accent beside headings or in marquee strips | Decorative (`alt=""`) |
| `icon-planet.svg` | 24×24 | Teal planet with an orange ring passing in front | Marquee strips or section accents | Decorative (`alt=""`) |

Notes for wiring:

- Nav and title-bar icons always sit next to visible text, so use `alt=""`
  (or `aria-hidden="true"` on inline SVG) and let the label carry the meaning.
- Black outlines are low contrast on navy by design; the filled shapes carry the
  silhouette. On navy, place icons on a cream window or chip if they need to
  read at 16px.
- Amber appears in the smiley, the sparkle, the folder back tabs (icon and
  screen), the planet ring highlight and the shade of the orange computer key,
  because the brief asked for amber there. CLAUDE.md limits amber in the UI to
  the AI story, so the reviewer may want some of it swapped for orange.
