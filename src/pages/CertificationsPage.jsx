import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'
import { Download, CheckCircle, ArrowRight } from 'lucide-react'
import { CERTIFICATIONS, SITE_IMAGES } from '@/data/certifications'

const CERT_COLORS = {
  blue:   { bg: 'bg-ocean-50',   border: 'border-ocean-200',  icon: 'bg-ocean-100 text-ocean-700',  badge: 'bg-ocean-700 text-white' },
  teal:   { bg: 'bg-teal-50',    border: 'border-teal-200',   icon: 'bg-teal-100 text-teal-700',    badge: 'bg-teal-600 text-white' },
  gold:   { bg: 'bg-amber-50',   border: 'border-amber-200',  icon: 'bg-amber-100 text-amber-700',  badge: 'bg-amber-500 text-white' },
  green:  { bg: 'bg-green-50',   border: 'border-green-200',  icon: 'bg-green-100 text-green-700',  badge: 'bg-green-600 text-white' },
  purple: { bg: 'bg-purple-50',  border: 'border-purple-200', icon: 'bg-purple-100 text-purple-700',badge: 'bg-purple-600 text-white' },
}

const CERT_BENEFITS = [
  { audience: 'Farmers',      benefit: 'Every product is manufactured under internationally verified safe conditions — you can trust what goes into your pond.' },
  { audience: 'Distributors', benefit: 'Our certifications make it easier to sell to regulated markets and provide your customers with credible product documentation.' },
  { audience: 'Export Partners', benefit: 'ISO, GMP, and HACCP certifications are recognized globally, supporting smooth regulatory approvals in international markets.' },
  { audience: 'Industry Partners', benefit: 'Our commitment to internationally certified quality makes us a reliable and accountable long-term partner.' },
]

export default function CertificationsPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-5.jpg"
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Certifications' },
        ]}
        tag="Certifications"
        headline="Globally Certified, Locally Committed"
        subheadline="Our certifications from globally recognized authorities validate our unwavering commitment to quality, safety, and customer trust."
        chips={['GMP', 'HACCP', 'ISO 9001:2015', 'CAA', 'MSME']}
      />

      {/* Intro */}
      <section className="section-py section-white">
        <div className="container-xl max-w-3xl mx-auto text-center">
          <p className="text-slate-600 text-lg leading-relaxed">
            At Keytone Life Sciences, we are committed to upholding the highest standards of quality
            and safety in everything we do. Our certifications from globally recognized organizations
            are a testament to our dedication — not just to meeting regulatory requirements, but to
            genuinely delivering products that farmers and partners can rely on.
          </p>
        </div>
      </section>

      {/* Certification Cards */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="Our Certifications"
            title="Certified for Quality at Every Level"
          />
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, i) => {
              const colors = CERT_COLORS[cert.color] ?? CERT_COLORS.blue
              return (
                <div
                  key={cert.id}
                  className={cn(
                    'rounded-2xl border p-6 sm:p-7 shadow-card hover:shadow-card-hover h-full flex flex-col justify-between',
                    'hover:-translate-y-1 transition-all duration-300',
                    colors.bg, colors.border,
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div>
                    {/* Icon + Badge row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0', colors.icon)}>
                        {cert.icon}
                      </div>
                      <span className={cn('text-xs font-bold px-3 py-1 rounded-full shadow-sm', colors.badge)}>
                        Certified
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-ocean-900 text-lg mb-0.5">{cert.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">{cert.fullName}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{cert.description}</p>
                  </div>

                  <button className="flex items-center gap-2 text-sm font-semibold text-ocean-700 hover:text-teal-600 transition-colors mt-auto pt-2">
                    <Download size={14} /> Download Certificate
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What It Means For You */}
      <section className="section-py section-white">
        <div className="container-xl">
          <SectionHeader
            tag="Why It Matters"
            title="What These Certifications Mean for You"
            subtitle="Our certifications benefit everyone who works with Keytone Life Sciences."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CERT_BENEFITS.map((item) => (
              <div
                key={item.audience}
                className="flex items-start gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-ocean-700 text-white flex items-center justify-center shrink-0">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-ocean-900 mb-1">For {item.audience}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with Confidence */}
      <section className="section-py section-light">
        <div className="container-xl max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl border border-ocean-100 p-10 shadow-card">
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              Partner with Confidence
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whether you are a shrimp or fish farmer, distributor, or industry partner — you can
              choose Keytone Life Sciences knowing our products meet the highest internationally
              recognized standards for quality, safety, and consistency.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 bg-ocean-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-ocean-800 transition-colors text-sm"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
              <Link
                to="/quality-control"
                className="inline-flex items-center gap-2 border-2 border-ocean-700 text-ocean-700 font-semibold px-6 py-3 rounded-full hover:bg-ocean-700 hover:text-white transition-all duration-200 text-sm"
              >
                View Quality Control <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Need Product Documentation?"
        subtext="Request complete product dossiers, safety data sheets, or certification copies for regulatory submission."
        primaryCTA={{ label: 'Request Documentation', href: '/contact-us?type=documentation' }}
        secondaryCTA={{ label: 'Explore Products', href: '/products' }}
      />
    </>
  )
}
