import { useId } from 'react';

export type Stat = { value: string; label: string };

type Variant = 'band' | 'status' | 'inline';

interface StatStripProps {
  stats: Stat[];
  /** band: Home's strip under the hero; status: a case-study header window's
   *  last row; inline: big-number callouts inside a window body (no shadow) */
  variant: Variant;
  className?: string;
}

// Band and inline cells are size containers, so 15cqi keeps a 6-glyph value
// ("89.61%" is 6.3em wide in the pixel font) inside its cell at every width
const CELL: Record<Variant, string> = {
  band: 'px-4 py-6 sm:px-6 sm:py-8 [container-type:inline-size]',
  status: 'p-4',
  inline: 'p-3 sm:p-4 [container-type:inline-size]',
};

const VALUE: Record<Variant, string> = {
  band: 'text-[length:min(24px,15cqi)] sm:text-[length:min(36px,15cqi)] lg:text-[length:min(30px,15cqi)] xl:text-[length:min(38px,15cqi)]',
  // At most 6 glyphs, so a 2x2 cell holds the value from 320px up (MASTER 2.11)
  status: 'text-[length:clamp(18px,5.4vw,24px)] lg:text-[28px]',
  inline: 'text-[length:min(28px,15cqi)]',
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
      {stats.map(({ value, label }, i) => (
        <div
          key={label}
          className={`flex flex-col-reverse justify-end gap-3 bg-[var(--orange)] ${CELL[variant]} ${
            // An odd last cell spans the 2-column row below lg
            inline && stats.length % 2 === 1 && i === stats.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <dt className="font-mono text-[15px] sm:text-base leading-snug max-w-[18ch]">
            {label}
          </dt>
          <dd className={`font-pixel leading-none tabular-nums ${VALUE[variant]}`}>
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
