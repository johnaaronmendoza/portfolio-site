import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SEQUENCE = [
  { text: 'JOHN_AARON_OS BIOS v2.6.0',                       type: 'header', delay: 120  },
  { text: 'Copyright (c) 2026 John Aaron Mendoza Branzuela', type: 'dim',    delay: 380  },
  { text: '─────────────────────────────────────────────',    type: 'dim',    delay: 560  },
  { text: '',                                                  type: 'blank',  delay: 700  },
  { text: 'Checking memory ......... 640KB     [ OK ]',       type: 'ok',     delay: 860  },
  { text: 'Loading display adapter .. ████████ [ OK ]',       type: 'ok',     delay: 1080 },
  { text: 'Mounting filesystem ...... /home    [ OK ]',       type: 'ok',     delay: 1300 },
  { text: 'Starting portfolio ........ 7 items [ OK ]',       type: 'ok',     delay: 1520 },
  { text: '',                                                  type: 'blank',  delay: 1720 },
  { text: '> SYSTEM READY — loading portfolio...',            type: 'ready',  delay: 1900 },
];

const FADE_START = 2600;
const DONE       = 3200;

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount]  = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    SEQUENCE.forEach((_, i) =>
      setTimeout(() => setCount(i + 1), SEQUENCE[i].delay)
    );
    setTimeout(() => setFading(true), FADE_START);
    setTimeout(() => onDone(), DONE);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
        }}
      />

      <div className="font-mono text-sm w-full max-w-lg px-8 relative z-10">
        {SEQUENCE.slice(0, count).map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'header' ? 'text-amber-400 font-bold mb-1 text-base' :
              line.type === 'ok'     ? 'text-gray-300' :
              line.type === 'ready'  ? 'text-amber-400 font-bold mt-2' :
              line.type === 'dim'    ? 'text-zinc-600' :
              'h-4'
            }
          >
            {line.text}
            {/* Blinking cursor on last visible line */}
            {i === count - 1 && line.type !== 'blank' && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-[1em] bg-amber-400 ml-1 align-middle"
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
