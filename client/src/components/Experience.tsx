import type { ReactNode } from 'react';
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
  /** Shown after a highlight's text, keyed by the highlight */
  extras?: Record<string, ReactNode>;
};

// Status badges (index.css .badge): ink with paper text, dashed paper for
// unfinished work, plain paper; never yellow (yellow marks AI). Sentence case.
type Badge = 'Internship' | 'In progress' | 'Education';

const BADGE_CLASS: Record<Badge, string> = {
  Internship: 'badge badge--ink',
  'In progress': 'badge badge--status',
  Education: 'badge badge--paper',
};

const DESK_ASSIST = "Building Desk Assist: an AI Chrome extension that drafts ticket replies for agent review.";

const ENTRIES: Entry[] = [
  {
    org: "LGA Telecom",
    file: "lga_telecom.exe",
    role: "Service Desk Operations & AI Integration Intern",
    period: "Aug 2026 – Present",
    badges: ["Internship"],
    highlights: [
      DESK_ASSIST,
      "**1,000+ network configurations** migrated while leading the FreeSDN integration across 4+ manufacturers.",
      "**40%** fewer manual agent actions, 15 minutes faster incident resolution, via Freshservice automation.",
    ],
    // Desk Assist is in progress (CLAUDE.md honesty rule): the badge sits on its
    // bullet, with its security model in the resume's words under it
    extras: {
      [DESK_ASSIST]: (
        <>
          {' '}<span className={`${BADGE_CLASS['In progress']} align-middle`}>In progress</span>
          <span className="mt-2 block text-[15px]">
            Security model: least-privilege permissions, no remotely hosted code, AI calls through a company-controlled backend.
          </span>
        </>
      ),
    },
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

/** One role as a window. The lead (LGA, the current role) is full width and,
 *  from lg, splits into a 12-column body: who/when on the left, outcomes on
 *  the right, with a heavier shadow like the Projects window. */
function ExperienceWindow({ entry, lead = false }: { entry: Entry; lead?: boolean }) {
  return (
    <Window
      title={entry.file}
      className={lead ? 'lg:shadow-[12px_12px_0_0_var(--ink)]' : 'flex h-full flex-col'}
      bodyClassName={lead ? 'p-6 sm:p-10 lg:p-12 lg:grid lg:grid-cols-12 lg:gap-x-12' : 'flex-1 p-6 sm:p-10'}
    >
      <div
        className={`mb-8 pb-6 border-b-[3px] border-black ${
          lead ? 'lg:col-span-4 lg:mb-0 lg:pb-0 lg:border-b-0 lg:border-r-[3px] lg:pr-10' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {entry.badges.map(badge => (
            <span key={badge} className={BADGE_CLASS[badge]}>
              {badge}
            </span>
          ))}
        </div>
        <h3 className={`font-display text-black mb-2 text-balance ${lead ? 'text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.1]' : 'text-2xl sm:text-[28px]'}`}>
          {entry.org}
        </h3>
        <p className="font-sans text-[15px] sm:text-base font-bold text-pretty">
          {entry.role}
        </p>
        <Chip icon="chip-calendar" text={entry.period} className="mt-4 whitespace-nowrap" />
      </div>

      <PixelList items={entry.highlights} extras={entry.extras} className={lead ? 'lg:col-span-8 lg:self-center' : ''} />
    </Window>
  );
}

export default function Experience() {
  const [lead, ...rest] = ENTRIES;
  return (
    <FramerReveal>
      <section className="px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading text="EXPERIENCE" icon="icon-experience" className="mb-16" />

          {/* LGA leads; Sembcorp and the degree sit side by side from lg */}
          <div className="space-y-10 lg:space-y-14">
            <ExperienceWindow entry={lead} lead />
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-10">
              {rest.map(entry => (
                <ExperienceWindow key={entry.org} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
