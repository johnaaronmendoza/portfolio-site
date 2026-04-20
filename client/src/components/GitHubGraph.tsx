import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Amber shade by contribution level
const LEVEL_COLOR = [
  '#18181B', // 0 — zinc-900
  '#78350F', // 1 — amber-900
  '#B45309', // 2 — amber-700
  '#D97706', // 3 — amber-500
  '#F59E0B', // 4 — amber-400
];

const CELL = 11; // px per cell (square + gap)
const WEEKS = 52;

function groupByWeek(days: Day[]): Day[][] {
  const weeks: Day[][] = [];
  let week: Day[] = [];
  days.forEach(d => {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length) weeks.push(week);
  return weeks.slice(-WEEKS);
}

export default function GitHubGraph() {
  const [weeks, setWeeks]   = useState<Day[][]>([]);
  const [total, setTotal]   = useState(0);
  const [error, setError]   = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/johnaaronmendoza?y=last')
      .then(r => r.json())
      .then(data => {
        const days: Day[] = data.contributions ?? [];
        setWeeks(groupByWeek(days));
        const yr = new Date().getFullYear().toString();
        setTotal(data.total?.[yr] ?? days.reduce((s: number, d: Day) => s + d.count, 0));
      })
      .catch(() => setError(true));
  }, []);

  const MONTH_LABELS = (() => {
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((wk, wi) => {
      if (!wk[0]) return;
      const m = new Date(wk[0].date).getMonth();
      if (m !== lastMonth) {
        labels.push({ label: new Date(wk[0].date).toLocaleString('en', { month: 'short' }), col: wi });
        lastMonth = m;
      }
    });
    return labels;
  })();

  return (
    <div ref={ref} className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-zinc-500">
          GitHub activity
          {total > 0 && <span className="text-amber-400 ml-2">{total.toLocaleString()} contributions this year</span>}
        </span>
        <a
          href="https://github.com/johnaaronmendoza"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-zinc-600 hover:text-amber-400 transition-colors"
        >
          @johnaaronmendoza ↗
        </a>
      </div>

      {error ? (
        <div className="font-mono text-xs text-zinc-700 border border-zinc-800 p-4 text-center">
          [ contribution graph unavailable ]
        </div>
      ) : weeks.length === 0 ? (
        <div className="font-mono text-xs text-zinc-700 animate-pulse">loading graph...</div>
      ) : (
        <div className="overflow-x-auto">
          <div style={{ position: 'relative', paddingTop: 18 }}>
            {/* Month labels */}
            {MONTH_LABELS.map(({ label, col }) => (
              <span
                key={col}
                className="absolute font-mono text-[9px] text-zinc-600"
                style={{ left: col * CELL, top: 0 }}
              >
                {label}
              </span>
            ))}

            {/* Grid */}
            <div className="flex gap-[2px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.map((day, di) => (
                    <motion.div
                      key={day.date}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      style={{
                        width: CELL - 2,
                        height: CELL - 2,
                        backgroundColor: LEVEL_COLOR[day.level],
                      }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.15, delay: (wi * 7 + di) * 0.001 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3 justify-end">
              <span className="font-mono text-[9px] text-zinc-600">less</span>
              {LEVEL_COLOR.map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, backgroundColor: c }} />
              ))}
              <span className="font-mono text-[9px] text-zinc-600">more</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
