import { WEEKLY_MISSIONS } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiWeeklySummary — Primary Visual Anchor
 *
 * Horizontal layout following reference: title/subtitle left, stats right.
 * Typography-driven hierarchy — no colored pills/badges.
 * Progress bar is prominent, status is a simple dot + text.
 */
function MisiWeeklySummary() {
  // Derive from actual mission data — keeps numbers in sync
  const totalCount = WEEKLY_MISSIONS.reduce((sum, m) => sum + m.progressTarget, 0)
  const currentProgress = WEEKLY_MISSIONS.reduce((sum, m) => sum + m.progressCurrent, 0)
  const totalXPEarned = WEEKLY_MISSIONS.reduce((sum, m) => {
    // XP proportional to progress
    const ratio = m.progressCurrent / m.progressTarget
    return sum + Math.round(m.rewardXP * ratio)
  }, 0)
  const progressPercent = totalCount > 0 ? Math.round((currentProgress / totalCount) * 100) : 0

  return (
    <section
      aria-labelledby="weekly-summary-heading"
      className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-5"
    >
      {/* Top: heading + subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h2
            id="weekly-summary-heading"
            className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Ringkasan Misi Pekan Ini
          </h2>
          <p className="text-sm text-stone-500 font-medium">
            {currentProgress} dari {totalCount} target mingguan selesai
          </p>
        </div>

        {/* Status — simple dot + text */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary select-none shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
          Aktif
        </span>
      </div>

      {/* Progress composition */}
      <div className="flex flex-col gap-3">
        {/* Fraction + percentage */}
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm font-semibold text-stone-600">
            Progress keseluruhan
          </span>
          <span className="text-sm font-bold text-stone-800 tabular-nums">
            {currentProgress} / {totalCount}
            <span className="ml-2 text-primary font-bold">{progressPercent}%</span>
          </span>
        </div>

        {/* Progress bar — prominent, rounded, green */}
        <div
          className="w-full h-3 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres mingguan: ${currentProgress} dari ${totalCount} target selesai (${progressPercent}%)`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* XP earned — amber accent, quiet */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="font-bold text-amber-700 tabular-nums">+{totalXPEarned} XP</span>
        <span className="text-stone-400 font-medium">siap diklaim setelah target terakhir tuntas</span>
      </div>
    </section>
  )
}

export default MisiWeeklySummary
