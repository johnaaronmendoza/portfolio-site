import { ReactNode } from 'react';

export type RevealVariant = 'fade-up' | 'fade-left' | 'scale' | 'fade';

interface FramerRevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
}

/**
 * Previously faded every section up on scroll. Content now renders immediately:
 * the page keeps a single orchestrated load-in moment in the hero, and recruiters
 * scrolling fast never see empty sections. Props are kept so call sites still compile.
 */
export default function FramerReveal({ children }: FramerRevealProps) {
  return <div>{children}</div>;
}
