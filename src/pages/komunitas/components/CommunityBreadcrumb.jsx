import { TargetIcon } from '../../../components/common/Icons'

export default function CommunityBreadcrumb({ totalActiveActions = 14 }) {
  return (
    <nav aria-label="Breadcrumb dan status wilayah" className="pt-20 sm:pt-22 pb-2 sm:pb-3">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left: Breadcrumb context */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF3EC] border border-[#D5E8D8] text-[#22603B] font-bold text-[11px] tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22603B]" />
              KOMUNITAS
            </span>
            <span className="text-stone-300 font-light select-none">/</span>
            <span className="text-stone-500 font-medium">
              Hub Aksi Kewargaan
            </span>
          </div>

          {/* Right: Active actions count badge */}
          <div className="inline-flex items-center gap-2 text-xs text-stone-600 self-start sm:self-auto">
            <div className="w-5 h-5 rounded-full bg-[#EAF3EC] text-[#22603B] flex items-center justify-center shrink-0">
              <TargetIcon className="w-3.5 h-3.5" />
            </div>
            <span>
              <strong className="text-stone-800 font-bold">{totalActiveActions} Aksi Aktif</strong> minggu ini di Jabodetabek
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

