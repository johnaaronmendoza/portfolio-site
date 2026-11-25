import { Link } from "wouter";
import type { ReactNode } from "react";
import Window from "./Window";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToSection } from "@/lib/utils";

// Three proof points under the hero (John, 16 Nov 2026), replacing the
// five-figure stats band: one figure + one sentence that says what it means,
// each linking to where the evidence lives. Facts only from the site: the UWB
// case study and the Experience entries (CLAUDE.md honesty rules). The ML
// result leads for the AI & Data track. Blue marks data; the work figures
// are ink (yellow is reserved for AI).
type Proof = {
  value: string;
  tone: "data" | "ink";
  lead: string;
  rest: string;
  go: string;
} & ({ to: string } | { section: string });

const PROOFS: Proof[] = [
  {
    value: "89.61%",
    tone: "data",
    lead: "UWB signal classifier",
    rest: " beat its 85.75% baseline (SVM-RBF, 41,996 samples, team coursework)",
    go: "Case study",
    to: "/projects/uwb",
  },
  {
    value: "40%",
    tone: "ink",
    lead: "Fewer manual agent actions",
    rest: " with Freshservice workflow automation at LGA Telecom",
    go: "Experience",
    section: "experience",
  },
  {
    value: "1,000+",
    tone: "ink",
    lead: "Network configurations migrated",
    rest: " while leading the FreeSDN integration across 4+ manufacturers at LGA Telecom",
    go: "Experience",
    section: "experience",
  },
];

const ROW =
  "group flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 px-4 py-3 " +
  "min-h-[44px] transition-colors duration-150 hover:bg-[var(--page)] outline-offset-[-4px]";

function Row({ p, children }: { p: Proof; children: ReactNode }) {
  const reduced = useReducedMotion();
  if ("to" in p)
    return (
      <Link href={p.to} className={ROW}>
        {children}
      </Link>
    );
  return (
    <a
      href={`#${p.section}`}
      onClick={e => {
        e.preventDefault();
        scrollToSection(p.section, reduced);
      }}
      className={ROW}
    >
      {children}
    </a>
  );
}

export default function ProofPoints() {
  return (
    <Window title="proof.txt" bodyClassName="p-0">
      <h2 className="sr-only">Proof in numbers</h2>
      <ul>
        {PROOFS.map(p => (
          <li
            key={p.value}
            className="border-t-[3px] border-black first:border-t-0"
          >
            <Row p={p}>
              <span
                className={`flex-none min-w-[7.5rem] text-center font-label font-bold tabular-nums tracking-[-0.02em] text-lead sm:text-card-title border-[3px] border-black px-2 py-1 ${
                  p.tone === "data"
                    ? "bg-[var(--blue)] text-white"
                    : "bg-[var(--bar)] text-[color:var(--paper)]"
                }`}
              >
                {p.value}
              </span>
              <span className="basis-full sm:basis-auto sm:flex-1 font-sans text-body-sm sm:text-body leading-snug text-[color:var(--text)]">
                <strong className="font-bold">{p.lead}</strong>
                {p.rest}
              </span>
              <span className="flex-none font-label text-label text-[color:var(--blue-text)] underline underline-offset-4 decoration-2 group-hover:no-underline">
                {p.go} <span aria-hidden="true">→</span>
              </span>
            </Row>
          </li>
        ))}
      </ul>
    </Window>
  );
}
