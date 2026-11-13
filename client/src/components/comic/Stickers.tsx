// Stickers scattered in the side gutters of Home sections: John's own pixel
// art (public/assets/stickers/, unchanged) plus five original pixel icons
// (public/assets/pixel/sticker-*.svg). Decoration only: shown only where the
// gutter beside the section's content fits them, so they never sit on
// content; hidden from assistive tech; static (no motion).

type Sticker = {
  src: string;
  side: 'left' | 'right';
  /** distance from the section top, as a % of its height */
  top: number;
  rotate: number;
  /** pixel icons drawn on a 16px grid stay crisp; John's art is downscaled */
  pixel?: boolean;
};

const J = (n: string) => `/assets/stickers/${n}.png`;
const P = (n: string) => `/assets/pixel/sticker-${n}.svg`;

const SETS: Record<string, Sticker[]> = {
  about: [
    { src: J('pixel-heart'), side: 'left', top: 12, rotate: -8 },
    { src: J('coffee-cup'), side: 'right', top: 30, rotate: 6 },
    { src: J('ace-card'), side: 'left', top: 68, rotate: 4 },
  ],
  experience: [
    { src: J('retro-computer'), side: 'right', top: 8, rotate: 6 },
    { src: P('folder'), side: 'left', top: 30, rotate: -6, pixel: true },
    { src: J('cursor-arrow'), side: 'right', top: 55, rotate: -4 },
    { src: P('notepad'), side: 'left', top: 78, rotate: 5, pixel: true },
  ],
  projects: [
    { src: J('arcade'), side: 'left', top: 8, rotate: -5 },
    { src: P('cd'), side: 'right', top: 25, rotate: 10, pixel: true },
    { src: J('striped-roll'), side: 'left', top: 50, rotate: 6 },
    { src: P('magnifier'), side: 'right', top: 72, rotate: -6, pixel: true },
  ],
  skills: [
    { src: J('cookie'), side: 'right', top: 10, rotate: -8 },
    { src: J('eyeball'), side: 'left', top: 35, rotate: 4 },
    { src: J('anatomical-heart'), side: 'right', top: 62, rotate: 6 },
    { src: P('phone'), side: 'left', top: 85, rotate: -5, pixel: true },
  ],
};

// Content width per section (max-w-5xl = 1024, Projects max-w-6xl = 1152) and
// the smallest viewport whose gutter, (viewport - width) / 2, is at least 96px
const LAYOUT: Record<string, { width: number; show: string }> = {
  about: { width: 1024, show: 'xl:block' },
  experience: { width: 1024, show: 'xl:block' },
  projects: { width: 1152, show: 'min-[1360px]:block' },
  skills: { width: 1024, show: 'xl:block' },
};

export default function Stickers({ set }: { set: keyof typeof SETS }) {
  const { width, show } = LAYOUT[set];
  // Offset from the screen edge: a 72px sticker ends 8px short of the content
  // (never under 8px from the edge)
  const edge = `max(8px, calc((100% - ${width}px) / 2 - 80px))`;
  return (
    <div aria-hidden="true" className={`hidden ${show} pointer-events-none absolute inset-0 z-0`}>
      {SETS[set].map(s => (
        <span
          key={s.src}
          className="absolute grid place-items-center size-[72px]"
          style={{ top: `${s.top}%`, [s.side]: edge, transform: `rotate(${s.rotate}deg)` }}
        >
          <img
            src={s.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`max-w-full max-h-full [filter:drop-shadow(3px_3px_0_#000)] ${s.pixel ? 'size-16 [image-rendering:pixelated]' : ''}`}
          />
        </span>
      ))}
    </div>
  );
}
