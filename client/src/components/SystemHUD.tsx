/**
 * SystemHUD — unified bottom-left control bar
 *
 * Groups CRT toggle, SFX toggle, and terminal trigger into one
 * horizontally-aligned strip with consistent pixel-button styling.
 *
 * Communicates with SecretTerminal via a custom window event so
 * the terminal's open state stays inside that component.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isMuted, setMuted, play } from '@/hooks/useSound';

// ── Shared button style ────────────────────────────────────────────────────
function HudBtn({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      title={title}
      className={`font-pixel text-[9px] px-2 py-1.5 border-2 transition-colors whitespace-nowrap ${
        active
          ? 'border-amber-400 text-amber-400 bg-black'
          : 'border-zinc-600 text-zinc-500 bg-black hover:border-zinc-400 hover:text-zinc-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function SystemHUD() {
  const [crt,   setCrt]   = useState(false);
  const [muted, setMutedState] = useState(isMuted);

  // Apply CRT class to body
  useEffect(() => {
    document.body.classList.toggle('crt-enhanced', crt);
    return () => document.body.classList.remove('crt-enhanced');
  }, [crt]);

  const toggleCrt = () => setCrt(v => !v);

  const toggleSfx = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) play('blip');
  };

  const openTerminal = () => {
    play('click');
    window.dispatchEvent(new Event('toggle-terminal'));
  };

  return (
    <div className="fixed bottom-6 left-4 z-50 flex items-center gap-1.5">
      <HudBtn active={crt}   onClick={toggleCrt}      title="Toggle CRT scanlines">
        {crt ? 'CRT ON' : 'CRT'}
      </HudBtn>

      <HudBtn active={!muted} onClick={toggleSfx} title={muted ? 'Enable sounds' : 'Mute sounds'}>
        {muted ? 'SFX' : 'SFX ON'}
      </HudBtn>

      <HudBtn onClick={openTerminal} title="Open terminal (` key)">
        {'>_'}
      </HudBtn>
    </div>
  );
}

