import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import eventsImg from '@assets/silverlink_p19_img0.png';
import eventDetailImg from '@assets/silverlink_p21_img0.png';
import livestreamImg from '@assets/silverlink_p22_img0.png';
import metricsImg from '@assets/silverlink_p23_img0.png';
import onboardingImg from '@assets/silverlink_p14_img0.png';

export default function SilverLinkProject() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    trackProjectVisit('silverlink');
    document.title = 'SilverLink SG — John Aaron Branzuela';
    return () => { document.title = 'John Aaron Mendoza Branzuela | Computing Science Portfolio'; };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-30 bg-black border-b-2 border-amber-400 px-4 sm:px-8 py-3 flex items-center gap-4 overflow-hidden">
        <motion.button
          onClick={() => { play('back'); setLocation('/'); }}
          className="font-pixel text-xs text-amber-400 hover:text-white transition-colors flex items-center gap-2"
          whileHover={{ x: -4 }}
          whileTap={{ x: -4, scale: 0.95, transition: { duration: 0.1 } }}
        >
          ← BACK
        </motion.button>
        <span className="font-pixel text-xs text-zinc-500 truncate">/ SILVERLINK_SG</span>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h1 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-amber-400" style={{wordBreak:"break-all"}}>
              [SILVERLINK_SG]
            </h1>
            <p className="font-mono-8bit text-base sm:text-lg text-gray-300 max-w-3xl mt-4 leading-relaxed">
              Cloud-native platform bridging seniors and youth through skill-sharing and live events — backed by 4 gRPC microservices, WebRTC livestreaming, and Kubernetes autoscaling that scales to demand without manual intervention.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["React", "Next.js", "Node.js", "gRPC", "Docker", "Kubernetes", "PostgreSQL", "Neon", "Cloudflare", "Keycloak", "Prisma ORM", "WebRTC"].map(t => (
                <span key={t} className="font-mono text-xs text-blue-400 border border-blue-400 px-2 py-1">{t}</span>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <a href="https://github.com/johnaaronmendoza" target="_blank" rel="noopener noreferrer"
                className="font-pixel text-[10px] text-zinc-400 border border-zinc-700 px-3 py-2 hover:border-amber-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2">
                ↗ SOURCE CODE
              </a>
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="border-2 border-amber-400 bg-zinc-900 p-5">
                <p className="font-pixel text-xs text-amber-400 mb-2">[INSTITUTION]</p>
                <p className="font-mono-8bit text-sm">University of Glasgow &amp; Singapore Institute of Technology</p>
              </div>
              <div className="border-2 border-amber-400 bg-zinc-900 p-5">
                <p className="font-pixel text-xs text-amber-400 mb-2">[TEAM]</p>
                <p className="font-mono-8bit text-sm">Group 20 — Danish, John, Thomas, Hanaa, Habib, Joshua</p>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Key metrics bar */}
      <section className="py-10 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: "GRPC MICROSERVICES", value: "4" },
                { label: "TEAM MEMBERS", value: "6" },
                { label: "AGILE SPRINTS", value: "7" },
                { label: "LIVESTREAMING", value: "WebRTC" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-pixel text-amber-400 text-xl sm:text-2xl mb-1">{value}</p>
                  <p className="font-mono text-[10px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-10">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_CHALLENGE]</h2>
            <div className="border-2 border-amber-400 bg-zinc-900 p-6 sm:p-8 space-y-4">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                By 2030, 1 in 4 Singaporeans will be over 65. Many seniors face isolation, loss of purpose,
                and exclusion from digital society — while youth miss out on cultural wisdom and mentorship
                from experienced generations.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed text-amber-400 font-bold">
                "How might we leverage technology in ways that are intuitive, culturally sensitive, and engaging to build community within seniors?" — PB-2
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_SOLUTION]</h2>
            <div className="border-2 border-amber-400 bg-zinc-900 p-6 sm:p-8">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed mb-6">
                SilverLink SG transforms potential social fragmentation into meaningful intergenerational
                exchange through a production-ready cloud-native platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Skill-sharing workshops and mentorship",
                  "Micro-volunteering task marketplace",
                  "Event booking with seat management",
                  "Live video streaming via WebRTC",
                  "Real-time chat with Socket.IO",
                  "Achievement badges and recognition system",
                  "Predictive autoscaling with EMA forecasting",
                  "Optimistic concurrency for race condition prevention",
                ].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0 mt-1">▸</span>
                    <span className="font-mono-8bit text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Platform Screenshots */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[PLATFORM_UI]</h2>
          </FramerReveal>

          <div className="space-y-8">
            <FramerReveal>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">ONBOARDING FLOW</p>
                <img src={onboardingImg} alt="SilverLink onboarding" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </FramerReveal>

            <FramerReveal>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">EVENTS DISCOVERY</p>
                <img src={eventsImg} alt="SilverLink events listing" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </FramerReveal>

            <FramerReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="font-pixel text-xs text-blue-400">EVENT DETAIL + BOOKING</p>
                  <img src={eventDetailImg} alt="SilverLink event detail" className="w-full border-4 border-amber-400 shadow-8bit" />
                </div>
                <div className="space-y-3">
                  <p className="font-pixel text-xs text-blue-400">LIVE STREAMING STUDIO</p>
                  <img src={livestreamImg} alt="SilverLink livestream" className="w-full border-4 border-amber-400 shadow-8bit" />
                </div>
              </div>
            </FramerReveal>

            <FramerReveal>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">SYSTEM METRICS + AUTOSCALING DASHBOARD</p>
                <img src={metricsImg} alt="SilverLink system metrics" className="w-full border-4 border-amber-400 shadow-8bit" />
              </div>
            </FramerReveal>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[ARCHITECTURE]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "CLOUD_LAYER",
                  items: ["Neon Serverless PostgreSQL", "Cloudflare Tunnel (HTTPS)", "GitHub Actions CI/CD", "One-command deploy scripts"],
                },
                {
                  label: "MICROSERVICES",
                  items: ["API Gateway (REST → gRPC)", "Event Service (port 50051)", "Booking Service (port 50052)", "Volunteer + User Services"],
                },
                {
                  label: "DATABASE",
                  items: ["8 isolated schemas", "Prisma ORM (type-safe)", "Per-service Prisma client", "Connection pooling"],
                },
                {
                  label: "DEVOPS",
                  items: ["Docker Compose (local)", "Kubernetes orchestration", "Keycloak auth + JWT", "Secrets via CI/CD / K8s"],
                },
              ].map(({ label, items }) => (
                <div key={label} className="border-2 border-amber-400 bg-zinc-900 p-5">
                  <p className="font-pixel text-xs text-amber-400 mb-4">[ {label} ]</p>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">▸</span>
                        <span className="font-mono-8bit text-xs">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="mt-8 border-2 border-blue-400 bg-zinc-900 p-6 sm:p-8">
              <p className="font-pixel text-xs text-blue-400 mb-4">[KEY_ALGORITHMS]</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Optimistic Concurrency Control", desc: "Version-checked atomic updates prevent double-booking under concurrent traffic (409 on conflict)." },
                  { name: "Idempotency Keys", desc: "Guarantees exactly-once execution — repeated requests with the same key return the same result." },
                  { name: "EMA Autoscaling", desc: "Exponential Moving Average forecasts future load and recommends proactive microservice scaling." },
                ].map(a => (
                  <div key={a.name}>
                    <p className="font-pixel text-xs text-amber-400 mb-2">{a.name}</p>
                    <p className="font-mono-8bit text-xs text-gray-300 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="border-4 border-amber-400 shadow-8bit bg-zinc-900 p-8 sm:p-12 text-center space-y-6">
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
                  onClick={() => setLocation('/projects/scs')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  SCS PLATFORM →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
