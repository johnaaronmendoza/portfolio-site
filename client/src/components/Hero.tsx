import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Particles from './Particles';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ROLE_LINE = 'UAT · BUSINESS ANALYST · FULL-STACK · DATA';

// Each line of the name animates in separately
const NAME_LINES = ['JOHN AARON', 'BRANZUELA'];

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

// Individual line with its own scramble
function ScrambleLine({
  text,
  delay,
  reduced,
}: {
  text: string;
  delay: number;
  reduced: boolean;
}) {
  const { displayText, scramble } = useTextScramble(text, {
    delay,
    frames: 22,
    autoplay: true,
  });

  return (
    <motion.span
      className="block"
      initial={{ opacity: 0, y: 32, clipPath: 'inset(100% 0 0 0)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: EASE_OUT }}
      onMouseEnter={() => !reduced && scramble()}
    >
      {reduced ? text : displayText}
    </motion.span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  // M02 — parallax shadow: hero card lifts + shadow grows as user scrolls
  const { scrollY } = useScroll();
  const cardShadow = useTransform(scrollY, [0, 600], ['8px 8px 0px 0px #F59E0B', '24px 24px 0px 0px #F59E0B']);
  const cardY      = useTransform(scrollY, [0, 600], [0, -12]);

  // M01 — magnetic CTA ref
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const handleMagnetMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = magnetRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tx = Math.max(-14, Math.min(14, (e.clientX - cx) * 0.25));
    const ty = Math.max(-14, Math.min(14, (e.clientY - cy) * 0.25));
    el.style.transform = `translate(${tx}px, ${ty}px)`;
    el.style.boxShadow = `${2 - tx * 0.3}px ${2 - ty * 0.3}px 0 0 #F59E0B`;
  };
  const handleMagnetLeave = () => {
    if (!magnetRef.current) return;
    magnetRef.current.style.transform = '';
    magnetRef.current.style.boxShadow = '';
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden">
      {/* WebGL particle background */}
      {!reduced && (
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
      )}

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

        {/* Name — staggered line reveal + scramble */}
        {/* M02 — parallax: shadow grows + card lifts as user scrolls */}
        <motion.div
          className="mb-10 border-8bit p-8 sm:p-10 lg:p-12 bg-black"
          style={{ boxShadow: reduced ? '8px 8px 0px 0px #F59E0B' : cardShadow, y: reduced ? 0 : cardY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 0.4, ease: 'easeOut' }, scale: { duration: 0.4, ease: 'easeOut' } }}
        >
          <h1
            className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight glitch overflow-hidden"
            data-text="JOHN AARON MENDOZA BRANZUELA"
          >
            {NAME_LINES.map((line, i) => (
              <ScrambleLine
                key={line}
                text={line}
                delay={200 + i * 180}
                reduced={reduced}
              />
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-8 sm:h-10 lg:h-12 bg-amber-400 ml-1"
            />
          </h1>
        </motion.div>

        {/* Static role line */}
        <motion.div
          className="mb-6 ml-2 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="font-mono text-sm text-amber-400 flex-shrink-0">{'>'}</span>
          <p className="font-mono text-sm text-white tracking-wide">{ROLE_LINE}</p>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-amber-400 flex-shrink-0"
          />
        </motion.div>

        {/* Positioning sentence */}
        <motion.p
          className="mb-12 ml-2 font-mono text-sm text-zinc-400 leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: EASE_OUT }}
        >
          I think in systems but lead with people. I'm a quick learner who communicates across teams,
          stays composed when priorities shift, and cares about the details that matter. At Sembcorp,
          that meant leading{' '}
          <span className="text-amber-400">UAT for a 50MWp solar deployment</span>{' '}
          and making sure both engineers and stakeholders felt heard. Finishing{' '}
          <span className="text-amber-400">BSc Computing Science</span> at SIT × Glasgow.
          Available <span className="text-amber-400">August 2026</span>.
        </motion.p>

        {/* CTAs — Resume primary (M01 magnetic), GitHub + LinkedIn ghost */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 ml-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: EASE_OUT }}
        >
          {/* M01 — magnetic zone: slightly larger than the button so cursor "attracts" from nearby */}
          <div
            className="p-3 -m-3"
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
          >
            <a
              ref={magnetRef}
              href="/resume.pdf"
              download="John_Aaron_Branzuela_Resume.pdf"
              onClick={() => play('click')}
              onMouseEnter={() => play('blip')}
              className="border-8bit shadow-8bit-sm px-6 py-3 font-mono font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm tracking-wider inline-flex items-center gap-2 select-none"
              style={{ transition: 'background-color 0.1s, transform 0.15s cubic-bezier(.2,.8,.2,1), box-shadow 0.15s cubic-bezier(.2,.8,.2,1)' }}
            >
              ↓ RESUME.PDF
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/johnaaronmendoza"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
              className="font-mono text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <PixelGitHub size={16} fg="currentColor" />
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/john-branzuela/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
              className="font-mono text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <PixelLinkedIn size={16} />
              LinkedIn ↗
            </a>
          </div>
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
