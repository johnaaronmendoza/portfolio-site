import { useId } from 'react';
import Burst from './comic/Burst';

/** burst: a white comic POW star behind the value (one per strip at most) */
export type Stat = { value: string; label: string; burst?: boolean };

type Variant = 'band' | 'status' | 'inline';

interface StatStripProps {
  stats: Stat[];
  /** band: Home's strip under the hero; status: a case-study header window's
   *  last row; inline: big-number callouts inside a window body (no shadow) */
  variant: Variant;
  className?: string;
}

// Cells are size containers, so the cqi caps keep a 6-glyph value ("89.61%")
// inside its cell at every width from 320px; inline allows "1.757 m".
const CELL: Record<Variant, string> = {
  band: 'px-4 py-6 sm:px-6 sm:py-8 [container-type:inline-size]',
  status: 'p-4 [container-type:inline-size]',
  inline: 'p-3 sm:p-4 [container-type:inline-size]',
};

const VALUE: Record<Variant, string> = {
  // Plex Mono is about 0.6em per glyph, so values can run larger than the
  // old pixel face and still fit "89.61%" from 320px up
  band: 'text-[length:min(36px,22cqi)] sm:text-[length:min(52px,22cqi)] lg:text-[length:min(44px,22cqi)] xl:text-[length:min(56px,22cqi)]',
  status: 'text-[length:min(36px,22cqi)] lg:text-[length:min(42px,22cqi)]',
  inline: 'text-[length:min(40px,20cqi)]',
};

const FRAME: Record<Variant, string> = {
  band: '',
  status: 'border-t-[3px] border-black',
  inline: 'border-[3px] border-black',
};

// Inline: as many columns as cells from lg (max 4); 2 below lg
const INLINE_LG_COLS = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4'];

/**
 * Orange figure cells on black: 3px gaps draw the dividers. Label first in the
 * DOM for screen readers, number shown on top. Values render final (no count-up).
 */
export default function StatStrip({ stats, variant, className = '' }: StatStripProps) {
  const headingId = useId();
  const inline = variant === 'inline';
  const lgCols = inline ? INLINE_LG_COLS[Math.min(stats.length, 4)] : 'lg:grid-cols-4';
  const list = (
    <dl className={`grid grid-cols-2 ${lgCols} gap-[3px] bg-black text-black ${FRAME[variant]} ${className}`}>
      {stats.map(({ value, label, burst }, i) => (
        <div
          key={label}
          className={`flex flex-col-reverse justify-end gap-3 bg-[var(--yellow)] ${CELL[variant]} ${
            // An odd last cell spans the 2-column row below lg
            inline && stats.length % 2 === 1 && i === stats.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <dt className="font-mono text-[15px] sm:text-base leading-snug max-w-[18ch]">
            {label}
          </dt>
          <dd className={`relative isolate self-start font-label font-bold tracking-[-0.02em] leading-none tabular-nums ${burst ? 'px-[0.55em] py-[0.45em] -mx-[0.35em] -mt-[0.45em] mb-[0.15em]' : ''} ${VALUE[variant]}`}>
            {/* POW star behind the number only. The padding gives the digits room
                inside the star's inner points; the box (and so the star) ends
                above the label, which sits gap-3 below */}
            {burst && (
              <Burst
                fill="var(--paper)"
                rotate={-4}
                className="absolute -inset-x-[8%] -inset-y-[10%] -z-10 pointer-events-none"
              />
            )}
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );

  // Home's band is already a labelled section and inline strips sit in one; the
  // case header's strip gets its own (hidden) h2, after the page h1
  if (variant !== 'status') return list;
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">Key figures</h2>
      {list}
    </section>
  );
}
