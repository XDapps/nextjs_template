/**
 * design.config.ts — Single customization surface for brand, font, radius.
 *
 * Agent: edit ONLY the values in the `design` object below.
 * globals.css holds the color token values directly — edit those there.
 * When you change `font.sans` or `font.mono`, you must also update the
 * corresponding `next/font/google` imports in app/layout.tsx — see AGENT-SETUP.md.
 */
export const design = {
  brand: {
    name: "Acme Inc.",
    description: "",
  },
  font: {
    /**
     * Google Font name for the sans-serif body font.
     * Must match the import in app/layout.tsx exactly.
     * e.g. "Inter", "Geist", "Nunito"
     */
    sans: "Inter",
    /**
     * Google Font name for the monospace font.
     * Must match the import in app/layout.tsx exactly.
     * e.g. "JetBrains Mono", "Fira Code"
     */
    mono: "JetBrains Mono",
  },
  /**
   * Base border-radius used by shadcn components.
   * Reflected as --radius in globals.css via layout.tsx inline style.
   * e.g. "0.5rem", "0rem", "1rem"
   */
  radius: "0.5rem",
} as const;
