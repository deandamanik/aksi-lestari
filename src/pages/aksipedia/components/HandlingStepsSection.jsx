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
    <section className="w-full pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl tracking-tight mb-2">
            Cara Menanganinya
          </h2>
          <p className="font-body text-primary/75 text-sm sm:text-base">
            Langkah sederhana mempersiapkan botol plastik sebelum disalurkan atau dimanfaatkan.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HANDLING_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-3xl border border-border-warm p-6 flex flex-col justify-between shadow-xs hover:border-secondary/40 transition-colors"
            >
              <div>
                {/* Step Circle Number */}
                <div className="w-9 h-9 rounded-full bg-[#F0F5E8] border border-secondary/30 text-primary font-bold text-sm flex items-center justify-center mb-4 select-none">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-primary text-lg sm:text-xl mb-2.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Tag / Micro benefit */}
              <div className="pt-3 border-t border-border-warm/60 flex items-center gap-1.5 text-xs font-semibold text-primary/80 select-none">
                {getStepIcon(item.iconType)}
                <span>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HandlingStepsSection
