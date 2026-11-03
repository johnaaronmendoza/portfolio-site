import { Toaster } from "@/components/ui/sonner";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CommandPalette from "./components/CommandPalette";
import Home from "./pages/Home";
import MascotChatWidget from "./components/MascotChatWidget";
import KonamiOverlay from "./components/KonamiOverlay";
import SecretTerminal from "./components/SecretTerminal";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import { useLenis, getLenis } from "./hooks/useLenis";
import { savedHomeScroll } from "./lib/scroll-memory";

// Case studies load on demand so the home page ships less JavaScript.
const SilverLinkProject = lazy(() => import("./pages/SilverLinkProject"));
const SCSProject = lazy(() => import("./pages/SCSProject"));
const FireSafetyProject = lazy(() => import("./pages/FireSafetyProject"));
const UWBProject = lazy(() => import("./pages/UWBProject"));
const UATProject = lazy(() => import("./pages/UATProject"));
const AIFinanceProject = lazy(() => import("./pages/AIFinanceProject"));

/**
 * On route change: browser Back to Home restores the saved scroll; a link to
 * "/#id" is left to Home, which scrolls to that section; anything else starts
 * at the top. After an in-app navigation, focus moves to the new page's h1 so
 * keyboard and screen reader users start on the new content.
 */
function ScrollToTop() {
  const [location] = useLocation();
  const popRef = useRef(false);
  const firstRef = useRef(true);
  // Pathname the last effect ran for; a popstate only counts as "Back" when
  // it actually changes the pathname (not for hash-only history entries).
  const lastPathRef = useRef(window.location.pathname);

  useEffect(() => {
    const onPop = () => {
      if (window.location.pathname !== lastPathRef.current) popRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const wasPop = popRef.current;
    popRef.current = false;
    const isFirst = firstRef.current;
    firstRef.current = false;
    lastPathRef.current = window.location.pathname;
    if (window.location.hash) return;

    const y = wasPop && location === "/" ? savedHomeScroll() : 0;
    const lenis = getLenis();
    if (lenis) {
      lenis.resize(); // the new page's height, so a restored position isn't clamped
      lenis.scrollTo(y, { immediate: true });
    }
    else window.scrollTo(0, y);

    if (isFirst || wasPop) return;
    const heading = document.querySelector<HTMLElement>("main h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, [location]);
  return null;
}

function Router() {
  // ScrollToTop shares the Suspense boundary with the routes, so its effect
  // only runs once a lazy page has rendered (its h1 exists to take focus).
  return (
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/projects/silverlink"} component={SilverLinkProject} />
        <Route path={"/projects/scs"} component={SCSProject} />
        <Route path={"/projects/firesafety"} component={FireSafetyProject} />
        <Route path={"/projects/uwb"} component={UWBProject} />
        <Route path={"/projects/uat"} component={UATProject} />
        <Route path={"/projects/ai-finance"} component={AIFinanceProject} />
        {/* Final fallback route */}
        <Route component={Home} />
      </Switch>
    </Suspense>
  );
}

function AppInner() {
  // Lenis smooth scroll — initialised once, respects prefers-reduced-motion
  useLenis();

  return (
    <>
      <CommandPalette />
      <KeyboardShortcuts />
      <Toaster />
      <KonamiOverlay />
      <SecretTerminal />
      <Router />
      <MascotChatWidget />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        {/* Framer animations follow the visitor's reduced-motion setting */}
        <MotionConfig reducedMotion="user">
          <AppInner />
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
