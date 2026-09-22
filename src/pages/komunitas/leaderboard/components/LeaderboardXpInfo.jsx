import { useState } from 'react'
import { ChevronDownIcon } from '../../../../components/common/Icons'
import { XP_RULES_INFO } from '../../../../data/komunitas/leaderboardData'

export default function LeaderboardXpInfo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      aria-label="Informasi Perhitungan XP"
      className="w-full bg-white rounded-2xl sm:rounded-3xl border border-border-warm shadow-2xs overflow-hidden"
    >
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="xp-info-content"
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FAF9F4]/70 transition-colors duration-180 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
      >
        <div className="flex flex-col min-w-0">
          <h3 className="font-display font-bold text-primary text-base sm:text-lg leading-snug">
            Bagaimana XP dihitung?
          </h3>
          <p className="font-body text-stone-500 text-xs sm:text-sm mt-0.5">
            Pelajari acuan poin kontribusi nyata untuk setiap aksi dan aktivitas lingkungan
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-stone-600 hidden sm:inline">
            {isOpen ? 'Tutup' : 'Lihat Rincian'}
          </span>
          <div
            className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? 'rotate-180 bg-[#EAF3EC] text-[#22603B]' : ''
            }`}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Accordion Expandable Content with Smooth CSS Grid Height Transition */}
      <div
        id="xp-info-content"
        role="region"
        aria-hidden={!isOpen}
        className={`grid transition-all duration-200 motion-reduce:transition-none ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 ease-out'
            : 'grid-rows-[0fr] opacity-0 ease-in pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-border-warm/60">
            {/* Editorial Contribution Rows */}
            <div className="divide-y divide-border-warm/60">
              {XP_RULES_INFO.map((rule, idx) => (
                <div
                  key={idx}
                  className="py-3.5 sm:py-4 first:pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-primary text-xs sm:text-sm">
                      {rule.title}
                    </h4>
                    <p className="font-body text-stone-600 text-xs leading-relaxed mt-0.5 sm:mt-1">
                      {rule.desc}
                    </p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <span className="font-display font-bold text-xs sm:text-sm text-[#22603B]">
                      {rule.reward}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightweight Editorial Note */}
            <div className="pt-4 sm:pt-5 mt-2 border-t border-border-warm/60">
              <span className="text-xs font-bold text-primary block mb-1">
                Catatan
              </span>
              <p className="font-body text-xs text-stone-600 leading-relaxed">
                XP mencerminkan level partisipasi dan reputasi kolektif warga dalam gotong royong lingkungan. XP bukan uang dan tidak dapat ditukar menjadi uang tunai. Bentuk apresiasi moneter disalurkan terpisah secara transparan melalui Saldo Apresiasi (Rp) di menu Profil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
