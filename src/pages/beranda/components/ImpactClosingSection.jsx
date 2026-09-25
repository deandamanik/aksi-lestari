import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CameraIcon } from '../../../components/common/Icons'
import { IMPACT_METRICS, CLOSING_CTA } from '../../../data/beranda/impactClosingData'

function getInitialCounts() {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return {
      reports: 1248,
      independent: 856,
      community: 124,
      regions: 32,
    }
  }
  return {
    reports: 0,
    independent: 0,
    community: 0,
    regions: 0,
  }
}

function ImpactClosingSection() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const sectionRef = useRef(null)
  const hasAnimatedRef = useRef(prefersReducedMotion)
  const [counts, setCounts] = useState(getInitialCounts)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  const baseTransition = 'transition-all duration-[550ms] ease-out will-change-[opacity,transform]'
  const getEntranceClass = () => {
    return `${baseTransition} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`
  }

  useEffect(() => {
    if (prefersReducedMotion) return

    let rafId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true
          setIsVisible(true)
          observer.disconnect()

          const duration = 850
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)
            // Smooth easeOutCubic deceleration
            const eased = 1 - Math.pow(1 - progress, 3)

            setCounts({
              reports: Math.round(eased * 1248),
              independent: Math.round(eased * 856),
              community: Math.round(eased * 124),
              regions: Math.round(eased * 32),
            })

            if (progress < 1) {
              rafId = requestAnimationFrame(animate)
            } else {
              setCounts({
                reports: 1248,
                independent: 856,
                community: 124,
                regions: 32,
              })
            }
          }

          rafId = requestAnimationFrame(animate)
        }
      },
      {
        threshold: 0.2,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [prefersReducedMotion])

  return (
    <section id="dampak-aksi" className="w-full">
      {/* LAYER 1: Dark Green Impact Statistics Band */}
      <div
        ref={sectionRef}
        className={`w-full bg-primary text-white py-10 sm:py-12 lg:py-14 select-none ${getEntranceClass()}`}
        aria-label="Statistik Dampak Partisipasi"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
            {IMPACT_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="flex flex-col items-center justify-center"
              >
                {/* Large Dominant Number */}
                <span className="font-display text-white text-3xl sm:text-4xl lg:text-[3.25rem] leading-none tracking-tight mb-2 sm:mb-2.5 tabular-nums">
                  {counts[metric.id].toLocaleString('id-ID')}
                </span>

                {/* Secondary Uppercase Label */}
                <span className="font-body text-white/80 text-[11px] sm:text-xs tracking-wider uppercase font-bold">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LAYER 2: Warm Cream Closing CTA Area */}
      <div className="w-full bg-[#FAF8F3] text-primary pt-14 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-t border-border-warm/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Dominant Headline */}
          <h2
            className={`font-display text-primary text-3xl sm:text-4xl lg:text-[2.625rem] leading-[1.2] tracking-tight mb-3 sm:mb-3.5 ${getEntranceClass()}`}
            style={{ transitionDelay: '50ms' }}
          >
            {CLOSING_CTA.heading}
          </h2>

          {/* Secondary Supporting Text */}
          <p
            className={`font-body text-primary/75 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-9 max-w-xl mx-auto ${getEntranceClass()}`}
            style={{ transitionDelay: '100ms' }}
          >
            {CLOSING_CTA.subheading}
          </p>

          {/* Compact Centered CTA Buttons Row */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 ${getEntranceClass()}`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Primary Filled Button */}
            <Link
              to={CLOSING_CTA.primaryAction.href}
              className="inline-flex items-center justify-center gap-2.5 bg-primary text-white hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 px-7 py-3.5 rounded-full font-body font-bold text-sm sm:text-base shadow-xs w-full sm:w-auto focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CameraIcon className="w-5 h-5 text-white shrink-0" strokeWidth={2} />
              <span>{CLOSING_CTA.primaryAction.label}</span>
            </Link>

            {/* Secondary Outlined Button */}
            <Link
              to={CLOSING_CTA.secondaryAction.href}
              className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary/5 active:scale-[0.98] transition-all duration-200 px-7 py-3.5 rounded-full font-body font-semibold text-sm sm:text-base w-full sm:w-auto focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{CLOSING_CTA.secondaryAction.label}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactClosingSection
