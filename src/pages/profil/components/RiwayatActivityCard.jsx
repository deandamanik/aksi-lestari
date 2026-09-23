import { Link } from 'react-router-dom'
import {
  MapPinIcon,
  BookOpenIcon,
  UsersIcon,
  RecycleIcon,
  FlagIcon,
  CheckIcon,
  CheckCircle2Icon,
  ClockIcon,
  ZapIcon,
} from '../../../components/common/Icons'

function ActivityIcon({ iconType, className = 'w-4 h-4', strokeWidth = 1.8 }) {
  switch (iconType) {
    case 'map-pin':
      return <MapPinIcon className={className} strokeWidth={strokeWidth} />
    case 'book':
      return <BookOpenIcon className={className} strokeWidth={strokeWidth} />
    case 'users':
      return <UsersIcon className={className} strokeWidth={strokeWidth} />
    case 'recycle':
      return <RecycleIcon className={className} strokeWidth={strokeWidth} />
    case 'flag':
      return <FlagIcon className={className} strokeWidth={strokeWidth} />
    default:
      return <MapPinIcon className={className} strokeWidth={strokeWidth} />
  }
}

function renderStatusBadge(status, statusLabel) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary select-none">
        <CheckIcon className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
        <span>{statusLabel}</span>
      </span>
    )
  }
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary/90 select-none">
        <CheckCircle2Icon className="w-3 h-3 stroke-[2.2]" aria-hidden="true" />
        <span>{statusLabel}</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 select-none">
      <ClockIcon className="w-3 h-3 stroke-[2.2]" aria-hidden="true" />
      <span>{statusLabel}</span>
    </span>
  )
}

/**
 * RiwayatActivityCard — Refined Civic Activity Entry
 *
 * Information hierarchy:
 * [icon]  [Title + Status]                     [+XP]
 *         [Description]                        [CTA →]
 *         [Datetime • ID / Metadata]
 */
function RiwayatActivityCard({ item }) {
  return (
    <article
      className="group bg-white rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 transition-all duration-200 hover:border-stone-300 hover:shadow-2xs flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6"
      aria-labelledby={`activity-title-${item.id}`}
    >
      {/* Left: Icon + Content */}
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* Subtle Icon Container — warm neutral surface */}
        <div
          className="w-10 h-10 rounded-xl bg-[#FAF9F4] border border-[#E8E5DC] flex items-center justify-center text-stone-600 shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-primary group-hover:border-primary/30"
          aria-hidden="true"
        >
          <ActivityIcon iconType={item.iconType} className="w-4 h-4" strokeWidth={1.8} />
        </div>

        {/* Text Body */}
        <div className="flex flex-col min-w-0 flex-1">
          {/* Title + Status Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              id={`activity-title-${item.id}`}
              className="font-bold text-base text-stone-900 leading-snug group-hover:text-primary transition-colors duration-150"
            >
              {item.title}
            </h3>
            {renderStatusBadge(item.status, item.statusLabel)}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mt-1">
            {item.description}
            {item.location && !item.description.includes(item.location) && (
              <span className="text-stone-400"> • {item.location}</span>
            )}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400 mt-2.5 select-none">
            <span className="tabular-nums font-medium text-stone-500">
              {item.formattedDateTime || item.date}
            </span>

            {item.reportId && (
              <>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <span className="font-mono text-[11px] text-stone-500">{item.reportId}</span>
              </>
            )}

            {item.score && (
              <>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <span className="font-medium text-primary/80">{item.score}</span>
              </>
            )}

            {item.badgeEarned && (
              <>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <span className="font-medium text-stone-600">{item.badgeEarned}</span>
              </>
            )}

            {item.organizer && (
              <>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <span className="font-medium text-stone-500">{item.organizer}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right on Desktop / Bottom on Mobile: XP + CTA */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 sm:border-none">
        {/* XP Value */}
        <div className="flex items-center gap-1 text-sm font-bold text-amber-700 tabular-nums select-none">
          <ZapIcon
            className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>{item.xpLabel || `+${item.xp} XP`}</span>
        </div>

        {/* Contextual CTA text link */}
        <Link
          to={item.ctaPath || '/lapor/tracking'}
          className="group/cta inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm select-none"
          aria-label={`${item.ctaText || 'Lihat Detail'} untuk ${item.title}`}
        >
          <span>{item.ctaText || 'Lihat Detail'}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  )
}

export default RiwayatActivityCard
