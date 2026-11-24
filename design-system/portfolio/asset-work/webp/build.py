"""WebP siblings for every raster the site displays (image-delivery audit, 24 Nov 2026).

Run from the repo root:  python3 design-system/portfolio/asset-work/webp/build.py

For each source: `<stem>.webp` at the maximum displayed CSS width (1x) and `<stem>@2x.webp`
at twice that when the source is at least that wide. Never upscales: when the source is
narrower than 1x, the one file is the source's own width; when it sits between 1.2x and 2x,
`<stem>@full.webp` keeps the source's full width (its real density is in results.json).

Encoding: lossy q80 (method 6), and lossless too for flat UI; the smaller file wins.
The two stickers are always lossless (pixel art with alpha; lossy smeared the blue edges).
If the lossy file is over 250 KB, quality steps down by 5 until it fits.
Originals are untouched (they stay the fallback).

MAX_CSS widths were measured in Chromium with Playwright on the dev server, routes / and
/projects/*, viewports 320-1920 px (see results.json and the manifest).
"""
import io
import json
import os
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..'))
A = 'attached_assets'
OUT = 'client/public/assets'
LIMIT = 250 * 1024

# (source, output dir, max displayed CSS width, fit)  fit: 'width' = drawn at full width;
# 'cover-WxH' = drawn on a canvas with object-cover into a box of that aspect, so the
# source's width maps to the box width only after the cover crop (tiles, profile).
JOBS = [
    # SilverLink case (/projects/silverlink)
    (f'{A}/silverlink_p19_img0.png', f'{OUT}/case/silverlink', 873, 'width'),   # hero, shown at natural width (max-w-full)
    (f'{A}/silverlink_p14_img0.png', f'{OUT}/case/silverlink', 1018, 'width'),
    (f'{A}/silverlink_p21_img0.png', f'{OUT}/case/silverlink', 697, 'width'),
    (f'{A}/silverlink_p22_img0.png', f'{OUT}/case/silverlink', 697, 'width'),
    (f'{A}/silverlink_p23_img0.png', f'{OUT}/case/silverlink', 1018, 'width'),  # system_metrics
    # SCS case
    (f'{A}/scs_p65_img0.png', f'{OUT}/case/scs', 353, 'width'),   # portrait hero, 560px tall cap
    (f'{A}/scs_p72_img0.png', f'{OUT}/case/scs', 697, 'width'),
    (f'{A}/scs_p71_img1.png', f'{OUT}/case/scs', 1018, 'width'),
    (f'{A}/scs_p72_img1.png', f'{OUT}/case/scs', 1018, 'width'),
    (f'{A}/scs_p73_img0.png', f'{OUT}/case/scs', 1018, 'width'),
    (f'{A}/scs_p74_img1.png', f'{OUT}/case/scs', 1018, 'width'),
    # Fire Safety case
    (f'{A}/firesafety_p29_img5.png', f'{OUT}/case/firesafety', 331, 'width'),  # portrait hero
    (f'{A}/firesafety_p29_img1.png', f'{OUT}/case/firesafety', 1018, 'width'),
    (f'{A}/firesafety_p29_img2.png', f'{OUT}/case/firesafety', 697, 'width'),
    (f'{A}/firesafety_p29_img3.png', f'{OUT}/case/firesafety', 697, 'width'),
    (f'{A}/firesafety_p29_img4.png', f'{OUT}/case/firesafety', 315, 'width'),  # portrait
    (f'{A}/firesafety_p30_img0.png', f'{OUT}/case/firesafety', 697, 'width'),
    (f'{A}/firesafety_p30_img1.png', f'{OUT}/case/firesafety', 1018, 'width'),
    (f'{A}/firesafety_p30_img3.png', f'{OUT}/case/firesafety', 484, 'width'),  # portrait, 560px cap
    # UAT case
    (f'{A}/uat_dashboard_full.png', f'{OUT}/case/uat', 1018, 'width'),
    (f'{A}/uat_defects.png', f'{OUT}/case/uat', 1018, 'width'),
    (f'{A}/uat_defect_detail.png', f'{OUT}/case/uat', 1018, 'width'),
    (f'{A}/uat_testcases.png', f'{OUT}/case/uat', 1018, 'width'),
    (f'{A}/uat_reports_full.png', f'{OUT}/case/uat', 697, 'width'),
    # UWB case (the four charts are already WebP from SVG; this is the one raster left)
    (f'{A}/da_p39_img2.png', f'{OUT}/case/uwb', 1018, 'width'),
    # Home
    (f'{A}/greenloop_hero.jpg', f'{OUT}/tiles', 525, 'cover-2x1'),      # tile canvas, 2:1 cover
    (f'{A}/john_profile.png', f'{OUT}/about', 202, 'cover-1x1'),        # 208px box minus border; png is the 1200px original of john_profile.jpg
    ('client/public/assets/stickers/retro-computer.png', f'{OUT}/stickers', 80, 'width-h'),  # 80px tall box
    ('client/public/assets/stickers/cursor-arrow.png', f'{OUT}/stickers', 80, 'width-h'),
]


