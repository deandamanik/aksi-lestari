import { useState, useMemo, useRef, useEffect } from 'react'
import CommunityBreadcrumb from './components/CommunityBreadcrumb'
import CommunityHero from './components/CommunityHero'
import CommunityFilterBar from './components/CommunityFilterBar'
import CommunityFeaturedCard from './components/CommunityFeaturedCard'
import CommunityActionCard from './components/CommunityActionCard'
import CommunitySidebarActionCard from './components/CommunitySidebarActionCard'
import CommunityLeaderboardPreview from './components/CommunityLeaderboardPreview'
import CommunityProposalBanner from './components/CommunityProposalBanner'
import ActionDetailModal from './components/ActionDetailModal'
import ProposeActionModal from './components/ProposeActionModal'
import {
  COMMUNITY_ACTIONS,
  INITIAL_LOCATION,
  COMMUNITY_LOCATIONS,
} from '../../data/komunitas/communityActionsData'
import { CheckIcon, SparklesIcon } from '../../components/common/Icons'

function KomunitasPage() {
  // Page local state
  const [actionsList, setActionsList] = useState(COMMUNITY_ACTIONS)
  const [selectedLocation, setSelectedLocation] = useState(INITIAL_LOCATION)
  const [selectedCategory, setSelectedCategory] = useState('Semua Aksi')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSort, setSelectedSort] = useState('terdekat')

  // Interactive joined actions tracking
  const [joinedActions, setJoinedActions] = useState({})

  // Modal states
  const [activeDetailAction, setActiveDetailAction] = useState(null)
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false)

  // Feedback Toast state (4.5s auto-dismiss with timer cleanup)
  const [toastMessage, setToastMessage] = useState(null)
  const toastTimeoutRef = useRef(null)

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setToastMessage(message)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  // Handle joining an action (strictly once, prevents duplicate registration and overflow)
  const handleJoinAction = (action) => {
    if (!action || joinedActions[action.id]) return
    if (action.participants >= action.capacity) return

    setJoinedActions((prev) => ({ ...prev, [action.id]: true }))
    setActionsList((prev) =>
      prev.map((item) =>
        item.id === action.id
          ? { ...item, participants: Math.min(item.capacity, item.participants + 1) }
          : item
      )
    )

    showToast(
      `Selamat! Kamu berhasil mendaftar di "${action.title}". Reward +${action.xpReward || 100} XP telah dicatat.`
    )
  }

  // Handle proposal submission
  const handleProposalSubmit = (proposal) => {
    showToast(
      `Inisiatif "${proposal.title}" berhasil diajukan untuk peninjauan komunitas!`
    )
  }

  // Reset all filters to default
  const handleResetFilters = () => {
    setSelectedCategory('Semua Aksi')
    setSearchQuery('')
    setSelectedLocation(INITIAL_LOCATION)
    setSelectedSort('terdekat')
    showToast('Filter dan pencarian telah direset.')
  }

  // Active filter state check
  const isFiltered =
    selectedCategory !== 'Semua Aksi' ||
    searchQuery.trim() !== '' ||
    selectedLocation !== INITIAL_LOCATION ||
    selectedSort !== 'terdekat'

  // Total actions in the selected location
  const currentLocationActionsCount = useMemo(() => {
    const locObj = COMMUNITY_LOCATIONS.find((l) => l.name === selectedLocation)
    const locTag = locObj ? locObj.id : ''
    return actionsList.filter((a) => {
      if (a.locationTag && locTag) return a.locationTag === locTag
      return a.location.toLowerCase().includes(selectedLocation.toLowerCase().split(',')[0].trim())
    }).length
  }, [actionsList, selectedLocation])

  // Combined Filtering Pipeline (Location -> Category -> Search -> Sort)
  const filteredActions = useMemo(() => {
    let result = [...actionsList]

    // 1. Location Filter
    if (selectedLocation) {
      const locObj = COMMUNITY_LOCATIONS.find((l) => l.name === selectedLocation)
      const locTag = locObj ? locObj.id : ''
      result = result.filter((action) => {
        if (action.locationTag && locTag) {
          return action.locationTag === locTag
        }
        return action.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase().split(',')[0].trim())
      })
    }

    // 2. Category Filter
    if (selectedCategory && selectedCategory !== 'Semua Aksi') {
      result = result.filter((action) => action.category === selectedCategory)
    }

    // 3. Search Query Filter (case-insensitive across title, location, category, organizer, description)
    const trimmedQuery = searchQuery.trim().toLowerCase()
    if (trimmedQuery) {
      result = result.filter((action) => {
        const titleMatch = action.title?.toLowerCase().includes(trimmedQuery)
        const locMatch = action.location?.toLowerCase().includes(trimmedQuery)
        const catMatch =
          action.category?.toLowerCase().includes(trimmedQuery) ||
          action.subCategory?.toLowerCase().includes(trimmedQuery)
        const orgMatch = action.organizer?.toLowerCase().includes(trimmedQuery)
        const descMatch = action.description?.toLowerCase().includes(trimmedQuery)
        return titleMatch || locMatch || catMatch || orgMatch || descMatch
      })
    }

    // 4. Sorting
    switch (selectedSort) {
      case 'terdekat':
        result.sort((a, b) => {
          const distA = typeof a.distanceKm === 'number' ? a.distanceKm : parseFloat(a.distance) || 999
          const distB = typeof b.distanceKm === 'number' ? b.distanceKm : parseFloat(b.distance) || 999
          return distA - distB
        })
        break
      case 'terbaru':
        result.sort((a, b) => {
          const timeA = typeof a.dateTimestamp === 'number' ? a.dateTimestamp : 0
          const timeB = typeof b.dateTimestamp === 'number' ? b.dateTimestamp : 0
          return timeB - timeA
        })
        break
      case 'xp':
        result.sort((a, b) => (b.xpReward || 0) - (a.xpReward || 0))
        break
      case 'peserta':
        result.sort((a, b) => (b.participants || 0) - (a.participants || 0))
        break
      default:
        break
    }

    return result
  }, [actionsList, selectedLocation, selectedCategory, searchQuery, selectedSort])

  // Select featured action from filtered results
  const featuredAction = useMemo(() => {
    return (
      filteredActions.find((a) => a.isFeatured) ||
      filteredActions.find((a) => !a.isSidebarAction) ||
      filteredActions[0] ||
      null
    )
  }, [filteredActions])

  // Select sidebar action matching location when possible
  const sidebarAction = useMemo(() => {
    const locObj = COMMUNITY_LOCATIONS.find((l) => l.name === selectedLocation)
    const locTag = locObj ? locObj.id : ''
    return (
      actionsList.find((a) => a.locationTag === locTag && a.isSidebarAction) ||
      actionsList.find((a) => a.isSidebarAction) ||
      null
    )
  }, [actionsList, selectedLocation])

  // Secondary actions are remaining items in the left column
  const secondaryActions = useMemo(() => {
    if (!featuredAction) return []
    return filteredActions.filter((a) => a.id !== featuredAction.id)
  }, [filteredActions, featuredAction])

  // Real-time detail action tracking linked to actionsList to ensure participant count updates live
  const currentDetailAction = useMemo(() => {
    if (!activeDetailAction) return null
    return actionsList.find((a) => a.id === activeDetailAction.id) || activeDetailAction
  }, [actionsList, activeDetailAction])

  return (
    <main className="min-h-screen bg-[#FAF9F4] text-primary flex flex-col antialiased">
      {/* 1. Breadcrumb Navigation & Top Jabodetabek status */}
      <CommunityBreadcrumb totalActiveActions={currentLocationActionsCount || 14} />

      {/* 2. Hero Section */}
      <CommunityHero />

      {/* 3. Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Discovery Controls: Row 1 (Search + Location) & Row 2 (Categories + Sort) */}
        <CommunityFilterBar
          selectedLocation={selectedLocation}
          onSelectLocation={(loc) => {
            setSelectedLocation(loc)
            showToast(`Lokasi dialihkan ke ${loc}`)
          }}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          filteredCount={filteredActions.length}
          totalCount={currentLocationActionsCount}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
        />

        {/* 4. Two-Column Main Composition Matching Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-16 pt-1">
          {/* Left Column: Main Actions (Wider Column ~64%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
            {/* Section Heading with Dynamic Subtitle & Diperbarui badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight">
                  Aksi yang Bisa Kamu Ikuti
                </h2>
                <p className="font-body text-stone-500 text-xs sm:text-sm mt-0.5">
                  {isFiltered
                    ? `Menampilkan ${filteredActions.length} dari ${currentLocationActionsCount} kegiatan di ${selectedLocation.split(',')[0]}.`
                    : 'Kegiatan lingkungan yang sedang terbuka untuk partisipasi sukarela warga.'}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF3EC] border border-[#D5E8D8] text-[#22603B] font-semibold text-xs shrink-0 self-start sm:self-auto">
                Diperbarui 18 menit lalu
              </span>
            </div>

            {/* Actions Display */}
            {filteredActions.length > 0 && featuredAction ? (
              <div className="space-y-5 sm:space-y-6">
                {/* Large Featured Action Card */}
                <CommunityFeaturedCard
                  action={featuredAction}
                  onOpenDetail={setActiveDetailAction}
                />

                {/* Secondary Action Cards (Stacked vertically) */}
                {secondaryActions.length > 0 && (
                  <div className="space-y-4">
                    {secondaryActions.map((action) => (
                      <CommunityActionCard
                        key={action.id}
                        action={action}
                        onOpenDetail={setActiveDetailAction}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Clean Empty State */
              <div className="w-full py-16 px-6 bg-white rounded-3xl border border-border-warm text-center flex flex-col items-center justify-center my-2 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F4] flex items-center justify-center text-[#22603B] mb-3 border border-border-warm">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-primary text-lg sm:text-xl font-bold mb-1.5">
                  Tidak ada aksi ditemukan
                </h3>
                <p className="font-body text-stone-500 text-xs sm:text-sm max-w-sm mx-auto mb-5 leading-relaxed">
                  Belum ada kegiatan yang sesuai dengan pencarian atau filter yang kamu pilih.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center h-9 px-5 rounded-full text-xs sm:text-sm font-bold bg-[#22603B] text-white hover:bg-[#1C4E30] transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar (Narrower Column ~36%) */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* 1. Sidebar Action Card */}
            {sidebarAction && (
              <CommunitySidebarActionCard
                action={sidebarAction}
                onOpenDetail={setActiveDetailAction}
              />
            )}

            {/* 2. Leaderboard Card (Penggerak Teraktif Minggu Ini) */}
            <CommunityLeaderboardPreview />

            {/* 3. Initiative Proposal Card (Punya Inisiatif Aksi di Lingkunganmu?) */}
            <CommunityProposalBanner
              onOpenProposeModal={() => setIsProposeModalOpen(true)}
            />
          </aside>
        </div>
      </div>

      {/* Action Detail Modal */}
      <ActionDetailModal
        action={currentDetailAction}
        isOpen={Boolean(currentDetailAction)}
        onClose={() => setActiveDetailAction(null)}
        isJoined={currentDetailAction ? Boolean(joinedActions[currentDetailAction.id]) : false}
        onJoin={(action) => {
          handleJoinAction(action)
        }}
      />

      {/* Proposal Modal */}
      <ProposeActionModal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        onSubmitProposal={handleProposalSubmit}
      />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 z-50 sm:max-w-md bg-[#22603B] text-white p-4 rounded-2xl shadow-xl border border-white/10 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <CheckIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
            {toastMessage}
          </div>
          <button
            type="button"
            onClick={() => {
              if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
              setToastMessage(null)
            }}
            className="text-white/70 hover:text-white transition-colors text-xs font-bold cursor-pointer p-1 -mr-1 -mt-0.5 rounded-full hover:bg-white/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Tutup notifikasi"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  )
}

export default KomunitasPage
