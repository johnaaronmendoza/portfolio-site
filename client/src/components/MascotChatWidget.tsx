/**
 * MascotChatWidget - Floating AI Chat Widget
 * Design: Industrial Retro-Futurism
 * - Fixed position in bottom-right corner
 * - Collapsible/expandable chat interface
 * - Integrated mascot avatar with idle/thinking states
 * - Keyword-based knowledge base responses
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';

// Typing Animation Component
function TypingMessage({ content, role }: { content: string; role: 'user' | 'system' }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
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
  }, [content]);

  return (
    <div
      className={`max-w-xs p-2.5 border-2 ${
        role === 'user'
          ? 'border-amber-400 bg-black text-white'
          : 'border-blue-400 bg-black text-white'
      } font-mono text-[11px] leading-relaxed`}
    >
      {displayedText}
      {displayedText.length < content.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1 h-3 bg-white ml-1"
        />
      )}
    </div>
  );
}

interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  displayedContent?: string;
  timestamp: Date;
  reactions?: Record<string, number>;
}

export default function MascotChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: "Hey! I'm John Aaron. Ask me anything about my projects, experience, skills, or how to get in touch.",
      timestamp: new Date(),
      reactions: {}
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reactionEmojis = ['👍', '❤️', '🤔', '😂', '🔥'];

  // Knowledge base for responses
  const knowledgeBase: Record<string, string> = {
    // Sembcorp / Experience
    'sembcorp': 'I interned as a Digitization Analyst at Sembcorp Solar Singapore (Oct 2020 – Jun 2021), one of SG\'s largest solar players with 240MWp+ across 1,500+ sites. I led the company-wide rollout of the Momens CRM, hosted Zoom training sessions for 10+ stakeholders at a time, gathered UX feedback to liaise with vendors on new features, and performed QA on all new Momens releases before deployment.',
    'experience': 'My experience: Digitization Analyst Intern at Sembcorp Solar Singapore (Oct 2020 – Jun 2021). I rolled out Momens CRM across Projects, C&I, and SolarNova divisions; trained stakeholders; and supported SolarNova 3 (50MWp, 20 MOE schools) project tracking. It taught me to bridge physical operations with digital systems.',
    'internship': 'I interned at Sembcorp Solar Singapore as a Digitization Analyst. I owned the Momens CRM rollout, ran training sessions (10+ people each), gathered feedback from internal teams, and did QA for the SolarNova 3 platform.',
    'momens': 'Momens is a project management CRM used at Sembcorp Solar. I led its company-wide rollout, trained stakeholders across divisions, and acted as a liaison between users and the vendor to implement UI enhancements and fix bugs.',

    // SilverLink
    'silverlink': 'SilverLink SG is a cloud-native platform I built with Group 20 (SIT + University of Glasgow) to connect seniors and youth through skill-sharing, micro-volunteering, and community events. Tech: React, Next.js, Node.js, gRPC (4 microservices), Docker, Kubernetes, Neon PostgreSQL (serverless), Cloudflare Tunnel, Keycloak JWT auth, and Prisma ORM with 8 isolated schemas. Features include real-time WebRTC livestreaming, Socket.IO chat, an achievement system, and predictive autoscaling using EMA forecasting.',
    'grpc': 'In SilverLink SG, I used gRPC for all internal microservice communication. The API Gateway translates REST requests from the frontend to gRPC calls across 4 services: Event (50051), Booking (50052), Volunteer (50053), and User (50054).',
    'microservice': 'SilverLink uses 4 gRPC microservices: Event Service (event creation, seat availability), Booking Service (idempotent bookings, cancellations), Volunteer Service (listings, applications, assignments), and User Service (profiles, ratings, verification tiers).',

    // Singapore Cancer Society App
    'cancer': 'The Singapore Cancer Society Awareness Platform is an interactive visual novel engine I co-built for SCS outreach booths (SIT + UofG, Group D2, 7 Agile sprints). My contributions: Visual Novel PanelRenderer, multi-sprite character rendering, text animation, button sound effects, haptic feedback, and the Question Bank service. Tech: React 19, TypeScript, Vite, TailwindCSS, Supabase (PostgreSQL + Auth + Storage), deployed on Vercel.',
    'scs': 'The SCS platform is a browser-based visual novel that runs on tablets at community booths. It has 4 question types, multilingual support (EN/CN/Malay/Tamil), a leaderboard, PDPA consent, and a full no-code Admin Panel for SCS staff to create and manage stories without technical expertise.',
    'visual novel': 'I built the core PanelRenderer (visual novel engine) for the SCS project. It handles sequential and branching panel navigation, character sprites with multiple expressions, animated text, and configurable correct/incorrect feedback modals.',
    'supabase': 'In the SCS project, Supabase handles all backend needs: PostgreSQL for story/panel data, Supabase Auth for admin accounts with email verification, RLS (Row-Level Security) for role-based access, and Supabase Storage for character sprites and backgrounds.',

    // GreenLoopFarms
    'greenloop': 'GreenLoopFarms is a Singapore hydroponic urban farm growing pesticide-free vegetables and microgreens. I contributed to the early idea and business strategy, and helped co-prepare the pitch deck that won a SGD $10,000 NYP JumpStart Grant. Partners include FURA (World\'s 50 Best Discovery), East Bistro, NIE, NUS, and NYP. Visit greenloopfarms.com!',
    'grant': 'GreenLoopFarms won a SGD $10,000 NYP JumpStart Grant, a competitive startup grant from Nanyang Polytechnic for innovative ventures.',

    // Fire Safety
    'fire': 'The Fire Safety Drill Companion is a native Android app I built for HDB residents to rehearse fire evacuation on-demand. My core contributions: Dijkstra shortest-path with dynamic hazard re-routing, full ARCore integration, AR corridor rendering, and PDR sensor fusion optimization. Tech: Kotlin, Jetpack Compose, MVVM+Hilt, ARCore, TFLite, Room DB, Firebase FCM. Stats: 10,984 lines of Kotlin, ~80% test coverage, SUS score 79/100.',
    'android': 'I built the Fire Safety Drill Companion, a native Android app with 5 advanced features: AR navigation (ARCore), on-device ML (TFLite extinguisher classification), sensor-fusion PDR (Weinberg stride estimation), Room database, and Firebase push notifications. All offline-capable.',
    'arcore': 'In the Fire Safety project, I integrated ARCore for real-time corridor navigation. Breadcrumb arrows are overlaid on the live camera feed, guiding residents along the Dijkstra-computed evacuation route. I wrote ArCoreSessionManager, ArCoreRenderer, and ArWaypointConverter.',
    'dijkstra': 'I implemented Dijkstra\'s shortest-path algorithm for the Fire Safety app, applied to a weighted floor plan graph with a blockedNodes param for dynamic stairwell exclusion. findPathToNearestExit() runs against all exit nodes and picks the minimum-cost route. Thread-safe with @Synchronized.',

    // UAT Testing Dashboard
    'uat': 'The UAT Testing Dashboard is a full-stack defect tracker and UAT management tool I built for a Hospital Appointment System. It tracks defects end-to-end (Open → In Progress → Resolved → Closed), links failed test cases directly to open defects, and has a real-time analytics dashboard with severity breakdown charts and UAT progress trends. Role-based access for PM, QA Lead, Tester, and Developer. CSV export for defect registers and test logs. Tech: React 18, Node.js, Express, SQLite, Recharts.',
    'defect': 'In my UAT Testing Dashboard, defects go through a full lifecycle: Open → In Progress → Resolved → Closed. Each defect links directly to the test cases that triggered it, creating an auditable chain from failure to fix. Severity levels (Critical, High, Medium, Low) feed into the analytics dashboard.',

    // AI Finance Insights Engine
    'finance': 'The AI Finance Insights and Logistics Analytics Engine is an automated ETL pipeline that ingests 5 global market data sources: Brent crude, USD/SGD FX, S&P 500, logistics stocks, and geopolitical news. It computes rolling volatility, moving averages, and cross-asset correlations. An AI NLP engine classifies headlines across 9 sectors, scores sentiment, and flags supply chain risks. Output is a Star Schema data warehouse ready for Power BI. 100% Pytest coverage on all extraction and transformation logic.',
    'etl': 'My ETL pipeline (AI Finance Insights) has 5 stages: Extract → Validate (schema + row parity) → Transform (rolling metrics) → Validate again → Load to SQLite. Two validation gates prevent corrupt data from reaching the database at any stage.',
    'pipeline': 'The AI Finance pipeline ingests Brent crude, FX rates, S&P 500, logistics stocks, and geopolitical news. After transformation it produces a Star Schema data warehouse (Fact + Dim tables) consumed directly by Power BI for shipping and market analytics.',
    'nlp': 'My AI NLP engine (in the Finance Insights project) classifies market headlines across 9 sectors, generates sentiment scores, flags supply chain risks, and auto-generates daily executive briefs. Built with an LLM API integration path.',

    // UWB / Data Analytics
    'uwb': 'The UWB Indoor Localization project (CSC3105 Data Analytics) classifies LOS/NLOS UWB signal paths using SVM-RBF (89.61% accuracy, 0.9612 ROC-AUC) vs Logistic Regression (85.75%, 0.9195 AUC). Dataset: 41,996 samples across 7 indoor environments (Decawave DWM1000). I handled the data mining methodology: model selection, train/test split, RobustScaler, hyperparameter tuning, and range regression.',
    'machine learning': 'I have ML work across two projects: (1) UWB classification: SVM-RBF achieving 89.61% accuracy classifying indoor signal paths; (2) Fire Safety: on-device TFLite + YOLO for real-time fire extinguisher type classification without network dependency.',
    'data': 'My data analytics work: UWB Indoor Localization (CSC3105): full ML pipeline with PCA on 1,016 CIR dimensions, SVM-RBF (89.61% accuracy), logistic regression baseline (85.75%), and linear regression for dual-path range estimation (RMSE 1.757m). 41,996 samples, 7 environments, perfectly balanced 50/50 LOS/NLOS.',

    // Projects overview
    'projects': 'I have 7 projects: (1) SilverLink SG: cloud-native gRPC microservices platform with WebRTC; (2) SCS Awareness Platform: visual novel engine with React 19 + Supabase; (3) Fire Safety Drill Companion: Android AR + ML + Dijkstra; (4) UWB Indoor Localization: SVM-RBF ML pipeline at 89.61% accuracy; (5) UAT Testing Dashboard: full-stack defect tracker with real-time analytics; (6) AI Finance Insights Engine: ETL pipeline + NLP engine + Power BI Star Schema; (7) GreenLoopFarms: SGD $10k NYP JumpStart Grant winner.',

    // Skills
    'skills': 'Languages: Java, Python, C++, TypeScript, JavaScript. Frontend: React 19, Next.js, Tailwind CSS, Framer Motion. Backend: Node.js, gRPC, Prisma ORM, Supabase. DevOps: Docker, Kubernetes, GitHub Actions, Cloudflare. Databases: PostgreSQL (Neon serverless), MongoDB, SQL.',
    'tech': 'My stack: React 19 + TypeScript + Vite on the frontend; Node.js, gRPC, Prisma for backends; Docker + Kubernetes + GitHub Actions for DevOps; PostgreSQL (Neon serverless), Supabase, MongoDB for data.',
    'frontend': 'Frontend: React 19, Next.js, TypeScript, Vite, Tailwind CSS, Framer Motion. I built two full production frontends: SilverLink (skills platform) and the SCS visual novel engine.',
    'backend': 'Backend: Node.js, gRPC microservices, Prisma ORM, Supabase BaaS. In SilverLink I designed 4 independent gRPC services with optimistic concurrency control and idempotency keys.',
    'docker': 'I use Docker Compose for local development and Kubernetes for orchestration in production. Every SilverLink microservice runs in its own isolated container.',
    'kubernetes': 'In SilverLink SG, Kubernetes handles container orchestration and horizontal scaling. Combined with EMA-based autoscaling forecasting, the platform can proactively scale microservices under load.',

    // Background
    'background': 'I\'m a Computing Science student at Singapore Institute of Technology (SIT) × University of Glasgow, with a foundation in Electrical Engineering from Nanyang Polytechnic. I bridge physical operations and digital systems, from 240MWp+ solar operations to cloud-native microservice platforms.',
    'education': 'Computing Science at Singapore Institute of Technology (SIT) in partnership with University of Glasgow. Prior background: Diploma in Electrical Engineering with Eco-Design from Nanyang Polytechnic.',
    'about': 'I\'m John Aaron, a Computing Science student at SIT × University of Glasgow. My path into tech started at a Sembcorp internship where UAT testing sparked my curiosity about software. I love building things that solve real problems and help people.',
    'yourself': 'I\'m John Aaron, a Computing Science student at SIT × University of Glasgow. My path into tech started at a Sembcorp internship where UAT testing sparked my curiosity about software. I love building things that solve real problems and help people.',
    'sit': 'I study at Singapore Institute of Technology (SIT) in partnership with the University of Glasgow. My course is Computing Science.',
    'nyp': 'I completed a Diploma in Electrical Engineering with Eco-Design at Nanyang Polytechnic (NYP) before joining SIT for my degree.',
    'contact': 'You can reach me at johnaaronmb@gmail.com, or connect on LinkedIn at linkedin.com/in/john-branzuela. Always open to internships, collaborations, and interesting projects!',
    'email': 'Drop me an email at johnaaronmb@gmail.com. I try to respond within a day.',
    'linkedin': 'Connect with me on LinkedIn: linkedin.com/in/john-branzuela',
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Find matching response based on keywords
  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(keyword)) {
        return response;
      }
    }
    
    return "Data not found. Try asking about my [Experience], [Projects], [Skills], or [Background]!";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      reactions: {}
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find and add response
    const response = findResponse(input);
    const systemMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'system',
      content: response,
      timestamp: new Date(),
      reactions: {}
    };
    setMessages(prev => [...prev, systemMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    // Trigger send after setting input
    setTimeout(() => {
      const form = document.querySelector('form[data-chat-form]') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
    }, 0);
  };

  const mascotSrc = isTyping
    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-worrycopy_8d3aee8e.png"
    : "https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png";

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-40 bg-black border-2 border-amber-400 shadow-8bit hover:bg-zinc-900 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <img
            src={mascotSrc}
            alt="Chat"
            className="w-10 h-10"
            style={{ imageRendering: 'pixelated' }}
          />
          <span className="font-pixel text-xs text-amber-400">
            {isOpen ? 'CLOSE' : 'CHAT'}
          </span>
        </div>
      </motion.button>

      {/* Chat Widget Panel — fixed height so it never expands */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-0 sm:right-4 z-50 w-full sm:w-96 bg-black border-4 border-amber-400 shadow-8bit flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-zinc-900 border-b-2 border-amber-400 px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-xs text-amber-400">JOHN_AARON_OS</p>
                <p className="font-mono text-[10px] text-blue-400 mt-0.5">
                  {isTyping ? '● typing...' : '● online'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-shrink-0 font-pixel text-xs text-gray-500 hover:text-amber-400 transition-colors px-1"
              >
                ✕
              </button>
            </div>

            {/* Messages — flex-1 + min-h-0 is required for scroll to work in flex container */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-black" data-lenis-prevent>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-2 ${msg.role === 'system' ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Mascot avatar beside bot messages */}
                  {msg.role === 'system' && (
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-happycopy_aa6087aa.png"
                        alt="John Aaron"
                        className="w-10 h-10"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                  <div className="max-w-[75%]">
                    <TypingMessage content={msg.content} role={msg.role} />
                    <p className={`font-mono text-[10px] text-gray-600 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2 justify-start"
                >
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310519663399162945/5mLLaUiLoCi2BBtUhHeagh/LilJohnny-worrycopy_8d3aee8e.png"
                      alt="John Aaron"
                      className="w-10 h-10"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <div className="border-2 border-blue-400 bg-black px-4 py-3 font-mono text-xs text-blue-400">
                    <span className="animate-pulse">▌▌▌</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (show only on first message) */}
            <div className="flex-shrink-0 border-t-2 border-amber-400 bg-zinc-900 p-2 grid grid-cols-3 gap-1.5">
                {[
                  { label: 'About Me', query: 'Tell me about yourself' },
                  { label: 'Projects', query: 'Tell me about your projects' },
                  { label: 'Experience', query: 'Tell me about your experience' },
                  { label: 'Skills', query: 'What are your skills' },
                  { label: 'Education', query: 'Tell me about your education' },
                  { label: 'Contact', query: 'How can I contact you' },
                ].map(({ label, query }) => (
                  <button
                    key={label}
                    onClick={() => handleQuickAction(query)}
                    className="border border-amber-400 bg-black text-amber-400 font-pixel text-[8px] py-2 px-1 hover:bg-amber-400 hover:text-black transition-colors leading-tight"
                  >
                    {label}
                  </button>
                ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              data-chat-form
              className="border-t-2 border-amber-400 bg-zinc-900 p-3 flex gap-2"
            >
              <div className="flex-1 flex items-center border-2 border-blue-400 bg-black px-2">
                <span className="text-blue-400 font-pixel text-xs mr-1">&gt;_</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onInput={e => setInput((e.target as HTMLInputElement).value)}
                  placeholder="Type query..."
                  className="flex-1 bg-black text-white font-mono text-xs outline-none"
                  disabled={isTyping}
                  data-chat-input
                />
              </div>
              <button
                type="submit"
                disabled={isTyping}
                className="bg-amber-400 text-black font-pixel text-xs px-3 py-2 hover:bg-blue-400 transition-colors disabled:opacity-50"
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
