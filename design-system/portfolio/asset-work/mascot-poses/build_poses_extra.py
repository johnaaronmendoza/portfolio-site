#!/usr/bin/env python3
"""Build the four extra Lil Johnny poses (wave, point-right, think, typing).

Reproducible:
  python3 build_poses_extra.py design-system/portfolio/asset-work/references/mascot-poses-sheet-2-unprocessed.webp \
      [--out client/public/assets/mascot/poses] [--debug <dir>]

Source: John's second ChatGPT pose sheet (500 x 141, 4 figures in a row). The figures are
small (about 1.9x the native art pixel vertically on the head, 2.1x on the body, 1.9x across)
and WebP-smeared, so the ChatGPT proportions are also a little off-model (smaller head,
longer legs, chunkier shoes than the hand-made frames).

Pipeline:
  1. TRACE. Split the sheet into its four figures, key on alpha > 128 (large components only),
     snap every pixel to the 17-colour reference palette in CIELAB, then resample to the native
     grid with a piecewise-linear warp anchored on the hand-made art's landmark rows
     (hair top -> row 4, shirt top -> row 38, jeans top -> row 51, soles -> row 64; for the
     sitting figure the body uses the standing figures' mean body scale) and the ear-to-ear
     width (-> 39 px). Each native pixel takes the mode label of a 4 x 4 sub-sample of its
     footprint. The trace is written to --debug for the review sheet; it is the drawing guide.
  2. COMPOSE (hand-clean). Every pose is built on the hand-made idle frame, so head size,
     outline, palette, eyes and cowlick are the original's, pixel for pixel:
       - head (rows 0-37) from lil-johnny-idle.png, cowlick included;
       - wave / point-right: the 6 x 2 smile from lil-johnny-happy.png (graft_smile);
       - think: idle face, no mouth (neutral, as in idle and worry);
       - typing: idle face with the eyes' top row closed, i.e. lids lowered, looking down;
       - torso, legs and any arm that hangs as in idle are kept from idle;
       - the posed limbs (and the whole sitting body for typing) are drawn in code on the
         native grid: polyline limbs with a round brush and disc mittens, positioned from the
         step-1 trace, outlined and shaded by the original's rule (brown skin edge with W
         shade, dark red shirt edge with b shade, dark navy jeans edge; black around the
         laptop and shoes). The wave hand sits ~3 px left of the trace, because the ChatGPT
         head is narrower than the original and the traced spot would cover the ear.
     A tracing check reports, per pose, how many patch pixels agree with the trace.
  3. "?" for think: a 5 x 7 black pixel glyph with a 1 px cream (#F4EAD5, site palette)
     keyline, so it reads on navy as well as on cream (black alone is ~1.2:1 on navy).
  4. PLACE on one shared canvas for these four frames: 47 x 72 (the 47 x 64 canvas plus
     8 rows of headroom for the "?"). Feet on the bottom row (71), centred on the feet,
     as in sheet.png; typing sits on the baseline.
"""
import argparse
import json
import os
import sys
from collections import Counter

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build_poses import (MASCOT, components, graft_smile, reference_palette,  # noqa: E402
                         save_png, smile_stamp, srgb_to_lab)

NAMES = ["wave", "point-right", "think", "typing"]     # sheet order, left -> right
CANVAS_W, CANVAS_H = 47, 72
HEADROOM = CANVAS_H - 64

# one character per palette colour (the 17 colours of lil-johnny-idle.png) + extras
KEY = {
    ".": (0, 0, 0), "k": (15, 15, 15), "g": (28, 28, 28), "s": (84, 84, 84),       # hair / ink
    "K": (11, 39, 64), "R": (32, 76, 115), "r": (52, 102, 148), "S": (78, 117, 150),  # jeans
    "o": (92, 16, 21), "b": (173, 24, 32), "N": (237, 28, 36),                     # shirt
    "B": (112, 57, 26), "n": (204, 129, 82), "W": (247, 162, 107), "p": (255, 223, 174),  # skin
    "l": (245, 108, 133), "w": (255, 255, 255),                                    # blush, eye
    "c": (244, 234, 213),    # EXTRA: site cream #F4EAD5, only as the "?" keyline
}
RGB2KEY = {v: k for k, v in KEY.items()}
OUTLINE_KEYS = {"hair": ".", "skin": "B", "shirt": "o", "jeans": "K"}


