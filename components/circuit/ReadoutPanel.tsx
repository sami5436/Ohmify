"use client";

import type { CircuitMetrics, LoadType } from "@/lib/circuit";
import { formatNumber, LOAD_INFO } from "@/lib/circuit";

interface ReadoutPanelProps {
  metrics: CircuitMetrics;
  load: LoadType;
}

export function ReadoutPanel({ metrics, load }: ReadoutPanelProps) {
  const { voltage, current, resistance, power } = metrics;
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur p-1">
      <div className="border-b border-line-subtle px-4 py-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          live readout
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
          ◉ rec
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line-subtle/60">
        <Readout
          label="Voltage"
          symbol="V"
          unit="V"
          value={formatNumber(voltage, 1)}
          color="volt"
          formula="ε_source"
          description="The push driving electrons through the loop. Set by the source; every other quantity bends to it."
        />
        <Readout
          label="Current"
          symbol="I"
          unit="A"
          value={formatNumber(current, 2)}
          color="signal"
          formula="I = V / R"
          description="The rate of charge flow. Same value at every point in a series loop. What goes around comes around."
        />
        <Readout
          label="Resistance"
          symbol="R"
          unit="Ω"
          value={formatNumber(resistance, 1)}
          color="ink"
          formula="opposes I"
          description="How much the path resists charge flow. Doubling R halves the current: Ohm's law in one move."
        />
        <Readout
          label="Power"
          symbol="P"
          unit="W"
          value={formatNumber(power, 2)}
          color="signal"
          formula="P = V · I"
          description="Energy per second the load dissipates. In a resistor that's heat; in a speaker it's sound."
        />
      </div>

      {/* Signal flow strip */}
      <div className="border-t border-line-subtle p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">
          signal flow
        </p>
        <div className="flex items-center gap-1.5 text-[11px] font-mono">
          <FlowChip color="volt" label="V+" />
          <FlowConnector />
          <FlowChip color="ink" label="R1" />
          <FlowConnector />
          <FlowChip color="ink" label={LOAD_INFO[load].symbol} />
          <FlowConnector />
          <FlowChip color="ink" label="GND" />
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-ink-secondary">
          Conventional current travels{" "}
          <span className="text-volt">+ → −</span>; electrons drift the other
          way. Every component in the loop sees the{" "}
          <span className="text-signal">same current</span>.
        </p>
      </div>

      {/* Active load explainer */}
      <div className="border-t border-line-subtle p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            active load
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
            {LOAD_INFO[load].symbol}
          </p>
        </div>
        <p className="text-[12.5px] leading-relaxed text-ink-secondary">
          <span className="text-ink-primary font-medium">{LOAD_INFO[load].label}.</span>{" "}
          {LOAD_INFO[load].description}
        </p>
      </div>
    </div>
  );
}

function Readout({
  label,
  symbol,
  unit,
  value,
  color,
  formula,
  description,
}: {
  label: string;
  symbol: string;
  unit: string;
  value: string;
  color: "volt" | "signal" | "ink";
  formula: string;
  description: string;
}) {
  const ringColor =
    color === "volt"
      ? "rgba(255,181,71,0.4)"
      : color === "signal"
        ? "rgba(61,245,210,0.4)"
        : "rgba(154,168,189,0.3)";
  const valueColor =
    color === "volt" ? "text-volt" : color === "signal" ? "text-signal" : "text-ink-primary";

  return (
    <div className="bg-bg-surface p-4 group hover:bg-bg-elevated transition-colors">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </p>
        <span
          className="inline-flex items-center justify-center h-5 w-5 rounded-sm border font-mono text-[10px] text-ink-secondary"
          style={{ borderColor: ringColor }}
        >
          {symbol}
        </span>
      </div>
      <p className={`mt-1.5 font-mono tabular text-2xl font-semibold tracking-tight ${valueColor}`}>
        {value}
        <span className="text-ink-muted text-base font-normal ml-1">{unit}</span>
      </p>
      <p className="mt-1 font-mono text-[10px] text-ink-muted">{formula}</p>
      <p className="mt-2 text-[11.5px] leading-relaxed text-ink-secondary">
        {description}
      </p>
    </div>
  );
}

function FlowChip({ color, label }: { color: "volt" | "signal" | "ink"; label: string }) {
  const klass =
    color === "volt"
      ? "border-volt/30 text-volt"
      : color === "signal"
        ? "border-signal/30 text-signal"
        : "border-line-muted text-ink-secondary";
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md border bg-bg-base ${klass}`}>
      {label}
    </span>
  );
}

function FlowConnector() {
  return (
    <span className="flex-1 relative h-px overflow-hidden">
      <span className="absolute inset-0 bg-line-muted" />
      <span className="absolute inset-y-0 w-4 bg-signal/70 animate-scan" />
    </span>
  );
}
