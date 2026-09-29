import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SITE_IMAGES } from '@/data/certifications'

const QC_STEPS = [
  {
    icon: '🔬',
    title: 'Raw Material Inspection',
    desc: 'Before any manufacturing begins, our team meticulously inspects all incoming raw materials for quality and purity. We source ingredients from trusted, certified suppliers and conduct rigorous authentication and potency testing.',
  },
  {
    icon: '📊',
    title: 'In-Process Monitoring',
    desc: 'Throughout the manufacturing process, our technicians conduct regular checks to assess product integrity, potency, and purity — making adjustments as necessary to ensure optimal and consistent results.',
  },
  {
    icon: '✅',
    title: 'Finished Product Analysis',
    desc: 'Each batch undergoes thorough analysis to confirm compliance with our specifications. We use chromatography, spectroscopy, and microbiological testing to verify safety, potency, and efficacy.',
  },
  {
    icon: '🧪',
    title: 'Comprehensive Testing Protocols',
    desc: 'Our Hyderabad laboratory is equipped with advanced analytical technology. We implement multi-stage testing protocols that identify and address any potential quality issues before products reach the market.',
  },
  {
    icon: '📋',
    title: 'Regulatory Compliance',
    desc: 'Our quality control practices strictly adhere to regulatory guidelines set by domestic and international authorities, maintaining full compliance to uphold the confidence of our customers worldwide.',
  },
  {
    icon: '🔄',
    title: 'Continuous Improvement',
    desc: 'We regularly review and update our procedures to incorporate the latest advancements in technology and industry best practices, ensuring our QC standards continuously evolve and improve.',
  },
]

const TEST_METHODS = [
  { method: 'High-Performance Liquid Chromatography (HPLC)',   use: 'Active ingredient potency testing' },
  { method: 'Gas Chromatography (GC)',                          use: 'Volatile compound analysis' },
  { method: 'UV/Vis Spectrophotometry',                         use: 'Concentration and purity verification' },
  { method: 'Microbiological Plate Count',                      use: 'Probiotic CFU verification' },
  { method: 'Enzyme Activity Assay',                            use: 'Enzyme product potency validation' },
  { method: 'Heavy Metal Screening (ICP-MS)',                   use: 'Safety and purity assurance' },
  { method: 'Moisture & Water Activity Testing',                use: 'Shelf-life and stability verification' },
  { method: 'Physical Parameter Testing',                       use: 'Particle size, flowability, pH' },
]

export default function QualityControlPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage={SITE_IMAGES.rdLab1}
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Quality Control' },
        ]}
        tag="Quality Control"
        headline="Quality You Can Trust, Every Batch"
        subheadline="Our commitment to quality begins at raw material sourcing and extends through every step of manufacturing, testing, and delivery."
        chips={['GMP Certified', 'ISO 9001:2015', 'HACCP', 'Hyderabad Lab']}
      />

      {/* Intro */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-teal-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Our QC Philosophy
              </span>
              <h2 className="font-display font-bold text-3xl text-ocean-900 mb-5 leading-tight">
                Quality Control Is a Commitment, Not a Process
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                At Keytone Life Sciences, we understand that when a farmer uses our products, they
                are trusting us with the health of their entire crop. That responsibility is what
                drives our rigorous approach to quality control — an approach that goes far beyond
                regulatory compliance.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                From the moment raw materials arrive at our facility to the moment a finished
                product leaves our warehouse, every step is monitored, tested, and documented.
                Our state-of-the-art laboratory in Hyderabad ensures every batch meets our
                uncompromising standards.
              </p>
              <Link
                to="/certifications"
                className="inline-flex items-center gap-2 text-ocean-700 font-semibold hover:text-teal-600 transition-colors"
              >
                View Our Certifications <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              <img
                src={SITE_IMAGES.qcLab}
                alt="Keytone Life Sciences quality control laboratory"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QC Process Cards */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="QC Process"
            title="Our Six-Stage Quality Assurance Process"
            subtitle="Every product passes through six rigorous quality checkpoints before it reaches your farm."
          />
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QC_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  'bg-white rounded-2xl p-6 border border-slate-100 shadow-card',
                  'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="font-display font-extrabold text-4xl text-ocean-50 ml-auto select-none">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-ocean-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Methods Table */}
      <section className="section-py section-white">
        <div className="container-xl">
          <SectionHeader
            tag="Testing Methods"
            title="Advanced Analytical Testing"
            subtitle="We use internationally recognized analytical methods to verify the safety, potency, and purity of every product."
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ocean-900 text-white">
                  <th className="text-left px-6 py-4 font-semibold">Testing Method</th>
                  <th className="text-left px-6 py-4 font-semibold">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEST_METHODS.map((row, i) => (
                  <tr key={row.method} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-4 font-medium text-ocean-900">{row.method}</td>
                    <td className="px-6 py-4 text-slate-500">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Commitment banner */}
      <section className="section-py section-light">
        <div className="container-xl max-w-3xl text-center mx-auto">
          <div className="bg-white rounded-3xl border border-ocean-100 shadow-card p-10">
            <div className="text-5xl mb-5">🏆</div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              Our Commitment to You
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              At Keytone Life Sciences, quality control is more than a process — it is a commitment
              to excellence that runs through every level of our organization. We are dedicated to
              providing safe, effective, and reliable products that support the health and productivity
              of aquaculture operations worldwide. Trust Keytone Life Sciences for products backed
              by rigorous quality assurance at every stage.
            </p>
            <Link
              to="/certifications"
              className="inline-flex items-center gap-2 bg-ocean-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-ocean-800 transition-colors text-sm"
            >
              View Our Certifications <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Questions About Our Quality Standards?"
        subtext="Our technical team is happy to provide full product documentation, test reports, or facility details."
        primaryCTA={{ label: 'Contact Our QC Team', href: '/contact-us' }}
        secondaryCTA={{ label: 'View Certifications', href: '/certifications' }}
      />
    </>
  )
}
