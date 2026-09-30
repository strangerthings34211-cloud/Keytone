import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CheckCircle, Phone, MessageSquare, Mail, Package,
  ShieldCheck, Sparkles, Award, ArrowRight, Share2,
  Droplets, FileText, CheckCircle2, ChevronRight, HelpCircle,
  Home, Clock, Shield
} from 'lucide-react'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import Accordion from '@/components/ui/Accordion'
import Tabs from '@/components/ui/Tabs'
import Badge from '@/components/ui/Badge'
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
    answer: 'Minimum order quantities vary by product and market. Contact our sales team for your region\'s MOQ and bulk pricing details.',
  },
  {
    question: 'Is this product safe for the environment?',
    answer: 'All Keytone products are engineered to support sustainable aquaculture. They are 100% bio-safe, non-toxic, and comply with international environmental & export safety standards.',
  },
]

export default function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams()
  const product = getProductBySlug(productSlug)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedPack, setSelectedPack] = useState(
    product?.packSizes?.[0] || 'Standard Pack'
  )

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-slate-50">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Product Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">The aquaculture formulation you are looking for does not exist or has been moved.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-ocean-800 text-white font-bold px-6 py-3 rounded-full hover:bg-ocean-700 transition-colors text-sm shadow-md"
          >
            ← Back to All Products
          </Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === product.categoryId)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Keytone Life Sciences`,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const whatsappMessage = `Hello Keytone Life Sciences! I am interested in ordering/inquiring about "${product.name}" (${product.tagline}) [Pack: ${selectedPack}]. Please provide wholesale pricing and delivery timeline.`
  const whatsappUrl = `https://wa.me/919959002666?text=${encodeURIComponent(whatsappMessage)}`

  const tabItems = [
    {
      label: 'Composition',
      content: (
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Droplets size={18} className="text-teal-600 shrink-0" />
            <h4 className="font-display font-bold text-ocean-900 text-base sm:text-lg">
              Active Bio-Ingredients
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {product.composition?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/70 shadow-xs"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0 ring-4 ring-teal-50" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Key Benefits',
      content: (
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-teal-600 shrink-0" />
            <h4 className="font-display font-bold text-ocean-900 text-base sm:text-lg">
              Proven Farm Benefits
            </h4>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {product.benefits?.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-xs"
              >
                <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Application & Dosage',
      content: (
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={18} className="text-ocean-700 shrink-0" />
            <h4 className="font-display font-bold text-ocean-900 text-base sm:text-lg">
              Recommended Usage Protocol
            </h4>
          </div>
          <div className="bg-gradient-to-br from-ocean-50 to-teal-50/40 rounded-xl p-4 sm:p-5 border border-ocean-200/60 shadow-xs">
            <p className="text-xs sm:text-sm text-ocean-950 font-medium leading-relaxed whitespace-pre-line">
              {product.application}
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-3.5 sm:p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900">
            <HelpCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Technical Guidance:</strong> Dosage may vary depending on stocking density, water salinity, and pond biomass. Contact our technical team for custom farm protocols.
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Packaging & Storage',
      content: (
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Package size={18} className="text-ocean-700 shrink-0" />
            <h4 className="font-display font-bold text-ocean-900 text-base sm:text-lg">
              Pack Sizes &amp; Storage Conditions
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-xs">
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2.5">Available Commercial Sizes</p>
              <div className="flex flex-wrap gap-2">
                {product.packSizes?.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1.5 bg-ocean-50 border border-ocean-200 text-ocean-800 text-xs sm:text-sm px-3 py-1.5 rounded-full font-bold shadow-2xs"
                  >
                    <Package size={13} className="text-teal-600" /> {size}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-xs">
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2.5">Storage Recommendations</p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Store in a cool, dry, and well-ventilated area (15°C – 25°C). Keep container tightly sealed when not in use. Avoid direct exposure to sunlight and moisture.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50/50 pb-28 lg:pb-16">
      {/* 1. Scenic Dark Hero Section with Dynamic Product/Category Background */}
      <HeroSection
        backgroundImage={category?.heroImage || product.image || '/images/banner-8.jpg'}
        overlay="gradient"
        size="small"
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

      {/* 2. Main Product Showcase & Purchasing Section */}
      <section className="py-6 sm:py-10 lg:py-12">
        <div className="container-xl">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* Left Column (5 cols): Product Visual Showcase Stage */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 p-6 sm:p-8 flex items-center justify-center shadow-lg group min-h-[300px] sm:min-h-[400px]">
                {/* Ambient Radial Backlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-cyan-500/5 to-ocean-500/10 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-ocean-900 text-teal-300 px-3 py-1 rounded-full shadow-sm border border-teal-400/30">
                    <Sparkles size={12} className="text-teal-400" /> Aquaculture Biotechnology
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-ocean-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full transition-colors font-semibold cursor-pointer shadow-xs"
                  title="Share product link"
                >
                  <Share2 size={13} /> {copiedLink ? 'Copied!' : 'Share'}
                </button>

                {/* Product Image */}
                <div className="w-full max-w-[260px] sm:max-w-[340px] h-60 sm:h-80 flex items-center justify-center py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Trust Strip under Image */}
              <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="p-1">
                  <span className="text-[10px] sm:text-xs font-bold text-ocean-900 block">GMP Certified</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Sterile Labs</span>
                </div>
                <div className="p-1 border-x border-slate-100">
                  <span className="text-[10px] sm:text-xs font-bold text-teal-600 block">100% Bio Safe</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Zero Antibiotics</span>
                </div>
                <div className="p-1">
                  <span className="text-[10px] sm:text-xs font-bold text-ocean-900 block">ISO 9001:2015</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Field Tested</span>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Information, Pack Selector & Instant Actions */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-lg space-y-4">
                
                {/* Category & Best Seller Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {category && (
                    <Badge variant="ocean" className="text-xs sm:text-sm py-1 px-3 font-bold">
                      {category.icon} {category.label}
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="gold" className="text-xs sm:text-sm py-1 px-3 font-bold">
                      ⭐ Best Seller
                    </Badge>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck size={13} className="text-emerald-600" /> Export Compliant
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-ocean-950 tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-teal-600 font-bold text-sm sm:text-base mt-1 leading-snug">
                    {product.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                  {product.description}
                </p>

                {/* Pack Size Selector Pills */}
                {product.packSizes && product.packSizes.length > 0 && (
                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Select Pack Size:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.packSizes.map((size) => {
                        const isSelected = selectedPack === size
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedPack(size)}
                            className={cn(
                              'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border',
                              isSelected
                                ? 'bg-ocean-900 text-white border-ocean-900 shadow-md scale-102'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            )}
                          >
                            <Package size={13} className="inline mr-1.5 opacity-80" />
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons Box */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold py-3.5 px-4 rounded-2xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageSquare size={17} className="fill-current" /> Order / Quote on WhatsApp
                    </a>

                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-3.5 px-4 rounded-2xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      <Mail size={16} /> Request Official Quote
                    </button>
                  </div>

                  <a
                    href="tel:+919959002666"
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 border border-slate-200"
                  >
                    <Phone size={14} className="text-ocean-700" /> Need Technical Support? Call: +91 9959 002 666
                  </a>
                </div>

              </div>

            </div>

          </div>

          {/* 3. Deep-Dive Specification Tabs */}
          <div className="mt-10 sm:mt-14 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md">
            <h3 className="font-display font-bold text-xl text-ocean-950 mb-4 flex items-center gap-2">
              <span>🔬</span> Technical Specifications &amp; Field Usage
            </h3>
            <Tabs tabs={tabItems} />
          </div>

          {/* 4. Frequently Asked Questions */}
          <div className="mt-10 sm:mt-12 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} className="text-teal-600" />
              <h2 className="font-display font-bold text-lg sm:text-2xl text-ocean-950">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Essential questions regarding dosage, storage, and pond compatibility for {product.name}.
            </p>
            <Accordion items={PRODUCT_FAQS} />
          </div>

        </div>
      </section>

      {/* 5. Related Products in Category */}
      {relatedProducts.length > 0 && (
        <section className="py-10 sm:py-14 bg-slate-100/70 border-t border-slate-200/60">
          <div className="container-xl">
            <SectionHeader
              tag="More Formulations"
              title={`Other ${category?.label ?? ''} Products`}
              subtitle="Explore complementary enzymes, probiotics, and water conditioners engineered for shrimp and fish."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6">
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

      {/* 6. CTA Banner */}
      <CTABanner
        headline="Need Custom Pond Dosage Advice?"
        subtext="Our aquaculture biotechnologists and field technicians are ready to advise on optimal FCR, water quality, and crop health."
        primaryCTA={{ label: 'Get Pricing & Details', href: '/contact-us' }}
        secondaryCTA={{ label: 'WhatsApp Specialist', href: whatsappUrl }}
      />

      {/* 7. Fixed Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center gap-2 lg:hidden">
        <a
          href="tel:+919959002666"
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
        >
          <Phone size={15} className="text-ocean-700" /> Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
        >
          <MessageSquare size={15} className="fill-current" /> WhatsApp
        </a>
        <button
          onClick={() => setEnquiryOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-ocean-800 hover:bg-ocean-900 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
        >
          <Mail size={15} /> Enquire
        </button>
      </div>

      {/* Enquiry Modal */}
      {enquiryOpen && (
        <EnquiryForm
          product={product}
          isOpen={enquiryOpen}
          modal
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </div>
  )
}
