import FramerReveal from './FramerReveal';
import SectionHeading from './SectionHeading';
import SkillKeyboard from './SkillKeyboard';
import { GROUP_NAME, GROUP_WAY, WAYS, type GroupId } from './skills3d/keys';

const LIST_ID = 'skills-list';

// The plain list uses the keyboard's groups, so filters, key windows and this
// list share one set of names. No self-rated percentages: the evidence line
// does that job more credibly.
const GROUPS: { id: GroupId; skills: string[]; usedIn: string }[] = [
  {
    id: 'ai',
    skills: ['Prompt engineering', 'Retrieval-augmented generation (RAG)', 'LLM-assisted workflows', 'AI guardrails & data-leakage prevention', 'Human-in-the-loop design'],
    usedIn: 'Desk Assist at LGA Telecom',
  },
  {
    id: 'data',
    skills: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'SQL', 'ETL pipelines', 'Power BI', 'TFLite'],
    usedIn: 'UWB Indoor Localization, AI Finance Insights Engine, Fire Safety Drill Companion',
  },
  {
    id: 'frontend',
    skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Kotlin', 'Jetpack Compose', 'ARCore'],
    usedIn: 'SCS Awareness Platform, SilverLink SG, Fire Safety Drill Companion',
  },
  {
    id: 'backend',
    skills: ['Node.js', 'Express', 'gRPC', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
    usedIn: 'SilverLink SG, SCS Awareness Platform',
  },
  {
    id: 'infra',
    skills: ['Docker', 'Kubernetes', 'Git'],
    usedIn: 'SilverLink SG, every project',
  },
  {
    id: 'workflow',
    skills: ['Agile / Scrum', 'User acceptance testing', 'Requirements gathering', 'Process documentation', 'Freshservice', 'JIRA', 'Confluence'],
    usedIn: 'LGA Telecom, Sembcorp Solar, every team project',
  },
];

// What the keycap colours mean, in words (colour is never the only cue)
const LEGEND: { way: keyof typeof WAYS; label: string }[] = [
  { way: 'orange', label: 'AI' },
  { way: 'teal', label: 'Data' },
  { way: 'cream', label: 'Frontend, Backend, Infrastructure' },
  { way: 'violet', label: 'Workflow' },
];

/** A keycap colour sample; the cream rim keeps violet visible on navy */
function Swatch({ way }: { way: keyof typeof WAYS }) {
  return <span aria-hidden="true" className="inline-block size-3.5 shrink-0 border-2 border-[color:var(--cream)]" style={{ backgroundColor: WAYS[way].face }} />;
}

export default function Skills() {
  return (
    <FramerReveal>
      <section className="text-[color:var(--cream)] px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          <SectionHeading text="SKILLS" icon="icon-skills" className="mb-12" />

          <p className="font-mono text-[15px] sm:text-base leading-relaxed max-w-[60ch]">
            Press or hover a key for details. Key colours:
          </p>
          <ul className="mt-2 mb-8 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[15px] sm:text-base leading-relaxed">
            {LEGEND.map(({ way, label }) => (
              <li key={way} className="flex items-center gap-2">
                <Swatch way={way} />
                <span><span className="capitalize">{way}</span>: {label}</span>
              </li>
            ))}
          </ul>

          <SkillKeyboard listId={LIST_ID} />

          {/* Plain list: for skimmers, screen readers and search engines. Collapsed,
              since the keyboard's tooltips and detail windows already say this. */}
          <details id={LIST_ID} className="mt-14 border-t-[3px] border-[color:var(--teal)] pt-4">
            <summary className="cursor-pointer py-2.5 leading-6 font-mono text-[15px] sm:text-base font-bold text-[color:var(--teal)]">
              All skills as a list
            </summary>
            <dl className="mt-4 space-y-4">
              {GROUPS.map(group => (
                <div key={group.id} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6">
                  <dt className={`flex items-center gap-2 self-start font-mono text-[15px] sm:text-base font-bold ${group.id === 'ai' ? 'text-[color:var(--orange)]' : 'text-[color:var(--teal)]'}`}>
                    <Swatch way={GROUP_WAY[group.id]} />
                    {GROUP_NAME[group.id]}
                  </dt>
                  <dd className="font-mono text-[15px] sm:text-base leading-relaxed">
                    {group.skills.join(', ')}
                    <span className="block text-sm text-[color:var(--orange)] mt-1">Used in: {group.usedIn}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </section>
    </FramerReveal>
  );
}
