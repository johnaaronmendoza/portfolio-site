#!/usr/bin/env python3
"""Encode the rendered share image for shipping.

  python3 -I encode_og.py <render.png> <out-dir>

Writes <out-dir>/og-image.png (palette-quantised, optimised, < 300 KB) and
<out-dir>/og-image.jpg (quality 85, 4:4:4 so the orange/teal pixel type keeps clean edges).
"""
import sys
from pathlib import Path
from PIL import Image

src, out = Path(sys.argv[1]), Path(sys.argv[2])
im = Image.open(src).convert("RGB")
assert im.size == (1200, 630), im.size
# Flat colours + antialiased type: 256-colour median-cut keeps edges clean at a fraction of RGB size
q = im.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
q.save(out / "og-image.png", optimize=True)
im.save(out / "og-image.jpg", quality=85, subsampling=0, optimize=True, progressive=True)
for f in ("og-image.png", "og-image.jpg"):
    p = out / f
    print(f, Image.open(p).size, p.stat().st_size, "bytes")
