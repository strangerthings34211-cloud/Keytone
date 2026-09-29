import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import HeroSection from '@/components/sections/HeroSection'
import CTABanner from '@/components/sections/CTABanner'
import SectionHeader from '@/components/ui/SectionHeader'
import ApplicationForm from '@/components/forms/ApplicationForm'

const WHY_KEYTONE = [
  { icon: '🔬', title: 'Innovative Culture',    desc: 'Work at the cutting edge of aquaculture science with a team that values curiosity, creativity, and continuous learning.' },
  { icon: '🌱', title: 'Growth Opportunities', desc: 'We invest in our people. From training programs to leadership development, your career growth is our priority.' },
  { icon: '🌊', title: 'Real Farmer Impact',   desc: 'Your work directly improves the livelihoods of thousands of aquaculture farmers across India and globally.' },
  { icon: '🤝', title: 'Team Spirit',           desc: 'We celebrate together, learn from each other, and maintain a culture where every voice is heard and valued.' },
]

const OPEN_POSITIONS = [
  {
    title: 'Open Application',
    department: 'All Departments',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    desc: 'Don\'t see your role listed? We\'re always looking for talented, passionate people to join our team. Send us your application and tell us how you can contribute.',
  },
]

const DEPARTMENTS = [
  { name: 'Research & Development',    desc: 'Scientists, biologists, and formulators driving product innovation.' },
  { name: 'Sales & Marketing',         desc: 'Building relationships with farmers, distributors, and partners.' },
  { name: 'Manufacturing & QC',        desc: 'Ensuring every product meets our rigorous quality standards.' },
  { name: 'Technical Support',         desc: 'Providing expert guidance to farmers and distributors.' },
  { name: 'Export & International',    desc: 'Expanding our reach into global aquaculture markets.' },
  { name: 'Finance & Operations',      desc: 'Keeping the engine running efficiently.' },
]

export default function CareersPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection
        backgroundImage="/images/banner-3.jpg"
        overlay="gradient"
        size="medium"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        tag="Careers"
        headline="Join the Keytone Team"
        subheadline="Help us revolutionize aquaculture across India and around the world. We're looking for passionate people who want to make a difference."
        chips={['Hyderabad, India', 'Growing Team', 'Meaningful Work']}
      />

      {/* Why Work With Us */}
      <section className="section-py section-white">
        <div className="container-xl">
          <SectionHeader
            tag="Life at Keytone"
            title="Why Work With Us"
            subtitle="We are a community of innovators, researchers, and changemakers building the future of sustainable aquaculture."
          />
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_KEYTONE.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  'bg-white rounded-2xl p-6 border border-slate-100 shadow-card text-center',
                  'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-ocean-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture section */}
      <section className="section-py section-light">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-teal-600 text-sm font-semibold tracking-widest uppercase mb-4">
                Our Culture
              </span>
              <h2 className="font-display font-bold text-3xl text-ocean-900 mb-5 leading-tight">
                We Work Hard and Play Hard
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                At Keytone Life Sciences, we offer a dynamic and inclusive work environment where
                creativity, teamwork, and fun are celebrated. From team-building activities and
                social events to wellness programs and professional development opportunities, we
                strive to create a workplace where every employee feels valued, supported, and inspired.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Since our inception in 2012, we have been on a mission to revolutionize the
                aqua supplement industry. As a member of our team, you will have the opportunity
                to contribute to meaningful work that impacts the lives of farmers and the health
                of our planet's aquatic ecosystems.
              </p>
              {/* Benefits list */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Competitive salary', 'Health benefits',
                  'Learning budget', 'Team events',
                  'Growth path', 'Flexible hours',
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/images/banner-4.jpg"
                alt="Keytone team at work"
                className="w-full h-80 object-cover rounded-3xl shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-py section-white">
        <div className="container-xl">
          <SectionHeader
            tag="Open Positions"
            title="Current Opportunities"
            subtitle="Explore our current openings or submit a general application."
          />

          <div className="space-y-4 mb-10">
            {OPEN_POSITIONS.map((pos) => (
              <div
                key={pos.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-ocean-300 hover:shadow-card transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ocean-900 mb-1">{pos.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-ocean-50 text-ocean-700 border border-ocean-100 px-2.5 py-1 rounded-full font-medium">
                        {pos.department}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                        📍 {pos.location}
                      </span>
                      <span className="text-xs bg-teal-50 text-teal-700 border border-teal-100 px-2.5 py-1 rounded-full font-medium">
                        {pos.type}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{pos.desc}</p>
                  </div>
                  <a
                    href="#apply"
                    className="shrink-0 bg-ocean-700 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-ocean-800 transition-colors text-sm whitespace-nowrap"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Departments we hire for */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
            <h3 className="font-display font-bold text-xl text-ocean-900 mb-5">Departments We Hire For</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.name} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{dept.name}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{dept.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-py section-light" id="apply">
        <div className="container-xl max-w-2xl mx-auto">
          <SectionHeader
            tag="Apply Now"
            title="Start Your Career at Keytone"
            subtitle="We'd love to hear from you. Fill in the form below and we'll review your application."
          />
          <ApplicationForm />
        </div>
      </section>

      <CTABanner
        headline="Questions About Working at Keytone?"
        subtext="Feel free to reach out to our HR team with any questions about careers, culture, or opportunities."
        primaryCTA={{ label: 'Contact HR Team', href: '/contact-us' }}
        secondaryCTA={{ label: 'View Our Products', href: '/products' }}
      />
    </>
  )
}
