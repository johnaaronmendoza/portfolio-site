import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode, type Ref } from 'react';
import { Link } from 'wouter';
import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import PixelArt from './PixelArt';
import { Lead, SpotPlate } from './Hierarchy';
import { useSmartPreload } from '@/hooks/useSmartPreload';
import { motionTokens } from '@/lib/motion-tokens';
import SectionHeading from './SectionHeading';
import Window from './Window';
import { PROJECTS, type Project } from '@/data/projects';

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

// ── ProjectTile — own component so hooks are called once per card ─────────
// Wide outline offset leaves a cream gap outside the tile's border and shadow
const CARD_LINK_CLASS = 'flex h-full flex-col outline-offset-[10px]';

interface ProjectTileProps {
  project: Project;
  ref?: Ref<HTMLDivElement>;
  /** Grid span; defaults to the project's Home span */
  span?: string;
  /** Image box height; defaults to the Home sizes (featured taller) */
  imageHeight?: string;
}

// `ref` is a plain prop in React 19; AnimatePresence popLayout needs it on the
// motion element to measure the exiting tile. Also used by the case-study
// "Next project" band.
export function ProjectTile({ project, ref, span = project.span, imageHeight }: ProjectTileProps) {
  const isComingSoon = project.link === '#';
  const isExternal   = project.link === 'external';

  // Smart preload: on 300 ms hover intent, fetch detail-page screenshots.
  const { handlers: preloadHandlers } = useSmartPreload(project.preloadImages);

  const body = (
    <>
      {/* Project image on top, framed by the tile border and a 3px rule */}
      <div className={`relative overflow-hidden border-b-[3px] border-black bg-[var(--navy)] ${imageHeight ?? (project.featured ? 'h-56 lg:h-72' : 'h-48')}`}>
        {/* alt="" because the tile's link already names the project */}
        {project.image ? (
          <PixelatedImage
            src={project.image}
            alt=""
            className={`w-full h-full transition-[filter,scale] duration-200 ${
              isComingSoon
                ? 'opacity-50 grayscale'
                : '[@media(hover:hover)]:group-hover:scale-[1.03]'
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
        {/* Spot sticker straddles the image rule (half of its 102px plate above
            it, minus the 20px body padding); it covers only the screenshot.
            The title gets its own full-width row so long words never break. */}
        <div className="flex items-end justify-between gap-3">
          <div className="relative z-10 -mt-[72px]">
            <SpotPlate spot={project.spot} />
          </div>
          <span className="flex-shrink-0 border-2 border-black bg-[var(--orange)] px-2 py-1 font-pixel text-xs text-black">
            {project.year}
          </span>
        </div>
        <h3 className={`font-pixel leading-snug break-words min-w-0 text-[color:var(--navy)] ${project.featured ? 'text-lg lg:text-2xl' : 'text-[15px]'}`}>
          {project.name}
        </h3>
        <p className="font-mono text-[15px] sm:text-base leading-relaxed">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[15px] font-bold text-black">
          {project.facts.map(fact => (
            <li key={fact} className="flex items-start gap-2">
              <PixelArt name="bullet" size={16} lazy className="line-mark" />
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
      ref={ref}
      className={`group border-[3px] border-black bg-[var(--cream)] shadow-[4px_4px_0_0_var(--ink)] transition-[translate,box-shadow] duration-150 ease-[var(--ease-out)] ${
        isComingSoon ? '' : 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none'
      } ${span}`}
      exit={{ opacity: 0, y: motionTokens.distance.sm, transition: { duration: motionTokens.duration.fast } }}
    >
      {card}
    </motion.div>
  );
}

// Retro filter chip: cream with an ink frame; the active chip turns orange and
// sits pressed into its shadow.
/** Filter chip style, shared with the Skills keyboard filters */
export function chipClass(active: boolean) {
  return `font-pixel text-xs text-black px-3 py-1.5 min-h-[44px] border-[3px] border-black transition-[translate,box-shadow,background-color] duration-150 ${
    active
      ? 'bg-[var(--orange)] translate-x-[3px] translate-y-[3px] shadow-none'
      : 'bg-[var(--cream)] hover:bg-[var(--teal)] shadow-[3px_3px_0_0_var(--ink)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
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
          <SectionHeading text="PROJECTS" tone="ink" icon="icon-projects" className="mb-4 lg:mb-5" />
          <Lead text="Start with **SilverLink SG** and the SCS Awareness Platform." tone="teal" className="mb-6 lg:mb-8" />

          <Window title="projects/" bodyClassName="p-4 sm:p-6 lg:p-8">
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
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map(project => (
                  <ProjectTile key={project.num} project={project} />
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
