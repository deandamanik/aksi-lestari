import {
  GraduationCapIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'

export default function CommunitySidebarActionCard({
  action,
  onOpenDetail,
}) {
  if (!action) return null

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-[#22603B]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Header: Status and SubCategory */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            {action.status || 'Terbuka'}
          </span>
          <span className="text-xs font-semibold text-stone-500">
            {action.subCategory || 'Edukasi Generasi'}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(action)}
          className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-2 hover:text-[#22603B] transition-colors duration-200 cursor-pointer"
        >
          {action.title}
        </h3>

        {/* Description */}
        <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
          {action.description}
        </p>

        {/* Action Details List */}
        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-2.5">
            <GraduationCapIcon className="w-4 h-4 text-[#22603B] shrink-0" />
            <span className="truncate">{action.location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ClockIcon className="w-4 h-4 text-[#22603B] shrink-0" />
            <span className="truncate">{action.date} · {action.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <UsersIcon className="w-4 h-4 text-[#22603B] shrink-0" />
            <span>
              {action.note || `${action.participants} relawan pendamping bergabung`}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={() => onOpenDetail(action)}
        className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full border border-[#22603B] text-[#22603B] font-bold text-xs sm:text-sm hover:bg-[#22603B] hover:text-white transition-all duration-200 cursor-pointer mt-5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] active:scale-98 shadow-2xs"
      >
        <span>Lihat Aksi</span>
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </article>
  )
}
