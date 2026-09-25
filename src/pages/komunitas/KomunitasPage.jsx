import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import CommunityHero from './components/CommunityHero'
import CommunityFilterBar from './components/CommunityFilterBar'
import CommunityFeaturedCard from './components/CommunityFeaturedCard'
import CommunityActionCard from './components/CommunityActionCard'
import CommunitySidebarActionCard from './components/CommunitySidebarActionCard'
import CommunityLeaderboardPreview from './components/CommunityLeaderboardPreview'
import CommunityProposalBanner from './components/CommunityProposalBanner'
import ActionDetailModal from './components/ActionDetailModal'
import ProposeActionModal from './components/ProposeActionModal'
import AuthPromptModal from '../../components/common/AuthPromptModal'
import {
  COMMUNITY_ACTIONS,
  INITIAL_LOCATION,
  COMMUNITY_LOCATIONS,
} from '../../data/komunitas/communityActionsData'
import { CheckIcon, SparklesIcon, ArrowRightIcon } from '../../components/common/Icons'

function KomunitasPage() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Page local state
  const [actionsList, setActionsList] = useState(COMMUNITY_ACTIONS)
  const [selectedLocation, setSelectedLocation] = useState(INITIAL_LOCATION)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Local state for visible actions count (Load More pattern: 4 initial, +4 per click)
  const [visibleCount, setVisibleCount] = useState(4)

  // Interactive joined actions tracking
  const [joinedActions, setJoinedActions] = useState({})

  // Modal states — restore action context if user was redirected back after login with intent
  const [activeDetailAction, setActiveDetailAction] = useState(() => {
    const intent = location.state?.intent
    if (intent?.type === 'join-action' && intent?.actionId) {
      return COMMUNITY_ACTIONS.find((item) => item.id === intent.actionId) || null
    }
    return null
  })
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(() => {
    return location.state?.intent?.type === 'propose-action'
  })
  const [showProposeAuthPrompt, setShowProposeAuthPrompt] = useState(false)

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

    showToast({
      title: 'Pendaftaran berhasil',
      message: 'Kamu sudah terdaftar di aksi ini. Cek keikutsertaanmu di Profil.',
      actionTitle: action.title,
      actionId: action.id,
    })
  }

  // Handle proposal submission
  const handleProposalSubmit = (proposal) => {
    showToast(
      `Inisiatif "${proposal.title}" berhasil diajukan untuk peninjauan komunitas!`
    )
  }
  // Search and Location handlers (reset visibleCount to initial 4)
  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setVisibleCount(4)
  }

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc)
    setVisibleCount(4)
    showToast(`Lokasi dialihkan ke ${loc}`)
  }

  // Category handlers (reset visibleCount to initial 4 on every filter change)
  const handleToggleCategory = (cat) => {
    setVisibleCount(4)
    setSelectedCategories((prev) => {
      if (cat === 'Semua Aksi') return []
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat)
      }
      return [...prev, cat]
    })
  }

  const handleRemoveCategory = (cat) => {
    setVisibleCount(4)
    setSelectedCategories((prev) => prev.filter((c) => c !== cat))
  }

  const handleClearAllCategories = () => {
    setVisibleCount(4)
    setSelectedCategories([])
  }

  // Reset all filters to default
  const handleResetFilters = () => {
    setSelectedCategories([])
    setSearchQuery('')
    setSelectedLocation(INITIAL_LOCATION)
    setVisibleCount(4)
    showToast('Filter dan pencarian telah direset.')
  }

  // Active filter state check
  const isFiltered =
    selectedCategories.length > 0 ||
    searchQuery.trim() !== '' ||
    selectedLocation !== INITIAL_LOCATION

  // Total actions in the selected location
  const currentLocationActionsCount = useMemo(() => {
    if (selectedLocation === 'Lokasi saya' || selectedLocation === 'Lokasi perangkat digunakan') {
      return actionsList.length
    }
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
    if (
      selectedLocation &&
      selectedLocation !== 'Lokasi saya' &&
      selectedLocation !== 'Lokasi perangkat digunakan'
    ) {
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

    // 2. Category Filter (multi-select)
    if (selectedCategories.length > 0) {
      result = result.filter((action) => selectedCategories.includes(action.category))
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

    return result
  }, [actionsList, selectedLocation, selectedCategories, searchQuery])

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

  // Visible secondary actions limited by visibleCount (1 featured + remaining secondary = visibleCount)
  const visibleSecondaryActions = useMemo(() => {
    return secondaryActions.slice(0, Math.max(0, visibleCount - 1))
  }, [secondaryActions, visibleCount])

  // Real-time detail action tracking linked to actionsList to ensure participant count updates live
  const currentDetailAction = useMemo(() => {
    if (!activeDetailAction) return null
    return actionsList.find((a) => a.id === activeDetailAction.id) || activeDetailAction
  }, [actionsList, activeDetailAction])

  return (
    <main className="min-h-screen bg-[#FAF9F4] text-primary flex flex-col antialiased">
      <div className="w-full flex-1 flex flex-col animate-page-enter">
        {/* Hero Section (Stagger 0ms) */}
        <div className="animate-content-rise stagger-community-hero">
        <CommunityHero />
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Discovery Controls: Search + Location & Filter Tags */}
        <div className="relative z-30 animate-content-rise stagger-community-discovery">
          <CommunityFilterBar
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onRemoveCategory={handleRemoveCategory}
            onClearAllCategories={handleClearAllCategories}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            filteredCount={filteredActions.length}
            totalCount={currentLocationActionsCount}
            isFiltered={isFiltered}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* 4. Two-Column Main Composition Matching Reference (Stagger 130ms) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-16 pt-1 animate-content-rise stagger-community-main">
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
              <span className="text-xs text-stone-500 font-medium shrink-0 self-start sm:self-auto">
                Diperbarui 18 menit lalu
              </span>
            </div>

            {/* Actions Display with smooth category/filter change transition */}
            {filteredActions.length > 0 && featuredAction ? (
              <div
                key={`${selectedCategories.join(',')}_${selectedLocation}`}
                className="space-y-5 sm:space-y-6 animate-content-rise"
              >
                {/* Large Featured Action Card */}
                <CommunityFeaturedCard
                  action={featuredAction}
                  onOpenDetail={setActiveDetailAction}
                />

                {/* Secondary Action Cards (Stacked vertically with calm scroll reveal) */}
                {visibleSecondaryActions.length > 0 && (
                  <div className="space-y-4">
                    {visibleSecondaryActions.map((action, idx) => (
                      <CommunityActionCard
                        key={action.id}
                        action={action}
                        onOpenDetail={setActiveDetailAction}
                        index={idx}
                      />
                    ))}
                  </div>
                )}

                {/* Load More / Collapse Button (Left-aligned list continuation) */}
                {filteredActions.length > 4 && (
                  <div className="pt-1 sm:pt-1.5 flex justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        if (visibleCount < filteredActions.length) {
                          setVisibleCount((prev) => prev + 4)
                        } else {
                          setVisibleCount(4)
                        }
                      }}
                      className="inline-flex items-center gap-2 h-10 px-4.5 sm:px-5 rounded-xl bg-white border border-border-warm text-stone-700 hover:text-[#22603B] hover:border-[#22603B]/40 hover:bg-[#FAF9F4] text-xs sm:text-[13px] font-semibold font-body transition-all duration-180 shadow-2xs active:scale-[0.98] cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
                    >
                      <span>
                        {visibleCount < filteredActions.length
                          ? 'Muat Lebih Banyak'
                          : 'Lihat Lebih Sedikit'}
                      </span>
                      <ArrowRightIcon
                        className={`w-3.5 h-3.5 text-stone-400 group-hover:text-[#22603B] transition-transform duration-180 motion-reduce:transform-none ${
                          visibleCount < filteredActions.length
                            ? 'group-hover:translate-x-0.5'
                            : '-rotate-90 group-hover:-translate-y-0.5'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Clean Empty State */
              <div className="w-full py-16 px-6 bg-white rounded-3xl border border-border-warm text-center flex flex-col items-center justify-center my-2 shadow-2xs animate-content-rise">
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
                  className="inline-flex items-center justify-center h-9 px-5 rounded-full text-xs sm:text-sm font-bold bg-[#22603B] text-white hover:bg-[#1C4E30] transition-all duration-150 shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] active:scale-[0.98]"
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
              onOpenProposeModal={() => {
                if (!isAuthenticated) {
                  setShowProposeAuthPrompt(true)
                  return
                }
                setIsProposeModalOpen(true)
              }}
            />
          </aside>
        </div>
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

      {/* Proposal Auth Prompt Modal */}
      <AuthPromptModal
        isOpen={showProposeAuthPrompt}
        onClose={() => setShowProposeAuthPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk untuk mengajukan kegiatan lingkungan baru ke komunitas."
        returnTo={{ pathname: location.pathname, search: location.search, hash: location.hash }}
        intent={{ type: 'propose-action' }}
      />

      {/* Interactive Toast Notification (Natural fade + rise entrance, anchored to viewport via portal) */}
      {toastMessage &&
        createPortal(
          <div
            id="community-registration-success-toast"
            role="status"
            aria-live="polite"
            data-action-id={typeof toastMessage === 'object' ? toastMessage.actionId : undefined}
            data-action-title={typeof toastMessage === 'object' ? toastMessage.actionTitle : undefined}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 z-50 sm:max-w-md bg-[#22603B] text-white p-4 rounded-2xl shadow-xl border border-white/10 flex items-start gap-3 animate-toast-enter"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-xs sm:text-sm leading-snug">
              {typeof toastMessage === 'object' && toastMessage !== null ? (
                <>
                  {toastMessage.title && (
                    <div className="font-bold text-white mb-0.5 text-sm">
                      {toastMessage.title}
                    </div>
                  )}
                  <div className="font-medium text-white/90">
                    {toastMessage.message}
                  </div>
                </>
              ) : (
                <div className="font-medium">{toastMessage}</div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
                setToastMessage(null)
              }}
              className="text-white/70 hover:text-white transition-all duration-180 text-xs font-bold cursor-pointer p-1 -mr-1 -mt-0.5 rounded-full hover:bg-white/10 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              aria-label="Tutup notifikasi"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </main>
  )
}

export default KomunitasPage
