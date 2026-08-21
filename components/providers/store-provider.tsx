"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const WISHLIST_KEY = "jhaven:wishlist"
const COMPARE_KEY = "jhaven:compare"
export const COMPARE_LIMIT = 4

type StoreContextValue = {
  wishlist: string[]
  compare: string[]
  isWishlisted: (id: string) => boolean
  isComparing: (id: string) => boolean
  isWished: (id: string) => boolean
  isCompared: (id: string) => boolean
  toggleWishlist: (id: string) => void
  toggleWish: (id: string) => void
  toggleCompare: (id: string) => void
  removeCompare: (id: string) => void
  clearCompare: () => void
  assistantOpen: boolean
  openAssistant: () => void
  closeAssistant: () => void
  ready: boolean
}

const StoreContext = createContext<StoreContextValue | null>(null)

function readList(key: string): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [compare, setCompare] = useState<string[]>([])
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [ready, setReady] = useState(false)

  const openAssistant = useCallback(() => setAssistantOpen(true), [])
  const closeAssistant = useCallback(() => setAssistantOpen(false), [])

  useEffect(() => {
    setWishlist(readList(WISHLIST_KEY))
    setCompare(readList(COMPARE_KEY))
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist, ready])

  useEffect(() => {
    if (ready) window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compare))
  }, [compare, ready])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= COMPARE_LIMIT) return prev
      return [...prev, id]
    })
  }, [])

  const removeCompare = useCallback((id: string) => {
    setCompare((prev) => prev.filter((x) => x !== id))
  }, [])

  const clearCompare = useCallback(() => setCompare([]), [])

  const value = useMemo<StoreContextValue>(
    () => ({
      wishlist,
      compare,
      isWishlisted: (id) => wishlist.includes(id),
      isComparing: (id) => compare.includes(id),
      isWished: (id) => wishlist.includes(id),
      isCompared: (id) => compare.includes(id),
      toggleWishlist,
      toggleWish: toggleWishlist,
      toggleCompare,
      removeCompare,
      clearCompare,
      assistantOpen,
      openAssistant,
      closeAssistant,
      ready,
    }),
    [
      wishlist,
      compare,
      toggleWishlist,
      toggleCompare,
      removeCompare,
      clearCompare,
      assistantOpen,
      openAssistant,
      closeAssistant,
      ready,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
