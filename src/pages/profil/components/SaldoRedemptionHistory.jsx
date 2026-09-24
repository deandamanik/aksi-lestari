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
      <div className="bg-white rounded-xl border border-border-warm divide-y divide-border-warm/70 overflow-hidden shadow-2xs">
        {history.map((tx) => {
          const isWallet = tx.type === 'wallet'
          const IconComponent = isWallet ? WalletIcon : AwardIcon

          return (
            <div
              key={tx.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-colors duration-150 hover:bg-neutral/40"
            >
              {/* Left: Icon + Method & Metadata */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <IconComponent
                  className="w-5 h-5 text-stone-500 shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-stone-900 truncate">
                    {tx.methodTitle}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span>{tx.date}</span>
                    <span className="text-stone-300" aria-hidden="true">·</span>
                    <span className="font-mono text-[11px] truncate max-w-[180px]">{tx.target}</span>
                  </div>
                </div>
              </div>

              {/* Right: Amount + Status */}
              <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-1 shrink-0 pl-11 sm:pl-0">
                <span className="text-sm font-bold text-stone-800 tabular-nums">
                  {tx.formattedAmount}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  {tx.statusLabel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SaldoRedemptionHistory
