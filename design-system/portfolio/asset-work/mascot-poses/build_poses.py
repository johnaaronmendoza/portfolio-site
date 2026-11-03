#!/usr/bin/env python3
"""Build Lil Johnny pose frames from John's ChatGPT pose sheet.

Reproducible: python3 build_poses.py <pose-sheet.webp> [--out client/public/assets/mascot/poses]

Pipeline per frame (sheet is 4 x 2, RGBA WebP with a near-binary lossy alpha):
  1. cut the cell, key the background on alpha > 128, keep only the large
     connected components (drops WebP specks);
  2. snap every opaque pixel to the reference palette (sampled from
     lil-johnny-idle.png) by nearest colour in CIELAB, so the brown skin
     outline never collapses into the shirt's dark red;
  3. fit one square pixel grid per frame (period + x/y phase) to the
     palette-label edges, then take the MODE label of each block's core
     (no averaging, so edges stay crisp and alpha is 0 or 255);
  4. recolour silhouette-edge pixels to the reference's four outline colours;
     re-stamp both eyes with the hand-made 3x5 eye (resampling a tilted head
     breaks the 1px highlight);
     graft the hand-made smile (from lil-johnny-happy.png) onto the two smiling
     frames, whose 1px mouths do not survive resampling;
  5. remove orphan pixels, trim, and place on a shared canvas: feet on one
     baseline row, centred on the feet; the jump frame floats JUMP_LIFT px.
The four hand-made expression frames are padded onto the same canvas unchanged.
"""
import argparse
import json
import os
from collections import Counter

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MASCOT = os.path.join(REPO, "client", "public", "assets", "mascot")

# sheet order: left->right, top row then bottom row; idle (index 0) is not shipped
SHEET_NAMES = ["sheet-idle", "lean-left", "lean-right", "crouch",
               "jump", "land", "celebrate", "thumbs-up"]
REF_NAMES = ["idle", "happy", "worry", "wrong"]
ORDER = ["idle", "happy", "worry", "wrong", "lean-left", "lean-right",
         "crouch", "jump", "land", "celebrate", "thumbs-up"]
SMILE_FRAMES = ("celebrate", "thumbs-up")   # resampled mouth breaks; use the original smile
JUMP_LIFT = 4      # px the jump frame's feet float above the baseline
PERIOD_RANGE = np.arange(5.85, 6.30, 0.01)


