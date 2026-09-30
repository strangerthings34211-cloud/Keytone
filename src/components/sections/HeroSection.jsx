import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

/**
 * Reusable page-level hero section (not the home slider).
 * Used on About, Products, Blog, Contact, etc.
 */
export default function HeroSection({
  backgroundImage,
  overlay = 'gradient',
  tag,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  chips,
  size = 'large',
  breadcrumbs,
  children,
  className,
}) {
  const heights = {
    full:   'min-h-screen',
    large:  'min-h-[460px] sm:min-h-[560px] lg:min-h-[660px]',
    medium: 'min-h-[320px] sm:min-h-[380px] lg:min-h-[480px]',
    small:  'min-h-[220px] sm:min-h-[260px] lg:min-h-[320px]',
  }

  const overlayStyle =
    overlay === 'gradient'
      ? { background: 'linear-gradient(to right, rgba(6,29,74,0.93) 0%, rgba(6,29,74,0.70) 55%, rgba(6,29,74,0.25) 100%)' }
      : overlay === 'dark'
      ? { background: 'rgba(6,29,74,0.78)' }
      : { background: 'linear-gradient(135deg, rgba(11,61,145,0.92) 0%, rgba(14,165,196,0.85) 100%)' }

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden',
        heights[size] ?? heights.large,
        className
      )}
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            role="presentation"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      )}

      {/* No image fallback — ocean gradient */}
      {!backgroundImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #061D4A 0%, #0B3D91 100%)' }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-ocean-950/30 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Content */}
      <div className="container-xl relative z-10 pt-24 pb-10 sm:py-20 lg:py-28">
        {breadcrumbs && (
          <Breadcrumb items={breadcrumbs} light className="mb-5" />
        )}

        {tag && (
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {tag}
          </div>
        )}

        <h1
          className={cn(
            'font-display font-extrabold text-white leading-tight mb-4',
            size === 'full' || size === 'large'
              ? 'text-4xl sm:text-5xl lg:text-[3.5rem]'
              : 'text-3xl sm:text-4xl lg:text-[2.75rem]'
          )}
        >
          {headline}
        </h1>

        {subheadline && (
          <p className="text-white/75 text-lg max-w-xl mb-7 leading-relaxed">
            {subheadline}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap gap-3 mb-7">
            {primaryCTA && (
              <Link
                to={primaryCTA.href}
                className="inline-flex items-center gap-2 bg-white text-ocean-800 font-bold px-7 py-3.5 rounded-full hover:bg-ocean-50 transition-all duration-200 shadow-lg text-sm"
              >
                {primaryCTA.label} <ArrowRight size={14} />
              </Link>
            )}
            {secondaryCTA && (
              <Link
                to={secondaryCTA.href}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-all duration-200 text-sm"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}

        {chips && chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full bg-teal-400" />
                {chip}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  )
}
