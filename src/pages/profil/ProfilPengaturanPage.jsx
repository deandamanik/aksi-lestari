import { useState } from 'react'
import PengaturanHeader from './components/PengaturanHeader'
import PengaturanInformasiAkun from './components/PengaturanInformasiAkun'
import PengaturanPreferensi from './components/PengaturanPreferensi'
import PengaturanKeamanan from './components/PengaturanKeamanan'
import PengaturanPrivasiData from './components/PengaturanPrivasiData'
import PengaturanBantuan from './components/PengaturanBantuan'
import PengaturanHapusModal from './components/PengaturanHapusModal'
import { useAuth } from '../../hooks/useAuth'
import { DEMO_USER } from '../../context/authContextDef'
import { CheckIcon } from '../../components/common/Icons'

/**
 * ProfilPengaturanPage — Pengaturan Akun Hub
 *
 * Section hierarchy:
 * 1. Editorial Civic Header (Heading + Description)
 * 2. Settings Single-Column Vertical Flow:
 *    - Informasi Akun
 *    - Preferensi
 *    - Keamanan Akun
 *    - Privasi & Data
 *    - Bantuan
 * 3. Delete Confirmation Modal (accessible, destructive flow simulation)
 *
 * Design: calm, civic, mature, clean, functional, low visual noise.
 */
function ProfilPengaturanPage() {
  const { user, updateUserProfile } = useAuth()
  const profile = user || DEMO_USER
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [globalNotice, setGlobalNotice] = useState(null)

  const handleSaveProfile = (updatedFields) => {
    updateUserProfile(updatedFields)
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
    <div className="flex flex-col gap-6 sm:gap-8">
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
            className="text-stone-500 hover:text-stone-800 text-xs cursor-pointer ml-3 p-1 rounded-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Tutup pemberitahuan"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Settings Single-Column Vertical Flow */}
      <div className="profil-enter profil-enter-delay-1 flex flex-col gap-6 sm:gap-8 w-full">
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

      {/* Accessible Confirmation Modal */}
      <PengaturanHapusModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  )
}

export default ProfilPengaturanPage
