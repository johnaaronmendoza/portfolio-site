// Lil Johnny, John's original pixel mascot, self-hosted. Every pose shares one
// 47x64 canvas, centred on the feet (baseline row 63; see poses/sheet.json), so
// swapping frames never shifts him. Draw with image-rendering: pixelated at an
// integer scale of MASCOT_PX.

export type Pose =
  | 'idle' | 'happy' | 'worry' | 'wrong'
  | 'lean-left' | 'lean-right' | 'crouch' | 'jump' | 'land' | 'celebrate' | 'thumbs-up';

/** Native canvas size of every frame, in px */
export const MASCOT_PX = { w: 47, h: 64 };

const POSES: Pose[] = ['idle', 'happy', 'worry', 'wrong', 'lean-left', 'lean-right', 'crouch', 'jump', 'land', 'celebrate', 'thumbs-up'];

export const MASCOT = Object.fromEntries(POSES.map(p => [p, `/assets/mascot/poses/${p}.png`])) as Record<Pose, string>;

let preloaded = false;

/** Fetch every frame once, so swapping src between poses never flickers. */
export function preloadMascot() {
  if (preloaded || typeof Image === 'undefined') return;
  preloaded = true;
  Object.values(MASCOT).forEach(src => {
    new Image().src = src;
  });
}
