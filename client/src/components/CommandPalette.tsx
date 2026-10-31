/**
 * CommandPalette - Ctrl+K Command Menu
 * Design: Industrial Retro-Futurism
 * - Quick navigation to portfolio sections
 * - Chat actions and shortcuts
 * - Authentic OS-style command interface
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { hasFinePointer } from '@/lib/utils';
import PixelArt from './PixelArt';

const SECTIONS = [
  { id: 'hero', name: 'top' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'skills', name: 'Skills' },
  { id: 'footer', name: 'Contact' },
];

interface Command {
  id: string;
  label: string;
  description: string;
  action: () => void;
  category: 'navigation' | 'chat' | 'action';
}

// Trigger React-controlled input via native value setter
function triggerChatQuery(query: string) {
  window.dispatchEvent(new Event('open-chat'));
  setTimeout(() => {
    const input = document.querySelector('input[data-chat-input]') as HTMLInputElement;
    if (!input) return;
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeSetter?.call(input, query);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    // Focus before submit so the chat hands focus back to the input after the reply (desktop only)
    if (hasFinePointer()) input.focus();
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
  const [location, setLocation] = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Restore focus to the element captured at open time, once the palette closes.
  useEffect(() => {
    if (isOpen) return;
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el && document.contains(el)) el.focus({ preventScroll: true });
  }, [isOpen]);

  // On Home, scroll to the section; elsewhere, go Home and let it scroll to the hash
  const goToSection = (id: string) => {
    const el = location === '/' ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else setLocation(`/#${id}`);
  };

  const commands: Command[] = [
    // Navigation — sections (from a case study, go to the Home section instead)
    ...SECTIONS.map(({ id, name }): Command => ({
      id: `nav-${id}`,
      label: `Go to ${name}`,
      description: id === 'hero' ? 'Jump to the top of the home page' : `Jump to the ${name.toLowerCase()} section`,
      action: () => { goToSection(id); setIsOpen(false); },
      category: 'navigation',
    })),
    // Actions
    {
      id: 'action-resume',
      label: 'Download resume',
      description: 'Save John\'s resume as a PDF',
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'John_Aaron_Branzuela_Resume.pdf';
        link.click();
        setIsOpen(false);
      },
      category: 'action',
    },
    {
      id: 'action-email',
      label: 'Email me',
      description: 'johnaaronmb@gmail.com',
      action: () => {
        window.location.href = 'mailto:johnaaronmb@gmail.com';
        setIsOpen(false);
      },
      category: 'action',
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
      description: 'SVM-RBF ML pipeline, 89.61% accuracy',
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
        window.dispatchEvent(new Event('open-chat'));
        returnFocusRef.current = null; // let focus stay in the chat
        setIsOpen(false);
      },
      category: 'chat',
    },
    {
      id: 'chat-experience',
      label: 'Ask about Desk Assist',
      description: 'Chat: AI assistant for service desk agents',
      action: () => {
        returnFocusRef.current = null;
        setIsOpen(false);
        triggerChatQuery('Tell me about Desk Assist');
      },
      category: 'chat',
    },
    {
      id: 'chat-projects',
      label: 'Ask About Projects',
      description: 'Chat: overview of all projects',
      action: () => {
        returnFocusRef.current = null;
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
        returnFocusRef.current = null;
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
        // Capture focus before autoFocus moves it into the palette
        if (!isOpen) returnFocusRef.current = document.activeElement as HTMLElement | null;
        setIsOpen(!isOpen);
        setSearch('');
        setSelectedIndex(0);
      }

      // Only handle keys if palette is open
      if (!isOpen) return;

      switch (e.key) {
        case 'Tab': {
          // Focus trap: cycle Tab / Shift+Tab within the dialog
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) break;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement;
          const inside = dialogRef.current?.contains(active);
          if (e.shiftKey && (active === first || !inside)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && (active === last || !inside)) {
            e.preventDefault();
            first.focus();
          }
          break;
        }
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
            ref={dialogRef}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl bg-black border-4 border-amber-400 shadow-8bit overflow-hidden"
            style={{ transformOrigin: 'top' }}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
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
                  aria-label="Search commands"
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
                    onFocus={() => setSelectedIndex(idx)}
                  >
                    <div className="flex items-center gap-2 font-mono font-bold text-sm">
                      {cmd.id === 'nav-hero' && <PixelArt name="icon-home" size={16} />}
                      {cmd.label}
                    </div>
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
