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

export default function SectionNav() {
  const [active, setActive] = useState('hero');

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
  );
}
