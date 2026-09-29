import { cn } from '@/utils/cn'

/**
 * Reusable section header with optional tag, title, subtitle, and divider.
 *
 * @param {string}  tag      — small colored label above the title (optional)
 * @param {string}  title    — main section heading
 * @param {string}  subtitle — supporting description (optional)
 * @param {'center'|'left'} align
 * @param {boolean} light    — use light (white) text for dark backgrounds
 * @param {string}  className
 */
export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}) {
  return (
    <div
      className={cn(
        'mb-7 md:mb-9',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {tag && (
        <div
          className={cn(
            'inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase mb-3 px-3.5 py-1 rounded-full border shadow-sm transition-all',
            light
              ? 'bg-teal-500/20 text-teal-300 border-teal-400/30'
              : 'bg-teal-50 text-teal-700 border-teal-200/80 hover:border-teal-400'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
          {tag}
        </div>
      )}

      <h2
        className={cn(
          'font-display font-extrabold leading-tight tracking-tight',
          'text-2xl sm:text-3xl md:text-[2.25rem]',
          light ? 'text-white drop-shadow-md' : 'text-ocean-950'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-3 text-sm md:text-base leading-relaxed',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl',
            light ? 'text-white/80' : 'text-slate-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

