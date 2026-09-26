import { ACTION_JOURNEY_STEPS } from '../../../data/beranda/actionJourneySteps'
import { useActionJourneyScroll } from '../../../hooks/useActionJourneyScroll'
import { useInView } from '../../../hooks/useInView'

function ActionJourneySection() {
  const {
    journeyTrackRef,
    progressPathRef,
    mobileStepRefs,
    activeStepIndex,
  } = useActionJourneyScroll()

  const [mobileIntroRef, mobileIntroInView] = useInView({ threshold: 0.15 })
  const [desktopIntroRef, desktopIntroInView] = useInView({ threshold: 0.15 })

  const baseTransition = 'transition-all duration-[550ms] ease-out will-change-[opacity,transform]'
  const getMobileIntroClass = () =>
    `${baseTransition} ${
      mobileIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`
  const getDesktopIntroClass = () =>
    `${baseTransition} ${
      desktopIntroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`

  return (
    <section
      id="langkah-partisipasi"
      className="relative w-full bg-[#FAF8F3] text-primary pt-10 sm:pt-20 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 border-t border-border-warm/50 overflow-visible"
      aria-labelledby="action-journey-heading"
    >
      <div ref={mobileIntroRef} className="block lg:hidden max-w-[1180px] mx-auto px-4 sm:px-6 pt-0 sm:pt-20 mb-10 text-center">
        <span className={`inline-block text-xs uppercase tracking-widest font-body font-bold text-secondary mb-2.5 ${getMobileIntroClass()}`}>
          LANGKAH PARTISIPASI
        </span>
        <h2
          id="action-journey-heading-mobile"
          className={`font-display text-primary text-3xl sm:text-4xl leading-[1.2] tracking-tight mb-3 ${getMobileIntroClass()}`}
          style={{ transitionDelay: '60ms' }}
        >
          Empat Langkah Nyata Bergerak
        </h2>
        <p
          className={`font-body text-primary/75 text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${getMobileIntroClass()}`}
          style={{ transitionDelay: '120ms' }}
        >
          Alur terstruktur dari pengamatan mata hingga aksi berdampak yang diakui.
        </p>
      </div>

      {/* Desktop Composition: Dedicated Finite Sticky Runway (210vh) */}
      <div
        ref={journeyTrackRef}
        className="hidden lg:block relative"
        style={{ height: '210vh' }}
      >
        {/* Sticky Storytelling Stage: Full-viewport sticky wrapper with unified centered composition */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-visible">
          <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-col -mt-4 xl:-mt-6">
            {/* Desktop Editorial Intro: Controlled vertical relationship above journey track */}
            <div ref={desktopIntroRef} className="text-center max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-8 xl:mb-10">
              <span className={`inline-block text-xs uppercase tracking-widest font-body font-bold text-secondary mb-2.5 ${getDesktopIntroClass()}`}>
                LANGKAH PARTISIPASI
              </span>
              <h2
                id="action-journey-heading"
                className={`font-display text-primary text-3xl sm:text-4xl lg:text-[2.35rem] xl:text-[2.625rem] leading-[1.2] tracking-tight whitespace-normal lg:whitespace-nowrap mb-3 sm:mb-4 ${getDesktopIntroClass()}`}
                style={{ transitionDelay: '60ms' }}
              >
                Empat Langkah Nyata Bergerak
              </h2>
              <p
                className={`font-body text-primary/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto ${getDesktopIntroClass()}`}
                style={{ transitionDelay: '120ms' }}
              >
                Alur terstruktur dari pengamatan mata hingga aksi berdampak yang diakui.
              </p>
            </div>

            <div className="relative w-full h-[140px] mb-8 select-none">
              <svg
                viewBox="0 0 1000 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 40 38 L 125 38 C 245 38, 255 78, 375 78 C 495 78, 505 52, 625 52 C 745 52, 755 92, 875 92 L 960 92"
                  stroke="#22603B"
                  strokeOpacity="0.15"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  ref={progressPathRef}
                  d="M 40 38 L 125 38 C 245 38, 255 78, 375 78 C 495 78, 505 52, 625 52 C 745 52, 755 92, 875 92 L 960 92"
                  stroke="#22603B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ willChange: 'stroke-dashoffset' }}
                />
              </svg>

              {ACTION_JOURNEY_STEPS.map((step, index) => {
                const coords = [
                  { left: '12.5%', top: '27.14%' }, // y = 38px
                  { left: '37.5%', top: '55.71%' }, // y = 78px
                  { left: '62.5%', top: '37.14%' }, // y = 52px
                  { left: '87.5%', top: '65.71%' }, // y = 92px
                ][index]

                const Icon = step.icon
                const isActive = activeStepIndex === index
                const isCompleted = activeStepIndex > index

                return (
                  <div
                    key={step.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none z-10"
                    style={{ left: coords.left, top: coords.top }}
                  >
                    <div
                      className={`mb-1.5 px-2.5 py-0.5 rounded-full transition-all duration-300 ease-out ${
                        isActive
                          ? 'bg-primary text-white border border-primary shadow-xs'
                          : isCompleted
                          ? 'bg-white text-primary border border-primary/30'
                          : 'bg-white/60 text-secondary/50 border border-border-warm'
                      }`}
                    >
                      <span className="font-body font-bold text-[11px] tracking-wider">
                        {step.number}
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                        isActive
                          ? 'bg-primary border-2 border-primary text-white scale-105 shadow-md ring-4 ring-primary/10'
                          : isCompleted
                          ? 'bg-white border-2 border-primary/80 text-primary scale-100 shadow-xs'
                          : 'bg-white/70 border-2 border-border-warm/80 text-primary/35 scale-100 shadow-2xs'
                      }`}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-300"
                        strokeWidth={isActive ? 2 : 1.8}
                      />
                    </div>

                    <div
                      className={`w-[1px] h-6 border-l mt-1.5 transition-colors duration-300 ${
                        isActive
                          ? 'border-primary/50 border-solid'
                          : isCompleted
                          ? 'border-primary/30 border-dashed'
                          : 'border-border-warm/70 border-dashed'
                      }`}
                    />
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-4 gap-6 xl:gap-8">
              {ACTION_JOURNEY_STEPS.map((step, index) => {
                const isActive = activeStepIndex === index

                return (
                  <div
                    key={step.id}
                    className={`flex flex-col h-full p-6 rounded-2xl transition-all duration-300 ease-out ${
                      isActive
                        ? 'bg-white border-primary/30 shadow-md ring-1 ring-primary/10 opacity-100 translate-y-0'
                        : 'bg-white/60 border-border-warm/70 shadow-2xs opacity-60 translate-y-0.5'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-widest uppercase font-body mb-2 transition-colors duration-300 ${
                        isActive ? 'text-secondary' : 'text-primary/45'
                      }`}
                    >
                      Langkah {step.number}
                    </span>

                    {/* Step Title */}
                    <h3
                      className={`font-display text-xl leading-snug tracking-tight mb-2.5 transition-colors duration-300 ${
                        isActive
                          ? 'text-primary font-normal'
                          : 'text-primary/75 font-normal'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p
                      className={`font-body text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                        isActive ? 'text-primary/85' : 'text-primary/60'
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Supporting Microcopy Sentence (Clean editorial, no pill/border) */}
                    <p
                      className={`mt-auto pt-1 font-body text-xs sm:text-[0.8125rem] font-medium leading-normal transition-colors duration-300 ${
                        isActive ? 'text-primary/75' : 'text-primary/45'
                      }`}
                    >
                      {step.supportingText}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Composition: Vertical Flow with Sequential Scroll Activation */}
      <div className="block lg:hidden max-w-lg mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col">
          {ACTION_JOURNEY_STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStepIndex === index
            const isCompleted = activeStepIndex > index
            const isLast = index === ACTION_JOURNEY_STEPS.length - 1

            return (
              <div
                key={step.id}
                ref={(el) => {
                  mobileStepRefs.current[index] = el
                }}
                className="flex flex-col"
              >
                <div
                  className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-white border-primary/30 shadow-md ring-1 ring-primary/10 opacity-100'
                      : 'bg-white/70 border-border-warm/70 shadow-xs opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                        isActive
                          ? 'bg-primary border-2 border-primary text-white shadow-md'
                          : isCompleted
                          ? 'bg-white border-2 border-primary/80 text-primary shadow-xs'
                          : 'bg-white border-2 border-border-warm text-primary/40'
                      }`}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-300"
                        strokeWidth={isActive ? 2 : 1.8}
                      />
                    </div>
                    <div>
                      <span
                        className={`block text-xs font-bold tracking-widest uppercase font-body transition-colors duration-300 ${
                          isActive ? 'text-secondary' : 'text-primary/50'
                        }`}
                      >
                        Langkah {step.number}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-xl leading-snug tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-primary/80'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`font-body text-sm sm:text-base leading-relaxed pl-0.5 mb-3.5 transition-colors duration-300 ${
                      isActive ? 'text-primary/85' : 'text-primary/65'
                    }`}
                  >
                    {step.description}
                  </p>

                  <p
                    className={`pl-0.5 font-body text-xs sm:text-sm font-medium leading-normal transition-colors duration-300 ${
                      isActive ? 'text-primary/75' : 'text-primary/45'
                    }`}
                  >
                    {step.supportingText}
                  </p>
                </div>

                {!isLast && (
                  <div
                    className="py-2.5 flex items-center justify-center select-none"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-9 overflow-visible"
                      viewBox="0 0 24 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 12 0 C 18 9, 6 27, 12 36"
                        stroke={isCompleted ? '#22603B' : '#E8E5DC'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-colors duration-300"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ActionJourneySection
