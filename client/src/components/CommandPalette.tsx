/**
 * CommandPalette - Ctrl+K Command Menu
 * Design: Industrial Retro-Futurism
 * - Quick navigation to portfolio sections
 * - Chat actions and shortcuts
 * - Authentic OS-style command interface
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
  category: 'navigation' | 'chat' | 'action';
}

// Trigger React-controlled input via native value setter
function triggerChatQuery(query: string) {
  const chatButton = document.querySelector('button[data-chat-toggle]') as HTMLButtonElement;
  if (chatButton) chatButton.click();
  setTimeout(() => {
    const input = document.querySelector('input[data-chat-input]') as HTMLInputElement;
    if (!input) return;
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeSetter?.call(input, query);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    setTimeout(() => {
      const form = document.querySelector('form[data-chat-form]') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
    }, 50);
  }, 350);
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setLocation] = useLocation();

  const commands: Command[] = [
    // Navigation — sections
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
    // Navigation — project pages
    {
      id: 'proj-silverlink',
      label: 'Project: SilverLink SG',
      description: 'Cloud-native gRPC microservices platform',
      action: () => { setLocation('/projects/silverlink'); setIsOpen(false); },
      category: 'navigation',
    },
    {
      id: 'proj-scs',
      label: 'Project: SCS Awareness Platform',
      description: 'Visual novel engine for cancer outreach booths',
      action: () => { setLocation('/projects/scs'); setIsOpen(false); },
      category: 'navigation',
    },
    {
      id: 'proj-firesafety',
      label: 'Project: Fire Safety Drill Companion',
      description: 'Android AR + ML + Dijkstra pathfinding app',
      action: () => { setLocation('/projects/firesafety'); setIsOpen(false); },
      category: 'navigation',
    },
    {
      id: 'proj-uwb',
      label: 'Project: UWB Indoor Localization',
      description: 'SVM-RBF ML pipeline — 89.61% accuracy',
      action: () => { setLocation('/projects/uwb'); setIsOpen(false); },
      category: 'navigation',
    },
    {
      id: 'proj-uat',
      label: 'Project: UAT Testing Dashboard',
      description: 'Full-stack defect tracker with real-time analytics',
      action: () => { setLocation('/projects/uat'); setIsOpen(false); },
      category: 'navigation',
    },
    {
      id: 'proj-ai-finance',
      label: 'Project: AI Finance Insights Engine',
      description: 'ETL pipeline + NLP engine + Power BI Star Schema',
      action: () => { setLocation('/projects/ai-finance'); setIsOpen(false); },
      category: 'navigation',
    },
    // Chat Actions
    {
      id: 'chat-open',
      label: 'Open Chat',
      description: 'Open the chat widget',
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
      description: 'Chat: Sembcorp internship details',
      action: () => {
        setIsOpen(false);
        triggerChatQuery('Tell me about your Sembcorp experience');
      },
      category: 'chat',
    },
    {
      id: 'chat-projects',
      label: 'Ask About Projects',
      description: 'Chat: overview of all projects',
      action: () => {
        setIsOpen(false);
        triggerChatQuery('What are your projects');
      },
      category: 'chat',
    },
    {
      id: 'chat-skills',
      label: 'Ask About Skills',
      description: 'Chat: tech stack and tools',
      action: () => {
        setIsOpen(false);
        triggerChatQuery('What are your skills');
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

          {/* Command Palette — M06 CRT boot sequence */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0.04 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl bg-black border-4 border-amber-400 shadow-8bit overflow-hidden"
            style={{ transformOrigin: 'top' }}
          >
            {/* CRT flash — 1-frame white flash on open */}
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none z-10"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
            />
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
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.04, ease: [0.23, 1, 0.32, 1] }}
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
                    <div className="font-mono font-bold text-sm">{cmd.label}</div>
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
