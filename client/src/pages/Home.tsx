/**
 * Home Page - 8-Bit Hardware Engineer Portfolio
 * Design: Industrial Retro-Futurism
 * - Scrollable portfolio with Hero, About, Experience, Projects, Skills sections
 * - Maintains the original layout with all sections visible
 */

import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import PixelDivider from '@/components/PixelDivider';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useParallax } from '@/hooks/useParallax';

export default function Home() {
  useKeyboardNavigation();
  useParallax();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main scrollable content */}
      <main>
      <div id="hero" className="section-transition">
        <Hero />
      </div>
      <PixelDivider variant="circuit" />
      <div id="about" className="section-transition">
        <About />
      </div>
      <PixelDivider variant="wave" />
      <div id="experience" className="section-transition">
        <Experience />
      </div>
      <PixelDivider variant="dots" />
      <div id="projects" className="section-transition">
        <Projects />
      </div>
      <PixelDivider variant="circuit" />
      <div id="skills" className="section-transition">
        <Skills />
      </div>
      <PixelDivider variant="wave" />
      </main>
      <div id="footer" className="section-transition">
        <Footer />
      </div>
    </div>
  );
}
