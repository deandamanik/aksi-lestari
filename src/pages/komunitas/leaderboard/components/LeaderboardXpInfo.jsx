import { XP_RULES_INFO } from '../../../../data/komunitas/leaderboardData'

export default function LeaderboardXpInfo() {
  return (
    <section
      aria-label="Informasi Perhitungan XP"
      className="bg-white rounded-2xl border border-border-warm p-5 shadow-2xs"
    >
      <div className="mb-3.5">
        <h3 className="font-display font-bold text-primary text-base">
          Perolehan Poin XP
        </h3>
        <p className="font-body text-stone-500 text-xs mt-0.5">
          Acuan perolehan poin dari setiap kontribusi lingkungan:
        </p>
      </div>

      <div className="divide-y divide-border-warm/60">
        {XP_RULES_INFO.map((rule, idx) => (
          <div key={idx} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-body font-bold text-primary text-xs sm:text-sm">
                {rule.title}
              </h4>
              <span className="font-display font-bold text-xs sm:text-sm text-primary shrink-0 tabular-nums">
                {rule.reward}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-body leading-relaxed mt-1">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-3.5 mt-3.5 border-t border-border-warm text-xs text-stone-500 font-body leading-relaxed">
        <strong>Catatan:</strong> XP adalah poin reputasi keaktifan gotong royong warga, bukan saldo tunai.
      </div>
    </section>
  )
}


