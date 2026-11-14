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

// Both icons draw in currentColor so they take the text colour of the button
// or link they sit in (white on the black footer, ink on the page).
const SVG_STYLE = { imageRendering: 'pixelated', display: 'block', flexShrink: 0 } as const;

export function PixelLinkedIn({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" style={SVG_STYLE}>
      {/* 1px frame, then the monogram shifted to sit centred inside it */}
      <path d="M0 0h16v16H0zM1 1v14h14V1z" fill="currentColor" fillRule="evenodd" />
      <g transform="translate(1 1)">
        <PixelGrid rows={LI_ROWS} fg="currentColor" />
      </g>
    </svg>
  );
}

export function PixelGitHub({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" style={SVG_STYLE}>
      <PixelGrid rows={GH_ROWS} fg="currentColor" />
    </svg>
  );
}
