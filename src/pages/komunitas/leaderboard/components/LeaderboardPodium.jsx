import { TrophyIcon, AwardIcon } from '../../../../components/common/Icons'

function LaurelBranchLeft({ className = 'w-3 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 14 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 18c-3.5-1.5-6.5-5-7-10 0-3 1-5.5 3-7" />
      <path d="M4.5 5.5C3.2 4.5 2.5 3 3 2c.8.2 1.8 1.2 2 3" fill="currentColor" stroke="none" />
      <path d="M3.5 10C2.2 9.2 1.8 7.8 2.2 7c.8.2 1.8 1 2 2.5" fill="currentColor" stroke="none" />
      <path d="M4 14.5c-1.2-.5-1.5-1.8-1-2.5.7.2 1.6 1 1.8 2.2" fill="currentColor" stroke="none" />
      <path d="M6 18c-1-.5-1.2-1.5-.8-2.2.6.2 1.4.8 1.6 1.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LaurelBranchRight({ className = 'w-3 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 14 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 18c3.5-1.5 6.5-5 7-10 0-3-1-5.5-3-7" />
      <path d="M9.5 5.5C10.8 4.5 11.5 3 11 2c-.8.2-1.8 1.2-2 3" fill="currentColor" stroke="none" />
      <path d="M10.5 10c1.3-.8 1.7-2.2 1.3-3-.8.2-1.8 1-2 2.5" fill="currentColor" stroke="none" />
      <path d="M10 14.5c1.2-.5 1.5-1.8 1-2.5-.7.2-1.6 1-1.8 2.2" fill="currentColor" stroke="none" />
      <path d="M8 18c1-.5 1.2-1.5.8-2.2-.6.2-1.4.8-1.6 1.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function LeaderboardPodium({ top3 = [] }) {
  if (!top3 || top3.length < 3) return null

  // Reorder for podium display: Rank 2 (Left), Rank 1 (Center/Elevated), Rank 3 (Right)
  const rank1 = top3.find((t) => t.rank === 1) || top3[0]
  const rank2 = top3.find((t) => t.rank === 2) || top3[1]
  const rank3 = top3.find((t) => t.rank === 3) || top3[2]

  return (
    <section aria-label="Tiga Kontributor Teratas" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
        {/* RANK 2 - Left Podium (Soft Silver / Cool Slate-Gray) */}
        <div className="order-2 md:order-1 bg-gradient-to-b from-[#F7F9F8] via-[#FBFCFB] to-white rounded-3xl border border-[#D8DFDC] p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-[#B5C2BD] transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none flex flex-col items-center text-center relative overflow-hidden">
          {/* Rank Badge */}
          <div className="w-7 h-7 rounded-full bg-[#EEF3F0] text-[#3D5246] font-bold text-xs flex items-center justify-center border border-[#D8DFDC] shadow-2xs mb-3">
            2
          </div>

          {/* Avatar Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EEF3F0] text-[#3D5246] font-bold text-lg sm:text-xl flex items-center justify-center mb-3 border border-[#D8DFDC] shadow-2xs">
            {rank2.initials}
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-base sm:text-lg leading-tight mb-1 truncate max-w-full">
            {rank2.name}
          </h3>
          {rank2.badge && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F0F4F2] text-[#3D5246] border border-[#D8DFDC]/70 mb-2.5">
              {rank2.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs text-stone-500 font-medium mb-3">
            {rank2.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3.5 border-t border-[#DCE4E0]/80 bg-[#F5F8F6]/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-3 rounded-b-3xl">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-0.5">
              Total Kontribusi
            </span>
            <span className="font-display font-bold text-primary text-base sm:text-lg">
              {rank2.xp}
            </span>
          </div>
        </div>

        {/* RANK 1 - Center Elevated Podium (Champagne / Muted Warm Gold) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-[#FBF8F1] via-[#FDFCF9] to-white rounded-3xl border border-[#E4D9C0] p-6 sm:p-7 shadow-2xs hover:shadow-xs hover:border-[#C5B38C] transition-all duration-200 hover:-translate-y-0.5 md:hover:-translate-y-2.5 motion-reduce:transform-none flex flex-col items-center text-center relative overflow-hidden md:-translate-y-2">
          {/* Rank Indicator with subtle laurel and trophy */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF6EA] border border-[#E4D9C0] text-[#7D5E1A] text-xs font-semibold shadow-2xs mb-3.5">
            <LaurelBranchLeft className="w-2.5 h-3.5 text-[#9E7A26]/60 shrink-0" />
            <TrophyIcon className="w-3.5 h-3.5 text-[#9E7A26] shrink-0" />
            <span>Peringkat 1</span>
            <LaurelBranchRight className="w-2.5 h-3.5 text-[#9E7A26]/60 shrink-0" />
          </div>

          {/* Avatar Initials with Champion Mark */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#F8F2E2] text-[#7D5E1A] font-bold text-xl sm:text-2xl flex items-center justify-center mb-3.5 border border-[#E4D9C0] shadow-2xs relative">
            {rank1.initials}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#9E7A26] text-white flex items-center justify-center shadow-2xs"
              aria-hidden="true"
            >
              <AwardIcon className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-lg sm:text-xl leading-tight mb-1 truncate max-w-full">
            {rank1.name}
          </h3>
          {rank1.badge && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#FBF6EA] text-[#7D5E1A] border border-[#E4D9C0]/70 mb-3">
              {rank1.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs sm:text-sm text-stone-600 font-medium mb-3.5">
            {rank1.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3.5 border-t border-[#E8DEC7]/80 bg-[#FAF6EC]/80 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-3.5 rounded-b-3xl">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block mb-0.5">
              Total Kontribusi
            </span>
            <span className="font-display font-bold text-[#22603B] text-xl sm:text-2xl">
              {rank1.xp}
            </span>
          </div>
        </div>

        {/* RANK 3 - Right Podium (Soft Bronze / Warm Beige) */}
        <div className="order-3 bg-gradient-to-b from-[#FBF8F5] via-[#FCFAF8] to-white rounded-3xl border border-[#E5DDD4] p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-[#CFC1B3] transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none flex flex-col items-center text-center relative overflow-hidden">
          {/* Rank Badge */}
          <div className="w-7 h-7 rounded-full bg-[#F5EFE9] text-[#785842] font-bold text-xs flex items-center justify-center border border-[#E5DDD4] shadow-2xs mb-3">
            3
          </div>

          {/* Avatar Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F5EFE9] text-[#785842] font-bold text-lg sm:text-xl flex items-center justify-center mb-3 border border-[#E5DDD4] shadow-2xs">
            {rank3.initials}
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-base sm:text-lg leading-tight mb-1 truncate max-w-full">
            {rank3.name}
          </h3>
          {rank3.badge && (
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F5EFE9] text-[#785842] border border-[#E5DDD4]/70 mb-2.5">
              {rank3.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs text-stone-500 font-medium mb-3">
            {rank3.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3.5 border-t border-[#EAE2D9]/80 bg-[#F9F5F1]/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-3 rounded-b-3xl">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-0.5">
              Total Kontribusi
            </span>
            <span className="font-display font-bold text-primary text-base sm:text-lg">
              {rank3.xp}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
