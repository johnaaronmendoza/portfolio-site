import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalFocus } from '@/hooks/useModalFocus';
import { motionTokens } from '@/lib/motion-tokens';
import { WindowBar } from './Window';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'],    desc: 'Open command palette'       },
  { keys: ['`'],             desc: 'Open secret terminal'       },
  { keys: ['?'],             desc: 'Show keyboard shortcuts'    },
  { keys: ['↑↑↓↓←→←→BA'],  desc: 'Konami code easter egg'     },
  { keys: ['Esc'],           desc: 'Close any overlay'          },
];

/** shortcuts.txt: terminal-variant window opened with "?" (MASTER 2.10) */
export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus the dialog on open, trap Tab, return focus to the opener on close
  useModalFocus(open, dialogRef);

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
            key="shortcuts-backdrop"
            className="fixed inset-0 bg-black/70 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="shortcuts"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
            tabIndex={-1}
            className="window fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[calc(100%-2rem)] max-w-md"
            initial={{ opacity: 0, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
          >
            <WindowBar title="shortcuts.txt" onClose={() => setOpen(false)} closeLabel="Close keyboard shortcuts" />

            <div className="bg-black text-[color:var(--paper)] [--focus:var(--yellow)]">
              <dl className="p-4 space-y-1">
                {SHORTCUTS.map(({ keys, desc }) => (
                  <div key={desc} className="flex items-center justify-between gap-4 py-2">
                    <dt className="font-sans text-[15px]">{desc}</dt>
                    <dd className="flex flex-shrink-0 items-center gap-1">
                      {keys.map((k) => (
                        <kbd key={k} className="font-mono text-sm font-bold text-black bg-[var(--yellow)] border-2 border-[color:var(--paper)] px-1.5 py-0.5 leading-none">
                          {k}
                        </kbd>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="border-t-2 border-[color:var(--paper)] px-4 py-2 font-mono text-sm text-center">
                Press <kbd className="font-bold text-[color:var(--yellow)]">?</kbd> to toggle
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
