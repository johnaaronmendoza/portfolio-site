import { useEffect, useState } from 'react';

/** Whether a media query matches now, kept in step as the viewport changes. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);
  return matches;
}
