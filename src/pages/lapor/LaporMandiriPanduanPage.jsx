import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import MandiriContextCard from './components/mandiri/MandiriContextCard'
import MandiriStepsCard from './components/mandiri/MandiriStepsCard'
import { getMandiriGuidanceData } from '../../data/lapor/mandiriGuidanceData'
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/Icons'

function LaporMandiriPanduanPage() {
  const navigate = useNavigate()
  const { reportData } = useLapor()

  const categoryKey = reportData.kenali?.category || 'plastik'
  const guidance = getMandiriGuidanceData(categoryKey)

  const handleBack = useCallback(() => {
    navigate('/lapor/mandiri/konfirmasi')
  }, [navigate])

  const handleContinue = useCallback(() => {
    navigate('/lapor/mandiri/foto')
  }, [navigate])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18"
      aria-label="Lapor Sampah — Panduan Penanganan Mandiri"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        <LaporStepHeader
          step={4}
          title="Panduan Penanganan"
          subtitle="Ikuti langkah berikut untuk menangani temuan sampah ini secara aman dan tertib sebelum mengambil foto bukti hasil."
          className="pt-2 pb-1"
        />

        {/* Two-Column Layout: Left = Context & Safety, Right = Practical Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: approximately 38% (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <MandiriContextCard
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              guidance={guidance}
            />
          </div>

          {/* Right Column: approximately 62% (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <MandiriStepsCard guidance={guidance} />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-2 sm:mt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
            aria-label="Kembali ke Konfirmasi"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Konfirmasi</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors select-none w-full sm:w-auto"
            aria-label="Lanjut ke Foto Setelah"
          >
            <span>Lanjut ke Foto Setelah</span>
            <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriPanduanPage
