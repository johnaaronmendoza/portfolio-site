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
import profileImg from '@assets/john_profile.png';

export default function About() {
  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-16">
            ABOUT ME
          </h2>

          {/* Card Container */}
          <div className="border-8bit shadow-8bit bg-zinc-900 p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Profile Photo */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="border-4 border-amber-400 shadow-8bit w-40 h-40 sm:w-48 sm:h-48 overflow-hidden">
                  <img
                    src={profileImg}
                    alt="John Aaron Mendoza Branzuela"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="font-pixel text-[9px] text-amber-400 text-center mt-3">[ JOHN_AARON ]</p>
              </div>

              {/* Bio Text */}
              <div className="space-y-6 prose-8bit">
                <p className="font-mono-8bit text-sm sm:text-base text-white">
                  My path into tech started on-site, not behind a desk. During my internship at Sembcorp, I coordinated with contractors across a 50MWp solar PV deployment, managing vendor timelines, translating technical requirements between teams, and conducting UAT to validate systems before handoff. That experience taught me something that stuck: the gap between what a business needs and what gets built is where things go wrong.
                </p>

                <p className="font-mono-8bit text-sm sm:text-base text-white">
                  It's what drew me to Computing Science, and it shapes how I approach every project. Whether I'm mapping user flows for an NGO awareness platform, analysing data to surface insights, or defining acceptance criteria, I'm always thinking about the problem before the solution. I'm comfortable speaking to both stakeholders and developers, and I find the most value in being the bridge between the two.
                </p>

                <p className="font-mono-8bit text-sm sm:text-base text-gray-400">
                  Currently studying at SIT × University of Glasgow. I also contributed to the early idea behind GreenLoopFarms, a hydroponic urban farm that went on to win a SGD $10k grant and partner with restaurants, NIE, and NUS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
