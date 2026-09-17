import { useEffect, useRef, useState } from 'react'
import { getStagePosition } from '../utils/scrollStoryMath'

/**
 * Custom hook orchestrating the scroll progress, vertical centering,
 * and editorial reveal motion for the ProblemStorySection.
 */
export function useProblemStoryScroll() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentActiveRef = useRef(0)
  const storyTrackRef = useRef(null)
  const cardElsRef = useRef([])
  const imageElsRef = useRef([])

  useEffect(() => {
    let rafId = null

    const updateStory = () => {
      rafId = null

      if (window.innerWidth < 1024) return

      const track = storyTrackRef.current
      if (!track) return

      const trackRect = track.getBoundingClientRect()
      const stageHeight = window.innerWidth >= 1280 ? 520 : 480
      // Calculate dynamic sticky top offset: vertical center of the viewport (min 80px / 5rem)
      const stickyTop = Math.max(
        80,
        Math.round(window.innerHeight / 2 - stageHeight / 2)
      )
      const maxScroll = trackRect.height - stageHeight
      if (maxScroll <= 0) return

      // Scroll progress p within the story track [0, 1]
      let p = (stickyTop - trackRect.top) / maxScroll
      p = Math.max(0, Math.min(1, p))

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      const stagePos = getStagePosition(p)
      const nextActive = stagePos < 0.5 ? 0 : stagePos < 1.5 ? 1 : 2

      if (nextActive !== currentActiveRef.current) {
        currentActiveRef.current = nextActive
        setActiveIndex(nextActive)
      }

      // Synchronize left 3D visual images directly to scroll position
      imageElsRef.current.forEach((el, index) => {
        if (!el) return

        if (prefersReducedMotion) {
          el.style.opacity = index === nextActive ? '1' : '0'
          el.style.transform = index === nextActive ? 'scale(1)' : 'scale(0.985)'
          return
        }

        const dist = Math.abs(index - stagePos)
        if (dist <= 1) {
          const opacity = Math.max(0, 1 - dist)
          const scale = 1 - 0.015 * dist
          el.style.opacity = opacity.toFixed(3)
          el.style.transform = `scale(${scale.toFixed(4)})`
        } else {
          el.style.opacity = '0'
          el.style.transform = 'scale(0.985)'
        }
      })

      // Editorial reveal motion: subtle 32px vertical reveal and scale settle
      const maxTravel = 32 // px vertical reveal distance
      const threshold = 0.5 // transition boundary

      cardElsRef.current.forEach((el, index) => {
        if (!el) return

        if (prefersReducedMotion) {
          el.style.transform = 'translate3d(0, -50%, 0)'
          el.style.opacity = index === nextActive ? '1' : '0'
          el.style.pointerEvents = index === nextActive ? 'auto' : 'none'
          return
        }

        const delta = index - stagePos
        let opacity
        let translateY
        let scale

        if (delta === 0) {
          opacity = 1
          translateY = 0
          scale = 1
        } else if (delta < 0) {
          // Exiting upward (0 -> -32px, 1 -> 0, scale 1 -> 0.985)
          const t = Math.min(1, -delta / threshold)
          translateY = -maxTravel * t
          opacity = Math.max(0, 1 - t * 1.15)
          scale = 1 - 0.015 * t
        } else {
          // Entering from below (+32px -> 0, 0 -> 1, scale 0.985 -> 1)
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
      if (rafId === null) {
        rafId = requestAnimationFrame(updateStory)
      }
    }

    const onResize = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateStory)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Immediate initial sync
    updateStory()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return {
    storyTrackRef,
    cardElsRef,
    imageElsRef,
    activeIndex,
  }
}
