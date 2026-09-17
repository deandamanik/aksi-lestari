import { useState, useEffect, useRef } from 'react'

/**
 * A lightweight hook to detect when an element first enters the viewport.
 * Automatically respects prefers-reduced-motion (returns true immediately).
 * Disconnects observer after first intersection.
 *
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, inView]
 */
export function useInView(options = {}) {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [inView, setInView] = useState(prefersReducedMotion)
  const ref = useRef(null)
  const hasAnimatedRef = useRef(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return

    const currentRef = ref.current
    if (!currentRef || hasAnimatedRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        hasAnimatedRef.current = true
        observer.disconnect()
      }
    }, {
      threshold: 0.15,
      ...options
    })

    observer.observe(currentRef)

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [options, prefersReducedMotion])

  return [ref, inView]
}
