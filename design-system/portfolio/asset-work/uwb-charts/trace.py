"""Read the plotted values off two of the original UWB charts (pixel measurement, nothing modelled).

Writes pca-trace.csv and tree-depth.csv beside this file; build.py draws from them.
Run from anywhere:  python3 design-system/portfolio/asset-work/uwb-charts/trace.py

Axis calibration uses the tick marks of each original (pixel positions found by scanning the
dark tick pixels outside the axes frame; listed below). Values that the page or the original
prints exactly are NOT traced: they are copied (see build.py DATA).

pca_variance  attached_assets/da_p9_img1.png  (989 x 490)
  x ticks 0,200,...,1000 at px 107,271,435,599,762,926  -> x = 107 + 0.819 * n
  y ticks 0,20,...,100   at px 418,345,271,198,124,51   -> y = 418 - 3.67 * pct
  1 px = 1.22 components across, 0.27 percentage points up.
  Curve colour steelblue #4682B4, 2 px line. Per pixel column: the line's coverage-weighted
  centre row; in the near-vertical start (span > 4 px) both ends of the span, inset 1 px, so it
  keeps its rise. The last ~60 columns read up to 0.6 px above the 100 tick (line snapping);
  cumulative variance cannot pass 100 %, so values are capped at 100.0.
  Check against the page (alt text): the trace gives 95.08 % at 848 components and 98.91 % at
  963 (page: 95 % at 848, 99 % at 963), i.e. within 0.1 point (under half a source pixel).
  Where the threshold lines (red at 95 %, green at 99 %) or the dotted verticals cover the
  curve, the column has no curve pixels and is skipped (the polyline bridges a 1-3 px gap).

tree_depth    attached_assets/da_p35_img1.png (1013 x 646)
  x ticks 0,10,...,50 at px 85,257.4,430,602,774,947      -> x = 85 + 17.24 * depth
  y ticks 0.86..1.00 at px 454.3 ... 50.3 (57.7 px/0.02)   -> y = 50.3 + (1 - acc) * 2885
  1 px = 0.00035 accuracy.
  Markers: training = red circles (#E03722), test = blue triangles (#2A29F5), at depths
  2-10, 15, 20, ..., 50 (17 per series; one marker found at each tick-derived column).
  A marker's centre is found from its TOP edge (blue is drawn over red, so the bottom of a
  red circle can be hidden; the top edges never are): first row in a +-5 px window whose
  coloured run is >= 7 px wide, plus that same offset measured on the isolated depth-50
  markers. Depth 4 sits under the green 'optimal' line and is not traced: the original
  prints its values (Train 0.8737, Test 0.8674) and those are used.
  Method check: traced the same way, depth 4 reads train 0.8738 / test 0.8672 against the
  printed 0.8737 / 0.8674. Reading error about +-1 px (+-0.0004); kept to 3 decimals.
"""
import csv
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
A = ROOT / 'attached_assets'


def pca():
    a = np.asarray(Image.open(A / 'da_p9_img1.png').convert('RGB')).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # steelblue (70,130,180) and its antialiased edges; excludes the pale fill (~#E1E9F1)
    curve = (b - r > 40) & (g - r > 20) & (b < 235)
    alpha = np.clip((255 - r) / (255 - 70), 0, 1) * curve  # coverage of the steelblue line
    rows = []
    for x in range(100, 960):
        ys = np.nonzero(curve[40:420, x])[0]
        if len(ys) == 0:
            continue
        ys = ys + 40
        n = (x - 107) / 0.819
        if n < 0:  # antialiasing left of the first component
            continue
        if ys.max() - ys.min() <= 4:  # ordinary column: coverage-weighted centre of the line
            w = alpha[ys.min():ys.max() + 1, x]
            pts = [float((np.arange(ys.min(), ys.max() + 1) * w).sum() / w.sum())]
        else:  # steep start: span minus half the line width at each end, bottom first
            pts = [ys.max() - 1, ys.min() + 1]
        for y in pts:
            # cumulative variance cannot pass 100 %; the last columns read up to +0.6 px high
            rows.append((round(n, 1), min(100.0, round((418 - y) / 3.67, 2))))
    return rows


def tree():
    a = np.asarray(Image.open(A / 'da_p35_img1.png').convert('RGB')).astype(int)
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    masks = {'train': (R - G > 60) & (R > 180), 'test': (B - R > 60) & (B > 180)}
    depths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    y_of = lambda v: 50.3 + (1 - v) * 2885
    v_of = lambda y: 1 - (y - 50.3) / 2885

    def top_edge(m, x0, y_lo, y_hi):
        win = m[y_lo:y_hi, x0 - 6:x0 + 7]
        for i, row in enumerate(win):
            if row.sum() >= 7:
                return y_lo + i
        return None

    # offset from top edge to centre, measured on the isolated depth-50 markers
    # (middle of the marker's own vertical extent; row-index space, like the ticks)
    def extent(m, x0, y_lo, y_hi):
        col = m[y_lo:y_hi, x0 - 6:x0 + 7].sum(1)
        ys = np.nonzero(col >= 1)[0]
        return y_lo + ys.min(), y_lo + ys.max()

    x50 = round(85 + 17.24 * 50)
    off = {}
    for k, (lo, hi) in {'train': (35, 70), 'test': (395, 430)}.items():
        t0, t1 = extent(masks[k], x50, lo, hi)
        off[k] = (t0 + t1) / 2 - top_edge(masks[k], x50, lo, hi)
    out, check = [], []
    for d in depths:
        x0 = round(85 + 17.24 * d)
        row = {'depth': d}
        for k in ('train', 'test'):
            col = masks[k][30:506, x0 - 6:x0 + 7].sum(1)
            ys = np.nonzero(col >= 7)[0]
            traced = round(v_of(30 + ys.min() + off[k]), 4)
            if d == 4:
                check.append((k, traced))
                row[k] = {'train': 0.8737, 'test': 0.8674}[k]
                row[k + '_src'] = 'printed'
                continue
            row[k] = round(traced, 3)
            row[k + '_src'] = 'traced'
        out.append(row)
    return out, off, check


if __name__ == '__main__':
    p = pca()
    with open(HERE / 'pca-trace.csv', 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['components', 'cumulative_variance_pct'])
        w.writerows(p)
    t, off, check = tree()
    with open(HERE / 'tree-depth.csv', 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['depth', 'train', 'train_src', 'test', 'test_src'])
        w.writeheader()
        w.writerows(t)
    print('pca points', len(p), 'first', p[:4], 'last', p[-3:])
    print('marker offsets (px from top edge to centre)', off)
    print('method check, depth 4 traced the same way (printed: train 0.8737, test 0.8674):', check)
    for r in t:
        print(r)
