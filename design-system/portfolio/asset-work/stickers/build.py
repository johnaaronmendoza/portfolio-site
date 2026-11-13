"""Original 16x16 pixel stickers in the Paper & Ink palette (Nov 2026): the CD,
folder, phone, notepad and magnifier, drawn from scratch to stand in for the
Windows 95 icons on John's reference sheet (Microsoft's designs can't be used).
John's own pixel art lives in client/public/assets/stickers/ (see its README). Writes client/public/assets/pixel/sticker-<name>.svg.
K ink, W paper white, Y yellow, B blue, S warm-grey shade (keycap side tone)."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[4]
OUT = ROOT / 'client/public/assets/pixel'
COL = {'K': '#000000', 'W': '#FFFFFF', 'Y': '#FFD23F', 'B': '#3A66FF', 'S': '#B5B0A4'}
ART = {
'cd': """
.....KKKKKK.....
...KKWWWWWWKK...
..KWWBBWWWWWWK..
.KWWBBWWWWWWWWK.
.KWBBWWWWWWWWYK.
KWWBWWWKKWWWYYWK
KWWWWWKWWKWWYWWK
KWWWWWKWWKWWWWWK
KWWWWWWKKWWWWWWK
KWWYWWWWWWWWBWWK
.KWYYWWWWWWBBWK.
.KWWYYWWWWBBWWK.
..KWWWWWWWBWWK..
...KKWWWWWWKK...
.....KKKKKK.....
................""",
'folder': """
................
................
.KKKKK..........
KYYYYYK.........
KYYYYYYKKKKKKKK.
KYYYYYYYYYYYYYYK
KYYYYYYYYYYYYYYK
KKKKKKKKKKKKKKKK
KYYYYYYYYYYYYYYK
KYYYYYYYYYYYYYYK
KYYYYYYYYYYYYYYK
KYYYYYYYYYYYYYYK
KYYYYYYYYYYYYYSK
KSSSSSSSSSSSSSSK
.KKKKKKKKKKKKKK.
................""",
'phone': """
................
..KKKKKKKKKKKK..
.KWWWWWWWWWWWWK.
KWWKKKKKKKKKKWWK
KWK..........KWK
.K..KKKKKKKK..K.
...KWWWWWWWWK...
..KWWWKKKKWWWK..
..KWWKWWWWKWWK..
.KWWWKWBBWKWWWK.
.KWWWKWWWWKWWWK.
KWWWWWKKKKWWWWWK
KWWWWWWWWWWWWWWK
KSSSSSSSSSSSSSSK
KKKKKKKKKKKKKKKK
................""",
'notepad': """
..K.K.K.K.K.....
.KKKKKKKKKKKK...
.KBBBBBBBBBBK...
.KWWWWWWWWWWKS..
.KWKKKKKKKKWKS..
.KWWWWWWWWWWKS..
.KWKKKKKKKKWKS..
.KWWWWWWWWWWKS..
.KWKKKKKKWWWKS..
.KWWWWWWWWWWKS..
.KWKKKKKKKKWKS..
.KWWWWWWWWWWKS..
.KKKKKKKKKKKKS..
..SSSSSSSSSSSS..
................
................""",
'magnifier': """
................
....KKKKK.......
..KKWWWWWKK.....
.KWWBWWWWWWK....
.KWBWWWWWWWK....
KWWBWWWWWWWWK...
KWWWWWWWWWWWK...
KWWWWWWWWWWWK...
.KWWWWWWWWWK....
.KWWWWWWWWWK....
..KKWWWWWKKK....
....KKKKKKYYK...
..........KYYK..
...........KYYK.
............KYYK
.............KK.""",
}
for name, art in ART.items():
    rows = [r.ljust(16, '.')[:16] for r in art.strip('\n').split('\n')]
    rows = (rows + ['.' * 16] * 16)[:16]
    paths = {}
    for y, r in enumerate(rows):
        for x, c in enumerate(r):
            if c in COL:
                paths.setdefault(c, []).append(f'M{x} {y}h1v1h-1z')
    body = ''.join(f'<path fill="{COL[c]}" d="{"".join(d)}"/>' for c, d in paths.items())
    (OUT / f'sticker-{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges">{body}</svg>')
print(' '.join(ART))
