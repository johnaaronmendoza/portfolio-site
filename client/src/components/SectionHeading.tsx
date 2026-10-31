interface Props {
  index: string; // kept so call sites compile; no longer rendered
  text: string;  // e.g. "PROJECTS"
  className?: string;
}

export default function SectionHeading({ text, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 flex-shrink-0">
        {text}
      </h2>
      <div className="flex-1 h-px bg-amber-400 opacity-20" aria-hidden="true" />
    </div>
  );
}
