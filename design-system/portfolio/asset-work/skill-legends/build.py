#!/usr/bin/env python3
"""Build the 28 Skills-keyboard keycap legends.

  python3 -I build.py <icons-src-dir> <out-dir>

<icons-src-dir> holds the extracted npm packages: si/package (simple-icons 16.36.0, CC0)
and dv/package (devicon 2.16.0, MIT). Output: one 128x128 SVG per key, a single path
filled #FFFFFF, glyph centred in a 104x104 box (12px padding).

Brand keys: the official mark from simple-icons (fallback devicon), transform baked into the
path data. Concept keys: original pixel glyphs on a 13x13 grid of 8px cells (13*8 = 104),
traced to one outline path so there are no seams between cells.
"""
import re
import sys
from pathlib import Path

import svgelements as se

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
SI = SRC / "si/package/icons"
DV = SRC / "dv/package/icons"

# key -> (source file, optical scale of the 104px box). Scale < 1 for marks that fill their
# box (squares, dense wordmarks) so every key reads at a similar optical size.
BRAND = {
    "python": (SI / "python.svg", 1.0),
    "pandas": (SI / "pandas.svg", 1.0),
    "sklrn": (SI / "scikitlearn.svg", 1.0),
    "numpy": (SI / "numpy.svg", 1.0),
    "node": (SI / "nodedotjs.svg", 1.0),
    "grpc": (DV / "grpc/grpc-plain.svg", 1.0),
    "pgsql": (SI / "postgresql.svg", 1.0),
    "supa": (SI / "supabase.svg", 1.0),
    "docker": (SI / "docker.svg", 1.0),
    "kube": (SI / "kubernetes.svg", 1.0),
    "git": (SI / "git.svg", 1.0),
    "ts": (SI / "typescript.svg", 1.0),
    "react": (SI / "react.svg", 1.0),
    "next": (SI / "nextdotjs.svg", 1.0),
    "twind": (SI / "tailwindcss.svg", 1.0),
    "kotlin": (SI / "kotlin.svg", 1.0),
}
if len(sys.argv) > 3:  # optional overrides: key=scale,key=scale
    for kv in sys.argv[3].split(","):
        k, v = kv.split("=")
        BRAND[k] = (BRAND[k][0], float(v))


def fmt(n):
    s = f"{n:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def brand_svg(src: Path, scale: float) -> str:
    text = src.read_text()
    ds = re.findall(r'<path[^>]*\sd="([^"]+)"', text)
    assert ds, src
    path = se.Path(" ".join(ds))
    x0, y0, x1, y1 = path.bbox()
    w, h = x1 - x0, y1 - y0
    box = 104 * scale
    k = box / max(w, h)
    m = se.Matrix(f"translate({64 - (x0 + w / 2) * k},{64 - (y0 + h / 2) * k}) scale({k})")
    path *= m
    path.reify()
    d = path.d()
    d = re.sub(r"-?\d+\.?\d*(?:e-?\d+)?", lambda mo: fmt(float(mo.group())), d)
    d = re.sub(r"\s*([A-Za-z])\s*", r"\1", d)
    d = re.sub(r"\s*,\s*", ",", d).replace(",-", "-")
    return d


# ---------- pixel glyphs ----------
N = 13


def grid(rows):
    rows = [r for r in rows.strip("\n").split("\n")]
    g = [[ch == "#" for ch in r.strip()] for r in rows]
    assert all(len(r) == N for r in g) and len(g) == N, rows
    return g


def trace(g, cell=8):
    """Union of filled cells -> one path (outer loops clockwise, holes counter-clockwise)."""
    edges = {}
    for r, row in enumerate(g):
        for c, on in enumerate(row):
            if not on:
                continue
            for a, b in (((c, r), (c + 1, r)), ((c + 1, r), (c + 1, r + 1)),
                         ((c + 1, r + 1), (c, r + 1)), ((c, r + 1), (c, r))):
                if (b, a) in edges:
                    del edges[(b, a)]
                else:
                    edges[(a, b)] = True
    out = {}
    for a, b in edges:
        out.setdefault(a, []).append(b)
    rs = [r for r, row in enumerate(g) if any(row)]
    cs = [c for row in g for c, on in enumerate(row) if on]
    minr, maxr, minc, maxc = min(rs), max(rs), min(cs), max(cs)
    ox = 64 - (maxc - minc + 1) * cell / 2 - minc * cell
    oy = 64 - (maxr - minr + 1) * cell / 2 - minr * cell
    parts = []
    while out:
        start = next(iter(out))
        loop = [start]
        cur = start
        while True:
            nxt = out[cur].pop()
            if not out[cur]:
                del out[cur]
            if nxt == start:
                break
            loop.append(nxt)
            cur = nxt
        # drop collinear points
        pts = []
        n = len(loop)
        for i in range(n):
            p, q, s = loop[i - 1], loop[i], loop[(i + 1) % n]
            if (q[0] - p[0]) * (s[1] - q[1]) - (q[1] - p[1]) * (s[0] - q[0]) != 0:
                pts.append(q)
        P = [(fmt(ox + x * cell), fmt(oy + y * cell)) for x, y in pts]
        seg = f"M{P[0][0]} {P[0][1]}"
        for i in range(1, len(P)):
            seg += f"H{P[i][0]}" if P[i][1] == P[i - 1][1] else f"V{P[i][1]}"
        parts.append(seg + "Z")
    return "".join(parts)


