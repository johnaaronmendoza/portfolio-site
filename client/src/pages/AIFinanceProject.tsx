import { motion } from 'framer-motion';
import FramerReveal from '@/components/FramerReveal';
import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackProjectVisit } from '@/hooks/useAchievements';
import { play } from '@/hooks/useSound';

export default function AIFinanceProject() {
  const [, setLocation] = useLocation();
  useEffect(() => { trackProjectVisit('ai-finance'); }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-30 bg-black border-b-2 border-amber-400 px-4 sm:px-8 py-3 flex items-center gap-4 overflow-hidden">
        <motion.button
          onClick={() => { play('back'); setLocation('/'); }}
          className="font-pixel text-xs text-amber-400 hover:text-white transition-colors"
          whileHover={{ x: -4 }}
          whileTap={{ x: -4, scale: 0.95, transition: { duration: 0.1 } }}
        >
          ← BACK
        </motion.button>
        <span className="font-pixel text-xs text-zinc-500 truncate hidden sm:block">/ AI_FINANCE_INSIGHTS_DASHBOARD</span>
        <span className="font-pixel text-xs text-zinc-500 sm:hidden">/ AI_FINANCE</span>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h1 className="font-pixel text-2xl sm:text-4xl text-amber-400 leading-relaxed" style={{wordBreak:"break-all"}}>
              [AI_FINANCE_INSIGHTS_&_LOGISTICS_ENGINE]
            </h1>
            <p className="font-mono-8bit text-base sm:text-lg text-gray-300 max-w-3xl mt-4 leading-relaxed">
              Enterprise-grade ETL data pipeline that ingests global logistics, commodity, and
              financial market data — enriched with an AI NLP summarisation engine — producing
              a unified data warehouse ready for Power BI dashboards.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Python", "Pandas", "NumPy", "SQLite", "Pytest", "ETL Pipeline", "NLP", "Power BI"].map(t => (
                <span key={t} className="font-mono text-xs text-blue-400 border border-blue-400 px-2 py-1">{t}</span>
              ))}
            </div>
          </FramerReveal>

          <FramerReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "[TYPE]", value: "ETL + AI Pipeline" },
                { label: "[DOMAIN]", value: "Shipping & Logistics" },
                { label: "[ DATA SOURCES ]", value: "5 Market Feeds" },
                { label: "[ TEST COVERAGE ]", value: "100% (Pytest)" },
              ].map(({ label, value }) => (
                <div key={label} className="border-2 border-amber-400 bg-zinc-900 p-4">
                  <p className="font-pixel text-xs text-amber-400 mb-1">{label}</p>
                  <p className="font-mono-8bit text-xs">{value}</p>
                </div>
              ))}
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
                { label: "NEWS SECTORS CLASSIFIED", value: "9" },
                { label: "DATA VALIDATION GATES", value: "2" },
                { label: "ETL PIPELINE STAGES", value: "5" },
                { label: "DB SCHEMA MODEL", value: "Star" },
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

      {/* Problem */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400">
        <div className="max-w-6xl mx-auto space-y-8">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[THE_PROBLEM]</h2>
            <div className="border-2 border-amber-400 bg-zinc-900 p-6 sm:p-8 space-y-4">
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                Maritime logistics and shipping analysts deal with fragmented market data: Brent crude
                prices, USD/SGD FX rates, logistics stock performance, and geopolitical news all live
                in separate sources with no unified view.
              </p>
              <p className="font-mono-8bit text-sm sm:text-base leading-relaxed">
                This pipeline solves that by automatically ingesting and transforming these data
                sources, computing financial metrics like rolling volatility and cross-asset
                correlations, and enriching news data with AI-generated sentiment scores and
                supply chain risk flags — producing a clean, normalised data warehouse ready
                for high-fidelity Power BI analytics.
              </p>
            </div>
          </FramerReveal>

          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-6">[PIPELINE_ARCHITECTURE]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-stretch">
              {[
                { step: "01", label: "EXTRACT", desc: "S&P 500, Brent Oil, USD/SGD FX, Maersk proxy, geopolitical news", color: "border-amber-400 text-amber-400" },
                { step: "→", label: "", desc: "", color: "border-transparent text-gray-600", arrow: true },
                { step: "02", label: "VALIDATE", desc: "Schema checks, row count parity, missing-value detection (raw gate)", color: "border-blue-400 text-blue-400" },
                { step: "→", label: "", desc: "", color: "border-transparent text-gray-600", arrow: true },
                { step: "03", label: "TRANSFORM", desc: "Rolling volatility, moving averages, cross-asset correlations, standard deviations", color: "border-amber-400 text-amber-400" },
              ].map(({ step, label, desc, color, arrow }) => (
                arrow ? (
                  <div key={step} className="flex items-center justify-center text-gray-600 font-pixel text-lg">→</div>
                ) : (
                  <div key={step} className={`border-2 ${color} bg-zinc-900 p-4 space-y-2`}>
                    <p className={`font-pixel text-[10px] ${color.split(' ')[1]}`}>[ {step} ]</p>
                    <p className="font-pixel text-xs text-white">{label}</p>
                    <p className="font-mono-8bit text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                )
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-stretch mt-2">
              {[
                { step: "04", label: "VALIDATE", desc: "Clean gate: schema correctness and row parity before database load", color: "border-blue-400 text-blue-400" },
                { step: "→", label: "", desc: "", color: "border-transparent text-gray-600", arrow: true },
                { step: "05", label: "LOAD", desc: "Loads into SQLite data warehouse with pipeline_runs audit table", color: "border-amber-400 text-amber-400" },
                { step: "→", label: "", desc: "", color: "border-transparent text-gray-600", arrow: true },
                { step: "AI", label: "NLP ENGINE", desc: "Classifies 9 sectors, sentiment scores, supply chain risk flags, executive briefs", color: "border-blue-400 text-blue-400" },
              ].map(({ step, label, desc, color, arrow }) => (
                arrow ? (
                  <div key={step} className="flex items-center justify-center text-gray-600 font-pixel text-lg">→</div>
                ) : (
                  <div key={step} className={`border-2 ${color} bg-zinc-900 p-4 space-y-2`}>
                    <p className={`font-pixel text-[10px] ${color.split(' ')[1]}`}>[ {step} ]</p>
                    <p className="font-pixel text-xs text-white">{label}</p>
                    <p className="font-mono-8bit text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                )
              ))}
            </div>
          </FramerReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-b-4 border-amber-400 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <FramerReveal>
            <h2 className="font-pixel text-2xl sm:text-3xl text-amber-400 mb-8">[ENGINEERING_HIGHLIGHTS]</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  label: "DATA QUALITY GATES",
                  items: ["Schema correctness validation", "Row count parity checks", "Missing-value detection", "Runs between every pipeline stage", "Prevents corrupt data reaching the DB"],
                },
                {
                  label: "FINANCIAL ANALYTICS",
                  items: ["Rolling volatility calculation", "Moving averages (configurable window)", "Cross-asset correlations", "Standard deviation outlier detection", "Brent crude, FX, logistics stocks"],
                },
                {
                  label: "AI NLP ENGINE",
                  items: ["Classifies headlines across 9 sectors", "Semantic sentiment scoring", "Supply chain risk flagging", "Daily executive brief auto-generation", "LLM API integration path built-in"],
                },
                {
                  label: "AUDITABILITY",
                  items: ["pipeline_runs table tracks every run", "Central config.py for all settings", "Comprehensive system logging", "All transformations traceable", "Designed for DevOps deployment"],
                },
                {
                  label: "TEST-DRIVEN",
                  items: ["100% Pytest coverage on extraction", "100% coverage on transformation", "Schema assignment assertions", "Mathematical computation verification", "Run before any production deployment"],
                },
                {
                  label: "POWER BI READY",
                  items: ["Star Schema data model (Fact + Dim)", "Dim_Date table for time-series slicing", "Market anomalies dashboard-ready", "Shipping and freight variance views", "Sentiment matrix visualisation"],
                },
              ].map(({ label, items }) => (
                <motion.div
                  key={label}
                  className="border-2 border-amber-400 bg-black p-5"
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

      {/* CTA */}
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
                  onClick={() => setLocation('/projects/silverlink')}
                  className="border-8bit-blue shadow-8bit-blue px-6 py-3 font-mono-8bit font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-sm"
                  whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6' }}
                  whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #3B82F6', scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  SILVERLINK SG →
                </motion.button>
              </div>
            </div>
          </FramerReveal>
        </div>
      </section>
    </div>
  );
}
