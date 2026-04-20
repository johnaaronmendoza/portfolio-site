import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocation } from 'wouter';
import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import { useSmartPreload } from '@/hooks/useSmartPreload';
import { useTilt } from '@/hooks/useTilt';
import SectionHeading from './SectionHeading';

// ── Card images (shown in grid) ───────────────────────────────────────────
import silverLinkImg    from '@assets/silverlink_p19_img0.png';
import scsImg           from '@assets/scs_p65_img0.png';
import fireSafetyImg    from '@assets/firesafety_p29_img2.png';
import uwbImg           from '@assets/da_p40_img1.png';
import greenloopImg     from '@assets/greenloop_hero.jpg';
import uatImg           from '@assets/uat_dashboard.jpg';
import aiFinanceImg     from '@assets/aifinance_dashboard.jpg';

// ── Secondary images to preload on hover (detail-page screenshots) ─────────
import silverLink2      from '@assets/silverlink_p21_img0.png';
import silverLink3      from '@assets/silverlink_p22_img0.png';
import scs2             from '@assets/scs_p71_img1.png';
import scs3             from '@assets/scs_p72_img0.png';
import fireSafety2      from '@assets/firesafety_p29_img1.png';
import fireSafety3      from '@assets/firesafety_p29_img3.png';
import uwb2             from '@assets/da_p39_img2.png';
import uwb3             from '@assets/da_p35_img1.png';
import greenloop2       from '@assets/greenloop_tour.jpg';

const FILTER_TAGS = ['React', 'Python', 'Kotlin', 'Docker', 'TypeScript', 'gRPC', 'ML/AI'];

// ── Project data ──────────────────────────────────────────────────────────
type Project = {
  num: number;
  name: string;
  description: string;
  metric: string;
  year: string;
  image: string | null;
  tags: string[];
  link: string;
  externalUrl?: string;
  preloadImages: string[];
};

const PROJECTS: Project[] = [
  {
    num: 1,
    name: "SilverLink SG",
    description:
      "4 gRPC microservices behind a React 19 shell. WebRTC livestreams for live events; Kubernetes HPA scales on predicted event load, not reactive CPU.",
    metric: "8-NODE CLUSTER · 4 SERVICES · WEBRTC",
    year: "2025",
    image: silverLinkImg,
    tags: ["React", "gRPC", "K8s", "PostgreSQL"],
    link: "/projects/silverlink",
    preloadImages: [silverLink2, silverLink3],
  },
  {
    num: 2,
    name: "SCS Awareness Platform",
    description:
      "Branching visual-novel engine built for tablet outreach booths. Multilingual (EN/CN/Malay/Tamil), gamified leaderboard, and a no-code admin panel for SCS staff.",
    metric: "4 LANGUAGES · 4 QUESTION TYPES · SUPABASE RLS",
    year: "2025",
    image: scsImg,
    tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
    link: "/projects/scs",
    preloadImages: [scs2, scs3],
  },
  {
    num: 3,
    name: "Fire Safety Drill Companion",
    description:
      "ARCore nav + TFLite ML + sensor-fusion PDR — fully offline. Dijkstra pathfinding with dynamic hazard re-routing across a weighted floor-plan graph.",
    metric: "10,984 LOC KOTLIN · ~80% TEST COVERAGE · SUS 79/100",
    year: "2024",
    image: fireSafetyImg,
    tags: ["Kotlin", "ARCore", "TFLite", "Jetpack Compose"],
    link: "/projects/firesafety",
    preloadImages: [fireSafety2, fireSafety3],
  },
  {
    num: 4,
    name: "UWB Indoor Localization",
    description:
      "SVM-RBF classifier on 42k UWB samples across 7 indoor environments. PCA on 1,016 CIR dimensions; dual-path range regression for NLOS compensation.",
    metric: "89.61% ACCURACY · 0.9612 AUC · 41,996 SAMPLES",
    year: "2024",
    image: uwbImg,
    tags: ["Python", "SVM", "PCA", "scikit-learn"],
    link: "/projects/uwb",
    preloadImages: [uwb2, uwb3],
  },
  {
    num: 5,
    name: "UAT Testing Dashboard",
    description:
      "Full-stack defect tracker for a Hospital Appointment System. Test cases link directly to open defects; severity breakdown charts update in real time.",
    metric: "4 ROLES · CSV EXPORT · RECHARTS ANALYTICS",
    year: "2024",
    image: uatImg,
    tags: ["React 18", "Node.js", "Express", "SQLite"],
    link: "/projects/uat",
    preloadImages: [],
  },
  {
    num: 6,
    name: "AI Finance Insights Engine",
    description:
      "Automated ETL ingesting Brent crude, FX, S&P 500, and geopolitical news. NLP engine classifies 9 sectors, scores sentiment, flags supply chain risks.",
    metric: "5 DATA SOURCES · STAR SCHEMA · 100% PYTEST COVERAGE",
    year: "2024",
    image: aiFinanceImg,
    tags: ["Python", "Pandas", "ETL", "NLP", "Power BI"],
    link: "/projects/ai-finance",
    preloadImages: [],
  },
  {
    num: 7,
    name: "GreenLoopFarms",
    description:
      "Contributed to the founding idea for a Singapore hydroponic urban farm. Helped prepare the pitch deck that secured a competitive NYP grant.",
    metric: "SGD $10K JUMPSTART GRANT · FURA · NIE · NUS",
    year: "2022",
    image: greenloopImg,
    tags: ["NYP JumpStart", "Urban Farming"],
    link: "external",
    externalUrl: "https://greenloopfarms.com/",
    preloadImages: [greenloop2],
  },
];

function matchesFilter(p: Project, filter: string | null): boolean {
  if (filter === null) return true;
  return p.tags.some(t =>
    t.toLowerCase().includes(filter.toLowerCase()) ||
    filter.toLowerCase().includes(t.toLowerCase()) ||
    (filter === 'ML/AI' && (
      t.toLowerCase().includes('python') ||
      t.toLowerCase().includes('nlp') ||
      t.toLowerCase().includes('svm') ||
      t.toLowerCase().includes('tflite')
    ))
  );
}

// ── ProjectCard — own component so hooks are called once per card ─────────
function ProjectCard({
  project,
  idx,
  isInView,
}: {
  project: Project;
  idx: number;
  isInView: boolean;
}) {
  const [, setLocation] = useLocation();
  const isComingSoon = project.link === '#';
  const isExternal   = project.link === 'external';

  // Smart preload: on 300 ms hover intent, fetch detail-page screenshots.
  const { handlers: preloadHandlers } = useSmartPreload(project.preloadImages);
  // 3D tilt on hover
  const { ref: tiltRef, handlers: tiltHandlers } = useTilt(5);

  const handleClick = () => {
    if (isComingSoon) return;
    if (isExternal && project.externalUrl) {
      window.open(project.externalUrl, '_blank', 'noopener noreferrer');
    } else {
      setLocation(project.link);
    }
  };

  return (
    <motion.div
      ref={tiltRef}
      className={`group ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileTap={isComingSoon ? {} : { scale: 0.97, transition: { duration: 0.1 } }}
      {...preloadHandlers}
      {...(isComingSoon ? {} : tiltHandlers)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden border-4 border-amber-400 group-hover:border-blue-400 shadow-8bit mb-5 h-44 sm:h-48 bg-zinc-900 transition-all duration-200 group-hover:[box-shadow:8px_8px_0px_0px_#F59E0B] group-hover:-translate-y-1">
        {/* Pixel corner accents — animate in on card hover */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-400 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pointer-events-none" />

        {project.image ? (
          <PixelatedImage
            src={project.image}
            alt={project.name}
            className={`w-full h-full transition-all duration-500 ${
              isComingSoon
                ? 'opacity-50 grayscale'
                : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
            }`}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(245,158,11,0.06) 18px,rgba(245,158,11,0.06) 19px),' +
                'repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(245,158,11,0.06) 18px,rgba(245,158,11,0.06) 19px)',
            }}
          />
        )}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <span className="font-pixel text-[10px] text-amber-400 border border-amber-400 bg-black px-2 py-1">
              COMING SOON
            </span>
          </div>
        )}
        {isExternal && (
          <div className="absolute top-2 right-2">
            <span className="font-pixel text-[10px] text-blue-400 border border-blue-400 bg-black px-2 py-1">
              ↗ LIVE
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        {/* Index + year */}
        <div className="font-mono text-[11px] text-zinc-600 group-hover:text-amber-400 transition-colors duration-150 tracking-widest select-none">
          {String(project.num).padStart(2, '0')} · {project.year}
        </div>
        <h3 className="font-mono font-bold text-base sm:text-lg text-blue-400 leading-snug">
          {project.name}
        </h3>
        <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>
        {/* M03 — metric row slides up on hover */}
        <p className="font-mono text-[10px] text-amber-400 tracking-wider transition-all duration-200 opacity-50 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
          ■ {project.metric}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="bg-[#353535] px-2 py-0.5 font-mono text-[10px] text-amber-400 border border-amber-500/20">
              --{tag.replace(/\s+/g, '_')}
            </span>
          ))}
        </div>
        {!isComingSoon && (
          <div className="font-mono-8bit text-xs text-amber-400 font-bold inline-flex items-center gap-1 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-150">
            {isExternal ? 'VISIT SITE ↗' : 'VIEW WORK →'}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Projects section ──────────────────────────────────────────────────────
export default function Projects() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visible = PROJECTS.filter(p => matchesFilter(p, activeFilter));

  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading index="03" text="PROJECTS" className="mb-8" />

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter(null)}
              className={`font-pixel text-[10px] px-3 py-1.5 border-2 transition-colors ${
                activeFilter === null
                  ? 'border-amber-400 text-black bg-amber-400'
                  : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              ALL
            </button>
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(prev => prev === tag ? null : tag)}
                className={`font-pixel text-[10px] px-3 py-1.5 border-2 transition-colors ${
                  activeFilter === tag
                    ? 'border-blue-400 text-black bg-blue-400'
                    : 'border-zinc-700 text-zinc-500 hover:border-blue-400 hover:text-blue-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {visible.map((project, idx) => (
                <ProjectCard
                  key={project.num}
                  project={project}
                  idx={idx}
                  isInView={isInView}
                />
              ))}
            </AnimatePresence>

            {/* Empty state */}
            {activeFilter !== null && visible.length === 0 && (
              <motion.div
                className="col-span-full border-2 border-zinc-800 bg-zinc-900 p-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="font-pixel text-xs text-zinc-600">NO_PROJECTS_MATCH [ {activeFilter} ]</p>
                <button
                  onClick={() => setActiveFilter(null)}
                  className="font-mono-8bit text-xs text-amber-400 mt-4 hover:text-white transition-colors"
                >
                  CLEAR FILTER →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
