export default function LeaderboardPodium({ top3 = [] }) {
  if (!top3 || top3.length < 3) return null

  const rank1 = top3.find((t) => t.rank === 1) || top3[0]
  const rank2 = top3.find((t) => t.rank === 2) || top3[1]
  const rank3 = top3.find((t) => t.rank === 3) || top3[2]

  const items = [
    { item: rank2, isFirst: false, orderClass: 'order-2 md:order-1' },
    { item: rank1, isFirst: true, orderClass: 'order-1 md:order-2' },
    { item: rank3, isFirst: false, orderClass: 'order-3 md:order-3' },
  ]

  return (
    <section aria-label="Peringkat Teratas" className="w-full">
      <h2 className="font-display text-primary text-lg sm:text-xl font-bold tracking-tight mb-3 sm:mb-4">
        Peringkat Teratas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
        {items.map(({ item, isFirst, orderClass }) => (
          <div
            key={item.id || item.rank}
            className={`${orderClass} rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col items-center text-center justify-between transition-all duration-180 ${
              isFirst
                ? 'bg-[#FAF9F4]/70 border border-[#22603B]/35 hover:border-[#22603B]/50'
                : 'bg-white border border-border-warm hover:border-[#22603B]/25'
            }`}
          >
            {/* Top Section: Rank -> Avatar -> Name -> Role */}
            <div className="flex flex-col items-center text-center w-full min-w-0">
              {/* 1. Rank */}
              <span
                className={`text-xs sm:text-sm font-bold tracking-tight ${
                  isFirst ? 'text-[#22603B]' : 'text-stone-500'
                }`}
              >
                #{item.rank}
              </span>

              {/* 2. Avatar / Initials */}
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 border mt-3 mb-3.5 shadow-2xs ${
                  isFirst
                    ? 'bg-[#EAF3EC] text-[#22603B] border-[#D5E8D8]'
                    : 'bg-stone-100 text-stone-700 border-border-warm'
                }`}
              >
                {item.initials}
              </div>

              {/* 3. Name */}
              <h3
                className={`font-body font-bold text-primary truncate max-w-full leading-snug ${
                  isFirst ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}
              >
                {item.name}
              </h3>

              {/* 4. Role */}
              {item.badge && (
                <p className="text-xs text-stone-500 font-medium truncate max-w-full mt-1">
                  {item.badge}
                </p>
              )}
            </div>

            {/* Bottom Section: Subtle Divider -> XP */}
            <div className="flex flex-col items-center text-center w-full mt-4">
              {/* 5. Subtle Divider */}
              <div
                className={`w-14 h-px mb-3.5 ${
                  isFirst ? 'bg-[#22603B]/20' : 'bg-border-warm/80'
                }`}
                aria-hidden="true"
              />

              {/* 6. Total XP */}
              <span
                className={`font-display font-bold leading-tight ${
                  isFirst
                    ? 'text-base sm:text-lg text-[#22603B]'
                    : 'text-sm sm:text-base text-stone-800'
                }`}
              >
                {item.xp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
