import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-pixel text-[80px] sm:text-[120px] text-amber-400 leading-none glitch" data-text="404">
            404
          </p>
        </motion.div>

        <motion.div
          className="border-4 border-amber-400 shadow-8bit bg-zinc-900 p-8 space-y-4"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-pixel text-sm text-amber-400">[ PAGE_NOT_FOUND ]</p>
          <p className="font-mono-8bit text-sm text-gray-300 leading-relaxed">
            This page doesn't exist or was moved.<br />
            Head back to the portfolio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setLocation('/')}
            className="border-8bit shadow-8bit px-8 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm"
            whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B' }}
            whileTap={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B', scale: 0.97 }}
            transition={{ duration: 0.1 }}
          >
            ← BACK TO PORTFOLIO
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
