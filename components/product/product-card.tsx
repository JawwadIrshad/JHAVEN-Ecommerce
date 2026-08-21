"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, GitCompareArrows, ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import type { Product } from "@/lib/types"
import { lowestOffer } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RatingStars } from "@/components/product/rating-stars"
import { useStore } from "@/components/providers/store-provider"

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isWished, toggleWish, isCompared, toggleCompare } = useStore()
  const offer = lowestOffer(product)
  const wished = isWished(product.id)
  const compared = isCompared(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <Badge className="bg-deal text-deal-foreground border-transparent font-semibold">
              -{product.discount}%
            </Badge>
          )}
          {product.bestSeller && (
            <Badge variant="secondary" className="font-medium">
              Best Seller
            </Badge>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full shadow-sm"
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => toggleWish(product.id)}
          >
            <Heart className={cn("size-4", wished && "fill-deal text-deal")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="size-9 rounded-full shadow-sm"
            aria-pressed={compared}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            onClick={() => toggleCompare(product.id)}
          >
            <GitCompareArrows className={cn("size-4", compared && "text-brand")} />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 font-medium leading-snug text-foreground transition-colors hover:text-brand"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} size={13} />
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-foreground">{formatPrice(offer.price)}</span>
              {product.originalPrice > offer.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              at {offer.store} · {product.offers.length} stores
            </p>
          </div>
        </div>

        <Button asChild size="sm" className="mt-2 w-full gap-1.5">
          <Link href={`/product/${product.slug}`}>
            View Deal
            <ExternalLink className="size-3.5" />
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}
