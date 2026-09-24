import { Link } from 'react-router-dom'
import {
  CheckIcon,
  CheckCircle2Icon,
  ClockIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'

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
      className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 border-b border-border-warm/80 transition-colors duration-150"
      aria-labelledby={`activity-title-${item.id}`}
    >
      {/* Left: Indicator + Content */}
      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
        {/* Subtle bullet indicator */}
        <span
          className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 ring-4 ring-neutral"
          aria-hidden="true"
        />

        {/* Text Body */}
        <div className="flex flex-col min-w-0 flex-1">
          {/* Title + Status Row */}
          <div className="flex flex-wrap items-baseline gap-2">
            <h3
              id={`activity-title-${item.id}`}
              className="font-bold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-primary transition-colors duration-150"
            >
              {item.title}
            </h3>
            {renderStatusBadge(item.status, item.statusLabel)}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-xs text-stone-500 leading-relaxed mt-0.5">
              {item.description}
            </p>
          )}

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 mt-1.5 select-none">
            <span className="font-medium text-stone-600">
              {item.type || item.category}
            </span>
            <span className="text-stone-300" aria-hidden="true">·</span>
            <span className="tabular-nums text-stone-500">
              {item.formattedDateTime || item.date}
            </span>
            {item.location && !item.description?.includes(item.location) && (
              <>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-stone-500">{item.location}</span>
              </>
            )}
            {item.reportId && (
              <>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-[11px] text-stone-500">{item.reportId}</span>
              </>
            )}
            {item.score && (
              <>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-medium text-primary/80">{item.score}</span>
              </>
            )}
            {item.organizer && (
              <>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-medium text-stone-500">{item.organizer}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right on Desktop / Bottom on Mobile: XP + CTA */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-1 sm:pt-0 pl-5 sm:pl-0">
        <span className="text-xs sm:text-sm font-semibold text-stone-700 tabular-nums">
          {item.xpLabel || `+${item.xp} XP`}
        </span>

        <Link
          to={item.ctaPath || '/lapor/tracking'}
          className="group/cta inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline select-none"
          aria-label={`${item.ctaText || 'Lihat Detail'} untuk ${item.title}`}
        >
          <span>{item.ctaText || 'Lihat Detail'}</span>
          <ArrowRightIcon className="w-3 h-3 transition-transform duration-150 group-hover/cta:translate-x-0.5" strokeWidth={2.2} />
        </Link>
      </div>
    </article>
  )
}

export default RiwayatActivityCard
