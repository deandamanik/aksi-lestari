import { CheckCircle2Icon } from '../../../components/common/Icons'

function ModuleLearningJourney({
  sections,
  activeSectionId,
  scrollProgress = 0,
  onSelectSection,
}) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSectionId)
  )

  const activeSection = sections[activeIndex] || sections[0]

  // The 5 nodes are centered in 5 equal columns (each 20% wide).
  // Node 1 center is at 10%, Node 5 center is at 90%.
  // The progress line travels across this 80% span (from 10% to 90%).
  const clampedProgress = Math.min(100, Math.max(0, scrollProgress))
  const progressLineEndPercent = 10 + (clampedProgress / 100) * 80

  return (
    <nav
      className="sticky top-16 sm:top-20 z-30 bg-neutral/98 backdrop-blur-md py-3 sm:py-4 border-y border-border-warm/70 select-none shadow-2xs"
      aria-label="Alur perjalanan materi modul"
    >
      <div className="max-w-[660px] mx-auto px-4 sm:px-6">
        {/* Balanced 5-Column Grid Layout */}
        <div className="relative w-full">
          {/* Connecting SVG Path Line (Runs from 10% to 90%) */}
          <svg
            className="absolute top-3.5 sm:top-4 left-0 w-full h-2 overflow-visible pointer-events-none"
            aria-hidden="true"
          >
            {/* Background Muted Line */}
            <line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="#E8E5DC"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Real-time Dynamic Progress Green Line */}
            <line
              x1="10%"
              y1="50%"
              x2={`${progressLineEndPercent}%`}
              y2="50%"
              stroke="#22603B"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-75 ease-out"
            />
          </svg>

          {/* 5 Centered Columns */}
          <div className="grid grid-cols-5 w-full">
            {sections.map((sec, idx) => {
              const isCompleted = idx < activeIndex
              const isActive = idx === activeIndex
              const stepNum = String(idx + 1).padStart(2, '0')

              // Extract short title without number prefix
              const shortTitle = sec.navLabel
                ? sec.navLabel.replace(/^\d+\s*/, '')
                : sec.title.replace(/^\d+\s*/, '')

              let nodeClass =
                'w-7 h-7 rounded-full bg-white/95 text-stone-400 border border-stone-300 hover:border-primary/50 hover:text-stone-700'
              if (isActive) {
                nodeClass =
                  'w-8 h-8 rounded-full bg-primary text-white border-2 border-primary ring-4 ring-primary/15 scale-110 shadow-xs'
              } else if (isCompleted) {
                nodeClass =
                  'w-7 h-7 rounded-full bg-white text-primary border-2 border-primary/85 hover:border-primary'
              }

              return (
                <div
                  key={sec.id}
                  className="relative z-10 flex flex-col items-center justify-center text-center px-1"
                >
                  <button
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    aria-label={`Bagian ${stepNum}: ${shortTitle}`}
                    aria-current={isActive ? 'step' : undefined}
                    className={`flex items-center justify-center text-xs font-display font-bold transition-all duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${nodeClass}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2Icon className="w-4 h-4 text-primary" strokeWidth={2.5} />
                    ) : (
                      <span>{stepNum}</span>
                    )}
                  </button>

                  {/* Desktop Section Title - Centered in column */}
                  <span
                    className={`hidden sm:block text-center mt-2 leading-tight transition-colors duration-200 max-w-[125px] mx-auto whitespace-normal break-normal ${
                      isActive
                        ? 'font-display font-bold text-xs text-primary'
                        : isCompleted
                        ? 'font-body font-medium text-[11px] text-primary/75'
                        : 'font-body text-[11px] text-stone-400'
                    }`}
                  >
                    {shortTitle}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Active Section Subtitle */}
        {activeSection && (
          <div className="sm:hidden flex items-center justify-center gap-1.5 mt-2.5 pt-1.5 border-t border-border-warm/40 text-xs text-primary font-bold animate-in fade-in duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
            <span className="truncate max-w-[280px]">
              {activeSection.navLabel || activeSection.title}
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}

export default ModuleLearningJourney
