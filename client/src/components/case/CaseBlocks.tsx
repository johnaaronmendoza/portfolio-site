import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { KeyText, Lead } from "@/components/Hierarchy";
import type { PixelArtName } from "@/components/PixelArt";
import SectionHeading from "@/components/SectionHeading";
import Window, { WindowBar } from "@/components/Window";

// Body step (DESIGN.md): 15px on phones, 16px from sm
const BODY = "font-sans text-body-sm sm:text-body leading-[1.65]";

// Set by CasePair: from lg the section is one column of a shared window
const InPair = createContext(false);

type CaseSectionProps = {
  id: string;
  heading: string;
  icon?: PixelArtName;
  /** One-line opener on the page, under the h2 (≤ 1 key term) */
  lead?: string;
  /** A sparse window (a few short bullets): held to its content measure,
   *  left-aligned, instead of spanning the column */
  narrow?: boolean;
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
export function CaseSection({
  id,
  heading,
  icon,
  lead,
  narrow = false,
  file,
  children,
}: CaseSectionProps) {
  const pane = useContext(InPair);
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={pane ? "lg:p-8 xl:p-10" : undefined}
    >
      <SectionHeading
        id={`${id}-heading`}
        text={heading}
        icon={icon}
        size={pane ? "pane" : "case"}
        className={lead ? "mb-4 lg:mb-5" : "mb-6"}
      />
      {lead && (
        <Lead text={lead} className={file ? "mb-6 lg:mb-8" : undefined} />
      )}
      {file && (
        <Window
          title={file}
          // In a pair the window dissolves into the shared one from lg: no
          // frame, bar or padding of its own
          className={
            pane
              ? "lg:contents lg:[&>.window-bar]:hidden"
              : narrow
                ? "max-w-3xl"
                : ""
          }
          bodyClassName={pane ? "p-6 sm:p-10 lg:p-0" : "p-6 sm:p-10 lg:p-14"}
        >
          {children}
        </Window>
      )}
    </section>
  );
}

/**
 * Two neighbouring sections (the problem, what it does) as one window from
 * lg: a shared title bar naming both files, then a column each with its own
 * heading. Below lg they stack as two sections, as everywhere else.
 */
export function CasePair({
  children,
}: {
  children: ReactElement<CaseSectionProps>[];
}) {
  const title = children
    .map(child => child.props.file)
    .filter(Boolean)
    .join(" · ");
  return (
    <InPair.Provider value>
      <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:border-[3px] lg:border-black lg:bg-[var(--paper)] lg:shadow-8bit-lg lg:[&>section+section]:border-l-[3px] lg:[&>section+section]:border-black">
        <div className="hidden lg:block lg:col-span-2">
          <WindowBar title={title} />
        </div>
        {children}
      </div>
    </InPair.Provider>
  );
}

/** lead-s: the first line inside a window block, ink on white (≤ 1 key term) */
export function LeadS({ text }: { text: string }) {
  return (
    <p className="max-w-[60ch] font-sans font-bold text-body lg:text-lead-sm leading-[1.6] text-black text-pretty">
      <KeyText text={text} max={1} />
    </p>
  );
}

/** Sub-heading inside a section window (h3) */
export function SubHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`font-display text-card-title text-black ${className}`}>
      {children}
    </h3>
  );
}

/** Static tags (no shadow: not pressable), wrap */
function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <li
          key={tag}
          translate="no"
          className="border-2 border-black px-2 py-0.5 font-mono text-label font-bold text-black"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Full tool list, with an optional second group (methods, supporting libraries) */
export function TechStack({
  tags,
  more,
}: {
  tags: string[];
  more?: { label: string; tags: string[] };
}) {
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
