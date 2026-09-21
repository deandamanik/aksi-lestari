import { Link } from 'react-router-dom'
import {
  ZapIcon,
  ClockIcon,
  WalletIcon,
  SettingsIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'
import { SALDO_APRESIASI } from '../../../data/profil/saldoRedeemData'
import { CONTRIBUTION_HISTORY } from '../../../data/profil/contributionHistoryData'

/**
 * ProfileShortcutsGrid — Navigation System
 *
 * Feels like elegant navigation links, NOT dashboard statistic cards.
 * Each item has: icon (subtle) → title → metadata → description → arrow.
 * Interactions: warm hover background, arrow slides, title greens.
 * 2-column on desktop for visual balance, single column on mobile.
 */
function ProfileShortcutsGrid() {
  const verifiedCount = CONTRIBUTION_HISTORY.filter((c) => c.status === 'verified').length

  const SHORTCUTS = [
    {
      id: 'misi',
      title: 'Misi',
      metadata: '1 tersedia',
      metadataColor: 'text-primary',
      description: 'Lihat target tantangan dan misi mingguan',
      path: '/profil/misi',
      icon: ZapIcon,
    },
    {
      id: 'riwayat',
      title: 'Kontribusi & Riwayat',
      metadata: `${verifiedCount} aksi tervalidasi`,
      metadataColor: 'text-stone-500',
      description: 'Lihat aktivitas dan kontribusi yang sudah tercatat',
      path: '/profil/riwayat',
      icon: ClockIcon,
    },
    {
      id: 'saldo',
      title: 'Saldo & Redeem',
      metadata: SALDO_APRESIASI.formattedBalance,
      metadataColor: 'text-primary',
      description: 'Kelola saldo apresiasi dan katalog reward',
      path: '/profil/saldo',
      icon: WalletIcon,
    },
    {
      id: 'pengaturan',
      title: 'Pengaturan Akun',
      metadata: null,
      metadataColor: '',
      description: 'Informasi profil dan preferensi akun',
      path: '/profil/pengaturan',
      icon: SettingsIcon,
    },
  ]

  return (
    <section aria-labelledby="shortcuts-heading" className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <h2
          id="shortcuts-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Aktivitas &amp; Apresiasi
        </h2>
        <p className="text-sm text-stone-500">
          Akses cepat menuju fitur pengelolaan profil dan kontribusi.
        </p>
      </div>

      {/* Navigation Grid — 2 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E5DC] rounded-2xl overflow-hidden border border-[#E8E5DC]">
        {SHORTCUTS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              to={item.path}
              className="group bg-white p-5 sm:p-6 flex items-center justify-between gap-4 transition-all duration-200 select-none hover:bg-[#FAF9F4]/80 active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              aria-label={`Buka ${item.title}`}
            >
              {/* Left: Icon + Text */}
              <div className="flex items-start gap-4 min-w-0">
                <Icon
                  className="w-5 h-5 text-stone-400 shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-primary"
                  strokeWidth={1.8}
                />

                <div className="flex flex-col min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-base text-stone-900 transition-colors duration-200 group-hover:text-primary">
                      {item.title}
                    </span>
                    {item.metadata && (
                      <span className={`text-xs font-semibold select-none ${item.metadataColor}`}>
                        {item.metadata}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right: Arrow — slides on hover */}
              <div className="text-stone-300 group-hover:text-primary shrink-0 transition-colors duration-200" aria-hidden="true">
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default ProfileShortcutsGrid
