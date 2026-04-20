import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; color: string;
  life: number; decay: number;
}

const AMBER   = '#F59E0B';
const GOLD    = '#FCD34D';
const BLUE    = '#3B82F6';
const WHITE   = '#FFFFFF';
const PALETTE = [AMBER, AMBER, GOLD, WHITE, BLUE];

// Windows XP–style arrow cursor (black outline + white fill)
const XP_ARROW = `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='22'>
  <path d='M1 1 L1 18 L5 13 L8 20 L10.5 19 L7 12 L12 12 Z'
        fill='black' stroke='black' stroke-width='1.5' stroke-linejoin='round'/>
  <path d='M2 3 L2 15.5 L5.2 11.5 L8 17.5 L9.2 17 L6.2 10 L10.5 10 Z'
        fill='white'/>
</svg>`;

// XP hand/pointer cursor
const XP_HAND = `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='22'>
  <path d='M5 1 C5 1 5 11 5 12 L3 12 L3 9 L1.5 9 L1.5 13 L0 13 L0 17 C0 19 2 21 4 21 L10 21 C12 21 13 19 13 17 L13 11 L11 11 L11 9 L9 9 L9 12 L7 12 L7 1 Z'
        fill='black' stroke='black' stroke-width='1' stroke-linejoin='round'/>
  <path d='M6 2 L6 13 L8 13 L8 10 L10 10 L10 12 L12 12 L12 17 C12 18.5 11 20 10 20 L4 20 C3 20 1 18.5 1 17 L1 14 L2.5 14 L2.5 10 L4 10 L4 13 L6 13 Z'
        fill='white'/>
  <rect x='5.5' y='1' width='1' height='12' fill='black' opacity='0.15'/>
</svg>`;

const INTERACTIVE = 'button, a, [role="button"], input, textarea, select, label, [tabindex]';

export default function PixelCursor() {
  const [touchDevice, setTouchDevice] = useState(false);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<Particle[]>([]);
  const rafId      = useRef(0);
  const reduced    = useReducedMotion();
  const mouse      = useRef({ x: -300, y: -300 });

  // ── Particle canvas ────────────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setTouchDevice(true);
      return;
    }

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnBurst = (x: number, y: number) => {
      if (reduced) return;
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.8 + Math.random() * 5.5;
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.floor(Math.random() * 5),
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          life: 1,
          decay: 0.022 + Math.random() * 0.02,
        });
      }
    };

    const onMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.12;   // gravity
        p.vx *= 0.97;
        p.life -= p.decay;
        if (p.life > 0) {
          ctx.globalAlpha = p.life;
          ctx.fillStyle   = p.color;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
          alive.push(p);
        }
      }
      particles.current = alive;
      ctx.globalAlpha   = 1;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  // ── Inject XP cursor CSS ───────────────────────────────────────────────
  useEffect(() => {
    if (touchDevice) return;
    const arrow   = `url("data:image/svg+xml,${encodeURIComponent(XP_ARROW)}") 1 1, auto`;
    const hand    = `url("data:image/svg+xml,${encodeURIComponent(XP_HAND)}") 5 1, pointer`;
    const s = document.createElement('style');
    s.id = 'pixel-cursor-style';
    s.textContent = `
      * { cursor: ${arrow} !important; }
      button, a, [role="button"], label, [tabindex]:not([tabindex="-1"]) { cursor: ${hand} !important; }
      input, textarea, select { cursor: text !important; }
    `;
    document.head.appendChild(s);
    return () => document.getElementById('pixel-cursor-style')?.remove();
  }, [touchDevice]);

  if (touchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
