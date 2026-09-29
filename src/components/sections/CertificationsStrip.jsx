import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import { CERTIFICATIONS } from '@/data/certifications'

export default function CertificationsStrip({ className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={cn('section-py section-white relative overflow-hidden', className)}>
      <SectionBackgroundFlora variant="gold" withPetals={true} withRipples={true} />
      <div className="container-xl relative z-10">
        <SectionHeader
          tag="Certifications"
          title="Internationally Certified Quality"
          subtitle="Every product we manufacture meets strict global standards — certified and verified by trusted regulatory authorities."
        />

        <div ref={ref} className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.id}
              className={cn(
                'flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-5',
                'hover:border-ocean-300 hover:shadow-card hover:-translate-y-1',
                'transition-all duration-300 cursor-default group min-w-[140px]',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${i * 80}ms`, transition: 'all 0.4s ease' }}
            >
              {/* Real cert image */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to emoji icon if image fails
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div
                  className="w-16 h-16 rounded-xl bg-ocean-50 text-ocean-700 text-3xl items-center justify-center hidden"
                >
                  {cert.icon}
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm text-ocean-900 group-hover:text-ocean-700 transition-colors leading-tight">
                  {cert.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{cert.fullName.split(' ').slice(0, 3).join(' ')}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/certifications"
            className="inline-flex items-center gap-2 text-ocean-700 font-semibold hover:text-teal-600 transition-colors text-sm"
          >
            View All Certifications <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
