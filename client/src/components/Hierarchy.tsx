/**
 * The hierarchy system (visual-hierarchy.md §1): key terms, leads, pixel-arrow
 * bullets, fact chips and spot plates. Copy marks key terms with **double
 * asterisks**; they are parsed here into <strong>, never injected as HTML.
 */
import PixelArt, { type PixelArtName } from './PixelArt';

/** teal: on cream windows and navy. cream: on the teal band or inside a teal/orange block */
export type KeySurface = 'teal' | 'cream';

const KEY_FILL: Record<KeySurface, string> = {
  teal: 'bg-[var(--blue)]',
  cream: 'bg-[var(--paper)]',
};

interface KeyTextProps {
  text: string;
  /** Spec caps: 1 per bullet, lead or tile; 2 per paragraph; 0 where key terms are not allowed */
  max?: number;
  surface?: KeySurface;
}

/**
 * Renders marked words as key terms (ink on a solid block, bold), up to `max`;
 * later marks render as plain text. Odd runs of a split on "**" are the marked
 * words; unbalanced markers fall back to plain text.
 */
export function KeyText({ text, max = 1, surface = 'teal' }: KeyTextProps) {
  let used = 0;
  const runs = text.split('**');
  if (runs.length % 2 === 0) return <>{runs.join('')}</>;
  return (
    <>
      {runs.map((run, i) => {
        if (i % 2 === 0 || used >= max) return run;
        if (!run) return null; // "****" marks nothing
        used += 1;
        return (
          <strong
            key={i}
            className={`font-bold text-black px-[0.25em] py-[0.05em] box-decoration-clone ${KEY_FILL[surface]}`}
          >
            {run}
          </strong>
        );
      })}
    </>
  );
}

type LeadTone = 'navy' | 'teal' | 'cream';

// Approved pairings: cream on navy (orange prompt), ink on teal, ink on cream
const LEAD_TEXT: Record<LeadTone, string> = {
  navy: 'text-[color:var(--text)]',
  teal: 'text-black',
  cream: 'text-black',
};

/**
 * L2 lead: the one sentence to read if you read nothing else. Bold 18/22 with
 * a hanging `>` prompt, so wrapped lines align with the first word.
 */
export function Lead({
  text,
  tone = 'navy',
  prompt = true,
  className = '',
}: {
  text: string;
  tone?: LeadTone;
  /** false where a `>` line already sits directly above (the hero role line) */
  prompt?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`relative max-w-[42ch] font-sans font-bold text-lg leading-[1.4] lg:text-[22px] lg:leading-[1.35] text-balance ${prompt ? 'pl-[2ch]' : ''} ${LEAD_TEXT[tone]} ${className}`}
    >
      {prompt && (
        <span aria-hidden="true" className={`absolute left-0 ${tone === 'navy' ? 'text-[color:var(--blue-text)]' : ''}`}>
          {'>'}
        </span>
      )}
      <KeyText text={text} max={1} surface={tone === 'teal' ? 'cream' : 'teal'} />
    </p>
  );
}

/** Pixel-arrow bullets (bullet.svg), key term first; wrapped lines align with the text */
export function PixelList({ items, columns = 1, className = '' }: { items: string[]; columns?: 1 | 2; className?: string }) {
  return (
    <ul
      className={`font-sans text-[15px] sm:text-base leading-[1.65] ${
        columns === 2 ? 'grid gap-x-8 gap-y-3 lg:gap-y-4 sm:grid-cols-2' : 'space-y-3 lg:space-y-4 max-w-[60ch]'
      } ${className}`}
    >
      {items.map(item => (
        <li key={item} className="grid grid-cols-[16px_1fr] items-start gap-x-3">
          <PixelArt name="bullet" size={16} lazy className="line-mark" />
          <span className="min-w-0 break-words">
            <KeyText text={item} max={1} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export type Fact = { icon: PixelArtName; text: string };

const CHIP =
  'inline-flex min-w-0 max-w-full items-start gap-2 min-h-9 border-2 border-black bg-[var(--paper)] px-2.5 py-1.5 font-mono text-[15px] sm:text-base font-bold leading-[1.4] text-black';

/** L6 chip: a static label (no shadow, not pressable); the words carry the meaning, the icon is decorative */
export function Chip({ icon, text, as: Tag = 'p', className = '' }: Fact & { as?: 'p' | 'li'; className?: string }) {
  return (
    <Tag className={`${CHIP} ${className}`}>
      <PixelArt name={icon} size={16} lazy className="line-mark" />
      <span className="min-w-0 break-words">{text}</span>
    </Tag>
  );
}

/** A labelled list of chips that wraps */
export function FactChips({ facts, label, className = '' }: { facts: Fact[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {facts.map(fact => (
        <Chip key={fact.text} {...fact} as="li" />
      ))}
    </ul>
  );
}

