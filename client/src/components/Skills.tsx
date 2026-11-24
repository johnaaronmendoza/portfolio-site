import FramerReveal from './FramerReveal';
import Section from './Section';
import SectionHeading from './SectionHeading';
import SkillKeyboard from './SkillKeyboard';
import Window from './Window';
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
const LEGEND: { way: keyof typeof WAYS; colour: string; label: string }[] = [
  { way: 'yellow', colour: 'Yellow', label: 'AI' },
  { way: 'blue', colour: 'Blue', label: 'Data' },
  { way: 'paper', colour: 'White', label: 'Frontend, Backend, Infrastructure' },
  { way: 'ink', colour: 'Black', label: 'Workflow' },
];

/** A keycap colour sample; the ink rim keeps the white swatch visible on the page */
function Swatch({ way }: { way: keyof typeof WAYS }) {
  return <span aria-hidden="true" className="inline-block size-3.5 shrink-0 border-2 border-black" style={{ backgroundColor: WAYS[way].face }} />;
}

export default function Skills() {
  return (
    <FramerReveal>
      <Section className="text-[color:var(--text)]">
        <SectionHeading text="SKILLS" icon="icon-skills" className="mb-10" />

        {/* keyboard.exe: the board in a window like every other section, with
            the plain list in its status bar (John, 17 Nov) */}
        <Window title="keyboard.exe" bodyClassName="p-0">
          <div className="p-4 sm:p-6 lg:p-8">
            <p className="mb-6 font-sans text-body-sm sm:text-body leading-relaxed max-w-[60ch]">
              Press a key for details.
            </p>

            {/* The colour legend sits right under the filters it explains */}
            <SkillKeyboard
              listId={LIST_ID}
              legend={
                <ul aria-label="Key colours" className="relative z-10 flex flex-wrap gap-x-5 gap-y-1 font-sans text-body-sm sm:text-body leading-relaxed">
                  {LEGEND.map(({ way, colour, label }) => (
                    <li key={way} className="flex items-center gap-2">
                      <Swatch way={way} />
                      <span>{colour}: {label}</span>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>

          {/* Status bar: the plain list, for skimmers, screen readers and search
              engines. Collapsed, since the keyboard's tooltips and detail
              windows already say this; it opens inside the window. */}
          <details id={LIST_ID} className="border-t-[3px] border-black bg-[var(--page)]">
            <summary className="cursor-pointer px-4 sm:px-6 lg:px-8 py-2.5 leading-6 font-sans text-body-sm sm:text-body font-bold text-[color:var(--blue-text)] outline-offset-[-4px]">
              All skills as a list
            </summary>
            <dl className="space-y-4 border-t-[3px] border-black bg-[var(--paper)] px-4 sm:px-6 lg:px-8 py-6">
              {GROUPS.map(group => (
                <div key={group.id} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6">
                  <dt className={`flex items-center gap-2 self-start font-sans text-body-sm sm:text-body font-bold ${group.id === 'ai' ? 'text-[color:var(--text)]' : 'text-[color:var(--blue-text)]'}`}>
                    <Swatch way={GROUP_WAY[group.id]} />
                    {GROUP_NAME[group.id]}
                  </dt>
                  <dd className="font-sans text-body-sm sm:text-body leading-relaxed">
                    {group.skills.join(', ')}
                    <span className="block text-sm text-[color:var(--text)] mt-1">Used in: {group.usedIn}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </Window>
      </Section>
    </FramerReveal>
  );
}
