import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

let lenisInstance: Lenis | null = null;

/**
 * Initialises Lenis smooth scroll globally.
 * Call once at the app root. No-ops if prefers-reduced-motion is set.
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);
}

/** Get the active Lenis instance (for programmatic scrollTo calls) */
export function getLenis() {
  return lenisInstance;
}
