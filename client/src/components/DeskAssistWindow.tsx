import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToSection } from '@/lib/utils';
import Window from './Window';

// Word for word from copy.md (2026-11-13, item 8). "will" stays until John
// confirms Desk Assist is deployed (honesty rule).
type Step = { label: string; ai?: boolean; detail?: string };

const STEPS: Step[] = [
  { label: 'Ticket' },
  { label: 'Reads the thread', ai: true },
  { label: 'Finds knowledge-base guidance', ai: true },
  { label: 'Drafts a reply', ai: true },
  { label: 'Agent reviews', detail: "Every draft, before it's sent." }, // the human step
  { label: 'Sent' },
];

const NUM = 'flex-shrink-0 min-w-[22px] text-center border-2 border-black bg-[var(--paper)] px-1 py-px font-label text-xs text-black tabular-nums';
const LABEL = 'flex-1 min-w-0 font-sans font-bold text-[15px] sm:text-base leading-[1.35]';
const ROW = 'flex items-center gap-2 min-h-11 px-3 py-2 border-2 border-black bg-[var(--paper)]';

/**
 * The hero's AI proof: how Desk Assist will draft a reply. Static (no motion).
 * Yellow tags mark the AI steps; the one human step (5, agent review) is ink,
 * and its words say so too. One ordered list: grid placement puts steps 5 and
 * 6 on one row, so the review reads as the gate before anything is sent.
 */
export default function DeskAssistWindow() {
  const reduced = useReducedMotion();
  return (
    <Window title="desk_assist.exe" bodyClassName="p-4 sm:p-5">
      <div className="grid gap-2">
        <span className="badge badge--status justify-self-start">In progress</span>
        <h2 id="desk-assist-flow" className="font-display text-xl lg:text-[22px] text-black text-balance">
          How Desk Assist will draft a reply
        </h2>
        <p className="hidden lg:block font-sans text-[15px] leading-normal text-pretty">
          A Chrome extension for service desk agents at LGA Telecom.
        </p>
      </div>
      <figure aria-labelledby="desk-assist-flow" className="mt-1">
        <ol className="da-flow grid grid-cols-[minmax(0,1fr)_22px_auto] gap-y-2.5">
          {STEPS.map(({ label, ai, detail }, i) =>
            detail ? (
              <li
                key={label}
                className="col-start-1 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2 gap-y-1.5 px-3 pt-2.5 pb-3 border-[3px] border-black bg-[var(--bar)] text-[color:var(--paper)] shadow-[4px_4px_0_0_var(--ink)]"
              >
                <span className={NUM}>{i + 1}</span>
                <span className={LABEL}>{label}</span>
                <span className="col-start-2 font-sans text-[15px] leading-[1.4]">{detail}</span>
                <span className="badge badge--paper col-start-2 justify-self-start">Agent</span>
              </li>
            ) : (
              <li key={label} className={`${ROW} ${i === STEPS.length - 1 ? 'col-start-3 self-center' : 'col-span-full'}`}>
                <span className={NUM}>{i + 1}</span>
                <span className={LABEL}>{label}</span>
                {ai && <span className="badge badge--ai">AI</span>}
              </li>
            ),
          )}
        </ol>
      </figure>
      {/* After the flow, so the steps are read before the way out */}
      <a
        href="#experience"
        onClick={e => { e.preventDefault(); scrollToSection('experience', reduced); }}
        className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-[15px] font-bold underline underline-offset-4 decoration-2"
      >
        See experience
        <span aria-hidden="true" className="block size-[9px] border-r-[3px] border-b-[3px] border-current rotate-45 -translate-y-0.5" />
      </a>
    </Window>
  );
}
