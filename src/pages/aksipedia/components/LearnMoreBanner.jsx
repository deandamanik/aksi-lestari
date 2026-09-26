import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/common/Icons'
import { useInView } from '../../../hooks/useInView'

function LearnMoreBanner({ onResetScan }) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const baseTransition = 'transition-all duration-700 ease-out will-change-[opacity,transform]'

  return (
    <section ref={ref} className="w-full pb-14 sm:pb-16 lg:pb-20" aria-label="Aksi Selanjutnya">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`border-t border-border-warm/70 pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 ${baseTransition} ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Secondary Action: Kembali ke Scan */}
          <Link
            to="/aksipedia?mode=scan"
            onClick={onResetScan}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
            aria-label="Kembali ke Scan"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.25} />
            <span>Kembali ke Scan</span>
          </Link>

          {/* Primary Action: Pelajari Modul */}
          <Link
            to="/aksipedia#modul"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm bg-primary hover:bg-primary/90 text-white shadow-xs active:scale-[0.98] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none cursor-pointer w-full sm:w-auto"
            aria-label="Pelajari Modul"
          >
            <span>Pelajari Modul</span>
            <ArrowRightIcon className="w-4 h-4 text-white shrink-0" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LearnMoreBanner
