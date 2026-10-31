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

// Display label and the key matched against project tags (kept separate so a
// friendlier label doesn't change which projects match)
const FILTERS: { label: string; match: string }[] = [
  { label: 'AI & ML', match: 'ML/AI' },
  { label: 'Python', match: 'Python' },
  { label: 'React', match: 'React' },
  { label: 'TypeScript', match: 'TypeScript' },
  { label: 'Kubernetes', match: 'K8s' },
  { label: 'gRPC', match: 'gRPC' },
  { label: 'Kotlin', match: 'Kotlin' },
];

// ── Project data ──────────────────────────────────────────────────────────
type Project = {
  num: number;
  name: string;
  description: string;
  /** Short facts shown as a list under the description */
  facts: string[];
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
      "Connects seniors and youth through skill-sharing and live events, and is built to block double-bookings under concurrent traffic. A 6-person team shipped it in 7 Agile sprints: 4 gRPC microservices, WebRTC livestreaming and autoscaling on Kubernetes.",
    facts: ["8-node cluster", "4 services", "6-person team"],
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
      "Teaches cancer awareness through a branching visual novel, used on tablets at Singapore Cancer Society outreach booths in English, Chinese, Malay and Tamil. A no-code admin panel lets SCS staff edit stories and export analytics without a developer.",
    facts: ["4 languages", "4 question types", "4-person team"],
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
      "Turns five market data sources into a Power BI dashboard, using NLP to score headline sentiment and flag supply-chain risk across 9 sectors. An automated ETL pipeline feeds a star schema, with 100% Pytest coverage on extraction and transformation.",
    facts: ["5 data sources", "star schema", "100% Pytest coverage"],
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
      "Tells clear UWB signals from blocked (NLOS) ones with 89.61% accuracy and 0.9612 ROC-AUC, using an SVM-RBF model on 41,996 samples from 7 indoor environments. PCA compresses 1,016 signal dimensions, and a regression model estimates range on both signal paths.",
    facts: ["89.61% accuracy", "0.9612 AUC", "41,996 samples"],
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
      "Shows a UAT team what's blocking go-live by linking every failed test case to its defect. A course project built around a hospital appointment system UAT scenario: 25 issues across 8 modules and 4 user roles, with severity charts and CSV export.",
    facts: ["25 issues", "8 modules", "4 roles"],
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
      "Guides residents out of a building in augmented reality, with no network connection needed. A Kotlin Android app with ARCore navigation, on-device TFLite, and Dijkstra routing that re-plans around hazards.",
    facts: ["SUS 79/100", "~80% test coverage", "fully offline"],
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
      "Helped shape the idea for a Singapore hydroponic urban farm and prepare the pitch that won a SGD 10,000 NYP JumpStart Grant. We pitched it to an industry investor panel.",
    facts: ["SGD 10,000 NYP JumpStart Grant"],
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
        {/* alt="" because the tile's link already names the project */}
        {project.image ? (
          <PixelatedImage
            src={project.image}
            alt=""
            className={`w-full h-full transition-[filter,scale] duration-200 ${
              isComingSoon
                ? 'opacity-50 grayscale'
                : project.featured
                  ? '[@media(hover:hover)]:group-hover:scale-[1.03]'
                  : '[@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-[1.03]'
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
        {project.featured && (
          <span className="absolute top-2 left-2 font-pixel text-xs text-black border-2 border-black bg-[var(--orange)] px-2 py-1">
            Featured
          </span>
        )}
        {isExternal && (
          <span className="absolute top-2 right-2 font-pixel text-xs text-black border-2 border-black bg-[var(--teal)] px-2 py-1">
            Live site
          </span>
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
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[15px] font-bold text-black">
          {project.facts.map(fact => (
            <li key={fact} className="flex items-center gap-2">
              <span aria-hidden="true" className="w-2.5 h-2.5 flex-shrink-0 bg-black" />
              {fact}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="border-2 border-black px-2 py-0.5 font-mono text-sm font-bold text-black">
              {tag}
            </span>
          ))}
        </div>
        {!isComingSoon && (
          <div className="mt-auto pt-2 font-mono-8bit text-[15px] text-black font-bold underline underline-offset-4 decoration-2">
            {isExternal ? 'Visit site' : 'Read case study'}
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
    // Press sinks the tile into its shadow (translate, not scale); hover lifts it
    // on pointers that can hover (Tailwind v4 gates hover: on that media query)
    <motion.div
      className={`group border-[3px] border-black bg-[var(--cream)] shadow-[4px_4px_0_0_#000] transition-[translate,box-shadow] duration-150 ease-[var(--ease-out)] ${
        isComingSoon ? '' : 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none'
      } ${project.span}`}
      exit={{ opacity: 0, y: 12, transition: { duration: motionTokens.duration.fast } }}
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
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // a filter label
  const [touched, setTouched] = useState(false); // announce results only after a change

  const active = FILTERS.find(f => f.label === activeFilter) ?? null;
  const visible = PROJECTS.filter(p => matchesFilter(p, active?.match ?? null));
  const count = `${visible.length} project${visible.length === 1 ? '' : 's'}`;
  const status = active
    ? `${count} ${visible.length === 1 ? 'matches' : 'match'} ${active.label}`
    : `Showing all ${count}`;

  const choose = (label: string | null) => {
    setActiveFilter(label);
    setTouched(true);
  };

  return (
    <FramerReveal>
      {/* Full-width teal band; all text on it is black or sits on cream */}
      <section className="bg-[var(--teal)] text-black border-y-[3px] border-black px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading text="PROJECTS" tone="ink" icon="icon-projects" className="mb-12" />

          <Window title="projects/" bodyClassName="p-4 sm:p-6 lg:p-8">
            <p className="font-mono text-[15px] sm:text-base leading-relaxed max-w-[65ch] mb-6">
              Six projects I've built, plus one pitch. Start with SilverLink SG and the SCS Awareness Platform.
            </p>

            {/* Filter chips */}
            <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              <button
                type="button"
                onClick={() => choose(null)}
                aria-pressed={activeFilter === null}
                className={chipClass(activeFilter === null)}
              >
                All
              </button>
              {FILTERS.map(({ label }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => choose(activeFilter === label ? null : label)}
                  aria-pressed={activeFilter === label}
                  className={chipClass(activeFilter === label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">{touched ? status : ''}</p>

            {/* Tile grid: rows of 3+3, 2+2+2, 3+3 on large screens; GreenLoop
                spans both columns at sm so the 7th tile is never orphaned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              <AnimatePresence initial={false}>
                {visible.map(project => (
                  <ProjectCard key={project.num} project={project} />
                ))}
              </AnimatePresence>

              {/* Empty state */}
              {active && visible.length === 0 && (
                <motion.div
                  className="col-span-full border-[3px] border-black p-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="font-mono text-[15px] sm:text-base">No projects match {active.label}.</p>
                  <button
                    type="button"
                    onClick={() => choose(null)}
                    className="btn btn-secondary mt-4"
                  >
                    Show all projects
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
