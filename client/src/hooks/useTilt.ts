import { useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Subtle 3D card tilt that follows the cursor.
 * Returns { ref, handlers } — spread handlers onto the element you want to tilt.
 */
export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotateX = (-y * maxDeg * 2).toFixed(2);
      const rotateY = ( x * maxDeg * 2).toFixed(2);
      ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      ref.current.style.transition = 'transform 0.05s linear';
    },
    [reduced, maxDeg],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    ref.current.style.transition = 'transform 0.4s ease';
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
