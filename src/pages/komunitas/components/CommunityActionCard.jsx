import {
  MapPinIcon,
  CalendarIcon,
  ChevronRightIcon,
} from '../../../components/common/Icons'

export default function CommunityActionCard({
  action,
  onOpenDetail,
}) {
  const isWarning = action.statusVariant === 'warning' || action.status === 'Segera Dimulai' || action.status === 'Kuota Menipis'

  return (
    <article className="group bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-[#22603B]/30 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Header: Status and SubCategory */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isWarning
                ? 'bg-[#FEF3C7] text-[#B45309]'
                : 'bg-[#DCFCE7] text-[#15803D]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isWarning ? 'bg-[#B45309]' : 'bg-[#15803D]'
              }`}
            />
            {action.status || 'Terbuka'}
          </span>

          {/* SubCategory Tag */}
          <span className="text-xs font-semibold text-stone-500">
            {action.subCategory || action.category}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(action)}
          className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-2 group-hover:text-[#22603B] transition-colors duration-200 cursor-pointer"
        >
          {action.title}
        </h3>

        {/* Description */}
        <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {action.description}
        </p>

        {/* Metadata: Location & Date */}
        <div className="space-y-1.5 text-xs text-stone-600 pb-4 border-b border-border-warm/60">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
            <span className="truncate">{action.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
            <span className="truncate">{action.date}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Participants & CTA */}
      <div className="pt-3.5 flex items-center justify-between text-xs">
        <span className="text-stone-700 font-medium">
          <strong className="text-primary font-bold">{action.participants} peserta</strong> · {action.organizer}
        </span>

        <button
          type="button"
          onClick={() => onOpenDetail(action)}
          className="inline-flex items-center gap-1 font-bold text-[#22603B] hover:text-[#17462A] transition-colors duration-200 cursor-pointer group/cta focus:outline-hidden focus-visible:underline"
        >
          <span>Lihat Aksi</span>
          <ChevronRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}
