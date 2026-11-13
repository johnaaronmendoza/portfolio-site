import type { ReactNode } from 'react';

interface WindowBarProps {
  /** Filename-style label, e.g. "about_me.txt" */
  title: string;
  /** Overlays pass a close handler: the ✕ becomes a real 44px button */
  onClose?: () => void;
  closeLabel?: string;
}

/**
 * Violet title bar. Without onClose the ○ □ ✕ controls are decoration;
 * with it (overlays, MASTER 2.10) the ✕ is a real button with a cream ring.
 */
export function WindowBar({ title, onClose, closeLabel }: WindowBarProps) {
  return (
    <div className="window-bar">
      <p className="font-label text-xs leading-normal truncate min-w-0">{title}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 -my-1.5 -mr-2 font-mono text-base leading-none text-[color:var(--paper)] outline-offset-[-4px] [--focus:var(--paper)] transition-colors duration-150 hover:bg-[var(--blue)]"
        >
          <span aria-hidden="true">✕</span>
        </button>
      ) : (
        <span aria-hidden="true" className="flex-shrink-0 font-mono text-sm leading-none tracking-[0.35em]">
          ○□✕
        </span>
      )}
    </div>
  );
}

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
      <WindowBar title={title} />
      <div className={`window-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
