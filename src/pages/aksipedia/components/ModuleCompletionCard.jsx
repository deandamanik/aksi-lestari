import { Link } from 'react-router-dom'
import { SparklesIcon } from '../../../components/common/Icons'

function ModuleCompletionCard({ completion, moduleId }) {
  const {
    badge,
    headline,
    description,
    ctaText,
    secondaryText,
    footnote,
  } = completion

  return (
    <div className="max-w-[720px] mx-auto mt-16 sm:mt-20">
      <div className="bg-white rounded-2xl border border-border-warm p-8 sm:p-10 text-center flex flex-col items-center">
        {/* Soft Success Icon */}
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mb-4 select-none">
          <SparklesIcon className="w-6 h-6 text-emerald-600" />
        </div>

        {/* Small Eyebrow */}
        <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 select-none">
          {badge}
        </span>

        {/* Main Title */}
        <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl tracking-tight mb-3">
          {headline}
        </h2>

        {/* Description */}
        <p className="font-body text-primary/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center mb-6">
          <Link
            to={`/aksipedia/modul/${moduleId}/quiz`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>{ctaText}</span>
          </Link>

          <Link
            to="/aksipedia/modul"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-primary hover:bg-stone-50 text-sm font-semibold transition-all border border-stone-300"
          >
            <span>{secondaryText}</span>
          </Link>
        </div>

        {/* Footnote */}
        <p className="text-xs text-stone-400 select-none">
          {footnote}
        </p>
      </div>
    </div>
  )
}

export default ModuleCompletionCard
