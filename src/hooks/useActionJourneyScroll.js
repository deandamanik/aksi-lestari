import { useEffect, useRef, useState } from 'react'
import { smoothTowards, hasSettled } from '../utils/scrollMotion'

/**
 * Custom hook managing scroll-driven journey progress for Section 3 ("Empat Langkah Nyata Bergerak").
 *
 * Desktop:
 * - Calculates normalized scroll progress [0, 1] as the target.
 * - Uses frame-rate-independent visual smoothing for continuous motion.
 * - Drives SVG path strokeDashoffset directly via DOM ref from smoothed progress.
 * - Exposes continuous visualProgress [0, 1] via ref for node/card rendering.
 * - Updates activeStepIndex (0 -> 1 -> 2 -> 3) for semantic state only.
 * - Reverses cleanly when scrolling upward.
 *
 * Mobile:
 * - Tracks vertical viewport scroll position to highlight the active step.
 */
export function useActionJourneyScroll() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const currentActiveRef = useRef(0)
  const journeyTrackRef = useRef(null)
  const progressPathRef = useRef(null)
  const mobileStepRefs = useRef([])
  const pathLengthRef = useRef(0)
  // Exposed continuous visual progress for node/card rendering
  const visualProgressRef = useRef(0)

  useEffect(() => {
    let scrollRafId = null
    let smoothRafId = null
    let lastFrameTime = 0

    // Smoothing state: responsive tracking harmonized with Lenis momentum scroll
    const SMOOTHING_TIME = 45 // ms time constant
    let targetProgress = 0
    let visualProgress = 0
    let isSmoothing = false

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Initialize SVG path strokeDasharray on mount & resize
    const initPath = () => {
      const pathEl = progressPathRef.current
      if (pathEl) {
        try {
          const len = pathEl.getTotalLength()
          pathLengthRef.current = len
          pathEl.style.strokeDasharray = `${len} ${len}`
          const p = currentActiveRef.current / 3
          pathEl.style.strokeDashoffset = `${len * (1 - p)}`
        } catch {
          // Fallback if getTotalLength fails in unsupported environment
        }
      }
    }

    initPath()

    /**
     * Derive discrete step index from continuous progress.
     */
    const getStepIndex = (p) => {
      if (p >= 0.77) return 3
      if (p >= 0.52) return 2
      if (p >= 0.26) return 1
      return 0
    }

    /**
     * Read scroll position and compute target progress.
     */
    const readScrollTarget = () => {
      scrollRafId = null

      const isDesktop = window.innerWidth >= 1024

      if (isDesktop) {
        const track = journeyTrackRef.current
        if (!track) return

        const trackRect = track.getBoundingClientRect()
        const stageHeight = window.innerHeight
        const stickyTop = 0
        const maxScroll = trackRect.height - stageHeight

        if (maxScroll <= 0) return

        let p = (stickyTop - trackRect.top) / maxScroll
        p = Math.max(0, Math.min(1, p))

        targetProgress = p

        if (prefersReducedMotion) {
          visualProgress = targetProgress
          visualProgressRef.current = visualProgress
          renderVisuals(visualProgress)
          return
        }

        // Start smoothing loop if not already running
        if (!isSmoothing) {
          isSmoothing = true
          lastFrameTime = performance.now()
          smoothRafId = requestAnimationFrame(smoothLoop)
        }
      } else {
        // Mobile / Tablet vertical scroll tracking
        const triggerY = window.innerHeight * 0.45
        let bestIndex = 0

        mobileStepRefs.current.forEach((el, index) => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          if (rect.top <= triggerY) {
            bestIndex = index
          }
        })

        if (bestIndex !== currentActiveRef.current) {
          currentActiveRef.current = bestIndex
          setActiveStepIndex(bestIndex)
        }
      }
    }

    /**
     * Continuous RAF loop that interpolates visual progress toward target.
     * Stops itself when settled.
     */
    const smoothLoop = (now) => {
      const deltaTime = Math.min(now - lastFrameTime, 64)
      lastFrameTime = now

      visualProgress = smoothTowards(visualProgress, targetProgress, deltaTime, SMOOTHING_TIME)

      if (hasSettled(visualProgress, targetProgress, 0.0005)) {
        visualProgress = targetProgress
        isSmoothing = false
      }

      visualProgressRef.current = visualProgress
      renderVisuals(visualProgress)

      if (isSmoothing) {
        smoothRafId = requestAnimationFrame(smoothLoop)
      }
    }

    /**
     * Render all scroll-driven visuals from smoothed progress.
     */
    const renderVisuals = (vp) => {
      // Update SVG path strokeDashoffset
      const pathEl = progressPathRef.current
      const len = pathLengthRef.current
      if (pathEl && len > 0) {
        pathEl.style.strokeDashoffset = `${(len * (1 - vp)).toFixed(2)}`
      }

      // Update semantic active step index
      const nextIndex = getStepIndex(vp)
      if (nextIndex !== currentActiveRef.current) {
        currentActiveRef.current = nextIndex
        setActiveStepIndex(nextIndex)
      }
    }

    const onScroll = () => {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(readScrollTarget)
      }
    }

    const onResize = () => {
      initPath()
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(readScrollTarget)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Initial sync
    readScrollTarget()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
      if (smoothRafId !== null) cancelAnimationFrame(smoothRafId)
    }
  }, [])

  return {
    journeyTrackRef,
    progressPathRef,
    mobileStepRefs,
    activeStepIndex,
    visualProgressRef,
  }
}
