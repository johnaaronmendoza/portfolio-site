import { useCallback, useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * Focus handling for a modal dialog (terminal, command palette, shortcuts):
 * when `open` turns true it remembers what had focus, moves focus to
 * `initialRef` (or the dialog), keeps Tab and Shift+Tab inside `dialogRef`,
 * and puts focus back on the opener when the dialog closes.
 *
 * Returns `keepFocus()`: call it before closing when the action moves focus
 * somewhere on purpose (a section, the chat), so the opener doesn't take it back.
 */
export function useModalFocus(
  open: boolean,
  dialogRef: RefObject<HTMLElement | null>,
  initialRef?: RefObject<HTMLElement | null>,
): () => void {
  const keepRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    keepRef.current = false;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // After the dialog has mounted
    const frame = requestAnimationFrame(() => (initialRef?.current ?? dialogRef.current)?.focus());

    const onKey = (e: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (e.key !== 'Tab' || !dialog) return;
      const items = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = dialog.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
      if (!keepRef.current && opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [open, dialogRef, initialRef]);

  return useCallback(() => { keepRef.current = true; }, []);
}
