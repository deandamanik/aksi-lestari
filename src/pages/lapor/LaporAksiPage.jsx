import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import { ACTION_OPTIONS } from '../../data/lapor/actionOptionsData'
import LaporStepHeader from './components/shared/LaporStepHeader'
import IdentifiedWasteSummary from './components/aksi/IdentifiedWasteSummary'
import ActionChoiceCard from './components/aksi/ActionChoiceCard'
import { ArrowLeftIcon, ArrowRightIcon, ShieldAlertIcon } from '../../components/common/Icons'

/**
 * LaporAksiPage — Step 03: Pilih Aksi (/lapor/aksi)
 *
 * The decision stage of the 4-step Lapor reporting workflow.
 * Answers: "Given what we just learned about this waste, what should I do now?"
 *
 * Presents two distinct, grounded actions:
 * 1. Laporkan Sampah (Authority/community collection for public/large waste)
 * 2. Tangani Sendiri (Safe, direct citizen handling for light/accessible waste)
 *
 * Selection state is stored directly in `reportData.aksi.type` in LaporContext
 * to prevent duplicate state and ensure persistence across workflow navigation.
 */
function LaporAksiPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()

  const selectedAction = reportData.aksi?.type
  const canContinue = Boolean(selectedAction)

  const handleSelectAction = useCallback(
    (actionId) => {
      // Commit selected action type directly to LaporContext as the single source of truth
      updateReport({
        aksi: {
          type: actionId,
        },
      })
    },
    [updateReport]
  )

  const handleBack = useCallback(() => {
    navigate('/lapor/kenali')
  }, [navigate])

  const handleContinue = useCallback(() => {
    if (!canContinue) return
    if (selectedAction === 'mandiri') {
      navigate('/lapor/mandiri/konfirmasi')
    } else {
      navigate('/lapor/selesai')
    }
  }, [canContinue, selectedAction, navigate])

  return (
    <main
      className="min-h-[100svh] bg-[#F9F8F3] pt-24 sm:pt-28 pb-14 sm:pb-18"
      style={{ backgroundColor: '#F9F8F3' }}
      aria-label="Lapor Sampah — Langkah 3: Pilih Aksimu"
    >
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        {/* Step Header */}
        <LaporStepHeader
          step={3}
          title="Pilih Aksimu"
          subtitle="Setelah memahami temuan ini, pilih tindakan yang paling sesuai."
          className="pt-2 pb-1"
        />

        {/* Compact Identified Waste Context */}
        <IdentifiedWasteSummary
          photo={reportData.temukan?.photo}
          kenali={reportData.kenali}
        />

        <p className="text-center text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed -mt-1 sm:-mt-2">
          Pilih tindakan yang paling sesuai dengan kondisi di lokasi.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch"
          role="radiogroup"
          aria-label="Pilihan tindakan penanganan sampah"
        >
          {ACTION_OPTIONS.map((option) => (
            <ActionChoiceCard
              key={option.id}
              option={option}
              isSelected={selectedAction === option.id}
              onSelect={handleSelectAction}
            />
          ))}
        </div>

        <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-500 text-left leading-relaxed">
          <ShieldAlertIcon className="w-4 h-4 text-amber-600/80 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
          <p className="text-stone-500">
            <span className="font-semibold text-stone-700">Utamakan keselamatan. </span>
            Jangan tangani sendiri jika terdapat pecahan beling, benda tajam, kabel beraliran listrik, atau indikasi limbah B3.
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-2 sm:mt-4 flex flex-col items-center">
          <div className="w-full flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
              aria-label="Kembali ke Langkah 2 (Kenali)"
            >
              <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
              <span>Kembali ke Langkah 2 (Kenali)</span>
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
                canContinue
                  ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  : 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
              }`}
              aria-label="Lanjutkan ke Selesai"
              aria-disabled={!canContinue}
            >
              <span>Lanjutkan ke Selesai</span>
              <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
            </button>
          </div>

          {!canContinue && (
            <p className="mt-2.5 text-center text-xs text-stone-500 font-medium">
              Pilih salah satu tindakan di atas untuk melanjutkan ke tahap akhir
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default LaporAksiPage
