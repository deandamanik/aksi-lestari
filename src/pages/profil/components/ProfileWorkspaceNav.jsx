import { useState, useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const PRIMARY_TABS = [
  { path: '/profil', label: 'Ringkasan', end: true },
  { path: '/profil/misi', label: 'Misi', end: false },
  { path: '/profil/riwayat', label: 'Kontribusi & Riwayat', end: false },
  { path: '/profil/saldo', label: 'Saldo & Redeem', end: false },
]

/**
 * ProfileWorkspaceNav — Editorial Workspace Top Navigation
 *
 * Sits directly above the active workspace content area.
 * Primary tabs: Ringkasan, Misi, Kontribusi & Riwayat, Saldo & Redeem.
 * Route-based active indicator with smooth horizontal transition.
 */
function ProfileWorkspaceNav() {
  const location = useLocation()
  const navContainerRef = useRef(null)
  const itemRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const [hasInitialized, setHasInitialized] = useState(false)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = navContainerRef.current
      // Route is the single source of truth for active tab
      const activeTab = PRIMARY_TABS.find((tab) =>
        tab.end
          ? location.pathname === tab.path
          : location.pathname === tab.path || location.pathname.startsWith(tab.path + '/')
      )

      const activeEl = activeTab ? itemRefs.current[activeTab.path] : null

      if (container && activeEl) {
        const containerRect = container.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()

        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
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

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <nav
      aria-label="Navigasi Profile Workspace"
      className="w-full border-b border-border-warm overflow-x-auto scrollbar-none"
    >
      {/* Primary Workspace Navigation Tabs */}
      <div
        ref={navContainerRef}
        className="relative flex items-center gap-1 sm:gap-2 -mb-px min-w-max"
      >
        {/* Shared Smooth Sliding Active Underline Indicator */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full pointer-events-none"
          style={{
            transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
            transition: prefersReducedMotion || !hasInitialized
              ? 'none'
              : 'transform 220ms ease-out, width 220ms ease-out, opacity 150ms ease',
          }}
          aria-hidden="true"
        />

        {PRIMARY_TABS.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            ref={(el) => {
              if (el) itemRefs.current[tab.path] = el
            }}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold transition-colors duration-150 border-b-2 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm cursor-pointer ${
                isActive
                  ? 'text-primary border-transparent font-bold'
                  : 'text-stone-500 hover:text-stone-900 border-transparent hover:border-stone-300/40'
              }`
            }
          >
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default ProfileWorkspaceNav
