import { useState } from 'react'
import Button from '../../../../components/common/Button'
import { ArrowRightIcon } from '../../../../components/common/Icons'

/**
 * VoucherCatalogGrid
 * Displays available digital vouchers, validates affordability, and manages inline confirmation.
 *
 * @param {object} props
 * @param {Array} props.voucherCatalog - Catalog of redeemable vouchers
 * @param {number} props.balance - Current user appreciation balance
 * @param {boolean} props.isProcessing - In-flight simulated processing state
 * @param {(voucher: object) => void} props.onSubmitVoucher
 */
export default function VoucherCatalogGrid({
  voucherCatalog,
  balance,
  isProcessing,
  onSubmitVoucher,
}) {
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [voucherConfirm, setVoucherConfirm] = useState(false)

  const handleCancelConfirm = () => {
    setVoucherConfirm(false)
    setSelectedVoucher(null)
  }

  const handleConfirmSubmit = (voucher) => {
    onSubmitVoucher(voucher)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
          Pilih Voucher Digital
        </h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Tukarkan saldo apresiasi dengan voucher digital dari mitra terpercaya.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {voucherCatalog.map((voucher) => {
          const canAfford = voucher.costRupiah <= balance
          const isSelected = selectedVoucher?.id === voucher.id
          const isConfirming = isSelected && voucherConfirm
          const isThisProcessing = isConfirming && isProcessing

          return (
            <div
              key={voucher.id}
              className={`bg-white rounded-2xl border-2 p-5 flex flex-col gap-3 transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/[0.02]'
                  : canAfford
                    ? 'border-border-warm hover:border-stone-300'
                    : 'border-border-warm/50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest select-none">
                    {voucher.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-800">
                    {voucher.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {voucher.description}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary tabular-nums whitespace-nowrap shrink-0">
                  {voucher.formattedCost}
                </span>
              </div>

              {/* Confirm bar */}
              {isConfirming ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-stone-500 font-medium">
                    Tukarkan saldo <span className="font-bold text-stone-700">{voucher.formattedCost}</span> untuk {voucher.title}?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={isThisProcessing}
                      disabled={isThisProcessing}
                      onClick={() => handleConfirmSubmit(voucher)}
                      className="flex-1"
                    >
                      {isThisProcessing ? 'Memproses…' : 'Ya, Tukarkan'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={isThisProcessing}
                      onClick={handleCancelConfirm}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!canAfford || isProcessing}
                  onClick={() => {
                    if (!canAfford) return
                    setSelectedVoucher(voucher)
                    setVoucherConfirm(true)
                  }}
                  className={`flex items-center justify-center gap-1.5 w-full text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    canAfford
                      ? 'text-primary border border-primary/30 hover:bg-primary/5 cursor-pointer'
                      : 'text-stone-400 border border-stone-200 cursor-not-allowed'
                  }`}
                >
                  <span>{canAfford ? 'Tukarkan' : 'Saldo Kurang'}</span>
                  {canAfford && <ArrowRightIcon className="w-3 h-3" strokeWidth={2.2} />}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
