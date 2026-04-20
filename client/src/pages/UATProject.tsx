import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';

export default function UATProject() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    trackProjectVisit('uat');
    document.title = 'UAT Testing Dashboard — John Aaron Branzuela';
    return () => { document.title = 'John Aaron Mendoza Branzuela | Computing Science Portfolio'; };
  }, []);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-30 bg-[#131313] border-b border-amber-500/10 px-4 sm:px-8 py-3 flex items-center gap-4 overflow-hidden">
        <motion.button
          onClick={() => { play('back'); setLocation('/'); }}
          className="font-pixel text-xs text-amber-400 hover:text-white transition-colors"
          whileHover={{ x: -4 }}
          whileTap={{ x: -4, scale: 0.95, transition: { duration: 0.1 } }}
        >
          ← BACK
        </motion.button>
        <span className="font-pixel text-xs text-zinc-500 truncate">/ UAT_TESTING_DASHBOARD</span>
      </div>

      {/* Hero — Sovereign Console bento */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Identity card */}
              <div className="lg:col-span-8 bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8">
                <h1 className="font-pixel text-2xl sm:text-3xl text-amber-400 leading-relaxed mb-6" style={{wordBreak:"break-all"}}>
                  [UAT_TESTING_DASHBOARD_&_DEFECT_TRACKER]<span className="blink-cursor">█</span>
                </h1>
                <p className="font-mono-8bit text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  Full-stack web application for managing User Acceptance Testing for a Hospital
                  Appointment System — with real-time defect tracking, test case management,
                  defect-to-test linking, and analytics dashboards.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React_18", "Vite", "Tailwind_CSS", "Node.js", "Express", "SQLite", "Recharts", "REST_API"].map(t => (
                    <span key={t} className="bg-[#353535] px-3 py-1 font-mono text-[11px] text-amber-400 border border-amber-500/20">--{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[TYPE]</p>
                    <p className="font-mono-8bit text-xs">Full-Stack Web App</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[DOMAIN]</p>
                    <p className="font-mono-8bit text-xs">Hospital Appointment</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[USERS]</p>
                    <p className="font-mono-8bit text-xs">PM / QA Lead / Tester / Dev</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[DB]</p>
                    <p className="font-mono-8bit text-xs">SQLite (3 tables)</p>
                  </div>
                </div>
              </div>
              {/* CTA card */}
              <a
                href="https://github.com/johnaaronmendoza"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-4 bg-amber-500 p-6 sm:p-8 flex flex-col justify-between group hover:bg-amber-400 transition-colors duration-75 min-h-[200px]"
              >
                <div>
                  <p className="font-mono text-[10px] text-amber-900/60 uppercase tracking-[0.2em] mb-2">Access Protocol</p>
                  <h2 className="font-pixel text-lg sm:text-xl text-amber-900 leading-tight">VIEW_REPOSITORY</h2>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <span className="font-mono-8bit text-amber-900 text-sm">[ SOURCE_CODE ]</span>
                  <span className="text-2xl text-amber-900 group-hover:translate-x-1 transition-transform duration-75">→</span>
                </div>
              </a>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Key metrics bar */}
      <section className="border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
              {[
                { label: "SEVERITY LEVELS", value: "4" },
                { label: "DEFECT STATUSES", value: "5" },
                { label: "TEST EXEC STATES", value: "4" },
                { label: "EXPORT FORMATS", value: "CSV" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1f1f1f] p-6 text-center">
                  <p className="font-pixel text-amber-400 text-xl sm:text-2xl mb-2">{value}</p>
                  <p className="font-mono text-[10px] text-amber-500/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_PROBLEM]</h2>
            <div className="bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8 space-y-4">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                UAT for complex healthcare systems involves multiple teams — project managers, QA leads,
                testers, and developers — all needing a shared view of what is broken, what has been
                tested, and what is blocking go-live. Spreadsheets break down fast.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                This dashboard provides a single source of truth: defects with full lifecycle tracking,
                test cases linked directly to the defects they exposed, and a real-time analytics view
                so the team knows exactly where UAT stands before any deployment decision.
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[KEY_FEATURES]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  label: "DEFECT MANAGEMENT",
                  items: [
                    "Full CRUD with search and severity/status filtering",
                    "Severity: Critical → High → Medium → Low",
                    "Status lifecycle: Open → In Progress → Resolved → Closed → Reopened",
                    "Priority levels P1–P4 with assigned-to tracking",
                    "Steps to reproduce, expected vs actual result fields",
                  ],
                },
                {
                  label: "TEST CASE MANAGEMENT",
                  items: [
                    "Test case execution tracking (Pass / Fail / Blocked / Not Executed)",
                    "Preconditions and step-by-step test documentation",
                    "Direct linking of failed test cases to open defects",
                    "Module-based organisation for the appointment system",
                    "Executed-by and execution date logging",
                  ],
                },
                {
                  label: "ANALYTICS DASHBOARD",
                  items: [
                    "Real-time defect severity breakdown bar charts",
                    "UAT progress trend area charts over time",
                    "Test execution status pie charts",
                    "Live count metrics for open, in-progress, and resolved defects",
                    "Built with Recharts for responsive, declarative charts",
                  ],
                },
                {
                  label: "REPORTING AND EXPORT",
                  items: [
                    "1-click CSV export for defect register and test case log",
                    "Role-based access: PM, QA Lead, Tester, Developer",
                    "Morgan request logging for auditability",
                    "Seed script generates realistic demo data on first run",
                    "Sonner toast notifications for all CRUD operations",
                  ],
                },
              ].map(({ label, items }) => (
                <motion.div
                  key={label}
                  className="bg-[#1b1b1b] border-t border-amber-500/20 p-5"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <p className="font-pixel text-xs text-amber-400 mb-4">[ {label} ]</p>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">▸</span>
                        <span className="font-mono-8bit text-xs leading-relaxed">{i}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[ARCHITECTURE]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  label: "FRONTEND",
                  color: "border-amber-400",
                  accent: "text-amber-400",
                  items: ["React 18 with Vite", "Tailwind CSS (custom design tokens)", "Recharts for analytics", "Axios for API requests", "React Router v6", "Sonner toast notifications", "Lucide React icons"],
                },
                {
                  label: "BACKEND",
                  color: "border-blue-400",
                  accent: "text-blue-400",
                  items: ["Node.js + Express REST API", "better-sqlite3 (synchronous)", "Morgan HTTP logging", "CORS middleware", "Auto seed on first run", "Runs on localhost:5000"],
                },
                {
                  label: "DATABASE",
                  color: "border-amber-400",
                  accent: "text-amber-400",
                  items: ["SQLite (uat_tracker.db)", "users table (4 roles)", "defects table (full lifecycle)", "test_cases table (exec tracking)", "FK: test_cases → defects", "Timestamps on all records"],
                },
              ].map(({ label, color, accent, items }) => (
                <div key={label} className={`bg-[#1b1b1b] border-t-2 ${color} p-5`}>
                  <p className={`font-pixel text-xs ${accent} mb-4`}>[ {label} ]</p>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`${accent} flex-shrink-0`}>▸</span>
                        <span className="font-mono-8bit text-xs leading-relaxed">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="bg-[#1b1b1b] border-l-4 border-amber-500 p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-pixel text-xl sm:text-2xl text-amber-400">[VIEW_MORE_PROJECTS]</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => { play('back'); setLocation('/'); }}
                  className="border-8bit shadow-8bit px-6 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  ← BACK TO PORTFOLIO
                </motion.button>
                <motion.button
                  onClick={() => setLocation('/projects/ai-finance')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  AI FINANCE DASHBOARD →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
