import type { Category } from "@/lib/types"

// Single source of truth for the JHAVEN category system.
// Add, remove, rename, or reorder categories/subcategories here and the
// entire navigation + listing system updates automatically.

const sub = (names: string[]) =>
  names.map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
  }))

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "Smartphone",
    description: "Cutting-edge devices and gadgets",
    subcategories: sub([
      "Smartphones",
      "Laptops",
      "Tablets",
      "Smartwatches",
      "Cameras",
      "Headphones",
      "Gaming",
      "Accessories",
    ]),
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    description: "Style for every occasion",
    subcategories: sub(["Men", "Women", "Kids", "Shoes", "Watches", "Bags", "Jewelry"]),
  },
  {
    id: "home-living",
    name: "Home & Living",
    icon: "Sofa",
    description: "Elevate your space",
    subcategories: sub(["Furniture", "Décor", "Lighting", "Kitchen", "Bedding", "Bathroom", "Garden"]),
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "Sparkles",
    description: "Look and feel your best",
    subcategories: sub(["Skincare", "Haircare", "Makeup", "Fragrances", "Grooming"]),
  },
  {
    id: "sports-fitness",
    name: "Sports & Fitness",
    icon: "Dumbbell",
    description: "Gear up and perform",
    subcategories: sub([
      "Gym Equipment",
      "Sportswear",
      "Running",
      "Cycling",
      "Cricket",
      "Football",
      "Outdoor",
    ]),
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: "Gamepad2",
    description: "Level up your setup",
    subcategories: sub([
      "Consoles",
      "Gaming PCs",
      "Controllers",
      "Headsets",
      "Keyboards",
      "Mice",
      "Chairs",
    ]),
  },
  {
    id: "kids-toys",
    name: "Kids & Toys",
    icon: "ToyBrick",
    description: "Fun and learning for little ones",
    subcategories: sub([
      "Toys",
      "Educational Toys",
      "Baby Products",
      "Kids Fashion",
      "School Supplies",
    ]),
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "Car",
    description: "For your ride",
    subcategories: sub([
      "Car Accessories",
      "Motorcycle Accessories",
      "Electronics",
      "Cleaning",
      "Tools",
    ]),
  },
  {
    id: "pet-supplies",
    name: "Pet Supplies",
    icon: "PawPrint",
    description: "Everything for your companions",
    subcategories: sub(["Dogs", "Cats", "Food", "Toys", "Beds", "Grooming"]),
  },
  {
    id: "books-stationery",
    name: "Books & Stationery",
    icon: "BookOpen",
    description: "Read, write, create",
    subcategories: sub(["Books", "Notebooks", "Office Supplies", "Art Supplies", "School Supplies"]),
  },
  {
    id: "tools-diy",
    name: "Tools & DIY",
    icon: "Wrench",
    description: "Build and repair",
    subcategories: sub(["Hand Tools", "Power Tools", "Hardware", "Electrical", "Plumbing"]),
  },
  {
    id: "gifts-lifestyle",
    name: "Gifts & Lifestyle",
    icon: "Gift",
    description: "Thoughtful finds",
    subcategories: sub([
      "Gifts for Him",
      "Gifts for Her",
      "Personalized Gifts",
      "Travel Accessories",
      "Collectibles",
    ]),
  },
]

export const getCategory = (id: string) => categories.find((c) => c.id === id)

export const getCategoryName = (id: string) => getCategory(id)?.name ?? id
