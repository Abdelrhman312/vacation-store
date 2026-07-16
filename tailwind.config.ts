import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          muted: "#eff6ff",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "badge-bounce": "badge-bounce 0.5s ease",
      },
      keyframes: {
        "badge-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.35)" },
          "70%": { transform: "scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
