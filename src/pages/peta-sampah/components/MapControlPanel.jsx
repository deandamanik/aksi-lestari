import { useState } from 'react'
import Button from '../../../components/common/Button'
import { SearchIcon, CompassIcon, XIcon, MapPinIcon } from '../../../components/common/Icons'
import { filterCities, findMatchingCity } from './cityIndex'

/**
 * MapControlPanel Component
 *
 * Dedicated "Peta Titik & Pantau" map control layer providing:
 * - Editorial header: "Monitoring Sebaran Sampah" eyebrow + "Peta Titik & Pantau"
 * - Dual-dataset search: searches both waste reports and Bank Sampah
 * - Map layer toggles: "Heatmap", "Laporan", "Bank Sampah"
 * - Dynamic legend: "Konsentrasi Masalah" (heatmap density) & marker dots
 * - "Gunakan Lokasiku" geolocation trigger with inline quiet status
 */
function MapControlPanel({
  searchQuery,
  setSearchQuery,
  heatmapVisible,
  setHeatmapVisible,
  reportsVisible,
  setReportsVisible,
  bankSampahVisible,
  setBankSampahVisible,
  hasNoResults = false,
  onUseMyLocation,
  isLocating,
  locationError,
  isDetailOpen = false,
}) {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const hasSearch = searchQuery.trim().length > 0
  const matchedCity = findMatchingCity(searchQuery)
  const noResults = hasSearch && hasNoResults && !matchedCity

  const citySuggestions = filterCities(searchQuery, 4)
  const showSuggestions =
    isInputFocused &&
    hasSearch &&
    citySuggestions.length > 0 &&
    !citySuggestions.some((c) => c.name.toLowerCase() === searchQuery.trim().toLowerCase())

  return (
    <div
      className={`fixed md:absolute bottom-3 md:bottom-auto left-3 sm:left-4 md:left-4 lg:left-8 md:top-24 z-20 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[320px] lg:w-[360px] pointer-events-none transition-all duration-200 ease-out ${
        isDetailOpen
          ? 'max-md:opacity-0 max-md:pointer-events-none max-md:translate-y-6 max-md:invisible'
          : 'max-md:opacity-100 max-md:translate-y-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-border-warm shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3.5 sm:p-4 pointer-events-auto max-h-[68dvh] md:max-h-[calc(100dvh-7.5rem)] flex flex-col overflow-hidden transition-all duration-200 animate-panel-enter">
        {/* Mobile Pull Handle */}
        <div className="md:hidden w-8 h-1 bg-stone-300 rounded-full mx-auto mb-2 shrink-0" aria-hidden="true" />

        {/* Panel Header */}
        <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3 shrink-0">
          <div>
            <div className="mb-1">
              <span className="font-body text-[10px] sm:text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
                Monitoring Sebaran Sampah
              </span>
            </div>

            <h1 className="font-display font-semibold text-primary text-[19px] sm:text-[20px] lg:text-[21px] leading-[1.15] tracking-tight">
              Peta Titik &amp; Pantau
            </h1>
            <p className="font-body text-xs sm:text-[13px] text-stone-500 mt-0.5 sm:mt-1 leading-snug">
              Laporan warga &amp; sebaran Bank Sampah.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileCollapsed((prev) => !prev)}
            className="md:hidden p-1 text-stone-400 hover:text-primary transition-colors shrink-0"
            aria-label={isMobileCollapsed ? 'Buka lapisan peta & legenda' : 'Ciutkan panel kontrol'}
            aria-expanded={!isMobileCollapsed}
          >
            <svg
              className="w-4 h-4 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Search Input across both datasets — Styled consistently with AksiPedia Module search */}
        <div className="relative mb-2.5 sm:mb-3 shrink-0">
          <label htmlFor="cari-wilayah-input" className="sr-only">
            Cari wilayah atau jalan
          </label>
          <div className="relative flex items-center w-full h-9.5 sm:h-10 rounded-full bg-neutral/80 border border-border-warm focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <div className="pl-3.5 flex items-center pointer-events-none text-stone-400 shrink-0">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              id="cari-wilayah-input"
              type="text"
              value={searchQuery}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsInputFocused(false), 200)
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchQuery('')
                  setIsInputFocused(false)
                } else if (e.key === 'Enter') {
                  if (
                    citySuggestions.length > 0 &&
                    !citySuggestions.some((c) => c.name.toLowerCase() === searchQuery.trim().toLowerCase())
                  ) {
                    setSearchQuery(citySuggestions[0].name)
                  }
                  setIsInputFocused(false)
                }
              }}
              placeholder="Cari wilayah / kota..."
              className="w-full h-full pl-2.5 pr-8 bg-transparent text-xs sm:text-[13px] font-body text-primary placeholder:text-stone-400 focus:outline-hidden"
              aria-label="Cari wilayah atau kota"
            />
            {hasSearch && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setIsInputFocused(false)
                }}
                className="absolute right-2.5 p-1 text-stone-400 hover:text-primary transition-colors cursor-pointer rounded-full"
                aria-label="Hapus teks pencarian"
                title="Hapus pencarian (Esc)"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete City Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-30 bg-white/98 backdrop-blur-md rounded-2xl border border-border-warm shadow-[0_10px_25px_rgba(0,0,0,0.12)] py-1.5 overflow-hidden transition-all">
              <div className="px-3.5 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Arahkan ke Kota / Wilayah
              </div>
              {citySuggestions.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setSearchQuery(city.name)
                    setIsInputFocused(false)
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2.5 hover:bg-neutral transition-colors text-xs font-body text-stone-700 hover:text-primary cursor-pointer group"
                >
                  <MapPinIcon className="w-3.5 h-3.5 text-stone-400 group-hover:text-primary transition-colors shrink-0" />
                  <span className="font-medium text-stone-800 group-hover:text-primary transition-colors">
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Section on mobile, always visible on tablet/desktop */}
        <div className={`space-y-3 overflow-y-auto pr-0.5 ${isMobileCollapsed ? 'hidden md:block' : 'block'}`}>
          <div className="pt-2.5 border-t border-border-warm/60">
            <div className="mb-1.5">
              <span className="font-body text-[11px] sm:text-xs font-semibold text-stone-700">
                Lapisan Peta
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full">
              <button
                type="button"
                onClick={() => setHeatmapVisible((prev) => !prev)}
                className={`flex-1 min-w-0 box-border inline-flex items-center justify-center h-7.5 sm:h-8 px-1.5 sm:px-2 rounded-lg font-body text-[11px] sm:text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer select-none active:scale-[0.98] ${
                  heatmapVisible
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-stone-50 border-border-warm text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                }`}
                aria-pressed={heatmapVisible}
              >
                <span>Heatmap</span>
              </button>

              <button
                type="button"
                onClick={() => setReportsVisible((prev) => !prev)}
                className={`flex-1 min-w-0 box-border inline-flex items-center justify-center h-7.5 sm:h-8 px-1.5 sm:px-2 rounded-lg font-body text-[11px] sm:text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer select-none active:scale-[0.98] ${
                  reportsVisible
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-stone-50 border-border-warm text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                }`}
                aria-pressed={reportsVisible}
              >
                <span>Laporan</span>
              </button>

              <button
                type="button"
                onClick={() => setBankSampahVisible((prev) => !prev)}
                className={`flex-[1.4] min-w-0 box-border inline-flex items-center justify-center h-7.5 sm:h-8 px-2 sm:px-2.5 rounded-lg font-body text-[11px] sm:text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer select-none active:scale-[0.98] ${
                  bankSampahVisible
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-stone-50 border-border-warm text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                }`}
                aria-pressed={bankSampahVisible}
              >
                <span>Bank Sampah</span>
              </button>
            </div>
          </div>

          {/* Empty Search Result Notice */}
          {noResults && (
            <div className="py-2 px-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-center">
              <p className="font-body text-xs text-amber-900 font-medium">Tidak ada titik yang sesuai.</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-0.5 font-body text-xs text-primary font-semibold underline hover:opacity-80"
              >
                Reset pencarian
              </button>
            </div>
          )}

          {/* Dynamic Legend */}
          {(heatmapVisible || reportsVisible || bankSampahVisible) && (
            <div className="pt-2.5 border-t border-border-warm/60 space-y-2">
              {heatmapVisible && (
                <div>
                  <div className="font-body text-[11px] sm:text-xs font-semibold text-stone-700 mb-1">
                    Konsentrasi Masalah
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full mb-1"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(122, 171, 43, 0.5), #22603B, #FFA938, #C34614)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between font-body text-[10px] sm:text-[11px] font-medium text-stone-500 leading-none">
                    <span>Rendah</span>
                    <span>Sedang</span>
                    <span>Tinggi</span>
                  </div>
                </div>
              )}

              {(reportsVisible || bankSampahVisible) && (
                <div className="flex items-center gap-4 pt-0.5 font-body text-[11px] sm:text-xs font-semibold text-stone-700">
                  {reportsVisible && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFA938] border border-white shadow-2xs shrink-0" />
                      <span>Sampah</span>
                    </div>
                  )}
                  {bankSampahVisible && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1D70B8] border border-white shadow-2xs shrink-0" />
                      <span>Bank Sampah</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Location Action: "Gunakan Lokasiku" */}
          <div className="pt-2 border-t border-border-warm/60">
            <Button
              variant="secondary"
              size="sm"
              onClick={onUseMyLocation}
              isLoading={isLocating}
              className="w-full h-9.5 sm:h-10 text-primary font-body text-xs sm:text-[13px] font-semibold"
            >
              {!isLocating && <CompassIcon className="w-4 h-4 text-primary shrink-0" />}
              <span>{isLocating ? 'Mencari lokasi...' : 'Gunakan Lokasiku'}</span>
            </Button>

            {locationError && (
              <p className="font-body text-[11px] text-amber-800 text-center mt-1.5 leading-snug">
                {locationError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapControlPanel
