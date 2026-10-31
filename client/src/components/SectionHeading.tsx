import PixelArt, { type PixelArtName } from './PixelArt';

type HeadingTone = 'two-tone' | 'ink';

interface Props {
  text: string; // e.g. "ABOUT ME"
  /** two-tone on navy (orange first word, teal rest and rule); ink on the teal band */
  tone?: HeadingTone;
  /** 32px pixel icon to the left of the heading (decorative) */
  icon?: PixelArtName;
  className?: string;
}

/**
 * Big pixel h2. On navy the first word is orange and the rest teal; a one-word
 * heading stays orange and the teal rule carries the second tone.
 * The mobile size scales with the viewport so a 10-letter word plus the icon
 * fits on one line from 320px.
 */
export default function SectionHeading({ text, tone = 'two-tone', icon, className = '' }: Props) {
  const [first, ...rest] = text.split(' ');
  const ink = tone === 'ink';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icon && <PixelArt name={icon} size={32} lazy />}
      <h2 className={`font-pixel text-[length:clamp(20px,6.5vw,26px)] sm:text-4xl lg:text-5xl ${ink ? 'text-black' : 'text-[color:var(--orange)]'}`}>
        {first}
        {rest.length > 0 && (
          <span className={ink ? undefined : 'text-[color:var(--teal)]'}> {rest.join(' ')}</span>
        )}
      </h2>
      <div
        aria-hidden="true"
        className={`flex-1 min-w-0 h-[6px] ${ink ? 'bg-black' : 'bg-[var(--teal)]'}`}
      />
    </div>
  );
}
