import { MOD_KEY } from '@/lib/utils';

/** The keyboard shortcuts, findable without knowing them first (footer, menu.exe) */
export default function ShortcutHint({ className = '' }: { className?: string }) {
  return (
    <p className={`font-label text-sm leading-relaxed ${className}`}>
      <kbd className="font-bold">{MOD_KEY} K</kbd> commands<span aria-hidden="true"> · </span><span className="sr-only">, </span>
      <kbd className="font-bold">{MOD_KEY} /</kbd> shortcuts
    </p>
  );
}
