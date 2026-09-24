import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { CONTRIBUTION_HISTORY } from '../../../data/profil/contributionHistoryData'

/**
 * ProfileRecentActivity — Editorial Activity Stream
 *
 * Lightweight open timeline directly on page canvas (no floating cards).
 * Primary: activity title
 * Secondary: status, location/context, date
 * Supporting: XP earned
 * Followed by lightweight secondary link to full history.
 */
function ProfileRecentActivity() {
  const recentItems = CONTRIBUTION_HISTORY.slice(0, 3)

  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="flex flex-col gap-5"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <h2
          id="recent-activity-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Aktivitas Terbaru
        </h2>
        <p className="text-sm text-stone-500">
          Jejak kontribusi terbaru yang tercatat.
        </p>
      </div>

      {/* Editorial Chronological Record */}
      <div className="flex flex-col divide-y divide-border-warm/70 border-y border-border-warm/70">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 py-3.5 sm:py-4 px-1"
          >
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm sm:text-base text-stone-900 leading-snug">
                {item.title}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1 flex-wrap">
                <span className="text-primary font-medium">{item.statusLabel}</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-600">{item.location || item.type}</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-500">{item.timeAgo}</span>
              </div>
            </div>

            {/* Supporting XP */}
            <span className="text-xs sm:text-sm font-semibold text-stone-600 tabular-nums shrink-0 self-start sm:self-auto">
              +{item.xp} XP
            </span>
          </div>
        ))}
      </div>

      {/* Secondary Action: Link to Full History */}
      <div>
        <Link
          to="/profil/riwayat"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          <span>Lihat Riwayat Lengkap</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}

export default ProfileRecentActivity
