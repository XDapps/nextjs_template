import { createEnv } from "@t3-oss/env-nextjs";

/**
 * Type-safe environment variable schema.
 * Add variables here as your project grows — they are validated at startup.
 *
 * When you add your first field, uncomment the `z` import:
 *   import { z } from "zod";
 *
 * Example:
 *   server: { DATABASE_URL: z.string().url() }
 *   client: { NEXT_PUBLIC_BRAND_NAME: z.string().min(1) }
 */
export const env = createEnv({
  /**
   * Server-only variables. Never exposed to the browser.
   * Access via `env.MY_VAR` in server components / route handlers.
   */
  server: {
    // Add server-only variables here.
    // Example: DATABASE_URL: z.string().url()
  },

  /**
   * Client-side variables. Must be prefixed with NEXT_PUBLIC_.
   * Access via `env.NEXT_PUBLIC_MY_VAR` anywhere.
   */
  client: {
    // NEXT_PUBLIC_BRAND_NAME: z.string().min(1),
  },

  /**
   * Destructure from process.env so Next.js can statically replace
   * NEXT_PUBLIC_ variables at build time.
   */
  runtimeEnv: {
    // NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  },
});
