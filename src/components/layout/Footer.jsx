import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { CATEGORIES } from '@/data/products'
import { CERTIFICATIONS } from '@/data/certifications'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'

const QUICK_LINKS = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Research & Development', href: '/research-development' },
  { label: 'Quality Control', href: '/quality-control' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Exports', href: '/exports' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

// Authentic Brand Social Media Channels with Distinct Colors and Styling
const SOCIAL_CHANNELS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    colorClasses:
      'bg-[#1877F2]/15 text-[#1877F2] border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.5)]',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com',
    colorClasses:
      'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    colorClasses:
      'bg-[#0A66C2]/15 text-[#0A66C2] border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    colorClasses:
      'bg-[#E4405F]/15 text-[#E4405F] border-[#E4405F]/30 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent hover:shadow-[0_0_15px_rgba(228,64,95,0.5)]',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    colorClasses:
      'bg-[#FF0000]/15 text-[#FF0000] border-[#FF0000]/30 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919959002666',
    colorClasses:
      'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.5)]',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-slate-950 text-white">
      {/* ── Background Moving Flowers & Particles ── */}
      <SectionBackgroundFlora
        variant="dark"
        withPetals={true}
        withRipples={true}
        withLeaves={true}
      />

      {/* Main footer body */}
      <div className="container-xl py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Social Media (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/images/keytone-official-logo.png"
                alt="Keytone Life Sciences"
                className="h-12 w-auto object-contain brightness-110 drop-shadow-md group-hover:scale-105 transition-transform"
              />
            </Link>

            <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-sm">
              GMP, HACCP &amp; ISO 9001:2015 certified biotechnology aquaculture
              formulations for shrimp and fish farming. Trusted by commercial farmers across India and 10+ global export markets since 2012.
            </p>

            {/* Certification Badges Strip */}
            <div className="flex flex-wrap gap-2 pt-1">
              {CERTIFICATIONS.slice(0, 3).map((cert) => (
                <span
                  key={cert.id}
                  className="text-[11px] bg-white/10 text-teal-200 border border-teal-400/25 px-3 py-1 rounded-full font-semibold backdrop-blur-sm"
                >
                  ✓ {cert.name}
                </span>
              ))}
            </div>

            {/* ── Social Media Channels with Distinct Vibrant Brand Colors ── */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-1.5">
                <Sparkles size={13} className="text-teal-400" /> Connect With Us:
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_CHANNELS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-sm ${item.colorClasses}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Products (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-teal-300 mb-4 pb-2 border-b border-white/10">
              Product Categories
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="flex items-center gap-2 text-xs sm:text-sm text-white/75 hover:text-teal-300 transition-colors group"
                  >
                    <span className="text-xs">{cat.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {cat.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-teal-300 mb-4 pb-2 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-white/75 hover:text-teal-300 transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-teal-400 opacity-60 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-extrabold text-xs uppercase tracking-widest text-teal-300 mb-4 pb-2 border-b border-white/10">
              Direct Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919959002666"
                  className="flex items-start gap-3 text-xs sm:text-sm text-white/80 hover:text-teal-300 transition-colors group bg-white/5 hover:bg-white/10 p-2.5 rounded-2xl border border-white/10"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shrink-0">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">
                      Phone / WhatsApp
                    </p>
                    <span className="font-bold text-white group-hover:text-teal-300">
                      +91 9959 002 666
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@keytonelifesciences.com"
                  className="flex items-start gap-3 text-xs sm:text-sm text-white/80 hover:text-teal-300 transition-colors group bg-white/5 hover:bg-white/10 p-2.5 rounded-2xl border border-white/10"
                >
                  <div className="w-8 h-8 rounded-xl bg-ocean-500/20 text-ocean-300 border border-ocean-400/30 flex items-center justify-center shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">
                      Email Address
                    </p>
                    <span className="font-bold text-white group-hover:text-teal-300">
                      info@keytonelifesciences.com
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-white/80 bg-white/5 p-2.5 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold">
                    Headquarters
                  </p>
                  <span className="font-medium text-white/90">
                    Hyderabad, Telangana, India
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="border-t border-white/10 bg-ocean-950/90 relative z-10">
        <div className="container-xl py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 text-xs text-white/65">
            <p>
              &copy; {new Date().getFullYear()} <strong>Keytone Life Sciences Pvt. Ltd.</strong> All rights reserved.
            </p>

            {/* Developed by Haara AI Solutions & Services */}
            <div className="flex items-center gap-1.5">
              <span className="text-white/60">Developed by</span>
              <a
                href="https://haara.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-teal-300 hover:text-cyan-200 transition-colors underline decoration-teal-400/50 hover:decoration-cyan-300"
              >
                Haara AI Solutions &amp; Services
              </a>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/privacy-policy" className="hover:text-teal-300 transition-colors">
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link to="/contact-us" className="hover:text-teal-300 transition-colors">
                Farm Consultation
              </Link>
              <span>&bull;</span>
              <span>ISO 9001:2015 &amp; GMP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
