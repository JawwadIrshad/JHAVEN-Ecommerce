"use client"

import Link from "next/link"
import Image from "next/image"
import { X, GitCompareArrows } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { getProductById } from "@/data/products"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/providers/store-provider"

export function CompareBar() {
  const { compare, removeCompare, clearCompare, ready } = useStore()

  const items = ready ? compare.map(getProductById).filter(Boolean) : []
  const show = items.length > 0

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border glass"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
            <div className="hidden shrink-0 items-center gap-2 font-display font-semibold sm:flex">
              <GitCompareArrows className="size-5 text-brand" />
              Compare
            </div>
            <div className="flex flex-1 items-center gap-2 overflow-x-auto hide-scrollbar">
              {items.map((p) => (
                <div
                  key={p!.id}
                  className="relative flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card py-1.5 pl-1.5 pr-7"
                >
                  <div className="relative size-9 overflow-hidden rounded-lg bg-secondary">
                    <Image src={p!.images[0] || "/placeholder.svg"} alt={p!.name} fill className="object-contain p-0.5" />
                  </div>
                  <span className="max-w-28 truncate text-sm font-medium">{p!.name}</span>
                  <button
                    onClick={() => removeCompare(p!.id)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${p!.name} from compare`}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                Clear
              </Button>
              <Button asChild size="sm" disabled={items.length < 2}>
                <Link href="/compare">Compare ({items.length})</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
