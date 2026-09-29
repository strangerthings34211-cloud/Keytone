import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { PRODUCTS, CATEGORIES } from '@/data/products'

// Duplicate products list for seamless infinite marquee scroll
const MARQUEE_PRODUCTS = [...PRODUCTS, ...PRODUCTS]

export default function TrustBar({ className }) {
  return (
    <div className={cn('bg-ocean-950/95 py-3.5 border-y border-white/10 relative overflow-hidden group', className)}>
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-ocean-500/5 to-teal-500/5 pointer-events-none" />

      {/* Left / Right Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-ocean-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ocean-950 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track - slow and smooth scroll */}
      <div
        className="flex items-center gap-3 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap"
        style={{ width: 'max-content', animationDuration: '85s' }}
      >
        {MARQUEE_PRODUCTS.map((product, i) => {
          const cat = CATEGORIES.find((c) => c.id === product.categoryId)
          return (
            <Link
              key={`${product.id}-${i}`}
              to={`/products/${product.categoryId}/${product.slug}`}
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-teal-400/80 rounded-2xl px-4 py-2.5 transition-all duration-300 group/item shrink-0 shadow-md hover:shadow-teal-500/20 hover:scale-105"
              title={`View ${product.name} details`}
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>

              <div className="text-left">
                <p className="text-xs md:text-sm font-extrabold text-white group-hover/item:text-teal-300 transition-colors leading-tight">
                  {product.name}
                </p>
                <p className="text-[10px] text-teal-200/70 font-medium leading-tight mt-0.5">
                  {cat?.label || 'Aquaculture'}
                </p>
              </div>

              <span className="text-teal-400/60 group-hover/item:text-teal-300 group-hover/item:translate-x-1 transition-all text-xs font-bold pl-1">
                →
              </span>
            </Link>

          )
        })}
      </div>
    </div>
  )
}

