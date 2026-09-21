import { useState } from 'react'
import { ChevronDownIcon, ZapIcon, ShieldCheckIcon } from '../../../../components/common/Icons'
import { XP_RULES_INFO } from '../../../../data/komunitas/leaderboardData'

export default function LeaderboardXpInfo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      aria-label="Informasi Perhitungan XP"
      className="w-full bg-white rounded-3xl border border-border-warm shadow-2xs overflow-hidden transition-all duration-200"
    >
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="xp-info-content"
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FAF9F4]/70 transition-all duration-180 active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF3EC] text-[#22603B] flex items-center justify-center shrink-0 border border-[#D5E8D8]">
            <ZapIcon className="w-5 h-5 text-[#22603B]" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-display font-bold text-primary text-base sm:text-lg leading-snug">
              Bagaimana XP dihitung?
            </h3>
            <p className="font-body text-stone-500 text-xs sm:text-sm mt-0.5 truncate">
              Pelajari acuan poin kontribusi nyata untuk setiap aksi dan verifikasi lingkungan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-stone-600 hidden sm:inline">
            {isOpen ? 'Tutup' : 'Lihat Rincian'}
          </span>
          <div
            className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 bg-[#EAF3EC] text-[#22603B]' : ''
            }`}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Accordion Expandable Content */}
      {isOpen && (
        <div
          id="xp-info-content"
          className="px-5 sm:px-6 pb-6 pt-2 border-t border-border-warm/60 space-y-5 animate-content-rise"
        >
          {/* Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {XP_RULES_INFO.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF9F4] border border-border-warm/80 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="font-bold text-primary text-xs sm:text-sm">
                    {rule.title}
                  </h4>
                  <span className="shrink-0 text-xs font-semibold text-[#22603B]">
                    {rule.reward}
                  </span>
                </div>
                <p className="font-body text-stone-600 text-xs leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Clarification Notice: XP vs Saldo Apresiasi */}
          <div className="p-4 rounded-2xl bg-[#FAF9F4] border border-border-warm flex items-start gap-3 text-xs leading-relaxed text-stone-700">
            <ShieldCheckIcon className="w-5 h-5 text-[#22603B] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-primary block mb-0.5">
                Prinsip Poin XP di AksiLestari
              </strong>
              XP (Experience Points) mencerminkan level partisipasi dan reputasi keaktifan warga dalam gotong royong lingkungan. XP bukan uang dan tidak dapat ditukar menjadi uang tunai. Bentuk apresiasi moneter disalurkan terpisah secara transparan melalui saldo <strong>Saldo Apresiasi (Rp)</strong> di menu Profil.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
