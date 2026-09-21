import {
  MapPinIcon,
  CalendarIcon,
  ChevronRightIcon,
} from '../../../components/common/Icons'
import { useInView } from '../../../hooks/useInView'

export default function CommunityActionCard({
  action,
  onOpenDetail,
  index = 0,
}) {
  const [cardRef, inView] = useInView({ threshold: 0.12 })
  const isWarning = action.statusVariant === 'warning' || action.status === 'Segera Dimulai' || action.status === 'Kuota Menipis'

  return (
    <article
      ref={cardRef}
      style={index > 0 ? { transitionDelay: `${Math.min(index * 40, 120)}ms` } : undefined}
      className={`scroll-reveal-card group bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-[#22603B]/30 hover:shadow-xs flex flex-col justify-between motion-reduce:opacity-100 motion-reduce:transform-none ${
        inView ? 'is-revealed' : ''
      }`}
    >
      <div>
        {/* Top Header: Status and SubCategory */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Status Indicator */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              isWarning ? 'text-[#B45309]' : 'text-[#22603B]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isWarning ? 'bg-[#D97706]' : 'bg-[#22603B]'
              }`}
            />
            <span>{action.status || 'Terbuka'}</span>
          </span>

          {/* SubCategory Tag */}
          <span className="text-xs text-stone-400 font-normal">
            {action.subCategory || action.category}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(action)}
          className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-2 group-hover:text-[#22603B] transition-colors duration-180 cursor-pointer"
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
          className="inline-flex items-center gap-1 font-bold text-[#22603B] hover:text-[#17462A] transition-all duration-180 active:scale-[0.98] cursor-pointer group/cta focus:outline-hidden focus-visible:underline"
        >
          <span>Lihat Aksi</span>
          <ChevronRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover/cta:translate-x-0.5 motion-reduce:transform-none" />
        </button>
      </div>
    </article>
  )
}
