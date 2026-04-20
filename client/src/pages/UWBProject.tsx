import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import CountUp from '@/components/CountUp';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';
import confusionImg from '@assets/da_p40_img1.png';
import decisionBoundaryImg from '@assets/da_p39_img2.png';
import dtAccuracyImg from '@assets/da_p35_img1.png';
import classDistImg from '@assets/da_p9_img1.png';
import rocImg from '@assets/da_p41_img1.png';

export default function UWBProject() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    trackProjectVisit('uwb');
    document.title = 'UWB Indoor Localization — John Aaron Branzuela';
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
        <span className="font-pixel text-xs text-zinc-500 truncate">/ UWB_INDOOR_LOCALIZATION</span>
      </div>

      {/* Hero — Sovereign Console bento */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Identity card */}
              <div className="lg:col-span-8 bg-[#1b1b1b] border-l-4 border-amber-500 p-6 sm:p-8">
                <h1 className="font-pixel text-2xl sm:text-3xl text-amber-400 leading-relaxed mb-6" style={{wordBreak:"break-all"}}>
                  [UWB_INDOOR_LOCALIZATION]<span className="blink-cursor">█</span>
                </h1>
                <p className="font-mono-8bit text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  Full ML pipeline classifying LOS/NLOS Ultra-Wideband signal paths and estimating
                  indoor range — using SVM-RBF, logistic regression, and linear regression across
                  41,996 samples from 7 randomised indoor environments.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Python", "scikit-learn", "SVM-RBF", "Logistic_Regression", "PCA", "RobustScaler", "Pandas", "Matplotlib", "NumPy"].map(t => (
                    <span key={t} className="bg-[#353535] px-3 py-1 font-mono text-[11px] text-amber-400 border border-amber-500/20">--{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-amber-500/10">
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[COURSE]</p>
                    <p className="font-mono-8bit text-xs">CSC3105 Data Analytics</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[TEAM]</p>
                    <p className="font-mono-8bit text-xs">Group CS05, SIT</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[DATASET]</p>
                    <p className="font-mono-8bit text-xs">41,996 UWB samples</p>
                  </div>
                  <div className="bg-[#1b1b1b] p-4">
                    <p className="font-pixel text-[9px] text-amber-400/60 mb-1 uppercase tracking-widest">[BEST ACCURACY]</p>
                    <p className="font-mono-8bit text-xs">89.61% (SVM-RBF)</p>
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

      {/* Key results bar */}
      <section className="border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-amber-500/10">
              {[
                { label: "SVM ACCURACY", value: "89.61%" },
                { label: "SVM ROC-AUC", value: "0.9612" },
                { label: "LR ACCURACY", value: "85.75%" },
                { label: "LR ROC-AUC", value: "0.9195" },
                { label: "RANGE RMSE", value: "1.757 m" },
                { label: "PATH 2 R²", value: "0.6809" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1f1f1f] p-5 text-center">
                  <p className="font-pixel text-amber-400 text-base sm:text-lg mb-2"><CountUp to={value} duration={1600} /></p>
                  <p className="font-mono text-[10px] text-amber-500/40 uppercase tracking-widest leading-tight">{label}</p>
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
                Ultra-Wideband (UWB) supports sub-nanosecond time resolution and centimetre-level accuracy
                under ideal conditions — but accuracy degrades significantly under Non-Line-of-Sight (NLOS)
                conditions where the direct path is blocked by walls, furniture, or human bodies.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                This project classifies whether two shortest dominant signal paths form a (LOS, NLOS) or (NLOS, NLOS) pair,
                and estimates the measured range for both paths — enabling more reliable indoor positioning for
                autonomous robots, drones, smart warehouses, and asset tracking.
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[MY_CONTRIBUTIONS]</h2>
            <div className="bg-[#1b1b1b] border-l-4 border-blue-500 p-6 sm:p-8">
              <p className="font-mono-8bit text-xs text-blue-400 mb-4">John Aaron — Data Mining Methodology</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Model selection and justification (SVM vs LR vs DT)",
                  "80/20 stratified train-test split strategy",
                  "RobustScaler fitting on training data only (leakage prevention)",
                  "SVM-RBF hyperparameter C selection via train/test divergence",
                  "Multivariate linear regression for dual-path range estimation",
                  "Decision boundary visualisation across 7 classifiers",
                  "Feature importance analysis and interpretation",
                  "Results analysis in terms of NLOS/multipath effects",
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

      {/* Visualisations */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[RESULTS]</h2>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">CLASS DISTRIBUTION — PERFECTLY BALANCED (50/50 LOS/NLOS)</p>
              <img src={classDistImg} alt="Class distribution" className="w-full border border-amber-500/20" />
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">CONFUSION MATRICES — LOGISTIC REGRESSION vs SVM-RBF</p>
              <img src={confusionImg} alt="Confusion matrices" className="w-full border border-amber-500/20" />
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="space-y-3">
              <p className="font-pixel text-xs text-blue-400">MODEL COMPARISON — CLASSIFICATION METRICS + RANGE RMSE</p>
              <img src={rocImg} alt="Model comparison metrics" className="w-full border border-amber-500/20" />
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">DECISION TREE — OPTIMAL DEPTH SELECTION</p>
                <img src={dtAccuracyImg} alt="Decision tree accuracy vs depth" className="w-full border border-amber-500/20" />
              </div>
              <div className="space-y-3">
                <p className="font-pixel text-xs text-blue-400">DECISION BOUNDARIES — 7 CLASSIFIERS (RANGE vs FP_IDX)</p>
                <img src={decisionBoundaryImg} alt="Decision boundaries" className="w-full border border-amber-500/20" />
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[METHODOLOGY]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  label: "DATA PREPARATION",
                  items: ["41,996 samples, 7 environments", "Dropped zero-variance features (CH, BITRATE)", "PCA on 1,016 CIR dimensions", "Two-path class labelling", "RobustScaler (train only)"],
                },
                {
                  label: "CLASSIFICATION",
                  items: ["Logistic Regression (baseline)", "SVM-RBF (C selected via divergence)", "Decision Tree (depth=4 optimal)", "Stratified 80/20 split", "No data leakage"],
                },
                {
                  label: "RANGE REGRESSION",
                  items: ["Multivariate linear regression", "Path 1 RMSE: 1.757m, R²: 0.458", "Path 2 RMSE: 1.757m, R²: 0.681", "First-path NLOS bias partially captured", "Leakage-free train/test discipline"],
                },
                {
                  label: "EVALUATION",
                  items: ["Confusion matrix analysis", "ROC-AUC comparison", "Feature importance plots", "Decision boundary visualisation", "NLOS/multipath interpretation"],
                },
              ].map(({ label, items }) => (
                <motion.div
                  key={label}
                  className="bg-[#1b1b1b] border-t border-amber-500/20 p-5"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-pixel text-xs text-amber-400 mb-4">[ {label} ]</p>
                  <ul className="space-y-2">
                    {items.map(i => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">▸</span>
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
                  onClick={() => setLocation('/projects/uat')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  UAT DASHBOARD →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
