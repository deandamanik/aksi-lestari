import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeftIcon,
  TrophyIcon,
  CalendarIcon,
  TargetIcon,
} from '../../../components/common/Icons'
import {
  LEADERBOARD_PERIODS,
  LEADERBOARD_DATA,
} from '../../../data/komunitas/leaderboardData'
import LeaderboardPodium from './components/LeaderboardPodium'
import LeaderboardTable from './components/LeaderboardTable'
import LeaderboardXpInfo from './components/LeaderboardXpInfo'

export default function CommunityLeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('minggu')

  // Dynamic data for the selected period
  const activeData = useMemo(() => {
    return LEADERBOARD_DATA[selectedPeriod] || LEADERBOARD_DATA.minggu
  }, [selectedPeriod])

  return (
    <main className="min-h-screen bg-[#FAF9F4] text-primary flex flex-col antialiased">
      {/* 1. Breadcrumb & Navigation Bar */}
      <nav aria-label="Breadcrumb Papan Peringkat" className="pt-20 sm:pt-22 pb-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Breadcrumb links */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                to="/komunitas"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF3EC] border border-[#D5E8D8] text-[#22603B] font-bold text-[11px] tracking-wide uppercase hover:bg-[#D5E8D8] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                KOMUNITAS
              </Link>
              <span className="text-stone-300 font-light select-none">/</span>
              <span className="text-stone-600 font-bold">
                Papan Peringkat
              </span>
            </div>

            {/* Quick Context Stat */}
            <div className="inline-flex items-center gap-2 text-xs text-stone-600 self-start sm:self-auto">
              <div className="w-5 h-5 rounded-full bg-[#EAF3EC] text-[#22603B] flex items-center justify-center shrink-0">
                <TargetIcon className="w-3.5 h-3.5" />
              </div>
              <span>
                <strong className="text-stone-800 font-bold">
                  {activeData.totalActiveVolunteers} Relawan Aktif
                </strong>{' '}
                pada periode ini
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Main Page Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Page Header Section */}
        <section className="pt-2 pb-6 sm:pb-8 border-b border-border-warm/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22603B] uppercase tracking-wider mb-2">
                <TrophyIcon className="w-4 h-4 text-[#22603B]" />
                <span>PENGAKUAN AKSI WARGA</span>
              </div>
              <h1 className="font-display text-primary text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Papan Peringkat
              </h1>
              <p className="font-body text-stone-600 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
                Apresiasi berkala atas keterlibatan nyata warga dalam aksi lingkungan lapangan, pembersihan sampah, dan verifikasi pantauan wilayah.
              </p>
            </div>

            {/* Period Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white border border-border-warm shadow-2xs text-xs text-stone-600 self-start md:self-auto">
              <CalendarIcon className="w-4 h-4 text-[#22603B]" />
              <span className="font-semibold text-stone-700">{activeData.dateRange}</span>
            </div>
          </div>

          {/* Period Filter Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {LEADERBOARD_PERIODS.map((period) => {
              const isActive = selectedPeriod === period.id

              return (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setSelectedPeriod(period.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center justify-center h-10 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] ${
                    isActive
                      ? 'bg-[#22603B] text-white border border-[#22603B] shadow-xs'
                      : 'bg-white text-stone-700 border border-border-warm hover:bg-[#FAF9F4] hover:border-[#22603B]/30 shadow-2xs'
                  }`}
                >
                  {period.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* 3. Section Content: Podium, Table & XP Info */}
        <div className="space-y-8 sm:space-y-10 mt-6 sm:mt-8">
          {/* Top 3 Podium */}
          <LeaderboardPodium top3={activeData.top3} />

          {/* Full Ranking Table (Rank 4 onwards + Current User Row) */}
          <LeaderboardTable
            rankings={activeData.rankings}
            currentUser={activeData.currentUser}
          />

          {/* Expandable XP Explanation Section */}
          <LeaderboardXpInfo />
        </div>
      </div>
    </main>
  )
}
