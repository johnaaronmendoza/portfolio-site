// Shared motion values (from the motion-foundations skill), kept snappy to suit
// the 8-bit design. Components take durations, easings and springs from here
// rather than hardcoding them.
export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
    out: [0.23, 1, 0.32, 1] as const, // matches CSS --ease-out
  },
  // The hero load-in, the page's one orchestrated moment (MASTER 1.6): window
  // scales in, name lines reveal 180ms apart from 200ms, the rest follows.
  hero: {
    window: 0.4,
    line: 0.55,
    lineStart: 0.2,
    lineStagger: 0.18,
    role: 0.9,
    body: 1.0,
    ctas: 1.1,
    cue: 2.0,
  },
  // Hero loops (stopped by reduced motion and the Pause motion toggle)
  loop: {
    blink: 0.5,
    float: 3,
    bounce: 1.2,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
  },
};

export const springs = {
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30 },
  instant: { type: 'spring' as const, stiffness: 600, damping: 35 },
};
