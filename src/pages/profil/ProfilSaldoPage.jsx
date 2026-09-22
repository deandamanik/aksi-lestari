import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../components/common/Icons'
import SaldoBalanceCard from './components/SaldoBalanceCard'
import SaldoTransparencyNote from './components/SaldoTransparencyNote'
import SaldoContributionSources from './components/SaldoContributionSources'
import SaldoRedeemSection from './components/SaldoRedeemSection'
import SaldoRedemptionHistory from './components/SaldoRedemptionHistory'
import SaldoGovernanceInfo from './components/SaldoGovernanceInfo'

/**
 * ProfilSaldoPage — Saldo & Redeem Hub
 *
 * Section order (following reference layout):
 * 1. Back navigation + Breadcrumb
 * 2. Page heading — "Saldo & Redeem" + subtitle + contextual label
 * 3. Balance card — primary focal point
 * 4. Transparency note — informational
 * 5. Contribution sources — how balance grows
 * 6. Redeem section — interactive E-Wallet / Voucher
 * 7. Redemption history — past transactions
 * 8. Governance info — closing section
 *
 * Design: civic-tech, trustworthy, editorial, functional.
 * Consistent with ProfilMisiPage patterns.
 */
function ProfilSaldoPage() {
  return (
    <main
      className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Halaman Saldo dan Redeem AksiLestari"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* 1. Back navigation + Breadcrumb */}
        <div className="profil-enter flex items-center justify-between gap-4">
          <Link
            to="/profil"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-primary transition-colors duration-200 w-fit focus:outline-hidden focus-visible:underline"
          >
            <ArrowLeftIcon
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            <span>Kembali ke Profil</span>
          </Link>

          {/* Breadcrumb — desktop only */}
          <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-stone-400 select-none"
          >
            <span>PROFIL</span>
            <span aria-hidden="true">/</span>
            <span className="text-stone-500">SALDO &amp; REDEEM</span>
          </nav>
        </div>

        {/* 2. Page heading */}
        <div className="profil-enter profil-enter-delay-1 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
              Profil
            </span>
            <span className="text-[10px] font-bold text-primary/70 bg-primary/5 px-2.5 py-1 rounded-md uppercase tracking-widest select-none">
              Apresiasi Warga
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-stone-900 font-bold tracking-tight leading-tight">
            Saldo &amp; Redeem
          </h1>
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl mt-1">
            Kelola apresiasi yang kamu kumpulkan dari setiap kontribusi nyata untuk lingkungan dan tata kelola bersama.
          </p>
        </div>

        {/* 3. Balance card */}
        <div className="profil-enter profil-enter-delay-2">
          <SaldoBalanceCard />
        </div>

        {/* 4. Transparency note */}
        <div className="profil-enter profil-enter-delay-2">
          <SaldoTransparencyNote />
        </div>

        {/* 5. Contribution sources */}
        <div className="profil-enter profil-enter-delay-3">
          <SaldoContributionSources />
        </div>

        {/* 6. Redeem section */}
        <div className="profil-enter profil-enter-delay-4">
          <SaldoRedeemSection />
        </div>

        {/* 7. Redemption history */}
        <div className="profil-enter profil-enter-delay-5">
          <SaldoRedemptionHistory />
        </div>

        {/* 8. Governance info */}
        <div className="profil-enter profil-enter-delay-6">
          <SaldoGovernanceInfo />
        </div>
      </div>
    </main>
  )
}

export default ProfilSaldoPage
