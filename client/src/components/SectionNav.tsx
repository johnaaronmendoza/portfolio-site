import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PixelArt, { type PixelArtName } from './PixelArt';
import SoundToggle, { FLOAT_DOCK } from './SoundToggle';
import { WindowBar } from './Window';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useModalFocus } from '@/hooks/useModalFocus';
import { getLenis } from '@/hooks/useLenis';
import { motionTokens } from '@/lib/motion-tokens';
import { scrollToSection } from '@/lib/utils';

const SECTIONS: { id: string; label: string; icon: PixelArtName }[] = [
  { id: 'hero',       label: 'Top',        icon: 'icon-home' },
  { id: 'about',      label: 'About',      icon: 'icon-about' },
  { id: 'experience', label: 'Experience', icon: 'icon-experience' },
  { id: 'projects',   label: 'Projects',   icon: 'icon-projects' },
  { id: 'skills',     label: 'Skills',     icon: 'icon-skills' },
  { id: 'footer',     label: 'Contact',    icon: 'icon-contact' },
];

const MENU_ID = 'section-menu';

/**
 * Section menu below lg (the dots take over on large screens): a menu.exe
 * window that opens only on the visitor's tap. Focus is trapped while open,
 * Escape or ✕ closes it and returns focus to the button, and picking a
 * section closes it and jumps there (instantly under reduced motion).
 */
function SectionMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  const keepFocus = useModalFocus(open, dialogRef, firstRef);

  // Escape closes; the page behind holds still while the menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    getLenis()?.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      root.style.overflow = '';
      getLenis()?.start();
    };
  }, [open]);

  const go = (id: string) => {
    keepFocus(); // the section takes focus, not the menu button
    setOpen(false);
    // Next frame: the scroll lock above has been released
    requestAnimationFrame(() => scrollToSection(id, reduced));
  };

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="menu-backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/70 touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="menu"
            ref={dialogRef}
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Sections"
            tabIndex={-1}
            // Never taller than the viewport: the list scrolls inside, and on short
            // screens (or zoomed in) it drops to the bottom edge, over the button
            className="window fixed bottom-20 left-4 z-[70] flex w-[min(20rem,calc(100vw-2rem))] max-h-[calc(100dvh-6rem)] flex-col [@media(max-height:500px)]:bottom-2 [@media(max-height:500px)]:max-h-[calc(100dvh-1rem)]"
            initial={{ opacity: 0, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
          >
            <WindowBar title="menu.exe" onClose={() => setOpen(false)} closeLabel="Close menu" />
            <ul className="window-body min-h-0 overflow-y-auto p-2" data-lenis-prevent>
              {SECTIONS.map(({ id, label, icon }, i) => (
                <li key={id}>
                  <button
                    ref={i === 0 ? firstRef : undefined}
                    type="button"
                    onClick={() => go(id)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex w-full min-h-[44px] items-center gap-3 px-3 font-sans text-base font-bold text-left transition-colors duration-150 hover:bg-[var(--blue)] hover:text-black ${
                      active === id ? 'bg-[var(--yellow)] text-black' : 'text-[color:var(--text)]'
                    }`}
                  >
                    <PixelArt name={icon} size={16} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={MENU_ID}
        className="btn focus-ring-float lg:hidden min-w-[44px] px-3 text-black bg-[var(--paper)]"
      >
        <span aria-hidden="true">☰</span>
        Menu
      </button>
      {/* Portalled out of the floating row so it stacks above the chat launcher */}
      {createPortal(overlay, document.body)}
    </>
  );
}

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
        ring is ink with a white halo so it reads over every band it floats above.
        Paused = yellow and pressed into its shadow, so the state shows at a glance */}
    <div className={FLOAT_DOCK}>
      <SectionMenu active={active} />
      <button
        type="button"
        onClick={toggleMotion}
        aria-pressed={motionPaused}
        className={`btn focus-ring-float motion-reduce:hidden min-w-[44px] px-3 text-black ${
          motionPaused ? 'bg-[var(--yellow)] translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]' : 'bg-[var(--paper)]'
        }`}
      >
        <span aria-hidden="true">❚❚</span>
        <span className="sr-only sm:not-sr-only">Pause motion</span>
      </button>
      <SoundToggle />
    </div>
    {/* Section dots (large screens): 44px targets around 12px dots. Inactive
        dots are white, the current section is filled yellow. */}
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
                className="pointer-events-none absolute right-full mr-1 flex items-center gap-2 whitespace-nowrap border-[3px] border-black bg-[var(--bar)] px-2 py-1 font-label text-xs text-[color:var(--paper)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {id === 'hero' && <PixelArt name="icon-home" size={16} />}
                {label}
              </span>
              <span
                aria-hidden="true"
                // Ink ring keeps the dot visible where it crosses the blue band
                className={`block w-3 h-3 border-2 shadow-[0_0_0_2px_var(--ink)] transition-colors duration-150 ${
                  active === id
                    ? 'bg-[var(--yellow)] border-[color:var(--yellow)]'
                    : 'border-black bg-[var(--paper)] group-hover:bg-[var(--yellow)]'
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
