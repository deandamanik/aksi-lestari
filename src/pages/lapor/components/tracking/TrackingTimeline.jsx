import { CheckIcon, ClockIcon, FlagIcon } from '../../../../components/common/Icons'
import { formatDateTime } from '../../../../utils/formatters'

const TIMELINE_STAGES = [
  {
    step: 1,
    title: 'Laporan Terkirim',
    desc: 'Laporan berhasil diterima dari kamu.',
    status: 'completed',
  },
  {
    step: 2,
    title: 'Sedang Divalidasi',
    desc: 'Temuan sedang diperiksa sebelum diteruskan ke proses penanganan.',
    status: 'active',
  },
  {
    step: 3,
    title: 'Petugas Ditugaskan',
    desc: 'Laporan akan diteruskan kepada petugas setelah validasi selesai.',
    status: 'upcoming',
  },
  {
    step: 4,
    title: 'Petugas Menuju Lokasi',
    desc: 'Petugas akan menuju lokasi temuan untuk melakukan penanganan.',
    status: 'upcoming',
  },
  {
    step: 5,
    title: 'Sampah Sedang Ditangani',
    desc: 'Penanganan dilakukan di lokasi sesuai kondisi temuan.',
    status: 'upcoming',
  },
  {
    step: 6,
    title: 'Penanganan Selesai',
    desc: 'Penanganan selesai dan laporan dinyatakan tuntas.',
    status: 'upcoming',
  },
]

function TrackingTimeline({ createdAt }) {
  const formattedTime = formatDateTime(createdAt, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 flex flex-col gap-4">
      {/* Header — clean without decorative pills */}
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
        <FlagIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
        <h2 className="font-bold text-sm text-stone-900">
          Alur Penanganan & Kronologi
        </h2>
      </div>

      {/* 6-Stage Lifecycle Timeline */}
      <div className="flex flex-col">
        {TIMELINE_STAGES.map((stage, index) => {
          const isCompleted = stage.status === 'completed'
          const isActive = stage.status === 'active'
          const isLast = index === TIMELINE_STAGES.length - 1

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
                    } ${index === 0 ? 'h-11 sm:h-10' : 'h-10 sm:h-9'}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 min-w-0 pt-0.5 ${!isLast ? 'pb-2.5 sm:pb-3' : 'pb-0'}`}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3
                    className={`text-sm font-bold leading-tight ${
                      isCompleted
                        ? 'text-stone-900'
                        : isActive
                          ? 'text-primary'
                          : 'text-stone-400'
                    }`}
                  >
                    {stage.step}. {stage.title}
                  </h3>

                  {isCompleted && formattedTime && (
                    <span className="text-[11px] font-mono text-stone-400">
                      {formattedTime}
                    </span>
                  )}

                  {isActive && (
                    <span className="text-[11px] font-bold text-primary select-none">
                      Sedang Berlangsung
                    </span>
                  )}

                  {!isCompleted && !isActive && (
                    <span className="text-[11px] font-medium text-stone-400 select-none">
                      Menunggu
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs leading-relaxed mt-0.5 ${
                    isCompleted
                      ? 'text-stone-500'
                      : isActive
                        ? 'text-stone-600 font-medium'
                        : 'text-stone-400'
                  }`}
                >
                  {stage.desc}
                </p>

                {isCompleted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary mt-0.5 select-none">
                    <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
                    Selesai
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrackingTimeline
