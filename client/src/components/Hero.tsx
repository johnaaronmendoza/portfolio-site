import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Particles from './Particles';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';
import Window from '@/components/Window';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ROLE_LINE = 'AI · DATA · FULL-STACK';

// Each line of the name animates in separately
const NAME_LINES = ['JOHN AARON', 'BRANZUELA'];

const ORANGE = 'bg-[var(--orange)]';
const TEAL = 'bg-[var(--teal)]';
const CREAM = 'bg-[var(--cream)]';

const PIXELS = [
  { top: '12%',  right: '8%',   size: 4, color: ORANGE, delay: 0 },
  { top: '20%',  right: '18%',  size: 3, color: TEAL,   delay: 0.5 },
  { top: '45%',  right: '6%',   size: 2, color: CREAM,  delay: 1 },
  { top: '65%',  right: '22%',  size: 3, color: TEAL,   delay: 1.5 },
  { top: '80%',  right: '10%',  size: 2, color: ORANGE, delay: 0.8 },
  { top: '15%',  left: '5%',    size: 2, color: TEAL,   delay: 0.3 },
  { top: '35%',  left: '8%',    size: 3, color: ORANGE, delay: 1.2 },
  { top: '55%',  left: '4%',    size: 2, color: CREAM,  delay: 0.7 },
  { top: '72%',  left: '12%',   size: 4, color: TEAL,   delay: 1.8 },
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
  const cardShadow = useTransform(scrollY, [0, 600], ['6px 6px 0px 0px #000000', '18px 18px 0px 0px #000000']);
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
    el.style.boxShadow = `${4 - tx * 0.3}px ${4 - ty * 0.3}px 0 0 #000`;
  };
  const handleMagnetLeave = () => {
    if (!magnetRef.current) return;
    magnetRef.current.style.transform = '';
    magnetRef.current.style.boxShadow = '';
  };

  return (
    <section className="min-h-screen text-[color:var(--cream)] flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden">
      {/* WebGL particle background */}
      {!reduced && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={['#FF7A2F', '#2EC4B6', '#F4EAD5']}
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

      {/* Floating pixel decorations (the transparent border keeps their original size) */}
      {PIXELS.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute z-10 border-2 border-transparent ${p.color}`}
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
          className="mb-10"
          style={{ boxShadow: reduced ? '6px 6px 0px 0px #000000' : cardShadow, y: reduced ? 0 : cardY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 0.4, ease: 'easeOut' }, scale: { duration: 0.4, ease: 'easeOut' } }}
        >
          {/* Dark body so the name reads; the motion wrapper owns the shadow */}
          <Window title="welcome.exe" className="shadow-none" bodyClassName="bg-black text-[color:var(--cream)] p-8 sm:p-10 lg:p-12">
          <h1
            className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight glitch overflow-hidden"
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
              className="inline-block w-2 h-8 sm:h-10 lg:h-12 bg-[var(--orange)] ml-1"
            />
          </h1>
          </Window>
        </motion.div>

        {/* Static role line */}
        <motion.div
          className="mb-6 ml-2 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="font-mono text-sm text-[color:var(--orange)] flex-shrink-0">{'>'}</span>
          <p className="font-mono text-sm text-[color:var(--teal)] tracking-wide">{ROLE_LINE}</p>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-[var(--orange)] flex-shrink-0"
          />
        </motion.div>

        {/* Positioning sentence */}
        <motion.p
          className="mb-12 ml-2 font-mono text-[15px] sm:text-base leading-relaxed max-w-[60ch]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: EASE_OUT }}
        >
          I build AI and data tools that people can trust. Right now that means an
          AI assistant that helps service desk agents at LGA Telecom answer customers
          faster, with a human reviewing every reply. Finishing BSc Computing Science
          at SIT × University of Glasgow, graduating April 2027.
        </motion.p>

        {/* CTAs — Resume primary (M01 magnetic), GitHub + LinkedIn ghost */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 ml-2"
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
              className="btn btn-primary"
              style={{ transitionProperty: 'translate, transform, box-shadow', transitionDuration: '0.15s', transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
            >
              ↓ RESUME.PDF
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/johnaaronmendoza"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
              className="btn btn-ghost"
            >
              <PixelGitHub size={16} fg="currentColor" />
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/john-branzuela/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
              className="btn btn-ghost"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[color:var(--orange)] opacity-70 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 border-r-2 border-b-2 border-current rotate-45"
        />
      </motion.button>
    </section>
  );
}
