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
        backgroundImage={category.heroImage}
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.label },
        ]}
        tag={`Product Category`}
        headline={category.label}
        subheadline={category.description}
        chips={category.species.map((s) => `For ${s}`).concat([`${products.length} Products`])}
      />

      {/* Category Overview */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-ocean-50 border border-ocean-100 rounded-2xl p-6 sticky top-24">
                <h3 className="font-display font-bold text-ocean-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {category.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-ocean-100">
                  <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Suitable For</p>
                  <div className="flex gap-2 flex-wrap">
                    {category.species.map((s) => (
                      <span key={s} className="text-sm bg-ocean-700/10 text-ocean-700 border border-ocean-700/20 px-3 py-1 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setEnquiryProduct({ name: `${category.label} Range`, tagline: category.tagline })}
                  className="mt-5 w-full bg-ocean-700 text-white font-semibold py-3 rounded-xl hover:bg-ocean-800 transition-colors text-sm"
                >
                  Enquire About This Range
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div className="lg:col-span-2">
              <SectionHeader
                tag={`${products.length} Products`}
                title={`${category.label} Range`}
                align="left"
                className="mb-8"
              />
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div className="text-center py-16 text-slate-400">
                  <p className="text-4xl mb-3">🧪</p>
                  <p className="font-medium">Products coming soon.</p>
                </div>
              )}
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
