import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, ShieldCheck, Truck, Sparkles } from "lucide-react"
import { getProductBySlug, getRelated, lowestOffer, products } from "@/data/products"
import { getCategoryName } from "@/data/categories"
import { formatPrice } from "@/lib/format"
import { ProductViewer } from "@/components/product/product-viewer"
import { ProductGrid } from "@/components/product/product-grid"
import { RatingStars } from "@/components/product/rating-stars"
import { Button } from "@/components/ui/button"

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })) }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const best = lowestOffer(product)
  const related = getRelated(product, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-sm text-muted-foreground"><Link href="/products" className="hover:text-brand">Products</Link> / <Link href={`/products?category=${product.category}`} className="hover:text-brand">{getCategoryName(product.category)}</Link> / {product.name}</div>
      <div className="grid gap-9 lg:grid-cols-2">
        <ProductViewer product={product} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2"><RatingStars rating={product.rating} /><span className="text-sm text-muted-foreground">{product.rating} · {product.reviewCount.toLocaleString()} reviews</span></div>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/5 p-5">
            <p className="text-sm text-muted-foreground">Best current demo offer</p>
            <div className="mt-1 flex flex-wrap items-end justify-between gap-4"><div><span className="font-display text-3xl font-bold">{formatPrice(best.price)}</span>{product.originalPrice > best.price && <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}<p className="mt-1 text-sm">at <b>{best.store}</b> · {best.shipping}</p></div><Button asChild size="lg" className="rounded-full"><a href={best.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">View deal <ExternalLink className="size-4" /></a></Button></div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl border border-border p-3"><Truck className="mb-2 size-5 text-brand" />Compare shipping</div><div className="rounded-xl border border-border p-3"><ShieldCheck className="mb-2 size-5 text-brand" />External checkout</div></div>
        </div>
      </div>

      <section className="mt-14"><h2 className="font-display text-2xl font-semibold">Specifications</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(product.specifications).map(([k,v]) => <div key={k} className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5"><p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p><p className="mt-1 font-medium">{v}</p></div>)}</div></section>
      <section className="mt-12"><h2 className="font-display text-2xl font-semibold">Key features</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{product.features.map((f) => <div key={f} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"><Sparkles className="size-5 text-brand" /><span>{f}</span></div>)}</div></section>
      <section className="mt-12"><h2 className="font-display text-2xl font-semibold">Compare store offers</h2><div className="mt-4 overflow-hidden rounded-2xl border border-border">{product.offers.slice().sort((a,b)=>a.price-b.price).map((o,i) => <div key={`${o.store}-${o.price}`} className="flex flex-col gap-3 border-b border-border p-4 last:border-0 sm:flex-row sm:items-center"><div className="flex-1"><div className="flex items-center gap-2"><b>{o.store}</b>{i===0 && <span className="rounded-full bg-deal/15 px-2 py-0.5 text-xs font-medium text-deal">Best price</span>}</div><p className="text-sm text-muted-foreground">{o.shipping}</p></div><div className="font-display text-xl font-semibold">{formatPrice(o.price)}</div><Button asChild variant={i===0?"default":"outline"} className="rounded-full"><a href={o.affiliateUrl} target="_blank" rel="nofollow sponsored noopener noreferrer">View deal <ExternalLink className="size-4" /></a></Button></div>)}</div><p className="mt-3 text-xs text-muted-foreground">Affiliate disclosure: JHAVEN may earn a commission from qualifying purchases at no extra cost to you. Demo links currently point to retailer homepages.</p></section>
      {related.length > 0 && <section className="mt-14"><h2 className="mb-5 font-display text-2xl font-semibold">Similar products</h2><ProductGrid products={related} /></section>}
    </div>
  )
}
