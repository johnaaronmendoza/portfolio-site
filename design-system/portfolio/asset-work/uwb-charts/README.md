# UWB charts (Paper & Ink)

Redraws of the default-matplotlib charts on `/projects/uwb`, plus the Home tile. The originals stay untouched in `attached_assets/` (`da_p40_img1.png`, `da_p41_img1.png`); the previous tile is kept in `previous/`.

Every number comes from `client/src/pages/UWBProject.tsx` (alt text l.17 and l.29, caption l.28). Cell positions and the class labels `LOS+NLOS (0)` / `NLOS+NLOS (1)` come from the original chart. Nothing is computed.

```bash
python3 design-system/portfolio/asset-work/uwb-charts/build.py   # SVGs (subset Plex fonts embedded) + sizes.txt
bash design-system/portfolio/asset-work/uwb-charts/render.sh     # @2x PNG + lossless WebP
python3 design-system/portfolio/asset-work/tiles/build.py         # then render tiles/uwb.html, see tiles/README.md
```

Desktop art is drawn 1018 wide (shown at 570 to 1018 CSS px, from 640px viewports); mobile art is 360 wide (shown at 337 to 601, below 640). The smallest text is 22 and 13 units, so at least 12.2px on screen. Cells shade from paper to `#3A66FF` by count / 4,200 (the row total), with black numbers (at least 4.52:1). Bars: SVM-RBF blue, logistic regression white, RMSE black, all with 3px ink outlines.

## Round 3: PCA variance and tree depth (17 Nov 2026)

`pca-variance-{desktop,mobile}` redraws `attached_assets/da_p9_img1.png`; `tree-depth-{desktop,mobile}` redraws `da_p35_img1.png`. Both originals stay untouched. `decision_boundaries` (`da_p39_img2.png`) is **not** redrawn: its thousands of overlapping points and the classifier regions can't be traced faithfully, the x axis has no tick labels and the two classes have no legend. Its title says "7 Classifiers" over six panels; that is left as the source shows it (flagged to John).

These curves are not stated as numbers anywhere, so `trace.py` reads them off the originals by pixel measurement (axis calibration, method and checks in its docstring) into `pca-trace.csv` and `tree-depth.csv`. The values that are stated are copied, not traced: 95% at 848 components and 99% at 963 (page alt text and legend), and depth 4 train 0.8737 / test 0.8674 (printed under the original). Checks: the cleaned PCA curve gives 95.2% at 848 and 99.2% at 963; the tree method, run on depth 4, reads 0.8738 / 0.8672.

```bash
python3 design-system/portfolio/asset-work/uwb-charts/trace.py    # only if the originals change
python3 design-system/portfolio/asset-work/uwb-charts/build.py
bash design-system/portfolio/asset-work/uwb-charts/render.sh pca-variance
bash design-system/portfolio/asset-work/uwb-charts/render.sh tree-depth
```

`build.py` builds round-2 and round-3 charts with separate font subsets, and keeps a file whose art is unchanged (woff2 bytes vary between fontTools builds), so a rerun doesn't churn the round-2 files. Encoding: PCA curve blue `#3A66FF` 4 units over an 18% blue fill `#DCE3FF` (curve on fill 3.64:1, ink text on fill 14.8:1); thresholds dashed ink, component lines dotted ink, all labelled directly (the legend is gone). Tree: training ink circles on a solid ink line, test blue triangles (ink outline) on a dashed blue line, optimal depth a dotted ink line with the original annotation in a paper box; series named in place of the legend.
