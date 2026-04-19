import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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
import CRTToggle from "./components/CRTToggle";
import SecretTerminal from "./components/SecretTerminal";
import PixelCursor from "./components/PixelCursor";
import SoundToggle from "./components/SoundToggle";
import DitherTransition from "./components/DitherTransition";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <ScrollProgress />
          <LoadingBar />
          <CommandPalette />
          <ScreenTear />
          <Toaster />
          <PixelCursor />
          <DitherTransition />
          <KonamiOverlay />
          <CRTToggle />
          <SoundToggle />
          <SecretTerminal />
          <Router />
          <MascotChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
