import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import { SITE_IMAGES } from '@/data/certifications'

const RD_PILLARS = [
  {
    icon: '💡',
    title: 'Innovation for Sustainable Aquaculture',
    desc: 'Our R&D efforts are driven by a passion for innovation and a commitment to addressing the evolving needs of the aquaculture industry. We leverage the latest advancements in science, technology, and industry trends to develop novel products that optimize growth, improve disease resistance, and enhance overall farm productivity.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Partnerships',
    desc: 'We work closely with leading aquaculture experts, research institutions, and industry stakeholders to exchange knowledge, share insights, and foster innovation. These partnerships enable us to leverage diverse expertise and resources, driving breakthrough advancements in aqua supplement products and techniques.',
  },
  {
    icon: '🏛️',
    title: 'Cutting-Edge Facilities',
    desc: 'Our state-of-the-art R&D facility in Hyderabad is equipped with advanced laboratory equipment and technology. From molecular biology and genetics to nutrition and microbiology, our multidisciplinary approach enables us to explore the full range of areas critical to developing high-quality supplements.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Solutions',
    desc: 'We are committed to sustainability in all aspects of our R&D. From sourcing raw materials to developing manufacturing processes, we prioritize eco-friendly practices that minimize environmental impact and promote long-term sustainability in aquaculture.',
  },
  {
    icon: '🔄',
    title: 'Continuous Improvement',
    desc: 'Innovation is an ongoing journey. We constantly refine our products and processes to stay ahead of the curve. Through rigorous testing, evaluation, and field feedback, we strive to deliver superior aqua supplement products that meet the evolving needs of our customers.',
  },
  {
    icon: '🧬',
    title: 'Multidisciplinary Expertise',
    desc: 'Our research team comprises marine biologists, microbiologists, nutritionists, and aquaculture scientists who bring complementary expertise to every product development project — ensuring each formulation is grounded in robust, validated science.',
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Identify Farmer Needs',        desc: 'We engage directly with farmers and distributors to understand real on-farm challenges and product gaps.' },
  { num: '02', title: 'Literature & Lab Research',    desc: 'Our scientists review global aquaculture research and conduct preliminary laboratory studies.' },
  { num: '03', title: 'Formulation Development',      desc: 'Active ingredients are selected and blended into stable, bioavailable formulations.' },
  { num: '04', title: 'Field Trials',                 desc: 'Products are tested on farms across different species, environments, and geographies.' },
  { num: '05', title: 'Certification & Compliance',   desc: 'Formulations are validated against GMP, HACCP, and ISO 9001:2015 standards.' },
  { num: '06', title: 'Product Launch & Monitoring',  desc: 'Products are launched with full technical support, and post-launch feedback informs the next generation.' },
]

function ProcessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="section-py section-white">
      <div className="container-xl">
        <SectionHeader
          tag="Our Process"
          title="From Research to Your Farm"
          subtitle="A rigorous, science-driven product development pipeline that ensures every product delivers real results."
        />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={cn(
                'relative bg-white rounded-2xl border border-slate-100 p-6 shadow-card',
                'transition-all duration-500',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-display font-extrabold text-5xl text-ocean-50 absolute top-4 right-5 select-none pointer-events-none">
                {step.num}
              </span>
              <div className="relative z-10">
                <span className="inline-block bg-ocean-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Step {step.num}
                </span>
                <h3 className="font-display font-bold text-ocean-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function RDPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage={SITE_IMAGES.rdLab1}
        overlay="gradient"
        size="medium"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Research & Development' },
        ]}
        tag="Research & Development"
        headline="Innovation at the Core of Everything We Do"
        subheadline="Since 2012, our dedicated team of researchers and scientists has been at the forefront of developing cutting-edge aquaculture solutions."
        chips={['Hyderabad R&D Lab', 'Multidisciplinary Team', 'Field-Validated Products']}
      />

      {/* Introduction */}
      <section className="section-py section-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-teal-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Our Commitment
              </span>
              <h2 className="font-display font-bold text-3xl text-ocean-900 mb-5 leading-tight">
                Science That Serves Farmers
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  At Keytone Life Sciences, we are committed to continuous innovation and improvement
                  in the field of aqua supplement products. Our dedicated research team works
                  tirelessly to develop solutions that solve real on-farm challenges — not just
                  products that look good on paper.
                </p>
                <p>
                  Every Keytone product begins in the lab and is validated in the field before it
                  reaches your farm. We combine scientific rigor with practical aquaculture knowledge
                  to ensure our products deliver measurable, consistent results.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'Research Scientists', value: '10+' },
                  { label: 'Products Developed', value: '25+' },
                  { label: 'Field Trial Sites', value: '50+' },
                  { label: 'Years of R&D', value: '12+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-ocean-50 rounded-xl p-4 border border-ocean-100">
                    <p className="font-display font-extrabold text-2xl text-ocean-700">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={SITE_IMAGES.rdLab2}
                alt="Keytone Life Sciences R&D laboratory"
                className="w-full h-96 object-cover rounded-3xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* R&D Pillars */}
      <section className="section-py section-light">
        <div className="container-xl">
          <SectionHeader
            tag="R&D Pillars"
            title="The Foundations of Our Research"
            subtitle="Six core principles guide our research and development work at Keytone Life Sciences."
          />
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RD_PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className={cn(
                  'bg-white rounded-2xl p-6 border border-slate-100 shadow-card',
                  'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <h3 className="font-display font-bold text-ocean-900 mb-3 text-lg leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <ProcessSection />

      <CTABanner
        headline="Interested in R&D Partnerships?"
        subtext="We collaborate with research institutions, universities, and industry partners to drive aquaculture innovation forward."
        primaryCTA={{ label: 'Contact Our Research Team', href: '/contact-us?type=partnership' }}
        secondaryCTA={{ label: 'View Our Products', href: '/products' }}
      />
    </>
  )
}
