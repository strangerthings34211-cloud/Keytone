import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-ocean-700 text-white hover:bg-ocean-800 shadow-btn hover:shadow-lg focus-visible:ring-ocean-700',
  secondary:
    'bg-transparent border-2 border-ocean-700 text-ocean-700 hover:bg-ocean-700 hover:text-white focus-visible:ring-ocean-700',
  teal:
    'bg-teal-500 text-white hover:bg-teal-600 shadow-btn hover:shadow-lg focus-visible:ring-teal-500',
  ghost:
    'bg-white/15 text-white border border-white/30 hover:bg-white/25 focus-visible:ring-white',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  light:
    'bg-white text-ocean-700 hover:bg-ocean-50 shadow-sm focus-visible:ring-ocean-700',
}

const sizes = {
  sm:  'text-sm px-4 py-2 gap-1.5',
  md:  'text-sm px-5 py-2.5 gap-2',
  lg:  'text-base px-7 py-3.5 gap-2',
  xl:  'text-lg px-9 py-4 gap-2.5',
}

/**
 * Polymorphic Button component.
 * Renders as <a> (via React Router Link) when `href` is provided,
 * otherwise as <button>.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  href,
  external = false,
  className,
  children,
  ...props
}) {
  const base = cn(
    'inline-flex items-center justify-center rounded-full font-medium',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  )

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0 -ml-0.5">{leftIcon}</span>
      )}
      <span>{children}</span>
      {rightIcon && !loading && (
        <span className="shrink-0 -mr-0.5">{rightIcon}</span>
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base} {...props}>
          {content}
        </a>
      )
    }
    return (
      <Link to={href} className={base} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button className={base} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
}
