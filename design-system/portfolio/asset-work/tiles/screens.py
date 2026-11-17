"""Tile stills for the Home tiles' browser.exe windows (John, 17 Nov 2026):
one fixed 2:1 crop for every tile, the bare screen with no ground, border or
shadow (the page draws the window). Each crop keeps the full width of the
screen and ends in a gap between rows, so no word is cut. Run from the repo root
(see README.md): `--html` writes uwb-thumb.html (the matrix SVG on paper) to
render first; without it, the crops are written.
    python3 design-system/portfolio/asset-work/tiles/screens.py"""
import sys
from pathlib import Path
from PIL import Image

if '--html' in sys.argv:
    (Path(__file__).parent / 'uwb-thumb.html').write_text(
        '<!doctype html><html><head><meta charset="utf-8"><style>'
        'html,body{margin:0;width:100vw;height:100vh;overflow:hidden;background:#fff;display:grid;place-items:center}'
        'img{height:92vh;display:block}</style></head>'
        '<body><img src="../uwb-charts/tile-matrix-svm.svg" alt=""></body></html>\n')
    sys.exit()

ROOT = Path(__file__).resolve().parents[4]
A = ROOT / 'attached_assets'
R = Path(__file__).parent / 'renders'

# slug: (source, crop box at 2:1)
CROPS = {
    'silverlink': (A / 'silverlink_p21_img0.png', (30, 0, 600, 285)),   # nav to the first session; Event Actions
    'scs':        (A / 'scs_p71_img1.png', (0, 3, 1884, 945)),          # under the glow line, to the gap after row 4
    'uat':        (A / 'uat_dashboard_full.png', (0, 0, 1440, 720)),    # sidebar, KPI rows, top of the charts
    'uwb':        (R / 'uwb-thumb-1200x600.png', (0, 0, 1200, 600)),    # the SVM-RBF matrix on paper
    'ai-finance': (R / 'ai-finance-1200x660.png', (0, 30, 1200, 630)),  # the pipeline (no screenshot exists)
    'firesafety': (R / 'firesafety-1200x660.png', (0, 30, 1200, 630)),  # the two AR Drill phones
}

for slug, (src, box) in CROPS.items():
    im = Image.open(src).convert('RGB').crop(box)
    assert abs(im.width - 2 * im.height) <= 1, (slug, im.size)
    if im.width > 1200:
        im = im.resize((1200, 600), Image.LANCZOS)
    im.save(A / f"tile_{slug.replace('-', '_')}.webp", quality=82, method=6)
    print(slug, im.size)
