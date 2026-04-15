/**
 * ChatBubble Component - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - User messages: Amber (#F59E0B) border and hard shadow
 * - System messages: Electric Blue (#3B82F6) border and hard shadow
 * - Monospace font for authenticity
 * - Sharp 2px borders, no soft gradients
 */

import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'system';
}

export default function ChatBubble({ message, sender }: ChatBubbleProps) {
  const isUser = sender === 'user';

  const bubbleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 font-mono-8bit text-sm sm:text-base leading-relaxed ${
          isUser
            ? 'border-8bit shadow-8bit bg-black text-amber-400'
            : 'border-8bit-blue shadow-8bit-blue bg-zinc-900 text-white'
        }`}
      >
        {message}
      </div>
    </motion.div>
  );
}
