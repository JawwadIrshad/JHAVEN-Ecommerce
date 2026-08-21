import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BadgePercent, Boxes, ShieldCheck, Sparkles } from "lucide-react"
import { categories } from "@/data/categories"
import { getDeals, getFeatured, getNewArrivals, getTrending } from "@/data/products"
import { CategoryIcon } from "@/components/category-icon"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"

export default function Page() {
  const featured = getFeatured().slice(0, 8)
  const trending = getTrending().slice(0, 8)
  const deals = getDeals().slice(0, 4)
  const latest = getNewArrivals().slice(0, 4)
  const hero = featured[0]

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border bg-gradient-to-b from-brand/10 via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm text-brand">
              <Sparkles className="size-4" /> Smarter product discovery
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find the right product. <span className="text-gradient-brand">Compare the best deal.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              JHAVEN brings products, specifications and affiliate offers into one clean marketplace so you can compare before you buy.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/products">Explore products <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/products?deals=true">View today&apos;s deals</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-border bg-card/70 p-3"><Boxes className="mb-2 size-5 text-brand" /><b>{categories.length}</b><p className="text-muted-foreground">Categories</p></div>
              <div className="rounded-2xl border border-border bg-card/70 p-3"><BadgePercent className="mb-2 size-5 text-deal" /><b>Multi-store</b><p className="text-muted-foreground">Offers</p></div>
              <div className="rounded-2xl border border-border bg-card/70 p-3"><ShieldCheck className="mb-2 size-5 text-brand" /><b>External</b><p className="text-muted-foreground">Checkout</p></div>
            </div>
          </div>
          {hero && (
            <div className="relative mx-auto aspect-square w-full max-w-lg perspective-1000">
              <div className="absolute inset-8 rounded-[3rem] bg-brand/15 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-8 shadow-2xl preserve-3d">
                <div className="relative h-[72%]">
                  <Image src={hero.images[0]} alt={hero.name} fill priority className="object-contain drop-shadow-2xl" />
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div><p className="text-sm text-muted-foreground">Featured today</p><h2 className="font-display text-xl font-semibold">{hero.name}</h2></div>
                  <Button asChild size="sm" className="rounded-full"><Link href={`/product/${hero.slug}`}>View</Link></Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionTitle title="Shop by category" href="/products" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`} className="group rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-brand/40">
              <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand"><CategoryIcon name={category.icon} className="size-5" /></span>
              <h3 className="font-display font-semibold">{category.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CatalogSection title="Featured products" products={featured} href="/products" />
      <CatalogSection title="Trending now" products={trending} href="/products" />
      <CatalogSection title="Best deals" products={deals} href="/products?deals=true" />
      <CatalogSection title="New arrivals" products={latest} href="/products?sort=newest" />
    </div>
  )
}

function SectionTitle({ title, href }: { title: string; href: string }) {
  return <div className="mb-6 flex items-center justify-between gap-4"><h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2><Button asChild variant="ghost" className="rounded-full"><Link href={href}>View all <ArrowRight className="size-4" /></Link></Button></div>
}

function CatalogSection({ title, products, href }: { title: string; products: ReturnType<typeof getFeatured>; href: string }) {
  return <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><SectionTitle title={title} href={href} /><ProductGrid products={products} /></section>
}
