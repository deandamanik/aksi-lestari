import { CheckIcon, ClockIcon, FlagIcon } from '../../../../components/common/Icons'
import { formatDateTime } from '../../../../utils/formatters'

const MANDIRI_STAGES = [
  {
    step: 1,
    title: 'Aksi Dikirim',
    desc: 'Bukti tindakanmu berhasil dikirim.',
    status: 'completed',
  },
  {
    step: 2,
    title: 'Sedang Divalidasi',
    desc: 'Dokumentasi sedang diperiksa untuk memastikan aksi sesuai dengan kondisi temuan.',
    status: 'active',
  },
  {
    step: 3,
    title: 'Aksi Terverifikasi',
    desc: 'Aksi akan dinyatakan terverifikasi setelah proses pemeriksaan selesai.',
    status: 'upcoming',
  },
]

function MandiriTrackingTimeline({ submittedAt }) {
  const formattedTime = formatDateTime(submittedAt, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
        <FlagIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
        <h2 className="font-bold text-sm text-stone-900">
          Alur Aksi & Status
        </h2>
      </div>

      {/* 3-Stage Mandiri Timeline */}
      <div className="flex flex-col">
        {MANDIRI_STAGES.map((stage, index) => {
          const isCompleted = stage.status === 'completed'
          const isActive = stage.status === 'active'
          const isLast = index === MANDIRI_STAGES.length - 1

          return (
            <div key={stage.step} className="flex items-start gap-3.5 sm:gap-4 relative">
              {/* Timeline Node + Connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-primary text-white shadow-xs'
                      : isActive
                        ? 'bg-primary text-white ring-4 ring-primary/20 shadow-xs'
                        : 'bg-stone-100 border border-stone-200 text-stone-400'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  ) : isActive ? (
                    <ClockIcon className="w-4 h-4 text-white" strokeWidth={2.2} />
                  ) : (
                    <span>{stage.step}</span>
                  )}
                </div>

                {!isLast && (
                  <div
                    className={`w-0.5 my-1 transition-colors ${
                      isCompleted ? 'bg-primary/40' : 'bg-stone-200'
                    } h-11 sm:h-12`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 pt-0.5 ${!isLast ? 'pb-3 sm:pb-3.5' : 'pb-0'}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${
                      isActive
                        ? 'text-primary'
                        : isCompleted
                          ? 'text-stone-900'
                          : 'text-stone-400'
                    }`}
                  >
                    {stage.title}
                  </h3>

                  {isCompleted && formattedTime && index === 0 && (
                    <span className="text-[11px] text-stone-400 font-medium shrink-0">
                      {formattedTime}
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${
                    isActive
                      ? 'text-stone-700 font-medium'
                      : isCompleted
                        ? 'text-stone-500'
                        : 'text-stone-400'
                  }`}
                >
                  {stage.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MandiriTrackingTimeline
