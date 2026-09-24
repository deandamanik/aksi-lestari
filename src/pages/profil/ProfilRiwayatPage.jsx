import { useState, useMemo } from 'react'
import RiwayatHeader from './components/RiwayatHeader'
import RiwayatSummary from './components/RiwayatSummary'
import RiwayatFilterBar from './components/RiwayatFilterBar'
import RiwayatActivityCard from './components/RiwayatActivityCard'
import RiwayatTransparencyNote from './components/RiwayatTransparencyNote'
import { ArrowRightIcon } from '../../components/common/Icons'
import {
  CONTRIBUTION_HISTORY,
  getValidatedContributionsCount,
  getTotalContributionXP,
} from '../../data/profil/contributionHistoryData'

/**
 * ProfilRiwayatPage — Kontribusi & Riwayat Hub
 *
 * Visual hierarchy & section sequence (matching specification):
 * 1. Editorial Civic Header (Back nav + Breadcrumb + Eyebrow + Heading + Description)
 * 2. Summary Area (Total Kontribusi, Total XP, Kredibilitas Validasi)
 * 3. Segmented Filter & Sort (Semua, Laporan Sampah, AksiPedia, Aksi Komunitas + Sort Dropdown)
 * 4. Riwayat Terkini Activity List (6 activities initial display, refined cards, contextual CTAs)
 * 5. Load More Controller (Expand remaining activities, supporting archive note)
 * 6. Transparency Note (Civic public ledger note)
 *
 * Design: clean, mature, editorial, calm, anti-AI-slop.
 */
function ProfilRiwayatPage() {
  const [activeCategory, setActiveCategory] = useState('semua')
  const [sortOrder, setSortOrder] = useState('terbaru')
  const [displayLimit, setDisplayLimit] = useState(6)

  // Compute category counts
  const categories = useMemo(() => {
    const total = CONTRIBUTION_HISTORY.length
    const laporan = CONTRIBUTION_HISTORY.filter((item) => item.category === 'laporan').length
    const aksipedia = CONTRIBUTION_HISTORY.filter((item) => item.category === 'aksipedia').length
    const komunitas = CONTRIBUTION_HISTORY.filter((item) => item.category === 'komunitas').length

    return [
      { id: 'semua', label: 'Semua', count: total },
      { id: 'laporan', label: 'Laporan Sampah', count: laporan },
      { id: 'aksipedia', label: 'AksiPedia', count: aksipedia },
      { id: 'komunitas', label: 'Aksi Komunitas', count: komunitas },
    ]
  }, [])

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'semua') {
      return CONTRIBUTION_HISTORY
    }
    return CONTRIBUTION_HISTORY.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  // Sort items according to active sort order
  const sortedItems = useMemo(() => {
    const copy = [...filteredItems]
    switch (sortOrder) {
      case 'terbaru':
        return copy.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      case 'terlama':
        return copy.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
      case 'xp-tinggi':
        return copy.sort((a, b) => b.xp - a.xp)
      default:
        return copy
    }
  }, [filteredItems, sortOrder])

  // Pagination / Display limit
  const visibleItems = sortedItems.slice(0, displayLimit)
  const hasMore = visibleItems.length < sortedItems.length
  const remainingCount = sortedItems.length - visibleItems.length

  // Calculate summary metrics using shared single source of truth
  const totalVerifiedCount = useMemo(() => getValidatedContributionsCount(), [])
  const totalXP = useMemo(() => getTotalContributionXP(), [])

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* 1. Page Header */}
      <div className="profil-enter">
        <RiwayatHeader />
      </div>

      {/* 2. Summary Area */}
      <div className="profil-enter profil-enter-delay-1">
        <RiwayatSummary totalCount={totalVerifiedCount} totalXP={totalXP} />
      </div>

      {/* 3. Filter & Sort Bar */}
      <div className="profil-enter profil-enter-delay-2">
        <RiwayatFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId)
            setDisplayLimit(6)
          }}
          sortOrder={sortOrder}
          onChangeSortOrder={setSortOrder}
        />
      </div>

      {/* 4. Riwayat Terkini — Activity List */}
      <section
        aria-labelledby="riwayat-terkini-heading"
        className="profil-enter profil-enter-delay-3 flex flex-col gap-4 sm:gap-5"
      >
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h2
            id="riwayat-terkini-heading"
            className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Riwayat Terkini
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Menampilkan {visibleItems.length} rekam jejak kontribusi
          </span>
        </div>

        {/* Activity Rows List */}
        <div className="flex flex-col">
          {visibleItems.map((item) => (
            <RiwayatActivityCard key={item.id} item={item} />
          ))}

          {visibleItems.length === 0 && (
            <div className="py-12 text-center text-stone-500 text-xs sm:text-sm">
              Belum ada aktivitas dalam kategori ini.
            </div>
          )}
        </div>

        {/* Load More Action */}
        {hasMore && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setDisplayLimit((prev) => prev + 6)}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              <span>Lihat Lebih Banyak ({remainingCount} Kontribusi Lainnya)</span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
          </div>
        )}
      </section>

      {/* 5. Transparency Note */}
      <div className="profil-enter profil-enter-delay-4">
        <RiwayatTransparencyNote />
      </div>
    </div>
  )
}

export default ProfilRiwayatPage
