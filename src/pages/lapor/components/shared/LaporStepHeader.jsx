import LaporStepper from './LaporStepper'

/**
 * LaporStepHeader
 *
 * Shared heading block for all 4 main Lapor step pages.
 * Renders the compact stepper, then the page title, then an optional subtitle.
 *
 * IMPORTANT: "Langkah N dari 4" chip intentionally removed — the compact
 * stepper communicates position clearly without a redundant text chip.
 *
 * Props:
 *   step      {number}  — 1-indexed step number (1–4)
 *   title     {string}  — Page <h1> text
 *   subtitle  {string?} — Optional supporting sentence below the title
 *   className {string?} — Optional extra classes on the wrapper
 */
function LaporStepHeader({ step, title, subtitle, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <LaporStepper currentStep={step} />

      <h1 className="mt-4 sm:mt-7 font-display font-normal text-2xl sm:text-4xl lg:text-[40px] text-primary tracking-tight leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1.5 sm:mt-2 font-body text-stone-500 text-xs sm:text-base max-w-lg mx-auto leading-relaxed px-2 sm:px-0">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default LaporStepHeader
