/**
 * Footer: violet band in three columns, like a retro site footer. Contact CTA
 * with the email button, places to find me, and the SGT clock + terminal hint.
 * Cream text on violet only.
 */

import { useState, useEffect } from 'react';
import { PixelGitHub, PixelLinkedIn, PixelEmail } from '@/components/PixelIcons';

const LINK_CLASS =
  'min-h-[44px] inline-flex items-center gap-3 font-mono text-[15px] sm:text-base font-bold underline-offset-4 decoration-2 hover:underline';

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
    <footer className="bg-[var(--violet)] text-[color:var(--cream)] border-t-[3px] border-black px-4 sm:px-8 lg:px-16 py-16 sm:py-20 [--focus:var(--cream)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 md:gap-10">
        {/* Contact CTA */}
        <div className="space-y-5">
          <h2 className="font-pixel text-[22px] sm:text-[28px] leading-snug">
            Let's build something
          </h2>
          <p className="font-mono-8bit text-[15px] sm:text-base max-w-[40ch] leading-relaxed">
            Open to graduate roles, collaborations and interesting projects.
            Graduating April 2027.
          </p>
          <a href="mailto:johnaaronmb@gmail.com" className="btn btn-primary">
            <PixelEmail size={20} />
            Email me
          </a>
        </div>

        {/* Socials */}
        <div className="space-y-4">
          <h3 className="font-pixel text-sm leading-snug">Find me on</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/johnaaronmendoza"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <PixelGitHub size={20} fg="currentColor" />
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/john-branzuela/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <PixelLinkedIn size={20} />
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href="mailto:johnaaronmb@gmail.com" className={LINK_CLASS}>
                <PixelEmail size={20} />
                johnaaronmb@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Clock + terminal Easter egg hint */}
        <div className="space-y-4">
          {sgtTime && (
            <p className="font-pixel text-sm leading-snug tabular-nums">
              SGT {sgtTime}
            </p>
          )}
          <p className="font-mono text-[15px] sm:text-base leading-relaxed">
            Open the terminal and try{' '}
            <button
              className="min-h-[44px] inline-flex items-center px-1 font-bold underline underline-offset-4 decoration-2 transition-[background-color,color] duration-150 hover:bg-[var(--cream)] hover:text-[color:var(--violet)]"
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
            >
              {'>'} sudo hire-me
            </button>
          </p>
          <p className="font-mono-8bit text-sm">
            © {currentYear} John Aaron Mendoza Branzuela
          </p>
        </div>
      </div>
    </footer>
  );
}
