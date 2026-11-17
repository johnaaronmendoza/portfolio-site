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


# ---- line charts: PCA variance and tree depth (round 3) -------------------------------
# Data: pca-trace.csv and tree-depth.csv, read off the originals by trace.py (method, axis
# calibration and checks in its docstring). Strings and marked values copied from the originals
# (da_p9_img1.png, da_p35_img1.png) and the page (UWBProject.tsx l.23-25, l.36-38):
#   PCA: 95 % threshold, 99 % threshold, 848 components, 963 components (legend + page alt).
#   Tree: Training / Test accuracy, Optimal depth=4, "Optimal: depth=4",
#         "Train=0.874, Test=0.867" (annotation; printed 0.8737 / 0.8674).
import csv


def read_csv(name):
    with open(HERE / name) as f:
        return list(csv.DictReader(f))


PCA_RAW = [(float(r['components']), float(r['cumulative_variance_pct'])) for r in read_csv('pca-trace.csv')]


def pca_curve(raw, window=9):
    """The traced curve, cleaned of pixel noise only. A cumulative share is non-decreasing, so:
    1. one value per pixel column (the top of the span where the start rises steeply), keeping
       the very first point (the curve's foot at component 0);
    2. isotonic (pool-adjacent-violators) fit: removes the dips where the threshold lines cross;
    3. a 15-column moving average (about 18 components) on the shallow part only (n >= 16),
       narrowing at its ends, which smooths the 0.27-point pixel staircase. Max change vs the trace is printed by build.py."""
    cols = {}
    for n, v in raw:
        cols[n] = max(v, cols.get(n, v))
    xs = sorted(cols)
    ys = [cols[x] for x in xs]
    blocks = []  # PAVA
    for y in ys:
        blocks.append([y, 1])
        while len(blocks) > 1 and blocks[-2][0] > blocks[-1][0]:
            b = blocks.pop()
            a = blocks[-1]
            a[0] = (a[0] * a[1] + b[0] * b[1]) / (a[1] + b[1])
            a[1] += b[1]
    iso = [v for v, k in blocks for _ in range(k)]
    out = []
    i0 = next(i for i, x in enumerate(xs) if x >= 16)
    for i, x in enumerate(xs):
        # the window narrows towards the ends of the shallow part, so it joins without a step
        h = min(window // 2, max(0, i - i0), len(xs) - 1 - i) if i >= i0 else 0
        out.append((x, sum(iso[i - h:i + h + 1]) / (2 * h + 1)))
    return [raw[0]] + out


PCA = pca_curve(PCA_RAW, window=15)


def pca_at(n):
    for (x0, y0), (x1, y1) in zip(PCA, PCA[1:]):
        if x0 <= n <= x1 and x1 > x0:
            return y0 + (y1 - y0) * (n - x0) / (x1 - x0)
PCA_MARKS = [(95, '95% threshold', 848, '848 components'), (99, '99% threshold', 963, '963 components')]
TREE = [(int(r['depth']), float(r['train']), float(r['test'])) for r in read_csv('tree-depth.csv')]
OPT = (4, 0.8737, 0.8674)
OPT_TEXT = ('Optimal: depth=4', 'Train=0.874, Test=0.867')
FILL = '#DCE3FF'  # 18 % blue on paper: the area under the PCA curve (ink text on it 18.6:1)


class Scale:
    def __init__(self, d0, d1, r0, r1):
        self.d0, self.d1, self.r0, self.r1 = d0, d1, r0, r1

    def __call__(self, v):
        return self.r0 + (v - self.d0) * (self.r1 - self.r0) / (self.d1 - self.d0)


def path(pts):
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)


def dline(x1, y1, x2, y2, sw, dash, color=INK):
    return (f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" stroke="{color}" '
            f'stroke-width="{sw}" stroke-dasharray="{dash}"/>')


