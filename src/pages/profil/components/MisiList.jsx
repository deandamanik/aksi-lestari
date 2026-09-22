import MisiCard from './MisiCard'
import { WEEKLY_MISSIONS, CURRENT_WEEK_METADATA } from '../../../data/profil/weeklyMissionsData'
import { CalendarIcon } from '../../../components/common/Icons'

/**
 * MisiList — Weekly Mission Cards Section
 *
 * 2-column grid on desktop (lg), single column on mobile/tablet.
 * Section heading: "Misi Minggu Ini" + subtitle + period label.
 * Data from weeklyMissionsData — no hardcoded duplicates.
 */
function MisiList() {
  return (
    <section
      aria-labelledby="misi-list-heading"
      className="flex flex-col gap-5"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h2
            id="misi-list-heading"
            className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Misi Minggu Ini
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
            Tantangan berjangka yang memberi ruang lebih luas untuk aksi nyata yang terpadu.
          </p>
        </div>

        {/* Period label */}
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-400 shrink-0 select-none">
          <CalendarIcon className="w-3.5 h-3.5 opacity-60" strokeWidth={1.8} />
          <span>Periode: {CURRENT_WEEK_METADATA.cycleRange}</span>
        </div>
      </div>

      {/* Mission cards — 2-column grid on lg, single column below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {WEEKLY_MISSIONS.map((mission, i) => (
          <MisiCard key={mission.id} mission={mission} index={i} />
        ))}
      </div>
    </section>
  )
}

export default MisiList
