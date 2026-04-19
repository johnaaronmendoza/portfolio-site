import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FramerReveal from './FramerReveal';

// ── Skill definitions ─────────────────────────────────────────────────────
// icon: devicon slug (path under cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/)
//       empty string → render a 2-letter abbreviation badge instead
type Skill = {
  name: string;
  abbr: string;        // fallback abbreviation
  icon: string;        // devicon path fragment, or '' for abbr fallback
  color: string;       // brand color (used for icon tint + hover accent)
};

type Category = {
  label: string;
  accent: 'amber' | 'blue';
  skills: Skill[];
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';

const CATEGORIES: Category[] = [
  {
    label: 'LANGUAGES',
    accent: 'amber',
    skills: [
      { name: 'Java',       abbr: 'JV', icon: 'java/java-original',             color: '#F89820' },
      { name: 'Python',     abbr: 'PY', icon: 'python/python-original',          color: '#3776AB' },
      { name: 'TypeScript', abbr: 'TS', icon: 'typescript/typescript-original',  color: '#3178C6' },
      { name: 'JavaScript', abbr: 'JS', icon: 'javascript/javascript-original',  color: '#F7DF1E' },
      { name: 'Kotlin',     abbr: 'KT', icon: 'kotlin/kotlin-original',          color: '#7F52FF' },
      { name: 'SQL',        abbr: 'SQ', icon: 'mysql/mysql-original',            color: '#00618A' },
      { name: 'C++',        abbr: 'C+', icon: 'cplusplus/cplusplus-original',    color: '#00599C' },
    ],
  },
  {
    label: 'FRONTEND',
    accent: 'blue',
    skills: [
      { name: 'React',           abbr: 'RE', icon: 'react/react-original',              color: '#61DAFB' },
      { name: 'Next.js',         abbr: 'NX', icon: 'nextjs/nextjs-original',            color: '#FFFFFF' },
      { name: 'Tailwind CSS',    abbr: 'TW', icon: 'tailwindcss/tailwindcss-plain',     color: '#06B6D4' },
      { name: 'Framer Motion',   abbr: 'FM', icon: '',                                  color: '#BB22FF' },
      { name: 'Jetpack Compose', abbr: 'JC', icon: 'jetpackcompose/jetpackcompose-original', color: '#4285F4' },
    ],
  },
  {
    label: 'BACKEND',
    accent: 'amber',
    skills: [
      { name: 'Node.js',    abbr: 'NO', icon: 'nodejs/nodejs-original',          color: '#339933' },
      { name: 'Express',    abbr: 'EX', icon: 'express/express-original',        color: '#999999' },
      { name: 'gRPC',       abbr: 'GP', icon: '',                                color: '#244C5A' },
      { name: 'PostgreSQL', abbr: 'PG', icon: 'postgresql/postgresql-original',  color: '#4169E1' },
      { name: 'MongoDB',    abbr: 'MG', icon: 'mongodb/mongodb-original',        color: '#47A248' },
      { name: 'Supabase',   abbr: 'SB', icon: 'supabase/supabase-original',      color: '#3ECF8E' },
      { name: 'Prisma ORM', abbr: 'PR', icon: '',                                color: '#5A67D8' },
    ],
  },
  {
    label: 'DEVOPS & CLOUD',
    accent: 'blue',
    skills: [
      { name: 'Docker',      abbr: 'DK', icon: 'docker/docker-original',    color: '#2496ED' },
      { name: 'Kubernetes',  abbr: 'K8', icon: 'kubernetes/kubernetes-plain', color: '#326CE5' },
      { name: 'AWS',         abbr: 'AW', icon: 'amazonwebservices/amazonwebservices-original', color: '#FF9900' },
      { name: 'Firebase',    abbr: 'FB', icon: 'firebase/firebase-plain',    color: '#FFCA28' },
      { name: 'Git',         abbr: 'GT', icon: 'git/git-original',           color: '#F05032' },
    ],
  },
  {
    label: 'DATA & ML',
    accent: 'amber',
    skills: [
      { name: 'Pandas',      abbr: 'PD', icon: 'pandas/pandas-original',       color: '#150458' },
      { name: 'NumPy',       abbr: 'NP', icon: 'numpy/numpy-original',         color: '#013243' },
      { name: 'scikit-learn',abbr: 'SK', icon: '',                             color: '#F7931E' },
      { name: 'TFLite',      abbr: 'TF', icon: 'tensorflow/tensorflow-original', color: '#FF6F00' },
      { name: 'Power BI',    abbr: 'BI', icon: '',                             color: '#F2C811' },
      { name: 'ARCore',      abbr: 'AR', icon: '',                             color: '#4285F4' },
    ],
  },
  {
    label: 'TOOLS',
    accent: 'blue',
    skills: [
      { name: 'JIRA',        abbr: 'JR', icon: 'jira/jira-original',           color: '#0052CC' },
      { name: 'Confluence',  abbr: 'CF', icon: 'confluence/confluence-original', color: '#172B4D' },
      { name: 'Agile/Scrum', abbr: 'AG', icon: '',                             color: '#F59E0B' },
    ],
  },
];

// ── Individual skill card ─────────────────────────────────────────────────
function SkillCard({ skill, accent, delay }: { skill: Skill; accent: 'amber' | 'blue'; delay: number }) {
  const hoverBorder = accent === 'amber' ? 'hover:border-amber-400' : 'hover:border-blue-400';

  return (
    <motion.div
      className={`group relative flex flex-col items-center gap-2 p-3 border-2 border-zinc-800 bg-zinc-900 cursor-default ${hoverBorder} transition-colors duration-150`}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
    >
      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-amber-400 px-2 py-0.5 font-pixel text-[7px] text-amber-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 pointer-events-none">
        {skill.name}
      </div>

      {/* Icon — wobbles on hover */}
      <motion.div
        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.2, rotate: [0, -6, 6, 0], transition: { duration: 0.3 } }}
      >
        {skill.icon ? (
          <img
            src={`${DEVICON}/${skill.icon}.svg`}
            alt={skill.name}
            width={28}
            height={28}
            className="object-contain pixelated"
            style={{ imageRendering: 'pixelated' }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const sib = e.currentTarget.nextElementSibling as HTMLElement;
              if (sib) sib.style.display = 'flex';
            }}
          />
        ) : null}
        <span
          className="font-pixel text-[9px] font-bold w-7 h-7 border items-center justify-center flex-shrink-0"
          style={{
            display: skill.icon ? 'none' : 'flex',
            color: skill.color,
            borderColor: skill.color,
          }}
        >
          {skill.abbr}
        </span>
      </motion.div>

      {/* Skill name */}
      <span
        className={`font-mono-8bit text-[9px] text-center leading-tight text-zinc-500 transition-colors ${
          accent === 'amber' ? 'group-hover:text-amber-400' : 'group-hover:text-blue-400'
        }`}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── Category block ─────────────────────────────────────────────────────────
function CategoryBlock({ cat, baseDelay }: { cat: Category; baseDelay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const headerColor = cat.accent === 'amber' ? 'text-amber-400' : 'text-blue-400';
  const dividerColor = cat.accent === 'amber' ? 'bg-amber-400' : 'bg-blue-400';

  return (
    <div ref={ref}>
      {/* Category header */}
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: baseDelay }}
      >
        <div className={`w-2 h-2 ${dividerColor}`} />
        <span className={`font-pixel text-[10px] ${headerColor} tracking-widest`}>{cat.label}</span>
        <div className={`flex-1 h-px ${dividerColor} opacity-20`} />
      </motion.div>

      {/* Skill grid */}
      {isInView && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {cat.skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              accent={cat.accent}
              delay={baseDelay + i * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <FramerReveal>
      <section id="skills" className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-14 glitch" data-text="SKILLS">
            SKILLS
          </h2>

          <div className="space-y-10">
            {CATEGORIES.map((cat, ci) => (
              <CategoryBlock key={cat.label} cat={cat} baseDelay={ci * 0.05} />
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
