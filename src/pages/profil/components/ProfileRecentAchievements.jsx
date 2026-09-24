import { AwardIcon } from '../../../components/common/Icons'
import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * ProfileRecentAchievements — Editorial Civic Achievement Strip
 *
 * Displays the volunteer's most recent verified civic badges as a calm,
 * quiet editorial record rather than a trophy wall or dashboard card grid.
 */
function ProfileRecentAchievements() {
  const badges = USER_PROFILE.featuredBadges || []

  return (
    <section
      aria-labelledby="recent-achievements-heading"
      className="flex flex-col gap-3"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <h2
          id="recent-achievements-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Pencapaian Terbaru
        </h2>
        <p className="text-sm text-stone-500">
          Lencana partisipasi sipil yang telah kamu peroleh.
        </p>
      </div>

      {/* Compact Horizontal Achievement Group */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-warm/70 border-y border-border-warm/70 py-1 sm:py-2 max-w-lg">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2.5 py-2 sm:py-0.5 sm:px-3.5 first:sm:pl-0 last:sm:pr-0"
          >
            <AwardIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                {badge.name}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                Tervalidasi
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProfileRecentAchievements
