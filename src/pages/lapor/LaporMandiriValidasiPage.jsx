import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import MandiriTrackingTimeline from './components/mandiri/MandiriTrackingTimeline'
import TrackingNextSteps from './components/shared/TrackingNextSteps'
import MandiriTrackingSummary from './components/mandiri/MandiriTrackingSummary'
import { ArrowLeftIcon } from '../../components/common/Icons'

function LaporMandiriValidasiPage() {
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

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Tracking Aksi Mandiri — Status Validasi"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        {/* Centered Page Header — minimal & editorial */}
        <div className="text-center pt-2 pb-1 lapor-enter-header">
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
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 lapor-enter-card">
            <MandiriTrackingTimeline submittedAt={reportData.mandiri?.submittedAt} />
            <TrackingNextSteps
              description="Bukti tindakanmu sedang diperiksa. Kamu akan mendapatkan pembaruan setelah hasil validasi tersedia."
              rewardNote="XP dan Saldo Apresiasi akan diberikan setelah aksi mencapai status Terverifikasi."
            />
          </div>

          {/* Right Column: Submitted Mandiri Action Summary */}
          <div className="lg:col-span-5 lapor-enter-card-delay-1">
            <MandiriTrackingSummary
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              mandiri={reportData.mandiri}
            />
          </div>
        </div>

        {/* Global Page Action Row — Left-aligned to main content container */}
        <div className="pt-1 sm:pt-2 flex justify-start lapor-enter-actions">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary select-none"
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LaporMandiriValidasiPage
