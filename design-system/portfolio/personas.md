# Persona walkthroughs

Owner: `design-persona-walkthrough`. **Every finding here is simulated: a
hypothesis about how a kind of reader might behave, not research with real
people.** Each one names the element that triggered it and a cheap way for John
to check it with a real person.

---

## 2026-11-07: Recruiter and engineering hiring manager (rebrand @ 2fa0828)

**Build:** branch `rebrand` @ `2fa0828` (includes 690d181: sound off by default,
mobile `menu.exe`, achievement toast only after a project-tile click). Production
build (`pnpm build`), served locally with `PORT=3600 node dist/index.js`, driven
with Playwright Chromium (swiftshader). Viewports 1366x900 (laptop) and 375x812
(phone, touch, DPR 2).

**Screenshots:** `/tmp/claude-0/-home-user-portfolio-site/ff410cc8-5288-5e0a-bdf4-10d235e694df/scratchpad/personas/`
(`p1-laptop-*`, `p1-phone-*`, `p2-*`, `toast-*`). That folder is temporary;
copy any you want to keep into `design-system/portfolio/personas/`.

**Already pending, not re-reported:** keycap recolour, hero redesign
(`desk_assist.exe`), new StatsBand. Where a persona's problem is fixed by one
of these, the row says so. The findings below are the problems these three
changes **do not** fix.

**Measured page geometry (Home):**

| Landmark | Laptop y (screens of 900) | Phone y (screens of 812) |
|---|---|---|
| Download resume | 644 (0.7) | 465 (0.6) |
| Email me (hero) | 709 (0.8) | 594 (0.7) |
| StatsBand | 900 (1.0) | 812 (1.0) |
| "40% fewer manual agent actions" | 2951 (3.3) | 3083 (3.8) |
| Desk Assist flow | 3107 (3.5) | 3220 (4.0) |
| Projects section | 4636 (5.2) | 5246 (6.5) |
| SilverLink SG tile | 5068 (5.6) | 5794 (7.1) |
| Footer (contact) | 8384 (9.3) | 11840 (14.6) |
| Page height | 8897 (9.9) | 12763 (15.7) |

### Personas

1. **Graduate-programme recruiter.** DBS Management Associate Programme, AI & Data
   Science track. Not an engineer. Screening a stack of candidates: about 30 s on a
   1366 laptop, maybe 2 min on a phone later. Wants to know who he is, whether he
   is AI/data, whether he is credible, and how to get the resume or contact him.
   Skims headings and big numbers, and doesn't open case studies in the first pass.
2. **Engineering hiring manager.** Leads a data/ML platform team. Technical, and
   sceptical of student portfolios. Spends 3–5 min on a 1366 laptop. Wants to know
   what John built himself as opposed to the team, how it works, whether the
   claims hold up, how he judges AI risk, and whether there is code. Opens case
   studies and reads.

### Task outcomes

#### Persona 1, laptop 1366x900, 30 s budget

