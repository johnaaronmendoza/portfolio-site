/**
 * Footer: big lime contact block. Email CTA, terminal hint, SGT clock and
 * social sticker buttons, all black on lime.
 */

import { useState, useEffect } from 'react';
import { PixelGitHub, PixelLinkedIn, PixelEmail } from '@/components/PixelIcons';

function useSGTClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    // Update once a minute, aligned to the minute boundary
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-SG', {
        timeZone: 'Asia/Singapore',
        hour: '2-digit', minute: '2-digit', hour12: false,
      }));
      id = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    tick();
    return () => clearTimeout(id);
  }, []);
  return time;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const sgtTime = useSGTClock();

  return (
    // Lime contact block: black text only; focus outlines switch to black so
    // they stay visible on lime
    <footer className="bg-[var(--lime)] text-black px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-t-4 border-black [&_:focus-visible]:outline-black">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Contact CTA */}
        <div className="text-center space-y-6">
          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-black" aria-hidden="true" />
            <span className="font-mono text-[15px] tracking-wide">Graduating April 2027</span>
          </div>

          <h2 className="font-pixel text-[28px] sm:text-5xl lg:text-7xl leading-tight">
            GET IN TOUCH
          </h2>
          <p className="font-mono-8bit text-[15px] sm:text-base max-w-md mx-auto leading-relaxed">
            Open to graduate roles, collaborations and interesting projects.
          </p>
          <a
            href="mailto:johnaaronmb@gmail.com"
            className="inline-flex items-center gap-3 min-h-[44px] border-4 border-black bg-black px-6 py-3 font-mono-8bit font-bold text-base text-[color:var(--lime)] shadow-[6px_6px_0_0_var(--cobalt)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_0_var(--cobalt)] transition-[translate,box-shadow] duration-150 ease-out"
          >
            <PixelEmail size={20} />
            Email me
          </a>

          {/* Terminal Easter egg hint */}
          <p className="font-mono text-[15px]">
            or open the terminal and try{' '}
            <button
              className="min-h-[44px] inline-flex items-center px-1 font-bold underline underline-offset-4 decoration-2 hover:bg-black hover:text-[color:var(--lime)] transition-colors"
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
            >
              {'>'} sudo hire-me
            </button>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t-4 border-black pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="font-mono-8bit text-sm">
              © {currentYear} John Aaron Mendoza Branzuela
            </p>
            {sgtTime && (
              <span className="font-mono text-sm tabular-nums">
                SGT {sgtTime}
              </span>
            )}
          </div>

          {/* Socials as black stickers */}
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/johnaaronmendoza"
              target="_blank"
              rel="noopener noreferrer"
              className="sticker -rotate-2 min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl border-4 border-black bg-black font-mono-8bit text-sm text-white hover:text-[color:var(--lime)] transition-colors"
              title="GitHub"
            >
              <PixelGitHub size={24} fg="#F59E0B" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/john-branzuela/"
              target="_blank"
              rel="noopener noreferrer"
              className="sticker rotate-2 min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl border-4 border-black bg-black font-mono-8bit text-sm text-white hover:text-[color:var(--lime)] transition-colors"
              title="LinkedIn"
            >
              <PixelLinkedIn size={24} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
