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
  // The hero load-in, the page's one orchestrated moment (DESIGN.md): window
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
    bounce: 1.2,
  },
  // Hero particle field: square pixels rising slowly behind the windows, in
  // three depth steps. Pairs are [far, near] and the middle step sits halfway.
  // CSS px and seconds.
  particles: {
    rise: [3, 10], // px per second, each pixel within ±20%
    sway: [2, 6], // side-to-side drift either way
    swayPeriod: 9,
    shift: [1, 6], // most a pixel moves away from the pointer
    follow: 0.6, // time constant of the pointer smoothing
    fade: 72, // fades in and out over this distance at the top and bottom
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
  },
  // Skills keyboard (owner-approved, Nov 2026): entrance once per page load,
  // pointer tilt, scroll-linked perspective, key lift/press.
  // Distances in CSS px, angles in degrees.
  keyboard: {
    enter: 0.7, // board fades in, rises and rotates into its resting angle
    enterDelay: 0.05, // first row starts settling
    rowStagger: 0.07, // at most; shortened so the 7-row phone layout ends by `enterEnd`
    settle: 0.4, // each row's drop into place
    enterEnd: 0.85,
    rise: 24,
    enterTilt: 6,
    tilt: 3, // pointer tilt cap
    tiltFollow: 0.12, // time constant of the tilt's smoothing, seconds
    scrollTilt: 5, // extra top-down rotation across the section
    lift: 5, // hover
    press: 3.5,
  },
};

export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  instant: { type: "spring" as const, stiffness: 600, damping: 35 },
};
