import type { ReactNode } from 'react';
import { PixelGitHub } from '@/components/PixelIcons';
import StatStrip, { type Stat } from '@/components/StatStrip';
import { WindowBar } from '@/components/Window';
import { getCase, type CaseSlug } from '@/data/projects';

export type MetaItem = { label: string; value: ReactNode; wide?: boolean };

/** Label/value pairs: one column on phones, two from sm. `wide` spans both. */
export function MetaList({ items }: { items: MetaItem[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 font-mono text-[15px] sm:text-base leading-[1.5]">
      {items.map(({ label, value, wide }) => (
        <div key={label} className={wide ? 'sm:col-span-2' : undefined}>
          <dt className="font-bold text-black">{label}</dt>
          <dd className="mt-1 text-[color:var(--navy)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

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

interface CaseHeaderProps {
  slug: CaseSlug;
  /** Filename-style window title, e.g. "fire_safety_drill.apk" */
  file: string;
  meta: MetaItem[];
  links: CaseLink[];
  /** Exactly four figures, each value at most 6 glyphs */
  stats: [Stat, Stat, Stat, Stat];
  /** Show the Home tile image beside the title from lg (default true) */
  cover?: boolean;
}

/**
 * The project opens as a program: cream window with the name, summary, links
 * and facts, and an orange status bar of key figures along its bottom edge.
 * Name, year and summary come from data/projects.ts.
 */
export default function CaseHeader({ slug, file, meta, links, stats, cover = true }: CaseHeaderProps) {
  const project = getCase(slug);
  const showCover = cover && project.image !== null;

  return (
    <div className="window">
      <WindowBar title={file} />
      <div className="window-body p-6 sm:p-10 lg:p-14">
        <div className={showCover ? 'lg:grid lg:grid-cols-12 lg:gap-8' : undefined}>
          <div className="lg:col-span-7">
            <span className="inline-block border-2 border-black bg-[var(--orange)] px-2 py-1 font-pixel text-xs text-black">
              {project.year}
            </span>
            {/* Upper case is CSS only, so screen readers get the real name */}
            <h1 className="mt-4 font-pixel uppercase text-black break-words text-balance leading-[1.3] text-[length:clamp(20px,6vw,24px)] sm:text-[32px] xl:text-[40px]">
              {project.name}
            </h1>
            <p className="mt-4 max-w-[52ch] font-mono font-bold text-base lg:text-lg leading-[1.6] text-pretty text-[color:var(--navy)]">
              {project.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
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
          {showCover && project.image && (
            // Illustrative (the h1 names it). Lazy inside display:none, so phones never fetch it.
            <img
              src={project.image}
              width={project.imageWidth}
              height={project.imageHeight}
              alt=""
              loading="lazy"
              decoding="async"
              className="hidden lg:block lg:col-span-5 self-start justify-self-center h-auto w-auto max-w-full max-h-[440px] border-[3px] border-black"
            />
          )}
        </div>
        <hr aria-hidden="true" className="my-6 border-0 border-t-[3px] border-black" />
        <MetaList items={meta} />
      </div>
      <StatStrip stats={stats} variant="status" />
    </div>
  );
}
