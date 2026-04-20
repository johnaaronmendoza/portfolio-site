import { useState, useCallback, useRef, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>[]{}|/\\';

/**
 * Text scramble hook — letters cycle through random characters before
 * resolving to the final string, left-to-right.
 *
 * @param finalText  The string to resolve to
 * @param options.delay      ms before animation starts (default 0)
 * @param options.frames     total animation frames (default 18)
 * @param options.autoplay   start on mount (default false)
 */
export function useTextScramble(
  finalText: string,
  options: { delay?: number; frames?: number; autoplay?: boolean } = {},
) {
  const { delay = 0, frames = 18, autoplay = false } = options;
  const [displayText, setDisplayText] = useState(() => scrambleFull(finalText));
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let frame = 0;

    const tick = () => {
      const progress = frame / frames;
      const resolved = Math.floor(progress * finalText.length);

      setDisplayText(
        finalText
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '\n') return char;
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(''),
      );

      frame++;
      if (frame <= frames) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(finalText);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [finalText, frames]);

  useEffect(() => {
    if (!autoplay) return;
    timeoutRef.current = setTimeout(scramble, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoplay, delay, scramble]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return { displayText, scramble };
}

function scrambleFull(text: string): string {
  return text
    .split('')
    .map(c => (c === ' ' || c === '\n' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');
}
