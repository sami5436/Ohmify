"use client";

import { useMemo, useState } from "react";

interface Term {
  term: string;
  symbol?: string;
  unit?: string;
  definition: string;
  category: "Foundations" | "Components" | "Signals" | "Lab terms";
}

const TERMS: Term[] = [
  {
    term: "Voltage",
    symbol: "V",
    unit: "V",
    definition:
      "Electrical potential difference between two points. The push that moves charge through a circuit.",
    category: "Foundations",
  },
  {
    term: "Current",
    symbol: "I",
    unit: "A",
    definition:
      "Rate of electric charge flow past a point. Conventional current flows from + to −; electrons drift the opposite way.",
    category: "Foundations",
  },
  {
    term: "Resistance",
    symbol: "R",
    unit: "Ω",
    definition:
      "Opposition to current flow in a conductor. Higher R means less current for the same voltage.",
    category: "Foundations",
  },
  {
    term: "Power",
    symbol: "P",
    unit: "W",
    definition:
      "Rate of energy delivery or dissipation. P = V·I = I²·R = V²/R.",
    category: "Foundations",
  },
  {
    term: "Ohm's law",
    definition:
      "V = I · R. The bedrock relationship between voltage, current, and resistance for ohmic materials.",
    category: "Foundations",
  },
  {
    term: "Kirchhoff's current law",
    definition:
      "Sum of currents entering a node equals sum leaving. Charge is conserved.",
    category: "Foundations",
  },
  {
    term: "Kirchhoff's voltage law",
    definition:
      "Sum of voltage drops around any closed loop equals zero. Energy is conserved.",
    category: "Foundations",
  },
  {
    term: "Resistor",
    symbol: "R",
    definition:
      "A passive component with linear V/I behavior. Dissipates electrical energy as heat.",
    category: "Components",
  },
  {
    term: "Capacitor",
    symbol: "C",
    unit: "F",
    definition:
      "Stores energy in an electric field between two plates. Blocks DC at steady state, passes AC.",
    category: "Components",
  },
  {
    term: "Inductor",
    symbol: "L",
    unit: "H",
    definition:
      "Stores energy in a magnetic field around a coil. Resists changes in current.",
    category: "Components",
  },
  {
    term: "Voltage source",
    symbol: "V",
    definition:
      "Maintains a fixed potential difference across its terminals regardless of load (within limits).",
    category: "Components",
  },
  {
    term: "Speaker",
    definition:
      "A transducer that turns oscillating current in a coil into mechanical motion of a cone — and so into pressure waves.",
    category: "Components",
  },
  {
    term: "Wire",
    definition:
      "Idealized as a zero-resistance conductor that connects two nodes at the same potential.",
    category: "Components",
  },
  {
    term: "DC",
    definition:
      "Direct current — voltage and current have a fixed sign. Batteries, regulated supplies.",
    category: "Signals",
  },
  {
    term: "AC",
    definition:
      "Alternating current — voltage and current oscillate in time. Mains power, audio signals.",
    category: "Signals",
  },
  {
    term: "Frequency",
    symbol: "f",
    unit: "Hz",
    definition:
      "Number of complete cycles of a periodic signal per second. Inverse of period.",
    category: "Signals",
  },
  {
    term: "Amplitude",
    definition:
      "Magnitude of a signal — usually peak (Vp), peak-to-peak (Vpp), or RMS.",
    category: "Signals",
  },
  {
    term: "RMS",
    definition:
      "Root-mean-square — the equivalent steady DC value that would deliver the same power. For a sine, Vrms = Vp / √2.",
    category: "Signals",
  },
  {
    term: "Impedance",
    symbol: "Z",
    unit: "Ω",
    definition:
      "Generalized resistance for AC circuits — combines resistance and reactance, frequency-dependent.",
    category: "Signals",
  },
  {
    term: "Node",
    definition:
      "A connection point in a schematic where two or more component leads meet. Every point on a wire is the same node.",
    category: "Lab terms",
  },
  {
    term: "Ground",
    definition:
      "The reference node — by convention, 0 V. Every voltage in a circuit is measured relative to ground.",
    category: "Lab terms",
  },
  {
    term: "Series",
    definition:
      "Components connected end-to-end so the same current flows through each. Resistances add: R_total = R1 + R2.",
    category: "Lab terms",
  },
  {
    term: "Parallel",
    definition:
      "Components sharing the same two nodes. Voltages are equal; currents add.",
    category: "Lab terms",
  },
  {
    term: "Probe",
    definition:
      "An instrument lead used to measure voltage or current at a specific point in the circuit.",
    category: "Lab terms",
  },
];

const CATEGORIES: Term["category"][] = [
  "Foundations",
  "Components",
  "Signals",
  "Lab terms",
];

export function Glossary() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Term["category"] | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TERMS.filter((t) => {
      if (active !== "All" && t.category !== active) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        (t.symbol?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, active]);

  return (
    <section
      id="glossary"
      className="relative border-t border-line-subtle bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">
              §04 · glossary
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
              The vocabulary, pinned down.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-secondary">
              Twenty-four terms that come up across the lab — short
              definitions, units where they apply, and the symbols you'll see
              on the canvas.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {filtered.length} / {TERMS.length} terms
          </div>
        </div>

        {/* Search + categories */}
        <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur p-3 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-muted">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms…"
              className="w-full pl-9 pr-3 py-2 bg-bg-base border border-line-subtle rounded-md text-[13px] text-ink-primary placeholder:text-ink-muted font-mono focus:outline-none focus:border-signal/50 focus:ring-1 focus:ring-signal/30 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c as Term["category"] | "All")}
                className={`font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-md border transition-colors ${
                  active === c
                    ? "border-signal/40 bg-signal/10 text-signal"
                    : "border-line-subtle bg-bg-base text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary grid */}
        <div className="grid gap-px bg-line-subtle/60 rounded-xl overflow-hidden border border-line-subtle md:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && (
            <div className="bg-bg-surface px-6 py-12 text-center text-ink-secondary font-mono text-sm col-span-full">
              No matches for "{query}".
            </div>
          )}
          {filtered.map((t) => (
            <article
              key={t.term}
              className="bg-bg-surface p-5 hover:bg-bg-elevated transition-colors group"
            >
              <header className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink-primary">
                  {t.term}
                </h3>
                <div className="flex items-center gap-1.5">
                  {t.symbol && (
                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-sm border border-line-muted bg-bg-base font-mono text-[10px] text-ink-secondary">
                      {t.symbol}
                    </span>
                  )}
                  {t.unit && (
                    <span className="font-mono text-[10px] text-signal">
                      {t.unit}
                    </span>
                  )}
                </div>
              </header>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-secondary">
                {t.definition}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                {t.category}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
