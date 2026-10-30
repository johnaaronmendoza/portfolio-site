interface Props {
  index: string; // e.g. "01"
  text: string;  // e.g. "PROJECTS"
  className?: string;
}

export default function SectionHeading({ index, text, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono text-sm text-zinc-500 flex-shrink-0 tabular-nums" aria-hidden="true">
        {index} ·
      </span>
      <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 flex-shrink-0">
        {text}
      </h2>
      <div className="flex-1 h-px bg-amber-400 opacity-20" aria-hidden="true" />
    </div>
  );
}
