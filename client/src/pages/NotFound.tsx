import { useEffect } from 'react';
import { Link } from 'wouter';
import SkipLink from '@/components/SkipLink';
import Window from '@/components/Window';

/** Any unknown address: a 404.exe window with the two ways back. */
export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Page not found | John Aaron Branzuela';
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="min-h-screen text-[color:var(--text)]">
      <SkipLink />
      <main id="main" tabIndex={-1} className="min-h-screen grid place-items-center px-4 py-20 sm:px-8">
        <Window title="404.exe" className="w-full max-w-lg" bodyClassName="p-6 sm:p-10">
          <h1 className="font-display text-[28px] sm:text-[36px] leading-tight text-black">Page not found</h1>
          <p className="mt-3 font-sans text-base leading-relaxed">
            There is no page at this address. It may have moved, or the link has a typo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">Home</Link>
            <Link href="/#projects" className="btn btn-secondary">Projects</Link>
          </div>
        </Window>
      </main>
    </div>
  );
}
