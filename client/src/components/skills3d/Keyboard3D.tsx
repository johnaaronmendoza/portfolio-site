/**
 * 3D skills keyboard (lazy chunk: three.js + @react-three/fiber).
 * Inspired by Naresh Khatri's keyboard at nareshkhatri.dev
 * (github.com/Naresh-Khatri/3d-portfolio, MIT). No code or models copied:
 * the keycaps are procedural, styled after John's keycap sheet, and their
 * legends are drawn once onto canvases. The canvas is decoration
 * (aria-hidden); SkillKeyboard renders the real buttons, the tooltip and the
 * detail window, and mirrors focus, filter and the open key here.
 *
 * Motion is composed from separate layers so none overwrites another:
 * entrance group > scroll group > tilt group > board, and inside each key
 * slot a settle offset (entrance stagger) plus its own hover/press spring.
 * Rendering is on demand: frames run only while something moves.
 */
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { cubicBezier } from 'framer-motion';
import { use, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { motionTokens, springs } from '@/lib/motion-tokens';
import { KEYS, capFor, iconUrl, inFilter, mutedCap, type Cap, type Filter } from './keys';

/** A key's landmarks in viewport px: centre x, back of the top face (top),
 *  front of the top face (face), front of the base (bottom), top-face width. */
export type KeyRect = { x: number; top: number; face: number; bottom: number; w: number };
export type KeyLocator = (i: number) => KeyRect | null;

export type Keyboard3DProps = {
  cols: number;
  /** Key whose hidden button has keyboard focus (focus-visible), or null */
  focused: number | null;
  /** Key whose detail window is open: it stays a little down, like a toggled key */
  open: number | null;
  /** Changes on every keyboard-triggered press, to play the press on that key */
  pulse: { i: number; n: number } | null;
  /** Category filter: keys outside it sit flush and muted, never hidden */
  filter: Filter;
  /** Entrance still to play this page load: the board starts hidden and plays
   *  it when a third of it is in view */
  entrance: boolean;
  /** Filled with a function that finds a key on screen, for the DOM overlays */
  locator: RefObject<KeyLocator | null>;
  onHover: (i: number | null) => void;
  onSelect: (i: number) => void;
  /** After each rendered frame, so overlays follow the board */
  onFrame: () => void;
  onEntered: () => void;
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
const LIFT_MAX = 0.12;        // hover lift and press depth come from px (motion tokens),
const TRAVEL_MAX = 0.16;      // converted at the board's scale; capped here
const SETTLE = 0.22;          // keys drop this far into place during the entrance
const SCROLL_RISE = 0.2;      // upward drift across the section
const SHADOW = 0.08;          // per-key hard shadow offset at rest; grows on hover, gone at full press
const SHADOW_GROW = 0.05;
const BOARD_SHADOW = 0.2;     // the board's own hard shadow offset
const TEX = 256;              // legend canvas width (spans the cap's full width on the front)
const TOP_TEX_H = Math.round((TEX * TOP_D) / TOP_W);
const FRONT_TEX_H = 128;
const FOCUS = '#2347D6';      // focus outline: blue-text, 3:1+ on the page and keys
const FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", "DejaVu Sans Mono", monospace';

const fontAt = (px: number) => `700 ${px}px ${FONT}`;
const KB = motionTokens.keyboard;
const RAD = Math.PI / 180;
const ease = cubicBezier(...motionTokens.easing.out);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// The board's extreme poses (full scroll rotation and pointer tilt), so the
// camera fit leaves room for them and nothing is clipped while it moves
const POSES = [0, 1].flatMap(s => [-1, 1].flatMap(tx => [-1, 1].map(tz =>
  new THREE.Matrix4()
    .makeTranslation(0, s * SCROLL_RISE, 0)
    .multiply(new THREE.Matrix4().makeRotationX(s * KB.scrollTilt * RAD))
    .multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(tx * KB.tilt * RAD, 0, tz * KB.tilt * RAD))),
)));

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

