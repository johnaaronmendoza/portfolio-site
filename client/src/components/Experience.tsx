import FramerReveal from './FramerReveal';
import { Chip, PixelList } from './Hierarchy';
import SectionHeading from './SectionHeading';
import Window from './Window';

type Entry = {
  org: string;
  /** Window title, filename style */
  file: string;
  role: string;
  period: string;
  /** ≤ 3 bullets, outcome or number first; `**…**` marks the key term */
  highlights: string[];
  badges: Badge[];
};

// Black text on yellow or blue (approved pairings); sentence case
type Badge = 'Internship' | 'In progress' | 'Education';

const BADGE_FILL: Record<Badge, string> = {
  Internship: 'bg-[var(--yellow)]',
  'In progress': 'bg-[var(--blue)]',
  Education: 'bg-[var(--blue)]',
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
      "Building Desk Assist: an AI Chrome extension that drafts ticket replies for agent review.",
      "**1,000+ network configurations** migrated while leading the FreeSDN integration across 4+ manufacturers.",
      "**40%** fewer manual agent actions, 15 minutes faster incident resolution, via Freshservice automation.",
    ],
  },
  {
    org: "Sembcorp Solar Singapore",
    file: "sembcorp_solar.exe",
    role: "Digitization Analyst Intern",
    period: "Oct 2020 – Jun 2021",
    badges: ["Internship"],
    highlights: [
      "Led the Momens CRM rollout across 3 divisions for a **240MWp+** portfolio.",
      "**50+ defects** tracked to resolution in UAT before the CRM went live.",
      "Earned an Internship Distinction and a contract extension.",
    ],
  },
  {
    org: "Singapore Institute of Technology × University of Glasgow",
    file: "sit_glasgow.txt",
    role: "BSc (Hons) Computing Science",
    period: "Sep 2024 – Apr 2027",
    badges: ["Education"],
    highlights: [
      "Core modules: Cloud Computing, Software Engineering, Mobile Development, Data Analytics, Requirements Engineering.",
      "Certifications: AI4I Literacy in AI (AI Singapore); Fundamentals of Deep Learning (NVIDIA DLI), 2026.",
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
                    <span key={badge} className={`font-label text-xs text-black border-2 border-black px-2 py-1 ${BADGE_FILL[badge]}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8 pb-6 border-b-[3px] border-black">
                  <div>
                    <h3 className="font-display text-2xl sm:text-[28px] text-black mb-2">
                      {entry.org}
                    </h3>
                    <p className="font-sans text-[15px] sm:text-base font-bold">
                      {entry.role}
                    </p>
                  </div>
                  <Chip icon="chip-calendar" text={entry.period} className="flex-shrink-0 self-start whitespace-nowrap" />
                </div>

                <PixelList items={entry.highlights} />
              </Window>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
