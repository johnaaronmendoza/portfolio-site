/**
 * Home Page: neo-brutalist retro web portfolio.
 * Hero → key figures → About → Experience → Projects → Skills → Footer,
 * with straight marquee strips between sections. The page background stays
 * transparent so the navy body and its pixel grid show through.
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
    <div className="min-h-screen text-[color:var(--cream)]">
      <SectionNav />
      {/* Main scrollable content */}
      <main>
      <div id="hero" className="section-transition">
        <Hero />
      </div>
      <StatsBand />
      {/* Negative margins overlap touching 3px borders so bands share one rule */}
      <Ribbon tone="teal" className="-mt-[3px]" items={['HELLO', 'AI', 'DATA', 'FULL-STACK']} />
      <div id="about" className="section-transition">
        <About />
      </div>
      <Ribbon tone="teal" reverse items={['EXPERIENCE', 'LGA TELECOM', 'SEMBCORP SOLAR']} />
      <div id="experience" className="section-transition">
        <Experience />
      </div>
      {/* Orange either side of the teal Projects band so strips never merge into it */}
      <Ribbon tone="orange" className="-mb-[3px]" items={['PROJECTS', 'SILVERLINK SG', 'SCS AWARENESS PLATFORM']} />
      <div id="projects" className="section-transition">
        <Projects />
      </div>
      <Ribbon tone="orange" reverse className="-mt-[3px]" items={['SKILLS', 'PRESS A KEY']} />
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
