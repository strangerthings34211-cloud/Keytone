import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Microscope, Award,
  Globe, Users, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Phone, Sparkles,
  ZoomIn, Maximize2, X, Eye, Image as ImageIcon, ShieldCheck, Zap, Layers, Filter, CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utils/cn'
import TrustBar from '@/components/sections/TrustBar'
import StatsStrip from '@/components/sections/StatsStrip'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import CertificationsStrip from '@/components/sections/CertificationsStrip'
import CTABanner from '@/components/sections/CTABanner'
import VideoShowcaseSection from '@/components/sections/VideoShowcaseSection'
import GlobalReachSection from '@/components/sections/GlobalReachSection'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import AquacultureWaterSimulator from '@/components/ui/AquacultureWaterSimulator'


import CategoryCard from '@/components/products/CategoryCard'
import ProductCard from '@/components/products/ProductCard'
import BlogCard from '@/components/blog/BlogCard'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { CATEGORIES, getFeaturedProducts } from '@/data/products'
import { getRecentPosts } from '@/data/blogPosts'
import { EXPORT_MARKETS, SITE_IMAGES } from '@/data/certifications'


// ── Realistic Video Hero Section with Aquaculture Performance Showcase & Scroll Parallax ───
function HeroVideoSection() {
  const [activeHighlight, setActiveHighlight] = useState('iboost') // 'iboost' | 'keytoneps' | 'shooter'
  const [heroMuted, setHeroMuted] = useState(true)
  const heroVideoRef = useRef(null)

  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 800], [0, 180])
  const videoScale = useTransform(scrollY, [0, 800], [1.05, 1.18])
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.75, 0.92])

  const toggleHeroSound = () => {
    setHeroMuted(!heroMuted)
  }

  const HIGHLIGHTS = {
    iboost: {
      name: 'Keytone I Boost ™',
      tagline: 'β-Glucan + Probiotics + Multi-Enzymes',
      badge: '✨ Best Seller',
      icon: '🔬',
      image: '/images/Keytone-I-Boost.png',
      fallbackImage: '/images/I-Boost-1.png',
      link: '/products/enzymes/i-boost',
      stat1: { val: '1.18', label: 'Optimized FCR' },
      stat2: { val: '+38%', label: 'Higher Survival' },
      stat3: { val: '100%', label: 'Bio Safe' },
      highlightBadge: '⚡ 38% Immunity Boost',
      description: 'Strengthens hepatopancreas vitality, stimulates natural feeding response, and improves feed conversion efficiency across high-density ponds.'
    },
    keytoneps: {
      name: 'Keytone PS ™',
      tagline: 'Photosynthetic Probiotic Pond Bio-Remediator',
      badge: '💧 Water Care',
      icon: '💧',
      image: '/images/keytone-ps.png',
      link: '/products/water-quality-enhancers/keytone-ps',
      stat1: { val: '<0.01', label: 'Ammonia ppm' },
      stat2: { val: '+45%', label: 'DO Saturation' },
      stat3: { val: '0 CFU', label: 'Vibrio Control' },
      highlightBadge: '💧 Sludge & H₂S Control',
      description: 'Reduces toxic hydrogen sulfide (H₂S) and organic sludge, creating a stable, clean phytoplankton environment.'
    },
    shooter: {
      name: 'Keytone Shooter ™',
      tagline: 'Rapid White Feces & Gut Disorder Solution',
      badge: '🛡️ Gut Shield',
      icon: '🛡️',
      image: '/images/Keytone-shooter-White-Gut-Disease-solution-1.png',
      link: '/products/water-quality-enhancers/shooter',
      stat1: { val: '3 Days', label: 'WFS Control' },
      stat2: { val: '99%', label: 'Gut Bio-Shield' },
      stat3: { val: '+28%', label: 'Weight Gain' },
      highlightBadge: '🛡️ 3-Day Recovery',
      description: 'Clears white gut and running mortality by restoring beneficial intestinal microflora and gut mucosal barrier.'
    }
  }

  const current = HIGHLIGHTS[activeHighlight]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ocean-950">
      {/* 1. Realistic Parallax Background Video (Multi-Fish Aquaculture Water) */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
        style={{ y: videoY, scale: videoScale }}
      >
        {/* YouTube Seamless Multi-Fish Looping Background - Full Screen Desktop Cover */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/LVnqpYAFahQ?autoplay=1&mute=1&loop=1&playlist=LVnqpYAFahQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
            title="Aquaculture Multi-Fish Swimming Video"
            className="absolute top-1/2 left-1/2 w-[320vw] h-[320vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none border-0 opacity-90 scale-110"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Multi-layer Cinematic Overlays for Perfect Readability and High Contrast */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ocean-950/90 via-ocean-950/70 to-ocean-900/35"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/95 via-transparent to-ocean-950/40" />
        
        {/* Animated ambient glowing lights */}
        <div className="absolute top-1/4 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Floating Floral & Particle Effects */}
      <SectionBackgroundFlora
        variant="dark"
        withPetals={true}
        withRipples={true}
        withLeaves={true}
      />

      {/* Realistic Swimming Fish, Vannamei Prawns & Aeration Pond Simulation */}
      <AquacultureWaterSimulator
        className="absolute inset-0 pointer-events-none z-[3]"
        opacity={0.9}
        speciesCount={{ fish: 8, prawns: 7, bubbles: 40 }}
      />

      {/* Hero Video Audio Toggle Float */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-6 z-20 hidden md:flex items-center gap-2 bg-ocean-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-400/30 shadow-lg text-white text-xs">
        <button
          onClick={toggleHeroSound}
          className="flex items-center gap-2 text-teal-300 hover:text-white transition-colors cursor-pointer"
          title={heroMuted ? 'Turn Sound On' : 'Mute Sound'}
        >
          {heroMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-emerald-400 animate-pulse" />}
          <span className="text-[11px] font-semibold">{heroMuted ? 'Background Sound' : 'Sound Playing'}</span>
        </button>
      </div>

      {/* 2. Hero Content Grid */}
      <div className="container-xl relative z-10 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 max-w-3xl text-center lg:text-left">
            {/* Tag Badge with Glowing Indicator */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/10 backdrop-blur-xl border border-teal-400/40 text-teal-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-5 sm:mb-6 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 -ml-3" />
              Aquaculture Biotechnology &amp; Feed Supplements
            </div>

            {/* Main Headline */}
            <h1
              className="font-display font-black text-white leading-[1.08] sm:leading-[1.04] tracking-tight mb-4 sm:mb-6 drop-shadow-lg text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem]"
            >
              Healthy Culture,<br />
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(45,212,191,0.5)]">
                Wealthy Farmer
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal mx-auto lg:mx-0 drop-shadow-sm">
              GMP, ISO 9001 &amp; HACCP certified probiotics, enzymes, and water conditioners engineered to optimize FCR, boost natural immunity, and protect shrimp &amp; fish crops across 10+ global markets.
            </p>

            {/* Trust Badges Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-6 sm:mb-8 text-xs text-white/95">
              <div className="flex items-center gap-2 bg-ocean-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-500/30 shadow-sm">
                <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                <span className="font-medium">GMP &amp; ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 bg-ocean-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span className="font-medium">12+ Years Field-Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-ocean-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-sm">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                <span className="font-medium">10+ Global Markets</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-ocean-950 font-bold px-8 py-4 rounded-full hover:from-teal-300 hover:to-teal-400 transition-all duration-300 shadow-[0_4px_30px_rgba(45,212,191,0.45)] hover:shadow-[0_6px_35px_rgba(45,212,191,0.6)] hover:scale-105 text-sm sm:text-base cursor-pointer"
              >
                Explore 30+ Products <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Spotlight Formulation Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/30 via-cyan-500/20 to-emerald-500/30 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

            <div className="relative bg-gradient-to-b from-ocean-900/95 via-ocean-950/98 to-ocean-950 backdrop-blur-2xl border border-teal-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              
              {/* Selector Tabs Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                    <Sparkles size={11} className="text-teal-300" />
                  </div>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Featured Formulations
                  </span>
                </div>

                <div className="flex bg-ocean-900/90 p-0.5 rounded-lg border border-white/15 text-xs">
                  <button
                    onClick={() => setActiveHighlight('iboost')}
                    className={cn(
                      'px-2.5 py-1 rounded-md font-bold transition-all text-xs flex items-center gap-1 cursor-pointer',
                      activeHighlight === 'iboost'
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-ocean-950 shadow-md scale-105'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    <span>🔬</span> I-Boost
                  </button>
                  <button
                    onClick={() => setActiveHighlight('keytoneps')}
                    className={cn(
                      'px-2.5 py-1 rounded-md font-bold transition-all text-xs flex items-center gap-1 cursor-pointer',
                      activeHighlight === 'keytoneps'
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-ocean-950 shadow-md scale-105'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    <span>💧</span> Keytone PS
                  </button>
                  <button
                    onClick={() => setActiveHighlight('shooter')}
                    className={cn(
                      'px-2.5 py-1 rounded-md font-bold transition-all text-xs flex items-center gap-1 cursor-pointer',
                      activeHighlight === 'shooter'
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-ocean-950 shadow-md scale-105'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    <span>🛡️</span> Shooter
                  </button>
                </div>
              </div>

              {/* Compact Product Visual Showcase Box with Pedestal Glow */}
              <div className="relative rounded-xl bg-gradient-to-b from-ocean-900/60 to-ocean-950/80 border border-white/10 p-3 sm:p-3.5 flex flex-col items-center overflow-hidden">
                {/* Ambient Soft Pedestal Spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(45,212,191,0.25)_0%,transparent_75%)] pointer-events-none" />

                {/* Floating Top Badges */}
                <div className="w-full flex items-center justify-between mb-1 relative z-10">
                  <span className="bg-teal-500/20 backdrop-blur-md border border-teal-400/40 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-teal-300 shadow-sm flex items-center gap-1">
                    {current.badge}
                  </span>
                  <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 rounded-full px-2 py-0.5 text-[9px] font-bold text-emerald-300 tracking-wider">
                    ISO &middot; GMP CERTIFIED
                  </span>
                </div>

                {/* Product Packaging Image with Soft Shadow & Ambient Lighting */}
                <div className="my-1 h-24 sm:h-28 w-full flex items-center justify-center relative z-10">
                  <div className="relative flex items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-inner">
                    <img
                      src={current.image}
                      onError={(e) => {
                        if (current.fallbackImage && e.target.src !== current.fallbackImage) {
                          e.target.src = current.fallbackImage
                        }
                      }}
                      alt={current.name}
                      className="max-h-20 sm:max-h-24 max-w-[140px] sm:max-w-[170px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Title & Scientific Tagline */}
                <div className="text-center w-full mt-1 relative z-10">
                  <h3 className="text-white font-display font-bold text-sm sm:text-base tracking-tight">{current.name}</h3>
                  <p className="text-teal-300 text-[11px] sm:text-xs font-semibold">{current.tagline}</p>
                  <p className="text-slate-300 text-[11px] mt-1 line-clamp-2 leading-relaxed px-1 font-normal">
                    {current.description}
                  </p>
                </div>
              </div>

              {/* Compact Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 mt-2.5 text-center">
                <div className="bg-ocean-900/70 rounded-lg p-1.5 sm:p-2 border border-teal-400/20 hover:border-teal-400/40 transition-colors shadow-sm">
                  <p className="text-teal-300 font-black text-sm sm:text-base leading-tight">{current.stat1.val}</p>
                  <p className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">{current.stat1.label}</p>
                </div>
                <div className="bg-ocean-900/70 rounded-lg p-1.5 sm:p-2 border border-emerald-400/20 hover:border-emerald-400/40 transition-colors shadow-sm">
                  <p className="text-emerald-300 font-black text-sm sm:text-base leading-tight">{current.stat2.val}</p>
                  <p className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">{current.stat2.label}</p>
                </div>
                <div className="bg-ocean-900/70 rounded-lg p-1.5 sm:p-2 border border-cyan-400/20 hover:border-cyan-400/40 transition-colors shadow-sm">
                  <p className="text-cyan-300 font-black text-sm sm:text-base leading-tight">{current.stat3.val}</p>
                  <p className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">{current.stat3.label}</p>
                </div>
              </div>

              {/* Bottom Quick Link & Highlights */}
              <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-teal-300/90 font-medium flex items-center gap-1">
                  {current.highlightBadge}
                </span>
                <Link
                  to={current.link}
                  className="text-teal-300 hover:text-white font-bold inline-flex items-center gap-1 transition-colors group"
                >
                  Dosage &amp; Specs <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator with smooth scrolling */}
      <button
        onClick={() => {
          const target = document.getElementById('home-content')
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 z-20 group text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down to home content"
      >
        <span className="text-white/50 group-hover:text-teal-300 text-[11px] font-semibold tracking-widest uppercase rotate-90 origin-center mb-5 transition-colors">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 group-hover:border-teal-400 flex items-start justify-center p-1 transition-colors">
          <div className="w-1.5 h-2.5 bg-teal-400 rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  )
}

// ── Why Choose Us ───────────────────────────────────────────────
const WHY_ITEMS = [
  {
    icon: <Microscope size={24} />,
    color: 'bg-ocean-50 text-ocean-700',
    title: 'Research-Driven Formulations',
    desc: 'Every product is developed by marine biologists, microbiologists, and nutritionists — then validated in real farm conditions before launch.',
  },
  {
    icon: <Award size={24} />,
    color: 'bg-teal-50 text-teal-700',
    title: 'GMP, HACCP & ISO 9001:2015',
    desc: 'Our manufacturing processes meet the strictest international quality and safety standards — certified and regularly audited.',
  },
  {
    icon: <Users size={24} />,
    color: 'bg-amber-50 text-amber-700',
    title: 'Trusted by 1,000+ Farmers',
    desc: 'Over a decade of supporting shrimp and fish farmers across India and internationally, with dedicated on-farm technical support.',
  },
  {
    icon: <Globe size={24} />,
    color: 'bg-green-50 text-green-700',
    title: '10+ Global Export Markets',
    desc: 'We serve aquaculture farmers in Southeast Asia, the Middle East, Latin America, and the United States with certified products.',
  },
]

function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-py section-white relative overflow-hidden">
      <SectionBackgroundFlora variant="white" withPetals={true} withLeaves={true} />
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Left: images stack */}
          <div className="relative">
            {/* Main image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[380px] lg:h-[480px]">
              <img
                src={SITE_IMAGES.homeTeam}
                alt="Keytone Life Sciences team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Inset image bottom-right */}
            <div className="absolute -bottom-6 -right-4 w-44 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden md:block">
              <img
                src={SITE_IMAGES.homeStudents}
                alt="Farmer training"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -left-4 top-10 bg-white rounded-2xl shadow-xl px-5 py-4 hidden md:flex flex-col items-center gap-1 border border-ocean-50">
              <span className="font-display font-extrabold text-3xl text-ocean-700">12+</span>
              <span className="text-xs text-slate-500 font-medium text-center leading-tight">Years of<br/>Excellence</span>
            </div>
            {/* Certification badge */}
            <div className="absolute -right-4 top-10 bg-ocean-700 text-white rounded-2xl shadow-xl px-4 py-3 hidden md:flex flex-col items-center gap-1">
              <span className="text-lg">🏆</span>
              <span className="text-xs font-bold text-center leading-tight">ISO 9001<br/>:2015</span>
            </div>
          </div>

          {/* Right: content */}
          <div ref={ref}>
            <span className="inline-block text-teal-600 text-xs md:text-sm font-semibold tracking-widest uppercase mb-2">
              Why Choose Keytone
            </span>
            <h2 className="font-display font-extrabold text-ocean-900 leading-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)' }}>
              Science-Backed Solutions<br />
              <span className="text-gradient">for Every Farm</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6">
              We combine cutting-edge research with field-tested results to deliver aquaculture
              supplements that genuinely improve farm productivity, animal health, and your bottom line.
            </p>

            <div className="space-y-3 mb-6">
              {WHY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-100 bg-white shadow-sm',
                    'hover:shadow-card hover:-translate-y-0.5 transition-all duration-300',
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  )}
                  style={{ transitionDelay: `${i * 100}ms`, transition: 'all 0.5s ease' }}
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', item.color)}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-900 mb-0.5 text-sm md:text-base">{item.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <CheckCircle size={16} className="text-teal-400 shrink-0 mt-1 ml-auto" />
                </div>
              ))}
            </div>

            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 bg-ocean-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-ocean-800 transition-colors shadow-btn text-sm"
            >
              Learn More About Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Gallery Strips (real company photos) with Click-to-Highlight Lightbox ───
function CompanyGallery() {
  const images = [
    {
      src: SITE_IMAGES.homeTeam,
      alt: 'Keytone Scientific & Leadership Team',
      label: 'Our Research & Field Team',
      tag: 'Leadership & R&D',
      desc: 'Our passionate team of biotechnology scientists, aquaculture specialists, and field experts working collaboratively across India.'
    },
    {
      src: SITE_IMAGES.homeExhibition,
      alt: 'Aqua India Exhibition & Industry Conferences',
      label: 'Industry Exhibitions',
      tag: 'Global Expos',
      desc: 'Showcasing our research-driven probiotic formulations and pond water remediation products at premier aquaculture expos.'
    },
    {
      src: SITE_IMAGES.homeStudents,
      alt: 'Aquaculture Farmer Training & Student Workshops',
      label: 'Farmer Training Workshops',
      tag: 'Capacity Building',
      desc: 'Conducting live demonstrations and technical workshops on water quality testing and bio-security protocols for farmers.'
    },
    {
      src: SITE_IMAGES.homeMeeting,
      alt: 'Business Technical Collaboration & Meetings',
      label: 'Strategic Partnerships',
      tag: 'Collaborations',
      desc: 'Engaging with regional distributors, aqua-health consultants, and international technical partners.'
    },
    {
      src: SITE_IMAGES.homeFarmer,
      alt: 'Direct Farm Support with I-Boost Formulations',
      label: 'Field Support & Pond Visits',
      tag: 'On-Site Impact',
      desc: 'Our technical officers assisting shrimp farmers pond-side with custom feed supplementation and disease prevention guidance.'
    },
    {
      src: SITE_IMAGES.aboutSustain,
      alt: 'Sustainable & Affordable Aquaculture Farming',
      label: 'Sustainable Aquaculture',
      tag: 'Eco Formulations',
      desc: 'Pioneering eco-friendly microbial solutions to boost yield without harming aquatic biodiversity.'
    },
  ]

  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeImageIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveImageIndex(null)
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeImageIndex, images.length])

  return (
    <section className="section-py section-light relative overflow-hidden">
      <SectionBackgroundFlora variant="light" withPetals={true} withRipples={true} />
      
      <div className="container-xl relative z-10">
        <SectionHeader
          tag="Company Life"
          title="Our People, Our Purpose"
          subtitle="From the laboratory to coastal farms — explore Keytone Life Sciences in action (click any photo to inspect in detail)."
        />

        {/* Gallery Grid - Seamless gapless grid on mobile and desktop */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={cn(
                'relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl',
                'border border-slate-200/80 hover:border-teal-500/80',
                i === 0
                  ? 'h-44 sm:h-52 md:h-auto md:col-span-2 md:row-span-2 md:min-h-[380px]'
                  : 'h-44 sm:h-52 md:h-56',
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                'transition-all duration-500 hover:-translate-y-1'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Tag Badge Top Left */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-ocean-950/70 text-teal-300 border border-teal-400/40 backdrop-blur-md shadow-sm">
                  <Sparkles size={11} className="text-teal-300" />
                  {img.tag}
                </span>
              </div>

              {/* Center Highlight / Zoom Action Icon */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="flex flex-col items-center gap-1.5 bg-ocean-950/85 text-white px-4 py-2.5 rounded-full border border-teal-400/70 shadow-[0_0_20px_rgba(20,184,166,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-teal-300 font-extrabold text-xs">
                    <Maximize2 size={14} className="text-teal-300 animate-pulse" />
                    <span>Click to Highlight</span>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient Label */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end p-3.5 sm:p-5">
                <h4 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight group-hover:text-teal-300 transition-colors drop-shadow-md">
                  {img.label}
                </h4>
                <p className="text-cyan-200/80 text-[10px] sm:text-xs font-medium line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Highlighted Image Lightbox Modal ─── */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-ocean-950/90 backdrop-blur-xl"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-ocean-900/90 border border-teal-400/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col max-h-[92vh]"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-ocean-950/70 text-white">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    {images[activeImageIndex].tag}
                  </span>
                  <span className="text-xs text-cyan-200/70 font-semibold">
                    Image {activeImageIndex + 1} of {images.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveImageIndex(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-300 transition-colors shadow-md"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Main Highlighted Image Frame */}
              <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[380px] md:min-h-[440px]">
                <img
                  src={images[activeImageIndex].src}
                  alt={images[activeImageIndex].alt}
                  className="max-h-[60vh] w-full object-contain rounded-lg shadow-2xl transition-all duration-300 select-none"
                />

                {/* Left Arrow Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ocean-950/80 hover:bg-teal-500 hover:text-ocean-950 text-white border border-white/20 hover:border-teal-300 flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md group"
                  title="Previous image"
                >
                  <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex((prev) => (prev + 1) % images.length)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ocean-950/80 hover:bg-teal-500 hover:text-ocean-950 text-white border border-white/20 hover:border-teal-300 flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md group"
                  title="Next image"
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Caption & Metadata Footer */}
              <div className="p-4 sm:p-5 bg-ocean-950/90 border-t border-white/10 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-teal-400" />
                      {images[activeImageIndex].label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5 max-w-2xl leading-relaxed">
                      {images[activeImageIndex].desc}
                    </p>
                  </div>

                  <Link
                    to="/about-us"
                    onClick={() => setActiveImageIndex(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/40 hover:bg-teal-400 hover:text-ocean-950 transition-all duration-200 shrink-0 self-start md:self-auto"
                  >
                    <span>Read About Our Team</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Thumbnails Navigation Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10 pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        'relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200',
                        activeImageIndex === idx
                          ? 'border-teal-400 scale-105 shadow-[0_0_12px_rgba(45,212,191,0.6)]'
                          : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
                      )}
                    >
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ── Top-Performing Products Section with Interactive Filter & Trust Badges ───
function TopPerformingProductsSection({ featuredProducts, setEnquiryProduct }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filterTabs = [
    { id: 'all', label: 'All Best-Sellers', count: featuredProducts.length },
    { id: 'enzymes', label: 'Enzymes & Digestion' },
    { id: 'probiotics-prebiotics', label: 'Probiotics & Gut Care' },
    { id: 'growth-promoters', label: 'Growth & Vitality' },
    { id: 'immune-enhancers', label: 'Immune Shields' },
    { id: 'water-quality-enhancers', label: 'Water Enhancers' },
  ]

  const displayedProducts = activeCategory === 'all'
    ? featuredProducts
    : featuredProducts.filter(p => p.categoryId === activeCategory)

  return (
    <section className="section-py section-white relative overflow-hidden">
      <SectionBackgroundFlora variant="white" withPetals={true} withRipples={true} />
      
      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-200/80 text-xs font-black uppercase tracking-wider mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Commercial Aquaculture Best-Sellers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-ocean-950 mb-3">
            Top-Performing Products
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Our highest-rated, scientifically validated aquaculture supplements — trusted by 1,000+ shrimp and fish farmers across India &amp; global markets.
          </p>
        </div>

        {/* 4 Trust Highlights Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8">
          {[
            { icon: Microscope, title: 'Bio-Active Formulations', desc: 'High viable CFU & stabilized micro-nutrients', color: 'text-ocean-700 bg-ocean-50 border-ocean-200/60' },
            { icon: ShieldCheck, title: 'Field-Validated on 1,000+ Farms', desc: 'Tested across diverse pond salinities', color: 'text-emerald-700 bg-emerald-50 border-emerald-200/60' },
            { icon: Award, title: '100% Antibiotic-Free', desc: 'GMP, HACCP & CAA certified safety', color: 'text-teal-700 bg-teal-50 border-teal-200/60' },
            { icon: Zap, title: 'Fast Feed Binding & Dispersion', desc: 'Optimal palatability & zero feed wastage', color: 'text-amber-700 bg-amber-50 border-amber-200/60' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className={cn(
                  'flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 hover:shadow-md bg-white',
                  item.color
                )}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-slate-100">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border flex items-center gap-1.5',
                  isActive
                    ? 'bg-gradient-to-r from-ocean-700 to-teal-600 text-white border-transparent shadow-md scale-105'
                    : 'bg-slate-50/80 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={cn(
                    'px-1.5 py-0.2 rounded-full text-[10px] font-black',
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 mb-10">
          {displayedProducts.map((product) => {
            const cat = CATEGORIES.find((c) => c.id === product.categoryId)
            return (
              <ProductCard
                key={product.id}
                product={product}
                categoryLabel={cat?.label ?? ''}
                onEnquire={setEnquiryProduct}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Main HomePage ───────────────────────────────────────────────

export default function HomePage() {
  const [enquiryProduct, setEnquiryProduct] = useState(null)
  const featuredProducts = getFeaturedProducts()
  const recentPosts = getRecentPosts(3)

  return (
    <>
      {/* 1. Hero Realistic Video & 3D Biotech Section */}
      <HeroVideoSection />

      {/* 2. Trust scrolling bar */}
      <div id="home-content">
        <TrustBar />
      </div>

      {/* 3. Stats counter strip */}
      <StatsStrip />

      {/* 4. Product Categories */}
      <section className="section-py section-light relative overflow-hidden">
        <SectionBackgroundFlora variant="light" withPetals={true} withLeaves={true} />
        <div className="container-xl relative z-10">
          <SectionHeader
            tag="Our Products"
            title="Complete Aquaculture Solution Range"
            subtitle="Scientifically formulated supplements covering every aspect of shrimp and fish farming — from gut health and immunity to water quality management."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
          <div className="mt-6 md:mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-ocean-700 text-ocean-700 font-semibold px-7 py-3 rounded-full hover:bg-ocean-700 hover:text-white transition-all duration-200 text-sm"
            >
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Top-Performing Featured Products */}
      <TopPerformingProductsSection
        featuredProducts={featuredProducts}
        setEnquiryProduct={setEnquiryProduct}
      />

      {/* 6. Keytone Video Center & Search/Book Tour */}
      <div id="keytone-video-tour">
        <VideoShowcaseSection />
      </div>

      {/* 7. Why Choose Us */}
      <WhyChooseUs />

      {/* 8. Company Gallery */}
      <CompanyGallery />

      {/* 9. Testimonials */}
      <TestimonialsCarousel />


      {/* 10. Certifications */}
      <CertificationsStrip />

      {/* 11. Export Markets - Serving Farmers Worldwide */}
      <GlobalReachSection />

      {/* 12. Latest Blog */}
      <section className="section-py section-white relative overflow-hidden">
        <SectionBackgroundFlora variant="white" withPetals={true} withLeaves={true} />
        <div className="container-xl relative z-10">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <SectionHeader
              tag="Knowledge Centre"
              title="Insights from Our Aquaculture Experts"
              subtitle="Practical guides, product insights, and industry news."
              align="left"
              className="mb-0"
            />
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-1.5 text-ocean-700 font-semibold text-sm hover:text-teal-600 transition-colors shrink-0 ml-6"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-ocean-700 font-semibold text-sm hover:text-teal-600 transition-colors"
            >
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. CTA Banner */}
      <CTABanner />

      {/* Enquiry Modal */}
      {enquiryProduct && (
        <EnquiryForm
          product={enquiryProduct}
          isOpen={!!enquiryProduct}
          modal
          onClose={() => setEnquiryProduct(null)}
        />
      )}
    </>
  )
}
