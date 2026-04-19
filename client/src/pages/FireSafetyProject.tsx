import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import onboardingImg from '@assets/firesafety_p29_img1.png';
import dashboardImg from '@assets/firesafety_p29_img2.png';
import drillSetupImg from '@assets/firesafety_p29_img3.png';
import floorplanImg from '@assets/firesafety_p29_img4.png';
import arImg from '@assets/firesafety_p29_img5.png';
import extinguisherImg from '@assets/firesafety_p30_img0.png';
import quizImg from '@assets/firesafety_p30_img1.png';
import analyticsImg from '@assets/firesafety_p30_img3.png';

export default function FireSafetyProject() {
  const [, setLocation] = useLocation();
  useEffect(() => { trackProjectVisit('firesafety'); }, []);

  const stats = [
    { label: "KOTLIN SOURCE", value: "10,984 lines" },
    { label: "TEST CODE", value: "5,458 lines" },
    { label: "TEST FILES", value: "26 files" },
    { label: "TEST COVERAGE", value: "~80%" },
    { label: "GIT COMMITS", value: "120" },
    { label: "SUS SCORE", value: "79 / 100" },
    { label: "LANGUAGES", value: "4 (EN/ZH/TA/MS)" },
    { label: "BACKLOG DELIVERED", value: "9/9 + 6 bonus" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-30 bg-black border-b-2 border-amber-400 px-4 sm:px-8 py-3 flex items-center gap-4">
        <motion.button
          onClick={() => setLocation('/')}
          className="font-pixel text-xs text-amber-400 hover:text-white transition-colors"
          whileHover={{ x: -4 }}
          whileTap={{ x: -4, scale: 0.95, transition: { duration: 0.1 } }}
        >
          ← BACK
        </motion.button>
        <span className="font-pixel text-xs text-gray-600">/ FIRE_SAFETY_DRILL_COMPANION</span>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h1 className="font-pixel text-2xl sm:text-4xl text-amber-400 leading-relaxed">
              [ FIRE_SAFETY<br className="sm:hidden" />_DRILL_COMPANION ]
            </h1>
            <p className="font-mono-8bit text-base sm:text-lg text-gray-300 max-w-3xl mt-4 leading-relaxed">
              Native Android app empowering HDB residents to rehearse fire evacuation at their own convenience —
              with AR-guided navigation, on-device ML, and sensor-fusion positioning. No internet required.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Kotlin", "Jetpack Compose", "MVVM", "Hilt DI", "ARCore", "TFLite", "Room DB", "Firebase FCM", "Dijkstra", "Weinberg PDR"].map(t => (
                <span key={t} className="font-mono text-xs text-blue-400 border border-blue-400 px-2 py-1">{t}</span>
              ))}
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="border-2 border-amber-400 bg-zinc-900 p-4">
                <p className="font-pixel text-xs text-amber-400 mb-1">[ COURSE ]</p>
                <p className="font-mono-8bit text-xs">INF2007 Mobile App Dev</p>
              </div>
              <div className="border-2 border-amber-400 bg-zinc-900 p-4">
                <p className="font-pixel text-xs text-amber-400 mb-1">[ TEAM ]</p>
                <p className="font-mono-8bit text-xs">Group 16, SIT</p>
              </div>
              <div className="border-2 border-amber-400 bg-zinc-900 p-4">
                <p className="font-pixel text-xs text-amber-400 mb-1">[ SPRINTS ]</p>
                <p className="font-mono-8bit text-xs">3 Agile sprints</p>
              </div>
              <div className="border-2 border-amber-400 bg-zinc-900 p-4">
                <p className="font-pixel text-xs text-amber-400 mb-1">[ PLATFORM ]</p>
                <p className="font-mono-8bit text-xs">Android (Pixel 6a)</p>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {stats.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="font-pixel text-amber-400 text-sm sm:text-base mb-1">{value}</p>
                  <p className="font-mono text-[10px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[ THE_PROBLEM ]</h2>
            <div className="border-2 border-amber-400 bg-zinc-900 p-6 sm:p-8 space-y-4">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                Singapore's ~1.1 million HDB flats house 80% of the population, many in blocks exceeding 20 storeys.
                SCDF fire drills have consistently low participation — especially among elderly residents facing
                mobility challenges, language barriers, or unfamiliarity with evacuation routes in their own block.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed text-amber-400">
                The Fire Safety Drill Companion lets residents rehearse fire evacuation on-demand, inside their own HDB block,
                without organized group drills or SCDF supervision — fully offline.
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[ MY_CONTRIBUTIONS ]</h2>
            <div className="border-2 border-blue-400 bg-zinc-900 p-6 sm:p-8">
              <p className="font-mono-8bit text-xs text-blue-400 mb-4">John Aaron — Algorithms & AR (49 commits)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Dijkstra shortest-path with dynamic hazard re-routing",
                  "ARCore session lifecycle management",
                  "AR corridor rendering and waypoint placement",
                  "3D-to-2D coordinate projection (ArWaypointConverter)",
                  "PDR sensor fusion optimization (accelerometer + gyroscope)",
                  "Blocked-node parameter for real-time stairwell exclusion",
                  "findPathToNearestExit() across all exit nodes",
                  "Thread-safe @Synchronized path computation",
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

      {/* Screenshots */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-10">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[ APP_SCREENS ]</h2>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">ONBOARDING</p>
                <img src={onboardingImg} alt="Onboarding flow" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">MAIN DASHBOARD</p>
                <img src={dashboardImg} alt="Dashboard" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">DRILL SETUP — BLOCK & UNIT SELECTION</p>
                <img src={drillSetupImg} alt="Drill setup" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">2D FLOOR PLAN + DIJKSTRA PATHFINDING</p>
                <img src={floorplanImg} alt="Floor plan navigation" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">AR CORRIDOR NAVIGATION — LIVE BREADCRUMB ARROWS</p>
              <img src={arImg} alt="AR navigation" className="w-full border-4 border-amber-400 shadow-8bit" />
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">EXTINGUISHER ID — ON-DEVICE TFLITE ML</p>
                <img src={extinguisherImg} alt="Extinguisher classification" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">SAFETY QUIZ + GAMIFICATION</p>
                <img src={quizImg} alt="Safety quiz" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">ANALYTICS DASHBOARD — DRILL HISTORY + SUS SCORES</p>
              <img src={analyticsImg} alt="Analytics" className="w-full border-4 border-amber-400 shadow-8bit" />
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Tech deep-dive */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[ ADVANCED_FEATURES ]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  label: "SENSOR FUSION PDR",
                  desc: "Weinberg stride estimation (K × amplitude^0.25) fused with accelerometer, gyroscope, and step counter. Targets meter-level indoor positioning without GPS or WiFi infrastructure.",
                },
                {
                  label: "AR NAVIGATION",
                  desc: "ARCore overlays breadcrumb arrows on live camera feed. ArWaypointConverter handles 3D-to-2D graph-to-metre coordinate projection with origin offset and viewport transforms.",
                },
                {
                  label: "ON-DEVICE ML",
                  desc: "TFLite + YOLO classifies fire extinguisher types (Powder/Water/CO₂) from CameraX frames. No network latency — continues to function offline during actual emergencies.",
                },
                {
                  label: "DIJKSTRA PATHFINDING",
                  desc: "O((V+E)logV) priority-queue implementation on JSON floor plan graphs. blockedNodes param dynamically excludes smoke-affected stairwells for real-time re-routing.",
                },
                {
                  label: "ROOM DATABASE v3",
                  desc: "Three entities: drill_history, quiz_scores, sus_scores. Tested schema migrations v1→v2→v3. Flow-based reactive queries for real-time chart updates.",
                },
                {
                  label: "FIREBASE FCM",
                  desc: "Push notifications for drill reminders. DrillReminderService handles background delivery. Fully localised notification content across all 4 languages.",
                },
              ].map(({ label, desc }) => (
                <motion.div
                  key={label}
                  className="border-2 border-amber-400 bg-zinc-900 p-5"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-pixel text-xs text-amber-400 mb-3">[ {label} ]</p>
                  <p className="font-mono-8bit text-xs text-gray-300 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="border-4 border-amber-400 shadow-8bit bg-zinc-900 p-8 sm:p-12 text-center space-y-6">
              <h2 className="font-pixel text-xl sm:text-2xl text-amber-400">[ VIEW_MORE_PROJECTS ]</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => setLocation('/')}
                  className="border-8bit shadow-8bit px-6 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  ← BACK TO PORTFOLIO
                </motion.button>
                <motion.button
                  onClick={() => setLocation('/projects/uwb')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  NEXT: UWB PROJECT →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
