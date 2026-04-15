/**
 * LoadingBar - Retro boot sequence progress bar
 * Design: Industrial Retro-Futurism
 * - Simulates old computer boot sequence
 * - Shows progress during initial page load
 * - Authentic retro aesthetic with monospace text
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);

  const messages = [
    'INITIALIZING SYSTEM...',
    'LOADING HARDWARE PROFILE...',
    'MOUNTING FILESYSTEM...',
    'CHECKING MEMORY...',
    'LOADING PORTFOLIO DATA...',
    'INITIALIZING GRAPHICS...',
    'BOOTING MASCOT AI...',
    'SYSTEM READY.',
  ];

  useEffect(() => {
    // Simulate page load with progress
    let currentProgress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress > 100) currentProgress = 100;

      setProgress(currentProgress);

      // Add messages as progress increases
      if (messageIndex < messages.length && currentProgress >= (messageIndex + 1) * (100 / messages.length)) {
        setBootMessages(prev => [...prev, messages[messageIndex]]);
        messageIndex++;
      }

      // Complete loading
      if (currentProgress === 100) {
        clearInterval(interval);
        // Keep visible for 1 second after completion
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setIsVisible(false)}
        >
          {/* Boot messages */}
          <div className="max-w-2xl w-full px-4 sm:px-8 mb-12 h-32 overflow-hidden">
            {bootMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs text-amber-400 mb-2"
              >
                &gt; {msg}
              </motion.div>
            ))}
            {progress < 100 && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="font-mono text-xs text-amber-400"
              >
                &gt; _
              </motion.div>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-2xl px-4 sm:px-8">
            <div className="border-2 border-amber-400 bg-black p-2">
              <motion.div
                className="h-4 bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-xs text-amber-400">
              <span>PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading text + skip hint */}
          <motion.div
            animate={{ opacity: [1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="mt-8 font-mono text-sm text-blue-400"
          >
            LOADING...
          </motion.div>
          <p className="mt-4 font-mono text-xs text-gray-600">TAP TO SKIP</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
