#!/usr/bin/env bash
# Rasterise the UWB chart SVGs at 2x (PNG + lossless WebP). Run from the repo root after build.py.
set -euo pipefail
R="$(git rev-parse --show-toplevel)"
H2P="node $R/.claude/skills/asset-toolkit/scripts/html2png.mjs"
OUT="$R/client/public/assets/case/uwb"
TMP="$(mktemp -d)"
while read -r path size; do
  [[ "$path" == client/* ]] || continue
  name="$(basename "$path" .svg)"
  $H2P "$R/$path" --out "$TMP" --name "$name" --size "$size" --scale 2 >/dev/null
  mv "$TMP/$name-$size.png" "$OUT/$name@2x.png"
done < "$R/design-system/portfolio/asset-work/uwb-charts/sizes.txt"
python3 - "$OUT" <<'PY'
import sys; from pathlib import Path; from PIL import Image
for p in sorted(Path(sys.argv[1]).glob('*@2x.png')):
    im = Image.open(p).convert('RGB'); im.save(p, optimize=True)
    w = p.with_suffix('.webp'); im.save(w, lossless=True, method=6)
    print(p.name, im.size, p.stat().st_size, w.name, w.stat().st_size)
PY
rm -rf "$TMP"
