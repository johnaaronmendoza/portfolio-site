import type { ReactNode } from 'react';

interface WindowProps {
  /** Filename-style label for the title bar, e.g. "about_me.txt" */
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/**
 * Retro OS window: violet title bar with decorative ○ □ ✕ controls over a
 * cream body. Base styles live in index.css (.window, .window-bar,
 * .window-body) so utilities passed in here override them.
 */
export default function Window({ title, children, className = '', bodyClassName = '' }: WindowProps) {
  return (
    <div className={`window ${className}`}>
      <div className="window-bar">
        <p className="font-pixel text-xs leading-normal truncate min-w-0">{title}</p>
        <span aria-hidden="true" className="flex-shrink-0 font-mono text-sm leading-none tracking-[0.35em]">
          ○□✕
        </span>
      </div>
      <div className={`window-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
