import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Particles from './Particles';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ROLES = [
  'COMPUTING SCIENCE STUDENT',
  'ASPIRING BUSINESS ANALYST',
  'PROBLEM SOLVER',
  'BUILDER',
];

const PIXELS = [
  { top: '12%',  right: '8%',   size: 4, color: 'bg-amber-400', delay: 0 },
  { top: '20%',  right: '18%',  size: 3, color: 'bg-blue-500',  delay: 0.5 },
  { top: '45%',  right: '6%',   size: 2, color: 'bg-amber-400', delay: 1 },
  { top: '65%',  right: '22%',  size: 3, color: 'bg-blue-500',  delay: 1.5 },
  { top: '80%',  right: '10%',  size: 2, color: 'bg-amber-400', delay: 0.8 },
  { top: '15%',  left: '5%',    size: 2, color: 'bg-blue-500',  delay: 0.3 },
  { top: '35%',  left: '8%',    size: 3, color: 'bg-amber-400', delay: 1.2 },
  { top: '55%',  left: '4%',    size: 2, color: 'bg-amber-400', delay: 0.7 },
  { top: '72%',  left: '12%',   size: 4, color: 'bg-blue-500',  delay: 1.8 },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const fullText = 'JOHN AARON\nMENDOZA\nBRANZUELA';

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, 3500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx(i => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden">
      {/* WebGL particle background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#F59E0B', '#3B82F6', '#ffffff']}
          particleCount={120}
          particleSpread={8}
          speed={0.05}
          particleBaseSize={60}
          sizeRandomness={1.2}
          alphaParticles={true}
          moveParticlesOnHover={true}
          particleHoverFactor={0.4}
          cameraDistance={22}
          disableRotation={false}
        />
      </div>

      {/* Floating pixel decorations */}
      {PIXELS.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute z-10 ${p.color} border-2 ${p.color.replace('bg-', 'border-')}`}
          style={{
            top: p.top,
            ...(p.right ? { right: p.right } : { left: p.left }),
            width: `${p.size * 4}px`,
            height: `${p.size * 4}px`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.7, 0.3, 0.7] }}
          transition={{ delay: p.delay, duration: 3 + p.delay * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-4xl w-full relative z-10">
        {/* Name */}
        <motion.div
          className="mb-10 border-8bit border-8bit-pulse shadow-8bit p-8 sm:p-10 lg:p-12 bg-black"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-wrap glitch"
            data-text="JOHN AARON MENDOZA BRANZUELA"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-8 sm:h-10 lg:h-12 bg-amber-400 ml-1"
            />
          </h1>
        </motion.div>

        {/* Cycling role tagline */}
        <motion.div
          className="mb-14 ml-2 h-8 sm:h-10 flex items-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="font-pixel text-xs text-amber-400 mr-3 flex-shrink-0">{'>'}</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              className="font-pixel text-xs sm:text-sm text-white"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              {ROLES[roleIdx]}
            </motion.p>
          </AnimatePresence>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-amber-400 ml-2 flex-shrink-0"
          />
        </motion.div>

        {/* CTA Links */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.a
            href="https://github.com/johnaaronmendoza"
            target="_blank"
            rel="noopener noreferrer"
            className="border-8bit shadow-8bit px-6 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm sm:text-base cursor-pointer"
            whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B' }}
            whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B', scale: 0.97 }}
            transition={{ duration: 0.1 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/john-branzuela/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm sm:text-base cursor-pointer"
            whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
            whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
            transition={{ duration: 0.1 }}
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-amber-400 opacity-70 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 border-r-2 border-b-2 border-amber-400 rotate-45"
        />
      </motion.button>
    </section>
  );
}
