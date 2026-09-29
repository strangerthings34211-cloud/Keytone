import { useState, useRef } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Microscope,
  ShieldCheck,
  Building2,
  TrendingUp,
  Search,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import { PRODUCTS } from '@/data/products'

const VIDEO_PLAYLIST = [
  {
    id: 'rd-lab',
    title: 'Biotechnology R&D & Enzyme Formulation',
    category: 'Lab Science',
    icon: Microscope,
    duration: '2:45 min',
    views: '4.2k views',
    poster: '/images/Keytone-Enzymes.png',
    description:
      'Step inside the Keytone Biotechnology laboratories. Discover how marine microbiologists formulate bioactive enzymes, beta-glucans, and multi-strain probiotics.',
    featuredProducts: ['i-boost', 'hepano-boost', 'pro-g'],
    keyMetrics: [
      { label: 'Enzyme Purity', val: '99.8%' },
      { label: 'Spore Viability', val: '10 Billion CFU/g' },
    ],
  },
  {
    id: 'pond-trials',
    title: 'Shrimp & Fish Pond Field Application',
    category: 'Field Action',
    icon: TrendingUp,
    duration: '3:10 min',
    views: '6.8k views',
    poster: '/images/Keytone-water-quality-enhancers.png',
    description:
      'Watch aquaculture farm technicians apply Keytone probiotics and water quality enhancers directly in commercial shrimp and fish culture ponds.',
    featuredProducts: ['active-c', 'naturalle'],
    keyMetrics: [
      { label: 'Dissolved Oxygen', val: '+42% Saturation' },
      { label: 'Toxic NH3 / NO2', val: '< 0.01 ppm' },
    ],
  },
  {
    id: 'manufacturing',
    title: 'GMP & ISO 9001:2015 Manufacturing Plant',
    category: 'Factory Tour',
    icon: Building2,
    duration: '2:15 min',
    views: '3.1k views',
    poster: '/images/Keytone-Growth-Promoters.png',
    description:
      'A cinematic tour through our certified sterile production floors, automated high-precision packaging lines, and rigorous quality control testing stations.',
    featuredProducts: ['i-boost', 'active-c'],
    keyMetrics: [
      { label: 'Batch Consistency', val: '100% Tested' },
      { label: 'Global Compliance', val: 'GMP & HACCP' },
    ],
  },
  {
    id: 'farmer-results',
    title: 'Farmer Harvest Success & FCR Efficiency',
    category: 'Testimonials',
    icon: ShieldCheck,
    duration: '3:40 min',
    views: '8.5k views',
    poster: '/images/probiotics-and-prebiotics.png',
    description:
      'Real farmer results from Andhra Pradesh, Gujarat, and international farms reporting higher survival rates, reduced disease, and superior profit per acre.',
    featuredProducts: ['hepano-boost', 'pro-g'],
    keyMetrics: [
      { label: 'FCR Improvement', val: '1.18 Average' },
      { label: 'Crop Survival', val: '+38% Higher' },
    ],
  },
]

