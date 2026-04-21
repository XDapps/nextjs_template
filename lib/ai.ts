import { defineAI } from "@xdappsdev/ai";
import type { Provider } from "@xdappsdev/ai";

/**
 * Project AI registry.
 *
 * Each entry in `use` is a named use-case profile — a (provider, model, modality)
 * combination that app code references by name. See AGENT-SETUP.md for how to add
 * use cases and install the matching @ai-sdk/* peer dep for each provider used.
 *
 * Example text use case:
 *   customerChat: {
 *     provider: "anthropic",
 *     model: "claude-haiku-4-5",
 *     modality: "text",
 *     temperature: 0.7,
 *     system: "You are a helpful support assistant.",
 *   }
 *
 * Example image use case:
 *   productImage: {
 *     provider: "openai",
 *     model: "gpt-image-1",
 *     modality: "image",
 *     size: "1024x1024",
 *   }
 *
 * Example embedding use case:
 *   faqEmbedder: {
 *     provider: "openai",
 *     model: "text-embedding-3-small",
 *     modality: "embed",
 *   }
 *
 * Call-site usage:
 *   import { ai } from "@/lib/ai"
 *   const result = await ai.text({ use: "customerChat", messages })
 *   if (!result.ok) return { error: result.error.code }
 *   return { text: result.text }
 */

/** Collects only the defined API keys, satisfying Partial<Record<Provider, string>>. */
function resolveApiKeys(): Partial<Record<Provider, string>> {
  const candidates: Array<[Provider, string | undefined]> = [
    ["anthropic", process.env.ANTHROPIC_API_KEY],
    ["openai", process.env.OPENAI_API_KEY],
    ["google", process.env.GOOGLE_GENERATIVE_AI_API_KEY],
    ["deepseek", process.env.DEEPSEEK_API_KEY],
  ];

  const keys: Partial<Record<Provider, string>> = {};
  for (const [provider, value] of candidates) {
    if (value !== undefined) {
      keys[provider] = value;
    }
  }
  return keys;
}

export const ai = defineAI({
  use: {
    // Add your use cases here. Remove this file if the project has no AI features.
  },
  apiKeys: resolveApiKeys(),
  // Optional: plug in a logger or observability sink.
  // logger: console,
  // onFinish: (call) => console.log(`[ai] ${call.use} ${call.durationMs}ms`),
});
