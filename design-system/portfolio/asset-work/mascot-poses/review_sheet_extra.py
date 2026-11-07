#!/usr/bin/env python3
"""Review sheets + checks for the four extra poses (visual-verify step).

python3 review_sheet_extra.py <poses-dir> <out-dir> [--src sheet-2.webp] [--trace <debug-dir>]
Writes: review-navy.png, review-cream.png (reference idle beside each pose, 4x nearest),
heads.png (top 40 rows from the hair top, 8x, 1px grid), onion.png (idle + the four poses at
30% on the shared baseline, 6x), scale-1x-2x.png (figures, "?" and laptop at real 1x and 2x
on navy and cream), source-vs-output.png (+ trace row with --trace), and prints the checks
as JSON: canvas, colours, alpha values, stray pixels, off-rule edge pixels, head height.
"""
import argparse
import json
import os

import numpy as np
from PIL import Image, ImageDraw

NAVY, CREAM, INK = (22, 22, 63, 255), (244, 234, 213, 255), (0, 0, 0, 255)
NAMES = ["wave", "point-right", "think", "typing"]
HAIR = {(0, 0, 0), (15, 15, 15), (28, 28, 28), (84, 84, 84)}
RED = {(92, 16, 21), (173, 24, 32), (237, 28, 36)}
EDGE_OK = {(0, 0, 0), (15, 15, 15), (28, 28, 28), (84, 84, 84), (112, 57, 26), (92, 16, 21),
           (11, 39, 64), (244, 234, 213)}


def load(poses):
    meta = json.load(open(os.path.join(poses, "sheet-extra.json")))
    ims = {n: Image.open(os.path.join(poses, f"{n}.png")).convert("RGBA") for n in meta["frames"]}
    idle = Image.open(os.path.join(poses, "idle.png")).convert("RGBA")
    pad = Image.new("RGBA", (meta["frameWidth"], meta["frameHeight"]), (0, 0, 0, 0))
    pad.alpha_composite(idle, (0, meta["frameHeight"] - idle.height))   # bottom-aligned
    return meta, pad, ims


def up(im, z):
    return im.resize((im.width * z, im.height * z), Image.NEAREST)


def pairs(idle, ims, bg, fg, z=4):
    w, h = idle.size
    cols = ["idle (ref)"] + NAMES
    gap = 12
    s = Image.new("RGBA", (gap + len(cols) * (w * z + gap), h * z + gap * 2 + 14), bg)
    d = ImageDraw.Draw(s)
    for i, n in enumerate(cols):
        x = gap + i * (w * z + gap)
        s.alpha_composite(up(idle if i == 0 else ims[n], z), (x, gap + 14))
        d.text((x, 2), n, fill=fg)
        d.line([(x, gap + 14 + h * z), (x + w * z, gap + 14 + h * z)], fill=(255, 122, 47, 255))
    return s


def hair_top(a):
    for y in range(a.shape[0]):
        if sum(1 for x in range(a.shape[1]) if a[y, x, 3] and tuple(a[y, x, :3]) in HAIR) >= 8:
            return y


def shirt_top(a):
    for y in range(a.shape[0]):
        if sum(1 for x in range(a.shape[1]) if a[y, x, 3] and tuple(a[y, x, :3]) in RED) >= 8:
            return y


def heads(idle, ims, z=8, rows=40):
    cols = [("idle", idle)] + [(n, ims[n]) for n in NAMES]
    w = idle.width
    s = Image.new("RGBA", (len(cols) * (w * z + 8), rows * z + 18), NAVY)
    d = ImageDraw.Draw(s)
    for i, (n, im) in enumerate(cols):
        top = hair_top(np.asarray(im))
        c = up(im.crop((0, top, w, top + rows)), z)
        g = ImageDraw.Draw(c)
        for x in range(0, c.width, z):
            g.line([(x, 0), (x, c.height)], fill=(50, 50, 90, 255))
        for y in range(0, c.height, z):
            g.line([(0, y), (c.width, y)], fill=(50, 50, 90, 255))
        bg = Image.new("RGBA", c.size, NAVY)
        bg.alpha_composite(c)
        s.alpha_composite(bg, (i * (w * z + 8), 16))
        d.text((i * (w * z + 8), 2), n, fill=CREAM)
    return s


