/**
 * ChatHeader Component - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Title "JOHN_AARON_OS v1.0"
 * - GitHub and LinkedIn links styled as retro buttons
 * - Sharp borders and hard shadows
 */

import { motion } from 'framer-motion';

export default function ChatHeader() {
  return (
    <div className="border-b-2 border-amber-400 bg-black px-4 sm:px-6 py-4 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Title */}
        <motion.h1
          className="font-pixel text-sm sm:text-lg text-amber-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          JOHN_AARON_OS<br className="sm:hidden" />
          <span className="text-xs sm:text-sm"> v1.0</span>
        </motion.h1>

        {/* Social Links */}
        <motion.div
          className="flex gap-2 sm:gap-3 flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="https://github.com/johnaaronmendoza"
            target="_blank"
            rel="noopener noreferrer"
            className="border-8bit shadow-8bit px-3 sm:px-4 py-2 font-pixel text-xs sm:text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/john-branzuela/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-8bit-blue shadow-8bit-blue px-3 sm:px-4 py-2 font-pixel text-xs sm:text-sm font-bold text-white bg-blue-500 hover:bg-blue-400 transition-colors"
          >
            IN
          </a>
        </motion.div>
      </div>
    </div>
  );
}
