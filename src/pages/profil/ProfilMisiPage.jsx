import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../components/common/Icons'
import ProfilNavTabs from './components/ProfilNavTabs'
import MisiWeeklySummary from './components/MisiWeeklySummary'
import MisiList from './components/MisiList'
import MisiCompletionSummary from './components/MisiCompletionSummary'

/**
 * ProfilMisiPage — Weekly Mission Hub
 *
 * Visual hierarchy (top → bottom):
 * 1. Page Header   — back link, heading, subtitle
 * 2. Nav Tabs      — sub-navigation
 * 3. Weekly Summary — primary visual anchor (progress, status, XP)
 * 4. Mission List  — content core (individual mission cards)
 * 5. Completion Summary — closing section (target status, CTA to riwayat)
 *
 * Design direction: calm, actionable, editorial.
 * Weekly missions only — no daily anything.
 */
function ProfilMisiPage() {
  return (
    <main
      className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Halaman Misi Mingguan AksiLestari"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* A. Page Header */}
        <div className="profil-enter flex flex-col gap-3">
          {/* Back link */}
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

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
              Profil
            </span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold tracking-tight">
              Misi Minggu Ini
            </h1>
            <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl mt-1">
              Selesaikan target kontribusimu minggu ini dan dapatkan XP.
            </p>
          </div>
        </div>

        {/* B. Sub-navigation tabs */}
        <div className="profil-enter profil-enter-delay-1">
          <ProfilNavTabs />
        </div>

        {/* C. Weekly Summary — Primary Visual Anchor */}
        <div className="profil-enter profil-enter-delay-2">
          <MisiWeeklySummary />
        </div>

        {/* D. Mission List — Content Core */}
        <div className="profil-enter profil-enter-delay-3">
          <MisiList />
        </div>

        {/* E. Completion Summary — Closing Section */}
        <div className="profil-enter profil-enter-delay-4">
          <MisiCompletionSummary />
        </div>
      </div>
    </main>
  )
}

export default ProfilMisiPage
