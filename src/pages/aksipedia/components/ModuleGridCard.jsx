import { Link } from 'react-router-dom'
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
    <div className="bg-white rounded-2xl border border-border-warm p-6 flex flex-col justify-between hover:border-primary/40 transition-colors">
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
        <h3 className="font-display font-bold text-primary text-lg sm:text-xl leading-snug mb-2.5">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Bottom CTA Action */}
      <div className="pt-4 border-t border-border-warm/60 flex items-center justify-end">
        <Link
          to={link}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors group"
        >
          <span>{ctaText}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

export default ModuleGridCard
