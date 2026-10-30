/**
 * PixelatedImage
 *
 * Renders a project image on a <canvas> through the PixelationManager.
 *
 * Behaviour:
 *  • Renders crisp (blockSize 1) as soon as the image loads. No scroll reveal.
 *  • On hover-in: eases blockSize toward 8 (re-pixelates the image).
 *  • On hover-out: eases back to 1 (crisp).
 *  • With prefers-reduced-motion, hover does nothing and the image stays crisp.
 *
 * The easing uses a simple exponential approach each RAF frame:
 *   current += (target - current) * 0.10
 * The RAF loop only runs while easing and stops once it reaches the target,
 * so nothing runs while idle.
 */
import { useRef, useEffect, useCallback } from 'react';
import { PixelationManager } from '@/utils/PixelationManager';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const manager = PixelationManager.getInstance();
const EASE = 0.10;          // lerp factor per frame
const HOVER_SIZE   = 8;     // pixelate on hover
const CRISP_SIZE   = 1;     // full-resolution target
const DONE_THRESH  = 0.08;  // stop RAF when this close

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function PixelatedImage({ src, alt, className }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imgRef     = useRef<HTMLImageElement | null>(null);
  const reduced    = useReducedMotion();
  const sizeRef    = useRef(CRISP_SIZE);     // current (animated) block size
  const targetRef  = useRef(CRISP_SIZE);     // where we're heading
  const rafRef     = useRef(0);

  // ── Animation loop ────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;

    // Exponential ease toward target
    sizeRef.current += (targetRef.current - sizeRef.current) * EASE;

    // Canvas backing store is in device pixels, so scale block size by DPR
    // to keep the same on-screen block size on retina displays.
    const ps = Math.max(CRISP_SIZE, Math.round(sizeRef.current));
    const dpr = window.devicePixelRatio || 1;
    manager.draw(img, canvas, ps <= CRISP_SIZE ? CRISP_SIZE : ps * dpr);

    if (Math.abs(sizeRef.current - targetRef.current) > DONE_THRESH) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      sizeRef.current = targetRef.current; // settle exactly; loop stops here
    }
  }, []);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Setup: load image, size canvas, wire observers ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      if (canvas.offsetWidth === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.round(canvas.offsetWidth * dpr);
      canvas.height = Math.round(canvas.offsetHeight * dpr);
    };

    // ── Load image — assign onload BEFORE src to catch all browsers ──────
    const img = new Image();
    imgRef.current = img;

    const onReady = () => {
      syncSize();
      startLoop();
    };

    img.onload = onReady;
    img.src = src;

    // Vite-bundled assets are typically already decoded in browser cache.
    // If img.complete is already true when we check, onload won't fire.
    if (img.complete) {
      img.onload = null; // prevent double-call if it fires anyway
      onReady();
    }

    // Keep canvas buffer in sync when container resizes (responsive grid)
    const ro = new ResizeObserver(() => {
      syncSize();
      if (imgRef.current?.complete) startLoop();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      img.onload = null;
    };
  }, [src, startLoop]);

  // ── Hover handlers ────────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    if (reduced || !window.matchMedia('(hover: hover)').matches) return;
    targetRef.current = HOVER_SIZE;
    startLoop();
  }, [reduced, startLoop]);

  const handleMouseLeave = useCallback(() => {
    if (targetRef.current === CRISP_SIZE) return;
    targetRef.current = CRISP_SIZE;
    startLoop();
  }, [startLoop]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block' }}
      role="img"
      aria-label={alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
