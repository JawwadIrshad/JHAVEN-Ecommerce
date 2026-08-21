import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function RatingStars({
  rating,
  size = 14,
  className,
}: {
  rating: number
  size?: number
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            <Star
              className="absolute inset-0 text-muted-foreground/40"
              style={{ width: size, height: size }}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="text-deal fill-deal"
                style={{ width: size, height: size }}
              />
            </span>
          </span>
        )
      })}
    </span>
  )
}
