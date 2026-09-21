import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'
import { useInView } from '../../../hooks/useInView'

export default function CommunityActionCard({
  action,
  onOpenDetail,
  index = 0,
}) {
  const [cardRef, inView] = useInView({ threshold: 0.12 })
  const isWarning =
    action.statusVariant === 'warning' ||
    action.status === 'Segera Dimulai' ||
    action.status === 'Kuota Menipis'

  return (
    <article
      ref={cardRef}
      style={index > 0 ? { transitionDelay: `${Math.min(index * 40, 120)}ms` } : undefined}
      className={`scroll-reveal-card group bg-white rounded-2xl sm:rounded-3xl border border-border-warm overflow-hidden shadow-2xs hover:shadow-xs hover:border-[#22603B]/30 flex flex-col motion-reduce:opacity-100 motion-reduce:transform-none transition-all duration-200 ${
        inView ? 'is-revealed' : ''
      }`}
    >
      {/* Optional Top Image */}
      {action.image && (
        <div
          role="button"
          tabIndex={0}
          aria-label={`Buka detail ${action.title}`}
          onClick={() => onOpenDetail(action)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onOpenDetail(action)
            }
          }}
          className="w-full h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer bg-stone-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#22603B]"
        >
          <img
            src={action.image}
            alt={action.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-300 motion-reduce:transform-none"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* 1. Status + Category */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
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

          <span className="text-xs text-stone-500 font-normal">
            {action.subCategory || action.category}
          </span>
        </div>

        {/* 2. Title */}
        <h3
          onClick={() => onOpenDetail(action)}
          className="font-display text-primary text-lg sm:text-xl font-bold leading-snug tracking-tight mb-2 hover:text-[#22603B] transition-colors duration-180 cursor-pointer"
        >
          {action.title}
        </h3>

        {/* 3. Description */}
        <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
          {action.description}
        </p>

        {/* 4. Metadata: Location & Date */}
        <div className="pt-3 pb-3 border-t border-border-warm/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2 min-w-0">
            <MapPinIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
            <span className="truncate">{action.location}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CalendarIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
            <span className="truncate">{action.date}</span>
          </div>
        </div>

        {/* 5. Footer: Participant/Organizer & CTA */}
        <div className="pt-3.5 border-t border-border-warm/60 mt-auto flex items-center justify-between gap-3 text-xs">
          <span className="text-stone-700 font-medium truncate">
            <strong className="text-primary font-bold">
              {action.participants} {action.isFeatured ? 'relawan terdaftar' : 'peserta'}
            </strong>{' '}
            · {action.organizer}
          </span>

          <button
            type="button"
            onClick={() => onOpenDetail(action)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#22603B] hover:text-[#17462A] transition-all duration-180 active:scale-[0.98] cursor-pointer group/cta focus:outline-hidden focus-visible:underline shrink-0"
          >
            <span>Lihat Aksi</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover/cta:translate-x-0.5 motion-reduce:transform-none" />
          </button>
        </div>
      </div>
    </article>
  )
}
