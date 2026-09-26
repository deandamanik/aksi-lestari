import ProtectedModuleLink from './ProtectedModuleLink'
import { ArrowRightIcon, CheckCircle2Icon } from '../../../components/common/Icons'

function ModuleGridCard({ module }) {
  const {
    meta,
    status,
    isCompleted,
    title,
    description,
    ctaText,
    link,
  } = module

  return (
    <div className="bg-white rounded-2xl border border-border-warm p-6 flex flex-col justify-between shadow-2xs hover:border-primary/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300">
      <div>
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-3 mb-3 select-none">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            {meta}
          </span>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Selesai</span>
            </span>
          ) : (
            <span className="text-xs text-stone-500 font-medium">
              {status}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-normal text-primary text-lg sm:text-xl leading-snug mb-2.5">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Bottom CTA Action */}
      <div className="pt-4 border-t border-border-warm/60 flex items-center justify-end">
        <ProtectedModuleLink
          to={link}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors group"
        >
          <span>{ctaText}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </ProtectedModuleLink>
      </div>
    </div>
  )
}

export default ModuleGridCard
