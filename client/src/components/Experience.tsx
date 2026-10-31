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
  tag?: string;
};

const ENTRIES: Entry[] = [
  {
    org: "LGA Telecom",
    file: "lga_telecom.exe",
    role: "Service Desk Operations & AI Integration Intern",
    period: "Aug 2026 – Present",
    tag: "INTERNSHIP",
    highlights: [
      "Designing and building Desk Assist, a Manifest V3 Chrome extension that reads the ticket thread, retrieves relevant Knowledge Base guidance and drafts a reply for the agent to review, keeping a human in control of every customer response",
      "Handle Level 1 customer tickets in Freshservice end to end (triage, troubleshooting, escalation and closure) and support customers with Microsoft 365 administration in the admin centre and Microsoft Entra ID",
      "Defined enterprise security requirements for the extension: least-privilege permissions, no remote code or unsafe-eval, no broad host access, and data leakage prevention, with AI calls routed through a company-controlled backend aligned with LGA's local AI rollout",
      "Configured Freshservice business rules and workflow automations for ticket closure and escalation, scoped to the Service Desk so other teams' live tickets stay unaffected",
      "Building an automated weekly PagerDuty incident report with the PagerDuty API and Google Apps Script, delivered as CSV by email",
    ],
  },
  {
    org: "Sembcorp Solar Singapore",
    file: "sembcorp_solar.exe",
    role: "Digitization Analyst Intern",
    period: "Oct 2020 – Jun 2021",
    tag: "INTERNSHIP",
    highlights: [
      "Led rollout of Momens CRM across Projects, C&I, and SolarNova divisions for a 240MWp+ portfolio",
      "Conducted UAT on new CRM features before deployment, verifying against originator requirements and rejecting non-compliant builds",
      "Hosted training sessions for 10+ stakeholders per session; gathered UX feedback and liaised with vendors to ship improvements",
      "Supported SolarNova 3 (50MWp, 20 MOE schools): milestone tracking, site visits, and documentation",
      "Translated operational data from 240MWp+ solar assets into executive dashboards for leadership review",
    ],
  },
  {
    org: "Singapore Institute of Technology × University of Glasgow",
    file: "education.txt",
    role: "BSc (Hons) Computing Science",
    period: "Sep 2024 – Apr 2027",
    tag: "EDUCATION",
    highlights: [
      "Team project: SilverLink SG, 8-node Kubernetes cluster, 4 gRPC microservices, WebRTC livestreaming, delivered across 7 Agile sprints",
      "Core modules: Cloud Computing, Software Engineering, Mobile Development, Data Analytics, Requirements Engineering",
      "Grounding in UAT methodology, requirements analysis, and end-to-end SDLC reinforced across coursework and industry placement",
    ],
  },
];

// Black text on orange or teal (approved pairings)
const TAG_COLORS: Record<string, string> = {
  EDUCATION: 'bg-[var(--teal)]',
  INTERNSHIP: 'bg-[var(--orange)]',
};

export default function Experience() {
  return (
    <FramerReveal>
      <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading text="EXPERIENCE" className="mb-16" />

          <div className="space-y-10">
            {ENTRIES.map((entry) => (
              <Window key={entry.org} title={entry.file} bodyClassName="p-6 sm:p-10 lg:p-12">
                {entry.tag && (
                  <div className="flex items-center mb-4">
                    <span className={`font-pixel text-xs text-black border-2 border-black px-2 py-1 ${TAG_COLORS[entry.tag] ?? 'bg-[var(--cream)]'}`}>
                      {entry.tag.charAt(0) + entry.tag.slice(1).toLowerCase()}
                    </span>
                  </div>
                )}

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
                    <li key={i} className="font-mono-8bit text-[15px] leading-relaxed flex items-start gap-3 max-w-[75ch]">
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
