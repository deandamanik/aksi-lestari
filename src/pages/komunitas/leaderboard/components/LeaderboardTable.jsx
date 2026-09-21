import { UserIcon, SparklesIcon } from '../../../../components/common/Icons'

export default function LeaderboardTable({ rankings = [], currentUser = null }) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="w-full py-12 px-4 bg-white rounded-2xl sm:rounded-3xl border border-border-warm text-center flex flex-col items-center justify-center">
        <SparklesIcon className="w-6 h-6 text-stone-400 mb-2" />
        <p className="text-sm font-semibold text-stone-600">
          Belum ada data peringkat untuk periode ini.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      {/* 1. Posisi Kamu */}
      {currentUser && (
        <section aria-label="Posisi Kamu" className="w-full">
          <h2 className="font-display text-primary text-lg sm:text-xl font-bold tracking-tight mb-3">
            Posisi Kamu
          </h2>
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FAF9F4] border-l-3 border-l-[#22603B]">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-bold text-[#22603B] shrink-0">
                  #{currentUser.rank}
                </span>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#EAF3EC] text-[#22603B] border border-[#D5E8D8]">
                  <UserIcon className="w-4 h-4 text-[#22603B]" />
                </div>

                <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-primary truncate">
                    {currentUser.name} (Akun Kamu)
                  </span>
                  {currentUser.badge && (
                    <span className="text-xs text-stone-500 font-medium">
                      · {currentUser.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="font-display font-bold text-xs sm:text-sm text-[#22603B]">
                  {currentUser.xp}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Papan Peringkat */}
      <section aria-label="Papan Peringkat Relawan" className="w-full">
        <h2 className="font-display text-primary text-lg sm:text-xl font-bold tracking-tight mb-3">
          Papan Peringkat
        </h2>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm shadow-2xs overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border-warm/80 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-[#FAF9F4]/70">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <span className="w-7 sm:w-8 text-center shrink-0">Rank</span>
              <span>Relawan & Kontribusi</span>
            </div>
            <div className="shrink-0 text-right">
              <span>Poin XP</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-warm/50">
            {rankings.map((entry) => {
              const isSelf = entry.isCurrentUser

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 transition-colors duration-180 ${
                    isSelf
                      ? 'bg-[#FAF9F4] hover:bg-[#F2F0E8] border-l-3 border-l-[#22603B]'
                      : 'hover:bg-[#FAF9F4]/80'
                  }`}
                >
                  {/* Rank + Avatar + Details */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span
                      className={`w-7 sm:w-8 text-center text-xs sm:text-sm font-bold shrink-0 ${
                        isSelf ? 'text-[#22603B]' : 'text-stone-500 font-semibold'
                      }`}
                    >
                      #{entry.rank}
                    </span>

                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                        isSelf
                          ? 'bg-[#EAF3EC] text-[#22603B] border-[#D5E8D8]'
                          : 'bg-stone-100 text-stone-600 border-border-warm'
                      }`}
                    >
                      {isSelf ? (
                        <UserIcon className="w-4 h-4 text-[#22603B]" />
                      ) : (
                        entry.initials
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <span
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isSelf ? 'text-[#22603B]' : 'text-primary'
                        }`}
                      >
                        {entry.name}
                      </span>
                      {isSelf && (
                        <span className="text-[11px] font-medium text-[#22603B] px-1.5 py-0.2 rounded bg-[#22603B]/10 leading-tight">
                          Kamu
                        </span>
                      )}
                      {entry.badge && (
                        <span className="text-xs text-stone-500 font-medium">
                          · {entry.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* XP */}
                  <div className="shrink-0 text-right">
                    <span
                      className={`font-display font-bold text-xs sm:text-sm ${
                        isSelf ? 'text-[#22603B]' : 'text-stone-800'
                      }`}
                    >
                      {entry.xp}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
