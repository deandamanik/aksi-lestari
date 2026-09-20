import { useState, useRef, useEffect } from 'react'
import {
  SearchIcon,
  XIcon,
  NavigationIcon,
  ChevronDownIcon,
  SlidersHorizontalIcon,
  CheckIcon,
} from '../../../components/common/Icons'
import {
  COMMUNITY_CATEGORIES,
  SORT_OPTIONS,
  COMMUNITY_LOCATIONS,
} from '../../../data/komunitas/communityActionsData'

export default function CommunityFilterBar({
  selectedLocation,
  onSelectLocation,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedSort,
  onSelectSort,
  filteredCount,
  totalCount,
  isFiltered,
  onResetFilters,
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const locationDropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="w-full pt-1 pb-6 sm:pb-8 overflow-visible">
      {/* Two-row composition with generous breathing room */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        {/* ========================================================= */}
        {/* ROW 1: Search Input (Wide & Comfortable) + Location Selector */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Search Input - Wide, comfortable, rounded with subtle border */}
          <div className="relative flex-1 min-w-0">
            <label htmlFor="community-search-input" className="sr-only">
              Cari kegiatan lingkungan
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-4.5 flex items-center pointer-events-none text-stone-400">
                <SearchIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <input
                id="community-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onSearchChange('')
                }}
                placeholder="Cari kegiatan lingkungan..."
                className="w-full h-12 sm:h-[50px] pl-11 sm:pl-12 pr-10 rounded-2xl bg-white border border-border-warm text-sm sm:text-[15px] font-body text-primary placeholder:text-stone-400 focus:outline-hidden focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/10 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Hapus teks pencarian"
                  title="Hapus pencarian (Esc)"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Location Selector - Compact, right-aligned, matching height */}
          <div
            className="w-full sm:w-auto shrink-0 relative"
            ref={locationDropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsLocationOpen((prev) => !prev)}
              className="w-full sm:w-auto h-12 sm:h-[50px] flex items-center justify-between gap-3 px-3.5 sm:px-4 rounded-2xl bg-white border border-border-warm shadow-2xs hover:border-[#22603B]/40 transition-all duration-200 text-left cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] min-w-[230px] sm:min-w-[250px]"
              aria-expanded={isLocationOpen}
              aria-haspopup="listbox"
            >
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-[#22603B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <NavigationIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 leading-tight">
                  LOKASI PENCARIAN
                </span>
                <span className="font-bold text-primary text-xs sm:text-[13px] leading-tight truncate mt-0.5 font-body">
                  {selectedLocation}
                </span>
              </div>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-200 ${
                  isLocationOpen ? 'rotate-180 text-[#22603B]' : ''
                }`}
              />
            </button>

            {/* Location Dropdown Menu */}
            {isLocationOpen && (
              <div
                className="absolute top-full right-0 mt-2 z-40 w-full sm:w-72 bg-white rounded-2xl border border-border-warm shadow-[0_12px_36px_rgba(0,0,0,0.1)] p-2 animate-in fade-in slide-in-from-top-2 duration-150"
                role="listbox"
                aria-label="Pilih Wilayah Pantauan"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-border-warm/50 mb-1">
                  Pusat Wilayah Pantauan
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {COMMUNITY_LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc.name
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          onSelectLocation(loc.name)
                          setIsLocationOpen(false)
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-body transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] ${
                          isSelected
                            ? 'bg-[#22603B] text-white font-bold'
                            : 'text-primary hover:bg-[#FAF9F4]'
                        }`}
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{loc.name}</span>
                          <span
                            className={`text-[11px] ${
                              isSelected ? 'text-white/80' : 'text-stone-400'
                            }`}
                          >
                            {loc.region}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckIcon className="w-4 h-4 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: Category Filter Buttons (Left) + Sort Control (Far Right) */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-1">
          {/* LEFT: Category navigation (Independent area) */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              role="tablist"
              aria-label="Kategori Aksi Lingkungan"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
            >
              {COMMUNITY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectCategory(cat)}
                    type="button"
                    className={`shrink-0 whitespace-nowrap inline-flex items-center justify-center h-10 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B] ${
                      isActive
                        ? 'bg-[#22603B] text-white border border-[#22603B] shadow-xs'
                        : 'bg-white text-stone-700 border border-border-warm hover:bg-[#FAF9F4] hover:border-primary/30 shadow-2xs'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Sorting control (Independent area, shrink-0) */}
          <div className="shrink-0 flex items-center gap-2.5 self-end sm:self-auto">
            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <label htmlFor="community-sort" className="sr-only">
                Urutkan aksi
              </label>
              <select
                id="community-sort"
                value={selectedSort}
                onChange={(e) => onSelectSort(e.target.value)}
                className="h-10 appearance-none bg-white border border-border-warm rounded-full pl-7.5 sm:pl-8 pr-6.5 sm:pr-7 text-xs sm:text-sm font-semibold font-body text-stone-700 shadow-2xs hover:border-[#22603B]/40 focus:outline-hidden focus:ring-2 focus:ring-[#22603B]/20 cursor-pointer transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    Urutkan: {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-stone-500">
                <SlidersHorizontalIcon className="w-3.5 h-3.5" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400">
                <ChevronDownIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Reset Button (only shown if filter/search is active) */}
            {isFiltered && (
              <div className="inline-flex items-center gap-1.5 pl-1 text-xs">
                {filteredCount !== undefined && totalCount !== undefined && (
                  <span className="text-stone-400 hidden md:inline">
                    ({filteredCount})
                  </span>
                )}
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="whitespace-nowrap font-bold text-[#22603B] hover:underline cursor-pointer focus:outline-hidden focus-visible:underline"
                  title="Kembalikan semua filter ke pengaturan awal"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