def frame(sx, sy, xt, yt, s, xtitle, ytitle, ytitle_top=False):
    """Ink axes (left + bottom, 3px), ticks, Plex Mono tick labels and axis titles."""
    LAB, TL = s['lab'], s['tick']
    x0, x1, y0, y1 = sx.r0, sx.r1, sy.r0, sy.r1  # y0 = bottom
    out = [line(x0, y0, x1, y0, 3), line(x0, y0 + 1.5, x0, y1, 3)]
    for v, lab in xt:
        x = sx(v)
        out.append(line(x, y0, x, y0 + TL, 2))
        out.append(text(x, y0 + TL + LAB + 2, lab, 'mono', LAB, 'middle'))
    for v, lab in yt:
        y = sy(v)
        out.append(line(x0 - TL, y, x0, y, 2))
        out.append(text(x0 - TL - 6, y + LAB * 0.36, lab, 'mono', LAB, 'end'))
    out.append(text((x0 + x1) / 2, y0 + TL + LAB * 2 + s['xt_gap'], xtitle, 'mono', LAB, 'middle'))
    if ytitle_top:
        out.append(text(s['pad'], y1 - s['yt_gap'], ytitle, 'mono', LAB))
    else:
        out.append(rot_label(s['pad'] + LAB * 0.8, (y0 + y1) / 2, ytitle, LAB))
    return ''.join(out)


def wrap_title(x, y, lines, size, lh):
    return ''.join(text(x, y + i * lh, t, 'sans', size) for i, t in enumerate(lines))


PCA_DESC = ('Line chart, cumulative explained variance (%) against number of principal components, '
            '0 to about 1,016. The curve starts near 20% at the first component, rises steeply over '
            'the first few dozen components to just under 50%, then climbs steadily, crossing the 95% threshold at 848 '
            'components and the 99% threshold at 963, and reaches 100% at the last component.')


def pca_chart(W, s, title_lines, mobile):
    P, LAB = s['pad'], s['lab']
    top = P + s['tt'] + (len(title_lines) - 1) * s['tlh']
    plot_top = top + s['title_gap'] + LAB + s['yt_gap']
    left = P + len('100') * LAB * 0.6 + 6 + s['tick']
    sx = Scale(-30, 1050, left, W - P - s['right'])
    sy = Scale(0, 108, plot_top + s['plot_h'], plot_top)
    out = [wrap_title(P, P + s['tt'], title_lines, s['tt'], s['tlh'])]
    pts = [(sx(n), sy(v)) for n, v in PCA]
    base = sy(0)
    out.append(f'<path d="{path(pts)} L{pts[-1][0]:.1f} {base:.1f} L{pts[0][0]:.1f} {base:.1f} Z" fill="{FILL}"/>')
    # threshold lines (dashed) and component lines (dotted) span the plot, as in the original
    for pct, plab, n, nlab in PCA_MARKS:
        out.append(dline(sx.r0, sy(pct), sx.r1, sy(pct), 2, s['dash']))
        out.append(dline(sx(n), base, sx(n), sy.r1, 2, s['dot']))
    out.append(f'<path d="{path(pts)}" fill="none" stroke="{BLUE}" stroke-width="{s["curve"]}" '
               f'stroke-linejoin="round" stroke-linecap="round"/>')
    lx = sx(30)
    out.append(text(lx, sy(99) - s['lab_gap'], PCA_MARKS[1][1], 'mono', LAB))
    out.append(text(lx, sy(95) + s['lab_gap'] + LAB * 0.72, PCA_MARKS[0][1], 'mono', LAB))
    for _, _, n, nlab in PCA_MARKS:  # read bottom-to-top, just left of each dotted line
        USED['mono'].update(nlab)
        out.append(f'<text transform="translate({sx(n) - s["lab_gap"]:g} {base - s["lab_gap"] - 4:g}) rotate(-90)" '
                   f'class="mono" font-size="{LAB}">{esc(nlab)}</text>')
    out.append(frame(sx, sy, [(v, str(v)) for v in range(0, 1001, 200)],
                     [(v, str(v)) for v in range(0, 101, 20)], s,
                     'Number of principal components', 'Cumulative explained variance (%)', True))
    H = round(base + s['tick'] + LAB * 2 + s['xt_gap'] + P)
    return svg(W, H, ''.join(out), 'PCA on CIR: explained variance vs number of components', PCA_DESC), W, H


def pca_desktop():
    s = dict(pad=24, lab=22, tt=28, tlh=34, title_gap=30, yt_side=20, yt_gap=14, tick=8, right=8,
             plot_h=372, dash='12 8', dot='3 6', curve=4, lab_gap=10, xt_gap=14)
    return pca_chart(1018, s, ['PCA on CIR: explained variance vs number of components'], False)


def pca_mobile():
    s = dict(pad=16, lab=13, tt=18, tlh=22, title_gap=18, yt_side=0, yt_gap=10, tick=6, right=12,
             plot_h=250, dash='8 5', dot='2 4', curve=3, lab_gap=6, xt_gap=8)
    return pca_chart(360, s, ['PCA on CIR: explained variance', 'vs number of components'], True)


TREE_DESC = ('Line chart of decision tree accuracy against max depth (2 to 10, then every 5 to 50). '
             'Training accuracy (black circles, solid line) climbs from about 0.85 at depth 2 to 1.0 by '
             'depth 25 and stays there. Test accuracy (blue triangles, dashed line) climbs to a peak of '
             'about 0.896 at depths 9 and 10, then falls and settles around 0.873. A dashed vertical line '
             'marks the optimal depth, 4: train 0.874, test 0.867.')


def tri(cx, cy, r, sw):
    # triangle pointing down, centred on its bounding box like matplotlib's 'v' marker
    pts = [(cx - r, cy - r * 0.9), (cx + r, cy - r * 0.9), (cx, cy + r * 0.9)]
    return (f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{BLUE}" '
            f'stroke="{INK}" stroke-width="{sw}" stroke-linejoin="miter"/>')


def tree_chart(W, s, mobile):
    P, LAB = s['pad'], s['lab']
    plot_top = P + s['tt'] + s['title_gap'] + (LAB + s['yt_gap'] if mobile else 0)
    left = P + (0 if mobile else LAB + s['yt_side']) + len('0.86') * LAB * 0.6 + 6 + s['tick']
    sx = Scale(-1, 52, left, W - P - s['right'])
    sy = Scale(s['ymin'], 1.012, plot_top + s['plot_h'], plot_top)
    out = [text(P, P + s['tt'], 'Decision tree: accuracy vs max depth', 'sans', s['tt'])]
    base = sy(s['ymin'])
    ox = sx(OPT[0])
    out.append(dline(ox, base, ox, sy.r1, s['opt_w'], s['opt_dash']))
    tr = [(sx(d), sy(a)) for d, a, _ in TREE]
    te = [(sx(d), sy(b)) for d, _, b in TREE]
    out.append(f'<path d="{path(tr)}" fill="none" stroke="{INK}" stroke-width="{s["lw"]}" stroke-linejoin="round"/>')
    out.append(f'<path d="{path(te)}" fill="none" stroke="{BLUE}" stroke-width="{s["lw"]}" '
               f'stroke-dasharray="{s["dash"]}" stroke-linejoin="round"/>')
    for x, y in tr:
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{s["mr"]}" fill="{INK}"/>')
    for x, y in te:
        out.append(tri(x, y, s['tr'], s['tsw']))
    # direct labels in the flat stretch (depth 30-50), replacing the legend
    out.append(text(sx(50), sy(1.0) + s['mr'] + LAB + 6, 'Training accuracy', 'mono', LAB, 'end'))
    out.append(text(sx(50), sy(0.875) - s['tr'] - LAB * 0.3 - 6, 'Test accuracy', 'mono', LAB, 'end'))
    # the optimal-depth callout: paper box, 3px ink, leader to the depth-4 test marker
    bw = len(OPT_TEXT[1]) * LAB * 0.6 + 2 * s['bpad']
    bh = 2 * s['blh'] + 2 * s['bpad'] - (s['blh'] - LAB)
    bx = sx(50) - bw if mobile else sx(s['box_d'])
    by = base - s['box_gap'] - bh
    tx, ty = sx(OPT[0]), sy(OPT[2])
    lx, ly = bx, by + bh / 2
    # arrowhead stops short of the marker
    import math
    ang = math.atan2(ty - ly, tx - lx)
    stop = s['tr'] + s['stop']
    ex, ey = tx - stop * math.cos(ang), ty - stop * math.sin(ang)
    ah = s['ah']
    a1 = (ex - ah * math.cos(ang - 0.45), ey - ah * math.sin(ang - 0.45))
    a2 = (ex - ah * math.cos(ang + 0.45), ey - ah * math.sin(ang + 0.45))
    out.append(line(lx, ly, ex - ah * 0.6 * math.cos(ang), ey - ah * 0.6 * math.sin(ang), 2))
    out.append(f'<polygon points="{ex:.1f},{ey:.1f} {a1[0]:.1f},{a1[1]:.1f} {a2[0]:.1f},{a2[1]:.1f}" fill="{INK}"/>')
    out.append(rect(bx, by, bw, bh, PAPER))
    out.append(text(bx + s['bpad'], by + s['bpad'] + LAB * 0.8, OPT_TEXT[0], 'mono', LAB))
    out.append(text(bx + s['bpad'], by + s['bpad'] + LAB * 0.8 + s['blh'], OPT_TEXT[1], 'mono', LAB))
    ticks_y = [(round(0.86 + 0.02 * i, 2), f'{0.86 + 0.02 * i:.2f}') for i in range(8)]
    out.append(frame(sx, sy, [(v, str(v)) for v in range(0, 51, 10)], ticks_y, s, 'Max depth', 'Accuracy', mobile))
    H = round(base + s['tick'] + LAB * 2 + s['xt_gap'] + P)
    return svg(W, H, ''.join(out), 'Decision tree: accuracy vs max depth', TREE_DESC), W, H


