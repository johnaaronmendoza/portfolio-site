export type Stat = { value: string; label: string };

interface StatStripProps {
  stats: Stat[];
  /** band: Home's strip under the hero; status: a case-study header window's last row */
  variant: 'band' | 'status';
  className?: string;
}

const CELL = {
  band: 'px-4 py-6 sm:px-6 sm:py-8',
  status: 'p-4',
};

const VALUE = {
  band: 'text-[24px] sm:text-[36px] lg:text-[30px] xl:text-[38px]',
  // At most 6 glyphs, so a 2x2 cell holds the value from 320px up (MASTER 2.11)
  status: 'text-[length:clamp(18px,5.4vw,24px)] lg:text-[28px]',
};

/**
 * Orange figure cells on black: 3px gaps draw the dividers. Label first in the
 * DOM for screen readers, number shown on top. Values render final (no count-up).
 */
export default function StatStrip({ stats, variant, className = '' }: StatStripProps) {
  return (
    <dl
      aria-label={variant === 'status' ? 'Key figures' : undefined}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-[3px] bg-black text-black ${variant === 'status' ? 'border-t-[3px] border-black' : ''} ${className}`}
    >
      {stats.map(({ value, label }) => (
        <div key={label} className={`flex flex-col-reverse justify-end gap-3 bg-[var(--orange)] ${CELL[variant]}`}>
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
}
