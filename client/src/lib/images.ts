/** One file of a responsive set: URL and its real pixel width */
export type ImageSource = { src: string; w: number };

/**
 * A case screenshot's WebP set (design-system/portfolio/asset-work/webp-manifest.md):
 * the 1x file at the widest display width, plus the denser one (@full or @2x)
 * where the manifest lists it. Widths are the files' real widths.
 */
export function caseWebp(path: string, w: number, dense?: ['@full' | '@2x', number]): ImageSource[] {
  const base = `/assets/case/${path}`;
  const set = [{ src: `${base}.webp`, w }];
  if (dense) set.push({ src: `${base}${dense[0]}.webp`, w: dense[1] });
  return set;
}

/** `srcset` with w descriptors */
export const toSrcSet = (set: readonly ImageSource[]) => set.map(s => `${s.src} ${s.w}w`).join(', ');

/** The smallest file at least `cssWidth` x DPR wide (the largest if none is); set sorted by width */
export function pickSource(set: readonly ImageSource[], cssWidth: number): string {
  const need = cssWidth * (window.devicePixelRatio || 1);
  return (set.find(s => s.w >= need) ?? set[set.length - 1]).src;
}
