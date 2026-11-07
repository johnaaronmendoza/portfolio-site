#!/usr/bin/env python3
"""SilverLink SG case-study diagrams, written as SVG (genclaw-method: code is the canvas).

Builds four files into client/public/assets/case/silverlink/:
  architecture-desktop.svg  (800 wide, for the ~720-906px content column)
  architecture-mobile.svg   (320 wide, for 375px phones; ~289-343px rendered)
  double-booking-desktop.svg
  double-booking-mobile.svg

Every label is a component the sources name (see storyboards/silverlink.md, "Sources").
Text is real <text> in Courier Prime (the site's body face), embedded as base64 so the
SVG renders the same inside an <img>. Smallest text is 14 viewBox px, so it stays
>= 12.6 CSS px at the smallest planned render scale (0.9).

John's part: MINE lists node ids to mark with a violet "my part" tag. It is EMPTY on
purpose: no source says which parts John built (storyboard NEEDS JOHN 1). Fill it only
from John's answer, e.g. MINE = {"booking", "gateway"}, then rerun.

Run: python3 design-system/portfolio/asset-work/storyboards/silverlink/build_diagrams.py
"""
import base64
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[5]
FONTS = ROOT / "design-system/portfolio/ui/fonts"
OUT = ROOT / "client/public/assets/case/silverlink"

MINE: set[str] = set()  # NEEDS JOHN: ids from {"frontend","gateway","forecast","booking","event","volunteer","user"}

# Palette (CLAUDE.md). Teal = data; no orange here (nothing in SilverLink is AI).
NAVY, INK, CREAM, TEAL, VIOLET = "#16163F", "#000000", "#F4EAD5", "#2EC4B6", "#6C4AD0"
CH = 0.6  # Courier Prime advance width, em


def font_css() -> str:
    faces = []
    for weight in (400, 700):
        data = base64.b64encode((FONTS / f"CourierPrime-{weight}.woff2").read_bytes()).decode()
        faces.append(
            "@font-face{font-family:'Courier Prime';font-weight:%d;"
            "src:url(data:font/woff2;base64,%s) format('woff2');}" % (weight, data)
        )
    return "".join(faces)


class Svg:
    def __init__(self, w: int, h: int, title: str, desc: str):
        self.w, self.h, self.title, self.desc = w, h, title, desc
        self.parts: list[str] = []

    def add(self, s: str):
        self.parts.append(s)

    def text(self, x, y, s, size=16, bold=False, fill=NAVY, anchor="middle"):
        self.add(
            f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{700 if bold else 400}" '
            f'fill="{fill}" text-anchor="{anchor}">{escape(s)}</text>'
        )

    def box(self, x, y, w, h, fill=CREAM, shadow=4, stroke=3, dash=None, node_id=None):
        if shadow:
            self.add(f'<rect x="{x + shadow}" y="{y + shadow}" width="{w}" height="{h}" fill="{INK}"/>')
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.add(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{INK}" '
            f'stroke-width="{stroke}"{d}/>'
        )
        if node_id and node_id in MINE:
            # Violet double outline + tag: shape and text, not colour alone
            self.add(f'<rect x="{x - 7}" y="{y - 7}" width="{w + 14}" height="{h + 14}" fill="none" '
                     f'stroke="{VIOLET}" stroke-width="4"/>')
            tw = int(len("my part") * 14 * CH) + 12
            self.add(f'<rect x="{x + w - tw}" y="{y - 22}" width="{tw}" height="22" fill="{VIOLET}"/>')
            self.text(x + w - tw / 2, y - 6, "my part", 14, True, CREAM)

    def node(self, x, y, w, h, lines, fill=CREAM, node_id=None, size=16):
        """Box with a bold first line and regular sub-lines, centred."""
        self.box(x, y, w, h, fill, node_id=node_id)
        n = len(lines)
        lh = 19
        top = y + h / 2 - (n - 1) * lh / 2 + 5
        for i, s in enumerate(lines):
            self.text(x + w / 2, top + i * lh, s, size if i == 0 else 14, i == 0, INK if fill != CREAM else NAVY)

    def line(self, pts, arrow=True, dash=None, width=3, both=False):
        p = " ".join(f"{a},{b}" for a, b in pts)
        d = f' stroke-dasharray="{dash}"' if dash else ""
        m = (' marker-end="url(#ah)"' if arrow else "") + (' marker-start="url(#ah)"' if both else "")
        self.add(f'<polyline points="{p}" fill="none" stroke="{INK}" stroke-width="{width}" '
                 f'stroke-linejoin="miter"{d}{m}/>')

    def tab(self, x, y, s, size=14):
        lines = s if isinstance(s, list) else [s]
        w = int(max(map(len, lines)) * size * CH) + 20
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{8 + 20 * len(lines)}" fill="{VIOLET}" '
                 f'stroke="{INK}" stroke-width="3"/>')
        for i, ln in enumerate(lines):
            self.text(x + 10, y + 19 + 20 * i, ln, size, True, CREAM, "start")

    def marker(self, cx, cy, label="1", fill=VIOLET):
        self.add(f'<rect x="{cx - 13}" y="{cy - 13}" width="26" height="26" fill="{fill}" stroke="{INK}" stroke-width="3"/>')
        self.text(cx, cy + 5, label, 16, True, CREAM)

    def chip(self, x, y, w, s):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="32" fill="{TEAL}" stroke="{INK}" stroke-width="3"/>')
        self.text(x + w / 2, y + 21, s, 14, True, INK)

    def render(self) -> str:
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" '
            f'width="{self.w}" height="{self.h}" role="img" aria-labelledby="t d">'
            f'<title id="t">{escape(self.title)}</title><desc id="d">{escape(self.desc)}</desc>'
            f"<defs><style>{font_css()}text{{font-family:'Courier Prime',ui-monospace,monospace}}</style>"
            f'<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" '
            f'orient="auto-start-reverse" markerUnits="strokeWidth"><path d="M0,0 L10,5 L0,10 z" fill="{INK}"/></marker>'
            f"</defs>"
            f'<rect width="{self.w}" height="{self.h}" fill="{CREAM}"/>' + "".join(self.parts) + "</svg>\n"
        )


