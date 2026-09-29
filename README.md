# Keytone Life Sciences — Website Redesign

A complete, modern React.js frontend for [Keytone Life Sciences](https://keytonelifesciences.com) — a premium aquaculture feed supplement manufacturer based in Hyderabad, India.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
# http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling & design tokens |
| React Hook Form | Form state management |
| Zod | Form schema validation |
| Lucide React | Icon system |
| react-intersection-observer | Scroll-triggered animations |
| react-helmet-async | Per-page SEO meta tags |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         Navbar, Footer, Layout wrapper
│   ├── ui/             Button, Badge, SectionHeader, Breadcrumb, Accordion, Tabs, Toast
│   ├── sections/       HeroSection, StatsStrip, TrustBar, TestimonialsCarousel,
│   │                   CertificationsStrip, CTABanner
│   ├── products/       ProductCard, CategoryCard
│   ├── blog/           BlogCard
│   └── forms/          ContactForm, EnquiryForm, ApplicationForm
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── RDPage.jsx
│   ├── QualityControlPage.jsx
│   ├── CertificationsPage.jsx
│   ├── ExportsPage.jsx
│   ├── ProductsPage.jsx
│   ├── CategoryPage.jsx          (dynamic: /products/:categorySlug)
│   ├── ProductDetailPage.jsx     (dynamic: /products/:categorySlug/:productSlug)
│   ├── BlogPage.jsx
│   ├── BlogDetailPage.jsx        (dynamic: /blog/:slug)
│   ├── CareersPage.jsx
│   ├── ContactPage.jsx
│   ├── PrivacyPolicyPage.jsx
│   └── NotFoundPage.jsx
├── data/               Static data: products, categories, blog posts, testimonials, certifications
├── hooks/              useScrollAnimation, useCounter, useMediaQuery
├── styles/             globals.css (Tailwind + design tokens)
├── utils/              cn(), formatDate(), readingTime()
├── App.jsx             Router setup, code splitting
└── main.jsx            React DOM entry point
```

---

## 🗺 Route Map

| Route | Page |
|---|---|
| `/` | Home |
| `/about-us` | About Us |
| `/research-development` | R&D |
| `/r-and-d` | R&D (legacy redirect) |
| `/quality-control` | Quality Control |
| `/certifications` | Certifications |
| `/exports` | Exports & Distributors |
| `/products` | Products Hub |
| `/products/:categorySlug` | Product Category |
| `/products/:categorySlug/:productSlug` | Product Detail |
| `/blog` | Blog |
| `/blog/:slug` | Blog Article |
| `/careers` | Careers |
| `/contact-us` | Contact Us |
| `/privacy-policy` | Privacy Policy |
| `*` | 404 Not Found |

---

## 🎨 Design System

### Brand Colors

```
Ocean Blue   #0B3D91   — primary CTAs, headings
Aqua Teal    #0EA5C4   — accents, icons, links
Deep Navy    #061D4A   — footer, dark sections
Seafoam      #22C55E   — success states
Gold         #F59E0B   — certifications, premium badges
```

### Typography

- **Display / Headings:** Outfit (Google Fonts) — ExtraBold 800, Bold 700
- **Body / UI:** Inter (Google Fonts) — Regular 400, Medium 500, SemiBold 600

### Tailwind Custom Tokens

All brand colors, gradients, shadows, and typography are configured in `tailwind.config.js` under `theme.extend`.

---

## 📦 Data Layer

All content is currently in static JS files under `src/data/`. When connecting to a CMS or API:

| File | Replace with |
|---|---|
| `src/data/products.js` | API: `/api/products` or Contentful/Sanity |
| `src/data/blogPosts.js` | API: `/api/blog` or headless CMS |
| `src/data/testimonials.js` | API or CMS |
| `src/data/certifications.js` | Static (rarely changes) |

Form submissions (`ContactForm`, `EnquiryForm`, `ApplicationForm`) currently simulate an API call with `setTimeout`. Connect to your backend by replacing the `onSubmit` handlers.

---

## 🧩 Adding a New Product

1. Add the product object to `src/data/products.js` in the `PRODUCTS` array
2. Ensure `categoryId` matches an existing category's `id`
3. Set `featured: true` to show it on the Home page featured section
4. The product will automatically appear in the category page and product detail page

---

## 🌍 Adding a New Export Market

Add an entry to the `EXPORT_MARKETS` array in `src/data/certifications.js`:

```js
{ country: 'New Country', flag: '🏳️', region: 'Region Name', active: true }
```

---

## 📱 Responsive Breakpoints

| Prefix | Min Width | Device |
|---|---|---|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large mobile |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

---

## ✅ Phase 2 Recommendations

- [ ] Connect to a headless CMS (Contentful / Sanity) for blog and products
- [ ] Integrate Google Analytics 4 and Meta Pixel
- [ ] Add Schema.org JSON-LD markup (Organization, Product, Article)
- [ ] Implement proper Google Maps embed on Contact page
- [ ] Add product comparison feature within categories
- [ ] Add sitemap.xml generation (vite-plugin-sitemap)
- [ ] Implement i18n for multi-language support (Arabic, Vietnamese, etc.)
- [ ] Replace form simulation with actual backend / email service (EmailJS, SendGrid)

---

## 📞 Support

**Keytone Life Sciences Pvt. Ltd.**  
Hyderabad, Telangana, India  
Phone: +91 9959 002 666  
Email: info@keytonelifesciences.com  
Website: https://keytonelifesciences.com
