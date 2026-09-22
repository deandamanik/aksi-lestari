import { Link } from 'react-router-dom'
import { BookOpenIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { MODULE_PROGRESS_FOOTER_DATA } from '../../../data/aksipedia/modulesData'

function ModuleProgressFooter() {
  const { info, ctaText, link } = MODULE_PROGRESS_FOOTER_DATA

  return (
    <div className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 select-none">
            <BookOpenIcon className="w-4 h-4 text-primary" />
          </div>
          <p className="font-body text-xs sm:text-sm text-stone-600">
            {info}
          </p>
        </div>

        <Link
          to={link}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors self-start sm:self-auto shrink-0 group"
        >
          <span>{ctaText}</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

export default ModuleProgressFooter
