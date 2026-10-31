import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',       label: 'HERO' },
  { id: 'about',      label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects',   label: 'PROJECTS' },
  { id: 'skills',     label: 'SKILLS' },
  { id: 'footer',     label: 'CONTACT' },
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
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-center">
      {SECTIONS.map(({ id, label }) => (
        <motion.button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={label}
          className="relative group flex items-center justify-end gap-2"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.1 }}
        >
          {/* Label tooltip */}
          <span className="font-pixel text-[8px] text-[color:var(--orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
            {label}
          </span>
          {/* Dot */}
          <div
            className={`w-2 h-2 transition-colors duration-150 ${
              active === id ? 'bg-[var(--orange)]' : 'bg-zinc-500 group-hover:bg-[var(--cream)]'
            }`}
          />
        </motion.button>
      ))}
    </div>
    </>
  );
}
