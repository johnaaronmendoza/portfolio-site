#!/usr/bin/env python3
"""Favicon + app-icon set from one 16x16 pixel master (the 01 PROMPT keycap, AI = orange).

  python3 -I build_icons.py <out-dir> [--candidates <review-dir>]

Colours (John, Nov 2026: keycaps use house colours with meaning, AI = orange, black ink):
  face orange #FF7A2F, legend '>_' ink #000 (8.1:1), outline/seam/shadow ink #000,
  front strip: see STRIP below (the variants are rendered side by side with --candidates).

The master is a 16x16 grid drawn below. Every output is that grid scaled by a whole number
with nearest-neighbour, so no size is ever resampled and the pixel edges stay crisp:

  favicon.svg            16-grid, crispEdges (browsers draw it at 16 and 32 = x1, x2)
  favicon-16x16.png      x1          favicon-32x32.png   x2
  favicon.ico            16 (x1), 32 (x2), 48 (x3)
  apple-touch-icon.png   180, navy, cap x8 = 128 (26 px margin; iOS rounds the corners)
  icon-192.png           192, navy, cap x10 = 160 (16 px margin)
  icon-512.png           512, navy, cap x28 = 448 (32 px margin)
  icon-512-maskable.png  512, navy, cap x18 = 288: its corners sit 204 px from the centre,
                         inside the 205 px (40%) maskable safe circle
  master-512.png         x32, transparent: the source handed to web-asset-generator's
                         generate_favicons.py for the LANCZOS comparison

--candidates also writes the Lil Johnny head test (16, 32) for the review.
"""
import sys
from pathlib import Path
from PIL import Image

NAVY = (0x16, 0x16, 0x3F, 255)
ORANGE = "#FF7A2F"
# Front-strip options. "seam": orange strip under the ink seam row (palette only, ships);
# "ink": black strip; "shade": a darker orange (off-palette, comparison only).
STRIPS = {"seam": ORANGE, "ink": "#000000", "shade": "#B8501A"}
STRIP = "seam"


def rgba(hx):
    hx = hx.lstrip("#")
    return tuple(int(hx[i:i + 2], 16) for i in (0, 2, 4)) + (255,)


def palette(strip=STRIP, face=ORANGE, legend="#000000"):
    return {".": None, "K": rgba("#000000"), "B": rgba(face), "D": rgba(STRIPS.get(strip, strip)),
            "W": rgba(legend)}


COL = palette()

# 01 PROMPT keycap: 15x15 cap with cut corners, face rows 1-9, ink seam row 10, strip rows 11-13,
# '>_' legend (chevron 2 px stroke, underscore 2 rows), 1 px hard shadow right and below.
MASTER = [
    ".KKKKKKKKKKKKK..",
    "KBBBBBBBBBBBBBK.",
    "KBBBBBBBBBBBBBKK",
    "KBBWWBBBBBBBBBKK",
    "KBBBWWBBBBBBBBKK",
    "KBBBBWWBBBBBBBKK",
    "KBBBWWBBWWWWWBKK",
    "KBBWWBBBWWWWWBKK",
    "KBBBBBBBBBBBBBKK",
    "KBBBBBBBBBBBBBKK",
    "KKKKKKKKKKKKKKKK",
    "KDDDDDDDDDDDDDKK",
    "KDDDDDDDDDDDDDKK",
    "KDDDDDDDDDDDDDKK",
    ".KKKKKKKKKKKKKKK",
    "..KKKKKKKKKKKKK.",
]
assert len(MASTER) == 16 and all(len(r) == 16 for r in MASTER)


def grid_image(rows, col=None):
    col = col or COL
    im = Image.new("RGBA", (len(rows[0]), len(rows)), (0, 0, 0, 0))
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if col[ch]:
                im.putpixel((x, y), col[ch])
    return im


def scaled(im, k):
    return im.resize((im.width * k, im.height * k), Image.Resampling.NEAREST)


def on_navy(im, size, k):
    canvas = Image.new("RGBA", (size, size), NAVY)
    cap = scaled(im, k)
    off = (size - cap.width) // 2
    canvas.alpha_composite(cap, (off, off))
    return canvas.convert("RGB")  # opaque: iOS ignores transparency


def svg(rows):
    # The legend is ink like the outline, and a "seam" strip is the face colour: merge equal
    # fills into one path each so the SVG stays small.
    rows = [r.replace("W", "K") for r in rows]
    hexes = {"K": "#000", "B": ORANGE, "D": STRIPS[STRIP]}
    if STRIPS[STRIP].upper() == ORANGE:
        rows = [r.replace("D", "B") for r in rows]
        del hexes["D"]
    parts = []
    for ch, hx in hexes.items():
        d = []
        for y, row in enumerate(rows):
            x = 0
            while x < len(row):
                if row[x] == ch:
                    x0 = x
                    while x < len(row) and row[x] == ch:
                        x += 1
                    d.append(f"M{x0} {y}h{x - x0}v1h-{x - x0}z")
                else:
                    x += 1
        parts.append(f'<path fill="{hx}" d="{"".join(d)}"/>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">'
            + "".join(parts) + "</svg>\n")


def main():
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    m = grid_image(MASTER)
    (out / "favicon.svg").write_text(svg(MASTER))
    m.save(out / "favicon-16x16.png", optimize=True)
    scaled(m, 2).save(out / "favicon-32x32.png", optimize=True)
    # Pillow's ICO writer resamples one source to each size; give it the x3 image and the
    # sizes that divide it exactly would still be LANCZOS, so build each frame ourselves.
    frames = [m, scaled(m, 2), scaled(m, 3)]
    frames[2].save(out / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)],
                   append_images=frames[:2])
    on_navy(m, 180, 8).save(out / "apple-touch-icon.png", optimize=True)
    on_navy(m, 192, 10).save(out / "icon-192.png", optimize=True)
    on_navy(m, 512, 28).save(out / "icon-512.png", optimize=True)
    on_navy(m, 512, 18).save(out / "icon-512-maskable.png", optimize=True)
    scaled(m, 32).save(out / "master-512.png", optimize=True)

    if "--candidates" in sys.argv:
        rev = Path(sys.argv[sys.argv.index("--candidates") + 1])
        rev.mkdir(parents=True, exist_ok=True)
        repo = Path(__file__).resolve().parents[4]
        j = Image.open(repo / "client/public/assets/mascot/lil-johnny-happy.png").convert("RGBA")
        head = j.crop((0, 0, 39, 36))  # hair to chin
        sq = Image.new("RGBA", (39, 39), (0, 0, 0, 0))
        sq.alpha_composite(head, (0, 1))
        for s in (16, 32):
            sq.resize((s, s), Image.Resampling.BOX).save(rev / f"cand-johnny-{s}.png")
        m.save(rev / "cand-keycap-16.png")
        scaled(m, 2).save(rev / "cand-keycap-32.png")
        for name in STRIPS:
            c = grid_image(MASTER, palette(name))
            c.save(rev / f"cand-{name}-16.png")
            scaled(c, 2).save(rev / f"cand-{name}-32.png")
            on_navy(c, 180, 8).save(rev / f"cand-{name}-180.png")
        # critique wording ("orange >_ on a navy/black cap"), for comparison only
        c = grid_image(MASTER, palette("#000000", face="#000000", legend=ORANGE))
        c.save(rev / "cand-blackcap-16.png")
        scaled(c, 2).save(rev / "cand-blackcap-32.png")


if __name__ == "__main__":
    main()
