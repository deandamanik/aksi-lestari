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

export default function CommunityLeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('bulan')

  // Dynamic data for the selected period (defaults to monthly)
  const activeData = useMemo(() => {
    return LEADERBOARD_DATA[selectedPeriod] || LEADERBOARD_DATA.bulan
  }, [selectedPeriod])

  return (
    <main className="min-h-screen bg-neutral text-primary flex flex-col antialiased">
      <div className="w-full flex-1 flex flex-col animate-page-enter">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pt-20 sm:pt-24 pb-16">
          {/* Header Section */}
          <header className="pb-6 sm:pb-8 border-b border-border-warm/60 animate-content-rise stagger-lb-header">
            {/* Back Navigation to Community Hub */}
            <Link
              to="/komunitas"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-3 sm:mb-3.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-180 group-hover:-translate-x-0.5 motion-reduce:transform-none" />
              <span>Kembali ke Komunitas</span>
            </Link>

            <h1 className="font-display text-primary text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Papan Peringkat
            </h1>
            <p className="font-body text-stone-600 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
              Apresiasi berkala atas keterlibatan nyata warga dalam aksi lingkungan lapangan, pembersihan sampah, dan verifikasi pantauan wilayah.
            </p>

            {/* Period Controls */}
            <div className="mt-5 sm:mt-6 flex items-center gap-2">
              {LEADERBOARD_PERIODS.map((period) => {
                const isActive = selectedPeriod === period.id

                return (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => setSelectedPeriod(period.id)}
                    aria-pressed={isActive}
                    className={`shrink-0 whitespace-nowrap inline-flex items-center justify-center h-9 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-180 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? 'bg-primary text-white border border-primary shadow-2xs'
                        : 'bg-white text-stone-700 border border-border-warm hover:bg-neutral hover:border-primary/30'
                    }`}
                  >
                    {period.label}
                  </button>
                )
              })}
            </div>
          </header>

          {/* Section Content: Top 3, User Position & Leaderboard, XP Info */}
          <div
            key={selectedPeriod}
            className="space-y-8 sm:space-y-10 mt-6 sm:mt-8"
          >
            {/* Top 3 Cards */}
            <div className="animate-content-rise stagger-lb-podium">
              <LeaderboardPodium top3={activeData.top3} />
            </div>

            {/* User Position & Full Ranking Table */}
            <div className="animate-content-rise stagger-lb-table">
              <LeaderboardTable
                rankings={activeData.rankings}
                currentUser={activeData.currentUser}
              />
            </div>

            {/* Expandable XP Explanation Section */}
            <div className="animate-content-rise stagger-lb-xp">
              <LeaderboardXpInfo />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
