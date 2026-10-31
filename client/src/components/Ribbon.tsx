import type { CSSProperties } from 'react';

type RibbonTone = 'orange' | 'teal';

interface RibbonProps {
  /** Phrases on the strip; joined with ★ separators */
  items: string[];
  tone?: RibbonTone;
  reverse?: boolean;
  className?: string;
}

// Approved pairings: black on orange or teal
const TONES: Record<RibbonTone, string> = {
  orange: 'bg-[var(--orange)] text-black',
  teal: 'bg-[var(--teal)] text-black',
};

// Lower-bound glyph advance: Press Start 2P is 1em wide (14px at text-sm) and
// fallback glyphs like ★ are narrower, so this errs towards extra repeats.
const CHAR_PX = 14;
const MIN_HALF_PX = 4200; // each half of the loop must be wider than a wide screen
const SPEED_PX_PER_S = 60; // same scroll speed whatever the text length

/**
 * Decorative marquee strip between sections. Its words exist elsewhere on the
 * page, so it is hidden from assistive tech.
 */
export default function Ribbon({
  items,
  tone = 'orange',
  reverse = false,
  className = '',
}: RibbonProps) {
  const phrase = `${items.join(' ★ ')} ★ `;
  const groupPx = phrase.length * CHAR_PX;
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
          <span key={i} className="font-pixel text-sm sm:text-base whitespace-pre">
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
