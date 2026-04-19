/**
 * Bayer-matrix dithered page transition.
 * On navigation: amber pixel blocks fill screen in dithered order → new page reveals.
 *
 * Technique from: https://tympanus.net/codrops/2025/12/23/building-a-nostalgic-8-bit-universe/
 * The 4×4 Bayer matrix defines the order pixel blocks reveal, creating the
 * characteristic ordered-dithering pattern used in old handheld game consoles.
 */

import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { play } from '@/hooks/useSound';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// 4×4 Bayer dithering matrix (values 0–15, lower = reveals earlier)
const BAYER_4X4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
];

const BLOCK = 32; // pixel block size in CSS pixels
const FILL_STEPS = 16; // 16 threshold steps (matches 4×4 matrix values 0–15)
const STEP_MS = 28; // ms between fill steps → total fill ~448ms

function drawFrame(
  ctx: CanvasRenderingContext2D,
  cols: number,
  rows: number,
  threshold: number, // 0–15: blocks with bayer value ≤ threshold are filled
  color: string,
  clear: boolean,
) {
  if (clear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = color;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const bv = BAYER_4X4[row % 4][col % 4];
      if (clear ? bv > threshold : bv <= threshold) {
        ctx.fillRect(col * BLOCK, row * BLOCK, BLOCK, BLOCK);
      }
    }
  }
}

export default function DitherTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [location] = useLocation();
  const prevLocation = useRef(location);
  const animating = useRef(false);
  const reduced = useReducedMotion();

  const runTransition = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || animating.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.display = 'block';

    const cols = Math.ceil(W / BLOCK) + 1;
    const rows = Math.ceil(H / BLOCK) + 1;

    animating.current = true;
    play('whoosh');

    let step = 0;

    // Phase 1: fill in (amber blocks appear in dithered order)
    const fillId = setInterval(() => {
      drawFrame(ctx, cols, rows, step, '#F59E0B', step === 0);
      step++;
      if (step > FILL_STEPS) {
        clearInterval(fillId);
        // Brief hold at full coverage
        setTimeout(() => {
          step = FILL_STEPS;
          // Phase 2: clear out (blocks disappear in dithered order)
          const clearId = setInterval(() => {
            step--;
            drawFrame(ctx, cols, rows, step, '#F59E0B', true);
            if (step <= 0) {
              clearInterval(clearId);
              canvas.style.display = 'none';
              animating.current = false;
            }
          }, STEP_MS);
        }, 80);
      }
    }, STEP_MS);
  }, []);

  // Fire once on first home page load (after LoadingBar exits ~2.6s)
  const hasRunOnce = useRef(false);
  useEffect(() => {
    if (reduced || hasRunOnce.current) return;
    hasRunOnce.current = true;
    const t = setTimeout(runTransition, 2600);
    return () => clearTimeout(t);
  }, [runTransition, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (location !== prevLocation.current) {
      prevLocation.current = location;
      runTransition();
    }
  }, [location, runTransition, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ display: 'none', imageRendering: 'pixelated' }}
    />
  );
}
