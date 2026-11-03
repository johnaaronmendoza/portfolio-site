# Case-study copy deck (retro-web)

Owner: copywriter. Companion to `copy.md` (Home). Same audience: recruiters for
AI, data and software graduate roles, skimming on a phone.

Conventions for the coder:

- `→` means "replace with". Strings in backticks are exact.
- Sentence case everywhere, stat labels included (no more `uppercase
  tracking-widest`). Pixel-font display headings may stay as set by the designer.
- Every fact is already on the page, in `client/public/resume.pdf`, or confirmed
  by John in the brief. **[resume]** marks a fact added from the resume.
  **NEEDS JOHN Qn** points to the question list at the end.
- Arrows (`←`, `→`) are icons: wrap in `aria-hidden="true"`. External links get
  sr-only ` (opens in a new tab)`.
- Tech tags lose the `--` prefix and underscores (`Prisma_ORM` → `Prisma ORM`).
- Section order follows the designer's template. Headings below map to it.

---

## 0. Shared strings (all six pages)

| Element | Current | Proposed |
|---|---|---|
| Sticky nav link | `← Back` | `← All projects` |
| Sticky nav crumb | `/ {Project name}` | keep (mobile AI Finance crumb `/ AI Finance` stays) |
| `<title>` | `{Name} \| John Aaron Branzuela` | keep |
| Section headings | `The challenge`, `The solution`, `My contributions`, `Platform UI`, `Admin panel`, `Features`, `Engineering highlights`, `Advanced features`, `Methodology`, `Architecture`, `Results`, `Screenshots`, `App screens`, `Key features`, `UAT process` | Template headings: `The problem`, `What it does`, `My part`, `Key decisions`, `Screens`, `Outcome`, `Tech stack`, `Next project` |
| Meta labels | `Institution`, `Team`, `Course`, `Type`, `Domain`, `Dataset`, `Platform`, `Sprints`, `Roles`, `Year` | `Type`, `Team`, `Year`, `Stack`, `Links` (plus `My role` where known) |
| Link card heading (GitHub profile) | `GitHub profile` / `All repositories` | `GitHub profile` / sub-line `My repositories` (it is not this project's repo; see Q13) |
| End-of-page heading | `View more projects` | `Next project` |
| End buttons | `← Back to portfolio`, `{Name} →` | `Next: {full project name}` (primary), `All projects` (secondary) |

**Next-project order** (match the Projects grid; today it jumps SCS → Fire Safety
→ UWB → UAT → AI Finance):
SilverLink SG → SCS Awareness Platform → AI Finance Insights Engine → UWB Indoor
Localization → UAT Testing Dashboard → Fire Safety Drill Companion → SilverLink SG.

---

## 1. SilverLink SG: `SilverLinkProject.tsx`

Window title: `silverlink_sg.exe`

### Header

- Summary (l.46) "Cloud-native platform bridging seniors and youth… Kubernetes
  autoscaling that scales to demand without manual intervention."
  → "Connects seniors and youth through skill-sharing and live events, and
  blocks double-bookings when many people book at once."
- Meta (l.55–61)
  - `Institution: University of Glasgow & Singapore Institute of Technology`
    → `Type: Team project, SIT × University of Glasgow`
  - `Team: Group 20: Danish, John, Thomas, Hanaa, Habib, Joshua`
    → `Team: Group 20, 6 people: Danish, John, Thomas, Hanaa, Habib, Joshua`
  - new `Year: 2025`
  - `Links: GitHub profile`
- Key stats (l.90–93) `4 GRPC MICROSERVICES`, `6 TEAM MEMBERS`, `7 AGILE
  SPRINTS`, `WebRTC LIVESTREAMING`
  → `4` gRPC microservices, `8` Kubernetes nodes **[resume]**, `8` isolated
  database schemas, `7` Agile sprints.
  Why: "WebRTC" isn't a figure; team size moves to meta. 8-node matches the
  Home card.

### The problem (l.109–118, "The challenge")

→ "By 2030, 1 in 4 Singaporeans will be over 65. Many seniors face isolation
and are left out of digital life, while young people miss out on what older
generations can teach them."

Brief quote "…(PB-2)" → label `The course brief asked:` then
"How might we use technology that is intuitive, culturally sensitive and
engaging to build community among seniors?" (drop the `PB-2` code; it means
nothing to a visitor).

### What it does (l.123–145, "The solution")

Intro "SilverLink SG transforms potential social fragmentation into meaningful
intergenerational exchange…" → "A web platform where seniors and youth can:"

- `Skill-sharing workshops and mentorship` → Teach and learn skills in
  workshops and mentoring
- `Micro-volunteering task marketplace` → Pick up small volunteering tasks
- `Event booking with seat management` → Book seats at community events
- `Live video streaming via WebRTC` → Host and watch livestreams (WebRTC)
- `Real-time chat with Socket.IO` → Chat live during events (Socket.IO)
- `Achievement badges and recognition system` → Earn achievement badges

The two engineering bullets (EMA autoscaling, optimistic concurrency) move to
Key decisions.

### My part

**NEEDS JOHN Q1.** Until answered, hide this section; the meta line
`Type: Team project` carries it. Do not say "I built" anywhere on this page.

### Key decisions (from "Architecture" and "Key algorithms", l.200–250)

1. **No double-booking.** A booking saves only if the seat record hasn't
   changed since it was read (optimistic concurrency). A clash returns
   409 Conflict instead of overbooking.
2. **Retries book once.** Idempotency keys make a repeated request return the
   same result, so each request runs exactly once.
3. **Scale before the rush.** An exponential moving average (EMA) forecasts
   load and sets a recommended replica count per service. (**NEEDS JOHN Q2**:
   the page says "recommends"; the summary and resume say it scales
   automatically. Keep "recommended" until confirmed.)
4. **One gateway, four services.** An API gateway turns REST calls into gRPC
   for the Event, Booking, Volunteer and User services.
5. **Each service owns its data.** 8 isolated schemas on Neon serverless
   PostgreSQL, a Prisma client per service, and connection pooling.
6. **Deploy and secure.** Docker Compose locally, Kubernetes in the cluster,
   Keycloak sign-in with JWT, GitHub Actions CI/CD, Cloudflare Tunnel for HTTPS,
   one-command deploy scripts, secrets held in CI/CD and Kubernetes.

Dropped: port numbers (`50051`, `50052`) and "type-safe". Noise for this reader.

### Screens (l.155–191, "Platform UI")

| Image | Caption (current → proposed) | Alt (current → proposed) |
|---|---|---|
| `onboardingImg` p14 | `ONBOARDING FLOW` → Onboarding: a five-step setup for new users. | "SilverLink onboarding" → "SilverLink onboarding, step 1 of 5: a 'Welcome to SilverLink!' card with a progress bar and Back and Next buttons." |
| `eventsImg` p19 | `EVENTS DISCOVERY` → Events: workshops and livestreams, each with region, venue and length. | "SilverLink events listing" → "Grid of SilverLink event cards, such as Online Morning Tai Chi (livestream) and Smartphone Basics for Seniors at Yishun Community Centre, with View details and Watch live buttons." |
| `eventDetailImg` p21 | `EVENT DETAIL + BOOKING` → Event page: book or cancel a session, with capacity shown for each. | "SilverLink event detail" → "Event page for a Traditional Peranakan Cooking Workshop at Toa Payoh Community Centre, listing three sessions with capacity counts and Book or Cancel booking buttons." |
| `livestreamImg` p22 | `LIVE STREAMING STUDIO` → Livestream studio: the event owner broadcasts while viewers chat. | "SilverLink livestream" → "Livestream Studio page with a live camera preview, Stop broadcast, Mute and Camera off controls, and a live chat panel." |
| `metricsImg` p23 | `SYSTEM METRICS + AUTOSCALING DASHBOARD` → System metrics: current and forecast load, and the recommended replica count. | "SilverLink system metrics" → "System Metrics dashboard showing requests per second, queue length, 212 ms average response time, a load forecast and an autoscaling recommendation of 1 replica (min 1, max 10)." |

### Outcome (new)

"A 6-person team delivered it in 7 Agile sprints: 4 gRPC services on an 8-node
Kubernetes cluster, with livestreaming, live chat and double-booking
protection." (**NEEDS JOHN Q14** for any real-world result.)

### Tech stack (l.49)

React, Next.js, Node.js, gRPC, Docker, Kubernetes, PostgreSQL (Neon), Prisma
ORM, Keycloak, Cloudflare Tunnel, WebRTC, Socket.IO, GitHub Actions.

### Next project

`Next: SCS Awareness Platform` (was `SCS platform →`).

---

## 2. SCS Awareness Platform: `SCSProject.tsx`

Window title: `scs_awareness.exe`

### Header

- Summary (l.47–49) "Interactive visual novel engine for Singapore Cancer
  Society outreach booths. Multilingual branching stories, gamification, and a
  full no-code admin panel for SCS staff, deployed on tablets at community
  events."
  → "Turns Singapore Cancer Society outreach booths into a story visitors play
  on a tablet, in English, Chinese, Malay or Tamil."
- Meta (l.58–63)
  - `Institution: SIT + University of Glasgow` → `Type: Team project for the
    Singapore Cancer Society, SIT × University of Glasgow` **[resume]**
  - `Team: Group D2: 4 members, 7 sprints` → `Team: Group D2, 4 people`
  - new `My role: Core engine and media systems`
  - new `Year: 2025`
  - `Links: GitHub profile`
- Key stats (l.93–96) `7 AGILE SPRINTS`, `4 LANGUAGES SUPPORTED`, `4 QUESTION
  TYPES`, `No-Code ADMIN PANEL`
  → `4` languages, `4` question types, `4` people on the team, `7` Agile
  sprints. ("No-code" is a feature, not a figure; it leads What it does.)

### The problem (l.112–119)

→ "SCS runs community booths to raise cancer awareness and encourage early
screening. The booths weren't interactive: many visitors found them dull or
stayed away because of stigma, so they learned little and showed less interest
in screening."

### What it does (from "Features", l.198–244, and the Admin panel intro l.155)

**For visitors at the booth**
- Play a branching story with pixel-art characters
- Answer 4 question types: single choice, multiple choice, true/false and
  branching
- Play in English, Chinese, Malay or Tamil
- See their score and a top-10 leaderboard with their own rank
- Agree to a PDPA consent notice before playing (staff can edit the wording)
- Get confetti and a sound when they answer correctly

**For SCS staff, with no code** (intro l.155 "A full no-code CMS allowing…"
→ "SCS staff run everything from a no-code admin panel:")
- Edit panels in a WYSIWYG editor with live preview
- Upload sprites and backgrounds by drag and drop
- See a story's branches as a colour-coded flow map (6 colours)
- View analytics and export them to Excel or CSV
- Auto-translate text with the MyMemory API
- Manage admin and super admin accounts

### My part (l.124–144)

Lead `John Aaron: core engine and media systems` → "I built the core engine and
media systems:"

- `Visual Novel Engine (PanelRenderer component)` → The visual novel engine
  (the panel renderer)
- `Multi-sprite & character rendering system` → Multi-sprite character
  rendering
- `Text animation and font controls` → Text animation and font controls
- `Button sound effects and haptic feedback` → Button sound effects and haptic
  feedback
- `Question Bank service and editor validation` → The question bank service,
  with editor validation for all 4 question types **[resume]**
- `Admin authentication (login / sign-up flows)` → Admin sign-in and sign-up
- `UI / Accessibility (tablet scaling)` → Tablet scaling and accessibility
- `Bug fixing and integration testing` → Bug fixing and integration testing

### Key decisions (from "Architecture" and "Gamification engine")

1. **One app, two audiences.** A single React 19 app serves visitors and
   admins, deployed together on Vercel from GitHub.
2. **Access enforced in the database.** Supabase Row-Level Security applies
   the admin and super admin roles at the database, not only in the UI.
3. **Built for a booth.** Kiosk mode keeps the tablet in full screen.
4. **Fair scores.** The maximum score counts only the panels a visitor
   reached, and branching choices aren't scored.
5. **Safe editing.** Deleted panels can be restored, and staff choose what
   happens after a game (replay or open a link).

### Screens (l.153–190)

Add the visitor view first if the designer has room: `scs_p65_img0.png` (the
Home card image).

| Image | Caption | Alt |
|---|---|---|
| `scs_p65_img0` (new) | The story player on a booth tablet (template text shown). | "Story player on a tablet: a pixel-art boy in an office scene above a text box, with back and next arrows." |
| `adminDashImg` p71 | `DASHBOARD: STORY MANAGEMENT` → Story editor: every panel in order, with counts of text panels and questions. | "SCS admin dashboard" → "Panel Builder screen for 'Main Story' showing 7 panels, 2 text panels and 3 questions, including a single-choice question about colorectal cancer screening." |
| `panelEditorImg` p72 | `PANEL EDITOR (WYSIWYG)` → Panel editor: write each language's version and preview it on a tablet frame. | "SCS panel editor" → "Editor for a true/false question, 'I exercise often I do not need to go for screening!', with English, Chinese, Malay and Tamil tabs and a live tablet preview." |
| `statsImg` p72 | `STORY STATISTICS + CSV EXPORT` → Story statistics, ready to export as CSV. | "SCS story statistics" → "Story Statistics page with total attempts, average score and max score, and an Export CSV button." |
| `assetManagerImg` p73 | `ASSET MANAGER (DRAG & DROP)` → Asset manager: drag and drop sprites and backgrounds. | "SCS asset manager" → "Asset Manager with a drag-and-drop upload area, filter tabs and pixel-art sprites of an elderly man." |
| `adminMgmtImg` p74 | `ADMIN ACCOUNT MANAGEMENT` → Admin accounts: verify, promote or remove admins. | "SCS admin management" → "Admin Management table of admin accounts with roles, verification status and Promote, Demote and Delete actions." |

**Fix before publishing (Q3):** `scs_p74_img1.png` shows six real-looking
personal email addresses. Blur the Email column or drop this screenshot.

### Outcome (new)

"Deployed on tablets at SCS community outreach booths **[resume]**, with an
admin panel that lets non-technical SCS staff run the stories without a
developer." (**NEEDS JOHN Q14** for events or visitor numbers.)

### Tech stack (l.52)

React 19, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth,
Storage), Vercel, MyMemory API. Methods: Agile Scrum, 7 sprints.

### Next project

