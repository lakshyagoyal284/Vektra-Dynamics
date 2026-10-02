import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0C0E",
        // Tonal steps let consecutive sections read as distinct bands instead
        // of seven identical dark cards.
        surface: {
          DEFAULT: "#101114",
          raised: "#15161A",
          deep: "#07080A",
          mid: "#101114",
          high: "#16181D",
        },
        line: "#23252B",
        lineStrong: "#34373F",
        accent: {
          cyan: "#7DD3C0",
          indigo: "#8B8FF6",
          // Single warm accent — used once, on one section, so the page has a
          // focal point rather than reading uniformly cool.
          ember: "#E8A87C",
        },
        muted: "#A3ABB8",
        ink: "#F2F3F5",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-grotesk)",
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(125, 211, 192, 0.35), 0 0 64px rgba(125, 211, 192, 0.12)",
        "glow-indigo": "0 0 24px rgba(139, 143, 246, 0.35), 0 0 64px rgba(139, 143, 246, 0.12)",
        "glow-soft": "0 0 40px rgba(125, 211, 192, 0.08)",
        "glow-ember": "0 0 24px rgba(232, 168, 124, 0.3), 0 0 64px rgba(232, 168, 124, 0.1)",
        card: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
        // Deeper drop for the sections that now act as focal panels.
        panel: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 32px 64px -32px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(155,161,172,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(155,161,172,0.06) 1px, transparent 1px)",
        // Stronger grid used behind focal panels, masked to fade at the edges.
        "grid-strong":
          "linear-gradient(rgba(155,161,172,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(155,161,172,0.09) 1px, transparent 1px)",
        "fade-radial": "radial-gradient(ellipse at center, black 35%, transparent 70%)",
      },
      backgroundSize: {
        grid: "44px 46px",
      },
      keyframes: {
        // Slow drift for the hero backdrop — enough motion to feel alive,
        // slow enough not to distract from the headline.
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -2%, 0) scale(1.06)" },
        },
        // Vertical sweep used on the accent rule under focal headings.
        sweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 24s ease-in-out infinite",
        sweep: "sweep 1.1s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 32s linear infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
