import { Link } from 'react-router-dom'
import { AwardIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { LEADERBOARD_PREVIEW } from '../../../data/komunitas/communityActionsData'

export default function CommunityLeaderboardPreview() {
  const { title, eyebrow, description, allLink, allLinkLabel, leaders, currentUser } =
    LEADERBOARD_PREVIEW

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E]">
          {eyebrow}
        </span>
        <AwardIcon className="w-4 h-4 text-accent" />
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
                    ? 'bg-[#FEF3C7] text-[#B45309]'
                    : leader.rank === 2
                    ? 'bg-stone-100 text-stone-600'
                    : 'bg-[#FFEDD5] text-[#C2410C]'
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
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded leading-none ${
                        leader.rank === 1
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : leader.rank === 2
                          ? 'bg-[#E0F2FE] text-[#0369A1]'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {leader.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400 font-medium leading-tight mt-0.5">
                  {leader.stats}
                </span>
              </div>
            </div>

            {/* XP Value */}
            <span className="font-bold text-xs sm:text-sm text-stone-800 shrink-0">
              {leader.xp}
            </span>
          </div>
        ))}

        {/* Current User Standing Row */}
        {currentUser && (
          <div className="bg-[#F4F9F2] border border-[#DCFCE7] rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 mt-3.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="bg-[#22603B] text-white font-bold text-[11px] px-2 py-0.5 rounded-md shrink-0">
                {currentUser.badgeText}
              </span>
              <span className="text-xs font-semibold text-stone-800 truncate">
                {currentUser.label}
              </span>
            </div>
            <span className="font-bold text-xs text-[#22603B] shrink-0">
              {currentUser.xp}
            </span>
          </div>
        )}
      </div>

      {/* Link to Full Leaderboard */}
      <div className="pt-3.5 mt-3 border-t border-border-warm/60">
        <Link
          to={allLink}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22603B] hover:text-[#17462A] transition-colors duration-200 group focus:outline-hidden focus-visible:underline"
        >
          <span>{allLinkLabel}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