# ---------------------------------------------------------------- 1. trace
def figure_labels(sheet_path, pal):
    """Palette-label image of the whole sheet (-1 = transparent) and the 4 figure column spans."""
    src = np.asarray(Image.open(sheet_path).convert("RGBA"))
    mask = src[..., 3] > 128
    lab, sizes = components(mask)
    big = np.isin(lab, np.nonzero(sizes > 300)[0]) & mask          # drops the "?" and specks
    d = ((srgb_to_lab(src[..., :3])[:, :, None, :] - srgb_to_lab(pal)[None, None]) ** 2).sum(-1)
    L = d.argmin(-1).astype(np.int16)
    L[~big] = -1
    cols = np.nonzero(big.any(0))[0]
    spans, s, p = [], cols[0], cols[0]
    for c in cols[1:]:
        if c != p + 1:
            spans.append((int(s), int(p) + 1))
            s = c
        p = c
    spans.append((int(s), int(p) + 1))
    assert len(spans) == 4, spans
    return L, spans


def anchors(L, span, keyidx):
    x0, x1 = span
    Lf = L[:, x0:x1]
    rows = np.nonzero((Lf >= 0).any(1))[0]
    hair_ids = [keyidx[k] for k in "kgs."]
    red_ids = [keyidx[k] for k in "Nbo"]
    jean_ids = [keyidx[k] for k in "KRrS"]
    skin_ids = [keyidx[k] for k in "pWnB"]
    hair = next(y for y in rows if np.isin(Lf[y], hair_ids).sum() >= 12)
    red = next(y for y in rows if np.isin(Lf[y], red_ids).sum() >= 14)
    jean = next((y for y in rows if y > red and np.isin(Lf[y], jean_ids).sum() >= 14), None)
    sh = (red - hair) / 34.0
    band = Lf[int(hair + 20 * sh):int(hair + 24 * sh)]           # idle rows 24-28: the ears
    xs = np.nonzero(np.isin(band, skin_ids + hair_ids).any(0))[0]
    return dict(x0=x0, x1=x1, bot=int(rows.max()) + 1, hair=int(hair), red=int(red),
                jean=None if jean is None else int(jean),
                earL=x0 + int(xs.min()), earR=x0 + int(xs.max()) + 1)


def vmap(a, body_scale):
    """(source row edge, native row edge) anchor pairs; piecewise linear, extrapolated."""
    sh = (a["red"] - a["hair"]) / 34.0
    if a["bot"] - a["red"] > 48:                                       # standing
        return [(a["hair"] - 10 * sh, -6), (a["hair"], 4), (a["red"], 38),
                (a["jean"], 51), (a["bot"], 64)]
    return [(a["hair"] - 10 * sh, -6), (a["hair"], 4), (a["red"], 38),   # sitting
            (a["bot"], 38 + (a["bot"] - a["red"]) / body_scale)]


def _inv(pts, n):
    s = np.array([p[0] for p in pts], float)
    t = np.array([p[1] for p in pts], float)
    if n < t[0]:
        return s[0] + (n - t[0]) * (s[1] - s[0]) / (t[1] - t[0])
    if n > t[-1]:
        return s[-1] + (n - t[-1]) * (s[-1] - s[-2]) / (t[-1] - t[-2])
    return float(np.interp(n, t, s))


