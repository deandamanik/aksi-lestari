import { WEEKLY_MISSIONS } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiWeeklySummary — Light Weekly Context
 *
 * Open, quiet metadata row providing weekly cycle context without competing
 * with the primary featured MisiCard (no second progress bar, no heavy card container).
 */
function MisiWeeklySummary() {
  const totalCount = WEEKLY_MISSIONS.reduce((sum, m) => sum + m.progressTarget, 0)
  const currentProgress = WEEKLY_MISSIONS.reduce((sum, m) => sum + m.progressCurrent, 0)
  const remainingTargets = Math.max(0, totalCount - currentProgress)
  const totalXPEarned = WEEKLY_MISSIONS.reduce((sum, m) => {
    const ratio = m.progressCurrent / m.progressTarget
    return sum + Math.round(m.rewardXP * ratio)
  }, 0)

  return (
    <div
      aria-label="Konteks Siklus Mingguan"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-3.5 px-1 border-y border-border-warm/70 text-xs sm:text-sm text-stone-600"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-stone-900">Siklus Minggu Ini</span>
        <span className="text-stone-300" aria-hidden="true">·</span>
        <span className="font-medium text-stone-600">
          <span className="font-bold text-stone-800 tabular-nums">{currentProgress}</span> dari{' '}
          <span className="font-bold text-stone-800 tabular-nums">{totalCount}</span> target tercapai
        </span>
        {remainingTargets > 0 && (
          <>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="text-stone-500 font-medium tabular-nums">{remainingTargets} target tersisa</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <span className="font-bold text-amber-700 tabular-nums">+{totalXPEarned} XP</span>
        <span>ditambahkan otomatis ke akun setelah seluruh target tuntas</span>
      </div>
    </div>
  )
}

export default MisiWeeklySummary
