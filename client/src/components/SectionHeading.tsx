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
  section: 'text-[length:clamp(30px,9vw,40px)] sm:text-5xl lg:text-6xl',
  case: 'text-[length:clamp(26px,7vw,30px)] sm:text-[34px] lg:text-[40px]',
};

/**
 * Big condensed Plex h2. On the page the first word is black and the rest blue;
 * a one-word heading stays black and the blue rule carries the second tone.
 * The mobile size scales with the viewport so a 10-letter word plus the icon
 * fits on one line from 320px.
 */
export default function SectionHeading({ text, tone = 'two-tone', size = 'section', icon, id, className = '' }: Props) {
  const [first, ...rest] = text.split(' ');
  const ink = tone === 'ink';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icon && <PixelArt name={icon} size={32} lazy />}
      <h2 id={id} className={`font-display ${SIZE[size]} text-black`}>
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