| # | Task | Outcome | Time / clicks / depth | What they understood | Confusion / missing evidence | Likely drop-off |
|---|---|---|---|---|---|---|
| 1.1 | Say who he is and his AI/data focus | **Success** | ~1 s, 0 clicks, fold. All hero text is readable at 0.8 s (`p1-laptop-01-t0.8s.png`) | Name; "AI, data and full-stack developer"; "builds AI and data tools people can trust"; Desk Assist at LGA Telecom; SIT × Glasgow, graduating Apr 2027 | "Desk Assist" is a proper noun with no gloss in the hero, and "service desk" never appears above the fold. A non-engineer may not know what it is (`Hero.tsx:208`). The pending hero redesign may fix this; check the new hero says "an AI assistant for service desk agents" in words. | None |
| 1.2 | Name his strongest project | **Partial / likely wrong answer** | Not reached in 30 s. A 4-screen skim stops in Experience (y≈3600); the first project tile is at 5.6 screens | In the skim they see StatsBand "89.61% UWB model accuracy" (`StatsBand.tsx:12`) and Desk Assist "In progress". Hypothesis: they answer "Desk Assist" (unfinished) or "the 89.61% model" (coursework) | Even after reaching Projects, the two **Featured** tiles (SilverLink, SCS) are full-stack and web apps. Neither is visibly AI or data (`data/projects.ts:61-94`). The AI & Data reader asking "his strongest *AI* project" gets no labelled answer. The pending StatsBand and hero do not fix this. | Experience, at 3–4 screens |
| 1.3 | Find evidence he's credible | **Partial** | 0 clicks; outcomes at 3.3 screens as body text | 40% fewer manual agent actions, 1,000+ configs, 50+ UAT defects, Internship Distinction | No third-party signal near the top: Director's List (NYP), the NVIDIA DLI / AI Singapore certificates and the Glasgow hackathon facilitator role are on the resume but not on the site, or only in a bullet at ~4 screens (`Experience.tsx:92`). The pending StatsBand moves 40% / 1,000+ up. | 3–4 screens |
| 1.4 | Get the resume | **Success** | 1 click, 0 scroll; download fired as `John_Aaron_Branzuela_Resume.pdf` | Primary orange button | None | None |
| 1.5 | Find how to contact him | **Success** (with caveat) | 0 scroll; hero "Email me" at y=709 | Email is reachable | The hero's Email me is `mailto:` only (`Hero.tsx:236`). On a laptop with webmail and no mail client, a click does nothing visible. The address only appears as text in the footer at 9.3 screens (`Footer.tsx:89`). | None for most; some get stuck on mailto |

#### Persona 1, phone 375x812, 2 min budget

| # | Task | Outcome | Time / clicks / depth | Notes |
|---|---|---|---|---|
| 1.6 | Who + AI/data focus | **Success** | Fold (`p1-phone-01-fold.png`) | The fold is all identity and buttons, with no proof element. Pending hero redesign. |
| 1.7 | Strongest project | **Partial** | 2 taps (Menu → Projects), then ~600 px of filter chips in **5 rows** before the first tile (`p1-phone-03-projects.png`, `Projects.tsx:229`). By scroll, SilverLink is at 7.1 screens | The ux.md IA gap (filters above flagships) is still open and worse than ux.md's estimate of 3 rows. The SilverLink thumbnail is an unreadable grid of event cards at 299 px wide (`p1-phone-04-silverlink-tile.png`). |
| 1.8 | Credibility | **Partial** | 40% at 3.8 screens; page is 15.7 screens long | Long single page. The menu helps (1.0 tap to any section). |
| 1.9 | Resume | **Success** | Full-width 343x49 button in the fold | PDF behaviour on iOS Safari is not tested (headless only). |
| 1.10 | Contact | **Success** | Hero Email me in the fold; Menu → Contact; footer shows the address as text | Fine. |

Mobile layout note: the fixed dock (Menu + Pause + Sound OFF at bottom-left, Chat
at bottom-right) takes the bottom 64 px of every phone screen (y 748–797,
`SoundToggle.tsx:7`, `SectionNav.tsx:176`) and sits over tile images and body
text while scrolling (`p1-phone-03-projects.png`).

#### Persona 2, laptop 1366x900, 3–5 min budget

