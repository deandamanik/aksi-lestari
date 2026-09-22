import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * ProfileHeader — Primary Visual Anchor
 *
 * One unified composition: avatar + identity + XP progression.
 * Name is the dominant typographic element (Quando).
 * Level shown as quiet secondary text — no pills, no badges.
 * XP progression is prominent with a refined progress bar.
 * Avatar has a subtle green ring for identity anchoring.
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
      {/* Top: Identity + Bio — single composition */}
      <div className="p-6 sm:p-8 pb-5 sm:pb-6">
        <div className="flex items-start gap-5 sm:gap-6">
          {/* Avatar — refined with subtle green accent ring */}
          <div
            className="shrink-0 w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] rounded-full bg-[#FAF9F4] border-[2.5px] border-primary/20 text-primary flex items-center justify-center font-display text-2xl sm:text-[2rem] font-bold select-none transition-colors duration-300"
            aria-label={`Inisial relawan ${name}`}
          >
            {initials}
          </div>

          {/* Name + Level + Tagline */}
          <div className="flex flex-col gap-2 min-w-0 pt-1">
            {/* Name — dominant typography */}
            <div className="flex flex-col gap-0.5">
              <h1 className="font-display text-[1.75rem] sm:text-[2.125rem] text-stone-900 font-bold tracking-tight leading-none">
                {name}
              </h1>
              <span className="text-sm text-stone-400 font-medium mt-1 select-none">
                {currentLevel}{' '}
                <span className="text-stone-300 mx-0.5" aria-hidden="true">·</span>{' '}
                <span className="text-primary/70">{levelTierName}</span>
              </span>
            </div>

            {/* Tagline — personal statement feel */}
            <p className="text-sm sm:text-[0.938rem] text-stone-500/90 leading-relaxed max-w-lg mt-0.5">
              &ldquo;{bio}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: XP Progression — integrated, warm surface */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-5 sm:pt-6 bg-[#FAF9F4]/50 border-t border-[#E8E5DC]/50">
        {/* XP Value row */}
        <div className="flex items-end justify-between gap-4 mb-3.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-[2rem] sm:text-[2.5rem] font-bold text-stone-900 tracking-tight leading-none tabular-nums">
              {currentXP}
            </span>
            <span className="text-sm font-bold text-primary/80 tracking-wide">XP</span>
          </div>
          <span className="text-sm text-stone-400 font-medium tabular-nums">
            {currentXP} / {nextLevelXP}
          </span>
        </div>

        {/* Progress bar — refined, meaningful height */}
        <div
          className="group w-full h-3 rounded-full bg-stone-200/50 overflow-hidden transition-colors duration-300 hover:bg-stone-200/70 cursor-default"
          role="progressbar"
          aria-valuenow={currentXP}
          aria-valuemin={0}
          aria-valuemax={nextLevelXP}
          aria-label={`Progres level: ${currentXP} dari ${nextLevelXP} XP (${levelProgressPercent}%)`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate transition-all duration-300"
            style={{ width: `${levelProgressPercent}%` }}
          />
        </div>

        {/* Footer label */}
        <p className="text-xs sm:text-sm text-stone-400 mt-3 text-right">
          <span className="font-semibold text-stone-600 tabular-nums">{xpToNextLevel} XP</span>{' '}
          menuju{' '}
          <span className="font-medium text-stone-500">Level {nextLevelNumber}</span>
        </p>
      </div>
    </header>
  )
}

export default ProfileHeader
