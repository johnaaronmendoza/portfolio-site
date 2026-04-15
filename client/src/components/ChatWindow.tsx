/**
 * ChatWindow Component - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Scrollable chat history area
 * - Displays user and system messages
 * - Shows quick action buttons below initial greeting
 * - Auto-scrolls to latest message
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';
import { Message, QuickAction } from '@/hooks/useChat';

interface ChatWindowProps {
  messages: Message[];
  quickActions: QuickAction[];
  onQuickAction: (query: string) => void;
  isTyping: boolean;
}

export default function ChatWindow({
  messages,
  quickActions,
  onQuickAction,
  isTyping,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 0);
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4" ref={scrollRef}>
      {/* Messages */}
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg.text} sender={msg.sender} />
      ))}

      {/* Quick Actions - Show only after first system message */}
      {messages.length === 1 && (
        <motion.div
          className="flex flex-wrap gap-2 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {quickActions.map((action, idx) => (
            <motion.button
              key={idx}
              onClick={() => onQuickAction(action.query)}
              className="border-8bit px-3 py-2 font-pixel text-xs sm:text-sm text-amber-400 bg-black hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
              whileHover={{
                y: 2,
                boxShadow: '0px 0px 0px 0px #F59E0B',
                transition: { duration: 0.1 },
              }}
              disabled={isTyping}
            >
              [ {action.label} ]
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          className="flex gap-1 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-8bit-blue shadow-8bit-blue bg-zinc-900 px-4 py-3 font-mono-8bit text-sm">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ▌
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
