import FramerReveal from './FramerReveal';
import SectionHeading from './SectionHeading';
import Window from './Window';

type Entry = {
  org: string;
  /** Window title, filename style */
  file: string;
  role: string;
  period: string;
  highlights: string[];
  badges: Badge[];
};

// Black text on orange or teal (approved pairings); sentence case
type Badge = 'Internship' | 'In progress' | 'Education';

const BADGE_FILL: Record<Badge, string> = {
  Internship: 'bg-[var(--orange)]',
  'In progress': 'bg-[var(--teal)]',
  Education: 'bg-[var(--teal)]',
};

const ENTRIES: Entry[] = [
  {
    org: "LGA Telecom",
    file: "lga_telecom.exe",
    role: "Service Desk Operations & AI Integration Intern",
    period: "Aug 2026 – Present",
    // Desk Assist is in progress (CLAUDE.md honesty rule); AI work first
    badges: ["Internship", "In progress"],
    highlights: [
      "Building Desk Assist (in progress), an AI assistant for service desk agents. The Manifest V3 Chrome extension reads the ticket thread, finds matching knowledge-base guidance and drafts a reply. The agent reviews every draft before it's sent.",
      "Defined enterprise security requirements for the extension: least-privilege permissions, no remote code or unsafe-eval, no broad host access, and data leakage prevention, with AI calls routed through a company-controlled backend aligned with LGA's local AI plans.",
      "Led the full-stack integration of the FreeSDN network management platform across 4+ equipment manufacturers, and migrated 1,000+ network configurations through REST API integrations and migration scripts.",
      "Configured Freshservice business rules and workflows for ticket closure and escalation, scoped to the Service Desk so other teams' live tickets stay untouched, cutting manual agent actions by 40%.",
      "Cut incident resolution time by 15 minutes by integrating Freshservice with Microsoft Teams for automated escalation alerts.",
      "Automated a weekly PagerDuty incident report with the PagerDuty API and Google Apps Script, emailed as a CSV, saving 4 hours of manual reporting a week.",
      "Handle Level 1 customer tickets in Freshservice end to end (triage, troubleshooting, escalation and closure) and support customers with Microsoft 365 administration in the admin centre and Microsoft Entra ID.",
    ],
  },
  {
    org: "Sembcorp Solar Singapore",
    file: "sembcorp_solar.exe",
    role: "Digitization Analyst Intern",
    period: "Oct 2020 – Jun 2021",
    badges: ["Internship"],
    highlights: [
      "Led rollout of Momens CRM across Projects, C&I, and SolarNova divisions for a 240MWp+ portfolio.",
      "Ran UAT on new CRM features before deployment, checking each against its requirements, rejecting builds that fell short and tracking 50+ defects to resolution.",
      "Hosted training sessions for 10+ stakeholders per session; gathered UX feedback and liaised with vendors to ship improvements.",
      "Supported SolarNova 3 (50MWp, 20 MOE schools): milestone tracking, site visits, and documentation.",
      "Turned operational data from 240MWp+ of solar assets into executive dashboards for leadership.",
      "Awarded an Internship Distinction and earned a contract extension.",
    ],
  },
  {
    org: "Singapore Institute of Technology × University of Glasgow",
    file: "sit_glasgow.txt",
    role: "BSc (Hons) Computing Science",
    period: "Sep 2024 – Apr 2027",
    badges: ["Education"],
    highlights: [
      "Team project: SilverLink SG, 4 gRPC microservices on an 8-node Kubernetes cluster with WebRTC livestreaming, built over 7 Agile sprints.",
      "Core modules: Cloud Computing, Software Engineering, Mobile Development, Data Analytics, Requirements Engineering.",
      "Certifications: AI4I Literacy in AI (AI Singapore, 2026); Fundamentals of Deep Learning (NVIDIA DLI, 2026).",
      "Practised UAT, requirements analysis and the full software lifecycle in coursework and on placement.",
    ],
  },
];

export default function Experience() {
  return (
    <FramerReveal>
      <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading text="EXPERIENCE" icon="icon-experience" className="mb-16" />

          <div className="space-y-10">
            {ENTRIES.map((entry) => (
              <Window key={entry.org} title={entry.file} bodyClassName="p-6 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {entry.badges.map(badge => (
                    <span key={badge} className={`font-pixel text-xs text-black border-2 border-black px-2 py-1 ${BADGE_FILL[badge]}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-8 pb-6 border-b-[3px] border-black">
                  <div>
                    <h3 className="font-pixel text-base sm:text-lg text-black mb-2 leading-relaxed">
                      {entry.org}
                    </h3>
                    <p className="font-mono-8bit text-[15px] sm:text-base font-bold">
                      {entry.role}
                    </p>
                  </div>
                  <p className="font-mono-8bit text-[15px] sm:text-base whitespace-nowrap flex-shrink-0">
                    {entry.period}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="font-mono-8bit text-[15px] sm:text-base leading-relaxed flex items-start gap-3 max-w-[75ch]">
                      <span aria-hidden="true" className="flex-shrink-0 mt-[0.6em] w-2.5 h-2.5 bg-[var(--orange)] border-2 border-black" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Window>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
