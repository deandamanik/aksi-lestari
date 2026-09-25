import AuthHeroPanel from './AuthHeroPanel'

/**
 * AuthCardWrapper
 * Layout wrapper untuk halaman Login & Register.
 * Menampilkan background ambient lembut dan card dua kolom (panel visual di kiri, form di kanan).
 */
export default function AuthCardWrapper({
  type = 'register',
  hideHeroOnMobile = type === 'login',
  children,
}) {
  return (
    <div className="relative min-h-screen w-full bg-neutral flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Ambient background glows */}
      <div
        className="fixed -top-40 -left-40 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/2 -right-40 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 left-1/3 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Card Container */}
      <div
        className={`relative z-10 w-full ${
          hideHeroOnMobile ? 'max-w-md md:max-w-[960px]' : 'max-w-[960px]'
        } bg-white rounded-3xl sm:rounded-[32px] shadow-[0_24px_70px_-15px_rgba(24,67,41,0.12)] border border-gray-100/90 overflow-hidden grid grid-cols-1 lg:grid-cols-2`}
      >
        {/* Left Section: Visual Hero Panel with Rotating Dashed Circles & Floating Badges */}
        <div className={hideHeroOnMobile ? 'hidden md:block w-full h-full' : 'w-full h-full'}>
          <AuthHeroPanel type={type} />
        </div>

        {/* Right Section: Form Content */}
        <div className="w-full h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white">
          {children}
        </div>
      </div>

      {/* Bottom Footer Copyright / Tagline */}
      <div className="mt-6 text-center text-xs text-gray-500 z-10 select-none">
        &copy; {new Date().getFullYear()} AksiLestari — Platform Kolaboratif Pelestarian Lingkungan
      </div>
    </div>
  )
}
