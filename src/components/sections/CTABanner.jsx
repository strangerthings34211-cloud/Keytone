import { Link } from 'react-router-dom'
import { ArrowRight, Phone, MessageSquare } from 'lucide-react'
import { cn } from '@/utils/cn'
import { SITE_IMAGES } from '@/data/certifications'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'

export default function CTABanner({
  headline = "Ready to Boost Your Farm's Productivity?",
  subtext = 'Talk to our aquaculture experts and find the right products for your shrimp or fish operation.',
  primaryCTA = { label: 'Get Expert Consultation', href: '/contact-us' },
  secondaryCTA = { label: 'View All Products', href: '/products' },
  className,
}) {
  return (
    <section
      className={cn('relative overflow-hidden section-py', className)}
      style={{ background: 'linear-gradient(135deg, #061D4A 0%, #0B3D91 55%, #0EA5C4 100%)' }}
    >
      <SectionBackgroundFlora
        variant="ocean"
        withPetals={true}
        withRipples={true}
        withLeaves={true}
      />
      {/* Background texture from real site */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <img
          src={SITE_IMAGES.exportsPond}
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Get in Touch
          </div>

          <h2
            className="font-display font-extrabold text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {headline}
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {subtext}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link
              to={primaryCTA.href}
              className="inline-flex items-center gap-2 bg-white text-ocean-800 font-bold px-7 py-3.5 rounded-full hover:bg-ocean-50 transition-all duration-200 shadow-xl text-sm"
            >
              {primaryCTA.label} <ArrowRight size={15} />
            </Link>
            <Link
              to={secondaryCTA.href}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-all duration-200 text-sm"
            >
              {secondaryCTA.label}
            </Link>
          </div>

          {/* Contact quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-7">
            <a
              href="tel:+919959002666"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-teal-500 flex items-center justify-center transition-colors">
                <Phone size={14} />
              </div>
              +91 9959 002 666
            </a>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <a
              href="https://wa.me/919959002666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#25D366] flex items-center justify-center transition-colors">
                <MessageSquare size={14} />
              </div>
              WhatsApp Us
            </a>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <a
              href="mailto:info@keytonelifesciences.com"
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              info@keytonelifesciences.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
