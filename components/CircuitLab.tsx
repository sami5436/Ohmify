"use client";

import { useMemo, useState } from "react";
import { CircuitCanvas } from "@/components/circuit/CircuitCanvas";
import { ReadoutPanel } from "@/components/circuit/ReadoutPanel";
import { ComponentLibrary } from "@/components/circuit/ComponentLibrary";
import { ControlPanel } from "@/components/circuit/ControlPanel";
import { computeMetrics, type LoadType } from "@/lib/circuit";

const DEFAULTS = {
  voltage: 12,
  resistance: 10,
  load: "resistor" as LoadType,
};

export function CircuitLab() {
  const [voltage, setVoltage] = useState(DEFAULTS.voltage);
  const [resistance, setResistance] = useState(DEFAULTS.resistance);
  const [load, setLoad] = useState<LoadType>(DEFAULTS.load);

  const metrics = useMemo(
    () => computeMetrics({ voltage, resistance, load }),
    [voltage, resistance, load],
  );

  const reset = () => {
    setVoltage(DEFAULTS.voltage);
    setResistance(DEFAULTS.resistance);
    setLoad(DEFAULTS.load);
  };

  return (
    <section
      id="lab"
      className="relative border-t border-line-subtle bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal mb-2">
              §01 · interactive lab
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary">
              Build a circuit. Watch it breathe.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-secondary">
              A live series loop — adjust the source and resistance, swap the
              load, and the canvas, current arrow, and readouts respond in real
              time. Every number is computed from Ohm's law, no smoke.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-slow" />
            simulator · v0.1
          </div>
        </div>

        {/* Component library row */}
        <ComponentLibrary load={load} onSelect={setLoad} />

        {/* Canvas + Readout */}
        <div className="mt-4 grid lg:grid-cols-[1fr_360px] gap-4">
          <CircuitCanvas
            voltage={voltage}
            resistance={resistance}
            current={metrics.current}
            load={load}
          />
          <ReadoutPanel metrics={metrics} load={load} />
        </div>

        {/* Controls */}
        <div className="mt-4">
          <ControlPanel
            voltage={voltage}
            resistance={resistance}
            setVoltage={setVoltage}
            setResistance={setResistance}
            onReset={reset}
          />
        </div>
      </div>
    </section>
  );
}
