import { NavLink } from 'react-router-dom'
import {
  FileTextIcon,
  ZapIcon,
  CheckCircle2Icon,
  ClockIcon,
  LeafIcon,
} from '../../../components/common/Icons'

const PROFIL_TABS = [
  {
    path: '/profil',
    label: 'Ringkasan',
    icon: LeafIcon,
    end: true,
  },
  {
    path: '/profil/misi',
    label: 'Misi Mingguan',
    icon: ZapIcon,
    end: false,
  },
  {
    path: '/profil/saldo',
    label: 'Saldo & Redeem',
    icon: CheckCircle2Icon,
    end: false,
  },
  {
    path: '/profil/riwayat',
    label: 'Kontribusi & Riwayat',
    icon: ClockIcon,
    end: false,
  },
  {
    path: '/profil/pengaturan',
    label: 'Pengaturan',
    icon: FileTextIcon,
    end: false,
  },
]

function ProfilNavTabs() {
  return (
    <nav
      aria-label="Navigasi Sub-Fitur Profil"
      className="w-full border-b border-[#E8E5DC] overflow-x-auto scrollbar-none"
    >
      <div className="flex items-center gap-1 sm:gap-2 min-w-max">
        {PROFIL_TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 -mb-[1px] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-md ${
                  isActive
                    ? 'text-primary border-primary font-bold bg-white/40'
                    : 'text-stone-500 hover:text-stone-800 border-transparent hover:border-stone-300'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" strokeWidth={2} />
              <span>{tab.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default ProfilNavTabs
