"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { categories } from "@/data/categories"
import { CategoryIcon } from "@/components/category-icon"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="left" className="w-[88%] max-w-sm p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display text-xl">
            <span className="text-gradient-brand">JHAVEN</span>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-2 py-3">
          <div className="grid grid-cols-2 gap-2 px-2 pb-3">
            <Link
              href="/products?deals=true"
              onClick={close}
              className="rounded-xl bg-deal/15 px-3 py-2 text-sm font-medium text-foreground"
            >
              Today&apos;s Deals
            </Link>
            <Link
              href="/products"
              onClick={close}
              className="rounded-xl bg-brand/10 px-3 py-2 text-sm font-medium text-foreground"
            >
              All Products
            </Link>
          </div>
          <Accordion>
            {categories.map((cat) => (
              <AccordionItem key={cat.id} value={cat.id}>
                <AccordionTrigger className="px-2">
                  <span className="flex items-center gap-2.5 text-left">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <CategoryIcon name={cat.icon} className="size-4" />
                    </span>
                    {cat.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-11">
                  <ul className="space-y-1 pb-1">
                    <li>
                      <Link
                        href={`/products?category=${cat.id}`}
                        onClick={close}
                        className="block py-1 text-sm font-medium text-brand"
                      >
                        View all
                      </Link>
                    </li>
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/products?category=${cat.id}&subcategory=${sub.id}`}
                          onClick={close}
                          className="block py-1 text-sm text-muted-foreground"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}
