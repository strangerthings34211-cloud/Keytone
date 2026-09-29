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

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-6 md:mb-8 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.id}
              className={cn(
                'flex flex-col items-center justify-between bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 h-full',
                'hover:border-teal-400/80 hover:shadow-card hover:-translate-y-1 shadow-sm',
                'transition-all duration-300 cursor-default group w-full text-center',
                i === 4 ? 'col-span-2 sm:col-span-1 max-w-[260px] sm:max-w-none mx-auto' : '',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${i * 80}ms`, transition: 'all 0.4s ease' }}
            >
              {/* Real cert image */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-2 shrink-0 p-1">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to emoji icon if image fails
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-ocean-50 text-ocean-700 text-2xl sm:text-3xl items-center justify-center hidden"
                >
                  {cert.icon}
                </div>
              </div>

              <div className="text-center w-full mt-auto">
                <p className="font-display font-bold text-xs sm:text-sm text-ocean-950 group-hover:text-teal-700 transition-colors leading-tight line-clamp-1">
                  {cert.name}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1 leading-tight line-clamp-1">
                  {cert.fullName.split(' ').slice(0, 3).join(' ')}
                </p>
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
