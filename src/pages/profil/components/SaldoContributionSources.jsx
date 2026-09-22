import { CameraIcon, UsersIcon, RecycleIcon } from '../../../components/common/Icons'
import { SALDO_SOURCES } from '../../../data/profil/saldoRedeemData'

/**
 * SaldoContributionSources — How Balance Grows
 *
 * 3-column grid showing contribution sources.
 * Simple cards with icon, title, description, amount.
 */

const ICON_MAP = {
  camera: CameraIcon,
  users: UsersIcon,
  recycle: RecycleIcon,
}

function SaldoContributionSources() {
  return (
    <section
      aria-labelledby="saldo-sources-heading"
      className="flex flex-col gap-4"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1.5">
        <h2
          id="saldo-sources-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Saldo Bertambah Dari Kontribusi Nyata
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
          Platform mengalokasikan saldo apresiasi sebagai bentuk penghargaan terhadap kontribusi warga.
        </p>
      </div>

      {/* Source cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SALDO_SOURCES.map((source) => {
          const IconComponent = ICON_MAP[source.icon] || CameraIcon
          return (
            <div
              key={source.id}
              className="bg-white rounded-2xl border border-[#E8E5DC] p-5 flex flex-col gap-3 transition-colors duration-200 hover:border-stone-300"
            >
              {/* Icon */}
              <div className="text-primary/60" aria-hidden="true">
                <IconComponent className="w-5 h-5" strokeWidth={1.8} />
              </div>

              {/* Title + description */}
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-sm font-bold text-stone-800 leading-snug">
                  {source.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {source.description}
                </p>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-0.5 pt-1">
                <span className="text-sm font-bold text-primary tabular-nums">
                  {source.amount}
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  {source.amountSuffix}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SaldoContributionSources
