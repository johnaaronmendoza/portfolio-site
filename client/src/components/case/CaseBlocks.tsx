import type { ReactNode } from 'react';
import { KeyText, Lead } from '@/components/Hierarchy';
import type { PixelArtName } from '@/components/PixelArt';
import SectionHeading from '@/components/SectionHeading';
import Window from '@/components/Window';

// Body step (MASTER 1.3): 15px on phones, 16px from sm
const BODY = 'font-sans text-[15px] sm:text-base leading-[1.65]';

type CaseSectionProps = {
  id: string;
  heading: string;
  icon?: PixelArtName;
  /** One-line opener on the page, under the h2 (≤ 1 key term) */
  lead?: string;
} & (
  | {
      /** Filename-style window title, e.g. "problem.txt" */
      file: string;
      children: ReactNode;
    }
  // A section whose lead says it all has no window (fewer boxes, fewer words)
  | { file?: never; children?: never }
);

/** h2 on the page, an optional lead, then one white window holding the detail */
export function CaseSection({ id, heading, icon, lead, file, children }: CaseSectionProps) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <SectionHeading
        id={`${id}-heading`}
        text={heading}
        icon={icon}
        size="case"
        className={lead ? 'mb-4 lg:mb-5' : 'mb-6'}
      />
      {lead && <Lead text={lead} className={file ? 'mb-6 lg:mb-8' : undefined} />}
      {file && (
        <Window title={file} bodyClassName="p-6 sm:p-10 lg:p-14">
          {children}
        </Window>
      )}
    </section>
  );
}

/** lead-s: the first line inside a window block, ink on white (≤ 1 key term) */
export function LeadS({ text }: { text: string }) {
  return (
    <p className="max-w-[60ch] font-sans font-bold text-base lg:text-lg leading-[1.6] text-black text-pretty">
      <KeyText text={text} max={1} />
    </p>
  );
}

/** Sub-heading inside a section window (h3) */
export function SubHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`font-display text-xl sm:text-2xl text-black ${className}`}>{children}</h3>
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
