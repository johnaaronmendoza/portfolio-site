import { useLocation } from 'wouter';
import { play } from '@/hooks/useSound';

type NavItem = {
  label: string;
  section?: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: '~/root',       section: 'hero',       icon: '⌂' },
  { label: '~/projects',   section: 'projects',   icon: '▦' },
  { label: '~/experience', section: 'experience', icon: '◈' },
  { label: '~/skills',     section: 'skills',     icon: '◎' },
  { label: '~/about',      section: 'about',      icon: '◉' },
];

export default function SovereignSidebar() {
  const [location, setLocation] = useLocation();

  const handleNav = (item: NavItem) => {
    play('blip');
    if (item.section) {
      if (location === '/') {
        document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setLocation('/');
        setTimeout(() => {
          document.getElementById(item.section!)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  const isHome = location === '/';

  return (
    <aside
      className="fixed left-0 top-12 h-[calc(100vh-3rem)] w-64 bg-[#1b1b1b] border-r border-amber-500/10 hidden lg:flex flex-col z-[90]"
      style={{ fontFamily: "'Space Grotesk', monospace" }}
    >
      {/* User profile */}
      <div className="p-5 border-b border-amber-500/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#252525] border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-amber-500 text-sm font-bold">JA</span>
          </div>
          <div className="min-w-0">
            <div className="text-amber-500 font-bold text-xs leading-none tracking-widest uppercase truncate">JOHN AARON</div>
            <div className="text-[10px] text-amber-900/50 tracking-widest mt-1 uppercase">STATUS: ONLINE</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-grow py-3 overflow-y-auto">
        <div className="px-4 py-2">
          <span className="text-[9px] text-amber-900/30 uppercase tracking-[0.2em]">DIRECTORY</span>
        </div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            onClick={() => handleNav(item)}
            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-xs transition-colors duration-75 group
              ${isHome ? 'text-amber-400/70 hover:text-amber-400' : 'text-amber-900/40 hover:text-amber-400'}
              hover:bg-amber-500/5`}
          >
            <span className="text-amber-500/40 group-hover:text-amber-500 transition-colors duration-75 text-[10px] w-3 text-center flex-shrink-0">
              {item.icon}
            </span>
            <span className="tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Resume CTA */}
      <div className="p-4 border-t border-amber-500/10">
        <a
          href="/resume.pdf"
          download="John_Aaron_Branzuela_Resume.pdf"
          onClick={() => play('click')}
          className="w-full bg-amber-500/10 text-amber-500 border border-amber-500/20 py-2.5 text-[11px] font-bold tracking-widest hover:bg-amber-500 hover:text-black transition-colors duration-75 flex items-center justify-center gap-2 uppercase"
        >
          <span>↓</span>
          <span>[ RESUME ]</span>
        </a>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-amber-500/5">
        <div className="text-[9px] text-amber-900/25 tracking-widest uppercase flex items-center justify-between">
          <span>SIT × UofG</span>
          <span className="text-green-500/50">● ACTIVE</span>
        </div>
      </div>
    </aside>
  );
}
