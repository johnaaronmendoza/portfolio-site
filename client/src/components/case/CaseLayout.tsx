import { useEffect, type ReactNode } from 'react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import PixelArt from '@/components/PixelArt';
import SectionHeading from '@/components/SectionHeading';
import SkipLink from '@/components/SkipLink';
import SoundToggle, { FLOAT_DOCK } from '@/components/SoundToggle';
import { ProjectTile } from '@/components/Projects';
import { getCase, getNextCase, type CaseSlug } from '@/data/projects';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';

const HOME_TITLE = 'John Aaron Mendoza Branzuela | Computing Science Portfolio';
const GUTTERS = 'px-4 sm:px-8 lg:px-16';

/** Sticky violet bar with the one way back to the Projects grid */
function CaseTaskbar() {
  return (
    <header className={`sticky top-0 z-30 bg-[var(--bar)] border-b-[3px] border-black ${GUTTERS} [--focus:var(--paper)]`}>
      <div className="max-w-5xl mx-auto h-14 flex items-center">
        <Link href="/#projects" replace onClick={() => play('back')} className="btn btn-ghost text-[color:var(--paper)] border-[color:var(--paper)] hover:text-[color:var(--text)]">
          <span aria-hidden="true">←</span>
          <PixelArt name="icon-projects" size={16} />
          All projects
        </Link>
      </div>
    </header>
  );
}

const CRUMB_LINK = 'inline-flex min-h-[44px] items-center underline decoration-2 underline-offset-4';

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mt-6 mb-4">
      <ol className="flex flex-wrap items-center gap-x-2 font-mono text-[15px] sm:text-base text-[color:var(--paper)]">
        <li className="flex items-center gap-x-2">
          <Link href="/" className={CRUMB_LINK}>Home</Link>
          <span aria-hidden="true">/</span>
        </li>
        <li className="flex items-center gap-x-2">
          <Link href="/#projects" replace onClick={() => play('back')} className={CRUMB_LINK}>Projects</Link>
          <span aria-hidden="true">/</span>
        </li>
        <li className="inline-flex min-h-[44px] items-center">
          <span aria-current="page" className="font-bold">{current}</span>
        </li>
      </ol>
    </nav>
  );
}

/** Teal band: the next case in Home tile order, and the way back to all projects */
function NextProject({ slug }: { slug: CaseSlug }) {
  const next = getNextCase(slug);
  return (
    <nav
      aria-label="More projects"
      className={`bg-[var(--blue)] text-black border-t-[3px] border-black ${GUTTERS} py-16 lg:py-20 [--focus:var(--ink)]`}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading text="Next project" tone="ink" size="case" className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
          <ProjectTile project={{ ...next, featured: false }} span="lg:col-span-8" imageHeight="h-48 lg:h-72" />
          <div className="lg:col-span-4">
            <Link href="/#projects" replace onClick={() => play('back')} className="btn btn-primary w-full">
              <span aria-hidden="true">←</span>
              All projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface CaseLayoutProps {
  slug: CaseSlug;
  children: ReactNode;
}

/**
 * Shell for the six case-study pages: taskbar, breadcrumb, the page's
 * sections, the Next project band and the site footer.
 */
export default function CaseLayout({ slug, children }: CaseLayoutProps) {
  const { name } = getCase(slug);

  useEffect(() => {
    trackProjectVisit(slug);
    document.title = `${name} | John Aaron Branzuela`;
    // Keep headings and controls scrolled into view clear of the sticky taskbar (WCAG 2.4.11)
    const root = document.documentElement;
    root.style.scrollPaddingTop = '72px';
    return () => {
      document.title = HOME_TITLE;
      root.style.scrollPaddingTop = '';
    };
  }, [slug, name]);

  return (
    <div className="min-h-screen text-[color:var(--text)]">
      <SkipLink />
      <CaseTaskbar />
      <main id="main" tabIndex={-1}>
        <div className={`${GUTTERS} pb-16 lg:pb-20`}>
          <div className="max-w-5xl mx-auto">
            <Breadcrumb current={name} />
            <div className="space-y-16 lg:space-y-20">{children}</div>
          </div>
        </div>
        <NextProject slug={slug} />
      </main>
      <Footer />
      <div className={FLOAT_DOCK}>
        <SoundToggle />
      </div>
    </div>
  );
}
