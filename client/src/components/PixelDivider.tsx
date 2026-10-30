interface PixelDividerProps {
  variant?: 'default' | 'circuit' | 'wave' | 'dots';
}

export default function PixelDivider({ variant = 'default' }: PixelDividerProps) {
  // circuit: full-width line with evenly-spaced square nodes
  if (variant === 'circuit') {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 py-2 flex items-center gap-0">
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
        <div className="flex items-center gap-6 px-6">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-amber-400"
            />
          ))}
        </div>
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
      </div>
    );
  }

  // wave: thin line with a centered label
  if (variant === 'wave') {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 py-2 flex items-center gap-4">
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
        <span
          className="font-pixel text-[8px] text-amber-400 opacity-40 flex-shrink-0" aria-hidden="true"
        >
          ◆
        </span>
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
      </div>
    );
  }

  // dots: five squares pierced by a horizontal line
  if (variant === 'dots') {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-16 py-2 flex items-center">
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
        <div className="flex items-center gap-8 px-8">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-400 flex-shrink-0"
            />
          ))}
        </div>
        <div className="flex-1 h-px bg-amber-400 opacity-20" />
      </div>
    );
  }

  // default: clean amber line, fading at edges
  return (
    <div className="w-full py-2">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30" />
    </div>
  );
}
