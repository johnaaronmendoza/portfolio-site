import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocation } from 'wouter';
import FramerReveal from './FramerReveal';
import silverLinkImg from '@assets/silverlink_p19_img0.png';
import scsImg from '@assets/scs_p65_img0.png';
import fireSafetyImg from '@assets/firesafety_p29_img2.png';
import uwbImg from '@assets/da_p40_img1.png';

export default function Projects() {
  const [, setLocation] = useLocation();
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  const projects = [
    {
      name: "SilverLink SG",
      description:
        "Cloud-native platform connecting seniors and youth through skill-sharing, micro-volunteering, and live events. 4 gRPC microservices, WebRTC livestreaming, predictive autoscaling.",
      image: silverLinkImg,
      tags: ["React", "gRPC", "Docker", "Kubernetes", "PostgreSQL"],
      link: "/projects/silverlink",
    },
    {
      name: "SCS Awareness Platform",
      description:
        "Interactive visual novel engine for cancer-awareness outreach booths. Multilingual branching stories, gamification leaderboard, and a no-code admin panel for SCS staff.",
      image: scsImg,
      tags: ["React 19", "TypeScript", "Supabase", "Vercel"],
      link: "/projects/scs",
    },
    {
      name: "Fire Safety Drill Companion",
      description:
        "Native Android app for HDB fire evacuation training. AR-guided navigation, on-device TFLite ML, sensor-fusion PDR, Dijkstra pathfinding — fully offline. 10,984 lines of Kotlin.",
      image: fireSafetyImg,
      tags: ["Kotlin", "Jetpack Compose", "ARCore", "TFLite", "MVVM"],
      link: "/projects/firesafety",
    },
    {
      name: "UWB Indoor Localization",
      description:
        "ML pipeline classifying LOS/NLOS UWB signal paths using SVM-RBF (89.61% accuracy, 0.9612 AUC) across 41,996 samples from 7 indoor environments. Dual-path range regression.",
      image: uwbImg,
      tags: ["Python", "SVM", "PCA", "scikit-learn", "Data Analytics"],
      link: "/projects/uwb",
    },
    {
      name: "GreenLoopFarms",
      description:
        "Singapore hydroponic urban farm growing pesticide-free vegetables and microgreens. Contributed to the initial idea. Won SGD $10,000 NYP JumpStart Grant. Partners: FURA (World's 50 Best), NIE, NUS.",
      image: null,
      tags: ["NYP JumpStart", "SGD $10k Grant", "Urban Farming"],
      link: "external",
      externalUrl: "https://greenloopfarms.com/",
    },
  ];

  return (
    <FramerReveal>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-amber-400 mb-16">
            PROJECTS
          </h2>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, idx) => {
              const isComingSoon = project.link === "#";
              const isExternal = project.link === "external";

              const handleClick = () => {
                if (isComingSoon) return;
                if (isExternal && project.externalUrl) {
                  window.open(project.externalUrl, '_blank', 'noopener noreferrer');
                } else {
                  setLocation(project.link);
                }
              };

              return (
                <motion.div
                  key={idx}
                  className={`group ${(isComingSoon) ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={handleClick}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={isComingSoon ? {} : { y: -6, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={isComingSoon ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden border-4 border-amber-400 shadow-8bit mb-5 h-44 sm:h-48 bg-zinc-900">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className={`w-full h-full object-cover transition-transform duration-300 ${isComingSoon ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
                        <span className="font-pixel text-3xl">🌱</span>
                        <span className="font-pixel text-xs text-amber-400 text-center leading-relaxed">GREENLOOP<br/>FARMS</span>
                      </div>
                    )}
                    {isComingSoon && (
                      <div className="absolute inset-0 flex items-end justify-end p-3">
                        <span className="font-pixel text-[10px] text-amber-400 border border-amber-400 bg-black px-2 py-1">
                          COMING SOON
                        </span>
                      </div>
                    )}
                    {isExternal && (
                      <div className="absolute top-2 right-2">
                        <span className="font-pixel text-[10px] text-blue-400 border border-blue-400 bg-black px-2 py-1">
                          ↗ LIVE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <h3 className="font-pixel text-sm sm:text-base text-blue-400 leading-relaxed">
                      {project.name}
                    </h3>

                    <p className="font-mono-8bit text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-blue-400 border border-blue-400 px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {!isComingSoon && (
                      <motion.div
                        className="font-mono-8bit text-xs text-amber-400 font-bold hover:text-white transition-colors inline-flex items-center gap-1"
                        whileHover={{ x: 4 }}
                      >
                        {isExternal ? 'VISIT SITE ↗' : 'VIEW WORK →'}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </FramerReveal>
  );
}
