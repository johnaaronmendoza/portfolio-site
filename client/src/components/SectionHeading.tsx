import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  index: string; // e.g. "01"
  text: string;  // e.g. "PROJECTS"
  className?: string;
}

/**
 * M05 — Three-beat section header reveal:
 * 1. Index number fades in (0ms)
 * 2. Title slides up (80ms)
 * 3. Horizontal rule sweeps left→right (280ms)
 * Fires once per element via IntersectionObserver.
 */
export default function SectionHeading({ index, text, className = '' }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className}`}>
      {/* Beat 1: index clicks in */}
      <motion.span
        className="font-mono text-sm text-zinc-500 flex-shrink-0 tabular-nums"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.1, delay: 0, ease: 'easeOut' }}
      >
        {index} ·
      </motion.span>

      {/* Beat 2: title fades up 8px */}
      <motion.h2
        className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 flex-shrink-0"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.2, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
      >
        {text}
      </motion.h2>

      {/* Beat 3: rule sweeps left to right */}
      <motion.div
        className="flex-1 h-px bg-amber-400 opacity-20"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
