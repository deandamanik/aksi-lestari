import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import MandiriTrackingTimeline from './components/mandiri/MandiriTrackingTimeline'
import MandiriTrackingNextSteps from './components/mandiri/MandiriTrackingNextSteps'
import MandiriTrackingSummary from './components/mandiri/MandiriTrackingSummary'
import { ArrowLeftIcon } from '../../components/common/Icons'

function LaporMandiriValidasiPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()

  useEffect(() => {
    if (reportData.reportStatus !== 'validating' || !reportData.mandiri?.submittedAt) {
      updateReport({
        reportStatus: 'validating',
        mandiri: {
          submittedAt: reportData.mandiri?.submittedAt || Date.now(),
        },
      })
    }
  }, [reportData.mandiri?.submittedAt, reportData.reportStatus, updateReport])

  const handleGoHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <main
      className="min-h-[100svh] bg-[#F9F8F3] pt-24 sm:pt-28 pb-14 sm:pb-18"
      style={{ backgroundColor: '#F9F8F3' }}
      aria-label="Tracking Aksi Mandiri — Status Validasi"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        {/* Centered Page Header — minimal & editorial */}
        <div className="text-center pt-2 pb-1">
          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-[40px] text-primary tracking-tight leading-tight">
            Aksimu Sedang Divalidasi
          </h1>

          <p className="mt-2 font-body text-stone-600 text-xs sm:text-base max-w-lg mx-auto leading-relaxed px-2 sm:px-0">
            Bukti tindakanmu sudah dikirim dan sedang diperiksa.
          </p>
        </div>

        {/* Two-Column Tracking Composition: 55% Left / 45% Right */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-5 sm:gap-6 items-start">
          {/* Left Column: Timeline + Apa Selanjutnya? */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            <MandiriTrackingTimeline submittedAt={reportData.mandiri?.submittedAt} />
            <MandiriTrackingNextSteps />
          </div>

          {/* Right Column: Submitted Mandiri Action Summary */}
          <div className="lg:col-span-5">
            <MandiriTrackingSummary
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              mandiri={reportData.mandiri}
            />
          </div>
        </div>

        {/* Global Page Action Row — Left-aligned to main content container */}
        <div className="pt-1 sm:pt-2 flex justify-start">
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary select-none"
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriValidasiPage
