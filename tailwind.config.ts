import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#F8F7F3",
        graphite: "#2B2B2B",   // new — rest-of-page background
        cream: "#F8F7F3",      // new — rest-of-page text
        line: "rgba(248,247,243,0.14)",
        muted: "rgba(248,247,243,0.56)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        hero: ["clamp(3rem, 9vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