| # | Task | Outcome | Time / clicks / depth | What they understood | Confusion / missing evidence | Likely drop-off |
|---|---|---|---|---|---|---|
| 2.1 | What John built in SilverLink vs the team | **Fail** | 1 click (tile); read the whole 7,159 px page | Six-person team; his name is 2nd of 6 in a plain list (`SilverLinkProject.tsx:61`) | No "My part" section (SCS, UWB and Fire Safety have one). This is deliberate per `copy-case-studies.md:94` (NEEDS JOHN Q1). But the **chat bot claims "I built front ends for SilverLink SG"** (`MascotChatWidget.tsx:78`), which the site does not confirm and the copy rule forbids ("Do not say 'I built' anywhere on this page"). A sceptic who finds both trusts neither. | SilverLink header. This is the featured project, and with no attribution they are likely to move on to SCS. |
| 2.2 | How SilverLink works (architecture, scale, double-booking fix) | **Partial** | "How it works" at y=4463, about 5 screens into the case page, after Problem, What it does and Screens (`p2-02-silverlink-how.png`) | 4-tier diagram; 409 on conflict via optimistic concurrency; idempotency keys; EMA forecast recommends replicas | The double-booking fix is one bullet each, with no mechanism (what is version-checked, and where). There are no trade-offs and no "what we'd change". "8 Kubernetes nodes" has no context (whose cluster, what load). There is no scale or load evidence: the metrics screenshot shows 212 ms average with no note saying whether it was a demo. The 5-point "Key decisions" draft in `copy-case-studies.md:97-110` is only partly built (3 bullets). | Mid-page; "How it works" sits below a 4-image gallery |
| 2.3 | Verify "40% fewer manual agent actions" | **Fail (unverifiable)** | Found in 1 scroll (Experience, 3.3 screens); nothing else to click | It came from Freshservice automation | No baseline, period, unit (actions per ticket?) or method. The bullet also credits **both** the 40% and the 15 minutes to "Freshservice automation" (`Experience.tsx:68`). The resume credits the 15 minutes to Teams escalation alerts. The fix is already drafted in `copy.md` (Key figures section) but not applied. | Treats it as a resume-style claim and discounts it |
| 2.4 | Desk Assist state and AI judgement | **Partial** | 0 clicks; Experience at 3.5 screens (`p2-06-desk-assist-flow.png`) | State is clear ("In progress" badge, "Building", "will draft"). Human review is visible: step 5 "Agent reviews" is lit orange. | Guardrails are almost invisible. On the page they are one Skills list item, "AI guardrails & data-leakage prevention", which needs the keyboard or the `<details>` list. The real evidence (least-privilege permissions, no remotely hosted code, data-leakage prevention, AI calls routed through a company-controlled backend, KB-change detection that warns agents when advice relied on an outdated article) is **in `resume.pdf`** but only reachable through the chat bot's "desk assist" keyword (`MascotChatWidget.tsx:33`). These are resume facts, so they can go on the page without asking John. There is no Desk Assist case page. | After the flow diagram; "nice diagram, no depth" |
| 2.5 | Find code for one project | **Fail for 5 of 6** | 1 click per case page | UAT links its own repo (`UATProject.tsx:195`) | SilverLink, SCS, AI Finance, UWB and Fire Safety each show a "GitHub profile" button (`CaseHeader.tsx:15`). That button suggests the code is there; the reader has to search the profile and may find nothing. (I could not list the profile's repos from this session: the GitHub API was scoped to this repository.) | First case page with only a profile link |
| 2.6 | UWB 89.61% context (team, dataset, his part) | **Partial** | 1 click; header and "My part" (`p2-04-uwb-mypart.png`) | CSC3105 module, Group CS05, "Role: data mining methods"; My part has 3 concrete bullets (model choice, leakage, regression); 8,400 test samples; logistic regression 85.75% as baseline | Team size is missing (NEEDS JOHN Q8). There is **no dataset name or source**: was it public, given by the module, or collected by the team? "Beat the baseline" doesn't name the baseline in the lead; the reader has to infer it from the stat labels (`UWBProject.tsx` Results lead). On Home, 89.61% sits in the StatsBand with no coursework or team tag. That last point is the pending StatsBand change. | Satisfied enough. UWB is the best-attributed AI/data page. |

### Observed: achievement toast (after 690d181)

What I measured (`toast.js`, screenshots `toast-laptop-tile.png`, `toast-phone-tile.png`):

- A **direct link** to `/projects/silverlink` shows **no toast**.
- A **project-tile click** shows "Achievement unlocked: DEEP_DIVE". It appears
  about 10 ms after the case page renders and stays about **3.6 s**
  (`useAchievements.tsx:60`, `duration: 3500`). A second tile click in the same
  session shows nothing (once per session).
- **Laptop:** the toast sits bottom-left, 288x143, over the **first key figure
  ("4 gRPC microservices")** in the case header's orange status bar
  (`p2-01-silverlink-fold.png`).
- **Phone:** it settles over the **team-names line and the "GitHub profile"
  button**, the two things persona 2 is looking for on arrival.
- Its icon is an emoji (🔍, `useAchievements.tsx:9`).

Hypothesis: harmless for the recruiter, but the hiring manager's first
3.6 s on the flagship case is partly covered. This is low severity because it
fires once and goes away on its own.

### Prioritised findings (design/IA fixes the team can make)

All findings are simulated. "Validate" says how John can check each one with a real person.

| P | Finding | Trigger (file:line / selector) | Fix | Owner | Validate |
|---|---|---|---|---|---|
| **P0** | Chat bot makes an unconfirmed claim about SilverLink authorship that contradicts the page and the copy rule | `MascotChatWidget.tsx:78` ("I built front ends for SilverLink SG and the SCS Awareness Platform") vs `copy-case-studies.md:94` | Remove "SilverLink SG" from that answer until Q1 is answered. Audit every chat answer for "I built" against the case pages. | copywriter → coder | Ask an engineer friend to use the chat bot, then read the SilverLink page, and ask what John built |
| **P1** | Desk Assist's AI judgement evidence exists (resume) but is hidden in the chat bot | `Experience.tsx:30-55` (flow), `MascotChatWidget.tsx:33`, resume p.1 | Add a short "Guardrails" line or annotation to the Desk Assist flow, using resume wording only: least-privilege permissions, no remote code, AI calls via a company-controlled backend, a warning when advice relied on an outdated KB article, and the agent reviews every draft. Keep "in progress". | copywriter (words), design-visual-storyteller (annotated flow), coder | Give a data/ML engineer 60 s on Experience: "What stops this AI from sending a wrong answer?" |
| **P1** | The AI & Data recruiter cannot find a labelled "strongest AI project": both Featured tiles read as web apps | `data/projects.ts:61-94` (`featured`), `Projects.tsx:225` lead, Ribbon items `Home.tsx:68` | Option A: add an AI/data line to each featured tile (e.g. SCS "question bank and analytics with CSV export", SilverLink "EMA load forecast") from facts already on site. Option B: John picks which project leads for this track (NEEDS JOHN N1). Don't change `featured` without John. | copywriter, design-ui-designer | 5-second test with a non-engineer: show Projects, ask "which of these is his AI work?" |
| **P1** | "40%" bullet merges two outcomes and gives no measure | `Experience.tsx:68` | Apply the split already drafted in `copy.md` (Key figures section): 40% via Freshservice rules; 15 min via Teams alerts. Add the method once John answers B2. | copywriter → coder | Ask a hiring manager "how would you check this number?" |
| **P1** | "GitHub profile" on 5 of 6 case pages implies code that may not exist | `CaseHeader.tsx:15-19`, each page's `links={[GITHUB_PROFILE]}` | Where there is no public repo, say so plainly (e.g. "Code: private course repository") and keep the profile as a secondary link. Link repos when John gives them (Q13). | copywriter, coder | Ask an engineer to "find the SilverLink code" and time it |
| **P2** | SilverLink "How it works" is thin and sits ~5 screens down | `SilverLinkProject.tsx:105-122` | Build the 5 "Key decisions" already drafted (`copy-case-studies.md:97-110`). Put How it works above the screenshot gallery, or add an "On this page" jump row. Add a 3-step double-booking sequence (read version → write if unchanged → 409) as a small diagram. | copywriter, design-visual-storyteller, coder | Ask an engineer to explain the double-booking fix after 2 min on the page |
| **P2** | Projects filter chips push the flagships below 5 chip rows on phones | `Projects.tsx:229` | One horizontally scrollable chip row below 640px, or put the chips under the two featured tiles (ux.md §1, still open) | design-ui-designer, coder | Phone screen recording with a recruiter: how long until they tap a tile |
| **P2** | Fixed bottom-left dock (Pause motion + Sound OFF, plus Menu on phones) covers body text and tile copy as you scroll; at 1366 it sits over the SilverLink tile description | `SoundToggle.tsx:7` `FLOAT_DOCK`, `SectionNav.tsx:176`; `p1-laptop-04-projects.png`, `p1-laptop-03-skim-1.png` (over the About photo) | Collapse Pause + Sound into one small "Settings" control, or give the page bottom padding equal to the dock height on content columns. This goes against the "decoration never sits on top of body text" rule. | design-ui-designer, coder | Ask a recruiter to read the SilverLink tile at 1366; watch whether they scroll to uncover text |
| **P2** | Chat launcher overlaps the case-study "GitHub profile" button at 375 (already in the critique, still open) | Case page `main a[href*="github.com"]` at y=785–834 vs Chat button y=750–796 (`p2-phone-silverlink-fold.png`) | As critique §5 | coder | — |
| **P2** | UWB "beat the baseline" doesn't name the baseline; the dataset isn't named | `UWBProject.tsx` Results lead; `UWBProject.tsx:43-55` pipeline | "beat logistic regression (the baseline): 89.61% vs 85.75%" (fact on page). Dataset source after N3. | copywriter | Ask an ML engineer "what was 89.61% measured on?" |
| **P3** | Achievement toast covers the first key figure (laptop) or team line + GitHub button (phone) for 3.6 s after a tile click; emoji icon | `useAchievements.tsx:9,60`; sonner position | Show DEEP_DIVE top-right on case pages or delay it until the first scroll; swap 🔍 for a pixel icon | coder, asset-artist | Watch one person click a tile; do they read the toast or the page? |
| **P3** | Hero "Email me" is mailto-only; the address is visible only in the footer | `Hero.tsx:236`, `Footer.tsx:89` | Show the address as text next to the button, or add a "Copy email" control | design-ui-designer, coder | Ask a recruiter on a work laptop to email him; watch what happens |
| **P3** | Third-party credibility signals are weak on Home: Director's List and the hackathon facilitator role are on the resume only; the NVIDIA DLI / AI Singapore certificates are buried in the Education bullet | resume p.1 vs `About.tsx:50-56` facts, `Experience.tsx:92` | Add one "Recognition" chip row (resume facts only) | copywriter | 5-second test: "is there anything that shows someone else rated him well?" |

### NEEDS JOHN

Already open elsewhere (persona evidence makes these more urgent):

- **Q1 (`copy-case-studies.md`)**: what exactly did you build in SilverLink?
  It is the featured project, and persona 2 fails on it (task 2.1).
- **B2 (`copy.md`)**: baseline, period and unit for "40% fewer manual agent
  actions" (task 2.3).
- **Q13 (`copy-case-studies.md`)**: are there public repos for SilverLink, SCS,
  AI Finance, UWB or Fire Safety? If they are private, can we say "private
  course repository"? (task 2.5)
- **Q8**: Group CS05's size (task 2.6).
- **Q2**: does SilverLink's EMA forecast scale pods automatically, or only
  recommend a replica count?

New from this walkthrough:

- **N1.** For the DBS AI & Data Science track, which project should a recruiter
  call your "strongest AI/data project"? CLAUDE.md names SilverLink and SCS as
  best work, but neither reads as AI/data on the tiles. Options: keep them, but
  surface their data or AI parts; feature UWB or AI Finance for this track; or
  add a Desk Assist page.
- **N2.** Can you share anything more about Desk Assist publicly (a redacted
  screenshot, its stage such as prototype or pilot with N agents, what it was
  tested on), or is it confidential to LGA? This decides whether it gets its own
  "in progress" case page.
- **N3.** UWB dataset: was it a public dataset (name and citation), provided by
  the module, or collected by the team?
- **N4.** SilverLink scale: was the 8-node cluster ever load-tested, and is the
  212 ms figure in `system_metrics.png` from a real test or a demo dashboard?
- **N5.** Is anything in SilverLink not finished or not working that a reviewer
  might find? Hiring managers value an honest "what we'd change" line.

### How John could validate these (cheap)

1. **5-second test** (recruiter friend or classmate, laptop): show the Home fold
   for 5 s, hide it, then ask "What does he do? What's his best AI project?"
   This tests 1.1 and 1.2.
2. **30-second skim, screen-recorded:** "You're screening for DBS AI & Data.
   Decide yes or no." Note where they stop scrolling (1.2, 1.3).
3. **Engineer think-aloud, 5 min** (a senior from an internship or a TA): "Tell me
   what John built in SilverLink, and find the code." This tests 2.1, 2.2 and 2.5.
4. **"Poke the number"**: ask one hiring manager to challenge the 40% and the
   89.61%. Whatever they ask is the missing context (2.3, 2.6).

### Method limits

Headless Chromium only, no real iOS/Android. Read time is estimated from scroll
depth, not measured with people. The GitHub profile's contents couldn't be
checked from this session. Reduced-motion and keyboard paths were not walked
(not in this brief).
