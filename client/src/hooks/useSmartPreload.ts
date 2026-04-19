/**
 * useSmartPreload — Hover Intent image preloading
 *
 * Waits 300 ms after mouseenter before triggering a preload, so brief
 * mouse passes don't fire unnecessary requests. Uses AbortController to
 * cancel any in-flight fetch if the user leaves before the timer fires.
 *
 * Usage:
 *   const preload = useSmartPreload([img1Url, img2Url]);
 *   return <div {...preload.handlers}>...</div>;
 */
import { useRef, useCallback } from 'react';

const INTENT_DELAY = 300; // ms before we commit to preloading

interface SmartPreload {
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export function useSmartPreload(urls: string[]): SmartPreload {
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef  = useRef<AbortController | null>(null);
  const loadedRef = useRef<Set<string>>(new Set());

  const onMouseEnter = useCallback(() => {
    // Clear any previous pending timer
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // Abort any previous in-flight fetch
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const { signal } = abortRef.current;

      urls.forEach(url => {
        if (loadedRef.current.has(url)) return; // already cached — skip

        // For image assets: use Image() (browser-native, faster than fetch)
        if (/\.(png|jpe?g|webp|gif|avif|svg)(\?.*)?$/i.test(url)) {
          const img = new Image();
          img.onload = () => loadedRef.current.add(url);
          img.src = url;
        } else {
          // For other resources: fetch with abort support
          fetch(url, { signal, priority: 'low' } as RequestInit)
            .then(() => loadedRef.current.add(url))
            .catch(() => {}); // AbortError is expected on mouse-leave
        }
      });
    }, INTENT_DELAY);
  }, [urls]);

  const onMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    abortRef.current?.abort();
  }, []);

  return { handlers: { onMouseEnter, onMouseLeave } };
}
