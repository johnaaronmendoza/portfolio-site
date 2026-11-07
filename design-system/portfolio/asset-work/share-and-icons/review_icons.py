#!/usr/bin/env python3
"""Review sheets for the icon set: mock browser tab strips and home-screen masks.

  python3 -I review_icons.py <review-dir> <icons-dir>

tabs.png   light and dark tab strips at 1x (16 px icon) and 2x (32 px icon), each candidate in
           its own tab, then the whole sheet scaled x3 nearest so single pixels are visible.
masks.png  apple-touch-icon in the iOS rounded square, icon-512-maskable in circle and squircle.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

rev, icons = Path(sys.argv[1]), Path(sys.argv[2])
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

CANDS = [
    ("orange, seam (ship)", icons / "favicon-16x16.png", icons / "favicon-32x32.png"),
    ("ship svg in chromium", rev / "new-favicon-chromium-16x16.png", rev / "new-favicon-chromium-32x32.png"),
    ("orange, ink strip", rev / "cand-ink-16.png", rev / "cand-ink-32.png"),
    ("orange, dark strip", rev / "cand-shade-16.png", rev / "cand-shade-32.png"),
    ("black cap, orange >_", rev / "cand-blackcap-16.png", rev / "cand-blackcap-32.png"),
    ("before: blue", rev / "before/favicon-16x16.png", rev / "before/favicon-32x32.png"),
]
THEMES = [("light", "#DEE1E6", "#FFFFFF", "#202124"), ("dark", "#202124", "#35363A", "#E8EAED")]


def strip(scale, theme):
    _, bar, tab, text = theme
    tw, th = 150 * scale, 34 * scale
    im = Image.new("RGB", (len(CANDS) * (tw + 4 * scale) + 8 * scale, th + 8 * scale), bar)
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(FONT, 11 * scale)
    for i, (name, p16, p32) in enumerate(CANDS):
        x = 8 * scale + i * (tw + 4 * scale)
        d.rectangle([x, 8 * scale, x + tw, 8 * scale + th], fill=tab)
        ic = Image.open(p16 if scale == 1 else p32).convert("RGBA")
        im.paste(ic, (x + 10 * scale, 8 * scale + (th - ic.height) // 2), ic)
        d.text((x + 32 * scale, 8 * scale + th // 2), name, fill=text, font=f, anchor="lm")
    return im


rows = [strip(s, t) for s in (1, 2) for t in THEMES]
w = max(r.width for r in rows)
sheet = Image.new("RGB", (w, sum(r.height for r in rows) + 10 * len(rows)), "#808080")
y = 0
for r in rows:
    sheet.paste(r, (0, y)); y += r.height + 10
sheet.resize((sheet.width * 2, sheet.height * 2), Image.Resampling.NEAREST).save(rev / "tabs.png")


def masked(img, size, radius_frac=None, circle=False, bg="#F2F2F7"):
    img = img.convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    if circle:
        d.ellipse([0, 0, size - 1, size - 1], fill=255)
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_frac), fill=255)
    out = Image.new("RGB", (size + 40, size + 40), bg)
    out.paste(img, (20, 20), m)
    return out


apple = Image.open(icons / "apple-touch-icon.png")
mask = Image.open(icons / "icon-512-maskable.png")
anyi = Image.open(icons / "icon-512.png")
tiles = [masked(apple, 180, 0.2237), masked(apple, 180, 0.2237, bg="#1C1C1E"), masked(apple, 60, 0.2237),
         masked(mask, 180, circle=True), masked(mask, 180, 0.3), masked(anyi, 180, 0.2237)]
W2 = sum(t.width for t in tiles) + 10 * len(tiles)
H2 = max(t.height for t in tiles)
sh = Image.new("RGB", (W2, H2), "#808080")
x = 0
for t in tiles:
    sh.paste(t, (x, (H2 - t.height) // 2)); x += t.width + 10
sh.save(rev / "masks.png")
print(rev / "tabs.png", rev / "masks.png")
