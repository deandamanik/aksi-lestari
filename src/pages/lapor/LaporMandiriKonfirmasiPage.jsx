import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import ReportPhotoSummary from './components/shared/ReportPhotoSummary'
import ReportReviewSummary from './components/shared/ReportReviewSummary'
import MandiriSafetyCard from './components/mandiri/MandiriSafetyCard'
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/Icons'

function LaporMandiriKonfirmasiPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleSaveLocation = useCallback(
    (newLocation) => {
      updateReport({
        temukan: {
          location: newLocation,
        },
      })
    },
    [updateReport]
  )

  const handleSaveDescription = useCallback(
    (newText) => {
      updateReport({
        temukan: {
          description: {
            text: newText,
          },
        },
      })
    },
    [updateReport]
  )

  const handleBack = useCallback(() => {
    if (isLoading) return
    navigate('/lapor/aksi')
  }, [isLoading, navigate])

  const handleContinue = useCallback(() => {
    if (!isConfirmed || isLoading) return
    setIsLoading(true)

    timerRef.current = setTimeout(() => {
      navigate('/lapor/mandiri/panduan')
    }, 800)
  }, [isConfirmed, isLoading, navigate])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Lapor Sampah — Konfirmasi Aksi Mandiri"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        <LaporStepHeader
          step={4}
          title="Konfirmasi Aksi Mandiri"
          subtitle="Pastikan informasi temuan sudah sesuai sebelum melanjutkan ke panduan penanganan."
          className="pt-2 pb-1 lapor-enter-header"
        />

        {/* Two-Column Layout: Left = Photo Temuan, Right = Review Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <div className="lapor-enter-card">
            <ReportPhotoSummary photo={reportData.temukan?.photo} />
          </div>

          <div className="lapor-enter-card-delay-1">
            <ReportReviewSummary
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              onSaveLocation={handleSaveLocation}
              onSaveDescription={handleSaveDescription}
            />
          </div>
        </div>

        {/* Safety Acknowledgement */}
        <div className="lapor-enter-card-delay-2">
          <MandiriSafetyCard
            isConfirmed={isConfirmed}
            onToggle={setIsConfirmed}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-2 sm:mt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 lapor-enter-actions">
          <button
            type="button"
            onClick={handleBack}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 transition-colors select-none w-full sm:w-auto ${
              isLoading
                ? 'opacity-40 cursor-not-allowed pointer-events-none'
                : 'hover:bg-primary/[0.04] hover:border-primary/45 shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            }`}
            aria-label="Kembali ke Pilih Aksi"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Pilih Aksi</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!isConfirmed || isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              isConfirmed && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                : 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
            }`}
            aria-label="Lanjut ke Panduan"
            aria-disabled={!isConfirmed || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>Menyiapkan Panduan...</span>
              </>
            ) : (
              <>
                <span>Lanjut ke Panduan</span>
                <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriKonfirmasiPage
