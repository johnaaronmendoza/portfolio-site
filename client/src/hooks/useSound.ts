// 8-bit sound synthesis via Web Audio API — no external libraries
// All sounds are square waves (classic Game Boy / NES waveform)

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try { ctx = new AudioContext(); } catch { return null; }
  }
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  volume = 0.08,
  type: OscillatorType = 'square',
  freqEnd?: number,
) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);
  if (freqEnd !== undefined) {
    osc.frequency.linearRampToValueAtTime(freqEnd, c.currentTime + duration);
  }
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

// ── Sound library ─────────────────────────────────────────────────────────

export const sounds = {
  /** Short high blip — button hover */
  blip: () => playTone(880, 0.04, 0.06),

  /** Slightly lower click confirm */
  click: () => playTone(660, 0.06, 0.08),

  /** Quick descending click — back/cancel */
  back: () => playTone(440, 0.06, 0.06, 'square', 330),

  /** 3-note ascending arpeggio — achievement unlock */
  achievement: () => {
    const c = getCtx();
    if (!c) return;
    [523, 659, 784].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.12, 0.1), i * 80);
    });
  },

  /** Very short typewriter blip — terminal key */
  type: () => playTone(1200, 0.02, 0.03),

  /** Power-up sweep — Konami code */
  powerUp: () => {
    const freqs = [262, 330, 392, 523, 659, 784, 1047];
    freqs.forEach((f, i) => setTimeout(() => playTone(f, 0.1, 0.09), i * 60));
  },

  /** Page whoosh — navigation transition */
  whoosh: () => playTone(200, 0.15, 0.05, 'square', 800),
};

// ── Mute state (persisted) ────────────────────────────────────────────────

export function isMuted(): boolean {
  try { return localStorage.getItem('ja_sound_muted') === 'true'; } catch { return false; }
}

export function setMuted(v: boolean) {
  try { localStorage.setItem('ja_sound_muted', String(v)); } catch {}
}

/** Plays a sound only if not muted */
export function play(name: keyof typeof sounds) {
  if (isMuted()) return;
  sounds[name]();
}
