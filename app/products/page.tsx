"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { products, getBrands, getStores } from "@/data/products"
import { categories } from "@/data/categories"
import { filterProducts, sortProducts, SORT_LABELS } from "@/lib/query"
import type { SortOption } from "@/lib/types"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductsPage() {
  return <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">Loading catalog…</div>}><ProductsContent /></Suspense>
}

function ProductsContent() {
  const params = useSearchParams()
  const initialCategory = params.get("category") || ""
  const initialSubcategory = params.get("subcategory") || ""
  const initialSearch = params.get("search") || ""
  const dealsOnly = params.get("deals") === "true"
  const initialSort = (params.get("sort") as SortOption) || "recommended"

  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)
  const [subcategory, setSubcategory] = useState(initialSubcategory)
  const [brand, setBrand] = useState("")
  const [store, setStore] = useState("")
  const [sort, setSort] = useState<SortOption>(initialSort)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const selectedCategory = categories.find((c) => c.id === category)
  const result = useMemo(() => {
    let list = filterProducts(products, {
      search,
      category: category || undefined,
      subcategory: subcategory || undefined,
      brands: brand ? [brand] : undefined,
      stores: store ? [store] : undefined,
      minDiscount: dealsOnly ? 1 : undefined,
    })
    return sortProducts(list, sort)
  }, [search, category, subcategory, brand, store, sort, dealsOnly])

  const clear = () => { setSearch(""); setCategory(""); setSubcategory(""); setBrand(""); setStore(""); setSort("recommended") }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand">JHAVEN Catalog</p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{dealsOnly ? "Today’s deals" : selectedCategory?.name || "All products"}</h1>
        <p className="mt-2 text-muted-foreground">{result.length} products available in the demo catalog.</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, brands or categories..." className="h-11 lg:max-w-md" />
        <div className="flex gap-2 lg:ml-auto">
          <Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal className="size-4" /> Filters</Button>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="h-11 rounded-xl border border-border bg-card px-3 text-sm">
            {Object.entries(SORT_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} rounded-2xl border border-border bg-card p-4 lg:block lg:self-start`}>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display font-semibold">Filters</h2><Button variant="ghost" size="sm" onClick={clear}><X className="size-4" /> Clear</Button></div>
          <Filter label="Category" value={category} onChange={(v) => { setCategory(v); setSubcategory("") }} options={categories.map((c) => [c.id, c.name])} />
          {selectedCategory && <Filter label="Subcategory" value={subcategory} onChange={setSubcategory} options={selectedCategory.subcategories.map((s) => [s.id, s.name])} />}
          <Filter label="Brand" value={brand} onChange={setBrand} options={getBrands().map((b) => [b, b])} />
          <Filter label="Store" value={store} onChange={setStore} options={getStores().map((s) => [s, s])} />
        </aside>
        <ProductGrid products={result} />
      </div>
    </div>
  )
}

function Filter({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="mb-4 block text-sm font-medium">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"><option value="">All</option>{options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
}
