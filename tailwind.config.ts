import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#09090b",
          950: "#09090b",
          900: "#121215",
          850: "#151518",
          800: "#18181b",
        },
        surface: {
          DEFAULT: "#18181b",
          card: "#18181b",
          hover: "#202024",
          border: "#27272a",
        },
        electric: {
          DEFAULT: "#f97316",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          glow: "rgba(249, 115, 22, 0.15)",
        },
      },
      boxShadow: {
        "orange-glow": "0 0 25px -4px rgba(249, 115, 22, 0.25), 0 0 10px -2px rgba(249, 115, 22, 0.15)",
        "orange-glow-sm": "0 0 15px -3px rgba(249, 115, 22, 0.2)",
        "orange-glow-lg": "0 0 40px -6px rgba(249, 115, 22, 0.35)",
        "card-subtle": "0 4px 20px -2px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.4))" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 4px rgba(249, 115, 22, 0.15))" },
        },
      },
      backgroundImage: {
        "radial-gradient-orange": "radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.12) 0%, rgba(9, 9, 11, 0) 70%)",
        "dot-pattern": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
