import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

function isPaused(): boolean {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion === 'paused';
}

/**
 * True when looping motion should stop: the visitor prefers reduced motion,
 * or pressed "Pause motion" (SectionNav sets data-motion="paused" on <html>).
 * CSS loops read the attribute directly; JS loops (Framer, WebGL) use this.
 */
export function useCalmMotion(): boolean {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(isPaused);

  useEffect(() => {
    // SectionNav can set the attribute (a saved Pause) in an effect that runs
    // before this one subscribes, so read it again here
    setPaused(isPaused());
    const observer = new MutationObserver(() => setPaused(isPaused()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    return () => observer.disconnect();
  }, []);

  return reduced || paused;
}
