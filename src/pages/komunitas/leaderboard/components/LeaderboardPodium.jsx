export default function LeaderboardPodium({ top3 = [] }) {
  if (!top3 || top3.length < 3) return null

  return (
    <section aria-label="Apresiasi Penggerak Unggulan" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-primary text-lg sm:text-xl font-bold tracking-tight">
            Penggerak Teraktif
          </h2>
          <p className="text-xs text-stone-500 font-body mt-0.5">
            Relawan dengan kontribusi aksi dan verifikasi terlengkap minggu ini
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
        {top3.map((item) => (
          <div
            key={item.id || item.rank}
            className="bg-white rounded-2xl p-5 border border-border-warm shadow-2xs flex flex-col justify-between"
          >
            {/* Top Row: Rank */}
            <div className="flex items-center justify-between mb-3 text-xs font-body">
              <span className="font-bold text-primary">
                Peringkat #{item.rank}
              </span>
              <span className="text-stone-400">
                Relawan Aktif
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col items-center text-center my-1">
              <div className="w-12 h-12 rounded-full bg-neutral border border-border-warm flex items-center justify-center font-bold text-base text-primary mb-2.5">
                {item.initials}
              </div>

              <h3 className="font-body font-bold text-primary text-base truncate max-w-full">
                {item.name}
              </h3>

              <p className="text-xs text-stone-500 font-body mt-0.5 truncate max-w-full">
                {item.badge}
              </p>

              {item.stats && (
                <p className="text-xs text-stone-600 font-body mt-2">
                  {item.stats}
                </p>
              )}
            </div>

            {/* XP Footer */}
            <div className="w-full pt-3 mt-3 border-t border-border-warm flex items-center justify-between text-xs font-body">
              <span className="text-stone-500">
                Total Poin
              </span>
              <span className="font-display font-bold text-base text-primary">
                {item.xp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


