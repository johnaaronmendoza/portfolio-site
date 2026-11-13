import type { CSSProperties } from 'react';
import PixelArt from './PixelArt';

type RibbonTone = 'ink' | 'blue';

interface RibbonProps {
  /** Phrases on the strip; each is followed by a sparkle separator */
  items: string[];
  tone?: RibbonTone;
  reverse?: boolean;
  className?: string;
}

// Approved pairings: paper on ink (18.9:1), black on blue
const TONES: Record<RibbonTone, string> = {
  ink: 'bg-[var(--bar)] text-[color:var(--paper)]',
  blue: 'bg-[var(--blue)] text-black',
};

// Lower-bound glyph advance: IBM Plex Mono is 0.6em wide (8.4px at text-sm,
// 9.6px at sm:text-base); 8px errs towards extra repeats, never a gap.
const CHAR_PX = 8;
const SEPARATOR_PX = 16 + 2 * 16; // sparkle plus the gap either side
const MIN_HALF_PX = 4200; // each half of the loop must be wider than a wide screen
const SPEED_PX_PER_S = 60; // same scroll speed whatever the text length

/**
 * Decorative marquee strip between sections. Its words exist elsewhere on the
 * page, so it is hidden from assistive tech.
 */
export default function Ribbon({
  items,
  tone = 'ink',
  reverse = false,
  className = '',
}: RibbonProps) {
  const groupPx = items.join('').length * CHAR_PX + items.length * SEPARATOR_PX;
  const repeats = Math.max(2, Math.ceil(MIN_HALF_PX / groupPx));
  const duration = Math.round((repeats * groupPx) / SPEED_PX_PER_S);

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden select-none border-y-[3px] border-black py-3 sm:py-4 ${TONES[tone]} ${className}`}
    >
      <div
        className={`ribbon-track ${reverse ? 'ribbon-track--reverse' : ''}`}
        style={{ '--ribbon-duration': `${duration}s` } as CSSProperties}
      >
        {Array.from({ length: repeats * 2 }, (_, i) => (
          <span key={i} className="flex items-center">
            {items.map(item => (
              <span key={item} className="flex items-center">
                <span className="font-label text-sm sm:text-base whitespace-pre">{item}</span>
                <PixelArt name="sparkle" size={16} lazy className="mx-4" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
