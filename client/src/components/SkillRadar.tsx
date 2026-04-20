import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILLS = [
  { label: 'FRONTEND',  value: 90 },
  { label: 'LANGUAGES', value: 83 },
  { label: 'DATA/ML',   value: 78 },
  { label: 'DEVOPS',    value: 72 },
  { label: 'BACKEND',   value: 78 },
  { label: 'MOBILE',    value: 78 },
];

const CX = 140, CY = 140, R = 100, N = SKILLS.length;
const LEVELS = [0.33, 0.66, 1];

function angle(i: number) {
  return (i * 2 * Math.PI) / N - Math.PI / 2;
}

function pt(i: number, pct: number) {
  const a = angle(i);
  return { x: CX + R * pct * Math.cos(a), y: CY + R * pct * Math.sin(a) };
}

function polygonStr(values: number[]) {
  return values.map((v, i) => { const p = pt(i, v / 100); return `${p.x},${p.y}`; }).join(' ');
}

function gridStr(pct: number) {
  return Array.from({ length: N }, (_, i) => { const p = pt(i, pct); return `${p.x},${p.y}`; }).join(' ');
}

export default function SkillRadar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const filled = inView ? polygonStr(SKILLS.map(s => s.value)) : polygonStr(SKILLS.map(() => 0));

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 py-6">
      <svg width={280} height={280} viewBox="0 0 280 280" style={{ imageRendering: 'pixelated' }}>
        {/* Grid rings */}
        {LEVELS.map((lvl, li) => (
          <polygon
            key={li}
            points={gridStr(lvl)}
            fill="none"
            stroke={li === 2 ? '#F59E0B' : '#27272A'}
            strokeWidth={li === 2 ? 1.5 : 1}
            opacity={li === 2 ? 0.4 : 0.6}
          />
        ))}

        {/* Axis lines */}
        {SKILLS.map((_, i) => {
          const outer = pt(i, 1);
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={outer.x} y2={outer.y}
              stroke="#27272A"
              strokeWidth={1}
            />
          );
        })}

        {/* Skill polygon — animated */}
        <motion.polygon
          points={polygonStr(SKILLS.map(() => 0))}
          fill="#F59E0B"
          fillOpacity={0.15}
          stroke="#F59E0B"
          strokeWidth={1.5}
          animate={inView ? { points: filled } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Skill dots */}
        {SKILLS.map((s, i) => {
          const p = pt(i, s.value / 100);
          return (
            <motion.rect
              key={i}
              x={p.x - 3} y={p.y - 3}
              width={6} height={6}
              fill="#F59E0B"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.2, delay: 0.6 + i * 0.05 }}
            />
          );
        })}

        {/* Labels */}
        {SKILLS.map((s, i) => {
          const LABEL_R = R + 22;
          const a = angle(i);
          const lx = CX + LABEL_R * Math.cos(a);
          const ly = CY + LABEL_R * Math.sin(a);
          const anchor =
            Math.abs(Math.cos(a)) < 0.1 ? 'middle' :
            Math.cos(a) > 0 ? 'start' : 'end';

          return (
            <text
              key={i}
              x={lx} y={ly + 4}
              textAnchor={anchor}
              fontFamily="'Press Start 2P', monospace"
              fontSize={6}
              fill="#F59E0B"
              opacity={0.85}
            >
              {s.label}
            </text>
          );
        })}

        {/* Center dot */}
        <rect x={CX - 2} y={CY - 2} width={4} height={4} fill="#F59E0B" opacity={0.5} />
      </svg>
    </div>
  );
}
