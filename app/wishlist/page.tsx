"use client"
import Link from "next/link"
import { Heart } from "lucide-react"
import { products } from "@/data/products"
import { ProductGrid } from "@/components/product/product-grid"
import { useStore } from "@/components/providers/store-provider"
import { Button } from "@/components/ui/button"
export default function WishlistPage(){ const { wishlist, ready }=useStore(); const items=ready?products.filter(p=>wishlist.includes(p.id)):[]; return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><h1 className="font-display text-3xl font-bold">Your wishlist</h1><p className="mt-2 mb-7 text-muted-foreground">Products you save stay in this browser.</p>{items.length?<ProductGrid products={items}/>:<div className="rounded-3xl border border-dashed border-border p-12 text-center"><Heart className="mx-auto size-9 text-muted-foreground"/><h2 className="mt-4 font-display text-xl font-semibold">Your wishlist is empty</h2><Button asChild className="mt-5 rounded-full"><Link href="/products">Explore products</Link></Button></div>}</div>}
