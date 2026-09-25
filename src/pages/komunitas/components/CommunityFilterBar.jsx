import { useState, useRef, useEffect, useMemo } from 'react'
import {
  SearchIcon,
  XIcon,
  MapPinIcon,
  LocateIcon,
  ChevronDownIcon,
  FilterIcon,
  CheckIcon,
} from '../../../components/common/Icons'
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_LOCATIONS,
} from '../../../data/komunitas/communityActionsData'

const LOCATION_COORDINATES = {
  penjaringan: { lat: -6.126, lng: 106.784 },
  pademangan: { lat: -6.136, lng: 106.843 },
  'tanjung-priok': { lat: -6.118, lng: 106.883 },
  koja: { lat: -6.124, lng: 106.916 },
}

function findClosestLocation(lat, lng) {
  let closest = null
  let minDistance = Infinity

  for (const loc of COMMUNITY_LOCATIONS) {
    const coords = LOCATION_COORDINATES[loc.id]
    if (!coords) continue
    const dLat = (lat - coords.lat) * 111
    const dLng = (lng - coords.lng) * 111 * Math.cos((lat * Math.PI) / 180)
    const dist = Math.sqrt(dLat * dLat + dLng * dLng)
    if (dist < minDistance) {
      minDistance = dist
      closest = loc
    }
  }

  if (closest && minDistance <= 40) {
    return closest.name
  }
  return 'Lokasi saya'
}

