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
  /** John's PNGs: intrinsic size, so the box is reserved before they load */
  w?: number;
  h?: number;
};

const J = (n: string) => `/assets/stickers/${n}.png`;
const P = (n: string) => `/assets/pixel/sticker-${n}.svg`;

// Work objects only, at most two per section, none repeated (Nov 2026). John's
// other stickers stay in public/assets/stickers/ but are not shown (see its README).
const SETS: Record<string, Sticker[]> = {
  about: [{ src: P('notepad'), side: 'right', top: 30, rotate: 6, pixel: true }],
  experience: [
    { src: J('retro-computer'), side: 'right', top: 8, rotate: 6, w: 159, h: 160 },
    { src: P('folder'), side: 'left', top: 45, rotate: -6, pixel: true },
  ],
  projects: [
    { src: P('cd'), side: 'right', top: 25, rotate: 10, pixel: true },
    { src: P('magnifier'), side: 'left', top: 65, rotate: -6, pixel: true },
  ],
  skills: [
    { src: J('cursor-arrow'), side: 'left', top: 15, rotate: -4, w: 92, h: 160 },
    { src: P('phone'), side: 'right', top: 45, rotate: -5, pixel: true },
  ],
};

// Smallest gap from the screen edge: the right side clears the section dots
// (fixed, 8-52px from the right edge at lg+)
const MIN_EDGE = { left: 8, right: 60 };

// Every section's content is max-w-6xl (1152px). Per side, the smallest
// viewport whose gutter, (viewport - 1152) / 2, fits the edge gap + a 72px
// sticker + 16px to the content (96px left, 148px right); placed 24px short of
// the content, so a rotated sticker still clears it by 16px
const WIDTH = 1152;
const SHOW: Record<Sticker['side'], string> = { left: 'min-[1360px]:grid', right: 'min-[1450px]:grid' };

export default function Stickers({ set }: { set: keyof typeof SETS }) {
  // Offset from the screen edge: a 72px sticker ends 24px short of the content
  const edge = (side: Sticker['side']) => `max(${MIN_EDGE[side]}px, calc((100% - ${WIDTH}px) / 2 - 96px))`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {SETS[set].map(s => (
        <span
          key={s.src}
          className={`absolute hidden ${SHOW[s.side]} place-items-center size-[72px]`}
          style={{ top: `${s.top}%`, [s.side]: edge(s.side), transform: `rotate(${s.rotate}deg)` }}
        >
          <img
            src={s.src}
            alt=""
            width={s.w ?? 16}
            height={s.h ?? 16}
            loading="lazy"
            decoding="async"
            // object-contain: the PNGs keep their shape inside the 72px box
            className={`[filter:drop-shadow(3px_3px_0_#000)] ${s.pixel ? 'size-16 [image-rendering:pixelated]' : 'size-full object-contain'}`}
          />
        </span>
      ))}
    </div>
  );
}
