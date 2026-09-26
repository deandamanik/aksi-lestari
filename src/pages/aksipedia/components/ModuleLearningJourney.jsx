function ModuleLearningJourney({
  sections,
  activeSectionId,
  onSelectSection,
}) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSectionId)
  )

  const activeSection = sections[activeIndex] || sections[0]

  return (
    <nav
      className="sticky top-16 sm:top-20 z-30 bg-neutral/95 backdrop-blur-sm py-2.5 sm:py-3 border-y border-border-warm/70 select-none shadow-2xs lapor-enter-card"
      aria-label="Navigasi bagian materi modul"
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact 5-step container matching reading width */}
        <div className="max-w-[480px] sm:max-w-[520px] mx-auto">
          <div className="grid grid-cols-5 w-full">
            {sections.map((sec, idx) => {
              const isCompleted = idx < activeIndex
              const isActive = idx === activeIndex
              const stepNum = String(idx + 1).padStart(2, '0')

              // Extract short title without number prefix
              const shortTitle = sec.navLabel
                ? sec.navLabel.replace(/^\d+\s*/, '')
                : sec.title.replace(/^\d+\s*/, '')

              return (
                <div
                  key={sec.id}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Connector segment to previous node (stops at circle boundary) */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-3.5 h-[1.5px] -translate-y-1/2 pointer-events-none transition-colors duration-150 ${
                        idx <= activeIndex ? 'bg-primary/50' : 'bg-border-warm'
                      }`}
                      style={{ left: 0, right: 'calc(50% + 14px)' }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Connector segment to next node (starts at circle boundary) */}
                  {idx < sections.length - 1 && (
                    <div
                      className={`absolute top-3.5 h-[1.5px] -translate-y-1/2 pointer-events-none transition-colors duration-150 ${
                        idx < activeIndex ? 'bg-primary/50' : 'bg-border-warm'
                      }`}
                      style={{ left: 'calc(50% + 14px)', right: 0 }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Node Button */}
                  <button
                    type="button"
                    onClick={() => onSelectSection(sec.id)}
                    aria-label={`Bagian ${stepNum}: ${shortTitle}`}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-display transition-colors duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? 'bg-primary text-white font-bold shadow-2xs'
                        : isCompleted
                        ? 'bg-[#EAF1EC] text-primary border border-primary/35 font-semibold'
                        : 'bg-white text-stone-400 border border-stone-200 hover:border-primary/50 hover:text-stone-700 font-medium'
                    }`}
                  >
                    <span>{stepNum}</span>
                  </button>

                  {/* Desktop Section Title */}
                  <span
                    className={`hidden sm:block text-center mt-2 leading-snug transition-colors duration-150 px-0.5 ${
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

        {/* Mobile Active Section Indicator */}
        {activeSection && (
          <div className="sm:hidden flex items-center justify-center gap-1.5 mt-2 pt-1.5 border-t border-border-warm/40 text-xs text-primary font-bold">
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
