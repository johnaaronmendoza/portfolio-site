type HeadingTone = 'two-tone' | 'ink';

interface Props {
  text: string; // e.g. "ABOUT ME"
  /** two-tone on navy (orange first word, teal rest and rule); ink on the teal band */
  tone?: HeadingTone;
  className?: string;
}

/**
 * Big pixel h2. On navy the first word is orange and the rest teal; a one-word
 * heading stays orange and the teal rule carries the second tone.
 */
export default function SectionHeading({ text, tone = 'two-tone', className = '' }: Props) {
  const [first, ...rest] = text.split(' ');
  const ink = tone === 'ink';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <h2 className={`font-pixel text-[26px] sm:text-5xl font-bold ${ink ? 'text-black' : 'text-[color:var(--orange)]'}`}>
        {first}
        {rest.length > 0 && (
          <span className={ink ? undefined : 'text-[color:var(--teal)]'}> {rest.join(' ')}</span>
        )}
      </h2>
      <div
        aria-hidden="true"
        className={`flex-1 min-w-6 h-[6px] ${ink ? 'bg-black' : 'bg-[var(--teal)]'}`}
      />
    </div>
  );
}
