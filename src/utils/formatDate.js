/**
 * Format a date string into a human-readable format.
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} options
 */
export function formatDate(date, options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat('en-IN', { ...defaults, ...options }).format(
    new Date(date)
  )
}

/**
 * Get estimated reading time for a block of text.
 * @param {string} text
 * @param {number} wpm  words per minute (default 200)
 */
export function readingTime(text, wpm = 200) {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wpm)
  return `${minutes} min read`
}
