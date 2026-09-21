import { HelpCircleIcon, SparklesIcon } from '../../../../components/common/Icons'

function MandiriTrackingNextSteps() {
  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs p-5 sm:p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <HelpCircleIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
        <h3 className="font-bold text-sm text-stone-900">
          Apa Selanjutnya?
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
        Bukti tindakanmu sedang diperiksa. Kamu akan mendapatkan pembaruan setelah hasil validasi tersedia.
      </p>

      <div className="pt-2.5 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
        <SparklesIcon className="w-3.5 h-3.5 text-secondary shrink-0" strokeWidth={2} aria-hidden="true" />
        <span>XP dan Saldo Apresiasi akan diberikan setelah aksi mencapai status Terverifikasi.</span>
      </div>
    </div>
  )
}

export default MandiriTrackingNextSteps
