import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import { getIdentificationData } from '../../data/lapor/identificationData'
import LaporStepHeader from './components/shared/LaporStepHeader'
import ReportPhotoSummary from './components/shared/ReportPhotoSummary'
import IdentificationCard from './components/kenali/IdentificationCard'
import KenaliAttentionCards from './components/kenali/KenaliAttentionCards'
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/Icons'

/**
 * LaporKenaliPage — Step 02: Kenali (/lapor/kenali)
 *
 * Second main stage of the 4-step Lapor reporting workflow.
 * Connects evidence from Step 01 to educational & actionable understanding:
 *
 *   TEMUKAN (Evidence & location)
 *   → KENALI (Identification, characteristics, impact, safety, recommendations)
 *   → PILIH AKSI (Decision: report vs handle)
 *   → SELESAI (Confirmation)
 *
 * Identification content is retrieved from static data so future ML services
 * can be integrated without modifying the presentation architecture.
 */
function LaporKenaliPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const photo = reportData.temukan.photo
  const categoryKey = reportData.kenali.category || 'plastik'
  const identification = getIdentificationData(categoryKey)

  const handleContinue = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)

    timerRef.current = setTimeout(() => {
      // Commit the active identification into LaporContext before continuing
      updateReport({
        kenali: {
          category: categoryKey,
          label: identification.label,
        },
      })
      navigate('/lapor/aksi')
    }, 900)
  }, [isLoading, categoryKey, identification.label, navigate, updateReport])

  const handleBack = useCallback(() => {
    if (isLoading) return
    navigate('/lapor/temukan')
  }, [isLoading, navigate])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Lapor Sampah — Langkah 2: Kenali Temuanmu"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Header */}
        <LaporStepHeader
          step={2}
          title="Kenali Temuanmu"
          subtitle="Pahami jenis sampah, tingkat perhatian lingkungan, dan tata cara penanganan yang aman."
          className="pt-2 pb-2 lapor-enter-header"
        />

        {/* Main 2-column layout — balanced 50/50 distribution matching Step 1 and Step 4 */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          {/* Left Column: Evidence Photo Summary + Attention & Safety Notices */}
          <div className="flex flex-col gap-3.5 sm:gap-4 lapor-enter-card">
            <ReportPhotoSummary photo={photo} />
            <KenaliAttentionCards data={identification} />
          </div>

          {/* Right Column: Identification, Characteristics, Environmental Impact & Handling Guidance */}
          <div className="lapor-enter-card-delay-1">
            <IdentificationCard data={identification} />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 lapor-enter-actions">
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 transition-colors select-none w-full sm:w-auto ${
              isLoading
                ? 'opacity-40 cursor-not-allowed pointer-events-none'
                : 'hover:bg-primary/[0.04] hover:border-primary/45 shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            }`}
            aria-label="Kembali ke langkah Temukan"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              isLoading
                ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
                : 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            }`}
            aria-label="Lanjutkan ke Langkah 3 (Pilih Aksi)"
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>Menyiapkan Pilihan Aksi...</span>
              </>
            ) : (
              <>
                <span>Lanjutkan ke Langkah 3 (Pilih Aksi)</span>
                <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporKenaliPage
