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
