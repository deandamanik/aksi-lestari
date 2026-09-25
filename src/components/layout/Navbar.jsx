import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'

const NAV_ITEMS = [
  { name: 'Beranda', path: '/' },
  { name: 'Lapor', path: '/lapor' },
  { name: 'AksiPedia', path: '/aksipedia' },
  { name: 'Peta Sampah', path: '/peta-sampah' },
  { name: 'Komunitas', path: '/komunitas' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  const isPetaRoute = location.pathname.startsWith('/peta-sampah')
  const isFloating = isPetaRoute || isScrolled

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header className="fixed top-0 left-0 right-0 z-40 w-full pt-4 sm:pt-4.5 pb-2 px-4 sm:px-6 lg:px-10 pointer-events-none">
      <div className="max-w-[1400px] mx-auto pointer-events-auto">
        <nav
          className={`w-full flex items-center justify-between px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl transition-all duration-300 ${
            isFloating
              ? 'bg-white/40 backdrop-blur-xl border border-border-warm/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
              : 'bg-transparent border border-transparent shadow-none'
          }`}
          aria-label="Navigasi Utama"
        >
          {/* Left: Logo */}
          <div className="flex items-center justify-start shrink-0 min-w-[180px]">
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="AksiLestari Beranda"
            >
              <img
                src={logoAksiLestari}
                alt="Logo AksiLestari"
                className="h-7.5 sm:h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-primary tracking-tight">
                AksiLestari
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation with Shared Sliding Active Pill & Animated Underlines */}
          <div
            ref={navContainerRef}
            className="relative hidden md:flex items-center justify-center gap-1 sm:gap-1.5"
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
                  className={`group relative z-10 inline-flex items-center justify-center h-9 px-3.5 sm:px-4 rounded-full text-sm transition-colors duration-200 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-primary hover:text-primary font-semibold'
                  }`}
                >
                  <span className="relative inline-block py-0.5">
                    {item.name}

                    {/* Underline enters left-to-right, retracts right-to-left with consistent thickness */}
                    {!isActive && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left scale-x-0 transition-transform duration-250 ease-out group-hover:scale-x-100 transform-gpu pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </NavLink>
              )
            })}
          </div>

          {/* Right: Desktop Auth Buttons & Mobile Toggle */}
          <div className="flex items-center justify-end shrink-0 min-w-[180px] gap-2.5">
            <div className="hidden md:flex items-center gap-2.5">
              {isAuthenticated ? (
                <Link
                  to="/profil"
                  className="group flex items-center gap-2.5 py-1 px-2.5 rounded-full hover:bg-black/[0.04] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Buka profil ${user?.name || 'relawan'}`}
                >
                  <div className="w-7 h-7 rounded-full bg-neutral border border-border-warm text-primary flex items-center justify-center text-xs font-bold font-display select-none">
                    {user?.name ? user.name.trim().charAt(0).toUpperCase() : 'I'}
                  </div>
                  <span className="text-sm font-semibold text-stone-700 group-hover:text-primary transition-colors max-w-[120px] truncate">
                    {user?.name || 'Profil'}
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-semibold border border-primary text-primary hover:bg-primary/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center h-9 px-5 rounded-full text-sm font-semibold bg-accent text-white hover:opacity-95 shadow-xs transition-opacity focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Register
                  </Link>
                </>
              )}
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
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-border-warm/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
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
            <div className="pt-3 mt-2 border-t border-border-warm/60 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-black/[0.03] text-stone-800 text-sm font-semibold transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-neutral border border-border-warm text-primary flex items-center justify-center text-xs font-bold font-display select-none">
                    {user?.name ? user.name.trim().charAt(0).toUpperCase() : 'I'}
                  </div>
                  <span className="font-semibold text-stone-800">{user?.name || 'Profil'}</span>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center h-10 rounded-full text-sm font-semibold border border-primary text-primary hover:bg-primary/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center h-10 rounded-full text-sm font-semibold bg-accent text-white hover:opacity-95 shadow-xs transition-opacity"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
