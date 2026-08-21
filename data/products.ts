import type { Product } from "@/lib/types"

// DEMO products for JHAVEN.
// Everything the UI renders comes from this array. Add / edit / remove a
// product here (price, images, specs, category, affiliate offers) and the
// whole site updates. Later this can be replaced by an API/DB loader that
// returns the same Product[] shape.

const IMG = "/images/products"

// Small helper so `discount` stays in sync with prices.
const pct = (price: number, original: number) =>
  original > price ? Math.round(((original - price) / original) * 100) : 0

const raw: Array<Omit<Product, "discount">> = [
  {
    id: "1",
    slug: "aurora-pulse-x",
    name: "Aurora Pulse X",
    brand: "Nova",
    category: "electronics",
    subcategory: "smartphones",
    shortDescription: "6.7\" titanium flagship with a pro triple-camera system.",
    description:
      "The Aurora Pulse X pairs a lightweight titanium frame with a 6.7-inch LTPO display that adapts from 1Hz to 120Hz. A pro-grade triple camera captures stunning low-light shots, while the in-house Nova N3 chip keeps everything effortlessly fast all day.",
    price: 899,
    originalPrice: 1099,
    rating: 4.7,
    reviewCount: 2143,
    images: [`${IMG}/phone-aurora-pulse.png`],
    model3D: null,
    specifications: {
      Display: "6.7\" LTPO OLED, 120Hz",
      Chipset: "Nova N3 (3nm)",
      Camera: "50MP + 48MP + 12MP",
      Battery: "5000mAh, 65W charging",
      Storage: "256GB / 512GB",
      Water: "IP68",
    },
    features: ["Titanium frame", "Adaptive 120Hz display", "65W fast charging", "Pro camera system"],
    offers: [
      { store: "Amazon", price: 899, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 869, shipping: "$12 shipping", affiliateUrl: "https://www.aliexpress.com" },
      { store: "eBay", price: 915, shipping: "Free", affiliateUrl: "https://www.ebay.com" },
    ],
    featured: true,
    trending: true,
    bestSeller: true,
    newArrival: true,
    createdAt: "2025-08-01",
  },
  {
    id: "2",
    slug: "nimbus-pro-14",
    name: "Nimbus Pro 14",
    brand: "Vantage",
    category: "electronics",
    subcategory: "laptops",
    shortDescription: "Featherlight 14\" laptop built for creators and coders.",
    description:
      "At just 1.2kg, the Nimbus Pro 14 disappears into your bag but never compromises. A 14-inch 3K display, 18-hour battery, and a whisper-quiet cooling system make it ideal for programming, design, and everything between.",
    price: 1249,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 1287,
    images: [`${IMG}/laptop-nimbus-pro.png`],
    model3D: null,
    specifications: {
      Display: "14\" 3K IPS, 120Hz",
      CPU: "12-core, 4.6GHz",
      RAM: "16GB / 32GB LPDDR5",
      Storage: "512GB / 1TB SSD",
      Battery: "18 hours",
      Weight: "1.2kg",
    },
    features: ["3K 120Hz display", "18-hour battery", "1.2kg ultralight", "Backlit keyboard"],
    offers: [
      { store: "Amazon", price: 1249, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Best Buy", price: 1279, shipping: "Free", affiliateUrl: "https://www.bestbuy.com" },
      { store: "Newegg", price: 1239, shipping: "$9 shipping", affiliateUrl: "https://www.newegg.com" },
    ],
    featured: true,
    trending: true,
    bestSeller: true,
    createdAt: "2025-07-20",
  },
  {
    id: "3",
    slug: "halo-wireless-headphones",
    name: "Halo Wireless",
    brand: "Sonic",
    category: "electronics",
    subcategory: "headphones",
    shortDescription: "Adaptive noise-cancelling over-ear headphones, 40h battery.",
    description:
      "Halo Wireless wraps you in rich, spatial sound while adaptive noise cancellation tunes out the world. With 40 hours of battery and plush memory-foam cushions, they're built for long listening sessions.",
    price: 249,
    originalPrice: 349,
    rating: 4.6,
    reviewCount: 5321,
    images: [`${IMG}/headphones-halo.png`],
    model3D: null,
    specifications: {
      Type: "Over-ear, closed-back",
      ANC: "Adaptive hybrid",
      Battery: "40 hours",
      Bluetooth: "5.3, multipoint",
      Charging: "USB-C, fast charge",
      Weight: "255g",
    },
    features: ["Adaptive ANC", "40-hour battery", "Spatial audio", "Multipoint pairing"],
    offers: [
      { store: "Amazon", price: 249, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 229, shipping: "$8 shipping", affiliateUrl: "https://www.aliexpress.com" },
    ],
    featured: true,
    trending: true,
    bestSeller: true,
    createdAt: "2025-06-15",
  },
  {
    id: "4",
    slug: "orbit-smartwatch",
    name: "Orbit Smartwatch",
    brand: "Nova",
    category: "electronics",
    subcategory: "smartwatches",
    shortDescription: "AMOLED fitness smartwatch with 14-day battery.",
    description:
      "Track workouts, sleep, and stress on a crisp always-on AMOLED display. The Orbit lasts up to 14 days on a charge and pairs seamlessly with your phone for calls and notifications.",
    price: 179,
    originalPrice: 229,
    rating: 4.4,
    reviewCount: 3120,
    images: [`${IMG}/watch-orbit.png`],
    model3D: null,
    specifications: {
      Display: "1.4\" AMOLED, always-on",
      Battery: "14 days",
      Sensors: "HR, SpO2, GPS",
      Water: "5ATM",
      Sports: "100+ modes",
      Connectivity: "Bluetooth 5.2",
    },
    features: ["14-day battery", "Built-in GPS", "SpO2 & HR", "5ATM water resistance"],
    offers: [
      { store: "Amazon", price: 179, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Daraz", price: 175, currency: "USD", shipping: "PKR 49,900 · Free", affiliateUrl: "https://www.daraz.pk" },
      { store: "eBay", price: 189, shipping: "Free", affiliateUrl: "https://www.ebay.com" },
    ],
    trending: true,
    newArrival: true,
    createdAt: "2025-08-10",
  },
  {
    id: "5",
    slug: "lumen-mirrorless-camera",
    name: "Lumen Mirrorless",
    brand: "Lumen",
    category: "electronics",
    subcategory: "cameras",
    shortDescription: "33MP full-frame mirrorless camera with 4K60 video.",
    description:
      "The Lumen mirrorless delivers stunning 33MP stills and cinematic 4K60 video in a compact weather-sealed body. Fast hybrid autofocus locks onto subjects instantly, making it a go-anywhere creative tool.",
    price: 1399,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 842,
    images: [`${IMG}/camera-lumen.png`],
    model3D: null,
    specifications: {
      Sensor: "33MP full-frame",
      Video: "4K60, 10-bit",
      Autofocus: "693-point hybrid",
      Stabilization: "5-axis IBIS",
      Screen: "3\" vari-angle touch",
      Mount: "Lumen Z",
    },
    features: ["33MP full-frame sensor", "4K60 10-bit video", "5-axis stabilization", "Weather sealed"],
    offers: [
      { store: "Amazon", price: 1399, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "B&H Photo", price: 1379, shipping: "Free", affiliateUrl: "https://www.bhphotovideo.com" },
    ],
    featured: true,
    createdAt: "2025-05-30",
  },
  {
    id: "6",
    slug: "vortex-console",
    name: "Vortex Console",
    brand: "Vortex",
    category: "gaming",
    subcategory: "consoles",
    shortDescription: "4K120 next-gen console with ultra-fast SSD.",
    description:
      "Load games in seconds and play in stunning 4K at up to 120fps. The Vortex Console's custom GPU and lightning-fast SSD deliver immersive, lag-free gaming with ray tracing enabled.",
    price: 499,
    originalPrice: 549,
    rating: 4.8,
    reviewCount: 6742,
    images: [`${IMG}/console-vortex.png`],
    model3D: null,
    specifications: {
      Resolution: "Up to 4K120",
      Storage: "1TB NVMe SSD",
      GPU: "Custom RDNA, ray tracing",
      RAM: "16GB GDDR6",
      Output: "HDMI 2.1",
      Controller: "Included, haptics",
    },
    features: ["4K120 gaming", "Ray tracing", "1TB fast SSD", "Haptic controller"],
    offers: [
      { store: "Amazon", price: 499, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Walmart", price: 499, shipping: "Free", affiliateUrl: "https://www.walmart.com" },
      { store: "eBay", price: 519, shipping: "Free", affiliateUrl: "https://www.ebay.com" },
    ],
    featured: true,
    trending: true,
    bestSeller: true,
    createdAt: "2025-07-01",
  },
  {
    id: "7",
    slug: "raptor-gaming-headset",
    name: "Raptor Gaming Headset",
    brand: "Vortex",
    category: "gaming",
    subcategory: "headsets",
    shortDescription: "Low-latency wireless headset with 7.1 surround.",
    description:
      "Hear every footstep with immersive 7.1 surround sound and crystal-clear comms via the detachable noise-cancelling mic. Ultra-low-latency wireless keeps you in sync with the action.",
    price: 89,
    originalPrice: 129,
    rating: 4.3,
    reviewCount: 2890,
    images: [`${IMG}/headset-raptor.png`],
    model3D: null,
    specifications: {
      Audio: "7.1 virtual surround",
      Wireless: "2.4GHz, <20ms",
      Battery: "30 hours",
      Mic: "Detachable, noise-cancelling",
      Drivers: "50mm neodymium",
      Lighting: "RGB",
    },
    features: ["7.1 surround", "Sub-20ms wireless", "30-hour battery", "RGB lighting"],
    offers: [
      { store: "Amazon", price: 89, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 79, shipping: "$6 shipping", affiliateUrl: "https://www.aliexpress.com" },
    ],
    trending: true,
    newArrival: true,
    createdAt: "2025-08-05",
  },
  {
    id: "8",
    slug: "mecha-mechanical-keyboard",
    name: "Mecha 75",
    brand: "Keyist",
    category: "gaming",
    subcategory: "keyboards",
    shortDescription: "75% hot-swappable mechanical keyboard with RGB.",
    description:
      "The Mecha 75 brings a satisfying tactile typing experience in a compact 75% layout. Hot-swappable switches, a gasket-mounted aluminum body, and per-key RGB make it as customizable as it is premium.",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewCount: 1544,
    images: [`${IMG}/keyboard-mecha.png`],
    model3D: null,
    specifications: {
      Layout: "75% (84 keys)",
      Switches: "Hot-swappable",
      Body: "CNC aluminum, gasket",
      Connectivity: "USB-C / 2.4G / BT",
      Lighting: "Per-key RGB",
      Battery: "4000mAh",
    },
    features: ["Hot-swappable switches", "Gasket mount", "Triple connectivity", "Per-key RGB"],
    offers: [
      { store: "Amazon", price: 129, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 118, shipping: "$7 shipping", affiliateUrl: "https://www.aliexpress.com" },
    ],
    newArrival: true,
    createdAt: "2025-08-12",
  },
  {
    id: "9",
    slug: "stride-runner-sneakers",
    name: "Stride Runner",
    brand: "Kinetic",
    category: "fashion",
    subcategory: "shoes",
    shortDescription: "Responsive everyday running shoe with knit upper.",
    description:
      "Engineered for the daily miles, the Stride Runner combines a breathable knit upper with a springy foam midsole that returns energy with every step. Lightweight, secure, and built to go the distance.",
    price: 119,
    originalPrice: 149,
    rating: 4.5,
    reviewCount: 4023,
    images: [`${IMG}/sneakers-stride.png`],
    model3D: null,
    specifications: {
      Upper: "Engineered knit",
      Midsole: "Responsive foam",
      Drop: "8mm",
      Weight: "245g",
      Use: "Road running, everyday",
      Sizes: "US 6 – 13",
    },
    features: ["Energy-return foam", "Breathable knit", "Lightweight 245g", "Secure fit"],
    offers: [
      { store: "Amazon", price: 119, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "eBay", price: 109, shipping: "Free", affiliateUrl: "https://www.ebay.com" },
    ],
    trending: true,
    bestSeller: true,
    createdAt: "2025-06-25",
  },
  {
    id: "10",
    slug: "meridian-chronograph-watch",
    name: "Meridian Chronograph",
    brand: "Meridian",
    category: "fashion",
    subcategory: "watches",
    shortDescription: "Stainless steel chronograph with navy sunburst dial.",
    description:
      "A timeless chronograph with a navy sunburst dial, sapphire crystal, and a solid stainless steel bracelet. The Meridian dresses up or down and is water resistant to 100m.",
    price: 259,
    originalPrice: 329,
    rating: 4.6,
    reviewCount: 987,
    images: [`${IMG}/watch-meridian.png`],
    model3D: null,
    specifications: {
      Movement: "Japanese quartz chrono",
      Case: "42mm stainless steel",
      Crystal: "Sapphire",
      Water: "100m",
      Strap: "Steel bracelet",
      Warranty: "2 years",
    },
    features: ["Sapphire crystal", "100m water resistant", "Chronograph", "Steel bracelet"],
    offers: [
      { store: "Amazon", price: 259, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "eBay", price: 245, shipping: "Free", affiliateUrl: "https://www.ebay.com" },
    ],
    featured: true,
    createdAt: "2025-07-08",
  },
  {
    id: "11",
    slug: "voyage-travel-backpack",
    name: "Voyage Backpack",
    brand: "Wayfare",
    category: "fashion",
    subcategory: "bags",
    shortDescription: "Water-resistant 25L backpack with laptop sleeve.",
    description:
      "The Voyage carries your world comfortably. A padded 16-inch laptop sleeve, smart organization, and weather-resistant fabric make it the perfect companion for commutes and getaways alike.",
    price: 89,
    originalPrice: 119,
    rating: 4.5,
    reviewCount: 2210,
    images: [`${IMG}/backpack-voyage.png`],
    model3D: null,
    specifications: {
      Capacity: "25L",
      Laptop: "Fits up to 16\"",
      Material: "Water-resistant nylon",
      Pockets: "Hidden anti-theft",
      Weight: "0.9kg",
      Warranty: "Lifetime",
    },
    features: ["16\" laptop sleeve", "Water resistant", "Anti-theft pocket", "Lifetime warranty"],
    offers: [
      { store: "Amazon", price: 89, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 79, shipping: "$9 shipping", affiliateUrl: "https://www.aliexpress.com" },
    ],
    newArrival: true,
    createdAt: "2025-08-14",
  },
  {
    id: "12",
    slug: "halo-smart-lamp",
    name: "Halo Smart Lamp",
    brand: "Lumen",
    category: "home-living",
    subcategory: "lighting",
    shortDescription: "App-controlled desk lamp with adaptive warm-to-cool light.",
    description:
      "The Halo Smart Lamp adapts its color temperature to the time of day and your tasks. Control brightness and scenes from your phone or voice assistant, and reduce eye strain with flicker-free light.",
    price: 69,
    originalPrice: 99,
    rating: 4.4,
    reviewCount: 1330,
    images: [`${IMG}/lamp-halo.png`],
    model3D: null,
    specifications: {
      Light: "Warm 2700K – Cool 6500K",
      Control: "App + voice",
      Brightness: "1000 lumens",
      Modes: "Read / Focus / Relax",
      Power: "USB-C",
      Finish: "Anodized aluminum",
    },
    features: ["Adaptive color temp", "App & voice control", "Flicker-free", "USB-C powered"],
    offers: [
      { store: "Amazon", price: 69, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "AliExpress", price: 59, shipping: "$5 shipping", affiliateUrl: "https://www.aliexpress.com" },
    ],
    createdAt: "2025-06-05",
  },
  {
    id: "13",
    slug: "ember-eau-de-parfum",
    name: "Ember Eau de Parfum",
    brand: "Maison Ember",
    category: "beauty",
    subcategory: "fragrances",
    shortDescription: "Warm amber and vanilla unisex fragrance, 100ml.",
    description:
      "Ember opens with bright bergamot before settling into a warm heart of amber, vanilla, and sandalwood. A long-lasting, elegant scent designed to be worn day or night.",
    price: 95,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 1876,
    images: [`${IMG}/perfume-ember.png`],
    model3D: null,
    specifications: {
      Size: "100ml",
      Family: "Amber / Oriental",
      Top: "Bergamot",
      Heart: "Amber, jasmine",
      Base: "Vanilla, sandalwood",
      Longevity: "8+ hours",
    },
    features: ["Long-lasting", "Unisex", "Amber & vanilla", "100ml bottle"],
    offers: [
      { store: "Amazon", price: 95, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Sephora", price: 98, shipping: "Free", affiliateUrl: "https://www.sephora.com" },
    ],
    trending: true,
    createdAt: "2025-07-15",
  },
  {
    id: "14",
    slug: "flux-adjustable-dumbbells",
    name: "Flux Adjustable Dumbbells",
    brand: "Kinetic",
    category: "sports-fitness",
    subcategory: "gym-equipment",
    shortDescription: "5–52.5 lb dial-adjustable dumbbell (single).",
    description:
      "Replace a rack of weights with one compact dumbbell. Turn the dial to switch between 5 and 52.5 lbs in seconds, so you can move fast between exercises and save space at home.",
    price: 329,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 2456,
    images: [`${IMG}/dumbbells-flux.png`],
    model3D: null,
    specifications: {
      Range: "5 – 52.5 lb",
      Increments: "2.5 lb steps",
      Mechanism: "Dial adjust",
      Cradle: "Included",
      Sold: "Single dumbbell",
      Warranty: "3 years",
    },
    features: ["5–52.5 lb range", "Fast dial adjust", "Space saving", "Storage cradle"],
    offers: [
      { store: "Amazon", price: 329, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Walmart", price: 339, shipping: "Free", affiliateUrl: "https://www.walmart.com" },
    ],
    bestSeller: true,
    createdAt: "2025-05-20",
  },
  {
    id: "15",
    slug: "brew-espresso-machine",
    name: "Brew Espresso Machine",
    brand: "Roast",
    category: "home-living",
    subcategory: "kitchen",
    shortDescription: "15-bar espresso machine with steam wand.",
    description:
      "Pull café-quality espresso at home with a 15-bar pump, precise temperature control, and a professional steam wand for silky microfoam. Stainless steel build that looks great on any counter.",
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    reviewCount: 1689,
    images: [`${IMG}/espresso-brew.png`],
    model3D: null,
    specifications: {
      Pressure: "15 bar",
      Boiler: "Stainless steel",
      Steam: "Pro steam wand",
      Tank: "1.8L removable",
      Control: "PID temperature",
      Finish: "Brushed steel",
    },
    features: ["15-bar pressure", "Pro steam wand", "PID temperature", "Stainless steel"],
    offers: [
      { store: "Amazon", price: 349, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Best Buy", price: 359, shipping: "Free", affiliateUrl: "https://www.bestbuy.com" },
    ],
    featured: true,
    createdAt: "2025-06-30",
  },
  {
    id: "16",
    slug: "slate-creator-tablet",
    name: "Slate Creator Tablet",
    brand: "Vantage",
    category: "electronics",
    subcategory: "tablets",
    shortDescription: "11\" tablet with stylus support for artists and note-takers.",
    description:
      "The Slate Creator turns ideas into art with a laminated 11-inch 120Hz display and low-latency stylus. Powerful enough for creative apps and light enough to carry everywhere.",
    price: 549,
    originalPrice: 649,
    rating: 4.5,
    reviewCount: 1102,
    images: [`${IMG}/tablet-slate.png`],
    model3D: null,
    specifications: {
      Display: "11\" 120Hz laminated",
      Stylus: "Low-latency, tilt",
      Storage: "128GB / 256GB",
      Battery: "12 hours",
      Speakers: "Quad stereo",
      Ports: "USB-C",
    },
    features: ["120Hz laminated display", "Stylus with tilt", "Quad speakers", "12-hour battery"],
    offers: [
      { store: "Amazon", price: 549, shipping: "Free 2-day", affiliateUrl: "https://www.amazon.com" },
      { store: "Best Buy", price: 569, shipping: "Free", affiliateUrl: "https://www.bestbuy.com" },
    ],
    newArrival: true,
    createdAt: "2025-08-16",
  },
]

export const products: Product[] = raw.map((p) => ({
  ...p,
  discount: pct(p.price, p.originalPrice),
}))

// ---- Query helpers (kept UI-agnostic) ----------------------------------

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)

export const getProductById = (id: string) => products.find((p) => p.id === id)

export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId)

export const getFeatured = () => products.filter((p) => p.featured)
export const getTrending = () => products.filter((p) => p.trending)
export const getBestSellers = () => products.filter((p) => p.bestSeller)
export const getNewArrivals = () =>
  [...products]
    .filter((p) => p.newArrival)
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))

export const getDeals = () =>
  [...products].filter((p) => p.discount > 0).sort((a, b) => b.discount - a.discount)

export const getRelated = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)

export const getBrands = () =>
  Array.from(new Set(products.map((p) => p.brand))).sort()

export const getStores = () =>
  Array.from(new Set(products.flatMap((p) => p.offers.map((o) => o.store)))).sort()

export const lowestOffer = (product: Product) =>
  product.offers.reduce((min, o) => (o.price < min.price ? o : min), product.offers[0])
