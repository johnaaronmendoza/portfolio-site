type HeadingTone = 'lime' | 'amber' | 'white';

// Lime and amber only on black; use white on cobalt bands
const TONES: Record<HeadingTone, string> = {
  lime: 'text-[color:var(--lime)]',
  amber: 'text-[color:var(--amber)]',
  white: 'text-white',
};

interface Props {
  index: string; // kept so call sites compile; no longer rendered
  text: string;  // e.g. "PROJECTS"
  tone?: HeadingTone;
  className?: string;
}

export default function SectionHeading({ text, tone = 'lime', className = '' }: Props) {
  return (
    <div className={`flex items-center gap-4 ${TONES[tone]} ${className}`}>
      <h2 className="font-pixel text-[26px] sm:text-5xl font-bold">
        {text}
      </h2>
      <div className="flex-1 min-w-6 h-1 bg-current" aria-hidden="true" />
    </div>
  );
}
