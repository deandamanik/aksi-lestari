import { useInView } from '../../../hooks/useInView'
import {
  ClockIcon,
  SproutIcon,
  WrenchIcon,
  FunnelIcon,
} from '../../../components/common/Icons'
import { REUSE_IDEAS } from '../../../data/aksipedia/wasteScanResultData'

function getReuseIcon(iconType) {
  switch (iconType) {
    case 'sprout':
      return <SproutIcon className="w-4.5 h-4.5 text-secondary" />
    case 'wrench':
      return <WrenchIcon className="w-4.5 h-4.5 text-primary" />
    case 'funnel':
      return <FunnelIcon className="w-4.5 h-4.5 text-primary" />
    default:
      return null
  }
}

function ReuseIdeasSection() {
  const [sectionRef, inView] = useInView({ threshold: 0.08 })
  const baseTransition = 'transition-all duration-700 ease-out will-change-[opacity,transform]'

  return (
    <section ref={sectionRef} className="w-full pb-14 sm:pb-16 lg:pb-20" aria-label="Ide Pemanfaatan Mandiri">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with quiet note — No Eyebrow */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 ${baseTransition} ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl tracking-tight mb-1.5">
              Ide Pemanfaatan
            </h2>
            <p className="font-body text-primary/75 text-sm sm:text-base max-w-xl">
              Pilihan praktis jika kamu ingin menggunakan kembali botol plastik sebelum menyalurkannya ke fasilitas daur ulang.
            </p>
          </div>

          <span className="self-start sm:self-auto text-xs font-semibold text-stone-400 tracking-wider uppercase select-none">
            Non-Komersial & Praktis
          </span>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {REUSE_IDEAS.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border border-border-warm p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors ${baseTransition} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${90 + idx * 80}ms` }}
            >
              <div>
                {/* Clean Natural Icon */}
                <div className="w-10 h-10 rounded-xl bg-neutral border border-border-warm flex items-center justify-center mb-4 select-none">
                  {getReuseIcon(item.iconType)}
                </div>

                {/* Clean Category Label */}
                <span className="block text-xs font-bold tracking-wider uppercase text-secondary mb-2 select-none">
                  {item.badge}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-primary text-lg sm:text-xl mb-2.5 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Time & Difficulty */}
              <div className="pt-4 border-t border-border-warm/60 flex items-center justify-between text-xs text-stone-500 select-none">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
                  {item.time}
                </span>
                <span className="font-semibold text-primary/80">{item.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReuseIdeasSection
