import { CameraIcon } from '../../../../components/common/Icons'

function MandiriStepsCard({ guidance }) {
  const { stepsSection } = guidance
  const { steps, documentationHelper } = stepsSection

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-7 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 tracking-tight">
            {stepsSection.title}
          </h2>
          {stepsSection.subtitle && (
            <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
              {stepsSection.subtitle}
            </p>
          )}
        </div>
        {stepsSection.badgeText && (
          <span className="text-xs font-medium text-stone-400 shrink-0 pt-1 select-none">
            {stepsSection.badgeText}
          </span>
        )}
      </div>

      {/* Sequential Steps List with connector line */}
      <ol className="list-none p-0 m-0" aria-label={stepsSection.title}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          return (
            <li
              key={step.number || index}
              className={`flex items-stretch gap-4 sm:gap-5 ${isLast ? '' : 'pb-6 sm:pb-7'}`}
            >
              {/* Step marker + vertical connector line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-mono font-bold text-xs sm:text-sm text-primary tracking-tight">
                    {step.number}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className="w-px grow bg-primary/25 my-1.5"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pt-0.5 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-base sm:text-lg text-stone-900 leading-snug">
                    {step.title}
                  </h3>
                  {step.category && (
                    <span className="text-xs font-medium text-stone-400 shrink-0 select-none">
                      {step.category}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      {/* Lightweight Documentation Helper */}
      {documentationHelper && (
        <div className="mt-1 pt-5 border-t border-stone-100 flex items-start gap-2.5 text-stone-500">
          <CameraIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs sm:text-sm font-semibold text-stone-700">
              {documentationHelper.title}
            </span>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {documentationHelper.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MandiriStepsCard
