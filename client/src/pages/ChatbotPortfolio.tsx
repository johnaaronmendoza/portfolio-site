/**
 * ChatbotPortfolio Page - 8-Bit Hardware Engineer Chatbot
 * Design: Industrial Retro-Futurism
 * - Full-screen chat interface
 * - Integrates ChatHeader, ChatWindow, ChatInput, and MascotPanel
 * - Responsive layout with mascot on the side
 */

import { useChat } from '@/hooks/useChat';
import ChatHeader from '@/components/ChatHeader';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import MascotPanel from '@/components/MascotPanel';

export default function ChatbotPortfolio() {
  const { messages, isTyping, sendMessage, quickActions } = useChat();

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <ChatHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 sm:gap-6 px-4 sm:px-6 py-4 overflow-hidden">
        {/* Mascot Panel - Hidden on mobile, visible on tablet and up */}
        <div className="hidden sm:flex flex-col flex-shrink-0 w-40 sm:w-48">
          <MascotPanel isTyping={isTyping} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 max-w-4xl mx-auto w-full">
          {/* Chat Window */}
          <ChatWindow
            messages={messages}
            quickActions={quickActions}
            onQuickAction={handleQuickAction}
            isTyping={isTyping}
          />

          {/* Chat Input */}
          <ChatInput onSend={sendMessage} isDisabled={isTyping} />
        </div>
      </div>

      {/* Mobile Mascot - Show on mobile only */}
      <div className="sm:hidden px-4 py-4 border-t-2 border-amber-400">
        <MascotPanel isTyping={isTyping} />
      </div>
    </div>
  );
}
