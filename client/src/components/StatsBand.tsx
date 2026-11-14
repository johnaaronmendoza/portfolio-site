import PixelArt from './PixelArt';
import StatStrip, { type Stat } from './StatStrip';

// Only figures already on the site and the resume. Work leads (LGA Telecom,
// Sembcorp, from Experience); the one coursework figure (UWB, a team project)
// comes last, without the burst. Desk Assist has no figure: it is in progress.
// Values scale with their cell (StatStrip), so "89.61%" fits from 320px up.
const STATS: Stat[] = [
  { value: '40%', label: 'fewer manual agent actions', source: 'LGA Telecom', burst: true },
  { value: '1,000+', label: 'network configurations migrated', source: 'LGA Telecom' },
  { value: '50+', label: 'UAT defects tracked to resolution', source: 'Sembcorp Solar' },
  { value: '89.61%', label: 'ML classifier accuracy, 41,996 samples', source: 'UWB team coursework' },
];

/**
 * Key figures strip under the hero, with a "HELLO!" sticker from md. The black background shows through
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