def trace(L, a, body_scale, sub=4, inset=0.12):
    """Native-grid label map in idle coordinates: dict (y, x) -> palette index."""
    pts = vmap(a, body_scale)
    sx = (a["earR"] - a["earL"]) / 39.0
    cx = (a["earR"] + a["earL"]) / 2.0
    out = {}
    n_top = -10
    n_bot = int(np.ceil(pts[-1][1]))
    m0 = int(np.floor(19.5 + (a["x0"] - cx) / sx)) - 1
    m1 = int(np.ceil(19.5 + (a["x1"] - cx) / sx)) + 1
    uv = np.linspace(inset, 1 - inset, sub)
    for n in range(n_top, n_bot):
        y0, y1 = _inv(pts, n), _inv(pts, n + 1)
        for m in range(m0, m1):
            xa, xb = cx + (m - 19.5) * sx, cx + (m + 1 - 19.5) * sx
            vals = []
            for u in uv:
                yy = int(np.floor(y0 + (y1 - y0) * u))
                for v in uv:
                    xx = int(np.floor(xa + (xb - xa) * v))
                    ok = 0 <= yy < L.shape[0] and a["x0"] - 2 <= xx < min(a["x1"] + 2, L.shape[1])
                    vals.append(int(L[yy, xx]) if ok else -1)
            v, c = np.unique(vals, return_counts=True)
            if v[c.argmax()] >= 0:
                out[(n, m)] = int(v[c.argmax()])
    return out


# ---------------------------------------------------------------- 2. compose
def load_frame(name):
    """A hand-made frame as dict (y, x) -> key char, idle coordinates."""
    a = np.asarray(Image.open(os.path.join(MASCOT, f"lil-johnny-{name}.png")).convert("RGBA"))
    return {(y, x): RGB2KEY[tuple(int(v) for v in a[y, x, :3])]
            for y in range(a.shape[0]) for x in range(a.shape[1]) if a[y, x, 3] == 255}


# ---- limbs drawn in code on the native grid (idle coordinates: col 0..38, row 0..63).
# Coordinates are read off the step-1 trace; a limb is a polyline with a round brush, a hand
# is a disc. Outline and shading follow the hand-made arms: brown (B) silhouette edge, light
# skin (p) fill, mid skin (W) on the shaded side; sleeves: dark red (o) edge, red (N) fill,
# dark (b) shade.
def _seg_dist(px_, py_, ax, ay, bx, by):
    vx, vy = bx - ax, by - ay
    t = 0.0 if vx == vy == 0 else max(0.0, min(1.0, ((px_ - ax) * vx + (py_ - ay) * vy) / (vx * vx + vy * vy)))
    return np.hypot(px_ - (ax + t * vx), py_ - (ay + t * vy))


def shape(strokes):
    """strokes: list of (polyline [(x, y), ...], radius). Returns the set of covered pixels."""
    cells = set()
    for pts, r in strokes:
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        for y in range(int(min(ys) - r) - 1, int(max(ys) + r) + 2):
            for x in range(int(min(xs) - r) - 1, int(max(xs) + r) + 2):
                cx, cy = x + 0.5, y + 0.5
                if len(pts) == 1:
                    d = np.hypot(cx - pts[0][0], cy - pts[0][1])
                else:
                    d = min(_seg_dist(cx, cy, *pts[i], *pts[i + 1]) for i in range(len(pts) - 1))
                if d <= r:
                    cells.add((y, x))
    return cells


def paint(px, cells, fill, edge, shade, shade_dir=(0, 1), behind=None):
    """Paint a part: edge colour on its silhouette, shade where the next pixel in shade_dir
    is edge, fill elsewhere. behind: set of pixels it must not cover (drawn behind them)."""
    cells = set(cells) - (behind or set())
    is_edge = {c for c in cells if any((c[0] + dy, c[1] + dx) not in cells
                                       for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)))}
    for c in cells:
        if c in is_edge:
            px[c] = edge
        elif (c[0] + shade_dir[0], c[1] + shade_dir[1]) in is_edge:
            px[c] = shade
        else:
            px[c] = fill
    return cells


