import FramerReveal from './FramerReveal';
import SectionHeading from './SectionHeading';

type Entry = {
  org: string;
  role: string;
  period: string;
  highlights: string[];
  tag?: string;
};

const ENTRIES: Entry[] = [
  {
    org: "LGA Telecom",
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
    role: "BSc (Hons) Computing Science",
    period: "Sep 2024 – Apr 2027",
    tag: "EDUCATION",
    highlights: [
      "Final-year project: SilverLink SG, 8-node Kubernetes cluster, 4 gRPC microservices, WebRTC livestreaming, delivered across 7 Agile sprints",
      "Core modules: Cloud Computing, Software Engineering, Mobile Development, Data Analytics, Requirements Engineering",
      "Grounding in UAT methodology, requirements analysis, and end-to-end SDLC reinforced across coursework and industry placement",
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  EDUCATION: 'text-blue-400 border-blue-400',
  INTERNSHIP: 'text-amber-400 border-amber-400',
  VENTURE:    'text-zinc-400 border-zinc-400',
};

export default function Experience() {
  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading index="02" text="EXPERIENCE" className="mb-16" />

          <div className="space-y-8">
            {ENTRIES.map((entry) => (
              <div
                key={entry.org}
                className="border-8bit shadow-8bit bg-zinc-900 p-6 sm:p-10 lg:p-12"
              >
                {entry.tag && (
                  <div className="flex items-center mb-4">
                    <span className={`font-pixel text-xs border px-2 py-0.5 ${TAG_COLORS[entry.tag] ?? 'text-zinc-400 border-zinc-400'}`}>
                      {entry.tag.charAt(0) + entry.tag.slice(1).toLowerCase()}
                    </span>
                  </div>
                )}

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-8 pb-6 border-b-2 border-amber-400">
                  <div>
                    <h3 className="font-pixel text-base sm:text-lg text-blue-400 mb-2 leading-relaxed">
                      {entry.org}
                    </h3>
                    <p className="font-mono-8bit text-sm font-bold text-amber-400">
                      {entry.role}
                    </p>
                  </div>
                  <p className="font-mono-8bit text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {entry.period}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-3">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="font-mono-8bit text-sm sm:text-[15px] text-zinc-200 leading-relaxed flex items-start gap-3 max-w-[75ch]">
                      <span className="text-amber-400 font-bold flex-shrink-0 mt-1">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
