import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
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

/**
 * Lil Johnny as the hero's narrator (large screens only; the parent hides it
 * below lg). One button: pressing him or his speech bubble opens the chat.
 *
 * He stands in a comic panel styled as a site window (lil_johnny.gif): blue
 * halftone fill, yellow floor (John chose this over the star, Nov 2026).
 *
 * Motion (hero only, by John's choice, Nov 2026):
 * - entrance, once: the panel pops, he hops in, the bubble pops last;
 * - idle loop: the halftone dots drift, the bubble bobs in two-frame comic
 *   steps, he bobs, and every few seconds he waves;
 * - hover or focus: he waves and the dots drift faster; press: he hops.
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
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-24 grid place-items-center">
        {/* Panel window: pops in, then its halftone dots drift */}
        <motion.span
          className="absolute inset-x-4 top-6 bottom-0 block border-4 border-black bg-[var(--blue)] shadow-[10px_10px_0_#000] overflow-hidden"
          initial={reduced ? false : { scale: 0.6, opacity: 0, rotate: -4 }}
          animate={reduced ? { scale: 1, opacity: 1, rotate: 0 } : { scale: [0.6, 1.05, 1], opacity: [0, 1, 1], rotate: [-4, 1, 0] }}
          transition={{ duration: N.pop, delay: N.burst, times: [0, 0.7, 1], ease: easing.out }}
        >
          <motion.span
            className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.28)_2px,transparent_2.4px)] [background-size:12px_12px]"
            animate={calm ? { backgroundPosition: '0px 0px' } : { backgroundPosition: ['0px 0px', '24px 24px'] }}
            transition={calm ? { duration: 0 } : { duration: hover ? N.drift / 3 : N.drift, ease: 'linear', repeat: Infinity }}
          />
          <span className="absolute inset-x-0 top-0 flex items-center justify-between bg-[var(--bar)] text-[color:var(--paper)] font-label text-sm px-3 py-1.5 border-b-[3px] border-black">
            <span>lil_johnny.gif</span>
            <span>○□✕</span>
          </span>
          <span className="absolute inset-x-0 bottom-0 h-10 bg-[var(--yellow)] border-t-[3px] border-black" />
        </motion.span>

        {/* Johnny: hops in from below, bobs, waves; mirrored so he points at the name */}
        <motion.span
          className="absolute bottom-[34px] left-1/2 -translate-x-1/2 block"
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
                className="h-[240px] xl:h-[272px] w-auto -scale-x-100 [image-rendering:pixelated]"
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
