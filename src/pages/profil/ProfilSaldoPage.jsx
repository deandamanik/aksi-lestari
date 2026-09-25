import { useState, useCallback } from 'react'
import {
  getSaldoSession,
  saveSaldoSession,
} from '../../data/profil/saldoRedeemData'
import SaldoBalanceCard from './components/SaldoBalanceCard'
import SaldoContributionSources from './components/SaldoContributionSources'
import SaldoRedeemSection from './components/SaldoRedeemSection'
import SaldoRedemptionHistory from './components/SaldoRedemptionHistory'
import { formatRupiah } from '../../utils/formatters'

function ProfilSaldoPage() {
  // ── Reactive state (persisted across session navigation) ──
  const [balance, setBalance] = useState(() => getSaldoSession().balance)
  const [totalRedeemed, setTotalRedeemed] = useState(() => getSaldoSession().totalRedeemed)
  const [history, setHistory] = useState(() => getSaldoSession().history)

  /**
   * handleRedeem — callback invoked after a successful mock redeem.
   * Flattens state mutations outside pure functional updaters.
   */
  const handleRedeem = useCallback((tx) => {
    const currentSession = getSaldoSession()
    const nextBalance = Math.max(0, currentSession.balance - tx.amount)
    const nextTotalRedeemed = currentSession.totalRedeemed + tx.amount

    const now = new Date()
    const dateStr =
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) +
      ', ' +
      now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }) +
      ' WIB'

    const newTx = {
      id: `red-${Date.now()}`,
      type: tx.type,
      methodTitle: tx.methodTitle,
      target: tx.target,
      amountRupiah: tx.amount,
      formattedAmount: '-' + formatRupiah(tx.amount),
      date: dateStr,
      status: 'completed',
      statusLabel: 'Berhasil',
    }

    const nextHistory = [newTx, ...currentSession.history]

    saveSaldoSession({
      balance: nextBalance,
      totalRedeemed: nextTotalRedeemed,
      history: nextHistory,
    })

    setBalance(nextBalance)
    setTotalRedeemed(nextTotalRedeemed)
    setHistory(nextHistory)
  }, [])

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* 1. Page heading */}
      <div className="profil-enter flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-primary select-none">
          Saldo Apresiasi
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight leading-tight">
          Saldo &amp; Redeem
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl">
          Kelola apresiasi yang kamu kumpulkan dari setiap kontribusi nyata untuk lingkungan dan tata kelola bersama.
        </p>
      </div>

      {/* 2. Balance card — reactive */}
      <div className="profil-enter profil-enter-delay-1">
        <SaldoBalanceCard balance={balance} totalRedeemed={totalRedeemed} />
      </div>

      {/* 3. Contribution sources */}
      <div className="profil-enter profil-enter-delay-2">
        <SaldoContributionSources />
      </div>

      {/* 4. Redeem section — reactive */}
      <div className="profil-enter profil-enter-delay-3">
        <SaldoRedeemSection balance={balance} onRedeem={handleRedeem} />
      </div>

      {/* 5. Redemption history — reactive */}
      <div className="profil-enter profil-enter-delay-4">
        <SaldoRedemptionHistory history={history} />
      </div>
    </div>
  )
}

export default ProfilSaldoPage
