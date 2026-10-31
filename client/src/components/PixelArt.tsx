export type PixelArtName =
  | 'crt-computer'
  | 'starburst'
  | 'sparkle'
  | 'smiley'
  | 'floppy'
  | 'icon-home'
  | 'icon-about'
  | 'icon-experience'
  | 'icon-projects'
  | 'icon-skills'
  | 'icon-contact'
  | 'globe';

interface PixelArtProps {
  name: PixelArtName;
  /** Rendered size in px; keep it a whole multiple of the SVG's grid */
  size: number;
  /** Below the fold: let the browser defer it */
  lazy?: boolean;
  className?: string;
}

/**
 * Decorative pixel-art SVG from /assets/pixel (see its README). Every one sits
 * beside text that says the same thing, so it is hidden from assistive tech.
 * Explicit width/height reserve the space and avoid layout shift.
 */
export default function PixelArt({ name, size, lazy = false, className = '' }: PixelArtProps) {
  return (
    <img
      src={`/assets/pixel/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      className={`pixel-art ${className}`}
    />
  );
}
