# Storyboard: SilverLink SG (`/projects/silverlink`)

Owner: `design-visual-storyteller`. Status: visuals built and checked at 800px and 375px. Waiting on
the **NEEDS JOHN** list. Captions are drafts: **COPYWRITER** marks each one the `copywriter` should
review in `copy-case-studies.md` §1.

Reader: an engineering hiring manager with about two minutes. Order: problem → team and John's part
→ how it works → key decision → evidence → what next.

---

## 0. What John did, according to the sources

Sources read: `SilverLinkProject.tsx` (now and the first version in git `f6aec66`), `projects.ts`,
`copy-case-studies.md` §1, `copy.md`, `client/public/resume.pdf`, and the report images
`attached_assets/silverlink_p*.png`.

| Claim | Source | Who |
|---|---|---|
| Team project, Group 20, 6 people: Danish, John, Thomas, Hanaa, Habib, Joshua | page, resume | team |
| 4 gRPC services behind a REST-to-gRPC gateway, WebRTC livestreaming, 7 Agile sprints | resume, page | team |
| 8-node Kubernetes cluster, EMA load forecast | resume | team (see N3) |
| Version-checked optimistic concurrency, idempotency keys, 8 isolated schemas | resume, page | team |
| **Anything John built himself** | **none** | **NEEDS JOHN (N1)** |

The resume bullets start with "Built", "Scaled" and "Prevented", but the same entry says
"6-person team", and no source names John's own part. `copy-case-studies.md` already says: hide
"My part" and never write "I built" on this page until John answers. **No visual marks a "my part"
component.** The generator has a switch (`MINE` in `build_diagrams.py`) that adds a violet "my part"
tag and a double outline (a shape and a label, not colour alone). It is empty, and it should be
filled only from John's answer.

---

## 1. Frames

Sizes are CSS px. Desktop art is drawn for a 720 to 906px column (the lg window body is about 906px);
mobile art is drawn for 289 to 400px. Switch below 640px (`sm`). Smallest text is 14px in the
artwork: at least 12.6px at the narrowest planned width, 13.9px at 800 and 14.7px at 375 (measured).

### F1. The problem

- **Visual:** existing hero shot `events_discovery.png` (`attached_assets/silverlink_p19_img0.png`),
  already in `CaseHeader heroShot`. No new asset.
- **Text:** existing "The problem" section (copy-case-studies §1). Unchanged.

### F2. The team and John's part

- **Visual:** none until N1 is answered. The header facts (`Team project`, `Group 20, 6 people`) and
  the team note carry it.
- **After N1:** add John's components to `MINE`, rerun the generator, and add a "My part" section
  (copywriter) above "How it works".
- **Caption:** none.

### F3. How it works: architecture diagram (new)

- **Files:** `client/public/assets/case/silverlink/architecture-desktop.svg` (800 × 704),
  `architecture-mobile.svg` (320 × 1096). PNG fallbacks at 2x: `architecture-desktop.png`
  (1600 × 1408) and `architecture-mobile.png` (640 × 2192).
- **Sources:** tiers from the report flow `silverlink_p5_img0.png`; schema names, Prisma and
  connection pooling from `silverlink_p7_img0.png`; Keycloak, Cloudflare Tunnel and Neon from
  `silverlink_p13_img0.png`; `ReserveSeat` gRPC call from `silverlink_p21_img1.png`; EMA forecast
  from `silverlink_p23_img2.png`; min 1 and max 10 replicas from `silverlink_p23_img0.png`; 8 nodes
  from the resume. Not used: `silverlink_p8/p9/p10_img0.png`, which looks machine-generated and
  contradicts the other diagrams (it shows duplicate services and an "Authentication (OIC/JWT)
  Service" that no other source names).
- **Colour:** cream boxes with navy or black text, teal for data (schemas, load forecast), violet for
  labels and the numbered marker. No orange: nothing here is AI.
- **Caption (COPYWRITER):** "Four gRPC services behind one REST gateway, each with its own database
  schema."
- **Alt:** "Architecture diagram of SilverLink SG: front end, API gateway, four gRPC services in a
  Kubernetes cluster, and Neon PostgreSQL with 8 schemas. Full description below."
- **Long description:** Requests come in through a Cloudflare Tunnel (public HTTPS) to the Next.js
  and React front end. The front end signs users in with Keycloak (JWT) and calls an API gateway
  over REST. The gateway runs inside a Kubernetes cluster of 8 nodes and turns REST calls into gRPC
  calls to four services: Booking, Event, Volunteer and User. Booking calls Event's ReserveSeat over
  gRPC. Writes are version-checked, so a clash returns 409 Conflict instead of a second booking. A
  load forecast takes an exponential moving average (EMA) of requests per second and recommends 1 to
  10 replicas per service. Each service uses Prisma with pooled connections to its own schema in
  Neon serverless PostgreSQL (booking, event, volunteer, usersvc). Four more schemas (achievement,
  task, connection, notification) make 8 isolated schemas.

### F4. Key decision: no double-booking (new)

- **Files:** `double-booking-desktop.svg` (800 × 600, a sequence diagram), `double-booking-mobile.svg`
  (320 × 680, the same four steps as cards). PNG fallbacks: `double-booking-desktop.png` (1600 × 1200)
  and `double-booking-mobile.png` (640 × 1360).
- **Sources:** mechanism from the resume ("version-checked optimistic concurrency and idempotency
  keys for exactly-once request handling") and the first page version ("Version-checked atomic
  updates prevent double-booking… (409 on conflict)"; "repeated requests with the same key return
  the same result"). The update shape (`where version = expected`, `version: { increment: 1 }`)
  comes from the code in `silverlink_p20_img0.png`.
- **Labelled as an illustration.** That code updates a volunteer **task**, not a seat, and the
  ReserveSeat code is not shown. So the record is labelled "Shared record", the versions are `v` and
  `v+1` (no invented numbers), and success is "Booked" (no status code is invented; only 409 is
  sourced). See N2.
- **Pair with:** existing `event_detail.png` (capacity 17/20, Book and Cancel buttons): it shows
  where people see this rule.
- **Caption (COPYWRITER):** "Two requests for the same seat: the version check lets one through and
  answers the other with 409 Conflict."
- **Alt:** "Sequence diagram: two booking requests race for the same record; one is booked, the
  other gets 409 Conflict. Full description below."
- **Long description:** Requests A and B try to book the same seat at the same time. (1) Both read
  the shared record at version v. (2) A writes first with "update where version = v": 1 row
  changes and the version becomes v+1. (3) B sends the same version-checked write, but the version
  is now v+1, so 0 rows change. (4) A is booked; B gets 409 Conflict, so there is no overbooking. A
  retry that reuses the same idempotency key gets the first result back and never books twice.

### F5. Scaling ahead of demand: annotated real screenshot (new)

- **Files:** `metrics-annotated-desktop.png` (712 × 528 CSS, saved at 2x: 1424 × 1056, with 3
  callouts) and `metrics-annotated-mobile.png` (320 × 452 CSS, saved at 2x: 640 × 904, with 2
  callouts).
- **Source:** `attached_assets/silverlink_p23_img0.png`, the real System Metrics page. **Redaction:**
  cropped to drop the browser bar (URL `app.silverlink.cc`, browser profile icons) and the header
  row with the signed-in teammate's display name. On mobile, the Load Forecast and Autoscaling cards
  are two separate crops of the same capture, stacked. No pixels were retouched. Not used:
  `silverlink_p23_img1.png`, which shows a Windows "Activate Windows" watermark and the taskbar.
- **Callouts (inside the image):** 1 Load forecast: current load 0.06 RPS, predicted 1.10 RPS.
  2 Recommendation: 1 replica (min 1, max 10), target metric `silverlink_predicted_load_rps`.
  3 (desktop only) Raw metrics in Prometheus format.
- **Caption (COPYWRITER; from the current gallery):** "System metrics: current and forecast load,
  and the recommended replica count."
- **Alt:** "SilverLink System Metrics page with numbered callouts: 1, load forecast, current 0.06
  RPS and predicted 1.10 RPS; 2, autoscaling recommendation of 1 replica, min 1, max 10, target
  metric silverlink_predicted_load_rps; 3, raw Prometheus metrics." (Mobile: drop 3.)
- **Note:** the UI's own small text stays small on phones (it is a real capture). The callout list
  carries the meaning, and "Open full size" stays.
- This replaces `system_metrics.png` in the gallery; don't show both.

### F6. Evidence it worked

- **What the sources support:** a 6-person team shipped it in 7 sprints; the screenshots show it
  running (events, booking with live capacity, livestream studio, metrics). That is the existing
  Outcome line in copy-case-studies §1. **No visual and no numbers** until N4.
- **Caption:** none.

### F7. What John would do next

- **NEEDS JOHN (N5).** No source covers it. Leave it out rather than guess.

---

## 2. Wire-up notes for the `coder` (`SilverLinkProject.tsx`)

1. **F3:** in `CaseSection id="how"`, replace `<FlowDiagram steps={TIERS} …/>` with the architecture
   figure, and keep the `PixelList` under it. (Or put the figure on the navy page right after the
   section; see 3.) Use `<picture>` so phones get their own layout:
   ```tsx
   <picture>
     <source media="(max-width: 639px)" srcSet="/assets/case/silverlink/architecture-mobile.svg" width={320} height={1096} />
     <img src="/assets/case/silverlink/architecture-desktop.svg" width={800} height={704} alt="…" className="block w-full h-auto" loading="lazy" decoding="async" />
   </picture>
   ```
   Put the long description in a `<details><summary>Diagram in words</summary>…</details>` under the
   figure, or in a visually hidden paragraph referenced by `aria-describedby`. The SVG's own
   `<title>` and `<desc>` are not read when the SVG is loaded through `<img>`.
2. **F4:** the same pattern with `double-booking-*.svg`, after the architecture figure. It goes with
   the "Optimistic concurrency" and "Idempotency keys" bullets, or the future Key decisions section.
3. **Frame:** best as a `window--figure` (the `ScreenFigure` frame: violet bar, flush body, 4px
   shadow, caption). With that frame the art renders at 337px wide at 375 (scale 1.05). Inside the
   padded `CaseSection` window it renders at 289px (scale 0.9, text 12.6px): legible, but the
   figure frame is better. `ScreenFigure` takes one `src`. The smallest change is optional
   `srcMobile`, `widthMobile` and `heightMobile` on `Shot`, plus an optional `longDesc`. Suggested
   window titles: `architecture.svg`, `double_booking.svg`, `system_metrics.png`.
4. **Full size:** the desktop diagrams are 800 wide, so `ScreenFigure`'s `full` rule (≥ 860) won't
   span them across both gallery columns. Show the diagrams one per row, not in the 2-column gallery.
5. **F5:** in `SHOTS`, replace the `system_metrics.png` entry (`metricsImg`) with the annotated pair
   (`metrics-annotated-desktop.png` 712 × 528 / `-mobile.png` 320 × 452), with the alt above. The
   PNGs are 2x, so set `width` and `height` to the CSS sizes listed, not the file sizes. At 712 or
   more it is wider than half the gallery, so let it span both columns.
6. **PNG fallbacks** (`*.png` beside each SVG) are for places that can't take SVG (OG images, docs).
   The page should use the SVGs: fonts are embedded (Courier Prime 400 and 700, about 57–61 kB
   each), so they render the same everywhere.
7. Rebuild after an N1–N3 answer:
   `python3 design-system/portfolio/asset-work/storyboards/silverlink/build_diagrams.py`
   (writes the four SVGs), then render PNGs with
   `node .claude/skills/asset-toolkit/scripts/html2png.mjs <svg> --out <dir> --name <n> --size WxH --scale 2`.

## 3. For the UI designer (`design-system/portfolio/ui/`)

Diagram slot: 720–906px wide on desktop (art is 800 wide, aspect 800:704), and the full figure
width on phones below 640px (art is 320 wide, aspect 320:1096, so it runs tall). Don't crop or
letterbox it; the height follows the width.

---

## 4. NEEDS JOHN

- **N1 (= copy Q1).** What did you personally build: which services (Booking, Event, Volunteer,
  User), the gateway, the load forecast, the livestream, front-end screens, deployment? This decides
  F2 and the "my part" marks.
- **N2.** Does the seat booking path (Booking → Event `ReserveSeat`) use the same version check as
  the task-accept code in the report, and does the gateway return 409 for it? The flow diagram says
  "Shared record" until you confirm.
- **N3.** "8-node Kubernetes cluster" (resume) vs the report's deployment diagram (`p13`): "Docker
  Compose, 8 containers", with Kubernetes marked "Optional". Was it 8 nodes or 8 containers, and did
  the Kubernetes deployment run? The diagram says "Kubernetes cluster, 8 nodes" only because the
  resume and site do. Please confirm before this ships.
- **N4 (= copy Q2 + Q14).** Does the EMA forecast scale pods itself or only recommend (the diagram
  says "recommends")? Does it run in the API gateway (the raw metrics are labelled
  `service="api-gateway"`)? Was double-booking tested under concurrent load, and is there any result
  (test, grade, demo day)? Is `app.silverlink.cc` live?
- **N5.** What would you do next or change? Needed for F7.
- **N6.** Smaller inferences to confirm: each service owns the schema of the same name (booking,
  event, volunteer, usersvc), and the front end talks to Keycloak.
- **N7 (privacy, outside this task).** The live `event_detail.png` shows a user UUID and the display
  name "Big Show" in the Created by and nav areas. Crop it?

---

## 5. Source files

- Generator: `design-system/portfolio/asset-work/storyboards/silverlink/build_diagrams.py`
- Annotated screenshot page: `…/storyboards/silverlink/metrics-annotated.html` (one responsive page,
  two layouts) and its crops in `…/storyboards/silverlink/crops/`
- Fonts: `design-system/portfolio/ui/fonts/CourierPrime-{400,700}.woff2`
