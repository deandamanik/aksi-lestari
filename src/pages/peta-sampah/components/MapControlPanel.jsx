import { useState } from 'react'
import { SearchIcon } from '../../../components/common/Icons'

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

  const hasSearch = searchQuery.trim().length > 0
  const noResults = hasSearch && hasNoResults

  return (
    <div
      className={`fixed md:absolute bottom-3 md:bottom-auto left-3 sm:left-4 md:left-4 lg:left-8 md:top-24 z-20 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[300px] lg:w-[360px] pointer-events-none transition-all duration-200 ease-out ${
        isDetailOpen
          ? 'max-md:opacity-0 max-md:pointer-events-none max-md:translate-y-6 max-md:invisible'
          : 'max-md:opacity-100 max-md:translate-y-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-border-warm shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3.5 sm:p-4 pointer-events-auto max-h-[68dvh] md:max-h-[calc(100dvh-7.5rem)] flex flex-col overflow-hidden transition-all duration-200">
        {/* Mobile Pull Handle */}
        <div className="md:hidden w-8 h-1 bg-stone-300 rounded-full mx-auto mb-2 shrink-0" aria-hidden="true" />

        {/* Panel Header */}
        <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
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

        {/* Search Input across both datasets */}
        <div className="relative mb-2.5 sm:mb-3 shrink-0">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari wilayah / jalan..."
            className="w-full h-8.5 pl-9 pr-8 font-body text-xs sm:text-[13px] bg-neutral border border-border-warm rounded-xl text-primary placeholder:text-stone-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
            aria-label="Cari wilayah atau jalan"
          />
          {hasSearch && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 text-xs rounded-md"
              aria-label="Hapus teks pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Expandable Section on mobile, always visible on tablet/desktop */}
        <div className={`space-y-3 overflow-y-auto pr-0.5 ${isMobileCollapsed ? 'hidden md:block' : 'block'}`}>
          <div className="pt-2.5 border-t border-border-warm/60">
            <div className="mb-1.5">
              <span className="font-body text-[10px] font-medium text-stone-700">
                Lapisan Peta
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full">
              <button
                type="button"
                onClick={() => setHeatmapVisible((prev) => !prev)}
                className={`flex-1 min-w-0 box-border inline-flex items-center justify-center h-7 px-2 rounded-lg font-body text-[10px] font-medium border transition-colors whitespace-nowrap ${
                  heatmapVisible
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-stone-50 border-border-warm text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                }`}
                aria-pressed={heatmapVisible}
              >
                <span>Heatmap</span>
              </button>

              <button
                type="button"
                onClick={() => setReportsVisible((prev) => !prev)}
                className={`flex-1 min-w-0 box-border inline-flex items-center justify-center h-7 px-2 rounded-lg font-body text-[10px] font-medium border transition-colors whitespace-nowrap ${
                  reportsVisible
                    ? 'bg-amber-500/10 text-amber-900 border-amber-500/30'
                    : 'bg-stone-50 border-border-warm text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                }`}
                aria-pressed={reportsVisible}
              >
                <span>Laporan</span>
              </button>

              <button
                type="button"
                onClick={() => setBankSampahVisible((prev) => !prev)}
                className={`flex-[1.3] min-w-0 box-border inline-flex items-center justify-center h-7 px-2.5 rounded-lg font-body text-[10px] font-medium border transition-colors whitespace-nowrap ${
                  bankSampahVisible
                    ? 'bg-blue-500/10 text-blue-900 border-blue-500/30'
                    : 'bg-stone-50 border-border-warm text-stone-500 hover:bg-stone-100 hover:text-stone-700'
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
                  <div className="font-body text-[11px] sm:text-xs font-medium text-stone-700 mb-1">
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
                  <div className="flex items-center justify-between font-body text-[10px] sm:text-[11px] text-stone-500 leading-none">
                    <span>Rendah</span>
                    <span>Sedang</span>
                    <span>Tinggi</span>
                  </div>
                </div>
              )}

              {(reportsVisible || bankSampahVisible) && (
                <div className="flex items-center gap-4 pt-0.5 font-body text-[11px] sm:text-xs text-stone-600">
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
            <button
              type="button"
              onClick={onUseMyLocation}
              disabled={isLocating}
              className="w-full inline-flex items-center justify-center gap-2 h-8 px-3 rounded-xl bg-stone-100 hover:bg-stone-200/80 active:bg-stone-200 text-primary font-body text-xs sm:text-[13px] font-medium border border-border-warm transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
            >
              {isLocating ? (
                <svg className="w-3.5 h-3.5 animate-spin text-primary shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-primary shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              )}
              <span>{isLocating ? 'Mencari lokasi...' : 'Gunakan Lokasiku'}</span>
            </button>

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
