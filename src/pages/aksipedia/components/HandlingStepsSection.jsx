import {
  TrashIcon,
  DropletsIcon,
  CompressIcon,
  TagIcon,
} from '../../../components/common/Icons'
import { HANDLING_STEPS } from '../../../data/aksipedia/wasteScanResultData'

function getStepIcon(iconType) {
  switch (iconType) {
    case 'trash':
      return <TrashIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
    case 'droplets':
      return <DropletsIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
    case 'compress':
      return <CompressIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
    case 'tag':
      return <TagIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
    default:
      return null
  }
}

function HandlingStepsSection() {
  return (
    <section className="w-full pb-14 sm:pb-16 lg:pb-20" aria-label="Cara Menanganinya">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading — No Eyebrow */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl tracking-tight mb-1.5">
            Cara Menanganinya
          </h2>
          <p className="font-body text-primary/75 text-sm sm:text-base max-w-2xl leading-relaxed">
            Setelah mengetahui jenisnya, apa yang harus dilakukan? Ikuti 4 tahapan berurutan ini agar material siap didaur ulang secara optimal.
          </p>
        </div>

        {/* Continuous Handling Process (ONE unified sequence, not 4 separate cards) */}
        <div className="border-y border-border-warm divide-y divide-border-warm/70">
          {HANDLING_STEPS.map((item) => (
            <div
              key={item.step}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
            >
              {/* Number */}
              <span className="font-display font-bold text-2xl sm:text-3xl text-secondary select-none shrink-0 w-10">
                {String(item.step).padStart(2, '0')}
              </span>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1.5">
                  <h3 className="font-display font-bold text-primary text-base sm:text-lg">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 select-none">
                    {getStepIcon(item.iconType)}
                    <span>{item.tag}</span>
                  </span>
                </div>
                <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HandlingStepsSection
