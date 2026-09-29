import { useInView } from 'react-intersection-observer'

/**
 * Returns a [ref, inView] pair.
 * Use `ref` on the element you want to observe.
 * `inView` becomes true when the element enters the viewport.
 *
 * @param {number} threshold  — 0..1, how much of the element must be visible
 * @param {boolean} triggerOnce — only fire once (default true)
 */
export function useScrollAnimation(threshold = 0.15, triggerOnce = true) {
  return useInView({ threshold, triggerOnce })
}