`Next: AI Finance Insights Engine` (was `Fire Safety app →`).

---

## 3. AI Finance Insights Engine: `AIFinanceProject.tsx`

Window title: `ai_finance_insights.py`

### Header

- Summary (l.43–45) "An ETL data pipeline that ingests global logistics,
  commodity, and financial market data, enriched with an AI NLP summarisation
  engine, producing a unified data warehouse ready for Power BI dashboards."
  → "Pulls five market data sources into one Power BI-ready warehouse, and
  flags supply-chain risk in the news."
- Meta (l.53–67)
  - `Type: ETL + AI Pipeline` → `Type: Data pipeline with NLP` (team or solo:
    **NEEDS JOHN Q4**; omit `Team` until then)
  - `Domain: Shipping & Logistics` → `Domain: Shipping and logistics markets`
  - new `Year: 2024`
  - `Data sources` and `Test coverage` move to stats
  - `Links: GitHub profile`
- Key stats (l.97–100) `9 NEWS SECTORS CLASSIFIED`, `2 DATA VALIDATION GATES`,
  `5 ETL PIPELINE STAGES`, `Star DB SCHEMA MODEL`
  → `5` data sources, `9` news sectors, `2` data-quality gates, `100%` Pytest
  coverage on extract and transform. (Star schema and 5 stages go to Key
  decisions.)

### The problem (l.118–122)

→ "Shipping and logistics analysts work from scattered data: the S&P 500,
Brent crude prices, USD/SGD exchange rates, logistics stocks and geopolitical
news each live in a different place, with no single view."

Fix: the current problem lists four sources; the pipeline extracts five.

### What it does (l.123–129 second paragraph, plus pipeline steps)

- Pulls in the S&P 500, Brent crude, USD/SGD FX, Maersk shares (as a stand-in
  for logistics stocks) and geopolitical news
- Computes rolling volatility, moving averages, cross-asset correlations and
  standard-deviation outliers
- Sorts headlines into 9 sectors, scores their sentiment and flags
  supply-chain risk
- Writes a daily executive brief
- Loads everything into a SQLite warehouse, ready for Power BI

Cut "semantic", "high-fidelity", "AI-generated". **NEEDS JOHN Q5** on what the
NLP uses.

### My part

**NEEDS JOHN Q4.** Omit the section until answered.

### Key decisions (from "Pipeline architecture" and "Engineering highlights")

1. **Five stages, two gates.** Extract → validate → transform → validate →
   load. Each gate checks schema, row counts and missing values, so bad data
   stops before the database. An NLP step then enriches the news.
2. **Star schema for Power BI.** Fact and dimension tables, with a `Dim_Date`
   table for slicing by time.
3. **Every run is traceable.** A `pipeline_runs` table logs each run, and all
   settings live in one `config.py`.
4. **Tested where the maths is.** Pytest covers 100% of extraction and
   transformation, including schema assignment and the calculations.
5. **Room to grow.** Built with a place to plug in an LLM API.

Cut: "Run before any production deployment", "Designed for DevOps deployment"
(no deployment is stated anywhere), "Comprehensive system logging".

### Screens

None on the page today. **Do not add `aifinance_dashboard.jpg`** until John
answers Q5: it is labelled "AI Finance Insights & Logistics", shows a stock-photo
avatar, a Gold asset that isn't one of the five sources, and garbled text. It
reads as a concept mock-up, not a Power BI screenshot.

### Outcome (new)

"A tested pipeline that loads five sources into one star-schema warehouse,
with 100% Pytest coverage on extraction and transformation."

### Tech stack (l.48)

Python, Pandas, NumPy, SQLite, Pytest, Power BI. (`ETL_Pipeline` and `NLP` are
methods, not tools: drop from tags.)

### Next project

`Next: UWB Indoor Localization` (was `SilverLink SG →`).

---

## 4. UWB Indoor Localization: `UWBProject.tsx`

Window title: `uwb_localization.ipynb`

### Header

- Summary (l.47–49) "Full ML pipeline classifying LOS/NLOS Ultra-Wideband
  signal paths and estimating indoor range…"
  → "Tells clear UWB signals from blocked (NLOS) ones with 89.61% accuracy, and
  estimates range on both signal paths."
- Meta (l.58–71)
  - `Course: CSC3105 Data Analytics` → `Type: Course project, CSC3105 Data
    Analytics, SIT`
  - `Team: Group CS05, SIT` → `Team: Group CS05` (size: **NEEDS JOHN Q8**)
  - new `My role: Data mining methodology` (stated on the page; confirm Q8)
  - new `Year: 2025`
  - `Dataset`, `Best accuracy` move to stats
  - `Links: GitHub profile`
- Key stats (l.101–106): six stats → four: `89.61%` SVM-RBF accuracy,
  `0.9612` ROC-AUC, `41,996` samples, `7` indoor environments. The LR and range
  figures move to Outcome.

### The problem (l.124–133)

