import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { play } from '@/hooks/useSound';
import { motionTokens } from '@/lib/motion-tokens';

type GroupId = 'ai' | 'data' | 'backend' | 'frontend' | 'ways';

type Key = {
  label: string;   // printed on the keycap (6 chars max)
  name: string;    // full skill name shown on the screen
  group: GroupId;
  blurb: string;   // what it is / how I use it
  usedIn: string;  // where it was used
};

// Keycap colours stay inside the site palette: amber, blue, light, dark.
const GROUP_STYLE: Record<GroupId, { name: string; top: string; text: string; side: string }> = {
  ai:       { name: 'AI & LLMs',         top: '#F59E0B', text: '#000000', side: '#92400E' },
  data:     { name: 'Data & ML',         top: '#3B82F6', text: '#FFFFFF', side: '#1E3A8A' },
  backend:  { name: 'Backend & Cloud',   top: '#E4E4E7', text: '#18181B', side: '#71717A' },
  frontend: { name: 'Frontend & Mobile', top: '#3F3F46', text: '#FAFAFA', side: '#18181B' },
  ways:     { name: 'Ways of working',   top: '#27272A', text: '#F59E0B', side: '#09090B' },
};

export const KEYS: Key[] = [
  // Row 1 — AI first: the story this portfolio leads with
  { label: 'PROMPT', name: 'Prompt engineering', group: 'ai', blurb: 'Designing prompts that turn a messy ticket thread into a clear, on-policy draft reply.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'RAG', name: 'Retrieval-augmented generation', group: 'ai', blurb: 'Grounding AI answers in the company knowledge base instead of letting the model guess.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'LLM', name: 'LLM-assisted workflows', group: 'ai', blurb: 'Fitting a language model into a real support workflow, alongside Freshservice.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'GUARD', name: 'AI guardrails', group: 'ai', blurb: 'Least-privilege access, no remote code, and keeping customer data inside company systems.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'HUMAN', name: 'Human-in-the-loop design', group: 'ai', blurb: 'The AI drafts, a person decides. Every customer reply is reviewed before it is sent.', usedIn: 'Desk Assist at LGA Telecom' },
  { label: 'PYTHON', name: 'Python', group: 'data', blurb: 'My main language for data work, from cleaning datasets to training models.', usedIn: 'UWB Indoor Localization, AI Finance Insights Engine' },
  { label: 'PANDAS', name: 'Pandas', group: 'data', blurb: 'Wrangling tens of thousands of rows into features a model can learn from.', usedIn: 'UWB Indoor Localization, AI Finance Insights Engine' },

  // Row 2
  { label: 'SKLRN', name: 'scikit-learn', group: 'data', blurb: 'Training and comparing models, including an SVM that reached 89.6% accuracy.', usedIn: 'UWB Indoor Localization' },
  { label: 'NUMPY', name: 'NumPy', group: 'data', blurb: 'Fast array maths behind feature engineering and PCA.', usedIn: 'UWB Indoor Localization' },
  { label: 'SQL', name: 'SQL', group: 'data', blurb: 'Querying and modelling data, including a star schema for reporting.', usedIn: 'AI Finance Insights Engine, SilverLink SG' },
  { label: 'ETL', name: 'ETL pipelines', group: 'data', blurb: 'Pulling five market data sources into one validated, fully tested pipeline.', usedIn: 'AI Finance Insights Engine' },
  { label: 'BI', name: 'Power BI', group: 'data', blurb: 'Turning a cleaned data warehouse into dashboards people can act on.', usedIn: 'AI Finance Insights Engine' },
  { label: 'NODE', name: 'Node.js', group: 'backend', blurb: 'Building the services and API gateway behind a live events platform.', usedIn: 'SilverLink SG' },
  { label: 'GRPC', name: 'gRPC', group: 'backend', blurb: 'Fast, typed communication between four microservices.', usedIn: 'SilverLink SG' },

  // Row 3
  { label: 'PGSQL', name: 'PostgreSQL', group: 'backend', blurb: 'Relational data with eight isolated schemas, one per service.', usedIn: 'SilverLink SG, SCS Awareness Platform' },
  { label: 'SUPA', name: 'Supabase', group: 'backend', blurb: 'Auth, storage and row-level security for a public-facing app.', usedIn: 'SCS Awareness Platform' },
  { label: 'DOCKER', name: 'Docker', group: 'backend', blurb: 'Packaging services so they run the same everywhere.', usedIn: 'SilverLink SG' },
  { label: 'K8S', name: 'Kubernetes', group: 'backend', blurb: 'Running services on an 8-node cluster that scales ahead of demand.', usedIn: 'SilverLink SG' },
  { label: 'GIT', name: 'Git', group: 'backend', blurb: 'Branching, reviews and clean history across every team project.', usedIn: 'Every project' },
  { label: 'TS', name: 'TypeScript', group: 'frontend', blurb: 'Typed front ends that catch mistakes before users do.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'REACT', name: 'React', group: 'frontend', blurb: 'Interactive interfaces, from a branching story engine to an admin panel.', usedIn: 'SCS Awareness Platform, SilverLink SG' },

  // Row 4
  { label: 'NEXT', name: 'Next.js', group: 'frontend', blurb: 'Server-rendered pages for a fast first load.', usedIn: 'SilverLink SG' },
  { label: 'TWIND', name: 'Tailwind CSS', group: 'frontend', blurb: 'Consistent, responsive styling without fighting the stylesheet.', usedIn: 'SCS Awareness Platform, this portfolio' },
  { label: 'KOTLIN', name: 'Kotlin', group: 'frontend', blurb: 'Native Android with Jetpack Compose and on-device ML.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'ARCORE', name: 'ARCore', group: 'frontend', blurb: 'Augmented-reality navigation that works fully offline.', usedIn: 'Fire Safety Drill Companion' },
  { label: 'AGILE', name: 'Agile / Scrum', group: 'ways', blurb: 'Seven-sprint team projects with planning, reviews and burndown charts.', usedIn: 'SilverLink SG, SCS Awareness Platform' },
  { label: 'UAT', name: 'User acceptance testing', group: 'ways', blurb: 'Testing with real users before go-live and tracking 50+ defects to resolution.', usedIn: 'Sembcorp Solar' },
  { label: 'REQS', name: 'Requirements gathering', group: 'ways', blurb: 'Turning what stakeholders say into changes a team can build.', usedIn: 'Sembcorp Solar, LGA Telecom' },
];

const COLS = 7;

export default function SkillKeyboard() {
  const reduced = useReducedMotion();
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { once: true, amount: 0.3 });
  const [active, setActive] = useState(1); // start on RAG: the AI story first

  const current = KEYS[active];
  const style = GROUP_STYLE[current.group];

  const select = (i: number, withSound: boolean) => {
    setActive(i);
    if (withSound) play('click');
  };

  return (
    <div className="space-y-6">
      {/* Screen: what the pressed key means */}
      <div
        className="border-8bit bg-black p-5 sm:p-6 min-h-[168px] shadow-[6px_6px_0px_0px_#F59E0B]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: motionTokens.distance.xs }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
          >
            <p className="font-mono text-xs mb-3" style={{ color: style.top === '#27272A' || style.top === '#3F3F46' ? '#A1A1AA' : style.top }}>
              {style.name}
            </p>
            <p className="font-pixel text-sm sm:text-base text-white leading-relaxed mb-3">
              <span className="text-amber-400" aria-hidden="true">{'> '}</span>
              {current.name}
            </p>
            <p className="font-mono text-sm text-zinc-200 leading-relaxed max-w-[62ch]">{current.blurb}</p>
            <p className="font-mono text-xs text-zinc-500 mt-3">Used in: {current.usedIn}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Board: one boot-up sweep when it first scrolls into view, then motion only answers presses */}
      <div className="lg:[perspective:1400px]">
        <div
          ref={boardRef}
          role="group"
          aria-label="Skills keyboard. Press a key to see what the skill is and where I used it."
          className="bg-zinc-900 border-4 border-zinc-700 p-3 sm:p-4 shadow-[8px_8px_0px_0px_#000] lg:[transform:rotateX(14deg)] origin-bottom"
        >
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-2.5">
            {KEYS.map((k, i) => {
              const g = GROUP_STYLE[k.group];
              const pressed = i === active;
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              return (
                <motion.button
                  key={k.label}
                  type="button"
                  onClick={() => select(i, true)}
                  onMouseEnter={() => select(i, false)}
                  onFocus={() => select(i, false)}
                  aria-pressed={pressed}
                  aria-label={k.name}
                  initial={reduced ? false : { opacity: 0, y: -motionTokens.distance.sm }}
                  animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: motionTokens.duration.fast,
                    ease: motionTokens.easing.smooth,
                    delay: reduced ? 0 : (row + col) * motionTokens.stagger.keycap,
                  }}
                  className="relative h-12 sm:h-14 select-none"
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center font-pixel text-[8px] sm:text-[9px] leading-none border-2 border-black transition-[transform,box-shadow] duration-100 ease-out"
                    style={{
                      background: g.top,
                      color: g.text,
                      transform: pressed ? 'translateY(4px)' : 'translateY(0)',
                      boxShadow: pressed ? `0 2px 0 0 ${g.side}` : `0 6px 0 0 ${g.side}`,
                    }}
                  >
                    {k.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend: colour key for the groups */}
      <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Key colours">
        {(Object.keys(GROUP_STYLE) as GroupId[]).map(id => (
          <li key={id} className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-3 h-3 border border-black" style={{ background: GROUP_STYLE[id].top }} aria-hidden="true" />
            {GROUP_STYLE[id].name}
          </li>
        ))}
      </ul>
    </div>
  );
}
