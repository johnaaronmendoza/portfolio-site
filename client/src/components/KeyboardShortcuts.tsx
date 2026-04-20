import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'],    desc: 'Open command palette'       },
  { keys: ['↑', '↓'],       desc: 'Navigate between sections'  },
  { keys: ['`'],             desc: 'Open secret terminal'       },
  { keys: ['?'],             desc: 'Show keyboard shortcuts'    },
  { keys: ['↑↑↓↓←→←→BA'],  desc: 'Konami code easter egg'     },
  { keys: ['Esc'],           desc: 'Close any overlay'          },
];

const SECTIONS = [
  { key: '1', label: 'Hero'       },
  { key: '2', label: 'About'      },
  { key: '3', label: 'Experience' },
  { key: '4', label: 'Projects'   },
  { key: '5', label: 'Skills'     },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '?') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-full max-w-md bg-black border-4 border-amber-400 shadow-8bit"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div className="border-b-2 border-amber-400 bg-zinc-900 px-4 py-3 flex items-center justify-between">
              <span className="font-pixel text-[10px] text-amber-400">KEYBOARD SHORTCUTS</span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-zinc-500 hover:text-amber-400 transition-colors"
              >
                [ESC]
              </button>
            </div>

            {/* Shortcuts */}
            <div className="p-4 space-y-1">
              {SHORTCUTS.map(({ keys, desc }) => (
                <div key={desc} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                  <span className="font-mono text-xs text-zinc-400">{desc}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((k, i) => (
                      <span key={i} className="font-mono text-[10px] text-black bg-amber-400 px-1.5 py-0.5 leading-none">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-amber-400 px-4 py-2 bg-zinc-900">
              <p className="font-mono text-[10px] text-zinc-600 text-center">Press <span className="text-amber-400">?</span> to toggle</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
