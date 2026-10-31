import { useState, useEffect } from 'react';
import PixelArt from './PixelArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SECTIONS = [
  { id: 'hero',       label: 'Top' },
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'skills',     label: 'Skills' },
  { id: 'footer',     label: 'Contact' },
];

// Viewer's choice to stop the marquee strips (WCAG 2.2.2). index.css reads
// data-motion="paused" on <html>; the choice persists across visits.
const MOTION_KEY = 'ja_motion_paused';

function readMotionPaused(): boolean {
  try { return localStorage.getItem(MOTION_KEY) === 'true'; } catch { return false; }
}

export default function SectionNav() {
  const [active, setActive] = useState('hero');
  const [motionPaused, setMotionPaused] = useState(readMotionPaused);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (motionPaused) root.setAttribute('data-motion', 'paused');
    else root.removeAttribute('data-motion');
    return () => root.removeAttribute('data-motion');
  }, [motionPaused]);

  const toggleMotion = () => {
    const next = !motionPaused;
    setMotionPaused(next);
    try { localStorage.setItem(MOTION_KEY, String(next)); } catch { /* storage blocked: still works this visit */ }
  };

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach(io => io?.disconnect());
  }, []);

  return (
    <>
    {/* Bottom-left at every width; the chat launcher owns bottom-right. The focus
        ring hugs the black border so it reads over every band it floats above.
        Paused = orange and pressed into its shadow, so the state shows at a glance */}
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={motionPaused}
      className={`btn outline-offset-0 motion-reduce:hidden fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 min-w-[44px] px-3 text-sm text-black ${
        motionPaused ? 'bg-[var(--orange)] translate-x-1 translate-y-1 shadow-none' : 'bg-[var(--cream)]'
      }`}
    >
      <span aria-hidden="true">❚❚</span>
      <span className="sr-only sm:not-sr-only">Pause motion</span>
    </button>
    {/* Section dots (large screens): 44px targets around 12px dots. Inactive
        dots are cream outlines, the current section is filled orange. */}
    <nav aria-label="Sections" className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="flex flex-col">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}
              aria-label={`Go to ${label}`}
              aria-current={active === id ? 'location' : undefined}
              className="group relative flex items-center justify-center w-11 h-11"
            >
              {/* Visible name on hover or keyboard focus; the aria-label carries it for screen readers */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-full mr-1 flex items-center gap-2 whitespace-nowrap border-[3px] border-black bg-[var(--navy)] px-2 py-1 font-pixel text-xs text-[color:var(--cream)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {id === 'hero' && <PixelArt name="icon-home" size={16} />}
                {label}
              </span>
              <span
                aria-hidden="true"
                // Ink ring keeps the dot visible where it crosses the teal band
                className={`block w-3 h-3 border-2 shadow-[0_0_0_2px_var(--ink)] transition-colors duration-150 ${
                  active === id
                    ? 'bg-[var(--orange)] border-[color:var(--orange)]'
                    : 'border-[color:var(--cream)] group-hover:bg-[var(--cream)]'
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </>
  );
}
