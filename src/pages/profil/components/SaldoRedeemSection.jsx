import { useState } from 'react'
import { WalletIcon, AwardIcon, CheckIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { SALDO_APRESIASI } from '../../../data/profil/saldoRedeemData'

/**
 * SaldoRedeemSection — Interactive Redeem Hub
 *
 * Two tabs: E-Wallet | Voucher Digital
 * E-Wallet: provider selection → amount → phone → CTA
 * Voucher: grid of available vouchers
 *
 * All state is local (useState). No API calls. Mock only.
 */

const QUICK_AMOUNTS = [10000, 20000, 30000]

function formatRupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID')
}

function SaldoRedeemSection() {
  const { availableBalance, formattedBalance, walletProviders, voucherCatalog } = SALDO_APRESIASI

  const [redeemMethod, setRedeemMethod] = useState('ewallet')
  const [selectedProvider, setSelectedProvider] = useState(walletProviders[0]?.id || '')
  const [amount, setAmount] = useState(20000)
  const [phoneNumber, setPhoneNumber] = useState('0812-3456-7890')

  const remainingBalance = availableBalance - amount
  const isValidAmount = amount > 0 && amount <= availableBalance

  return (
    <section
      aria-labelledby="saldo-redeem-heading"
      className="flex flex-col gap-5"
    >
      {/* Section header */}
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
          Saldo Tersedia: <span className="text-primary">{formattedBalance}</span>
        </span>
      </div>

      {/* Method tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* E-Wallet tab */}
        <button
          type="button"
          onClick={() => setRedeemMethod('ewallet')}
          className={`group text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            redeemMethod === 'ewallet'
              ? 'border-primary bg-white'
              : 'border-[#E8E5DC] bg-white hover:border-stone-300'
          }`}
          aria-pressed={redeemMethod === 'ewallet'}
        >
          <div className="flex items-start gap-3">
            <WalletIcon className={`w-5 h-5 shrink-0 mt-0.5 ${redeemMethod === 'ewallet' ? 'text-primary' : 'text-stone-400'}`} strokeWidth={1.8} />
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-bold ${redeemMethod === 'ewallet' ? 'text-stone-900' : 'text-stone-700'}`}>
                E-Wallet
              </span>
              <span className="text-xs text-stone-500 leading-relaxed">
                Transfer saldo ke e-wallet pilihanmu. Mendukung GoPay, DANA, OVO, ShopeePay.
              </span>
              {redeemMethod === 'ewallet' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary mt-1 select-none">
                  <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
                  Terpilih
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Voucher tab */}
        <button
          type="button"
          onClick={() => setRedeemMethod('voucher')}
          className={`group text-left rounded-2xl border-2 p-5 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            redeemMethod === 'voucher'
              ? 'border-primary bg-white'
              : 'border-[#E8E5DC] bg-white hover:border-stone-300'
          }`}
          aria-pressed={redeemMethod === 'voucher'}
        >
          <div className="flex items-start gap-3">
            <AwardIcon className={`w-5 h-5 shrink-0 mt-0.5 ${redeemMethod === 'voucher' ? 'text-primary' : 'text-stone-400'}`} strokeWidth={1.8} />
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-bold ${redeemMethod === 'voucher' ? 'text-stone-900' : 'text-stone-700'}`}>
                Voucher Digital
              </span>
              <span className="text-xs text-stone-500 leading-relaxed">
                Tukarkan saldo dengan voucher: pulsa, token listrik, belanja, dan lainnya.
              </span>
              {redeemMethod === 'voucher' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary mt-1 select-none">
                  <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
                  Terpilih
                </span>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Content area */}
      {redeemMethod === 'ewallet' ? (
        <EWalletForm
          walletProviders={walletProviders}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          amount={amount}
          setAmount={setAmount}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          availableBalance={availableBalance}
          formattedBalance={formattedBalance}
          remainingBalance={remainingBalance}
          isValidAmount={isValidAmount}
        />
      ) : (
        <VoucherGrid
          voucherCatalog={voucherCatalog}
          availableBalance={availableBalance}
        />
      )}
    </section>
  )
}

/* ─── E-Wallet Form ─── */
function EWalletForm({
  walletProviders,
  selectedProvider,
  setSelectedProvider,
  amount,
  setAmount,
  phoneNumber,
  setPhoneNumber,
  availableBalance,
  formattedBalance,
  remainingBalance,
  isValidAmount,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-7">
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
          {walletProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => setSelectedProvider(provider.id)}
              className={`group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                selectedProvider === provider.id
                  ? 'border-primary bg-primary/5'
                  : 'border-[#E8E5DC] bg-white hover:border-stone-300'
              }`}
              aria-pressed={selectedProvider === provider.id}
            >
              <WalletIcon
                className={`w-5 h-5 ${selectedProvider === provider.id ? 'text-primary' : 'text-stone-400'}`}
                strokeWidth={1.8}
              />
              <span className={`text-xs font-bold ${selectedProvider === provider.id ? 'text-primary' : 'text-stone-600'}`}>
                {provider.name}
              </span>
              {selectedProvider === provider.id && (
                <span className="text-[10px] text-primary/60 font-medium">
                  Tanpa biaya
                </span>
              )}
            </button>
          ))}
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
            const isSelected = amount === qa
            const canAfford = qa <= availableBalance
            return (
              <button
                key={qa}
                type="button"
                disabled={!canAfford}
                onClick={() => setAmount(qa)}
                className={`flex flex-col items-center gap-1 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : canAfford
                      ? 'border-[#E8E5DC] bg-white hover:border-stone-300'
                      : 'border-[#E8E5DC]/50 bg-stone-50 opacity-50 cursor-not-allowed'
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
                  <span className="text-[10px] font-medium text-stone-400">Saldo kurang</span>
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
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
              min={0}
              max={availableBalance}
              className="w-full pl-10 pr-4 py-3 text-sm font-semibold text-stone-900 bg-white border border-[#E8E5DC] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 tabular-nums"
              aria-label="Nominal penarikan"
            />
          </div>
        </div>

        {/* Balance info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-stone-400 font-medium">
          <span>Saldo tersedia: <span className="text-stone-600 font-semibold tabular-nums">{formattedBalance}</span></span>
          {isValidAmount && (
            <span>Sisa saldo setelah penarikan: <span className="text-stone-600 font-semibold tabular-nums">{formatRupiah(remainingBalance)}</span></span>
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
            className="w-full px-4 py-3 text-sm font-semibold text-stone-900 bg-white border border-[#E8E5DC] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            placeholder="0812-3456-7890"
            aria-label="Nomor ponsel tujuan"
          />
          {phoneNumber.length >= 10 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[10px] font-bold text-primary select-none">
              <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
              Nomor Profil Utama
            </span>
          )}
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
        <span className="text-primary/50" aria-hidden="true">🔒</span>
        <span>Penarikan aman tanpa biaya transfer pihak ketiga.</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!isValidAmount || !selectedProvider || phoneNumber.length < 10}
        className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-primary hover:bg-primary/90 active:bg-primary/80 disabled:bg-stone-300 disabled:cursor-not-allowed px-6 py-3.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group"
        onClick={(e) => e.preventDefault()}
      >
        <span>Tarik Saldo ke E-Wallet</span>
        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
      </button>
    </div>
  )
}

/* ─── Voucher Grid ─── */
function VoucherGrid({ voucherCatalog, availableBalance }) {
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
          const canAfford = voucher.costRupiah <= availableBalance
          return (
            <div
              key={voucher.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 ${
                canAfford
                  ? 'border-[#E8E5DC] hover:border-stone-300'
                  : 'border-[#E8E5DC]/50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest select-none">
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
              <button
                type="button"
                disabled={!canAfford}
                className={`flex items-center justify-center gap-1.5 w-full text-xs font-bold px-4 py-2.5 rounded-lg transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  canAfford
                    ? 'text-primary border border-primary/30 hover:bg-primary/5'
                    : 'text-stone-400 border border-stone-200 cursor-not-allowed'
                }`}
                onClick={(e) => e.preventDefault()}
              >
                <span>{canAfford ? 'Tukarkan' : 'Saldo Kurang'}</span>
                {canAfford && <ArrowRightIcon className="w-3 h-3" strokeWidth={2.2} />}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SaldoRedeemSection
