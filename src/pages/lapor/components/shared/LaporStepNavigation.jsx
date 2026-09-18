import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/common/Icons'

/**
 * LaporStepNavigation
 *
 * Prev / Next navigation bar rendered at the bottom of every Lapor step page.
 *
 * Props:
 *   onBack          {function}  — Called when Back button is clicked
 *   onNext          {function}  — Called when Next button is clicked
 *   nextLabel       {string}    — Label for the primary action button
 *                                 Default: "Lanjutkan"
 *   isNextDisabled  {boolean}   — Disables the Next button when true
 *   hideBack        {boolean}   — Hides the Back button (for Step 1)
 *   helperText      {string?}   — Optional hint text below the buttons
 */
function LaporStepNavigation({
  onBack,
  onNext,
  nextLabel = 'Lanjutkan',
  isNextDisabled = false,
  hideBack = false,
  helperText,
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
        {!hideBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
            aria-label="Kembali ke langkah sebelumnya"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali</span>
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
            isNextDisabled
              ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
              : 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          }`}
          aria-label={nextLabel}
          aria-disabled={isNextDisabled}
        >
          <span>{nextLabel}</span>
          <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
        </button>
      </div>

      {helperText && (
        <p className="text-xs text-stone-500 mt-2.5 font-medium tracking-wide text-center">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default LaporStepNavigation
