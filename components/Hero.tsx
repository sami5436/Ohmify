"use client";

import { useEffect, useState } from "react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-engineering-grid" aria-hidden />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(61,245,210,0.10), transparent 60%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(255,181,71,0.06), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,10,0) 60%, rgba(5,7,10,0.95) 100%)",
        }}
        aria-hidden
      />

      {/* Floating signal lines (decorative) */}
      <SignalTraces />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 sm:pt-28 pb-24 sm:pb-32">
        {/* Status pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-bg-surface/70 backdrop-blur px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-secondary">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signal animate-ping opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            v0.1 · live circuit lab
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-bg-surface/40 backdrop-blur px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted">
            <DotsIcon /> built for tinkerers
          </span>
        </div>

        <h1 className="mt-7 max-w-4xl text-[40px] sm:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.02] text-ink-primary">
          Circuits, made{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-br from-signal via-signal-glow to-volt bg-clip-text text-transparent">
              legible.
            </span>
            <Underline />
          </span>
          <br className="hidden sm:block" />
          <span className="text-ink-secondary">Voltage you can see.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-secondary">
          Ohmify is an interactive lab for understanding how electricity moves.
          Drop in a resistor, raise the voltage, watch the current flow. Every
          law of the circuit, visualized in real time.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#lab"
            className="group relative inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2.5 text-[13px] font-semibold text-bg-base shadow-signal-md hover:bg-signal-glow transition-colors"
          >
            Open the lab
            <ArrowIcon />
            <span className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/10" aria-hidden />
          </a>
          <a
            href="#concepts"
            className="inline-flex items-center gap-2 rounded-md border border-line-muted bg-bg-surface/60 backdrop-blur px-4 py-2.5 text-[13px] font-medium text-ink-primary hover:border-line-strong hover:bg-bg-elevated transition-colors"
          >
            Read the concepts
          </a>
          <a
            href="#audio"
            className="hidden sm:inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-medium text-ink-secondary hover:text-ink-primary"
          >
            Audio circuit demo →
          </a>
        </div>

        {/* Stats / formula bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle/40">
          <StatCell label="Ohm's law" value="V = I · R" mono />
          <StatCell label="Power" value="P = V · I" mono />
          <StatCell label="Components" value="5+" />
          <StatCell label="Frame rate" value="60 fps" />
        </div>
      </div>
    </section>
  );
}

function StatCell({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-bg-base/80 backdrop-blur px-4 py-4 sm:px-5 sm:py-5">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
        {label}
      </p>
      <p
        className={`mt-1.5 text-lg sm:text-xl text-ink-primary ${
          mono ? "font-mono tabular" : "font-semibold"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SignalTraces() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1200 700"
      aria-hidden
    >
      <defs>
        <linearGradient id="trace-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#3DF5D2" stopOpacity="0" />
          <stop offset="40%" stopColor="#3DF5D2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3DF5D2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trace-fade-volt" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#FFB547" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFB547" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFB547" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Long horizontal trace with flowing dashes */}
      <g filter="url(#hero-glow)" opacity="0.85">
        <path
          d="M -50 540 L 1250 540"
          stroke="url(#trace-fade)"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <path
        d="M -50 540 L 1250 540"
        stroke="#3DF5D2"
        strokeWidth="0.8"
        strokeDasharray="2 8"
        className="animate-flow"
        opacity="0.7"
        fill="none"
      />

      {/* Mid trace with bend */}
      <g filter="url(#hero-glow)" opacity="0.8">
        <path
          d="M -20 130 L 380 130 L 420 170 L 1230 170"
          stroke="url(#trace-fade-volt)"
          strokeWidth="1"
          fill="none"
        />
      </g>
      <path
        d="M -20 130 L 380 130 L 420 170 L 1230 170"
        stroke="#FFB547"
        strokeWidth="0.6"
        strokeDasharray="1.5 9"
        className="animate-flow"
        opacity="0.55"
        fill="none"
      />

      {/* Diagonal sub trace */}
      <path
        d="M 940 0 L 940 220 L 1100 380"
        stroke="#3DF5D2"
        strokeOpacity="0.18"
        strokeWidth="1"
        fill="none"
      />

      {/* Node markers */}
      <NodeMarker x={380} y={130} color="#FFB547" />
      <NodeMarker x={1100} y={380} color="#3DF5D2" />
      <NodeMarker x={140} y={540} color="#3DF5D2" />
    </svg>
  );
}

function NodeMarker({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={color} fillOpacity="0.08" />
      <circle cx={x} cy={y} r="4" fill={color} fillOpacity="0.25" />
      <circle cx={x} cy={y} r="1.6" fill={color} />
    </g>
  );
}

function Underline() {
  return (
    <svg
      className="absolute -bottom-2 left-0 right-0 w-full h-2"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 5 Q 50 0, 100 4 T 200 3"
        stroke="#3DF5D2"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="2" cy="5" r="1" fill="currentColor" />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
      <circle cx="8" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}