def halo_over(base, over):
    """Put `over` on top of `base` with a one-cell transparent gap around it."""
    g = [row[:] for row in base]
    for r in range(N):
        for c in range(N):
            if any(over[rr][cc] for rr in range(max(0, r - 1), min(N, r + 2))
                   for cc in range(max(0, c - 1), min(N, c + 2))):
                g[r][c] = False
    for r in range(N):
        for c in range(N):
            g[r][c] = g[r][c] or over[r][c]
    return g


def merge(a, b):
    return [[x or y for x, y in zip(ra, rb)] for ra, rb in zip(a, b)]


PIXEL = {}

PIXEL["prompt"] = grid("""
.............
##...........
###..........
.###.........
..###........
...###.......
....###......
...###.......
..###........
.###.........
###....######
##.....######
.............
""")

_doc = grid("""
#######......
########.....
#########....
#.....###....
#########....
#.....###....
#########....
#.....###....
#########....
#########....
#########....
#########....
#########....
""")
_lens = grid("""
.............
.............
.............
.............
.............
.......###...
......#####..
.....##...##.
.....##...##.
.....##...##.
......#####..
.......#####.
...........##
""")
_lens_hole = [[5 <= r <= 9 and 6 <= c <= 10 for c in range(N)] for r in range(N)]
_rag = halo_over(_doc, _lens)
PIXEL["rag"] = [[v and not (_lens_hole[r][c] and not _lens[r][c]) for c, v in enumerate(row)]
                for r, row in enumerate(_rag)]

PIXEL["llm"] = grid("""
.###########.
#############
#############
######.######
#####...#####
###.......###
#####...#####
######.######
#############
#############
.###########.
..###........
..##.........
""")

PIXEL["guard"] = grid("""
#############
#############
##.....######
##.....######
##.....######
##.....######
##.....######
.##....#####.
.##....#####.
..##...####..
...##..###...
....##.##....
......#......
""")

PIXEL["human"] = grid("""
.....###.....
....#####....
....#####....
....#####....
....#####....
.....###.....
.............
...#######...
..#########..
.###########.
.###########.
.###########.
.###########.
""")

PIXEL["etl"] = grid("""
####.........
#####...#....
...###..##...
....##..###..
....##..####.
############.
############.
....##..####.
....##..###..
...###..##...
#####...#....
####.........
.............
""")

PIXEL["bi"] = grid("""
.........###.
.........###.
.........###.
.........###.
.....###.###.
.....###.###.
.....###.###.
.###.###.###.
.###.###.###.
.###.###.###.
.###.###.###.
.............
#############
""")

PIXEL["agile"] = grid("""
....#####.#..
..#######.##.
.###.....###.
.##.....####.
##...........
##...........
##.........##
##.........##
.##.......##.
.###.....###.
..#########..
....#####....
.............
""")

PIXEL["uat"] = grid("""
.............
..#########..
.###########.
.###########.
.#######..##.
.######..###.
.##..#..####.
.###...#####.
.####.######.
.###########.
.###########.
..#########..
.............
""")

PIXEL["reqs"] = grid("""
....#####....
....#####....
.##.#####.##.
.##.......##.
.###########.
.###########.
.##.......##.
.###########.
.##.......##.
.###########.
.##.....####.
.###########.
.###########.
""")

PIXEL["sql"] = grid("""
...#######...
.###########.
.###########.
...#######...
.##.......##.
.###########.
.###########.
...#######...
.##.......##.
.###########.
.###########.
.###########.
...#######...
""")

PIXEL["arcore"] = grid("""
##.........##
#...........#
.....###.....
...##...##...
.##.......##.
.#.##...##.#.
.#...###...#.
.#....#....#.
.#....#....#.
.##...#...##.
...##.#.##...
#....###....#
##.........##
""")

HEAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'
for key, (src, scale) in BRAND.items():
    (OUT / f"{key}.svg").write_text(f'{HEAD}<path fill="#FFFFFF" d="{brand_svg(src, scale)}"/></svg>\n')
for key, g in PIXEL.items():
    (OUT / f"{key}.svg").write_text(f'{HEAD}<path fill="#FFFFFF" d="{trace(g)}"/></svg>\n')
    if "--ascii" in sys.argv:
        print(key)
        print("\n".join("".join("#" if v else "." for v in row) for row in g))
print(len(BRAND) + len(PIXEL), "files ->", OUT)
