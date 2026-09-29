/**
 * Utility to conditionally join class names.
 * Lightweight alternative to clsx/classnames.
 */
export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
}
