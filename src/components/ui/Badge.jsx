import { cn } from '@/utils/cn'

const variants = {
  ocean:  'bg-ocean-700/10 text-ocean-700 border border-ocean-700/20',
  teal:   'bg-teal-500/10  text-teal-700  border border-teal-500/20',
  gold:   'bg-gold-500/10  text-gold-600  border border-gold-500/20',
  green:  'bg-seafoam-500/10 text-seafoam-600 border border-seafoam-500/20',
  white:  'bg-white/20 text-white border border-white/30',
  dark:   'bg-ocean-900/80 text-white',
  gray:   'bg-slate-100 text-slate-600 border border-slate-200',
}

const sizes = {
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-3 py-1',
}

export default function Badge({
  variant = 'ocean',
  size = 'sm',
  icon,
  className,
  children,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
