/**
 * CommandPalette - Ctrl+K Command Menu
 * Design: Industrial Retro-Futurism
 * - Quick navigation to portfolio sections
 * - Chat actions and shortcuts
 * - Authentic OS-style command interface
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
  category: 'navigation' | 'chat' | 'action';
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    // Navigation
    {
      id: 'nav-hero',
      label: 'Go to Hero',
      description: 'Jump to the hero section',
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      category: 'navigation',
    },
    {
      id: 'nav-about',
      label: 'Go to About',
      description: 'Jump to the about section',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      category: 'navigation',
    },
    {
      id: 'nav-experience',
      label: 'Go to Experience',
      description: 'Jump to the experience section',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      category: 'navigation',
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      description: 'Jump to the projects section',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      category: 'navigation',
    },
    {
      id: 'nav-skills',
      label: 'Go to Skills',
      description: 'Jump to the skills section',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      },
      category: 'navigation',
    },
    // Chat Actions
    {
      id: 'chat-open',
      label: 'Open Chat',
      description: 'Open the AI chat widget',
      action: () => {
        const chatButton = document.querySelector('button[data-chat-toggle]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
        setIsOpen(false);
      },
      category: 'chat',
    },
    {
      id: 'chat-experience',
      label: 'Ask About Experience',
      description: 'Query bot about Sembcorp experience',
      action: () => {
        const chatButton = document.querySelector('button[data-chat-toggle]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
        setTimeout(() => {
          const input = document.querySelector('input[placeholder="Type query..."]') as HTMLInputElement;
          if (input) {
            input.value = 'Tell me about Sembcorp';
            input.form?.dispatchEvent(new Event('submit', { bubbles: true }));
          }
        }, 300);
        setIsOpen(false);
      },
      category: 'chat',
    },
    {
      id: 'chat-projects',
      label: 'Ask About Projects',
      description: 'Query bot about projects',
      action: () => {
        const chatButton = document.querySelector('button[data-chat-toggle]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
        setTimeout(() => {
          const input = document.querySelector('input[placeholder="Type query..."]') as HTMLInputElement;
          if (input) {
            input.value = 'What are your projects';
            input.form?.dispatchEvent(new Event('submit', { bubbles: true }));
          }
        }, 300);
        setIsOpen(false);
      },
      category: 'chat',
    },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
        setSearch('');
        setSelectedIndex(0);
      }

      // Only handle keys if palette is open
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl bg-black border-4 border-amber-400 shadow-8bit"
          >
            {/* Search Input */}
            <div className="border-b-2 border-amber-400 p-4 bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-amber-400 text-sm">&gt;</span>
                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search commands..."
                  className="flex-1 bg-black text-white font-mono text-sm outline-none"
                />
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto bg-black">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-gray-500">
                  No commands found
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <motion.button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-zinc-800 transition-colors ${
                      idx === selectedIndex
                        ? 'bg-amber-400 text-black'
                        : 'bg-black text-white hover:bg-zinc-900'
                    }`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="font-pixel text-sm">{cmd.label}</div>
                    <div className="font-mono text-xs text-gray-500 mt-1">{cmd.description}</div>
                  </motion.button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t-2 border-amber-400 p-3 bg-zinc-900 flex justify-between text-xs font-mono text-gray-500">
              <span>↑↓ Navigate | Enter Select | Esc Close</span>
              <span>Ctrl+K Toggle</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
