import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Breadcrumb navigation component.
 *
 * @param {Array<{label: string, href?: string}>} items
 * @param {boolean} light — white text for dark backgrounds
 */
export default function Breadcrumb({ items = [], light = false, className }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center flex-wrap gap-1', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight
                size={14}
                className={cn(
                  'shrink-0',
                  light ? 'text-white/50' : 'text-slate-400'
                )}
              />
            )}
            {isLast || !item.href ? (
              <span
                className={cn(
                  'text-sm font-medium',
                  light ? 'text-white' : 'text-ocean-700'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  'text-sm transition-colors',
                  light
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-500 hover:text-ocean-700'
                )}
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
