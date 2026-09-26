import { Link } from 'react-router-dom'
import {
  CheckCircle2Icon,
  RefreshCwIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'

function QuizResultCard({ correctCount, totalQuestions, onRestartQuiz }) {
  const scorePercent = Math.round((correctCount / totalQuestions) * 100)
  const isPassed = scorePercent >= 80

  return (
    <div className="text-center flex flex-col items-center py-2 sm:py-4 animate-content-rise">
      {/* Clean Icon (No AI-template circular background badge) */}
      <CheckCircle2Icon className="w-8 h-8 sm:w-9 sm:h-9 text-secondary mb-3 sm:mb-3.5 select-none" strokeWidth={2} />

      {/* Eyebrow */}
      <span className="text-[11px] sm:text-xs font-bold text-secondary uppercase tracking-wider block mb-1.5 sm:mb-2 select-none">
        EVALUASI SELESAI
      </span>

      {/* Main Score Headline */}
      <h2 className="font-display font-bold text-primary text-xl xs:text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 leading-snug">
        {correctCount} dari {totalQuestions} Jawaban Benar
      </h2>

      {/* Subtitle */}
      <p className="font-body text-primary/75 text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
        {isPassed
          ? 'Selamat! Pemahamanmu mengenai pemilahan dan karakteristik sampah sudah sangat baik untuk diterapkan langsung di kehidupan sehari-hari.'
          : 'Bagus! Kamu sudah menyelesaikan seluruh soal evaluasi. Kamu dapat meninjau kembali materi untuk memperkuat pemahamanmu.'}
      </p>

      {/* Action Buttons: Ulangi Evaluasi & Modul Berikutnya */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
        <button
          type="button"
          onClick={onRestartQuiz}
          className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-body font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
          aria-label="Ulangi Evaluasi"
        >
          <RefreshCwIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.25} />
          <span>Ulangi Evaluasi</span>
        </button>

        <Link
          to="/aksipedia#modul"
          className="inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-body font-semibold text-sm bg-primary hover:bg-primary/90 text-white shadow-xs active:scale-[0.98] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none cursor-pointer w-full sm:w-auto"
          aria-label="Modul Berikutnya"
        >
          <span>Modul Berikutnya</span>
          <ArrowRightIcon className="w-4 h-4 text-white shrink-0" strokeWidth={2.25} />
        </Link>
      </div>
    </div>
  )
}

export default QuizResultCard
