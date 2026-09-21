import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * ProfileHeader — Primary Visual Anchor
 *
 * Design: Editorial-style identity card.
 * Name is the dominant typographic element.
 * Level is quiet secondary text.
 * XP + progress bar is prominent but restrained.
 * No colored badges, no heavy decorations.
 */
function ProfileHeader() {
  const {
    name,
    initials,
    bio,
    currentLevel,
    levelTierName,
    currentXP,
    nextLevelXP,
    xpToNextLevel,
    nextLevelNumber,
    levelProgressPercent,
  } = USER_PROFILE

  return (
    <header className="bg-white rounded-2xl border border-[#E8E5DC] overflow-hidden">
      {/* Top: Identity + Bio */}
      <div className="p-6 sm:p-8 pb-0 sm:pb-0">
        <div className="flex items-start gap-5 sm:gap-6">
          {/* Avatar — clean, calm */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF9F4] border-2 border-[#E8E5DC] text-primary flex items-center justify-center font-display text-2xl sm:text-3xl font-bold shrink-0 select-none"
            aria-label={`Inisial relawan ${name}`}
          >
            {initials}
          </div>

          {/* Name + Level + Tagline */}
          <div className="flex flex-col gap-1.5 min-w-0 pt-0.5">
            <div className="flex flex-col">
              <h1 className="font-display text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight leading-none">
                {name}
              </h1>
              <span className="text-sm text-stone-400 font-medium mt-1.5 select-none">
                {currentLevel} · {levelTierName}
              </span>
            </div>

            <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-lg mt-1">
              &ldquo;{bio}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: XP Progression — full-width, integrated, prominent */}
      <div className="mt-6 sm:mt-8 px-6 sm:px-8 pb-6 sm:pb-7 bg-[#FAF9F4]/60 border-t border-[#E8E5DC]/60">
        <div className="pt-5 sm:pt-6">
          {/* XP Value — prominent number */}
          <div className="flex items-end justify-between gap-4 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-none">
                {currentXP}
              </span>
              <span className="text-sm font-bold text-primary tracking-wide">XP</span>
            </div>
            <span className="text-sm text-stone-400 font-medium tabular-nums">
              {currentXP} / {nextLevelXP}
            </span>
          </div>

          {/* Progress bar — slightly thicker for presence */}
          <div
            className="w-full h-2.5 rounded-full bg-stone-200/70 overflow-hidden"
            role="progressbar"
            aria-valuenow={currentXP}
            aria-valuemin={0}
            aria-valuemax={nextLevelXP}
            aria-label={`Progres level: ${currentXP} dari ${nextLevelXP} XP`}
          >
            <div
              className="h-full rounded-full bg-primary progress-fill-animate"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>

          {/* Footer label */}
          <p className="text-xs sm:text-sm text-stone-400 mt-2.5 text-right">
            <span className="font-semibold text-stone-600">{xpToNextLevel} XP</span> menuju Level {nextLevelNumber}
          </p>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
