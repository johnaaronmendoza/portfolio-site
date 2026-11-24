# WebP manifest (image delivery, 24 Nov 2026)

Asset-generator output for the audit item "raster images are PNG/JPG with no modern formats or 2x versions". Originals are untouched; they stay the fallback.

- **Source:** `design-system/portfolio/asset-work/webp/build.py` (re-run from the repo root); raw numbers in `results.json`; review crops and sheets in `review/`.
- **Where the files are:** the case screenshots live in `attached_assets/` (the `@assets` alias), and asset-generator may not write there. So the WebP files are in `client/public/assets/` and are referenced by URL (the UWB charts already work this way): `case/<slug>/`, `tiles/`, `about/`, `stickers/`. Each keeps its original's file stem.
- **Max display width** was measured in Chromium (Playwright, dev server) on `/` and every `/projects/*` route at 19 viewport widths from 320 to 1920 px. It is the widest CSS box the image ever gets:
  - Half-width gallery shots peak at **697 px at a 767 px viewport** (one column, just before `md`), not at the two-column 494 px.
  - Full-span and hero-wide shots peak at **1018 px** (`max-w-5xl` minus the 3 px borders).
  - Portrait shots are capped by `max-h-[560px]`.
  - Canvas images (tiles, portrait) use object-cover, so the source width needed is set by the cover crop.
- **Naming:**
  - `name.webp` is 1x at the max display width, or the source's own width when the source is smaller.
  - `name@2x.webp` is a real 2x.
  - `name@full.webp` is the whole source when it is 1.2x to 2x of the display width; its real density is listed.
  - Nothing is upscaled.
- **Encoding:** Pillow libwebp, lossy q80, method 6. Lossless is tried too and kept when it is smaller (2 files). The two pixel stickers are forced lossless: lossy smeared their blue edges in the zoomed check.
  - Every file is under 250 KB. The largest is 49,318 B.
  - Text and UI edges were checked in 3x zoomed crops against a Lanczos PNG at the same pixels (`review/*.png`). There are no visible artefacts, apart from slight chroma softening on small red badges, which is not visible at 1x.

## Files

| Original (used by) | Bytes | Natural px | Max display px | New files (px, bytes, encoding, density vs display) |
| --- | ---: | --- | --- | --- |
| `attached_assets/silverlink_p19_img0.png`<br>silverlink hero events_discovery | 157,930 | 873x560 | 873 CSS | `/assets/case/silverlink/silverlink_p19_img0.webp` 873x560, 36,606 B (lossy q80, 1.0x) |
| `attached_assets/silverlink_p14_img0.png`<br>silverlink onboarding_flow | 86,387 | 1172x599 | 1018 CSS | `/assets/case/silverlink/silverlink_p14_img0.webp` 1018x520, 17,386 B (lossy q80, 1.0x) |
| `attached_assets/silverlink_p21_img0.png`<br>silverlink event_detail; tile hover preload | 109,120 | 640x428 | 697 CSS **UPSCALED** | `/assets/case/silverlink/silverlink_p21_img0.webp` 640x428, 15,130 B (lossy q80, 0.92x) |
| `attached_assets/silverlink_p22_img0.png`<br>silverlink livestream_studio; tile hover preload | 115,535 | 700x392 | 697 CSS | `/assets/case/silverlink/silverlink_p22_img0.webp` 697x390, 11,802 B (lossy q80, 1.0x) |
| `attached_assets/silverlink_p23_img0.png`<br>silverlink system_metrics | 57,318 | 862x415 | 1018 CSS **UPSCALED** | `/assets/case/silverlink/silverlink_p23_img0.webp` 862x415, 12,756 B (lossy q80, 0.85x) |
| `attached_assets/scs_p65_img0.png`<br>scs hero story_player | 51,099 | 532x843 | 353 CSS | `/assets/case/scs/scs_p65_img0.webp` 353x559, 9,012 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p65_img0@full.webp` 532x843, 12,492 B (lossy q80, 1.51x) |
| `attached_assets/scs_p72_img0.png`<br>scs panel_editor; tile hover preload | 83,739 | 1278x985 | 697 CSS | `/assets/case/scs/scs_p72_img0.webp` 697x537, 9,878 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p72_img0@full.webp` 1278x985, 24,608 B (lossy q80, 1.83x) |
| `attached_assets/scs_p71_img1.png`<br>scs admin_dashboard; tile hover preload | 156,648 | 1887x1006 | 1018 CSS | `/assets/case/scs/scs_p71_img1.webp` 1018x543, 17,000 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p71_img1@full.webp` 1887x1006, 36,394 B (lossy q80, 1.85x) |
| `attached_assets/scs_p72_img1.png`<br>scs story_stats | 71,485 | 1915x1003 | 1018 CSS | `/assets/case/scs/scs_p72_img1.webp` 1018x533, 11,488 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p72_img1@full.webp` 1915x1003, 25,780 B (lossy q80, 1.88x) |
| `attached_assets/scs_p73_img0.png`<br>scs asset_manager | 107,251 | 1884x1005 | 1018 CSS | `/assets/case/scs/scs_p73_img0.webp` 1018x543, 15,614 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p73_img0@full.webp` 1884x1005, 33,324 B (lossy q80, 1.85x) |
| `attached_assets/scs_p74_img1.png`<br>scs admin_accounts | 114,131 | 1917x1003 | 1018 CSS | `/assets/case/scs/scs_p74_img1.webp` 1018x533, 14,152 B (lossy q80, 1.0x)<br>`/assets/case/scs/scs_p74_img1@full.webp` 1917x1003, 33,102 B (lossy q80, 1.88x) |
| `attached_assets/firesafety_p29_img5.png`<br>firesafety hero ar_navigation | 183,762 | 436x737 | 331 CSS | `/assets/case/firesafety/firesafety_p29_img5.webp` 331x560, 15,872 B (lossy q80, 1.0x)<br>`/assets/case/firesafety/firesafety_p29_img5@full.webp` 436x737, 24,350 B (lossy q80, 1.32x) |
| `attached_assets/firesafety_p29_img1.png`<br>firesafety onboarding; tile hover preload | 100,442 | 896x564 | 1018 CSS **UPSCALED** | `/assets/case/firesafety/firesafety_p29_img1.webp` 896x564, 12,412 B (lossy q80, 0.88x) |
| `attached_assets/firesafety_p29_img2.png`<br>firesafety dashboard | 71,163 | 605x520 | 697 CSS **UPSCALED** | `/assets/case/firesafety/firesafety_p29_img2.webp` 605x520, 11,810 B (lossy q80, 0.87x) |
| `attached_assets/firesafety_p29_img3.png`<br>firesafety drill_setup; tile hover preload | 87,132 | 790x487 | 697 CSS | `/assets/case/firesafety/firesafety_p29_img3.webp` 697x430, 13,688 B (lossy q80, 1.0x) |
| `attached_assets/firesafety_p29_img4.png`<br>firesafety floor_plan | 135,711 | 586x1041 | 315 CSS | `/assets/case/firesafety/firesafety_p29_img4.webp` 315x560, 14,842 B (lossy q80, 1.0x)<br>`/assets/case/firesafety/firesafety_p29_img4@full.webp` 586x1041, 34,640 B (lossy q80, 1.86x) |
| `attached_assets/firesafety_p30_img0.png`<br>firesafety extinguisher_id | 354,267 | 911x744 | 697 CSS | `/assets/case/firesafety/firesafety_p30_img0.webp` 697x569, 21,984 B (lossy q80, 1.0x)<br>`/assets/case/firesafety/firesafety_p30_img0@full.webp` 911x744, 30,964 B (lossy q80, 1.31x) |
| `attached_assets/firesafety_p30_img1.png`<br>firesafety safety_quiz | 335,003 | 947x642 | 1018 CSS **UPSCALED** | `/assets/case/firesafety/firesafety_p30_img1.webp` 947x642, 40,828 B (lossy q80, 0.93x) |
| `attached_assets/firesafety_p30_img3.png`<br>firesafety analytics | 153,362 | 754x872 | 484 CSS | `/assets/case/firesafety/firesafety_p30_img3.webp` 484x560, 14,770 B (lossy q80, 1.0x)<br>`/assets/case/firesafety/firesafety_p30_img3@full.webp` 754x872, 27,466 B (lossy q80, 1.56x) |
| `attached_assets/uat_dashboard_full.png`<br>uat hero dashboard | 104,457 | 1440x922 | 1018 CSS | `/assets/case/uat/uat_dashboard_full.webp` 1018x652, 21,530 B (lossy q80, 1.0x)<br>`/assets/case/uat/uat_dashboard_full@full.webp` 1440x922, 33,736 B (lossy q80, 1.41x) |
| `attached_assets/uat_defects.png`<br>uat defects | 137,588 | 1440x900 | 1018 CSS | `/assets/case/uat/uat_defects.webp` 1018x636, 31,470 B (lossy q80, 1.0x)<br>`/assets/case/uat/uat_defects@full.webp` 1440x900, 40,306 B (lossless, 1.41x) |
| `attached_assets/uat_defect_detail.png`<br>uat defect_detail | 165,104 | 1440x900 | 1018 CSS | `/assets/case/uat/uat_defect_detail.webp` 1018x636, 23,960 B (lossy q80, 1.0x)<br>`/assets/case/uat/uat_defect_detail@full.webp` 1440x900, 36,428 B (lossy q80, 1.41x) |
| `attached_assets/uat_testcases.png`<br>uat test_cases | 145,936 | 1440x900 | 1018 CSS | `/assets/case/uat/uat_testcases.webp` 1018x636, 33,646 B (lossy q80, 1.0x)<br>`/assets/case/uat/uat_testcases@full.webp` 1440x900, 40,786 B (lossless, 1.41x) |
| `attached_assets/uat_reports_full.png`<br>uat reports | 130,684 | 1440x1146 | 697 CSS | `/assets/case/uat/uat_reports_full.webp` 697x555, 17,066 B (lossy q80, 1.0x)<br>`/assets/case/uat/uat_reports_full@2x.webp` 1394x1109, 43,836 B (lossy q80, 2.0x) |
| `attached_assets/da_p39_img2.png`<br>uwb decision_boundaries; tile hover preload | 203,372 | 1097x1120 | 1018 CSS | `/assets/case/uwb/da_p39_img2.webp` 1018x1039, 49,318 B (lossy q80, 1.0x) |
| `attached_assets/greenloop_hero.jpg`<br>Home GreenLoop tile (canvas, 2:1 cover) | 92,341 | 1200x800 | 525 CSS | `/assets/tiles/greenloop_hero.webp` 525x350, 12,590 B (lossy q80, 1.0x)<br>`/assets/tiles/greenloop_hero@2x.webp` 1050x700, 28,400 B (lossy q80, 2.0x) |
| `attached_assets/john_profile.png`<br>About portrait (canvas, square cover); the page imports john_profile.jpg (562x600, 90,420 B), this PNG is its 1200px original | 90,420 | 1200x1280 (page uses .jpg 562x600) | 202 CSS | `/assets/about/john_profile.webp` 202x215, 7,102 B (lossy q80, 1.0x)<br>`/assets/about/john_profile@2x.webp` 404x431, 21,484 B (lossy q80, 2.0x) |
| `client/public/assets/stickers/retro-computer.png`<br>Home sticker (80px box) | 13,537 | 159x160 | 80 CSS tall | `/assets/stickers/retro-computer.webp` 80x81, 4,168 B (lossless, 1.0x)<br>`/assets/stickers/retro-computer@2x.webp` 159x160, 9,686 B (lossless, 1.99x) |
| `client/public/assets/stickers/cursor-arrow.png`<br>Home sticker (80px box) | 11,207 | 92x160 | 80 CSS tall (needs 46 src px) | `/assets/stickers/cursor-arrow.webp` 46x80, 3,220 B (lossless, 1.0x)<br>`/assets/stickers/cursor-arrow@2x.webp` 92x160, 7,622 B (lossless, 2.0x) |
## Totals

Bytes counted are what the page loads today: for the portrait, the 562 px `john_profile.jpg` (90,420 B), not the 1.9 MB PNG original.

| Set | Bytes | Saved vs originals |
| --- | ---: | ---: |
| Originals on the page (29 images) | 3,626,131 | n/a |
| WebP 1x (one file each) | 521,100 | **3,105,031 (85.6%)** |
| WebP highest density each (@2x / @full, else the 1x) | 767,140 | **2,858,991 (78.8%)** |

The two audit examples:
- `firesafety_p30_img0`: 354,267 B to 21,984 B (1x) / 30,964 B (@full).
- `firesafety_p30_img1`: 335,003 B to 40,828 B.

## Shown wider than the source (cannot be fixed from the repo)

No larger copy exists. I searched every raster in `attached_assets/`, `design-system/` and `client/public/` by content; the closest matches are unrelated screens. These are PDF extractions at their native size.

| Image | Natural | Shown at up to | Fix |
| --- | --- | --- | --- |
| `silverlink_p23_img0` system_metrics | 862 | 1018 (full span) | Either a new export from John at ≥ 2036 px, or the coder caps it at `max-w-[862px] mx-auto` (or drops the full span) |
| `firesafety_p29_img1` onboarding | 896 | 1018 (full span) | Same: cap at 896, or a new export |
| `firesafety_p30_img1` safety_quiz | 947 | 1018 (full span) | Same: cap at 947, or a new export |
| `firesafety_p29_img2` dashboard | 605 | 697 (one column at 640-767 px) | Cap at 605 (`max-w-[605px] mx-auto`) |
| `silverlink_p21_img0` event_detail | 640 | 697 (one column at 640-767 px) | Cap at 640 |

Why this happens: ScreenGallery's full-span rule (`aspect >= 1.4 && width >= 860`, comment "so never upscaled") assumes 860 px fills the column. The column is 1018 px, so the threshold should be 1018, or the image should be capped at its natural width.

`client/public/assets/case/silverlink/metrics-annotated-desktop.png` (1424x1056) is a storyboard figure: callouts over a crop of the same 862 px source, designed for 712 CSS px. It is not a higher-resolution source.

## Left as they are

| Asset | Why |
| --- | --- |
| `attached_assets/tile_*.webp` (6 tiles) | Already WebP, 11-24 KB. Five are 1200x600, which is 2.3x the usual 525 px tile and 1.3x the widest (915 px, the "Next project" card at 768-1023 px). `tile_silverlink.webp` is 570x285: its source `silverlink_p21_img0.png` is only 640 px, so the tile is upscaled above 570 px (861/915 px cards). It needs a new export. |
| `attached_assets/greenloop_tour.jpg` | Only in the GreenLoop tile's hover preload list; GreenLoop links out, so it is never shown. Drop it from `preloadImages` instead (saves 209,628 B per hover). |
| `client/public/assets/mascot/poses/*.png` | 1.3-4.2 KB pixel art, scaled up on purpose with `image-rendering: pixelated`; WebP saves nothing meaningful. |
| UWB charts (`/assets/case/uwb/*@2x.webp`) | Already WebP from SVG. The `-mobile@2x` files are 720 px wide but shown at up to 601 CSS px (639 px viewport), so 1.2x there. The SVG sources can be re-rendered at 1202 px if wanted. |
| Unused stickers in `public/assets/stickers/` | Not displayed. |
