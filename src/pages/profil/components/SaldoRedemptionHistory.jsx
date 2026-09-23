import { WalletIcon, AwardIcon } from '../../../components/common/Icons'

/**
 * SaldoRedemptionHistory — Past Transactions List
 *
 * Single container with dividers between transactions.
 * WalletIcon for wallet, AwardIcon for voucher.
 * Status shown as dot + text. No separate cards per transaction.
 *
 * Props (reactive from ProfilSaldoPage):
 * - history: array of transaction objects (newest first)
 */
function SaldoRedemptionHistory({ history }) {
  if (!history || history.length === 0) return null

  return (
    <section
      aria-labelledby="saldo-history-heading"
      className="flex flex-col gap-4"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1.5">
        <h2
          id="saldo-history-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Riwayat Penukaran Apresiasi
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
          Daftar pemanfaatan saldo apresiasi yang telah berhasil kamu tukarkan.
        </p>
      </div>

      {/* Transactions list */}
      <div className="bg-white rounded-2xl border border-[#E8E5DC] divide-y divide-[#E8E5DC]/60 overflow-hidden">
        {history.map((tx) => {
          const isWallet = tx.type === 'wallet'
          const IconComponent = isWallet ? WalletIcon : AwardIcon

          return (
            <div
              key={tx.id}
              className="flex items-start gap-4 p-5 sm:p-6 transition-colors duration-200 hover:bg-[#FDFCF9]"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5 text-stone-400" aria-hidden="true">
                <IconComponent className="w-5 h-5" strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-stone-800 leading-snug">
                      {tx.methodTitle}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {tx.date}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5 font-medium">
                      {tx.target}
                    </p>
                  </div>

                  {/* Amount + status */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-bold text-stone-700 tabular-nums">
                      {tx.formattedAmount}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {tx.statusLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SaldoRedemptionHistory
