import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import IdentifiedWasteSummary from './components/aksi/IdentifiedWasteSummary'
import MandiriPhotoAfterCard from './components/mandiri/MandiriPhotoAfterCard'
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/Icons'

function LaporMandiriFotoPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()

  const afterPhoto = reportData.mandiri?.afterPhoto
  const hasPhoto = Boolean(afterPhoto?.file)

  const handlePhotoSelect = useCallback(
    (file) => {
      updateReport({
        mandiri: {
          afterPhoto: {
            file,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            capturedAt: Date.now(),
          },
        },
      })
    },
    [updateReport]
  )

  const handleBack = useCallback(() => {
    navigate('/lapor/mandiri/panduan')
  }, [navigate])

  const handleContinue = useCallback(() => {
    if (!hasPhoto) return
    navigate('/lapor/mandiri/validasi')
  }, [hasPhoto, navigate])

  return (
    <main
      className="min-h-[100svh] bg-[#F9F8F3] pt-24 sm:pt-28 pb-14 sm:pb-18"
      style={{ backgroundColor: '#F9F8F3' }}
      aria-label="Lapor Sampah — Dokumentasi Foto Setelah"
    >
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        {/* Step Header */}
        <LaporStepHeader
          step={4}
          title="Foto Setelah"
          subtitle="Tunjukkan kondisi setelah sampah ditangani."
          className="pt-2 pb-1"
        />

        {/* Compact Identified Waste Summary */}
        <IdentifiedWasteSummary
          photo={reportData.temukan?.photo}
          kenali={reportData.kenali}
        />

        {/* Main Foto Setelah Documentation Area */}
        <MandiriPhotoAfterCard
          photo={afterPhoto}
          onPhotoSelect={handlePhotoSelect}
        />

        {/* Bottom Navigation */}
        <div className="mt-2 sm:mt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
            aria-label="Kembali ke Panduan"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Panduan</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!hasPhoto}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              hasPhoto
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                : 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
            }`}
            aria-label="Lanjut ke Validasi"
            aria-disabled={!hasPhoto}
          >
            <span>Lanjut ke Validasi</span>
            <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriFotoPage
