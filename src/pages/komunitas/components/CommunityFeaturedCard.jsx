import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'

export default function CommunityFeaturedCard({
  action,
  onOpenDetail,
}) {
  if (!action) return null

  return (
    <article className="group bg-white rounded-3xl border border-border-warm overflow-hidden shadow-2xs hover:shadow-xs hover:border-[#22603B]/30 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none flex flex-col">
      {/* Upper Large Image with Badges & Title Overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Buka detail ${action.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpenDetail(action)
          }
        }}
        className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        onClick={() => onOpenDetail(action)}
      >
        <img
          src={action.image || '/images/actions/bersih_pantai_muara.jpg'}
          alt={action.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-300 motion-reduce:transform-none"
          onError={(e) => {
            // fallback if image fails to load
            e.target.src = '/images/actions/bersih_pantai_muara.jpg'
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
          {/* Status Indicator */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-stone-100 font-medium text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shrink-0" />
            <span>{action.status || 'Terbuka'}</span>
          </span>

          {/* Featured Label */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-stone-200 font-medium text-xs">
            {action.featuredBadge || 'Aksi Unggulan'}
          </span>
        </div>

        {/* Bottom Title & Tag Overlay */}
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-5 pointer-events-none">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-emerald-200/90 mb-1">
            {action.tag || 'AKSI BERSIH PESISIR'}
          </span>
          <h3 className="font-display text-white text-xl sm:text-2xl md:text-[1.65rem] font-bold tracking-tight leading-snug drop-shadow-sm">
            {action.title}
          </h3>
        </div>
      </div>

      {/* Lower Card Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        {/* Description */}
        <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
          {action.description}
        </p>

        {/* Info Grid: Location & Date */}
        <div className="pt-3.5 pb-3 border-t border-border-warm/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {/* Location */}
          <div className="flex items-start gap-2.5">
            <MapPinIcon className="w-4 h-4 text-[#22603B] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-primary leading-tight truncate">
                {action.location}
              </span>
              <span className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5">
                {action.locationDetail || `${action.distance} dari lokasimu`}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-2.5">
            <CalendarIcon className="w-4 h-4 text-[#22603B] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-primary leading-tight">
                {action.date}
              </span>
              <span className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5">
                {action.time}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Volunteers Avatars & CTA */}
        <div className="pt-3.5 mt-2 border-t border-border-warm/60 flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Avatars & Participant Info */}
          <div className="flex items-center gap-3">
            {/* Avatar Circles */}
            <div className="flex items-center -space-x-1.5 shrink-0">
              {(action.avatars || ['RK', 'AS', 'BP']).map((init, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white shadow-2xs bg-stone-100 text-stone-600 border border-border-warm/60"
                >
                  {init}
                </div>
              ))}
            </div>

            <div className="flex flex-col text-xs leading-tight">
              <span className="font-bold text-primary">
                {action.participants} relawan terdaftar
              </span>
              <span className="text-stone-500 font-medium text-[11px]">
                Oleh {action.organizer}
              </span>
            </div>
          </div>

          {/* Right: CTA Button */}
          <button
            type="button"
            onClick={() => onOpenDetail(action)}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-full text-xs sm:text-sm font-bold bg-[#22603B] text-white hover:bg-[#1C4E30] transition-all duration-180 shadow-xs cursor-pointer group/btn focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] active:scale-[0.98]"
          >
            <span>Lihat Aksi</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover/btn:translate-x-0.5 motion-reduce:transform-none" />
          </button>
        </div>
      </div>
    </article>
  )
}
