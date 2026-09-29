import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import StatsStrip from '@/components/sections/StatsStrip'
import CTABanner from '@/components/sections/CTABanner'
import GuidedByVisionSection from '@/components/sections/GuidedByVisionSection'
import GlobalReachSection from '@/components/sections/GlobalReachSection'
import SectionHeader from '@/components/ui/SectionHeader'
import { EXPORT_MARKETS, SITE_IMAGES } from '@/data/certifications'


/* ─── Timeline data ─────────────────────────────────────────── */
const TIMELINE = [
  { year: '2012', title: 'Founded',             desc: 'Keytone Life Sciences was established in Hyderabad with a mission to transform aquaculture.' },
  { year: '2014', title: 'GMP Certification',   desc: 'Achieved Good Manufacturing Practices certification for our manufacturing facility.' },
  { year: '2016', title: 'Probiotic Range',     desc: 'Launched our flagship probiotic and prebiotic product line for shrimp and fish farming.' },
  { year: '2018', title: 'ISO 9001:2015',       desc: 'Obtained ISO 9001:2015 quality management certification, meeting international standards.' },
  { year: '2020', title: 'Southeast Asia',      desc: 'Expanded export operations into Southeast Asian aquaculture markets.' },
  { year: '2022', title: 'Middle East',         desc: 'Established presence in the Middle East, serving aquaculture operations in Oman and UAE.' },
  { year: '2024', title: 'US & Bangladesh',     desc: 'Entered the United States and Bangladesh markets with dedicated product lines.' },
  { year: '2026', title: 'Global Vision',       desc: 'Continuing expansion with 10+ export markets and a growing international distributor network.' },
]

/* ─── Values ────────────────────────────────────────────────── */
const VALUES = [
  { icon: '🔬', title: 'Innovation',     desc: 'We invest continuously in R&D to develop breakthrough aquaculture solutions backed by science.' },
  { icon: '🏆', title: 'Quality',        desc: 'Every product is manufactured to GMP, HACCP, and ISO 9001:2015 standards without compromise.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We design products that enhance farm productivity while protecting aquatic ecosystems.' },
  { icon: '👨‍🌾', title: 'Farmer-First',   desc: 'Our farmers\' success is our success. We provide products, training, and ongoing support.' },
]

function TimelineSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-py section-light">
      <div className="container-xl">
        <SectionHeader
          tag="Our Journey"
          title="A Decade of Aquaculture Excellence"
          subtitle="From humble beginnings in Hyderabad to a growing global aquaculture company."
        />

        <div ref={ref} className="relative">
          {/* Centre line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-ocean-100 -translate-x-0.5" />

          <div className="space-y-6 lg:space-y-0">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={item.year}
                  className={cn(
                    'lg:grid lg:grid-cols-2 lg:gap-8 items-center',
                    'transition-all duration-700',
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  )}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Left slot */}
                  <div className={cn(isLeft ? 'lg:text-right lg:pr-10' : 'lg:col-start-2 lg:pl-10')}>
                    {isLeft ? (
                      <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
                        <span className="inline-block text-teal-600 font-bold text-sm mb-1">{item.year}</span>
                        <h3 className="font-display font-bold text-ocean-900 mb-1">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ) : (
                      /* dot for right-side items */
                      <div className="hidden lg:flex justify-end items-center">
                        <div className="w-4 h-4 rounded-full bg-ocean-700 border-4 border-ocean-100" />
                      </div>
                    )}
                  </div>

                  {/* Right slot */}
                  <div className={cn(isLeft ? 'hidden lg:flex justify-start items-center' : 'lg:col-start-2')}>
                    {!isLeft ? (
                      <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
                        <span className="inline-block text-teal-600 font-bold text-sm mb-1">{item.year}</span>
                        <h3 className="font-display font-bold text-ocean-900 mb-1">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ) : (
                      <div className="hidden lg:flex items-center">
                        <div className="w-4 h-4 rounded-full bg-ocean-700 border-4 border-ocean-100" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage={SITE_IMAGES.aboutHero}
        overlay="gradient"
        size="medium"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        tag="About Us"
        headline="About Keytone Life Sciences"
        subheadline="Empowering aquaculture farmers since 2012 through innovative, science-backed feed supplement solutions."
        chips={['Since 2012', 'GMP Certified', 'ISO 9001:2015', 'Hyderabad, India']}
      />

      {/* Stats */}
      <StatsStrip />

      {/* Our Story */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-teal-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Our Story
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ocean-900 mb-6 leading-tight">
                A Journey Fuelled by Passion for Aquaculture
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Welcome to Keytone Life Sciences — your trusted partner in aquaculture supplement
                  products for shrimp and fish farming. Since our establishment in 2012, we have
                  been dedicated to manufacturing, distributing, and providing farmer care services
                  to support the growth and sustainability of the aquaculture industry worldwide.
                </p>
                <p>
                  Under the guidance and leadership of our Chairman, Vijaya Krishna G, we set out
                  to redefine the aqua supplement industry through advanced research, high-quality
                  product development, and tireless support for farmers across India.
                </p>
                <p>
                  Today, we are proud to serve farmers in India, Southeast Asia, the Middle East,
                  Latin America, and beyond — with a growing international footprint that reflects
                  our commitment to global aquaculture excellence.
                </p>
              </div>
            </div>
            {/* Image & Chairman Quote Showcase */}
            <div className="relative mt-8 lg:mt-0 flex flex-col items-center">
              {/* Main Image with Face Fully Visible */}
              <div className="w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src={SITE_IMAGES.aboutSustain}
                  alt="Keytone Life Sciences sustainable aqua farming operations"
                  className="w-full h-[380px] sm:h-[450px] lg:h-[520px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Chairman's Quote Overlay - Positioned at Bottom so Face is 100% Clear & Unobstructed */}
              <div className="w-full sm:w-auto mt-4 sm:-mt-12 md:-mt-0 md:absolute md:-bottom-6 md:-left-6 lg:-bottom-8 lg:-left-8 bg-ocean-950/95 backdrop-blur-xl text-white rounded-3xl p-5 md:p-6 max-w-sm border border-teal-400/30 shadow-[0_20px_50px_rgba(6,29,74,0.35)] z-20">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                    <Quote size={15} className="fill-teal-300" />
                  </div>
                  <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
                    Chairman's Vision
                  </span>
                </div>

                <blockquote className="text-sm md:text-base font-semibold italic leading-relaxed text-white/95">
                  "Our belief is simple: <span className="text-gradient-hero not-italic font-bold">Healthy Culture, Wealthy Farmer."</span>
                </blockquote>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <p className="text-xs font-bold text-teal-300">Vijaya Krishna G</p>
                  <span className="text-[11px] text-white/60">Chairman, Keytone</span>
                </div>
              </div>

              {/* Inset Badge Top Right on Desktop */}
              <div className="hidden lg:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3 z-10">
                <div className="w-9 h-9 rounded-xl bg-ocean-50 text-ocean-700 flex items-center justify-center text-base">
                  🦐
                </div>
                <div>
                  <p className="font-bold text-ocean-900 text-xs">Sustainable Aquaculture</p>
                  <p className="text-[10px] text-slate-500">Transforming Yields Since 2012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="Our Values"
            title="What We Stand For"
            subtitle="Four core principles that drive every decision, every product, and every partnership."
          />
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <div
                key={val.title}
                className={cn(
                  'bg-white rounded-2xl p-6 border border-slate-100 shadow-card',
                  'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4">{val.icon}</div>
                <h3 className="font-display font-bold text-ocean-900 mb-2">{val.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guided by Vision & Leadership */}
      <GuidedByVisionSection />


      {/* Timeline */}
      <TimelineSection />

      {/* Global Presence - Serving Farmers Worldwide */}
      <GlobalReachSection />


      <CTABanner
        headline="Ready to Partner with Keytone Life Sciences?"
        subtext="Whether you're a farmer, distributor, or international partner — we're here to help you grow."
        primaryCTA={{ label: 'Get in Touch', href: '/contact-us' }}
        secondaryCTA={{ label: 'View Our Products', href: '/products' }}
      />
    </>
  )
}
