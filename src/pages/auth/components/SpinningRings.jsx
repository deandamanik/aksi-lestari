import logoAksiLestari from '../../../assets/logo-aksilestari.svg'

/**
 * SpinningRings
 * Menampilkan lingkaran konsentris putus-putus yang berputar secara terus menerus (continuous rotation)
 * di sekeliling logo AksiLestari dengan efek glow dan frosted glass.
 */
export default function SpinningRings() {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center pointer-events-none select-none">
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl animate-auth-glow"
        aria-hidden="true"
      />

      {/* Outermost Dashed Ring — Clockwise slow spin */}
      <div
        className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full border border-dashed border-white/30 animate-auth-spin-slow"
        style={{
          borderDasharray: '6 8',
        }}
        aria-hidden="true"
      />

      {/* Middle Dashed Ring — Counter-clockwise smooth spin */}
      <div
        className="absolute w-48 h-48 sm:w-54 sm:h-54 rounded-full border border-dashed border-white/40 animate-auth-spin-reverse"
        style={{
          borderDasharray: '4 6',
        }}
        aria-hidden="true"
      />

      {/* Inner Subtle Dotted Ring — Clockwise accent spin */}
      <div
        className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-dotted border-white/35 animate-auth-spin-slow"
        aria-hidden="true"
      />

      {/* Center Frosted Glass Orb */}
      <div className="relative z-10 w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.18),0_0_24px_rgba(255,255,255,0.3)] flex items-center justify-center p-4 transition-transform duration-300">
        {/* Soft inner radial gradient */}
        <div className="absolute inset-0 rounded-full bg-radial from-white/30 via-transparent to-transparent pointer-events-none" />

        {/* Center Logo */}
        <img
          src={logoAksiLestari}
          alt="AksiLestari Center Emblem"
          className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  )
}
