import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import CountUp from '@/components/CountUp';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import adminDashImg from '@assets/scs_p71_img1.png';
import panelEditorImg from '@assets/scs_p72_img0.png';
import statsImg from '@assets/scs_p72_img1.png';
import assetManagerImg from '@assets/scs_p73_img0.png';
import adminMgmtImg from '@assets/scs_p74_img1.png';

export default function SCSProject() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    trackProjectVisit('scs');
    document.title = 'SCS Awareness Platform — John Aaron Branzuela';
    return () => { document.title = 'John Aaron Mendoza Branzuela | Computing Science Portfolio'; };
  }, []);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-30 bg-[#131313] border-b border-amber-500/10 px-4 sm:px-8 py-3 flex items-center gap-4 overflow-hidden">
        <motion.button
          onClick={() => { play('back'); setLocation('/'); }}
          className="font-pixel text-xs text-amber-400 hover:text-white transition-colors flex items-center gap-2"
          whileHover={{ x: -4 }}
          whileTap={{ x: -4, scale: 0.95, transition: { duration: 0.1 } }}
        >
          ← BACK
        </motion.button>
        <span className="font-pixel text-xs text-zinc-500 truncate">/ SCS_AWARENESS_PLATFORM</span>
      </div>

      {/* Hero — Sovereign Console bento */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Identity card */}
              <div className="lg:col-span-8 bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8">
                <h1 className="font-pixel text-2xl sm:text-3xl text-amber-400 leading-relaxed mb-6" style={{wordBreak:"break-all"}}>
                  [SCS_AWARENESS_PLATFORM]<span className="blink-cursor">█</span>
                </h1>
                <p className="font-mono-8bit text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  Interactive visual novel engine for Singapore Cancer Society outreach booths.
                  Multilingual branching stories, gamification, and a full no-code admin panel
                  for SCS staff — deployed on tablets at community events.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React_19", "TypeScript", "Vite", "TailwindCSS", "Supabase", "PostgreSQL", "Vercel", "Agile_Scrum"].map(t => (
                    <span key={t} className="bg-[#353535] px-3 py-1 font-mono text-[11px] text-amber-400 border border-amber-500/20">--{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-px bg-amber-500/10">
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[INSTITUTION]</p>
                    <p className="font-mono-8bit text-xs leading-relaxed">SIT + University of Glasgow</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[TEAM]</p>
                    <p className="font-mono-8bit text-xs leading-relaxed">Group D2 — 4 members, 7 sprints</p>
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
                { label: "AGILE SPRINTS", value: "7" },
                { label: "LANGUAGES SUPPORTED", value: "4" },
                { label: "QUESTION TYPES", value: "4" },
                { label: "ADMIN PANEL", value: "No-Code" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1f1f1f] p-6 text-center">
                  <p className="font-pixel text-amber-400 text-xl sm:text-2xl mb-2"><CountUp to={value} duration={1600} /></p>
                  <p className="font-mono text-[10px] text-amber-500/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Problem + Scope */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_CHALLENGE]</h2>
            <div className="bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                Singapore Cancer Society (SCS) conducts community outreach to advocate for cancer
                awareness and early detection. Traditional booths lack interactivity — many visitors
                perceive outreach as monotonous or avoid it due to stigma, resulting in limited
                knowledge and reduced interest in screening programmes.
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[MY_CONTRIBUTIONS]</h2>
            <div className="bg-[#1b1b1b] border-l-4 border-blue-500 p-6 sm:p-8">
              <p className="font-mono-8bit text-xs text-blue-400 mb-4">John Aaron — core engine and media systems</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Visual Novel Engine (PanelRenderer component)",
                  "Multi-sprite & character rendering system",
                  "Text animation and font controls",
                  "Button sound effects and haptic feedback",
                  "Question Bank service and editor validation",
                  "Admin authentication (login / sign-up flows)",
                  "UI / Accessibility (tablet scaling)",
                  "Bug fixing and integration testing",
                ].map(c => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0 mt-1">▸</span>
                    <span className="font-mono-8bit text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Screenshots — Visitor Experience */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-2">[ADMIN_PANEL]</h2>
            <p className="font-mono-8bit text-sm text-gray-400 mb-8">
              A full no-code CMS allowing SCS staff to create stories, manage assets, view analytics, and control admin accounts — without technical expertise.
            </p>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">DASHBOARD — STORY MANAGEMENT</p>
              <img src={adminDashImg} alt="SCS admin dashboard" className="w-full border border-amber-500/20" />
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">PANEL EDITOR (WYSIWYG)</p>
                <img src={panelEditorImg} alt="SCS panel editor" className="w-full border border-amber-500/20" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">STORY STATISTICS + CSV EXPORT</p>
                <img src={statsImg} alt="SCS story statistics" className="w-full border border-amber-500/20" />
              </div>
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">ASSET MANAGER (DRAG & DROP)</p>
                <img src={assetManagerImg} alt="SCS asset manager" className="w-full border border-amber-500/20" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">ADMIN ACCOUNT MANAGEMENT</p>
                <img src={adminMgmtImg} alt="SCS admin management" className="w-full border border-amber-500/20" />
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[FEATURES]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  label: "VISITOR EXPERIENCE",
                  items: [
                    "Branching visual novel with character sprites",
                    "4 question types (single, multi, T/F, branching)",
                    "Multilingual: English, Chinese, Malay, Tamil",
                    "Real-time score tracking + leaderboard",
                    "PDPA consent gate with customisable text",
                    "Confetti + audio feedback on correct answers",
                  ],
                },
                {
                  label: "ADMIN PANEL",
                  items: [
                    "WYSIWYG panel editor with live preview",
                    "Drag-and-drop asset management (sprites, BGs)",
                    "Story flow visualisation (SVG auto-layout)",
                    "Analytics dashboard with Excel/CSV export",
                    "Auto-translate via MyMemory API",
                    "Role-based access: admin / super_admin",
                  ],
                },
                {
                  label: "ARCHITECTURE",
                  items: [
                    "React 19 SPA (visitor + admin, single deploy)",
                    "Supabase BaaS: PostgreSQL, Auth, Storage",
                    "Row-Level Security (RLS) at database level",
                    "Vercel hosting with GitHub auto-deploy",
                    "Kiosk mode: enforced fullscreen for booths",
                    "7 Agile Scrum sprints with burndown charts",
                  ],
                },
                {
                  label: "GAMIFICATION ENGINE",
                  items: [
                    "Dynamic scoring — max score tracks visited panels",
                    "Branching choices excluded from score",
                    "Top-10 leaderboard with personal rank",
                    "Configurable post-game actions (replay / URL)",
                    "Soft-delete panels with restore capability",
                    "6-colour branch coding in flow visualiser",
                  ],
                },
              ].map(({ label, items }) => (
                <motion.div
                  key={label}
                  className="bg-[#1b1b1b] border-t border-amber-500/20 p-6"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-pixel text-xs text-amber-400 mb-4">[ {label} ]</p>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 mt-1">▸</span>
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

      {/* Back CTA */}
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
                  onClick={() => setLocation('/projects/firesafety')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  FIRE SAFETY APP →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
