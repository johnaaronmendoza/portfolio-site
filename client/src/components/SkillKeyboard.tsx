import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { play } from '@/hooks/useSound';
import { motionTokens } from '@/lib/motion-tokens';

type GroupId = 'ai' | 'data' | 'backend' | 'frontend' | 'ways';

type Key = {
  label: string;   // fallback text on the keycap (6 chars max)
  name: string;    // full skill name shown beside the board
  group: GroupId;
  blurb: string;   // what it is / how I use it
  usedIn: string;  // where it was used
};

const GROUP_NAME: Record<GroupId, string> = {
  ai: 'AI & LLMs',
  data: 'Data & ML',
  backend: 'Backend & Cloud',
  frontend: 'Frontend & Mobile',
  ways: 'Ways of working',
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';

// Keycap colour + logo. Brand colours where a brand exists; AI keys stay amber,
// the site's own colour, because they're the story this portfolio leads with.
const CAP: Record<string, { color: string; icon?: string; dark?: boolean }> = {
  PROMPT: { color: '#F59E0B', dark: true },
  RAG:    { color: '#F59E0B', dark: true },
  LLM:    { color: '#F59E0B', dark: true },
  GUARD:  { color: '#F59E0B', dark: true },
  HUMAN:  { color: '#F59E0B', dark: true },
  PYTHON: { color: '#3776AB', icon: 'python/python-plain' },
  PANDAS: { color: '#2A1F7A', icon: 'pandas/pandas-plain' },
  SKLRN:  { color: '#F7931E', icon: 'scikitlearn/scikitlearn-plain' },
  NUMPY:  { color: '#4DABCF', icon: 'numpy/numpy-plain' },
  SQL:    { color: '#0078D4', icon: 'azuresqldatabase/azuresqldatabase-plain' },
  ETL:    { color: '#0EA5E9' },
  BI:     { color: '#F2C811', dark: true },
  NODE:   { color: '#3C873A', icon: 'nodejs/nodejs-plain' },
  GRPC:   { color: '#2DA6B0', icon: 'grpc/grpc-plain' },
  PGSQL:  { color: '#336791', icon: 'postgresql/postgresql-plain' },
  SUPA:   { color: '#2FB67C', icon: 'supabase/supabase-plain' },
  DOCKER: { color: '#2496ED', icon: 'docker/docker-plain' },
  KUBE:   { color: '#326CE5', icon: 'kubernetes/kubernetes-plain' },
  GIT:    { color: '#F05032', icon: 'git/git-plain' },
  TS:     { color: '#3178C6', icon: 'typescript/typescript-plain' },
  REACT:  { color: '#149ECA', icon: 'react/react-original' },
  NEXT:   { color: '#27272A', icon: 'nextjs/nextjs-plain' },
  TWIND:  { color: '#06B6D4', icon: 'tailwindcss/tailwindcss-original' },
  KOTLIN: { color: '#7F52FF', icon: 'kotlin/kotlin-plain' },
  ARCORE: { color: '#34A853' },
  AGILE:  { color: '#52525B' },
  UAT:    { color: '#E11D48' },
  REQS:   { color: '#6D28D9' },
};

/** Mix a hex colour toward black (amt < 0) or white (amt > 0). */
function tint(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(c =>
    Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt),
  );
  return `rgb(${ch[0]}, ${ch[1]}, ${ch[2]})`;
}

const MASCOT = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png';

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
  { label: 'KUBE', name: 'Kubernetes', group: 'backend', blurb: 'Running services on an 8-node cluster that scales ahead of demand.', usedIn: 'SilverLink SG' },
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

function Keycap({ k, pressed, onPress, onPreview, delay, show, reduced }: {
  k: Key; pressed: boolean; onPress: () => void; onPreview: () => void;
  delay: number; show: boolean; reduced: boolean;
}) {
  const cap = CAP[k.label] ?? { color: '#52525B' };
  const [iconFailed, setIconFailed] = useState(false);
  const depth = pressed ? 3 : 9;
  const showIcon = cap.icon && !iconFailed;

  return (
    <motion.button
      type="button"
      onClick={onPress}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      aria-pressed={pressed}
      aria-label={k.name}
      initial={reduced ? false : { opacity: 0, y: -motionTokens.distance.md }}
      animate={show || reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth, delay: reduced ? 0 : delay }}
      className="relative aspect-square select-none rounded-[12px] focus-visible:outline-offset-4"
    >
      <span
        className="absolute inset-0 flex items-center justify-center rounded-[12px] transition-[transform,box-shadow] duration-100 ease-out"
        style={{
          background: `linear-gradient(150deg, ${tint(cap.color, 0.28)} 0%, ${cap.color} 45%, ${tint(cap.color, -0.12)} 100%)`,
          transform: `translateY(${pressed ? 6 : 0}px)`,
          boxShadow: [
            'inset 0 2px 0 rgba(255,255,255,0.35)',
            'inset 0 -3px 0 rgba(0,0,0,0.18)',
            `0 ${depth}px 0 ${tint(cap.color, -0.45)}`,
            `0 ${depth + 8}px 14px rgba(0,0,0,0.6)`,
          ].join(', '),
        }}
      >
        {showIcon ? (
          <img
            src={`${DEVICON}/${cap.icon}.svg`}
            alt=""
            draggable={false}
            onError={() => setIconFailed(true)}
            className="w-[46%] h-[46%] object-contain"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 1px 0 rgba(0,0,0,0.25))' }}
          />
        ) : (
          <span
            className="font-pixel text-[7px] sm:text-[8px] leading-none"
            style={{ color: cap.dark ? '#18181B' : '#FFFFFF' }}
          >
            {k.label}
          </span>
        )}
      </span>
    </motion.button>
  );
}

export default function SkillKeyboard() {
  const reduced = useReducedMotion();
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { once: true, amount: 0.25 });
  const [active, setActive] = useState(1); // start on RAG: the AI story first
  const [taps, setTaps] = useState(0);     // drives the mascot's hop
  const wrapRef = useRef<HTMLDivElement>(null);
  const [perch, setPerch] = useState<{ x: number; y: number } | null>(null);

  // The board is tilted in 3D, so measure where its top-right key actually lands
  // on screen and stand the mascot there. Re-measure on resize.
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const board = boardRef.current;
      if (!wrap || !board) return;
      const keys = board.querySelectorAll('button');
      const cols = window.matchMedia('(min-width: 640px)').matches ? COLS : 4;
      const corner = keys[cols - 1] as HTMLElement | undefined;
      if (!corner) return;
      const w = wrap.getBoundingClientRect();
      const k = corner.getBoundingClientRect();
      const size = window.matchMedia('(min-width: 1024px)').matches ? 80 : window.matchMedia('(min-width: 640px)').matches ? 64 : 56;
      setPerch({ x: k.left - w.left + k.width / 2 - size / 2, y: k.top - w.top - size * 0.85 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  // Keys slide into place on first view; re-measure once they've settled.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 900);
    return () => clearTimeout(t);
  }, [inView]);

  const current = KEYS[active];

  const press = (i: number) => {
    setActive(i);
    setTaps(t => t + 1);
    play('click');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr] gap-10 lg:gap-6 items-center">
      {/* Description: what the pressed key means */}
      <div className="min-h-[200px] lg:min-h-[260px] border-l-4 border-amber-400 pl-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, x: -motionTokens.distance.sm }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
          >
            <p className="font-mono text-xs text-zinc-500 mb-3">{GROUP_NAME[current.group]}</p>
            <h3 className="font-pixel text-lg sm:text-xl text-white leading-snug mb-4">{current.name}</h3>
            <p className="font-mono text-[15px] text-zinc-200 leading-relaxed">{current.blurb}</p>
            <p className="font-mono text-xs text-amber-400/80 mt-4">Used in: {current.usedIn}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyboard: isometric on large screens, gently tilted on phones.
          --rx/--rz drive the board tilt; the mascot applies the inverse so it
          stands upright on the board's corner at every breakpoint. */}
      <div ref={wrapRef} className="relative flex justify-center [perspective:1600px] pt-10 pb-4 lg:py-10">
        <div
          ref={boardRef}
          role="group"
          aria-label="Skills keyboard. Press a key to see what the skill is and where I used it."
          className="relative w-full max-w-[440px] lg:max-w-[560px] rounded-[22px] p-3 sm:p-4 [--rx:16deg] [--rz:0deg] lg:[--rx:42deg] lg:[--rz:-24deg]"
          style={{
            transform: 'rotateX(var(--rx)) rotateZ(var(--rz))',
            background: 'linear-gradient(160deg, #2a2a2e 0%, #141416 100%)',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.08), 0 14px 0 #0a0a0b, 0 30px 50px rgba(0,0,0,0.7)',
          }}
        >
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3 pb-2">
            {KEYS.map((k, i) => (
              <Keycap
                key={k.label}
                k={k}
                pressed={i === active}
                onPress={() => press(i)}
                onPreview={() => setActive(i)}
                delay={(Math.floor(i / COLS) + (i % COLS)) * motionTokens.stagger.keycap}
                show={inView}
                reduced={reduced}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
