# Ohmify

An interactive learning site for exploring electrical circuits — a serious, sleek lab for understanding voltage, current, resistance, signal flow, and power, visualized in real time.

Built with **Next.js 16** (App Router) and **Tailwind CSS**.

## Sections

- **Hero** — engineering-grid backdrop, animated signal traces
- **Interactive lab** — series circuit with swappable load (resistor / capacitor / speaker), animated current flow, live V/I/R/P readouts
- **Concepts** — five visual primers covering voltage, current, resistance, signal flow, and power
- **Audio circuit** — AC source → coupling cap → resistor → speaker, with oscilloscope-style waveform preview
- **Glossary** — searchable, categorized vocabulary
- **Footer** — dense, technical, with a flowing trace

## Local development

```bash
npm install
npm run dev
```

The site is fully static — `npm run build` produces a prerendered output.

## Stack

- Next.js 16 + React 19
- Tailwind CSS v3
- TypeScript
- Pure SVG for every diagram, schematic, and oscilloscope trace — no external chart libs
