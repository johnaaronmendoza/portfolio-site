/**
 * Singleton PixelationManager
 *
 * Maintains one shared offscreen canvas to avoid redundant canvas creation
 * across multiple PixelatedImage instances, reducing memory pressure.
 *
 * Core technique: downscale source → tiny offscreen canvas (sampling),
 * then upscale back to display canvas with imageSmoothingEnabled=false
 * to get the crisp "blocky pixel" look.
 */
/** Which part of the image a cover crop keeps, like object-position plus a
 *  zoom: x and y run 0 (left/top) to 1 (right/bottom); zoom > 1 cuts in further */
export type ImageCrop = { x?: number; y?: number; zoom?: number };

export class PixelationManager {
  private static _instance: PixelationManager | null = null;
  private offscreen: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;

  private constructor() {
    this.offscreen = document.createElement("canvas");
    // willReadFrequently=false — we never read back pixel data, only draw.
    this.offCtx = this.offscreen.getContext("2d", {
      willReadFrequently: false,
    })!;
  }

  static getInstance(): PixelationManager {
    if (!PixelationManager._instance) {
      PixelationManager._instance = new PixelationManager();
    }
    return PixelationManager._instance;
  }

  /**
   * Draw `image` onto `target` canvas at the given pixelation block size.
   * pixelSize=1 → crisp full-resolution.
   * pixelSize=20 → very blocky 8-bit look.
   */
  draw(
    image: HTMLImageElement,
    target: HTMLCanvasElement,
    pixelSize: number,
    crop: ImageCrop = {}
  ): void {
    if (!image.complete || image.naturalWidth === 0) return;
    const W = target.width;
    const H = target.height;
    if (W === 0 || H === 0) return;

    const ctx = target.getContext("2d");
    if (!ctx) return;

    // ── Object-cover crop: fill without stretching, at the crop's focus ──
    const { x = 0.5, y = 0.5, zoom = 1 } = crop;
    const iw = image.naturalWidth;
    const ih = image.naturalHeight;
    const imgAspect = iw / ih;
    const canvasAspect = W / H;

    let sw = iw,
      sh = ih;
    if (imgAspect > canvasAspect)
      sw = ih * canvasAspect; // wider: crop left/right
    else sh = iw / canvasAspect; // taller: crop top/bottom
    sw /= zoom;
    sh /= zoom;
    const sx = (iw - sw) * x;
    const sy = (ih - sh) * y;

    if (pixelSize <= 1) {
      // Full-resolution — bypass offscreen pass entirely.
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, W, H);
      return;
    }

    // ── Phase 1: sample down (preserving cover crop) ──────────────────────
    const blocksX = Math.max(1, Math.floor(W / pixelSize));
    const blocksY = Math.max(1, Math.floor(H / pixelSize));

    this.offscreen.width = blocksX;
    this.offscreen.height = blocksY;
    this.offCtx.imageSmoothingEnabled = false;
    this.offCtx.drawImage(image, sx, sy, sw, sh, 0, 0, blocksX, blocksY);

    // ── Phase 2: upscale to target — no smoothing = crisp blocks ─────────
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.offscreen, 0, 0, blocksX, blocksY, 0, 0, W, H);
  }
}
