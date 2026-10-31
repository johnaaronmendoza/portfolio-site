import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Particles from './Particles';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCalmMotion } from '@/hooks/useCalmMotion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { motionTokens } from '@/lib/motion-tokens';
import { scrollToSection } from '@/lib/utils';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';
import { Chip, Lead } from '@/components/Hierarchy';
import PixelArt from '@/components/PixelArt';
import Window from '@/components/Window';

const { hero: HERO, loop: LOOP, easing } = motionTokens;

const ROLE_LINE = 'AI, data and full-stack developer';

// Two-tone name, one colour per line (orange 8.08:1, teal 9.69:1 on black)
const NAME_LINES = [
  { text: 'JOHN AARON', color: 'text-[color:var(--orange)]' },
  { text: 'BRANZUELA', color: 'text-[color:var(--teal)]' },
];

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

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** Blinking block cursor; solid when motion is calmed */
function Cursor({ calm, className }: { calm: boolean; className: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block flex-shrink-0 bg-[var(--orange)] ${className}`}
      animate={calm ? { opacity: 1 } : { opacity: [1, 0] }}
      transition={calm ? { duration: 0 } : { duration: LOOP.blink, repeat: Infinity }}
    />
  );
}

// One line of the visual name: clip reveal + scramble on load, re-scramble on hover
function ScrambleLine({
  text,
  color,
  delay,
  reduced,
  calm,
  children,
}: {
  text: string;
  color: string;
  delay: number;
  reduced: boolean;
  calm: boolean;
  children?: ReactNode;
}) {
  const { displayText, scramble } = useTextScramble(text, {
    delay: delay * 1000,
    frames: 22,
    autoplay: true,
  });

  return (
    <motion.span
      className={`block whitespace-nowrap ${color}`}
      // Reduced motion: the name renders final, with no clip reveal (MASTER 3.6)
      initial={reduced ? false : { opacity: 0, y: 32, clipPath: 'inset(100% 0 0 0)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
      transition={{ duration: HERO.line, delay, ease: easing.out }}
      onMouseEnter={() => !calm && scramble()}
    >
      {reduced ? text : displayText}
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const calm = useCalmMotion();

  // Particles also pause while the hero is scrolled out of view
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[100svh] flex flex-col text-[color:var(--cream)] px-4 sm:px-8 lg:px-16 pt-12 pb-6 sm:pt-20">
      {/* WebGL particles (skipped with reduced motion, frozen by Pause motion) */}
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
            paused={calm || !onScreen}
          />
        </div>
      )}

      {/* Floating pixels: behind the content, and only where the gutters are
          wide enough that they don't sit on text */}
      {PIXELS.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`hidden sm:block absolute z-0 ${p.color}`}
          style={{
            top: p.top,
            ...(p.right ? { right: p.right } : { left: p.left }),
            width: `${p.size * 4}px`,
            height: `${p.size * 4}px`,
          }}
          animate={calm ? { y: 0, opacity: 0.7 } : { y: [0, -18, 0], opacity: [0.7, 0.3, 0.7] }}
          transition={
            calm
              ? { duration: 0 }
              : { delay: p.delay, duration: LOOP.float + p.delay * 0.4, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      ))}

      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-4xl lg:max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
          <div className="lg:col-span-7">
            <motion.div
              className="mb-8 sm:mb-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: HERO.window, ease: 'easeOut' }}
            >
              {/* Terminal variant: black body so the two-tone name reads */}
              <Window
                title="welcome.exe"
                bodyClassName="bg-black text-[color:var(--cream)] [--focus:var(--orange)] p-6 sm:p-10 xl:p-12"
              >
                {/* Sized so BRANZUELA plus the cursor fits from 320px up */}
                <h1 className="font-pixel leading-[1.25] text-[length:clamp(20px,7vw,30px)] sm:text-4xl lg:text-[40px] xl:text-5xl">
                  <span className="sr-only">John Aaron Mendoza Branzuela</span>
                  <span aria-hidden="true">
                    {NAME_LINES.map((line, i) => (
                      <ScrambleLine
                        key={line.text}
                        text={line.text}
                        color={line.color}
                        delay={HERO.lineStart + i * HERO.lineStagger}
                        reduced={reduced}
                        calm={calm}
                      >
                        {i === NAME_LINES.length - 1 && (
                          <Cursor calm={calm} className="w-2 h-[0.9em] ml-1 align-[-0.05em]" />
                        )}
                      </ScrambleLine>
                    ))}
                  </span>
                </h1>
              </Window>
            </motion.div>

            {/* Role line */}
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionTokens.duration.slow, delay: HERO.role }}
            >
              <span aria-hidden="true" className="font-mono text-[15px] sm:text-base text-[color:var(--orange)] flex-shrink-0">{'>'}</span>
              <p className="font-mono text-[15px] sm:text-base font-bold text-[color:var(--teal)]">{ROLE_LINE}</p>
              <Cursor calm={calm} className="w-2 h-4" />
            </motion.div>

            {/* Positioning: the L2 lead (no prompt: the role line above has it) + study chip */}
            <motion.div
              className="mb-8 sm:mb-10 space-y-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: HERO.line, delay: HERO.body, ease: easing.out }}
            >
              <Lead text="I build AI and data tools people can trust, now building Desk Assist at LGA Telecom." prompt={false} />
              <Chip icon="chip-school" text="SIT × Glasgow · graduating Apr 2027" />
            </motion.div>

            {/* CTAs: resume first; email beside the profiles so contact is above the fold */}
            <motion.div
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: HERO.line, delay: HERO.ctas, ease: easing.out }}
            >
              <a
                href="/resume.pdf"
                download="John_Aaron_Branzuela_Resume.pdf"
                onClick={() => play('click')}
                className="btn btn-primary w-full sm:w-auto"
              >
                <PixelArt name="floppy" size={16} />
                Download resume
              </a>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('projects', reduced); }}
                className="btn btn-secondary w-full sm:w-auto"
              >
                See projects
              </a>
              <div className="flex flex-wrap items-center gap-3">
                <a href="mailto:johnaaronmb@gmail.com" className="btn btn-ghost">
                  <PixelArt name="icon-contact" size={16} />
                  Email me
                </a>
                <a
                  href="https://github.com/johnaaronmendoza"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
                  className="btn btn-ghost"
                >
                  <PixelGitHub size={16} />
                  GitHub{NEW_TAB}
                </a>
                <a
                  href="https://www.linkedin.com/in/john-branzuela/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
                  className="btn btn-ghost"
                >
                  <PixelLinkedIn size={16} />
                  LinkedIn{NEW_TAB}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Art, large screens only so it never sits under text */}
          <div aria-hidden="true" className="hidden lg:flex lg:col-span-5 items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center w-[336px] h-[336px] xl:w-[384px] xl:h-[384px]">
              <PixelArt name="starburst" size={384} lazy className="absolute inset-0 w-full h-full" />
              <PixelArt name="crt-computer" size={256} lazy className="relative" />
              <PixelArt name="sparkle" size={32} lazy className="absolute -top-2 right-2" />
              <PixelArt name="sparkle" size={32} lazy className="absolute bottom-2 -left-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue: in the flow so it never covers the buttons on short screens */}
      <motion.button
        type="button"
        aria-label="Scroll to About"
        onClick={() => scrollToSection('about', reduced)}
        className="relative z-10 self-center mt-8 min-h-[44px] min-w-[44px] px-3 flex flex-col items-center justify-center gap-1 text-[color:var(--orange)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO.cue, duration: motionTokens.duration.slow }}
      >
        <span className="font-mono text-[15px]">Scroll</span>
        <motion.span
          aria-hidden="true"
          className="block w-4 h-4 border-r-[3px] border-b-[3px] border-current rotate-45"
          animate={calm ? { y: 0 } : { y: [0, 6, 0] }}
          transition={calm ? { duration: 0 } : { duration: LOOP.bounce, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.button>
    </section>
  );
}