export default function VideoShowcaseSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [searchProductTerm, setSearchProductTerm] = useState('')
  const videoRef = useRef(null)

  const currentVideo = VIDEO_PLAYLIST[activeVideoIndex]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  // Get products related to active video
  const relatedProducts = PRODUCTS.filter((p) =>
    currentVideo.featuredProducts.includes(p.id)
  )

  // Direct WhatsApp Book Link
  const handleOrderProductWhatsApp = (productName) => {
    const text = `Hello Keytone Life Sciences! I watched your video on "${currentVideo.title}" and would like to book/order "${productName}" with wholesale quotation.`
    window.open(
      `https://wa.me/919959002666?text=${encodeURIComponent(text)}`,
      '_blank'
    )
  }

  return (
    <section className="section-py relative overflow-hidden bg-gradient-to-b from-ocean-950 via-slate-900 to-ocean-950 text-white">
      {/* ── Floral & Bio-Particle Background Effects ── */}
      <SectionBackgroundFlora
        variant="dark"
        withPetals={true}
        withRipples={true}
        withLeaves={true}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            <Sparkles size={14} className="text-teal-400 animate-spin-slow" />
            Keytone Life Sciences In Action
          </div>
          <h2
            className="font-display font-extrabold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
          >
            Watch Our Science, Facilities &amp;{' '}
            <span className="text-gradient-hero">Field Results</span>
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed">
            Experience the technology behind our aquaculture solutions. Search
            formulations shown in video and book directly with our technical team.
          </p>
        </div>

        {/* ── Main Video Cinema Player Grid ── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left / Main Column: Video Player (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-black/80 border border-white/20 shadow-2xl group aspect-video">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={currentVideo.poster}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/hero-aquaculture.webm" type="video/webm" />
              </video>

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Top HUD Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase">
                    Keytone Video Tour
                  </span>
                  <span className="text-[10px] text-teal-300 font-semibold bg-teal-500/20 px-2 py-0.5 rounded">
                    {currentVideo.category}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] text-white/80">
                  <span>⏱️ {currentVideo.duration}</span>
                  <span className="text-white/30">•</span>
                  <span>👁️ {currentVideo.views}</span>
                </div>
              </div>

              {/* Center Play/Pause Watermark Button */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-500/80 hover:bg-teal-400 text-ocean-950 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl backdrop-blur-sm z-20"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause size={28} className="fill-current" />
                ) : (
                  <Play size={32} className="fill-current ml-1" />
                )}
              </button>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-teal-300 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-teal-300 transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <span className="text-xs font-semibold text-white/90 truncate max-w-[180px] sm:max-w-xs">
                    {currentVideo.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFullscreen}
                    className="text-white hover:text-teal-300 transition-colors p-1"
                    title="Fullscreen"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Details & Quick Product Booking Strip */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {currentVideo.title}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed max-w-xl">
                    {currentVideo.description}
                  </p>
                </div>

                {/* Key Metrics Pill */}
                <div className="flex gap-2 shrink-0">
                  {currentVideo.keyMetrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-teal-500/10 border border-teal-400/20 rounded-xl px-3 py-2 text-center"
                    >
                      <span className="text-[10px] text-teal-300 font-semibold block">
                        {metric.label}
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        {metric.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products in This Video & Quick Order via WhatsApp */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingBag size={14} /> Featured Formulations in this
                    Video:
                  </span>
                  <span className="text-[11px] text-white/50">
                    Directly order or book on WhatsApp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {relatedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-3 flex items-center justify-between gap-2.5 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded-lg bg-black/20 p-1 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/Keytone-Enzymes.png'
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-white truncate group-hover:text-teal-300 transition-colors">
                            {prod.name}
                          </h4>
                          <span className="text-[10px] text-teal-200/80 block truncate">
                            {prod.packSizes?.[0] || 'Pack'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOrderProductWhatsApp(prod.name)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2 rounded-xl text-xs font-bold shrink-0 transition-transform group-hover:scale-105"
                        title="Book / Order via WhatsApp"
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Playlist & Video Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <span>📺</span> Video Stories &amp; Tours
                </h4>
                <span className="text-xs bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded-full border border-teal-400/30">
                  {VIDEO_PLAYLIST.length} Videos
                </span>
              </div>

              {/* Playlist Cards */}
              <div className="space-y-2.5">
                {VIDEO_PLAYLIST.map((item, index) => {
                  const isActive = activeVideoIndex === index
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveVideoIndex(index)
                        setIsPlaying(true)
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0
                          videoRef.current.play()
                        }
                      }}
                      className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3 group ${
                        isActive
                          ? 'bg-gradient-to-r from-teal-500/25 to-ocean-700/40 border-teal-400/60 shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center ${
                            isActive
                              ? 'bg-teal-500/60 text-ocean-950'
                              : 'bg-black/40 text-white group-hover:bg-teal-500/40'
                          }`}
                        >
                          <Play size={16} className="fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isActive ? 'text-teal-300' : 'text-white/50'
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[10px] text-white/40">
                            {item.duration}
                          </span>
                        </div>
                        <h5
                          className={`font-semibold text-xs leading-snug line-clamp-2 ${
                            isActive
                              ? 'text-white font-bold'
                              : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {item.title}
                        </h5>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Consultation Callout Box */}
            <div className="bg-gradient-to-br from-teal-900/40 to-ocean-900/60 border border-teal-400/30 rounded-3xl p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-300/30">
                <Sparkles size={20} />
              </div>
              <h5 className="font-display font-bold text-sm text-white">
                Need Customized Formulation Guidance?
              </h5>
              <p className="text-xs text-white/70 leading-relaxed">
                Connect directly with our aquaculture biotechnologists for
                custom pond dosage and crop protection protocols.
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-ocean-950 font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-102"
              >
                Schedule Pond Consultation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
