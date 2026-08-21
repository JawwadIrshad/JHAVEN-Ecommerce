import type { Product, ProductFilters, SortOption } from "@/lib/types"
import { lowestOffer } from "@/data/products"

// Pure, UI-agnostic filtering + sorting over a Product[].
// Used by the listing page so the same logic can run on the server or client.

export function filterProducts(input: Product[], filters: ProductFilters): Product[] {
  const {
    search,
    category,
    subcategory,
    brands,
    stores,
    minPrice,
    maxPrice,
    minRating,
    minDiscount,
  } = filters

  const q = search?.trim().toLowerCase()

  return input.filter((p) => {
    if (q) {
      const haystack = `${p.name} ${p.brand} ${p.shortDescription} ${p.subcategory}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (category && p.category !== category) return false
    if (subcategory && p.subcategory !== subcategory) return false
    if (brands?.length && !brands.includes(p.brand)) return false
    if (stores?.length && !p.offers.some((o) => stores.includes(o.store))) return false
    if (typeof minPrice === "number" && lowestOffer(p).price < minPrice) return false
    if (typeof maxPrice === "number" && lowestOffer(p).price > maxPrice) return false
    if (typeof minRating === "number" && p.rating < minRating) return false
    if (typeof minDiscount === "number" && p.discount < minDiscount) return false
    return true
  })
}

export function sortProducts(input: Product[], sort: SortOption = "recommended"): Product[] {
  const list = [...input]
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => lowestOffer(a).price - lowestOffer(b).price)
    case "price-desc":
      return list.sort((a, b) => lowestOffer(b).price - lowestOffer(a).price)
    case "rating":
      return list.sort((a, b) => b.rating - a.rating)
    case "discount":
      return list.sort((a, b) => b.discount - a.discount)
    case "newest":
      return list.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    default:
      // recommended: featured + rating * review weighting
      return list.sort((a, b) => {
        const score = (p: Product) =>
          (p.featured ? 1000 : 0) + p.rating * 100 + Math.log10(p.reviewCount + 1) * 10
        return score(b) - score(a)
      })
  }
}

export const SORT_LABELS: Record<SortOption, string> = {
  recommended: "Recommended",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  discount: "Biggest Discount",
  newest: "Newest",
}
