import { motion, type TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type RevealVariant = 'fade-up' | 'fade-left' | 'scale' | 'fade';

interface FramerRevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
}

// Emil Kowalski: custom curves have more punch than built-in easings
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const VARIANTS: Record<RevealVariant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  'fade-up':   { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } },
  'fade-left': { hidden: { opacity: 0, x: -24 },              visible: { opacity: 1, x: 0 } },
  'scale':     { hidden: { opacity: 0, scale: 0.88 },          visible: { opacity: 1, scale: 1 } },
  'fade':      { hidden: { opacity: 0 },                       visible: { opacity: 1 } },
};

export default function FramerReveal({ children, delay = 0, variant = 'fade-up' }: FramerRevealProps) {
  const reduced = useReducedMotion();
  const v = VARIANTS[variant];

  return (
    <motion.div
      initial={reduced ? false : v.hidden}
      whileInView={v.visible}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced ? 0 : delay,
        ease: EASE_OUT,
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
