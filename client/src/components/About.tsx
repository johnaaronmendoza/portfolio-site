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
import ScrambleText from './ScrambleText';
import profileImg from '@assets/john_profile.jpg';

export default function About() {
  return (
    <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FramerReveal variant="fade-left">
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-16 glitch" data-text="ABOUT ME">
            <ScrambleText text="ABOUT ME" onView onHover delay={100} frames={20} />
          </h2>
        </FramerReveal>

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
              <div className="space-y-5 prose-8bit">
                <p className="font-mono-8bit text-sm sm:text-base text-white leading-relaxed">
                  My path into tech started on-site, not behind a desk. At Sembcorp I coordinated UAT across a 50MWp solar deployment — translating requirements between engineers and stakeholders before handoff. That gap between what a business needs and what gets built is where things go wrong, and it's what I focus on.
                </p>
                <p className="font-mono-8bit text-sm sm:text-base text-white leading-relaxed">
                  Since then I've shipped cloud-native microservices with gRPC and Kubernetes, built an AR fire evacuation app for Android with on-device ML, designed an AI-powered ETL pipeline for financial market data, and led UAT for a hospital appointment system — all while completing my Computing Science degree at SIT × University of Glasgow.
                </p>
                <p className="font-mono-8bit text-sm sm:text-base text-gray-400 leading-relaxed">
                  I'm comfortable speaking to both engineers and stakeholders, and I do my best work at the boundary between the two.
                </p>
              </div>
            </div>
          </div>
        </FramerReveal>
      </div>
    </section>
  );
}
