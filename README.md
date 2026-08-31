# JHAVEN

### Discover Smarter. Compare Better. Shop Anywhere.

JHAVEN is a modern, AI-ready **affiliate e-commerce marketplace** designed to make product discovery, comparison, and shopping more interactive.

Instead of operating as a traditional online store, JHAVEN brings products and offers from multiple marketplaces into one discovery experience. Users can explore products, compare specifications and prices, receive intelligent shopping assistance, and continue their purchase through external affiliate retailers.

> **Status:** Active Development / Prototype

----

## ✨ Overview

Online shoppers often move between multiple marketplaces to compare products, specifications, prices, and deals.

**JHAVEN is designed to simplify that journey.**

The platform provides a centralized shopping experience where users can:

- Discover products across multiple categories
- Explore detailed product information
- Compare specifications and offers
- Search and filter products
- Save products to a wishlist
- Compare multiple products
- Interact with an AI Shopping Assistant
- Explore supported products through interactive 3D experiences
- Continue purchases through external affiliate retailers

JHAVEN is built with scalability in mind so the current demo catalog can later be replaced with real affiliate APIs, product feeds, databases, and AI services.

---

## 🚀 Key Features

### 🛍️ Scalable Product Marketplace

JHAVEN supports a reusable product architecture designed for large catalogs.

Current categories include:

- Electronics
- Fashion
- Home & Living
- Beauty & Personal Care
- Sports & Fitness
- Gaming
- Kids & Toys
- Automotive
- Pet Supplies
- Books & Stationery
- Tools & DIY
- Gifts & Lifestyle

Categories, subcategories, products, specifications, images, and affiliate offers can be expanded without redesigning the application.

---

### 🧊 Interactive Product Experience

Product pages are designed as modern digital showrooms rather than basic product listings.

Depending on available product assets, JHAVEN can support:

- Interactive product presentation
- 360° product rotation
- Mouse and touch interaction
- Zoom controls
- Auto rotation
- `.glb` / `.gltf` 3D models
- Image-based interactive fallback
- Product galleries
- Specifications
- Features
- Ratings
- Related products

The architecture is designed so products without 3D models still have a polished visual experience.

---

### 🤖 JHAVEN AI Shopping Assistant

JHAVEN includes an AI-ready shopping assistant interface designed to help users with questions such as:

> "What is the best laptop for programming?"

> "Show me gaming headphones under $100."

> "Compare these two smartphones."

> "Which product has better specifications?"

> "Show me a cheaper alternative."

The current prototype can operate with local/demo responses without requiring a paid AI provider.

The AI layer is intentionally separated from the chat interface so it can later integrate with services such as:

- OpenAI
- Google Gemini
- Groq
- Anthropic
- Custom AI/LLM APIs

This allows the AI provider to change without rebuilding the shopping interface.

---

### 🔎 Search & Product Discovery

The marketplace architecture supports product discovery through:

- Keyword search
- Categories
- Subcategories
- Brands
- Price ranges
- Ratings
- Discounts
- Affiliate stores
- Sorting and filtering

The frontend is structured so these capabilities can later operate against much larger server-side product catalogs.

---

### ⚖️ Product Comparison

Users can compare selected products across information such as:

- Price
- Brand
- Rating
- Key specifications
- Product features
- Available retailer offers

This helps users make purchasing decisions without repeatedly switching between product pages.

---

### ❤️ Wishlist

Products can be saved to a lightweight wishlist for later review.

The prototype uses client-side state and can later be migrated to persistent user accounts and database storage.

---

### 🔗 Affiliate Marketplace Architecture

JHAVEN does **not** process product payments internally.

The intended purchasing flow is:

```text
User
  ↓
JHAVEN
  ↓
Discover Product
  ↓
Compare Specifications & Offers
  ↓
Select Retailer
  ↓
Affiliate Link
  ↓
External Marketplace
  ↓
Purchase
```

A product can contain offers from multiple affiliate partners, making the architecture suitable for marketplaces such as Amazon, AliExpress, Daraz, eBay, and other supported affiliate programs.

Actual affiliate integrations are subject to each retailer/network's program availability, terms, API access, and regional eligibility.

---

## 🧩 Product Architecture

Demo products are intentionally separated from presentation components.

A product can follow a structure similar to:

```ts
{
  id: "product-id",
  slug: "product-slug",
  name: "Product Name",
  brand: "Brand",
  category: "Electronics",
  subcategory: "Laptops",

  price: 999,
  originalPrice: 1199,

  rating: 4.8,
  reviewCount: 1250,

  description: "...",

  images: [],
  model3D: null,

  specifications: {},
  features: [],

  offers: [
    {
      store: "Retailer",
      price: 999,
      affiliateUrl: "AFFILIATE_URL"
    }
  ]
}
```

This makes demo products easy to:

- Add
- Edit
- Remove
- Replace
- Import from another source

without rebuilding the user interface.

---

## 🔌 Designed for Future Integrations

The current demo data layer can eventually be replaced by:

```text
Local Demo Data
       ↓
Product Service / Data Layer
       ↓
────────────────────────────
│ REST API                 │
│ Affiliate API            │
│ Product Feed             │
│ PostgreSQL               │
│ JSON / CSV               │
│ Custom Backend           │
────────────────────────────
       ↓
JHAVEN UI
```

The same principle is used for AI integrations.

```text
AI Chat Interface
       ↓
AI Service Layer
       ↓
OpenAI / Gemini / Groq / Anthropic / Custom API
```

---

## 📱 Responsive Experience

JHAVEN is designed for:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📲 Mobile

The interface adapts navigation, product grids, filters, product presentation, and AI chat interactions according to available screen space.

Mobile experiences prioritize touch interaction and lightweight animations.

---

## ⚡ Performance Strategy

Because JHAVEN is intended to eventually support a much larger catalog, performance is considered from the beginning.

The architecture supports:

- Next.js image optimization
- Lazy-loaded assets
- Dynamic imports
- Lazy-loaded 3D components
- Loading states and skeletons
- Reusable UI components
- Lightweight mobile animations
- Reduced-motion accessibility
- Conditional loading of expensive 3D functionality

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Application framework |
| **React** | Component architecture |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Responsive styling |
| **Framer Motion** | UI animations |
| **Three.js** | 3D rendering |
| **React Three Fiber** | React-based 3D experiences |
| **Lucide** | Interface icons |

---

## 🏗️ Architecture

```text
JHAVEN
│
├── app/
│   ├── products/
│   ├── product/
│   ├── wishlist/
│   └── compare/
│
├── components/
│   ├── ai/
│   ├── layout/
│   ├── products/
│   └── ui/
│
├── data/
│   ├── products
│   └── categories
│
├── services/
│   └── AI / integration services
│
└── public/
    ├── images/
    └── 3D assets
```

> The exact directory structure may evolve as development continues.

---

## 💻 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Enter the project

```bash
cd jhaven
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
```

Then:

```bash
npm start
```

---

## 🧪 Demo Data

The current products, prices, ratings, retailer offers, reviews, and other marketplace information may contain **sample/demo data used for development and UI demonstration**.

They should not be interpreted as live retailer pricing or availability.

This makes it possible to demonstrate JHAVEN without requiring production affiliate integrations during early development.

---

## 🗺️ Roadmap

### Phase 1 — Marketplace Foundation

- [x] Responsive marketplace interface
- [x] Category architecture
- [x] Reusable product system
- [x] Product detail experience
- [x] Search/filter foundation
- [x] Wishlist
- [x] Product comparison
- [x] AI Assistant interface
- [x] Affiliate offer architecture

### Phase 2 — Real Data

- [ ] Database integration
- [ ] Affiliate product feeds
- [ ] Live product pricing
- [ ] Product availability synchronization
- [ ] Server-side search
- [ ] Large catalog optimization

### Phase 3 — Intelligence

- [ ] Production AI provider integration
- [ ] Catalog-aware AI recommendations
- [ ] Natural-language product search
- [ ] AI-assisted comparisons
- [ ] Personalized recommendations

### Phase 4 — Scale

- [ ] User accounts
- [ ] Persistent wishlists
- [ ] Price tracking
- [ ] Price-drop notifications
- [ ] Product recommendation engine
- [ ] Analytics
- [ ] SEO expansion

---

## 🔐 Security & Production Considerations

Production API credentials must never be exposed in client-side code.

Future affiliate and AI integrations should use secure server-side API routes and environment variables.

Example:

```env
AI_API_KEY=your_server_side_key
```

`.env` files containing credentials should never be committed to the repository.

---

## 🤝 Contributing

JHAVEN is currently under active development.

Contributions, suggestions, bug reports, and architectural improvements are welcome.

If contributing:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the application
5. Submit a pull request

---

## ⚖️ Affiliate Disclosure

Some links on JHAVEN may be affiliate links.

JHAVEN may earn a commission when a user purchases through an eligible affiliate link, at no additional cost to the customer.

Affiliate relationships, commissions, product availability, and tracking are governed by the respective affiliate networks and retailers.

---

## 📄 License

Add the appropriate project license before production or public distribution.

---

## 🌟 Vision

JHAVEN is being developed around a simple idea:

> **Product discovery should be intelligent, visual, and effortless.**

The long-term vision is to combine **e-commerce discovery, product comparison, interactive 3D experiences, affiliate marketplaces, and AI-assisted shopping** into a single scalable platform.

---

<p align="center">
  <strong>JHAVEN</strong><br/>
  Discover Smarter • Compare Better • Shop Anywhere
</p>
