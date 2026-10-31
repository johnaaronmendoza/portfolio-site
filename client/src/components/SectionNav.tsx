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

// Viewer's choice to stop the ribbon tickers (WCAG 2.2.2). index.css reads
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
    {/* Bottom-left at every width; the chat launcher owns bottom-right */}
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={motionPaused}
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-3 border-2 border-amber-400 shadow-8bit font-mono text-sm font-bold transition-colors duration-150 ${
        motionPaused ? 'bg-[var(--lime)] text-black' : 'bg-black text-amber-400 hover:bg-zinc-900'
      }`}
    >
      <span aria-hidden="true">{motionPaused ? '▶' : '❚❚'}</span>
      Pause motion
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
          <span className="font-pixel text-[8px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
            {label}
          </span>
          {/* Dot */}
          <div
            className={`w-2 h-2 transition-colors duration-150 ${
              active === id ? 'bg-amber-400' : 'bg-zinc-700 group-hover:bg-zinc-500'
            }`}
          />
        </motion.button>
      ))}
    </div>
    </>
  );
}
