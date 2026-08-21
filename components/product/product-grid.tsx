import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/product/product-card"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="font-display text-lg font-semibold">No products found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
