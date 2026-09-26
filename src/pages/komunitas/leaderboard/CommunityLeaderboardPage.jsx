import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/common/Icons'
import {
  LEADERBOARD_PERIODS,
  LEADERBOARD_DATA,
} from '../../../data/komunitas/leaderboardData'
import LeaderboardPodium from './components/LeaderboardPodium'
import LeaderboardTable from './components/LeaderboardTable'
import LeaderboardXpInfo from './components/LeaderboardXpInfo'
import MyStandingCard from './components/MyStandingCard'

export default function CommunityLeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('bulan')

  // Dynamic data for the selected period (defaults to monthly)
  const activeData = useMemo(() => {
    return LEADERBOARD_DATA[selectedPeriod] || LEADERBOARD_DATA.bulan
  }, [selectedPeriod])

  return (
    <main className="min-h-screen bg-neutral text-primary flex flex-col antialiased">
      <div className="w-full flex-1 flex flex-col animate-page-enter">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pt-28 sm:pt-32 pb-20">
          {/* Header Section */}
          <header className="pb-6 sm:pb-8 border-b border-border-warm/60 animate-lb-header">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-primary text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Papan Peringkat Relawan
                </h1>
                <p className="font-body text-stone-600 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                  Apresiasi berkala atas keterlibatan nyata warga dalam aksi lingkungan lapangan, pembersihan sampah, dan verifikasi pantauan wilayah.
                </p>
              </div>

              {/* Period Controls (Pill Filters matching AksiLestari standard) */}
              <div className="flex items-center gap-2 shrink-0">
                {LEADERBOARD_PERIODS.map((period) => {
                  const isActive = selectedPeriod === period.id

                  return (
                    <button
                      key={period.id}
                      type="button"
                      onClick={() => setSelectedPeriod(period.id)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center justify-center h-10 px-5 rounded-full text-xs sm:text-sm font-body font-semibold transition-all duration-150 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-white text-stone-700 border border-border-warm hover:bg-stone-50 hover:border-primary/40'
                      }`}
                    >
                      {period.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </header>

          {/* Main 2-Column Split Composition (Matching Komunitas & Beranda) */}
          <div
            key={selectedPeriod}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-10 sm:mt-12"
          >
            {/* Left Column (8 cols): Top 3 Celebratory Podium + Rankings List */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              {/* Top 3 Celebratory Podium */}
              <div className="animate-lb-podium">
                <LeaderboardPodium top3={activeData.top3} />
              </div>

              {/* Rankings Table (#4 and onwards) */}
              <div className="animate-lb-table">
                <LeaderboardTable
                  rankings={activeData.rankings}
                />
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Sidebar with My Standing Card & XP Guide */}
            <aside className="lg:col-span-4 space-y-6 sm:space-y-8 lg:sticky lg:top-28 animate-lb-aside">
              {/* My Standing Card */}
              <MyStandingCard currentUser={activeData.currentUser} />

              {/* XP Earning Guide Card */}
              <LeaderboardXpInfo />
            </aside>
          </div>

          {/* Bottom Action Row — Standard AksiLestari Bottom Back Link */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-border-warm/70 flex items-center justify-start animate-lb-footer">
            <Link
              to="/komunitas"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-body font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary select-none"
              aria-label="Kembali ke Komunitas"
            >
              <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
              <span>Kembali ke Komunitas</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

