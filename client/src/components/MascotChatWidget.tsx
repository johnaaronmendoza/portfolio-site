/**
 * MascotChatWidget: floating keyword-bot chat (bottom-right).
 * A `chat.exe` window (MASTER 2.10): violet bar, cream body, navy text.
 * Answers come from the local knowledge base below; there is no backend.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { hasFinePointer } from '@/lib/utils';
import { motionTokens } from '@/lib/motion-tokens';
import { WindowBar } from './Window';

const PANEL_ID = 'chat-panel';

const ABOUT =
  "I'm John Aaron, a Computing Science student at SIT × University of Glasgow. I build AI and data tools for the people who have to use them. Right now I'm building Desk Assist at LGA Telecom. My first role was at Sembcorp Solar, testing a CRM before it rolled out across the company.";

/**
 * Keyword → answer, checked in order; the first match wins. Keys match whole
 * words (a plural "s" is allowed); a trailing * makes the key a word stem
 * ("graduat*" matches graduate, graduation, graduating).
 * Only facts on the site or the resume (CLAUDE.md honesty rules).
 */
const KNOWLEDGE_BASE: [string, string][] = [
  // Sembcorp / Experience
  ['sembcorp', 'I interned as a Digitization Analyst at Sembcorp Solar Singapore (Oct 2020 – Jun 2021), working across a 240MWp+ solar portfolio. I led the company-wide rollout of the Momens CRM, hosted training sessions for 10+ stakeholders at a time, gathered UX feedback to take to the vendor, and ran UAT on new Momens releases, tracking 50+ defects to resolution. I was awarded an Internship Distinction and earned a contract extension.'],
  ['experience', 'My experience: Service Desk Operations & AI Integration Intern at LGA Telecom (Aug 2026 – Present), where I handle Freshservice tickets and am building Desk Assist (in progress), an AI assistant for service desk agents. Before that, Digitization Analyst Intern at Sembcorp Solar Singapore (Oct 2020 – Jun 2021), where I rolled out Momens CRM across Projects, C&I, and SolarNova divisions.'],
  ['internship', 'I am currently interning at LGA Telecom (Aug 2026 – Present) in service desk operations and AI integration. Previously I interned at Sembcorp Solar Singapore as a Digitization Analyst, owning the Momens CRM rollout and its UAT.'],
  // LGA Telecom
  ['lga', 'I am a Service Desk Operations & AI Integration Intern at LGA Telecom (Aug 2026 – Present). I handle Level 1 tickets in Freshservice and support Microsoft 365 customers. I am building Desk Assist (in progress), a Chrome extension that reads a ticket, pulls relevant Knowledge Base guidance and drafts a reply for the agent to review. I also set up Freshservice closure and escalation automations that cut manual agent actions by 40%, Microsoft Teams escalation alerts that cut incident resolution time by 15 minutes, and an automated weekly PagerDuty incident report (Google Apps Script) that saves 4 hours of manual reporting a week.'],
  ['desk assist', 'Desk Assist is an AI assistant for service desk agents that I am building at LGA Telecom; it is still in progress. It is a Manifest V3 Chrome extension: the agent clicks Analyse conversation, it reads the ticket thread, retrieves Knowledge Base guidance and proposes a draft reply. The agent always reviews before anything is sent. Security is designed in: least-privilege permissions, no remote code, and AI calls routed through a company-controlled backend.'],
  ['momens', 'Momens is a project management CRM used at Sembcorp Solar. I led its company-wide rollout, trained stakeholders across divisions, and acted as a liaison between users and the vendor to implement UI enhancements and fix bugs.'],

  // SilverLink
  ['silverlink', 'SilverLink SG is a cloud-native platform I built with Group 20 (SIT + University of Glasgow) to connect seniors and youth through skill-sharing, micro-volunteering, and community events. Tech: React, Next.js, Node.js, gRPC (4 microservices), Docker, Kubernetes, Neon PostgreSQL (serverless), Cloudflare Tunnel, Keycloak JWT auth, and Prisma ORM with 8 isolated schemas. Features include real-time WebRTC livestreaming, Socket.IO chat, and predictive autoscaling using EMA forecasting.'],
  ['grpc', 'SilverLink SG uses gRPC for all internal microservice communication. The API Gateway translates REST requests from the frontend to gRPC calls across 4 services: Event (50051), Booking (50052), Volunteer (50053), and User (50054).'],
  ['microservice', 'SilverLink uses 4 gRPC microservices: Event Service (event creation, seat availability), Booking Service (idempotent bookings, cancellations), Volunteer Service (listings, applications, assignments), and User Service (profiles, ratings, verification tiers).'],

  // Singapore Cancer Society App
  ['cancer', 'The Singapore Cancer Society Awareness Platform is an interactive visual novel engine I co-built for SCS outreach booths (SIT + UofG, Group D2, 7 Agile sprints). My contributions: Visual Novel PanelRenderer, multi-sprite character rendering, text animation, button sound effects, haptic feedback, and the Question Bank service. Tech: React 19, TypeScript, Vite, TailwindCSS, Supabase (PostgreSQL + Auth + Storage), deployed on Vercel.'],
  ['scs', 'The SCS platform is a browser-based visual novel that runs on tablets at community booths. It has 4 question types, multilingual support (EN/CN/Malay/Tamil), a leaderboard, PDPA consent, and a full no-code Admin Panel for SCS staff to create and manage stories without technical expertise.'],
  ['visual novel', 'I built the core PanelRenderer (visual novel engine) for the SCS project. It handles sequential and branching panel navigation, character sprites with multiple expressions, animated text, and configurable correct/incorrect feedback modals.'],
  ['supabase', 'In the SCS project, Supabase handles all backend needs: PostgreSQL for story/panel data, Supabase Auth for admin accounts with email verification, RLS (Row-Level Security) for role-based access, and Supabase Storage for character sprites and backgrounds.'],

  // GreenLoopFarms
  ['greenloop*', 'GreenLoopFarms is a Singapore hydroponic urban farm growing pesticide-free vegetables and microgreens. I contributed to the early idea and business strategy, and helped co-prepare the pitch deck that won a SGD 10,000 NYP JumpStart Grant. Partners include FURA (World\'s 50 Best Discovery), East Bistro, NIE, NUS, and NYP. Visit greenloopfarms.com!'],
  ['grant', 'GreenLoopFarms won a SGD 10,000 NYP JumpStart Grant, a startup grant from Nanyang Polytechnic. We pitched it to an industry investor panel.'],

  // Fire Safety
  ['fire*', 'The Fire Safety Drill Companion is a native Android app our team built for HDB residents to rehearse fire evacuation on demand. My core contributions: Dijkstra shortest-path with dynamic hazard re-routing, full ARCore integration, AR corridor rendering, and PDR sensor fusion optimization. Tech: Kotlin, Jetpack Compose, MVVM+Hilt, ARCore, TFLite, Firebase FCM. Stats: 10,984 lines of Kotlin, ~80% test coverage, SUS score 79/100.'],
  ['android', 'The Fire Safety Drill Companion is a native Android app with AR navigation (ARCore), on-device ML (TFLite extinguisher classification), sensor-fusion PDR (Weinberg stride estimation), and Firebase push notifications. It works fully offline.'],
  ['arcore', 'In the Fire Safety project, I integrated ARCore for real-time corridor navigation. Breadcrumb arrows are overlaid on the live camera feed, guiding residents along the Dijkstra-computed evacuation route. I wrote ArCoreSessionManager, ArCoreRenderer, and ArWaypointConverter.'],
  ['dijkstra', 'I implemented Dijkstra\'s shortest-path algorithm for the Fire Safety app, applied to a weighted floor plan graph with a blockedNodes param for dynamic stairwell exclusion. findPathToNearestExit() runs against all exit nodes and picks the minimum-cost route. Thread-safe with @Synchronized.'],

  // UAT Testing Dashboard
  ['uat', 'The UAT Testing Dashboard is a full-stack defect tracker and UAT management tool, a course project built around a hospital appointment system UAT scenario. It tracks defects end-to-end (Open → In Progress → Resolved → Closed), links failed test cases directly to open defects, and has a real-time analytics dashboard with severity breakdown charts and UAT progress trends. Role-based access for PM, QA Lead, Tester, and Developer. CSV export for defect registers and test logs. Tech: React 18, Node.js, Express, SQLite, Recharts.'],
  ['defect', 'In the UAT Testing Dashboard, defects go through a full lifecycle: Open → In Progress → Resolved → Closed. Each defect links directly to the test cases that triggered it, creating an auditable chain from failure to fix. Severity levels (Critical, High, Medium, Low) feed into the analytics dashboard.'],

  // AI Finance Insights Engine
  ['finance', 'The AI Finance Insights Engine is an automated ETL pipeline that ingests 5 global market data sources: Brent crude, USD/SGD FX, S&P 500, logistics stocks, and geopolitical news. It computes rolling volatility, moving averages, and cross-asset correlations. An AI NLP engine classifies headlines across 9 sectors, scores sentiment, and flags supply chain risks. Output is a Star Schema data warehouse ready for Power BI. 100% Pytest coverage on all extraction and transformation logic.'],
  ['etl', 'The AI Finance Insights ETL pipeline has 5 stages: Extract → Validate (schema + row parity) → Transform (rolling metrics) → Validate again → Load to SQLite. Two validation gates prevent corrupt data from reaching the database at any stage.'],
  ['pipeline', 'The AI Finance pipeline ingests Brent crude, FX rates, S&P 500, logistics stocks, and geopolitical news. After transformation it produces a Star Schema data warehouse (Fact + Dim tables) consumed directly by Power BI for shipping and market analytics.'],
  ['nlp', 'The AI NLP engine in the Finance Insights project classifies market headlines across 9 sectors, generates sentiment scores, flags supply chain risks, and auto-generates daily executive briefs. Built with an LLM API integration path.'],

  // UWB / Data Analytics
  ['uwb', 'The UWB Indoor Localization project (CSC3105 Data Analytics) classifies LOS/NLOS UWB signal paths using SVM-RBF (89.61% accuracy, 0.9612 ROC-AUC) vs Logistic Regression (85.75%, 0.9195 AUC). Dataset: 41,996 samples across 7 indoor environments. I handled the data mining methodology: model selection, train/test split, RobustScaler, hyperparameter tuning, and range regression.'],
  ['machine learning', 'I have ML work across two projects: (1) UWB classification: SVM-RBF achieving 89.61% accuracy classifying indoor signal paths; (2) Fire Safety: on-device TFLite + YOLO for real-time fire extinguisher type classification without network dependency.'],
  ['data', 'My data analytics work: UWB Indoor Localization (CSC3105): full ML pipeline with PCA on 1,016 CIR dimensions, SVM-RBF (89.61% accuracy), logistic regression baseline (85.75%), and linear regression for dual-path range estimation (RMSE 1.757 m). 41,996 samples, 7 environments, perfectly balanced 50/50 LOS/NLOS.'],

  // Projects overview
  ['project', 'I have built 6 projects: (1) SilverLink SG: cloud-native gRPC microservices platform with WebRTC; (2) SCS Awareness Platform: visual novel engine with React 19 + Supabase; (3) Fire Safety Drill Companion: Android AR + ML + Dijkstra; (4) UWB Indoor Localization: SVM-RBF ML pipeline at 89.61% accuracy; (5) UAT Testing Dashboard: defect tracker for a hospital appointment system UAT scenario (course project); (6) AI Finance Insights Engine: ETL pipeline + NLP engine + Power BI Star Schema. I also co-pitched GreenLoopFarms, which won a SGD 10,000 NYP JumpStart Grant.'],

  // Skills (mirrors the Skills section)
  ['skill', 'AI & LLMs: prompt engineering, RAG, LLM-assisted workflows, AI guardrails and data-leakage prevention, human-in-the-loop design. Data & ML: Python, Pandas, NumPy, scikit-learn, SQL, ETL pipelines, Power BI, TFLite. Backend & cloud: Node.js, Express, gRPC, PostgreSQL, Supabase, Prisma ORM, Docker, Kubernetes, Git. Frontend & mobile: TypeScript, JavaScript, React, Next.js, Tailwind CSS, Kotlin, Jetpack Compose, ARCore. I also work with Java, C++, AWS, GitHub Actions, MongoDB, Cloudflare, JIRA and Confluence.'],
  ['tech', 'My stack: React and TypeScript on the frontend; Node.js, Express, gRPC and Prisma ORM on the backend; Docker and Kubernetes for containers; PostgreSQL and Supabase for data; Python, Pandas and scikit-learn for data and ML. I also use Java, C++, AWS, GitHub Actions, MongoDB and Cloudflare.'],
  ['frontend', 'Frontend: React, Next.js, TypeScript and Tailwind CSS. I built front ends for SilverLink SG and the SCS Awareness Platform.'],
  ['backend', 'Backend: Node.js, Express, gRPC microservices, Prisma ORM and Supabase. SilverLink SG\'s 4 gRPC services use optimistic concurrency control and idempotency keys to prevent double-bookings.'],
  ['docker', 'I use Docker Compose for local development and Kubernetes for orchestration in the SilverLink SG course project. Every SilverLink microservice runs in its own isolated container.'],
  ['kubernetes', 'In SilverLink SG, Kubernetes handles container orchestration and horizontal scaling on an 8-node cluster. With EMA-based load forecasting, the platform scales microservices ahead of demand.'],

  // Background
  ['graduat*', 'I graduate in April 2027 from Singapore Institute of Technology × University of Glasgow, with a BSc (Hons) in Computing Science.'],
  ['background', 'I\'m a Computing Science student at Singapore Institute of Technology (SIT) × University of Glasgow, with a foundation in Electrical Engineering from Nanyang Polytechnic. I bridge physical operations and digital systems, from 240MWp+ solar operations to cloud-native microservice platforms.'],
  ['education', 'BSc (Hons) Computing Science at Singapore Institute of Technology (SIT) × University of Glasgow, graduating April 2027. Before that: Diploma in Electrical Engineering with Eco-Design from Nanyang Polytechnic.'],
  ['about', ABOUT],
  ['yourself', ABOUT],
  ['sit', 'I study at Singapore Institute of Technology (SIT) in partnership with the University of Glasgow. My course is Computing Science, and I graduate in April 2027.'],
  ['nyp', 'I completed a Diploma in Electrical Engineering with Eco-Design at Nanyang Polytechnic (NYP) before joining SIT for my degree.'],
  ['contact', 'You can reach me at johnaaronmb@gmail.com, or connect on LinkedIn at linkedin.com/in/john-branzuela. Open to AI, data and software graduate roles.'],
  ['email', 'Drop me an email at johnaaronmb@gmail.com.'],
  ['linkedin', 'Connect with me on LinkedIn: linkedin.com/in/john-branzuela'],
];

function keywordPattern(key: string): RegExp {
  const stem = key.endsWith('*');
  const escaped = (stem ? key.slice(0, -1) : key).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(stem ? `\\b${escaped}\\w*` : `\\b${escaped}s?\\b`, 'i');
}

const ANSWERS = KNOWLEDGE_BASE.map(([key, answer]) => ({ pattern: keywordPattern(key), answer }));

const FALLBACK =
  "I don't have an answer for that yet. Try projects, experience, skills or education, or email johnaaronmb@gmail.com.";

function findResponse(query: string): string {
  return ANSWERS.find(({ pattern }) => pattern.test(query))?.answer ?? FALLBACK;
}

const QUICK_ACTIONS = [
  { label: 'About me', query: 'Tell me about yourself' },
  { label: 'Projects', query: 'Tell me about your projects' },
  { label: 'Experience', query: 'Tell me about your experience' },
  { label: 'Skills', query: 'What are your skills' },
  { label: 'Education', query: 'Tell me about your education' },
  { label: 'Contact', query: 'How can I contact you' },
];

const MASCOT_HAPPY = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png';
const MASCOT_WORRY = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-worrycopy_8d3aee8e.png';

// User: orange + ink (8.08). Bot: cream + navy (14.40), framed so it reads on the cream body.
const BUBBLE = {
  user: 'bg-[var(--orange)] text-black',
  system: 'bg-[var(--cream)] text-[color:var(--navy)]',
};

// Typing animation: reveals the answer letter by letter (full text for screen readers)
function TypingMessage({ content, role }: { content: string; role: 'user' | 'system' }) {
  const reduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (reduceMotion) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [content, reduceMotion]);

  const visibleText = reduceMotion ? content : displayedText;

  return (
    <div className={`p-2.5 border-2 border-black font-mono text-[15px] leading-relaxed ${BUBBLE[role]}`}>
      <span className="sr-only">{content}</span>
      <span aria-hidden="true">
        {visibleText}
        {visibleText.length < content.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: motionTokens.loop.blink, repeat: Infinity }}
            className="inline-block w-1 h-3 bg-current ml-1"
          />
        )}
      </span>
    </div>
  );
}

interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export default function MascotChatWidget() {
  const reduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: "Hi! I'm a small bot that knows John's projects, experience and skills. Pick a topic below or type a question.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // A question sent from outside (command palette), asked once the panel is open
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const refocusRef = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Close and put focus back on the launcher, so keyboard users aren't stranded
  const closeChat = () => {
    setIsOpen(false);
    launcherRef.current?.focus();
  };

  // Escape closes the chat (F13)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      // Leave Escape to a modal (terminal, palette, shortcuts) open on top
      if (e.key !== 'Escape' || document.querySelector('[aria-modal="true"]')) return;
      closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Keep the newest message in view (scrolls the log only, never the page)
  useEffect(() => {
    const log = logRef.current;
    log?.scrollTo({ top: log.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, isTyping, reduced]);

  // Other components (e.g. the command palette) open the chat with an
  // `open-chat` event, optionally carrying a question in detail.query
  useEffect(() => {
    const open = (e: Event) => {
      setIsOpen(true);
      // If the chat was already open, the open effect won't run again
      if (hasFinePointer()) requestAnimationFrame(() => inputRef.current?.focus());
      const query = (e as CustomEvent<{ query?: string } | null>).detail?.query;
      if (query) setPendingQuery(query);
    };
    window.addEventListener('open-chat', open);
    return () => window.removeEventListener('open-chat', open);
  }, []);

  // On open, focus the input where that won't pop an on-screen keyboard;
  // otherwise focus the dialog itself so screen readers land inside it
  useEffect(() => {
    if (!isOpen) return;
    if (hasFinePointer()) inputRef.current?.focus();
    else panelRef.current?.focus();
  }, [isOpen]);

  // The input is disabled while typing; give focus back if it had focus when the message was sent
  useEffect(() => {
    if (!isTyping && refocusRef.current) {
      refocusRef.current = false;
      inputRef.current?.focus();
    }
  }, [isTyping]);

  // Ask a queued question once the panel is open and the bot has finished replying
  useEffect(() => {
    if (!pendingQuery || !isOpen || isTyping) return;
    setPendingQuery(null);
    sendMessage(pendingQuery);
  }, [pendingQuery, isOpen, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }]);
    setInput('');

    // Short pause so the reply reads as a reply
    refocusRef.current = document.activeElement === inputRef.current;
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'system', content: findResponse(text), timestamp: new Date() },
    ]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : "Chat about John's work"}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        className={`btn focus-ring-float fixed bottom-4 right-4 sm:bottom-6 z-40 p-0 text-black ${isOpen ? 'bg-[var(--orange)]' : 'bg-[var(--cream)]'}`}
      >
        <div className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5">
          <img
            src={isTyping ? MASCOT_WORRY : MASCOT_HAPPY}
            alt=""
            className="w-8 h-8 sm:w-10 sm:h-10"
            style={{ imageRendering: 'pixelated' }}
          />
          <span className="hidden sm:inline font-pixel text-xs">
            {isOpen ? 'Close' : 'Chat'}
          </span>
        </div>
      </button>

      {/* chat.exe window: fixed height so it never grows past the viewport */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-label="Chat"
            tabIndex={-1}
            initial={{ opacity: 0, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
            className="window fixed bottom-24 left-2 right-2 sm:left-auto sm:right-4 z-50 sm:w-96 flex flex-col"
            style={{ height: 'min(520px, calc(100dvh - 8rem))' }}
          >
            <WindowBar title="chat.exe" onClose={closeChat} closeLabel="Close chat" />

            {/* Messages: flex-1 + min-h-0 lets the log scroll inside the flex column */}
            <div
              ref={logRef}
              className="window-body flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
              data-lenis-prevent
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: motionTokens.distance.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionTokens.duration.fast }}
                  className={`flex items-start gap-2 ${msg.role === 'system' ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.role === 'system' && (
                    <img src={MASCOT_HAPPY} alt="" className="flex-shrink-0 w-10 h-10" style={{ imageRendering: 'pixelated' }} />
                  )}
                  <div className="max-w-[80%]">
                    <TypingMessage content={msg.content} role={msg.role} />
                    <p className={`font-mono text-sm text-[color:var(--navy)] mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2 justify-start">
                  <img src={MASCOT_WORRY} alt="" className="flex-shrink-0 w-10 h-10" style={{ imageRendering: 'pixelated' }} />
                  <div className={`border-2 border-black px-4 py-3 font-mono text-[15px] ${BUBBLE.system}`}>
                    <span className="sr-only">Typing</span>
                    <span aria-hidden="true" className="animate-pulse">▌▌▌</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="window-body flex-shrink-0 border-t-[3px] border-black p-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
              {QUICK_ACTIONS.map(({ label, query }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(query)}
                  aria-disabled={isTyping}
                  className="btn btn-ghost-ink px-2 py-1"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Input row: the ring sits on the row because the input itself has no outline */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="window-body flex-shrink-0 border-t-[3px] border-black p-3 flex gap-3"
            >
              <div className="flex-1 min-w-0 flex items-center border-[3px] border-black px-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[color:var(--ink)] focus-within:outline-offset-2">
                <span aria-hidden="true" className="font-mono text-base font-bold mr-1">&gt;_</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about a project or skill"
                  aria-label="Ask about a project or skill"
                  className="flex-1 min-w-0 bg-transparent text-[color:var(--navy)] placeholder:text-[color:var(--navy)] placeholder:italic font-mono text-base outline-none"
                  disabled={isTyping}
                />
              </div>
              <button type="submit" aria-disabled={isTyping} className="btn btn-primary px-4">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
