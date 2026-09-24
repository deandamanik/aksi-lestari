import { Link } from 'react-router-dom'
import { CheckIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { CONTRIBUTION_HISTORY } from '../../../data/profil/contributionHistoryData'

/**
 * ProfileRecentActivity — Timeline Feel
 *
 * Vertical timeline with subtle line + dots.
 * Each entry: title (strongest), status (green text), metadata (muted), XP (amber).
 * No colored status pills, no table rows.
 */
function ProfileRecentActivity() {
  const recentItems = CONTRIBUTION_HISTORY.slice(0, 2)

  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="flex flex-col gap-5"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h2
            id="recent-activity-heading"
            className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Aktivitas Terakhir
          </h2>
          <p className="text-sm text-stone-500">
            Jejak kontribusi teranyar yang telah diproses.
          </p>
        </div>

        <Link
          to="/profil/riwayat"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline self-start sm:self-auto select-none"
        >
          <span>Lihat Riwayat Lengkap</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.2} />
        </Link>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8" aria-label="Timeline aktivitas terbaru">
        {/* Vertical timeline line */}
        <div
          className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-px bg-[#E8E5DC]"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-0">
          {recentItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-6 py-5 ${
                index < recentItems.length - 1 ? 'border-b border-stone-100' : ''
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-6 sm:-left-8 top-6 w-[7px] h-[7px] rounded-full bg-primary ring-2 ring-white"
                aria-hidden="true"
              />

              {/* Left: Activity content */}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                  {item.title}
                </span>

                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {/* Status — green text + micro checkmark, NO pill */}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary select-none">
                    <CheckIcon className="w-3 h-3 shrink-0" strokeWidth={2.5} />
                    <span>{item.statusLabel}</span>
                  </span>
                  <span className="text-stone-300 text-xs" aria-hidden="true">·</span>
                  <span className="text-xs text-stone-400">
                    {item.location}
                  </span>
                  <span className="text-stone-300 text-xs" aria-hidden="true">·</span>
                  <span className="text-xs text-stone-400">
                    {item.timeAgo}
                  </span>
                </div>
              </div>

              {/* Right: XP + secondary note */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 sm:pt-0.5">
                <span className="font-bold text-sm text-amber-700 tabular-nums tracking-tight">
                  +{item.xp} XP
                </span>
                {(item.badgeEarned || item.organizer) && (
                  <span className="text-[11px] text-stone-400 font-medium text-right">
                    {item.badgeEarned || item.organizer}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfileRecentActivity
