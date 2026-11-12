/**
 * Static flow diagram in semantic HTML (visual-hierarchy.md §3.2): an ordered
 * list of nodes, so screen readers get the order from the list. Connectors
 * and arrowheads are decorative (aria-hidden, CSS in index.css `.flow-link`).
 * Vertical below lg; a row of `lgCols` from lg. No motion of any kind.
 */

export type FlowActor = 'AI' | 'Agent';

/** A parallel or unordered part of a step: no number, no arrows between them */
export type FlowItem = { label: string; detail?: string };

export type FlowStep = {
  /** ≤ 18 characters */
  label: string;
  /** Optional, ≤ 40 characters */
  detail?: string;
  actor?: FlowActor;
  /** The one step that matters most: orange fill. One per diagram, max */
  emphasis?: boolean;
  /** Parallel branches or an unordered group inside this step */
  items?: FlowItem[];
  /** A return path, shown as a note under the node */
  loop?: string;
};

interface FlowDiagramProps {
  steps: FlowStep[];
  /** id of the visible heading that names the diagram */
  labelledBy: string;
  /** Show step numbers: real sequences only */
  numbered?: boolean;
  /** Nodes per row from lg; 1 keeps the diagram vertical at every width */
  lgCols?: 1 | 3 | 4 | 5;
  className?: string;
}

const LG_COLS = { 1: '', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' } as const;

const ACTOR_FILL: Record<FlowActor, string> = {
  AI: 'bg-[var(--blue)]',
  Agent: 'bg-[var(--paper)]',
};

const LABEL = 'font-mono font-bold text-[15px] sm:text-base leading-[1.4] text-black text-balance';

export default function FlowDiagram({ steps, labelledBy, numbered = true, lgCols = 1, className = '' }: FlowDiagramProps) {
  const row = lgCols > 1;
  // Items sit side by side while the node is full width (one column under 360px,
  // where two would squeeze a 9-letter label), and stack inside a narrow row node
  const itemCols = row ? 'sm:grid-cols-2 lg:grid-cols-1' : 'min-[360px]:grid-cols-2 sm:grid-cols-4';

  return (
    <figure aria-labelledby={labelledBy} className={className}>
      <ol className={`grid grid-cols-1 gap-6 ${LG_COLS[lgCols]} ${row ? 'flow--row' : ''}`}>
        {steps.map(({ label, detail, actor, emphasis, items, loop }, i) => (
          <li key={label} className="relative flex flex-col">
            {i > 0 && (
              <span aria-hidden="true" className={`flow-link ${row && i % lgCols === 0 ? 'flow-link--row-start' : ''}`} />
            )}
            <div
              className={`flex-1 min-h-14 px-3.5 py-3 border-black ${
                emphasis ? 'border-[3px] bg-[var(--yellow)]' : 'border-2 bg-[var(--paper)]'
              }`}
            >
              <div className="flex flex-wrap items-start gap-2">
                {numbered && (
                  <span
                    className={`flex-shrink-0 border-2 border-black px-1.5 py-0.5 font-pixel text-xs text-black tabular-nums ${
                      emphasis ? 'bg-[var(--paper)]' : 'bg-[var(--yellow)]'
                    }`}
                  >
                    {i + 1}
                  </span>
                )}
                <span className={`min-w-0 flex-1 ${LABEL}`}>{label}</span>
                {actor && (
                  <span className={`flex-shrink-0 border-2 border-black px-1.5 py-0.5 font-pixel text-xs text-black ${ACTOR_FILL[actor]}`}>
                    {actor}
                  </span>
                )}
              </div>
              {detail && (
                <p className={`mt-1 font-mono text-[15px] leading-[1.5] ${emphasis ? 'text-black' : 'text-[color:var(--text)]'}`}>
                  {detail}
                </p>
              )}
              {items && (
                <ul className={`mt-3 grid gap-2 ${itemCols}`}>
                  {items.map(item => (
                    <li key={item.label} className="min-w-0 border-2 border-black bg-[var(--paper)] px-2.5 py-2">
                      <span className={`block break-words ${LABEL}`}>{item.label}</span>
                      {item.detail && (
                        <span className="block mt-1 font-mono text-[15px] leading-[1.5] text-[color:var(--text)]">{item.detail}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {loop && (
              <p className="mt-2 flex items-start gap-2 border-2 border-black bg-[var(--paper)] px-2.5 py-1.5 font-mono text-[15px] leading-[1.5] text-black">
                <span aria-hidden="true" className="font-bold">↺</span>
                {loop}
              </p>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
