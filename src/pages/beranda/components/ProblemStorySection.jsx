import { PROBLEM_STORY_STATES } from '../../../data/beranda/problemStoryStates'
import { useProblemStoryScroll } from '../../../hooks/useProblemStoryScroll'

function ProblemStorySection() {
  const { storyTrackRef, cardElsRef, activeIndex } = useProblemStoryScroll()

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
              {PROBLEM_STORY_STATES.map((state, index) => {
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
              {PROBLEM_STORY_STATES.map((state, index) => {
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
          {PROBLEM_STORY_STATES.map((state) => (
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
