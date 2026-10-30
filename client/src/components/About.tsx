/**
 * About Section - 8-Bit Hardware Engineer Portfolio
 * Design: Industrial Retro-Futurism with Framer Motion Animations
 * - Card with 2px gold border and 4px gold hard shadow
 * - Press Start 2P for section heading
 * - Courier Prime monospace for body text
 * - Dark zinc (#18181B) card background
 * - FramerReveal wrapper for scroll-based animations
 */

import FramerReveal from './FramerReveal';
import PixelatedImage from './PixelatedImage';
import SectionHeading from './SectionHeading';
import profileImg from '@assets/john_profile.jpg';

export default function About() {
  return (
    <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading — M05 three-beat reveal */}
        <SectionHeading index="01" text="ABOUT ME" className="mb-16" />

        {/* Card Container — staggered: photo slides from left, text from right */}
        <FramerReveal delay={0.1}>
          <div className="border-8bit shadow-8bit bg-zinc-900 p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Profile Photo */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="border-4 border-amber-400 shadow-8bit w-56 h-56 sm:w-72 sm:h-72 overflow-hidden">
                  <PixelatedImage
                    src={profileImg}
                    alt="John Aaron Mendoza Branzuela"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Bio Text */}
              <div className="space-y-5 prose-8bit flex-1">
                <p className="font-mono-8bit text-base sm:text-lg text-white leading-relaxed max-w-[60ch]">
                  I build technology for the people who have to use it.
                </p>
                <p className="font-mono-8bit text-sm sm:text-base text-zinc-100 leading-relaxed max-w-[65ch]">
                  Most projects don't fail on the code. They fail in the gap between what a business needs and what gets built. That gap is where I like to work: listening to users, turning their problems into clear requirements, then building and testing until the thing actually helps.
                </p>
                <p className="font-mono-8bit text-sm sm:text-base text-zinc-100 leading-relaxed max-w-[65ch]">
                  My path started on-site at Sembcorp Solar, testing a CRM before it rolled out across the company. Since then I've built cloud-native microservices, machine learning models and a cancer-awareness platform used at Singapore Cancer Society outreach events. Now I'm building an AI assistant that helps service desk agents at LGA Telecom answer customers.
                </p>
                <p className="font-mono-8bit text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[65ch]">
                  I learn fast, speak both engineer and stakeholder, and care about shipping things people actually use.
                </p>

                {/* Key figures */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                  {[
                    { value: 2, suffix: '', label: 'industry internships' },
                    { value: 7, suffix: '', label: 'projects built' },
                    { value: 89.6, suffix: '%', label: 'ML model accuracy' },
                  ].map(({ value, suffix, label }) => (
                    <div key={label} className="text-center">
                      <div className="font-mono font-bold text-xl text-amber-400 tabular-nums">
                        {value}{suffix}
                      </div>
                      <div className="font-mono text-xs text-zinc-400 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FramerReveal>


      </div>
    </section>
  );
}
