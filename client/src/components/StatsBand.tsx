type Stat = { value: string; label: string };

// Only figures already on the site: internships (Experience), the six projects
// with case studies (GreenLoopFarms was a pitch, not a build), UWB model
// accuracy and the SCS Awareness Platform's languages (EN/CN/Malay/Tamil).
// Number sizes are capped so "89.6%" fits its column from 360px to 1366px.
const STATS: Stat[] = [
  { value: '2', label: 'industry internships' },
  { value: '6', label: 'projects built' },
  { value: '89.6%', label: 'ML model accuracy' },
  { value: '4', label: 'languages on the SCS platform' },
];

export default function StatsBand() {
  return (
    <section
      aria-label="Key figures"
      className="bg-[var(--lime)] text-black border-y-4 border-black px-4 sm:px-8 lg:px-16 py-12 sm:py-16"
    >
      <dl className="max-w-6xl mx-auto grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8">
        {STATS.map(({ value, label }) => (
          // Label first in the DOM for screen readers; number shown on top
          <div key={label} className="flex flex-col-reverse gap-3 border-l-4 border-black pl-4">
            <dt className="font-mono text-[15px] sm:text-base leading-snug max-w-[18ch]">
              {label}
            </dt>
            <dd className="font-pixel text-[24px] sm:text-[40px] xl:text-[44px] leading-none tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
