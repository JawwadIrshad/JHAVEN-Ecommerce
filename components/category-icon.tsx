import {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  Gamepad2,
  ToyBrick,
  Car,
  PawPrint,
  BookOpen,
  Wrench,
  Gift,
  Package,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  Gamepad2,
  ToyBrick,
  Car,
  PawPrint,
  BookOpen,
  Wrench,
  Gift,
}

export function CategoryIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Package
  return <Icon className={className} aria-hidden="true" />
}
