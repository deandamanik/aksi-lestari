import { Link } from 'react-router-dom'
import {
  COMMUNITY_HEADER,
  COMMUNITY_AGENDAS,
  APPRECIATION_HEADER,
  APPRECIATION_LEADERBOARD,
} from '../../../data/beranda/communityActionData'
import { ClockIcon, MapPinIcon, ZapIcon } from '../../../components/common/Icons'
import { useInView } from '../../../hooks/useInView'

function CommunityActionSection() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  const baseTransition = 'transition-all duration-[550ms] ease-out will-change-[opacity,transform]'
  const getEntranceClass = () => {
    return `${baseTransition} ${
      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`
  }

  return (
    <section
      id="aksi-komunitas"
      ref={ref}
      className="relative w-full bg-white text-primary pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 border-t border-border-warm/40 overflow-hidden"
      aria-labelledby="community-action-heading"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main 2-Column Grid matching Figma Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Aksi Komunitas */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`flex items-center justify-between gap-4 mb-2.5 ${getEntranceClass(0)}`}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-secondary font-body">
                {COMMUNITY_HEADER.eyebrow}
              </span>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                <span>{COMMUNITY_HEADER.badge}</span>
              </div>
            </div>

            <h2
              id="community-action-heading"
              className={`font-display text-primary text-2xl sm:text-3xl lg:text-[2.3rem] xl:text-[2.35rem] leading-[1.2] tracking-tight mb-2.5 ${getEntranceClass(0)}`}
              style={{ transitionDelay: '50ms' }}
            >
              {COMMUNITY_HEADER.title}
            </h2>

            <p
              className={`font-body text-primary/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${getEntranceClass(0)}`}
              style={{ transitionDelay: '100ms' }}
            >
              {COMMUNITY_HEADER.description}
            </p>

            <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
              {COMMUNITY_AGENDAS.map((agenda, index) => (
                <div
                  key={agenda.id}
                  className={`group relative bg-white rounded-2xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-primary/30 hover:shadow-xs hover:!translate-y-0 transition-all duration-300 ease-out ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${150 + index * 40}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3 sm:mb-3.5">
                    <div>
                      {/* Event Date / Tag Line */}
                      <span className="block text-xs sm:text-sm font-bold text-secondary tracking-wide mb-2 sm:mb-2.5">
                        {agenda.tag}
                      </span>
                      {/* Agenda Title */}
                      <h3 className="font-display text-primary text-base sm:text-lg font-bold tracking-tight group-hover:text-primary/90 transition-colors">
                        {agenda.title}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end text-right leading-tight shrink-0">
                      <span className="font-bold text-primary text-sm sm:text-base">
                        {agenda.volunteersCount} {agenda.volunteersLabel}
                      </span>
                      <span className="text-xs text-primary/60 font-medium mt-0.5">
                        {agenda.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-primary/75 font-medium">
                    <div className="inline-flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-primary/60 shrink-0" />
                      <span>{agenda.time}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-primary/60 shrink-0" />
                      <span>{agenda.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`${getEntranceClass(0)}`}
              style={{ transitionDelay: '250ms' }}
            >
              <Link
                to={COMMUNITY_HEADER.allActionsHref}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary hover:text-secondary transition-colors group w-fit"
              >
                <span>{COMMUNITY_HEADER.allActionsLabel}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Papan Apresiasi */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative bg-white rounded-3xl border border-border-warm p-6 sm:p-8 shadow-xs ${getEntranceClass(0)}`}
              style={{ transitionDelay: '150ms' }}
            >
              {/* Header inside Card */}
              <div className="mb-6">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary font-body mb-2">
                  {APPRECIATION_HEADER.eyebrow}
                </span>
                <h3 className="font-display text-primary text-2xl sm:text-3xl leading-snug tracking-tight mb-2">
                  {APPRECIATION_HEADER.title}
                </h3>
                <p className="font-body text-primary/70 text-xs sm:text-sm leading-relaxed">
                  {APPRECIATION_HEADER.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {APPRECIATION_LEADERBOARD.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-border-warm bg-white hover:border-primary/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <span
                        className={`font-display font-bold text-base sm:text-lg w-6 sm:w-7 shrink-0 ${
                          item.isTop ? 'text-primary' : 'text-primary/70'
                        }`}
                      >
                        {item.rank}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs ${
                          item.isTop
                            ? 'bg-primary text-white'
                            : 'bg-[#EAE8E1] text-primary/80'
                        }`}
                      >
                        {item.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-primary text-sm sm:text-base leading-tight truncate">
                          {item.name}
                        </span>
                        <span className="text-xs text-primary/60 font-medium mt-0.5">
                          {item.level}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 ${
                        item.isTop
                          ? 'bg-primary text-white shadow-2xs'
                          : 'bg-[#F3F1EC] text-primary'
                      }`}
                    >
                      <ZapIcon
                        className={`w-3.5 h-3.5 ${
                          item.isTop ? 'text-white' : 'text-primary'
                        }`}
                      />
                      <span>{item.xp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-warm/50 text-xs sm:text-sm">
                <span className="text-primary/50 font-medium text-xs">
                  {APPRECIATION_HEADER.updatedNotice}
                </span>
                <Link
                  to={APPRECIATION_HEADER.viewBoardHref}
                  className="font-semibold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{APPRECIATION_HEADER.viewBoardLabel}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityActionSection
