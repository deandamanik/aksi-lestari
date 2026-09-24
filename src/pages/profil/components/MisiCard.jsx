import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon } from '../../../components/common/Icons'

/**
 * MisiCard — Weekly Mission Card (Reference-aligned)
 *
 * Structure (top → bottom):
 * 1. Eyebrow / Category
 * 2. Title (Quando, bold, prominent)
 * 3. Description
 * 4. Task checklist (✓ done / ○ pending)
 * 5. Progress section (label + bar + percentage)
 * 6. XP reward (amber, small)
 * 7. CTA button (full-width for primary, text link for secondary)
 *
 * Visual: white surface, warm border, generous padding.
 * Hover: subtle bg shift, border visibility, arrow nudge 2px. 200ms.
 * No colored pills, no excessive badges.
 */
function MisiCard({ mission, index, isFeatured = false }) {
  const {
    eyebrow,
    title,
    description,
    category,
    progressCurrent,
    progressTarget,
    rewardXP,
    status,
    ctaLabel,
    ctaPath,
    tasks,
  } = mission

  const progressPercent = Math.round((progressCurrent / progressTarget) * 100)
  const isCompleted = status === 'completed'

  return (
    <article
      className={`group bg-white border transition-all duration-200 flex flex-col gap-5 misi-card-enter ${
        isFeatured ? 'rounded-2xl p-6 sm:p-7 shadow-2xs' : 'rounded-xl p-5 sm:p-6'
      } ${
        isCompleted
          ? 'border-border-warm/80 bg-neutral/40'
          : 'border-border-warm hover:border-stone-300 hover:bg-neutral/40'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`Misi: ${title}`}
    >
      {/* Eyebrow */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-[0.12em] select-none leading-none">
          {eyebrow || category}
        </span>
        {/* XP inline with eyebrow on desktop */}
        <span
          className={`text-xs font-bold tabular-nums whitespace-nowrap ${
            isCompleted ? 'text-amber-500/60' : 'text-amber-600'
          }`}
        >
          +{rewardXP} XP
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-display text-lg sm:text-xl font-bold tracking-tight leading-snug ${
          isCompleted ? 'text-stone-400' : 'text-stone-900'
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed -mt-2 ${
          isCompleted ? 'text-stone-400' : 'text-stone-500'
        }`}
      >
        {description}
      </p>

      {/* Task checklist */}
      {tasks && tasks.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-1">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 checklist-enter"
              style={{ animationDelay: `${200 + i * 60}ms` }}
            >
              {/* Check / Circle icon */}
              {task.done ? (
                <span className="shrink-0 mt-0.5 text-primary" aria-hidden="true">
                  <CheckIcon className="w-4 h-4" strokeWidth={2.5} />
                </span>
              ) : (
                <span
                  className="shrink-0 mt-1 w-4 h-4 rounded-full border-[1.5px] border-stone-300"
                  aria-hidden="true"
                />
              )}

              {/* Task label + status */}
              <div className="flex-1 flex items-baseline justify-between gap-2 min-w-0">
                <span
                  className={`text-sm leading-snug ${
                    task.done ? 'text-stone-600' : 'text-stone-500'
                  }`}
                >
                  {task.label}
                </span>
                {task.statusText && (
                  <span
                    className="text-xs font-medium whitespace-nowrap shrink-0 text-stone-500"
                  >
                    {task.statusText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress section */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-end justify-between gap-4">
          <span className={`text-xs font-semibold ${isCompleted ? 'text-stone-400' : 'text-stone-500'}`}>
            Progress Misi
          </span>
          <span className={`text-sm font-bold tabular-nums ${isCompleted ? 'text-stone-400' : 'text-stone-700'}`}>
            {progressCurrent} / {progressTarget} Target Selesai ({progressPercent}%)
          </span>
        </div>

        <div
          className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden"
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

      {/* CTA */}
      {isCompleted ? (
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary/50 select-none pt-1">
          <CheckIcon className="w-4 h-4" strokeWidth={2.5} />
          Misi Selesai
        </div>
      ) : isFeatured || ctaLabel === 'Lihat Kegiatan Komunitas' ? (
        /* Primary CTA — prominent solid green button */
        <Link
          to={ctaPath || '#'}
          className="flex items-center justify-center gap-2 w-full text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 active:scale-[0.98] px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group/cta mt-1 shadow-2xs"
          onClick={(e) => {
            if (!ctaPath || ctaPath === '#') e.preventDefault()
          }}
        >
          <span>{ctaLabel || 'Lanjutkan Misi'}</span>
          <ArrowRightIcon
            className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      ) : (
        /* Secondary CTA — lightweight bordered link for supporting missions */
        <Link
          to={ctaPath || '#'}
          className="flex items-center justify-center gap-2 w-full text-xs sm:text-sm font-semibold text-stone-700 hover:text-primary border border-border-warm hover:border-stone-300 bg-neutral/60 hover:bg-white px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group/cta mt-1"
          onClick={(e) => {
            if (!ctaPath || ctaPath === '#') e.preventDefault()
          }}
        >
          <span>{ctaLabel || 'Lihat Detail'}</span>
          <ArrowRightIcon
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      )}
    </article>
  )
}

export default MisiCard
