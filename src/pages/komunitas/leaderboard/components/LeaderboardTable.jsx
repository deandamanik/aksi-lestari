import { UserIcon, SparklesIcon } from '../../../../components/common/Icons'

export default function LeaderboardTable({ rankings = [] }) {
  if (!rankings || rankings.length === 0) {
    return (
      <div className="w-full py-12 px-4 bg-white rounded-2xl sm:rounded-3xl border border-border-warm text-center flex flex-col items-center justify-center">
        <SparklesIcon className="w-6 h-6 text-stone-400 mb-2" />
        <p className="text-sm font-semibold text-stone-600 font-body">
          Belum ada data peringkat untuk periode ini.
        </p>
      </div>
    )
  }

  return (
    <section aria-label="Daftar Peringkat Relawan" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-primary text-lg sm:text-xl font-bold tracking-tight">
            Daftar Relawan
          </h2>
          <p className="text-xs text-stone-500 font-body mt-0.5">
            Relawan aktif dengan akumulasi poin kontribusi terverifikasi
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm shadow-2xs overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-border-warm text-xs font-semibold text-stone-500 bg-stone-50/60 font-body">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span className="w-8 text-center shrink-0">No</span>
            <span>Relawan &amp; Kontribusi Nyata</span>
          </div>
          <div className="shrink-0 text-right">
            <span>Poin XP</span>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border-warm/60">
          {rankings.map((entry) => {
            const isSelf = entry.isCurrentUser

            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 sm:py-4 transition-colors duration-150 ${
                  isSelf
                    ? 'bg-primary/[0.04]'
                    : 'hover:bg-neutral/60'
                }`}
              >
                {/* Left: Rank + Avatar + Details */}
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <span
                    className={`w-8 text-center text-xs sm:text-sm font-bold shrink-0 ${
                      isSelf ? 'text-primary' : 'text-stone-400'
                    }`}
                  >
                    #{entry.rank}
                  </span>

                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 border ${
                      isSelf
                        ? 'bg-primary/10 text-primary border-primary/25'
                        : 'bg-neutral text-stone-700 border-border-warm'
                    }`}
                  >
                    {isSelf ? (
                      <UserIcon className="w-4 h-4 text-primary" />
                    ) : (
                      entry.initials
                    )}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs sm:text-sm font-bold truncate font-body ${isSelf ? 'text-primary' : 'text-stone-800'}`}>
                        {entry.name}
                      </span>
                      {isSelf && (
                        <span className="text-xs text-primary font-medium font-body">
                          (Anda)
                        </span>
                      )}
                      {entry.badge && (
                        <span className="text-xs text-stone-500 font-medium hidden sm:inline font-body">
                          · {entry.badge}
                        </span>
                      )}
                    </div>
                    {entry.stats && (
                      <span className="text-xs text-stone-400 font-body truncate mt-0.5">
                        {entry.stats}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: XP */}
                <div className="shrink-0 text-right">
                  <span
                    className={`font-display font-bold text-xs sm:text-sm ${
                      isSelf ? 'text-primary' : 'text-stone-800'
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

