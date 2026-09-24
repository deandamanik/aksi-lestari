import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getUserProfileSession } from '../../../data/profil/userProfileData'
import { SettingsIcon, ArrowRightIcon, FlameIcon, AwardIcon } from '../../../components/common/Icons'

/**
 * ProfileIdentityArea — Persistent Personal Identity Panel
 *
 * Left anchor of the Profile Workspace.
 * Visual hierarchy:
 * 1. Avatar + Name + Level/Tier
 * 2. Bio personal statement
 * 3. XP Progression (current XP, progress bar, next level goal)
 * 4. Compact civic stats (Streak & Badges)
 * 5. Secondary action: Pengaturan Akun
 */
function ProfileIdentityArea() {
  const location = useLocation()
  const isSettingsActive = location.pathname === '/profil/pengaturan'

  const [profile, setProfile] = useState(getUserProfileSession)

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e?.detail) {
        setProfile((prev) => ({ ...prev, ...e.detail }))
      } else {
        setProfile(getUserProfileSession())
      }
    }

    window.addEventListener('profile-session-updated', handleUpdate)
    return () => window.removeEventListener('profile-session-updated', handleUpdate)
  }, [])

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
    streakWeeks,
    badgesCount,
  } = profile

  const displayInitials =
    initials || (name ? name.trim().charAt(0).toUpperCase() : 'I')

  return (
    <div className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 flex flex-col gap-5 shadow-2xs">
      {/* 1. Identity Block: Avatar + Name + Level + Bio */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3.5 lg:gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-neutral border-2 border-primary/20 text-primary flex items-center justify-center font-display text-2xl lg:text-3xl font-bold select-none shrink-0"
            aria-label={`Inisial relawan ${name}`}
          >
            {displayInitials}
          </div>

          {/* Name & Tier */}
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              {name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mt-1 select-none">
              <span>{currentLevel}</span>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <span className="text-primary font-semibold">{levelTierName}</span>
            </div>
          </div>
        </div>

        {/* Personal Statement / Bio */}
        {bio && (
          <p className="text-xs text-stone-600 leading-relaxed pt-0.5">
            {bio}
          </p>
        )}
      </div>

      {/* 2. XP Progression (Open Editorial Flow) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight tabular-nums">
              {currentXP}
            </span>
            <span className="text-xs font-bold text-primary tracking-wide">XP</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium tabular-nums">
            {currentXP} / {nextLevelXP}
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-2 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={currentXP}
          aria-valuemin={0}
          aria-valuemax={nextLevelXP}
          aria-label={`Progres level: ${currentXP} dari ${nextLevelXP} XP (${levelProgressPercent}%)`}
        >
          <div
            className="h-full rounded-full bg-primary progress-fill-animate"
            style={{ width: `${levelProgressPercent}%` }}
          />
        </div>

        <p className="text-[11px] text-stone-500 text-right leading-none">
          <span className="font-semibold text-stone-700 tabular-nums">{xpToNextLevel} XP</span>{' '}
          menuju <span className="font-medium text-stone-600">Level {nextLevelNumber}</span>
        </p>
      </div>

      {/* 3. Compact Civic Stats (Streak & Badges) */}
      <div className="grid grid-cols-2 gap-3 py-3.5 border-y border-border-warm/70">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-stone-500 truncate select-none">
            Streak Mingguan
          </span>
          <div className="inline-flex items-center gap-1.5 mt-1">
            <FlameIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-bold text-stone-900 tabular-nums leading-none">
                {streakWeeks}
              </span>
              <span className="text-xs font-semibold text-primary">Minggu</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-stone-500 truncate select-none">
            Lencana
          </span>
          <div className="inline-flex items-center gap-1.5 mt-1">
            <AwardIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-bold text-stone-900 tabular-nums leading-none">
                {badgesCount}
              </span>
              <span className="text-xs font-medium text-stone-500">Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Secondary Utility Action: Pengaturan Akun */}
      <div className="pt-0.5">
        <Link
          to="/profil/pengaturan"
          className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
            isSettingsActive
              ? 'bg-primary/10 text-primary font-bold'
              : 'text-stone-600 hover:text-stone-900 hover:bg-neutral'
          }`}
          aria-label="Buka Pengaturan Akun"
        >
          <span className="flex items-center gap-2">
            <SettingsIcon className="w-3.5 h-3.5 text-stone-500 group-hover:text-primary transition-colors" strokeWidth={1.8} />
            <span>Pengaturan Akun</span>
          </span>
          <ArrowRightIcon className="w-3.5 h-3.5 text-stone-500 group-hover:text-primary transition-colors shrink-0" strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}

export default ProfileIdentityArea