→ "UWB radio can locate things indoors to within centimetres under ideal
conditions. When walls, furniture or people block the direct path
(non-line-of-sight, NLOS), accuracy drops sharply."

→ "Knowing which signals are blocked is a step toward more reliable indoor
positioning for robots, drones, warehouses and asset tracking."

### What it does

- Classifies the two shortest dominant signal paths as a (clear, blocked) or
  (blocked, blocked) pair
- Estimates the measured range for both paths with linear regression
- Compares models before choosing SVM-RBF **[resume]**

### My part (l.138–158; confirm with Q8)

Lead `John Aaron: Data Mining Methodology` → "I led the data mining
methodology:"

- Chose and justified the models (SVM, logistic regression, decision tree)
- Set up a stratified 80/20 train-test split
- Fitted RobustScaler on training data only, to prevent leakage
- Picked the SVM-RBF `C` value by watching train and test scores diverge
- Built multivariate linear regression to estimate range on both paths
- Plotted decision boundaries across 7 classifiers (see Q9)
- Analysed feature importance
- Explained the results in terms of NLOS and multipath effects

### Key decisions (from "Methodology", l.212–228)

1. **No leakage.** Stratified 80/20 split; the scaler only ever sees training
   data.
2. **Fewer, better inputs.** Dropped zero-variance features (`CH`, `BITRATE`),
   applied PCA to 1,016 channel impulse response (CIR) dimensions, and
   engineered features to compensate for NLOS signal loss **[resume]**.
3. **Model choice.** Logistic regression as the baseline, SVM-RBF as the main
   model, a decision tree at depth 4.

### Screens (l.167–202, "Results")

| Image | Caption | Alt |
|---|---|---|
| `classDistImg` da_p9 | `CLASS DISTRIBUTION: PERFECTLY BALANCED (50/50 LOS/NLOS)` → **wrong image**. It shows PCA. New caption: PCA on the CIR: 848 components keep 95% of the variance, 963 keep 99%. | "Class distribution" → "Line chart of cumulative explained variance by number of principal components, crossing 95% at 848 components and 99% at 963." |
| `confusionImg` da_p40 | `CONFUSION MATRICES: LOGISTIC REGRESSION vs SVM-RBF` → On 8,400 test samples, SVM-RBF gets 7,527 right; logistic regression gets 7,203. | "Confusion matrices" → "Two confusion matrices. Logistic regression: 3,809 and 3,394 correct, 391 and 806 wrong. SVM-RBF: 3,928 and 3,599 correct, 272 and 601 wrong." |
| `rocImg` da_p41 | `MODEL COMPARISON: CLASSIFICATION METRICS + RANGE RMSE` → SVM-RBF beats logistic regression on every metric; range error is 1.7566 m on both paths. | "Model comparison metrics" → "Bar charts. Logistic regression vs SVM-RBF: accuracy 0.8575 vs 0.8961, precision 0.8967 vs 0.9297, recall 0.8081 vs 0.8569, F1 0.8501 vs 0.8918. Range RMSE 1.7566 m for path 1 and path 2." |
| `dtAccuracyImg` da_p35 | `DECISION TREE: OPTIMAL DEPTH SELECTION` → Decision tree accuracy by depth; depth 4 chosen (train 0.874, test 0.867). | "Decision tree accuracy vs depth" → "Line chart of decision tree training and test accuracy for depths 2 to 50. Training accuracy climbs to 1.0; test accuracy peaks near depth 10 and settles around 0.87. Depth 4 is marked." |
| `decisionBoundaryImg` da_p39 | `DECISION BOUNDARIES: 7 CLASSIFIERS (RANGE vs FP_IDX)` → Decision boundaries on two features: range and first-path index. | "Decision boundaries" → "Six panels of decision boundaries on scaled RANGE and FP_IDX for KNN, naive Bayes, logistic regression, linear SVM, non-linear SVM and an MLP." |

Fix now: either swap in the real class-distribution chart (Q10) or use the PCA
caption above. The current caption describes a chart that isn't there.

### Outcome (new)

"SVM-RBF reached 89.61% accuracy and 0.9612 ROC-AUC, ahead of logistic
regression at 85.75% and 0.9195. Range regression scored an RMSE of 1.757 m,
with R² of 0.458 on path 1 and 0.681 on path 2."

(Use `0.681` everywhere; the stats bar says `0.6809`.)

### Tech stack (l.52)

Python, scikit-learn, Pandas, NumPy, Matplotlib. Methods: SVM-RBF, logistic
regression, decision tree, linear regression, PCA, RobustScaler.

### Next project

`Next: UAT Testing Dashboard` (was `UAT dashboard →`).

---

## 5. UAT Testing Dashboard: `UATProject.tsx`

Window title: `uat_dashboard.exe`

### Header

