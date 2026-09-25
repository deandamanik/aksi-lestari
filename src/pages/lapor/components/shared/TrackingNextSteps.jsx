import { HelpCircleIcon, SparklesIcon } from '../../../../components/common/Icons'

/**
 * TrackingNextSteps — Shared Informational Card for Tracking Views
 *
 * Used in both public report tracking (/lapor/tracking) and mandiri validation (/lapor/mandiri/validasi)
 * to communicate next verification steps and XP/appreciation rewards.
 *
 * @param {object} props
 * @param {string} [props.title='Apa Selanjutnya?']
 * @param {string} [props.description]
 * @param {string} [props.rewardNote]
 * @param {string} [props.className='']
 */
function TrackingNextSteps({
  title = 'Apa Selanjutnya?',
  description = 'Laporan akan diperiksa sebelum diteruskan ke proses penanganan. Kamu akan mendapatkan pembaruan setelah hasil validasi tersedia.',
  rewardNote = 'XP dan Saldo Apresiasi akan diberikan setelah laporan mencapai status Selesai.',
  className = '',
}) {
  return (
    <div className={`rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 flex flex-col gap-3 ${className}`.trim()}>
      <div className="flex items-center gap-2">
        <HelpCircleIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
        <h3 className="font-bold text-sm text-stone-900">
          {title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
        {description}
      </p>

      {rewardNote && (
        <div className="pt-2.5 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
          <SparklesIcon className="w-3.5 h-3.5 text-secondary shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>{rewardNote}</span>
        </div>
      )}
    </div>
  )
}

export default TrackingNextSteps
