import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/products/ProductCard'
import CategoryCard from '@/components/products/CategoryCard'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { getCategoryBySlug, getProductsByCategory, CATEGORIES } from '@/data/products'

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const category = getCategoryBySlug(categorySlug)
  const products = getProductsByCategory(categorySlug)
  const [enquiryProduct, setEnquiryProduct] = useState(null)

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Category Not Found</h2>
          <Link to="/products" className="text-ocean-700 font-semibold hover:text-teal-600">← Back to Products</Link>
        </div>
      </div>
    )
  }

  const relatedCategories = CATEGORIES.filter((c) => c.id !== category.id).slice(0, 3)

  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-8.jpg"
        overlay="gradient"
        size="small"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.label },
        ]}
        tag="Product Category"
        headline={category.label}
        subheadline={category.description}
        chips={category.species.map((s) => `For ${s}`).concat([`${products.length} Products`])}
      />

      {/* Category Overview */}
      <section className="section-py section-white pb-20 lg:pb-14">
        <div className="container-xl">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Products grid (8 cols - Order 1 on mobile, Order 2 on desktop) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <SectionHeader
                tag={`${products.length} Formulations`}
                title={`${category.label} Range`}
                align="left"
                className="mb-6 sm:mb-8"
              />
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categoryLabel={category.label}
                      onEnquire={setEnquiryProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-4xl mb-3">🧪</p>
                  <p className="font-medium">Products coming soon.</p>
                </div>
              )}
            </div>

            {/* Benefits sidebar (4 cols - Order 2 on mobile, Order 1 on desktop) */}
            <div className="lg:col-span-4 order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="bg-ocean-50/80 border border-ocean-100 rounded-3xl p-5 sm:p-6 sticky top-24 shadow-xs">
                <h3 className="font-display font-bold text-ocean-900 text-base sm:text-lg mb-3 sm:mb-4">
                  Key Benefits of {category.label}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {category.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-ocean-100">
                  <p className="text-[11px] text-slate-500 mb-2 font-bold uppercase tracking-wider">Suitable For</p>
                  <div className="flex gap-2 flex-wrap">
                    {category.species.map((s) => (
                      <span key={s} className="text-xs bg-ocean-700/10 text-ocean-800 border border-ocean-700/20 px-3 py-1 rounded-full font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setEnquiryProduct({ name: `${category.label} Range`, tagline: category.tagline })}
                  className="mt-5 w-full bg-ocean-800 hover:bg-ocean-900 text-white font-bold py-3 rounded-2xl transition-colors text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  Enquire About {category.label} Range
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="Explore More"
            title="Related Product Categories"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-ocean-700 font-semibold hover:text-teal-600 transition-colors text-sm"
            >
              View All Categories <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline={`Ready to Try Our ${category.label}?`}
        subtext="Contact our team to place an order, request samples, or get expert guidance on the right product for your operation."
        primaryCTA={{ label: 'Enquire Now', href: '/contact-us' }}
        secondaryCTA={{ label: 'WhatsApp Us', href: 'https://wa.me/919959002666' }}
      />

      {enquiryProduct && (
        <EnquiryForm
          product={enquiryProduct}
          isOpen={!!enquiryProduct}
          modal
          onClose={() => setEnquiryProduct(null)}
        />
      )}
    </>
  )
}
