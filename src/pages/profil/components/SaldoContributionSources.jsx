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
      className="flex flex-col gap-3.5"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2
          id="saldo-sources-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Sumber Saldo Apresiasi
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-xl">
          Alokasi apresiasi dari setiap kategori aksi lingkungan yang tervalidasi.
        </p>
      </div>

      {/* Compact table-like editorial list */}
      <div className="bg-white rounded-xl border border-border-warm divide-y divide-border-warm/70 overflow-hidden shadow-2xs">
        {SALDO_SOURCES.map((source) => {
          const IconComponent = ICON_MAP[source.icon] || CameraIcon
          return (
            <div
              key={source.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-colors duration-150 hover:bg-neutral/40"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <IconComponent
                  className="w-5 h-5 text-primary shrink-0"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {source.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {source.description}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline sm:flex-col sm:items-end gap-1.5 sm:gap-0.5 shrink-0 pl-11 sm:pl-0">
                <span className="text-sm font-bold text-primary tabular-nums">
                  {source.amount}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
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
