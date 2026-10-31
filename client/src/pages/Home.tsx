/**
 * Home Page: neo-brutalist retro web portfolio.
 * Hero → key figures → About → Experience → Projects → Skills → Footer,
 * with straight marquee strips between sections. The page background stays
 * transparent so the navy body and its pixel grid show through.
 */

import { useEffect, useLayoutEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Ribbon from '@/components/Ribbon';
import StatsBand from '@/components/StatsBand';
import SectionNav from '@/components/SectionNav';
import SkipLink from '@/components/SkipLink';
import { useHomeAchievements } from '@/hooks/useAchievements';
import { getLenis } from '@/hooks/useLenis';
import { saveHomeScroll } from '@/lib/scroll-memory';

// Section wrappers take focus (without a ring) when a link lands on them
const SECTION_CLASS = 'section-transition focus:outline-none';

/** Arriving at "/#projects" (e.g. a case study's Back link): jump there and focus it */
function useScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
      } else {
        target.scrollIntoView();
      }
      target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}

export default function Home() {
  useHomeAchievements();
  useScrollToHash();
  // Remember where the visitor was, so browser Back from a case study returns here.
  // Layout-effect cleanup runs before the page is swapped out, while scrollY is still Home's.
  useLayoutEffect(() => saveHomeScroll, []);

  return (
    <div className="min-h-screen text-[color:var(--cream)]">
      <SkipLink />
      <SectionNav />
      <main id="main" tabIndex={-1}>
        <div id="hero" tabIndex={-1} className={SECTION_CLASS}>
          <Hero />
        </div>
        <StatsBand />
        {/* Negative margins overlap touching 3px borders so bands share one rule */}
        <Ribbon tone="teal" className="-mt-[3px]" items={['ABOUT ME', 'AI', 'DATA', 'FULL-STACK']} />
        <div id="about" tabIndex={-1} className={SECTION_CLASS}>
          <About />
        </div>
        <Ribbon tone="teal" reverse items={['EXPERIENCE', 'NOW BUILDING DESK ASSIST', 'LGA TELECOM', 'SEMBCORP SOLAR']} />
        <div id="experience" tabIndex={-1} className={SECTION_CLASS}>
          <Experience />
        </div>
        {/* Orange either side of the teal Projects band so strips never merge into it */}
        <Ribbon tone="orange" className="-mb-[3px]" items={['PROJECTS', 'SILVERLINK SG', 'SCS AWARENESS PLATFORM']} />
        <div id="projects" tabIndex={-1} className={SECTION_CLASS}>
          <Projects />
        </div>
        <Ribbon tone="orange" reverse className="-mt-[3px]" items={['SKILLS', 'PRESS A KEY']} />
        <div id="skills" tabIndex={-1} className={SECTION_CLASS}>
          <Skills />
        </div>
      </main>
      <div id="footer" tabIndex={-1} className={SECTION_CLASS}>
        <Footer />
      </div>
    </div>
  );
}
