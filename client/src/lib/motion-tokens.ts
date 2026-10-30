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