def skin(px, strokes, shade_dir=(0, 1), behind=None):
    return paint(px, shape(strokes), "p", "B", "W", shade_dir, behind)


def sleeve(px, strokes, shade_dir=(1, 0), behind=None):
    return paint(px, shape(strokes), "N", "o", "b", shade_dir, behind)


def erase_arm(px, side):
    """Remove an idle arm (skin below the sleeve) and close the sleeve with a hem row."""
    cols = range(4, 12) if side == "left" else range(27, 35)
    for y in range(45, 54):
        for x in cols:
            if px.get((y, x)) in ("B", "p", "W", "n"):
                del px[(y, x)]
    hem = range(8, 12) if side == "left" else range(27, 31)
    for x in hem:
        if (44, x) in px:
            px[(45, x)] = "o"


def head_variant(face):
    px = load_frame("idle")
    if face == "down":
        # looking down: both hand-made 3 x 5 eyes (rows 27-31, highlight top-left) move down one
        # row; the vacated top row takes the face colour around it (W on row 27)
        eyes = {(y, x): ch for (y, x), ch in px.items() if 27 <= y <= 31 and 8 <= x <= 30 and ch in ".w"}
        assert len(eyes) == 30, len(eyes)
        for (y, x) in eyes:
            px[(y, x)] = "W" if y == 27 else "p"
        for (y, x), ch in eyes.items():
            px[(y + 1, x)] = ch
    return px


def head_px():
    """Pixels of the idle head (everything above the shirt, incl. hair tufts), for 'behind'."""
    return {k for k, ch in load_frame("idle").items() if k[0] <= 38 and ch not in "obN"}


def mirror_x(strokes):
    return [([(39 - x, y) for x, y in pts], r) for pts, r in strokes]


# Limb geometry (x, y in idle pixel units; pixel (y, x) has its centre at x + 0.5, y + 0.5).
WAVE = {   # viewer's-left arm raised: sleeve out to the elbow, forearm up, open hand by the cheek
    "sleeve": [([(10.0, 42.2), (6.6, 43.8)], 2.2)],
    "arm": [([(5.0, 44.2), (1.0, 38.4)], 2.4), ([(-0.4, 35.4)], 3.3)],
}
POINT = {  # viewer's-right arm straight out at shoulder height, index finger to the right
    "sleeve": [([(28.0, 41.8), (31.0, 41.8)], 2.4)],
    "arm": [([(34.6, 41.8)], 3.2), ([(37.0, 40.5), (41.6, 40.5)], 1.0)],
}
THINK = {  # viewer's-left hand up under the chin, viewer's-right hand on the hip
    "arm_l": [([(8.6, 46.0), (14.4, 41.4)], 2.4), ([(16.2, 40.0)], 3.0)],
    "arm_r": [([(29.6, 44.6), (32.6, 46.6)], 2.0), ([(32.6, 46.6), (28.4, 49.2)], 2.0),
              ([(27.6, 49.4)], 2.5)],
}
TYPING = {  # sitting cross-legged, laptop on the lap (left half; mirrored about x = 19.5)
    "legs": [([(19.0, 55.0), (8.0, 54.2)], 3.0), ([(5.6, 53.8)], 4.2)],   # thigh + rounded knee
    "shoes": [([(15.4, 57.0), (17.2, 57.0)], 2.1)],
    "sleeve": [([(9.8, 42.4), (8.8, 45.0)], 2.2)],
    "arm": [([(8.6, 46.0), (11.8, 47.4)], 2.0)],
    "laptop": (12, 43, 28, 52),          # x0, y0, x1, y1 (exclusive), black outline
}


