# Home page copy deck (retro-web)

Owner: copywriter. Audience: recruiters for AI, data and software graduate roles
(DBS 2027 MA Programme, AI & Data Science track), skimming on a phone.
The 30-second takeaway: John builds AI and data tools people can trust; his best
work is SilverLink SG and the SCS Awareness Platform; he is building Desk Assist
at LGA Telecom (in progress, not public).

Conventions for the coder:

- `→` means "replace with". Strings in backticks are exact.
- Sentence case everywhere except pixel-font section headings, marquee strips and
  the `HELLO!` cell, which stay in caps as display type.
- Every fact below is on the site, in `client/public/resume.pdf`, or confirmed by
  John in the brief. Lines tagged **[not on resume]** are on the site already but
  missing from the resume. Lines tagged **NEEDS JOHN** wait for his answer.
- Arrows such as `↗` and `↓` are icons, so wrap them in `aria-hidden="true"`.

---

## 1. Hero: `client/src/components/Hero.tsx`

| Element | Current | Proposed |
|---|---|---|
| Window title | `welcome.exe` | `welcome.exe` (keep) |
| `ROLE_LINE` | `AI · DATA · FULL-STACK` | `AI, data and full-stack developer` |
| Positioning paragraph | "I build AI and data tools that people can trust. Right now that means an AI assistant that helps service desk agents at LGA Telecom answer customers faster, with a human reviewing every reply. Finishing BSc Computing Science at SIT × University of Glasgow, graduating April 2027." | "I build AI and data tools people can trust. At LGA Telecom I'm building Desk Assist, an AI assistant that drafts replies for service desk agents to review. Computing Science at SIT × University of Glasgow, graduating April 2027." |
| Primary button | `↓ RESUME.PDF` | `Download resume` (keep the `↓` icon, aria-hidden) |
| GitHub button | `GitHub ↗` | `GitHub` plus sr-only text ` (opens in a new tab)` |
| LinkedIn button | `LinkedIn ↗` | `LinkedIn` plus sr-only text ` (opens in a new tab)` |
| Scroll cue | visible `SCROLL`, no accessible name | visible `Scroll`; `aria-label="Scroll to About"` |

Why: the role line drops the middle-dot template pattern and reads as a role.
"Answer customers faster" is an outcome Desk Assist hasn't shown yet (it is in
progress), so it goes. "Download resume" says what happens. The `↗` arrow does
not tell a screen reader that a new tab opens, so the sr-only text does.

## 2. Key figures strip: `client/src/components/StatsBand.tsx`

> Superseded by **2026-11-07: Key figures band redraft** at the end of this file.

| Element | Current | Proposed |
|---|---|---|
| Left cell | `HELLO!` | `HELLO!` (keep; it's aria-hidden) |
| `aria-label` | `Key figures` | `Key figures` (keep) |
| Stat 1 | `2` / `industry internships` | `2` / `industry internships` (keep) |
| Stat 2 | `6` / `projects built` | `6` / `projects built` (keep; confirmed by John) |
| Stat 3 | `89.6%` / `ML model accuracy` | `89.6%` / `UWB signal model accuracy` |
| Stat 4 | `4` / `languages on the SCS platform` | `4` / `languages on the SCS Awareness Platform` |

Why: "ML model accuracy" on its own reads like a self-rating. Naming the model
makes it evidence. 89.6% is 89.61% rounded, which is fine at display size.

## 3. Marquee strips: `client/src/pages/Home.tsx` (`Ribbon items`)

The strips are aria-hidden, so they are texture, but they should still carry the
story.

| Strip | Current | Proposed |
|---|---|---|
| After stats (teal) | `HELLO`, `AI`, `DATA`, `FULL-STACK` | `ABOUT ME`, `AI`, `DATA`, `FULL-STACK` |
| Before Experience (teal) | `EXPERIENCE`, `LGA TELECOM`, `SEMBCORP SOLAR` | `EXPERIENCE`, `NOW BUILDING DESK ASSIST`, `LGA TELECOM`, `SEMBCORP SOLAR` |
| Before Projects (orange) | `PROJECTS`, `SILVERLINK SG`, `SCS AWARENESS PLATFORM` | keep |
| Before Skills (orange) | `SKILLS`, `PRESS A KEY` | keep |

Why: `HELLO` already appears in the stats strip right above. "Now building"
keeps Desk Assist in progress.

## 4. Pause toggle and section dots: `client/src/components/SectionNav.tsx`

| Element | Current | Proposed |
|---|---|---|
| Toggle label | `Pause motion` (with `aria-pressed`) | keep exactly. With `aria-pressed` the label must stay the same in both states. |
| Dot labels | `HERO`, `ABOUT`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, `CONTACT` | `Top`, `About`, `Experience`, `Projects`, `Skills`, `Contact` |

Why: "Hero" is our word for it, not the visitor's. The dots are buttons with
only a `title`, so add `aria-label="Go to {label}"` too.

## 5. About: `client/src/components/About.tsx`

Window title: `about_me.txt` (keep). Heading: `ABOUT ME` (keep).

**Facts list**

| Current | Proposed |
|---|---|
| `Studying: SIT × University of Glasgow` | `Studying: Computing Science, SIT × University of Glasgow` |
| `Graduating: April 2027` | keep |
| `Now: LGA Telecom` | `Now: Intern, LGA Telecom` |
| (none) | add `Before: Diploma, Nanyang Polytechnic` (resume) |
| `Based in: Singapore` | keep |

**Bio** (four paragraphs, replacing all four)

1. (bold lead) Current: "I build technology for the people who have to use it."
   → "I build AI and data tools for the people who have to use them."
2. Current: "Most projects don't fail on the code. They fail in the gap…"
   → "Right now that's Desk Assist at LGA Telecom. It reads a service desk
   ticket, finds the matching knowledge-base guidance and drafts a reply. An
   agent reviews every draft before anything reaches a customer."
3. Current: "My path started on-site at Sembcorp Solar…"
   → "Before that I built cloud-native microservices with my SilverLink SG
   team, a machine learning model that tells clear UWB signals from blocked
   ones, and a cancer-awareness platform used at Singapore Cancer Society
   outreach booths. My first role was at Sembcorp Solar, testing a CRM before
   it rolled out across the company."
4. Current: "I learn fast, speak both engineer and stakeholder, and care about
   shipping things people actually use."
   → "I like the gap between what people need and what gets built: I listen,
   write clear requirements, then build and test until the tool helps."

Why: the bio now leads with AI and data and names Desk Assist once. The old
self-praise line ("I learn fast…") becomes something he does. Every fact
(Sembcorp CRM testing, microservices, ML, SCS) is kept.

**Alt text:** profile photo `alt="John Aaron Mendoza Branzuela"` →
`alt="Portrait of John Aaron Branzuela"`.

## 6. Experience: `client/src/components/Experience.tsx`

Window titles: `lga_telecom.exe`, `sembcorp_solar.exe` (keep);
`education.txt` → `sit_glasgow.txt`. Tags `Internship` / `Education` (keep).

### LGA Telecom (first; Desk Assist leads)

Role and dates unchanged: `Service Desk Operations & AI Integration Intern`,
`Aug 2026 – Present`.

1. Current: "Designing and building Desk Assist, a Manifest V3 Chrome extension
   that reads the ticket thread…"
   → "Building Desk Assist (in progress), an AI assistant for service desk
   agents. The Manifest V3 Chrome extension reads the ticket thread, finds
   matching knowledge-base guidance and drafts a reply. The agent reviews
   every draft before it's sent."
2. Current: "Defined enterprise security requirements for the extension…"
   → "Set its security requirements: least-privilege permissions, no remote
   code or unsafe-eval, no broad host access, and data-leakage prevention.
   AI calls go through a company-controlled backend, in line with LGA's local
   AI rollout." **[not on resume as worded]**
3. Current: "Configured Freshservice business rules and workflow automations…"
   → "Configured Freshservice business rules and workflows for ticket closure
   and escalation, scoped to the Service Desk so other teams' live tickets
   stay untouched." (Resume adds "reduced manual agent actions by 40%";
   **NEEDS JOHN** Q3 before adding it.)
4. Current: "Building an automated weekly PagerDuty incident report…"
   → "Building a weekly PagerDuty incident report with the PagerDuty API and
   Google Apps Script, emailed as a CSV." (**NEEDS JOHN** Q2: the resume says
   it's done.)
5. Current: "Handle Level 1 customer tickets in Freshservice end to end…"
   → "Handle Level 1 tickets in Freshservice end to end: triage,
   troubleshooting, escalation and closure. I also support customers with
   Microsoft 365 administration in the admin centre and Microsoft Entra ID."
   **[not on resume]**

Order changed so the AI work (1–2) comes before the operations work (3–5).

### Sembcorp Solar Singapore

Role and dates unchanged: `Digitization Analyst Intern`, `Oct 2020 – Jun 2021`.

1. "Led rollout of Momens CRM across Projects, C&I, and SolarNova divisions for
   a 240MWp+ portfolio" → "Led the Momens CRM rollout across the Projects, C&I
   and SolarNova divisions, for a 240MWp+ solar portfolio. Earned an
   Internship Distinction and a contract extension." (distinction from the
   resume; division names and 240MWp+ **[not on resume]**)
2. "Conducted UAT on new CRM features…" → "Ran UAT on new CRM features before
   deployment, checking each against its requirements, rejecting builds that
   fell short and tracking 50+ defects to resolution." (50+ from the resume)
3. "Hosted training sessions for 10+ stakeholders per session…" → "Trained 10+
   stakeholders per session, gathered UX feedback and worked with vendors to
   ship 20+ enhancements." (20+ from the resume; "10+ per session"
   **[not on resume]**)
4. "Supported SolarNova 3 (50MWp, 20 MOE schools)…" → "Supported SolarNova 3
   (50MWp across 20 MOE schools) with milestone tracking, site visits and
   documentation." **[50MWp and 20 schools not on resume]**
5. "Translated operational data from 240MWp+ solar assets into executive
   dashboards…" → "Turned operational data from 240MWp+ of solar assets into
   executive dashboards for leadership." (kept; confirmed by John)

### SIT × University of Glasgow (`sit_glasgow.txt`)

`BSc (Hons) Computing Science`, `Sep 2024 – Apr 2027` (unchanged).

1. → "Team project: SilverLink SG, 4 gRPC microservices on an 8-node
   Kubernetes cluster with WebRTC livestreaming, built over 7 Agile sprints."
2. → "Core modules: Cloud Computing, Software Engineering, Mobile Development,
   Data Analytics and Requirements Engineering." **[not on resume]**
3. New (resume) → "Certifications: AI4I Literacy in AI (AI Singapore, 2026);
   Fundamentals of Deep Learning (NVIDIA DLI, 2026)."
4. "Grounding in UAT methodology, requirements analysis, and end-to-end SDLC…"
   → "Practised UAT, requirements analysis and the full software lifecycle in
   coursework and on placement."

Optional fourth window (resume facts only), `nyp_diploma.txt`, tag `Education`:
`Nanyang Polytechnic` / `Diploma in Electrical Engineering with Eco-Design` /
`Apr 2018 – Mar 2021` / one bullet: "Director's List, Semester 1 AY2020/2021."

## 7. Projects: `client/src/components/Projects.tsx`

Heading: `PROJECTS` (keep). Window title: `featured_projects` → `projects/`.

**Intro (new, first thing in the window body):** "Six projects I've built,
plus one pitch. Start with SilverLink SG and the SCS Awareness Platform."

**Filter chips.** Keep a separate match key and display label, because
`matchesFilter` compares the label text with the tags.

| Current | Proposed label | Match |
|---|---|---|
| `ALL` | `All` | (none) |
| `ML/AI` (last) | `AI & ML` (first after All) | current ML/AI rule |
| `Python` | `Python` | unchanged |
| `React` | `React` | unchanged |
| `TypeScript` | `TypeScript` | unchanged |
| `K8s` | `Kubernetes` | `K8s` tag |
| `gRPC` | `gRPC` | unchanged |
| `Kotlin` | `Kotlin` | unchanged |

**Empty state:** `NO_PROJECTS_MATCH [ {filter} ]` → `No projects match
{filter}.`; button `CLEAR FILTER →` → `Show all projects`.

**Card link text:** `View work →` → `Read case study`; `Visit site ↗` →
`Visit site`. The aria-labels stay as they are. External badge `↗ LIVE` →
`Live site`.

**Metric lines:** drop the `■` prefix and all caps, and use commas instead of
middle dots. Proposed text is in each project below.

**Card image alt:** `alt={project.name}` → `alt=""`. The card link's
`aria-label` already names the project, so the image name would be repeated.

### Summaries (two sentences each, outcome first)

1. **SilverLink SG** (2025)
   - Current: "Cloud-native platform bridging seniors and youth through
     skill-sharing and live events. 4 gRPC microservices, WebRTC livestreaming,
     and Kubernetes autoscaling, delivered across 7 Agile sprints with a
     6-person team."
   - → "Connects seniors and youth through skill-sharing and live events, and
     is built to block double-bookings under concurrent traffic. A 6-person team
     shipped it in 7 Agile sprints: 4 gRPC microservices, WebRTC livestreaming
     and autoscaling on Kubernetes."
   - Metric: `8-node cluster, 4 services, 6-person team`
2. **SCS Awareness Platform** (2025)
   - → "Teaches cancer awareness through a branching visual novel, used on
     tablets at Singapore Cancer Society outreach booths in English, Chinese,
     Malay and Tamil. A no-code admin panel lets SCS staff edit stories and
     export analytics without a developer."
   - Metric: `4 languages, 4 question types, 4-person team`
   - The gamified leaderboard is dropped here for length; it stays in the
     case study.
3. **AI Finance Insights Engine** (2024)
   - → "Turns five market data sources into a Power BI dashboard, using NLP to
     score headline sentiment and flag supply-chain risk across 9 sectors. An
     automated ETL pipeline feeds a star schema, with 100% Pytest coverage on
     extraction and transformation."
   - Metric: `5 data sources, star schema, 100% Pytest coverage`
   - Fix: the current text names four sources but the metric says five. The
     fifth is logistics stocks, so list all five in the case study.
4. **UWB Indoor Localization** (2025)
   - → "Tells clear UWB signals from blocked (NLOS) ones with 89.61% accuracy
     and 0.9612 ROC-AUC, using an SVM-RBF model on 41,996 samples from 7 indoor
     environments. PCA compresses 1,016 signal dimensions, and a regression
     model estimates range on both signal paths."
   - Metric: `89.61% accuracy, 0.9612 AUC, 41,996 samples`
   - Fix: "42k" → 41,996, the figure used everywhere else.
5. **UAT Testing Dashboard** (2024)
   - → "Shows a UAT team what's blocking go-live by linking every failed test
     case to its defect. Built for a hospital appointment system: 25 issues
     across 8 modules and 4 user roles, with severity charts and CSV export."
   - Metric: `25 issues, 8 modules, 4 roles`
   - Fix: Home says "30+ issues" but the case study says 25. "Real" is dropped
     until John confirms it (**NEEDS JOHN** Q4).
6. **Fire Safety Drill Companion** (2025)
   - → "Guides residents out of a building in augmented reality, with no
     network connection needed. A Kotlin Android app with ARCore navigation,
     on-device TFLite, and Dijkstra routing that re-plans around hazards."
   - Metric: `SUS 79/100, ~80% test coverage, fully offline`
7. **GreenLoopFarms** (2022, pitch)
   - → "Helped shape the idea for a Singapore hydroponic urban farm and prepare
     the pitch that won a SGD 10,000 NYP JumpStart Grant. We pitched it to an
     industry investor panel."
   - Metric: `SGD 10,000 NYP JumpStart Grant`
   - Dropped from the metric: `FURA · NIE · NUS`. They are the farm's partners,
     not John's results, and read as his.

## 8. Skills: `client/src/components/Skills.tsx`, `SkillKeyboard.tsx`

| Element | Current | Proposed |
|---|---|---|
| Intro (new, above helper) | (none) | "What I use and where I used it. The AI keys are amber." |
| Helper line | "Press a key to see what each skill is and where I used it." | "Press or hover a key to see what it does. The full list is below the keyboard." |
| Keyboard `aria-label` | "Skills keyboard. Press a key to see what the skill is and where I used it." | keep |
| `Used in:` prefix | keep | keep |

Flag: `JIRA` and `Confluence` in "Ways of working" are on neither the resume nor
any case study (**NEEDS JOHN** Q6).

## 9. Footer: `client/src/components/Footer.tsx`

| Element | Current | Proposed |
|---|---|---|
| Heading | `Let's build something` | `Hiring for 2027? Let's talk.` |
| Body | "Open to graduate roles, collaborations and interesting projects. Graduating April 2027." | "Open to AI, data and software graduate roles. I graduate in April 2027." |
| Button | `Email me` | keep |
| Column heading | `Find me on` | keep |
| Social links | `GitHub ↗`, `LinkedIn ↗` | as in the hero, with sr-only new-tab text |
| Clock | `SGT {time}` | `SGT {time}` plus sr-only "Singapore time" |
| Terminal hint | "Open the terminal and try > sudo hire-me" | keep |
| Copyright | keep | keep |

## 10. Chat launcher: `client/src/components/MascotChatWidget.tsx`

| Element | Current | Proposed |
|---|---|---|
| Visible label | `CHAT` / `CLOSE` | `Chat` / `Close` |
| `aria-label` | `Open chat` / `Close chat` | `Chat about John's work` / `Close chat` |
| Greeting | "Hey! I'm John Aaron. Ask me anything…" | "Hi! I'm a small bot that knows John's projects, experience and skills. Pick a topic below or type a question." |
| Fallback | "Data not found. Try asking about my [Experience]…" | "I don't have an answer for that yet. Try projects, experience, skills or education, or email johnaaronmb@gmail.com." |
| Placeholder | `Type query...` | `Ask about a project or skill` |
| Avatar alt (per message) | `alt="John Aaron"` | `alt=""` (decorative and repeated in every message) |

Why: it's a keyword bot. Saying "I'm John Aaron" oversells it. The replies can
stay in first person, so read them as John's own notes.

---

## 11. Inconsistencies: Home vs chat bot vs terminal vs resume

Fix the knowledge base (`MascotChatWidget.tsx`) and the terminal
(`SecretTerminal.tsx`) to match the Home copy above.

| # | Where | Issue | Fix |
|---|---|---|---|
| 1 | Resume vs site | The resume says Desk Assist is "built and deployed… production" and gives outcome figures (shorter handling time, 30%, 95%, zero leakage incidents, MTTR −15 min). The site and brief say it is in progress. | Site stays "in progress". **NEEDS JOHN** Q1. |
| 2 | Resume vs site | PagerDuty report: the resume says it is done and saved 4 h/week; the site says "Building". | **NEEDS JOHN** Q2 |
| 3 | Resume only | The FreeSDN integration (4+ vendors, 1,000+ configs, 50+ workflows) and the Desk Assist stack (Ollama, n8n, PostgreSQL, Docker, Nginx, FortiGate) are not on the site. | **NEEDS JOHN** Q3 |
| 4 | Chat `sembcorp`, `background` | "1,500+ sites" appears nowhere else. "Zoom training" is extra detail. | Remove "1,500+ sites" unless John confirms it. |
| 5 | Terminal `about.txt` | "Aspiring Business Analyst" contradicts the AI and data positioning. "Leading UAT for a 50MWp solar deployment" is wrong: the UAT was for the CRM, and SolarNova 3 was 50MWp. | ROLE → `Computing Science student \| AI, data and full-stack`. Body → the About bold line plus "Now building Desk Assist at LGA Telecom." |
| 6 | Terminal `skills.txt`, chat `skills`/`tech` | Java, C++, AWS, GitHub Actions, MongoDB and Cloudflare are on neither the resume nor the Skills section. | Mirror the Skills groups. **NEEDS JOHN** Q6 |
| 7 | Chat `frontend` | "two full production frontends" overstates student projects. | → "I built front ends for SilverLink SG and the SCS Awareness Platform." |
| 8 | Chat `uat`, `finance`, `projects` | "I built" claims a personal role on UAT and AI Finance, which is unknown. | → "The UAT Testing Dashboard is a…" (no role claim). |
| 9 | Chat, terminal, Home | Grant written three ways: "SGD $10,000", "SGD $10k", "SGD $10K". | Use `SGD 10,000` everywhere. |
| 10 | Home vs UAT case study | 30+ vs 25 issues | 25, and add "across 8 modules" |
| 11 | Home UWB | "42k" | 41,996 |
| 12 | Terminal `ls projects` | Short names: "Fire Safety Companion", "UWB Localization", "AI Finance Engine" | Full names: Fire Safety Drill Companion, UWB Indoor Localization, AI Finance Insights Engine |
| 13 | Chat `contact`, terminal `contact.txt` | "Open to internships…" but he graduates in April 2027 | → "Open to AI, data and software graduate roles." |
| 14 | Chat `email` | "I try to respond within a day" is a promise | **NEEDS JOHN** Q5 |
| 15 | Terminal git log | `init: portfolio-8bit, industrial retro-futurism` names the old design | → `init: portfolio, retro web` |
| 16 | Home vs resume | Home never mentions Nanyang Polytechnic, the certifications or the Internship Distinction. | Added in §5 and §6. |
| 17 | Home GreenLoop vs chat | Chat lists East Bistro and the FURA award, which describe the farm, not John | OK in chat as context; keep them off the card. |

## NEEDS JOHN

- **Q1.** Your resume says Desk Assist is "built and deployed" in production
  and gives outcome figures (30% better context-aware resolution, 95% response
  quality, zero leakage incidents, shorter handling time). The site says it is
  in progress and not public. Which is true today? If it's deployed, can the
  site use these figures? If not, should the resume be softened before you
  apply to DBS?
- **Q2.** Is the PagerDuty weekly report finished (the resume says it saves
  4 hours a week) or still being built?
- **Q3.** Can the site add these resume items: FreeSDN integration (4+ vendors,
  1,000+ configs migrated), 40% fewer manual agent actions from the Freshservice
  rules, and MTTR cut by 15 min via the Teams alerts?
- **Q4.** Was the UAT Testing Dashboard used in a real hospital's UAT cycle, or
  was it a course or simulated scenario?
- **Q5.** Do you want the chat bot to promise a reply "within a day"?
- **Q6.** Do you use Java, C++, AWS, GitHub Actions, MongoDB, Cloudflare, JIRA
  and Confluence enough to list them? None of them are on the resume.

---

## 2026-11-07: Key figures band redraft (supersedes §2)

File: `client/src/components/StatsBand.tsx` (cells render through
`client/src/components/StatStrip.tsx`, variant `band`). Fixes critique issue
"[P1] StatsBand undersells" (`.impeccable/critique/2026-11-03T05-47-01Z__client-src-pages-home-tsx.md`).

Goal: a recruiter who reads only this band sees evidence from real work first
(automation, migration, testing), then one data-science result. No Desk Assist
figure: it is in progress and no source gives it a metric.

### Recommended band

| # | Value | Label (`dt`) | Source tag | What the figure measured | Source |
|---|---|---|---|---|---|
| 1 | `40%` | `fewer manual agent actions` | `LGA Telecom` | Drop in manual service desk agent actions after John designed Freshservice business rules and workflow automations for ticket closure, escalation routing and response tracking. | `client/src/components/Experience.tsx:68`; resume p.1, LGA Telecom > Process Automation, "Reduced manual agent actions by 40%…"; chat `client/src/components/MascotChatWidget.tsx:32` |
| 2 | `1,000+` | `network configurations migrated` | `LGA Telecom` | Network configurations (resume adds "and monitoring baselines") moved via REST API integrations and migration scripts while John led the FreeSDN integration across 4+ equipment manufacturers. | `client/src/components/Experience.tsx:67`; resume p.1, LGA Telecom > FreeSDN, "Migrated 1,000+ network configurations and monitoring baselines…" |
| 3 | `50+` | `UAT defects tracked to resolution` | `Sembcorp Solar` | Defects found in the UAT John designed and ran for the Momens CRM, each tracked until resolved, before go-live across SolarNova 3 and several divisions. | `client/src/components/Experience.tsx:80`; `client/src/components/skills3d/keys.ts:80`; resume p.1, Sembcorp, "…executing UAT, tracking 50+ defects to resolution"; chat `MascotChatWidget.tsx:28` |
| 4 | `89.61%` | `ML classifier accuracy, 41,996 samples` | `UWB project (SIT)` | Accuracy of the SVM-RBF model telling clear (LOS) from blocked (NLOS) UWB signals, on 41,996 samples from 7 indoor environments. CSC3105 Data Analytics team project; John's part was the data mining method (model choice, leak-free split). | `client/src/data/projects.ts:119` (`89.61% accuracy`, `41,996 samples`); `client/src/pages/UWBProject.tsx:78`, `:109-114`; resume p.1, UWB Indoor Localization, "Achieved 89.61% accuracy… on 41,996 samples" |

Labels are 26 to 37 characters, so each one wraps to two or three lines at
`max-w-[18ch]` and the cells line up. Values are 3 to 6 glyphs. `1,000+` is 6
glyphs, the same as `89.61%`, so it fits the existing `15cqi` sizing.

Dropped:

- `2 internships`: a count, not evidence. Experience shows both internships
  just below.
- `6 projects built`: the grid shows 7 tiles (6 case studies plus the
  GreenLoopFarms pitch), so the number looks wrong at a glance. Changing it to
  `7` would count a pitch as a build. Dropping it removes the conflict.
- `4 SCS Awareness Platform languages`: "SCS" means nothing in a skim, and
  a language count doesn't show trustworthy AI or data work. The SCS project
  is featured in the Projects section, which explains it properly.

### Source tag: coder note

`Stat` has only `value` and `label`. Add an optional `source?: string` to
`Stat` in `StatStrip.tsx` and render it inside the `dt`, after the label, as
its own line (for example a `<span class="block">`). The `dt` stays first in
the DOM, so a screen reader hears "fewer manual agent actions, LGA Telecom,
40%". Keep the tag 15px or larger (readable-first rule) and black on orange
(an approved pairing). Only the `band` variant needs it, so the case-study
strips don't change.

Replace the `STATS` comment and array in `StatsBand.tsx` with:

```ts
// Only figures already on the site and the resume: LGA Telecom and Sembcorp
// (Experience), and the UWB model (projects.ts, UWB case page). Real work leads;
// Desk Assist has no figure because it is in progress.
const STATS: Stat[] = [
  { value: '40%', label: 'fewer manual agent actions', source: 'LGA Telecom' },
  { value: '1,000+', label: 'network configurations migrated', source: 'LGA Telecom' },
  { value: '50+', label: 'UAT defects tracked to resolution', source: 'Sembcorp Solar' },
  { value: '89.61%', label: 'ML classifier accuracy, 41,996 samples', source: 'UWB project (SIT)' },
];
```

`StatStrip` uses `label` as the React key. The labels stay unique, so that
still works.

### Alternative band (more automation, less scale)

| # | Value | Label | Source tag | Source |
|---|---|---|---|---|
| 1 | `40%` | `fewer manual agent actions` | `LGA Telecom` | as above |
| 2 | `4 hrs` | `of manual reporting saved a week` | `LGA Telecom` | Resume p.1, LGA Telecom > Process Automation, "Eliminated 4 hours of manual reporting per week by automating PagerDuty incident log extraction… with Google Apps Script"; chat `MascotChatWidget.tsx:32` |
| 3 | `50+` | `UAT defects tracked to resolution` | `Sembcorp Solar` | as above |
| 4 | `89.61%` | `ML classifier accuracy, 41,996 samples` | `UWB project (SIT)` | as above |

Use this band only if the PagerDuty line also goes into Experience
(`Experience.tsx`, LGA entry). Today it appears only in the resume and the chat
bot, so the band would show a figure that the Experience section doesn't back
up. Cell 2 swaps migration scale for time saved through automation.

Not used, and why: `15 min` faster incident resolution
(`Experience.tsx:68`) needs a qualifier (per incident? on average?) that won't
fit in a label. `0.9612 AUC` repeats the UWB cell. `20+` vendor enhancements
(resume, Sembcorp) isn't on the site.

### Small consistency fix (optional, for the coder)

`Experience.tsx:68` credits both figures to "Freshservice automation". The
resume credits the 40% to Freshservice business rules and the 15 minutes to
Freshservice–Microsoft Teams escalation alerts. Proposed:
`**40%** fewer manual agent actions via Freshservice rules; Teams escalation alerts cut incident resolution by 15 minutes.`

### Status of earlier NEEDS JOHN items touched here

- Q1 (Desk Assist deployed?): the resume now says "in progress" (p.1), which
  matches the site. It looks resolved, so no Desk Assist figure goes in the band.
- Q3 (FreeSDN 1,000+ and 40% on the site?): both are now in `Experience.tsx:67-68`
  and on the resume. It looks resolved.

### NEEDS JOHN (band)

- **B1.** "1,000+ network configurations": is that configurations alone, or
  configurations plus monitoring baselines counted together (the resume's
  wording)? If they are counted together, the label becomes
  `network configs and baselines migrated`.
- **B2.** "40% fewer manual agent actions": what was the baseline and period
  (for example manual steps per ticket, before and after, over which weeks)?
  The band doesn't need it, but a recruiter may ask.
- **B3.** (Alternative band only) Is the PagerDuty weekly report live and
  saving 4 hours a week today? If so, can it go into Experience too?
- **B4.** UWB was a team project (Group CS05). Are you happy for the band to
  show the team model's 89.61% with the tag `UWB project (SIT)`? The tag
  doesn't claim you built the model alone.

---

## 2026-11-13: Copy for review items 8–10

Brief: `design-system/portfolio/review-2026-11-13.md`, items 8–10 (John approved
8–11 on 13 Nov). John has **not** answered B1–B4, Q1, Q2, Q8 or N1–N9, so every
string below uses wording or figures already on the site or the resume, as
worded there. Resume line numbers are from `pdftotext client/public/resume.pdf -`
(plain mode, not `-layout`).

### Item 8. `desk_assist.exe` in the hero's right column

Replaces the right column's only content today, the narrator panel with the
bubble `Psst! Got questions about my work? Ask me.` (`comic/HeroNarrator.tsx:128`).
The hero lead (`Hero.tsx:209`) stays as it is: it says *that* John is building
Desk Assist, and this window shows *how* it works.

| Element | Copy | Source |
|---|---|---|
| Window title | `desk_assist.exe` | Filename style, like `lga_telecom.exe` |
| Status badge | `In progress` | Same badge as the LGA entry, `Experience.tsx:33`; resume l.28 "· in progress" |
| Heading (labels the flow `figure`) | `How Desk Assist will draft a reply` | Old flow heading, `git show c38876d:client/src/components/Experience.tsx` l.49 |
| One-line intro | `A Chrome extension for service desk agents at LGA Telecom.` | Resume l.29 "a Manifest V3 Chrome extension"; `Experience.tsx:35` "an AI Chrome extension"; chat `MascotChatWidget.tsx:36` |
| Link to Experience | `See experience` (scrolls to `#experience`; `↓` icon aria-hidden) | Same pattern as the hero's `See projects` button (`Hero.tsx:234`) |

The heading says "will" because the tool is in progress. Don't change it to
"How Desk Assist drafts a reply" unless John confirms it's deployed (Q1).

