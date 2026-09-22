import { Link } from 'react-router-dom'
import { CheckCircle2Icon, SparklesIcon, RefreshCwIcon } from '../../../components/common/Icons'

function QuizResultCard({ correctCount, totalQuestions, onRestartQuiz, moduleId }) {
  const scorePercent = Math.round((correctCount / totalQuestions) * 100)
  const isPassed = scorePercent >= 80

  return (
    <div className="text-center flex flex-col items-center py-4">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5 select-none">
        <CheckCircle2Icon className="w-7 h-7 text-emerald-600" />
      </div>

      {/* Eyebrow */}
      <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2 select-none">
        EVALUASI SELESAI
      </span>

      {/* Main Score Headline */}
      <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-4xl mb-3">
        {correctCount} dari {totalQuestions} Jawaban Benar
      </h2>

      {/* Subtitle */}
      <p className="font-body text-primary/75 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
        {isPassed
          ? 'Selamat! Pemahamanmu mengenai pemilahan dan karakteristik sampah sudah sangat baik untuk diterapkan langsung di kehidupan sehari-hari.'
          : 'Bagus! Kamu sudah menyelesaikan seluruh soal evaluasi. Kamu dapat meninjau kembali materi untuk memperkuat pemahamanmu.'}
      </p>

      {/* Score & XP summary */}
      <div className="flex items-center justify-center gap-6 py-4 px-6 rounded-xl bg-neutral border border-border-warm/80 mb-8 select-none text-xs sm:text-sm">
        <div>
          <span className="text-stone-500 block mb-0.5">Skor Akhir</span>
          <strong className="font-display font-bold text-primary text-lg sm:text-xl">
            {scorePercent}%
          </strong>
        </div>
        <div className="w-px h-8 bg-border-warm" />
        <div className="flex items-center gap-1.5 text-primary font-bold">
          <SparklesIcon className="w-4 h-4 text-accent" />
          <span>+20 XP Kontribusi</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center">
        <button
          type="button"
          onClick={onRestartQuiz}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stone-300 hover:bg-stone-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-stone-700"
        >
          <RefreshCwIcon className="w-4 h-4" />
          <span>Ulangi Evaluasi</span>
        </button>

        <Link
          to={`/aksipedia/modul/${moduleId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/5 text-xs sm:text-sm font-semibold transition-all"
        >
          <span>Baca Ulang Materi</span>
        </Link>

        <Link
          to="/aksipedia/modul"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm font-semibold transition-all"
        >
          <span>Modul Berikutnya</span>
        </Link>
      </div>
    </div>
  )
}

export default QuizResultCard
