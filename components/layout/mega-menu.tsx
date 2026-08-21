"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { categories } from "@/data/categories"
import { CategoryIcon } from "@/components/category-icon"

export function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="grid w-[min(90vw,64rem)] grid-cols-2 gap-1 p-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-xl p-3 transition-colors hover:bg-accent/60">
          <Link
            href={`/products?category=${cat.id}`}
            onClick={onNavigate}
            className="flex items-center gap-2 font-medium text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <CategoryIcon name={cat.icon} className="size-4" />
            </span>
            {cat.name}
          </Link>
          <ul className="mt-2 space-y-0.5 pl-10">
            {cat.subcategories.slice(0, 5).map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/products?category=${cat.id}&subcategory=${sub.id}`}
                  onClick={onNavigate}
                  className="block py-0.5 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  )
}
