/**
 * ScreenTear - VHS Screen Tear Effect
 * Design: Industrial Retro-Futurism
 * - Occasional horizontal glitch line
 * - Authentic retro VHS aesthetic
 * - Subtle and non-intrusive
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function ScreenTear() {
  const [shouldShow, setShouldShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const scheduleNextTear = () => {
      const delay = Math.random() * 7000 + 8000;
      const timeout = setTimeout(() => {
        setShouldShow(true);
        setTimeout(() => setShouldShow(false), 3000);
        scheduleNextTear();
      }, delay);
      return timeout;
    };

    const timeout = scheduleNextTear();
    return () => clearTimeout(timeout);
  }, [reduced]);

  return (
    <>
      {shouldShow && (
        <motion.div
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: '100vw', opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: 'linear' }}
          className="fixed top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none z-50"
          style={{
            boxShadow: '0 0 10px rgba(245, 158, 11, 0.8), 0 2px 5px rgba(0, 0, 0, 0.5)',
            filter: 'blur(0.5px)',
          }}
        />
      )}
    </>
  );
}
