import { motion, AnimatePresence } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import CountUp from '@/components/CountUp';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';

import uatDashboardImg  from '@assets/uat_dashboard_full.png';
import uatDefectsImg    from '@assets/uat_defects.png';
import uatDetailImg     from '@assets/uat_defect_detail.png';
import uatTestcasesImg  from '@assets/uat_testcases.png';
import uatReportsImg    from '@assets/uat_reports_full.png';

const SCREENSHOTS = [
  {
    key: 'dashboard',
    label: 'DASHBOARD',
    src: uatDashboardImg,
    caption: 'Executive dashboard: real-time defect counts, severity breakdown bar chart, and monthly trend area chart',
  },
  {
    key: 'defects',
    label: 'DEFECTS',
    src: uatDefectsImg,
    caption: 'Defect register: 25 logged issues across 8 modules, filterable by module, severity, and lifecycle status',
  },
  {
    key: 'detail',
    label: 'DEFECT DETAIL',
    src: uatDetailImg,
    caption: 'DEF-025: full defect record with severity badge, expected vs actual result, and reproduction steps',
  },
  {
    key: 'testcases',
    label: 'TEST CASES',
    src: uatTestcasesImg,
    caption: 'Test case management: 35 cases with execution status and direct links to the defects they exposed',
  },
  {
    key: 'reports',
    label: 'REPORTS',
    src: uatReportsImg,
    caption: 'Analytics: defects by module, defects by status, and test execution coverage breakdown per module',
  },
];

const MODULES = [
  { name: 'Appointment Scheduling', defects: 5, risk: 'HIGH' },
  { name: 'User Authentication',    defects: 5, risk: 'HIGH' },
  { name: 'Notifications',          defects: 4, risk: 'CRITICAL' },
  { name: 'Billing & Payments',     defects: 4, risk: 'HIGH' },
  { name: 'Medical Records',        defects: 3, risk: 'MEDIUM' },
  { name: 'Patient Registration',   defects: 2, risk: 'MEDIUM' },
  { name: 'Doctor Management',      defects: 1, risk: 'LOW' },
  { name: 'Reports & Analytics',    defects: 1, risk: 'LOW' },
];

const RISK_COLOR: Record<string, string> = {
  CRITICAL: 'text-red-400 border-red-400',
  HIGH:     'text-amber-400 border-amber-400',
  MEDIUM:   'text-blue-400 border-blue-400',
  LOW:      'text-zinc-400 border-zinc-400',
};

const ROLES = [
  {
    role: 'Project Manager',
    color: 'text-amber-400',
    responsibilities: [
      'Full dashboard read access and trend analytics',
      'Export defect register and test case log to CSV',
      'View severity distribution for go/no-go decisions',
      'Assign defects to team members',
    ],
  },
  {
    role: 'QA Lead',
    color: 'text-blue-400',
    responsibilities: [
      'Create and edit test cases with preconditions and steps',
      'Triage defect severity (Critical to Low) and priority (P1 to P4)',
      'Link failed test cases to the defects they exposed',
      'Manage execution status across the full test suite',
    ],
  },
  {
    role: 'Tester',
    color: 'text-amber-400',
    responsibilities: [
      'Log new defects with expected vs actual results',
      'Update execution status on assigned test cases',
      'Document steps to reproduce for each logged defect',
      'View own defect assignments and status updates',
    ],
  },
  {
    role: 'Developer',
    color: 'text-blue-400',
    responsibilities: [
      'View assigned defects with full reproduction steps',
      'Update defect status: In Progress, Resolved',
      'Access expected vs actual result for each bug',
      'Track resolution history via timestamps',
    ],
  },
];

const SEVERITY_MATRIX = [
  { sev: 'Critical', pri: 'P1', color: 'text-red-400',   desc: 'System unusable or data loss risk. Blocks go-live.' },
  { sev: 'High',     pri: 'P2', color: 'text-amber-400', desc: 'Core functionality broken. Major workaround required.' },
  { sev: 'Medium',   pri: 'P3', color: 'text-blue-400',  desc: 'Feature degraded. Minor workaround available.' },
  { sev: 'Low',      pri: 'P4', color: 'text-zinc-400',  desc: 'Cosmetic or edge case. No workflow impact.' },
];

export default function UATProject() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    trackProjectVisit('uat');
    document.title = 'UAT Testing Dashboard | John Aaron Branzuela';
    return () => { document.title = 'John Aaron Mendoza Branzuela | Computing Science Portfolio'; };
  }, []);

  const activeShot = SCREENSHOTS.find(s => s.key === activeTab)!;

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

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Identity card */}
              <div className="lg:col-span-8 bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8">
                <h1 className="font-pixel text-2xl sm:text-3xl text-amber-400 leading-relaxed mb-6" style={{ wordBreak: 'break-all' }}>
                  [UAT_TESTING_DASHBOARD_&_DEFECT_TRACKER]<span className="blink-cursor">█</span>
                </h1>
                <p className="font-mono-8bit text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  Full-stack defect tracker built for a real hospital appointment system UAT cycle.
                  Test cases link directly to open defects; severity triage charts helped manage
                  25 issues across 8 modules and 4 user roles, from tester to project lead.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React_18', 'Vite', 'Tailwind_CSS', 'Node.js', 'Express', 'SQLite', 'Recharts', 'REST_API'].map(t => (
                    <span key={t} className="bg-[#353535] px-3 py-1 font-mono text-[11px] text-amber-400 border border-amber-500/20">--{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
                  {[
                    { label: '[TYPE]',   value: 'Full-Stack Web App' },
                    { label: '[DOMAIN]', value: 'Hospital Appointment' },
                    { label: '[ROLES]',  value: 'PM / QA Lead / Tester / Dev' },
                    { label: '[YEAR]',   value: '2024' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#1b1b1b] p-4">
                      <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">{label}</p>
                      <p className="font-mono-8bit text-xs">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <a
                href="https://github.com/johnaaronmendoza/UAT-Testing-Dashboard-Defect-Tracker-for-Hospital-Appointment-System"
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

      {/* Key metrics */}
      <section className="border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
              {[
                { label: 'DEFECTS LOGGED', value: 25 },
                { label: 'TEST CASES',     value: 35 },
                { label: 'PASS RATE %',    value: 31 },
                { label: 'MODULES TESTED', value: 8  },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1f1f1f] p-6 text-center">
                  <p className="font-pixel text-amber-400 text-xl sm:text-2xl mb-2">
                    <CountUp to={value} duration={1600} />
                  </p>
                  <p className="font-mono text-[10px] text-amber-500/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[SCREENSHOTS]</h2>

            {/* Tab row */}
            <div className="flex flex-wrap gap-2 mb-5">
              {SCREENSHOTS.map(s => (
                <button
                  key={s.key}
                  onClick={() => setActiveTab(s.key)}
                  className={`font-pixel text-[10px] px-3 py-1.5 border-2 transition-colors ${
                    activeTab === s.key
                      ? 'border-amber-400 text-black bg-amber-400'
                      : 'border-zinc-700 text-zinc-500 hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Screenshot display */}
            <div className="relative border-2 border-amber-500/20 bg-[#1b1b1b] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <img
                    src={activeShot.src}
                    alt={activeShot.label}
                    className="w-full h-auto block"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="font-mono-8bit text-xs text-zinc-500 mt-3 leading-relaxed">
              ▸ {activeShot.caption}
            </p>
          </FramerReveal>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_PROBLEM]</h2>
            <div className="bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8 space-y-4">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                UAT for complex healthcare systems involves multiple teams: project managers,
                QA leads, testers, and developers, all needing a shared view of what is broken,
                what has been tested, and what is blocking go-live. Spreadsheets break down fast.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                This dashboard provides a single source of truth: defects with full lifecycle
                tracking, test cases linked directly to the defects they exposed, and a real-time
                analytics view so the team knows exactly where UAT stands before any deployment decision.
              </p>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* UAT Process */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto space-y-14">

          {/* Test scope */}
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-2">[UAT_PROCESS]</h2>
            <p className="font-mono-8bit text-sm text-zinc-500 mb-8 leading-relaxed">
              How the test cycle was scoped, executed, and documented.
            </p>

            <h3 className="font-pixel text-xs text-blue-400 mb-4">[ TEST SCOPE — 8 MODULES ]</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-amber-500/10">
              {MODULES.map((m, i) => (
                <motion.div
                  key={m.name}
                  className="bg-[#1b1b1b] p-4 flex items-center justify-between gap-4"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-zinc-600 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono-8bit text-xs">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-[10px] text-zinc-500">{m.defects} defects</span>
                    <span className={`font-pixel text-[9px] border px-1.5 py-0.5 ${RISK_COLOR[m.risk]}`}>
                      {m.risk}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FramerReveal>

          {/* Severity matrix */}
          <FramerReveal>
            <h3 className="font-pixel text-xs text-blue-400 mb-4">[ SEVERITY / PRIORITY MATRIX ]</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-amber-500/10">
              {SEVERITY_MATRIX.map(({ sev, pri, color, desc }) => (
                <div key={sev} className="bg-[#1b1b1b] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-pixel text-xs ${color}`}>{sev}</span>
                    <span className="font-mono text-[10px] text-zinc-600">{pri}</span>
                  </div>
                  <p className="font-mono-8bit text-xs text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </FramerReveal>

          {/* Sample test case */}
          <FramerReveal>
            <h3 className="font-pixel text-xs text-blue-400 mb-4">[ SAMPLE TEST CASE ARTIFACT — TC-022 ]</h3>
            <div className="bg-[#1b1b1b] border-2 border-amber-500/20">
              {/* Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
                {[
                  { label: 'CODE',    value: 'TC-022' },
                  { label: 'MODULE',  value: 'Notifications' },
                  { label: 'STATUS',  value: 'FAIL' },
                  { label: 'LINKED',  value: 'DEF-025' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 tracking-widest">{label}</p>
                    <p className={`font-mono-8bit text-xs ${value === 'FAIL' ? 'text-red-400' : value.startsWith('DEF') ? 'text-amber-400' : 'text-white'}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-pixel text-[9px] text-zinc-600 mb-1 tracking-widest">TITLE</p>
                  <p className="font-mono-8bit text-sm text-white">Verify Notification Service Stability Under High Load</p>
                </div>
                <div>
                  <p className="font-pixel text-[9px] text-zinc-600 mb-1 tracking-widest">PRECONDITIONS</p>
                  <p className="font-mono-8bit text-xs text-zinc-300 leading-relaxed">
                    System is running with an active notification queue. User is authenticated as QA Tester.
                    Notification service is operational with 100+ pending items queued.
                  </p>
                </div>
                <div>
                  <p className="font-pixel text-[9px] text-zinc-600 mb-1 tracking-widest">TEST STEPS</p>
                  <div className="bg-[#111] p-4 font-mono text-xs text-gray-300 space-y-1">
                    <p>1. Queue 100+ notification events simultaneously across all types</p>
                    <p>2. Monitor notification service health in real time</p>
                    <p>3. Observe system behaviour under concurrent load</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-pixel text-[9px] text-zinc-600 mb-1 tracking-widest">EXPECTED RESULT</p>
                    <div className="bg-[#0d2318] border border-green-800 p-3">
                      <p className="font-mono-8bit text-xs text-green-400">Notifications processed in queue without crash</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-pixel text-[9px] text-zinc-600 mb-1 tracking-widest">ACTUAL RESULT</p>
                    <div className="bg-[#230d0d] border border-red-800 p-3">
                      <p className="font-mono-8bit text-xs text-red-400">Service crashes, all pending notifications lost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FramerReveal>

          {/* Stakeholder roles */}
          <FramerReveal>
            <h3 className="font-pixel text-xs text-blue-400 mb-4">[ STAKEHOLDER ROLES — REQUIREMENTS BY ROLE ]</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ROLES.map(({ role, color, responsibilities }) => (
                <motion.div
                  key={role}
                  className="bg-[#1b1b1b] border-t border-amber-500/20 p-5"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                >
                  <p className={`font-pixel text-xs ${color} mb-4`}>[ {role.toUpperCase().replace(/ /g, '_')} ]</p>
                  <ul className="space-y-2">
                    {responsibilities.map(r => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-0.5">▸</span>
                        <span className="font-mono-8bit text-xs leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[KEY_FEATURES]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  label: 'DEFECT MANAGEMENT',
                  items: [
                    'Full CRUD with search and severity/status filtering',
                    'Severity: Critical, High, Medium, Low with P1-P4 priority',
                    'Status lifecycle: Open, In Progress, Resolved, Closed, Reopened',
                    'Assigned-to tracking with steps to reproduce',
                    'Expected vs actual result fields on every defect',
                  ],
                },
                {
                  label: 'TEST CASE MANAGEMENT',
                  items: [
                    'Test case execution tracking: Pass, Fail, Blocked, Not Executed',
                    'Preconditions and step-by-step test documentation',
                    'Direct linking of failed test cases to open defects',
                    'Module-based organisation across 8 system areas',
                    'Executed-by and execution date logging',
                  ],
                },
                {
                  label: 'ANALYTICS DASHBOARD',
                  items: [
                    'Real-time defect severity breakdown bar chart',
                    'Monthly defect trend area chart (total, open, closed)',
                    'Test execution status donut charts by module',
                    'Live count metrics for open, in-progress, and resolved',
                    'Built with Recharts for responsive, declarative charts',
                  ],
                },
                {
                  label: 'REPORTING AND EXPORT',
                  items: [
                    '1-click CSV export for defect register and test case log',
                    'Role-based access: PM, QA Lead, Tester, Developer',
                    'Morgan request logging for auditability',
                    'Seed script generates realistic demo data on first run',
                    'Sonner toast notifications for all CRUD operations',
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
                  label: 'FRONTEND',
                  color: 'border-amber-400',
                  accent: 'text-amber-400',
                  items: ['React 18 with Vite', 'Tailwind CSS (custom design tokens)', 'Recharts for analytics', 'Axios for API requests', 'React Router v6', 'Sonner toast notifications', 'Lucide React icons'],
                },
                {
                  label: 'BACKEND',
                  color: 'border-blue-400',
                  accent: 'text-blue-400',
                  items: ['Node.js + Express REST API', 'better-sqlite3 (synchronous)', 'Morgan HTTP logging', 'CORS middleware', 'Auto seed on first run', 'Runs on localhost:5000'],
                },
                {
                  label: 'DATABASE',
                  color: 'border-amber-400',
                  accent: 'text-amber-400',
                  items: ['SQLite (uat_tracker.db)', 'users table (4 roles)', 'defects table (full lifecycle)', 'test_cases table (exec tracking)', 'FK: test_cases → defects', 'Timestamps on all records'],
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
