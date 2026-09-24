import ProfileActiveMission from './components/ProfileActiveMission'
import ProfileRecentActivity from './components/ProfileRecentActivity'
import ProfileRecentAchievements from './components/ProfileRecentAchievements'

/**
 * ProfilPage — Personal Overview Workspace Content
 *
 * Rendered within the right workspace area under the "Ringkasan" tab.
 * Information hierarchy:
 * 1. Editorial Header      — "Perjalanan Kontribusimu"
 * 2. Featured Active Mission — Primary focal point with progress & CTA
 * 3. Recent Activity Stream  — Open timeline of recent contributions
 * 4. Recent Achievements     — Lightweight civic badges
 */
function ProfilPage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* 1. Page Intro / Editorial Header */}
      <div className="profil-enter flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight leading-tight">
          Perjalanan Kontribusimu
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl">
          Lihat progres, aksi terbaru, dan hal yang bisa kamu lanjutkan hari ini.
        </p>
      </div>

      {/* 2. Featured Active Mission — Primary Workspace Action Point */}
      <div className="profil-enter profil-enter-delay-1">
        <ProfileActiveMission />
      </div>

      {/* 3. Recent Activity Stream — Open Timeline */}
      <div className="profil-enter profil-enter-delay-2">
        <ProfileRecentActivity />
      </div>

      {/* 4. Recent Achievements — Lightweight Civic Badges */}
      <div className="profil-enter profil-enter-delay-3">
        <ProfileRecentAchievements />
      </div>
    </div>
  )
}

export default ProfilPage
