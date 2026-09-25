import ProtectedModuleLink from './ProtectedModuleLink'
import { ArrowRightIcon } from '../../../components/common/Icons'
import { FEATURED_MODULE_DATA } from '../../../data/aksipedia/modulesData'

function FeaturedModuleCard() {
  const {
    eyebrow,
    title,
    description,
    progressLabel,
    progressPercentage,
    ctaText,
    image,
    link,
  } = FEATURED_MODULE_DATA

  return (
    <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Featured Image */}
        <div className="lg:col-span-5">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-border-warm/60">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 select-none">
              {eyebrow}
            </span>

            <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl leading-snug mb-3">
              {title}
            </h2>

            <p className="font-body text-primary/75 text-sm sm:text-base leading-relaxed mb-6">
              {description}
            </p>
          </div>

          <div className="pt-4 border-t border-border-warm/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Subtle Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-primary/80">
                {progressLabel}
              </span>
              <div
                className="w-20 sm:w-28 h-2 rounded-full bg-stone-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Kemajuan modul unggulan"
              >
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <ProtectedModuleLink
              to={link}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all self-start sm:self-auto group"
            >
              <span>{ctaText}</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </ProtectedModuleLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedModuleCard
