import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import ReportPhotoSummary from './components/shared/ReportPhotoSummary'
import ReportReviewSummary from './components/shared/ReportReviewSummary'
import { ArrowLeftIcon, CheckIcon, InfoIcon } from '../../components/common/Icons'

function LaporSelesaiPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current)
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
    if (isSubmitting) return
    navigate('/lapor/aksi')
  }, [isSubmitting, navigate])

  const handleSubmit = useCallback(() => {
    if (isSubmitting) return
    setIsSubmitting(true)

    submitTimerRef.current = setTimeout(() => {
      updateReport({
        reportStatus: 'submitted',
        createdAt: reportData.createdAt || Date.now(),
      })
      navigate('/lapor/tracking')
    }, 1200)
  }, [isSubmitting, navigate, reportData.createdAt, updateReport])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Lapor Sampah — Langkah 4: Konfirmasi Laporan"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        <LaporStepHeader
          step={4}
          title="Konfirmasi Laporanmu"
          subtitle="Pastikan informasi temuan sudah sesuai sebelum dikirim."
          className="pt-2 pb-1 lapor-enter-header"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <div className="flex flex-col gap-3.5 sm:gap-4 lapor-enter-card">
            <ReportPhotoSummary photo={reportData.temukan?.photo} />

            <div className="flex items-start gap-2 text-xs text-stone-500 text-left leading-relaxed px-1">
              <InfoIcon className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
              <p>
                Informasi laporan akan diperiksa sebelum dinyatakan valid. Hasil verifikasi akan menentukan status tindak lanjut dan apresiasi yang diterima.
              </p>
            </div>
          </div>

          <div className="lapor-enter-card-delay-1">
            <ReportReviewSummary
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              aksi={reportData.aksi}
              onSaveLocation={handleSaveLocation}
              onSaveDescription={handleSaveDescription}
            />
          </div>
        </div>

        <div className="mt-2 sm:mt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 lapor-enter-actions">
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 transition-colors select-none w-full sm:w-auto ${
              isSubmitting
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              isSubmitting
                ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
                : 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            }`}
            aria-label="Kirim Laporan"
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>Mengirim Laporan...</span>
              </>
            ) : (
              <>
                <CheckIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
                <span>Kirim Laporan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporSelesaiPage
