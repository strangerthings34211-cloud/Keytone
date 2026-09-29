import { useInView } from 'react-intersection-observer'
import { useCounter } from '@/hooks/useCounter'
import { cn } from '@/utils/cn'
import { STATS } from '@/data/certifications'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'

function StatItem({ stat, shouldStart }) {
  const count = useCounter(stat.value, 1800, shouldStart)

  return (
    <div className="flex flex-col items-center text-center py-4 md:py-5 px-3 relative z-10">
      <div className="font-display font-extrabold text-3xl lg:text-4xl text-white mb-0.5">
        {count}
        <span className="text-teal-300">{stat.suffix}</span>
      </div>
      <div className="text-white font-semibold text-sm mb-0.5">{stat.label}</div>
      <div className="text-white/60 text-[11px]">{stat.sublabel}</div>
    </div>
  )
}

export default function StatsStrip({ className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      ref={ref}
      className={cn('bg-gradient-ocean relative overflow-hidden', className)}
    >
      <SectionBackgroundFlora
        variant="ocean"
        withPetals={true}
        withRipples={true}
        withLeaves={false}
      />
      <div className="container-xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} shouldStart={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

