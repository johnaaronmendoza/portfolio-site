/**
 * MascotPanel Component - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Displays 8-bit mascot avatar in a bordered panel
 * - Switches between idle (happy) and thinking (worried) expressions
 * - Uses actual pixel art assets
 * - Sharp border and hard shadow styling
 */

import { motion } from 'framer-motion';

interface MascotPanelProps {
  isTyping: boolean;
}

export default function MascotPanel({ isTyping }: MascotPanelProps) {
  return (
    <motion.div
      className="border-8bit shadow-8bit bg-zinc-900 p-4 sm:p-6 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Mascot Avatar - 8-bit Pixel Art */}
      <div className="w-40 h-48 sm:w-48 sm:h-56 bg-black border-2 border-amber-400 flex items-center justify-center mb-4 relative overflow-hidden">
        {isTyping ? (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center flex flex-col items-center justify-center"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-worrycopy_8d3aee8e.png"
              alt="Thinking"
              className="w-32 h-32 sm:w-40 sm:h-40"
              style={{ imageRendering: 'pixelated' }}
            />
            <p className="font-pixel text-xs text-amber-400 mt-2">THINKING</p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center flex flex-col items-center justify-center"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png"
              alt="Ready"
              className="w-32 h-32 sm:w-40 sm:h-40"
              style={{ imageRendering: 'pixelated' }}
            />
            <p className="font-pixel text-xs text-amber-400 mt-2">READY</p>
          </motion.div>
        )}
      </div>

      {/* Status Label */}
      <p className="font-pixel text-xs sm:text-sm text-blue-400 text-center">
        JOHN_AARON<br />
        v1.0
      </p>
    </motion.div>
  );
}
