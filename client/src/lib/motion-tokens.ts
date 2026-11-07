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
  // Skills keyboard (owner-approved, Nov 2026): entrance once per page load,
  // pointer tilt, scroll-linked perspective, key lift/press, mascot reactions.
  // Distances in CSS px, angles in degrees.
  keyboard: {
    enter: 0.7,       // board fades in, rises and rotates into its resting angle
    enterDelay: 0.05, // first row starts settling
    rowStagger: 0.07, // at most; shortened so the 7-row phone layout ends by `enterEnd`
    settle: 0.4,      // each row's drop into place
    enterEnd: 0.85,
    rise: 24,
    enterTilt: 6,
    tilt: 3,          // pointer tilt cap
    tiltFollow: 0.12, // time constant of the tilt's smoothing, seconds
    scrollTilt: 5,    // extra top-down rotation across the section
    lift: 5,          // hover
    press: 3.5,
    hop: 28,          // mascot hop height
  },
  // Mascot frame timing for a key press: crouch, jump (for the hop), land,
  // celebrate, then idle. Seconds.
  mascot: {
    crouch: 0.08,
    land: 0.08,
    celebrate: 0.6,
  },
};

export const springs = {
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30 },
  instant: { type: 'spring' as const, stiffness: 600, damping: 35 },
};
