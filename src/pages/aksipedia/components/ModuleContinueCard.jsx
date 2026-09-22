import { Link } from 'react-router-dom'
import { BookOpenIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { CONTINUE_LEARNING_DATA } from '../../../data/aksipedia/modulesData'

function ModuleContinueCard() {
  const { title, partsInfo, progressPercentage, link } = CONTINUE_LEARNING_DATA

  return (
    <div className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Icon & Info */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 select-none">
            <BookOpenIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 select-none">
              <span>Lanjutkan Belajar</span>
              <span className="mx-1.5 text-stone-300">·</span>
              <span className="text-stone-500 font-normal lowercase">{partsInfo}</span>
            </div>
            <h3 className="font-display font-bold text-primary text-base sm:text-lg">
              {title}
            </h3>
          </div>
        </div>

        {/* Right: Progress & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5 text-xs text-stone-500">
            <span>Progress <strong className="text-primary font-bold">{progressPercentage}%</strong> terselesaikan</span>
            <div
              className="w-20 sm:w-28 h-2 rounded-full bg-stone-200 overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Kemajuan modul aktif"
            >
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <Link
            to={link}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all self-start sm:self-auto group"
          >
            <span>Lanjutkan</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModuleContinueCard
