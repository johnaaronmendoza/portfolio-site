# Copy trim deck (retro-web)

Owner: copywriter. Brief: John finds the site "very wordy"; cut Home and each
case page by roughly 40–50% without losing or adding facts.

## How to read this deck

- `→` means "replace with". New text is exact; apply it as written.
- `**word**` marks the 1–3 words to give visual weight (bold or accent per the
  designer). It is markup for the coder, not literal asterisks. Never weight a
  whole line.
- "Cut" means delete the string (and its element, if it becomes empty).
- **Lead** = the one-line opener of a case section. Render it with the existing
  `Prose lead="…"` style. **Bullets** = `FeatureList` items. Where a section
  used `CardGrid`, it becomes a lead plus `FeatureList` unless noted. That way
  each section has one point and at most 3 bullets.
- Unchanged: section headings, window titles, buttons, tech-stack tags, alt
  text, breadcrumbs, "Next project" band, badges, UAT module table rows.
- Every fact is already on the site or in `client/public/resume.pdf`. Nothing
  new is added. Desk Assist stays in progress. No new role claims on SilverLink,
  AI Finance or UAT. UAT stays a course project with sample data.

## Word counts (visible copy)

Counted: hero, stats, ribbons, About, Experience, project tiles, section
intros, footer copy; on case pages the summary, meta, header stats, leads,
prose, bullets, cards, figure and table text, and captions. Not counted:
section headings, tech tags, alt text, breadcrumbs and buttons (unchanged).

| Page | Before | After | Cut |
|---|---|---|---|
| Home | 966 | 401 | −58% |
| SilverLink SG | 328 | 170 | −48% |
| SCS Awareness Platform | 424 | 223 | −47% |
| AI Finance Insights Engine | 316 | 186 | −41% |
| UWB Indoor Localization | 331 | 197 | −40% |
| UAT Testing Dashboard | 662 | 317 | −52% |
| Fire Safety Drill Companion | 486 | 275 | −43% |

Home lands past 50% because Experience held 17 long bullets (354 → 97).

---

## 1. Hero: `client/src/components/Hero.tsx`

Words: 43 → 21.

| Element | Current | New |
|---|---|---|
| `ROLE_LINE` | "AI, data and full-stack developer" | keep |
| Positioning `<p>` | "I build AI and data tools people can trust. At LGA Telecom I'm building Desk Assist, an AI assistant that drafts…" (3 sentences) | `I build AI and data tools people can trust, now building **Desk Assist** at **LGA Telecom**.` (18 words) |

"Graduating April 2027" leaves the hero. It still appears in the About facts
list and in the footer.

## 2. StatsBand: `client/src/components/StatsBand.tsx`

Words: 19 → 15.

| Current label | New label |
|---|---|
| "industry internships" | `internships` |
| "projects built" | keep |
| "UWB signal model accuracy" | `UWB model accuracy` |
| "languages on the SCS Awareness Platform" | `SCS Awareness Platform languages` |

**Consistency flag:** the band shows `89.6%`; the UWB tile, case page and resume
say `89.61%`. Use `89.61%` if it fits its cell at 360px. If it doesn't, keep
`89.6%` and leave the rounding as is.

## 3. Ribbons: `client/src/pages/Home.tsx`

Words: 24 → 23. Only one change:

| Current | New |
|---|---|
| `'NOW BUILDING DESK ASSIST'` | `'BUILDING DESK ASSIST'` |

## 4. About: `client/src/components/About.tsx`

Words: 145 → 65 (facts list unchanged, 25 words).

| Element | Current | New |
|---|---|---|
| `FACTS` | Studying / Graduating / Now / Before / Based in | keep all five |
| Bio p1 (bold) | "I build AI and data tools for the people who have to use them." | keep |
| Bio p2 | "Right now I'm building Desk Assist at LGA Telecom. It reads a service desk ticket…" (3 sentences) | `At **LGA Telecom** I'm building **Desk Assist**, which drafts ticket replies for an agent to review.` |
| Bio p3 | "Before that I built cloud-native microservices with my SilverLink SG team…" (2 sentences) | Cut. Projects and Experience carry this. |
| Bio p4 | "I like the gap between what people need and what gets built: I listen…" | `I listen first, write **clear requirements**, then build and test until the tool helps.` |

## 5. Experience: `client/src/components/Experience.tsx`

Words: 354 → 97. Max 3 bullets per role, each ≤ 14 words, outcome or number
first. Role titles, periods and badges are unchanged.

### LGA Telecom (7 → 3 bullets)

| Current (short quote) | New |
|---|---|
| "Building Desk Assist (in progress), an AI assistant for service desk agents. The Manifest V3…" | `Building **Desk Assist**: an AI Chrome extension that drafts ticket replies for **agent review**.` |
| "Led the full-stack integration of the FreeSDN… migrated 1,000+ network configurations…" | `**1,000+ network configurations** migrated while leading the **FreeSDN** integration across 4+ manufacturers.` |
| "Configured Freshservice business rules… cutting manual agent actions by 40%." + "Cut incident resolution time by 15 minutes…" | `**40%** fewer manual agent actions, **15 minutes** faster incident resolution, via Freshservice automation.` |
| "Defined enterprise security requirements…" | Cut (on resume) |
| "Automated a weekly PagerDuty incident report… 4 hours…" | Cut (on resume) |
| "Handle Level 1 customer tickets… Microsoft Entra ID." | Cut |

The "In progress" badge stays, so the first bullet doesn't repeat it.

**Option for the lead:** the security bullet is the strongest "tools people can
trust" proof for the DBS AI track. To keep it, swap it in for the FreeSDN line:
`Set the **security model**: least-privilege permissions, AI calls via a company backend.` (12 words)

### Sembcorp Solar Singapore (6 → 3 bullets)

| Current (short quote) | New |
|---|---|
| "Led rollout of Momens CRM across Projects, C&I, and SolarNova divisions for a 240MWp+ portfolio." | `Led the **Momens CRM** rollout across 3 divisions for a **240MWp+** portfolio.` |
| "Ran UAT on new CRM features before deployment… tracking 50+ defects to resolution." | `**50+ defects** tracked to resolution in **UAT** before the CRM went live.` |
| "Awarded an Internship Distinction and earned a contract extension." | `Earned an **Internship Distinction** and a contract extension.` |
| "Hosted training sessions…", "Supported SolarNova 3…", "Turned operational data… dashboards…" | Cut |

### SIT × University of Glasgow (4 → 2 bullets)

| Current (short quote) | New |
|---|---|
| "Team project: SilverLink SG, 4 gRPC microservices…" | Cut. It's the first project tile. |
| "Core modules: Cloud Computing, Software Engineering, Mobile Development, Data Analytics, Requirements Engineering." | keep |
| "Certifications: AI4I Literacy in AI (AI Singapore, 2026); Fundamentals of Deep Learning (NVIDIA DLI, 2026)." | `Certifications: AI4I Literacy in AI (**AI Singapore**); Fundamentals of Deep Learning (**NVIDIA DLI**), 2026.` |
| "Practised UAT, requirements analysis and the full software lifecycle…" | Cut |

## 6. Projects intro: `client/src/components/Projects.tsx`

| Current | New |
|---|---|
| "Six projects I've built, plus one pitch. Start with SilverLink SG and the SCS Awareness Platform." | `Start with the two **featured** projects.` |

## 7. Project data: `client/src/data/projects.ts`

Tile `description`: one line, ≤ 14 words. The metric lives in `facts` (unchanged).
Set `summary` (the line under each case-study h1) to the **same string** as
`description`, so the tile and case page can't drift. Projects tiles: 321 → 141
words (summary changes are counted under each case page below).

| Project | Current `description` (short quote) | New `description` = `summary` |
|---|---|---|
| SilverLink SG | "Connects seniors and youth… A 6-person team shipped it in 7 Agile sprints…" | `Connects seniors and youth through skill-sharing and live events, built to block **double-bookings**.` |
| SCS Awareness Platform | "Teaches cancer awareness through a branching visual novel… A no-code admin panel…" | `Teaches cancer awareness through a **branching story** at **Singapore Cancer Society** booths.` |
| AI Finance Insights Engine | "Turns five market data sources into a Power BI-ready warehouse, using NLP…" | `Pulls market data into one **Power BI**-ready warehouse; NLP flags **supply-chain risk**.` |
| UWB Indoor Localization | "Tells clear UWB signals from blocked (NLOS) ones with 89.61% accuracy and 0.9612 ROC-AUC…" | `Tells clear UWB signals from **blocked (NLOS)** ones with an **SVM-RBF** model.` |
| UAT Testing Dashboard | "Shows a UAT team what's blocking go-live… A course project built around a hospital…" | `Course project: links each failed test to its defect to show what **blocks go-live**.` |
| Fire Safety Drill Companion | "Guides residents out of a building in augmented reality… A Kotlin Android app…" | `Lets HDB residents rehearse fire evacuation in their own block with **AR arrows**.` |
| GreenLoopFarms (no summary) | "Helped shape the idea for a Singapore hydroponic urban farm and prepare the pitch…" | `Helped pitch a Singapore **hydroponic urban farm** to an industry investor panel.` |

`facts` arrays: keep as they are. They carry each tile's metric, such as
"89.61% accuracy" or "SGD 10,000 NYP JumpStart Grant".

## 8. Skills intro: `client/src/components/Skills.tsx`

Words: 30 → 11.

| Current | New (one `<p>`) |
|---|---|
| "What I use and where I used it. The AI keys are amber." + "Press or hover a key to see what it does. The full list is below the keyboard." | `Press or hover a key for details. **AI keys** are amber.` |

## 9. Footer: `client/src/components/Footer.tsx`

Words: 30 → 28.

| Current | New |
|---|---|
| "Open to AI, data and software graduate roles. I graduate in April 2027." | `Open to AI, data and software graduate roles. Graduating **April 2027**.` |
| Heading, "Find me on", terminal hint, copyright | keep |

---

# Case pages

Pattern for every section: **lead** (one line, ≤ 15 words) → at most **3 bullets**
→ figures, tables or captions for detail. The Tech stack and gallery sections
take no lead. Header `meta` and `stats` are unchanged unless listed.

## 10. SilverLink SG: `client/src/pages/SilverLinkProject.tsx`

Words: 328 → 170. Summary: see section 7.

| Section | Current (short quote) | New |
|---|---|---|
| Problem | Prose "By 2030, 1 in 4 Singaporeans will be over 65. Many seniors face isolation…" | Lead: `By 2030, **1 in 4** Singaporeans will be over 65.` |
| | | Bullet: `Many seniors face **isolation** and are left out of digital life.` |
| | | Bullet: `Young people miss what **older generations** can teach.` |
| | `Quote` "How might we leverage technology… (PB-2)" | Cut. The meta "Team project" already gives the context. |
| What it does | "A web platform where seniors and youth can:" + 6 items | Lead: `A web platform where seniors and youth **swap skills** and meet at events.` |
| | | Bullet: `**Book seats** at workshops, mentoring sessions and community events.` |
| | | Bullet: `Host or watch **livestreams** with live chat.` |
| | | Bullet: `Pick up **volunteering tasks** and earn badges.` |
| How it works | 6 cards ("No double-booking" … "Deploy and secure") | Lead: `**4 gRPC services** behind one REST gateway, each with its own database schema.` |
| | "A booking saves only if the seat record hasn't changed…" | Bullet: `**Optimistic concurrency** returns 409 Conflict instead of overbooking.` |
| | "Idempotency keys make a repeated request return the same result…" | Bullet: `**Idempotency keys** make each request run exactly once.` |
| | "An exponential moving average (EMA) forecasts load…" | Bullet: `An **EMA load forecast** recommends replicas per service.` |
| | Cards "Each service owns its data", "Deploy and secure" | Cut. 8 schemas is a header stat, and Keycloak, GitHub Actions and Cloudflare are tech tags. |
| Caption | "Onboarding: a five-step setup for new users." | `Five-step onboarding.` |
| Caption | "Events: workshops and livestreams, each with region, venue and length." | `Events: workshops and livestreams.` |
| Caption | "Event page: book or cancel a session, with capacity shown for each." | `Book or cancel a session; capacity shown.` |
| Caption | "Livestream studio: the event owner broadcasts while viewers chat." | `Livestream studio with live chat.` |
| Caption | "System metrics: current and forecast load, and the recommended replica count." | `Load forecast and recommended replica count.` |

Meta "Team: Group 20, 6 people: Danish, John, …" stays. It credits the team
on a project where John's own role isn't stated.

## 11. SCS Awareness Platform: `client/src/pages/SCSProject.tsx`

Words: 424 → 223.

| Section | Current (short quote) | New |
|---|---|---|
| Problem | "SCS runs community booths… The booths weren't interactive…" (2 long sentences) | Lead: `SCS booths weren't **interactive**, so visitors learned little about **early screening**.` |
| | | Bullet: `Many found them dull; others stayed away because of **stigma**.` |
| What it does | 2 cards, 12 items + "SCS staff run everything from a no-code admin panel:" | Lead: `Visitors play a branching story on a booth tablet; staff edit it **without code**.` |
| | "Answer 4 question types…", "See their score and a top-10 leaderboard…" | Bullet: `**4 question types**, scores and a top-10 leaderboard.` |
| | "Play in English, Chinese, Malay or Tamil" | Bullet: `Plays in **4 languages**: English, Chinese, Malay and Tamil.` |
| | "Edit panels in a WYSIWYG editor…", "Upload sprites…", "View analytics and export…" | Bullet: `Staff edit panels, upload art and **export analytics** to CSV or Excel.` |
| | Confetti, flow map, MyMemory, admin accounts items | Cut. The gallery shows the admin screens and MyMemory is a tech tag. |
| My part | Lead "I built the core engine and media systems:" + 8 items | Lead: `I built the **core engine** and media systems.` |
| | "The visual novel engine (the panel renderer)" + "Multi-sprite character rendering" | Bullet: `The **panel renderer** and multi-sprite character rendering.` |
| | "The question bank service, with editor validation for all 4 question types" | Bullet: `A **question bank service** validating all 4 question types.` |
| | "Admin sign-in and sign-up" + "Tablet scaling and accessibility" | Bullet: `Admin sign-in, **tablet scaling** and accessibility.` |
| | Text animation, sound/haptics, bug fixing items | Cut |
| How it works | 5 cards | Lead: `One **React 19** app serves visitors and admins, deployed on Vercel.` |
| | "Supabase Row-Level Security applies the admin and super admin roles…" + PDPA item from What | Bullet: `Supabase **Row-Level Security** enforces admin roles; visitors pass a **PDPA** consent gate.` |
| | "Kiosk mode keeps the tablet in full screen." | Bullet: `Kiosk mode keeps the booth tablet in **full screen**.` |
| | "The maximum score counts only the panels a visitor reached…" | Bullet: `**Fair scores**: only panels a visitor reached count; branching choices don't.` |
| | "Safe editing" card | Cut |
| Caption | "The story player on a booth tablet (template text shown)." | `Story player on a booth tablet (template text).` |
| Caption | "Panel editor: write each language's version and preview it on a tablet frame." | `Panel editor: 4 language tabs and a tablet preview.` |
| Caption | "Story editor: every panel in order, with counts of text panels and questions." | `Story editor: every panel in order.` |
| Caption | "Story statistics, ready to export as CSV." | `Story statistics, exportable as CSV.` |
| Caption | "Asset manager: drag and drop sprites and backgrounds." | `Drag-and-drop asset manager.` |
| Caption | "Admin accounts: verify, promote or remove admins." | `Admin accounts: verify, promote or remove.` |

## 12. AI Finance Insights Engine: `client/src/pages/AIFinanceProject.tsx`

Words: 316 → 186.

| Section | Current (short quote) | New |
|---|---|---|
| Problem | "Shipping and logistics analysts work from scattered data: the S&P 500…" | Lead only: `Shipping and logistics analysts juggle **5 scattered sources**, with no single view.` |
| What it does | 5 items | Lead: `Turns market data and news into a **Power BI**-ready warehouse and daily brief.` |
| | "Pulls in the S&P 500, Brent crude… Maersk shares (as a stand-in…)…" | Bullet: `Pulls S&P 500, Brent crude, USD/SGD, **Maersk** shares and geopolitical news.` |
| | "Computes rolling volatility, moving averages, cross-asset correlations…" | Bullet: `Computes **volatility**, moving averages and cross-asset correlations.` |
| | "Sorts headlines into 9 sectors, scores their sentiment…" | Bullet: `Sorts headlines into **9 sectors**, scores sentiment and flags supply-chain risk.` |
| | "Writes a daily executive brief", "Loads everything into a SQLite warehouse…" | Cut (in the lead and the pipeline) |
| How it works | SubHeading "Five stages, two gates" + prose "Extract, validate, transform…" | Lead (replaces both): `Five stages, **two quality gates**: bad data stops before the database.` |
| Pipeline step 1 | "S&P 500, Brent crude, USD/SGD FX, Maersk shares (a stand-in for logistics stocks) and geopolitical news" | `S&P 500, Brent crude, USD/SGD, Maersk (logistics stand-in), news` |
| Step 2 | "Schema checks, row count parity and missing-value detection" | `Schema, row counts, missing values` |
| Step 3 | "Rolling volatility, moving averages, cross-asset correlations and standard deviations" | `Volatility, moving averages, correlations, standard deviations` |
| Step 4 | "Schema correctness and row parity, checked before the database load" | `Schema and row parity before load` |
| Step 5 | "Into a SQLite data warehouse, with a pipeline_runs audit table" | `SQLite warehouse with a pipeline_runs audit table` |
| Step AI | "Sorts headlines into 9 sectors, scores their sentiment, flags supply-chain risk and writes…" | `9 sectors, sentiment, supply-chain risk, daily executive brief` |
| Cards → 3 bullets | "Star schema for Power BI…" | `**Star schema** with a Dim_Date table, ready for Power BI.` |
| | "Tested where the maths is…" | `**100% Pytest coverage** on extraction and transformation.` |
| | "Every run is traceable…" | `Every run logged; all settings in one **config.py**.` |
| | "Room to grow: Built with a place to plug in an LLM API." | Cut |

## 13. UWB Indoor Localization: `client/src/pages/UWBProject.tsx`

Words: 331 → 197.

| Section | Current (short quote) | New |
|---|---|---|
| Problem | "UWB radio can locate things indoors to within centimetres under ideal conditions…" (2 paragraphs) | Lead: `UWB positions to **centimetres** at best; blocked (**NLOS**) signals cut accuracy sharply.` |
| | "Knowing which signals are blocked is a step toward…" | Bullet: `Spotting them is a step toward reliable positioning for **robots and drones**.` |
| What it does | 3 items | Lead: `Classifies the two shortest **dominant paths** as clear or blocked.` |
| | "Estimates the measured range for both paths with linear regression" | Bullet: `**Linear regression** estimates range on both paths.` |
| | "Compares models before choosing SVM-RBF" | Cut (the Results lead says it) |
| My part | Lead "I worked on the data mining methodology:" + 8 items | Lead: `I worked on the **data mining methodology**.` |
| | "Chose and justified the models (SVM, logistic regression, decision tree)" | Bullet: `Chose and justified the models: **SVM**, logistic regression, decision tree.` |
| | "Set up a stratified 80/20…" + "Fitted RobustScaler on training data only…" | Bullet: `Prevented **leakage**: stratified 80/20 split, scaler fitted on training data only.` |
| | "Built multivariate linear regression…" + "Plotted decision boundaries…" | Bullet: `Built **linear regression** for range and plotted decision boundaries.` |
| | C-value tuning, feature importance, NLOS/multipath items | Cut |
| How it works | 3 cards | Lead: `**PCA** shrinks 1,016 CIR dimensions before modelling.` |
| | "Fewer, better inputs: Dropped zero-variance features (CH, BITRATE)… engineered features…" | Bullet: `Dropped **zero-variance** features; engineered features for **NLOS signal loss**.` |
| | Cards "No leakage", "Model choice" | Cut (in My part, Results and captions) |
| Caption | "PCA on the CIR: 848 components keep 95% of the variance, 963 keep 99%." | `PCA: 848 components keep 95% of variance.` |
| Caption | "On 8,400 test samples, SVM-RBF gets 7,527 right; logistic regression gets 7,203." | `SVM-RBF: 7,527 of 8,400 right; logistic regression: 7,203.` |
| Caption | "…range error is 1.7566 m on both paths." | `SVM-RBF wins on every metric; range RMSE 1.757 m on both paths.` |
| Caption | "Decision tree accuracy by depth; depth 4 chosen (train 0.874, test 0.867)." | `Tree accuracy by depth; depth 4 chosen (test 0.867).` |
| Caption | "Decision boundaries on two features: range and first-path index." | `Decision boundaries on range and first-path index.` |
| Results | FigureList only | Add lead: `**SVM-RBF** beat the baseline: 89.61% vs 85.75%.` |
| | Figure "85.75% logistic regression accuracy" | Cut (in the lead). Keep the other four figures. |

