import { useState, useRef, useEffect } from 'react'
import { WalletIcon, AwardIcon, CheckIcon, ArrowRightIcon, AlertCircleIcon, CheckCircle2Icon } from '../../../components/common/Icons'
import { SALDO_APRESIASI } from '../../../data/profil/saldoRedeemData'
import { USER_PROFILE } from '../../../data/profil/userProfileData'

/**
 * SaldoRedeemSection — Interactive Redeem Hub
 *
 * Two tabs: E-Wallet | Voucher Digital
 * E-Wallet: provider selection → amount → phone → CTA → loading → success
 * Voucher: grid → select → confirm → loading → success
 *
 * Props from ProfilSaldoPage:
 * - balance: current available balance (number)
 * - onRedeem: callback({ amount, type, methodTitle, target }) after successful mock redeem
 *
 * All processing is mock (setTimeout). No API calls.
 * Double-submit protection via isProcessing guard and timeout cleanup.
 */

const QUICK_AMOUNTS = [10000, 20000, 30000]
const MIN_REDEEM = 10000
const MOCK_PROCESS_MS = 1800

function formatRupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID')
}

function SaldoRedeemSection({ balance, onRedeem }) {
  const { walletProviders, voucherCatalog } = SALDO_APRESIASI

  const [redeemMethod, setRedeemMethod] = useState('ewallet')
  const [selectedProvider, setSelectedProvider] = useState(walletProviders[0]?.id || '')
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(USER_PROFILE.phone || '')

  // Processing & result states
  const [isProcessing, setIsProcessing] = useState(false)
  const [successData, setSuccessData] = useState(null) // { amount, methodTitle, target, newBalance }
  const processingRef = useRef(false) // extra guard against React batching edge case
  const redeemTimeoutRef = useRef(null)

  // Voucher flow state
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [voucherConfirm, setVoucherConfirm] = useState(false)

  // Unmount cleanup
  useEffect(() => {
    return () => {
      if (redeemTimeoutRef.current) {
        clearTimeout(redeemTimeoutRef.current)
      }
    }
  }, [])

  // ── Derived values ──
  const numericAmount = typeof amount === 'number' ? amount : (parseInt(String(amount).replace(/\D/g, ''), 10) || 0)
  const remainingBalance = balance - numericAmount
  const selectedProviderData = walletProviders.find((p) => p.id === selectedProvider)
  const providerMinRedeem = selectedProviderData?.minRedeem || MIN_REDEEM
  const isPhoneValid = phoneNumber.replace(/\D/g, '').length >= 10
  const isProfilePhone = phoneNumber === USER_PROFILE.phone

  // Validation
  const amountErrors = []
  if (numericAmount > 0 && numericAmount < providerMinRedeem) {
    amountErrors.push(`Minimal penarikan ${formatRupiah(providerMinRedeem)}`)
  }
  if (numericAmount > balance) {
    amountErrors.push('Saldo tidak mencukupi untuk nominal ini')
  }
  const isValidAmount = numericAmount >= providerMinRedeem && numericAmount <= balance
  const canSubmitEWallet = isValidAmount && !!selectedProvider && isPhoneValid && !isProcessing

  // ── Handlers ──
  function handleAmountChange(e) {
    const raw = e.target.value.replace(/\D/g, '')
    const parsed = parseInt(raw, 10)
    setAmount(isNaN(parsed) ? '' : Math.max(0, parsed))
  }

  function handleQuickAmount(qa) {
    setAmount(qa)
  }

  function handleSubmitEWallet() {
    if (!canSubmitEWallet || processingRef.current) return
    processingRef.current = true
    setIsProcessing(true)

    const providerName = selectedProviderData?.name || selectedProvider
    const txAmount = numericAmount

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
      setSelectedVoucher(null)
      setVoucherConfirm(false)
    }, MOCK_PROCESS_MS)
  }

  function handleDismissSuccess() {
    setSuccessData(null)
    setAmount('')
    setSelectedVoucher(null)
    setVoucherConfirm(false)
  }

  // ── Success overlay ──
  if (successData) {
    return (
      <section aria-labelledby="saldo-redeem-heading" className="flex flex-col gap-5">
        <SectionHeader balance={balance} />
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
            onClick={handleDismissSuccess}
            className="flex items-center justify-center gap-2 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 px-8 py-3 rounded-xl transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Tutup &amp; Kembali
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="saldo-redeem-heading"
      className="flex flex-col gap-5"
    >
      <SectionHeader balance={balance} />

      {/* Clean Utility Method Switcher */}
      <div className="flex items-center gap-2 border-b border-border-warm pb-px">
        <button
          type="button"
          onClick={() => { setRedeemMethod('ewallet'); setSelectedVoucher(null); setVoucherConfirm(false) }}
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
        <EWalletForm
          walletProviders={walletProviders}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          amount={amount}
          numericAmount={numericAmount}
          handleAmountChange={handleAmountChange}
          handleQuickAmount={handleQuickAmount}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          balance={balance}
          remainingBalance={remainingBalance}
          isValidAmount={isValidAmount}
          amountErrors={amountErrors}
          isPhoneValid={isPhoneValid}
          isProfilePhone={isProfilePhone}
          canSubmit={canSubmitEWallet}
          isProcessing={isProcessing}
          onSubmit={handleSubmitEWallet}
        />
      ) : (
        <VoucherGrid
          voucherCatalog={voucherCatalog}
          balance={balance}
          selectedVoucher={selectedVoucher}
          setSelectedVoucher={setSelectedVoucher}
          voucherConfirm={voucherConfirm}
          setVoucherConfirm={setVoucherConfirm}
          isProcessing={isProcessing}
          onSubmitVoucher={handleSubmitVoucher}
        />
      )}
    </section>
  )
}

