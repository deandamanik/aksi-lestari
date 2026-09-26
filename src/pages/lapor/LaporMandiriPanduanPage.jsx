import { useState, useRef, useEffect, useCallback } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const categoryKey = reportData.kenali?.category || 'plastik'
  const guidance = getMandiriGuidanceData(categoryKey)

  const handleBack = useCallback(() => {
    if (isLoading) return
    navigate('/lapor/mandiri/konfirmasi')
  }, [isLoading, navigate])

  const handleContinue = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)

    timerRef.current = setTimeout(() => {
      navigate('/lapor/mandiri/foto')
    }, 800)
  }, [isLoading, navigate])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Lapor Sampah — Panduan Penanganan Mandiri"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        <LaporStepHeader
          step={4}
          title="Panduan Penanganan"
          subtitle="Ikuti langkah berikut untuk menangani temuan sampah ini secara aman dan tertib sebelum mengambil foto bukti hasil."
          className="pt-2 pb-1 lapor-enter-header"
        />

        {/* Two-Column Layout: Left = Context & Safety, Right = Practical Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: approximately 38% (lg:col-span-5) */}
          <div className="lg:col-span-5 lapor-enter-card">
            <MandiriContextCard
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              guidance={guidance}
            />
          </div>

          {/* Right Column: approximately 62% (lg:col-span-7) */}
          <div className="lg:col-span-7 lapor-enter-card-delay-1">
            <MandiriStepsCard guidance={guidance} />
          </div>
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
            aria-label="Kembali ke Konfirmasi"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Konfirmasi</span>
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
            aria-label="Lanjut ke Foto Setelah"
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>Menyiapkan Kamera...</span>
              </>
            ) : (
              <>
                <span>Lanjut ke Foto Setelah</span>
                <ArrowRightIcon className="w-4.5 h-4.5" strokeWidth={2.25} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriPanduanPage
