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
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 flex flex-col gap-5 shadow-2xs"
    >
      {/* Top: status + balance */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-stone-600 select-none">
            Saldo Apresiasi Warga
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            {balance > 0 ? 'Siap Digunakan' : 'Saldo Habis'}
          </span>
        </div>

        {/* Balance — restrained focal number */}
        <h2
          id="saldo-balance-heading"
          className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight tabular-nums"
        >
          {formatRupiah(balance)}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-lg">
          Apresiasi nyata atas aksi pelaporan dan partisipasi lingkungan yang telah diverifikasi.
        </p>
      </div>

      {/* Supporting context — calm horizontal metadata row */}
      <div className="pt-4 border-t border-border-warm/70 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
        <div className="flex items-baseline justify-between sm:flex-col sm:items-start gap-0.5">
          <span className="text-stone-500 font-medium">Total Diperoleh</span>
          <span className="font-semibold text-stone-900 tabular-nums">{formattedTotalEarned}</span>
        </div>
        <div className="flex items-baseline justify-between sm:flex-col sm:items-start gap-0.5">
          <span className="text-stone-500 font-medium">Total Digunakan</span>
          <span className="font-semibold text-stone-700 tabular-nums">-{formatRupiah(totalRedeemed)}</span>
        </div>
        <div className="flex items-baseline justify-between sm:flex-col sm:items-start gap-0.5">
          <span className="text-stone-500 font-medium">Penambahan Terakhir</span>
          <span className="font-semibold text-primary tabular-nums">{recentAddition.formattedAmount}</span>
        </div>
      </div>
    </section>
  )
}

export default SaldoBalanceCard
