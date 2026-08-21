// Core domain types for JHAVEN.
// Keep this file free of UI concerns so the data layer can later be swapped
// for a REST API, affiliate feed, JSON/CSV import, or database without
// touching the frontend.

export interface Offer {
  store: string
  price: number
  currency?: string
  shipping: string
  affiliateUrl: string
  inStock?: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string // category id
  subcategory: string
  description: string
  shortDescription: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  images: string[]
  model3D: string | null
  specifications: Record<string, string>
  features: string[]
  offers: Offer[]
  featured?: boolean
  trending?: boolean
  bestSeller?: boolean
  newArrival?: boolean
  createdAt?: string
}

export interface Subcategory {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  icon: string // lucide icon name
  description: string
  subcategories: Subcategory[]
}

export type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount"
  | "newest"

export interface ProductFilters {
  search?: string
  category?: string
  subcategory?: string
  brands?: string[]
  stores?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  minDiscount?: number
  sort?: SortOption
}
