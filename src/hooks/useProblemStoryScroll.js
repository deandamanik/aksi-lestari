import { useEffect, useRef, useState } from 'react'
import { getStagePosition } from '../utils/scrollStoryMath'
import { smoothTowards, hasSettled, smoothStep } from '../utils/scrollMotion'

/**
 * Custom hook orchestrating the scroll progress, vertical centering,
 * and editorial reveal motion for the ProblemStorySection.
 *
 * Uses frame-rate-independent visual smoothing to separate target scroll
 * progress from rendered visual progress, creating subtle inertia.
 */
export function useProblemStoryScroll() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentActiveRef = useRef(0)
  const storyTrackRef = useRef(null)
  const cardElsRef = useRef([])
  const imageElsRef = useRef([])

  useEffect(() => {
    let scrollRafId = null
    let smoothRafId = null
    let lastFrameTime = 0

    // Smoothing state
    const SMOOTHING_TIME = 110 // ms time constant
    let targetStagePos = 0
    let visualStagePos = 0
    let isSmoothing = false

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    /**
     * Read scroll position and compute the target stage position.
     * This runs on scroll events (debounced via rAF).
     */
    const readScrollTarget = () => {
      scrollRafId = null

      if (window.innerWidth < 1024) return

      const track = storyTrackRef.current
      if (!track) return

      const trackRect = track.getBoundingClientRect()
      const stageHeight = window.innerWidth >= 1280 ? 520 : 480
      const stickyTop = Math.max(
        80,
        Math.round(window.innerHeight / 2 - stageHeight / 2)
      )
      const maxScroll = trackRect.height - stageHeight
      if (maxScroll <= 0) return

      let p = (stickyTop - trackRect.top) / maxScroll
      p = Math.max(0, Math.min(1, p))

      targetStagePos = getStagePosition(p)

      if (prefersReducedMotion) {
        // No smoothing: snap directly
        visualStagePos = targetStagePos
        renderVisuals(visualStagePos)
        return
      }

      // Start smoothing loop if not already running
      if (!isSmoothing) {
        isSmoothing = true
        lastFrameTime = performance.now()
        smoothRafId = requestAnimationFrame(smoothLoop)
      }
    }

    /**
     * Continuous RAF loop that interpolates visualStagePos toward targetStagePos.
     * Stops itself when settled.
     */
    const smoothLoop = (now) => {
      const deltaTime = Math.min(now - lastFrameTime, 64) // cap at ~15fps minimum
      lastFrameTime = now

      visualStagePos = smoothTowards(visualStagePos, targetStagePos, deltaTime, SMOOTHING_TIME)

      if (hasSettled(visualStagePos, targetStagePos, 0.002)) {
        visualStagePos = targetStagePos
        isSmoothing = false
      }

      renderVisuals(visualStagePos)

      if (isSmoothing) {
        smoothRafId = requestAnimationFrame(smoothLoop)
      }
    }

    /**
     * Render all scroll-driven visuals from a single visual stage position.
     * Images, cards, and active state are all driven from the same source.
     */
    const renderVisuals = (vsp) => {
      const nextActive = vsp < 0.5 ? 0 : vsp < 1.5 ? 1 : 2

      if (nextActive !== currentActiveRef.current) {
        currentActiveRef.current = nextActive
        setActiveIndex(nextActive)
      }

      // Synchronize left 3D visual images: continuous crossfade
      imageElsRef.current.forEach((el, index) => {
        if (!el) return

        const dist = Math.abs(index - vsp)
        if (dist <= 1) {
          // Smoothstep-eased crossfade weight for premium blend quality
          const weight = smoothStep(1 - dist)
          const scale = 1 - 0.015 * dist
          el.style.opacity = weight.toFixed(3)
          el.style.transform = `scale(${scale.toFixed(4)})`
        } else {
          el.style.opacity = '0'
          el.style.transform = 'scale(0.985)'
        }
      })

      // Editorial reveal motion: subtle 32px vertical reveal and scale settle
      const maxTravel = 32
      const threshold = 0.5

      cardElsRef.current.forEach((el, index) => {
        if (!el) return

        const delta = index - vsp
        let opacity
        let translateY
        let scale

        if (delta === 0) {
          opacity = 1
          translateY = 0
          scale = 1
        } else if (delta < 0) {
          const t = Math.min(1, -delta / threshold)
          translateY = -maxTravel * t
          opacity = Math.max(0, 1 - t * 1.15)
          scale = 1 - 0.015 * t
        } else {
          const t = Math.min(1, delta / threshold)
          translateY = maxTravel * t
          opacity = Math.max(0, 1 - t * 1.15)
          scale = 1 - 0.015 * t
        }

        el.style.transform = `translate3d(0, calc(-50% + ${translateY.toFixed(1)}px), 0) scale(${scale.toFixed(4)})`
        el.style.opacity = opacity.toFixed(3)
        el.style.pointerEvents = Math.abs(delta) < 0.25 ? 'auto' : 'none'
      })
    }

    const onScroll = () => {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(readScrollTarget)
      }
    }

    const onResize = () => {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(readScrollTarget)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Immediate initial sync
    readScrollTarget()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
      if (smoothRafId !== null) cancelAnimationFrame(smoothRafId)
    }
  }, [])

  return {
    storyTrackRef,
    cardElsRef,
    imageElsRef,
    activeIndex,
  }
}
