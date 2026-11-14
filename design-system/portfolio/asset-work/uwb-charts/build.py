"""UWB case-study charts, rebuilt in Paper & Ink from the figures already on the site.

Replaces the default-matplotlib charts (attached_assets/da_p40_img1.png, da_p41_img1.png;
both kept, untouched). Every number below is copied from client/src/pages/UWBProject.tsx
(alt text / stats) - see DATA. Nothing is computed or invented.

Run from anywhere:
    python3 design-system/portfolio/asset-work/uwb-charts/build.py
Writes self-contained SVGs (subset Plex fonts embedded, so they render inside <img>) to
client/public/assets/case/uwb/ and the tile matrix to ./tile-matrix-svm.svg. Rasterise with
render.sh (2x PNG + WebP).

Display widths (CaseLayout max-w-5xl, window border 3px):
  desktop art: 570-1018 CSS px (640px viewport up)  -> drawn at 1018 wide, smallest text 22
               (>= 12.3px at 570)
  mobile art:  337-601 CSS px (below 640px)         -> drawn at 360 wide, smallest text 13
               (>= 12.2px at 337)
"""
import base64, io
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib import instancer

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
OUT = ROOT / 'client/public/assets/case/uwb'
OUT.mkdir(parents=True, exist_ok=True)
FONTS = ROOT / 'design-system/portfolio/ui/2026-11-13/fonts'

# Paper & Ink (CLAUDE.md). Yellow is AI only, so it is not used here.
INK, TEXT, PAPER, BLUE = '#000000', '#111111', '#FFFFFF', '#3A66FF'

# ---- DATA: copied from client/src/pages/UWBProject.tsx -------------------------------
# l.29 alt: "Logistic regression: 3,809 and 3,394 correct, 391 and 806 wrong.
#            SVM-RBF: 3,928 and 3,599 correct, 272 and 601 wrong."
# Cell positions (row = true, col = predicted) and class labels from the original chart
# da_p40_img1.png: [[3809, 391], [806, 3394]] and [[3928, 272], [601, 3599]].
# Check: each row sums to 4,200; correct 7,203 / 7,527 of 8,400 = caption l.28.
CLASSES = ['LOS+NLOS (0)', 'NLOS+NLOS (1)']
CM = {
    'Logistic regression': [[3809, 391], [806, 3394]],
    'SVM-RBF': [[3928, 272], [601, 3599]],
}
ROW_TOTAL = 4200
# l.17 alt: "accuracy 0.8575 vs 0.8961, precision 0.8967 vs 0.9297, recall 0.8081 vs 0.8569,
#            F1 0.8501 vs 0.8918. Range RMSE 1.7566 m for path 1 and path 2."
METRICS = [  # (label, LR, SVM-RBF) - strings kept exactly as stated
    ('Accuracy', '0.8575', '0.8961'),
    ('Precision', '0.8967', '0.9297'),
    ('Recall', '0.8081', '0.8569'),
    ('F1-score', '0.8501', '0.8918'),
]
RMSE = [('Path 1 (RANGE)', '1.7566'), ('Path 2 (RANGE_2)', '1.7566')]

# ---- text + fonts --------------------------------------------------------------------
USED = {'sans': set(), 'mono': set(), 'num': set()}


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def text(x, y, s, cls, size, anchor='start', extra=''):
    USED[cls].update(s)
    return (f'<text x="{x:g}" y="{y:g}" class="{cls}" font-size="{size}" '
            f'text-anchor="{anchor}"{extra}>{esc(s)}</text>')


def woff2(path, chars, axes=None):
    f = TTFont(path)
    if axes:
        f = instancer.instantiateVariableFont(f, axes)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga']
    s = subset.Subsetter(opts)
    s.populate(text=''.join(sorted(chars)) + ' ')
    s.subset(f)
    buf = io.BytesIO()
    f.flavor = 'woff2'
    f.save(buf)
    return base64.b64encode(buf.getvalue()).decode()


def style(used):
    faces = [
        ('PlexSansCond', 700, woff2(FONTS / 'PlexSans-var.woff2', used['sans'], {'wght': 700, 'wdth': 85})),
        ('PlexMono', 600, woff2(FONTS / 'PlexMono-600.woff2', used['mono'])),
        ('PlexMono', 700, woff2(FONTS / 'PlexMono-700.woff2', used['num'])),
    ]
    css = ''.join(f'@font-face{{font-family:"{n}";font-weight:{w};src:url(data:font/woff2;base64,{b}) format("woff2")}}'
                  for n, w, b in faces)
    css += (f'.sans{{font-family:"PlexSansCond","IBM Plex Sans",sans-serif;font-weight:700;fill:{TEXT}}}'
            f'.mono{{font-family:"PlexMono","IBM Plex Mono",monospace;font-weight:600;fill:{TEXT}}}'
            f'.num{{font-family:"PlexMono","IBM Plex Mono",monospace;font-weight:700;fill:{INK}}}')
    return f'<style>{css}</style>'


def svg(w, h, body, title, desc):
    USED['sans'].update(title)  # not drawn; harmless
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-labelledby="t d"><title id="t">{esc(title)}</title><desc id="d">{esc(desc)}</desc>'
            f'@@STYLE@@<rect width="{w}" height="{h}" fill="{PAPER}"/>{body}</svg>')


def rect(x, y, w, h, fill, sw=3):
    # stroke drawn inside the box so adjoining cells share one 3px line
    return (f'<rect x="{x + sw / 2:g}" y="{y + sw / 2:g}" width="{w - sw:g}" height="{h - sw:g}" '
            f'fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>')


def line(x1, y1, x2, y2, sw=2):
    return f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" stroke="{INK}" stroke-width="{sw}"/>'


def tint(v):
    """Cell fill: paper (0) -> blue #3A66FF (all 4,200 in the row). Ink text passes AA on every
    step: black on #3A66FF is 4.52:1 and contrast only rises toward paper."""
    t = v / ROW_TOTAL
    b = (0x3A, 0x66, 0xFF)
    return '#' + ''.join(f'{round(255 + (c - 255) * t):02X}' for c in b)


def fmt(n):
    return f'{n:,}'


# ---- confusion matrix block ------------------------------------------------------------
def matrix(x, y, cell, m, num_size, sw=3):
    out = []
    for r in range(2):
        for c in range(2):
            v = m[r][c]
            cx, cy = x + c * (cell - sw), y + r * (cell - sw)
            out.append(rect(cx, cy, cell, cell, tint(v), sw))
            out.append(text(cx + cell / 2, cy + cell / 2 + num_size * 0.36, fmt(v), 'num', num_size, 'middle'))
    return ''.join(out), 2 * cell - sw


def rot_label(x, y, s, size):
    USED['mono'].update(s)
    return (f'<text transform="translate({x:g} {y:g}) rotate(-90)" class="mono" font-size="{size}" '
            f'text-anchor="middle">{esc(s)}</text>')


def class_label(x, y, s, size, anchor, two_line, lh):
    if not two_line:
        return text(x, y, s, 'mono', size, anchor)
    a, b = s.split(' ')
    return text(x, y - lh / 2, a, 'mono', size, anchor) + text(x, y + lh / 2, b, 'mono', size, anchor)


CM_DESC = ('Two confusion matrices, rows true label, columns predicted label, classes LOS+NLOS (0) and '
           'NLOS+NLOS (1). Logistic regression: 3,809 and 3,394 correct, 391 and 806 wrong. '
           'SVM-RBF: 3,928 and 3,599 correct, 272 and 601 wrong. Darker blue cells hold more samples.')


def confusion_desktop():
    W, cell, gap, sw = 1018, 160, 64, 3
    LAB, TT, NUM = 22, 28, 40
    rowlab = len(CLASSES[1]) * LAB * 0.6  # mono advance 0.6em
    block = 30 + rowlab + 14 + (2 * cell - sw) * 2 + gap
    xs = (W - block) / 2
    mx = [xs + 30 + rowlab + 14]
    mx.append(mx[0] + 2 * cell - sw + gap)
    my = 72
    body = []
    side = 2 * cell - sw
    for i, (name, m) in enumerate(CM.items()):
        body.append(text(mx[i], 44, name, 'sans', TT))
        g, _ = matrix(mx[i], my, cell, m, NUM, sw)
        body.append(g)
        for c in range(2):
            body.append(class_label(mx[i] + c * (cell - sw) + cell / 2, my + side + 30 + 13, CLASSES[c], LAB, 'middle', True, 26))
        body.append(text(mx[i] + side / 2, my + side + 30 + 26 + 40, 'Predicted label', 'mono', LAB, 'middle'))
    for r in range(2):
        body.append(text(mx[0] - 14, my + r * (cell - sw) + cell / 2 + LAB * 0.36, CLASSES[r], 'mono', LAB, 'end'))
    body.append(rot_label(xs + 18, my + side / 2, 'True label', LAB))
    H = my + side + 30 + 26 + 40 + 24
    return svg(W, H, ''.join(body), 'Confusion matrices: logistic regression and SVM-RBF', CM_DESC), W, H


def confusion_mobile():
    W, P, sw = 360, 16, 3
    LAB, TT, NUM, LH = 13, 18, 26, 16
    rowlab = len('NLOS+NLOS') * LAB * 0.6
    mx = P + 20 + rowlab + 8
    cell = (W - P - mx + sw) / 2
    side = 2 * cell - sw
    body, y = [], P
    for i, (name, m) in enumerate(CM.items()):
        body.append(text(mx, y + TT, name, 'sans', TT))
        my = y + TT + 12
        g, _ = matrix(mx, my, cell, m, NUM, sw)
        body.append(g)
        for r in range(2):
            body.append(class_label(mx - 8, my + r * (cell - sw) + cell / 2 + LAB * 0.36, CLASSES[r], LAB, 'end', True, LH))
        body.append(rot_label(P + 10, my + side / 2, 'True label', LAB))
        for c in range(2):
            body.append(class_label(mx + c * (cell - sw) + cell / 2, my + side + 20 + LH / 2, CLASSES[c], LAB, 'middle', True, LH))
        body.append(text(mx + side / 2, my + side + 20 + LH + 26, 'Predicted label', 'mono', LAB, 'middle'))
        y = my + side + 20 + LH + 26 + (36 if i == 0 else 0)
    H = round(y + P)
    return svg(W, H, ''.join(body), 'Confusion matrices: logistic regression and SVM-RBF', CM_DESC), W, H


# ---- model comparison -------------------------------------------------------------------
CMP_DESC = ('Horizontal bar charts on a 0 to 1 score axis. Logistic regression (white bars) vs SVM-RBF '
            '(blue bars): accuracy 0.8575 vs 0.8961, precision 0.8967 vs 0.9297, recall 0.8081 vs 0.8569, '
            'F1 0.8501 vs 0.8918. Range RMSE (black bars, 0 to 2 metre axis): 1.7566 m for path 1 and path 2.')


def legend(x, y, sq, size, gap):
    out = [rect(x, y - sq + 2, sq, sq, PAPER), text(x + sq + 8, y, 'Logistic regression', 'mono', size)]
    x2 = x + sq + 8 + len('Logistic regression') * size * 0.6 + gap
    out += [rect(x2, y - sq + 2, sq, sq, BLUE), text(x2 + sq + 8, y, 'SVM-RBF', 'mono', size)]
    return ''.join(out)


def axis(x0, x1, y, ticks, vmax, size, title, tick_len=8, title_dy=None):
    out = [line(x0, y, x1, y, 3)]
    for t in ticks:
        tx = x0 + (x1 - x0) * float(t) / vmax
        out.append(line(tx, y, tx, y + tick_len, 2))
        out.append(text(tx, y + tick_len + size + 2, t, 'mono', size, 'middle'))
    out.append(text((x0 + x1) / 2, y + tick_len + size * 2 + (title_dy or size * 0.9), title, 'mono', size, 'middle'))
    return ''.join(out)