# ---------- colour ----------
def srgb_to_lab(rgb):
    c = np.asarray(rgb, dtype=float) / 255.0
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805],
                  [0.2126, 0.7152, 0.0722],
                  [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.stack([116 * f[..., 1] - 16,
                     500 * (f[..., 0] - f[..., 1]),
                     200 * (f[..., 1] - f[..., 2])], axis=-1)


def reference_palette():
    """Opaque colours of lil-johnny-idle.png, most used first."""
    a = np.asarray(Image.open(os.path.join(MASCOT, "lil-johnny-idle.png")).convert("RGBA"))
    cnt = Counter(tuple(int(v) for v in p[:3]) for p in a.reshape(-1, 4) if p[3] == 255)
    return np.array([c for c, _ in cnt.most_common()], dtype=np.uint8)


# ---------- sheet -> labels ----------
def components(mask):
    """4-connected components; returns label image and sizes (pure numpy BFS)."""
    h, w = mask.shape
    lab = np.zeros((h, w), dtype=np.int32)
    sizes = [0]
    cur = 0
    for y0, x0 in zip(*np.nonzero(mask)):
        if lab[y0, x0]:
            continue
        cur += 1
        stack = [(y0, x0)]
        lab[y0, x0] = cur
        n = 0
        while stack:
            y, x = stack.pop()
            n += 1
            for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= yy < h and 0 <= xx < w and mask[yy, xx] and not lab[yy, xx]:
                    lab[yy, xx] = cur
                    stack.append((yy, xx))
        sizes.append(n)
    return lab, np.array(sizes)


def cell_labels(sheet, r, c, pal_lab):
    H, W = sheet.shape[:2]
    x0, x1 = int(c * W / 4), int((c + 1) * W / 4)
    y0, y1 = int(r * H / 2), int((r + 1) * H / 2)
    cell = sheet[y0:y1, x0:x1]
    mask = cell[..., 3] > 128
    lab, sizes = components(mask)
    keep = np.isin(lab, np.nonzero(sizes > 400)[0]) & mask
    ys, xs = np.nonzero(keep)
    t, b, l, rr = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    keep = keep[t:b, l:rr]
    rgb = cell[t:b, l:rr, :3]
    d = ((srgb_to_lab(rgb)[:, :, None, :] - pal_lab[None, None]) ** 2).sum(-1)
    labels = d.argmin(-1).astype(np.int16)
    labels[~keep] = -1
    return labels


# ---------- grid fit + mode sampling ----------
def edge_profiles(labels):
    gx = (labels[:, 1:] != labels[:, :-1]).sum(0).astype(float)
    gy = (labels[1:, :] != labels[:-1, :]).sum(1).astype(float)
    return gx, gy


def best_phase(g, p):
    """Best offset for boundaries at o + k*p (edge between px i and i+1 = index i)."""
    n = len(g)
    best = (-1.0, 0.0)
    for o in np.arange(0, p, 0.25):
        pos = np.round(np.arange(o, n + 1, p) - 1).astype(int)
        pos = pos[(pos >= 0) & (pos < n)]
        s = g[pos].sum()
        if s > best[0]:
            best = (s, o)
    return best


def fit_grid(labels):
    gx, gy = edge_profiles(labels)
    best = None
    for p in PERIOD_RANGE:
        sx, ox = best_phase(gx, p)
        sy, oy = best_phase(gy, p)
        s = (sx + sy) * p / (gx.sum() + gy.sum())   # 1.0 = no alignment
        if best is None or s > best[0]:
            best = (s, p, ox, oy)
    return best


def sample(labels, p, ox, oy):
    h, w = labels.shape
    xs = np.arange(ox - p, w + p, p)
    ys = np.arange(oy - p, h + p, p)
    out = np.full((len(ys) - 1, len(xs) - 1), -1, dtype=np.int16)
    for j in range(len(ys) - 1):
        for i in range(len(xs) - 1):
            # core of the block: drop ~1px on each side to dodge edge bleed
            a0, a1 = int(round(ys[j] + 1)), int(round(ys[j + 1] - 1))
            b0, b1 = int(round(xs[i] + 1)), int(round(xs[i + 1] - 1))
            blk = labels[max(a0, 0):max(min(a1, h), 0), max(b0, 0):max(min(b1, w), 0)]
            if blk.size == 0:
                continue
            v, n = np.unique(blk, return_counts=True)
            out[j, i] = v[n.argmax()]
    return out


def clean(grid):
    """Drop opaque pixels with no 4-neighbour and fill 1px transparent pinholes."""
    g = grid.copy()
    h, w = g.shape
    pad = np.pad(g, 1, constant_values=-1)
    nb = [pad[:-2, 1:-1], pad[2:, 1:-1], pad[1:-1, :-2], pad[1:-1, 2:]]
    opaque_nb = sum((n >= 0).astype(int) for n in nb)
    g[(g >= 0) & (opaque_nb == 0)] = -1
    holes = (g < 0) & (opaque_nb == 4)
    for y, x in zip(*np.nonzero(holes)):
        vals = [int(n[y, x]) for n in nb]
        g[y, x] = Counter(vals).most_common(1)[0][0]
    ys, xs = np.nonzero(g >= 0)
    return g[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


# Outline rule taken from the hand-made frames: every pixel on the silhouette
# edge is one of four outline colours, chosen by the region it belongs to.
OUTLINE = {
    (15, 15, 15): (0, 0, 0), (28, 28, 28): (0, 0, 0), (84, 84, 84): (0, 0, 0),
    (237, 28, 36): (92, 16, 21), (173, 24, 32): (92, 16, 21),
    (255, 223, 174): (112, 57, 26), (247, 162, 107): (112, 57, 26),
    (204, 129, 82): (112, 57, 26),
    (52, 102, 148): (11, 39, 64), (32, 76, 115): (11, 39, 64), (78, 117, 150): (11, 39, 64),
}
SKIN, PINK, INKC = (255, 223, 174), (245, 108, 133), (0, 0, 0)
DARK = {(0, 0, 0), (15, 15, 15), (28, 28, 28)}


def outline(rgba):
    a = rgba.copy()
    op = a[..., 3] > 0
    p = np.pad(op, 1)
    edge = op & ~(p[:-2, 1:-1] & p[2:, 1:-1] & p[1:-1, :-2] & p[1:-1, 2:])
    for y, x in zip(*np.nonzero(edge)):
        c = tuple(int(v) for v in a[y, x, :3])
        if c in OUTLINE:
            a[y, x, :3] = OUTLINE[c]
    return a


def face_marks(rgba):
    """(blush row, eye-centre x) from the two pink blush blobs (always 2 px each)."""
    pink = np.all(rgba[..., :3] == PINK, axis=2) & (rgba[..., 3] > 0)
    ys, xs = np.nonzero(pink)
    row = int(np.bincount(ys).argmax())
    xs = np.sort(xs[ys == row])
    return row, (xs.min() + xs.max() + 1) / 2.0


def smile_stamp():
    """The 6x2 smile of lil-johnny-happy.png, as offsets from blush row / face centre."""
    idle = np.asarray(Image.open(os.path.join(MASCOT, "lil-johnny-idle.png")).convert("RGBA"))
    happy = np.asarray(Image.open(os.path.join(MASCOT, "lil-johnny-happy.png")).convert("RGBA"))
    row, cx = face_marks(happy)
    diff = np.any(idle != happy, axis=2)
    pts = [(y, x) for y, x in zip(*np.nonzero(diff)) if y > row]   # mouth only, not brows
    return [(int(y - row), x + 0.5 - cx) for y, x in pts]   # dx to pixel centre


def graft_smile(rgba, stamp):
    """Replace a resampled (broken) mouth with the hand-made smile, same spot on the face."""
    a = rgba.copy()
    row, cx = face_marks(a)
    dys = [d for d, _ in stamp]
    dxs = [d for _, d in stamp]
    y0, y1 = row + 1, row + max(dys) + 1
    x0, x1 = int(np.floor(cx + min(dxs))) - 1, int(np.ceil(cx + max(dxs))) + 2
    for y in range(y0, y1 + 1):
        for x in range(x0, x1):
            if tuple(int(v) for v in a[y, x, :3]) in DARK and a[y, x, 3]:
                a[y, x, :3] = SKIN
    for dy, dx in stamp:
        a[row + dy, int(np.floor(cx + dx)), :3] = INKC
    return a


EYE = ["w##", "###", "###", "###", "###"]      # the hand-made eye, 3 x 5
EYE_INK = {(0, 0, 0), (15, 15, 15), (255, 255, 255)}
FACE = {(255, 223, 174), (247, 162, 107), (204, 129, 82), (245, 108, 133)}


def restamp_eyes(rgba):
    """Find each eye (dark blob 2-4 px wide, 4-6 px tall, enclosed by face colours)
    and replace it with the reference eye, bottom-aligned on the same spot."""
    a = rgba.copy()
    h, w = a.shape[:2]
    col = lambda y, x: tuple(int(v) for v in a[y, x, :3]) if a[y, x, 3] else None
    ink = np.array([[col(y, x) in EYE_INK for x in range(w)] for y in range(h)])
    seen = np.zeros_like(ink)
    pink = np.all(a[..., :3] == PINK, axis=2) & (a[..., 3] > 0)
    pink_rows = np.nonzero(pink.any(1))[0]
    eyes = []
    for y0, x0 in zip(*np.nonzero(ink)):
        if seen[y0, x0]:
            continue
        comp, stack, ok = [], [(y0, x0)], True
        seen[y0, x0] = True
        while stack:
            y, x = stack.pop()
            comp.append((y, x))
            for yy, xx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if not (0 <= yy < h and 0 <= xx < w):
                    continue
                if ink[yy, xx]:
                    if not seen[yy, xx]:
                        seen[yy, xx] = True
                        stack.append((yy, xx))
                elif col(yy, xx) not in FACE:
                    ok = False
        ys = [p[0] for p in comp]
        xs = [p[1] for p in comp]
        bh, bw = max(ys) - min(ys) + 1, max(xs) - min(xs) + 1
        solid = len(comp) / float(bh * bw) >= 0.6           # the forelock curl is sparse (~0.4)
        near_blush = pink_rows.min() - 4 <= max(ys) <= pink_rows.max()
        if ok and solid and near_blush and 4 <= bh <= 6 and 2 <= bw <= 4:
            eyes.append(comp)
    for comp in eyes:
        ys = [p[0] for p in comp]
        xs = [p[1] for p in comp]
        cs = set(comp)
        for y in range(min(ys) - 1, max(ys) + 2):     # stray highlight that drifted off
            for x in range(min(xs) - 1, max(xs) + 2):
                if col(y, x) == (255, 255, 255) and (y, x) not in cs:
                    comp.append((y, x))
        for y, x in comp:                      # fill with the face colour beside it
            near = [col(y, xx) for xx in range(x - 3, x + 4)
                    if 0 <= xx < w and (y, xx) not in comp and col(y, xx) in FACE]
            a[y, x, :3] = Counter(near).most_common(1)[0][0] if near else SKIN
        ys = [p[0] for p in comp]
        xs = [p[1] for p in comp]
        bottom = max(ys)
        left = int(round((min(xs) + max(xs)) / 2.0 - 1))
        for dy, row in enumerate(EYE):
            for dx, ch in enumerate(row):
                a[bottom - 4 + dy, left + dx, :3] = (255, 255, 255) if ch == "w" else INKC
    return a, len(eyes)


def to_rgba(grid, pal):
    h, w = grid.shape
    out = np.zeros((h, w, 4), dtype=np.uint8)
    m = grid >= 0
    out[m, :3] = pal[grid[m]]
    out[m, 3] = 255
    return out


# ---------- placement ----------
def feet_centre(rgba, rows=4):
    """x centre of the opaque pixels in the bottom `rows` rows (the shoes)."""
    a = rgba[..., 3] > 0
    ys = np.nonzero(a.any(1))[0]
    band = a[ys.max() - rows + 1: ys.max() + 1]
    xs = np.nonzero(band.any(0))[0]
    return (xs.min() + xs.max() + 1) / 2.0


def place(rgba, cw, ch, centre_x, lift=0):
    canvas = np.zeros((ch, cw, 4), dtype=np.uint8)
    h, w = rgba.shape[:2]
    x = int(round(cw / 2.0 - centre_x))
    y = ch - h - lift
    assert x >= 0 and x + w <= cw and y >= 0, (x, y, w, h, cw, ch)
    canvas[y:y + h, x:x + w] = rgba
    return canvas


def save_png(arr, path):
    im = Image.fromarray(arr, "RGBA")
    # palette PNG with one fully transparent index: smallest file, alpha stays 0/255
    cols = sorted({tuple(p) for p in arr.reshape(-1, 4) if p[3] == 255})
    pal_im = Image.new("P", im.size)
    flat = [0, 0, 0] + [v for c in cols for v in c[:3]]
    pal_im.putpalette(flat + [0] * (768 - len(flat)))
    idx = {c: i + 1 for i, c in enumerate(cols)}
    data = [idx.get(tuple(p), 0) if p[3] == 255 else 0 for p in arr.reshape(-1, 4)]
    pal_im.putdata(data)
    pal_im.info["transparency"] = 0
    pal_im.save(path, optimize=True, transparency=0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("--out", default=os.path.join(MASCOT, "poses"))
    ap.add_argument("--debug", default=None, help="dir for raw (pre-canvas) frames")
    args = ap.parse_args()

    pal = reference_palette()
    pal_lab = srgb_to_lab(pal)
    sheet = np.asarray(Image.open(args.sheet).convert("RGBA"))

    stamp = smile_stamp()
    frames, report = {}, {}
    for k, name in enumerate(SHEET_NAMES):
        labels = cell_labels(sheet, k // 4, k % 4, pal_lab)
        score, p, ox, oy = fit_grid(labels)
        grid = clean(sample(labels, p, ox, oy))
        frames[name], n_eyes = restamp_eyes(outline(to_rgba(grid, pal)))
        if name in SMILE_FRAMES:
            frames[name] = graft_smile(frames[name], stamp)
        report[name] = {"period": round(float(p), 2), "phase": [float(ox), float(oy)],
                        "fit": round(float(score), 2), "size": list(grid.shape[::-1]),
                        "eyes_restamped": n_eyes}
    for name in REF_NAMES:
        frames[name] = np.asarray(Image.open(
            os.path.join(MASCOT, f"lil-johnny-{name}.png")).convert("RGBA")).copy()

    if args.debug:
        os.makedirs(args.debug, exist_ok=True)
        for name, a in frames.items():
            Image.fromarray(a, "RGBA").save(os.path.join(args.debug, f"raw-{name}.png"))

    ship = [n for n in ORDER]
    centres = {n: feet_centre(frames[n]) for n in ship}
    half = max(max(c, frames[n].shape[1] - c) for n, c in centres.items())
    cw = int(np.ceil(half)) * 2 + 1                 # odd, so the 39 px refs centre exactly
    ch = max(frames[n].shape[0] + (JUMP_LIFT if n == "jump" else 0) for n in ship)
    os.makedirs(args.out, exist_ok=True)
    placed = {}
    for n in ship:
        placed[n] = place(frames[n], cw, ch, centres[n], JUMP_LIFT if n == "jump" else 0)
        save_png(placed[n], os.path.join(args.out, f"{n}.png"))

    strip = np.concatenate([placed[n] for n in ship], axis=1)
    save_png(strip, os.path.join(args.out, "sheet.png"))
    meta = {"frameWidth": cw, "frameHeight": ch, "baselineRow": ch - 1,
            "frames": {n: {"x": i * cw, "y": 0, "w": cw, "h": ch} for i, n in enumerate(ship)}}
    with open(os.path.join(args.out, "sheet.json"), "w") as f:
        json.dump(meta, f, indent=2)
        f.write("\n")
    print(json.dumps({"canvas": [cw, ch], "palette": len(pal), "frames": report}, indent=1))


if __name__ == "__main__":
    main()
