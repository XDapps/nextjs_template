import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { design } from "./design.config";

/**
 * Tailwind v3 config.
 * Color tokens reference CSS variables defined in app/globals.css.
 * Font family + border radius are sourced from design.config.ts (single source of truth).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: {
            DEFAULT: "var(--sidebar-primary)",
            foreground: "var(--sidebar-primary-foreground)",
          },
          accent: {
            DEFAULT: "var(--sidebar-accent)",
            foreground: "var(--sidebar-accent-foreground)",
          },
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      borderRadius: {
        sm: `calc(${design.radius} * 0.6)`,
        md: `calc(${design.radius} * 0.8)`,
        lg: design.radius,
        xl: `calc(${design.radius} * 1.4)`,
        "2xl": `calc(${design.radius} * 1.8)`,
        "3xl": `calc(${design.radius} * 2.2)`,
        "4xl": `calc(${design.radius} * 2.6)`,
      },
      fontFamily: {
        sans: [`var(--font-sans)`, "sans-serif"],
        mono: [`var(--font-mono)`, "monospace"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
