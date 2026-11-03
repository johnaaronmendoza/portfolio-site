#!/usr/bin/env python3
"""Review sheets for the pose frames (visual-verify step).

python3 review_sheet.py <poses-dir> <out-dir> [--src sheet.webp]
Writes: review-navy.png, review-cream.png (reference idle beside every frame, 4x
nearest), onion.png (all frames stacked at 35% on the shared baseline, 6x),
heads.png (top 40 rows of every frame, 8x, with a 1px grid) and, with --src,
source-vs-output.png.
"""
import argparse
import json
import os

import numpy as np
from PIL import Image, ImageDraw

NAVY, CREAM, INK = (22, 22, 63, 255), (244, 234, 213, 255), (0, 0, 0, 255)


def load(d):
    meta = json.load(open(os.path.join(d, "sheet.json")))
    names = list(meta["frames"])
    return names, {n: Image.open(os.path.join(d, f"{n}.png")).convert("RGBA") for n in names}


def label(draw, xy, text, fill):
    draw.text(xy, text, fill=fill)


def pairs(names, ims, bg, fg, z=4):
    w, h = ims[names[0]].size
    gap = 10
    cols = len(names)
    W = cols * (w * z + gap) + gap
    Hh = 2 * (h * z + gap) + gap + 28
    s = Image.new("RGBA", (W, Hh), bg)
    d = ImageDraw.Draw(s)
    ref = ims["idle"].resize((w * z, h * z), Image.NEAREST)
    for i, n in enumerate(names):
        x = gap + i * (w * z + gap)
        s.alpha_composite(ims[n].resize((w * z, h * z), Image.NEAREST), (x, gap + 14))
        s.alpha_composite(ref, (x, 2 * gap + 14 + h * z))
        label(d, (x, 2), n, fg)
        # baseline marker
        d.line([(x, gap + 14 + h * z), (x + w * z, gap + 14 + h * z)], fill=(255, 122, 47, 255))
    label(d, (gap, Hh - 12), "bottom row: reference idle", fg)
    return s


def onion(names, ims, z=6):
    w, h = ims[names[0]].size
    s = Image.new("RGBA", (w * z, h * z), CREAM)
    for n in names:
        a = np.asarray(ims[n]).copy()
        a[..., 3] = (a[..., 3] * 0.3).astype(np.uint8)
        s.alpha_composite(Image.fromarray(a).resize((w * z, h * z), Image.NEAREST))
    d = ImageDraw.Draw(s)
    d.line([(0, h * z - 1), (w * z, h * z - 1)], fill=(255, 122, 47, 255), width=2)
    d.line([(w * z // 2, 0), (w * z // 2, h * z)], fill=(46, 196, 182, 255))
    return s


def heads(names, ims, z=8, rows=40, per_row=6):
    w, _ = ims[names[0]].size
    gap = 6
    nr = -(-len(names) // per_row)
    s = Image.new("RGBA", ((w * z + gap) * per_row, nr * (rows * z + 20)), NAVY)
    d = ImageDraw.Draw(s)
    for k, n in enumerate(names):
        i, oy = k % per_row, (k // per_row) * (rows * z + 20)
        im = ims[n]
        a = np.asarray(im)
        top = np.nonzero(a[..., 3].any(1))[0].min()
        crop = im.crop((0, top, w, top + rows)).resize((w * z, rows * z), Image.NEAREST)
        x = i * (w * z + gap)
        s.alpha_composite(crop, (x, oy + 16))
        label(d, (x, oy + 2), n, CREAM)
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("poses")
    ap.add_argument("out")
    ap.add_argument("--src")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    names, ims = load(a.poses)
    pairs(names, ims, NAVY, CREAM).save(os.path.join(a.out, "review-navy.png"))
    pairs(names, ims, CREAM, INK).save(os.path.join(a.out, "review-cream.png"))
    onion(names, ims).save(os.path.join(a.out, "onion.png"))
    heads(names, ims).save(os.path.join(a.out, "heads.png"))
    if a.src:
        src = Image.open(a.src).convert("RGBA")
        bg = Image.new("RGBA", src.size, (255, 255, 255, 255))
        bg.alpha_composite(src)
        new = [n for n in names if n not in ("idle", "happy", "worry", "wrong")]
        w, h = ims[names[0]].size
        z = 6
        tile = Image.new("RGBA", (len(new) * (w * z + 8), 2 * (h * z) + 30), NAVY)
        order = ["lean-left", "lean-right", "crouch", "jump", "land", "celebrate", "thumbs-up"]
        cells = {"lean-left": 1, "lean-right": 2, "crouch": 3, "jump": 4, "land": 5,
                 "celebrate": 6, "thumbs-up": 7}
        W, H = src.size
        for i, n in enumerate(order):
            k = cells[n]
            c = bg.crop((int(k % 4 * W / 4), int(k // 4 * H / 2),
                         int((k % 4 + 1) * W / 4), int((k // 4 + 1) * H / 2)))
            c.thumbnail((w * z, h * z))
            x = i * (w * z + 8)
            tile.alpha_composite(c, (x, 0))
            tile.alpha_composite(ims[n].resize((w * z, h * z), Image.NEAREST), (x, h * z + 30))
        tile.save(os.path.join(a.out, "source-vs-output.png"))


if __name__ == "__main__":
    main()
