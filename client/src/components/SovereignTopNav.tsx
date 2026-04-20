import { useLocation } from 'wouter';

export default function SovereignTopNav() {
  const [, setLocation] = useLocation();

  return (
    <nav
      className="fixed top-0 w-full h-12 bg-[#131313] border-b border-amber-500/10 flex items-center justify-between px-4 sm:px-6 z-[100]"
      style={{ fontFamily: "'Space Grotesk', monospace" }}
    >
      <button
        onClick={() => setLocation('/')}
        className="text-amber-500 font-bold text-sm tracking-widest hover:text-amber-400 transition-colors duration-75 uppercase"
      >
        SYSTEM<span className="text-amber-500/40">://</span>PORTFOLIO
      </button>
      <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-[0.15em] uppercase text-amber-900/40">
        <a href="https://github.com/johnaaronmendoza" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-75">GITHUB</a>
        <a href="https://www.linkedin.com/in/john-branzuela/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-75">LINKEDIN</a>
        <span className="text-amber-500/20">|</span>
        <span className="text-[10px] text-amber-900/30 tracking-widest">v2.0.0</span>
      </div>
    </nav>
  );
}
