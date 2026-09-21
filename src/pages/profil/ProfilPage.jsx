import ProfileHeader from './components/ProfileHeader'
import ProfileSummaryCards from './components/ProfileSummaryCards'
import ProfileActiveMission from './components/ProfileActiveMission'
import ProfileShortcutsGrid from './components/ProfileShortcutsGrid'
import ProfileRecentActivity from './components/ProfileRecentActivity'

/**
 * ProfilPage — Personal Civic Participation Dashboard
 *
 * Visual hierarchy (top → bottom):
 * 1. Profile Header   — primary visual anchor (identity + XP progression)
 * 2. Summary          — secondary metric composition (XP focal + streak + badges)
 * 3. Active Mission   — second visual anchor (prominent CTA)
 * 4. Shortcuts        — elegant navigation list (not dashboard cards)
 * 5. Recent Activity  — timeline feel
 *
 * Design direction: editorial civic dashboard, calm, premium, interactive.
 */
function ProfilPage() {
  return (
    <main
      className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Profil Pengguna AksiLestari"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* A. Profile Header — Primary Visual Anchor */}
        <div className="profil-enter">
          <ProfileHeader />
        </div>

        {/* B. Summary Metrics — XP focal point */}
        <div className="profil-enter profil-enter-delay-1">
          <ProfileSummaryCards />
        </div>

        {/* C. Misi Mingguan Aktif — Second Visual Anchor */}
        <div className="profil-enter profil-enter-delay-2">
          <ProfileActiveMission />
        </div>

        {/* D. Aktivitas & Apresiasi — Navigation System */}
        <div className="profil-enter profil-enter-delay-3">
          <ProfileShortcutsGrid />
        </div>

        {/* E. Aktivitas Terakhir — Timeline */}
        <div className="profil-enter profil-enter-delay-4">
          <ProfileRecentActivity />
        </div>
      </div>
    </main>
  )
}

export default ProfilPage
