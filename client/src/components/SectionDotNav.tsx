import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',       label: 'HERO'       },
  { id: 'about',      label: 'ABOUT'      },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects',   label: 'PROJECTS'   },
  { id: 'skills',     label: 'SKILLS'     },
  { id: 'footer',     label: 'CONTACT'    },
];

export default function SectionDotNav() {
  const [active, setActive]   = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden lg:flex">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <div
            key={id}
            className="flex items-center justify-end gap-2"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.12 }}
                  className="font-mono text-[9px] text-amber-400 tracking-widest select-none"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              className="relative flex items-center justify-center w-4 h-4"
            >
              {/* Outer ring */}
              <span
                className={`absolute inset-0 border transition-colors duration-150 ${
                  isActive ? 'border-amber-400' : 'border-zinc-600 hover:border-zinc-400'
                }`}
              />
              {/* Inner fill */}
              {isActive && (
                <motion.span
                  layoutId="nav-dot-fill"
                  className="w-2 h-2 bg-amber-400"
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
