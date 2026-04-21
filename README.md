# Next.js Template

A reusable starting point for new projects. Pre-wired with current best-practice tooling — no app shell, auth, or database implementation included. Each project adds those on top.

## What's included

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 (strict + noUncheckedIndexedAccess) |
| Styling | Tailwind CSS v4 + shadcn/ui (New York style) |
| Dark mode | next-themes |
| Env vars | @t3-oss/env-nextjs + Zod |
| Testing | Vitest + React Testing Library |
| Lint | ESLint (Next.js defaults + prettier) |
| Format | Prettier + prettier-plugin-tailwindcss |

## Quick start

```bash
# 1. Clone or use as template
git clone <this-repo> my-project
cd my-project
npm install

# 2. Set up env vars
cp .env.example .env.local

# 3. Start dev server
npm run dev

# 4. Visit the design system showcase (dev only)
open http://localhost:3000/design
```

## Customization

This template is designed to be customized by editing **two files**:

1. **`design.config.ts`** — brand name, description, font names, border radius.
2. **`app/globals.css`** — color token values (oklch format).

For font changes, you must also update the `next/font/google` imports in `app/layout.tsx`. See [`AGENT-SETUP.md`](./AGENT-SETUP.md) for the full runbook.

## Directory structure

```
app/
  layout.tsx          Root layout: fonts, ThemeProvider
  page.tsx            Empty production homepage
  globals.css         Tailwind v4 + design tokens
  design/page.tsx     Dev-only token showcase (delete before prod)
components/
  ui/                 shadcn primitives
  theme-provider.tsx  next-themes wrapper
  theme-toggle.tsx    Light/dark toggle button
lib/
  utils.ts            cn() helper
  auth.ts             Auth stub (replace with your implementation)
  db.ts               Database stub
  ai.ts               AI/LLM stub
design.config.ts      Brand, font, radius — single customization surface
env.ts                Typesafe env var schema
AGENT-SETUP.md        Step-by-step runbook for coding agents
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run typecheck` | TypeScript (no emit) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm test` | Vitest (single run) |
| `npm run test:watch` | Vitest (watch mode) |

## Pre-installed shadcn components

`button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`, `tabs`, `sonner`, `separator`, `skeleton`

Add more: `npx shadcn@latest add <component>`

## TypeScript rules

These are enforced and non-negotiable:

- No `any`
- No `as Type` casting — use type guards and `satisfies`
- No `@ts-ignore`
- `strict: true` and `noUncheckedIndexedAccess: true`
