import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useKonami } from '@/hooks/useKonami';
import { unlockAchievement } from '@/hooks/useAchievements';

export default function KonamiOverlay() {
  const [visible, setVisible] = useState(false);

  const trigger = useCallback(() => {
    unlockAchievement('CHEAT_CODE');
    setVisible(true);
    setTimeout(() => setVisible(false), 1800);
  }, []);

  useKonami(trigger);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Flash */}
          <motion.div
            className="absolute inset-0 bg-amber-400"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 0, 0.3, 0] }}
            transition={{ duration: 0.4, times: [0, 0.2, 0.5, 1] }}
          />
          {/* Message */}
          <motion.div
            className="relative border-4 border-amber-400 bg-black px-10 py-8 text-center"
            style={{ boxShadow: '8px 8px 0px 0px #F59E0B' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="font-pixel text-amber-400 text-xs mb-3 tracking-widest">
              🎮 CHEAT CODE ACTIVATED
            </p>
            <p className="font-pixel text-white text-[10px] leading-loose">
              ↑↑↓↓←→←→BA
            </p>
            <p className="font-mono-8bit text-gray-500 text-xs mt-3">
              +30 lives. Enjoy the portfolio.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
