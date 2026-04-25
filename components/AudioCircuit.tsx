"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { formatNumber } from "@/lib/circuit";

/**
 * AC source → coupling capacitor → series resistor → speaker.
 * The user controls amplitude, frequency, and a DC bias.
 * The oscilloscope renders the resulting voltage at the speaker terminals.
 */
export function AudioCircuit() {
  const [amplitude, setAmplitude] = useState(2.4); // V peak
  const [frequency, setFrequency] = useState(440); // Hz
  const [bias, setBias] = useState(0); // V DC offset
  const [gridDiv, setGridDiv] = useState(1); // 1× or 2× zoom (time/div)

  // Derived: speaker impedance assumed 8Ω, resistor 22Ω → series total 30Ω
  const RSpeaker = 8;
  const RSeries = 22;
  const Rtotal = RSpeaker + RSeries;
  const Ipeak = amplitude / Rtotal; // amps peak
  const Pavg = (amplitude * amplitude) / (2 * Rtotal); // average power for a sine across resistive load
  const Vrms = amplitude / Math.SQRT2;

  return (
    <section
      id="audio"
      className="relative border-t border-line-subtle bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">
              §03 · audio · speaker circuit
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
              Current you can hear.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-secondary">
              An AC source, a coupling capacitor, a series resistor, and a
              speaker. The oscilloscope plots the voltage across the speaker —
              the same signal that drives the cone, that pushes the air, that
              makes a tone.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-slow" />
            scope · ac · {frequency}Hz
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-4">
          {/* Schematic + scope stacked */}
          <div className="space-y-4">
            <SpeakerSchematic
              amplitude={amplitude}
              frequency={frequency}
              ipeak={Ipeak}
            />
            <Oscilloscope
              amplitude={amplitude}
              frequency={frequency}
              bias={bias}
              gridDiv={gridDiv}
            />
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <ScopeControls
              amplitude={amplitude}
              frequency={frequency}
              bias={bias}
              gridDiv={gridDiv}
              setAmplitude={setAmplitude}
              setFrequency={setFrequency}
              setBias={setBias}
              setGridDiv={setGridDiv}
            />
            <ScopeReadout
              amplitude={amplitude}
              frequency={frequency}
              vrms={Vrms}
              ipeak={Ipeak}
              pavg={Pavg}
              rTotal={Rtotal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Schematic (small horizontal AC) ───────────────────────────────── */

function SpeakerSchematic({
  amplitude,
  frequency,
  ipeak,
}: {
  amplitude: number;
  frequency: number;
  ipeak: number;
}) {
  const W = 800;
  const H = 220;
  const Y = 120;
  const gridId = useId();
  const flowDur = Math.max(0.25, Math.min(5, 1.0 / Math.max(ipeak, 0.001)));
  const flowing = ipeak > 0.001;

  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between border-b border-line-subtle bg-bg-elevated/60 px-4 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          schematic · ac coupled
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          {frequency} Hz · {formatNumber(amplitude, 2)} Vp
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <pattern id={`${gridId}-fine`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1A2230" strokeWidth="0.5" />
          </pattern>
          <pattern id={`${gridId}-coarse`} width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#243043" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="#05070A" />
        <rect width={W} height={H} fill={`url(#${gridId}-fine)`} />
        <rect width={W} height={H} fill={`url(#${gridId}-coarse)`} />

        {/* Wire path: AC source → cap → resistor → speaker → ground return */}
        <Wire
          d={`M 80 ${Y - 26} V ${Y - 50} H 720 V ${Y + 50} H 80 V ${Y + 26}`}
          flowing={flowing}
          dur={flowDur}
        />

        {/* AC source */}
        <ACSource x={80} y={Y} />
        {/* Capacitor on top wire */}
        <CapInline x={260} y={Y - 50} />
        {/* Resistor on top wire */}
        <ResistorInline x={460} y={Y - 50} />
        {/* Speaker on right side, vertical */}
        <SpeakerInline x={720} y={Y} />

        {/* Node markers */}
        <NodeDot cx={80} cy={Y - 50} label="N1" />
        <NodeDot cx={720} cy={Y - 50} label="N2" />
        <NodeDot cx={720} cy={Y + 50} label="N3" />
        <NodeDot cx={80} cy={Y + 50} label="GND" color="#5A6A82" />

        {/* Annotation */}
        <g transform={`translate(${W / 2 - 40},${Y - 80})`}>
          <text
            x="0"
            y="0"
            fill="#3DF5D2"
            fontFamily="JetBrains Mono, monospace"
            fontSize="11"
          >
            I_peak = {formatNumber(ipeak, 3)} A
          </text>
        </g>
      </svg>
    </div>
  );
}

function Wire({
  d,
  flowing,
  dur,
}: {
  d: string;
  flowing: boolean;
  dur: number;
}) {
  return (
    <>
      {flowing && (
        <path
          d={d}
          stroke="#3DF5D2"
          strokeOpacity="0.32"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "blur(3px)" }}
        />
      )}
      <path
        d={d}
        stroke="#34465F"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {flowing && (
        <path
          d={d}
          stroke="#3DF5D2"
          strokeWidth="1.6"
          strokeDasharray="3 12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: `flow ${dur}s linear infinite` }}
        />
      )}
    </>
  );
}

function ACSource({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="26" fill="#0A0E14" stroke="#9AA8BD" strokeWidth="1.4" />
      {/* Sine inside */}
      <path
        d="M -16 0 Q -8 -12 0 0 T 16 0"
        fill="none"
        stroke="#FFB547"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <text
        x="-44"
        y="-30"
        fill="#E6EDF7"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        AC1
      </text>
      <text
        x="-44"
        y="38"
        fill="#9AA8BD"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        sine
      </text>
    </g>
  );
}

function CapInline({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-32" y="-3" width="14" height="6" fill="#05070A" />
      <rect x="18" y="-3" width="14" height="6" fill="#05070A" />
      <line x1="-6" y1="-14" x2="-6" y2="14" stroke="#E6EDF7" strokeWidth="2.2" />
      <line x1="6" y1="-14" x2="6" y2="14" stroke="#E6EDF7" strokeWidth="2.2" />
      <text x="0" y="-22" textAnchor="middle" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11">C1</text>
      <text x="0" y="28" textAnchor="middle" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">10 µF</text>
    </g>
  );
}

function ResistorInline({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-44" y="-3" width="14" height="6" fill="#05070A" />
      <rect x="30" y="-3" width="14" height="6" fill="#05070A" />
      <polyline
        points="-30,0 -24,-8 -16,8 -8,-8 0,8 8,-8 16,8 24,-8 30,0"
        fill="none"
        stroke="#E6EDF7"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text x="0" y="-18" textAnchor="middle" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11">R1</text>
      <text x="0" y="24" textAnchor="middle" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">22 Ω</text>
    </g>
  );
}

function SpeakerInline({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-3" y="-32" width="6" height="14" fill="#05070A" />
      <rect x="-3" y="18" width="6" height="14" fill="#05070A" />
      {/* Speaker body */}
      <g transform="rotate(90)">
        <rect x="-22" y="-12" width="14" height="24" fill="none" stroke="#3DF5D2" strokeWidth="1.6" />
        <polygon points="-8,-14 14,-22 14,22 -8,14" fill="none" stroke="#3DF5D2" strokeWidth="1.6" strokeLinejoin="round" />
        <g stroke="#3DF5D2" fill="none" strokeWidth="1" opacity="0.7">
          <path d="M 22 -10 Q 30 0 22 10" />
          <path d="M 30 -16 Q 42 0 30 16" opacity="0.5" />
        </g>
      </g>
      <text x="38" y="-2" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11">SP1</text>
      <text x="38" y="14" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="10">8 Ω</text>
    </g>
  );
}

function NodeDot({
  cx,
  cy,
  label,
  color = "#3DF5D2",
}: {
  cx: number;
  cy: number;
  label?: string;
  color?: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="6" fill={color} fillOpacity="0.08" />
      <circle cx={cx} cy={cy} r="2.6" fill={color} fillOpacity="0.3" />
      <circle cx={cx} cy={cy} r="1.6" fill={color} />
      {label && (
        <text
          x={cx + 9}
          y={cy - 8}
          fill="#9AA8BD"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ───── Oscilloscope ──────────────────────────────────────────────────── */

function Oscilloscope({
  amplitude,
  frequency,
  bias,
  gridDiv,
}: {
  amplitude: number;
  frequency: number;
  bias: number;
  gridDiv: number;
}) {
  const W = 800;
  const H = 320;
  const PAD = 32;
  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;

  // viewport: time/div, 10 horizontal divisions
  const divs = 10;
  // total time window: more zoom = smaller window
  const baseWindowSec = 0.01; // 10 ms
  const windowSec = baseWindowSec / gridDiv;

  // Voltage window: ±5 V default; auto-scale a bit to keep waveform on screen
  const vMax = Math.max(5, Math.ceil(Math.abs(amplitude) + Math.abs(bias) + 0.5));

  const points = useMemo(() => {
    const N = 600;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * windowSec;
      const v = bias + amplitude * Math.sin(2 * Math.PI * frequency * t);
      const x = PAD + (i / N) * innerW;
      const y = PAD + innerH / 2 - (v / vMax) * (innerH / 2 - 4);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [amplitude, frequency, bias, windowSec, vMax, innerW, innerH]);

  const sweepRef = useRef<SVGGElement | null>(null);
  // Scanline animation across the scope
  useEffect(() => {
    const node = sweepRef.current;
    if (!node) return;
    let frame = 0;
    let raf = 0;
    const loop = () => {
      frame = (frame + 1) % 240;
      const t = frame / 240;
      node.setAttribute("transform", `translate(${PAD + t * innerW}, 0)`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [innerW]);

  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between border-b border-line-subtle bg-bg-elevated/60 px-4 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          oscilloscope · ch1 · v(spk)
        </p>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          <span>v/div · {(vMax / 5).toFixed(1)} V</span>
          <span>t/div · {((windowSec / divs) * 1000).toFixed(2)} ms</span>
          <span className="hidden sm:inline">trig · auto</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-bg-base">
        <defs>
          <linearGradient id="scope-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3DF5D2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3DF5D2" stopOpacity="0" />
          </linearGradient>
          <filter id="scope-bloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Vertical and horizontal grid */}
        {Array.from({ length: divs + 1 }).map((_, i) => {
          const x = PAD + (i / divs) * innerW;
          return (
            <line
              key={`v${i}`}
              x1={x}
              y1={PAD}
              x2={x}
              y2={H - PAD}
              stroke={i === divs / 2 ? "#34465F" : "#1A2230"}
              strokeWidth={i === divs / 2 ? 0.8 : 0.5}
            />
          );
        })}
        {Array.from({ length: 9 }).map((_, i) => {
          const y = PAD + (i / 8) * innerH;
          return (
            <line
              key={`h${i}`}
              x1={PAD}
              y1={y}
              x2={W - PAD}
              y2={y}
              stroke={i === 4 ? "#34465F" : "#1A2230"}
              strokeWidth={i === 4 ? 0.8 : 0.5}
            />
          );
        })}

        {/* Outer frame */}
        <rect
          x={PAD}
          y={PAD}
          width={innerW}
          height={innerH}
          fill="none"
          stroke="#243043"
          strokeWidth="1"
        />

        {/* Bloom underlay */}
        <polyline
          points={points}
          fill="none"
          stroke="#3DF5D2"
          strokeOpacity="0.55"
          strokeWidth="3"
          filter="url(#scope-bloom)"
        />
        {/* Crisp trace */}
        <polyline
          points={points}
          fill="none"
          stroke="#5BFFE3"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Sweep line */}
        <g ref={sweepRef}>
          <line
            x1="0"
            y1={PAD}
            x2="0"
            y2={H - PAD}
            stroke="#3DF5D2"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
        </g>

        {/* Axis labels */}
        <text
          x={PAD + 4}
          y={PAD + 12}
          fill="#5A6A82"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
        >
          +{vMax}V
        </text>
        <text
          x={PAD + 4}
          y={H - PAD - 4}
          fill="#5A6A82"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
        >
          −{vMax}V
        </text>
        <text
          x={PAD + 4}
          y={PAD + innerH / 2 - 4}
          fill="#5A6A82"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
        >
          0V
        </text>
        <text
          x={W - PAD - 4}
          y={H - PAD - 4}
          textAnchor="end"
          fill="#5A6A82"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
        >
          {(windowSec * 1000).toFixed(1)} ms
        </text>

        {/* Cursor lines marking peak */}
        <line
          x1={PAD}
          y1={PAD + innerH / 2 - (amplitude / vMax) * (innerH / 2 - 4)}
          x2={W - PAD}
          y2={PAD + innerH / 2 - (amplitude / vMax) * (innerH / 2 - 4)}
          stroke="#FFB547"
          strokeOpacity="0.5"
          strokeDasharray="3 6"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

/* ───── Controls ──────────────────────────────────────────────────────── */

function ScopeControls({
  amplitude,
  frequency,
  bias,
  gridDiv,
  setAmplitude,
  setFrequency,
  setBias,
  setGridDiv,
}: {
  amplitude: number;
  frequency: number;
  bias: number;
  gridDiv: number;
  setAmplitude: (v: number) => void;
  setFrequency: (v: number) => void;
  setBias: (v: number) => void;
  setGridDiv: (v: number) => void;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur">
      <div className="border-b border-line-subtle px-4 py-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          signal · controls
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          ac1
        </p>
      </div>
      <div className="p-4 space-y-4">
        <Knob
          label="Amplitude"
          unit="Vp"
          value={amplitude}
          min={0}
          max={6}
          step={0.05}
          color="volt"
          onChange={setAmplitude}
        />
        <Knob
          label="Frequency"
          unit="Hz"
          value={frequency}
          min={20}
          max={2000}
          step={1}
          color="signal"
          onChange={setFrequency}
        />
        <Knob
          label="DC bias"
          unit="V"
          value={bias}
          min={-3}
          max={3}
          step={0.1}
          color="ink"
          onChange={setBias}
        />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-2">
            Time / div
          </p>
          <div className="grid grid-cols-3 gap-1">
            {[0.5, 1, 2].map((g) => (
              <button
                key={g}
                onClick={() => setGridDiv(g)}
                className={`font-mono text-[11px] py-1.5 rounded-md border transition-colors ${
                  gridDiv === g
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-line-subtle bg-bg-base text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {g}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Knob({
  label,
  unit,
  value,
  min,
  max,
  step,
  color,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  color: "volt" | "signal" | "ink";
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const accent =
    color === "volt"
      ? "#FFB547"
      : color === "signal"
        ? "#3DF5D2"
        : "#9AA8BD";
  const accentText =
    color === "volt"
      ? "text-volt"
      : color === "signal"
        ? "text-signal"
        : "text-ink-primary";
  return (
    <label className="block cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </span>
        <span
          className={`font-mono tabular text-sm font-semibold ${accentText}`}
        >
          {formatNumber(value, value >= 100 ? 0 : 2)}
          <span className="text-ink-muted text-[11px] font-normal ml-1">
            {unit}
          </span>
        </span>
      </div>
      <div className="relative mt-2 h-5 select-none">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-line-subtle">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: accent,
              boxShadow: `0 0 10px ${accent}55`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-bg-base pointer-events-none"
          style={{
            left: `calc(${pct}% - 7px)`,
            background: accent,
            boxShadow: `0 0 0 1px ${accent}, 0 0 10px ${accent}66`,
          }}
        />
      </div>
    </label>
  );
}

/* ───── Readout ───────────────────────────────────────────────────────── */

function ScopeReadout({
  amplitude,
  frequency,
  vrms,
  ipeak,
  pavg,
  rTotal,
}: {
  amplitude: number;
  frequency: number;
  vrms: number;
  ipeak: number;
  pavg: number;
  rTotal: number;
}) {
  const period = 1 / Math.max(frequency, 0.0001);
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur">
      <div className="border-b border-line-subtle px-4 py-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          measure
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
          live
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line-subtle/60">
        <Cell label="Vp" value={`${formatNumber(amplitude, 2)} V`} accent="volt" />
        <Cell label="Vrms" value={`${formatNumber(vrms, 2)} V`} accent="volt" />
        <Cell label="freq" value={`${formatNumber(frequency, 0)} Hz`} accent="signal" />
        <Cell label="period" value={`${formatNumber(period * 1000, 2)} ms`} accent="ink" />
        <Cell label="Ipk" value={`${formatNumber(ipeak, 3)} A`} accent="signal" />
        <Cell label="Pavg" value={`${formatNumber(pavg, 3)} W`} accent="signal" />
      </div>
      <div className="border-t border-line-subtle p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
          chain
        </p>
        <p className="text-[12.5px] leading-relaxed text-ink-secondary">
          AC source → <span className="text-ink-primary">C1</span> couples the AC,
          blocks DC offset → <span className="text-ink-primary">R1</span> limits
          the current → <span className="text-signal">SP1</span> converts
          oscillating current into pressure waves at{" "}
          <span className="font-mono text-ink-primary tabular">
            {formatNumber(frequency, 0)} Hz
          </span>
          .
        </p>
        <p className="mt-2 font-mono text-[10.5px] tabular text-ink-muted">
          Z_total ≈ {rTotal} Ω · purely resistive approximation
        </p>
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "volt" | "signal" | "ink";
}) {
  const valueColor =
    accent === "volt"
      ? "text-volt"
      : accent === "signal"
        ? "text-signal"
        : "text-ink-primary";
  return (
    <div className="bg-bg-surface px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </p>
      <p className={`mt-0.5 font-mono tabular text-sm font-semibold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}