ARCH_TITLE = "SilverLink SG architecture"
ARCH_DESC = (
    "Requests enter through a Cloudflare Tunnel to the Next.js and React front end, which signs users in with "
    "Keycloak (JWT) and calls an API gateway over REST. Inside a Kubernetes cluster of 8 nodes, the gateway turns "
    "REST into gRPC calls to four services: Booking, Event, Volunteer and User. Booking reserves seats by calling "
    "Event's ReserveSeat over gRPC; writes are version-checked, so a clash returns 409 Conflict instead of a second "
    "booking. A load forecast takes an exponential moving average of requests per second and recommends 1 to 10 "
    "replicas per service. Each service owns its own schema in Neon serverless PostgreSQL through Prisma: booking, "
    "event, volunteer and usersvc, plus four more schemas (achievement, task, connection, notification), 8 in all."
)
LEGEND = [
    "Booking calls Event's ReserveSeat over gRPC. Writes are",
    "version-checked, so a clash returns 409 Conflict, not a second booking.",
]
SERVICES = [("booking", "Booking"), ("event", "Event"), ("volunteer", "Volunteer"), ("user", "User")]
OWN_SCHEMAS = ["booking", "event", "volunteer", "usersvc"]
MORE_SCHEMAS = ["achievement", "task", "connection", "notification"]



