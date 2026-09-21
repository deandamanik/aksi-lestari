import { TargetIcon } from '../../../components/common/Icons'

export default function CommunityBreadcrumb({ totalActiveActions = 14 }) {
  return (
    <nav aria-label="Breadcrumb dan status wilayah" className="pt-20 sm:pt-22 pb-2 sm:pb-3">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left: Breadcrumb context */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-[11px] font-bold tracking-widest text-[#22603B] uppercase font-body">
              KOMUNITAS
            </span>
            <span className="text-stone-300 font-light select-none">/</span>
            <span className="text-stone-500 font-medium">
              Hub Aksi Kewargaan
            </span>
          </div>

          {/* Right: Active actions count badge */}
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 self-start sm:self-auto">
            <TargetIcon className="w-3.5 h-3.5 text-[#22603B]" />
            <span>
              <strong className="text-stone-700 font-semibold">{totalActiveActions} Aksi Aktif</strong> minggu ini di Jabodetabek
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

