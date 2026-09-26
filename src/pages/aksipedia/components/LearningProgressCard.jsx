import ProtectedModuleLink from './ProtectedModuleLink'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { LEARNING_PROGRESS_DATA } from '../../../data/aksipedia/aksipediaHubData'
import { useInView } from '../../../hooks/useInView'

function LearningProgressCard() {
  const { title, detail, percentage, continueLabel } = LEARNING_PROGRESS_DATA
  const [cardRef, inView] = useInView({ threshold: 0.15 })

  return (
    <section ref={cardRef} className="w-full pb-20 sm:pb-24 lg:pb-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Horizontal Progress Strip (No dashboard card box) */}
        <div
          className={`border-t border-border-warm pt-6 sm:pt-8 transition-all duration-700 ease-out will-change-[opacity,transform] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            {/* Left: Reading Milestone Status */}
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-secondary mb-1 select-none">
                {title}
              </span>
              <p className="font-body text-xs sm:text-sm text-stone-600 font-medium">
                {detail}
              </p>
            </div>

            {/* Center: Slender Reading Progress Track */}
            <div className="flex-1 max-w-md flex items-center gap-3.5">
              <div
                className="flex-1 h-1.5 rounded-full bg-stone-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Kemajuan membaca modul"
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-primary shrink-0 tabular-nums">
                {percentage}%
              </span>
            </div>

            {/* Right: Natural Reading Continuation Link */}
            <div className="shrink-0 self-start lg:self-auto">
              <ProtectedModuleLink
                to="/aksipedia/modul/memahami-jenis-sampah"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors group"
              >
                <span>{continueLabel}</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </ProtectedModuleLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningProgressCard
