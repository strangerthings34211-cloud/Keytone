import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, MessageSquare, Phone, Sparkles, ShieldCheck, Package } from 'lucide-react'
import { cn } from '@/utils/cn'
import Badge from '@/components/ui/Badge'

const CATEGORY_COLORS = {
  enzymes:                  'ocean',
  'growth-promoters':       'green',
  'immune-enhancers':       'teal',
  'probiotics-prebiotics':  'ocean',
  'vitamins-minerals':      'gold',
  'water-quality-enhancers':'teal',
  'white-gut-reducer':      'ocean',
}

export default function ProductCard({
  product,
  categoryLabel,
  onEnquire,
  className,
}) {
  const color = CATEGORY_COLORS[product.categoryId] || 'ocean'
  
  const whatsappUrl = `https://wa.me/919959002666?text=${encodeURIComponent(
    `Hello Keytone Life Sciences, I am interested in ordering "${product.name}" (${categoryLabel || product.categoryId}). Please share product pricing and application guidelines.`
  )}`

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl bg-white',
        'border border-slate-200/90 hover:border-teal-400/80',
        'shadow-card hover:shadow-[0_15px_35px_rgba(11,61,145,0.12)]',
        'transition-all duration-300 hover:-translate-y-1.5 flex-1',
        className
      )}
    >
      {/* Product Image Stage */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/60 shrink-0 p-4 flex items-center justify-center border-b border-slate-100">
        {/* Subtle Ambient Radial Backlight on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/0 via-teal-500/0 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md z-0"
          onError={(e) => {
            e.currentTarget.src = '/images/Keytone-Enzymes.png'
          }}
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge variant={color} className="shadow-sm">
            {categoryLabel || product.categoryId}
          </Badge>
        </div>

        {/* Featured / Popular Badge */}
        {product.featured && (
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md border border-amber-300/60">
            <Sparkles size={11} className="text-slate-950" />
            <span>Top Seller</span>
          </div>
        )}

        {/* Quick Pack Size Overlay Pill */}
        {product.packSizes && product.packSizes.length > 0 && (
          <div className="absolute bottom-2.5 left-3.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-200/80 text-[10px] font-bold text-slate-700 shadow-sm">
            <Package size={11} className="text-teal-600" />
            <span>{product.packSizes.slice(0, 3).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-col flex-1 p-5 bg-white">
        <div className="mb-2">
          <h3 className="font-display font-extrabold text-base text-ocean-950 leading-snug group-hover:text-teal-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Key Product Benefits */}
        {product.benefits?.length > 0 && (
          <div className="mt-2 mb-4 space-y-1.5 flex-1 bg-slate-50/70 rounded-2xl p-3 border border-slate-100">
            {product.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                <CheckCircle2 size={13} className="text-teal-600 mt-0.5 shrink-0" />
                <span className="line-clamp-1">{benefit}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mt-auto pt-3.5 border-t border-slate-100">
          <Link
            to={`/products/${product.categoryId}/${product.slug}`}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-full',
              'text-xs font-bold text-ocean-900 border border-ocean-200/90 bg-ocean-50/70',
              'hover:bg-ocean-900 hover:text-white hover:border-ocean-900',
              'transition-all duration-200 shadow-sm whitespace-nowrap'
            )}
          >
            <span>View Details</span>
            <ArrowRight size={13} className="shrink-0" />
          </Link>

          {/* Quick WhatsApp Order Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full',
              'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
              'text-white text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 whitespace-nowrap'
            )}
            title={`Order ${product.name} on WhatsApp`}
          >
            <Phone size={12} className="fill-white shrink-0" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </article>
  )
}
