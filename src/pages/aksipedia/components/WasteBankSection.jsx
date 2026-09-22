import {
  MapPinIcon,
  RecycleIcon,
  Building2Icon,
  ExternalLinkIcon,
  InfoIcon,
} from '../../../components/common/Icons'
import { WASTE_BANKS_DATA } from '../../../data/aksipedia/wasteBanksData'

function WasteBankSection() {
  const { title, subtitle, items, disclaimer } = WASTE_BANKS_DATA

  return (
    <section className="w-full pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl tracking-tight mb-2">
            {title}
          </h2>
          <p className="font-body text-primary/75 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Bank Sampah List */}
        <div className="flex flex-col gap-4 mb-6">
          {items.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-3xl border border-border-warm p-5 sm:p-6 lg:p-7 shadow-xs hover:border-secondary/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#F4F6F0] border border-border-warm flex items-center justify-center shrink-0 select-none">
                  {bank.iconType === 'recycle' ? (
                    <RecycleIcon className="w-6 h-6 text-primary" />
                  ) : (
                    <Building2Icon className="w-6 h-6 text-primary" />
                  )}
                </div>

                {/* Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h3 className="font-display font-bold text-primary text-base sm:text-lg">
                      {bank.name}
                    </h3>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border select-none ${
                        bank.statusType === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      {bank.status}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 mb-2">
                    <MapPinIcon className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>
                      <strong className="text-primary font-semibold">{bank.distance}</strong> ·{' '}
                      {bank.address}
                    </span>
                  </div>

                  {/* Accepted & Schedule */}
                  <div className="text-xs text-stone-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-stone-700 font-semibold">Menerima: </strong>
                      {bank.acceptedItems}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-stone-700 font-semibold">Buka: </strong>
                      {bank.schedule}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={bank.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-center inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-primary text-xs sm:text-sm font-semibold transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                <ExternalLinkIcon className="w-3.5 h-3.5 text-primary" />
                <span>Buka di Peta</span>
              </a>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-border-warm flex items-start gap-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <InfoIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p>
            <strong className="font-bold text-primary">{disclaimer.title} </strong>
            {disclaimer.content}
          </p>
        </div>
      </div>
    </section>
  )
}

export default WasteBankSection
