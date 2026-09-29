import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Ship, Award, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import SectionHeader from '@/components/ui/SectionHeader'

// SVG Country Flags for 100% reliable, crisp visual rendering across all operating systems & browsers
function CountryFlag({ code, className = "w-8 h-6" }) {
  const flags = {
    IN: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#f4f5f0" d="M0 0h640v480H0z"/>
        <path fill="#f93" d="M0 0h640v160H0z"/>
        <path fill="#128807" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="56" fill="none" stroke="#000088" strokeWidth="6"/>
        <circle cx="320" cy="240" r="14" fill="#000088"/>
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="320"
            y1="240"
            x2={320 + 54 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={240 + 54 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000088"
            strokeWidth="2.5"
          />
        ))}
      </svg>
    ),
    ID: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#e70011" d="M0 0h640v240H0z"/>
        <path fill="#ffffff" d="M0 240h640v240H0z"/>
      </svg>
    ),
    VN: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#da251d" d="M0 0h640v480H0z"/>
        <polygon
          fill="#ff0"
          points="320,110 357,224 477,224 380,295 417,409 320,338 223,409 260,295 163,224 283,224"
        />
      </svg>
    ),
    MY: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} fill={i % 2 === 0 ? "#cc0000" : "#ffffff"} d={`M0 ${i * 34.28}h640v34.29H0z`} />
          ))}
        </g>
        <path fill="#000066" d="M0 0h340v240H0z"/>
        <circle cx="160" cy="120" r="75" fill="#ffcc00"/>
        <circle cx="185" cy="120" r="65" fill="#000066"/>
        <polygon
          fill="#ffcc00"
          points="210,120 220,105 235,115 230,95 250,95 235,80 250,70 230,70 230,50 215,65 205,50 205,70 185,70 200,80 185,95 205,95 200,115"
          transform="scale(1.2) translate(-30, 20)"
        />
      </svg>
    ),
    BD: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#006a4e" d="M0 0h640v480H0z"/>
        <circle cx="280" cy="240" r="140" fill="#f42a41"/>
      </svg>
    ),
    SA: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#006c35" d="M0 0h640v480H0z"/>
        <path fill="#ffffff" d="M180 340h280v16H180z M200 325l-20 23 20 23v-12h240v-22h-240z"/>
        <circle cx="320" cy="200" r="45" fill="none" stroke="#fff" strokeWidth="8"/>
        <path fill="#fff" d="M260 215h120v10H260z M290 170h60v10h-60z"/>
      </svg>
    ),
    AE: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#00732f" d="M160 0h480v160H160z"/>
        <path fill="#ffffff" d="M160 160h480v160H160z"/>
        <path fill="#000000" d="M160 320h480v160H160z"/>
        <path fill="#ff0000" d="M0 0h160v480H0z"/>
      </svg>
    ),
    OM: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#ffffff" d="M160 0h480v160H160z"/>
        <path fill="#db161b" d="M160 160h480v160H160z"/>
        <path fill="#008000" d="M160 320h480v160H160z"/>
        <path fill="#db161b" d="M0 0h160v480H0z"/>
        <circle cx="80" cy="80" r="28" fill="none" stroke="#fff" strokeWidth="6"/>
      </svg>
    ),
    BR: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <path fill="#009739" d="M0 0h640v480H0z"/>
        <path fill="#fedd00" d="M320 40L600 240 320 440 40 240z"/>
        <circle cx="320" cy="240" r="110" fill="#012169"/>
        <path fill="#ffffff" d="M215 225a112 112 0 0 1 210 30c-25-10-85-20-210-30z"/>
      </svg>
    ),
    US: (
      <svg viewBox="0 0 640 480" className={cn("rounded-md shadow-sm object-cover", className)}>
        <g>
          {Array.from({ length: 13 }).map((_, i) => (
            <path key={i} fill={i % 2 === 0 ? "#b22234" : "#ffffff"} d={`M0 ${i * 36.92}h640v36.93H0z`} />
          ))}
        </g>
        <path fill="#3c3b6e" d="M0 0h280v258H0z"/>
        <circle cx="60" cy="50" r="8" fill="#fff"/>
        <circle cx="120" cy="50" r="8" fill="#fff"/>
        <circle cx="180" cy="50" r="8" fill="#fff"/>
        <circle cx="240" cy="50" r="8" fill="#fff"/>
        <circle cx="90" cy="90" r="8" fill="#fff"/>
        <circle cx="150" cy="90" r="8" fill="#fff"/>
        <circle cx="210" cy="90" r="8" fill="#fff"/>
        <circle cx="60" cy="130" r="8" fill="#fff"/>
        <circle cx="120" cy="130" r="8" fill="#fff"/>
        <circle cx="180" cy="130" r="8" fill="#fff"/>
        <circle cx="240" cy="130" r="8" fill="#fff"/>
        <circle cx="90" cy="170" r="8" fill="#fff"/>
        <circle cx="150" cy="170" r="8" fill="#fff"/>
        <circle cx="210" cy="170" r="8" fill="#fff"/>
        <circle cx="60" cy="210" r="8" fill="#fff"/>
        <circle cx="120" cy="210" r="8" fill="#fff"/>
        <circle cx="180" cy="210" r="8" fill="#fff"/>
        <circle cx="240" cy="210" r="8" fill="#fff"/>
      </svg>
    ),
  }

  return (
    <div className="relative inline-flex flex-shrink-0 items-center justify-center overflow-hidden rounded ring-1 ring-white/20 shadow-md">
      {flags[code] || (
        <span className="text-xs font-bold text-teal-300 bg-ocean-800 px-1.5 py-0.5 rounded">
          {code}
        </span>
      )}
    </div>
  )
}

const GLOBAL_MARKET_CARDS = [
  {
    code: 'IN',
    country: 'India',
    region: 'South Asia',
    category: 'asia',
    badge: 'HQ & Manufacturing',
    focus: 'Vannamei & Freshwater Fish',
    activePondHub: true,
  },
  {
    code: 'ID',
    country: 'Indonesia',
    region: 'Southeast Asia',
    category: 'asia',
    badge: 'Major Export Hub',
    focus: 'Shrimp Pond Ecosystems',
    activePondHub: true,
  },
  {
    code: 'VN',
    country: 'Vietnam',
    region: 'Southeast Asia',
    category: 'asia',
    badge: 'High-Density Farms',
    focus: 'Gastro Probiotics & Minerals',
    activePondHub: true,
  },
  {
    code: 'MY',
    country: 'Malaysia',
    region: 'Southeast Asia',
    category: 'asia',
    badge: 'Marine Aquaculture',
    focus: 'Pond Water & Soil Remediation',
    activePondHub: true,
  },
  {
    code: 'BD',
    country: 'Bangladesh',
    region: 'South Asia',
    category: 'asia',
    badge: 'Delta Aqua Farms',
    focus: 'Carp & Black Tiger Shrimps',
    activePondHub: true,
  },
  {
    code: 'SA',
    country: 'Saudi Arabia',
    region: 'Middle East',
    category: 'middle-east',
    badge: 'Red Sea Marine Farms',
    focus: 'Saline Aquaculture Formulations',
    activePondHub: true,
  },
  {
    code: 'AE',
    country: 'UAE',
    region: 'Middle East',
    category: 'middle-east',
    badge: 'Desert RAS Facilities',
    focus: 'Recirculating Water Bio-Security',
    activePondHub: true,
  },
  {
    code: 'OM',
    country: 'Oman',
    region: 'Middle East',
    category: 'middle-east',
    badge: 'Coastal Shrimp Farming',
    focus: 'Water Conditioning & Immune Feeds',
    activePondHub: true,
  },
  {
    code: 'BR',
    country: 'Brazil',
    region: 'Latin America',
    category: 'americas',
    badge: 'Northeast Shrimp Cluster',
    focus: 'Broad-Spectrum Pond Stabilizers',
    activePondHub: true,
  },
  {
    code: 'US',
    country: 'United States',
    region: 'North America',
    category: 'americas',
    badge: 'Sustainable Aqua Labs',
    focus: 'Organic Bio-Remediation & Enzymes',
    activePondHub: true,
  },
]

