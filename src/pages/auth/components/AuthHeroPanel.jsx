import SpinningRings from './SpinningRings'
import FloatingBadge from './FloatingBadge'
import {
  LeafIcon,
  SparklesIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
} from './AuthIcons'

/**
 * AuthHeroPanel
 * Panel visual kiri pada halaman Login & Register.
 * Menampilkan latar belakang gradien Forest Green, cincin konsentris berputar kontinu,
 * dan floating badges berikon SVG yang bergerak naik turun secara halus (smooth float).
 */
export default function AuthHeroPanel({ type = 'register' }) {
  const isRegister = type === 'register'

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl overflow-hidden bg-gradient-to-br from-[#18462B] via-[#22603B] to-[#123620] flex flex-col justify-between p-6 sm:p-10 select-none shadow-inner">
      {/* Ambient background glow layers */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Badges Section (Top & Mid) */}
      <div className="relative z-20 w-full flex flex-col">
        {/* Top-Right Badge */}
        <div className="self-end">
          <FloatingBadge
            icon={isRegister ? LeafIcon : ShieldCheckIcon}
            label={isRegister ? 'Aksi Nyata' : 'Edukasi Mandiri'}
            animationClass="animate-auth-float-1"
          />
        </div>

        {/* Top-Left Badge (Accent) */}
        <div className="self-start mt-4 ml-2">
          <FloatingBadge
            icon={SparklesIcon}
            label={isRegister ? 'Komunitas Lestari' : 'Pelaporan Cepat'}
            variant="accent"
            animationClass="animate-auth-float-2"
          />
        </div>
      </div>

      {/* Centerpiece: Spinning Concentric Dashed Rings & Emblem */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <SpinningRings />

        {/* Mid-Right Floating Badge near Center */}
        <div className="absolute right-0 sm:right-2 bottom-4">
          <FloatingBadge
            icon={MapPinIcon}
            label="Peta Sampah"
            animationClass="animate-auth-float-3"
          />
        </div>
      </div>

      {/* Bottom Floating Info Block */}
      <div className="relative z-20 mt-auto pt-6 animate-auth-float-card">
        {/* Mini Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 border border-amber-300/40 text-amber-200 backdrop-blur-md mb-2">
          <UsersIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>{isRegister ? '+ Relawan Lestari' : '+ Selamat Datang'}</span>
        </div>

        {/* Subtitle */}
        <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">
          {isRegister ? 'Mulai perjalananmu' : 'Lanjutkan kontribusimu'}
        </p>

        {/* Headline Description */}
        <h2 className="mt-1 text-white font-bold text-base sm:text-lg lg:text-xl leading-snug tracking-tight max-w-sm drop-shadow-sm">
          {isRegister
            ? 'Dapatkan akses ke ekosistem pelestarian lingkungan dan aksi nyata AksiLestari'
            : 'Pantau laporan penanganan sampah dan aksi komunitasmu secara realtime'}
        </h2>
      </div>
    </div>
  )
}
