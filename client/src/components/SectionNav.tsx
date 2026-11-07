import { useState, useEffect, useRef } from 'react';
import PixelArt from './PixelArt';
import { WindowBar } from './Window';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { isMuted, setMuted, SOUND_EVENT } from '@/hooks/useSound';
import { scrollToSection } from '@/lib/utils';

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
  const [soundOn, setSoundOn] = useState(() => !isMuted());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // Sound can also be toggled from the terminal, palette or chat; stay in sync
  useEffect(() => {
    const sync = () => setSoundOn(!isMuted());
    window.addEventListener(SOUND_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SOUND_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Phone menu: focus the first item on open; Escape or a tap outside closes it
  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLButtonElement>('li button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !menuButtonRef.current?.contains(t)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id, reduced);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setMuted(!next);
    setSoundOn(next);
  };

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
        ring is ink with a cream halo so it reads over every band it floats above.
        Paused = orange and pressed into its shadow, so the state shows at a glance */}
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex gap-3">
      <button
        type="button"
        onClick={toggleMotion}
        aria-pressed={motionPaused}
        className={`btn focus-ring-float motion-reduce:hidden min-w-[44px] px-3 text-black ${
          motionPaused ? 'bg-[var(--orange)] translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]' : 'bg-[var(--cream)]'
        }`}
      >
        <span aria-hidden="true">❚❚</span>
        <span className="sr-only sm:not-sr-only">Pause motion</span>
      </button>
      {/* Sound is off until the viewer turns it on; the label states the
          current state, so no aria-pressed (it would be read twice) */}
      <button
        type="button"
        onClick={toggleSound}
        className={`btn focus-ring-float min-w-[44px] px-3 text-black ${
          soundOn ? 'bg-[var(--orange)] translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]' : 'bg-[var(--cream)]'
        }`}
      >
        <span aria-hidden="true" className={soundOn ? '' : 'line-through'}>♪</span>
        <span className="sr-only sm:not-sr-only">{soundOn ? 'Sound on' : 'Sound off'}</span>
      </button>
    </div>

    {/* Phone and tablet menu (the dots take over at lg): above the chat
        launcher, so it never covers the hero buttons or the scroll cue */}
    <div className="lg:hidden fixed right-4 bottom-[76px] sm:bottom-[84px] z-40 flex flex-col items-end">
      {menuOpen && (
        <div ref={menuRef} id="section-menu" className="window mb-3 w-56">
          <WindowBar title="menu.exe" onClose={() => { setMenuOpen(false); menuButtonRef.current?.focus(); }} closeLabel="Close menu" />
          <nav aria-label="Sections" className="window-body p-0">
            <ul>
              {SECTIONS.map(({ id, label }) => (
                <li key={id} className="border-b-[3px] border-black last:border-b-0">
                  <button
                    type="button"
                    onClick={() => goTo(id)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex w-full min-h-[44px] items-center gap-3 px-4 font-mono text-[15px] font-bold text-black outline-offset-[-4px] transition-colors duration-150 ${
                      active === id ? 'bg-[var(--orange)]' : 'hover:bg-[var(--teal)]'
                    }`}
                  >
                    {id === 'hero' ? <span aria-hidden="true">↑</span> : <span aria-hidden="true" className="w-3" />}
                    {id === 'hero' ? 'Back to top' : label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setMenuOpen(o => !o)}
        aria-expanded={menuOpen}
        aria-controls="section-menu"
        className={`btn focus-ring-float min-w-[44px] px-3 text-black ${menuOpen ? 'bg-[var(--orange)]' : 'bg-[var(--cream)]'}`}
      >
        <span aria-hidden="true">☰</span>
        <span className="sr-only">Sections menu</span>
      </button>
    </div>
    {/* Section dots (large screens): 44px targets around 12px dots. Inactive
        dots are cream outlines, the current section is filled orange. */}
    <nav aria-label="Sections" className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="flex flex-col">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollToSection(id, reduced)}
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