export default function CommunityFilterBar({
  selectedLocation,
  onSelectLocation,
  selectedCategories = [],
  onToggleCategory,
  onRemoveCategory,
  onClearAllCategories,
  searchQuery,
  onSearchChange,
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)
  const [geoFeedback, setGeoFeedback] = useState(null)
  const locationDropdownRef = useRef(null)
  const locationSearchInputRef = useRef(null)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterDropdownRef = useRef(null)

  const closeLocationDropdown = () => {
    setIsLocationOpen(false)
    setLocationQuery('')
    setGeoFeedback(null)
  }

  const toggleLocationDropdown = () => {
    setIsFilterOpen(false)
    setIsLocationOpen((prev) => {
      const next = !prev
      if (!next) {
        setLocationQuery('')
        setGeoFeedback(null)
      }
      return next
    })
  }

  const toggleFilterDropdown = () => {
    closeLocationDropdown()
    setIsFilterOpen((prev) => !prev)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        closeLocationDropdown()
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (isLocationOpen) closeLocationDropdown()
        if (isFilterOpen) setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLocationOpen, isFilterOpen])

  useEffect(() => {
    if (isLocationOpen) {
      const timer = setTimeout(() => {
        locationSearchInputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isLocationOpen])

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoFeedback('Browser tidak mendukung geolokasi.')
      return
    }

    setIsLoadingGeo(true)
    setGeoFeedback(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLoadingGeo(false)
        const detectedLocation = findClosestLocation(
          pos.coords.latitude,
          pos.coords.longitude
        )
        onSelectLocation(detectedLocation)
        closeLocationDropdown()
      },
      (err) => {
        setIsLoadingGeo(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoFeedback('Izin lokasi ditolak. Silakan pilih secara manual.')
        } else {
          setGeoFeedback('Gagal mendeteksi lokasi perangkat.')
        }
      },
      { timeout: 8000, maximumAge: 60000 }
    )
  }

  const filteredLocations = useMemo(() => {
    const trimmed = locationQuery.trim().toLowerCase()
    if (!trimmed) return COMMUNITY_LOCATIONS
    return COMMUNITY_LOCATIONS.filter((loc) => {
      const nameMatch = loc.name.toLowerCase().includes(trimmed)
      const regionMatch = loc.region && loc.region.toLowerCase().includes(trimmed)
      return nameMatch || regionMatch
    })
  }, [locationQuery])

  return (
    <section className="relative z-30 w-full pt-1 pb-5 sm:pb-6 overflow-visible">
      {/* Two-row composition with clean, natural spacing */}
      <div className="flex flex-col gap-3 sm:gap-3.5">
        {/* ========================================================= */}
        {/* ROW 1: Discovery Bar (Search + Inline Filter) + Location Selector */}
        {/* ========================================================= */}
        <div className="relative z-30 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-3.5 lg:gap-4.5">
          {/* Discovery Bar: Search Input (Flexible Width) + Inline Filter Trigger */}
          <div className="flex-1 min-w-0">
            <label htmlFor="community-search-input" className="sr-only">
              Cari kegiatan lingkungan
            </label>
            <div className="relative flex items-center w-full h-12 sm:h-[50px] rounded-2xl bg-white border border-border-warm shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <div className="pl-4 sm:pl-4.5 flex items-center pointer-events-none text-stone-400 shrink-0">
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
                className="flex-1 min-w-0 h-full pl-3 pr-2 bg-transparent text-sm sm:text-[15px] font-body text-primary placeholder:text-stone-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1.5 text-stone-400 hover:text-primary transition-colors cursor-pointer shrink-0"
                  aria-label="Hapus teks pencarian"
                  title="Hapus pencarian (Esc)"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}

              {/* Subtle Short Vertical Divider */}
              <div className="w-px h-5 bg-border-warm/70 shrink-0 mx-1" aria-hidden="true" />

              {/* Inline Filter Trigger & Popover Wrapper */}
              <div className="relative shrink-0 mr-1.5 sm:mr-2" ref={filterDropdownRef}>
                <button
                  type="button"
                  onClick={toggleFilterDropdown}
                  className={`inline-flex items-center gap-1.5 h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-xl text-xs sm:text-[13px] font-semibold font-body transition-colors select-none cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                    selectedCategories.length > 0
                      ? 'text-primary bg-neutral font-bold border border-primary/20'
                      : 'text-stone-600 hover:text-primary hover:bg-neutral'
                  }`}
                  aria-expanded={isFilterOpen}
                  aria-haspopup="dialog"
                >
                  <FilterIcon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      selectedCategories.length > 0 ? 'text-primary' : 'text-stone-400'
                    }`}
                  />
                  <span>
                    Filter{selectedCategories.length > 0 ? ` ${selectedCategories.length}` : ''}
                  </span>
                  <ChevronDownIcon
                    className={`w-3 h-3 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isFilterOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {/* Filter Panel / Dropdown (Positioned directly below Filter trigger, aligned right) */}
                {isFilterOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 z-40 w-64 sm:w-72 bg-white rounded-2xl border border-border-warm shadow-[0_12px_36px_rgba(0,0,0,0.1)] p-3 animate-popover-enter"
                    role="dialog"
                    aria-label="Filter Kategori Kegiatan"
                  >
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-1 mb-1">
                      FILTER
                    </div>
                    <div className="text-xs font-bold text-primary px-1 mb-2.5">
                      Kategori kegiatan
                    </div>

                    <div className="space-y-1">
                      {COMMUNITY_CATEGORIES.map((cat) => {
                        const isChecked = selectedCategories.includes(cat)
                        return (
                          <label
                            key={cat}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-neutral transition-colors cursor-pointer select-none text-xs font-medium text-stone-700"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => onToggleCategory(cat)}
                              className="w-4 h-4 rounded-md border-border-warm text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                            />
                            <span
                              className={
                                isChecked
                                  ? 'font-bold text-primary'
                                  : 'text-stone-700'
                              }
                            >
                              {cat}
                            </span>
                          </label>
                        )
                      })}
                    </div>

                    {/* Footer: Reset & Tutup */}
                    <div className="pt-2 mt-2 border-t border-border-warm/60 flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={() => {
                          onClearAllCategories()
                          setIsFilterOpen(false)
                        }}
                        className="text-[10px] font-normal leading-tight text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFilterOpen(false)}
                        className="text-[10px] font-normal leading-tight text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location Selector - Natural Width with Tight Spacing */}
          <div
            className="w-full lg:w-72 xl:w-80 shrink-0 relative z-30"
            ref={locationDropdownRef}
          >
            <button
              type="button"
              onClick={toggleLocationDropdown}
              className="w-full h-12 sm:h-[50px] flex items-center justify-between gap-3 px-3.5 sm:px-4 rounded-2xl bg-white border border-border-warm shadow-2xs hover:border-primary/40 transition-all duration-180 active:scale-[0.99] text-left cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              aria-expanded={isLocationOpen}
              aria-haspopup="dialog"
            >
              <MapPinIcon className="w-4 h-4 text-primary shrink-0" />
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
                  isLocationOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            {/* Location Dropdown Menu */}
            {isLocationOpen && (
              <div
                className="absolute top-full right-0 mt-2 z-40 w-full bg-white rounded-2xl border border-border-warm shadow-[0_12px_36px_rgba(0,0,0,0.1)] p-3 animate-popover-enter"
                role="dialog"
                aria-label="Pilih Lokasi Kegiatan"
              >
                {/* Heading */}
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-1 mb-1">
                  LOKASI
                </div>
                <div className="text-xs font-bold text-primary px-1 mb-2">
                  Lokasi kegiatan
                </div>

                {/* Search Input */}
                <div className="relative flex items-center mb-1.5">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
                    <SearchIcon className="w-3.5 h-3.5" />
                  </div>
                  <input
                    ref={locationSearchInputRef}
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Cari kecamatan / kota..."
                    className="w-full h-8 pl-8 pr-7 rounded-xl bg-stone-50/80 border border-border-warm text-xs text-primary placeholder:text-stone-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all font-body"
                  />
                  {locationQuery && (
                    <button
                      type="button"
                      onClick={() => setLocationQuery('')}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center text-stone-400 hover:text-primary transition-colors cursor-pointer"
                      aria-label="Hapus filter lokasi"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Auto Geolocation Trigger (Clean actionable row, no dashed border) */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLoadingGeo}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs font-medium text-primary hover:bg-neutral transition-colors cursor-pointer disabled:opacity-50 select-none text-left font-body mb-1"
                >
                  <LocateIcon
                    className={`w-3.5 h-3.5 shrink-0 text-primary ${
                      isLoadingGeo ? 'animate-spin' : ''
                    }`}
                  />
                  <span className="truncate">
                    {isLoadingGeo
                      ? 'Mendeteksi lokasi...'
                      : 'Gunakan lokasi perangkat saya'}
                  </span>
                </button>

                {/* Geolocation feedback / error message */}
                {geoFeedback && (
                  <div className="px-2 py-1 mb-1 text-[11px] text-amber-700 bg-amber-50 rounded-lg">
                    {geoFeedback}
                  </div>
                )}

                {/* Location List */}
                <div className="max-h-52 overflow-y-auto space-y-0.5 pr-0.5 no-scrollbar">
                  {filteredLocations.map((loc) => {
                    const isSelected = selectedLocation === loc.name
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => {
                          onSelectLocation(loc.name)
                          closeLocationDropdown()
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl text-xs text-left transition-colors cursor-pointer select-none font-body ${
                          isSelected
                            ? 'bg-neutral text-primary'
                            : 'hover:bg-neutral text-stone-700'
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span
                            className={`truncate leading-snug ${
                              isSelected
                                ? 'font-bold text-primary'
                                : 'font-medium text-stone-700'
                            }`}
                          >
                            {loc.name}
                          </span>
                          {loc.region && (
                            <span
                              className={`text-[10px] leading-tight ${
                                isSelected ? 'text-primary/70' : 'text-stone-400'
                              }`}
                            >
                              {loc.region}
                            </span>
                          )}
                        </div>
                        {isSelected && (
                          <CheckIcon className="w-3.5 h-3.5 shrink-0 text-primary" />
                        )}
                      </button>
                    )
                  })}
                  {filteredLocations.length === 0 && (
                    <div className="px-2 py-3 text-center text-xs text-stone-500">
                      <span>Lokasi tidak ditemukan.</span>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        Coba cari nama kota atau kecamatan lain.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer: Tutup */}
                <div className="pt-2 mt-2 border-t border-border-warm/60 flex items-center justify-end px-1">
                  <button
                    type="button"
                    onClick={closeLocationDropdown}
                    className="text-[10px] font-normal leading-tight text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: Active Filter Tags (Only rendered when active) */}
        {/* ========================================================= */}
        {selectedCategories.length > 0 && (
          <div className="relative z-20 flex items-center gap-2 flex-wrap min-w-0 pt-0.5">
            <span className="text-xs text-stone-400 font-medium shrink-0">
              Filter aktif:
            </span>

            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 h-7 pl-2.5 pr-1.5 rounded-lg bg-neutral border border-primary/20 text-primary text-xs font-semibold select-none"
              >
                <span>{cat}</span>
                <button
                  type="button"
                  onClick={() => onRemoveCategory(cat)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label={`Hapus filter ${cat}`}
                  title={`Hapus filter ${cat}`}
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Clear All action if more than 1 active filter */}
            {selectedCategories.length > 1 && (
              <button
                type="button"
                onClick={onClearAllCategories}
                className="text-xs text-stone-500 hover:text-primary hover:underline cursor-pointer transition-colors ml-0.5"
              >
                Hapus semua filter
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
