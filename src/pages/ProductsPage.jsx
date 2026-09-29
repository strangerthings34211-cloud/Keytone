import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import CategoryCard from '@/components/products/CategoryCard'
import { CATEGORIES, PRODUCTS } from '@/data/products'

export default function ProductsPage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-8.jpg"
        overlay="gradient"
        size="medium"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        headline="Complete Aquaculture Solutions"
        subheadline="Premium feed supplements for shrimp and fish farming — from enzymes and probiotics to water quality management."
        chips={['7 Product Categories', 'GMP Certified', 'Field-Tested']}
      />

      {/* Category Grid */}
      <section className="section-py section-light" id="categories">
        <div className="container-xl">
          <SectionHeader
            tag="Product Categories"
            title="Find the Right Solution for Your Farm"
            subtitle="Our comprehensive range covers every aspect of aquaculture health and productivity."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Reference Table */}
      <section className="section-py section-white" id="catalogue">
        <div className="container-xl">
          <SectionHeader
            tag="Product Catalogue"
            title="All Products at a Glance"
            subtitle="A complete reference list for distributors and procurement teams."
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ocean-900 text-white">
                  <th className="text-left px-5 py-4 font-semibold">Product Name</th>
                  <th className="text-left px-5 py-4 font-semibold hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-4 font-semibold hidden md:table-cell">Tagline</th>
                  <th className="text-left px-5 py-4 font-semibold hidden lg:table-cell">Pack Sizes</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS.map((product, i) => {
                  const cat = CATEGORIES.find((c) => c.id === product.categoryId)
                  return (
                    <tr
                      key={product.id}
                      className={`transition-colors hover:bg-ocean-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-ocean-900">{product.name}</span>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 text-xs bg-ocean-50 text-ocean-700 border border-ocean-100 px-2.5 py-1 rounded-full font-medium">
                          {cat?.icon} {cat?.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 hidden md:table-cell">
                        {product.tagline}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {product.packSizes?.map((size) => (
                            <span key={size} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {size}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`/products/${product.categoryId}/${product.slug}`}
                          className="text-xs font-semibold text-teal-600 hover:text-ocean-700 whitespace-nowrap transition-colors"
                        >
                          View →
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Our Products */}
      <section className="section-py section-light">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader
                tag="Product Quality"
                title="Why Keytone Products Perform Better"
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  Our formulations are developed by a multidisciplinary team of marine biologists,
                  microbiologists, and nutritionists. Every product undergoes rigorous field trials
                  before reaching the market.
                </p>
                <ul className="space-y-3">
                  {[
                    'Raw materials sourced from certified, trusted suppliers',
                    'In-process quality monitoring at every manufacturing stage',
                    'Finished product analysis — chromatography, spectroscopy, microbiological testing',
                    'GMP, HACCP & ISO 9001:2015 certified manufacturing',
                    'Regulatory compliance for domestic and international markets',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <img
                src="/images/banner-2.jpg?w=900&q=80"
                alt="Keytone product quality control lab"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Can't Find What You're Looking For?"
        subtext="Our aquaculture specialists will help you find the right product combination for your specific farming needs."
        primaryCTA={{ label: 'Talk to Our Experts', href: '/contact-us' }}
        secondaryCTA={{ label: 'Download Catalogue', href: '/products#catalogue' }}
      />
    </>
  )
}