- Summary (l.154–156) "Full-stack defect tracker, a course project built around
  a hospital appointment system UAT scenario…"
  → "Shows a test team what's blocking go-live by linking each failed test case
  to its defect. Built around a hospital appointment system scenario."
- Meta (l.165–168)
  - `Type: Full-Stack Web App` → `Type: Course project, full-stack web app`
    (course or own: **NEEDS JOHN Q6**)
  - `Domain: Hospital Appointment` → `Scenario: Hospital appointment system`
  - `Roles: PM / QA Lead / Tester / Dev` → `User roles: project manager, QA
    lead, tester, developer`. Why: "Roles" reads as John's role.
  - `Year: 2024` (keep; see Q7)
  - Link card `View repository` / `Source code` → `View source code` with
    sr-only new-tab text. Keep: this is the only page with a real repo link.
- Key stats (l.204–207) `25 DEFECTS LOGGED`, `35 TEST CASES`, `31 PASS RATE %`,
  `8 MODULES TESTED`
  → `8` modules, `4` user roles, `25` sample defects, `35` sample test cases.
  Why: the seed script generates these (l.469). They are demo data, not test
  results, so they're labelled "sample", and the 31% pass rate goes.

### The problem (l.275–279)

→ "UAT on a large healthcare system involves project managers, QA leads,
testers and developers. They all need one view of what's broken, what's been
tested and what's blocking go-live, and spreadsheets break down fast."

### What it does (l.280–284 and "Key features", l.432–472)

- Logs defects with severity (Critical to Low), priority (P1 to P4), expected
  vs actual result and steps to reproduce
- Tracks each defect from Open to In progress, Resolved, Closed or Reopened
- Records each test run as Pass, Fail, Blocked or Not executed, with who ran it
  and when
- Links every failed test case to the defect it exposed
- Charts defects by severity, module and status, plus a monthly trend
- Exports the defect register and test case log to CSV in one click
- Gives project managers, QA leads, testers and developers their own access

Cut "real-time", "single source of truth", "high-fidelity".

### My part

**NEEDS JOHN Q6.** Omit the section until answered.

### Key decisions

1. **Failures point to fixes.** A foreign key from `test_cases` to `defects`
   keeps the trail from a failed test to its fix.
2. **Severity drives priority.** Keep the matrix (l.108–113), with these
   descriptions:
   - Critical, P1: "System unusable or data at risk. Blocks go-live."
   - High, P2: "Core feature broken. Needs a major workaround."
   - Medium, P3: "Feature degraded. A minor workaround exists."
   - Low, P4: "Cosmetic or edge case. No effect on the workflow."
3. **Small, simple back end.** Node.js and Express REST API on SQLite
   (better-sqlite3), Morgan request logging, and a seed script that loads demo
   data on first run.

Keep the module table, sample test case and role cards, with these heading
changes: `Test scope: 8 modules` → `Test scope: 8 modules (sample data)`;
`Sample test case TC-022` → keep; `Requirements by stakeholder role` → `What
each role can do`. Intro `How the test cycle was scoped, executed, and
documented.` → "How the sample test cycle is scoped and recorded." Field labels
`CODE`, `MODULE`… → sentence case.

### Screens (l.14–45, tabbed)

Tab labels → `Dashboard`, `Defects`, `Defect detail`, `Test cases`, `Reports`.
Alt is currently the tab label; replace with:

| Key | Caption | Alt |
|---|---|---|
| dashboard | Dashboard: defect counts by status, test pass rate, defects by severity and a monthly trend. | "UAT Executive Dashboard with sample data: 25 defects (14 open, 5 in progress, 6 resolved), 35 test cases (11 passed, 24 failed), a defects-by-severity bar chart and a monthly trend chart." |
| defects | Defect register: 25 sample defects across 8 modules, filtered by module, severity and status. | "Defect Management table listing defects DEF-016 to DEF-025 with title, module, severity, status and assignee, plus search, filters and a Log defect button." |
| detail | DEF-025: severity, priority, expected vs actual result and steps to reproduce. | "Defect detail for DEF-025, 'Notification Service Crashes Under High Load': open, critical, P1. Expected: notifications processed without a crash. Actual: service crashes and pending notifications are lost." |
| testcases | Test cases: 35 sample cases, each failure linked to its defect. | "Test Case Management table of test cases with module, pass or fail status, linked defect code and who ran each one." |
| reports | Reports: defects by module and status, results per module, and CSV export. | "Analytics and Reports page with donut charts of defects by module and by status, a stacked bar chart of passed and failed tests per module, and Export defects and Export test cases buttons." |

### Outcome (new)

"A working defect tracker with role-based access, linked tests and defects,
and CSV export, shown here on a seeded hospital appointment scenario."

### Tech stack (l.159, l.507–519)

React 18, Vite, Tailwind CSS, Recharts, React Router, Node.js, Express,
SQLite. Also: Axios, Sonner, Lucide, Morgan.

### Next project

`Next: Fire Safety Drill Companion` (was `AI Finance Insights Engine →`).