def onion(idle, ims, z=6):
    w, h = idle.size
    s = Image.new("RGBA", (w * z, h * z), CREAM)
    for im in [idle] + [ims[n] for n in NAMES]:
        a = np.asarray(im).copy()
        a[..., 3] = (a[..., 3] * 0.3).astype(np.uint8)
        s.alpha_composite(up(Image.fromarray(a), z))
    d = ImageDraw.Draw(s)
    d.line([(0, h * z - 1), (w * z, h * z - 1)], fill=(255, 122, 47, 255), width=2)
    d.line([(w * z // 2, 0), (w * z // 2, h * z)], fill=(46, 196, 182, 255))
    return s


def scale_sheet(ims):
    """Real-size 1x and 2x: the four figures, then the '?' and laptop crops, navy and cream."""
    w, h = ims[NAMES[0]].size
    s = Image.new("RGBA", (4 * w * 3 + 40, 2 * (h * 3 + 16)), NAVY)
    for r, bg in enumerate([NAVY, CREAM]):
        y = r * (h * 3 + 16) + 8
        s.paste(Image.new("RGBA", (s.width, h * 3 + 8), bg), (0, y - 4))
        x = 8
        for n in NAMES:
            s.alpha_composite(ims[n], (x, y + 2 * h))           # 1x
            x += w + 4
        for n in NAMES:
            s.alpha_composite(up(ims[n], 2), (x, y + h))        # 2x
            x += 2 * w + 4
    return s


def checks(ims, idle):
    out = {}
    ref_head = shirt_top(np.asarray(idle)) - hair_top(np.asarray(idle))
    allc = set()
    for n in NAMES:
        a = np.asarray(ims[n])
        op = a[..., 3] > 0
        cols = {tuple(int(v) for v in p[:3]) for p in a[op]}
        allc |= cols
        p = np.pad(op, 1)
        nb = p[:-2, 1:-1].astype(int) + p[2:, 1:-1] + p[1:-1, :-2] + p[1:-1, 2:]
        stray = int((op & (nb == 0)).sum())
        edge = op & (nb < 4)
        off = [(int(y), int(x), tuple(int(v) for v in a[y, x, :3])) for y, x in zip(*np.nonzero(edge))
               if tuple(int(v) for v in a[y, x, :3]) not in EDGE_OK]
        ys = np.nonzero(op.any(1))[0]
        foot = np.nonzero(op[ys.max() - 3:ys.max() + 1].any(0))[0]
        out[n] = {"size": list(ims[n].size), "alpha_values": sorted(int(v) for v in np.unique(a[..., 3])),
                  "colours": len(cols), "stray_pixels": stray, "off_rule_edge_pixels": off,
                  "bottom_row": int(ys.max()), "feet_centre_x": (int(foot.min()) + int(foot.max()) + 1) / 2,
                  "head_rows_hairtop_to_shirt": shirt_top(a) - hair_top(a), "ref_head_rows": ref_head}
    out["union_colours"] = len(allc)
    out["union"] = sorted(allc)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("poses")
    ap.add_argument("out")
    ap.add_argument("--src")
    ap.add_argument("--trace")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    meta, idle, ims = load(a.poses)
    pairs(idle, ims, NAVY, CREAM).save(os.path.join(a.out, "review-navy.png"))
    pairs(idle, ims, CREAM, INK).save(os.path.join(a.out, "review-cream.png"))
    heads(idle, ims).save(os.path.join(a.out, "heads.png"))
    onion(idle, ims).save(os.path.join(a.out, "onion.png"))
    scale_sheet(ims).save(os.path.join(a.out, "scale-1x-2x.png"))
    if a.src:
        src = Image.open(a.src).convert("RGBA")
        sbg = Image.new("RGBA", src.size, CREAM)
        sbg.alpha_composite(src)
        al = np.asarray(src)[..., 3] > 128
        xs = np.nonzero(al.any(0))[0]
        spans, s0, p = [], xs[0], xs[0]
        for c in xs[1:]:
            if c > p + 3:
                spans.append((s0, p + 1))
                s0 = c
            p = c
        spans.append((s0, p + 1))
        w, h = idle.size
        z = 4
        nrows = 3 if a.trace else 2
        t = Image.new("RGBA", (len(NAMES) * (w * z + 10), nrows * (h * z + 10)), NAVY)
        for i, n in enumerate(NAMES):
            x0, x1 = spans[i]
            c = sbg.crop((max(0, x0 - 6), 0, min(src.width, x1 + 6), src.height))
            c = c.resize((int(c.width * h * z / c.height), h * z), Image.NEAREST)
            x = i * (w * z + 10)
            t.alpha_composite(c, (x, 0))
            row = 1
            if a.trace:
                tr = Image.open(os.path.join(a.trace, f"trace-{n}.png")).convert("RGBA")
                bg = Image.new("RGBA", tr.size, CREAM)
                bg.alpha_composite(tr)
                t.alpha_composite(up(bg, z), (x, h * z + 10))
                row = 2
            bg = Image.new("RGBA", ims[n].size, CREAM)
            bg.alpha_composite(ims[n])
            t.alpha_composite(up(bg, z), (x, row * (h * z + 10)))
        t.save(os.path.join(a.out, "source-vs-output.png"))
    print(json.dumps(checks(ims, idle), indent=1))


if __name__ == "__main__":
    main()
