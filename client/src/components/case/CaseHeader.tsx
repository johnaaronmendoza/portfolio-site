import { FactChips, Lead, type Fact } from '@/components/Hierarchy';
import { PixelGitHub } from '@/components/PixelIcons';
import StatStrip, { type Stat } from '@/components/StatStrip';
import { WindowBar } from '@/components/Window';
import { ScreenFigure, type Shot } from '@/components/case/ScreenGallery';
import { getCase, type CaseSlug } from '@/data/projects';

export type CaseLink = {
  label: string;
  href: string;
  /** GitHub profile (ghost) or this project's own repository (secondary) */
  kind: 'profile' | 'repo';
};

export const GITHUB_PROFILE: CaseLink = {
  label: 'GitHub profile',
  href: 'https://github.com/johnaaronmendoza',
  kind: 'profile',
};

const ROW = '';

interface CaseHeaderProps {
  slug: CaseSlug;
  /** Filename-style window title, e.g. "fire_safety_drill.apk" */
  file: string;
  /** Fact chips: each self-explanatory without its icon, ≤ 28 characters */
  facts: Fact[];
  /** Optional plain line under the chips (e.g. team member names) */
  note?: string;
  links: CaseLink[];
  /** Exactly four figures, each value at most 6 glyphs */
  stats: [Stat, Stat, Stat, Stat];
  /** The first screenshot, shown right under the header at every width */
  heroShot?: Shot;
}

/**
 * The project opens as a program: year, name, a one-line lead, fact chips
 * and links, and an orange status bar of key figures along the bottom edge.
 * Name, year and summary come from data/projects.ts; the real screenshot
 * (heroShot) follows straight after.
 */
export default function CaseHeader({ slug, file, facts, note, links, stats, heroShot }: CaseHeaderProps) {
  const project = getCase(slug);

  return (
    <div className="space-y-10">
      <div className="window">
        <WindowBar title={file} />
        <div className="window-body p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1">
            <span className="col-start-1 row-start-1 self-start justify-self-start border-2 border-black bg-[var(--yellow)] px-2 py-1 font-pixel text-xs text-black">
              {project.year}
            </span>
            {/* Upper case is CSS only, so screen readers get the real name */}
            <h1 className={`${ROW} mt-4 font-pixel uppercase text-black break-words text-balance leading-[1.3] text-[length:clamp(20px,6vw,24px)] sm:text-[32px] xl:text-[40px]`}>
              {project.name}
            </h1>
            <Lead text={project.description} tone="cream" className={`${ROW} mt-4`} />
            <FactChips facts={facts} label="Project facts" className={`${ROW} mt-6`} />
            {note && (
              <p className={`${ROW} mt-3 max-w-[60ch] font-mono text-[15px] sm:text-base leading-[1.5] text-[color:var(--text)]`}>
                {note}
              </p>
            )}
            <div className={`${ROW} mt-6 flex flex-wrap gap-4`}>
              {links.map(({ label, href, kind }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full sm:w-auto ${kind === 'repo' ? 'btn-secondary' : 'btn-ghost-ink'}`}
                >
                  {kind === 'profile' && <PixelGitHub size={16} />}
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <StatStrip stats={stats} variant="status" />
      </div>
      {heroShot && <ScreenFigure {...heroShot} hero />}
    </div>
  );
}
