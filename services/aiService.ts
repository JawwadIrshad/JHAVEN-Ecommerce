import { products, lowestOffer } from "@/data/products"
import { categories } from "@/data/categories"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/format"

// -----------------------------------------------------------------------
// JHAVEN AI service layer.
//
// The chat UI ONLY talks to `getAssistantResponse`. This keeps the
// interface decoupled from the provider. To connect a real model later
// (OpenAI, Gemini, Groq, Anthropic, or a custom backend), implement an
// `AIProvider` and set it as the active provider, or point
// `getAssistantResponse` at an API route. The JHAVEN catalog is passed in
// so the same context can be forwarded to a real model.
// -----------------------------------------------------------------------

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  products?: Product[]
}

export interface AssistantResult {
  content: string
  products?: Product[]
}

export interface AIProvider {
  name: string
  respond: (prompt: string, catalog: Product[]) => Promise<AssistantResult>
}

// ---- Local demo provider (no external API required) --------------------

const num = (s: string, re: RegExp) => {
  const m = s.match(re)
  return m ? Number(m[1]) : undefined
}

function scoreProduct(p: Product, tokens: string[]) {
  const hay = `${p.name} ${p.brand} ${p.category} ${p.subcategory} ${p.description} ${p.features.join(" ")}`.toLowerCase()
  return tokens.reduce((score, t) => (hay.includes(t) ? score + 1 : score), 0)
}

const STOP = new Set([
  "the", "a", "an", "for", "under", "over", "best", "show", "me", "find",
  "with", "and", "or", "to", "of", "is", "are", "which", "what", "good",
  "cheap", "cheaper", "better", "than", "please", "some", "i", "want", "need",
  "looking", "recommend", "suggest", "compare", "these", "that", "in", "on",
])

function localRespond(prompt: string, catalog: Product[]): AssistantResult {
  const q = prompt.toLowerCase().trim()

  // Budget extraction: "under $800", "below 100", "less than 500"
  const budget =
    num(q, /(?:under|below|less than|max|budget of|upto|up to)\s*\$?\s*(\d+)/) ??
    num(q, /\$\s*(\d+)/)

  // Category match
  const matchedCategory = categories.find(
    (c) => q.includes(c.name.toLowerCase()) || q.includes(c.id.replace("-", " ")),
  )

  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t))

  // Compare intent
  if (q.includes("compare")) {
    const ranked = [...catalog]
      .map((p) => ({ p, s: scoreProduct(p, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((x) => x.p)
    if (ranked.length >= 2) {
      return {
        content:
          "Here are the products I found to compare. Add them to the Compare tray or open the compare page for a full side-by-side of specs, prices and offers.",
        products: ranked,
      }
    }
    return {
      content:
        "Tell me which products you'd like to compare (e.g. \"compare the Aurora Pulse X and the Nimbus Pro 14\") and I'll line them up side by side.",
    }
  }

  // Build a candidate list
  let candidates = [...catalog]
  if (matchedCategory) candidates = candidates.filter((p) => p.category === matchedCategory.id)
  if (budget !== undefined) candidates = candidates.filter((p) => lowestOffer(p).price <= budget)

  const ranked = candidates
    .map((p) => ({ p, s: scoreProduct(p, tokens) }))
    .sort((a, b) => b.s - a.s || b.p.rating - a.p.rating)

  // Cheapest / deal intent
  if (q.includes("cheap") || q.includes("deal") || q.includes("discount")) {
    ranked.sort((a, b) => lowestOffer(a.p).price - lowestOffer(b.p).price)
  }

  const picks = ranked
    .filter((x) => x.s > 0 || matchedCategory || budget !== undefined)
    .slice(0, 4)
    .map((x) => x.p)

  if (picks.length > 0) {
    const parts: string[] = []
    if (matchedCategory) parts.push(matchedCategory.name.toLowerCase())
    if (budget !== undefined) parts.push(`under ${formatPrice(budget)}`)
    const desc = parts.length ? ` ${parts.join(" ")}` : ""
    const best = picks[0]
    return {
      content:
        `Here are some great picks${desc}. My top recommendation is the ${best.name} by ${best.brand} — ${best.shortDescription} The best current price is ${formatPrice(lowestOffer(best).price)} at ${lowestOffer(best).store}.`,
      products: picks,
    }
  }

  // Greeting / fallback
  if (/^(hi|hey|hello|yo|start)/.test(q)) {
    return {
      content:
        "Hi! I'm the JHAVEN shopping assistant. Try asking me things like \"best laptop under $1300\", \"show gaming headsets under $100\", or \"find cheaper alternatives to the Aurora Pulse X\".",
    }
  }

  return {
    content:
      "I couldn't find a close match. Try a budget or category, e.g. \"headphones under $200\", \"best gaming console\", or \"compare smartwatches\". You can also browse categories from the menu.",
    products: [...catalog].sort((a, b) => b.rating - a.rating).slice(0, 3),
  }
}

export const localProvider: AIProvider = {
  name: "jhaven-local",
  respond: async (prompt, catalog) => localRespond(prompt, catalog),
}

// Swap this to a real provider later without touching the chat UI.
let activeProvider: AIProvider = localProvider

export function setAIProvider(provider: AIProvider) {
  activeProvider = provider
}

export async function getAssistantResponse(
  prompt: string,
  catalog: Product[] = products,
): Promise<AssistantResult> {
  // Small simulated latency so the typing indicator reads naturally.
  await new Promise((r) => setTimeout(r, 450))
  return activeProvider.respond(prompt, catalog)
}

export const SUGGESTED_PROMPTS = [
  "Best laptop under $1300",
  "Show gaming headphones under $100",
  "Cheaper alternatives to the Aurora Pulse X",
  "Which tablet is best for drawing?",
]
