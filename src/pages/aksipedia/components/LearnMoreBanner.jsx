import { Link } from 'react-router-dom'
import { BookOpenIcon, ArrowRightIcon } from '../../../components/common/Icons'

function LearnMoreBanner() {
  return (
    <section className="w-full pb-14 sm:pb-16 lg:pb-20" aria-label="Pelajari Modul">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border-warm pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5 mb-1.5">
              <BookOpenIcon className="w-4 h-4 text-secondary shrink-0" />
              <h2 className="font-display font-bold text-primary text-xl sm:text-2xl tracking-tight">
                Pelajari Modul
              </h2>
            </div>
            <p className="font-body text-primary/75 text-xs sm:text-sm sm:leading-relaxed">
              Temukan materi terkait dan pahami lebih jauh tentang pengelolaan material ini.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/aksipedia#modul"
              className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm transition-colors shadow-2xs active:scale-[0.98] select-none cursor-pointer"
            >
              <span>Pelajari Modul</span>
              <ArrowRightIcon className="w-4 h-4 text-white" strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearnMoreBanner
