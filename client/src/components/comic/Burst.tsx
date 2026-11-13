import type { CSSProperties, ReactNode } from 'react';

// 12-point comic "POW" star: alternating outer and inner radius on a 100×100 box
const POINTS = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 === 0 ? 48 : 33;
  const a = (i * Math.PI) / 12;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');

interface BurstProps {
  /** Fill colour, a palette var such as 'var(--blue)' (paper by default) */
  fill?: string;
  /** Tilt in degrees; small tilts read as hand-placed */
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  /** Sound-effect text set in comic lettering; omit for a plain burst */
  children?: ReactNode;
}

/**
 * Comic starburst with a hard ink outline (no blur, no gradient). Purely
 * decorative: callers hide it from assistive tech when the words also exist
 * as real text, or use it as a background behind real text.
 */
export default function Burst({ fill = 'var(--paper)', rotate = -6, className = '', style, children }: BurstProps) {
  return (
    <span className={`grid place-items-center ${className}`} style={style}>
      {/* Absolutely filling the box the caller positions (className must make
          the burst absolute and give it a size or insets), stretched with
          preserveAspectRatio none. Out of flow, so it can never grow the box */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <polygon
          points={POINTS}
          style={{ fill }}
          stroke="#000"
          strokeWidth={3}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children && (
        <span className="relative font-comic text-center leading-none" style={{ transform: `rotate(${rotate}deg)` }}>
          {children}
        </span>
      )}
    </span>
  );
}
