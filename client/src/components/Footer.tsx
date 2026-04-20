/**
 * Footer - 8-Bit Hardware Engineer Portfolio
 * Design: Industrial Retro-Futurism
 * - Minimal footer with gold border
 * - Monospace text
 * - Links to GitHub and LinkedIn
 */

import { motion } from 'framer-motion';
import { PixelGitHub, PixelLinkedIn, PixelEmail } from '@/components/PixelIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white px-4 sm:px-8 lg:px-16 py-12 sm:py-16 border-t-2 border-amber-400">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Contact CTA */}
        <div className="text-center space-y-4">
          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-xs text-zinc-400 tracking-widest">AVAILABLE FOR HIRE</span>
          </div>

          <motion.h2
            className="font-pixel text-xl sm:text-2xl text-amber-400 glitch"
            data-text="GET IN TOUCH"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            GET IN TOUCH
          </motion.h2>
          <p className="font-mono-8bit text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Open to internships, collaborations, and interesting projects.
          </p>
          <motion.a
            href="mailto:johnaaronmb@gmail.com"
            className="inline-flex items-center gap-3 border-8bit shadow-8bit px-6 py-3 font-mono-8bit font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            whileHover={{ y: 4, boxShadow: '0px 0px 0px 0px #F59E0B', transition: { duration: 0.1 } }}
            animate={{ boxShadow: ['4px 4px 0px 0px #F59E0B', '4px 4px 0px 0px #F59E0B, 0 0 16px rgba(245,158,11,0.5)', '4px 4px 0px 0px #F59E0B'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PixelEmail size={20} />
            SEND MESSAGE →
          </motion.a>

          {/* Terminal Easter egg hint */}
          <p className="font-mono text-[10px] text-zinc-600">
            or open the terminal and try{' '}
            <button
              className="text-amber-400 hover:text-white transition-colors"
              onClick={() => window.dispatchEvent(new Event('toggle-terminal'))}
            >
              {'>'} sudo hire-me
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="font-mono-8bit text-xs text-gray-600">
            © {currentYear} John Aaron Mendoza Branzuela
          </p>

          <div className="flex gap-5 items-center">
            <a
              href="https://github.com/johnaaronmendoza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono-8bit text-sm text-zinc-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <PixelGitHub size={28} fg="#F59E0B" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/john-branzuela/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono-8bit text-sm text-zinc-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <PixelLinkedIn size={28} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
