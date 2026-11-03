/**
 * 3D skills keyboard (lazy chunk: three.js + @react-three/fiber).
 * Inspired by Naresh Khatri's keyboard at nareshkhatri.dev
 * (github.com/Naresh-Khatri/3d-portfolio, MIT). No code or models copied:
 * the keycaps are procedural, styled after John's keycap sheet, and their
 * legends are drawn once onto canvases. The canvas is decoration
 * (aria-hidden); SkillKeyboard renders the real buttons and mirrors their
 * selection and focus here.
 */
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { use, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { motionTokens, springs } from '@/lib/motion-tokens';
import { KEYS, capFor, iconUrl, type Cap } from './keys';

export type Perch = { x: number; y: number };

export type Keyboard3DProps = {
  cols: number;
  selected: number;
  /** Key whose hidden button has keyboard focus (focus-visible), or null */
  focused: number | null;
  /** Changes on every keyboard-triggered press, to play the press on that key */
  pulse: { i: number; n: number } | null;
  onHover: (i: number | null) => void;
  onSelect: (i: number) => void;
  /** Where the mascot stands: above the back of the last key in row 1 */
  onPerch: (p: Perch) => void;
};

// Sculpted keycap, in world units: a 1 x 1 base narrowing to a smaller top
// that sits a little back, so the front slope is long enough to carry the label
const KEY_H = 0.44;
const TOP_W = 0.8;
const TOP_D = 0.72;
const TOP_Z = -0.06;
const OUTLINE = 1.09;         // ink outline: a back-face shell 9% wider than the cap
const GAP = 0.14;
const PITCH = 1 + GAP;
const PAD = 0.26;             // board margin around the keys
const BOARD_H = 0.34;
const TRAVEL = 0.16;          // press depth
const LIFT = 0.07;            // hover lift
const SEL_DROP = 0.05;        // a selected key stays a little down, like a toggled key
const TEX = 256;              // legend canvas width (spans the cap's full width on the front)
const TOP_TEX_H = Math.round((TEX * TOP_D) / TOP_W);
const FRONT_TEX_H = 128;
const ORANGE = '#FF7A2F';     // focus outline, matching the site's :focus-visible
const FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", "DejaVu Sans Mono", monospace';

const fontAt = (px: number) => `700 ${px}px ${FONT}`;

function slot(i: number, cols: number): [number, number] {
  const rows = Math.ceil(KEYS.length / cols);
  return [((i % cols) - (cols - 1) / 2) * PITCH, (Math.floor(i / cols) - (rows - 1) / 2) * PITCH];
}

function boardSize(cols: number) {
  const rows = Math.ceil(KEYS.length / cols);
  return { w: cols * PITCH - GAP + 2 * PAD, d: rows * PITCH - GAP + 2 * PAD };
}

// ── Geometry ─────────────────────────────────────────────────────────────

type V3 = [number, number, number];
const h = KEY_H / 2;
const BASE: Record<'lf' | 'rf' | 'rb' | 'lb', V3> = { lf: [-0.5, -h, 0.5], rf: [0.5, -h, 0.5], rb: [0.5, -h, -0.5], lb: [-0.5, -h, -0.5] };
const TOPV: Record<'lf' | 'rf' | 'rb' | 'lb', V3> = {
  lf: [-TOP_W / 2, h, TOP_Z + TOP_D / 2], rf: [TOP_W / 2, h, TOP_Z + TOP_D / 2],
  rb: [TOP_W / 2, h, TOP_Z - TOP_D / 2], lb: [-TOP_W / 2, h, TOP_Z - TOP_D / 2],
};

/** Flat-shaded geometry from quads, each wound to face away from the cap's centre.
 *  UVs are planar (x across, y up), so the front label isn't keystoned. */
function quads(faces: V3[][]) {
  const pos: number[] = [];
  const uv: number[] = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (const f of faces) {
    a.fromArray(f[0]); b.fromArray(f[1]); c.fromArray(f[2]);
    const n = b.clone().sub(a).cross(c.clone().sub(a));
    const centre = f.reduce((s, p) => s.add(new THREE.Vector3(...p)), new THREE.Vector3()).divideScalar(f.length);
    const q = n.dot(centre) < 0 ? [...f].reverse() : f;
    for (const p of [q[0], q[1], q[2], q[0], q[2], q[3]]) {
      pos.push(...p);
      uv.push(p[0] + 0.5, (p[1] + h) / KEY_H);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

const SIDES: V3[][] = [
  [BASE.lb, BASE.lf, TOPV.lf, TOPV.lb],
  [BASE.rf, BASE.rb, TOPV.rb, TOPV.rf],
  [BASE.rb, BASE.lb, TOPV.lb, TOPV.rb],
];
const FRONT: V3[][] = [[BASE.lf, BASE.rf, TOPV.rf, TOPV.lf]];
const SHELL: V3[][] = [...SIDES, ...FRONT, [TOPV.lf, TOPV.rf, TOPV.rb, TOPV.lb], [BASE.lf, BASE.lb, BASE.rb, BASE.rf]];

/** Soft contact shadow under the board (a blurred rect, drawn once). */
function shadowTexture() {
  const cv = document.createElement('canvas');
  cv.width = cv.height = TEX;
  const ctx = cv.getContext('2d');
  if (ctx) {
    // Draw the shape off-canvas and keep only its blurred shadow
    ctx.shadowColor = 'rgba(0,0,0,0.75)';
    ctx.shadowBlur = TEX * 0.08;
    ctx.shadowOffsetX = TEX * 4;
    ctx.fillRect(-TEX * 4 + TEX * 0.14, TEX * 0.14, TEX * 0.72, TEX * 0.72);
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Orange frame laid over the focused key's top face (keyboard focus). */
function focusFrameTexture() {
  const cv = document.createElement('canvas');
  cv.width = TEX;
  cv.height = TOP_TEX_H;
  const ctx = cv.getContext('2d');
  if (ctx) {
    const lw = TEX * 0.09;
    ctx.beginPath();
    ctx.roundRect(lw / 2, lw / 2, TEX - lw, TOP_TEX_H - lw, TEX * 0.13);
    ctx.lineWidth = lw;
    ctx.strokeStyle = ORANGE;
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ── Legends ──────────────────────────────────────────────────────────────

/** Top face: rounded face with an ink rim, key number top left, icon centred. */
function drawTop(cv: HTMLCanvasElement, cap: Cap, icon: HTMLImageElement | null) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const W = cv.width, H = cv.height, rim = W * 0.035;
  ctx.fillStyle = cap.side; // shows in the rounded-off corners, like the cap's sides
  ctx.fillRect(0, 0, W, H);
  ctx.beginPath();
  ctx.roundRect(rim / 2, rim / 2, W - rim, H - rim, W * 0.13);
  ctx.fillStyle = cap.face;
  ctx.fill();
  ctx.lineWidth = rim;
  ctx.strokeStyle = '#000';
  ctx.stroke();

  ctx.fillStyle = cap.ink;
  ctx.font = fontAt(W * 0.19);
  ctx.textBaseline = 'top';
  ctx.fillText(cap.no, W * 0.1, H * 0.09);

  if (!icon) return;
  const s = Math.round(Math.min(W, H) * 0.6);
  // Icons are single-colour white SVGs; recolour to the cap's ink
  const tint = document.createElement('canvas');
  tint.width = tint.height = s;
  const t = tint.getContext('2d');
  if (!t) return;
  t.drawImage(icon, 0, 0, s, s);
  t.globalCompositeOperation = 'source-in';
  t.fillStyle = cap.ink;
  t.fillRect(0, 0, s, s);
  ctx.drawImage(tint, (W - s) / 2, H * 0.6 - s / 2);
}

/** Front slope: darker strip with the key name in bold caps. */
function drawFront(cv: HTMLCanvasElement, cap: Cap, labelPx: number) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const W = cv.width, H = cv.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = cap.bar;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#000'; // ink crease under the top face
  ctx.fillRect(0, H * 0.94, W, H * 0.06);
  ctx.font = fontAt(labelPx);
  ctx.fillStyle = cap.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // The face narrows toward the top; the longest label (SKLEARN) condenses a
  // little rather than drop below the minimum size
  const scaleX = Math.min(1, (W * 0.74) / ctx.measureText(cap.text).width);
  ctx.setTransform(scaleX, 0, 0, 1, W / 2, H * 0.47);
  ctx.fillText(cap.text, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/** One icon as an image with an intrinsic size (the files only carry a viewBox,
 *  which some browsers won't draw onto a canvas). Null if missing or not SVG. */
async function loadIcon(url: string) {
  try {
    const res = await fetch(url);
    const svg = await res.text();
    if (!res.ok || !svg.trimStart().startsWith('<svg')) return null;
    const blob = new Blob([svg.replace('<svg', `<svg width="${TEX}" height="${TEX}"`)], { type: 'image/svg+xml' });
    const src = URL.createObjectURL(blob);
    const img = new Image();
    img.src = src;
    await img.decode().finally(() => URL.revokeObjectURL(src));
    return img;
  } catch {
    return null;
  }
}

// Icons load once per page; a missing file leaves the number and label only.
let iconsPromise: Promise<(HTMLImageElement | null)[]> | null = null;
function loadIcons() {
  iconsPromise ??= Promise.all(KEYS.map(k => loadIcon(iconUrl(k))));
  return iconsPromise;
}

// ── Camera ───────────────────────────────────────────────────────────────

/** Points the camera at the board and moves it back until the board fills the
 *  canvas, then centres the board with a view offset. */
function fitCamera(cam: THREE.PerspectiveCamera, w: number, hgt: number, cols: number, compact: boolean) {
  const { w: bw, d: bd } = boardSize(cols);
  // Low enough that the front-slope labels face the camera; a slight turn on wide screens
  const el = compact ? 1.05 : 1.0;
  const az = compact ? 0 : -0.08;
  const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  // The board's top and bottom outline, plus the tallest point of the outer keys
  const corners: THREE.Vector3[] = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    corners.push(new THREE.Vector3((sx * bw) / 2, 0, (sz * bd) / 2), new THREE.Vector3((sx * bw) / 2, -BOARD_H, (sz * bd) / 2));
    corners.push(new THREE.Vector3(sx * (bw / 2 - PAD), KEY_H + LIFT, sz * (bd / 2 - PAD)));
  }
  const p = new THREE.Vector3();
  const place = (dist: number) => {
    cam.position.copy(dir).multiplyScalar(dist);
    cam.lookAt(0, 0, 0);
    cam.updateMatrixWorld();
    cam.updateProjectionMatrix();
    let [x0, x1, y0, y1] = [Infinity, -Infinity, Infinity, -Infinity];
    for (const c of corners) {
      p.copy(c).project(cam);
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x);
      y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y);
    }
    return { x0, x1, y0, y1 };
  };
  cam.aspect = w / hgt;
  cam.clearViewOffset();
  const FILL = 0.97;
  let dist = 30;
  for (let n = 0; n < 6; n++) {
    const b = place(dist);
    dist *= Math.max((b.x1 - b.x0) / (2 * FILL), (b.y1 - b.y0) / (2 * FILL));
  }
  const b = place(dist);
  cam.setViewOffset(w, hgt, ((b.x0 + b.x1) / 2) * (w / 2), -((b.y0 + b.y1) / 2) * (hgt / 2), w, hgt);
}

function toScreen(cam: THREE.Camera, v: THREE.Vector3, w: number, hgt: number) {
  v.project(cam);
  return { x: ((v.x + 1) / 2) * w, y: ((1 - v.y) / 2) * hgt };
}

// ── Scene ────────────────────────────────────────────────────────────────

type SceneProps = Keyboard3DProps & { icons: (HTMLImageElement | null)[] };

function Scene({ cols, icons, selected, focused, pulse, onHover, onSelect, onPerch }: SceneProps) {
  const { gl, camera, size, invalidate } = useThree();
  const compact = cols < 7;
  const caps = useMemo(() => KEYS.map(capFor), []);
  const [unitPx, setUnitPx] = useState(0);

  // Latest props for the frame loop and pointer handlers
  const live = useRef({ selected, focused, onHover, onSelect, onPerch });
  live.current = { selected, focused, onHover, onSelect, onPerch };

  // Per-key motion state: offset, velocity, glow, pointer held, keyboard press end time
  const anim = useRef({
    y: new Float32Array(KEYS.length),
    v: new Float32Array(KEYS.length),
    glow: new Float32Array(KEYS.length),
    down: new Uint8Array(KEYS.length),
    until: new Float64Array(KEYS.length),
  });
  const hover = useRef<number | null>(null);
  const lifts = useRef<(THREE.Group | null)[]>([]);

  // Shared GPU resources, made once and disposed on unmount
  const res = useMemo(() => {
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    const texture = (height: number) => {
      const cv = document.createElement('canvas');
      cv.width = TEX;
      cv.height = height;
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = anisotropy;
      return t;
    };
    const topMaps = caps.map(() => texture(TOP_TEX_H));
    const frontMaps = caps.map(() => texture(FRONT_TEX_H));
    return {
      topMaps,
      frontMaps,
      sides: quads(SIDES),
      front: quads(FRONT),
      shell: quads(SHELL),
      top: new THREE.PlaneGeometry(TOP_W, TOP_D).rotateX(-Math.PI / 2),
      // Lit sides; the unlit top and front keep the legends' checked contrast exact
      sideMats: caps.map(c => new THREE.MeshStandardMaterial({ color: c.side, emissive: c.face, emissiveIntensity: 0, roughness: 0.5 })),
      topMats: topMaps.map(map => new THREE.MeshBasicMaterial({ map, toneMapped: false })),
      frontMats: frontMaps.map(map => new THREE.MeshBasicMaterial({ map, toneMapped: false })),
      inkMat: new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.BackSide }),
      focusMat: new THREE.MeshBasicMaterial({ color: ORANGE, side: THREE.BackSide, toneMapped: false }),
      frameMat: new THREE.MeshBasicMaterial({ map: focusFrameTexture(), transparent: true, depthWrite: false, toneMapped: false }),
      boardMat: new THREE.MeshStandardMaterial({ color: '#17171D', roughness: 0.55, metalness: 0.2 }),
      shadowMap: shadowTexture(),
    };
  }, [caps, gl]);

  const board = useMemo(() => {
    const { w, d } = boardSize(cols);
    return {
      geo: new RoundedBoxGeometry(w, BOARD_H, d, 4, 0.22),
      shadow: new THREE.PlaneGeometry(w * 1.45, d * 1.45).rotateX(-Math.PI / 2),
    };
  }, [cols]);

  useEffect(() => () => {
    board.geo.dispose();
    board.shadow.dispose();
  }, [board]);

  useEffect(() => () => {
    [res.sides, res.front, res.shell, res.top].forEach(g => g.dispose());
    [...res.sideMats, ...res.topMats, ...res.frontMats, res.inkMat, res.focusMat, res.frameMat, res.boardMat].forEach(m => m.dispose());
    [...res.topMaps, ...res.frontMaps, res.shadowMap, res.frameMat.map].forEach(t => t?.dispose());
  }, [res]);

  // Fit the camera on resize or layout change; report the perch and the key scale
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const { width: w, height: hgt } = size;
    if (!w || !hgt) return;
    fitCamera(cam, w, hgt, cols, compact);
    // Mascot stands just above the back of the last key in row 1, clear of every cap
    const [px, pz] = slot(cols - 1, cols);
    live.current.onPerch(toScreen(cam, new THREE.Vector3(px, KEY_H + LIFT, pz + TOP_Z - TOP_D / 2), w, hgt));
    // Screen width of one unit at the back row's front labels (smallest under perspective)
    const [mx, mz] = slot(Math.floor(cols / 2), cols);
    const l = toScreen(cam, new THREE.Vector3(mx - 0.5, KEY_H / 2, mz + 0.4), w, hgt);
    const r = toScreen(cam, new THREE.Vector3(mx + 0.5, KEY_H / 2, mz + 0.4), w, hgt);
    setUnitPx(Math.round((r.x - l.x) / 4) * 4); // bucketed so small resizes don't redraw
    invalidate();
  }, [camera, size, cols, compact, invalidate]);

  // Top faces don't depend on layout: draw once
  useEffect(() => {
    caps.forEach((cap, i) => {
      drawTop(res.topMaps[i].image as HTMLCanvasElement, cap, icons[i]);
      res.topMaps[i].needsUpdate = true;
    });
    invalidate();
  }, [caps, icons, res, invalidate]);

  // Front labels: at least 12px on screen (13px on the wider tilted view)
  useEffect(() => {
    if (!unitPx) return;
    const labelPx = Math.max(((compact ? 12 : 13) * TEX) / unitPx, FRONT_TEX_H * 0.44);
    caps.forEach((cap, i) => {
      drawFront(res.frontMaps[i].image as HTMLCanvasElement, cap, labelPx);
      res.frontMaps[i].needsUpdate = true;
    });
    invalidate();
  }, [unitPx, compact, caps, res, invalidate]);

  // Selection, focus and keyboard presses come from the DOM buttons
  useEffect(() => invalidate(), [selected, focused, invalidate]);
  useEffect(() => {
    if (!pulse) return;
    anim.current.until[pulse.i] = performance.now() / 1000 + motionTokens.duration.fast;
    invalidate();
  }, [pulse, invalidate]);

  useEffect(() => () => {
    gl.domElement.style.cursor = '';
  }, [gl]);

  // Spring each key toward its target height; render only while something moves
  useFrame((_, delta) => {
    const a = anim.current;
    const { selected: sel, focused: foc } = live.current;
    const now = performance.now() / 1000;
    const step = Math.min(delta, 1 / 30) / 4;
    const { stiffness: k, damping: c } = springs.snappy;
    let moving = false;
    for (let i = 0; i < KEYS.length; i++) {
      const pressed = a.down[i] === 1 || now < a.until[i];
      const hovered = hover.current === i;
      const target = pressed ? -TRAVEL : (i === sel ? -SEL_DROP : 0) + (hovered ? LIFT : 0);
      const glowTo = pressed || hovered ? 0.5 : i === sel || i === foc ? 0.28 : 0;
      for (let s = 0; s < 4; s++) {
        a.v[i] += (-k * (a.y[i] - target) - c * a.v[i]) * step;
        a.y[i] += a.v[i] * step;
      }
      if (Math.abs(a.y[i] - target) < 1e-4 && Math.abs(a.v[i]) < 1e-3) {
        a.y[i] = target;
        a.v[i] = 0;
      } else moving = true;
      a.glow[i] += (glowTo - a.glow[i]) * Math.min(1, step * 64);
      if (Math.abs(a.glow[i] - glowTo) < 0.004) a.glow[i] = glowTo;
      else moving = true;
      if (pressed) moving = true; // render again when the hold ends
      const lift = lifts.current[i];
      if (lift) lift.position.y = a.y[i];
      res.sideMats[i].emissiveIntensity = a.glow[i];
      res.topMats[i].color.setScalar(1 + a.glow[i] * 0.12);
      res.frontMats[i].color.setScalar(1 + a.glow[i] * 0.12);
    }
    if (moving) invalidate();
  });

  // The outline shell encloses the cap, so it doubles as the pointer target
  const pointer = (i: number) => ({
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      hover.current = i;
      gl.domElement.style.cursor = 'pointer';
      if (e.pointerType === 'mouse') live.current.onHover(i);
      invalidate();
    },
    onPointerOut: () => {
      anim.current.down[i] = 0;
      if (hover.current === i) {
        hover.current = null;
        gl.domElement.style.cursor = '';
        live.current.onHover(null);
      }
      invalidate();
    },
    onPointerDown: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      anim.current.down[i] = 1;
      invalidate();
    },
    onPointerUp: () => {
      anim.current.down[i] = 0;
      invalidate();
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      // A quick tap still shows the full travel before springing back
      anim.current.until[i] = performance.now() / 1000 + motionTokens.duration.instant;
      live.current.onSelect(i);
      invalidate();
    },
  });

  const { d } = boardSize(cols);
  const noHit = () => null;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 10, 7]} intensity={2} />
      <directionalLight position={[3, 4, -9]} intensity={1.4} color="#B8C4FF" />

      <mesh geometry={board.shadow} position={[0, -BOARD_H - 0.02, d * 0.04]} raycast={noHit}>
        <meshBasicMaterial map={res.shadowMap} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={board.geo} material={res.boardMat} position-y={-BOARD_H / 2} raycast={noHit} />

      {KEYS.map((k, i) => {
        const [x, z] = slot(i, cols);
        return (
          <group key={k.label} position={[x, KEY_H / 2, z]}>
            <group ref={el => { lifts.current[i] = el; }}>
              <mesh geometry={res.sides} material={res.sideMats[i]} raycast={noHit} />
              <mesh geometry={res.front} material={res.frontMats[i]} raycast={noHit} />
              <mesh geometry={res.top} material={res.topMats[i]} position={[0, h + 0.002, TOP_Z]} raycast={noHit} />
              {/* Keyboard focus: orange outline and an orange frame on the top face */}
              <mesh geometry={res.shell} material={i === focused ? res.focusMat : res.inkMat} scale={[OUTLINE, 1.05, OUTLINE]} {...pointer(i)} />
              {i === focused && <mesh geometry={res.top} material={res.frameMat} position={[0, h + 0.004, TOP_Z]} raycast={noHit} />}
            </group>
          </group>
        );
      })}
    </>
  );
}

/** Re-render once when the canvas comes back on screen. */
function Wake({ on }: { on: boolean }) {
  const invalidate = useThree(s => s.invalidate);
  useEffect(() => {
    if (on) invalidate();
  }, [on, invalidate]);
  return null;
}

export default function Keyboard3D(props: Keyboard3DProps) {
  const icons = use(loadIcons());
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Stop rendering entirely while the board is off screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={onScreen ? 'demand' : 'never'}
        dpr={[1, 1.75]}
        // r3f defaults: ACES Filmic tone mapping, sRGB output
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 20, near: 0.1, far: 200 }}
        style={{ touchAction: 'pan-y' }}
      >
        <Wake on={onScreen} />
        <Scene icons={icons} {...props} />
      </Canvas>
    </div>
  );
}
