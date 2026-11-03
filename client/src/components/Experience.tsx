import type { ReactNode } from 'react';
import FlowDiagram, { type FlowStep } from './FlowDiagram';
import FramerReveal from './FramerReveal';
import { Chip, PixelList, SpotPlate } from './Hierarchy';
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
  /** A visual block after the bullets */
  extra?: ReactNode;
};

// Black text on orange or teal (approved pairings); sentence case
type Badge = 'Internship' | 'In progress' | 'Education';

const BADGE_FILL: Record<Badge, string> = {
  Internship: 'bg-[var(--orange)]',
  'In progress': 'bg-[var(--teal)]',
  Education: 'bg-[var(--teal)]',
};

// From the Desk Assist description already on the site: the AI reads the
// thread, finds knowledge-base guidance and drafts; an agent reviews every
// draft before it's sent. The review step is the emphasis.
const DESK_ASSIST_FLOW: FlowStep[] = [
  { label: 'Ticket' },
  { label: 'Reads the thread', actor: 'AI' },
  { label: 'Finds KB guidance', actor: 'AI' },
  { label: 'Drafts a reply', actor: 'AI' },
  { label: 'Agent reviews', actor: 'Agent', emphasis: true },
  { label: 'Sent' },
];

/** Desk Assist (in progress, per the window's badge): its program icon and how a reply gets drafted */
function DeskAssistFlow() {
  return (
    <div className="mt-8 lg:mt-10">
      <div className="flex items-center gap-4 mb-6 lg:mb-8">
        <SpotPlate spot={{ name: 'spot-desk-assist', tone: 'teal' }} className="size-24 lg:size-36" />
        <h4 id="desk-assist-flow" className="font-pixel text-[15px] sm:text-base leading-[1.5] text-black">
          How Desk Assist will draft a reply
        </h4>
      </div>
      <FlowDiagram steps={DESK_ASSIST_FLOW} labelledBy="desk-assist-flow" lgCols={3} />
    </div>
  );
}

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
    extra: <DeskAssistFlow />,
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
                    <span key={badge} className={`font-pixel text-xs text-black border-2 border-black px-2 py-1 ${BADGE_FILL[badge]}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8 pb-6 border-b-[3px] border-black">
                  <div>
                    <h3 className="font-pixel text-base sm:text-lg text-black mb-2 leading-relaxed">
                      {entry.org}
                    </h3>
                    <p className="font-mono-8bit text-[15px] sm:text-base font-bold">
                      {entry.role}
                    </p>
                  </div>
                  <Chip icon="chip-calendar" text={entry.period} className="flex-shrink-0 self-start whitespace-nowrap" />
                </div>

                <PixelList items={entry.highlights} />
                {entry.extra}
              </Window>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
