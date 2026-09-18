import { useNavigate } from 'react-router-dom'
import { LAPOR_STEPS } from '../../data/lapor/laporSteps'
import LaporStepHeader from './components/shared/LaporStepHeader'
import LaporStepNavigation from './components/shared/LaporStepNavigation'

/**
 * LaporPlaceholderPage
 *
 * Temporary scaffolding for Lapor steps 2–4 (Kenali, Pilih Aksi, Selesai).
 * Renders the full shared shell (header + stepper + navigation) so the
 * component architecture and navigation flow are verifiable before each
 * step's real UI is designed and built.
 *
 * This file will be removed step-by-step as real step pages are implemented.
 *
 * Props:
 *   step {number} — 1-indexed step number (2–4)
 */
function LaporPlaceholderPage({ step }) {
  const navigate = useNavigate()

  const stepDef = LAPOR_STEPS.find((s) => s.step === step)
  const prevStep = LAPOR_STEPS.find((s) => s.step === step - 1)

  const handleBack = () => {
    // Step 2 goes back to /lapor/temukan; other steps go to the previous LAPOR_STEPS entry
    navigate(prevStep?.path ?? '/lapor/temukan')
  }

  const handleNext = () => {
    const nextStep = LAPOR_STEPS.find((s) => s.step === step + 1)
    if (nextStep) navigate(nextStep.path)
  }

  const isLastStep = step === LAPOR_STEPS.length

  return (
    <main
      className="min-h-[100svh] pt-24 sm:pt-28 pb-14 sm:pb-18"
      style={{ backgroundColor: '#F9F8F3' }}
      aria-label={`Lapor - Langkah ${step}: ${stepDef?.label}`}
    >
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center gap-8">
        <LaporStepHeader
          step={step}
          title={stepDef?.label ?? `Langkah ${step}`}
          subtitle="Halaman ini sedang disiapkan."
        />

        <div className="w-full max-w-[480px] mx-auto">
          <div className="rounded-3xl bg-white/80 border-2 border-dashed border-stone-300 p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="font-bold text-stone-700 text-base">
              {stepDef?.label} — Segera Hadir
            </p>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Langkah ini sedang dalam pengembangan dan akan tersedia setelah langkah sebelumnya selesai diimplementasikan.
            </p>
          </div>
        </div>

        {/* Shared navigation */}
        <div className="w-full flex justify-center">
          <LaporStepNavigation
            onBack={handleBack}
            onNext={handleNext}
            nextLabel={isLastStep ? 'Kirim Laporan' : `Lanjutkan ke ${LAPOR_STEPS.find((s) => s.step === step + 1)?.label ?? ''}`}
            isNextDisabled={true}
            helperText="Langkah ini belum tersedia — gunakan tombol Kembali untuk kembali ke langkah sebelumnya."
          />
        </div>
      </div>
    </main>
  )
}

export default LaporPlaceholderPage