def architecture_desktop() -> str:
    s = Svg(800, 704, ARCH_TITLE, ARCH_DESC)
    # Edge row
    s.node(16, 20, 208, 64, ["Cloudflare Tunnel", "public HTTPS"])
    s.node(296, 20, 208, 64, ["Front end", "Next.js + React"], node_id="frontend")
    s.node(576, 20, 208, 64, ["Keycloak", "sign-in, JWT"])
    s.line([(228, 52), (290, 52)])
    s.line([(520, 52), (570, 52)], both=True)
    # Cluster
    s.box(16, 136, 768, 296, CREAM, shadow=6)
    s.tab(16, 136, "Kubernetes cluster, 8 nodes")
    s.line([(400, 88), (400, 186)])
    s.text(412, 120, "REST", 14, True, NAVY, "start")
    s.node(296, 190, 208, 64, ["API gateway", "REST to gRPC"], node_id="gateway")
    s.node(576, 178, 192, 108, ["Load forecast", "EMA of requests/s", "recommends 1–10", "replicas/service"],
           fill=TEAL, node_id="forecast")
    s.line([(508, 222), (570, 222)], dash="6 5")
    s.text(540, 212, "req/s", 14, False, NAVY)
    # gRPC bus to the four services
    xs, w = [32, 248, 432, 616], 152
    s.line([(400, 258), (400, 306)], arrow=False)
    s.line([(xs[0] + w / 2, 306), (xs[3] + w / 2, 306)], arrow=False)
    for x in xs:
        s.line([(x + w / 2, 306), (x + w / 2, 330)])
    s.text(412, 296, "gRPC", 14, True, NAVY, "start")
    for x, (nid, name) in zip(xs, SERVICES):
        s.node(x, 334, w, 56, [name], node_id=nid)
    # (1) ReserveSeat: Booking -> Event
    s.line([(xs[0] + w + 8, 362), (xs[1] - 6, 362)])
    s.marker((xs[0] + w + xs[1]) // 2 + 2, 410, "1")
    # Data
    # Chips first, so the service lines end on them and never cross the panel's text
    s.box(16, 464, 768, 164, CREAM, shadow=6)
    for x, name in zip(xs, OWN_SCHEMAS):
        s.line([(x + w / 2, 394), (x + w / 2, 476)])
        s.chip(x, 480, w, name)
    s.text(32, 545, "more:", 14, True, NAVY, "start")
    for x, name in zip([96, 266, 436, 606], MORE_SCHEMAS):
        s.chip(x, 524, 162, name)
    s.text(32, 588, "Neon serverless PostgreSQL", 16, True, NAVY, "start")
    s.text(32, 608, "Prisma, pooled connections, 8 isolated schemas", 14, False, NAVY, "start")
    # Legend
    s.marker(29, 664, "1")
    s.text(52, 660, LEGEND[0], 14, False, NAVY, "start")
    s.text(52, 680, LEGEND[1], 14, False, NAVY, "start")
    return s.render()


def architecture_mobile() -> str:
    s = Svg(320, 1096, ARCH_TITLE, ARCH_DESC)
    s.node(16, 16, 284, 60, ["Cloudflare Tunnel", "public HTTPS"])
    s.line([(224, 80), (224, 102)])
    s.node(144, 106, 160, 60, ["Front end", "Next.js + React"], node_id="frontend")
    s.node(16, 106, 112, 60, ["Keycloak", "sign-in, JWT"])
    s.line([(132, 136), (140, 136)], arrow=False)
    # Cluster
    s.box(16, 214, 288, 506, CREAM, shadow=6)
    s.tab(16, 214, ["Kubernetes cluster,", "8 nodes"])
    s.line([(224, 170), (224, 262)])
    s.text(232, 200, "REST", 14, True, NAVY, "start")
    s.node(32, 266, 256, 60, ["API gateway", "REST to gRPC"], node_id="gateway")
    # Forecast sits off the request path, to the right
    s.line([(200, 330), (200, 350)], dash="6 5")
    s.text(208, 344, "req/s", 14, False, NAVY, "start")
    s.node(112, 354, 176, 108, ["Load forecast", "EMA of requests/s", "recommends 1–10", "replicas/service"],
           fill=TEAL, node_id="forecast")
    s.line([(60, 330), (60, 494)])
    # Services group (dashed frame = the four gRPC services)
    s.box(28, 498, 264, 188, CREAM, shadow=0, stroke=3, dash="8 6")
    pos = [(40, 514), (176, 514), (40, 614), (176, 614)]
    for (x, y), (nid, name) in zip(pos, SERVICES):
        s.node(x, y, 104, 56, [name], node_id=nid)
    s.line([(148, 542), (170, 542)])
    s.marker(160, 594, "1")
    s.text(68, 484, "gRPC", 14, True, NAVY, "start")
    # Data
    s.line([(160, 690), (160, 774)])
    s.text(170, 764, "Prisma", 14, True, NAVY, "start")
    s.box(16, 778, 288, 194, CREAM, shadow=6)
    s.text(32, 804, "Neon serverless", 16, True, NAVY, "start")
    s.text(32, 824, "PostgreSQL, 8 schemas", 14, False, NAVY, "start")
    for i, name in enumerate(OWN_SCHEMAS + MORE_SCHEMAS):
        col, row = i % 2, i // 2
        s.chip(32 + col * 132, 838 + row * 32, 124, name)
    # Legend
    s.marker(29, 1000, "1")
    for i, ln in enumerate(LEGEND_M_SHORT):
        s.text(52, 996 + i * 20, ln, 14, False, NAVY, "start")
    return s.render()


FLOW_TITLE = "How SilverLink blocks a double booking"
FLOW_DESC = (
    "Illustration of optimistic concurrency. Requests A and B both read a shared record at version v. "
    "A writes with 'update where version = v': 1 row changes and the version becomes v+1. "
    "B sends the same version-checked write, but the version is now v+1, so 0 rows change. "
    "A is booked; B gets 409 Conflict instead of a second booking. "
    "A retry that reuses the same idempotency key returns the first result and never books twice."
)
RETRY = "A retry with the same idempotency key gets the first result back. It never books twice."


def flow_desktop() -> str:
    s = Svg(800, 600, FLOW_TITLE, FLOW_DESC)
    ax, rx, bx = 116, 400, 684
    s.node(16, 16, 200, 60, ["Request A", "same seat, same time"])
    s.node(584, 16, 200, 60, ["Request B", "same seat, same time"])
    s.node(296, 16, 208, 60, ["Shared record", "version v"], fill=TEAL)
    for x in (ax, rx, bx):
        s.line([(x, 82), (x, 470)], arrow=False, dash="4 6", width=2)
    # 1 read
    s.marker(150, 116, "1", INK); s.text(170, 121, "read: version v", 14, False, NAVY, "start")
    s.line([(ax, 136), (rx - 6, 136)])
    s.marker(434, 116, "1", INK); s.text(454, 121, "read: version v", 14, False, NAVY, "start")
    s.line([(bx, 136), (rx + 6, 136)])
    # 2 A writes first
    s.marker(150, 186, "2", INK); s.text(170, 191, "update where version = v", 14, False, NAVY, "start")
    s.line([(ax, 206), (rx - 6, 206)])
    s.node(300, 216, 200, 52, ["1 row changed", "now version v+1"], fill=TEAL, size=14)
    # 3 B writes with a stale version
    s.marker(434, 290, "3", INK); s.text(454, 295, "update where", 14, False, NAVY, "start")
    s.text(454, 313, "version = v", 14, False, NAVY, "start")
    s.line([(bx, 330), (rx + 6, 330)])
    s.node(300, 340, 200, 52, ["0 rows changed", "version is v+1"], fill=TEAL, size=14)
    # 4 results
    s.marker(150, 416, "4", INK)
    s.line([(rx - 6, 440), (ax + 6, 440)], dash="6 5")
    s.marker(434, 416, "4", INK)
    s.line([(rx + 6, 440), (bx - 6, 440)], dash="6 5")
    s.node(16, 474, 200, 60, ["Booked"])
    s.box(584, 474, 200, 60, VIOLET)
    s.text(684, 500, "409 Conflict", 16, True, CREAM)
    s.text(684, 519, "no overbooking", 14, False, CREAM)
    s.text(16, 576, RETRY, 14, False, NAVY, "start")
    return s.render()


def flow_mobile() -> str:
    s = Svg(320, 680, FLOW_TITLE, FLOW_DESC)
    s.text(16, 26, "Requests A and B try to", 14, False, NAVY, "start")
    s.text(16, 46, "book the same seat at once.", 14, False, NAVY, "start")
    s.node(16, 62, 288, 52, ["Shared record", "version v"], fill=TEAL)
    def step(y, n, lines, h):
        s.box(16, y, 288, h, CREAM)
        s.marker(41, y + 26, n, INK)
        for i, ln in enumerate(lines):
            s.text(64, y + 31 + i * 20, ln, 14 if i else 16, i == 0, NAVY, "start")
    step(134, "1", ["A and B read", "the record: version v"], 64)
    step(214, "2", ["A writes first", "update where version = v"], 64)
    s.node(64, 286, 240, 52, ["1 row changed", "now version v+1"], fill=TEAL, size=14)
    step(358, "3", ["B writes next", "update where version = v"], 64)
    s.node(64, 430, 240, 52, ["0 rows changed", "version is v+1"], fill=TEAL, size=14)
    s.marker(29, 520, "4", INK)
    s.node(52, 502, 100, 52, ["A: booked"], size=14)
    s.box(164, 502, 140, 52, VIOLET)
    s.text(234, 524, "B: 409", 16, True, CREAM)
    s.text(234, 543, "Conflict", 14, False, CREAM)
    for i, ln in enumerate(["A retry with the same", "idempotency key gets the", "first result back. It never", "books twice."]):
        s.text(16, 600 + i * 20, ln, 14, False, NAVY, "start")
    return s.render()


LEGEND_M_SHORT = ["Booking calls Event's", "ReserveSeat over gRPC.", "Writes are version-checked:", "a clash returns 409 Conflict,", "not a second booking."]


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "architecture-desktop.svg").write_text(architecture_desktop())
    (OUT / "architecture-mobile.svg").write_text(architecture_mobile())
    (OUT / "double-booking-desktop.svg").write_text(flow_desktop())
    (OUT / "double-booking-mobile.svg").write_text(flow_mobile())
    print("wrote", OUT)
