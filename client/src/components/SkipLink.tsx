/** First focusable element on every page: jumps keyboard users to <main id="main">.
 *  className can set --focus where the link sits over a dark bar. */
export default function SkipLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="#main"
      className={`btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 ${className}`}
    >
      Skip to content
    </a>
  );
}
