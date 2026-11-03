#!/usr/bin/env python3
"""Review helpers with Pillow. Local stand-in for design-agent's review-thumb.mjs
and the crop/resize parts of image-ops' img.mjs.

  python3 review.py thumb <img> [--max 1600]                 -> <img>.thumb.png
  python3 review.py sheet <out.png> <img> [<img> ...]         -> images tiled on one sheet, labelled
  python3 review.py crop <img> <out.png> L,T,W,H [--zoom 4]   -> zoomed crop (nearest neighbour, for pixel art)
  python3 review.py contrast <#fg> <#bg>                      -> WCAG contrast ratio
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw


def thumb(path, max_side=1600):
    im = Image.open(path)
    im.thumbnail((max_side, max_side))
    out = Path(path).with_suffix(".thumb.png")
    im.save(out)
    print(out)


def sheet(out, paths, cell=480, pad=16, label_h=22):
    ims = [Image.open(p).convert("RGBA") for p in paths]
    cols = min(len(ims), 3)
    rows = (len(ims) + cols - 1) // cols
    W = cols * (cell + pad) + pad
    H = rows * (cell + label_h + pad) + pad
    # Mid-grey checker shows transparency and works for light and dark assets
    bg = Image.new("RGBA", (W, H), (128, 128, 128, 255))
    d = ImageDraw.Draw(bg)
    for i, (im, p) in enumerate(zip(ims, paths)):
        r, c = divmod(i, cols)
        x, y = pad + c * (cell + pad), pad + r * (cell + label_h + pad)
        t = im.copy()
        if max(im.size) < cell:
            # Small icons: integer nearest-neighbour upscale so each pixel stays visible
            k = cell // max(im.size)
            t = t.resize((im.width * k, im.height * k), Image.NEAREST)
        else:
            t.thumbnail((cell, cell), Image.LANCZOS)
        bg.alpha_composite(t, (x + (cell - t.width) // 2, y + (cell - t.height) // 2))
        d.text((x, y + cell + 4), f"{Path(p).name} {im.width}x{im.height}", fill=(0, 0, 0, 255))
    bg.convert("RGB").save(out)
    print(out)


def crop(path, out, box, zoom=4):
    l, t, w, h = map(int, box.split(","))
    im = Image.open(path).crop((l, t, l + w, t + h))
    im.resize((w * zoom, h * zoom), Image.NEAREST).save(out)
    print(out)


def _lum(hexc):
    hexc = hexc.lstrip("#")
    ch = [int(hexc[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    ch = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in ch]
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]


def contrast(fg, bg):
    a, b = sorted((_lum(fg), _lum(bg)), reverse=True)
    r = (a + 0.05) / (b + 0.05)
    print(f"{r:.2f}:1  AA body {'PASS' if r >= 4.5 else 'FAIL'}  AA large {'PASS' if r >= 3 else 'FAIL'}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(2)
    cmd = a.pop(0)
    if cmd == "thumb":
        thumb(a[0], int(a[a.index("--max") + 1]) if "--max" in a else 1600)
    elif cmd == "sheet":
        sheet(a[0], a[1:])
    elif cmd == "crop":
        crop(a[0], a[1], a[2], int(a[a.index("--zoom") + 1]) if "--zoom" in a else 4)
    elif cmd == "contrast":
        contrast(a[0], a[1])
    else:
        print(__doc__)
        sys.exit(2)
