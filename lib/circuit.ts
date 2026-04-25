// Pure helpers for the circuit lab — Ohm's law and friends.

export type LoadType = "resistor" | "capacitor" | "speaker";

export interface CircuitState {
  voltage: number; // volts
  resistance: number; // ohms (effective)
  load: LoadType;
}

export interface CircuitMetrics {
  voltage: number;
  current: number; // amps
  resistance: number;
  power: number; // watts
}

export function computeMetrics(state: CircuitState): CircuitMetrics {
  const safeR = Math.max(state.resistance, 0.001);
  const current = state.voltage / safeR;
  const power = state.voltage * current;
  return {
    voltage: state.voltage,
    current,
    resistance: state.resistance,
    power,
  };
}

export function formatNumber(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(0);
  if (abs >= 100) return n.toFixed(1);
  if (abs >= 10) return n.toFixed(digits === 0 ? 0 : Math.min(digits, 1));
  if (abs >= 1) return n.toFixed(digits);
  if (abs >= 0.01) return n.toFixed(3);
  if (abs === 0) return "0";
  return n.toExponential(2);
}

// Animation duration in seconds for the flowing-dash current visualization.
// More current → faster flow. Clamp so motion never disappears or goes manic.
export function flowDurationSeconds(currentAmps: number): number {
  if (currentAmps <= 0) return 9999;
  const base = 1.2 / Math.sqrt(currentAmps);
  return Math.min(Math.max(base, 0.25), 5);
}

export const LOAD_INFO: Record<
  LoadType,
  { label: string; symbol: string; description: string }
> = {
  resistor: {
    label: "Resistor",
    symbol: "R",
    description: "Dissipates power as heat. Linear V/I relationship.",
  },
  capacitor: {
    label: "Capacitor",
    symbol: "C",
    description: "Stores energy in an electric field. Blocks DC, passes AC.",
  },
  speaker: {
    label: "Speaker",
    symbol: "SPK",
    description: "Converts current variations into sound waves.",
  },
};
