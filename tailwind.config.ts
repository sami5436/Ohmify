import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Engineering-lab dark palette
        bg: {
          base: "#05070A",
          surface: "#0A0E14",
          elevated: "#0F141C",
          panel: "#11161F",
        },
        line: {
          subtle: "#1A2230",
          muted: "#243043",
          strong: "#34465F",
        },
        ink: {
          primary: "#E6EDF7",
          secondary: "#9AA8BD",
          muted: "#5A6A82",
          dim: "#3A4659",
        },
        signal: {
          // Neon teal/cyan for live signals
          DEFAULT: "#3DF5D2",
          glow: "#5BFFE3",
          deep: "#0CC2A4",
        },
        volt: {
          DEFAULT: "#FFB547",
          glow: "#FFCB7A",
        },
        current: {
          DEFAULT: "#3DF5D2",
          glow: "#5BFFE3",
        },
        danger: {
          DEFAULT: "#FF5571",
          glow: "#FF7A91",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(36,48,67,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(36,48,67,0.35) 1px, transparent 1px)",
        "grid-coarse":
          "linear-gradient(rgba(58,70,89,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(58,70,89,0.5) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(61,245,210,0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        "signal-sm": "0 0 8px rgba(61,245,210,0.45)",
        "signal-md": "0 0 16px rgba(61,245,210,0.55)",
        "signal-lg": "0 0 32px rgba(61,245,210,0.55)",
        "volt-sm": "0 0 10px rgba(255,181,71,0.45)",
        "panel": "0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(36,48,67,0.6)",
      },
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flow": "flow 1.6s linear infinite",
        "scan": "scan 4s linear infinite",
        "blink": "blink 1.4s steps(2, end) infinite",
      },
      keyframes: {
        flow: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-24" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
