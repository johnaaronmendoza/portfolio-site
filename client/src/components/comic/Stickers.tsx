// Original pixel stickers (public/assets/pixel/sticker-*.svg, drawn for the
// site in Nov 2026) scattered in the side gutters of Home sections.
// Decoration only: shown only where the gutter beside the section's content
// fits a 64px sticker with room to spare, so it never sits on content; hidden
// from assistive tech; static (no motion).

type Sticker = {
  name: 'heart' | 'cursor' | 'cookie' | 'coffee' | 'card' | 'cd' | 'folder' | 'phone' | 'notepad' | 'magnifier';
  side: 'left' | 'right';
  /** distance from the section top, as a % of its height */
  top: number;
  rotate: number;
};

const SETS: Record<string, Sticker[]> = {
  about: [
    { name: 'heart', side: 'left', top: 18, rotate: -8 },
    { name: 'coffee', side: 'right', top: 58, rotate: 6 },
  ],
  experience: [
    { name: 'folder', side: 'right', top: 12, rotate: 8 },
    { name: 'notepad', side: 'left', top: 46, rotate: -6 },
    { name: 'phone', side: 'right', top: 80, rotate: -4 },
  ],
  projects: [
    { name: 'cursor', side: 'left', top: 10, rotate: -10 },
    { name: 'cd', side: 'right', top: 40, rotate: 10 },
    { name: 'magnifier', side: 'left', top: 74, rotate: 6 },
  ],
  skills: [
    { name: 'cookie', side: 'right', top: 16, rotate: -8 },
    { name: 'card', side: 'left', top: 62, rotate: 8 },
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
  // Offset from the screen edge: the 64px sticker ends 16px short of the content (never under 8px from the edge)
  const edge = `max(8px, calc((100% - ${width}px) / 2 - 80px))`;
  return (
    <div aria-hidden="true" className={`hidden ${show} pointer-events-none absolute inset-0 z-0`}>
      {SETS[set].map(s => (
        <img
          key={s.name}
          src={`/assets/pixel/sticker-${s.name}.svg`}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          className="absolute size-16 [image-rendering:pixelated] [filter:drop-shadow(3px_3px_0_#000)]"
          style={{ top: `${s.top}%`, [s.side]: edge, transform: `rotate(${s.rotate}deg)` }}
        />
      ))}
    </div>
  );
}
