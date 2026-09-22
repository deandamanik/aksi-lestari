import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon } from '../../../components/common/Icons'

/**
 * MisiCard — Individual Mission Card
 *
 * Design principles:
 * - Information reads as one composition, not stacked UI components
 * - Status indicators are lightweight (dot/check + text)
 * - XP reward uses amber accent sparingly
 * - Progress bar is clean, green accent on neutral track
 * - CTA hierarchy: completed (muted text) < not_started (secondary) < in_progress (primary)
 * - Hover: subtle bg shift, border visibility, arrow nudge
 */
function MisiCard({ mission, index }) {
  const {
    title,
    description,
    category,
    progressCurrent,
    progressTarget,
    rewardXP,
    status,
  } = mission

  const progressPercent = Math.round((progressCurrent / progressTarget) * 100)
  const isCompleted = status === 'completed'

  // Status rendering — lightweight indicators
  const statusConfig = {
    completed: {
      label: 'Selesai',
      icon: <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />,
      className: 'text-primary',
    },
    in_progress: {
      label: 'Sedang berjalan',
      dot: true,
      className: 'text-primary',
    },
    not_started: {
      label: 'Belum dimulai',
      dot: true,
      dotEmpty: true,
      className: 'text-stone-400',
    },
  }

  const statusInfo = statusConfig[status] || statusConfig.not_started

  // CTA config — hierarchy-based
  const ctaConfig = {
    completed: null, // No CTA button for completed
    in_progress: {
      label: 'Lanjutkan',
      className:
        'inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-hidden focus-visible:underline',
    },
    not_started: {
      label: 'Mulai',
      className:
        'inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-primary transition-colors duration-200 focus:outline-hidden focus-visible:underline',
    },
  }

  const ctaInfo = ctaConfig[status]

  return (
    <article
      className={`group bg-white rounded-2xl border transition-all duration-200 p-5 sm:p-6 flex flex-col gap-4 misi-card-enter ${
        isCompleted
          ? 'border-[#E8E5DC]/80 bg-[#FAFAF8]'
          : 'border-[#E8E5DC] hover:border-stone-300 hover:bg-[#FDFCF9]'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
      aria-label={`Misi: ${title}`}
    >
      {/* Header: Category + Status */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
          {category}
        </span>

        {/* Status indicator — lightweight */}
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold select-none ${statusInfo.className}`}
        >
          {statusInfo.icon ? (
            statusInfo.icon
          ) : statusInfo.dotEmpty ? (
            <span
              className="w-2 h-2 rounded-full border-[1.5px] border-stone-300 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <span
              className="w-2 h-2 rounded-full bg-primary shrink-0"
              aria-hidden="true"
            />
          )}
          {statusInfo.label}
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex flex-col gap-1.5">
        <h3
          className={`font-display text-lg sm:text-xl font-bold tracking-tight leading-snug ${
            isCompleted ? 'text-stone-500' : 'text-stone-900'
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed max-w-xl ${
            isCompleted ? 'text-stone-400' : 'text-stone-500'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className={`font-semibold tabular-nums ${isCompleted ? 'text-stone-400' : 'text-stone-700'}`}>
            {progressCurrent} / {progressTarget} selesai
          </span>
        </div>

        <div
          className="w-full h-2 rounded-full bg-stone-100 overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progres misi ${title}: ${progressCurrent} dari ${progressTarget}`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-primary/60' : 'bg-primary'
            } progress-fill-animate`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer: XP + CTA */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {/* XP reward — amber, clean */}
        <span
          className={`text-xs font-bold tabular-nums ${
            isCompleted ? 'text-amber-500/70' : 'text-amber-600'
          }`}
        >
          +{rewardXP} XP
        </span>

        {/* CTA or completed label */}
        {ctaInfo ? (
          <Link
            to="#"
            className={`${ctaInfo.className} group/cta`}
            aria-label={`${ctaInfo.label} misi: ${title}`}
            onClick={(e) => {
              // No real destination yet — prevent navigation
              e.preventDefault()
            }}
          >
            <span>{ctaInfo.label}</span>
            <ArrowRightIcon
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/60 select-none">
            <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
            Selesai
          </span>
        )}
      </div>
    </article>
  )
}

export default MisiCard
