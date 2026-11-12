"""Project tile stills: the real screen (or, for AI Finance, the real pipeline)
on a flat house-colour ground. Crops come from the original report/screenshot
files in attached_assets/. Run from the repo root:
    python3 design-system/portfolio/asset-work/tiles/build.py
then render with asset-toolkit/html2png.mjs (see README.md)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[4]
A = ROOT / 'attached_assets'
HERE = Path(__file__).parent
SRC = HERE / 'src'
G = Path('/home/claude/ext/gfonts/ofl')  # OFL fonts from github.com/google/fonts
# Paper & Ink palette: yellow and blue grounds alternate; cards are white
INK, CREAM, ORANGE, TEAL = '#000000', '#FFFFFF', '#FFD23F', '#3A66FF'

# slug: (ground, kind, [(file, crop box)])
TILES = {
    'silverlink': (ORANGE, 'bleed', [('silverlink_p21_img0.png', (100, 30, 640, 428))]),
    'scs':        (TEAL,   'bleed', [('scs_p71_img1.png', (0, 0, 1400, 1006))]),
    'uat':        (ORANGE, 'bleed', [('uat_dashboard_full.png', (256, 16, 1440, 922))]),
    'uwb':        (TEAL,   'fit',   [('da_p40_img1.png', (640, 0, 1229, 490))]),
    'firesafety': (TEAL,   'phones', [('firesafety_p29_img5.png', (31, 26, 177, 345)),
                                      ('firesafety_p29_img5.png', (257, 26, 403, 345))]),
}
# Bleed width per tile: how far the screenshot is scaled (sets what stays visible)
BLEED_W = {'silverlink': 1200, 'scs': 1240, 'uat': 1500}

HEAD = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:700;src:url("{(G/'ibmplexmono/IBMPlexMono-Bold.ttf').as_uri()}")}}
@font-face{{font-family:"IBM Plex Sans";font-weight:100 700;font-stretch:85% 100%;src:url("{(G/'ibmplexsans/IBMPlexSans[wdth,wght].ttf').as_uri()}")}}
html,body{{margin:0;width:100vw;height:100vh;overflow:hidden}}
.shot{{position:absolute;border:4px solid {INK};box-shadow:14px 14px 0 {INK};display:block}}
</style></head>'''

def crop(slug, i, f, box):
    out = SRC / f'{slug}-{i}.png'
    Image.open(A / f).convert('RGB').crop(box).save(out)
    return out.as_uri(), box[2] - box[0], box[3] - box[1]

for slug, (ground, kind, parts) in TILES.items():
    imgs = [crop(slug, i, f, b) for i, (f, b) in enumerate(parts)]
    if kind == 'bleed':
        uri, w, h = imgs[0]
        tw = BLEED_W[slug]
        body = f'<img class="shot" src="{uri}" style="left:72px;top:72px;width:{tw}px">'
    elif kind == 'fit':
        uri, w, h = imgs[0]
        th = 540; tw = round(w * th / h)
        body = f'<img class="shot" src="{uri}" style="left:{(1200-tw)//2}px;top:56px;height:{th}px;background:#fff">'
    else:  # phones, side by side, the AR screen first and slightly forward
        th = 720  # bleeds off the bottom: the AR arrows sit in the visible top half
        pieces = []
        for n, (uri, w, h) in enumerate(imgs):
            tw = round(w * th / h)
            left = 180 + n * 470
            top = 40 + n * 48
            pieces.append(f'<img class="shot" src="{uri}" style="left:{left}px;top:{top}px;height:{th}px;z-index:{2-n}">')
        body = ''.join(pieces)
    (HERE / f'{slug}.html').write_text(f'{HEAD}<body style="background:{ground}">{body}</body></html>')

# AI Finance: no confirmed screenshot exists, so the tile shows the real
# pipeline from the case study (5 sources, 2 quality gates, warehouse, NLP brief)
steps = [('5', 'data sources'), ('2', 'quality gates'), ('DB', 'SQLite warehouse'), ('NLP', 'daily risk brief')]
cards = ''
for n, (big, label) in enumerate(steps):
    accent = n == 1  # one accent: the gates are the point of the pipeline
    cards += f'''<div style="position:absolute;left:{60+n*285}px;top:{150 if n%2==0 else 250}px;width:240px;height:240px;
      background:{TEAL if accent else CREAM};border:4px solid {INK};box-shadow:12px 12px 0 {INK};
      display:flex;flex-direction:column;justify-content:space-between;padding:22px;box-sizing:border-box">
      <div style="font:700 {84 if len(big)<3 else 64}px/1 'IBM Plex Mono';letter-spacing:-0.03em;color:{INK}">{big}</div>
      <div style="font:700 condensed 38px/1.05 'IBM Plex Sans';color:{INK}">{label}</div></div>'''
    if n < 3:
        y = (150 if n%2==0 else 250) + 120
        cards += f'<div style="position:absolute;left:{60+n*285+252}px;top:{y+ (50 if n%2==0 else -50)}px;font:700 32px \'IBM Plex Mono\';color:{INK}">&#9654;</div>'
(HERE / 'ai-finance.html').write_text(f'{HEAD}<body style="background:{ORANGE}">{cards}</body></html>')
print('ok', sorted(p.name for p in HERE.glob('*.html')))
