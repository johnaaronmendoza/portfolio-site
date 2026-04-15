/**
 * Experience Section - 8-Bit Hardware Engineer Portfolio
 * Design: Industrial Retro-Futurism with Framer Motion Animations
 * - Individual cards for each role with gold borders and hard shadows
 * - Blue accent for company names
 * - Monospace text for details
 * - FramerReveal wrapper for scroll-based animations
 * - Button press hover effect on cards
 */

import { motion } from 'framer-motion';
import FramerReveal from './FramerReveal';

export default function Experience() {
  const experiences = [
    {
      company: "Sembcorp Solar Singapore",
      role: "Digitization Analyst Intern",
      period: "Oct 2020 – Jun 2021",
      highlights: [
        "Led company-wide rollout of Momens CRM across Projects, C&I, and SolarNova divisions",
        "Hosted Zoom training sessions for 10+ stakeholders per session on digitized workflows",
        "Gathered and consolidated UX feedback from internal teams, then liaised with vendors to implement new features and approve enhancements",
        "Performed QA on new Momens features before deployment — verified against originator requirements",
        "Supported SolarNova 3 (50MWp, 20 MOE schools) project tracking: milestones, site visits, and documentation management",
        "Translated complex operational data into accessible dashboards for 240MWp+ solar portfolio",
      ],
    },
  ];

  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-16">
            EXPERIENCE
          </h2>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                className="border-8bit shadow-8bit bg-zinc-900 p-6 sm:p-10 lg:p-12 cursor-pointer"
                whileHover={{
                  y: 4,
                  boxShadow: '0px 0px 0px 0px #F59E0B',
                  transition: { duration: 0.12 },
                }}
                whileTap={{
                  y: 4,
                  boxShadow: '0px 0px 0px 0px #F59E0B',
                  scale: 0.99,
                  transition: { duration: 0.1 },
                }}
              >
                {/* Index label */}
                <p className="font-pixel text-[10px] text-amber-400 opacity-40 mb-4">[ 01 ]</p>
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-8 pb-6 border-b-2 border-amber-400">
                  <div>
                    <h3 className="font-pixel text-xl sm:text-2xl text-blue-400 mb-2">
                      {exp.company}
                    </h3>
                    <p className="font-mono-8bit text-sm sm:text-base font-bold text-amber-400">
                      {exp.role}
                    </p>
                  </div>
                  <p className="font-mono-8bit text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                    {exp.period}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-4">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="font-mono-8bit text-sm sm:text-base text-white flex items-start gap-3"
                    >
                      <span className="text-amber-400 font-bold flex-shrink-0 mt-1">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
