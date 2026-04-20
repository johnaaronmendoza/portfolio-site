import { useReducedMotion } from '@/hooks/useReducedMotion';

const ITEMS = [
  'REACT',  'TYPESCRIPT',  'PYTHON',  'KOTLIN',  'GRPC',
  'DOCKER', 'KUBERNETES',  'ARCORE',  'TFLITE',  'SUPABASE',
  'NODE.JS','POSTGRESQL',  'SCIKIT-LEARN', 'FRAMER MOTION', 'TAILWIND CSS',
];

const SEP = '◆';

interface MarqueeTickerProps {
  /** Speed multiplier — higher = faster (default 1) */
  speed?: number;
  /** Accent color class for separator dots */
  accentClass?: string;
}

export default function MarqueeTicker({
  speed = 1,
  accentClass = 'text-amber-400',
}: MarqueeTickerProps) {
  const reduced = useReducedMotion();
  const duration = Math.round(32 / speed);

  const track = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  if (reduced) {
    return (
      <div className="border-y border-amber-500/10 py-3 overflow-hidden bg-[#0e0e0e]">
        <div className="flex gap-6 px-6 flex-wrap">
          {ITEMS.map(item => (
            <span key={item} className="font-pixel text-[9px] text-amber-400/50 tracking-widest">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-y border-amber-500/10 py-3 overflow-hidden bg-[#0e0e0e] select-none"
      aria-hidden="true"
    >
      <div
        className="flex items-center gap-8 whitespace-nowrap"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          width: 'max-content',
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className="font-pixel text-[9px] text-amber-400/50 tracking-widest uppercase hover:text-amber-400 transition-colors duration-75">
              {item}
            </span>
            <span className={`text-[6px] ${accentClass} opacity-30`}>{SEP}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
