/** First focusable element on every page: jumps keyboard users to <main id="main"> */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
