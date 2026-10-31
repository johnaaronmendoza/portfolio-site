import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { play } from '@/hooks/useSound';
import { useModalFocus } from '@/hooks/useModalFocus';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motionTokens } from '@/lib/motion-tokens';
import { WindowBar } from './Window';

interface Line {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const BOOT = [
  'JOHN_AARON_OS v2.6.0 | Computing Science Portfolio',
  'Copyright (c) 2026 John Aaron Mendoza Branzuela',
  '─────────────────────────────────────────────',
  'Type "help" to see available commands.',
  '',
];

const FS: Record<string, string> = {
  'about.txt': `NAME     : John Aaron Mendoza Branzuela
DEGREE   : BSc Computing Science (Hons) | SIT x University of Glasgow
ROLE     : Computing Science student | AI, data and full-stack
LOCATION : Singapore

I build AI and data tools for the people who have to use them.
Now building Desk Assist at LGA Telecom.`,

  // Mirrors the Skills section (copy.md §11 #6): nothing that isn't on the resume
  'skills.txt': `AI & LLMS  : Prompt engineering · RAG · LLM-assisted workflows · AI guardrails · Human-in-the-loop design
DATA & ML  : Python · Pandas · NumPy · scikit-learn · SQL · ETL pipelines · Power BI · TFLite
BACKEND    : Node.js · Express · gRPC · PostgreSQL · Supabase · Prisma ORM · Docker · Kubernetes · Git
FRONTEND   : TypeScript · JavaScript · React · Next.js · Tailwind CSS · Kotlin · Jetpack Compose · ARCore
ALSO       : Java · C++ · AWS · GitHub Actions · MongoDB · Cloudflare
METHODS    : Agile/Scrum · UAT · Requirements gathering · Process documentation · JIRA · Confluence`,

  'contact.txt': `EMAIL    : johnaaronmb@gmail.com
LINKEDIN : linkedin.com/in/john-branzuela
GITHUB   : github.com/johnaaronmendoza
WEB      : https://portfolio-site-lh1v.vercel.app

Open to AI, data and software graduate roles.`,

  'resume.pdf': `[BINARY FILE: cannot display in terminal]
Use your browser to download from the portfolio.`,
};

const PROJECTS: Record<string, string> = {
  'silverlink':  'SilverLink SG                2025  React · gRPC · Docker · Kubernetes · PostgreSQL',
  'scs':         'SCS Awareness Platform       2025  React 19 · TypeScript · Supabase · Vercel',
  'firesafety':  'Fire Safety Drill Companion  2025  Kotlin · ARCore · TFLite · Jetpack Compose',
  'uwb':         'UWB Indoor Localization      2025  Python · SVM-RBF · scikit-learn · PCA',
  'uat':         'UAT Testing Dashboard        2024  React 18 · Node.js · SQLite · Recharts (course project)',
  'ai-finance':  'AI Finance Insights Engine   2024  Python · Pandas · SQLite · NLP · Power BI',
  'greenloop':   'GreenLoopFarms               2022  SGD 10,000 NYP JumpStart Grant winner',
};

/** Output lines, or one error line (shown with an "error:" prefix) */
type Result = string[] | { error: string };

// Runs inside the Enter keypress, so window.open counts as the visitor's own action
function process(raw: string, setLocation: (p: string) => void): Result {
  const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);
  const arg = args.join(' ');

  switch (cmd) {
    case 'help':
      return [
        'AVAILABLE COMMANDS',
        '──────────────────────────────────────────',
        '  whoami              Who is John Aaron?',
        '  ls                  List files',
        '  ls projects         List all projects',
        '  cat <file>          Read a file (about.txt, skills.txt, contact.txt)',
        '  cat <project>.md    Read project notes (e.g. cat silverlink.md)',
        '  open <project>      Navigate to a project page',
        '  ping github         Open GitHub profile',
        '  ping linkedin       Open LinkedIn profile',
        '  git log             Show commit history (abridged)',
        '  sudo hire-me        Make a formal request',
        '  clear               Clear terminal',
        '  exit                Close terminal',
        '',
        'SHORTCUTS: ` (backtick) or Esc to toggle',
      ];

    case 'whoami':
      return FS['about.txt'].split('\n');

    case 'ls':
      if (arg === 'projects' || arg === 'projects/') {
        return [
          'projects/',
          '──────────────────────────────────────────────────────',
          ...Object.values(PROJECTS),
        ];
      }
      return [
        'about.txt    skills.txt    contact.txt    resume.pdf',
        'projects/',
      ];

    case 'cat': {
      const target = arg.replace(/^projects\//, '').replace(/\.md$/, '');
      if (FS[arg]) return FS[arg].split('\n');
      if (PROJECTS[target]) {
        return [
          `projects/${target}.md`,
          '──────────────────────',
          PROJECTS[target],
          '',
          `Run "open ${target}" to view full project page.`,
        ];
      }
      return { error: `cat: ${arg}: No such file or directory` };
    }

    case 'open': {
      const routes: Record<string, string> = {
        silverlink: '/projects/silverlink',
        scs: '/projects/scs',
        firesafety: '/projects/firesafety',
        uwb: '/projects/uwb',
        uat: '/projects/uat',
        'ai-finance': '/projects/ai-finance',
        'ai_finance': '/projects/ai-finance',
      };
      if (routes[arg]) {
        setTimeout(() => setLocation(routes[arg]), 400);
        return [`Navigating to ${arg}...`];
      }
      return { error: `open: ${arg}: project not found. Try "ls projects" for names.` };
    }

    case 'ping':
      if (arg === 'github' || arg === 'github.com') {
        window.open('https://github.com/johnaaronmendoza', '_blank', 'noopener');
        return ['PING github.com/johnaaronmendoza ...', '64 bytes: seq=0 ttl=64 time=12ms  ✓'];
      }
      if (arg === 'linkedin') {
        window.open('https://www.linkedin.com/in/john-branzuela/', '_blank', 'noopener');
        return ['PING linkedin.com/in/john-branzuela ...', '64 bytes: seq=0 ttl=64 time=18ms  ✓'];
      }
      return { error: `ping: ${arg}: unknown host` };

    case 'git':
      if (arg === 'log' || arg === 'log --oneline') {
        return [
          'commit a3f9c12  feat: add AI Finance Insights ETL pipeline',
          'commit 88de021  feat: add UAT Testing Dashboard with defect tracker',
          'commit 4bc7e55  feat: SCS visual novel engine, multilingual support',
          'commit 21a0d98  feat: Fire Safety AR corridor navigation (ARCore)',
          'commit 9ff12c3  feat: SilverLink gRPC microservices + WebRTC',
          'commit 7e33b40  feat: UWB LOS/NLOS classification, SVM-RBF 89.61%',
          'commit 0001337  init: portfolio, retro web',
        ];
      }
      return { error: `git: '${arg}' is not a supported git command.` };

    case 'sudo':
      if (arg === 'hire-me' || arg === 'hire me') {
        window.open('/resume.pdf', '_blank', 'noopener');
        return [
          '[sudo] password for recruiter: ********',
          '',
          'Verifying credentials ............ [ OK ]',
          'Submitting hire request .......... [ OK ]',
          'Opening resume ................... [ OK ]',
          '',
          'John Aaron has been formally requested for hire.',
          '',
          'Contact: johnaaronmb@gmail.com',
          'LinkedIn: linkedin.com/in/john-branzuela',
          '',
          '> Best decision you\'ll make today.',
        ];
      }
      return { error: 'sudo: command not found' };

    case 'vim':
    case 'nano':
    case 'emacs':
      return [
        `Starting ${cmd}...`,
        '',
        '  :q!',
        '',
        `Tip: you cannot exit ${cmd}. Good luck.`,
      ];

    case 'npm':
      if (arg === 'install happiness' || arg === 'i happiness') {
        return [
          'npm warn deprecated happiness@1.0.0: Please stop looking for shortcuts.',
          '',
          'added 1 package in 3s',
          '',
          '> happiness@1.0.0 postinstall',
          '> echo "It was inside you the whole time."',
          '',
          'It was inside you the whole time.',
        ];
      }
      return { error: 'npm: this is a portfolio, not a Node project.' };

    case 'cd':
      return { error: `cd: ${arg || '~'}: permission denied (this is a read-only terminal)` };

    case 'pwd':
      return ['/home/john-aaron/portfolio'];

    case 'date':
      return [new Date().toString()];

    case 'clear':
      return ['__CLEAR__'];

    case 'exit':
      return ['__EXIT__'];

    case '':
      return [];

    default:
      return { error: `${cmd}: command not found. Type "help" for available commands.` };
  }
}

export default function SecretTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT.map(t => ({ type: 'system', text: t })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  // Focus the input on open, trap Tab, return focus to the opener on close
  useModalFocus(open, dialogRef, inputRef);

  // Backtick / HUD event toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const hudHandler = () => setOpen(v => !v);
    window.addEventListener('keydown', handler);
    window.addEventListener('toggle-terminal', hudHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('toggle-terminal', hudHandler);
    };
  }, []);

  // Keep the newest line in view (scrolls the log only, never the page)
  useEffect(() => {
    const log = logRef.current;
    log?.scrollTo({ top: log.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [lines, reduced]);

  const submit = () => {
    if (!input.trim() && input !== '') { setInput(''); return; }
    play('click');
    const cmd = input.trim();
    const result = process(cmd, setLocation);

    if (Array.isArray(result) && result[0] === '__CLEAR__') {
      setLines(BOOT.map(t => ({ type: 'system', text: t })));
    } else if (Array.isArray(result) && result[0] === '__EXIT__') {
      close();
    } else {
      const output: Line[] = Array.isArray(result)
        ? result.map(t => ({ type: 'output', text: t }))
        : [{ type: 'error', text: result.error }];
      setLines(prev => [...prev, { type: 'input', text: cmd }, ...output]);
    }

    if (cmd) {
      setHistory(h => [cmd, ...h.slice(0, 49)]);
    }
    setHistIdx(-1);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(next); setInput(history[next] ?? ''); }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="terminal-backdrop"
            className="fixed inset-0 bg-black/70 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />

          {/* terminal.sh: terminal-variant window (MASTER 2.10) */}
          <motion.div
            key="terminal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            tabIndex={-1}
            className="window fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[calc(100%-2rem)] max-w-3xl"
            initial={{ opacity: 0, y: -motionTokens.distance.md }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -motionTokens.distance.md }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.out }}
          >
            <WindowBar title="terminal.sh" onClose={close} closeLabel="Close terminal" />

            <div className="bg-black text-[color:var(--cream)] [--focus:var(--orange)]">
              {/* Output */}
              <div
                ref={logRef}
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
                className="h-80 max-h-[50dvh] overflow-y-auto p-4 space-y-0.5 font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words"
                data-lenis-prevent
              >
                {lines.map((l, i) => (
                  <div key={i}>
                    {l.type === 'input' ? (
                      <span className="text-[color:var(--orange)]">$ {l.text}</span>
                    ) : l.type === 'error' ? (
                      <span className="bg-[var(--orange)] text-black px-1">error: {l.text}</span>
                    ) : l.type === 'system' ? (
                      <span className="text-[color:var(--teal)]">{l.text || '\u00A0'}</span>
                    ) : (
                      l.text || '\u00A0'
                    )}
                  </div>
                ))}
              </div>

              {/* Input row: the ring sits on the row; the input itself has no outline */}
              <div className="border-t-2 border-[color:var(--cream)] px-4 py-3 flex items-center gap-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[color:var(--orange)] focus-within:outline-offset-[-6px]">
                <span aria-hidden="true" className="font-mono text-base font-bold text-[color:var(--orange)] flex-shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value); play('type'); }}
                  onKeyDown={handleKey}
                  aria-label="Terminal command"
                  className="flex-1 min-w-0 bg-transparent text-[color:var(--cream)] placeholder:text-[color:var(--cream)] placeholder:italic font-mono text-base outline-none caret-[var(--orange)]"
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="hidden sm:inline font-mono text-sm text-[color:var(--cream)] flex-shrink-0">Esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