---

## 6. Fire Safety Drill Companion: `FireSafetyProject.tsx`

Window title: `fire_safety_drill.apk`

### Header

- Summary (l.61–62) "Native Android app empowering HDB residents to rehearse
  fire evacuation at their own convenience… No internet required."
  → "Lets HDB residents rehearse a fire evacuation in their own block, guided by
  AR arrows. The drill works without internet."
  Why: "empowering" goes; drill reminders use Firebase push, which needs a
  network, so "no internet required" is narrowed to the drill.
- Meta (l.71–84)
  - `Course: INF2007 Mobile App Dev` → `Type: Team project, INF2007 Mobile
    App Development, SIT`
  - `Team: Group 16, SIT` → `Team: Group 16` (size: **NEEDS JOHN Q11**)
  - new `My role: Routing and AR` (stated on the page; confirm Q11)
  - `Sprints: 3 Agile sprints` → keep in meta
  - `Platform: Android (Pixel 6a)` → `Platform: Android, Pixel 6a`
  - new `Year: 2025`
  - `Links: GitHub profile`
- Key stats (l.24–33): eight → four: `79/100` SUS usability score, `~80%`
  test coverage, `4` languages, `9/9` backlog items, plus 6 extra. The rest
  go to Outcome.

### The problem (l.130–134)

→ "About 1.1 million HDB flats house 80% of Singapore's population, many in
blocks over 20 storeys. SCDF fire drills have consistently low turnout,
especially among elderly residents facing mobility issues, language barriers
or unfamiliar escape routes."

### What it does (l.135–138 and screens)

Lead → "Residents rehearse on demand, inside their own block, without a group
drill or SCDF supervision."

- Pick your block type and unit, then follow AR arrows to the nearest exit
- See the route on a 2D floor plan
- Mark a stairwell as smoke-filled and watch the route re-plan
- Point the camera at an extinguisher to identify its type (see Q12)
- Take a picture-based safety quiz with read-aloud
- Track drill times, steps and quiz scores, and share a completion certificate
- Get drill reminders by push notification, in English, Chinese, Tamil or Malay

### My part (l.143–163; confirm with Q11)

