# Next.js Template

A reusable starting point for new projects. Pre-wired with current best-practice tooling — no app shell, auth, or database implementation included. Each project adds those on top.

## What's included

| Area      | Choice                                                                           |
| --------- | -------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router) + React 19                                               |
| Language  | TypeScript 6 (strict + noUncheckedIndexedAccess)                                 |
| Styling   | Tailwind CSS v3 + shadcn/ui (Radix primitives)                                   |
| Dark mode | next-themes                                                                      |
| Env vars  | `process.env` reads (project layers its own typed-env / secrets-mgmt on top)    |
| Testing   | Jest + React Testing Library + jsdom                                             |
| Lint      | ESLint (Next.js defaults + prettier)                                             |
| Format    | Prettier + prettier-plugin-tailwindcss                                           |

## What's NOT included

- Auth, database, or any infrastructure wiring — add those at the project level.
- LLM / AI SDK — projects that need an LLM should add their preferred SDK at the project level. The Lightspeed monorepo, for example, uses `@lightspeed/llm` (Bedrock-capable) consumed only by feature packages.

## Quick start

Create a new project from this template (fresh git history, no fork lineage):

**From GitHub:** open https://github.com/XDapps/nextjs_template and click **Use this template → Create a new repository**.

**From the CLI:**

```bash
gh repo create my-project --template XDapps/nextjs_template --public --clone
cd my-project
npm install

# Set up env vars
cp .env.example .env.local

# Start dev server
npm run dev

# Visit the design system showcase (dev only)
open http://localhost:3000/design
```

> Don't `git clone` this repo directly unless you want to contribute back to the template itself — cloning preserves this repo's history and remote, which is not what you want for a new project.

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
  globals.css         Tailwind v3 directives + design tokens
  design/page.tsx     Dev-only token showcase (delete before prod)
components/
  ui/                 shadcn/ui primitives (Radix-based)
  theme-provider.tsx  next-themes wrapper
  theme-toggle.tsx    Light/dark toggle button
lib/
  utils.ts            cn() helper
  auth.ts             Auth stub (replace with your implementation)
  db.ts               Database stub
design.config.ts      Brand, font, radius — single customization surface
AGENT-SETUP.md        Step-by-step runbook for coding agents
```

## Scripts

| Command              | Purpose                 |
| -------------------- | ----------------------- |
| `npm run dev`        | Development server      |
| `npm run build`      | Production build        |
| `npm start`          | Start production server |
| `npm run typecheck`  | TypeScript (no emit)    |
| `npm run lint`       | ESLint                  |
| `npm run format`     | Prettier (write)        |
| `npm test`           | Jest (single run)       |
| `npm run test:watch` | Jest (watch mode)       |

## Pre-installed shadcn components

`button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`, `tabs`, `sonner`, `separator`, `skeleton`

Add more: `npx shadcn@latest add <component>`

## TypeScript rules

These are enforced and non-negotiable:

- No `any`
- No `as Type` casting — use type guards and `satisfies`
- No `@ts-ignore`
- `strict: true` and `noUncheckedIndexedAccess: true`
