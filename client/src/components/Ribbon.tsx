import type { CSSProperties } from 'react';

type RibbonTone = 'lime' | 'cobalt' | 'amber';

interface RibbonProps {
  /** Phrases on the band; joined with ✦ separators */
  items: string[];
  tone?: RibbonTone;
  /** Rotation in degrees; keep within ±2–6 */
  tilt?: number;
  reverse?: boolean;
  className?: string;
}

// Approved pairings: black on lime or amber, white on cobalt
const TONES: Record<RibbonTone, string> = {
  lime: 'bg-[var(--lime)] text-black',
  amber: 'bg-[var(--amber)] text-black',
  cobalt: 'bg-[var(--cobalt)] text-white',
};

const CHAR_PX = 17; // rough advance of one pixel-font glyph at sm:text-base
const MIN_HALF_PX = 3200; // each half of the loop must be wider than a wide screen
const SPEED_PX_PER_S = 60; // same scroll speed whatever the text length

/**
 * Decorative slanted ticker band. Its words exist elsewhere on the page, so it
 * is hidden from assistive tech.
 */
export default function Ribbon({
  items,
  tone = 'lime',
  tilt = -3,
  reverse = false,
  className = '',
}: RibbonProps) {
  const phrase = `${items.join(' ✦ ')} ✦ `;
  const groupPx = phrase.length * CHAR_PX;
  const repeats = Math.max(2, Math.ceil(MIN_HALF_PX / groupPx));
  const duration = Math.round((repeats * groupPx) / SPEED_PX_PER_S);

  // The band is 110% wide, so after rotating each end rises 55% × sin(tilt)
  // of the page width. Percentage padding is measured against width, so this
  // reserves exactly that room and the overflow-hidden wrapper clips nothing
  // that matters and never scrolls sideways.
  const pad = `${(55 * Math.sin((Math.abs(tilt) * Math.PI) / 180)).toFixed(2)}%`;

  return (
    <div
      aria-hidden="true"
      // Only the band takes the pointer, so crossed ribbons each pause on hover
      className={`overflow-hidden select-none pointer-events-none ${className}`}
      style={{ paddingBlock: pad }}
    >
      <div
        className={`pointer-events-auto -mx-[5%] border-y-4 border-black py-3 sm:py-4 ${TONES[tone]}`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div
          className={`ribbon-track ${reverse ? 'ribbon-track--reverse' : ''}`}
          style={{ '--ribbon-duration': `${duration}s` } as CSSProperties}
        >
          {Array.from({ length: repeats * 2 }, (_, i) => (
            <span key={i} className="font-pixel text-sm sm:text-base whitespace-pre">
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
