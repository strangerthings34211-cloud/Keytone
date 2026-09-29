import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, Phone, MessageSquare, Mail, Package, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import Accordion from '@/components/ui/Accordion'
import Tabs from '@/components/ui/Tabs'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/products/ProductCard'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { getProductBySlug, getProductsByCategory, CATEGORIES } from '@/data/products'

const PRODUCT_FAQS = [
  {
    question: 'How should this product be stored?',
    answer: 'Store in a cool, dry place away from direct sunlight. Keep tightly sealed after opening. Optimal storage temperature: 15–25°C. Do not store near chemicals or strong odors.',
  },
  {
    question: 'Can I use this product alongside other supplements?',
    answer: 'Yes, Keytone products are formulated to be compatible with standard aquaculture inputs. For specific combination queries, consult our technical team.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer: 'Minimum order quantities vary by product and market. Contact our sales team for your region\'s MOQ and pricing details.',
  },
  {
    question: 'Is this product safe for the environment?',
    answer: 'All Keytone products are designed to support sustainable aquaculture. They are free from harmful chemicals and comply with international environmental regulations.',
  },
]

export default function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams()
  const product = getProductBySlug(productSlug)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Product Not Found</h2>
          <Link to="/products" className="text-ocean-700 font-semibold hover:text-teal-600">← Back to Products</Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const tabItems = [
    {
      label: 'Composition',
      content: (
        <div>
          <h4 className="font-semibold text-ocean-900 mb-3">Active Ingredients</h4>
          <ul className="space-y-2">
            {product.composition?.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: 'Key Benefits',
      content: (
        <div>
          <h4 className="font-semibold text-ocean-900 mb-3">What This Product Does</h4>
          <ul className="space-y-3">
            {product.benefits?.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle size={16} className="text-teal-500 mt-0.5 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: 'Application',
      content: (
        <div>
          <h4 className="font-semibold text-ocean-900 mb-3">How to Use</h4>
          <div className="bg-ocean-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed border border-ocean-100">
            {product.application}
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <strong>Note:</strong> Always follow the recommended dosage. For specific farm conditions, consult our technical support team.
          </div>
        </div>
      ),
    },
    {
      label: 'Specifications',
      content: (
        <div>
          <h4 className="font-semibold text-ocean-900 mb-3">Pack Sizes & Storage</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Available Sizes</p>
              <div className="flex flex-wrap gap-2">
                {product.packSizes?.map((size) => (
                  <span key={size} className="bg-white border border-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full shadow-sm font-medium">
                    <Package size={12} className="inline mr-1" />{size}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Storage</p>
              <p className="text-sm text-slate-600">Cool, dry place. 15–25°C. Keep sealed after opening.</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage={product.image}
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category?.label ?? '', href: `/products/${categorySlug}` },
          { label: product.name },
        ]}
        tag={category?.label}
        headline={product.name}
        subheadline={product.tagline}
      />

      {/* Product Detail */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {category && (
                    <Badge variant="ocean">{category.icon} {category.label}</Badge>
                  )}
                  {product.featured && (
                    <Badge variant="gold">⭐ Featured</Badge>
                  )}
                </div>
                <h1 className="font-display font-extrabold text-3xl text-ocean-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-teal-600 font-semibold mb-4">{product.tagline}</p>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{product.description}</p>
              </div>

              {/* Product image */}
              <div className="rounded-3xl overflow-hidden mb-8 h-64 sm:h-80 bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex items-center justify-center border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>

              {/* Tabs */}
              <Tabs tabs={tabItems} />

              {/* FAQ */}
              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-ocean-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion items={PRODUCT_FAQS} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Enquiry card */}
                <div className="bg-ocean-900 rounded-2xl p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-1">Enquire About {product.name}</h3>
                  <p className="text-white/60 text-sm mb-5">Get pricing, samples, or technical details.</p>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Mail size={15} /> Send Enquiry
                    </button>
                    <a
                      href="https://wa.me/919959002666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={15} /> WhatsApp
                    </a>
                    <a
                      href="tel:+919959002666"
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Phone size={15} /> +91 9959 002 666
                    </a>
                  </div>
                </div>

                {/* Pack sizes */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
                    <Package size={15} className="text-ocean-600" /> Available Pack Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.packSizes?.map((size) => (
                      <span key={size} className="bg-white border border-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-full font-medium shadow-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications mini */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-slate-700 text-sm mb-3">Product Quality</h4>
                  {['GMP Certified', 'HACCP Compliant', 'ISO 9001:2015', 'Field Tested'].map((cert) => (
                    <div key={cert} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                      <CheckCircle size={14} className="text-teal-500 shrink-0" />
                      <span className="text-sm text-slate-600">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-py section-light">
          <div className="container-xl">
            <SectionHeader
              tag="More from this Category"
              title={`Other ${category?.label ?? ''} Products`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  categoryLabel={category?.label ?? ''}
                  onEnquire={() => setEnquiryOpen(true)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline="Ready to Order?"
        subtext="Contact our team for bulk pricing, samples, or technical support for your farm."
        primaryCTA={{ label: 'Get Pricing', href: '/contact-us' }}
        secondaryCTA={{ label: 'WhatsApp Us', href: 'https://wa.me/919959002666' }}
      />

      {/* Mobile sticky CTA */}
      <div className="mobile-cta-bar lg:hidden">
        <a
          href="tel:+919959002666"
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl text-sm"
        >
          <Phone size={15} /> Call
        </a>
        <a
          href="https://wa.me/919959002666"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-semibold py-2.5 rounded-xl text-sm"
        >
          <MessageSquare size={15} /> WhatsApp
        </a>
        <button
          onClick={() => setEnquiryOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-ocean-700 text-white font-semibold py-2.5 rounded-xl text-sm"
        >
          <Mail size={15} /> Enquire
        </button>
      </div>

      {enquiryOpen && (
        <EnquiryForm
          product={product}
          isOpen={enquiryOpen}
          modal
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </>
  )
}
