import { CheckCircle2Icon, InfoIcon } from '../../../components/common/Icons'

function QuizFeedbackCard({ isCorrect, explanation }) {
  return (
    <div
      className={`rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 text-xs sm:text-sm mb-5 sm:mb-6 flex items-start gap-2.5 sm:gap-3.5 animate-content-rise ${
        isCorrect
          ? 'bg-emerald-50/90 border-emerald-300/90 text-emerald-950'
          : 'bg-amber-50/90 border-amber-300/90 text-amber-950'
      }`}
    >
      {isCorrect ? (
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
          <CheckCircle2Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      ) : (
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
          <InfoIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
      )}

      <div>
        <strong className="block font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
          {isCorrect ? 'Jawaban Kamu Tepat!' : 'Jawaban Kurang Tepat'}
        </strong>
        <p className="leading-relaxed opacity-90 text-[11px] sm:text-xs">{explanation}</p>
      </div>
    </div>
  )
}

export default QuizFeedbackCard
