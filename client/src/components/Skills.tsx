import FramerReveal from './FramerReveal';
import SectionHeading from './SectionHeading';

// Skills are grouped by what they're used for, each tied to where they were used.
// No self-rated percentages: the evidence line does that job more credibly.
type Group = {
  label: string;
  skills: string[];
  usedIn: string;
  highlight?: boolean;
};

const GROUPS: Group[] = [
  {
    label: 'AI & LLMs',
    skills: ['Prompt engineering', 'Retrieval-augmented generation (RAG)', 'LLM-assisted workflows', 'AI guardrails & data-leakage prevention', 'Human-in-the-loop design'],
    usedIn: 'Desk Assist at LGA Telecom',
    highlight: true,
  },
  {
    label: 'Data & ML',
    skills: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'SQL', 'ETL pipelines', 'Power BI', 'TFLite'],
    usedIn: 'UWB Indoor Localization, AI Finance Insights Engine, Fire Safety Drill Companion',
  },
  {
    label: 'Backend & Cloud',
    skills: ['Node.js', 'Express', 'gRPC', 'PostgreSQL', 'Supabase', 'Prisma ORM', 'Docker', 'Kubernetes', 'Git'],
    usedIn: 'SilverLink SG, SCS Awareness Platform',
  },
  {
    label: 'Frontend & Mobile',
    skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Kotlin', 'Jetpack Compose', 'ARCore'],
    usedIn: 'SCS Awareness Platform, SilverLink SG, Fire Safety Drill Companion',
  },
  {
    label: 'Ways of working',
    skills: ['Agile / Scrum', 'User acceptance testing', 'Requirements gathering', 'Process documentation', 'Freshservice', 'JIRA', 'Confluence'],
    usedIn: 'LGA Telecom, Sembcorp Solar, every team project',
  },
];

export default function Skills() {
  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading index="04" text="SKILLS" className="mb-12" />

          <div className="border-t border-zinc-800">
            {GROUPS.map(group => (
              <div
                key={group.label}
                className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-3 md:gap-8 py-6 border-b border-zinc-800"
              >
                <h3 className={`font-pixel text-[11px] leading-relaxed ${group.highlight ? 'text-amber-400' : 'text-blue-400'}`}>
                  {group.label}
                </h3>
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <li
                        key={skill}
                        className={`font-mono text-sm px-2.5 py-1 border ${
                          group.highlight
                            ? 'border-amber-400/60 text-amber-100 bg-amber-400/5'
                            : 'border-zinc-700 text-zinc-200 bg-zinc-900'
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-xs text-zinc-500 mt-3">
                    Used in: {group.usedIn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
