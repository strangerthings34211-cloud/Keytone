import { Link } from 'react-router-dom'
import {
  Quote,
  Award,
  Globe,
  Users,
  Sparkles,
  ArrowRight,
  Microscope,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Leaf
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import { SITE_IMAGES } from '@/data/certifications'

const VISION_PILLARS = [
  {
    icon: Microscope,
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    title: 'Biotechnology & Scientific Rigor',
    desc: 'Every formulation is engineered by marine microbiologists and validated in commercial pond trials before reaching the farmer.',
  },
  {
    icon: TrendingUp,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Farmer-First Prosperity',
    desc: 'Our guiding principle "Healthy Culture, Wealthy Farmer" focuses on optimizing FCR, survival rates, and crop profitability.',
  },
  {
    icon: Leaf,
    color: 'bg-seafoam-500/10 text-seafoam-600 border-seafoam-500/20',
    title: '100% Sustainable & Antibiotic-Free',
    desc: 'Pioneering eco-friendly microbial ecology and organic bio-conditioners that protect delicate marine ecosystems.',
  },
  {
    icon: Globe,
    color: 'bg-ocean-50 text-ocean-700 border-ocean-200',
    title: 'Global Export Excellence',
    desc: 'Manufacturing under GMP, HACCP, and ISO 9001:2015 standards to serve progressive aquaculture markets worldwide.',
  },
]

const STATS_DATA = [
  { val: '12+', label: 'Years of Leadership', sub: 'Est. 2012' },
  { val: '30+', label: 'Bioactive Products', sub: 'High Efficacy' },
  { val: '1,000+', label: 'Farms Supported', sub: 'India & Global' },
  { val: '10+', label: 'Export Markets', sub: 'Worldwide Reach' },
]

export default function GuidedByVisionSection({ className = '' }) {
  return (
    <section className={`section-py section-white relative overflow-hidden ${className}`}>
      {/* Moving Flowers & Petals Background */}
      <SectionBackgroundFlora
        variant="white"
        withPetals={true}
        withLeaves={true}
        withRipples={true}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <SectionHeader
          tag="Leadership & Corporate Vision"
          title="Guided by Vision, Driven by Science"
          subtitle="Pioneering aquaculture biotechnology and sustainable practices to empower farmers across the globe."
        />

        {/* ── Main Showcase Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Founder & Executive Vision Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 shadow-card card-hover-lift shimmer-card overflow-hidden">
            {/* Top Ocean Gradient Header */}
            <div className="relative bg-gradient-ocean p-7 md:p-9 text-white overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-1/3 -bottom-16 w-56 h-56 bg-ocean-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-xl shrink-0">
                    <span className="font-display font-black text-2xl sm:text-3xl text-teal-300">
                      VK
                    </span>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      <Sparkles size={12} className="text-teal-300" /> Executive Leadership
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      Vijaya Krishna G
                    </h3>
                    <p className="text-teal-200 font-medium text-xs sm:text-sm mt-0.5">
                      Chairman &amp; Founder, Keytone Life Sciences
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/15">
                    🏆 Founded 2012
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-[11px] font-semibold text-teal-200 border border-white/15">
                    🌏 10+ Export Markets
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Quote & Story Body */}
            <div className="p-7 md:p-9 space-y-5 flex-1 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                {/* Quote Callout */}
                <div className="relative bg-teal-50/70 border-l-4 border-teal-500 rounded-r-2xl p-4 md:p-5 shadow-sm">
                  <Quote
                    size={28}
                    className="text-teal-300/80 absolute top-3 right-3 pointer-events-none"
                  />
                  <p className="font-display font-bold text-ocean-950 text-sm md:text-base leading-relaxed italic">
                    "Transforming aquaculture through science, unconditional farmer trust, and relentless on-pond innovation."
                  </p>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  With a deep passion for aquaculture biotechnology and an unwavering
                  commitment to farm productivity, <strong>Vijaya Krishna G</strong> has led Keytone
                  Life Sciences from its founding in 2012 to become an internationally recognized
                  producer of probiotics, enzymes, and water conditioners.
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  His vision continues to guide our dedicated R&amp;D team to develop
                  field-tested formulations that lower Feed Conversion Ratios (FCR),
                  prevent white feces and loose shell syndrome, and secure sustainable profits
                  for aquaculture farmers.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 bg-ocean-900 hover:bg-ocean-800 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md transition-transform hover:scale-102"
                >
                  Our Full Story <ArrowRight size={14} />
                </Link>
                <Link
                  to="/research-development"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline px-3 py-2"
                >
                  <Microscope size={14} /> Explore R&amp;D Center
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Vision Pillars & Impact Stats (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* 4 Pillars Stack */}
            <div className="bg-slate-50/80 rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-card space-y-4">
              <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-ocean-900 pb-2 border-b border-slate-200/80 flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal-600" /> Core Leadership Principles
              </h4>

              <div className="space-y-3.5">
                {VISION_PILLARS.map((pillar, index) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:border-teal-400/60 transition-all group"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-inner transition-transform group-hover:scale-110 ${pillar.color}`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-ocean-950 group-hover:text-teal-800 transition-colors">
                          {pillar.title}
                        </h5>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-1">
              {STATS_DATA.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center card-hover-lift"
                >
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-teal-600 block leading-none">
                    {stat.val}
                  </span>
                  <span className="text-xs font-bold text-ocean-950 mt-1 block">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
