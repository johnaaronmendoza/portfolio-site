import { motion } from 'framer-motion';
import { unlockAchievement } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ROLE_LINE = 'AI, data and full-stack engineering';

// Each line of the name reveals in turn: the page's one orchestrated moment
const NAME_LINES = ['JOHN AARON', 'BRANZUELA'];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-8 lg:px-16 py-20 relative overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">

        {/* Name card: hard amber shadow is the signature element */}
        <div className="mb-10 border-8bit p-8 sm:p-10 lg:p-12 bg-black shadow-[8px_8px_0px_0px_#F59E0B] sm:shadow-[12px_12px_0px_0px_#F59E0B]">
          <h1 className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight overflow-hidden">
            <span className="sr-only">John Aaron Mendoza Branzuela</span>
            {NAME_LINES.map((line, i) => (
              <motion.span
                key={line}
                aria-hidden="true"
                className="block"
                initial={reduced ? false : { opacity: 0, y: 32, clipPath: 'inset(100% 0 0 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.18, ease: EASE_OUT }}
              >
                {line}
                {i === NAME_LINES.length - 1 && (
                  <span className="blink-cursor w-2 h-7 sm:h-9 lg:h-11 bg-amber-400 ml-2 align-baseline" />
                )}
              </motion.span>
            ))}
          </h1>
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
    </section>
  );
}
