import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  /** The target number to count to */
  to: number | string;
  /** Duration in ms (default 1800) */
  duration?: number;
  /** Delay before starting in ms (default 0) */
  delay?: number;
  className?: string;
}

/**
 * Renders a number that counts up from 0 → `to` when scrolled into view.
 * If `to` is not purely numeric (e.g. "Star", "CSV"), just displays it directly.
 */
export default function CountUp({
  to,
  duration = 1800,
  delay = 0,
  className = '',
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<string | number>(0);
  const started = useRef(false);

  const numeric = typeof to === 'number' || (typeof to === 'string' && !isNaN(Number(to)));
  const target = numeric ? Number(to) : 0;

  useEffect(() => {
    if (!numeric || reduced) {
      setDisplay(to);
      return;
    }
    if (!isInView || started.current) return;
    started.current = true;

    const startTime = performance.now() + delay;
    let rafId: number;

    function tick(now: number) {
      if (now < startTime) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      setDisplay(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(to);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, numeric, target, to, duration, delay, reduced]);

  // Non-numeric — just show as-is
  if (!numeric) {
    return <span ref={ref} className={className}>{to}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {reduced ? to : display}
    </span>
  );
}