/* ─── Section Header (shared between normal + success views) ─── */
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

/* ─── E-Wallet Form ─── */
function EWalletForm({
  walletProviders,
  selectedProvider,
  setSelectedProvider,
  amount,
  numericAmount,
  handleAmountChange,
  handleQuickAmount,
  phoneNumber,
  setPhoneNumber,
  balance,
  remainingBalance,
  isValidAmount,
  amountErrors,
  isPhoneValid,
  isProfilePhone,
  canSubmit,
  isProcessing,
  onSubmit,
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col gap-7">
      {/* Form header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            Konfigurasi Penarikan Saldo ke E-Wallet
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed">
            Pilih penyedia e-wallet dan nominal yang ingin ditransfer.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/70 bg-primary/5 px-3 py-1.5 rounded-lg select-none shrink-0">
          Proses Otomatis 1-4 Menit
        </span>
      </div>

      {/* Step 1: Provider selection */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-stone-500">
          1. Pilih Penyedia E-Wallet
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {walletProviders.map((provider) => {
            const logoPath = provider.logo || (
              provider.id === 'gopay' ? '/images/wallet-logo/gopay_logo.webp' :
              provider.id === 'dana' ? '/images/wallet-logo/dana_logo.webp' :
              provider.id === 'ovo' ? '/images/wallet-logo/ovo_logo.webp' :
              provider.id === 'shopeepay' ? '/images/wallet-logo/shopee_logo.webp' : null
            )

            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => setSelectedProvider(provider.id)}
                className={`group flex flex-col items-center justify-center gap-2 p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  selectedProvider === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border-warm bg-white hover:border-stone-300'
                }`}
                aria-pressed={selectedProvider === provider.id}
              >
                <div className="h-5 flex items-center justify-center">
                  {logoPath ? (
                    <img
                      src={logoPath}
                      alt=""
                      aria-hidden="true"
                      className="h-4 sm:h-5 w-auto max-w-[70px] object-contain transition-opacity duration-150"
                      loading="lazy"
                    />
                  ) : (
                    <WalletIcon
                      className={`w-5 h-5 ${selectedProvider === provider.id ? 'text-primary' : 'text-stone-400'}`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className={`text-xs font-bold ${selectedProvider === provider.id ? 'text-primary' : 'text-stone-700'}`}>
                  {provider.name}
                </span>
                {selectedProvider === provider.id && (
                  <span className="text-[10px] text-primary/70 font-medium">
                    Tanpa biaya
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Amount selection */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-stone-500">
          2. Pilih Nominal Penarikan
        </span>

        {/* Quick amounts */}
        <div className="grid grid-cols-3 gap-3">
          {QUICK_AMOUNTS.map((qa) => {
            const isSelected = numericAmount === qa
            const canAfford = qa <= balance
            return (
              <button
                key={qa}
                type="button"
                disabled={!canAfford}
                onClick={() => handleQuickAmount(qa)}
                className={`flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : canAfford
                      ? 'border-border-warm bg-white hover:border-stone-300'
                      : 'border-border-warm/50 bg-stone-50 opacity-50 cursor-not-allowed'
                }`}
                aria-pressed={isSelected}
              >
                <span className={`text-base sm:text-lg font-bold tabular-nums ${isSelected ? 'text-primary' : 'text-stone-800'}`}>
                  {formatRupiah(qa)}
                </span>
                {isSelected && (
                  <span className="text-[10px] font-semibold text-primary/60">Terpilih</span>
                )}
                {!canAfford && (
                  <span className="text-[10px] font-medium text-stone-500">Saldo kurang</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Manual input */}
        <div className="flex flex-col gap-2 mt-1">
          <label htmlFor="saldo-amount-input" className="text-xs font-medium text-stone-500">
            Atau masukkan nominal manual
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400 select-none">
              Rp
            </span>
            <input
              id="saldo-amount-input"
              type="text"
              inputMode="numeric"
              value={amount === '' ? '' : numericAmount.toLocaleString('id-ID')}
              onChange={handleAmountChange}
              className={`w-full pl-10 pr-4 py-3 text-sm font-semibold text-stone-900 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 tabular-nums ${
                amountErrors.length > 0 ? 'border-red-300' : 'border-border-warm'
              }`}
              placeholder="0"
              aria-label="Nominal penarikan"
              aria-invalid={amountErrors.length > 0}
            />
          </div>

          {/* Error messages */}
          {amountErrors.length > 0 && (
            <div className="flex flex-col gap-1">
              {amountErrors.map((err, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  {err}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Balance info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-stone-500 font-medium">
          <span>Saldo tersedia: <span className="text-stone-700 font-semibold tabular-nums">{formatRupiah(balance)}</span></span>
          {isValidAmount && (
            <span>Sisa saldo setelah penarikan: <span className="text-stone-700 font-semibold tabular-nums">{formatRupiah(remainingBalance)}</span></span>
          )}
        </div>
      </div>

      {/* Step 3: Phone number */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-stone-500">
          3. Nomor Rekening / Ponsel Tujuan
        </span>
        <div className="relative">
          <input
            id="saldo-phone-input"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full px-4 py-3 text-sm font-semibold text-stone-900 bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
              phoneNumber.length > 0 && !isPhoneValid ? 'border-red-300' : 'border-border-warm'
            }`}
            placeholder="0812-3456-7890"
            aria-label="Nomor ponsel tujuan"
            aria-invalid={phoneNumber.length > 0 && !isPhoneValid}
          />
          {isProfilePhone && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[10px] font-bold text-primary select-none">
              <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
              Nomor Profil Utama
            </span>
          )}
        </div>
        {phoneNumber.length > 0 && !isPhoneValid && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
            <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            Masukkan nomor tujuan yang valid (minimal 10 digit)
          </span>
        )}
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <span className="text-primary/50" aria-hidden="true">🔒</span>
        <span>Penarikan aman tanpa biaya transfer pihak ketiga.</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!canSubmit}
        className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-stone-300 disabled:cursor-not-allowed px-6 py-3.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group"
        onClick={onSubmit}
      >
        {isProcessing ? (
          <>
            <LoadingSpinner />
            <span>Memproses Penarikan…</span>
          </>
        ) : (
          <>
            <span>Tarik Saldo ke E-Wallet</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
          </>
        )}
      </button>
    </div>
  )
}

/* ─── Voucher Grid ─── */
function VoucherGrid({
  voucherCatalog,
  balance,
  selectedVoucher,
  setSelectedVoucher,
  voucherConfirm,
  setVoucherConfirm,
  isProcessing,
  onSubmitVoucher,
}) {
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
                    <button
                      type="button"
                      disabled={isThisProcessing}
                      onClick={() => onSubmitVoucher(voucher)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-primary hover:bg-primary/90 disabled:bg-stone-300 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {isThisProcessing ? (
                        <>
                          <LoadingSpinner small />
                          <span>Memproses…</span>
                        </>
                      ) : (
                        <span>Ya, Tukarkan</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={isThisProcessing}
                      onClick={() => { setVoucherConfirm(false); setSelectedVoucher(null) }}
                      className="flex-1 text-xs font-bold text-stone-500 border border-stone-200 hover:bg-stone-50 disabled:opacity-50 px-4 py-2.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Batal
                    </button>
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
                      ? 'text-primary border border-primary/30 hover:bg-primary/5'
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

/* ─── Loading Spinner ─── */
function LoadingSpinner({ small = false }) {
  return (
    <svg
      className={`animate-spin ${small ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export default SaldoRedeemSection
