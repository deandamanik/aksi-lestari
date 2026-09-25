import { useState } from 'react'
import Button from '../../../../components/common/Button'
import { CheckIcon, ArrowRightIcon, AlertCircleIcon } from '../../../../components/common/Icons'
import { USER_PROFILE } from '../../../../data/profil/userProfileData'
import { formatRupiah } from '../../../../utils/formatters'

const QUICK_AMOUNTS = [10000, 20000, 30000]
const MIN_REDEEM = 10000

/**
 * EwalletRedeemForm
 * Self-contained configuration form for withdrawing appreciation balance to E-Wallets.
 *
 * @param {object} props
 * @param {Array} props.walletProviders - Catalog of available e-wallet providers
 * @param {number} props.balance - Currently available balance in Rupiah
 * @param {boolean} props.isProcessing - In-flight simulated processing state
 * @param {(data: { provider: object, amount: number, phoneNumber: string }) => void} props.onSubmit
 */
export default function EwalletRedeemForm({
  walletProviders,
  balance,
  isProcessing,
  onSubmit,
}) {
  const [selectedProvider, setSelectedProvider] = useState(walletProviders[0]?.id || '')
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(USER_PROFILE.phone || '')

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
  const canSubmit = isValidAmount && !!selectedProvider && isPhoneValid && !isProcessing

  function handleAmountChange(e) {
    const raw = e.target.value.replace(/\D/g, '')
    const parsed = parseInt(raw, 10)
    setAmount(isNaN(parsed) ? '' : Math.max(0, parsed))
  }

  function handleQuickAmount(qa) {
    setAmount(qa)
  }

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({
      provider: selectedProviderData,
      amount: numericAmount,
      phoneNumber,
    })
  }

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
              provider.id === 'shopeepay' ? '/images/wallet-logo/shopeepay_logo.webp' : null
            )
            const isSelected = selectedProvider === provider.id

            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => setSelectedProvider(provider.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'border-primary bg-primary/[0.04] shadow-xs'
                    : 'border-border-warm hover:border-stone-300 bg-white'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                    <CheckIcon className="w-2.5 h-2.5" strokeWidth={2.5} />
                  </span>
                )}
                {logoPath ? (
                  <img
                    src={logoPath}
                    alt={provider.name}
                    className="h-7 w-auto object-contain mb-2"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                ) : null}
                <span
                  className="font-bold text-sm text-stone-800"
                  style={{ display: logoPath ? 'none' : 'block' }}
                >
                  {provider.name}
                </span>
                <span className="text-[11px] text-stone-600 mt-0.5">
                  Min. {formatRupiah(provider.minRedeem)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Amount selection */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500">
            2. Masukkan Nominal Penarikan
          </span>
          <span className="text-xs text-stone-600">
            Min. <strong className="text-stone-700">{formatRupiah(providerMinRedeem)}</strong>
          </span>
        </div>

        {/* Input field */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400 select-none">
            Rp
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? Number(amount).toLocaleString('id-ID') : ''}
            onChange={handleAmountChange}
            placeholder="0"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-warm text-lg font-bold text-stone-900 placeholder:text-stone-300 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-display"
          />
        </div>

        {/* Quick amounts */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-stone-600 select-none">Nominal Cepat:</span>
          {QUICK_AMOUNTS.map((qa) => {
            const isAffordable = qa <= balance
            const isCurrent = numericAmount === qa
            return (
              <button
                key={qa}
                type="button"
                disabled={!isAffordable}
                onClick={() => handleQuickAmount(qa)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer select-none ${
                  isCurrent
                    ? 'border-primary bg-primary text-white'
                    : isAffordable
                      ? 'border-border-warm hover:border-primary/40 text-stone-700 bg-white hover:bg-neutral'
                      : 'border-border-warm/50 text-stone-300 bg-stone-50 cursor-not-allowed'
                }`}
              >
                {formatRupiah(qa)}
              </button>
            )
          })}
        </div>

        {/* Remaining balance preview */}
        {numericAmount > 0 && (
          <div className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-neutral border border-border-warm/60">
            <span className="text-stone-500">Sisa saldo setelah penarikan:</span>
            <span className={`font-bold tabular-nums ${remainingBalance < 0 ? 'text-red-700' : 'text-primary'}`}>
              {formatRupiah(Math.max(0, remainingBalance))}
            </span>
          </div>
        )}

        {/* Amount errors */}
        {amountErrors.map((err, i) => (
          <p key={i} className="text-xs text-red-700 flex items-center gap-1.5">
            <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            <span>{err}</span>
          </p>
        ))}
      </div>

      {/* Step 3: Phone number */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-500">
            3. Nomor E-Wallet Tujuan
          </span>
          {isProfilePhone && (
            <span className="text-[11px] font-semibold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-sm select-none">
              Sesuai Profil
            </span>
          )}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d+ -]/g, ''))}
          placeholder="Contoh: 081234567890"
          className="w-full px-4 py-3 rounded-xl border border-border-warm text-sm font-medium text-stone-800 placeholder:text-stone-300 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
        />

        <div className="flex items-center justify-between text-xs">
          <p className="text-stone-600">
            Pastikan nomor terdaftar di akun {selectedProviderData?.name || 'e-wallet'} yang dipilih.
          </p>
          {!isProfilePhone && USER_PROFILE.phone && (
            <button
              type="button"
              onClick={() => setPhoneNumber(USER_PROFILE.phone)}
              className="text-primary hover:underline font-semibold shrink-0 cursor-pointer"
            >
              Gunakan no. profil
            </button>
          )}
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <span className="text-primary/50" aria-hidden="true">🔒</span>
        <span>Penarikan aman tanpa biaya transfer pihak ketiga.</span>
      </div>

      {/* CTA */}
      <Button
        variant="primary"
        size="lg"
        disabled={!canSubmit}
        isLoading={isProcessing}
        className="w-full text-sm font-bold py-3.5 group"
        onClick={handleSubmit}
      >
        {isProcessing ? (
          'Memproses Penarikan…'
        ) : (
          <>
            <span>Tarik Saldo ke E-Wallet</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
          </>
        )}
      </Button>
    </div>
  )
}
