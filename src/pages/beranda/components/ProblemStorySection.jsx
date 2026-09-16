import { useEffect, useRef, useState } from 'react'

const STORY_STATES = [
  {
    id: '01',
    number: '01',
    title: 'Jumlahnya terus bertambah.',
    statistic: '19,4 Juta Ton',
    statLabel: 'Timbulan per tahun',
    description:
      'Timbulan sampah terus meningkat dan menjadi bagian dari masalah lingkungan sehari-hari.',
    image: '/images/3d/state 1.webp',
    alt: 'Ilustrasi timbulan sampah di pemukiman yang terus meningkat',
  },
  {
    id: '02',
    number: '02',
    title: 'Sebagian tidak pernah sampai ke pengelolaan.',
    statistic: '34,8%',
    statLabel: 'Belum terkelola',
    description:
      'Sebagian sampah belum masuk ke sistem pengelolaan yang semestinya dan berakhir di lingkungan.',
    image: '/images/3d/state 2.webp',
    alt: 'Ilustrasi saluran air dan drainase yang tersumbat sampah tak terkelola',
  },
  {
    id: '03',
    number: '03',
    title: 'Masalahnya tersebar di banyak titik.',
    statistic: '7.200+',
    statLabel: 'Titik rawan tersebar',
    description:
      'Masalah sampah muncul di banyak titik dan tidak hanya terkonsentrasi di satu lokasi.',
    image: '/images/3d/state 3.webp',
    alt: 'Ilustrasi peta tiga dimensi persebaran titik timbulan sampah liar',
  },
]

// Smooth cubic ease: 3t^2 - 2t^3
function smoothStep(t) {
  const clamped = Math.max(0, Math.min(1, t))
  return clamped * clamped * (3 - 2 * clamped)
}

function getStagePosition(p) {
  // p in [0, 1] across the scroll track
  // Stage 0 Plateau: 0.00 -> 0.18
  if (p <= 0.18) return 0

  // Transition 0 -> 1: 0.18 -> 0.44
  if (p <= 0.44) {
    const t = (p - 0.18) / (0.44 - 0.18)
    return smoothStep(t)
  }

  // Stage 1 Plateau: 0.44 -> 0.62
  if (p <= 0.62) return 1

  // Transition 1 -> 2: 0.62 -> 0.88
  if (p <= 0.88) {
    const t = (p - 0.62) / (0.88 - 0.62)
    return 1 + smoothStep(t)
  }

  // Stage 2 Plateau: 0.88 -> 1.00
  return 2
}

function ProblemStorySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentActiveRef = useRef(0)
  const storyTrackRef = useRef(null)
  const cardElsRef = useRef([])

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
      const stickyTop = Math.max(80, Math.round(window.innerHeight / 2 - stageHeight / 2))
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

      // Editorial reveal motion: subtle 32px vertical reveal and scale settle
      const maxTravel = 32 // px vertical reveal distance
      const threshold = 0.50 // transition boundary

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

  return (
    <section
      className="relative w-full bg-neutral text-primary pt-12 sm:pt-14 lg:pt-16 pb-0 overflow-visible"
      aria-labelledby="problem-story-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Intro (Normal document flow, compact connection to story) */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="inline-block text-xs uppercase tracking-widest font-body font-bold text-secondary mb-2">
            Kondisi Nyata
          </span>
          <h2
            id="problem-story-heading"
            className="font-display text-primary text-2xl sm:text-3xl md:text-4xl leading-[1.2] tracking-tight mb-2.5 sm:mb-3"
          >
            Masalahnya bukan cuma jumlah sampah.
          </h2>
          <p className="font-body text-primary/75 text-sm sm:text-base leading-relaxed">
            Krisis persampahan bukan sekadar timbulan angka di atas kertas,
            melainkan alur tata kelola dan titik persebaran yang belum tertangani
            secara terpadu di tingkat lokal.
          </p>
        </div>
      </div>

      {/* Desktop & Tablet Dedicated Storytelling Track */}
      <div
        ref={storyTrackRef}
        className="hidden lg:block relative"
        style={{ height: '280vh' }}
      >
        {/* Single Story Viewport: Sticky centered vertically in viewport */}
        <div className="sticky top-[max(5rem,calc(50vh-240px))] xl:top-[max(5rem,calc(50vh-260px))] w-full overflow-hidden">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-10 xl:gap-14 items-center">
            {/* LEFT: Fixed Visual Scene (Primary visual anchor, ~10% larger presence) */}
            <div className="col-span-7 xl:col-span-7 relative h-[480px] xl:h-[520px] flex items-center justify-center select-none pointer-events-none pr-3 xl:pr-4">
              {STORY_STATES.map((state, index) => {
                const isActive = activeIndex === index
                return (
                  <div
                    key={state.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-[0.985]'
                    }`}
                    style={{ willChange: 'opacity, transform' }}
                  >
                    <img
                      src={state.image}
                      alt={state.alt}
                      className="max-h-full max-w-full scale-[1.08] xl:scale-[1.10] object-contain drop-shadow-md transform-gpu"
                      draggable={false}
                    />
                  </div>
                )
              })}
            </div>

            {/* RIGHT: Story Cards Reveal Area (Editorial sequence with micro-stagger) */}
            <div
              className="col-span-5 xl:col-span-5 relative h-[480px] xl:h-[520px] border-l-2 border-primary/10 overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
              }}
            >
              {STORY_STATES.map((state, index) => {
                const isActive = activeIndex === index
                return (
                  <div
                    key={state.id}
                    ref={(el) => {
                      cardElsRef.current[index] = el
                    }}
                    className="absolute left-7 xl:left-8 right-0 top-1/2 flex flex-col justify-center select-none"
                    style={{
                      willChange: 'transform, opacity',
                      transform: 'translate3d(0, -50%, 0)',
                    }}
                  >
                    {/* STEP 1: Editorial State Marker */}
                    <div
                      className={`flex items-center gap-2 mb-3 transition-all duration-350 ease-out delay-[0ms] ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <span className="text-xs font-bold tracking-widest uppercase text-secondary">
                        {state.number}
                      </span>
                      <span className="text-xs text-secondary font-bold">●</span>
                    </div>

                    {/* STEP 2: Story Title */}
                    <h3
                      className={`font-display text-xl sm:text-2xl xl:text-[1.625rem] leading-snug tracking-tight mb-4 text-primary transition-all duration-350 ease-out delay-[50ms] ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      {state.title}
                    </h3>

                    {/* STEP 3: Highlighted Statistic Card */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl mb-4 bg-white/80 border border-border-warm shadow-xs transition-all duration-350 ease-out delay-[100ms] ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <div className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight mb-1">
                        {state.statistic}
                      </div>
                      <div className="text-xs uppercase tracking-wider font-body font-semibold text-primary/60">
                        {state.statLabel}
                      </div>
                    </div>

                    {/* STEP 4: Story Description */}
                    <p
                      className={`font-body text-sm sm:text-base text-primary/80 leading-relaxed transition-all duration-350 ease-out delay-[150ms] ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                    >
                      {state.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sequential Layout (No sticky clashes, simple & readable) */}
      <div className="block lg:hidden px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="flex flex-col gap-12 sm:gap-16">
          {STORY_STATES.map((state) => (
            <div
              key={state.id}
              className="flex flex-col rounded-2xl bg-white/40 border border-border-warm/60 p-5 sm:p-6 shadow-xs"
            >
              {/* State Illustration */}
              <div className="w-full max-w-xs sm:max-w-sm mx-auto h-[220px] sm:h-[260px] flex items-center justify-center mb-5 select-none">
                <img
                  src={state.image}
                  alt={state.alt}
                  className="max-h-full max-w-full object-contain drop-shadow-sm"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* State Content */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-xs font-bold tracking-widest uppercase text-secondary">
                    {state.number}
                  </span>
                  <span className="text-xs text-secondary font-bold">●</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl text-primary leading-snug tracking-tight mb-3">
                  {state.title}
                </h3>

                <div className="p-3.5 rounded-xl bg-white border border-border-warm shadow-2xs mb-3">
                  <div className="font-display text-2xl sm:text-3xl text-primary font-bold tracking-tight mb-0.5">
                    {state.statistic}
                  </div>
                  <div className="text-xs uppercase tracking-wider font-body font-semibold text-primary/60">
                    {state.statLabel}
                  </div>
                </div>

                <p className="font-body text-primary/80 text-sm leading-relaxed">
                  {state.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reduced-Motion Support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors {
            transition: none !important;
            transform: none !important;
          }
          .translate-y-2 {
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ProblemStorySection