**Consistency fix:** the caption said `1.7566 m` and Results said `1.757 m`. Both
now say `1.757 m`.

## 14. UAT Testing Dashboard: `client/src/pages/UATProject.tsx`

Words: 662 → 317. The header still says "Course project", and every count
still says "sample".

| Section | Current (short quote) | New |
|---|---|---|
| Problem | "UAT on a large healthcare system involves project managers… spreadsheets break down fast." | Lead only: `UAT teams need one view of what **blocks go-live**; spreadsheets break down fast.` |
| What it does | 7 items | Lead: `Logs defects and test runs, and links every **failed test** to its defect.` |
| | "Logs defects with severity (Critical to Low), priority (P1 to P4)…" | Bullet: `Defects carry **severity**, priority, expected vs actual and steps to reproduce.` |
| | "Charts defects by severity, module and status, plus a monthly trend" | Bullet: `Charts defects by severity, module and status, plus a **monthly trend**.` |
| | "Exports… to CSV in one click" + "Gives project managers… their own access" | Bullet: `**One-click CSV** export; separate access for each of the 4 roles.` |
| | Lifecycle and test-run status items | Cut |
| How it works | Card "Failures point to fixes" | Lead: `A **foreign key** from test cases to defects keeps every failure traceable.` |
| | Card "Small, simple back end…" | Bullet: `**Express + SQLite** REST API with request logging.` |
| | | Bullet: `React 18 front end; **Recharts** for analytics.` |
| | | Bullet: `A seed script loads the **sample data** on first run.` |
| Severity list | "System unusable or data at risk. Blocks go-live." | `Unusable or data at risk; blocks go-live.` |
| | "Core feature broken. Needs a major workaround." | `Core feature broken; major workaround.` |
| | "Feature degraded. A minor workaround exists." | `Degraded; minor workaround exists.` |
| | "Cosmetic or edge case. No effect on the workflow." | `Cosmetic or edge case.` |
| Scope | Prose "How the sample test cycle is scoped and recorded." | Cut. The subheading "Test scope: 8 modules (sample data)" and the table stay. |
| TC-022 | Preconditions "System is running with an active notification queue. User is authenticated…" | `Active notification queue, 100+ pending items, signed in as QA Tester.` |
| | Steps "Queue 100+ notification events simultaneously across all types" / "Monitor notification service health in real time" / "Observe system behaviour under concurrent load" | `Queue 100+ notifications at once` / `Monitor service health` / `Watch behaviour under load` |
| | Code, Module, Status, Linked defect, Title, Expected, Actual | keep (record data) |
| Requirements by role | SubHeading + 4 cards, 16 items | Cut. The roles are in the header meta and the What bullet. |
| Architecture | SubHeading + 3 cards, 18 items | Cut (covered by the tech stack and the How bullets) |
| Caption | "Dashboard: defect counts by status, test pass rate, defects by severity and a monthly trend." | `Dashboard: status, pass rate, severity and monthly trend.` |
| Caption | "Defect register: 25 sample defects across 8 modules, filtered by…" | `Defect register: 25 sample defects, filterable by module, severity, status.` |
| Caption | "DEF-025: severity, priority, expected vs actual result and steps to reproduce." | `DEF-025: expected vs actual result and steps to reproduce.` |
| Caption | "Test cases: 35 sample cases, each failure linked to its defect." | `35 sample test cases, failures linked to defects.` |
| Caption | "Reports: defects by module and status, results per module, and CSV export." | `Reports: breakdowns by module and status, with CSV export.` |

## 15. Fire Safety Drill Companion: `client/src/pages/FireSafetyProject.tsx`

Words: 486 → 275.

| Section | Current (short quote) | New |
|---|---|---|
| Problem | "About 1.1 million HDB flats… SCDF fire drills have consistently low turnout…" | Lead: `SCDF fire drills draw **low turnout**, especially among elderly HDB residents.` |
| | | Bullet: `About 1.1 million HDB flats house **80%** of Singapore's population.` |
| | | Bullet: `Barriers: mobility, language and **unfamiliar escape routes**.` |
| | "…many in blocks over 20 storeys" | Cut |
| What it does | Lead "Residents rehearse on demand, inside their own block, without a group drill or SCDF supervision." (16 words) | Lead: `Residents rehearse **on demand** in their own block, no group drill needed.` |
| | "Pick your block type and unit, then follow AR arrows…" | Bullet: `Follow **AR arrows** from your unit to the nearest exit.` |
| | "Mark a stairwell as smoke-filled and watch the route re-plan" | Bullet: `Mark a stairwell **smoke-filled** and the route re-plans.` |
| | "Point the camera at an extinguisher to identify its type" | Bullet: `**Scan an extinguisher** to identify its type.` |
| | Floor plan, quiz, history, reminders items | Cut (each one has a gallery caption) |
| My part | Lead "I built the algorithms and AR (49 of the team's 120 commits):" + 6 items | Lead: `I built the **algorithms and AR**: 49 of the team's 120 commits.` |
| | "Dijkstra shortest-path routing…" + "Nearest-exit search…" | Bullet: `**Dijkstra** routing to the nearest exit, re-planning around blocked stairwells.` |
| | "ARCore session lifecycle…" + "3D-to-2D projection… (ArWaypointConverter)" | Bullet: `**ARCore** corridor rendering, waypoints and 3D-to-2D floor-plan projection.` |
| | "Tuned step-based positioning (PDR) fusing accelerometer and gyroscope" | Bullet: `Tuned step-based positioning (**PDR**) from accelerometer and gyroscope.` |
| | "Thread-safe path computation (@Synchronized)" | Cut |
| How it works | 7 cards | Lead: `Routing, ML and data all run **on the phone**, so drills work offline.` |
| | "On-device ML: TFLite with YOLO classifies extinguishers…" | Bullet: `**TFLite** with YOLO classifies extinguishers: powder, water or CO₂.` |
| | "Positioning without GPS or Wi-Fi: Weinberg stride estimation…" | Bullet: `**Weinberg stride estimation** positions without GPS or Wi-Fi.` |
| | "Local history: Room database v3 with three tables…" | Bullet: `A **Room** database keeps drill history, quiz and SUS scores.` |
| | Routing, AR, Reminders cards | Cut (in My part and the tech tags) |
| Caption | "Onboarding: quick intros to scanning extinguishers and safety alerts." | `Onboarding: extinguisher scans and safety alerts.` |
| Caption | "Home: start a drill, or open the floor plan, extinguisher ID, quiz and history." | `Home: start a drill or open a tool.` |
| Caption | "Drill setup: choose slab or point block, then your unit." | `Drill setup: block type, then unit.` |
| Caption | "Floor plan: tap a room and Dijkstra draws the shortest route to the nearest exit." | `Floor plan: Dijkstra's shortest route to the nearest exit.` |
| Caption | "AR drill: arrows on the camera view lead to the exit." | `AR drill: arrows on the camera view.` |
| Caption | "Extinguisher ID: names the type and the fires it suits, processed on the phone." | `Extinguisher ID: type and suitable fires, on-device.` |
| Caption | "Safety quiz: picture questions with explanations from SCDF guidelines." | `Picture quiz with SCDF-based explanations.` |
| Caption | "History: drill times, steps and quiz scores over time, and a shareable certificate." | `History: drill times, quiz scores and a shareable certificate.` |
| Results | FigureList only | Add lead: `A tested codebase: **5,458 lines** of tests across 26 files.` Keep the four figures. |

---

## Open questions

- NEEDS JOHN: What was your own part in SilverLink SG? Its case page has no
  "My part" section. One line (≤ 15 words) would give the featured project the
  same proof that SCS has.
- NEEDS JOHN: Should the LGA security-model bullet replace the FreeSDN one?
  See the option in section 5.
