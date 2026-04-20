import { useRef, useEffect, ElementType } from 'react';
import { useInView } from 'framer-motion';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Trigger scramble when element scrolls into view (default true) */
  onView?: boolean;
  /** Also re-scramble on mouse enter */
  onHover?: boolean;
  /** Delay in ms before starting when in view */
  delay?: number;
  frames?: number;
  as?: ElementType;
}

export default function ScrambleText({
  text,
  className = '',
  onView = true,
  onHover = false,
  delay = 0,
  frames = 20,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const triggered = useRef(false);

  const { displayText, scramble } = useTextScramble(text, { delay, frames });

  // Trigger once when scrolled into view
  useEffect(() => {
    if (reduced) return;
    if (onView && isInView && !triggered.current) {
      triggered.current = true;
      const t = setTimeout(scramble, delay);
      return () => clearTimeout(t);
    }
  }, [isInView, onView, scramble, delay, reduced]);

  const hoverProps =
    onHover && !reduced ? { onMouseEnter: scramble } : {};

  return (
    <Tag ref={ref} className={className} {...hoverProps}>
      {reduced ? text : displayText}
    </Tag>
  );
}
