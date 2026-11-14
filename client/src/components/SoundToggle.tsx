import { play, setSoundOn, useSoundOn } from '@/hooks/useSound';

/**
 * Bottom-left row of floating controls (menu, Pause motion, Sound). The chat
 * launcher owns bottom-right; toasts stack above this row (App.tsx).
 */
export const FLOAT_DOCK = 'fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-3';

/**
 * Sound is off until the visitor turns it on here; every play() call reads
 * the same switch. On = ink and pressed into its shadow, like Pause motion.
 * Icon-only below 1536px so the dock covers less of the page; the name stays
 * for screen readers (and as a tooltip), aria-pressed carries the state.
 */
export default function SoundToggle() {
  const on = useSoundOn();

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
      className={`btn focus-ring-float min-w-[44px] px-3 ${
        on ? 'bg-[var(--bar)] text-[color:var(--paper)] translate-x-1 translate-y-1 shadow-none [--float-shadow:0_0_transparent]' : 'bg-[var(--paper)] text-black'
      }`}
    >
      <span aria-hidden="true">♪</span>
      <span className="sr-only 2xl:not-sr-only">Sound</span>
      {/* State word for sighted visitors on wide screens; aria-pressed carries it for screen readers */}
      <span aria-hidden="true" className="hidden 2xl:inline">{on ? 'ON' : 'OFF'}</span>
    </button>
  );
}
