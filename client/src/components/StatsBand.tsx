import PixelArt from './PixelArt';
import StatStrip, { type Stat } from './StatStrip';

// Only figures already on the site: internships (Experience), the six projects
// with case studies (GreenLoopFarms was a pitch, not a build), UWB model
// accuracy and the SCS Awareness Platform's languages (EN/CN/Malay/Tamil).
// Number sizes are capped so "89.6%" fits its cell from 360px to 1366px.
const STATS: Stat[] = [
  { value: '2', label: 'industry internships' },
  { value: '6', label: 'projects built' },
  { value: '89.6%', label: 'UWB signal model accuracy' },
  { value: '4', label: 'languages on the SCS Awareness Platform' },
];

/**
 * Orange "HELLO!" strip under the hero. The black background shows through
 * 3px gaps, which draws the dividers between cells.
 */
export default function StatsBand() {
  return (
    <section
      aria-label="Key figures"
      className="bg-black text-black border-y-[3px] border-black flex gap-[3px]"
    >
      <p
        aria-hidden="true"
        className="hidden md:flex flex-shrink-0 flex-col items-center justify-center gap-3 bg-[var(--cream)] px-6 lg:px-8 font-pixel text-xl lg:text-2xl"
      >
        <PixelArt name="smiley" size={32} lazy />
        HELLO!
      </p>
      <StatStrip stats={STATS} variant="band" className="flex-1" />
    </section>
  );
}
