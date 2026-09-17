import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook managing scroll-driven journey progress for Section 3 ("Empat Langkah Nyata Bergerak").
 *
 * Desktop:
 * - Calculates continuous normalized scroll progress [0, 1] through the runway.
 * - Drives SVG path strokeDashoffset directly via DOM ref without per-frame React state updates.
 * - Updates activeStepIndex (0 -> 1 -> 2 -> 3) only when crossing calibrated boundaries.
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

  useEffect(() => {
    let rafId = null

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

    const updateScrollProgress = () => {
      rafId = null

      const isDesktop = window.innerWidth >= 1024
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (isDesktop) {
        const track = journeyTrackRef.current
        if (!track) return

        const trackRect = track.getBoundingClientRect()
        // The sticky stage height is approximately 460px
        const stageHeight = 460
        const stickyTop = Math.max(
          64,
          Math.round(window.innerHeight / 2 - stageHeight / 2)
        )
        const maxScroll = trackRect.height - stageHeight

        if (maxScroll <= 0) return

        // Normalized progress p in [0, 1]
        let p = (stickyTop - trackRect.top) / maxScroll
        p = Math.max(0, Math.min(1, p))

        // Update active strokeDashoffset directly via DOM ref
        const pathEl = progressPathRef.current
        const len = pathLengthRef.current
        if (pathEl && len > 0) {
          if (prefersReducedMotion) {
            pathEl.style.strokeDashoffset = '0'
          } else {
            pathEl.style.strokeDashoffset = `${(len * (1 - p)).toFixed(2)}`
          }
        }

        // Calibrated step boundaries with comfortable dwell time
        let nextIndex
        if (p >= 0.85) {
          nextIndex = 3
        } else if (p >= 0.55) {
          nextIndex = 2
        } else if (p >= 0.25) {
          nextIndex = 1
        } else {
          nextIndex = 0
        }

        if (nextIndex !== currentActiveRef.current) {
          currentActiveRef.current = nextIndex
          setActiveStepIndex(nextIndex)
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

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress)
      }
    }

    const onResize = () => {
      initPath()
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Initial sync
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return {
    journeyTrackRef,
    progressPathRef,
    mobileStepRefs,
    activeStepIndex,
  }
}
