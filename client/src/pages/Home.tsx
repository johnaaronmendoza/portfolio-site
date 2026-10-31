/**
 * Home Page: maximalist 8-bit portfolio.
 * Hero → key figures → About → Experience → Projects → Skills → Footer,
 * with slanted ribbon tickers between sections.
 */

import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import Ribbon from '@/components/Ribbon';
import StatsBand from '@/components/StatsBand';
import SectionNav from '@/components/SectionNav';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useHomeAchievements } from '@/hooks/useAchievements';

export default function Home() {
  useKeyboardNavigation();
  useHomeAchievements();
  return (
    <div className="min-h-screen bg-black text-white">
      <SectionNav />
      {/* Main scrollable content */}
      <main>
      <div id="hero" className="section-transition">
        <Hero />
      </div>
      <StatsBand />
      <div id="about" className="section-transition">
        <About />
      </div>
      <Ribbon tone="amber" tilt={-2} items={['EXPERIENCE', 'LGA TELECOM', 'SEMBCORP SOLAR']} />
      <div id="experience" className="section-transition">
        <Experience />
      </div>
      <Ribbon tone="lime" tilt={2} reverse items={['PROJECTS', 'VIEW WORK']} />
      <div id="projects" className="section-transition">
        <Projects />
      </div>
      <Ribbon tone="cobalt" tilt={-3} items={['SKILLS', 'PRESS A KEY']} />
      <div id="skills" className="section-transition">
        <Skills />
      </div>
      </main>
      <div id="footer" className="section-transition">
        <Footer />
      </div>
    </div>
  );
}
