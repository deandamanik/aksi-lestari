import { useState, useRef, useEffect } from 'react'
import { WalletIcon, AwardIcon } from '../../../components/common/Icons'
import { SALDO_APRESIASI } from '../../../data/profil/saldoRedeemData'
import { formatRupiah } from '../../../utils/formatters'
import EwalletRedeemForm from './redeem/EwalletRedeemForm'
import VoucherCatalogGrid from './redeem/VoucherCatalogGrid'
import RedeemSuccessReceipt from './redeem/RedeemSuccessReceipt'
import { useToast } from '../../../hooks/useToast'

/**
 * SaldoRedeemSection — Interactive Redeem Hub
 *
 * Coordinates two redemption paths: E-Wallet and Voucher Digital.
 * Owns method tabs, async processing simulation lifecycle, and success receipt state.
 *
 * @param {object} props
 * @param {number} props.balance - Current available balance in Rupiah
 * @param {(data: { amount: number, type: string, methodTitle: string, target: string }) => void} props.onRedeem
 */

const MOCK_PROCESS_MS = 1800

function SectionHeader({ balance }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          Jalur Pemanfaatan
        </span>
        <h2
          id="saldo-redeem-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Gunakan Saldo
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
          Pilih jalur pemanfaatan saldo apresiasi untuk mendapatkan benefit digital tanpa menghilangkan nilai kontribusi yang telah dilakukan.
        </p>
      </div>
      <span className="text-sm font-semibold text-stone-600 tabular-nums shrink-0 select-none">
        Saldo Tersedia: <span className="text-primary">{formatRupiah(balance)}</span>
      </span>
    </div>
  )
}

function SaldoRedeemSection({ balance, onRedeem }) {
  const { showToast } = useToast()
  const { walletProviders, voucherCatalog } = SALDO_APRESIASI

  const [redeemMethod, setRedeemMethod] = useState('ewallet')
  const [isProcessing, setIsProcessing] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const processingRef = useRef(false)
  const redeemTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (redeemTimeoutRef.current) {
        clearTimeout(redeemTimeoutRef.current)
      }
    }
  }, [])

  function handleSubmitEWallet({ provider, amount, phoneNumber }) {
    if (processingRef.current) return
    processingRef.current = true
    setIsProcessing(true)

    const providerName = provider?.name || 'E-Wallet'
    const txAmount = amount

    if (redeemTimeoutRef.current) clearTimeout(redeemTimeoutRef.current)
    redeemTimeoutRef.current = setTimeout(() => {
      onRedeem({
        amount: txAmount,
        type: 'wallet',
        methodTitle: `Penarikan Saldo ke ${providerName}`,
        target: phoneNumber,
      })
      setSuccessData({
        amount: txAmount,
        methodTitle: `Penarikan ke ${providerName}`,
        target: phoneNumber,
        newBalance: balance - txAmount,
      })
      setIsProcessing(false)
      processingRef.current = false
      showToast({
        title: 'Penukaran Berhasil',
        message: 'Penukaran poin berhasil diproses!',
      })
    }, MOCK_PROCESS_MS)
  }

  function handleSubmitVoucher(voucher) {
    if (isProcessing || processingRef.current || voucher.costRupiah > balance) return
    processingRef.current = true
    setIsProcessing(true)

    if (redeemTimeoutRef.current) clearTimeout(redeemTimeoutRef.current)
    redeemTimeoutRef.current = setTimeout(() => {
      onRedeem({
        amount: voucher.costRupiah,
        type: 'voucher',
        methodTitle: `Voucher ${voucher.title}`,
        target: `ID: #TRX-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      })
      setSuccessData({
        amount: voucher.costRupiah,
        methodTitle: `Voucher ${voucher.title}`,
        target: voucher.description,
        newBalance: balance - voucher.costRupiah,
      })
      setIsProcessing(false)
      processingRef.current = false
      showToast({
        title: 'Penukaran Berhasil',
        message: 'Penukaran poin berhasil diproses!',
      })
    }, MOCK_PROCESS_MS)
  }

  function handleDismissSuccess() {
    setSuccessData(null)
  }

  if (successData) {
    return (
      <section aria-labelledby="saldo-redeem-heading" className="flex flex-col gap-5">
        <SectionHeader balance={balance} />
        <RedeemSuccessReceipt successData={successData} onDismiss={handleDismissSuccess} />
      </section>
    )
  }

  return (
    <section aria-labelledby="saldo-redeem-heading" className="flex flex-col gap-5">
      <SectionHeader balance={balance} />

      {/* Clean Utility Method Switcher */}
      <div className="flex items-center gap-2 border-b border-border-warm pb-px">
        <button
          type="button"
          onClick={() => setRedeemMethod('ewallet')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 -mb-px transition-colors cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm ${
            redeemMethod === 'ewallet'
              ? 'text-primary border-primary font-bold'
              : 'text-stone-500 hover:text-stone-800 border-transparent hover:border-stone-300'
          }`}
          aria-pressed={redeemMethod === 'ewallet'}
        >
          <WalletIcon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
          <span>E-Wallet</span>
        </button>

        <button
          type="button"
          onClick={() => setRedeemMethod('voucher')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 -mb-px transition-colors cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm ${
            redeemMethod === 'voucher'
              ? 'text-primary border-primary font-bold'
              : 'text-stone-500 hover:text-stone-800 border-transparent hover:border-stone-300'
          }`}
          aria-pressed={redeemMethod === 'voucher'}
        >
          <AwardIcon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
          <span>Voucher Digital</span>
        </button>
      </div>

      {/* Content area */}
      {redeemMethod === 'ewallet' ? (
        <EwalletRedeemForm
          walletProviders={walletProviders}
          balance={balance}
          isProcessing={isProcessing}
          onSubmit={handleSubmitEWallet}
        />
      ) : (
        <VoucherCatalogGrid
          voucherCatalog={voucherCatalog}
          balance={balance}
          isProcessing={isProcessing}
          onSubmitVoucher={handleSubmitVoucher}
        />
      )}
    </section>
  )
}

export default SaldoRedeemSection
