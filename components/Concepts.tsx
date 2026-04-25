"use client";

import type { ReactNode } from "react";

interface Concept {
  id: string;
  title: string;
  unit: string;
  symbol: string;
  formula: string;
  tagline: string;
  body: string;
  Visual: () => ReactNode;
  metaphor: string;
}

const CONCEPTS: Concept[] = [
  {
    id: "voltage",
    title: "Voltage",
    unit: "volt · V",
    symbol: "V",
    formula: "V = W / Q",
    tagline: "Pressure difference across two points.",
    body: "Voltage is the energy each unit of charge picks up: the push that makes electrons move. No difference, no flow.",
    metaphor: "Think water tower height. Taller tower, more push.",
    Visual: VoltageVisual,
  },
  {
    id: "current",
    title: "Current",
    unit: "ampere · A",
    symbol: "I",
    formula: "I = Q / t",
    tagline: "Rate of charge moving past a point.",
    body: "Current is how many charges flow per second. In a series loop, the same current passes through every component. What enters one end exits the other.",
    metaphor: "Pipe flow rate: gallons per second past a sensor.",
    Visual: CurrentVisual,
  },
  {
    id: "resistance",
    title: "Resistance",
    unit: "ohm · Ω",
    symbol: "R",
    formula: "R = V / I",
    tagline: "Opposition to charge flow.",
    body: "Higher resistance, less current for the same voltage. Resistance turns electrical energy into heat and is the load that defines how a circuit behaves.",
    metaphor: "Pipe diameter: narrower pipe, slower flow.",
    Visual: ResistanceVisual,
  },
  {
    id: "signal-flow",
    title: "Signal flow",
    unit: "loop direction",
    symbol: "→",
    formula: "+ → load → −",
    tagline: "Conventional current's path through the loop.",
    body: "Conventional current flows from the source's positive terminal, through every component, and returns to the negative. Electrons drift the other way. The direction is convention, not physics.",
    metaphor: "A relay race. The baton always returns to start.",
    Visual: SignalFlowVisual,
  },
  {
    id: "power",
    title: "Power",
    unit: "watt · W",
    symbol: "P",
    formula: "P = V · I",
    tagline: "Energy delivered per second.",
    body: "Power is how fast a component converts electrical energy into something else: heat in a resistor, motion in a motor, sound in a speaker.",
    metaphor: "How hard the engine is working, not how far it's gone.",
    Visual: PowerVisual,
  },
];

export function Concepts() {
  return (
    <section
      id="concepts"
      className="relative border-t border-line-subtle bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">
              §03 · concepts
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
              Five quantities. One loop.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-secondary">
              Every electrical phenomenon in this lab reduces to a relationship
              between five things: what the source provides, what the load
              opposes, and what flows in between.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            visual primer
          </div>
        </div>

        <div className="grid gap-px bg-line-subtle/60 rounded-xl overflow-hidden border border-line-subtle md:grid-cols-2 lg:grid-cols-3">
          {CONCEPTS.map((c, i) => (
            <ConceptCard key={c.id} concept={c} index={i} />
          ))}
          <FormulaCard />
        </div>
      </div>
    </section>
  );
}

function ConceptCard({ concept, index }: { concept: Concept; index: number }) {
  return (
    <article className="group relative bg-bg-surface p-6 transition-colors hover:bg-bg-elevated">
      <header className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            §03.{String(index + 1).padStart(2, "0")} · {concept.unit}
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink-primary">
            {concept.title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-line-muted bg-bg-base font-mono text-[12px] text-ink-secondary">
          {concept.symbol}
        </span>
      </header>

      <p className="mt-2 text-[13px] text-signal/85 font-mono tabular">
        {concept.formula}
      </p>

      <div className="mt-4 h-28 w-full rounded-md border border-line-subtle bg-bg-base/60 overflow-hidden relative">
        <concept.Visual />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line-subtle/40 rounded-md" />
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-ink-primary">
        {concept.tagline}
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-secondary">
        {concept.body}
      </p>
      <p className="mt-3 font-mono text-[10.5px] tabular text-ink-muted">
        <span className="text-ink-secondary">// metaphor: </span>
        {concept.metaphor}
      </p>
    </article>
  );
}

function FormulaCard() {
  return (
    <article className="relative bg-bg-surface p-6 overflow-hidden">
      {/* Background diagram */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="cf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#243043" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#cf-grid)" />
      </svg>
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          §03.06 · the law
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink-primary">
          Ohm's triangle
        </h3>
        <p className="mt-2 text-[13px] text-ink-secondary leading-relaxed">
          Cover any letter to find its formula. The whole lab simulates these three identities at 60fps.
        </p>

        <div className="mt-5 space-y-2.5 font-mono tabular text-[13px]">
          <FormulaRow lhs="V" rhs="= I · R" hint="solve for voltage" />
          <FormulaRow lhs="I" rhs="= V / R" hint="solve for current" />
          <FormulaRow lhs="R" rhs="= V / I" hint="solve for resistance" />
          <FormulaRow lhs="P" rhs="= V · I = I² · R" hint="solve for power" muted />
        </div>
      </div>
    </article>
  );
}

function FormulaRow({
  lhs,
  rhs,
  hint,
  muted,
}: {
  lhs: string;
  rhs: string;
  hint: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-line-subtle/50 pb-1.5">
      <p className="flex items-baseline gap-2">
        <span
          className={`text-base ${muted ? "text-volt" : "text-signal"} font-semibold`}
        >
          {lhs}
        </span>
        <span className="text-ink-primary">{rhs}</span>
      </p>
      <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        {hint}
      </span>
    </div>
  );
}

/* ───── Visualizations ────────────────────────────────────────────────── */

function VoltageVisual() {
  // Vertical "potential difference" — two horizontal lines at different y, with a + and - and a height bracket.
  return (
    <svg viewBox="0 0 280 110" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="v-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#1A2230" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill="url(#v-grid)" />
      {/* High potential line */}
      <line x1="40" y1="22" x2="240" y2="22" stroke="#FFB547" strokeWidth="1.2" />
      <text x="34" y="24" textAnchor="end" fill="#FFB547" fontFamily="JetBrains Mono, monospace" fontSize="10">+12V</text>
      {/* Low potential line */}
      <line x1="40" y1="86" x2="240" y2="86" stroke="#5A6A82" strokeWidth="1.2" />
      <text x="34" y="88" textAnchor="end" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">0V</text>
      {/* Bracket */}
      <line x1="200" y1="22" x2="200" y2="86" stroke="#3DF5D2" strokeWidth="1" />
      <line x1="196" y1="22" x2="204" y2="22" stroke="#3DF5D2" strokeWidth="1" />
      <line x1="196" y1="86" x2="204" y2="86" stroke="#3DF5D2" strokeWidth="1" />
      <text x="208" y="58" fill="#3DF5D2" fontFamily="JetBrains Mono, monospace" fontSize="11">ΔV</text>
      {/* Arrow showing push down */}
      <g>
        <line x1="100" y1="30" x2="100" y2="78" stroke="#FFB547" strokeWidth="1.4" markerEnd="url(#arrowdown)" />
      </g>
      <defs>
        <marker id="arrowdown" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
          <polygon points="0 0, 6 0, 3 6" fill="#FFB547" />
        </marker>
      </defs>
    </svg>
  );
}

function CurrentVisual() {
  // Horizontal pipe with flowing dots
  return (
    <svg viewBox="0 0 280 110" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="i-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#1A2230" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill="url(#i-grid)" />
      {/* Pipe */}
      <line x1="20" y1="55" x2="260" y2="55" stroke="#34465F" strokeWidth="2" />
      <line x1="20" y1="55" x2="260" y2="55" stroke="#3DF5D2" strokeOpacity="0.4" strokeWidth="6" filter="blur(2px)" />
      {/* Flowing dashes */}
      <line x1="20" y1="55" x2="260" y2="55" stroke="#3DF5D2" strokeWidth="1.6" strokeDasharray="3 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="0.8s" repeatCount="indefinite" />
      </line>
      {/* Boundary marker */}
      <line x1="160" y1="42" x2="160" y2="68" stroke="#FFB547" strokeWidth="1" strokeDasharray="2 2" />
      <text x="164" y="40" fill="#FFB547" fontFamily="JetBrains Mono, monospace" fontSize="10">Q/t</text>
      {/* Arrow */}
      <polygon points="246,55 240,51 240,59" fill="#3DF5D2" />
      <text x="20" y="84" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">charges per second →</text>
    </svg>
  );
}

function ResistanceVisual() {
  // Resistor zigzag with heat plumes
  return (
    <svg viewBox="0 0 280 110" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="r-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#1A2230" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill="url(#r-grid)" />
      {/* Wires */}
      <line x1="20" y1="60" x2="90" y2="60" stroke="#3DF5D2" strokeWidth="1.6" strokeDasharray="3 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />
      </line>
      <line x1="190" y1="60" x2="260" y2="60" stroke="#3DF5D2" strokeWidth="1.6" strokeDasharray="3 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.6s" repeatCount="indefinite" />
      </line>
      {/* Resistor symbol */}
      <polyline
        points="90,60 100,46 116,74 132,46 148,74 164,46 180,74 190,60"
        fill="none"
        stroke="#E6EDF7"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Heat plumes */}
      <g opacity="0.7">
        {[110, 138, 168].map((x, i) => (
          <g key={x}>
            <path
              d={`M ${x} 36 q -4 -8 0 -16 q 4 -8 0 -16`}
              fill="none"
              stroke="#FF9577"
              strokeWidth="1"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0;0.7;0"
                dur="2.2s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -12"
                dur="2.2s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </g>
      <text x="140" y="100" textAnchor="middle" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">→ heat dissipated</text>
    </svg>
  );
}

function SignalFlowVisual() {
  // Mini loop with arrow showing direction
  return (
    <svg viewBox="0 0 280 110" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="sf-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#1A2230" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="280" height="110" fill="url(#sf-grid)" />
      {/* Loop */}
      <rect x="50" y="20" width="180" height="70" rx="4" fill="none" stroke="#34465F" strokeWidth="1.6" />
      <rect x="50" y="20" width="180" height="70" rx="4" fill="none" stroke="#3DF5D2" strokeWidth="1.6" strokeDasharray="3 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
      </rect>
      {/* Source */}
      <line x1="50" y1="40" x2="50" y2="50" stroke="#FFB547" strokeWidth="3" />
      <line x1="50" y1="60" x2="50" y2="70" stroke="#9AA8BD" strokeWidth="3" />
      <text x="32" y="48" fill="#FFB547" fontFamily="JetBrains Mono, monospace" fontSize="10" textAnchor="end">+</text>
      <text x="32" y="68" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10" textAnchor="end">−</text>
      {/* Direction arrows */}
      <polygon points="138,16 144,22 132,22" fill="#3DF5D2" />
      <polygon points="232,52 226,46 226,58" fill="#3DF5D2" />
      <polygon points="142,94 136,88 148,88" fill="#3DF5D2" />
      <polygon points="48,58 54,52 54,64" fill="#3DF5D2" />
      {/* Load */}
      <polyline points="220,46 224,40 230,52 236,40 242,52 246,46" fill="none" stroke="#E6EDF7" strokeWidth="1.6" />
    </svg>
  );
}

function PowerVisual() {
  // Bar chart: V vs I and P=V·I area
  return (
    <svg viewBox="0 0 280 110" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="p-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#1A2230" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="p-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3DF5D2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3DF5D2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="280" height="110" fill="url(#p-grid)" />
      {/* Axes */}
      <line x1="36" y1="20" x2="36" y2="92" stroke="#34465F" />
      <line x1="36" y1="92" x2="260" y2="92" stroke="#34465F" />
      <text x="32" y="26" textAnchor="end" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="9">V</text>
      <text x="258" y="106" textAnchor="end" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="9">I</text>
      {/* Rectangle = power = V·I */}
      <rect x="36" y="40" width="160" height="52" fill="url(#p-area)" />
      <rect x="36" y="40" width="160" height="52" fill="none" stroke="#3DF5D2" strokeWidth="1" strokeDasharray="3 4" />
      <text x="116" y="68" textAnchor="middle" fill="#3DF5D2" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">
        P = V · I
      </text>
      {/* V/I dimension labels */}
      <line x1="32" y1="40" x2="40" y2="40" stroke="#FFB547" strokeWidth="1.4" />
      <text x="28" y="42" textAnchor="end" fill="#FFB547" fontFamily="JetBrains Mono, monospace" fontSize="9">V</text>
      <line x1="196" y1="88" x2="196" y2="96" stroke="#3DF5D2" strokeWidth="1.4" />
      <text x="200" y="106" fill="#3DF5D2" fontFamily="JetBrains Mono, monospace" fontSize="9">I</text>
    </svg>
  );
}
