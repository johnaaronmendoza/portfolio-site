/**
 * useParallax Hook
 * Design: Industrial Retro-Futurism
 * - Creates parallax effect for grid background
 * - Background moves at different speed than content
 * - Adds depth perception to the portfolio
 */

import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const gridLayer = document.querySelector('body::before') as any;
      
      if (gridLayer) {
        // Move background at 50% of scroll speed for parallax effect
        const parallaxOffset = scrollY * 0.5;
        document.body.style.backgroundPosition = `0 ${parallaxOffset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