def metrics_panel(x, y, w, s):
    """s: dict of sizes. Returns (svg, bottom y)."""
    LAB, TT = s['lab'], s['tt']
    out = [text(x, y + TT, 'Classification metrics', 'sans', TT)]
    ly = y + TT + s['legend_dy']
    out.append(legend(x, ly, s['sq'], LAB, s['legend_gap']))
    labw = len('Precision') * LAB * 0.6 + s['lab_gap']
    valw = len('0.0000') * LAB * 0.6 + s['val_gap'] + 4
    px0, px1 = x + labw, x + w - valw
    ry = ly + s['rows_dy']
    bh, bg, gg = s['bar_h'], s['bar_gap'], s['group_gap']
    out.append(line(px0, ry - gg / 2, px0, ry + 4 * (2 * bh + bg) + 3 * gg + gg / 2, 3))  # zero line
    for label, lr, svm in METRICS:
        out.append(text(x, ry + bh + bg / 2 + LAB * 0.36, label, 'mono', LAB))
        for k, (v, fill) in enumerate([(lr, PAPER), (svm, BLUE)]):
            by = ry + k * (bh + bg)
            bw = (px1 - px0) * float(v)
            out.append(rect(px0, by, bw, bh, fill))
            out.append(text(px0 + bw + s['val_gap'], by + bh / 2 + LAB * 0.36, v, 'mono', LAB))
        ry += 2 * bh + bg + gg
    ay = ry - gg + gg / 2
    out.append(axis(px0, px1, ay, ['0', '0.2', '0.4', '0.6', '0.8', '1.0'], 1.0, LAB, 'Score'))
    return ''.join(out), ay, (px0, px1)


def rmse_panel(x, y, w, s, ay=None, rows_top=None, rows_bottom=None):
    LAB, TT = s['lab'], s['tt']
    out = [text(x, y + TT, 'Range RMSE by path', 'sans', TT)]
    valw = len('0.0000 m') * LAB * 0.6 + s['val_gap'] + 4
    px0, px1 = x, x + w - valw
    rh = LAB + 8 + s['rmse_h']  # label above bar
    if rows_top is None:
        rows_top = y + TT + s['legend_dy'] - LAB
        rows_bottom = rows_top + 2 * rh + s['rmse_gap'] + s['group_gap']
    span = rows_bottom - rows_top
    gap = span - 2 * rh
    ry = rows_top + gap / 2 - s['rmse_gap'] / 2
    for k, (label, v) in enumerate(RMSE):
        out.append(text(x + s['val_gap'] + 2, ry + LAB, label, 'mono', LAB))  # clear of the zero line
        by = ry + LAB + 8
        bw = (px1 - px0) * float(v) / 2.0
        out.append(rect(px0, by, bw, s['rmse_h'], INK))
        out.append(text(px0 + bw + s['val_gap'], by + s['rmse_h'] / 2 + LAB * 0.36, f'{v} m', 'mono', LAB))
        ry += rh + s['rmse_gap']
    if ay is None:
        ay = rows_bottom
    out.append(line(px0, rows_top, px0, ay, 3))
    out.append(axis(px0, px1, ay, s['rmse_ticks'], 2.0, LAB, 'RMSE (metres)'))
    return ''.join(out), ay


