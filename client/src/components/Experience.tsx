import { motion } from 'framer-motion';
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
    org: "Singapore Institute of Technology × University of Glasgow",
    role: "BSc (Hons) Computing Science",
    period: "2023 – Present",
    tag: "EDUCATION",
    highlights: [
      "Specialising in software engineering, data analytics, and cloud systems",
      "Relevant modules: Cloud Computing, Mobile Development, Data Analytics, Software Engineering",
      "Built SilverLink SG (gRPC microservices, Kubernetes) and Fire Safety AR App as coursework projects",
    ],
  },
  {
    org: "Sembcorp Solar Singapore",
    role: "Digitization Analyst Intern",
    period: "Oct 2020 – Jun 2021",
    tag: "INTERNSHIP",
    highlights: [
      "Led rollout of Momens CRM across Projects, C&I, and SolarNova divisions for a 240MWp+ portfolio",
      "Conducted UAT on new CRM features before deployment — verified against originator requirements and rejected non-compliant builds",
      "Hosted training sessions for 10+ stakeholders per session; gathered UX feedback and liaised with vendors to ship improvements",
      "Supported SolarNova 3 (50MWp, 20 MOE schools): milestone tracking, site visits, and documentation",
      "Translated operational data from 240MWp+ solar assets into executive dashboards for leadership review",
    ],
  },
  {
    org: "GreenLoopFarms",
    role: "Co-Ideator",
    period: "2022",
    tag: "VENTURE",
    highlights: [
      "Contributed to the founding idea for a Singapore hydroponic urban farm growing pesticide-free microgreens",
      "The venture won an SGD $10,000 NYP JumpStart Grant and secured partnerships with FURA (World's 50 Best), NIE, and NUS",
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
            {ENTRIES.map((entry, idx) => (
              <motion.div
                key={idx}
                className="border-8bit shadow-8bit bg-zinc-900 p-6 sm:p-10 lg:p-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Tag + Index */}
                <div className="flex items-center gap-3 mb-4">
                  {entry.tag && (
                    <span className={`font-pixel text-[9px] border px-2 py-0.5 ${TAG_COLORS[entry.tag] ?? 'text-zinc-400 border-zinc-400'}`}>
                      {entry.tag}
                    </span>
                  )}
                  <span className="font-pixel text-[9px] text-zinc-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

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
                    <li key={i} className="font-mono-8bit text-sm text-white flex items-start gap-3">
                      <span className="text-amber-400 font-bold flex-shrink-0 mt-1">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
