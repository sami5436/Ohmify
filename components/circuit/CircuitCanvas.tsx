"use client";

import { useId } from "react";
import {
  BatterySymbol,
  ResistorSymbol,
  CapacitorSymbol,
  SpeakerSymbol,
  NodeDot,
} from "./symbols";
import { flowDurationSeconds, formatNumber, type LoadType } from "@/lib/circuit";

interface CircuitCanvasProps {
  voltage: number;
  resistance: number;
  current: number; // amps
  load: LoadType;
}

/**
 * Series loop, rectangular layout in an 800×480 viewBox.
 *
 *   (V+) ──── R1 ──────── (N1)
 *    │                      │
 *    │                     LOAD
 *    │                      │
 *   (V−) ─────────────── (N2)
 */
const W = 800;
const H = 480;

// Wire path coordinates
const PAD = 80;
const TOP_Y = 120;
const BOT_Y = 360;
const LEFT_X = 140;
const RIGHT_X = 660;

const RESISTOR_X = (LEFT_X + RIGHT_X) / 2;

export function CircuitCanvas({ voltage, resistance, current, load }: CircuitCanvasProps) {
  const gridId = useId();
  const glowId = useId();

  // Wire is one continuous path, drawn clockwise from V+ around the loop back to V−.
  // Each "wire segment" is split so the resistor + load symbols render breaks cleanly.
  const segments = [
    // V+ corner up to top-left
    `M ${LEFT_X} ${TOP_Y + 30} V ${TOP_Y}`,
    // Top-left to resistor left lead
    `M ${LEFT_X} ${TOP_Y} H ${RESISTOR_X - 50}`,
    // Resistor right lead to top-right corner
    `M ${RESISTOR_X + 50} ${TOP_Y} H ${RIGHT_X}`,
    // Right side: top corner down to load top lead
    `M ${RIGHT_X} ${TOP_Y} V ${(TOP_Y + BOT_Y) / 2 - 50}`,
    // Right side: load bottom lead down to bottom-right corner
    `M ${RIGHT_X} ${(TOP_Y + BOT_Y) / 2 + 50} V ${BOT_Y}`,
    // Bottom: right corner back to V−
    `M ${RIGHT_X} ${BOT_Y} H ${LEFT_X}`,
    // V− corner up to terminal
    `M ${LEFT_X} ${BOT_Y} V ${TOP_Y + 30 + 30 + 14 + 14}`,
  ];
  const fullWirePath = segments.join(" ");
  const flowDuration = flowDurationSeconds(current);
  const flowing = current > 0.001;

  // Voltage source center
  const VS_X = LEFT_X;
  const VS_Y = TOP_Y + 30 + 28; // halfway between top y and the battery body

  // Load center on right side
  const LOAD_X = RIGHT_X;
  const LOAD_Y = (TOP_Y + BOT_Y) / 2;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line-subtle bg-bg-surface/60">
      {/* Top metadata strip */}
      <div className="flex items-center justify-between border-b border-line-subtle bg-bg-elevated/60 px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-slow" />
          live · series loop
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          <span>scope · DC</span>
          <span className="hidden sm:inline">800×480</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative aspect-[800/480] w-full bg-bg-base">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          aria-label="Interactive circuit schematic"
        >
          <defs>
            {/* Engineering grid pattern — fine + coarse */}
            <pattern id={`${gridId}-fine`} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1A2230" strokeWidth="0.5" />
            </pattern>
            <pattern id={`${gridId}-coarse`} width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#243043" strokeWidth="0.7" />
            </pattern>

            {/* Wire glow filter */}
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Soft glow for the flowing path */}
            <filter id={`${glowId}-soft`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width={W} height={H} fill={`url(#${gridId}-fine)`} />
          <rect width={W} height={H} fill={`url(#${gridId}-coarse)`} />

          {/* Crosshair axis ticks at corners */}
          <Crosshair x={PAD} y={PAD} />
          <Crosshair x={W - PAD} y={PAD} />
          <Crosshair x={PAD} y={H - PAD} />
          <Crosshair x={W - PAD} y={H - PAD} />

          {/* --- Wires --- */}
          {/* Soft glow underlay (visible only when current flows) */}
          {flowing && (
            <path
              d={fullWirePath}
              stroke="#3DF5D2"
              strokeOpacity="0.35"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${glowId}-soft)`}
            />
          )}
          {/* Base wire */}
          <path
            d={fullWirePath}
            stroke="#34465F"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated flowing dashes (current direction) */}
          {flowing && (
            <path
              d={fullWirePath}
              stroke="#3DF5D2"
              strokeOpacity="0.95"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="3 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: `flow ${flowDuration}s linear infinite` }}
            />
          )}

          {/* --- Components --- */}
          <BatterySymbol x={VS_X} y={VS_Y} label="V1" value={`${formatNumber(voltage, 1)} V`} />
          <ResistorSymbol
            x={RESISTOR_X}
            y={TOP_Y}
            label="R1"
            value={`${formatNumber(resistance, 1)} Ω`}
            highlight
          />

          {load === "resistor" && (
            <g transform={`translate(${LOAD_X}, ${LOAD_Y}) rotate(90)`}>
              <ResistorSymbol x={0} y={0} label="R2" value="LOAD" highlight />
            </g>
          )}
          {load === "capacitor" && (
            <g transform={`translate(${LOAD_X}, ${LOAD_Y}) rotate(90)`}>
              <CapacitorSymbol x={0} y={0} label="C1" value="LOAD" highlight />
            </g>
          )}
          {load === "speaker" && (
            <g transform={`translate(${LOAD_X}, ${LOAD_Y}) rotate(90)`}>
              <SpeakerSymbol x={0} y={0} label="SP1" value="LOAD" highlight />
            </g>
          )}

          {/* --- Node markers --- */}
          <NodeDot cx={LEFT_X} cy={TOP_Y} label="N1" color="#FFB547" />
          <NodeDot cx={RIGHT_X} cy={TOP_Y} label="N2" />
          <NodeDot cx={RIGHT_X} cy={BOT_Y} label="N3" />
          <NodeDot cx={LEFT_X} cy={BOT_Y} label="GND" color="#5A6A82" />

          {/* Direction arrow on top wire */}
          {flowing && (
            <DirectionArrow
              x={(LEFT_X + RESISTOR_X - 50) / 2}
              y={TOP_Y - 14}
            />
          )}

          {/* Annotation: current readout floating near top wire */}
          <g transform={`translate(${RESISTOR_X + 100},${TOP_Y - 36})`}>
            <rect
              x="-2"
              y="-14"
              rx="3"
              width={Math.max(86, 8 * `${formatNumber(current, 2)} A`.length)}
              height="22"
              fill="#0A0E14"
              stroke="#243043"
            />
            <text
              x="6"
              y="2"
              fill="#3DF5D2"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
            >
              I = {formatNumber(current, 2)} A
            </text>
          </g>

          {/* Annotation: voltage near battery */}
          <g transform={`translate(${VS_X - 70},${VS_Y - 16})`}>
            <rect
              x="-2"
              y="-14"
              rx="3"
              width="74"
              height="22"
              fill="#0A0E14"
              stroke="#243043"
            />
            <text
              x="6"
              y="2"
              fill="#FFB547"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
            >
              V = {formatNumber(voltage, 1)} V
            </text>
          </g>
        </svg>

        {/* Bottom-left coordinate readout */}
        <div className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          x: {RESISTOR_X.toString().padStart(3, "0")} · y: {TOP_Y.toString().padStart(3, "0")}
        </div>
        {/* Bottom-right legend */}
        <div className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            voltage
          </span>
        </div>
      </div>
    </div>
  );
}

function Crosshair({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#34465F" strokeWidth="1">
      <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
      <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
    </g>
  );
}

function DirectionArrow({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <polygon
        points="-6,-4 6,0 -6,4"
        fill="#3DF5D2"
        opacity="0.85"
      />
    </g>
  );
}
