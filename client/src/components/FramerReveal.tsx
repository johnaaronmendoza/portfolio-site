import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FramerRevealProps {
  children: ReactNode;
  delay?: number;
}

// Emil Kowalski: custom curves have more punch than built-in easings
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function FramerReveal({ children, delay = 0 }: FramerRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay,
        ease: EASE_OUT,
      }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
