import { Toaster } from "@/components/ui/sonner";
import { Route, Switch, useLocation } from "wouter";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MascotChatWidget from "./components/MascotChatWidget";
import { useKonami } from "./hooks/useKonami";
import { unlockAchievement } from "./hooks/useAchievements";
import { play } from "./hooks/useSound";
import { savedHomeScroll } from "./lib/scroll-memory";

// Overlays load on first use; their shortcuts are listened for below from the start
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const SecretTerminal = lazy(() => import("./components/SecretTerminal"));
const KeyboardShortcuts = lazy(() => import("./components/KeyboardShortcuts"));
const KonamiOverlay = lazy(() => import("./components/KonamiOverlay"));

// Case studies load on demand so the home page ships less JavaScript.
const SilverLinkProject = lazy(() => import("./pages/SilverLinkProject"));
const SCSProject = lazy(() => import("./pages/SCSProject"));
const FireSafetyProject = lazy(() => import("./pages/FireSafetyProject"));
const UWBProject = lazy(() => import("./pages/UWBProject"));
const UATProject = lazy(() => import("./pages/UATProject"));
const AIFinanceProject = lazy(() => import("./pages/AIFinanceProject"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      if (window.location.pathname !== lastPathRef.current)
        popRef.current = true;
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
    window.scrollTo(0, y);

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
        {/* Any other address */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

type Overlay = "palette" | "terminal" | "shortcuts";

// Ctrl/Cmd + key for each overlay (the overlays' own listeners use the same keys)
const OVERLAY_KEYS: Record<string, Overlay> = {
  k: "palette",
  "`": "terminal",
  "/": "shortcuts",
};

/**
 * The first shortcut press (or the footer's terminal button) mounts that
 * overlay already open; from then on the overlay toggles itself and this
 * listener only repeats the no-op mount. Each has its own Suspense, so one
 * loading never hides another that is open.
 */
function LazyOverlays() {
  const [loaded, setLoaded] = useState<Partial<Record<Overlay, true>>>({});
  const [konami, setKonami] = useState(0);

  useEffect(() => {
    const load = (name: Overlay) =>
      setLoaded(l => (l[name] ? l : { ...l, [name]: true }));
    const onKey = (e: KeyboardEvent) => {
      const name = e.ctrlKey || e.metaKey ? OVERLAY_KEYS[e.key] : undefined;
      if (!name) return;
      e.preventDefault();
      load(name);
    };
    const onTerminal = () => load("terminal");
    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-terminal", onTerminal);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-terminal", onTerminal);
    };
  }, []);

  // Sound and achievement at once; the window remounts (keyed) per entry
  const onKonami = useCallback(() => {
    play("powerUp"); // 7-note ascending sweep for the Konami reveal
    unlockAchievement("CHEAT_CODE");
    setKonami(n => n + 1);
  }, []);
  useKonami(onKonami);

  return (
    <>
      <Suspense fallback={null}>
        {loaded.palette && <CommandPalette defaultOpen />}
      </Suspense>
      <Suspense fallback={null}>
        {loaded.shortcuts && <KeyboardShortcuts defaultOpen />}
      </Suspense>
      <Suspense fallback={null}>
        {loaded.terminal && <SecretTerminal defaultOpen />}
      </Suspense>
      <Suspense fallback={null}>
        {konami > 0 && <KonamiOverlay key={konami} />}
      </Suspense>
    </>
  );
}

function AppInner() {
  return (
    <>
      <LazyOverlays />
      {/* Achievement toasts: bottom-left, stacked just above the floating
          controls (a row of 44px buttons 16px from the edge on phones, a
          column of two from lg), clear of the taskbar, breadcrumb and
          section navigation */}
      <Toaster
        position="bottom-left"
        offset={{ bottom: 132, left: 24 }}
        mobileOffset={{ bottom: 72, left: 16 }}
      />
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
