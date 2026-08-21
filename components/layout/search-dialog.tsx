"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X, TrendingUp } from "lucide-react"
import { products, getTrending } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { lowestOffer } from "@/data/products"
import { Button } from "@/components/ui/button"

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [q, setQ] = useState("")

  useEffect(() => {
    if (!open) setQ("")
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return products
      .filter((p) =>
        `${p.name} ${p.brand} ${p.subcategory}`.toLowerCase().includes(term),
      )
      .slice(0, 6)
  }, [q])

  const trending = useMemo(() => getTrending().slice(0, 4), [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.isComposing) return
    onOpenChange(false)
    router.push(`/products?search=${encodeURIComponent(q.trim())}`)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100">
      <button
        aria-label="Close search"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[8vh] w-[92%] max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search demo products, brands and categories..."
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Search products"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" />
          </Button>
        </form>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {q.trim() && results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No matches for &ldquo;{q}&rdquo;
            </p>
          )}

          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image src={p.images[0] || "/placeholder.svg"} alt={p.name} fill className="object-contain p-1" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand}</p>
              </div>
              <span className="text-sm font-semibold">{formatPrice(lowestOffer(p).price)}</span>
            </Link>
          ))}

          {!q.trim() && (
            <div className="p-2">
              <p className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="size-3.5" /> Trending now
              </p>
              {trending.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image src={p.images[0] || "/placeholder.svg"} alt={p.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(lowestOffer(p).price)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
