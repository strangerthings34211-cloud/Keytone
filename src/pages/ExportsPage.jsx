import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'
import { EXPORT_MARKETS } from '@/data/certifications'
import { CATEGORIES } from '@/data/products'

const WHY_PARTNER = [
  { icon: '🏆', title: 'Certified Quality',     desc: 'GMP, HACCP & ISO 9001:2015 certifications accepted in major export markets.' },
  { icon: '🔬', title: 'R&D-Backed Products',   desc: 'Formulations developed by marine biologists and nutritionists with field-validated results.' },
  { icon: '🚀', title: 'Technical Support',      desc: 'Our export team provides full product training, documentation, and on-ground technical assistance.' },
  { icon: '📦', title: 'Flexible MOQ',           desc: 'We offer competitive minimum order quantities to support distributors at every scale.' },
  { icon: '🌏', title: 'Regulatory Compliance', desc: 'We prepare complete product dossiers and compliance documentation for your local regulations.' },
  { icon: '🤝', title: 'Partnership Approach',  desc: 'We don\'t just sell products — we build long-term relationships with our distribution partners.' },
]

/* ─── Distributor Enquiry Form ───────────────────────────────── */
function DistributorForm() {
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState({ visible: false })
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1200))
    console.info('Distributor enquiry:', data)
    setSubmitted(true)
    reset()
    setToast({ visible: true })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-12 px-6">
        <CheckCircle size={48} className="text-seafoam-500 mb-4" />
        <h3 className="font-display font-bold text-xl text-ocean-900 mb-2">Enquiry Received!</h3>
        <p className="text-slate-500 text-sm">Our export team will contact you within 2 business days.</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Your name"
              {...register('name', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Your company"
              {...register('company', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors" />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input type="email" placeholder="you@company.com"
              {...register('email', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Your country"
              {...register('country', { required: 'Required' })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors" />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Product Categories Interested In
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-ocean-700">
                <input type="checkbox" value={cat.label} {...register('categories')}
                  className="rounded border-slate-300 text-ocean-700 focus:ring-ocean-500" />
                {cat.icon} {cat.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
          <textarea rows={4}
            placeholder="Tell us about your business, target market, volumes, and any specific requirements..."
            {...register('message')}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-colors" />
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg"
          loading={isSubmitting} rightIcon={<Send size={16} />}>
          {isSubmitting ? 'Sending...' : 'Submit Distributor Enquiry'}
        </Button>
      </form>
      <Toast visible={toast.visible} type="success"
        message="Your distributor enquiry has been sent!"
        onClose={() => setToast({ visible: false })} />
    </>
  )
}

export default function ExportsPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-6.jpg"
        overlay="gradient"
        size="medium"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Exports' }]}
        tag="Global Exports"
        headline="Your Global Aquaculture Partner"
        subheadline="We bring premium, certified aquaculture supplements to farmers and distributors across 10+ international markets."
        chips={['10+ Export Markets', 'GMP Certified', 'Full Technical Support']}
      />

      {/* Mission */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-teal-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Our Global Mission
              </span>
              <h2 className="font-display font-bold text-3xl text-ocean-900 mb-5 leading-tight">
                Enhancing Aquaculture Health Worldwide
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our mission is to enhance the health and productivity of aquaculture ecosystems
                worldwide through the manufacturing and distribution of premium aqua supplements
                for fish and shrimp. We believe that sustainable aquaculture practices hold the key
                to meeting the growing global demand for high-quality seafood.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                As we set our sights on the global market, we are excited to bring our innovative
                solutions and expertise to aquaculture farmers around the world. Through strategic
                partnerships and a relentless commitment to excellence, we are making a meaningful
                impact on the future of aquaculture.
              </p>
            </div>
            <div>
              <img
                src="/images/banner-7.jpg"
                alt="Global aquaculture markets"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="Where We Export"
            title="Our International Reach"
            subtitle="From Southeast Asia to the Americas — our products serve aquaculture farmers across the globe."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {EXPORT_MARKETS.map((market) => (
              <div
                key={market.country}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm hover:border-ocean-200 hover:shadow-card transition-all duration-200"
              >
                <span className="text-2xl">{market.flag}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{market.country}</p>
                  <p className="text-xs text-slate-400">{market.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="section-py section-white">
        <div className="container-xl">
          <SectionHeader
            tag="Why Partner With Us"
            title="The Keytone Distributor Advantage"
            subtitle="We offer more than products — we offer a complete partnership to help you grow."
          />
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PARTNER.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  'flex items-start gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100',
                  'transition-all duration-500',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-2xl mt-0.5 shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-display font-bold text-ocean-900 mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor Enquiry Form */}
      <section className="section-py section-light" id="distributor-form">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader
                tag="Become a Distributor"
                title="Join Our Global Distribution Network"
                subtitle="Fill in the form and our export team will get back to you within 2 business days."
                align="left"
                className="mb-8"
              />
              <div className="space-y-4">
                {[
                  'Access to our complete product range',
                  'Competitive ex-works pricing',
                  'Full product documentation for regulatory submission',
                  'Technical training and farmer support materials',
                  'Dedicated export account manager',
                  'Co-marketing and promotional support',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle size={16} className="text-teal-500 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-card p-7">
              <h3 className="font-display font-bold text-xl text-ocean-900 mb-6">
                Distributor Enquiry Form
              </h3>
              <DistributorForm />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Let's Build a Global Aquaculture Partnership"
        subtext="Reach out to our export team and let's discuss how we can grow together."
        primaryCTA={{ label: 'Contact Export Team', href: '/contact-us?type=export' }}
        secondaryCTA={{ label: 'View Products', href: '/products' }}
      />
    </>
  )
}
