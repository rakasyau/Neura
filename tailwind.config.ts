import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neura: {
          deep: "#060913",
          aurora1: "#0F172A",
          aurora2: "#1E1B4B",
          cyan: "#5EEAD4",
          amber: "#F5A265",
          glass: "rgba(15, 23, 42, 0.85)",
          glassBorder: "rgba(255, 255, 255, 0.12)",
          text: "#F8FAFC",
          muted: "#CBD5E1",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        glass: "20px",
      },
      borderRadius: {
        glass: "32px",
        "glass-sm": "16px",
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-reveal": "scrollReveal 0.6s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollReveal: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
