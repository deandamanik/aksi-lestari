import { Link } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import TrackingTimeline from './components/tracking/TrackingTimeline'
import TrackingReportSummary from './components/tracking/TrackingReportSummary'
import TrackingNextSteps from './components/shared/TrackingNextSteps'
import { ArrowLeftIcon } from '../../components/common/Icons'

function LaporTrackingPage() {
  const { reportData } = useLapor()

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18"
      aria-label="Tracking Laporan Sampah"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-7">
        {/* Centered Page Header — minimal & editorial */}
        <div className="text-center pt-2 pb-1">
          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-[40px] text-primary tracking-tight leading-tight">
            Laporanmu Sedang Divalidasi
          </h1>

          <p className="mt-2 font-body text-stone-600 text-xs sm:text-base max-w-lg mx-auto leading-relaxed px-2 sm:px-0">
            Laporan telah diterima dan sedang diperiksa sebelum diteruskan ke proses penanganan.
          </p>
        </div>

        {/* Two-Column Tracking Composition: 55% Left / 45% Right */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-5 sm:gap-6 items-start">
          {/* Left Column: Timeline + Apa Selanjutnya? */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            <TrackingTimeline createdAt={reportData.createdAt} />
            <TrackingNextSteps />
          </div>

          {/* Right Column: Submitted Report Summary */}
          <div className="lg:col-span-5">
            <TrackingReportSummary
              temukan={reportData.temukan}
              kenali={reportData.kenali}
              createdAt={reportData.createdAt}
            />
          </div>
        </div>

        {/* Global Page Action Row — Left-aligned to main content container */}
        <div className="pt-1 sm:pt-2 flex justify-start">
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

export default LaporTrackingPage