def encode(im, lossless_ok=True, force_lossless=False):
    """Return (bytes, mode) for the smallest acceptable WebP."""
    if force_lossless:
        buf = io.BytesIO()
        im.save(buf, 'WEBP', lossless=True, quality=100, method=6, exact=True)
        return buf.getvalue(), 'lossless'
    cands = []
    q = 80
    while True:
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= LIMIT or q <= 60:
            cands.append((buf.getvalue(), f'lossy q{q}'))
            break
        q -= 5
    if lossless_ok:
        buf = io.BytesIO()
        im.save(buf, 'WEBP', lossless=True, quality=100, method=6)
        if buf.tell() <= LIMIT:
            cands.append((buf.getvalue(), 'lossless'))
    return min(cands, key=lambda c: len(c[0]))


def main():
    results = []
    for src, outdir, css, fit in JOBS:
        im = Image.open(os.path.join(ROOT, src))
        im.load()
        has_alpha = im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').getextrema()[3][0] < 255
        im = im.convert('RGBA' if has_alpha else 'RGB')
        nw, nh = im.size
        # Width of the source that one CSS px of display maps onto
        if fit == 'width-h':          # sized by height: css is the displayed height
            need = css * nw / nh
        elif fit == 'cover-1x1':      # cover into a square: the short side fills the box
            need = css * nw / min(nw, nh)
        elif fit == 'cover-2x1':      # cover into 2:1: a 3:2 source fills by height
            need = css * nw / min(nw, nh * 2)
        else:
            need = css
        need = round(need)
        stem = os.path.splitext(os.path.basename(src))[0]
        targets = [(stem, min(need, nw))]
        if nw >= 2 * need - 2:      # within 2 px of 2x counts as 2x (no upscale)
            targets.append((f'{stem}@2x', min(2 * need, nw)))
        elif nw >= 1.2 * need:
            targets.append((f'{stem}@full', nw))
        os.makedirs(os.path.join(ROOT, outdir), exist_ok=True)
        files = []
        for name, w in targets:
            h = round(nh * w / nw)
            r = im if w == nw else im.resize((w, h), Image.LANCZOS)
            data, mode = encode(r, force_lossless='stickers' in outdir)  # pixel stickers stay exact
            path = f'{outdir}/{name}.webp'
            with open(os.path.join(ROOT, path), 'wb') as f:
                f.write(data)
            files.append({'path': path, 'w': w, 'h': h, 'bytes': len(data), 'mode': mode,
                          'density': round(w / need, 2)})
        results.append({'src': src, 'bytes': os.path.getsize(os.path.join(ROOT, src)),
                        'natural': [nw, nh], 'css': css, 'fit': fit, 'need_1x': need,
                        'upscaled_on_page': nw < need, 'files': files})
        print(src, [nw, nh], 'css', css, '->', [(f['path'].split('/')[-1], f['w'], f['bytes'], f['mode']) for f in files])
    with open(os.path.join(os.path.dirname(__file__), 'results.json'), 'w') as f:
        json.dump(results, f, indent=1)


if __name__ == '__main__':
    main()
