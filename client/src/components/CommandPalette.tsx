/**
 * CommandPalette: Ctrl+K / Cmd+K command menu.
 * A `commands.exe` terminal-variant window (MASTER 2.10): section and project
 * navigation, resume and email, and chat shortcuts.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { scrollToSection } from '@/lib/utils';
import { motionTokens } from '@/lib/motion-tokens';
import { useModalFocus } from '@/hooks/useModalFocus';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PixelArt from './PixelArt';
import { WindowBar } from './Window';

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

// Opens the chat and asks it a question (MascotChatWidget listens for this)
function askChat(query?: string) {
  window.dispatchEvent(new CustomEvent('open-chat', { detail: { query } }));
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [location, setLocation] = useLocation();
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the search on open, trap Tab, give focus back to the opener on close
  const keepFocus = useModalFocus(isOpen, dialogRef, inputRef);

  // On Home, scroll to the section and focus it; elsewhere, go Home and let it scroll to the hash
  const goToSection = (id: string) => {
    if (location === '/' && document.getElementById(id)) {
      keepFocus();
      scrollToSection(id, reduced);
    } else {
      setLocation(`/#${id}`);
    }
  };

  // Focus moves into the chat, so the palette doesn't hand it back
  const chat = (query?: string) => {
    keepFocus();
    setIsOpen(false);
    askChat(query);
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
      action: () => chat(),
      category: 'chat',
    },
    {
      id: 'chat-experience',
      label: 'Ask about Desk Assist',
      description: 'Chat: AI assistant for service desk agents',
      action: () => chat('Tell me about Desk Assist'),
      category: 'chat',
    },
    {
      id: 'chat-projects',
      label: 'Ask About Projects',
      description: 'Chat: overview of all projects',
      action: () => chat('What are your projects'),
      category: 'chat',
    },
    {
      id: 'chat-skills',
      label: 'Ask About Skills',
      description: 'Chat: tech stack and tools',
      action: () => chat('What are your skills'),
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
          // Buttons (rows, Close) activate natively; this handles Enter in the search box
          if (e.target instanceof HTMLButtonElement) break;
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
            key="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 z-40"
          />

          {/* commands.exe: terminal-variant window */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, y: -motionTokens.distance.sm }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
            ref={dialogRef}
            tabIndex={-1}
            className="window fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
          >
            <WindowBar title="commands.exe" onClose={() => setIsOpen(false)} closeLabel="Close command menu" />

            <div className="bg-black text-[color:var(--paper)] [--focus:var(--yellow)]">
              {/* Search: the ring sits on the row; the input itself has no outline */}
              <div className="border-b-2 border-[color:var(--paper)] p-4 flex items-center gap-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[color:var(--yellow)] focus-within:outline-offset-[-6px]">
                <span aria-hidden="true" className="font-mono text-base font-bold text-[color:var(--yellow)]">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search commands..."
                  aria-label="Search commands"
                  className="flex-1 min-w-0 bg-transparent text-[color:var(--paper)] placeholder:text-[color:var(--paper)] placeholder:italic font-mono text-base outline-none caret-[var(--yellow)]"
                />
              </div>

              {/* Commands: selected row orange, hover teal; the description inherits the row colour */}
              <div className="max-h-96 overflow-y-auto" data-lenis-prevent>
                {filteredCommands.length === 0 ? (
                  <p className="p-4 text-center font-mono text-sm">No commands found</p>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      type="button"
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      className={`block w-full min-h-[44px] text-left px-4 py-3 outline-offset-[-6px] [--focus:var(--ink)] transition-colors duration-150 ${
                        idx === selectedIndex
                          ? 'bg-[var(--yellow)] text-black'
                          : 'hover:bg-[var(--blue)] hover:text-black'
                      }`}
                      onFocus={() => setSelectedIndex(idx)}
                    >
                      <span className="flex items-center gap-2 font-mono font-bold text-[15px]">
                        {cmd.id === 'nav-hero' && <PixelArt name="icon-home" size={16} />}
                        {cmd.label}
                      </span>
                      <span className="block font-mono text-sm mt-1">{cmd.description}</span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="border-t-2 border-[color:var(--paper)] p-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm font-mono">
                <span>↑↓ Navigate | Enter Select | Esc Close</span>
                <span>Ctrl+K Toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
