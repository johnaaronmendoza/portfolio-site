import type { ReactNode } from 'react';
import type { PixelArtName } from '@/components/PixelArt';
import SectionHeading from '@/components/SectionHeading';
import Window from '@/components/Window';

// Body step (MASTER 1.3): 15px on phones, 16px from sm
const BODY = 'font-mono text-[15px] sm:text-base leading-[1.65]';

interface CaseSectionProps {
  id: string;
  heading: string;
  icon?: PixelArtName;
  /** Filename-style window title, e.g. "problem.txt" */
  file: string;
  children: ReactNode;
}

/** h2 on navy, then one cream window holding the section */
export function CaseSection({ id, heading, icon, file, children }: CaseSectionProps) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`} text={heading} icon={icon} size="case" className="mb-6" />
      <Window title={file} bodyClassName="p-6 sm:p-10 lg:p-14">
        {children}
      </Window>
    </section>
  );
}

/** Readable measure for paragraphs; `lead` sets the first line apart */
export function Prose({ children, lead }: { children?: ReactNode; lead?: string }) {
  return (
    <div className={`max-w-[65ch] space-y-4 ${BODY}`}>
      {lead && <p className="font-bold text-base lg:text-lg leading-[1.6] text-black">{lead}</p>}
      {children}
    </div>
  );
}

/** A quoted brief, with the line that introduces it */
export function Quote({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <figure className={`max-w-[65ch] ${BODY}`}>
      {label && <figcaption className="mb-2">{label}</figcaption>}
      <blockquote className="border-l-[6px] border-black pl-4 font-bold text-[color:var(--navy)]">
        {children}
      </blockquote>
    </figure>
  );
}

/** Square-bulleted list (orange square, ink border), as in Experience */
export function FeatureList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`${BODY} ${columns === 2 ? 'grid gap-x-8 gap-y-3 sm:grid-cols-2' : 'space-y-3 max-w-[65ch]'}`}>
      {items.map(item => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden="true" className="flex-shrink-0 mt-[0.6em] w-2.5 h-2.5 bg-[var(--orange)] border-2 border-black" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

type Card = { title: string; body?: string; items?: string[] };

const LG_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const;
const LG_SPAN = { 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' } as const;

/** A last card that would sit alone in its row spans the row instead */
function lastCardSpan(count: number, cols: 2 | 3 | 4) {
  const smAlone = count % 2 === 1;
  const lgAlone = count % cols === 1;
  return [
    smAlone ? 'sm:col-span-2' : '',
    lgAlone ? LG_SPAN[cols] : smAlone ? 'lg:col-span-1' : '',
  ].join(' ');
}

/**
 * Static cards inside a window: 2px ink frame, no shadow, no hover or press
 * (they are not links). 1 column, 2 from sm, `cols` from lg; a lone last
 * card spans its row.
 */
export function CardGrid({ cards, cols, headingLevel = 3 }: { cards: Card[]; cols: 2 | 3 | 4; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 ${LG_COLS[cols]} gap-4 lg:gap-6`}>
      {cards.map(({ title, body, items }, i) => (
        <li
          key={title}
          className={`border-2 border-black bg-[var(--cream)] p-4 sm:p-5 ${i === cards.length - 1 ? lastCardSpan(cards.length, cols) : ''}`}
        >
          <Heading className="font-pixel text-xs sm:text-sm leading-[1.5] text-black break-words border-b-[3px] border-black pb-3 mb-3">
            {title}
          </Heading>
          {body && <p className={`${BODY} text-[color:var(--navy)] break-words`}>{body}</p>}
          {items && <div className={body ? 'mt-3' : undefined}><FeatureList items={items} /></div>}
        </li>
      ))}
    </ul>
  );
}

/** Sub-heading inside a section window (h3) */
export function SubHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`font-pixel text-sm sm:text-base leading-[1.5] text-black ${className}`}>{children}</h3>
  );
}

/** Measured figures: pixel value, mono label, a 2px rule between rows */
export function FigureList({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-[minmax(8ch,max-content)_1fr] gap-x-4 sm:gap-x-6 max-w-[65ch]">
      {items.map(({ value, label }) => (
        <div key={label} className="col-span-2 grid grid-cols-subgrid items-baseline border-b-2 border-black py-3 first:pt-0">
          <dt className={`col-start-2 row-start-1 ${BODY} text-[color:var(--navy)]`}>{label}</dt>
          <dd className="col-start-1 row-start-1 font-pixel text-[15px] sm:text-lg leading-[1.3] text-black tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Static tags (no shadow: not pressable), wrap */
export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <li key={tag} className="border-2 border-black px-2 py-0.5 font-mono text-sm font-bold text-black">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Full tool list, with an optional second group (methods, supporting libraries) */
export function TechStack({ tags, more }: { tags: string[]; more?: { label: string; tags: string[] } }) {
  return (
    <div className="space-y-6">
      <TagList tags={tags} />
      {more && (
        <div>
          <p className={`${BODY} font-bold text-black mb-3`}>{more.label}</p>
          <TagList tags={more.tags} />
        </div>
      )}
    </div>
  );
}
