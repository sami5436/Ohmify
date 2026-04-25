"use client";

import { useMemo, useState } from "react";

interface Term {
  term: string;
  symbol?: string;
  unit?: string;
  definition: string;
  csAnalogy: string;
  category: "Foundations" | "Components" | "Signals" | "Lab terms";
}

const TERMS: Term[] = [
  {
    term: "Voltage",
    symbol: "V",
    unit: "V",
    definition:
      "Electrical potential difference between two points. It is the push that moves charge through a circuit.",
    csAnalogy:
      "Like the priority level in a priority queue. Higher voltage means stronger pressure to move charge, just like higher priority forces a task to the front of the queue.",
    category: "Foundations",
  },
  {
    term: "Current",
    symbol: "I",
    unit: "A",
    definition:
      "Rate of electric charge flow past a point. Conventional current flows from positive to negative; electrons drift the opposite way.",
    csAnalogy:
      "Like requests per second hitting an API endpoint. More current means more charge passing a point every second, just like a busy server handles more requests per second.",
    category: "Foundations",
  },
  {
    term: "Resistance",
    symbol: "R",
    unit: "Ω",
    definition:
      "Opposition to current flow in a conductor. Higher resistance means less current for the same voltage.",
    csAnalogy:
      "Like a rate limiter or throttle on a function. It slows down how much can flow through. Doubling resistance halves the current, just like halving your rate limit halves your throughput.",
    category: "Foundations",
  },
  {
    term: "Power",
    symbol: "P",
    unit: "W",
    definition:
      "Rate of energy delivery or dissipation. P = V times I = I squared times R = V squared divided by R.",
    csAnalogy:
      "Like CPU utilization: how fast you are burning resources right now. High voltage and high current together mean a lot of energy consumed per second, just like a hot loop at 100% core usage.",
    category: "Foundations",
  },
  {
    term: "Ohm's law",
    definition:
      "V = I times R. The core relationship between voltage, current, and resistance for ohmic materials. Every value is deterministic given the other two.",
    csAnalogy:
      "Like a pure function with no side effects: I = V / R. Give it voltage and resistance, get current back every time, no randomness, no state.",
    category: "Foundations",
  },
  {
    term: "Kirchhoff's current law",
    definition:
      "The sum of currents entering a node equals the sum leaving. Charge is conserved.",
    csAnalogy:
      "Like a load balancer: every request that arrives must be routed somewhere. Nothing disappears at the junction.",
    category: "Foundations",
  },
  {
    term: "Kirchhoff's voltage law",
    definition:
      "The sum of voltage drops around any closed loop equals zero. Energy is conserved.",
    csAnalogy:
      "Like a round-trip network call where every gain and loss must balance. If you start and end at the same node, the net change is zero.",
    category: "Foundations",
  },
  {
    term: "Resistor",
    symbol: "R",
    definition:
      "A passive component with a linear V/I relationship. It dissipates electrical energy as heat.",
    csAnalogy:
      "Like a sleep() call in a loop. It does not store anything or make decisions; it just slows things down and burns time (or energy).",
    category: "Components",
  },
  {
    term: "Capacitor",
    symbol: "C",
    unit: "F",
    definition:
      "Stores energy in an electric field between two plates. Blocks DC at steady state and passes AC.",
    csAnalogy:
      "Like a cache or buffer. It stores charge temporarily and releases it when needed. It ignores static inputs (DC) but responds to changing ones (AC), similar to how a cache misses on cold data but hits on repeated access.",
    category: "Components",
  },
  {
    term: "Inductor",
    symbol: "L",
    unit: "H",
    definition:
      "Stores energy in a magnetic field around a coil. Resists changes in current.",
    csAnalogy:
      "Like inertia in a loop: a thread that is already running at full speed resists being throttled suddenly. It opposes rapid changes, not the current level itself.",
    category: "Components",
  },
  {
    term: "Voltage source",
    symbol: "V",
    definition:
      "Maintains a fixed potential difference across its terminals regardless of load, within its rated limits.",
    csAnalogy:
      "Like a constant in your program. No matter what calls it or how many times, it returns the same value.",
    category: "Components",
  },
  {
    term: "Speaker",
    definition:
      "A transducer that turns oscillating current in a coil into mechanical motion of a cone and so into pressure waves you can hear.",
    csAnalogy:
      "Like a DAC (digital-to-analog converter) plus an output device. It takes an electrical signal and converts it into something in the physical world.",
    category: "Components",
  },
  {
    term: "Wire",
    definition:
      "Idealized as a zero-resistance conductor that connects two nodes at the same potential.",
    csAnalogy:
      "Like an ideal network channel with zero latency, zero packet loss, and infinite bandwidth. In reality both wires and networks have some overhead, but you treat them as free for analysis.",
    category: "Components",
  },
  {
    term: "DC",
    definition:
      "Direct current: voltage and current have a fixed sign that does not change over time. Batteries and regulated power supplies produce DC.",
    csAnalogy:
      "Like a constant variable. int x = 5; It never changes unless something explicitly writes to it.",
    category: "Signals",
  },
  {
    term: "AC",
    definition:
      "Alternating current: voltage and current oscillate in time, usually as a sine wave. Mains power and audio signals are AC.",
    csAnalogy:
      "Like a periodic function. Math.sin(t * frequency). The value keeps cycling and never settles at a single level.",
    category: "Signals",
  },
  {
    term: "Frequency",
    symbol: "f",
    unit: "Hz",
    definition:
      "Number of complete cycles of a periodic signal per second. The inverse of period.",
    csAnalogy:
      "Like how many times per second a function gets called in a polling loop. 440 Hz means the cycle runs 440 times per second.",
    category: "Signals",
  },
  {
    term: "Amplitude",
    definition:
      "The magnitude of a signal, measured as peak (Vp), peak-to-peak (Vpp), or RMS.",
    csAnalogy:
      "Like the range of values a variable swings through. A high-amplitude signal swings far above and below zero, like a number that oscillates between -10 and +10.",
    category: "Signals",
  },
  {
    term: "RMS",
    definition:
      "Root-mean-square: the equivalent steady DC value that would deliver the same power. For a sine wave, Vrms = Vp divided by the square root of 2.",
    csAnalogy:
      "Like the L2 norm of a list of numbers. It collapses a fluctuating signal into one number that captures its energy, similar to how you use standard deviation to summarize a distribution.",
    category: "Signals",
  },
  {
    term: "Impedance",
    symbol: "Z",
    unit: "Ω",
    definition:
      "Generalized resistance for AC circuits. Combines resistance and reactance and is frequency-dependent.",
    csAnalogy:
      "Like a function whose runtime depends on the input frequency. Low-frequency calls might be cheap; high-frequency calls might be expensive. Impedance tells you the total opposition at a given frequency.",
    category: "Signals",
  },
  {
    term: "Node",
    definition:
      "A connection point in a schematic where two or more component leads meet. Every point on the same wire segment is the same node.",
    csAnalogy:
      "Like a variable in your program. It holds a specific voltage value (its potential) and anything connected to it shares that value.",
    category: "Lab terms",
  },
  {
    term: "Ground",
    definition:
      "The reference node, set to 0 V by convention. Every other voltage in the circuit is measured relative to ground.",
    csAnalogy:
      "Like index 0 or null in a relative system. It does not have an intrinsic value; everything else is defined in terms of distance from it.",
    category: "Lab terms",
  },
  {
    term: "Series",
    definition:
      "Components connected end-to-end so the same current flows through each one. Resistances add: R total = R1 + R2.",
    csAnalogy:
      "Like a sequential pipeline or a chain of middleware. Each stage processes the same data stream one after another. The slowest stage bottlenecks the whole chain.",
    category: "Lab terms",
  },
  {
    term: "Parallel",
    definition:
      "Components sharing the same two nodes. Voltages across them are equal; currents add up.",
    csAnalogy:
      "Like concurrent goroutines or threads sharing the same input and output channels. They all see the same voltage, and their individual currents sum at the junction.",
    category: "Lab terms",
  },
  {
    term: "Probe",
    definition:
      "An instrument lead used to measure voltage or current at a specific point in the circuit without (ideally) disturbing it.",
    csAnalogy:
      "Like a debugger breakpoint or a console.log. You observe the value at a point without changing the program's behavior.",
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
        t.csAnalogy.toLowerCase().includes(q) ||
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
              §01 · glossary
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
              The vocabulary, pinned down.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-secondary">
              Every term comes with a plain definition and a CS analogy so you
              can connect it to something you already know. No hardware
              background required.
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
              placeholder="Search terms..."
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
              No matches for &quot;{query}&quot;.
            </div>
          )}
          {filtered.map((t) => (
            <article
              key={t.term}
              className="bg-bg-surface p-5 hover:bg-bg-elevated transition-colors"
            >
              <header className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-ink-primary">
                  {t.term}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
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

              <div className="mt-3 rounded-md bg-bg-base/70 border border-line-subtle px-3 py-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal mb-1">
                  CS analogy
                </p>
                <p className="text-[12px] leading-relaxed text-ink-secondary">
                  {t.csAnalogy}
                </p>
              </div>

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
