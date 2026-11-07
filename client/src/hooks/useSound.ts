// 8-bit sound synthesis via Web Audio API — no external libraries
// All sounds are square waves (classic Game Boy / NES waveform)

import { useSyncExternalStore } from 'react';

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

// ── Sound preference (persisted, off by default) ─────────────────────────
// One shared switch for every play() call. Sound stays off until the visitor
// turns it on with the Sound toggle; that choice is remembered across visits.

const SOUND_KEY = 'ja_sound_on';
const listeners = new Set<() => void>();
let soundOn: boolean | null = null;

function isSoundOn(): boolean {
  if (soundOn === null) {
    try { soundOn = localStorage.getItem(SOUND_KEY) === 'true'; } catch { soundOn = false; }
  }
  return soundOn;
}

export function setSoundOn(v: boolean) {
  soundOn = v;
  try { localStorage.setItem(SOUND_KEY, String(v)); } catch { /* storage blocked: still works this visit */ }
  listeners.forEach(l => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Current sound preference; re-renders when any toggle changes it */
export function useSoundOn(): boolean {
  return useSyncExternalStore(subscribe, isSoundOn, () => false);
}

/** Plays a sound only if the visitor turned sound on (no AudioContext until then) */
export function play(name: keyof typeof sounds) {
  if (!isSoundOn()) return;
  sounds[name]();
}
