import { useState, useRef, useEffect, useMemo } from 'react'
import {
  SearchIcon,
  XIcon,
  MapPinIcon,
  LocateIcon,
  ChevronDownIcon,
  CheckIcon,
} from '../../../components/common/Icons'
import {
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
  selectedCategory = 'Semua',
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [locationQuery, setLocationQuery] = useState('')
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)
  const [geoFeedback, setGeoFeedback] = useState(null)
  const locationDropdownRef = useRef(null)
  const locationSearchInputRef = useRef(null)

  const closeLocationDropdown = () => {
    setIsLocationOpen(false)
    setLocationQuery('')
    setGeoFeedback(null)
  }

  const toggleLocationDropdown = () => {
    setIsLocationOpen((prev) => {
      const next = !prev
      if (!next) {
        setLocationQuery('')
        setGeoFeedback(null)
      }
      return next
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        closeLocationDropdown()
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isLocationOpen) {
        closeLocationDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLocationOpen])

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

  const categoriesList = useMemo(() => {
    return [
      { id: 'Semua', label: 'Semua Aksi' },
      { id: 'Bersih Lingkungan', label: 'Bersih Lingkungan' },
      { id: 'Pilah & Daur Ulang', label: 'Pilah & Daur Ulang' },
      { id: 'Penghijauan Kota', label: 'Penghijauan Kota' },
      { id: 'Edukasi Warga', label: 'Edukasi Warga' },
    ]
  }, [])

  return (
    <section className="relative z-30 w-full pt-1 pb-4 sm:pb-6 overflow-visible select-none">
      <div className="flex flex-col gap-4">
        {/* ROW 1: Expanded Search Field + Location Selector Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Expanded Search Field (matching AksiPedia style, fills flexible row width) */}
          <div className="relative flex-1 min-w-0">
            <label htmlFor="community-search-input" className="sr-only">
              Cari kegiatan lingkungan
            </label>
            <div className="relative flex items-center w-full h-11 sm:h-12 rounded-full bg-white border border-border-warm shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
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
                className="flex-1 min-w-0 h-full pl-3 pr-9 bg-transparent text-xs sm:text-sm font-body text-primary placeholder:text-stone-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 p-1 text-stone-400 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Hapus teks pencarian"
                  title="Hapus pencarian (Esc)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Location Selector Dropdown */}
          <div className="relative shrink-0" ref={locationDropdownRef}>
            <button
              type="button"
              onClick={toggleLocationDropdown}
              className="inline-flex items-center justify-between sm:justify-start gap-2.5 h-11 sm:h-12 px-4.5 sm:px-5 rounded-full bg-white border border-border-warm text-xs sm:text-sm font-semibold text-primary hover:border-primary/40 transition-colors shadow-2xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
              aria-expanded={isLocationOpen}
              aria-haspopup="dialog"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPinIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">{selectedLocation}</span>
              </div>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-200 ${
                  isLocationOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            {/* Location Dropdown Modal / Popover */}
            {isLocationOpen && (
              <div
                role="dialog"
                aria-label="Pilih Lokasi"
                className="absolute top-[calc(100%+8px)] right-0 z-50 w-full sm:w-80 bg-white rounded-2xl border border-border-warm shadow-xl p-4 animate-content-rise"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="font-display text-primary text-sm font-bold">
                    Pilih Lokasi Aksi
                  </h4>
                  <button
                    type="button"
                    onClick={closeLocationDropdown}
                    className="p-1 text-stone-400 hover:text-primary transition-colors cursor-pointer"
                    aria-label="Tutup pemilih lokasi"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Geolocation Trigger */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLoadingGeo}
                  className="w-full flex items-center justify-center gap-2 h-9 px-3 rounded-xl bg-neutral hover:bg-neutral/80 border border-border-warm text-xs font-semibold text-primary transition-colors cursor-pointer mb-3 disabled:opacity-60"
                >
                  <LocateIcon
                    className={`w-3.5 h-3.5 text-secondary ${isLoadingGeo ? 'animate-spin' : ''}`}
                  />
                  <span>
                    {isLoadingGeo ? 'Mendeteksi lokasi...' : 'Gunakan Lokasiku Saat Ini'}
                  </span>
                </button>

                {geoFeedback && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2 mb-2 leading-relaxed font-body">
                    {geoFeedback}
                  </p>
                )}

                {/* Location Search Input */}
                <div className="relative mb-2.5">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                  <input
                    ref={locationSearchInputRef}
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Cari kecamatan..."
                    className="w-full h-8 pl-8 pr-3 text-xs bg-stone-50 border border-border-warm rounded-lg focus:outline-hidden focus:border-primary text-primary"
                  />
                </div>

                {/* Location List */}
                <div className="max-h-48 overflow-y-auto space-y-1 pr-0.5">
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
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-neutral text-primary font-bold'
                            : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="truncate">{loc.name}</span>
                          {loc.region && (
                            <span className="text-[10px] text-stone-400">{loc.region}</span>
                          )}
                        </div>
                        {isSelected && <CheckIcon className="w-3.5 h-3.5 text-secondary shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ROW 2: Category Filter Pills (Natural, unforced, smooth horizontal scroll matching AksiPedia) */}
        <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pt-0.5">
          <nav
            aria-label="Filter Kategori Aksi"
            className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-1"
          >
            {categoriesList.map((cat) => {
              const isActive =
                selectedCategory === cat.id ||
                (cat.id === 'Semua' && (selectedCategory === 'Semua Aksi' || !selectedCategory))

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-primary text-white font-semibold shadow-xs'
                      : 'bg-white border border-border-warm text-stone-700 hover:bg-stone-50 hover:border-primary/40'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </section>
  )
}
