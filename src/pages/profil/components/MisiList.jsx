import MisiCard from './MisiCard'
import { WEEKLY_MISSIONS } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiList — Weekly Mission List Section
 *
 * Renders the full list of weekly missions with a section header.
 * Cards use staggered entry animation.
 * Data sourced from weeklyMissionsData — no hardcoded duplicates.
 */
function MisiList() {
  return (
    <section
      aria-labelledby="misi-list-heading"
      className="flex flex-col gap-5"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2
          id="misi-list-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Daftar Misi Minggu Ini
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
          Target kontribusi minggu ini untuk mengumpulkan XP dan menyelesaikan rangkaian aksi nyata.
        </p>
      </div>

      {/* Mission cards */}
      <div className="flex flex-col gap-4">
        {WEEKLY_MISSIONS.map((mission, i) => (
          <MisiCard key={mission.id} mission={mission} index={i} />
        ))}
      </div>
    </section>
  )
}

export default MisiList
