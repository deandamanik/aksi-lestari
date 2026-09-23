import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/common/Icons'

/**
 * RiwayatHeader — Editorial Civic Header
 *
 * Back link to /profil, desktop breadcrumb, subtle eyebrow,
 * dominant typography heading (Quando), and descriptive subtitle.
 * Designed with ample whitespace and low visual noise.
 */
function RiwayatHeader() {
  return (
    <header className="flex flex-col gap-6 sm:gap-7">
      {/* Back navigation + Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
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
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-stone-400 select-none tracking-wide"
        >
          <span>PROFIL</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-500 font-semibold">KONTRIBUSI &amp; RIWAYAT</span>
        </nav>
      </div>

      {/* Title & Editorial Description */}
      <div className="flex flex-col gap-2.5">
        {/* Subtle Eyebrow — anti-AI-slop (no giant pill) */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-[11px] font-bold text-primary tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            Rekam Jejak Sipil
          </span>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <span className="text-xs text-stone-400 font-medium">Partisipasi Tervalidasi</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-stone-900 font-bold tracking-tight leading-tight">
          Kontribusi &amp; Riwayat
        </h1>

        <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-2xl mt-0.5">
          Lihat kembali setiap langkah nyata yang sudah kamu lakukan untuk menjaga kelestarian lingkungan dan tata kelola ruang hidup bersama.
        </p>
      </div>
    </header>
  )
}

export default RiwayatHeader
