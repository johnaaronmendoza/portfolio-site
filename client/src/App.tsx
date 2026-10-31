import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CommandPalette from "./components/CommandPalette";
import Home from "./pages/Home";
import SilverLinkProject from "./pages/SilverLinkProject";
import SCSProject from "./pages/SCSProject";
import FireSafetyProject from "./pages/FireSafetyProject";
import UWBProject from "./pages/UWBProject";
import UATProject from "./pages/UATProject";
import AIFinanceProject from "./pages/AIFinanceProject";
import MascotChatWidget from "./components/MascotChatWidget";
import ScrollProgress from "./components/ScrollProgress";
import KonamiOverlay from "./components/KonamiOverlay";
import SecretTerminal from "./components/SecretTerminal";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import { useLenis, getLenis } from "./hooks/useLenis";
import { savedHomeScroll } from "./lib/scroll-memory";

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

  useEffect(() => {
    const onPop = () => { popRef.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const wasPop = popRef.current;
    popRef.current = false;
    const isFirst = firstRef.current;
    firstRef.current = false;
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
  return (
    <>
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
    </>
  );
}

function AppInner() {
  // Lenis smooth scroll — initialised once, respects prefers-reduced-motion
  useLenis();

  return (
    <TooltipProvider>
      <ScrollProgress />
      <CommandPalette />
      <KeyboardShortcuts />
      <Toaster />
      <KonamiOverlay />
      <SecretTerminal />
      <Router />
      <MascotChatWidget />
    </TooltipProvider>
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
