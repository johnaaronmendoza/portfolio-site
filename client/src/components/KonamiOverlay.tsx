import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useKonami } from '@/hooks/useKonami';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { motionTokens } from '@/lib/motion-tokens';
import { WindowBar } from './Window';

export default function KonamiOverlay() {
  const [visible, setVisible] = useState(false);

  const trigger = useCallback(() => {
    play('powerUp');          // 7-note ascending sweep for the Konami reveal
    unlockAchievement('CHEAT_CODE');
    setVisible(true);
    setTimeout(() => setVisible(false), 1800);
  }, []);

  useKonami(trigger);

  // Easter egg: a terminal-variant window for 1.8s (MASTER 2.10); no flash,
  // only opacity + translate, and it never takes pointer or focus
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="konami"
          role="status"
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center px-4"
          initial={{ opacity: 0, y: motionTokens.distance.sm }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
        >
          <div className="window w-full max-w-sm">
            <WindowBar title="cheat_code.exe" />
            <div className="bg-black px-6 py-6 text-center text-[color:var(--paper)]">
              <p className="font-label text-xs text-[color:var(--paper)] mb-3">
                <span aria-hidden="true">🎮 </span>Cheat code activated
              </p>
              <p className="font-label text-xs leading-loose">
                ↑↑↓↓←→←→BA
              </p>
              <p className="font-sans text-[15px] mt-3">
                +30 lives. Enjoy the portfolio.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
