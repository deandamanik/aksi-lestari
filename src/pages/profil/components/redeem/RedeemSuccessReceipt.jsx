import { CheckCircle2Icon } from '../../../../components/common/Icons'
import { formatRupiah } from '../../../../utils/formatters'

/**
 * RedeemSuccessReceipt
 * Presentational transaction summary card shown upon successful simulation of E-Wallet or Voucher redemption.
 *
 * @param {object} props
 * @param {{ amount: number, methodTitle: string, target: string, newBalance: number }} props.successData
 * @param {() => void} props.onDismiss
 */
export default function RedeemSuccessReceipt({ successData, onDismiss }) {
  return (
    <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col items-center gap-5 text-center">
      {/* Success icon */}
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2Icon className="w-7 h-7 text-primary" strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Penukaran Berhasil
        </h3>
        <p className="text-sm text-stone-500">
          Transaksi simulasi telah diproses.
        </p>
      </div>

      {/* Transaction summary */}
      <div className="w-full max-w-sm bg-neutral rounded-xl p-4 flex flex-col gap-2.5 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Nominal</span>
          <span className="font-bold text-stone-900 tabular-nums">{formatRupiah(successData.amount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Metode</span>
          <span className="font-semibold text-stone-700">{successData.methodTitle}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-500">Tujuan</span>
          <span className="font-medium text-stone-600 truncate max-w-[180px]">{successData.target}</span>
        </div>
        <div className="border-t border-border-warm/60 pt-2 flex items-center justify-between text-sm">
          <span className="text-stone-500">Sisa Saldo</span>
          <span className="font-bold text-primary tabular-nums">{formatRupiah(successData.newBalance)}</span>
        </div>
      </div>

      {/* Prototype disclaimer */}
      <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs">
        Ini adalah simulasi prototype. Tidak ada transaksi finansial nyata yang diproses.
      </p>

      {/* Dismiss */}
      <button
        type="button"
        onClick={onDismiss}
        className="flex items-center justify-center gap-2 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 px-8 py-3 rounded-xl transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
      >
        Tutup &amp; Kembali
      </button>
    </div>
  )
}
