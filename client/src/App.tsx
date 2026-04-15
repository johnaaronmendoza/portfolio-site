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
import MascotChatWidget from "./components/MascotChatWidget";
import ScrollProgress from "./components/ScrollProgress";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/projects/silverlink"} component={SilverLinkProject} />
      <Route path={"/projects/scs"} component={SCSProject} />
      <Route path={"/projects/firesafety"} component={FireSafetyProject} />
      <Route path={"/projects/uwb"} component={UWBProject} />
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
          <Router />
          <MascotChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
