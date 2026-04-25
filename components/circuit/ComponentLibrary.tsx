"use client";

import type { LoadType } from "@/lib/circuit";
import { PaletteIcon } from "./symbols";

interface ComponentLibraryProps {
  load: LoadType;
  onSelect: (load: LoadType) => void;
}

interface PaletteItem {
  kind: "battery" | "resistor" | "capacitor" | "speaker" | "wire";
  label: string;
  symbol: string;
  description: string;
  selectable: boolean; // can be set as the load
  loadKey?: LoadType;
}

const ITEMS: PaletteItem[] = [
  {
    kind: "battery",
    label: "Voltage source",
    symbol: "V",
    description: "DC supply — fixed potential difference",
    selectable: false,
  },
  {
    kind: "wire",
    label: "Wire",
    symbol: "—",
    description: "Ideal conductor — zero resistance",
    selectable: false,
  },
  {
    kind: "resistor",
    label: "Resistor",
    symbol: "R",
    description: "Linear ohmic load — V = IR",
    selectable: true,
    loadKey: "resistor",
  },
  {
    kind: "capacitor",
    label: "Capacitor",
    symbol: "C",
    description: "Stores charge — blocks DC steady state",
    selectable: true,
    loadKey: "capacitor",
  },
  {
    kind: "speaker",
    label: "Speaker",
    symbol: "SPK",
    description: "Coil + cone — current → sound",
    selectable: true,
    loadKey: "speaker",
  },
];

export function ComponentLibrary({ load, onSelect }: ComponentLibraryProps) {
  return (
    <div className="rounded-xl border border-line-subtle bg-bg-surface/60 backdrop-blur">
      <div className="border-b border-line-subtle px-4 py-2.5 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          component library
        </p>
        <p className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          tap to swap the load
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-line-subtle/60">
        {ITEMS.map((item) => {
          const active = item.selectable && item.loadKey === load;
          const interactive = item.selectable;
          return (
            <button
              key={item.kind}
              type="button"
              disabled={!interactive}
              onClick={() => item.loadKey && onSelect(item.loadKey)}
              className={`group relative flex flex-col text-left bg-bg-surface p-4 transition-colors ${
                interactive
                  ? active
                    ? "bg-bg-elevated ring-1 ring-inset ring-signal/40"
                    : "hover:bg-bg-elevated cursor-pointer"
                  : "opacity-90 cursor-default"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  {item.label}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-[0.18em] ${
                    active ? "text-signal" : "text-ink-muted"
                  }`}
                >
                  {item.symbol}
                </span>
              </div>
              <div className="mt-3 h-10 w-full">
                <PaletteIcon kind={item.kind} />
              </div>
              <p className="mt-3 text-[11.5px] leading-snug text-ink-secondary">
                {item.description}
              </p>
              {active && (
                <span className="absolute bottom-2 right-2 inline-flex h-1.5 w-1.5 rounded-full bg-signal animate-pulse-slow" />
              )}
              {interactive && !active && (
                <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  use
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