export default function GlobalReachSection({ title, subtitle, className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredMarkets = selectedFilter === 'all'
    ? GLOBAL_MARKET_CARDS
    : GLOBAL_MARKET_CARDS.filter(m => m.category === selectedFilter)

  return (
    <section
      className={cn("section-py relative overflow-hidden text-white", className)}
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0d4285 0%, #061D4A 55%, #03102c 100%)',
      }}
    >
      {/* Dynamic Animated Ambient Flora Movement */}
      <SectionBackgroundFlora variant="ocean" withPetals={true} withRipples={true} />

      {/* High-tech Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(20,184,166,0.25)] backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 animate-spin-slow text-teal-300" />
            <span>Global Reach &amp; Exports</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            {title || "Serving Farmers Worldwide"}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-ocean-100/90 font-normal leading-relaxed">
            {subtitle || "From Indian coastlines to international waters — supplying biotechnology formulations to aquaculture farms across 10+ countries."}
          </p>
        </div>

        {/* Global Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-9">
          {[
            { icon: Globe, label: '10+ Export Countries', desc: 'Asia, Middle East & Americas', color: 'from-cyan-400 to-blue-500' },
            { icon: Ship, label: 'Direct Port Dispatch', desc: 'Visakhapatnam & Chennai Ports', color: 'from-teal-400 to-emerald-500' },
            { icon: Award, label: '100% Export Certified', desc: 'GMP, HACCP, ISO & CAA Registered', color: 'from-amber-400 to-orange-500' },
            { icon: ShieldCheck, label: 'Quality Assured', desc: 'Climate-Stable Micro-Formulations', color: 'from-emerald-400 to-teal-500' },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div 
                key={idx}
                className="flex items-center gap-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-teal-400/50 rounded-2xl p-3.5 backdrop-blur-md transition-all duration-300 shadow-sm group"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br shadow-inner", stat.color)}>
                  <Icon className="w-5 h-5 text-ocean-950 font-bold" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-teal-300 transition-colors">
                    {stat.label}
                  </h4>
                  <p className="text-[10px] text-cyan-200/70 font-medium truncate">
                    {stat.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          {[
            { id: 'all', label: 'All Global Markets (10)' },
            { id: 'asia', label: 'Asia & Southeast Asia (5)' },
            { id: 'middle-east', label: 'Middle East (3)' },
            { id: 'americas', label: 'Americas (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 backdrop-blur-sm border",
                selectedFilter === tab.id
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-ocean-950 border-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.4)] scale-105"
                  : "bg-white/[0.06] text-white/80 border-white/15 hover:bg-white/[0.12] hover:text-white hover:border-white/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 10 Country Cards Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-10"
        >
          {filteredMarkets.map((market, i) => (
            <div
              key={market.country}
              className={cn(
                'relative group overflow-hidden rounded-2xl p-4',
                'bg-gradient-to-b from-white/[0.12] to-white/[0.04]',
                'hover:from-white/[0.22] hover:to-teal-900/40',
                'border border-white/20 hover:border-teal-400/80',
                'backdrop-blur-md shadow-lg hover:shadow-[0_10px_30px_rgba(20,184,166,0.25)]',
                'transition-all duration-300 hover:-translate-y-1.5 cursor-pointer',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              {/* Card Ambient Glow Top Right */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-400/20 rounded-full blur-xl group-hover:bg-teal-400/40 transition-all duration-500 pointer-events-none" />

              {/* Card Header with Flag & Code */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <CountryFlag code={market.code} className="w-9 h-6 shadow-md" />
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-extrabold leading-tight group-hover:text-teal-300 transition-colors">
                      {market.country}
                    </h3>
                    <span className="text-[10px] font-semibold text-teal-300/90 block">
                      {market.region}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-ocean-950/80 border border-teal-400/30 text-teal-300 text-[10px] font-mono font-black tracking-wider">
                  {market.code}
                </span>
              </div>

              {/* Card Focus / Strength */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-cyan-200/70 font-medium truncate flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  {market.focus}
                </span>
              </div>

              {/* Active Indicator Pin */}
              <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-teal-200/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Active Supply Port
                </span>
                <span className="text-white/40 group-hover:text-teal-300 transition-colors">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/exports"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-ocean-950 font-black px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(45,212,191,0.4)] text-sm hover:scale-105 hover:shadow-[0_0_35px_rgba(45,212,191,0.6)]"
          >
            <Sparkles className="w-4 h-4 text-ocean-950" />
            <span>Become an International Distributor</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-teal-400/60 text-white font-bold px-7 py-4 rounded-full transition-all duration-300 shadow-md text-sm hover:scale-105"
          >
            <Send size={15} className="text-teal-300" />
            <span>Inquire for Custom Formulations</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
