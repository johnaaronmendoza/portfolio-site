import FramerReveal from './FramerReveal';
import SectionHeading from './SectionHeading';
import SkillKeyboard from './SkillKeyboard';

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
      <section className="text-[color:var(--cream)] px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading text="SKILLS" icon="icon-skills" className="mb-12" />

          <div className="font-mono text-[15px] sm:text-base leading-relaxed mb-8 max-w-[60ch] space-y-2">
            <p>What I use and where I used it. The AI keys are amber.</p>
            <p>Press or hover a key to see what it does. The full list is below the keyboard.</p>
          </div>

          <SkillKeyboard />

          {/* Plain list: for skimmers, screen readers and search engines */}
          <dl className="mt-14 border-t-[3px] border-[color:var(--teal)] pt-6 space-y-3">
            {GROUPS.map(group => (
              <div key={group.label} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6">
                <dt className={`font-mono text-[15px] sm:text-base font-bold ${group.highlight ? 'text-[color:var(--orange)]' : 'text-[color:var(--teal)]'}`}>
                  {group.label}
                </dt>
                <dd className="font-mono text-[15px] sm:text-base leading-relaxed">
                  {group.skills.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </FramerReveal>
  );
}
