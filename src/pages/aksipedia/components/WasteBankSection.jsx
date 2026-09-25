import {
  MapPinIcon,
  ArrowRightIcon,
  InfoIcon,
} from '../../../components/common/Icons'
import { WASTE_BANKS_DATA } from '../../../data/aksipedia/wasteBanksData'

function WasteBankSection() {
  const { title, subtitle, items, disclaimer } = WASTE_BANKS_DATA

  return (
    <section className="w-full pb-8 sm:pb-10" aria-label="Destinasi Penyaluran Bank Sampah">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — No Eyebrow */}
        <div className="mb-5">
          <h2 className="font-display font-bold text-primary text-xl sm:text-2xl tracking-tight mb-1.5">
            {title}
          </h2>
          <p className="font-body text-primary/75 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Kalau tidak ingin mengelola sendiri, ke mana benda ini bisa dibawa? {subtitle}
          </p>
        </div>

        {/* ONE Cohesive Location List Container */}
        <div className="rounded-2xl border border-border-warm bg-white divide-y divide-border-warm/70 shadow-2xs overflow-hidden mb-3">
          {items.map((bank) => (
            <div
              key={bank.id}
              className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/40 transition-colors"
            >
              {/* Location Details */}
              <div className="min-w-0">
                <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-1.5">
                  {bank.name}
                </h3>

                {/* Distance & Address */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 mb-1.5">
                  <MapPinIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>
                    <strong className="text-primary font-semibold">{bank.distance}</strong> · {bank.address}
                  </span>
                </div>

                {/* Accepted Materials & Schedule (Natural metadata, no badges) */}
                <div className="text-xs text-stone-500 flex flex-wrap gap-x-3 gap-y-1">
                  <span>
                    <strong className="text-stone-700 font-semibold">Menerima: </strong>
                    {bank.acceptedItems}
                  </span>
                  <span className="text-stone-300" aria-hidden="true">•</span>
                  <span>
                    <strong className="text-stone-700 font-semibold">Buka: </strong>
                    {bank.schedule}
                  </span>
                </div>
              </div>

              {/* Action Link: Buka di Peta (Secondary outline action) */}
              <a
                href={bank.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-center inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-primary/25 bg-white hover:bg-primary/[0.04] hover:border-primary/45 text-primary text-xs sm:text-sm font-semibold transition-colors shadow-2xs shrink-0 cursor-pointer select-none"
              >
                <span>Buka di Peta</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-primary" strokeWidth={2.25} />
              </a>
            </div>
          ))}
        </div>

        {/* Supporting Service Notice (Uncontained Footnote) */}
        <div className="flex items-start gap-2 pt-1 px-1 text-xs text-stone-500 leading-relaxed select-none">
          <InfoIcon className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-stone-600">{disclaimer.title} </strong>
            {disclaimer.content}
          </p>
        </div>
      </div>
    </section>
  )
}

export default WasteBankSection
