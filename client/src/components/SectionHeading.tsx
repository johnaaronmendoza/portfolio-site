import PixelArt, { type PixelArtName } from './PixelArt';

type HeadingTone = 'two-tone' | 'ink';

interface Props {
  text: string; // e.g. "ABOUT ME"
  /** two-tone on the page (black first word, blue rest and rule); ink on the blue band */
  tone?: HeadingTone;
  /** section: Home h2; case: the smaller case-study h2 (MASTER 2.11), upper case via CSS */
  size?: 'section' | 'case';
  /** 32px pixel icon to the left of the heading (decorative) */
  icon?: PixelArtName;
  /** For aria-labelledby on the surrounding section */
  id?: string;
  className?: string;
}

const SIZE = {
  section: 'text-[length:clamp(20px,6.5vw,26px)] sm:text-4xl lg:text-5xl',
  case: 'uppercase text-[length:clamp(18px,5.3vw,22px)] sm:text-[28px] lg:text-[32px] leading-[1.3]',
};

/**
 * Big pixel h2. On navy the first word is orange and the rest teal; a one-word
 * heading stays orange and the teal rule carries the second tone.
 * The mobile size scales with the viewport so a 10-letter word plus the icon
 * fits on one line from 320px.
 */
export default function SectionHeading({ text, tone = 'two-tone', size = 'section', icon, id, className = '' }: Props) {
  const [first, ...rest] = text.split(' ');
  const ink = tone === 'ink';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icon && <PixelArt name={icon} size={32} lazy />}
      <h2 id={id} className={`font-pixel ${SIZE[size]} text-black`}>
        {first}
        {rest.length > 0 && (
          <span className={ink ? undefined : 'text-[color:var(--blue-text)]'}> {rest.join(' ')}</span>
        )}
      </h2>
      <div
        aria-hidden="true"
        className={`flex-1 min-w-0 h-[6px] ${ink ? 'bg-black' : 'bg-[var(--blue)]'}`}
      />
    </div>
  );
}
