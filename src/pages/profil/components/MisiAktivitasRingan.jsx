import { Link } from 'react-router-dom'
import {
  CameraIcon,
  FileTextIcon,
  RecycleIcon,
  CheckIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'
import { LIGHT_ACTIVITIES } from '../../../data/profil/weeklyMissionsData'

/**
 * MisiAktivitasRingan — Light Contribution Activities
 *
 * Replaces "Misi Hari Ini" from the reference layout.
 * These are NOT daily missions — no resets, no streaks, no daily mechanics.
 * Contextual contribution activities that support the weekly mission cycle.
 *
 * Visual: white card, warm border, rows separated by subtle dividers.
 * Typography-driven — no colored pills or badges.
 */

const ICON_MAP = {
  camera: CameraIcon,
  fileText: FileTextIcon,
  recycle: RecycleIcon,
}

function MisiAktivitasRingan() {
  return (
    <section
      aria-labelledby="aktivitas-ringan-heading"
      className="flex flex-col gap-4"
    >
      {/* Section header */}
      <div className="flex flex-col gap-1">
        <h2
          id="aktivitas-ringan-heading"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Aktivitas Kontribusi
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg">
          Beberapa langkah kecil yang dapat kamu selesaikan untuk mendukung kontribusi lingkungan.
        </p>
      </div>

      {/* Activity rows */}
      <div className="bg-white rounded-2xl border border-[#E8E5DC] divide-y divide-[#E8E5DC]/60 overflow-hidden">
        {LIGHT_ACTIVITIES.map((activity) => {
          const IconComponent = ICON_MAP[activity.icon] || RecycleIcon
          const isCompleted = activity.status === 'completed'

          return (
            <div
              key={activity.id}
              className={`flex items-start gap-4 p-5 sm:p-6 transition-colors duration-200 ${
                isCompleted
                  ? 'bg-[#FAFAF8]'
                  : 'hover:bg-[#FDFCF9]'
              }`}
            >
              {/* Icon */}
              <div
                className={`shrink-0 mt-0.5 ${
                  isCompleted ? 'text-stone-300' : 'text-stone-500'
                }`}
                aria-hidden="true"
              >
                <IconComponent className="w-5 h-5" strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-sm sm:text-base font-bold leading-snug ${
                        isCompleted ? 'text-stone-400' : 'text-stone-800'
                      }`}
                    >
                      {activity.title}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 ml-2 text-primary align-middle">
                          <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </span>
                      )}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mt-0.5 ${
                        isCompleted ? 'text-stone-400' : 'text-stone-500'
                      }`}
                    >
                      {activity.description}
                    </p>
                  </div>

                  {/* Progress + XP — right side, desktop */}
                  <div className="hidden sm:flex items-center gap-4 shrink-0 pt-0.5">
                    {/* Progress fraction */}
                    <span
                      className={`text-xs font-semibold tabular-nums whitespace-nowrap ${
                        isCompleted ? 'text-stone-400' : 'text-stone-600'
                      }`}
                    >
                      {activity.progressCurrent} / {activity.progressTarget} Selesai
                    </span>

                    {/* XP */}
                    <span
                      className={`text-xs font-bold tabular-nums whitespace-nowrap ${
                        isCompleted ? 'text-amber-500/60' : 'text-amber-600'
                      }`}
                    >
                      +{activity.rewardXP} XP
                    </span>

                    {/* CTA */}
                    {isCompleted ? (
                      <span className="text-xs font-semibold text-primary/50 select-none">
                        Selesai
                      </span>
                    ) : (
                      <Link
                        to={activity.ctaPath || '#'}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-lg transition-colors duration-200 whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {activity.ctaLabel}
                        <ArrowRightIcon className="w-3 h-3" strokeWidth={2.2} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Mobile: progress + XP + CTA */}
                <div className="flex sm:hidden items-center gap-3 mt-1">
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      isCompleted ? 'text-stone-400' : 'text-stone-600'
                    }`}
                  >
                    {activity.progressCurrent} / {activity.progressTarget} Selesai
                  </span>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isCompleted ? 'text-amber-500/60' : 'text-amber-600'
                    }`}
                  >
                    +{activity.rewardXP} XP
                  </span>
                  <div className="ml-auto">
                    {isCompleted ? (
                      <span className="text-xs font-semibold text-primary/50 select-none">
                        Selesai
                      </span>
                    ) : (
                      <Link
                        to={activity.ctaPath || '#'}
                        className="inline-flex items-center gap-1 text-xs font-bold text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-lg transition-colors duration-200 whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {activity.ctaLabel}
                        <ArrowRightIcon className="w-3 h-3" strokeWidth={2.2} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MisiAktivitasRingan
