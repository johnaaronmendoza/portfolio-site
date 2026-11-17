import { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program } from 'ogl';
import { motionTokens } from '@/lib/motion-tokens';
import './Particles.css';

const P = motionTokens.particles;

// Look of the three depth steps, [far, near]: 4, 6 and 8px squares, near
// opaque so every pixel stays on its palette token
const SIZE = [4, 8]; // CSS px, drawn as whole canvas pixels
const ALPHA = [0.9, 1.0];
const NEAR_SHARE = 0.25;
const MID_SHARE = 0.35;
const STEP = 2; // CSS px: pixels move on a 2px lattice, so drift reads 8-bit
// Boxes kept free of particles (reading text, buttons), and how far the fade reaches
const CLEAR_MAX = 6;
const CLEAR_FEATHER = 28;
const CLEAR_NONE = -1e4;
const CLEAR_RECHECK = 1; // seconds between re-measuring the boxes while running
const EDGE = 16; // homes stay this far inside the sides, so sway never clips a pixel
const MAX_DPR = 2;
const MAX_STEP = 0.05; // seconds; a stalled frame never jumps the field

const num = (n: number) => n.toFixed(3);
const range = ([far, near]: number[]) => `mix(${num(far)}, ${num(near)}, depth)`;

const vertex = /* glsl */ `
  attribute vec4 seed; // home x, home y, phase, variation (all 0-1)
  attribute vec4 tint; // rgb, depth (0 far, 0.5 mid, 1 near)

  uniform vec2 uCanvas;   // canvas size, canvas px
  uniform float uScale;   // canvas px per CSS px
  uniform float uTime;    // seconds of motion
  uniform vec2 uPointer;  // smoothed pointer, -1 to 1
  uniform vec4 uClear[${CLEAR_MAX}]; // left, top, right, bottom (CSS px)

  varying vec4 vColor;

  void main() {
    float depth = tint.a;
    vec2 field = uCanvas / uScale;

    // Rise and wrap; invisible at both ends, so the wrap never pops
    float rise = ${range(P.rise)} * mix(0.8, 1.2, seed.w);
    vec2 p = vec2(
      mix(${num(EDGE)}, field.x - ${num(EDGE)}, seed.x),
      mod(seed.y * field.y - rise * uTime, field.y)
    );
    float alpha = ${range(ALPHA)}
      * smoothstep(0.0, ${num(P.fade)}, p.y)
      * smoothstep(0.0, ${num(P.fade)}, field.y - p.y);

    p.x += sin(uTime * ${num((2 * Math.PI) / P.swayPeriod)} * mix(0.7, 1.3, seed.w) + seed.z * 6.2832) * ${range(P.sway)};
    p -= uPointer * ${range(P.shift)};
    p = floor(p / ${num(STEP)}) * ${num(STEP)};

    for (int i = 0; i < ${CLEAR_MAX}; i++) {
      vec2 outside = max(max(uClear[i].xy - p, p - uClear[i].zw), 0.0);
      alpha *= smoothstep(0.0, ${num(CLEAR_FEATHER)}, length(outside));
    }

    // Whole canvas pixels: an integer size, centred so every edge lands on a
    // pixel boundary
    float size = max(1.0, floor(${range(SIZE)} * uScale + 0.5));
    vec2 px = floor(p * uScale) + 0.5 * mod(size, 2.0);

    vColor = vec4(tint.rgb * alpha, alpha);
    gl_PointSize = size;
    gl_Position = vec4(px / uCanvas * vec2(2.0, -2.0) + vec2(-1.0, 1.0), 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision mediump float;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.trim().replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

/** Small seeded generator: the field is composed the same way on every visit */
const seeded = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

interface ParticlesProps {
  /** Palette tokens (CSS custom properties holding hex colours); repeat one to weight it */
  colors: string[];
  /** Tokens for the near (largest) step; defaults to `colors` */
  nearColors?: string[];
  /** Particles per 100,000 CSS px² of the container */
  density?: number;
  maxCount?: number;
  /** Pixels lean a few px away from a mouse pointer */
  followPointer?: boolean;
  /** Elements whose boxes stay free of particles (at most 6) */
  clearSelector?: string;
  /** Freeze on the current frame (the viewer's "Pause motion" toggle) */
  paused?: boolean;
  className?: string;
}

const Particles = ({
  colors,
  nearColors = colors,
  density = 10,
  maxCount = 240,
  followPointer = false,
  clearSelector,
  paused = false,
  className = '',
}: ParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Set by the scene below; `paused` starts and stops it without a rebuild
  const loopRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: 1, depth: false, alpha: true, premultipliedAlpha: true });
    } catch {
      return; // no WebGL: the page goes without particles
    }
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    // Even spread (R2 sequence), so any first `n` particles cover the field
    const random = seeded(7);
    const styles = getComputedStyle(container);
    const toRgb = (names: string[]) => names.map(name => hexToRgb(styles.getPropertyValue(name)));
    const palette = toRgb(colors);
    const nearPalette = toRgb(nearColors);
    const seeds = new Float32Array(maxCount * 4);
    const tints = new Float32Array(maxCount * 4);
    for (let i = 0; i < maxCount; i++) {
      const layer = random();
      seeds.set([(0.5 + i * 0.7548776662) % 1, (0.5 + i * 0.569840291) % 1, random(), random()], i * 4);
      const near = layer < NEAR_SHARE;
      const tones = near ? nearPalette : palette;
      tints.set(tones[Math.floor(random() * tones.length)], i * 4);
      tints[i * 4 + 3] = near ? 1 : layer < NEAR_SHARE + MID_SHARE ? 0.5 : 0;
    }

    const geometry = new Geometry(gl, {
      seed: { size: 4, data: seeds },
      tint: { size: 4, data: tints },
    });
    const uniforms = {
      uCanvas: { value: [1, 1] },
      uScale: { value: 1 },
      uTime: { value: 0 },
      uPointer: { value: [0, 0] },
      uClear: { value: new Array<number>(CLEAR_MAX * 4).fill(CLEAR_NONE) },
    };
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false });
    const drawArgs = { mode: gl.POINTS, program };

    const draw = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      program.use();
      geometry.draw(drawArgs);
    };

    const measureClear = () => {
      const clear = uniforms.uClear.value.fill(CLEAR_NONE);
      if (!clearSelector) return;
      const origin = container.getBoundingClientRect();
      document.querySelectorAll(clearSelector).forEach((el, i) => {
        if (i >= CLEAR_MAX) return;
        const box = el.getBoundingClientRect();
        clear[i * 4] = box.left - origin.left;
        clear[i * 4 + 1] = box.top - origin.top;
        clear[i * 4 + 2] = box.right - origin.left;
        clear[i * 4 + 3] = box.bottom - origin.top;
      });
    };

    // One canvas pixel per device pixel (up to 2x), so nothing is stretched
    const resize = ([entry]: ResizeObserverEntry[]) => {
      const { width, height } = entry.contentRect;
      const scale = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      renderer.setViewport(gl.drawingBufferWidth, gl.drawingBufferHeight);
      uniforms.uCanvas.value[0] = gl.drawingBufferWidth;
      uniforms.uCanvas.value[1] = gl.drawingBufferHeight;
      uniforms.uScale.value = gl.drawingBufferWidth / Math.max(width, 1);
      geometry.setDrawRange(0, Math.min(maxCount, Math.round((width * height * density) / 1e5)));
      measureClear();
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (followPointer) window.addEventListener('pointermove', onPointerMove, { passive: true });

    let frameId = 0;
    let last = 0;
    let sinceMeasure = 0;
    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, MAX_STEP);
      last = now;
      uniforms.uTime.value += dt;

      const ease = 1 - Math.exp(-dt / P.follow);
      const pointer = uniforms.uPointer.value;
      pointer[0] += (pointerX - pointer[0]) * ease;
      pointer[1] += (pointerY - pointer[1]) * ease;

      // Text can reflow after load (fonts, entrance offsets); keep the boxes true
      sinceMeasure += dt;
      if (sinceMeasure >= CLEAR_RECHECK) {
        sinceMeasure = 0;
        measureClear();
      }
      draw();
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const start = () => {
      if (frameId || pausedRef.current || document.hidden) return;
      last = performance.now();
      frameId = requestAnimationFrame(frame);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    loopRef.current = { start, stop };
    start();

    return () => {
      loopRef.current = null;
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      geometry.remove();
      program.remove();
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // `colors` and `nearColors` are read once per scene; pass stable palettes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, maxCount, followPointer, clearSelector]);

  useEffect(() => {
    if (paused) loopRef.current?.stop();
    else loopRef.current?.start();
  }, [paused]);

  return <div ref={containerRef} aria-hidden="true" className={`particles-container ${className}`} />;
};

export default Particles;
