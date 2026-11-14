# UWB charts (Paper & Ink)

Redraws of the two default-matplotlib charts on `/projects/uwb`, plus the Home tile. The originals stay untouched in `attached_assets/` (`da_p40_img1.png`, `da_p41_img1.png`); the previous tile is kept in `previous/`.

Every number comes from `client/src/pages/UWBProject.tsx` (alt text l.17 and l.29, caption l.28). Cell positions and the class labels `LOS+NLOS (0)` / `NLOS+NLOS (1)` come from the original chart. Nothing is computed.

```bash
python3 design-system/portfolio/asset-work/uwb-charts/build.py   # SVGs (subset Plex fonts embedded) + sizes.txt
bash design-system/portfolio/asset-work/uwb-charts/render.sh     # @2x PNG + lossless WebP
python3 design-system/portfolio/asset-work/tiles/build.py         # then render tiles/uwb.html, see tiles/README.md
```

Desktop art is drawn 1018 wide (shown at 570 to 1018 CSS px, from 640px viewports); mobile art is 360 wide (shown at 337 to 601, below 640). The smallest text is 22 and 13 units, so at least 12.2px on screen. Cells shade from paper to `#3A66FF` by count / 4,200 (the row total), with black numbers (at least 4.52:1). Bars: SVM-RBF blue, logistic regression white, RMSE black, all with 3px ink outlines.
