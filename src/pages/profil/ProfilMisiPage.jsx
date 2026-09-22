import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../components/common/Icons'
import MisiWeeklySummary from './components/MisiWeeklySummary'
import MisiAktivitasRingan from './components/MisiAktivitasRingan'
import MisiList from './components/MisiList'
import MisiCompletionSummary from './components/MisiCompletionSummary'

/**
 * ProfilMisiPage — Weekly Mission Hub
 *
 * Section order (matching reference layout):
 * 1. Back navigation  — ← Kembali ke Profil
 * 2. Breadcrumb       — PROFIL / MISI & TANTANGAN (desktop only)
 * 3. Page heading     — PROFIL eyebrow + "Misi" heading + subtitle
 * 4. Weekly Summary   — progress, status, XP
 * 5. Aktivitas Kontribusi Ringan — light activities (NOT daily missions)
 * 6. Misi Minggu Ini  — 2-column mission cards
 * 7. Contribution Callout — link to riwayat
 *
 * Design: clean, editorial, calm, premium. Typography-driven.
 * Weekly missions only — no daily mechanics.
 */
function ProfilMisiPage() {
  return (
    <main
      className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Halaman Misi Mingguan AksiLestari"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* 1. Back navigation + 2. Breadcrumb */}
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
            <span className="text-stone-500">MISI &amp; TANTANGAN</span>
          </nav>
        </div>

        {/* 3. Page heading */}
        <div className="profil-enter profil-enter-delay-1 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
            Profil
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-stone-900 font-bold tracking-tight leading-tight">
            Misi
          </h1>
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl mt-1">
            Capai target kontribusi minggu ini dan terus bergerak untuk lingkungan yang lebih baik.
          </p>
        </div>

        {/* 4. Weekly Summary */}
        <div className="profil-enter profil-enter-delay-2">
          <MisiWeeklySummary />
        </div>

        {/* 5. Aktivitas Kontribusi Ringan */}
        <div className="profil-enter profil-enter-delay-3">
          <MisiAktivitasRingan />
        </div>

        {/* 6. Misi Minggu Ini — Mission Cards */}
        <div className="profil-enter profil-enter-delay-4">
          <MisiList />
        </div>

        {/* 7. Contribution Callout */}
        <div className="profil-enter profil-enter-delay-5">
          <MisiCompletionSummary />
        </div>
      </div>
    </main>
  )
}

export default ProfilMisiPage
