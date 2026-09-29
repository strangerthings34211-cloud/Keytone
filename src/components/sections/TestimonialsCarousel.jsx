import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { cn } from '@/utils/cn'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionBackgroundFlora from '@/components/ui/SectionBackgroundFlora'
import { TESTIMONIALS } from '@/data/testimonials'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsCarousel({ className }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    speed: 10,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [paused, setPaused] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // One by one auto scroll every 5.5 seconds (relaxed pace)
  useEffect(() => {
    if (!emblaApi || paused) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5500)
    return () => clearInterval(interval)
  }, [emblaApi, paused])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  return (
    <section
      className={cn('section-py section-light relative overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionBackgroundFlora variant="light" withPetals={true} withLeaves={true} />
      <div className="container-xl relative z-10">
        <SectionHeader
          tag="Testimonials"
          title="What Our Farmers Say"
          subtitle="Trusted by shrimp and fish farmers across India and internationally."
        />

        {/* Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 py-4">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={t.id || index}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_50%] pl-6 min-w-0"
              >
                {/* Testimonial Card */}
                <div className="h-full flex flex-col justify-between bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100/80 overflow-hidden group">
                  {/* Top accent line */}
                  <div className="h-1.5 bg-gradient-to-r from-ocean-700 via-teal-500 to-ocean-700 group-hover:h-2 transition-all duration-300" />

                  <div className="p-7 md:p-9 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Quote Header */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-2.5">
                          <StarRating rating={t.rating} />
                          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        </div>
                        <Quote size={32} className="text-ocean-100 shrink-0" aria-hidden="true" />
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-slate-700 text-base md:text-lg leading-relaxed font-medium italic mb-6">
                        "{t.quote}"
                      </blockquote>
                    </div>

                    {/* Author & Product Info - Single Line Layout */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-nowrap mt-auto">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-ocean-700 to-teal-500 flex items-center justify-center text-white font-display font-bold text-xs sm:text-sm shadow-sm shrink-0">
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-bold text-ocean-900 text-sm sm:text-base truncate leading-tight">
                            {t.name}
                          </p>
                          <p className="text-[11px] sm:text-xs text-slate-500 truncate leading-tight mt-0.5">
                            {t.role} &middot; <span className="text-teal-600 font-medium">{t.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Product Thumbnail - Compact Single Line Badge */}
                      <div className="flex items-center gap-1.5 bg-ocean-50/90 border border-ocean-100/80 rounded-xl px-2.5 py-1 shrink-0 max-w-[45%] sm:max-w-none">
                        <img
                          src={t.productImage}
                          alt={t.product}
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-sm shrink-0"
                          loading="lazy"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        <span className="text-[11px] sm:text-xs font-bold text-ocean-800 truncate whitespace-nowrap">
                          {t.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-ocean-700 hover:text-ocean-700 hover:bg-ocean-50 transition-all duration-200 shadow-sm hover:shadow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === selectedIndex
                    ? 'w-8 h-2.5 bg-ocean-700'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-ocean-300'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-ocean-700 hover:text-ocean-700 hover:bg-ocean-50 transition-all duration-200 shadow-sm hover:shadow"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
