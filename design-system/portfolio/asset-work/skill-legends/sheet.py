"""python3 sheet.py <png-dir> <out.png>: contact sheet, each key at 64 and 24 px on the keycap
faces (white on blue #3A66FF, black on yellow #FFD23F, #111111 on white), plus 24px zoomed 2x
(nearest) to judge legibility."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
ORDER = "prompt rag llm guard human python pandas sklrn numpy sql etl bi node grpc pgsql supa docker kube git ts react next twind kotlin arcore agile uat reqs".split()
GROUNDS = [("#3A66FF", "#FFFFFF"), ("#FFD23F", "#000000"), ("#FFFFFF", "#111111")]
d, out = Path(sys.argv[1]), sys.argv[2]
def tile(key, size, bg, fg, zoom=1):
    a = Image.open(d / f"{key}-{size}.png").convert("RGBA").getchannel("A")
    t = Image.new("RGB", (size + 16, size + 16), bg)
    t.paste(Image.new("RGB", a.size, fg), (8, 8), a)
    return t.resize((t.width * zoom, t.height * zoom), Image.NEAREST) if zoom > 1 else t
cols, cw, ch = 7, 270, 200
S = Image.new("RGB", (cols * cw + 16, ((len(ORDER) + cols - 1) // cols) * ch + 16), (200, 200, 200))
D = ImageDraw.Draw(S)
for i, k in enumerate(ORDER):
    r, c = divmod(i, cols); x, y = 16 + c * cw, 16 + r * ch
    for j, (bg, fg) in enumerate(GROUNDS):
        S.paste(tile(k, 64, bg, fg), (x + j * 84, y))
        S.paste(tile(k, 24, bg, fg), (x + j * 44, y + 88))
    S.paste(tile(k, 24, "#3A66FF", "#FFFFFF", 2), (x + 140, y + 88))
    D.text((x, y + 176), k, fill=(0, 0, 0))
S.save(out); print(out)
