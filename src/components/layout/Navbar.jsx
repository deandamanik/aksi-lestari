import { useState, useLayoutEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'
import { ZapIcon, UserIcon } from '../common/Icons'

const NAV_ITEMS = [
  { name: 'Beranda', path: '/' },
  { name: 'Lapor', path: '/lapor' },
  { name: 'AksiPedia', path: '/aksipedia' },
  { name: 'Peta Sampah', path: '/peta-sampah' },
  { name: 'Komunitas', path: '/komunitas' },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navContainerRef = useRef(null)
  const itemRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  })
  const [hasInitialized, setHasInitialized] = useState(false)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = navContainerRef.current
      const activeItem = NAV_ITEMS.find((item) =>
        item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path)
      )

      const activeEl = activeItem ? itemRefs.current[activeItem.path] : null

      if (container && activeEl) {
        const containerRect = container.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()

        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          top: activeRect.top - containerRect.top,
          width: activeRect.width,
          height: activeRect.height,
          opacity: 1,
        })

        if (!hasInitialized) {
          requestAnimationFrame(() => setHasInitialized(true))
        }
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      }
    }

    updateIndicator()

    window.addEventListener('resize', updateIndicator)
    document.fonts?.ready?.then(updateIndicator)

    return () => {
      window.removeEventListener('resize', updateIndicator)
    }
  }, [location.pathname, hasInitialized])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full pt-3.5 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-[1240px] mx-auto pointer-events-auto">
        <nav
          className="w-full flex items-center justify-between px-5 sm:px-7 py-2 rounded-full bg-white border border-border-warm shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          aria-label="Navigasi Utama"
        >
          {/* Left: Logo */}
          <div className="flex items-center justify-start shrink-0 min-w-[150px]">
            <Link
              to="/"
              className="flex items-center gap-2.5 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="AksiLestari Beranda"
            >
              <img
                src={logoAksiLestari}
                alt="Logo AksiLestari"
                className="h-7 w-auto object-contain"
              />
              <span className="font-display font-bold text-lg sm:text-xl text-primary tracking-tight">
                AksiLestari
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation with Shared Sliding Active Pill */}
          <div
            ref={navContainerRef}
            className="relative hidden md:flex items-center justify-center gap-1"
          >
            {/* Shared sliding active green background indicator */}
            <div
              className="absolute top-0 left-0 bg-primary rounded-full pointer-events-none shadow-xs"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                width: `${indicatorStyle.width}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
                transition: hasInitialized
                  ? 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1), width 320ms cubic-bezier(0.25, 1, 0.5, 1), opacity 200ms ease'
                  : 'none',
              }}
              aria-hidden="true"
            />

            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  ref={(el) => {
                    if (el) itemRefs.current[item.path] = el
                  }}
                  className={`group relative z-10 inline-flex items-center justify-center h-8.5 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm transition-colors duration-200 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-primary/90 hover:text-primary font-semibold'
                  }`}
                >
                  <span className="relative inline-block py-0.5">
                    {item.name}
                  </span>
                </NavLink>
              )
            })}
          </div>

          {/* Right: XP badge, Masuk, and User Profile Avatar */}
          <div className="flex items-center justify-end shrink-0 min-w-[150px] gap-3">
            <div className="hidden md:flex items-center gap-3">
              {/* XP Indicator Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF6E6] border border-[#FDE68A] text-[#B45309] font-bold text-xs shadow-2xs select-none">
                <ZapIcon className="w-3.5 h-3.5 text-accent fill-accent" />
                <span>120 XP</span>
              </div>

              {/* Masuk link */}
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors px-1"
              >
                Masuk
              </Link>

              {/* Profile Avatar Circle */}
              <Link
                to="/profil"
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Profil Pengguna"
              >
                <UserIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-black/[0.04] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-border-warm shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center h-10 px-4 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-bold'
                      : 'text-primary hover:bg-black/[0.03]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-border-warm flex items-center justify-between gap-2 px-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF6E6] border border-[#FDE68A] text-[#B45309] font-bold text-xs">
                <ZapIcon className="w-3.5 h-3.5 text-accent fill-accent" />
                <span>120 XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-primary px-2 py-1"
                >
                  Masuk
                </Link>
                <Link
                  to="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"
                >
                  <UserIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
