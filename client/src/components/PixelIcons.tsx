/**
 * Pixel art SVG icons — 16×16 grid, each cell = 1 viewBox unit.
 * imageRendering: pixelated keeps edges crisp when scaled.
 */
import React from 'react';

function PixelGrid({ rows, fg }: { rows: string[]; fg: string }) {
  const out: React.ReactElement[] = [];
  rows.forEach((row, r) => {
    row.split('').forEach((cell, c) => {
      if (cell === '1') {
        out.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={fg} />);
      }
    });
  });
  return <>{out}</>;
}

// ── LinkedIn "in" monogram ────────────────────────────────────────────────
// i dot:  rows 2-3, cols 2-3
// i bar:  rows 5-10, cols 2-3
// n arch: rows 5-6, cols 6-11
// n legs: rows 7-10, cols 6-7 (left) & 10-11 (right)
const LI_ROWS = [
  '0000000000000000',
  '0000000000000000',
  '0011000000000000',
  '0011000000000000',
  '0000000000000000',
  '0011001111110000',
  '0011001111110000',
  '0011001100110000',
  '0011001100110000',
  '0011001100110000',
  '0011001100110000',
  '0000000000000000',
  '0000000000000000',
  '0000000000000000',
  '0000000000000000',
  '0000000000000000',
];

// ── GitHub pixel cat ──────────────────────────────────────────────────────
// Ear tips: row 1, cols 4 & 11
// Ear bases: row 2, cols 3-5 (left) & 10-12 (right)
// Head: rows 3-6, cols 2-13  |  Eyes (gaps): row 5, cols 4-5 & 10-11
// Chin taper: rows 7-8  |  Paws: rows 9-10  |  Tail: rows 11-13, left edge
const GH_ROWS = [
  '0000000000000000',
  '0000100000010000',
  '0001110000111000',
  '0011111111111100',
  '0011111111111100',
  '0011001111001100',
  '0011111111111100',
  '0001111111111000',
  '0000111111110000',
  '0000110001100000',
  '0000011011000000',
  '0100000000000000',
  '1100000000000000',
  '0100000000000000',
  '0000000000000000',
  '0000000000000000',
];

// ── Email envelope ────────────────────────────────────────────────────────
// Border rect: rows 1 & 13 (top/bottom), cols 1 & 14 (sides)
// V-flap: diagonals from top-left & top-right corners meeting at row 7 center
const EM_ROWS = [
  '0000000000000000',
  '0111111111111110',
  '0110000000000110',
  '0101000000001010',
  '0100100000010010',
  '0100010000100010',
  '0100001001000010',
  '0100000110000010',
  '0100000000000010',
  '0100000000000010',
  '0100000000000010',
  '0100000000000010',
  '0100000000000010',
  '0111111111111110',
  '0000000000000000',
  '0000000000000000',
];

export function PixelLinkedIn({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}>
      <rect width="16" height="16" fill="#0A66C2" />
      <PixelGrid rows={LI_ROWS} fg="white" />
    </svg>
  );
}

export function PixelGitHub({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}>
      <rect width="16" height="16" fill="#111111" />
      <PixelGrid rows={GH_ROWS} fg="white" />
    </svg>
  );
}

export function PixelEmail({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}>
      <rect width="16" height="16" fill="#000000" />
      <PixelGrid rows={EM_ROWS} fg="#F59E0B" />
    </svg>
  );
}
