import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { getProductsByCategory } from '@/data/products'

const BG_CLASSES = {
  blue:   'bg-ocean-50  border-ocean-100  group-hover:bg-ocean-700',
  green:  'bg-green-50  border-green-100  group-hover:bg-green-600',
  teal:   'bg-teal-50   border-teal-100   group-hover:bg-teal-600',
  purple: 'bg-purple-50 border-purple-100 group-hover:bg-purple-600',
  gold:   'bg-amber-50  border-amber-100  group-hover:bg-amber-500',
  cyan:   'bg-cyan-50   border-cyan-100   group-hover:bg-cyan-600',
  red:    'bg-red-50    border-red-100    group-hover:bg-red-500',
}

const ICON_BG = {
  blue:   'bg-ocean-100   text-ocean-700',
  green:  'bg-green-100   text-green-700',
  teal:   'bg-teal-100    text-teal-700',
  purple: 'bg-purple-100  text-purple-700',
  gold:   'bg-amber-100   text-amber-700',
  cyan:   'bg-cyan-100    text-cyan-700',
  red:    'bg-red-100     text-red-700',
}

export default function CategoryCard({ category, className }) {
  const products = getProductsByCategory(category.id)
  const colorKey = category.color || 'blue'

  return (
    <Link
      to={`/products/${category.slug}`}
      className={cn(
        'group flex flex-col bg-white rounded-3xl border border-slate-200/80 overflow-hidden',
        'card-hover-lift shimmer-card shadow-card hover:border-teal-400/50',
        className
      )}
      aria-label={`View ${category.label} products`}
    >
      {/* Card top */}
      <div className={cn(
        'p-6 transition-all duration-300 relative overflow-hidden',
        BG_CLASSES[colorKey] ?? BG_CLASSES.blue
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm',
            'transition-all duration-300 group-hover:scale-110 group-hover:rotate-6',
            ICON_BG[colorKey] ?? ICON_BG.blue,
            'group-hover:bg-white/20 group-hover:text-white'
          )}>
            {category.icon}
          </div>
          <span className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm',
            'bg-white/80 text-slate-700 transition-colors duration-300',
            'group-hover:bg-white/25 group-hover:text-white backdrop-blur-sm'
          )}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>
        <h3 className={cn(
          'font-display font-extrabold text-xl leading-tight mb-1.5',
          'text-ocean-950 transition-colors duration-300 group-hover:text-white'
        )}>
          {category.label}
        </h3>
        <p className={cn(
          'text-xs md:text-sm transition-colors duration-300 leading-relaxed',
          'text-slate-600 group-hover:text-white/90'
        )}>
          {category.tagline}
        </p>
      </div>

      {/* Card bottom */}
      <div className="p-5 flex items-center justify-between bg-white mt-auto">
        <div className="space-y-1">
          {products.slice(0, 2).map((p) => (
            <p key={p.id} className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 group-hover:scale-125 transition-transform" />
              {p.name}
            </p>
          ))}
          {products.length > 2 && (
            <p className="text-[11px] text-teal-700 font-semibold pl-3">+{products.length - 2} more formulations</p>
          )}
        </div>
        <div className={cn(
          'w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm',
          'border-ocean-200 text-ocean-700',
          'group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white group-hover:scale-110',
          'transition-all duration-300'
        )}>
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

