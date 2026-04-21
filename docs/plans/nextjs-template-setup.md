# Next.js Template Repo — Implementation Plan

## Context

You are building a reusable Next.js template that will serve as the starting point for many future AI-generated client projects (admin dashboards, customer apps, internal tools — anything). Setting these up by hand each time is wasted work. This template solves that by pre-installing current best-practice dependencies, wiring up design tokens, dark mode, typesafe env vars, and testing — while staying **blank-canvas neutral** so any project type (with or without auth, DB, or app shell) can be built on top of it.

The template itself will live as a GitHub template repo. Each client project is created by cloning, editing one config file, and letting a coding agent (Claude Code / Codex) build from there.

## Final decisions (from Q&A)

| Area                 | Decision                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Framework**        | Next.js 15 (App Router), React 19, TypeScript strict                                                            |
| **Styling**          | Tailwind CSS v4 + shadcn/ui + `next-themes` (dark mode)                                                         |
| **Pages**            | Empty production homepage. Dev-only `/design` token showcase.                                                   |
| **App shell**        | None. No sidebar, no topbar. Each project builds its own.                                                       |
| **Auth**             | Stub only (`lib/auth.ts` placeholder). No documented upgrade path.                                              |
| **Database**         | Stub only (`lib/db.ts` placeholder).                                                                            |
| **LLM**              | Empty `lib/ai.ts` slot with `// TODO: install @yourorg/ai` comment. Actual package is a separate future effort. |
| **Customization UX** | Single `design.config.ts` + `AGENT-SETUP.md` with explicit agent instructions. No interactive CLI.              |
| **Lint/format**      | ESLint + Prettier (maximum agent compatibility; Biome is faster but less familiar to agents).                   |
| **Testing**          | Vitest + React Testing Library (ESM-native, works cleanly with Next 15 / React 19).                             |
| **Env vars**         | `@t3-oss/env-nextjs` for typesafe runtime validation.                                                           |

## Target file structure

```
nextjs_template/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, <html>
│   ├── page.tsx                # Empty production homepage
│   ├── globals.css             # Tailwind v4 + CSS var tokens from design.config
│   └── design/
│       └── page.tsx            # Dev-only: renders all tokens, typography, shadcn components
├── components/
│   ├── ui/                     # shadcn primitives (button, card, input, dialog, etc.)
│   └── theme-provider.tsx      # next-themes wrapper
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── auth.ts                 # Stub — TODO marker for per-project auth
│   ├── db.ts                   # Stub — TODO marker for per-project DB
│   └── ai.ts                   # Stub — TODO marker for future @yourorg/ai package
├── design.config.ts            # THE customization file: brand, colors, font, radius
├── env.ts                      # @t3-oss/env-nextjs schema
├── AGENT-SETUP.md              # Step-by-step instructions for coding agents
├── README.md                   # Human-facing quickstart + template usage
├── components.json             # shadcn config
├── tailwind.config.ts          # Reads from design.config.ts
├── tsconfig.json               # strict: true, no implicit any
├── .eslintrc.json
├── .prettierrc
├── vitest.config.ts
├── vitest.setup.ts
├── .env.example
├── .gitignore
├── package.json
└── next.config.ts
```

## `design.config.ts` — the single customization surface

```ts
// design.config.ts
// Agent: edit ONLY the values below. globals.css and tailwind.config.ts read from here.
export const design = {
  brand: {
    name: "Acme Inc.",
    description: "",
  },
  font: {
    // Any Google Font name. Loaded via next/font/google.
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  radius: "0.5rem",
  // oklch values (current shadcn/Tailwind v4 convention).
  // Colors are defined directly in globals.css — not in design.config.ts.
  // Edit app/globals.css :root and .dark blocks for color tokens.
} as const;
```

`design.config.ts` is the source of truth for brand/font/radius. `globals.css` holds the color variables directly. Agents edit both files during setup — simpler than a build-time generator.

## `AGENT-SETUP.md` — what a coding agent reads on clone

Structured as an agent runbook:

1. Ask the user: brand name, brand description, primary color (hex or oklch — hex will be converted), accent/secondary if different, preferred font (default Inter), border radius preference (default 0.5rem).
2. Edit `design.config.ts` with the brand/font/radius.
3. Edit `app/globals.css` color tokens (both `:root` and `.dark` blocks) — conversion: hex → oklch via https://oklch.com (see AGENT-SETUP.md Step 4).
4. Run `npm install`.
5. Run `npm run dev` and visit `/design` to visually confirm tokens applied.
6. Delete `/design` directory **only when ready to deploy to production** (it's already dev-only gated, so this is optional).
7. Begin building the actual project at `app/page.tsx`.

## Step-by-step implementation

1. **Initialize Next.js 15 with TypeScript**
   - `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"` — or equivalent with Tailwind v4 flag if prompted.
   - Verify it scaffolds App Router with React 19.

2. **Strict TypeScript**
   - Set `strict: true`, `noUncheckedIndexedAccess: true` in `tsconfig.json`.

3. **Install core dependencies**
   - `next-themes`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@t3-oss/env-nextjs`, `zod`

4. **Install dev dependencies**
   - `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier`

5. **Initialize shadcn/ui**
   - `npx shadcn@latest init` — New York style, neutral base (will be overridden by tokens), CSS vars: yes.
   - Pre-install a core set: `button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`, `tabs`, `sonner` (toast), `separator`, `skeleton`. Enough to be useful on day one without bloat.

6. **Theme provider + dark mode**
   - `components/theme-provider.tsx` wraps `next-themes`. Mount in `app/layout.tsx`. Include a simple `<ThemeToggle />` utility component.

7. **Design tokens**
   - Write `design.config.ts` with brand/font/radius.
   - Populate `app/globals.css` with full shadcn color token set for `:root` and `.dark`.
   - Load fonts in `app/layout.tsx` via `next/font/google`, reading name from `design.config.ts`.

8. **Env var schema**
   - `env.ts` using `@t3-oss/env-nextjs` + `zod`. Empty schema by default, commented example for `NEXT_PUBLIC_BRAND_NAME`.
   - `.env.example` with corresponding placeholders.

9. **Stubs**
   - `lib/auth.ts`, `lib/db.ts`, `lib/ai.ts` — each a single file with a TODO comment explaining what goes here and a placeholder export so imports don't break.

10. **Pages**
    - `app/page.tsx`: literally `export default function Home() { return null; }` (or an empty `<main />`).
    - `app/design/page.tsx`: dev-only page guarded by `if (process.env.NODE_ENV !== 'development') notFound();`. Renders brand name, font sample at multiple sizes, color swatch grid, radius sample, and one of each installed shadcn primitive.

11. **Testing setup**
    - `vitest.config.ts` with jsdom env and React plugin.
    - `vitest.setup.ts` importing `@testing-library/jest-dom`.
    - One sample test: `lib/utils.test.ts` covering `cn()` to prove the harness works.

12. **Lint/format**
    - `.eslintrc.json` extends `next/core-web-vitals`, `next/typescript`, `prettier`.
    - `.prettierrc` with `prettier-plugin-tailwindcss`.

13. **Documentation**
    - `README.md`: human-facing. What the template is, how to use it (clone → edit `design.config.ts` → run), scripts reference, dir structure.
    - `AGENT-SETUP.md`: agent-facing runbook described above.

14. **Package scripts**
    - `dev`, `build`, `start`, `lint`, `format`, `test`, `test:watch`, `typecheck`.

15. **Git hygiene**
    - `.gitignore` (Next.js default + `.env.local`).
    - Initial commit: `chore: initial template scaffold`.

## Critical files to be created

- `design.config.ts` — single customization surface
- `app/globals.css` — color token definitions
- `app/layout.tsx` — font + theme provider wiring
- `app/page.tsx` — empty homepage
- `app/design/page.tsx` — dev-only token showcase
- `env.ts` — typesafe env schema
- `lib/auth.ts`, `lib/db.ts`, `lib/ai.ts` — stubs
- `AGENT-SETUP.md` — agent runbook
- `README.md` — human docs

## Verification

1. `npm install` completes clean — no peer-dep warnings.
2. `npm run typecheck` passes with `strict: true`.
3. `npm run lint` passes.
4. `npm test` passes the sample `cn()` test.
5. `npm run build` produces a successful production build.
6. `npm run dev` → visit `http://localhost:3000/` — page renders blank, no console errors.
7. `npm run dev` → visit `http://localhost:3000/design` — page renders with correct fonts, colors, and all installed shadcn primitives in both light and dark mode (toggle works).
8. Production build smoke test: `NODE_ENV=production npm run build && npm start` — `/design` returns 404 (dev-only gate works).
9. Clone test: copy the repo to a fresh dir, edit `design.config.ts` (change brand name + font), restart dev server, confirm `/design` reflects changes.

## Out of scope (deliberately)

- Auth implementation (stub only)
- Database / ORM setup (stub only)
- `@yourorg/ai` LLM package (separate future effort; just a stub slot here)
- App shell / navigation / any specific page beyond homepage + dev design showcase
- CI/CD workflows (add later if needed)
- Git hooks / commitlint (add later if needed)
