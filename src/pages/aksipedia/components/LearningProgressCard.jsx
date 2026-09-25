import ProtectedModuleLink from './ProtectedModuleLink'
import { BookOpenIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { LEARNING_PROGRESS_DATA } from '../../../data/aksipedia/aksipediaHubData'

function LearningProgressCard() {
  const { title, detail, percentage, continueLabel } = LEARNING_PROGRESS_DATA

  return (
    <section className="w-full pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Info & Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <BookOpenIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-primary text-base sm:text-lg">
                  {title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-stone-500 mt-0.5">
                  {detail}
                </p>
              </div>
            </div>

            {/* Center: Minimalist Progress Bar */}
            <div className="flex-1 max-w-md flex items-center gap-3">
              <div
                className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Kemajuan belajar modul"
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

            {/* Right: Continue Link */}
            <ProtectedModuleLink
              to="/aksipedia/modul/memahami-jenis-sampah"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors self-start lg:self-auto shrink-0 group"
            >
              <span>{continueLabel}</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </ProtectedModuleLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningProgressCard
