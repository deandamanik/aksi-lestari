import { CheckCircle2Icon } from '../../../components/common/Icons'

function QuizQuestionCard({
  questionData,
  selectedKey,
  onSelectOption,
  hasAnswered,
}) {
  const { question, options, correctKey } = questionData

  return (
    <div>
      {/* Question Label */}
      <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5 select-none">
        Pertanyaan:
      </span>

      {/* Question Headline */}
      <h2 className="font-display font-bold text-primary text-base xs:text-lg sm:text-xl md:text-2xl leading-snug mb-4 sm:mb-6">
        {question}
      </h2>

      {/* 4 Interactive Option Buttons */}
      <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6" role="radiogroup">
        {options.map((opt) => {
          const isSelected = selectedKey === opt.key
          const isCorrect = opt.key === correctKey

          let btnClass = 'border-stone-200 hover:border-primary/50 hover:bg-stone-50/80'
          let circleClass = 'bg-stone-100 text-stone-600 border border-stone-300/80'

          if (hasAnswered) {
            if (isCorrect) {
              btnClass = 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium'
              circleClass = 'bg-emerald-600 text-white border-emerald-600'
            } else if (isSelected && !isCorrect) {
              btnClass = 'border-red-400 bg-red-50/70 text-red-950'
              circleClass = 'bg-red-500 text-white border-red-500'
            } else {
              btnClass = 'border-stone-200 opacity-60'
            }
          } else if (isSelected) {
            btnClass = 'border-primary bg-primary/5 text-primary font-semibold'
            circleClass = 'bg-primary text-white border-primary'
          }

          return (
            <button
              key={opt.key}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelectOption(opt.key)}
              className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center gap-3 sm:gap-3.5 transition-all text-xs sm:text-sm cursor-pointer disabled:cursor-default active:scale-[0.99] ${btnClass}`}
              role="radio"
              aria-checked={isSelected}
            >
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 transition-colors ${circleClass}`}
              >
                {hasAnswered && isCorrect ? (
                  <CheckCircle2Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                ) : (
                  opt.key
                )}
              </span>

              <span className="leading-snug sm:leading-relaxed flex-1 font-medium">{opt.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuizQuestionCard
