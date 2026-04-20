import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CommandPalette from "./components/CommandPalette";
import ScreenTear from "./components/ScreenTear";
import LoadingBar from "./components/LoadingBar";
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
import PixelCursor from "./components/PixelCursor";
import SystemHUD from "./components/SystemHUD";
import DitherTransition from "./components/DitherTransition";
import { useLenis, getLenis } from "./hooks/useLenis";

/** Scroll to top whenever the route changes */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
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
      {/* Sovereign Console grain overlay */}
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <LoadingBar />
      <CommandPalette />
      <ScreenTear />
      <Toaster />
      <PixelCursor />
      <DitherTransition />
      <KonamiOverlay />
      <SystemHUD />
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
        <AppInner />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
