import PixelArt, { type PixelArtName } from './PixelArt';

type HeadingTone = 'two-tone' | 'ink';

interface Props {
  text: string; // e.g. "ABOUT ME"
  /** default: blue shadow and rule on the page; ink: white shadow, black rule on the blue band */
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
  section: 'text-[length:clamp(40px,12vw,52px)] sm:text-6xl lg:text-7xl',
  case: 'text-[length:clamp(32px,9vw,38px)] sm:text-[44px] lg:text-[52px]',
};

/**
 * Big comic-lettered h2 (Bangers) in black with a hard offset shadow; the rule
 * beside it carries the accent colour.
 * The mobile size scales with the viewport so a 10-letter word plus the icon
 * fits on one line from 320px.
 */
export default function SectionHeading({ text, tone = 'two-tone', size = 'section', icon, id, className = '' }: Props) {
  const [first, ...rest] = text.split(' ');
  const ink = tone === 'ink';

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {icon && <PixelArt name={icon} size={32} lazy />}
      {/* Comic lettering with a hard offset shadow: blue on the page, white on
          the blue band (ink tone) so it still separates from the ground */}
      <h2
        id={id}
        className={`font-comic ${SIZE[size]} text-black ${
          ink ? '[text-shadow:4px_4px_0_var(--paper)]' : '[text-shadow:4px_4px_0_var(--blue)]'
        }`}
      >
        {first}
        {rest.length > 0 && <> {rest.join(' ')}</>}
      </h2>
      <div
        aria-hidden="true"
        className={`flex-1 min-w-0 h-[6px] ${ink ? 'bg-black' : 'bg-[var(--blue)]'}`}
      />
    </div>
  );
}
