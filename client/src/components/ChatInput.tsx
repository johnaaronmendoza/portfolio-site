/**
 * ChatInput Component - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Sticky bottom bar with text input
 * - Styled like a command-line prompt (>_)
 * - Amber SEND button with hard shadow
 * - Sharp borders, no soft styling
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  isDisabled?: boolean;
}

export default function ChatInput({ onSend, isDisabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isDisabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-amber-400 bg-black px-4 sm:px-6 py-4 sticky bottom-0"
    >
      <div className="flex gap-2 sm:gap-4 items-center max-w-4xl mx-auto">
        {/* Prompt Symbol */}
        <span className="font-pixel text-amber-400 text-sm sm:text-base flex-shrink-0">
          &gt;_
        </span>

        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query..."
          disabled={isDisabled}
          className="flex-1 bg-black text-white font-mono-8bit text-sm sm:text-base border-b-2 border-blue-500 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
        />

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={isDisabled || !input.trim()}
          className="border-8bit shadow-8bit px-4 sm:px-6 py-2 font-pixel text-xs sm:text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          whileHover={
            !isDisabled && input.trim()
              ? {
                  y: 2,
                  boxShadow: '0px 0px 0px 0px #F59E0B',
                  transition: { duration: 0.1 },
                }
              : {}
          }
        >
          SEND
        </motion.button>
      </div>
    </form>
  );
}
