import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocation } from 'wouter';
import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import { useSmartPreload } from '@/hooks/useSmartPreload';

// ── Card images (shown in grid) ───────────────────────────────────────────
import silverLinkImg    from '@assets/silverlink_p19_img0.png';
import scsImg           from '@assets/scs_p65_img0.png';
import fireSafetyImg    from '@assets/firesafety_p29_img2.png';
import uwbImg           from '@assets/da_p40_img1.png';

// ── Secondary images to preload on hover (detail-page screenshots) ─────────
import silverLink2      from '@assets/silverlink_p21_img0.png';
import silverLink3      from '@assets/silverlink_p22_img0.png';
import scs2             from '@assets/scs_p71_img1.png';
import scs3             from '@assets/scs_p72_img0.png';
import fireSafety2      from '@assets/firesafety_p29_img1.png';
import fireSafety3      from '@assets/firesafety_p29_img3.png';
import uwb2             from '@assets/da_p39_img2.png';
import uwb3             from '@assets/da_p35_img1.png';

const FILTER_TAGS = ['React', 'Python', 'Kotlin', 'Docker', 'TypeScript', 'gRPC', 'ML/AI'];

// ── Project data ──────────────────────────────────────────────────────────
type Project = {
  num: number;
  name: string;
  description: string;
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
      "Cloud-native platform connecting seniors and youth through skill-sharing, micro-volunteering, and live events. 4 gRPC microservices, WebRTC livestreaming, predictive autoscaling.",
    image: silverLinkImg,
    tags: ["React", "gRPC", "Docker", "Kubernetes", "PostgreSQL"],
    link: "/projects/silverlink",
    preloadImages: [silverLink2, silverLink3],
  },
  {
    num: 2,
    name: "SCS Awareness Platform",
    description:
      "Interactive visual novel engine for cancer-awareness outreach booths. Multilingual branching stories, gamification leaderboard, and a no-code admin panel for SCS staff.",
    image: scsImg,
    tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
    link: "/projects/scs",
    preloadImages: [scs2, scs3],
  },
  {
    num: 3,
    name: "Fire Safety Drill Companion",
    description:
      "Native Android app for HDB fire evacuation training. AR-guided navigation, on-device TFLite ML, sensor-fusion PDR, Dijkstra pathfinding — fully offline. 10,984 lines of Kotlin.",
    image: fireSafetyImg,
    tags: ["Kotlin", "Jetpack Compose", "ARCore", "TFLite", "MVVM"],
    link: "/projects/firesafety",
    preloadImages: [fireSafety2, fireSafety3],
  },
  {
    num: 4,
    name: "UWB Indoor Localization",
    description:
      "ML pipeline classifying LOS/NLOS UWB signal paths using SVM-RBF (89.61% accuracy, 0.9612 AUC) across 41,996 samples from 7 indoor environments. Dual-path range regression.",
    image: uwbImg,
    tags: ["Python", "SVM", "PCA", "scikit-learn", "Data Analytics"],
    link: "/projects/uwb",
    preloadImages: [uwb2, uwb3],
  },
  {
    num: 5,
    name: "UAT Testing Dashboard",
    description:
      "Full-stack defect tracker and UAT management tool for a Hospital Appointment System. Real-time severity charts, test case to defect linking, CSV export, and role-based access for PM, QA Lead, Tester, and Developer.",
    image: null,
    tags: ["React 18", "Node.js", "Express", "SQLite", "Recharts"],
    link: "/projects/uat",
    preloadImages: [],
  },
  {
    num: 6,
    name: "AI Finance Insights Engine",
    description:
      "Automated ETL pipeline ingesting Brent crude, USD/SGD FX, logistics stocks, and geopolitical news. AI NLP engine classifies 9 sectors, scores sentiment, and flags supply chain risks. Power BI ready Star Schema output.",
    image: null,
    tags: ["Python", "Pandas", "SQLite", "ETL", "NLP", "Power BI"],
    link: "/projects/ai-finance",
    preloadImages: [],
  },
  {
    num: 7,
    name: "GreenLoopFarms",
    description:
      "Singapore hydroponic urban farm growing pesticide-free vegetables and microgreens. Contributed to the initial idea. Won SGD $10,000 NYP JumpStart Grant. Partners: FURA (World's 50 Best), NIE, NUS.",
    image: null,
    tags: ["NYP JumpStart", "SGD $10k Grant", "Urban Farming"],
    link: "external",
    externalUrl: "https://greenloopfarms.com/",
    preloadImages: [],
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
      className={`group ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileHover={isComingSoon ? {} : { y: -6, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
      whileTap={isComingSoon ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
      {...preloadHandlers}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden border-4 border-amber-400 shadow-8bit mb-5 h-44 sm:h-48 bg-zinc-900">
        {project.image ? (
          // PixelatedImage: starts pixelated, reveals crisp on scroll-into-view.
          // Re-pixelates on hover via PixelationManager singleton (offscreen canvas).
          <PixelatedImage
            src={project.image}
            alt={project.name}
            className={`w-full h-full ${isComingSoon ? 'opacity-50 grayscale' : ''}`}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 relative overflow-hidden"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(245,158,11,0.06) 18px,rgba(245,158,11,0.06) 19px),' +
                'repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(245,158,11,0.06) 18px,rgba(245,158,11,0.06) 19px)',
            }}
          >
            {project.name === "UAT Testing Dashboard" && (
              <>
                <span className="text-4xl">🧪</span>
                <span className="font-pixel text-[10px] text-amber-400 text-center leading-relaxed">UAT<br />DASHBOARD</span>
                <div className="flex gap-1 mt-1">
                  {([['bg-red-500', 3], ['bg-orange-400', 5], ['bg-yellow-400', 4], ['bg-blue-400', 2]] as [string, number][]).map(([col, w], i) => (
                    <div key={i} className={`h-1.5 rounded-none ${col} opacity-70`} style={{ width: `${w * 5}px` }} />
                  ))}
                </div>
              </>
            )}
            {project.name === "AI Finance Insights Engine" && (
              <>
                <div className="flex items-end gap-1 h-8">
                  {[4, 7, 5, 9, 6, 8, 5].map((h, i) => (
                    <div key={i} className={`w-2 ${i % 2 === 0 ? 'bg-amber-400' : 'bg-blue-400'} opacity-70`} style={{ height: `${h * 4}px` }} />
                  ))}
                </div>
                <span className="font-pixel text-[10px] text-amber-400 text-center leading-relaxed">AI_FINANCE<br />INSIGHTS</span>
              </>
            )}
            {project.name === "GreenLoopFarms" && (
              <>
                <span className="text-4xl">🌱</span>
                <span className="font-pixel text-[10px] text-amber-400 text-center leading-relaxed">GREENLOOP<br />FARMS</span>
                <span className="font-pixel text-[8px] text-blue-400 opacity-70">SGD $10K GRANT</span>
              </>
            )}
          </div>
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
        {/* Binary index — reflects original position regardless of filter */}
        <div className="font-pixel text-[9px] text-zinc-600 tracking-widest select-none">
          {project.num.toString(2).padStart(8, '0')}
        </div>
        <h3 className="font-pixel text-sm sm:text-base text-blue-400 leading-relaxed">
          {project.name}
        </h3>
        <p className="font-mono-8bit text-xs sm:text-sm text-gray-300 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] text-blue-400 border border-blue-400 px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
        {!isComingSoon && (
          <motion.div
            className="font-mono-8bit text-xs text-amber-400 font-bold hover:text-white transition-colors inline-flex items-center gap-1"
            whileHover={{ x: 4 }}
          >
            {isExternal ? 'VISIT SITE ↗' : 'VIEW WORK →'}
          </motion.div>
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
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-8">
            PROJECTS
          </h2>

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
