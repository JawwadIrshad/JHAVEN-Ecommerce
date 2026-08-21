"use client"

import Image from "next/image"
import { Rotate3D, ZoomIn } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/types"

export function ProductViewer({ product }: { product: Product }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/30 p-4 sm:p-7">
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-background/50 perspective-1000"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setTilt({ x: ((e.clientY - r.top) / r.height - .5) * -8, y: ((e.clientX - r.left) / r.width - .5) * 8 })
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="absolute inset-0 transition-transform duration-150 preserve-3d" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill priority className="object-contain p-6 drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 px-3 py-1 text-xs backdrop-blur"><Rotate3D className="size-3.5" /> Interactive view</span>
          <span className="hidden items-center gap-1 rounded-full border border-border bg-card/80 px-3 py-1 text-xs backdrop-blur sm:inline-flex"><ZoomIn className="size-3.5" /> 3D-ready</span>
        </div>
      </div>
      {!product.model3D && <p className="mt-3 text-center text-xs text-muted-foreground">Image-based 3D/parallax fallback. Add a GLB/GLTF model later through product data.</p>}
    </div>
  )
}