def comparison_desktop():
    W, P = 1018, 24
    s = dict(lab=22, tt=28, sq=22, legend_dy=44, legend_gap=36, lab_gap=18, val_gap=10,
             rows_dy=34, bar_h=26, bar_gap=4, group_gap=22, rmse_h=32, rmse_gap=24,
             rmse_ticks=['0', '1.0', '2.0'])
    lw = 600
    left, ay, _ = metrics_panel(P, P, lw, s)
    rows_top = P + s['tt'] + s['legend_dy'] + s['rows_dy'] - s['group_gap'] / 2
    right, _ = rmse_panel(P + lw + 60, P, W - P - (P + lw + 60), s, ay=ay, rows_top=rows_top, rows_bottom=ay)
    H = round(ay + 8 + 22 * 2 + 22 * 0.9 + P)
    return svg(W, H, left + right, 'Logistic regression vs SVM-RBF metrics, and range RMSE', CMP_DESC), W, H


def comparison_mobile():
    W, P = 360, 16
    s = dict(lab=13, tt=18, sq=15, legend_dy=28, legend_gap=18, lab_gap=10, val_gap=6,
             rows_dy=20, bar_h=17, bar_gap=3, group_gap=14, rmse_h=20, rmse_gap=14,
             rmse_ticks=['0', '0.5', '1.0', '1.5', '2.0'])
    top, ay, _ = metrics_panel(P, P, W - 2 * P, s)
    y2 = ay + 8 + 13 * 2 + 13 * 0.9 + 32
    bot, ay2 = rmse_panel(P, y2, W - 2 * P, s)
    H = round(ay2 + 8 + 13 * 2 + 13 * 0.9 + P)
    return svg(W, H, top + bot, 'Logistic regression vs SVM-RBF metrics, and range RMSE', CMP_DESC), W, H


# ---- tile: the SVM-RBF matrix alone, set into the tile card by tiles/build.py ------------
def tile_matrix():
    W, H, cell, sw = 760, 540, 196, 3
    LAB, TT, NUM = 22, 34, 52
    side = 2 * cell - sw
    rowlab = len(CLASSES[1]) * LAB * 0.6
    mx = (W - side - rowlab - 14 - 30) / 2 + rowlab + 14 + 30
    my = 76
    left = mx - rowlab - 14 - 30  # block's left edge: the title lines up with 'True label'
    body = [text(left, 50, 'Confusion matrix: SVM-RBF', 'sans', TT)]
    g, _ = matrix(mx, my, cell, CM['SVM-RBF'], NUM, sw)
    body.append(g)
    for r in range(2):
        body.append(text(mx - 14, my + r * (cell - sw) + cell / 2 + LAB * 0.36, CLASSES[r], 'mono', LAB, 'end'))
    for c in range(2):
        body.append(text(mx + c * (cell - sw) + cell / 2, my + side + 32, CLASSES[c], 'mono', LAB, 'middle'))
    body.append(text(mx + side / 2, my + side + 64, 'Predicted label', 'mono', LAB, 'middle'))
    body.append(rot_label(mx - rowlab - 14 - 16, my + side / 2, 'True label', LAB))
    return svg(W, H, ''.join(body), 'Confusion matrix: SVM-RBF',
               'SVM-RBF confusion matrix: 3,928 and 3,599 correct, 272 and 601 wrong.'), W, H


if __name__ == '__main__':
    jobs = {
        OUT / 'confusion-matrices-desktop.svg': confusion_desktop,
        OUT / 'confusion-matrices-mobile.svg': confusion_mobile,
        OUT / 'model-comparison-desktop.svg': comparison_desktop,
        OUT / 'model-comparison-mobile.svg': comparison_mobile,
        HERE / 'tile-matrix-svm.svg': tile_matrix,
    }
    built = {p: fn() for p, fn in jobs.items()}
    st = style(USED)  # one subset covering every string in the set
    sizes = []
    for p, (doc, w, h) in built.items():
        p.write_text(doc.replace('@@STYLE@@', st))
        sizes.append(f'{p.relative_to(ROOT)} {w}x{h}')
    (HERE / 'sizes.txt').write_text('\n'.join(sizes) + '\n')
    print('\n'.join(sizes))
    # contrast evidence for every cell fill (ink text #111 on fill)
    print('cell fills:', {v: tint(v) for m in CM.values() for row in m for v in row})
