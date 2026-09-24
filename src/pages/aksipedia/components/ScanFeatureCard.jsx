import { CameraIcon, ArrowRightIcon, InfoIcon } from '../../../components/common/Icons'
import { SCAN_FEATURE_INFO } from '../../../data/aksipedia/aksipediaHubData'

function ScanFeatureCard({ onStartScan }) {
  return (
    <section className="w-full pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Waste Picture */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border-warm/60 bg-stone-100">
                <img
                  src="/images/aksipedia/sample-waste.jpg"
                  alt="Sampah botol dan kemasan makanan diuji deteksi lapangan"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-xs font-semibold select-none">
                  <CameraIcon className="w-3.5 h-3.5 text-secondary" />
                  <span>{SCAN_FEATURE_INFO.imageBadge}</span>
                </div>
              </div>
            </div>

            {/* Right: Scan Information & Clean Steps */}
            <div className="lg:col-span-6 flex flex-col justify-center items-start">
              {/* Clean Inline Eyebrow */}
              <div className="text-xs font-bold tracking-wider uppercase text-stone-500 mb-2.5 select-none">
                <span className="text-primary">{SCAN_FEATURE_INFO.badgeCategory}</span>
                <span className="mx-1.5 text-stone-300">·</span>
                <span className="text-secondary">{SCAN_FEATURE_INFO.badgeSub}</span>
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
                {SCAN_FEATURE_INFO.title}
              </h2>

              {/* Description */}
              <p className="font-body text-primary/75 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                {SCAN_FEATURE_INFO.description}
              </p>

              {/* Clean 3-Step Flow (No bulky pill containers) */}
              <div className="w-full flex items-center gap-3 py-2.5 px-3.5 rounded-lg bg-neutral border border-border-warm/60 mb-6 select-none overflow-x-auto">
                {SCAN_FEATURE_INFO.steps.map((step, idx) => (
                  <div key={step.number} className="flex items-center gap-2.5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-primary">
                        {step.number}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-primary/90">
                        {step.label}
                      </span>
                    </div>
                    {idx < SCAN_FEATURE_INFO.steps.length - 1 && (
                      <ArrowRightIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onStartScan}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                <CameraIcon className="w-4 h-4 text-white" />
                <span>{SCAN_FEATURE_INFO.ctaText}</span>
              </button>

              {/* Simulation Note */}
              <div className="flex items-center gap-1.5 mt-3 text-xs text-stone-500">
                <InfoIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{SCAN_FEATURE_INFO.disclaimer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScanFeatureCard
