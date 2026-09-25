import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0C0E",
        surface: {
          DEFAULT: "#101114",
          raised: "#15161A",
        },
        line: "#23252B",
        accent: {
          cyan: "#7DD3C0",
          indigo: "#8B8FF6",
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
        card: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(155,161,172,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(155,161,172,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 46px",
      },
      keyframes: {
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
        marquee: "marquee 32s linear infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
