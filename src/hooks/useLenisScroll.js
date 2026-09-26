import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Hook to initialize Lenis smooth scrolling for Beranda storytelling sections.
 * Cleanly handles RAF loop, prefers-reduced-motion, and tears down on unmount.
 */
export function useLenisScroll(enabled = true) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    // Respect reduced motion accessibility preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 0.75, // Snappy & responsive (sweet spot for web design showcase)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Keep native touch physics on mobile screens
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [enabled])

  return lenisRef
}
