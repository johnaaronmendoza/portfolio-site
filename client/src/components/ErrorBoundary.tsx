import { Component, type ErrorInfo, type ReactNode } from "react";
import Window from "./Window";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Last-resort screen: an error.exe window with a plain message, Reload, a
 * full-page link Home and the email. The details go to the console, never
 * to the visitor.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-8 text-[color:var(--text)]">
        <Window
          title="error.exe"
          className="w-full max-w-lg"
          bodyClassName="space-y-4 p-6 sm:p-8"
        >
          <h1 className="font-display text-card-title sm:text-card-lead">
            Something went wrong
          </h1>
          <p className="font-sans text-body leading-relaxed">
            This page stopped working. Reload to try again, or go to the home
            page.
          </p>
          <p className="font-sans text-body leading-relaxed">
            Still stuck? Email me at{" "}
            <a
              href="mailto:johnaaronmb@gmail.com"
              className="[overflow-wrap:anywhere] font-bold text-[color:var(--blue-text)] underline decoration-2 underline-offset-4"
            >
              johnaaronmb@gmail.com
            </a>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Reload
            </button>
            {/* A full page load, so a broken app state doesn't come along */}
            <a href="/" className="btn btn-secondary">
              Go to Home
            </a>
          </div>
        </Window>
      </main>
    );
  }
}

export default ErrorBoundary;
