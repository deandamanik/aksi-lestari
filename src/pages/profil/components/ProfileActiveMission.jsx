import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { ACTIVE_WEEKLY_MISSION } from '../../../data/profil/weeklyMissionsData'

/**
 * ProfileActiveMission — Featured Active Mission
 *
 * The primary focal block of the Overview workspace.
 * Displays the current active weekly challenge with editorial typography,
 * clear progress indicator, XP reward, and a dedicated primary CTA.
 */
function ProfileActiveMission() {
  const {
    resetCountdown,
    title,
    description,
    progressCurrent,
    progressTarget,
    progressPercent,
    rewardXP,
    ctaPath,
  } = ACTIVE_WEEKLY_MISSION

  return (
    <section
      aria-labelledby="active-mission-heading"
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 flex flex-col gap-5 shadow-2xs"
    >
      {/* Label & Reset Indicator */}
      <div className="flex items-center gap-2 select-none flex-wrap text-xs text-stone-500 font-medium">
        <span className="font-semibold text-primary">Tantangan Minggu Ini</span>
        <span className="text-stone-300" aria-hidden="true">·</span>
        <span>{resetCountdown}</span>
      </div>

      {/* Main Title & Description */}
      <div className="flex flex-col gap-2">
        <h2
          id="active-mission-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug"
        >
          {title}
        </h2>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      {/* Progress & Target Section */}
      <div className="flex flex-col gap-2.5 pt-1">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="text-stone-700">
            {progressCurrent} dari {progressTarget} target
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-medium tabular-nums">
              {progressPercent}% selesai
            </span>
            <span className="text-xs sm:text-sm font-bold text-stone-900 tabular-nums">
              +{rewardXP} XP
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres misi: ${progressCurrent} dari ${progressTarget} target (${progressPercent}%)`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Primary Workspace CTA */}
      <div className="flex justify-end pt-1">
        <Link
          to={ctaPath}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all duration-150 select-none shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span>Lanjutkan Misi</span>
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}

export default ProfileActiveMission
