import { SALDO_APRESIASI } from '../../../data/profil/saldoRedeemData'

/**
 * SaldoBalanceCard — Primary Balance Focal Point
 *
 * Dominant balance number, status dot, description, 3 stat blocks.
 * Typography-driven — no gradient, no glow, no colored background.
 *
 * Props (reactive from ProfilSaldoPage):
 * - balance: current available balance (number)
 * - totalRedeemed: total amount redeemed so far (number)
 *
 * Static from data module:
 * - totalEarned, recentAddition (don't change during a redeem session)
 */

function formatRupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID')
}

function SaldoBalanceCard({ balance, totalRedeemed }) {
  const {
    formattedTotalEarned,
    recentAddition,
  } = SALDO_APRESIASI

  return (
    <section
      aria-labelledby="saldo-balance-heading"
      className="bg-white rounded-2xl border border-[#E8E5DC] overflow-hidden"
    >
      {/* Top: balance + status */}
      <div className="p-6 sm:p-8">
        {/* Eyebrow + status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Saldo Apresiasi Tersedia
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary select-none">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
            {balance > 0 ? 'Aktif & Siap Digunakan' : 'Saldo Habis'}
          </span>
        </div>

        {/* Balance — dominant number */}
        <h2
          id="saldo-balance-heading"
          className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-stone-900 tracking-tight leading-none"
        >
          {formatRupiah(balance)}
        </h2>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg mt-3">
          Saldo apresiasi hasil dari verifikasi aksi pelaporan dan partisipasi lingkungan.
        </p>
      </div>

      {/* Bottom: 3 stat blocks */}
      <div className="px-6 sm:px-8 py-5 sm:py-6 bg-[#FAF9F4]/50 border-t border-[#E8E5DC]/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Diperoleh */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
              Total Diperoleh
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight tabular-nums">
              {formattedTotalEarned}
            </span>
          </div>

          {/* Total Digunakan */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
              Total Digunakan
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-stone-700 tracking-tight tabular-nums">
              -{formatRupiah(totalRedeemed)}
            </span>
          </div>

          {/* Penambahan Terakhir */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
              Penambahan Terakhir
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight tabular-nums">
              {recentAddition.formattedAmount}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaldoBalanceCard
