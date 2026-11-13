import PixelArt from './PixelArt';
import StatStrip, { type Stat } from './StatStrip';

// Only figures already on the site: internships (Experience), the six projects
// with case studies (GreenLoopFarms was a pitch, not a build), UWB model
// accuracy and the SCS Awareness Platform's languages (EN/CN/Malay/Tamil).
// Values scale with their cell (StatStrip), so "89.61%" fits from 320px up and
// matches the UWB tile, case page and resume.
const STATS: Stat[] = [
  { value: '2', label: 'internships' },
  { value: '6', label: 'projects built' },
  { value: '89.61%', label: 'UWB model accuracy', burst: true },
  { value: '4', label: 'SCS Awareness Platform languages' },
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
        className="hidden md:flex flex-shrink-0 flex-col items-center justify-center gap-3 bg-[var(--paper)] px-6 lg:px-8 font-pixel text-xl lg:text-2xl"
      >
        <PixelArt name="smiley" size={32} lazy />
        HELLO!
      </p>
      <StatStrip stats={STATS} variant="band" className="flex-1" />
    </section>
  );
}
