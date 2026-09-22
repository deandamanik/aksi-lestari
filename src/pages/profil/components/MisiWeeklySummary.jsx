import { CURRENT_WEEK_METADATA, WEEKLY_MISSIONS } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiWeeklySummary — Primary Visual Anchor
 *
 * Displays weekly cycle metadata, overall progress, and total XP earned.
 * Design: editorial, typography-driven. No colored badges/pills.
 * Status shown as a simple dot + text with green accent.
 */
function MisiWeeklySummary() {
  // Derive from actual mission data — keeps numbers in sync
  const completedCount = WEEKLY_MISSIONS.filter((m) => m.status === 'completed').length
  const totalCount = WEEKLY_MISSIONS.length
  const totalXPEarned = WEEKLY_MISSIONS.filter((m) => m.status === 'completed').reduce(
    (sum, m) => sum + m.rewardXP,
    0
  )
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  return (
    <section
      aria-labelledby="weekly-summary-heading"
      className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-5"
    >
      {/* Top row: title + status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2
            id="weekly-summary-heading"
            className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Minggu Ini
          </h2>
          <span className="text-xs sm:text-sm text-stone-400 font-medium">
            {CURRENT_WEEK_METADATA.cycleRange}
          </span>
        </div>

        {/* Status — simple dot + text, no pill */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary select-none">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
          Aktif
        </span>
      </div>

      {/* Progress composition */}
      <div className="flex flex-col gap-3">
        {/* Fraction text */}
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm sm:text-base font-bold text-stone-800">
            {completedCount} dari {totalCount} misi selesai
          </span>
          <span className="text-sm font-semibold text-primary tabular-nums">
            {progressPercent}%
          </span>
        </div>

        {/* Progress bar — clean, moderate thickness */}
        <div
          className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres mingguan: ${completedCount} dari ${totalCount} misi selesai (${progressPercent}%)`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* XP earned — amber accent, quiet */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="font-bold text-amber-600 tabular-nums">+{totalXPEarned} XP</span>
        <span className="text-stone-400 font-medium">diperoleh</span>
      </div>
    </section>
  )
}

export default MisiWeeklySummary
