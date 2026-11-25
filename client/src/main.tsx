import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Umami analytics, only when both Vercel env vars are set (no request otherwise)
const analyticsEndpoint: string | undefined = import.meta.env
  .VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId: string | undefined = import.meta.env
  .VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsWebsiteId) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${analyticsEndpoint}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);