Lead `John Aaron: Algorithms & AR (49 commits)` → "I built the routing and AR
(49 of the team's 120 commits):"

- Dijkstra shortest-path routing that re-plans when a stairwell is blocked
- Nearest-exit search across every exit node (`findPathToNearestExit()`)
- ARCore session lifecycle, AR corridor rendering and waypoint placement
- 3D-to-2D projection between the AR scene and the floor-plan graph
  (`ArWaypointConverter`)
- Tuned step-based positioning (PDR) fusing accelerometer and gyroscope
- Thread-safe path computation (`@Synchronized`)

("Blocked-node parameter" is folded into the first bullet.)

### Key decisions (from "Advanced features", l.236–260)

1. **Works when the network doesn't.** Routing, ML and data all run on the
   phone, so a drill still works offline.
2. **Routing.** O((V+E) log V) priority-queue Dijkstra on JSON floor-plan
   graphs; `blockedNodes` removes smoke-filled stairwells and re-routes.
3. **Positioning without GPS or Wi-Fi.** Weinberg stride estimation
   (K × amplitude^0.25) fused with accelerometer, gyroscope and step counter,
   aiming for metre-level accuracy indoors.
4. **AR on the camera feed.** ARCore draws breadcrumb arrows; the converter
   maps graph coordinates to metres with origin offset and viewport transforms.
5. **On-device ML.** TFLite with YOLO classifies extinguishers (powder, water,
   CO₂) from CameraX frames, with no network delay.
6. **Local history.** Room database v3 with three tables (drill history, quiz
   scores, SUS scores), tested migrations v1 → v2 → v3, and Flow queries that
   keep charts current.
7. **Reminders.** Firebase Cloud Messaging push reminders, localised in all
   4 languages.

### Screens (l.172–226)

| Image | Caption | Alt |
|---|---|---|
| `onboardingImg` p29-1 | `ONBOARDING` → Onboarding: quick intros to scanning extinguishers and safety alerts. | "Onboarding flow" → "Three phone screens: the app's shield-and-flame logo, an onboarding card 'Scan Extinguisher' and an onboarding card 'Stay Informed'." |
| `dashboardImg` p29-2 | `MAIN DASHBOARD` → Home: start a drill, or open the floor plan, extinguisher ID, quiz and history. | "Dashboard" → "Fire Safety Drill home screen with a Start drill button and menu items for floor plan, extinguisher ID, safety quiz, history and settings." |
| `drillSetupImg` p29-3 | `DRILL SETUP: BLOCK + UNIT SELECTION` → Drill setup: choose slab or point block, then your unit. | "Drill setup" → "Drill Setup screens: a unit dropdown and a summary for Block 123 Ang Mo Kio Ave 4, floor 12, unit 12-01, with a Start drill button." |
| `floorplanImg` p29-4 | `2D FLOOR PLAN + DIJKSTRA PATHFINDING` → Floor plan: tap a room and Dijkstra draws the shortest route to the nearest exit. | "Floor plan navigation" → "Floor Plan screens: a node graph of rooms, stairwells and exits, with the shortest route drawn in red from the chosen unit to an exit, for slab and point blocks." |
| `arImg` p29-5 | `AR CORRIDOR NAVIGATION: LIVE BREADCRUMB ARROWS` → AR drill: arrows on the camera view lead to the exit. | "AR navigation" → "AR Drill screens: red chevron arrows over a live corridor view, a display of steps, distance and time, a 'Path lost' warning and tips for fixing tracking." |
| `extinguisherImg` p30-0 | `EXTINGUISHER ID: ON-DEVICE TFLITE ML` → Extinguisher ID: names the type and the fires it suits, processed on the phone. | "Extinguisher classification" → "Extinguisher ID screen framing a red extinguisher, labelled CO2 at 78% confidence with suitable fire types, next to a 'How to scan' help dialog." |
| `quizImg` p30-1 | `SAFETY QUIZ + GAMIFICATION` → Safety quiz: picture questions with explanations from SCDF guidelines. | "Safety quiz" → "Safety Quiz screens: a question on using the lift in a fire, a question on what to do when the alarm sounds, and a result of 4 out of 8 correct." |
| `analyticsImg` p30-3 | `ANALYTICS DASHBOARD: DRILL HISTORY + SUS SCORES` → History: drill times, steps and quiz scores over time, and a shareable certificate. | "Analytics" → "Analytics Dashboard screens: drill count, average time and quiz average, trend charts, a printable certificate of completion, and a note that the certificate leaves out name, unit and location." |

Note for Q12: the extinguisher screens read "Demo mode — add model for real
classification", and the analytics screen shows an in-app SUS average of 52.5.

### Outcome (new)

"Delivered all 9 backlog items plus 6 extra in 3 Agile sprints, with a SUS
usability score of 79/100 and about 80% test coverage."

Second line, smaller: "10,984 lines of Kotlin, 5,458 lines of tests in 26
files, 120 commits."

### Tech stack (l.65)

Kotlin, Jetpack Compose, MVVM, Hilt, ARCore, TensorFlow Lite, YOLO, CameraX,
Room, Firebase Cloud Messaging. Methods: Dijkstra, Weinberg PDR.

### Next project

`Next: SilverLink SG` (was `Next: UWB project →`).

---

## 7. Knock-on fixes for the Home deck (`copy.md` §7)

| Project | Home now | Change |
|---|---|---|
| AI Finance | "Turns five market data sources into a Power BI dashboard" | → "into a Power BI-ready warehouse" until Q5 confirms a dashboard. The card image may be a mock-up (Q5). |
| UWB | "PCA compresses 1,016 signal dimensions" | → "applies PCA to 1,016 signal dimensions". The chart needs 848 components for 95% variance. |
| UAT | "25 issues across 8 modules", fact `25 issues` | → "25 sample defects", fact `25 sample defects` |
| Fire Safety | fact `fully offline` | → `drill works offline` (reminders use Firebase) |

---

## NEEDS JOHN

1. **SilverLink:** what exactly did you build (services, gateway, autoscaler,
   livestream, front-end screens)?
2. **SilverLink:** does the EMA forecast scale pods automatically, or only
   recommend a replica count? Is `app.silverlink.cc` (in the screenshots)
   live, and can we link it?
3. **SCS:** the admin screenshot shows six personal email addresses. Blur
   them or drop the image?
4. **AI Finance:** solo or team? What exactly did you build?
5. **AI Finance:** what does the NLP use (rules, a library, a model)? Did you
   build a Power BI dashboard, and is `aifinance_dashboard.jpg` a real
   screenshot or a concept image?
6. **UAT:** course project or your own? Solo? What did you build?
7. **UAT:** screenshots are dated Jan–Mar 2026; the year is 2024. Re-shot
   later, or should the year change?
8. **UWB:** confirm "data mining methodology" as your part, and Group CS05's
   size.
9. **UWB:** is RMSE really 1.757 m on both paths? "7 classifiers", but the
   chart shows 6. How many PCA components did you keep? Why depth 4 when test
   accuracy peaks near 10?
10. **UWB:** do you have the real class-distribution chart?
11. **Fire Safety:** confirm "routing and AR, 49 of 120 commits" as your part,
    and Group 16's size.
12. **Fire Safety:** did the final app run the trained extinguisher model
    (the screens say "Demo mode")? How many people gave the 79/100 SUS score?
13. Are there public repos for SilverLink, SCS, AI Finance, UWB or Fire
    Safety? Each page now links only to your GitHub profile.
14. Any real-world result to add: a demo day, grade, award, or SCS events
    and visitor numbers?
