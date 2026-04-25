// Schematic-symbol primitives, all SVG fragments rendered inside a parent <svg>.
// Each component is positioned with `x, y` of its center.

import type { ReactNode } from "react";

interface SymbolProps {
  x: number;
  y: number;
  label?: string;
  value?: string;
  highlight?: boolean;
}

const STROKE = "#9AA8BD";
const STROKE_HOT = "#E6EDF7";
const ACCENT = "#3DF5D2";

export function BatterySymbol({ x, y, label = "V1", value }: SymbolProps) {
  // Vertical battery (positive on top). Connector terminals at y-30 and y+30.
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Top terminal lead (positive) */}
      <line x1="0" y1="-30" x2="0" y2="-10" stroke={STROKE} strokeWidth="1.4" />
      {/* Long plate (+) */}
      <line x1="-14" y1="-10" x2="14" y2="-10" stroke={STROKE_HOT} strokeWidth="2" />
      {/* Short plate (-) */}
      <line x1="-7" y1="-2" x2="7" y2="-2" stroke={STROKE_HOT} strokeWidth="2" />
      {/* Long plate (+) */}
      <line x1="-14" y1="6" x2="14" y2="6" stroke={STROKE_HOT} strokeWidth="2" />
      {/* Short plate (-) */}
      <line x1="-7" y1="14" x2="7" y2="14" stroke={STROKE_HOT} strokeWidth="2" />
      {/* Bottom terminal lead */}
      <line x1="0" y1="14" x2="0" y2="30" stroke={STROKE} strokeWidth="1.4" />

      {/* Polarity glyphs */}
      <text x="22" y="-7" fill="#FFB547" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600">+</text>
      <text x="22" y="20" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="12">−</text>

      {/* Label */}
      <text x="-30" y="-2" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="end">{label}</text>
      {value && (
        <text x="-30" y="13" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="end">{value}</text>
      )}
    </g>
  );
}

export function ResistorSymbol({ x, y, label = "R1", value, highlight }: SymbolProps) {
  // Horizontal zigzag resistor. Leads exit at x-50 and x+50.
  const stroke = highlight ? ACCENT : STROKE_HOT;
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="-50" y1="0" x2="-30" y2="0" stroke={STROKE} strokeWidth="1.4" />
      <polyline
        points="-30,0 -24,-8 -16,8 -8,-8 0,8 8,-8 16,8 24,-8 30,0"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="30" y1="0" x2="50" y2="0" stroke={STROKE} strokeWidth="1.4" />
      <text x="0" y="-18" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{label}</text>
      {value && (
        <text x="0" y="24" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{value}</text>
      )}
    </g>
  );
}

export function CapacitorSymbol({ x, y, label = "C1", value, highlight }: SymbolProps) {
  const stroke = highlight ? ACCENT : STROKE_HOT;
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="-50" y1="0" x2="-6" y2="0" stroke={STROKE} strokeWidth="1.4" />
      <line x1="-6" y1="-14" x2="-6" y2="14" stroke={stroke} strokeWidth="2.2" />
      <line x1="6" y1="-14" x2="6" y2="14" stroke={stroke} strokeWidth="2.2" />
      <line x1="6" y1="0" x2="50" y2="0" stroke={STROKE} strokeWidth="1.4" />
      <text x="0" y="-22" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{label}</text>
      {value && (
        <text x="0" y="28" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{value}</text>
      )}
    </g>
  );
}

export function SpeakerSymbol({ x, y, label = "SP1", value, highlight }: SymbolProps) {
  // Horizontal speaker — small rectangle + triangular cone facing right.
  const stroke = highlight ? ACCENT : STROKE_HOT;
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="-50" y1="0" x2="-22" y2="0" stroke={STROKE} strokeWidth="1.4" />
      <rect x="-22" y="-12" width="14" height="24" fill="none" stroke={stroke} strokeWidth="1.6" />
      <polygon points="-8,-14 14,-22 14,22 -8,14" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="14" y1="0" x2="50" y2="0" stroke={STROKE} strokeWidth="1.4" />
      {/* Sound waves */}
      {highlight && (
        <g stroke={ACCENT} fill="none" strokeWidth="1" opacity="0.7">
          <path d="M 22 -10 Q 30 0 22 10" />
          <path d="M 30 -16 Q 42 0 30 16" opacity="0.5" />
        </g>
      )}
      <text x="0" y="-28" fill="#E6EDF7" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{label}</text>
      {value && (
        <text x="0" y="36" fill="#9AA8BD" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">{value}</text>
      )}
    </g>
  );
}

export function WireSymbol() {
  return (
    <svg viewBox="0 0 80 24" className="w-full h-full">
      <line x1="6" y1="12" x2="74" y2="12" stroke="#3DF5D2" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="12" x2="74" y2="12" stroke="#5BFFE3" strokeWidth="0.9" strokeDasharray="2 6">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
      </line>
      <circle cx="6" cy="12" r="2.4" fill="#3DF5D2" />
      <circle cx="74" cy="12" r="2.4" fill="#3DF5D2" />
    </svg>
  );
}

export function NodeDot({
  cx,
  cy,
  label,
  color = ACCENT,
}: {
  cx: number;
  cy: number;
  label?: string;
  color?: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="8" fill={color} fillOpacity="0.08" />
      <circle cx={cx} cy={cy} r="3.4" fill={color} fillOpacity="0.25" />
      <circle cx={cx} cy={cy} r="2" fill={color} />
      {label && (
        <text
          x={cx + 10}
          y={cy - 8}
          fill="#9AA8BD"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fontWeight="500"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function PaletteIcon({ kind }: { kind: "resistor" | "capacitor" | "speaker" | "battery" | "wire" }) {
  const w = 80;
  const h = 36;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {kind === "resistor" && (
        <>
          <line x1="4" y1="18" x2="20" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
          <polyline points="20,18 26,10 34,26 42,10 50,26 58,10 60,18" fill="none" stroke="#E6EDF7" strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="60" y1="18" x2="76" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
        </>
      )}
      {kind === "capacitor" && (
        <>
          <line x1="4" y1="18" x2="34" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
          <line x1="34" y1="6" x2="34" y2="30" stroke="#E6EDF7" strokeWidth="2" />
          <line x1="46" y1="6" x2="46" y2="30" stroke="#E6EDF7" strokeWidth="2" />
          <line x1="46" y1="18" x2="76" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
        </>
      )}
      {kind === "speaker" && (
        <>
          <line x1="4" y1="18" x2="22" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
          <rect x="22" y="9" width="10" height="18" fill="none" stroke="#E6EDF7" strokeWidth="1.5" />
          <polygon points="32,7 50,2 50,34 32,29" fill="none" stroke="#E6EDF7" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="50" y1="18" x2="76" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
        </>
      )}
      {kind === "battery" && (
        <>
          <line x1="4" y1="18" x2="32" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
          <line x1="32" y1="8" x2="32" y2="28" stroke="#FFB547" strokeWidth="2" />
          <line x1="38" y1="12" x2="38" y2="24" stroke="#E6EDF7" strokeWidth="2" />
          <line x1="44" y1="8" x2="44" y2="28" stroke="#FFB547" strokeWidth="2" />
          <line x1="50" y1="12" x2="50" y2="24" stroke="#E6EDF7" strokeWidth="2" />
          <line x1="50" y1="18" x2="76" y2="18" stroke="#9AA8BD" strokeWidth="1.4" />
        </>
      )}
      {kind === "wire" && (
        <>
          <line x1="4" y1="18" x2="76" y2="18" stroke="#3DF5D2" strokeWidth="2" />
          <circle cx="4" cy="18" r="2.5" fill="#3DF5D2" />
          <circle cx="76" cy="18" r="2.5" fill="#3DF5D2" />
        </>
      )}
    </svg>
  );
}
