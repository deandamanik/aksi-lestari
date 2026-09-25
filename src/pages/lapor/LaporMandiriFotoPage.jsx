import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import IdentifiedWasteSummary from './components/aksi/IdentifiedWasteSummary'
import PhotoUploadCard from './components/PhotoUploadCard'
import Button from '../../components/common/Button'
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
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18"
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
        <PhotoUploadCard
          value={afterPhoto?.file || null}
          onChange={handlePhotoSelect}
          title="Ambil Foto Setelah"
          helperText="Dokumentasikan kondisi setelah penanganan untuk menunjukkan hasil tindakanmu."
          statusText="Foto berhasil ditambahkan"
          size="default"
        />

        {/* Bottom Navigation */}
        <div className="mt-2 sm:mt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="rounded-full w-full sm:w-auto"
            aria-label="Kembali ke Panduan"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Panduan</span>
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            disabled={!hasPhoto}
            className="rounded-full w-full sm:w-auto"
            aria-label="Lanjut ke Validasi"
          >
            <span>Lanjut ke Validasi</span>
            <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriFotoPage
