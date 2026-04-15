/**
 * useKeyboardNavigation Hook
 * Design: Industrial Retro-Futurism
 * - Arrow key navigation between portfolio sections
 * - Smooth scroll to sections
 * - Prevents default behavior when navigating
 */

import { useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'experience', 'projects', 'skills', 'footer'];

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      // Get current scroll position
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find current section based on scroll position
      let currentSectionIndex = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const element = document.getElementById(SECTIONS[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2) {
            currentSectionIndex = i;
          }
        }
      }

      // Calculate next section
      let nextSectionIndex = currentSectionIndex;
      if (e.key === 'ArrowDown') {
        nextSectionIndex = Math.min(currentSectionIndex + 1, SECTIONS.length - 1);
      } else if (e.key === 'ArrowUp') {
        nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
      }

      // Scroll to next section
      if (nextSectionIndex !== currentSectionIndex) {
        e.preventDefault();
        const targetElement = document.getElementById(SECTIONS[nextSectionIndex]);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
