"use client";

import { formatNumber } from "@/lib/circuit";

interface ControlPanelProps {
  voltage: number;
  resistance: number;
  setVoltage: (v: number) => void;
  setResistance: (r: number) => void;
  onReset: () => void;
}

export function ControlPanel({
  voltage,
  resistance,
  setVoltage,
  setResistance,
  onReset,
}: ControlPanelProps) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur">
      <div className="border-b border-line-subtle px-4 py-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          controls
        </p>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-secondary hover:text-ink-primary transition-colors"
        >
          ↺ reset
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-px bg-line-subtle/60">
        <Slider
          label="Source voltage"
          name="V1"
          value={voltage}
          unit="V"
          min={0}
          max={24}
          step={0.1}
          color="volt"
          onChange={setVoltage}
        />
        <Slider
          label="Series resistance"
          name="R1"
          value={resistance}
          unit="Ω"
          min={1}
          max={100}
          step={1}
          color="signal"
          onChange={setResistance}
        />
      </div>
      <div className="border-t border-line-subtle px-4 py-3">
        <p className="font-mono text-[10.5px] tabular text-ink-muted">
          <span className="text-ink-secondary">// </span>
          drag the sliders. the canvas, current arrow, and readouts update in
          real time.
        </p>
      </div>
    </div>
  );
}

function Slider({
  label,
  name,
  value,
  unit,
  min,
  max,
  step,
  color,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  color: "signal" | "volt";
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const accent =
    color === "signal" ? "rgba(61,245,210,0.95)" : "rgba(255,181,71,0.95)";
  const accentSoft =
    color === "signal" ? "rgba(61,245,210,0.18)" : "rgba(255,181,71,0.18)";
  return (
    <label className="block bg-bg-surface p-4 cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {name}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span
          className={`font-mono tabular text-2xl font-semibold tracking-tight ${
            color === "signal" ? "text-signal" : "text-volt"
          }`}
        >
          {formatNumber(value, 1)}
        </span>
        <span className="text-ink-muted">{unit}</span>
      </div>
      <div className="relative mt-3 h-6 select-none">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-line-subtle overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: accent, boxShadow: `0 0 12px ${accentSoft}` }}
          />
        </div>
        {/* Tick marks */}
        <div className="absolute inset-x-0 top-0 h-full flex justify-between pointer-events-none">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="block w-px h-2 self-center"
              style={{ background: "rgba(36,48,67,0.9)" }}
            />
          ))}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="ohmify-range absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-bg-base pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            background: accent,
            boxShadow: `0 0 0 1px ${accent}, 0 0 12px ${accentSoft}`,
          }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] tabular text-ink-muted">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </label>
  );
}
