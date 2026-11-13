// Stickers in the side gutters of Home sections: two of John's own pixel
// art pieces (public/assets/stickers/, unchanged) plus five original pixel icons
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

// Work objects only, at most two per section, none repeated (Nov 2026). John's
// other stickers stay in public/assets/stickers/ but are not shown (see its README).
const SETS: Record<string, Sticker[]> = {
  about: [{ src: P('notepad'), side: 'right', top: 30, rotate: 6, pixel: true }],
  experience: [
    { src: J('retro-computer'), side: 'right', top: 8, rotate: 6 },
    { src: P('folder'), side: 'left', top: 45, rotate: -6, pixel: true },
  ],
  projects: [
    { src: P('cd'), side: 'right', top: 25, rotate: 10, pixel: true },
    { src: P('magnifier'), side: 'left', top: 65, rotate: -6, pixel: true },
  ],
  skills: [
    { src: J('cursor-arrow'), side: 'left', top: 15, rotate: -4 },
    { src: P('phone'), side: 'right', top: 70, rotate: -5, pixel: true },
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
  // Offset from the screen edge: a 72px sticker ends 16px short of the content
  // (never under 8px from the edge)
  const edge = `max(8px, calc((100% - ${width}px) / 2 - 88px))`;
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