def tree_desktop():
    s = dict(pad=24, lab=22, tt=28, title_gap=30, yt_side=20, yt_gap=14, tick=8, right=8, plot_h=430,
             ymin=0.826, lw=3, dash='10 6', mr=6, tr=8, tsw=2, opt_w=2, opt_dash='4 6',
             bpad=12, blh=30, box_d=17, box_gap=12, ah=12, xt_gap=14, stop=6)
    return tree_chart(1018, s, False)


def tree_mobile():
    s = dict(pad=16, lab=13, tt=18, title_gap=18, yt_side=0, yt_gap=10, tick=6, right=10, plot_h=330,
             ymin=0.828, lw=2, dash='6 4', mr=3.5, tr=4.5, tsw=1.5, opt_w=2, opt_dash='3 4',
             bpad=8, blh=18, box_d=0, box_gap=6, ah=8, xt_gap=8, stop=3)
    return tree_chart(360, s, True)


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


def strip_fonts(doc):
    import re
    return re.sub(r'base64,[A-Za-z0-9+/=]+', '', doc)


if __name__ == '__main__':
    # Two groups, each with its own font subset, so adding round-3 charts leaves the
    # round-2 files byte-identical.
    groups = [
        {
            OUT / 'confusion-matrices-desktop.svg': confusion_desktop,
            OUT / 'confusion-matrices-mobile.svg': confusion_mobile,
            OUT / 'model-comparison-desktop.svg': comparison_desktop,
            OUT / 'model-comparison-mobile.svg': comparison_mobile,
            HERE / 'tile-matrix-svm.svg': tile_matrix,
        },
        {
            OUT / 'pca-variance-desktop.svg': pca_desktop,
            OUT / 'pca-variance-mobile.svg': pca_mobile,
            OUT / 'tree-depth-desktop.svg': tree_desktop,
            OUT / 'tree-depth-mobile.svg': tree_mobile,
        },
    ]
    sizes = []
    for jobs in groups:
        for k in USED:
            USED[k] = set()
        built = {p: fn() for p, fn in jobs.items()}
        st = style(USED)  # one subset covering every string in the group
        for p, (doc, w, h) in built.items():
            doc = doc.replace('@@STYLE@@', st)
            # woff2 bytes can differ between fontTools/brotli builds; keep a file whose art
            # (everything but the embedded font data) is unchanged, so reruns don't churn it
            if not (p.exists() and strip_fonts(p.read_text()) == strip_fonts(doc)):
                p.write_text(doc)
            sizes.append(f'{p.relative_to(ROOT)} {w}x{h}')
    (HERE / 'sizes.txt').write_text('\n'.join(sizes) + '\n')
    print('\n'.join(sizes))
    raw = {}
    for n, v in PCA_RAW:
        raw[n] = max(v, raw.get(n, v))
    print('pca: max change vs trace %.2f points; at 848 = %.2f %%, at 963 = %.2f %%' % (
        max(abs(v - raw[n]) for n, v in PCA[1:]), pca_at(848), pca_at(963)))
    # contrast evidence for every cell fill (ink text #111 on fill)
    print('cell fills:', {v: tint(v) for m in CM.values() for row in m for v in row})
