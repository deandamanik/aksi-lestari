import {
  UserIcon,
  BellIcon,
  ShieldIcon,
  LockIcon,
  HelpCircleIcon,
} from '../../../components/common/Icons'

const SETTINGS_SECTIONS = [
  { id: 'informasi', label: 'Informasi Akun', icon: UserIcon },
  { id: 'preferensi', label: 'Preferensi', icon: BellIcon },
  { id: 'keamanan', label: 'Keamanan Akun', icon: ShieldIcon },
  { id: 'privasi', label: 'Privasi & Data', icon: LockIcon },
  { id: 'bantuan', label: 'Bantuan', icon: HelpCircleIcon },
]

function PengaturanNav({ activeSection, onSelectSection }) {
  return (
    <nav
      aria-label="Navigasi Pengaturan Akun"
      className="w-full bg-white rounded-2xl border border-[#E8E5DC] p-2 sm:p-2.5 shadow-2xs"
    >
      {/* Desktop: vertical list; Mobile: horizontal scroll */}
      <div className="flex flex-row md:flex-col gap-1 overflow-x-auto scrollbar-none">
        {SETTINGS_SECTIONS.map((sec) => {
          const Icon = sec.icon
          const isActive = activeSection === sec.id

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-[#FAF9F4]'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-stone-400 group-hover:text-stone-700'
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{sec.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default PengaturanNav
