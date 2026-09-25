import ProtectedModuleLink from './ProtectedModuleLink'
import { BookOpenIcon } from '../../../components/common/Icons'
import { LEARN_MORE_BANNER_DATA } from '../../../data/aksipedia/wasteScanResultData'

function LearnMoreBanner() {
  const { title, description, ctaText } = LEARN_MORE_BANNER_DATA

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 select-none">
              <BookOpenIcon className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h3 className="font-display font-bold text-primary text-lg sm:text-xl mb-1">
                {title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-primary/75 max-w-xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <ProtectedModuleLink
            to="/aksipedia/modul/memahami-jenis-sampah"
            className="self-start sm:self-center inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0"
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>{ctaText}</span>
          </ProtectedModuleLink>
        </div>
      </div>
    </section>
  )
}

export default LearnMoreBanner
