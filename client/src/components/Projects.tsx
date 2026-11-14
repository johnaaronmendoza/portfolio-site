import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode, type Ref } from 'react';
import { Link } from 'wouter';
import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import PixelArt from './PixelArt';
import { Lead } from './Hierarchy';
import Burst from './comic/Burst';
import { useSmartPreload } from '@/hooks/useSmartPreload';
import { noteProjectOpen } from '@/hooks/useAchievements';
import { motionTokens } from '@/lib/motion-tokens';
import SectionHeading from './SectionHeading';
import Window from './Window';
import { PROJECTS, type Project } from '@/data/projects';

// Display label and the key matched against project tags (kept separate so a
// friendlier label doesn't change which projects match)
const FILTERS: { label: string; match: string }[] = [
  { label: 'AI', match: 'ML/AI' }, // same name as the Skills filter
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
// Wide outline offset leaves a gap outside the tile's border and shadow
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
      <div className={`relative overflow-hidden border-b-[3px] border-black bg-[var(--page)] ${imageHeight ?? (project.featured ? 'h-56 lg:h-72' : 'h-48')}`}>
        {/* alt="" because the tile's link already names the project */}
        {project.image ? (
          <PixelatedImage
            src={project.image}
            alt=""
            className={`w-full h-full transition-[filter,scale] duration-200 ${
              isComingSoon
                ? 'opacity-50 grayscale'
                // Every tile in colour: greyscale made the non-featured
                // projects (AI Finance, UWB, UAT) look disabled
                : '[@media(hover:hover)]:group-hover:scale-[1.03]'
            }`}
          />
        ) : (
          <div className="w-full h-full" />
        )}
        {isComingSoon && (
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <span className="badge badge--paper">COMING SOON</span>
          </div>
        )}
        {project.featured && (
          <span className="badge badge--ink absolute top-2 left-2">Featured</span>
        )}
        {isExternal && (
          <span className="badge badge--data absolute top-2 right-2">Live site</span>
        )}
        {/* Comic sound effect, decorative (the description says the same) */}
        {project.sfx && (
          <Burst
            fill="var(--paper)"
            rotate={project.num % 2 ? 8 : -8}
            className="absolute bottom-2 right-2 size-28 lg:size-32 pointer-events-none text-black"
          >
            <span aria-hidden="true" className="block px-3 text-[22px] lg:text-[26px]">{project.sfx}</span>
          </Burst>
        )}
      </div>

      {/* Project Info */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Year and team context, from projects.ts */}
        <p className="font-label text-sm text-[color:var(--text)] -mb-2">
          {project.year}<span aria-hidden="true"> · </span><span className="sr-only">, </span>{project.caption}
        </p>
        <h3 className={`font-display break-words min-w-0 text-[color:var(--text)] ${project.featured ? 'text-2xl lg:text-[32px]' : 'text-[22px]'}`}>
          {project.name}
        </h3>
        <p className="font-sans text-[15px] sm:text-base leading-relaxed">
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
          <div className="mt-auto pt-2 font-sans text-[15px] text-black font-bold underline underline-offset-4 decoration-2">
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
        onClick={() => { if (project.slug) noteProjectOpen(project.slug); }}
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
      className={`group border-[3px] border-black bg-[var(--paper)] shadow-[4px_4px_0_0_var(--ink)] transition-[translate,box-shadow] duration-150 ease-[var(--ease-out)] ${
        isComingSoon ? '' : 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none'
      } ${span}`}
      exit={{ opacity: 0, y: motionTokens.distance.sm, transition: { duration: motionTokens.duration.fast } }}
    >
      {card}
    </motion.div>
  );
}

// Retro filter chip: paper with an ink frame; the active chip turns ink with
// paper text and sits pressed into its shadow (state also in aria-pressed).
/** Filter chip style, shared with the Skills keyboard filters */
export function chipClass(active: boolean) {
  return `font-label text-xs px-3 py-1.5 min-h-[44px] border-[3px] border-black transition-[translate,box-shadow,background-color,color] duration-150 ${
    active
      ? 'bg-[var(--bar)] text-[color:var(--paper)] translate-x-[3px] translate-y-[3px] shadow-none'
      : 'bg-[var(--paper)] text-black hover:bg-[var(--blue)] shadow-[3px_3px_0_0_var(--ink)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none'
  }`;
}

// ── Projects section ──────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // a filter label

  const active = FILTERS.find(f => f.label === activeFilter) ?? null;
  const visible = PROJECTS.filter(p => matchesFilter(p, active?.match ?? null));
  // Visible status; a live region, so a change is announced but the first render is not
  const status = `Showing ${visible.length} of ${PROJECTS.length} projects${active ? `: ${active.label}` : ''}`;

  return (
    <FramerReveal>
      {/* Full-width blue band; all text on it is black or sits on paper */}
      <section className="bg-[var(--blue)] text-black border-y-[3px] border-black px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHeading text="PROJECTS" tone="ink" icon="icon-projects" className="mb-4 lg:mb-5" />
          <Lead text="Start with **SilverLink SG**, the SCS Awareness Platform and UWB Indoor Localization." tone="blue" className="mb-6 lg:mb-8" />

          <Window title="projects/" bodyClassName="p-4 sm:p-6 lg:p-8">
            {/* Filter chips */}
            <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                aria-pressed={activeFilter === null}
                className={chipClass(activeFilter === null)}
              >
                All
              </button>
              {FILTERS.map(({ label }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => setActiveFilter(activeFilter === label ? null : label)}
                  aria-pressed={activeFilter === label}
                  className={chipClass(activeFilter === label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="mt-4 mb-6 sm:mb-8 font-label text-sm text-black tabular-nums">{status}</p>

            {/* Tile grid: the three featured tiles in one row from lg, then the
                rest two to a row (lg) or four (xl); UWB spans both columns at sm
                so the 2-column grid has no orphan */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-6">
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
                  <p className="font-sans text-[15px] sm:text-base">No projects match {active.label}.</p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter(null)}
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
