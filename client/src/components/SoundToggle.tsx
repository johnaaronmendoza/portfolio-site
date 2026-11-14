import { play, setSoundOn, useSoundOn } from '@/hooks/useSound';

/**
 * Floating controls (menu, Pause motion, Sound), bottom-left; the chat
 * launcher owns bottom-right and toasts stack above (App.tsx). A row below
 * lg; from lg a column in the left gutter (the menu gives way to the section
 * dots). The case pages have no dock: Sound sits in their header.
 */
export const FLOAT_DOCK =
  'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 lg:left-4 z-40 flex items-center gap-2 lg:flex-col lg:items-stretch [@media(max-height:420px)]:bottom-1';

const PRESSED = 'translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]';

/**
 * A dock button: glyph over a short word, so the state reads without hover.
 * The word hides between lg and 1360px, where the gutter is 64px and only the
 * glyph fits; the glyph and the pressed (ink) fill still show the state there.
 * Glyph only, too, on very short screens (400% zoom), where the dock hugs the
 * bottom edge so it covers as little of the page as it can.
 */
export function dockButton(pressed: boolean): string {
  return `btn focus-ring-float min-w-[44px] flex-col gap-1 px-2 py-1 font-label text-xs leading-none ${
    pressed ? `${PRESSED} bg-[var(--bar)] text-[color:var(--paper)]` : 'bg-[var(--paper)] text-black'
  }`;
}
export const DOCK_WORD = 'whitespace-nowrap lg:max-[1359px]:hidden [@media(max-height:420px)]:hidden';

/** 8x7 pixel glyphs in currentColor, so they invert with the button fill */
const SPEAKER = 'M0 2h2v3H0zM2 1h1v5H2zM3 0h1v7H3z';
const GLYPHS = {
  menu: 'M0 1h8v1H0zM0 3h8v1H0zM0 5h8v1H0z',
  pause: 'M1 1h2v5H1zM5 1h2v5H5z',
  play: 'M2 0h1v7H2zM3 1h1v5H3zM4 2h1v3H4zM5 3h1v1H5z',
  sound: `${SPEAKER}M5 2h1v3H5zM7 1h1v5H7z`,
  mute: `${SPEAKER}M5 2h1v1H5zM7 2h1v1H7zM6 3h1v1H6zM5 4h1v1H5zM7 4h1v1H7z`,
};

export function DockGlyph({ name }: { name: keyof typeof GLYPHS }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 8 7" width="16" height="14" shapeRendering="crispEdges" className="flex-shrink-0">
      <path d={GLYPHS[name]} fill="currentColor" />
    </svg>
  );
}

/**
 * Sound is off until the visitor turns it on here; every play() call reads
 * the same switch. The glyph (speaker with waves or with an ✕) and the word
 * show the state; aria-pressed carries it for screen readers, whose name for
 * the button stays "Sound". `bar`: the case-page header (ghost on black).
 */
export default function SoundToggle({ variant = 'dock' }: { variant?: 'dock' | 'bar' }) {
  const on = useSoundOn();
  const bar = variant === 'bar';

  const toggle = () => {
    setSoundOn(!on);
    if (!on) play('click'); // confirms the switch, only after the visitor asked for sound
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title="Sound"
      className={
        bar
          ? `btn px-3 ${on ? 'bg-[var(--paper)] text-black border-[color:var(--paper)] shadow-none' : 'btn-ghost text-[color:var(--paper)] border-[color:var(--paper)] hover:text-[color:var(--text)]'}`
          : dockButton(on)
      }
    >
      <DockGlyph name={on ? 'sound' : 'mute'} />
      <span className="sr-only">Sound</span>
      {/* "Off" / "On" where space is short, "Sound off" where it fits */}
      <span aria-hidden="true" className={bar ? 'whitespace-nowrap' : DOCK_WORD}>
        <span className={bar ? 'max-sm:hidden' : 'hidden min-[1360px]:inline'}>Sound </span>
        <span className={bar ? 'max-sm:capitalize' : 'max-[1359px]:capitalize'}>{on ? 'on' : 'off'}</span>
      </span>
    </button>
  );
}
