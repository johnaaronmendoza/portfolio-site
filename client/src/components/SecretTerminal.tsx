import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { play } from '@/hooks/useSound';

interface Line {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const BOOT = [
  'JOHN_AARON_OS v2.6.0 — Computing Science Portfolio',
  'Copyright (c) 2026 John Aaron Mendoza Branzuela',
  '─────────────────────────────────────────────',
  'Type "help" to see available commands.',
  '',
];

const FS: Record<string, string> = {
  'about.txt': `NAME     : John Aaron Mendoza Branzuela
DEGREE   : BSc Computing Science (Hons) — SIT x University of Glasgow
ROLE     : Computing Science Student | Aspiring Business Analyst
LOCATION : Singapore

My path into tech started on-site, not behind a desk.
At Sembcorp I coordinated UAT for a 50MWp solar deployment,
translating requirements between teams before handoff.

That gap between what a business needs and what gets built —
that's where I focus.`,

  'skills.txt': `LANGUAGES  : Java · Python · TypeScript · JavaScript · SQL · Kotlin · C++
FRONTEND   : React 19 · Next.js · Tailwind CSS · Framer Motion
BACKEND    : Node.js · gRPC · Express · Prisma ORM · Supabase
DEVOPS     : Docker · Kubernetes · AWS · GitHub Actions
DATA       : Pandas · NumPy · scikit-learn · Power BI · SQLite
MOBILE     : Kotlin · Jetpack Compose · ARCore · TFLite
METHODS    : Agile/Scrum · UAT · Requirements Gathering · SDLC`,

  'contact.txt': `EMAIL    : johnaaronmb@gmail.com
LINKEDIN : linkedin.com/in/john-branzuela
GITHUB   : github.com/johnaaronmendoza
WEB      : https://portfolio-site-lh1v.vercel.app

Open to internships, collaborations, and interesting problems.`,

  'resume.pdf': `[BINARY FILE — cannot display in terminal]
Use your browser to download from the portfolio.`,
};

const PROJECTS: Record<string, string> = {
  'silverlink':  'SilverLink SG          2025  React · gRPC · Docker · Kubernetes · PostgreSQL',
  'scs':         'SCS Awareness Platform 2026  React 19 · TypeScript · Supabase · Vercel',
  'firesafety':  'Fire Safety Companion  2025  Kotlin · ARCore · TFLite · Jetpack Compose',
  'uwb':         'UWB Localization       2025  Python · SVM-RBF · scikit-learn · PCA',
  'uat':         'UAT Testing Dashboard  2026  React 18 · Node.js · SQLite · Recharts',
  'ai-finance':  'AI Finance Engine      2026  Python · Pandas · SQLite · NLP · Power BI',
  'greenloop':   'GreenLoopFarms         2023  SGD $10k NYP JumpStart Grant winner',
};

function process(raw: string, setLocation: (p: string) => void): string[] {
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
      return [`cat: ${arg}: No such file or directory`];
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
      return [`open: ${arg}: project not found. Try "ls projects" for names.`];
    }

    case 'ping':
      if (arg === 'github' || arg === 'github.com') {
        setTimeout(() => window.open('https://github.com/johnaaronmendoza', '_blank'), 300);
        return ['PING github.com/johnaaronmendoza ...', '64 bytes: seq=0 ttl=64 time=12ms  ✓'];
      }
      if (arg === 'linkedin') {
        setTimeout(() => window.open('https://www.linkedin.com/in/john-branzuela/', '_blank'), 300);
        return ['PING linkedin.com/in/john-branzuela ...', '64 bytes: seq=0 ttl=64 time=18ms  ✓'];
      }
      return [`ping: ${arg}: unknown host`];

    case 'git':
      if (arg === 'log' || arg === 'log --oneline') {
        return [
          'commit a3f9c12  feat: add AI Finance Insights ETL pipeline',
          'commit 88de021  feat: add UAT Testing Dashboard with defect tracker',
          'commit 4bc7e55  feat: SCS visual novel engine — multilingual support',
          'commit 21a0d98  feat: Fire Safety AR corridor navigation (ARCore)',
          'commit 9ff12c3  feat: SilverLink gRPC microservices + WebRTC',
          'commit 7e33b40  feat: UWB LOS/NLOS classification — SVM-RBF 89.61%',
          'commit 0001337  init: portfolio-8bit — industrial retro-futurism',
        ];
      }
      return [`git: '${arg}' is not a supported git command.`];

    case 'sudo':
      if (arg === 'hire-me' || arg === 'hire me') {
        return [
          '[sudo] password for recruiter: ********',
          '',
          'Request submitted.',
          'John Aaron has been formally requested for hire.',
          '',
          'Contact: johnaaronmb@gmail.com',
          'LinkedIn: linkedin.com/in/john-branzuela',
          '',
          '> Best decision you\'ll make today.',
        ];
      }
      return ['sudo: command not found'];

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
      return ['npm: this is a portfolio, not a Node project.'];

    case 'cd':
      return [`cd: ${arg || '~'}: permission denied (this is a read-only terminal)`];

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
      return [`${cmd}: command not found. Type "help" for available commands.`];
  }
}

export default function SecretTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT.map(t => ({ type: 'system', text: t })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // Backtick toggle
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
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const submit = () => {
    if (!input.trim() && input !== '') { setInput(''); return; }
    play('click');
    const cmd = input.trim();
    const result = process(cmd, setLocation);

    if (result[0] === '__CLEAR__') {
      setLines(BOOT.map(t => ({ type: 'system', text: t })));
    } else if (result[0] === '__EXIT__') {
      close();
    } else {
      setLines(prev => [
        ...prev,
        { type: 'input', text: cmd },
        ...result.map(t => ({ type: 'output' as const, text: t })),
      ]);
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
    <>
      {/* Hint badge — bottom right, above chat widget */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-36 right-4 z-50 font-pixel text-[9px] px-2 py-1.5 border-2 border-zinc-700 text-zinc-600 bg-black hover:border-zinc-500 hover:text-zinc-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Open terminal (` key)"
      >
        {'>_'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            {/* Terminal window */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-3xl border-4 border-amber-400 bg-black"
              style={{ boxShadow: '8px 8px 0px 0px #F59E0B' }}
              initial={{ opacity: 0, scale: 0.94, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="border-b-2 border-amber-400 bg-zinc-900 px-4 py-2 flex items-center justify-between">
                <span className="font-pixel text-[10px] text-amber-400">JOHN_AARON_OS — bash</span>
                <button
                  onClick={close}
                  className="font-pixel text-[10px] text-zinc-500 hover:text-amber-400 transition-colors"
                >
                  [X]
                </button>
              </div>

              {/* Output area */}
              <div className="h-80 overflow-y-auto p-4 space-y-0.5 font-mono text-xs leading-relaxed">
                {lines.map((l, i) => (
                  <div key={i} className={
                    l.type === 'input'  ? 'text-amber-400' :
                    l.type === 'error'  ? 'text-red-400' :
                    l.type === 'system' ? 'text-blue-400' :
                    'text-gray-300'
                  }>
                    {l.type === 'input' ? `$ ${l.text}` : l.text || '\u00A0'}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="border-t-2 border-amber-400 px-4 py-3 flex items-center gap-2 bg-zinc-900">
                <span className="font-pixel text-xs text-amber-400 flex-shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => { setInput(e.target.value); play('type'); }}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent text-white font-mono text-xs outline-none caret-amber-400"
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="font-pixel text-[9px] text-zinc-600">ESC to close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
