import { Link } from 'react-router-dom'
import { ArrowRightIcon, AwardIcon } from '../../../components/common/Icons'
import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * ProfileSummaryCards — Streak + Badge Composition
 *
 * Two cards with shared design system (border, radius, padding, surface)
 * but distinct character:
 * - Streak: PROGRESSION (weekly consistency, subtle visual chain)
 * - Badge: COLLECTION (achievement preview, featured list)
 *
 * Hover: subtle lift + border shift. No bounce/glow/sparkle.
 */
function ProfileSummaryCards() {
  const { streakWeeks, streakLabel, badgesCount, featuredBadges } = USER_PROFILE

  // Generate streak dots visualization
  const streakDots = Array.from({ length: streakWeeks }, (_, i) => i)

  return (
    <section
      aria-label="Ringkasan Aktivitas dan Capaian"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Streak Mingguan — progression character */}
      <div className="group bg-white rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 flex flex-col gap-3 transition-all duration-200 hover:border-stone-300 hover:-translate-y-[1px] cursor-default">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          Streak Mingguan
        </span>

        {/* Number + unit */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[2.5rem] sm:text-5xl font-bold text-stone-900 tracking-tight leading-none tabular-nums">
            {streakWeeks}
          </span>
          <span className="text-sm font-bold text-primary">Minggu</span>
        </div>

        {/* Streak progression dots — subtle visual chain */}
        <div className="flex items-center gap-1.5 py-1" aria-label={`${streakWeeks} minggu berturut-turut`}>
          {streakDots.map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <div className="w-3.5 h-[1.5px] bg-primary/25 rounded-full" aria-hidden="true" />
              )}
              <div
                className="w-2.5 h-2.5 rounded-full bg-primary/70 transition-transform duration-200"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">{streakLabel}</p>
      </div>

      {/* Badge — collection character */}
      <div className="group bg-white rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 flex flex-col gap-3 transition-all duration-200 hover:border-stone-300 hover:-translate-y-[1px] cursor-default">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          Badge
        </span>

        {/* Count + label */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[2.5rem] sm:text-5xl font-bold text-stone-900 tracking-tight leading-none tabular-nums">
            {badgesCount}
          </span>
          <span className="text-sm font-medium text-stone-400">badge</span>
        </div>

        {/* Featured badges — quiet collection preview */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-0.5">
          {featuredBadges.map((badge, i) => (
            <span key={badge.id} className="flex items-center gap-1.5 text-xs text-stone-500">
              <AwardIcon className="w-3 h-3 text-primary/50 shrink-0" strokeWidth={1.8} />
              <span className="font-medium">{badge.name}</span>
              {i < featuredBadges.length - 1 && (
                <span className="text-stone-300 ml-0.5" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/profil/riwayat"
          className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-primary transition-colors duration-200 mt-auto focus:outline-hidden focus-visible:underline w-fit"
        >
          <span>Lihat rekam jejak</span>
          <ArrowRightIcon
            className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5"
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </section>
  )
}

export default ProfileSummaryCards
