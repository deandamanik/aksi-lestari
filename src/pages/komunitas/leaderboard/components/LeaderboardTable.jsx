import { UserIcon, SparklesIcon } from '../../../../components/common/Icons'

export default function LeaderboardTable({ rankings = [], currentUser = null }) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="w-full py-12 px-4 bg-white rounded-3xl border border-border-warm text-center flex flex-col items-center justify-center">
        <SparklesIcon className="w-6 h-6 text-stone-400 mb-2" />
        <p className="text-sm font-semibold text-stone-600">Belum ada data peringkat untuk periode ini.</p>
      </div>
    )
  }

  return (
    <section aria-label="Daftar Peringkat Lengkap Relawan" className="w-full space-y-4">
      {/* Current User Quick Standing Banner (Informative & Accessible) */}
      {currentUser && (
        <div className="bg-white border border-border-warm rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F4] border border-border-warm text-[#22603B] flex items-center justify-center font-bold text-xs shrink-0">
              #{currentUser.rank}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-primary text-sm sm:text-base leading-tight">
                  {currentUser.name} (Akun Kamu)
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  · {currentUser.badge}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-medium mt-0.5">
                {currentUser.stats} · {currentUser.contextMessage}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto shrink-0 pl-11 sm:pl-0">
            <span className="text-xs text-stone-500 sm:hidden">Total Poin:</span>
            <span className="font-display font-bold text-base sm:text-lg text-[#22603B]">
              {currentUser.xp}
            </span>
          </div>
        </div>
      )}

      {/* Main Ranking Table Card */}
      <div className="bg-white rounded-3xl border border-border-warm shadow-2xs overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-3.5 border-b border-border-warm/80 text-[11px] font-bold uppercase tracking-wider text-stone-400 bg-[#FAF9F4]/70">
          <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
          <div className="col-span-7 sm:col-span-8">Relawan & Kontribusi</div>
          <div className="col-span-3 sm:col-span-3 text-right">Poin XP</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border-warm/50">
          {rankings.map((entry) => {
            const isSelf = entry.isCurrentUser

            return (
              <div
                key={entry.id}
                className={`grid grid-cols-12 gap-2 px-4 sm:px-6 py-3.5 sm:py-4 items-center transition-colors duration-180 ${
                  isSelf
                    ? 'bg-[#FAF9F4] hover:bg-[#F2F0E8] border-l-2 border-l-[#22603B]'
                    : 'hover:bg-[#FAF9F4]/80'
                }`}
              >
                {/* Rank Number */}
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelf
                        ? 'bg-stone-100 text-[#22603B]'
                        : 'text-stone-500 font-semibold'
                    }`}
                  >
                    #{entry.rank}
                  </span>
                </div>

                {/* Contributor Profile & Details */}
                <div className="col-span-7 sm:col-span-8 flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 bg-stone-100 text-stone-600 border border-border-warm"
                  >
                    {isSelf ? <UserIcon className="w-4 h-4 text-[#22603B]" /> : entry.initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isSelf ? 'text-[#22603B]' : 'text-primary'
                        }`}
                      >
                        {entry.name}
                      </span>
                      {isSelf && (
                        <span className="text-[11px] font-medium text-[#22603B] px-1.5 py-0.5 rounded bg-[#22603B]/10 leading-tight">
                          Kamu
                        </span>
                      )}
                      {entry.badge && (
                        <span className="text-xs text-stone-400 font-normal hidden sm:inline">
                          · {entry.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                      {entry.stats}
                    </span>
                  </div>
                </div>

                {/* XP Total */}
                <div className="col-span-3 sm:col-span-3 text-right">
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
  )
}
