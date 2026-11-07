"""python3 sheet.py <png-dir> <out.png>: contact sheet, each key at 64 and 24 px,
white on #3178C6 and #1A1A1A on #F59E0B, plus 24px zoomed 3x (nearest) to judge legibility."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
ORDER = "prompt rag llm guard human python pandas sklrn numpy sql etl bi node grpc pgsql supa docker kube git ts react next twind kotlin arcore agile uat reqs".split()
d, out = Path(sys.argv[1]), sys.argv[2]
def tile(key, size, bg, fg, zoom=1):
    a = Image.open(d / f"{key}-{size}.png").convert("RGBA").getchannel("A")
    t = Image.new("RGB", (size + 16, size + 16), bg)
    t.paste(Image.new("RGB", a.size, fg), (8, 8), a)
    return t.resize((t.width * zoom, t.height * zoom), Image.NEAREST) if zoom > 1 else t
cols, cw, ch = 7, 232, 196
S = Image.new("RGB", (cols * cw + 16, ((len(ORDER) + cols - 1) // cols) * ch + 16), (230, 230, 230))
D = ImageDraw.Draw(S)
for i, k in enumerate(ORDER):
    r, c = divmod(i, cols); x, y = 16 + c * cw, 16 + r * ch
    S.paste(tile(k, 64, "#3178C6", "#FFFFFF"), (x, y))
    S.paste(tile(k, 64, "#F59E0B", "#1A1A1A"), (x + 84, y))
    S.paste(tile(k, 24, "#3178C6", "#FFFFFF"), (x, y + 88))
    S.paste(tile(k, 24, "#F59E0B", "#1A1A1A"), (x + 44, y + 88))
    S.paste(tile(k, 24, "#3178C6", "#FFFFFF", 2), (x + 92, y + 88))
    D.text((x, y + 172), k, fill=(0, 0, 0))
S.save(out); print(out)
