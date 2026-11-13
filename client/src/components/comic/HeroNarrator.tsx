import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Burst from './Burst';
import PixelArt from '@/components/PixelArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useCalmMotion } from '@/hooks/useCalmMotion';
import { motionTokens } from '@/lib/motion-tokens';

const N = motionTokens.narrator;
const { easing } = motionTokens;

// Both frames share one 47x72 canvas, so swapping never shifts him
const POINT = '/assets/mascot/poses/point-right.png';
const WAVE = '/assets/mascot/poses/wave.png';

// Two-frame "comic boil": hold A, snap to B, hold B (no tweening)
const STEP = [0, 0.5, 0.5, 1];
const boil = (duration: number, delay = 0) =>
  ({ duration, times: STEP, ease: 'linear' as const, repeat: Infinity, repeatType: 'mirror' as const, delay });

// Sparkles at the burst's edge; each blinks on its own beat
const SPARKLES = [
  { className: 'right-0 top-24', size: 32, delay: 0 },
  { className: 'left-2 bottom-16', size: 24, delay: 0.5 },
  { className: 'right-6 bottom-2', size: 24, delay: 1.0 },
];

/**
 * Lil Johnny as the hero's narrator (large screens only; the parent hides it
 * below lg). One button: pressing him or his speech bubble opens the chat.
 *
 * Motion (hero only, by John's choice, Nov 2026):
 * - entrance, once: the burst pops, he hops in, the bubble pops last;
 * - idle loop: the burst and bubble "boil" between two hand-drawn frames, he
 *   bobs, sparkles blink, and every few seconds he waves;
 * - hover or focus: he waves and the burst boils faster; press: he hops.
 * Loops stop with Pause motion; nothing moves under prefers-reduced-motion.
 */
export default function HeroNarrator() {
  const reduced = useReducedMotion();
  const calm = useCalmMotion();
  const [hover, setHover] = useState(false);
  const [autoWave, setAutoWave] = useState(false);
  const hop = useAnimationControls();

  // Fetch the second frame up front so the first wave never flickers
  useEffect(() => { const img = new Image(); img.src = WAVE; }, []);

  // A wave every few seconds while motion is running
  useEffect(() => {
    if (calm) { setAutoWave(false); return; }
    let off = 0;
    const id = window.setInterval(() => {
      setAutoWave(true);
      off = window.setTimeout(() => setAutoWave(false), N.waveHold * 1000);
    }, N.waveEvery * 1000);
    return () => { window.clearInterval(id); window.clearTimeout(off); };
  }, [calm]);

  const waving = hover || autoWave;

  const onPress = () => {
    if (!reduced) hop.start({ y: [0, -28, 0], transition: { duration: N.hop, times: [0, 0.4, 1], ease: 'easeOut' } });
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  return (
    <button
      type="button"
      onClick={onPress}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative block w-[340px] h-[420px] xl:w-[380px] xl:h-[460px] text-left"
    >
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-20 grid place-items-center">
        {/* Burst: pops in with an overshoot, then boils */}
        <motion.span
          className="absolute inset-2"
          initial={reduced ? false : { scale: 0, rotate: -60 }}
          animate={reduced ? { scale: 1, rotate: 0 } : { scale: [0, 1.15, 1], rotate: [-60, 6, 0] }}
          transition={{ duration: N.pop, delay: N.burst, times: [0, 0.7, 1], ease: easing.out }}
        >
          <motion.span
            className="absolute inset-0"
            animate={calm ? { rotate: 0, scale: 1 } : { rotate: [0, 0, 6, 6], scale: hover ? [1.04, 1.04, 1.08, 1.08] : [1, 1, 1.03, 1.03] }}
            transition={calm ? { duration: 0 } : boil(hover ? N.boil / 3 : N.boil)}
          >
            <Burst fill="var(--yellow)" rotate={-8} className="absolute inset-0" />
          </motion.span>
        </motion.span>

        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className={`absolute ${s.className}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={calm ? { opacity: 1, scale: 1 } : { opacity: [0, 0, 1, 1], scale: [0.6, 0.6, 1, 1] }}
            transition={calm ? { duration: 0 } : boil(N.blink, N.bubble + s.delay)}
          >
            <PixelArt name="sparkle" size={s.size} lazy />
          </motion.span>
        ))}

        {/* Johnny: hops in from below, bobs, waves; mirrored so he points at the name */}
        <motion.span
          className="relative block"
          initial={reduced ? false : { y: 80, opacity: 0 }}
          animate={reduced ? { y: 0, opacity: 1 } : { y: [80, -16, 0], opacity: [0, 1, 1] }}
          transition={{ duration: N.pop, delay: N.johnny, times: [0, 0.65, 1], ease: easing.out }}
        >
          <motion.span className="block" animate={hop}>
            <motion.span
              className="block origin-bottom"
              animate={calm ? { y: 0, rotate: 0 } : waving ? { y: 0, rotate: [-4, -4, 4, 4] } : { y: [0, 0, -4, -4], rotate: 0 }}
              transition={calm ? { duration: 0 } : boil(waving ? N.wiggle : N.bob)}
            >
              <img
                src={waving ? WAVE : POINT}
                alt=""
                width={47}
                height={72}
                className="h-[256px] xl:h-[288px] w-auto -scale-x-100 [image-rendering:pixelated]"
              />
            </motion.span>
          </motion.span>
        </motion.span>
      </span>

      {/* Speech bubble (the button's label): pops from its tail, then floats */}
      <motion.span
        className="absolute left-0 top-0 block origin-[75%_100%]"
        initial={reduced ? false : { scale: 0, opacity: 0 }}
        animate={reduced ? { scale: 1, opacity: 1 } : { scale: [0, 1.1, 1], opacity: [0, 1, 1] }}
        transition={{ duration: N.pop, delay: N.bubble, times: [0, 0.7, 1], ease: easing.out }}
      >
        <motion.span
          className="comic-bubble block max-w-[270px] font-sans text-[17px] leading-snug group-hover:underline underline-offset-4 decoration-2 [--tail-x:200px]"
          animate={calm ? { y: 0 } : { y: [0, 0, -3, -3] }}
          transition={calm ? { duration: 0 } : boil(N.bob, 0.3)}
        >
          Psst! Got questions about my work? Ask me.
        </motion.span>
      </motion.span>
    </button>
  );
}
