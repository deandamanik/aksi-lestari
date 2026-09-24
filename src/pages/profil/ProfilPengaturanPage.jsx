import { useState, useEffect, useRef, useCallback } from 'react'
import PengaturanHeader from './components/PengaturanHeader'
import PengaturanNav from './components/PengaturanNav'
import PengaturanInformasiAkun from './components/PengaturanInformasiAkun'
import PengaturanPreferensi from './components/PengaturanPreferensi'
import PengaturanKeamanan from './components/PengaturanKeamanan'
import PengaturanPrivasiData from './components/PengaturanPrivasiData'
import PengaturanBantuan from './components/PengaturanBantuan'
import PengaturanHapusModal from './components/PengaturanHapusModal'
import { USER_PROFILE } from '../../data/profil/userProfileData'
import { CheckIcon } from '../../components/common/Icons'

const SETTINGS_SECTION_IDS = [
  'informasi',
  'preferensi',
  'keamanan',
  'privasi',
  'bantuan',
]

/**
 * ProfilPengaturanPage — Pengaturan Akun Hub
 *
 * Section hierarchy:
 * 1. Editorial Civic Header (Back nav + Breadcrumb + Eyebrow + Heading + Description)
 * 2. Two-column Settings Layout:
 *    - Left: Sticky Settings Navigation (Informasi, Preferensi, Keamanan, Privasi, Bantuan)
 *    - Right: Modular Settings Sections
 * 3. Delete Confirmation Modal (accessible, destructive flow simulation)
 *
 * Design: calm, civic, mature, clean, functional, low visual noise.
 */
function ProfilPengaturanPage() {
  const [profile, setProfile] = useState(USER_PROFILE)
  const [activeSection, setActiveSection] = useState('informasi')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [globalNotice, setGlobalNotice] = useState(null)

  const isProgrammaticScrollRef = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const visibleEntriesRef = useRef(new Map())

  // Resolves the single most prominent section in the reading zone
  const resolveActiveSection = useCallback(() => {
    let bestId = null
    let maxVisibleHeight = -1

    SETTINGS_SECTION_IDS.forEach((id) => {
      const entry = visibleEntriesRef.current.get(id)
      if (entry) {
        const height = entry.intersectionRect ? entry.intersectionRect.height : 0
        if (height > maxVisibleHeight) {
          maxVisibleHeight = height
          bestId = id
        }
      }
    })

    if (bestId) {
      setActiveSection((prev) => (prev === bestId ? prev : bestId))
    }
  }, [])

  const unlockProgrammaticScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
    isProgrammaticScrollRef.current = false
    resolveActiveSection()
  }, [resolveActiveSection])

  // Setup IntersectionObserver for visibility-driven scroll-spy
  useEffect(() => {
    const visibleEntries = visibleEntriesRef.current

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleEntries.set(entry.target.id, entry)
        } else {
          visibleEntries.delete(entry.target.id)
        }
      })

      // Skip dynamic updates during smooth programmatic scrolling to avoid flicker
      if (!isProgrammaticScrollRef.current) {
        resolveActiveSection()
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport
      // -110px accounts for top sticky navbar/header offset
      // -40% bounds reading focus to the upper 60% of the screen
      rootMargin: '-110px 0px -40% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    })

    SETTINGS_SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      visibleEntries.clear()
    }
  }, [resolveActiveSection])

  // Reset programmatic scroll lock if user takes over with mouse wheel or touch
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isProgrammaticScrollRef.current) {
        unlockProgrammaticScroll()
      }
    }

    window.addEventListener('wheel', handleUserInterrupt, { passive: true })
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt)
      window.removeEventListener('touchstart', handleUserInterrupt)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [unlockProgrammaticScroll])

  const handleSelectSection = (secId) => {
    const element = document.getElementById(secId)
    if (!element) return

    setActiveSection(secId)

    const yOffset = -120 // Header offset
    const targetY = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    const currentY = window.pageYOffset

    // If already at target position, no scroll needed
    if (Math.abs(currentY - targetY) < 5) {
      return
    }

    isProgrammaticScrollRef.current = true
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })

    if (prefersReducedMotion) {
      isProgrammaticScrollRef.current = false
    } else {
      const handleScrollEnd = () => {
        window.removeEventListener('scrollend', handleScrollEnd)
        unlockProgrammaticScroll()
      }

      window.addEventListener('scrollend', handleScrollEnd, { once: true })
      // Fallback timeout in case scrollend does not fire or is delayed
      scrollTimeoutRef.current = setTimeout(handleScrollEnd, 800)
    }
  }

  const handleSaveProfile = (updatedFields) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }))
  }

  const handleDownloadData = () => {
    // Generate clean JSON export of user profile
    const exportData = {
      profil: {
        id: profile.id,
        name: profile.name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        joinDate: profile.joinDate,
        bio: profile.bio,
        currentLevel: profile.currentLevel,
        currentXP: profile.currentXP,
      },
      tanggalEkspor: new Date().toISOString(),
      sumber: 'AksiLestari Platform Relawan',
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data-aksilestari-${profile.username || 'relawan'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setGlobalNotice('Berkas data profil berhasil diekspor dan diunduh ke perangkatmu.')
    setTimeout(() => setGlobalNotice(null), 4000)
  }

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false)
    setGlobalNotice('Simulasi penghapusan akun prototipe berhasil dicatat.')
    setTimeout(() => setGlobalNotice(null), 4000)
  }

  return (
    <main
      className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Halaman Pengaturan Akun AksiLestari"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* 1. Header */}
        <div className="profil-enter">
          <PengaturanHeader />
        </div>

        {/* Global Notice Banner */}
        {globalNotice && (
          <div
            role="status"
            className="p-4 rounded-xl bg-white border border-primary/30 text-primary text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              <span>{globalNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setGlobalNotice(null)}
              className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer ml-3"
            >
              ✕
            </button>
          </div>
        )}

        {/* 2. Settings Layout: Left Nav + Right Sections */}
        <div className="profil-enter profil-enter-delay-1 flex flex-col md:flex-row items-start gap-6 sm:gap-8">
          {/* Left Navigation Column */}
          <aside className="w-full md:w-60 lg:w-64 shrink-0 md:sticky md:top-28">
            <PengaturanNav
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
            />
          </aside>

          {/* Right Content Column */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 sm:gap-8 w-full">
            {/* Section 1: Informasi Akun (Primary) */}
            <PengaturanInformasiAkun
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />

            {/* Section 2: Preferensi (Secondary) */}
            <PengaturanPreferensi />

            {/* Section 3: Keamanan Akun (Secondary) */}
            <PengaturanKeamanan />

            {/* Section 4: Privasi & Data (Secondary) */}
            <PengaturanPrivasiData
              onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
              onDownloadData={handleDownloadData}
            />

            {/* Section 5: Bantuan (Compact) */}
            <PengaturanBantuan />
          </div>
        </div>
      </div>

      {/* Accessible Confirmation Modal */}
      <PengaturanHapusModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </main>
  )
}

export default ProfilPengaturanPage
