import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  COMMUNITY_HEADER,
  COMMUNITY_AGENDAS,
  APPRECIATION_HEADER,
  APPRECIATION_LEADERBOARD,
} from '../../../data/beranda/communityActionData'
import {
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'
import { useInView } from '../../../hooks/useInView'
import { useAuth } from '../../../hooks/useAuth'
import AuthPromptModal from '../../../components/common/AuthPromptModal'

function CommunityActionSection() {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const { isAuthenticated } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  const handleLeaderboardClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setShowAuthPrompt(true)
    }
  }

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
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-stretch">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Aksi Komunitas */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span
                className={`block text-xs font-bold uppercase tracking-widest text-secondary font-body mb-2.5 ${getEntranceClass()}`}
              >
                {COMMUNITY_HEADER.eyebrow}
              </span>

              <h2
                id="community-action-heading"
                className={`font-display text-primary text-2xl sm:text-3xl lg:text-[2.3rem] xl:text-[2.35rem] leading-[1.2] tracking-tight mb-2.5 ${getEntranceClass()}`}
                style={{ transitionDelay: '50ms' }}
              >
                {COMMUNITY_HEADER.title}
              </h2>

              <p
                className={`font-body text-primary/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${getEntranceClass()}`}
                style={{ transitionDelay: '100ms' }}
              >
                {COMMUNITY_HEADER.description}
              </p>

              <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
                {COMMUNITY_AGENDAS.map((agenda, index) => (
                  <Link
                    key={agenda.id}
                    to="/komunitas"
                    state={{ intent: { type: 'join-action', actionId: agenda.id } }}
                    className={`group relative bg-white rounded-2xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-primary/30 hover:shadow-xs hover:-translate-y-0.5 block transition-all duration-200 ease-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${150 + index * 40}ms` }}
                    aria-label={`Buka detail aksi: ${agenda.title}`}
                  >
                    {/* Top Row: Status + Category & Date */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-semibold text-primary shrink-0">
                          {agenda.statusLabel}
                        </span>
                        {agenda.category && (
                          <span className="text-xs text-stone-500 font-normal truncate">
                            · {agenda.category}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-medium text-stone-500 font-body shrink-0">
                        {agenda.date || agenda.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-primary text-base sm:text-lg lg:text-xl font-normal leading-snug tracking-tight mb-3 group-hover:text-secondary transition-colors duration-150">
                      {agenda.title}
                    </h3>

                    {/* Metadata: Time and Location */}
                    <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-stone-600 font-body">
                      <div className="inline-flex items-center gap-1.5">
                        <ClockIcon className="w-4 h-4 text-primary shrink-0" />
                        <span>{agenda.time}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5">
                        <MapPinIcon className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{agenda.location}</span>
                      </div>
                    </div>

                    {/* Footer: Volunteers Count + CTA Arrow */}
                    <div className="pt-3.5 mt-3.5 border-t border-border-warm/60 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <span className="text-stone-600 font-body">
                        <strong className="text-primary font-bold">
                          {agenda.volunteersCount} {agenda.volunteersLabel}
                        </strong>{' '}
                        terdaftar
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors duration-150">
                        <span>Lihat Aksi</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`${getEntranceClass()}`}
              style={{ transitionDelay: '250ms' }}
            >
              <Link
                to={COMMUNITY_HEADER.allActionsHref}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary hover:text-secondary transition-colors group w-fit font-body"
              >
                <span>{COMMUNITY_HEADER.allActionsLabel}</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Papan Apresiasi */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className={`relative bg-white rounded-3xl border border-border-warm p-6 sm:p-8 shadow-xs flex flex-col justify-between h-full ${getEntranceClass()}`}
              style={{ transitionDelay: '150ms' }}
            >
              {/* Header inside Card */}
              <div>
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

              {/* Clean Divider List (Top 4 leaders perfectly distributed) */}
              <div className="divide-y divide-border-warm/60 my-5 sm:my-6 flex-1 flex flex-col justify-around">
                {APPRECIATION_LEADERBOARD.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 sm:py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      {/* Rank */}
                      <span
                        className={`font-display font-bold text-base sm:text-lg w-6 text-center shrink-0 ${
                          item.isTop ? 'text-primary' : 'text-stone-400'
                        }`}
                      >
                        #{item.rawRank || item.rank}
                      </span>

                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 border ${
                          item.isTop
                            ? 'bg-primary/10 text-primary border-primary/25'
                            : 'bg-neutral text-stone-700 border-border-warm'
                        }`}
                      >
                        {item.initials}
                      </div>

                      {/* Contributor Details */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-primary text-sm sm:text-base leading-tight truncate font-body">
                          {item.name}
                        </span>
                        <span className="text-xs text-stone-500 font-medium font-body truncate mt-0.5">
                          {item.level}
                          {item.stats ? ` · ${item.stats.split('·')[0].trim()}` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Typographic XP */}
                    <div className="shrink-0 text-right">
                      <span className="font-display font-bold text-sm sm:text-base text-primary">
                        {item.xp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border-warm/60 text-xs sm:text-sm">
                <span className="text-stone-400 font-medium text-xs font-body">
                  {APPRECIATION_HEADER.updatedNotice}
                </span>
                <Link
                  to={APPRECIATION_HEADER.viewBoardHref}
                  onClick={handleLeaderboardClick}
                  className="font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 group font-body cursor-pointer"
                >
                  <span>{APPRECIATION_HEADER.viewBoardLabel}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthPromptModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk terlebih dahulu untuk melihat papan peringkat relawan dan posisi kontribusimu."
        returnTo={APPRECIATION_HEADER.viewBoardHref}
        intent={{ type: 'open-leaderboard' }}
      />
    </section>
  )
}

export default CommunityActionSection
