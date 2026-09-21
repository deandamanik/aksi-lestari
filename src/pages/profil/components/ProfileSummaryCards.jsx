import { Link } from 'react-router-dom'
import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * ProfileSummaryCards — Secondary Metric Composition
 *
 * XP is already shown prominently in ProfileHeader.
 * This section displays supporting metrics in a horizontal composition
 * that breaks the "3 identical dashboard cards" template feel.
 *
 * Layout: Horizontal row of distinct metric items — not 3 identical cards.
 * Each metric has different visual weight to create natural hierarchy.
 */
function ProfileSummaryCards() {
  const { streakWeeks, streakLabel, badgesCount, featuredBadges } = USER_PROFILE

  return (
    <section
      aria-label="Ringkasan Aktivitas dan Capaian"
      className="flex flex-col sm:flex-row sm:items-stretch gap-4"
    >
      {/* Streak Mingguan — primary supporting metric */}
      <div className="flex-1 bg-white rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 flex flex-col justify-between gap-2 transition-colors duration-200 hover:border-stone-300">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          Streak Mingguan
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-none">
            {streakWeeks}
          </span>
          <span className="text-sm font-bold text-primary">Minggu</span>
        </div>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{streakLabel}</p>
      </div>

      {/* Badge / Capaian — secondary supporting metric */}
      <div className="flex-1 bg-white rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 flex flex-col justify-between gap-2 transition-colors duration-200 hover:border-stone-300">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          Badge
        </span>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="font-display text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-none">
            {badgesCount}
          </span>
          <Link
            to="/profil/riwayat"
            className="text-xs font-medium text-stone-400 hover:text-primary transition-colors duration-200 focus:outline-hidden focus-visible:underline"
          >
            Lihat semua
          </Link>
        </div>
        {/* Featured badges as quiet dot-separated text */}
        <p className="text-xs text-stone-400 leading-relaxed truncate select-none mt-1">
          {featuredBadges.map((b) => b.name).join(' · ')}
        </p>
      </div>
    </section>
  )
}

export default ProfileSummaryCards
