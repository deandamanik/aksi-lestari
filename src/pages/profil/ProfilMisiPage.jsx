import MisiWeeklySummary from './components/MisiWeeklySummary'
import MisiCard from './components/MisiCard'
import MisiAktivitasRingan from './components/MisiAktivitasRingan'
import MisiList from './components/MisiList'
import { WEEKLY_MISSIONS } from '../../data/profil/weeklyMissionsData'

/**
 * ProfilMisiPage — Weekly Mission Workspace
 *
 * Visual hierarchy (focused & action-oriented):
 * 1. Page Header             — Editorial title & supporting context
 * 2. Active Mission Section  — Featured focal challenge with tasks & primary CTA
 * 3. Weekly Summary Overview — Overall cycle progress & status
 * 4. Supporting Activities   — Steps that help complete weekly targets
 * 5. Other Missions          — Lightweight secondary challenges
 */
function ProfilMisiPage() {
  const activeMission = WEEKLY_MISSIONS[0]
  const otherMissions = WEEKLY_MISSIONS.slice(1)

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* 1. Page Heading */}
      <div className="profil-enter flex flex-col gap-1.5">
        <h1 className="font-display text-2xl sm:text-3xl text-stone-900 font-normal tracking-tight leading-tight">
          Misi Minggu Ini
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-xl">
          Pilihan kecil yang kamu lakukan minggu ini membangun kebiasaan lingkungan yang lebih baik.
        </p>
      </div>

      {/* 2. Featured Active Mission */}
      {activeMission && (
        <section aria-label="Misi Aktif Utama" className="profil-enter profil-enter-delay-1 flex flex-col gap-2">
          <MisiCard mission={activeMission} isFeatured={true} index={0} />
        </section>
      )}

      {/* 3. Weekly Summary Overview */}
      <div className="profil-enter profil-enter-delay-2">
        <MisiWeeklySummary />
      </div>

      {/* 4. Aktivitas yang Membantu Menyelesaikan Misi */}
      <div className="profil-enter profil-enter-delay-3">
        <MisiAktivitasRingan />
      </div>

      {/* 5. Misi Lainnya */}
      {otherMissions.length > 0 && (
        <div className="profil-enter profil-enter-delay-4">
          <MisiList missions={otherMissions} />
        </div>
      )}
    </div>
  )
}

export default ProfilMisiPage
