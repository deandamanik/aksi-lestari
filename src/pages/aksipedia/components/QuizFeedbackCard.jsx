import { CheckCircle2Icon, InfoIcon } from '../../../components/common/Icons'

function QuizFeedbackCard({ isCorrect, explanation }) {
  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 text-xs sm:text-sm mb-6 flex items-start gap-3 animate-in fade-in duration-200 ${
        isCorrect
          ? 'bg-emerald-50/90 border-emerald-300/90 text-emerald-950'
          : 'bg-amber-50/90 border-amber-300/90 text-amber-950'
      }`}
    >
      {isCorrect ? (
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
          <CheckCircle2Icon className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
          <InfoIcon className="w-4 h-4 text-white" />
        </div>
      )}

      <div>
        <strong className="block font-bold mb-1">
          {isCorrect ? 'Jawaban Kamu Tepat!' : 'Jawaban Kurang Tepat'}
        </strong>
        <p className="leading-relaxed opacity-90">{explanation}</p>
      </div>
    </div>
  )
}

export default QuizFeedbackCard
