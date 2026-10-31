import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import { useSmartPreload } from '@/hooks/useSmartPreload';
import { motionTokens } from '@/lib/motion-tokens';
import SectionHeading from './SectionHeading';
import Window from './Window';

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

const FILTER_TAGS = ['React', 'Python', 'Kotlin', 'K8s', 'TypeScript', 'gRPC', 'ML/AI'];

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
  /** Grid width in the tile grid (sm: 2 cols, lg: 6 cols) */
  span: string;
  /** Lead tile: taller image, bigger title, always in colour */
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    num: 1,
    name: "SilverLink SG",
    description:
      "Cloud-native platform bridging seniors and youth through skill-sharing and live events. 4 gRPC microservices, WebRTC livestreaming, and Kubernetes autoscaling, delivered across 7 Agile sprints with a 6-person team.",
    metric: "8-NODE CLUSTER · 4 SERVICES · WEBRTC",
    year: "2025",
    image: silverLinkImg,
    tags: ["React", "gRPC", "K8s", "PostgreSQL"],
    link: "/projects/silverlink",
    span: 'lg:col-span-3',
    preloadImages: [silverLink2, silverLink3],
    featured: true,
  },
  {
    num: 2,
    name: "SCS Awareness Platform",
    description:
      "Branching visual-novel engine deployed at real Singapore Cancer Society outreach booths. Multilingual (EN/CN/Malay/Tamil), gamified leaderboard, and a no-code admin panel built for non-technical SCS staff.",
    metric: "4 LANGUAGES · 4 QUESTION TYPES · SUPABASE RLS",
    year: "2025",
    image: scsImg,
    tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
    link: "/projects/scs",
    span: 'lg:col-span-3',
    preloadImages: [scs2, scs3],
    featured: true,
  },
  {
    num: 3,
    name: "AI Finance Insights Engine",
    description:
      "Automated ETL ingesting Brent crude, FX, S&P 500, and geopolitical news into a star schema. NLP classifies 9 sectors, scores sentiment, and flags supply chain risks. Output: a Power BI executive dashboard.",
    metric: "5 DATA SOURCES · STAR SCHEMA · 100% PYTEST COVERAGE",
    year: "2024",
    image: aiFinanceImg,
    tags: ["Python", "Pandas", "ETL", "NLP", "Power BI"],
    link: "/projects/ai-finance",
    span: 'lg:col-span-2',
    preloadImages: [],
  },
  {
    num: 4,
    name: "UWB Indoor Localization",
    description:
      "SVM-RBF classifier on 42k UWB samples across 7 indoor environments. PCA on 1,016 CIR dimensions; dual-path range regression compensates for NLOS signal loss.",
    metric: "89.61% ACCURACY · 0.9612 AUC · 41,996 SAMPLES",
    year: "2025",
    image: uwbImg,
    tags: ["Python", "SVM", "PCA", "scikit-learn"],
    link: "/projects/uwb",
    span: 'lg:col-span-2',
    preloadImages: [uwb2, uwb3],
  },
  {
    num: 5,
    name: "UAT Testing Dashboard",
    description:
      "Full-stack defect tracker built for a real hospital appointment system UAT cycle. Test cases link directly to open defects; severity triage charts helped manage 30+ issues across 4 user roles, from tester to project lead.",
    metric: "4 ROLES · CSV EXPORT · RECHARTS ANALYTICS",
    year: "2024",
    image: uatImg,
    tags: ["React 18", "Node.js", "Express", "SQLite"],
    link: "/projects/uat",
    span: 'lg:col-span-2',
    preloadImages: [],
  },
  {
    num: 6,
    name: "Fire Safety Drill Companion",
    description:
      "Offline-first Android AR evacuation guide. ARCore navigation, TFLite on-device ML, and Dijkstra pathfinding with live hazard re-routing, independently usable with no network connection.",
    metric: "SUS 79/100 · ~80% TEST COVERAGE · FULLY OFFLINE",
    year: "2025",
    image: fireSafetyImg,
    tags: ["Kotlin", "ARCore", "TFLite", "Jetpack Compose"],
    link: "/projects/firesafety",
    span: 'lg:col-span-3',
    preloadImages: [fireSafety2, fireSafety3],
  },
  {
    num: 7,
    name: "GreenLoopFarms",
    description:
      "Contributed to the founding idea and digital presence of a Singapore hydroponic urban farm. Helped prepare the pitch deck that secured a competitive NYP grant.",
    metric: "SGD $10K JUMPSTART GRANT · FURA · NIE · NUS",
    year: "2022",
    image: greenloopImg,
    tags: ["NYP JumpStart", "Urban Farming"],
    link: "external",
    span: 'sm:col-span-2 lg:col-span-3',
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
// Wide outline offset leaves a cream gap outside the tile's border and shadow
const CARD_LINK_CLASS = 'flex h-full flex-col outline-offset-[10px]';

function ProjectCard({ project }: { project: Project }) {
  const isComingSoon = project.link === '#';
  const isExternal   = project.link === 'external';

  // Smart preload: on 300 ms hover intent, fetch detail-page screenshots.
  const { handlers: preloadHandlers } = useSmartPreload(project.preloadImages);

  const body = (
    <>
      {/* Project image on top, framed by the tile border and a 3px rule */}
      <div className={`relative overflow-hidden border-b-[3px] border-black bg-[var(--navy)] ${project.featured ? 'h-56 lg:h-72' : 'h-48'}`}>
        {project.image ? (
          <PixelatedImage
            src={project.image}
            alt={project.name}
            className={`w-full h-full transition-[filter,scale] duration-500 ${
              isComingSoon
                ? 'opacity-50 grayscale'
                : project.featured
                  ? '[@media(hover:hover)]:group-hover:scale-105'
                  : '[@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="w-full h-full" />
        )}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <span className="font-pixel text-xs text-black border-2 border-black bg-[var(--cream)] px-2 py-1">
              COMING SOON
            </span>
          </div>
        )}
        {isExternal && (
          <div className="absolute top-2 right-2">
            <span className="font-pixel text-xs text-black border-2 border-black bg-[var(--teal)] px-2 py-1">
              ↗ LIVE
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <h3 className={`font-pixel leading-snug break-words min-w-0 text-[color:var(--navy)] ${project.featured ? 'text-lg lg:text-2xl' : 'text-[15px]'}`}>
            {project.name}
          </h3>
          <span className="flex-shrink-0 border-2 border-black bg-[var(--orange)] px-2 py-1 font-pixel text-xs text-black">
            {project.year}
          </span>
        </div>
        <p className="font-mono text-[15px] sm:text-base leading-relaxed">
          {project.description}
        </p>
        <p className="font-mono text-[15px] font-bold text-black tracking-wider">
          ■ {project.metric}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="border-2 border-black px-2 py-0.5 font-mono text-xs">
              {tag}
            </span>
          ))}
        </div>
        {!isComingSoon && (
          <div className="mt-auto pt-2 font-mono-8bit text-[15px] text-black font-bold underline underline-offset-4 decoration-2 inline-flex items-center gap-1 translate-x-0 group-hover:translate-x-1.5 transition-[translate] duration-150">
            {isExternal ? 'Visit site ↗' : 'View work →'}
          </div>
        )}
      </div>
    </>
  );

  let card: ReactNode;
  if (isComingSoon) {
    card = <div className="flex h-full flex-col cursor-default">{body}</div>;
  } else if (isExternal && project.externalUrl) {
    card = (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={CARD_LINK_CLASS}
        aria-label={`${project.name}: visit site (opens in a new tab)`}
        {...preloadHandlers}
      >
        {body}
      </a>
    );
  } else {
    card = (
      <Link
        href={project.link}
        className={CARD_LINK_CLASS}
        aria-label={`${project.name}: view case study`}
        {...preloadHandlers}
      >
        {body}
      </Link>
    );
  }

  return (
    <motion.div
      className={`group border-[3px] border-black bg-[var(--cream)] shadow-[4px_4px_0_0_#000] ${project.span}`}
      exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: motionTokens.duration.fast } }}
      whileTap={isComingSoon ? {} : { scale: 0.97, transition: { duration: motionTokens.duration.instant } }}
    >
      {card}
    </motion.div>
  );
}

// Retro filter chip: cream with an ink frame; the active chip turns orange and
// sits pressed into its shadow.
function chipClass(active: boolean) {
  return `font-pixel text-xs text-black px-3 py-1.5 min-h-[44px] border-[3px] border-black transition-[translate,box-shadow,background-color] duration-150 ${
    active
      ? 'bg-[var(--orange)] translate-x-[3px] translate-y-[3px] shadow-none'
      : 'bg-[var(--cream)] shadow-[3px_3px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
  }`;
}

// ── Projects section ──────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visible = PROJECTS.filter(p => matchesFilter(p, activeFilter));

  return (
    <FramerReveal>
      {/* Full-width teal band; all text on it is black or sits on cream */}
      <section className="bg-[var(--teal)] text-black border-y-[3px] border-black px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading text="PROJECTS" tone="ink" className="mb-12" />

          <Window title="featured_projects" bodyClassName="p-4 sm:p-6 lg:p-8">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              <button
                onClick={() => setActiveFilter(null)}
                aria-pressed={activeFilter === null}
                className={chipClass(activeFilter === null)}
              >
                ALL
              </button>
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(prev => prev === tag ? null : tag)}
                  aria-pressed={activeFilter === tag}
                  className={chipClass(activeFilter === tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Tile grid: rows of 3+3, 2+2+2, 3+3 on large screens; GreenLoop
                spans both columns at sm so the 7th tile is never orphaned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              <AnimatePresence initial={false}>
                {visible.map(project => (
                  <ProjectCard key={project.num} project={project} />
                ))}
              </AnimatePresence>

              {/* Empty state */}
              {activeFilter !== null && visible.length === 0 && (
                <motion.div
                  className="col-span-full border-[3px] border-black p-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-pixel text-xs">NO_PROJECTS_MATCH [ {activeFilter} ]</p>
                  <button
                    onClick={() => setActiveFilter(null)}
                    className="btn btn-primary mt-4"
                  >
                    CLEAR FILTER →
                  </button>
                </motion.div>
              )}
            </div>
          </Window>
        </div>
      </section>
    </FramerReveal>
  );
}
