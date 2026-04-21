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

Add auth and database as needed. AI is already pre-installed — see [Adding AI Features](#adding-ai-features) below.

```bash
# Auth (Clerk example)
npm install @clerk/nextjs
# Then replace lib/auth.ts

# Database (Prisma example)
npm install prisma @prisma/client
npx prisma init
# Then replace lib/db.ts
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

## Adding AI Features

This template ships with `@xdappsdev/ai` pre-installed and wired up in [lib/ai.ts](lib/ai.ts). To add AI to this project, follow these steps.

### 1. Decide on use cases

An AI "use case" is a named combination of provider + model + modality that app code references by name. Don't name them by quality tier (`fast`, `smart`) — name them by the *job they do* (`customerChat`, `reviewClassifier`, `productImage`, `faqEmbedder`).

Ask the user what AI features the project needs. For each feature, decide:
- **Modality:** text (chat, completion, classification), image (generation), or embed (vector search)?
- **Provider + model:** what's the right fit? (See the cheat sheet below.)
- **Name:** describe the job, not the quality.

### 2. Add use cases to `lib/ai.ts`

Inside `defineAI({ use: { ... } })`, add an entry for each use case. Examples:

```ts
use: {
  customerChat: {
    provider: "anthropic",
    model: "claude-haiku-4-5",
    modality: "text",
    temperature: 0.7,
    system: "You are a helpful support assistant for Acme Inc.",
  },
  reviewClassifier: {
    provider: "openai",
    model: "gpt-5-mini",
    modality: "text",
    temperature: 0,
  },
}
```

### 3. Install the matching provider peer dep(s)

For each unique `provider` in your use cases, install the corresponding `@ai-sdk/*` package:

| Provider in config | Install |
|---|---|
| `"anthropic"` | `npm install @ai-sdk/anthropic@^3` |
| `"openai"` | `npm install @ai-sdk/openai@^3` |
| `"google"` | `npm install @ai-sdk/google@^3` |
| `"deepseek"` | `npm install @ai-sdk/deepseek@^2` |

If you forget, the first call to that use case returns `error.code === "MISSING_PROVIDER_PKG"` with a message naming the exact package.

### 4. Set API key(s) in `.env.local`

| Provider | Env var |
|---|---|
| `anthropic` | `ANTHROPIC_API_KEY` |
| `openai` | `OPENAI_API_KEY` |
| `google` | `GOOGLE_GENERATIVE_AI_API_KEY` |
| `deepseek` | `DEEPSEEK_API_KEY` |

Optionally, add the key to `env.ts` server schema to get startup validation:

```ts
server: {
  ANTHROPIC_API_KEY: z.string().min(1),
}
// and in runtimeEnv:
runtimeEnv: {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
}
```

### 5. Call from app code

Import the `ai` singleton from `lib/ai` and call the method that matches the use case's modality:

```ts
import { ai } from "@/lib/ai";

// Text generation
const result = await ai.text({
  use: "customerChat",
  messages: [{ role: "user", content: "Hello" }],
});
if (!result.ok) return { error: result.error.code };
return { text: result.text };

// Structured output (text modality)
import { z } from "zod";
const classified = await ai.object({
  use: "reviewClassifier",
  schema: z.object({ sentiment: z.enum(["pos", "neg", "neu"]) }),
  messages: [{ role: "user", content: reviewText }],
});

// Image generation
const img = await ai.image({ use: "productImage", prompt: "..." });

// Embeddings
const emb = await ai.embed({ use: "faqEmbedder", values: ["..."] });
```

`ai.text` / `ai.stream` / `ai.object` only accept use cases with `modality: "text"`. `ai.image` only accepts `"image"`. `ai.embed` only accepts `"embed"`. TypeScript enforces this at compile time.

### 6. (Optional) Add streaming chat endpoint

If you have a text use case that powers a chat UI, add this file — **one route handler covers all chat use cases** via dynamic `[use]` param:

```ts
// app/api/ai/[use]/route.ts
import { ai } from "@/lib/ai";
import { createChatRouteHandler } from "@xdappsdev/ai/next";

export const POST = createChatRouteHandler((opts) => ai.stream(opts));
```

Then in a client component:

```tsx
"use client";
import { useAiChat } from "@xdappsdev/ai/react";

export function ChatWidget() {
  const { messages, sendMessage, status } = useAiChat({ use: "customerChat" });
  // render messages + input, call sendMessage({ text: input })
}
```

You'll need `@ai-sdk/react` installed: `npm install @ai-sdk/react@^3`.

### Model cheat sheet (rule of thumb)

Use this as a starting point — always verify current pricing and capabilities with the provider before committing to a client project.

| Use case flavor | Reasonable default |
|---|---|
| Chat, customer support, general conversation | `anthropic:claude-haiku-4-5` or `openai:gpt-5-mini` |
| Classification, simple extraction, routing | `openai:gpt-5-mini` (cheap, fast, deterministic) |
| Long-form generation, complex reasoning, reports | `anthropic:claude-opus-4-7` or `openai:gpt-5` |
| Image generation | `openai:gpt-image-1` |
| Embeddings | `openai:text-embedding-3-small` |
| Free tier / experimentation | `google:gemini-2.5-flash` |

### Removing AI entirely

If a project has no AI features:
1. Delete `lib/ai.ts`.
2. Remove `@xdappsdev/ai` and `ai` from `package.json`.
3. Run `npm install`.

The rest of the template continues to work unchanged.

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
