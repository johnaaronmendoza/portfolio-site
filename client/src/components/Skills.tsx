import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FramerReveal from './FramerReveal';
import ScrambleText from './ScrambleText';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ── Types ─────────────────────────────────────────────────────────────────
type Skill = {
  name: string;
  abbr: string;
  icon: string;
  color: string;
  /** 0–100 familiarity */
  level: number;
};

type Category = {
  label: string;
  accent: 'amber' | 'blue';
  skills: Skill[];
};

// ── Label helper ──────────────────────────────────────────────────────────
function levelLabel(n: number): string {
  if (n >= 85) return 'EXPERT';
  if (n >= 70) return 'PROFICIENT';
  if (n >= 50) return 'FAMILIAR';
  return 'LEARNING';
}

function levelColor(n: number): string {
  if (n >= 85) return 'text-amber-400';
  if (n >= 70) return 'text-blue-400';
  if (n >= 50) return 'text-zinc-400';
  return 'text-zinc-600';
}

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';

// ── Skill data ────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    label: 'LANGUAGES',
    accent: 'amber',
    skills: [
      { name: 'TypeScript', abbr: 'TS', icon: 'typescript/typescript-original',  color: '#3178C6', level: 88 },
      { name: 'JavaScript', abbr: 'JS', icon: 'javascript/javascript-original',  color: '#F7DF1E', level: 85 },
      { name: 'Python',     abbr: 'PY', icon: 'python/python-original',          color: '#3776AB', level: 80 },
      { name: 'Kotlin',     abbr: 'KT', icon: 'kotlin/kotlin-original',          color: '#7F52FF', level: 78 },
      { name: 'Java',       abbr: 'JV', icon: 'java/java-original',             color: '#F89820', level: 72 },
      { name: 'SQL',        abbr: 'SQ', icon: 'mysql/mysql-original',            color: '#00618A', level: 65 },
      { name: 'C++',        abbr: 'C+', icon: 'cplusplus/cplusplus-original',    color: '#00599C', level: 50 },
    ],
  },
  {
    label: 'FRONTEND',
    accent: 'blue',
    skills: [
      { name: 'React',           abbr: 'RE', icon: 'react/react-original',                   color: '#61DAFB', level: 90 },
      { name: 'Tailwind CSS',    abbr: 'TW', icon: 'tailwindcss/tailwindcss-plain',          color: '#06B6D4', level: 85 },
      { name: 'Framer Motion',   abbr: 'FM', icon: '',                                       color: '#BB22FF', level: 78 },
      { name: 'Jetpack Compose', abbr: 'JC', icon: 'jetpackcompose/jetpackcompose-original', color: '#4285F4', level: 75 },
      { name: 'Next.js',         abbr: 'NX', icon: 'nextjs/nextjs-original',                 color: '#FFFFFF', level: 60 },
    ],
  },
  {
    label: 'BACKEND',
    accent: 'amber',
    skills: [
      { name: 'Node.js',    abbr: 'NO', icon: 'nodejs/nodejs-original',         color: '#339933', level: 78 },
      { name: 'Express',    abbr: 'EX', icon: 'express/express-original',       color: '#999999', level: 75 },
      { name: 'gRPC',       abbr: 'GP', icon: '',                               color: '#244C5A', level: 68 },
      { name: 'PostgreSQL', abbr: 'PG', icon: 'postgresql/postgresql-original', color: '#4169E1', level: 65 },
      { name: 'Supabase',   abbr: 'SB', icon: 'supabase/supabase-original',     color: '#3ECF8E', level: 62 },
      { name: 'MongoDB',    abbr: 'MG', icon: 'mongodb/mongodb-original',       color: '#47A248', level: 55 },
      { name: 'Prisma ORM', abbr: 'PR', icon: '',                               color: '#5A67D8', level: 52 },
    ],
  },
  {
    label: 'DEVOPS & CLOUD',
    accent: 'blue',
    skills: [
      { name: 'Git',        abbr: 'GT', icon: 'git/git-original',                            color: '#F05032', level: 88 },
      { name: 'Docker',     abbr: 'DK', icon: 'docker/docker-original',                      color: '#2496ED', level: 75 },
      { name: 'Kubernetes', abbr: 'K8', icon: 'kubernetes/kubernetes-plain',                  color: '#326CE5', level: 62 },
      { name: 'Firebase',   abbr: 'FB', icon: 'firebase/firebase-plain',                      color: '#FFCA28', level: 58 },
      { name: 'AWS',        abbr: 'AW', icon: 'amazonwebservices/amazonwebservices-original', color: '#FF9900', level: 52 },
    ],
  },
  {
    label: 'DATA & ML',
    accent: 'amber',
    skills: [
      { name: 'Pandas',       abbr: 'PD', icon: 'pandas/pandas-original',          color: '#150458', level: 78 },
      { name: 'scikit-learn', abbr: 'SK', icon: '',                                color: '#F7931E', level: 72 },
      { name: 'NumPy',        abbr: 'NP', icon: 'numpy/numpy-original',            color: '#013243', level: 68 },
      { name: 'TFLite',       abbr: 'TF', icon: 'tensorflow/tensorflow-original',  color: '#FF6F00', level: 62 },
      { name: 'ARCore',       abbr: 'AR', icon: '',                                color: '#4285F4', level: 60 },
      { name: 'Power BI',     abbr: 'BI', icon: '',                                color: '#F2C811', level: 55 },
    ],
  },
  {
    label: 'TOOLS',
    accent: 'blue',
    skills: [
      { name: 'JIRA',        abbr: 'JR', icon: 'jira/jira-original',             color: '#0052CC', level: 80 },
      { name: 'Agile/Scrum', abbr: 'AG', icon: '',                               color: '#F59E0B', level: 78 },
      { name: 'Confluence',  abbr: 'CF', icon: 'confluence/confluence-original', color: '#172B4D', level: 62 },
    ],
  },
];

// ── Pixel progress bar ────────────────────────────────────────────────────
const TOTAL_BLOCKS = 10;

function PixelBar({
  level,
  accent,
  animate,
}: {
  level: number;
  accent: 'amber' | 'blue';
  animate: boolean;
}) {
  const reduced = useReducedMotion();
  const filled = Math.round((level / 100) * TOTAL_BLOCKS);
  const fillColor = accent === 'amber' ? 'bg-amber-400' : 'bg-blue-400';

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1.5 w-3 ${i < filled ? fillColor : 'bg-zinc-800'}`}
          initial={{ opacity: reduced || !animate ? 1 : 0, scaleX: reduced || !animate ? 1 : 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 0.15,
            delay: animate && !reduced ? i * 0.04 : 0,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: 'left' }}
        />
      ))}
    </div>
  );
}

// ── Skill row ─────────────────────────────────────────────────────────────
function SkillRow({
  skill,
  accent,
  delay,
  inView,
}: {
  skill: Skill;
  accent: 'amber' | 'blue';
  delay: number;
  inView: boolean;
}) {
  const hoverText  = accent === 'amber' ? 'group-hover:text-amber-400' : 'group-hover:text-blue-400';
  const label      = levelLabel(skill.level);
  const labelColor = levelColor(skill.level);

  return (
    <motion.div
      className="group flex items-center gap-3 py-2 px-3 border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 transition-colors duration-150 cursor-default"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Icon */}
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        {skill.icon ? (
          <img
            src={`${DEVICON}/${skill.icon}.svg`}
            alt={skill.name}
            width={20}
            height={20}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const sib = e.currentTarget.nextElementSibling as HTMLElement;
              if (sib) sib.style.display = 'flex';
            }}
          />
        ) : null}
        <span
          className="font-pixel text-[7px] font-bold w-5 h-5 border items-center justify-center flex-shrink-0"
          style={{
            display: skill.icon ? 'none' : 'flex',
            color: skill.color,
            borderColor: skill.color,
          }}
        >
          {skill.abbr}
        </span>
      </div>

      {/* Name */}
      <span className={`font-mono-8bit text-[10px] text-zinc-400 ${hoverText} transition-colors duration-150 w-28 flex-shrink-0 truncate`}>
        {skill.name}
      </span>

      {/* Pixel bar */}
      <div className="flex-1 hidden sm:block">
        <PixelBar level={skill.level} accent={accent} animate={inView} />
      </div>

      {/* Level badge */}
      <span className={`font-pixel text-[8px] ${labelColor} flex-shrink-0 w-20 text-right`}>
        {label}
      </span>

      {/* Percentage */}
      <span className="font-mono text-[9px] text-zinc-700 group-hover:text-zinc-500 transition-colors duration-150 flex-shrink-0 w-8 text-right">
        {skill.level}%
      </span>
    </motion.div>
  );
}

// ── Category block ────────────────────────────────────────────────────────
function CategoryBlock({ cat, baseDelay }: { cat: Category; baseDelay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const headerColor  = cat.accent === 'amber' ? 'text-amber-400' : 'text-blue-400';
  const dividerColor = cat.accent === 'amber' ? 'bg-amber-400' : 'bg-blue-400';

  return (
    <div ref={ref}>
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: baseDelay }}
      >
        <div className={`w-2 h-2 ${dividerColor}`} />
        <span className={`font-pixel text-[10px] ${headerColor} tracking-widest`}>{cat.label}</span>
        <div className={`flex-1 h-px ${dividerColor} opacity-20`} />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {cat.skills.map((skill, i) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            accent={cat.accent}
            delay={baseDelay + i * 0.045}
            inView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <FramerReveal>
      <section id="skills" className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-4 glitch" data-text="SKILLS">
            <ScrambleText text="SKILLS" onView onHover delay={80} frames={18} />
          </h2>

          {/* Legend */}
          <div className="flex items-center gap-6 mb-10 flex-wrap">
            {[
              { label: 'EXPERT',     color: 'text-amber-400', min: '85%+' },
              { label: 'PROFICIENT', color: 'text-blue-400',  min: '70%+' },
              { label: 'FAMILIAR',   color: 'text-zinc-400',  min: '50%+' },
              { label: 'LEARNING',   color: 'text-zinc-600',  min: '<50%' },
            ].map(({ label, color, min }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`font-pixel text-[8px] ${color}`}>{label}</span>
                <span className="font-mono text-[8px] text-zinc-700">{min}</span>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {CATEGORIES.map((cat, ci) => (
              <CategoryBlock key={cat.label} cat={cat} baseDelay={ci * 0.04} />
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
