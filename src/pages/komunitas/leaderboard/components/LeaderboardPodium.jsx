import { TrophyIcon, AwardIcon, CheckIcon } from '../../../../components/common/Icons'

export default function LeaderboardPodium({ top3 = [] }) {
  if (!top3 || top3.length < 3) return null

  // Reorder for podium display: Rank 2 (Left), Rank 1 (Center/Elevated), Rank 3 (Right)
  const rank1 = top3.find((t) => t.rank === 1) || top3[0]
  const rank2 = top3.find((t) => t.rank === 2) || top3[1]
  const rank3 = top3.find((t) => t.rank === 3) || top3[2]

  return (
    <section aria-label="Tiga Kontributor Teratas" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
        {/* RANK 2 - Left Podium */}
        <div className="order-2 md:order-1 bg-white rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-[#22603B]/30 transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-300" />

          {/* Rank Badge */}
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-2xs mb-3">
            2
          </div>

          {/* Avatar Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 text-slate-700 font-bold text-lg sm:text-xl flex items-center justify-center mb-3 border border-slate-200/80 shadow-2xs">
            {rank2.initials}
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-base sm:text-lg leading-tight mb-1 truncate max-w-full">
            {rank2.name}
          </h3>
          {rank2.badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] mb-2.5">
              <CheckIcon className="w-3 h-3 text-[#0369A1]" />
              {rank2.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs text-stone-500 font-medium mb-3">
            {rank2.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3 border-t border-border-warm/60">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-0.5">
              Total Kontribusi
            </span>
            <span className="font-display font-bold text-primary text-base sm:text-lg">
              {rank2.xp}
            </span>
          </div>
        </div>

        {/* RANK 1 - Center Elevated Podium */}
        <div className="order-1 md:order-2 bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden md:-translate-y-2">
          {/* Top highlight banner */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400" />

          {/* Rank Badge with Crown Icon */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-amber-300 font-bold text-xs shadow-2xs mb-3.5">
            <TrophyIcon className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Peringkat 1</span>
          </div>

          {/* Avatar Initials */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 text-[#B45309] font-bold text-2xl flex items-center justify-center mb-3.5 border-2 border-amber-200 shadow-xs relative">
            {rank1.initials}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22603B] text-white flex items-center justify-center shadow-xs">
              <AwardIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-lg sm:text-xl leading-tight mb-1 truncate max-w-full">
            {rank1.name}
          </h3>
          {rank1.badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] mb-3">
              <CheckIcon className="w-3 h-3 text-[#15803D]" />
              {rank1.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs sm:text-sm text-stone-600 font-medium mb-3.5">
            {rank1.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3.5 border-t border-border-warm/60 bg-[#FAF9F4]/60 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-3.5 rounded-b-3xl">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block mb-0.5">
              Total Kontribusi
            </span>
            <span className="font-display font-bold text-[#22603B] text-xl sm:text-2xl">
              {rank1.xp}
            </span>
          </div>
        </div>

        {/* RANK 3 - Right Podium */}
        <div className="order-3 bg-white rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:shadow-xs hover:border-[#22603B]/30 transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-orange-300" />

          {/* Rank Badge */}
          <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-sm flex items-center justify-center border border-orange-200 shadow-2xs mb-3">
            3
          </div>

          {/* Avatar Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 text-[#C2410C] font-bold text-lg sm:text-xl flex items-center justify-center mb-3 border border-orange-200/80 shadow-2xs">
            {rank3.initials}
          </div>

          {/* Name & Badge */}
          <h3 className="font-body text-primary font-bold text-base sm:text-lg leading-tight mb-1 truncate max-w-full">
            {rank3.name}
          </h3>
          {rank3.badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] mb-2.5">
              <CheckIcon className="w-3 h-3 text-[#B45309]" />
              {rank3.badge}
            </span>
          )}

          {/* Contribution Stats */}
          <p className="text-xs text-stone-500 font-medium mb-3">
            {rank3.stats}
          </p>

          {/* XP Total */}
          <div className="w-full pt-3 border-t border-border-warm/60">
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
