/**
 * Footer: violet band in three columns, like a retro site footer. Contact CTA
 * with the email button, places to find me, and the SGT clock + terminal hint.
 * Cream text on violet only.
 */

import { useState, useEffect } from 'react';
import { PixelGitHub, PixelLinkedIn } from '@/components/PixelIcons';
import PixelArt from '@/components/PixelArt';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToSection } from '@/lib/utils';

const LINK_CLASS =
  'min-h-[44px] inline-flex items-center gap-3 font-mono text-[15px] sm:text-base font-bold underline-offset-4 decoration-2 hover:underline';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

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
  const reduced = useReducedMotion();

  return (
    // Extra bottom padding so the floating controls and chat button never cover the last row
    <footer className="bg-[var(--bar)] text-[color:var(--paper)] border-t-[3px] border-black px-4 sm:px-8 lg:px-16 pt-16 pb-28 sm:pt-20 [--focus:var(--paper)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 md:gap-10">
        {/* Contact CTA */}
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <PixelArt name="icon-contact" size={32} lazy className="mt-1" />
            <h2 className="font-pixel text-[22px] sm:text-[28px] leading-snug">
              Hiring for 2027? Let's talk.
            </h2>
          </div>
          <p className="font-mono-8bit text-[15px] sm:text-base max-w-[40ch] leading-relaxed">
            Open to AI, data and software graduate roles. Graduating April 2027.
          </p>
          <a href="mailto:johnaaronmb@gmail.com" className="btn btn-primary">
            <PixelArt name="icon-contact" size={16} lazy />
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
                <PixelGitHub size={16} />
                GitHub{NEW_TAB}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/john-branzuela/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                <PixelLinkedIn size={16} />
                LinkedIn{NEW_TAB}
              </a>
            </li>
            <li>
              <a href="mailto:johnaaronmb@gmail.com" className={`${LINK_CLASS} break-all`}>
                <PixelArt name="icon-contact" size={16} lazy />
                johnaaronmb@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Clock + terminal Easter egg hint */}
        <div className="space-y-4">
          {sgtTime && (
            <p className="flex items-center gap-3 font-pixel text-sm leading-snug tabular-nums">
              <PixelArt name="globe" size={24} lazy />
              <span>SGT {sgtTime}<span className="sr-only"> Singapore time</span></span>
            </p>
          )}
          <p className="font-mono text-[15px] sm:text-base leading-relaxed">
            Open the terminal and try{' '}
            <button
              type="button"
              className="min-h-[44px] inline-flex items-center px-1 font-bold underline underline-offset-4 decoration-2 transition-[background-color,color] duration-150 hover:bg-[var(--paper)] hover:text-[color:var(--bar)]"
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
            >
              {'>'} sudo hire-me
            </button>
          </p>
          <p className="font-mono-8bit text-sm">
            © {currentYear} John Aaron Mendoza Branzuela
          </p>
          {/* Back to the top of the page; focus moves to <main> so Tab starts there */}
          <a
            href="#main"
            onClick={(e) => { e.preventDefault(); scrollToSection('main', reduced); }}
            className={LINK_CLASS}
          >
            <span aria-hidden="true">↑</span>
            Back to top
          </a>
          {/* Sign-off sticker, in the flow below the copyright (not over text) */}
          <PixelArt name="starburst" size={96} lazy className="hidden md:block" />
        </div>
      </div>
    </footer>
  );
}
