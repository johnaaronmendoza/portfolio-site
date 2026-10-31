import { motion } from 'framer-motion';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';
import Ribbon from '@/components/Ribbon';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ROLE_LINE = 'AI, data and full-stack engineering';

// Each line of the name reveals in turn: the page's one orchestrated moment
const NAME_LINES = ['JOHN AARON', 'BRANZUELA'];

// Static stickers echoing the role line. Inline row on mobile; pinned to the
// card's corners from md up, over its padding and border, never the name.
// Signal red takes black text: white on #FF3B30 is 3.55:1 and fails AA.
const STICKERS = [
  { label: 'AI', className: 'bg-[var(--lime)] text-black -rotate-6 md:-top-6 md:-left-6' },
  { label: 'DATA', className: 'bg-[var(--cobalt)] text-white rotate-[5deg] md:-top-7 md:right-10' },
  { label: 'FULL-STACK', className: 'bg-[var(--signal)] text-black -rotate-[4deg] md:-bottom-6 md:-right-5' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-20 pb-24 relative">
        <div className="max-w-4xl w-full relative z-10">

          <div className="relative mb-10">
            {/* Name card: hard amber shadow; the name carries the lime neon glow */}
            <div className="border-8bit p-6 sm:p-10 lg:p-12 bg-black shadow-[8px_8px_0px_0px_#F59E0B] sm:shadow-[12px_12px_0px_0px_#F59E0B]">
              <h1 className="neon-lime font-pixel text-[24px] sm:text-[40px] md:text-5xl lg:text-7xl font-bold text-[color:var(--lime)] leading-tight">
                <span className="sr-only">John Aaron Mendoza Branzuela</span>
                {NAME_LINES.map((line, i) => (
                  <motion.span
                    key={line}
                    aria-hidden="true"
                    className="block"
                    // Negative side insets leave room for the glow once revealed
                    initial={reduced ? false : { opacity: 0, y: 32, clipPath: 'inset(140% -20% -40% -20%)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(-40% -20% -40% -20%)' }}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.18, ease: EASE_OUT }}
                  >
                    {line}
                    {i === NAME_LINES.length - 1 && (
                      <span className="blink-cursor w-[0.2em] h-[0.85em] bg-amber-400 ml-2 align-baseline" />
                    )}
                  </motion.span>
                ))}
              </h1>
            </div>

            <div aria-hidden="true" className="mt-6 flex flex-wrap gap-3 md:mt-0">
              {STICKERS.map(({ label, className }) => (
                <span
                  key={label}
                  className={`sticker md:absolute font-pixel text-xs sm:text-sm px-3 py-2.5 rounded-xl border-4 border-black shadow-[4px_4px_0_0_var(--paper)] select-none ${className}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}
          >
            {/* Role line */}
            <p className="mb-6 ml-2 font-mono text-sm sm:text-base text-amber-400 tracking-wide">
              <span aria-hidden="true">{'> '}</span>{ROLE_LINE}
            </p>

            {/* Positioning */}
            <p className="mb-12 ml-2 font-mono text-[15px] sm:text-base text-zinc-200 leading-relaxed max-w-[60ch] text-pretty">
              I build AI and data tools that people can trust. Right now that means an
              AI assistant that helps service desk agents at LGA Telecom answer customers
              faster, with a human reviewing every reply. Finishing BSc Computing Science
              at SIT × University of Glasgow, graduating April 2027.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 ml-2">
              <a
                href="/resume.pdf"
                download="John_Aaron_Branzuela_Resume.pdf"
                onClick={() => play('click')}
                className="border-8bit shadow-8bit-sm px-6 py-3 font-mono font-bold text-black bg-amber-400 hover:bg-amber-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm tracking-wider inline-flex items-center gap-2 select-none min-h-[44px] transition-[background-color,transform,box-shadow] duration-150 ease-out"
              >
                Download resume
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/johnaaronmendoza"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
                  className="font-mono text-sm text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2"
                >
                  <PixelGitHub size={16} fg="currentColor" />
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/john-branzuela/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { unlockAchievement('NETWORKER'); play('click'); }}
                  className="font-mono text-sm text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2"
                >
                  <PixelLinkedIn size={16} />
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint: static, quiet */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to About"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-11 h-11 text-amber-400 opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="w-3 h-3 border-r-2 border-b-2 border-amber-400 rotate-45 -mt-1" />
        </button>
      </div>

      {/* Two ribbons crossing in one grid cell */}
      <div className="grid *:col-start-1 *:row-start-1 *:self-center">
        <Ribbon tone="cobalt" tilt={-3} items={['AI', 'DATA', 'FULL-STACK', 'DESK ASSIST (IN PROGRESS)']} />
        <Ribbon tone="lime" tilt={2} reverse items={['SILVERLINK SG', 'SCS AWARENESS PLATFORM', 'VIEW WORK ↓']} />
      </div>
    </section>
  );
}