/** Flat rounded rectangle on the XZ plane: the board's hard ink shadow. */
function plateGeometry(w: number, d: number, r: number) {
  const shape = new THREE.Shape();
  const [x, y] = [-w / 2, -d / 2];
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + d - r);
  shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  shape.lineTo(x + r, y + d);
  shape.quadraticCurveTo(x, y + d, x, y + d - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return new THREE.ShapeGeometry(shape, 4).rotateX(Math.PI / 2);
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
    ctx.strokeStyle = FOCUS;
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
 *  canvas in every pose it can take, then centres it with a view offset. */
function fitCamera(cam: THREE.PerspectiveCamera, w: number, hgt: number, cols: number, compact: boolean) {
  const { w: bw, d: bd } = boardSize(cols);
  // Low enough that the front-slope labels face the camera; a slight turn on wide screens
  const el = compact ? 1.05 : 1.0;
  const az = compact ? 0 : -0.08;
  const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  // The board's outline and its shadow, plus the tallest point of the outer keys
  const local: THREE.Vector3[] = [];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    local.push(new THREE.Vector3((sx * bw) / 2, 0, (sz * bd) / 2), new THREE.Vector3((sx * bw) / 2, -BOARD_H, (sz * bd) / 2));
    local.push(new THREE.Vector3((sx * bw) / 2 + BOARD_SHADOW, -BOARD_H, (sz * bd) / 2 + BOARD_SHADOW));
    local.push(new THREE.Vector3(sx * (bw / 2 - PAD), KEY_H + Math.max(LIFT_MAX, SETTLE), sz * (bd / 2 - PAD)));
  }
  const corners = POSES.flatMap(m => local.map(c => c.clone().applyMatrix4(m)));
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

type SceneProps = Keyboard3DProps & { icons: (HTMLImageElement | null)[]; wrap: RefObject<HTMLDivElement | null>; play: boolean };

function Scene({ cols, icons, wrap, play, focused, open, pulse, filter, entrance, locator, onHover, onSelect, onFrame, onEntered }: SceneProps) {
  const { gl, camera, size, invalidate } = useThree();
  const compact = cols < 7;
  const rows = Math.ceil(KEYS.length / cols);
  // Every key twice: lit (0-27), then muted for a filter mismatch (28-55)
  const caps = useMemo(() => {
    const lit = KEYS.map(capFor);
    return [...lit, ...lit.map(mutedCap)];
  }, []);
  const [unitPx, setUnitPx] = useState(0);

  // Latest props for the frame loop and pointer handlers
  const live = useRef({ open, filter, onHover, onSelect, onFrame, onEntered });
  live.current = { open, filter, onHover, onSelect, onFrame, onEntered };

  // Per-key state: spring offset and velocity, pointer held, press end time
  const anim = useRef({
    y: new Float32Array(KEYS.length),
    v: new Float32Array(KEYS.length),
    down: new Uint8Array(KEYS.length),
    until: new Float64Array(KEYS.length),
  });
  const hover = useRef<number | null>(null);
  const units = useRef({ lift: 0.07, travel: 0.05 }); // world units, set from px on fit
  const tilt = useRef({ x: 0, z: 0, tx: 0, tz: 0 }); // radians: current and target
  const scrolled = useRef(0); // 0-1 through the scroll-linked rotation
  const intro = useRef<{ t0: number | null; done: boolean }>({ t0: null, done: !entrance });
  const enterG = useRef<THREE.Group>(null);
  const scrollG = useRef<THREE.Group>(null);
  const tiltG = useRef<THREE.Group>(null);
  const lifts = useRef<(THREE.Group | null)[]>([]);
  const shadows = useRef<(THREE.Mesh | null)[]>([]);

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
      keyShadow: new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      // Lit sides; the unlit top and front keep the legends' checked contrast exact
      sideMats: caps.map(c => new THREE.MeshStandardMaterial({ color: c.side, roughness: 0.5 })),
      topMats: topMaps.map(map => new THREE.MeshBasicMaterial({ map, toneMapped: false })),
      frontMats: frontMaps.map(map => new THREE.MeshBasicMaterial({ map, toneMapped: false })),
      inkMat: new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.BackSide }),
      // Hard shadows: flat ink, drawn just above the surface they fall on
      shadowMat: new THREE.MeshBasicMaterial({ color: '#000000', polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
      focusMat: new THREE.MeshBasicMaterial({ color: FOCUS, side: THREE.BackSide, toneMapped: false }),
      frameMat: new THREE.MeshBasicMaterial({ map: focusFrameTexture(), transparent: true, depthWrite: false, toneMapped: false }),
      boardMat: new THREE.MeshStandardMaterial({ color: '#17171D', roughness: 0.55, metalness: 0.2 }),
    };
  }, [caps, gl]);

  const board = useMemo(() => {
    const { w, d } = boardSize(cols);
    return {
      geo: new RoundedBoxGeometry(w, BOARD_H, d, 4, 0.22),
      shadow: plateGeometry(w, d, 0.22),
    };
  }, [cols]);

  useEffect(() => () => {
    board.geo.dispose();
    board.shadow.dispose();
  }, [board]);

  useEffect(() => () => {
    [res.sides, res.front, res.shell, res.top, res.keyShadow].forEach(g => g.dispose());
    [...res.sideMats, ...res.topMats, ...res.frontMats, res.inkMat, res.shadowMat, res.focusMat, res.frameMat, res.boardMat].forEach(m => m.dispose());
    [...res.topMaps, ...res.frontMaps, res.frameMat.map].forEach(t => t?.dispose());
  }, [res]);

  // Fit the camera on resize or layout change; convert the px lift and press to world units
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const { width: w, height: hgt } = size;
    if (!w || !hgt) return;
    fitCamera(cam, w, hgt, cols, compact);
    const o = toScreen(cam, new THREE.Vector3(0, 0, 0), w, hgt);
    const up = toScreen(cam, new THREE.Vector3(0, 1, 0), w, hgt);
    const pxPerUnit = Math.max(1, Math.abs(o.y - up.y));
    units.current = { lift: Math.min(LIFT_MAX, KB.lift / pxPerUnit), travel: Math.min(TRAVEL_MAX, KB.press / pxPerUnit) };
    // Screen width of one unit at the back row's front labels (smallest under perspective)
    const [mx, mz] = slot(Math.floor(cols / 2), cols);
    const l = toScreen(cam, new THREE.Vector3(mx - 0.5, KEY_H / 2, mz + 0.4), w, hgt);
    const r = toScreen(cam, new THREE.Vector3(mx + 0.5, KEY_H / 2, mz + 0.4), w, hgt);
    setUnitPx(Math.round((r.x - l.x) / 4) * 4); // bucketed so small resizes don't redraw
    invalidate();
  }, [camera, size, cols, compact, invalidate]);

  // Where a key is on screen, through every motion layer
  useEffect(() => {
    const v = new THREE.Vector3();
    const at = (g: THREE.Object3D, rect: DOMRect, x: number, y: number, z: number) => {
      v.set(x, y, z);
      g.localToWorld(v).project(camera);
      return { x: rect.left + ((v.x + 1) / 2) * rect.width, y: rect.top + ((1 - v.y) / 2) * rect.height };
    };
    locator.current = i => {
      const g = lifts.current[i];
      if (!g) return null;
      g.updateWorldMatrix(true, false);
      const rect = gl.domElement.getBoundingClientRect();
      const left = at(g, rect, -TOP_W / 2, h, TOP_Z).x;
      const right = at(g, rect, TOP_W / 2, h, TOP_Z).x;
      return {
        x: (left + right) / 2,
        top: at(g, rect, 0, h, TOP_Z - TOP_D / 2).y,
        face: at(g, rect, 0, h, TOP_Z + TOP_D / 2).y,
        bottom: at(g, rect, 0, -h, 0.5).y,
        w: right - left,
      };
    };
    return () => {
      locator.current = null;
    };
  }, [camera, gl, locator]);

  // Top faces don't depend on layout: draw once
  useEffect(() => {
    caps.forEach((cap, i) => {
      drawTop(res.topMaps[i].image as HTMLCanvasElement, cap, icons[i % KEYS.length]);
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

  // Focus, the open key and the filter come from the DOM
  useEffect(() => invalidate(), [focused, open, filter, invalidate]);
  useEffect(() => {
    if (!pulse) return;
    anim.current.until[pulse.i] = performance.now() / 1000 + motionTokens.duration.fast;
    invalidate();
  }, [pulse, invalidate]);

  // Entrance: starts once the section is in view
  useEffect(() => {
    const st = intro.current;
    if (!play || st.done || st.t0 !== null) return;
    st.t0 = performance.now() / 1000;
    invalidate();
  }, [play, invalidate]);

  // Scroll-linked perspective: progress of the board through the viewport (0 as
  // it enters at the bottom, 1 as it leaves at the top), eased over the middle
  // half. Renders only while the value changes; never touches the page scroll.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const s = clamp01(((vh - r.top) / (vh + r.height) - 0.25) / 0.5);
      if (Math.abs(s - scrolled.current) < 1e-4) return;
      scrolled.current = s;
      invalidate();
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, [wrap, invalidate]);

  // Pointer tilt: fine pointers only, so touch scrolling never tilts the board
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !fine.matches) return;
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      // The side under the cursor turns toward the viewer
      tilt.current.tz = nx * KB.tilt * RAD;
      tilt.current.tx = -ny * KB.tilt * RAD;
      invalidate();
    };
    const leave = () => {
      tilt.current.tx = 0;
      tilt.current.tz = 0;
      invalidate();
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [wrap, invalidate]);

  useEffect(() => () => {
    gl.domElement.style.cursor = '';
  }, [gl]);

  useFrame((_, delta) => {
    const a = anim.current;
    const { open: openKey, filter: f } = live.current;
    const now = performance.now() / 1000;
    const dt = Math.min(delta, 1 / 30);
    let moving = false;

    // Layer 1, entrance: fade in, rise and rotate into the resting angle (once)
    const st = intro.current;
    let t = Infinity; // seconds into the entrance
    if (!st.done) {
      t = st.t0 === null ? 0 : now - st.t0;
      if (st.t0 !== null) moving = true;
      if (t >= KB.enterEnd) {
        st.done = true;
        t = Infinity;
        live.current.onEntered();
      }
    }
    const pb = ease(clamp01(t / KB.enter));
    const el = wrap.current;
    if (el && (pb < 1 || el.style.opacity !== '1')) {
      el.style.opacity = String(clamp01(t / (KB.enter * 0.6)));
      el.style.transform = pb < 1 ? `translateY(${((1 - pb) * KB.rise).toFixed(2)}px)` : '';
    }
    if (enterG.current) enterG.current.rotation.x = -KB.enterTilt * RAD * (1 - pb);

    // Layer 2, scroll: a more top-down view and a small rise through the section
    const s = scrolled.current;
    if (scrollG.current) {
      scrollG.current.rotation.x = s * KB.scrollTilt * RAD;
      scrollG.current.position.y = s * SCROLL_RISE;
    }

    // Layer 3, pointer tilt, eased toward the cursor
    const tl = tilt.current;
    const follow = 1 - Math.exp(-dt / KB.tiltFollow);
    tl.x += (tl.tx - tl.x) * follow;
    tl.z += (tl.tz - tl.z) * follow;
    if (Math.abs(tl.tx - tl.x) + Math.abs(tl.tz - tl.z) > 1e-4) moving = true;
    else [tl.x, tl.z] = [tl.tx, tl.tz];
    tiltG.current?.rotation.set(tl.x, 0, tl.z);

    // Layer 4, keys: row-by-row settle, then each key's own spring and shadow
    const stagger = Math.min(KB.rowStagger, (KB.enterEnd - KB.enterDelay - KB.settle) / Math.max(1, rows - 1));
    const { lift, travel } = units.current;
    const step = dt / 4;
    const { stiffness: k, damping: c } = springs.snappy;
    for (let i = 0; i < KEYS.length; i++) {
      const pressed = a.down[i] === 1 || now < a.until[i];
      // Outside the filter a key sits flush (fully down, no shadow) in its dark
      // muted skin, so the state reads without colour; matches stay raised
      const rest = !inFilter(KEYS[i], f) ? -travel : i === openKey ? -travel / 2 : 0;
      const target = pressed ? -travel : rest + (hover.current === i ? lift : 0);
      for (let n = 0; n < 4; n++) {
        a.v[i] += (-k * (a.y[i] - target) - c * a.v[i]) * step;
        a.y[i] += a.v[i] * step;
      }
      if (Math.abs(a.y[i] - target) < 1e-4 && Math.abs(a.v[i]) < 1e-3) {
        a.y[i] = target;
        a.v[i] = 0;
      } else moving = true;
      if (pressed) moving = true; // render again when the hold ends

      const settle = SETTLE * (1 - ease(clamp01((t - KB.enterDelay - Math.floor(i / cols) * stagger) / KB.settle)));
      const g = lifts.current[i];
      if (g) g.position.y = a.y[i] + settle;

      // Hard offset shadow: grows as the key lifts, tucks under it as it presses
      const off = a.y[i] >= 0 ? SHADOW + (a.y[i] / lift) * SHADOW_GROW : SHADOW * Math.max(0, 1 + a.y[i] / travel);
      shadows.current[i]?.position.set(off, -h + 0.004, off);
    }
    if (moving) invalidate();
    live.current.onFrame();
  });

  // The outline shell encloses the cap, so it doubles as the pointer target.
  // Hover (lift, tooltip) is for mouse and pen; touch gets the press only.
  const pointer = (i: number) => ({
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (e.pointerType === 'touch') return;
      hover.current = i;
      gl.domElement.style.cursor = 'pointer';
      live.current.onHover(i);
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
      anim.current.until[i] = performance.now() / 1000 + motionTokens.duration.fast;
      live.current.onSelect(i);
      invalidate();
    },
  });

  const noHit = () => null;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 10, 7]} intensity={2} />
      <directionalLight position={[3, 4, -9]} intensity={1.4} color="#B8C4FF" />

      <group ref={enterG}>
        <group ref={scrollG}>
          <group ref={tiltG}>
            <mesh geometry={board.shadow} material={res.shadowMat} position={[BOARD_SHADOW, -BOARD_H - 0.01, BOARD_SHADOW]} raycast={noHit} />
            <mesh geometry={board.geo} material={res.boardMat} position-y={-BOARD_H / 2} raycast={noHit} />

            {KEYS.map((k, i) => {
              const [x, z] = slot(i, cols);
              const m = inFilter(k, filter) ? i : i + KEYS.length; // lit or muted skin
              return (
                <group key={k.label} position={[x, KEY_H / 2, z]}>
                  <mesh ref={el => { shadows.current[i] = el; }} geometry={res.keyShadow} material={res.shadowMat} position={[SHADOW, -h + 0.004, SHADOW]} raycast={noHit} />
                  <group ref={el => { lifts.current[i] = el; }} position-y={entrance ? SETTLE : 0}>
                    <mesh geometry={res.sides} material={res.sideMats[m]} raycast={noHit} />
                    <mesh geometry={res.front} material={res.frontMats[m]} raycast={noHit} />
                    <mesh geometry={res.top} material={res.topMats[m]} position={[0, h + 0.002, TOP_Z]} raycast={noHit} />
                    {/* Keyboard focus: orange outline and an orange frame on the top face */}
                    <mesh geometry={res.shell} material={i === focused ? res.focusMat : res.inkMat} scale={[OUTLINE, 1.05, OUTLINE]} {...pointer(i)} />
                    {i === focused && <mesh geometry={res.top} material={res.frameMat} position={[0, h + 0.004, TOP_Z]} raycast={noHit} />}
                  </group>
                </group>
              );
            })}
          </group>
        </group>
      </group>
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
  const [play, setPlay] = useState(false);

  // Stop rendering entirely while the board is off screen; start the entrance
  // once a third of it is in view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setOnScreen(e.isIntersecting);
      if (e.intersectionRatio >= 0.33) setPlay(true);
    }, { threshold: [0, 0.33] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Starts hidden when the entrance is still to play; the frame loop fades it in
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true" style={props.entrance ? { opacity: 0 } : undefined}>
      <Canvas
        frameloop={onScreen ? 'demand' : 'never'}
        dpr={[1, 1.75]}
        // r3f defaults: ACES Filmic tone mapping, sRGB output
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 20, near: 0.1, far: 200 }}
        style={{ touchAction: 'pan-y' }}
      >
        <Wake on={onScreen} />
        <Scene icons={icons} wrap={wrapRef} play={play} {...props} />
      </Canvas>
    </div>
  );
}
