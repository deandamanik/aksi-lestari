import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { LEADERBOARD_PREVIEW } from '../../../data/komunitas/communityActionsData'

export default function CommunityLeaderboardPreview() {
  const { title, eyebrow, description, allLink, allLinkLabel, leaders, currentUser } =
    LEADERBOARD_PREVIEW

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-xs hover:border-primary/30 transition-all duration-200">
      {/* Top Header */}
      <div className="mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary font-body">
          {eyebrow}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-primary text-lg sm:text-xl font-bold leading-snug tracking-tight mb-1.5">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="font-body text-primary/70 text-xs sm:text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Minimalist List with Hairline Dividers */}
      <div className="divide-y divide-border-warm/60">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="flex items-center justify-between gap-3 py-2.5 first:pt-1"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Typographic Rank Numeral */}
              <span
                className={`font-display font-bold text-base sm:text-lg w-5 text-center shrink-0 ${
                  leader.rank === 1 ? 'text-primary' : 'text-stone-400'
                }`}
              >
                {leader.rank}
              </span>

              {/* Contributor Name */}
              <span className="font-bold text-primary text-xs sm:text-sm leading-tight truncate">
                {leader.name}
              </span>
            </div>

            {/* XP Value */}
            <span className="font-semibold text-xs text-stone-600 shrink-0">
              {leader.xp}
            </span>
          </div>
        ))}

        {/* Current User Standing Row — Simple row without box/badge */}
        {currentUser && (
          <div className="flex items-center justify-between gap-3 py-2.5 border-t border-dashed border-border-warm">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-display font-semibold text-xs sm:text-sm w-5 text-center shrink-0 text-stone-400">
                12
              </span>
              <span className="font-medium text-xs sm:text-sm text-stone-700 truncate">
                Kamu
              </span>
            </div>
            <span className="font-medium text-xs text-stone-500 shrink-0">
              {currentUser.xp}
            </span>
          </div>
        )}
      </div>


      {/* Link to Full Leaderboard */}
      <div className="pt-3.5 mt-3.5 border-t border-border-warm/60">
        <Link
          to={allLink}
          className="font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 text-xs sm:text-sm group focus:outline-hidden focus-visible:underline"
        >
          <span>{allLinkLabel}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </Link>
      </div>
    </article>
  )
}


