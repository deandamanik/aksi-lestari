import { useState } from 'react'
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

  const handleSelectSection = (secId) => {
    setActiveSection(secId)
    const element = document.getElementById(secId)
    if (element) {
      const yOffset = -120 // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
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
