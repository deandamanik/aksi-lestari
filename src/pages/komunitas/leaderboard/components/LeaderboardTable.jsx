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
        <div className="bg-[#F4F9F2] border border-[#DCFCE7] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#22603B] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              #{currentUser.rank}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-primary text-sm sm:text-base leading-tight">
                  {currentUser.name} (Akun Kamu)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]/60">
                  {currentUser.badge}
                </span>
              </div>
              <span className="text-xs text-stone-500 font-medium mt-0.5">
                {currentUser.stats} · {currentUser.contextMessage}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto shrink-0 pl-12 sm:pl-0">
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
                className={`grid grid-cols-12 gap-2 px-4 sm:px-6 py-3.5 sm:py-4 items-center transition-colors duration-150 ${
                  isSelf
                    ? 'bg-[#F4F9F2] hover:bg-[#EAF3EC] border-l-4 border-l-[#22603B]'
                    : 'hover:bg-[#FAF9F4]/80'
                }`}
              >
                {/* Rank Number */}
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelf
                        ? 'bg-[#22603B] text-white shadow-2xs'
                        : 'text-stone-500 font-semibold'
                    }`}
                  >
                    #{entry.rank}
                  </span>
                </div>

                {/* Contributor Profile & Details */}
                <div className="col-span-7 sm:col-span-8 flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelf
                        ? 'bg-[#22603B] text-white'
                        : 'bg-stone-100 text-stone-600 border border-border-warm'
                    }`}
                  >
                    {isSelf ? <UserIcon className="w-4 h-4 text-white" /> : entry.initials}
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
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#22603B] text-white leading-tight">
                          Kamu
                        </span>
                      )}
                      {entry.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 hidden sm:inline">
                          {entry.badge}
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
