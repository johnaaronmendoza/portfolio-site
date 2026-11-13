# Project tile stills

One still per case-study project, shown on the Home tiles and the "Next project" card.

**Concept (brand-design gate):** the project's real screen or output, cropped to its clearest moment, on a flat house-colour ground with an ink border and a hard shadow. No clip-art, no decoration: if every ornament were deleted the still would still say what the project is.

| Tile | Source (attached_assets/) | Shows |
| --- | --- | --- |
| SilverLink SG | `silverlink_p21_img0.png` | Event page with sessions and the Cancel booking control |
| SCS Awareness Platform | `scs_p71_img1.png` | Panel Builder: the staff story editor |
| AI Finance Insights Engine | none (no confirmed screenshot) | The pipeline from the case study: 5 sources, 2 quality gates, SQLite warehouse, NLP brief |
| UWB Indoor Localization | `da_p40_img1.png` (right half) | SVM-RBF confusion matrix |
| UAT Testing Dashboard | `uat_dashboard_full.png` | Executive dashboard KPI cards |
| Fire Safety Drill Companion | `firesafety_p29_img5.png` (top two phones) | AR Drill: arrows to the exit, and the status walkthrough |

The AI Finance tile used to show `aifinance_dashboard.jpg`, an unconfirmed (and machine-looking) dashboard; it is no longer used. The Fire Safety extinguisher-scan screen was not used because it shows "Demo mode".

Rebuild (from the repo root):

```bash
python3 design-system/portfolio/asset-work/tiles/build.py
D=design-system/portfolio/asset-work/tiles
for s in silverlink scs uwb uat firesafety; do node .claude/skills/asset-toolkit/scripts/html2png.mjs $D/$s.html --out $D/renders --name $s --size 1200x660; done
node .claude/skills/asset-toolkit/scripts/html2png.mjs $D/ai-finance.html --out $D/renders --name ai-finance --size 1200x660 --require-font "Press Start 2P"
# then save each render as attached_assets/tile_<slug>.webp (quality 82)
```
