/**
 * PixelatedImage
 *
 * Renders a project image on a <canvas> through the PixelationManager.
 *
 * Behaviour:
 *  • Starts at full pixelation (blockSize 22) when off-screen.
 *  • On first scroll-into-view: eases blockSize → 1 (crisp reveal).
 *  • On hover-in: blockSize jumps to 8 (re-pixelates the image).
 *  • On hover-out: eases back to 1 (crisp).
 *
 * The easing uses a simple exponential approach each RAF frame:
 *   current += (target - current) * 0.10
 * which gives ~600 ms to reach near-target at 60 fps.
 */
import { useRef, useEffect, useCallback } from 'react';
import { PixelationManager } from '@/utils/PixelationManager';

const manager = PixelationManager.getInstance();
const EASE = 0.10;          // lerp factor per frame
const INITIAL_SIZE = 22;    // start fully pixelated
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
  const sizeRef    = useRef(INITIAL_SIZE);   // current (animated) block size
  const targetRef  = useRef(INITIAL_SIZE);   // where we're heading
  const rafRef     = useRef(0);
  const revealedRef = useRef(false);         // true once first in-view reveal fires

  // ── Animation loop ────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;

    // Exponential ease toward target
    sizeRef.current += (targetRef.current - sizeRef.current) * EASE;

    const ps = Math.max(CRISP_SIZE, Math.round(sizeRef.current));
    manager.draw(img, canvas, ps);

    if (Math.abs(sizeRef.current - targetRef.current) > DONE_THRESH) {
      rafRef.current = requestAnimationFrame(tick);
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
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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

    // Scroll-into-view reveal — fires once per mount
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealedRef.current) {
          revealedRef.current = true;
          targetRef.current   = CRISP_SIZE;
          startLoop();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      img.onload = null;
    };
  }, [src, startLoop]);

  // ── Hover handlers ────────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    targetRef.current = HOVER_SIZE;
    startLoop();
  }, [startLoop]);

  const handleMouseLeave = useCallback(() => {
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
