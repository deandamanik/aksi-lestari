import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { WEEKLY_MISSIONS } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiCompletionSummary — Weekly Completion Closing Section
 *
 * Summarizes completion state at the bottom of the page.
 * Provides CTA to Kontribusi & Riwayat.
 * Typography-driven, no excessive decoration.
 */
function MisiCompletionSummary() {
  const completedCount = WEEKLY_MISSIONS.filter((m) => m.status === 'completed').length
  const totalCount = WEEKLY_MISSIONS.length
  const totalXPEarned = WEEKLY_MISSIONS.filter((m) => m.status === 'completed').reduce(
    (sum, m) => sum + m.rewardXP,
    0
  )
  const allDone = completedCount === totalCount

  const motivationText = allDone
    ? 'Luar biasa! Semua target minggu ini sudah kamu selesaikan.'
    : 'Sedikit lagi untuk menyelesaikan seluruh target minggu ini.'

  return (
    <section
      aria-labelledby="completion-summary-heading"
      className="bg-[#FAF9F4] rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-4"
    >
      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
        Target Minggu Ini
      </span>

      <div className="flex flex-col gap-2">
        <h2
          id="completion-summary-heading"
          className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight"
        >
          {completedCount} dari {totalCount} misi selesai
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-md">
          {motivationText}
        </p>
      </div>

      {/* XP + CTA row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <span className="text-sm font-bold text-amber-600 tabular-nums">
          +{totalXPEarned} XP diperoleh
        </span>

        <Link
          to="/profil/riwayat"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-primary transition-colors duration-200 focus:outline-hidden focus-visible:underline"
        >
          <span>Lihat Kontribusi &amp; Riwayat</span>
          <ArrowRightIcon
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </section>
  )
}

export default MisiCompletionSummary
