import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CRTToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) {
      document.body.classList.add('crt-enhanced');
    } else {
      document.body.classList.remove('crt-enhanced');
    }
    return () => document.body.classList.remove('crt-enhanced');
  }, [on]);

  return (
    <motion.button
      onClick={() => setOn(v => !v)}
      className={`fixed bottom-24 left-4 z-50 font-pixel text-[9px] px-2 py-1.5 border-2 transition-colors ${
        on
          ? 'border-amber-400 text-amber-400 bg-black'
          : 'border-zinc-700 text-zinc-600 bg-black hover:border-zinc-500 hover:text-zinc-400'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle CRT scanlines"
    >
      {on ? 'CRT ON' : 'CRT'}
    </motion.button>
  );
}
