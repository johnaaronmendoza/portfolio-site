import type { ReactNode } from "react";

/** Home's side gutters; the hero and the case-study pages use them too */
export const GUTTERS = "px-4 sm:px-8 lg:px-[88px] 2xl:px-16";

interface SectionProps {
  children: ReactNode;
  /** footer for the site footer band */
  as?: "section" | "footer";
  /** Band colours and borders on the full-width element */
  className?: string;
  /** Vertical padding; the footer passes its own */
  spacing?: string;
  /** Layout on the max-w-6xl content column (e.g. the footer grid) */
  innerClassName?: string;
}

/**
 * One shell for Home's sections: full-width band with the shared gutters and
 * vertical rhythm, content in a centred max-w-6xl column. Ids stay on the
 * wrappers in Home.tsx.
 */
export default function Section({
  children,
  as: Tag = "section",
  className = "",
  spacing = "py-20 sm:py-28",
  innerClassName = "",
}: SectionProps) {
  return (
    <Tag className={`${GUTTERS} ${spacing} ${className}`}>
      <div className={`max-w-6xl mx-auto ${innerClassName}`}>{children}</div>
    </Tag>
  );
}
