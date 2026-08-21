"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, Search, Heart, GitCompareArrows, Sparkles, Zap } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { MegaMenu } from "@/components/layout/mega-menu"
import { MobileMenu } from "@/components/layout/mobile-menu"
import { SearchDialog } from "@/components/layout/search-dialog"
import { useStore } from "@/components/providers/store-provider"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { wishlist, compare, openAssistant } = useStore()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120)
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-foreground px-4 py-1.5 text-center text-xs font-medium text-background">
        <Zap className="size-3.5 text-deal" />
        Demo marketplace · Compare sample offers across multiple stores
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled ? "border-border glass" : "border-transparent bg-background",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <MobileMenu />

          <Link href="/" className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
              J
            </span>
            <span className="text-gradient-brand">HAVEN</span>
          </Link>

          <div className="ml-2 hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
            <button
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              onMouseEnter={openMenu}
              onFocus={openMenu}
              aria-expanded={menuOpen}
            >
              Categories
              <ChevronDown className={cn("size-4 transition-transform", menuOpen && "rotate-180")} />
            </button>
            <Link
              href="/products?deals=true"
              className="rounded-full px-3 py-2 text-sm font-medium text-deal transition-colors hover:bg-deal/10"
            >
              Today&apos;s Deals
            </Link>
            <Link
              href="/products"
              className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              All Products
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-0.5">
            <Button
              variant="ghost"
              className="hidden items-center gap-2 rounded-full pr-3 text-muted-foreground sm:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-4" />
              <span className="text-sm">Search</span>
              <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full sm:hidden"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-brand"
              aria-label="AI assistant"
              onClick={openAssistant}
            >
              <Sparkles className="size-5" />
            </Button>

            <Button asChild variant="ghost" size="icon" className="relative rounded-full" aria-label="Compare">
              <Link href="/compare">
                <GitCompareArrows className="size-5" />
                {compare.length > 0 && <CountBadge value={compare.length} />}
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="relative rounded-full" aria-label="Wishlist">
              <Link href="/wishlist">
                <Heart className="size-5" />
                {wishlist.length > 0 && <CountBadge value={wishlist.length} />}
              </Link>
            </Button>

            <ThemeToggle />
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <div
              className="absolute left-1/2 top-full hidden -translate-x-1/2 lg:block"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <div className="mt-1 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
                <MegaMenu onNavigate={() => setMenuOpen(false)} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

function CountBadge({ value }: { value: number }) {
  return (
    <Badge className="absolute -right-0.5 -top-0.5 size-4 justify-center rounded-full bg-brand p-0 text-[10px] text-brand-foreground">
      {value}
    </Badge>
  )
}
