import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowRightIcon, InfoIcon } from '../../components/common/Icons'
import QuizQuestionCard from './components/QuizQuestionCard'
import QuizFeedbackCard from './components/QuizFeedbackCard'
import QuizResultCard from './components/QuizResultCard'
import { DETAILED_MODULES } from '../../data/aksipedia/modulesData'

function ModuleQuizPage() {
  const { moduleId } = useParams()
  const module = DETAILED_MODULES[moduleId] || DETAILED_MODULES['memahami-jenis-sampah']
  const questions = module.quizzes || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex, isFinished])

  const currentQ = questions[currentIndex]

  const handleSelectOption = (key) => {
    if (hasAnswered) return
    setSelectedKey(key)
    setHasAnswered(true)

    if (key === currentQ.correctKey) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (!hasAnswered) return

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedKey(null)
      setHasAnswered(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedKey(null)
    setHasAnswered(false)
    setCorrectCount(0)
    setIsFinished(false)
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  return (
    <main className="min-h-screen bg-neutral text-primary pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-[700px] mx-auto px-3.5 sm:px-6">
        {/* Main Quiz Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-4.5 xs:p-6 sm:p-10 shadow-xs lapor-enter-card">
          {!isFinished ? (
            <div>
              {/* Header Info & Progress */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center justify-between gap-3 mb-2 select-none">
                  <span className="text-[11px] sm:text-xs font-bold text-secondary uppercase tracking-wider">
                    EVALUASI PEMAHAMAN
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-stone-500">
                    Soal {currentIndex + 1} dari {questions.length}
                  </span>
                </div>

                <h1 className="font-display font-bold text-primary text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 leading-snug tracking-tight">
                  Kuis — {module.title}
                </h1>

                {/* Progress bar */}
                <div
                  className="w-full h-1.5 sm:h-2 rounded-full bg-stone-200 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Kemajuan evaluasi modul"
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question & Options */}
              {currentQ && (
                <QuizQuestionCard
                  questionData={currentQ}
                  selectedKey={selectedKey}
                  onSelectOption={handleSelectOption}
                  hasAnswered={hasAnswered}
                />
              )}

              {/* Feedback explanation (shows upon answer) */}
              {hasAnswered && currentQ && (
                <QuizFeedbackCard
                  isCorrect={selectedKey === currentQ.correctKey}
                  explanation={currentQ.explanation}
                />
              )}

              {/* Action row */}
              <div className="pt-4 sm:pt-5 border-t border-border-warm/60 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                {!hasAnswered ? (
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-400 select-none text-center sm:text-left">
                    <InfoIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Pilih salah satu jawaban untuk melanjutkan</span>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  disabled={!hasAnswered}
                  onClick={handleNext}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-body text-sm font-semibold transition-all cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none ${
                    hasAnswered
                      ? 'bg-primary text-white hover:bg-primary/90 active:scale-[0.98]'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentIndex === questions.length - 1 ? 'Selesaikan' : 'Lanjutkan'}</span>
                  <ArrowRightIcon className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                </button>
              </div>
            </div>
          ) : (
            <QuizResultCard
              correctCount={correctCount}
              totalQuestions={questions.length}
              onRestartQuiz={handleRestart}
              moduleId={module.id}
            />
          )}
        </div>

        {/* Quiet Footnote */}
        <p className="text-center text-xs text-stone-400 mt-6 leading-relaxed select-none">
          Evaluasi materi AksiPedia · Bertujuan mengukur pemahaman tanpa batasan waktu pengerjaan
        </p>
      </div>
    </main>
  )
}

export default ModuleQuizPage
