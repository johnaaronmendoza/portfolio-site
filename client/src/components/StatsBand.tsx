type Stat = { value: string; label: string };

// Only figures already on the site: internships (Experience), the six projects
// with case studies (GreenLoopFarms was a pitch, not a build), UWB model
// accuracy and the SCS Awareness Platform's languages (EN/CN/Malay/Tamil).
// Number sizes are capped so "89.6%" fits its cell from 360px to 1366px.
const STATS: Stat[] = [
  { value: '2', label: 'industry internships' },
  { value: '6', label: 'projects built' },
  { value: '89.6%', label: 'ML model accuracy' },
  { value: '4', label: 'languages on the SCS platform' },
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
        className="hidden md:flex flex-shrink-0 items-center bg-[var(--cream)] px-6 lg:px-8 font-pixel text-xl lg:text-2xl"
      >
        HELLO!
      </p>
      <dl className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
        {STATS.map(({ value, label }) => (
          // Label first in the DOM for screen readers; number shown on top
          <div key={label} className="flex flex-col-reverse justify-end gap-3 bg-[var(--orange)] px-4 py-6 sm:px-6 sm:py-8">
            <dt className="font-mono text-[15px] sm:text-base leading-snug max-w-[18ch]">
              {label}
            </dt>
            <dd className="font-pixel text-[24px] sm:text-[36px] lg:text-[30px] xl:text-[38px] leading-none tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
