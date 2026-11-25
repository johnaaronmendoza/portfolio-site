import { useId } from "react";

/** source: where the figure comes from, read as part of the label */
export type Stat = { value: string; label: string; source?: string };

type Variant = "status" | "inline";

interface StatStripProps {
  stats: Stat[];
  /** status: a case-study header window's last row; inline: big-number
   *  callouts inside a window body (no shadow) */
  variant: Variant;
  className?: string;
}

// Cells are size containers, so the cqi caps keep a 6-glyph value ("89.61%")
// inside its cell at every width from 320px; inline allows "1.757 m".
const CELL: Record<Variant, string> = {
  status: "p-4 [container-type:inline-size]",
  inline: "p-3 sm:p-4 [container-type:inline-size]",
};

const VALUE: Record<Variant, string> = {
  status: "text-[length:min(36px,22cqi)] lg:text-[length:min(42px,22cqi)]",
  inline: "text-[length:min(40px,20cqi)]",
};

const FRAME: Record<Variant, string> = {
  status: "border-t-[3px] border-black",
  inline: "border-[3px] border-black",
};

// Inline: as many columns as cells from lg (max 4); 2 below lg
const INLINE_LG_COLS = [
  "",
  "lg:grid-cols-1",
  "lg:grid-cols-2",
  "lg:grid-cols-3",
  "lg:grid-cols-4",
];

/**
 * Paper figure cells on black: 3px gaps draw the dividers. The figure is the
 * term and its clause the description, so screen readers hear them in the
 * order they show. Values render final (no count-up).
 */
export default function StatStrip({
  stats,
  variant,
  className = "",
}: StatStripProps) {
  const headingId = useId();
  const inline = variant === "inline";
  const lgCols = inline
    ? INLINE_LG_COLS[Math.min(stats.length, 4)]
    : "lg:grid-cols-4";
  // Status on phones: one column, labels held to 18ch on the left, so the
  // fixed chat launcher's lane on the right only ever sits over empty cell space
  const cols =
    variant === "status" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2";
  const list = (
    <dl
      className={`grid ${cols} ${lgCols} gap-[3px] bg-black text-black ${FRAME[variant]} ${className}`}
    >
      {stats.map(({ value, label, source }, i) => (
        <div
          key={label}
          className={`flex flex-col gap-3 bg-[var(--paper)] ${CELL[variant]} ${
            // An odd last cell spans the 2-column row below lg
            inline && stats.length % 2 === 1 && i === stats.length - 1
              ? "col-span-2 lg:col-span-1"
              : ""
          }`}
        >
          <dt
            className={`self-start font-label font-bold tracking-[-0.02em] leading-none tabular-nums ${VALUE[variant]}`}
          >
            {value}
          </dt>
          <dd className="font-sans text-body-sm sm:text-body leading-snug max-w-[18ch] lg:max-w-[24ch]">
            {label}
            {source && (
              <span className="mt-2 block w-fit border-2 border-black px-2 py-0.5 font-label text-body-sm leading-[1.35]">
                {source}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );

  // Inline strips sit in a labelled section already; the case header's strip
  // gets its own (hidden) h2, after the page h1
  if (variant !== "status") return list;
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        Key figures
      </h2>
      {list}
    </section>
  );
}
