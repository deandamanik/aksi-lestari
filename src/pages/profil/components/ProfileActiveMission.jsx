import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { ACTIVE_WEEKLY_MISSION } from '../../../data/profil/weeklyMissionsData'

/**
 * ProfileActiveMission — Second Visual Anchor
 *
 * More prominent than shortcuts: thicker progress bar, larger CTA.
 * Reads as an actionable card, not a statistic card.
 * Mission is WEEKLY only — no daily anything.
 */
function ProfileActiveMission() {
  const {
    eyebrow,
    resetCountdown,
    title,
    description,
    progressLabel,
    progressPercent,
    rewardXP,
    ctaLabel,
    ctaPath,
  } = ACTIVE_WEEKLY_MISSION

  return (
    <section
      aria-labelledby="active-mission-heading"
      className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-5"
    >
      {/* Eyebrow + countdown */}
      <div className="flex items-center gap-2 text-xs select-none flex-wrap">
        <span className="font-bold text-primary tracking-widest uppercase text-[11px]">
          {eyebrow}
        </span>
        <span className="text-stone-300">·</span>
        <span className="text-stone-400 font-medium text-[11px]">{resetCountdown}</span>
      </div>

      {/* Title — editorial heading weight */}
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

      {/* Progress + Reward — integrated layout */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-bold text-stone-800">{progressLabel}</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-primary text-sm">{progressPercent}%</span>
            <span className="text-xs font-bold text-amber-700 tabular-nums">+{rewardXP} XP</span>
          </div>
        </div>

        {/* Progress bar — thicker than header bar for visual distinction */}
        <div
          className="w-full h-3 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres misi: ${progressPercent}%`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* CTA — primary interaction */}
      <div className="flex justify-end pt-1">
        <Link
          to={ctaPath}
          className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-7 sm:px-8 rounded-full bg-primary hover:bg-primary/90 active:scale-[0.97] text-white text-sm sm:text-base font-semibold transition-all duration-200 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span>{ctaLabel}</span>
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  )
}

export default ProfileActiveMission