def compose(name):
    if name == "wave":
        px = load_frame("idle")
        erase_arm(px, "left")
        sleeve(px, WAVE["sleeve"], behind=head_px())
        skin(px, WAVE["arm"], behind=head_px())
        return px, "smile"
    if name == "point-right":
        px = load_frame("idle")
        erase_arm(px, "right")
        sleeve(px, POINT["sleeve"])
        skin(px, POINT["arm"])
        return px, "smile"
    if name == "think":
        px = load_frame("idle")
        erase_arm(px, "left")
        erase_arm(px, "right")
        skin(px, THINK["arm_l"])
        skin(px, THINK["arm_r"])
        return px, "idle"
    if name == "typing":
        px = {k: v for k, v in head_variant("down").items() if k[0] <= 48}
        erase_arm(px, "left")
        erase_arm(px, "right")
        for pts, r in [(TYPING["legs"], 0), (mirror_x(TYPING["legs"]), 0)]:
            paint(px, shape(pts), "r", "K", "R", (1, 0))
        for pts in (TYPING["shoes"], mirror_x(TYPING["shoes"])):
            paint(px, shape(pts), "g", ".", "k", (1, 0))
        for side in (lambda s: s, mirror_x):
            sleeve(px, side(TYPING["sleeve"]))
            skin(px, side(TYPING["arm"]))
        x0, y0, x1, y1 = TYPING["laptop"]
        for y in range(y0, y1):
            for x in range(x0, x1):
                edge = y in (y0, y1 - 1) or x in (x0, x1 - 1)
                px[(y, x)] = "." if edge else ("S" if y == y1 - 2 else "K")
        cx, cy = (x0 + x1) // 2, (y0 + y1 - 2) // 2                  # 2 x 2 logo, centred
        for y in (cy - 1, cy):
            for x in (cx - 1, cx):
                px[(y, x)] = "S"
        return px, "down"
    raise KeyError(name)


QMARK = [            # 5 x 7, black ink
    " ... ",
    ".   .",
    "    .",
    "   . ",
    "  .  ",
    "     ",
    "  .  ",
]


def add_qmark(canvas, top, left, keyline=True):
    """Paint the '?' on the RGBA canvas; keyline = 1 px cream ring (8-connected) around the ink."""
    ink = [(top + y, left + x) for y, row in enumerate(QMARK) for x, ch in enumerate(row) if ch == "."]
    if keyline:
        ring = {(y + dy, x + dx) for y, x in ink for dy in (-1, 0, 1) for dx in (-1, 0, 1)} - set(ink)
        for y, x in ring:
            assert canvas[y, x, 3] == 0, ("? keyline overlaps the figure", y, x)
            canvas[y, x] = (*KEY["c"], 255)
    for y, x in ink:
        canvas[y, x] = (*KEY["."], 255)


def to_rgba(px):
    ys = [y for y, _ in px]
    xs = [x for _, x in px]
    y0, x0 = min(ys), min(xs)
    a = np.zeros((max(ys) - y0 + 1, max(xs) - x0 + 1, 4), np.uint8)
    for (y, x), ch in px.items():
        a[y - y0, x - x0] = (*KEY[ch], 255)
    return a, y0, x0


def feet_centre_px(px, rows=4):
    bot = max(y for y, _ in px)
    xs = [x for (y, x) in px if y > bot - rows]
    return (min(xs) + max(xs) + 1) / 2.0, bot


def check_outline(px):
    """Silhouette-edge pixels whose colour is not an outline colour (should be none)."""
    bad = []
    for (y, x), ch in px.items():
        edge = any((y + dy, x + dx) not in px for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        if edge and ch not in ".kgBoKs":
            bad.append((y, x, ch))
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("--out", default=os.path.join(MASCOT, "poses"))
    ap.add_argument("--debug", default=None, help="dir for trace PNGs and pre-canvas frames")
    ap.add_argument("--no-keyline", action="store_true", help="black '?' without the cream ring")
    args = ap.parse_args()

    pal = reference_palette()
    keys = [RGB2KEY[tuple(int(v) for v in c)] for c in pal]
    keyidx = {k: i for i, k in enumerate(keys)}
    L, spans = figure_labels(args.sheet, pal)
    A = [anchors(L, s, keyidx) for s in spans]
    body_scale = float(np.mean([(a["bot"] - a["red"]) / 26.0 for a in A[:3]]))
    traces = {n: trace(L, a, body_scale) for n, a in zip(NAMES, A)}

    stamp = smile_stamp()
    report, placed = {}, {}
    for name in NAMES:
        px, face = compose(name)
        tr = traces[name]
        rgba, y0, x0 = to_rgba(px)
        if face == "smile":
            rgba = graft_smile(rgba, stamp)
        cx, bot = feet_centre_px(px)
        canvas = np.zeros((CANVAS_H, CANVAS_W, 4), np.uint8)
        dx = int(round(CANVAS_W / 2.0 - cx))
        dy = (CANVAS_H - 1) - bot
        h, w = rgba.shape[:2]
        ty, tx = y0 + dy, x0 + dx
        assert tx >= 0 and tx + w <= CANVAS_W and ty >= 0, (name, tx, ty, w, h)
        canvas[ty:ty + h, tx:tx + w] = rgba
        if name == "think":
            # above the head, right of the cowlick (idle cols 25-29), clear of the hair
            add_qmark(canvas, top=1, left=25 + dx, keyline=not args.no_keyline)
        placed[name] = canvas
        save_png(canvas, os.path.join(args.out, f"{name}.png"))
        # tracing agreement: pixels changed from idle vs the trace (same colour family counts)
        fam = {c: f for f, cs in {"hair": ".kgs", "jeans": "KRrS", "shirt": "obN",
                                  "skin": "BnWpl", "eye": "w"}.items() for c in cs}
        idle = load_frame("idle")
        changed = [k for k in px if idle.get(k) != px[k]]
        agree = sum(1 for k in changed if k in tr and fam.get(keys[tr[k]]) == fam.get(px[k]))
        report[name] = {"offset_xy": [dx, dy], "pixels_changed_from_idle": len(changed),
                        "changed_pixels_matching_trace_family": round(agree / max(1, len(changed)), 2),
                        "outline_violations": len(check_outline(px))}
        if args.debug:
            os.makedirs(args.debug, exist_ok=True)
            t = np.zeros((CANVAS_H, CANVAS_W, 4), np.uint8)
            for (y, x), i in tr.items():
                yy, xx = y + dy, x + dx
                if 0 <= yy < CANVAS_H and 0 <= xx < CANVAS_W:
                    t[yy, xx] = (*pal[i], 255)
            Image.fromarray(t, "RGBA").save(os.path.join(args.debug, f"trace-{name}.png"))

    strip = np.concatenate([placed[n] for n in NAMES], axis=1)
    save_png(strip, os.path.join(args.out, "sheet-extra.png"))
    meta = {"frameWidth": CANVAS_W, "frameHeight": CANVAS_H, "baselineRow": CANVAS_H - 1,
            "note": "Own canvas: 47x72 = the 47x64 pose canvas plus 8 rows of headroom on top. "
                    "Same scale, baseline row and feet-centring as sheet.json, so a frame from "
                    "either sheet lines up when both are bottom-aligned.",
            "frames": {n: {"x": i * CANVAS_W, "y": 0, "w": CANVAS_W, "h": CANVAS_H}
                       for i, n in enumerate(NAMES)}}
    with open(os.path.join(args.out, "sheet-extra.json"), "w") as f:
        json.dump(meta, f, indent=2)
        f.write("\n")
    print(json.dumps({"canvas": [CANVAS_W, CANVAS_H], "body_scale": round(body_scale, 3),
                      "anchors": A, "frames": report}, indent=1, default=int))


if __name__ == "__main__":
    main()
