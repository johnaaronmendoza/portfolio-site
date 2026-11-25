import { ReactNode } from "react";

/**
 * Previously faded every section up on scroll. Content now renders immediately:
 * the page keeps a single orchestrated load-in moment in the hero, and recruiters
 * scrolling fast never see empty sections.
 */
export default function FramerReveal({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