**Six steps.** These are the exact labels and actor chips from `c38876d`
(`DESK_ASSIST_FLOW`, l.33–40). Step 5 has one detail line, the only new string,
and its wording comes from the resume and the chat.

| # | Label | Actor chip | Detail line | Source |
|---|---|---|---|---|
| 1 | `Ticket` | none | none | c38876d l.34 |
| 2 | `Reads the thread` | `AI` | none | c38876d l.35; resume l.30 "reads the Freshservice ticket thread" |
| 3 | `Finds KB guidance` | `AI` | none | c38876d l.36; resume l.30 "retrieves relevant knowledge-base guidance" |
| 4 | `Drafts a reply` | `AI` | none | c38876d l.37; resume l.30 "drafts a reply" |
| 5 | `Agent reviews` (emphasis) | `Agent` | `Every draft, before it's sent.` | c38876d l.38; resume l.31 "for the agent to review before anything is sent"; chat `:36` "The agent always reviews before anything is sent" |
| 6 | `Sent` | none | none | c38876d l.39 |

Note for the designer, not copy: the review asks for "Agent reviews" to be
filled yellow, but it also says yellow means AI across the site. Step 5 is the
one step that is *not* AI, so filling it yellow would mean the opposite.
Please pick an emphasis colour that doesn't say "AI".

**Lil Johnny's bubble.** This replaces `HeroNarrator.tsx:128`. The service
desk agents review the drafts, not John, so no option says "I check". All three
are 60 characters or fewer.

| Option | Text | Chars | Why it's true |
|---|---|---|---|
| **A (recommended)** | `The AI drafts, an agent decides. Ask me how.` | 44 | Mirrors the HUMAN key, `skills3d/keys.ts:63`: "The AI drafts, a person decides." Names who reviews. |
| B | `Every AI draft gets a human review. Ask me how.` | 47 | Resume l.31; chat `:36` |
| C | `No reply is sent until an agent reviews it. Ask me how.` | 55 | Resume l.31 "before anything is sent" |

The bubble is the button's whole accessible name (Johnny himself is
aria-hidden), and the button opens the chat. Add sr-only text after the bubble:
` Opens the chat.` The chat already answers "desk assist" with the review step
and the guardrails (`MascotChatWidget.tsx:36`), so "Ask me how" leads somewhere
real.

**Optional "Designed in" caption under the window.** Pick 3 or 4. It goes on one
line with `·` separators at 1366, or as a short list at 375. The lead word is
"Designed" because the security model is designed and the tool isn't finished
(resume l.32 "Defined the security model"; chat `:36` "Security is designed in").
Don't use "Built to be trusted": "built" claims it is finished.

Caption lead: `Designed in:`

| # | Label | Resume | Already on the site? |
|---|---|---|---|
| 1 | `Least-privilege permissions` | l.32 "least-privilege permissions" | Yes: chat `:36`; `keys.ts:62` ("Least-privilege access") |
| 2 | `No remotely hosted code` | l.32–33 "no remotely hosted code" | Partly: chat `:36` and `keys.ts:62` shorten it to "no remote code" |
| 3 | `AI calls through a company-controlled backend` | l.33 "AI calls routed through a company-controlled backend" | Yes: chat `:36` |
| 4 | `Warns if advice relied on an outdated KB article` | l.35–36 "agents are warned when earlier advice relied on an outdated article" | No, resume only (allowed) |
| alt | `Data-leakage prevention` | l.33 | Yes: `Skills.tsx:14` ("AI guardrails & data-leakage prevention") |

My pick is 1, 3 and 5 at 375 (the shortest, all already on the site), and all
four at 1366. Never pair this caption with an outcome ("zero leaks", "secure"):
no source gives one.

Optional consistency fix for the coder: in `keys.ts:62` and chat `:36`, change
"no remote code" to "no remotely hosted code". The resume uses the longer
phrase, and "no remote code" can read as "no remote code execution".

### Item 9. Project tile captions: `<year> · <team or course fact>`

This replaces `Issue #{NN}, {year}` in `Projects.tsx:118-119`. Change the comment
on `:117` to `{/* Year and team context, from projects.ts */}`. Add a
`caption: string` field (the part after the year) to `Project` in
`data/projects.ts`. That way the facts stay in the data file, and the caption
renders `{year} · {caption}`.

| Tile | Caption | Source |
|---|---|---|
| SilverLink SG | `2025 · team of 6` | `projects.ts:64-65`; `SilverLinkProject.tsx:59` "Group 20, 6 people"; resume l.66, l.68 "6-person team" |
| SCS Awareness Platform | `2025 · team of 4` | `projects.ts:82-83`; `SCSProject.tsx:80` "Group D2, 4 people"; resume l.77, l.83 "4-person team" |
| AI Finance Insights Engine | `2024 · data pipeline` | `projects.ts:101`; `AIFinanceProject.tsx:26` "Data pipeline with NLP". The site never says whether it was solo, team or coursework (**NEEDS JOHN P1**) |
| UWB Indoor Localization | `2025 · team coursework` | `projects.ts:117`; `UWBProject.tsx:72-73` "CSC3105 Data Analytics, SIT", "Team: Group CS05"; resume l.87. Team size unknown (Q8) |
| UAT Testing Dashboard | `2024 · coursework` | `projects.ts:131,133` "Course project"; `UATProject.tsx:189`. Team or solo unknown (**NEEDS JOHN P2**) |
| Fire Safety Drill Companion | `2025 · team coursework` | `projects.ts:149`; `FireSafetyProject.tsx:77-78` "INF2007 Mobile App Development, SIT", "Team: Group 16". Team size unknown (**NEEDS JOHN P3**) |
| GreenLoopFarms | `2022 · team pitch` | `projects.ts:162,164` "Helped pitch"; chat `:51-52,76` "co-pitched", "We pitched"; resume l.110 |

Don't say the same thing twice on a tile (one job per element):

- **SilverLink and SCS:** the facts lists already show `6-person team`
  (`projects.ts:64`) and `4-person team` (`:82`). Now that the caption carries
  team size, remove those two facts. Each tile keeps two facts.
- **UAT:** the description starts `Course project:` (`projects.ts:131`) and the
  caption now says `coursework`. Optional change:
  `Links each failed test to its defect to show what blocks go-live.` The
  case-study header keeps its own `Course project` chip
  (`UATProject.tsx:189`), so the honesty flag stays on the case page.
  `description` is also the case-study lead, so check both places.

The longest caption is `2025 · team coursework`, 23 characters, so it fits
the `flex-shrink-0` caption at 375. Screen readers may read the `·` aloud, so
render it as `<span aria-hidden="true"> · </span><span class="sr-only">, </span>`.

### Item 10. Key figures band (supersedes the 2026-11-07 recommended band where they differ)

File: `StatsBand.tsx:4-14`. `StatStrip.tsx:41` still has no `source` field, so
the 2026-11-07 coder note ("Source tag: coder note", above) still applies. Add
`source?: string`, render it inside the `dt` as its own line, 15px or larger,
black on the yellow cell. Limits from `StatStrip.tsx`: values are 6 glyphs at
most (`:53-54`). Labels wrap inside `max-w-[18ch]` (`:96`), so 2 to 3 lines is
fine and they line up.

| # | Value | Label (`dt`) | Source tag | Burst | Source |
|---|---|---|---|---|---|
| 1 | `40%` | `fewer manual agent actions` | `LGA Telecom` | **yes** | `Experience.tsx:37`; resume l.48 "Reduced manual agent actions by 40%" |
| 2 | `1,000+` | `network configurations migrated` | `LGA Telecom` | no | `Experience.tsx:36`; resume l.40 |
| 3 | `50+` | `UAT defects tracked to resolution` | `Sembcorp Solar` | no | `Experience.tsx:48`; resume l.58 "tracking 50+ defects to resolution" |
| 4 | `89.61%` | `ML classifier accuracy, 41,996 samples` | `UWB team coursework` | no (moves off) | `projects.ts:116`; `UWBProject.tsx:72-73,78`; resume l.89 |

The labels run 26–38 characters and the values 3–6 glyphs, the same envelope
as the 7 Nov band. `UWB team coursework` is 19 characters, so it wraps to two
lines at `18ch`, which is acceptable. The burst moves to the 3-glyph `40%`, so
its padding has more room than it had around `89.61%`.

Replace `StatsBand.tsx:4-14` with:

```ts
// Only figures already on the site and the resume. Work leads (LGA Telecom,
// Sembcorp, from Experience); the one coursework figure (UWB, a team project)
// comes last, without the burst. Desk Assist has no figure: it is in progress.
const STATS: Stat[] = [
  { value: '40%', label: 'fewer manual agent actions', source: 'LGA Telecom', burst: true },
  { value: '1,000+', label: 'network configurations migrated', source: 'LGA Telecom' },
  { value: '50+', label: 'UAT defects tracked to resolution', source: 'Sembcorp Solar' },
  { value: '89.61%', label: 'ML classifier accuracy, 41,996 samples', source: 'UWB team coursework' },
];
```

Changed from 7 Nov: the UWB tag reads `UWB team coursework` instead of
`UWB project (SIT)`. That says plainly that it is team coursework, so the band
works whatever John answers to B4.

**Keep hedged until John answers:**

- **B2 (40%):** keep the label word for word. Don't add a baseline, period or
  unit ("per ticket", "a month", "cut by"), and don't move 40% into the hero or
  the bubble. If the lead wants the burst to wait for B2, put it on cell 3 `50+`
  for now. That figure has no open question.
- **B1 (1,000+):** keep `network configurations migrated`, the site's wording
  (`Experience.tsx:36`). If John says configurations and baselines were counted
  together, use `network configs and baselines migrated`.
- **B4 (89.61%):** the tag already says team coursework. Don't write "my model"
  or "I achieved" anywhere this figure appears.

### NEEDS JOHN (items 8–10)

- **P1.** Was the AI Finance Insights Engine (2024) a solo project, a team
  project or coursework? Its tile caption reads `2024 · data pipeline` until
  you say.
- **P2.** Was the UAT Testing Dashboard course project done solo or in a team?
  If it was solo, the caption becomes `2024 · solo coursework`.
- **P3.** How many people were in Fire Safety Group 16? If you tell us, the
  caption can read `2025 · team of N`, like SilverLink and SCS.
- **N7 (still open):** are you happy for Home to show the "Designed in"
  guardrails caption? Label 4 (outdated-article warning) is only on your
  resume today.
- **B1, B2, B4** as above. **Q8** (UWB team size) would turn `team coursework`
  into `team of N`.
