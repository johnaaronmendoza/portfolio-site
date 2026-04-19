import { useState } from 'react';
import { motion } from 'framer-motion';
import { isMuted, setMuted, play } from '@/hooks/useSound';

export default function SoundToggle() {
  const [muted, setMutedState] = useState(isMuted);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    if (!next) play('blip'); // play a test blip when unmuting
  };

  return (
    <motion.button
      onClick={toggle}
      className={`fixed bottom-36 left-[72px] z-50 font-pixel text-[9px] px-2 py-1.5 border-2 transition-colors ${
        !muted
          ? 'border-amber-400 text-amber-400 bg-black'
          : 'border-zinc-700 text-zinc-600 bg-black hover:border-zinc-500 hover:text-zinc-400'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={muted ? 'Enable sounds' : 'Mute sounds'}
    >
      {muted ? 'SFX OFF' : 'SFX ON'}
    </motion.button>
  );
}
