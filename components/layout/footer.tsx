import Link from "next/link"
import { Zap } from "lucide-react"

// import { Zap, Twitter, Instagram, Facebook, Youtube } from "lucide-react"
import { categories } from "@/data/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const shopLinks = categories.slice(0, 6)

const help = [
  { label: "How JHAVEN works", href: "/products" },
  { label: "Price alerts", href: "/products?deals=true" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Compare", href: "/compare" },
]

const company = [
  { label: "About", href: "/" },
  { label: "Affiliate disclosure", href: "/" },
  { label: "Privacy", href: "/" },
  { label: "Terms", href: "/" },
]

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-1.5 font-display text-2xl font-bold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                J
              </span>
              <span className="text-gradient-brand">HAVEN</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              JHAVEN is a product discovery prototype built to compare affiliate offers across multiple stores. Demo prices can later be replaced with live affiliate feeds.
            </p>
            <form className="mt-5 flex max-w-sm gap-2">
              <Input type="email" placeholder="Email for price drops" aria-label="Email" className="h-10" />
              <Button type="submit" className="h-10 shrink-0 gap-1.5">
                <Zap className="size-4" /> Notify me
              </Button>
            </form>
          </div>

          <FooterCol title="Shop">
            {shopLinks.map((c) => (
              <FooterLink key={c.id} href={`/products?category=${c.id}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Help">
            {help.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            {company.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JHAVEN. Demo prices and availability are illustrative. Live retailer data can be connected later.
          </p>
          <div className="flex items-center gap-1">
            {/* {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
              <Button key={i} variant="ghost" size="icon" className="rounded-full" aria-label="Social link">
                <Icon className="size-4" />
              </Button>
            ))} */}       
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-brand">
        {children}
      </Link>
    </li>
  )
}
