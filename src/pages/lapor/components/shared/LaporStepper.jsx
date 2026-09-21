import { Fragment } from 'react'
import { LAPOR_STEPS } from '../../../../data/lapor/laporSteps'

/**
 * Sub-labels displayed under each step label in the stepper.
 * These are UI copy only — not part of the data model.
 */
const STEP_SUBLABELS = {
  temukan: 'Foto & Lokasi',
  kenali:  'Analisis Kondisi',
  aksi:    'Lapor / Mandiri',
  selesai: 'Apresiasi & XP',
}

/**
 * LaporStepper
 *
 * 4-step progress indicator for the Lapor reporting workflow.
 *
 * Desktop: numbered circles (36px) + thin connectors + label + sublabel.
 * Mobile: compact 4-step row (28px) with numbers, connectors, and step labels.
 */
function LaporStepper({ currentStep }) {
  return (
    <>
      {/* Desktop Stepper */}
      <div
        className="hidden sm:flex items-start justify-center"
        role="list"
        aria-label="Langkah-langkah pelaporan"
      >
        {LAPOR_STEPS.map((s, index) => {
          const isCompleted = s.step < currentStep
          const isActive = s.step === currentStep
          const isLast = index === LAPOR_STEPS.length - 1

          return (
            <Fragment key={s.key}>
              <div
                className="flex flex-col items-center gap-1.5 w-24 sm:w-28 shrink-0"
                role="listitem"
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary text-white shadow-xs'
                      : isActive
                        ? 'bg-primary text-white ring-4 ring-primary/20 shadow-xs'
                        : 'bg-[#F9F8F3] border border-[#D1CABC] text-stone-400 font-medium'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span aria-label={`Langkah ${s.step}`}>{s.step < 10 ? `0${s.step}` : s.step}</span>
                  )}
                </div>

                <span
                  className={`text-xs sm:text-sm font-bold text-center leading-tight transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-primary/70'
                        : 'text-stone-400'
                  }`}
                >
                  {s.label}
                </span>

                <span
                  className={`text-[11px] sm:text-xs text-center leading-tight px-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-stone-600 font-medium'
                      : isCompleted
                        ? 'text-stone-400'
                        : 'text-stone-400/80'
                  }`}
                >
                  {STEP_SUBLABELS[s.key]}
                </span>
              </div>

              {/* Connector: mt-[17px] aligns with vertical center of 36px (h-9) node */}
              {!isLast && (
                <div
                  className={`mt-[17px] h-px w-10 sm:w-14 shrink-0 transition-colors duration-300 ${
                    s.step < currentStep ? 'bg-primary/50' : 'bg-[#D8D2C8]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          )
        })}
      </div>

      {/* Mobile Stepper: compact 4-step sequence */}
      <div
        className="flex sm:hidden items-start justify-between w-full max-w-xs mx-auto px-2"
        role="list"
        aria-label="Langkah-langkah pelaporan"
      >
        {LAPOR_STEPS.map((s, index) => {
          const isCompleted = s.step < currentStep
          const isActive = s.step === currentStep
          const isLast = index === LAPOR_STEPS.length - 1

          return (
            <Fragment key={s.key}>
              <div
                className="flex flex-col items-center flex-1 min-w-0"
                role="listitem"
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary text-white shadow-xs'
                      : isActive
                        ? 'bg-primary text-white ring-3 ring-primary/20 shadow-xs'
                        : 'bg-[#F9F8F3] border border-[#D1CABC] text-stone-400 font-semibold'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span aria-label={`Langkah ${s.step}`}>{s.step < 10 ? `0${s.step}` : s.step}</span>
                  )}
                </div>

                <span
                  className={`text-[11px] font-bold text-center leading-tight mt-1 px-0.5 truncate max-w-full ${
                    isActive
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-primary/70'
                        : 'text-stone-400 font-medium'
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {/* Connector: mt-3.5 (14px) aligns with center of 28px (h-7) circle */}
              {!isLast && (
                <div
                  className={`mt-3.5 h-px flex-1 min-w-[6px] max-w-[24px] shrink transition-colors duration-300 ${
                    s.step < currentStep ? 'bg-primary/50' : 'bg-[#D8D2C8]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default LaporStepper
