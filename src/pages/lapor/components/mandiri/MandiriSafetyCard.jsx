import { ShieldAlertIcon, CheckIcon } from '../../../../components/common/Icons'

function MandiriSafetyCard({ isConfirmed, onToggle }) {
  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs px-5 py-4 sm:px-6 sm:py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
      {/* Left Area: Explanatory Content */}
      <div className="flex flex-col gap-1 min-w-0 max-w-xl">
        <div className="flex items-center gap-2">
          <ShieldAlertIcon className="w-4.5 h-4.5 text-primary shrink-0" strokeWidth={2} aria-hidden="true" />
          <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
            Siap Menangani Sendiri?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-6.5">
          Pastikan kondisi di sekitar aman sebelum melanjutkan ke panduan penanganan.
        </p>
      </div>

      {/* Right Area: Safety Acknowledgement Checkbox */}
      <div className="shrink-0 md:max-w-[280px] lg:max-w-[320px]">
        <label className="inline-flex items-start gap-3 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only"
            aria-label="Saya memastikan kondisi di area aman untuk saya tangani."
          />
          <div
            className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-colors shrink-0 group-focus-within:ring-2 group-focus-within:ring-primary group-focus-within:ring-offset-1 ${
              isConfirmed
                ? 'bg-primary border-primary text-white'
                : 'border-stone-300 bg-white group-hover:border-primary/50'
            }`}
            aria-hidden="true"
          >
            {isConfirmed && <CheckIcon className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </div>
          <span className="text-xs sm:text-sm font-medium text-stone-800 group-hover:text-stone-900 leading-snug transition-colors">
            Saya memastikan kondisi di area aman untuk saya tangani.
          </span>
        </label>
      </div>
    </div>
  )
}

export default MandiriSafetyCard
