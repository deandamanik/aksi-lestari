import { Link } from 'react-router-dom'
import { AwardIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { LEADERBOARD_PREVIEW } from '../../../data/komunitas/communityActionsData'

export default function CommunityLeaderboardPreview() {
  const { title, eyebrow, description, allLink, allLinkLabel, leaders, currentUser } =
    LEADERBOARD_PREVIEW

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-[#22603B]/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transform-none">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#22603B]/80 font-body">
          {eyebrow}
        </span>
        <AwardIcon className="w-4 h-4 text-stone-400" />
      </div>

      {/* Title */}
      <h3 className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-1">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="font-body text-stone-500 text-xs leading-relaxed mb-4">
        {description}
      </p>

      {/* Contributors List */}
      <div className="space-y-3.5">
        {leaders.map((leader) => (
          <div key={leader.id} className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Rank Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  leader.rank === 1
                    ? 'bg-stone-100 text-[#22603B] border border-border-warm'
                    : 'bg-stone-50 text-stone-500 border border-border-warm/60'
                }`}
              >
                {leader.rank}
              </div>

              {/* Contributor Details */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-primary text-xs sm:text-sm leading-tight truncate">
                    {leader.name}
                  </span>
                  {leader.badge && (
                    <span className="text-[11px] text-stone-400 font-normal leading-tight">
                      · {leader.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400 font-medium leading-tight mt-0.5">
                  {leader.stats}
                </span>
              </div>
            </div>

            {/* XP Value */}
            <span className="text-xs sm:text-sm font-semibold text-stone-600 shrink-0">
              {leader.xp}
            </span>
          </div>
        ))}

        {/* Current User Standing Row */}
        {currentUser && (
          <div className="bg-[#FAF9F4] border border-border-warm rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 mt-3.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-[#22603B] shrink-0">
                {currentUser.badgeText}
              </span>
              <span className="text-xs text-stone-600 font-medium truncate">
                {currentUser.label}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#22603B] shrink-0">
              {currentUser.xp}
            </span>
          </div>
        )}
      </div>

      {/* Link to Full Leaderboard */}
      <div className="pt-3.5 mt-3 border-t border-border-warm/60">
        <Link
          to={allLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22603B] hover:text-[#17462A] transition-colors duration-180 group focus:outline-hidden focus-visible:underline"
        >
          <span>{allLinkLabel}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </Link>
      </div>
    </article>
  )
}
