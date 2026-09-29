import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from `start` to `end` over `duration` ms.
 * Only starts when `shouldStart` is true.
 *
 * @param {number} end         — target value
 * @param {number} duration    — animation duration in ms
 * @param {boolean} shouldStart — trigger the animation
 * @param {number} start       — starting value (default 0)
 */
export function useCounter(end, duration = 1500, shouldStart = false, start = 0) {
  const [count, setCount] = useState(start)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!shouldStart) return

    const startTime = performance.now()
    const range = end - start

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + range * eased))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [shouldStart, end, start, duration])

  return count
}
