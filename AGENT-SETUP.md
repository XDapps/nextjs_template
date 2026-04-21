# Agent Setup Runbook

This document is for coding agents (Claude, Cursor, etc.) bootstrapping a new project from this template. Follow these steps in order.

---

## Step 1 — Gather requirements from the user

Ask the user for:

| Question                                                   | Key                        |
| ---------------------------------------------------------- | -------------------------- |
| What is the brand/company name?                            | `design.brand.name`        |
| One-line description of the app?                           | `design.brand.description` |
| Primary font (Google Fonts name, e.g. "Inter", "Nunito")?  | `design.font.sans`         |
| Monospace font (Google Fonts name, e.g. "JetBrains Mono")? | `design.font.mono`         |
| Border radius (e.g. "0rem", "0.5rem", "1rem")?             | `design.radius`            |
| Primary color in oklch or hex? (will convert)              | `globals.css --primary`    |

If the user gives a hex color, convert to oklch using https://oklch.com (paste hex, copy the `oklch(...)` string). See Step 4 for the full conversion workflow.

---

## Step 2 — Edit `design.config.ts`

Update `brand.name`, `brand.description`, `font.sans`, `font.mono`, and `radius`.

```ts
// design.config.ts
export const design = {
  brand: {
    name: "Your Brand",
    description: "One-line description.",
  },
  font: {
    sans: "Nunito", // ← Google Font name
    mono: "Fira Code", // ← Google Font name
  },
  radius: "0.75rem",
} as const;
```

---

## Step 3 — Update `app/layout.tsx` font imports

**IMPORTANT:** `next/font/google` requires static string literals. You cannot compute the font name at runtime. When you change `design.font.sans` / `design.font.mono`, update the imports manually:

```ts
// Before (default):
import { Inter, JetBrains_Mono } from "next/font/google";
const fontSans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const fontMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

// After (example with Nunito + Fira Code):
import { Nunito, Fira_Code } from "next/font/google";
const fontSans = Nunito({ variable: "--font-sans", subsets: ["latin"] });
const fontMono = Fira_Code({ variable: "--font-mono", subsets: ["latin"] });
```

The `next/font/google` export name is the font name in PascalCase with spaces replaced by underscores. Spaces in the font import name become underscores (e.g., `JetBrains Mono` → `JetBrains_Mono`).

---

## Step 4 — Edit color tokens in `app/globals.css`

Find `:root { ... }` and `.dark { ... }` blocks. Replace the `--primary`, `--background`, etc. values with the brand colors in oklch format.

The full token set is already defined — you only need to change values, not structure.

To convert hex → oklch: visit https://oklch.com, paste the hex value, and copy the resulting `oklch(L C H)` string. Alternatively, run `node -e "const c=require('culori');const v=c.oklch(c.parse('#3b82f6'));console.log(\`oklch(\${v.l.toFixed(3)} \${v.c.toFixed(3)} \${v.h.toFixed(3)})\`)"`if`culori`is available in the project. Paste the resulting`oklch(...)`values directly into`globals.css`(both`:root`and`.dark` blocks).

---

## Step 5 — Configure env vars

1. Copy `.env.example` to `.env.local`.
2. Add any new variables to `env.ts` (both the `server`/`client` schema and the `runtimeEnv` map).
3. Add them to `.env.example` with placeholder values.

---

## Step 6 — Verify the design system

```bash
npm run dev
# Visit http://localhost:3000/design
```

This page renders: brand name, font samples, color swatches, radius samples, and every installed shadcn primitive. Confirm everything looks right before proceeding.

---

## Step 7 — Install project-specific dependencies

Add auth, database, AI as needed:

```bash
# Auth (Clerk example)
npm install @clerk/nextjs
# Then replace lib/auth.ts

# Database (Prisma example)
npm install prisma @prisma/client
npx prisma init
# Then replace lib/db.ts

# AI (Vercel AI SDK example)
npm install ai @ai-sdk/openai
# Then replace lib/ai.ts
```

---

## Step 8 — Add new env vars to the schema

Every env var must be registered in `env.ts`. TypeScript will error if you use `process.env.MY_VAR` directly — always go through `env.MY_VAR`.

---

## Step 9 — Pre-production cleanup (optional)

Delete the `design` route before shipping if you don't want it discoverable:

```bash
rm -rf app/design
```

It is already guarded by a `notFound()` call in non-development environments, so it is safe to leave in, but removing it keeps the build clean.

---

## Quick reference — scripts

| Command              | Purpose                    |
| -------------------- | -------------------------- |
| `npm run dev`        | Start development server   |
| `npm run build`      | Production build           |
| `npm run typecheck`  | TypeScript check (no emit) |
| `npm run lint`       | ESLint                     |
| `npm run format`     | Prettier (write)           |
| `npm test`           | Vitest (single run)        |
| `npm run test:watch` | Vitest (watch mode)        |
