/**
 * Footer - 8-Bit Hardware Engineer Portfolio
 * Design: Industrial Retro-Futurism
 * - Minimal footer with gold border
 * - Monospace text
 * - Links to GitHub and LinkedIn
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
    <footer className="bg-black text-white px-4 sm:px-8 lg:px-16 py-12 sm:py-16 border-t-2 border-amber-400">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Contact CTA */}
        <div className="text-center space-y-4">
          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400" aria-hidden="true" />
            <span className="font-mono text-xs text-zinc-400 tracking-wide">Graduating April 2027</span>
          </div>

          <h2 className="font-pixel text-xl sm:text-2xl text-amber-400">
            GET IN TOUCH
          </h2>
          <p className="font-mono-8bit text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Open to graduate roles, collaborations and interesting projects.
          </p>
          <a
            href="mailto:johnaaronmb@gmail.com"
            className="inline-flex items-center gap-3 border-8bit shadow-8bit px-6 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <PixelEmail size={20} />
            Email me
          </a>

          {/* Terminal Easter egg hint */}
          <p className="font-mono text-xs text-zinc-400">
            or open the terminal and try{' '}
            <button
              className="min-h-[44px] inline-flex items-center text-amber-400 hover:text-white transition-colors"
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
            >
              {'>'} sudo hire-me
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="font-mono-8bit text-xs text-zinc-400">
              © {currentYear} John Aaron Mendoza Branzuela
            </p>
            {sgtTime && (
              <span className="font-mono text-xs text-zinc-400 tabular-nums">
                SGT {sgtTime}
              </span>
            )}
          </div>

          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/johnaaronmendoza"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 px-2 font-mono-8bit text-sm text-zinc-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <PixelGitHub size={28} fg="#F59E0B" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/john-branzuela/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 px-2 font-mono-8bit text-sm text-zinc-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <PixelLinkedIn size={28} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
