"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Bot, Send, Sparkles, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { getAssistantResponse, SUGGESTED_PROMPTS, type ChatMessage } from "@/services/aiService"
import { useStore } from "@/components/providers/store-provider"
import { Button } from "@/components/ui/button"

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I’m the JHAVEN shopping assistant. I can search the demo catalog, compare products and suggest options by budget. A real AI provider can be connected later through aiService.ts.",
}

export function AiAssistant() {
  const { assistantOpen, openAssistant, closeAssistant } = useStore()
  const [messages, setMessages] = useState<ChatMessage[]>([welcome])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, loading])

  async function ask(text: string) {
    const prompt = text.trim()
    if (!prompt || loading) return
    const user: ChatMessage = { id: crypto.randomUUID(), role: "user", content: prompt }
    setMessages((m) => [...m, user])
    setInput("")
    setLoading(true)
    try {
      const result = await getAssistantResponse(prompt)
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: result.content, products: result.products }])
    } finally { setLoading(false) }
  }

  function submit(e: FormEvent) { e.preventDefault(); void ask(input) }

  return (
    <>
      {!assistantOpen && (
        <Button onClick={openAssistant} className="fixed bottom-5 right-5 z-30 rounded-full shadow-lg" size="lg" aria-label="Open JHAVEN AI assistant">
          <Sparkles className="size-5" /><span className="hidden sm:inline">JHAVEN AI</span>
        </Button>
      )}
      <AnimatePresence>
        {assistantOpen && (
          <motion.aside initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .98 }} className="fixed inset-x-3 bottom-3 z-60 flex max-h-[78dvh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[390px]">
            <header className="flex items-center gap-3 border-b border-border p-4"><span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand"><Bot className="size-5" /></span><div className="min-w-0 flex-1"><h2 className="font-display font-semibold">JHAVEN AI Assistant</h2><p className="text-xs text-muted-foreground">Local demo mode · API-ready</p></div><Button variant="ghost" size="icon" className="rounded-full" onClick={closeAssistant} aria-label="Close assistant"><X className="size-5" /></Button></header>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m) => <Message key={m.id} message={m} />)}
              {loading && <div className="w-fit rounded-2xl bg-secondary px-4 py-2 text-sm text-muted-foreground">Finding matches…</div>}
              {messages.length === 1 && <div className="flex flex-wrap gap-2">{SUGGESTED_PROMPTS.map((p) => <button key={p} onClick={() => void ask(p)} className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-brand/40 hover:bg-brand/5">{p}</button>)}</div>}
              <div ref={endRef} />
            </div>
            <form onSubmit={submit} className="flex gap-2 border-t border-border p-3"><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about products…" className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand" /><Button type="submit" size="icon" className="size-11 rounded-xl" disabled={!input.trim() || loading} aria-label="Send"><Send className="size-4" /></Button></form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function Message({ message }: { message: ChatMessage }) {
  return <div className={message.role === "user" ? "ml-10" : "mr-6"}><div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-brand text-brand-foreground" : "bg-secondary"}`}>{message.content}</div>{message.products && message.products.length > 0 && <div className="mt-2 space-y-2">{message.products.slice(0,3).map((p)=><Link key={p.id} href={`/product/${p.slug}`} className="block rounded-xl border border-border bg-background p-3 transition hover:border-brand/40"><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.brand} · {p.shortDescription}</p></Link>)}</div>}</div>
}
