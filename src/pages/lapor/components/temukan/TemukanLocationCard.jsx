import { useState } from 'react'
import TemukanMapPicker from './TemukanMapPicker'
import { DEFAULT_MAP_PIN } from '../../../../utils/mapUtils'

/**
 * AddressSummary — Presentational component displaying reverse-geocoded or coordinate address.
 */
function AddressSummary({ location }) {
  const parts = location.address ? location.address.split(',').map((p) => p.trim()) : []
  const primary = parts.slice(0, 2).join(', ') || location.address
  const secondary = parts.slice(2, 4).join(', ')

  return (
    <div className="rounded-xl border border-border-warm bg-stone-50/70 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-stone-400">
          Alamat Terkonfirmasi
        </p>
        <span className="text-[10px] font-semibold text-stone-400 shrink-0">
          {location.source === 'gps' ? 'Sumber: GPS' : 'Sumber: Peta'}
        </span>
      </div>
      <div className="flex items-start gap-2.5 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-stone-800 leading-snug break-words">{primary}</p>
          {secondary && (
            <p className="text-xs text-stone-500 mt-0.5 leading-snug break-words">{secondary}</p>
          )}
          {location.lat && (
            <p className="text-[11px] text-stone-400 mt-1 font-mono">
              Koordinat: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * TemukanLocationCard
 * Handles the location section of Lapor Step 1:
 * - GPS trigger & status badge
 * - Interactive picker mode activation & confirmation
 * - Address summary display
 * - Map preview via TemukanMapPicker
 *
 * @param {object} props
 * @param {{ lat: number|null, lng: number|null, address?: string, source?: string }} props.location
 * @param {string} props.gpsStatus
 * @param {string} props.gpsMessage
 * @param {{ x: number, y: number }} props.mapPin
 * @param {() => void} props.onGPS
 * @param {({ x: number, y: number }) => void} props.onSaveMapLocation
 */
export default function TemukanLocationCard({
  location,
  gpsStatus,
  gpsMessage,
  mapPin,
  onGPS,
  onSaveMapLocation,
}) {
  const hasLocation = location.lat !== null && location.lat !== undefined
  const [isPickerMode, setIsPickerMode] = useState(false)
  const [tempPin, setTempPin] = useState(mapPin)

  const handleStartPicker = () => {
    setIsPickerMode(true)
    setTempPin(hasLocation ? mapPin : DEFAULT_MAP_PIN)
  }

  const handleCancelPicker = () => {
    setIsPickerMode(false)
    setTempPin(mapPin)
  }

  const handleConfirmPicker = () => {
    onSaveMapLocation(tempPin)
    setIsPickerMode(false)
  }

  const handleMapClick = (coords) => {
    if (!isPickerMode) return
    setTempPin(coords)
  }

  const renderStatusBadge = () => {
    if (gpsStatus === 'loading') {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Mendeteksi…
        </span>
      )
    }

    if (!hasLocation) {
      return (
        <span className="text-[11px] font-medium text-stone-400">
          Belum dipilih
        </span>
      )
    }

    if (location.source === 'gps') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          GPS Terdeteksi
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        Lokasi Dipilih
      </span>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary" aria-hidden="true">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="font-bold text-sm text-primary">Lokasi Temuan</span>
        </div>
        {renderStatusBadge()}
      </div>

      <div className="p-3.5 sm:p-4.5 flex flex-col gap-3.5">
        {!isPickerMode ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onGPS}
              disabled={gpsStatus === 'loading'}
              className={`flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 lg:py-0 lg:min-h-0 lg:h-[42px] px-4 sm:px-5 rounded-full font-semibold text-sm leading-normal lg:leading-none whitespace-nowrap transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                gpsStatus === 'loading'
                  ? 'bg-primary/50 text-white cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 text-white shadow-xs active:scale-[0.98]'
              }`}
              aria-label="Gunakan lokasi GPS saat ini"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
                <line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
              <span>{gpsStatus === 'loading' ? 'Mendeteksi GPS…' : 'Gunakan Lokasi Saya'}</span>
            </button>

            <button
              type="button"
              onClick={handleStartPicker}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 lg:py-0 lg:min-h-0 lg:h-[42px] px-4 sm:px-5 rounded-full font-semibold text-sm leading-normal lg:leading-none whitespace-nowrap text-primary bg-white hover:bg-primary/[0.04] border border-primary/25 hover:border-primary/45 transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
              aria-label="Atur lokasi titik sampah di peta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary shrink-0" aria-hidden="true">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>
              </svg>
              <span>Atur Lokasi di Peta</span>
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3 flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Mode Penentuan Titik di Peta
                </p>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Klik atau sentuh area peta untuk menempatkan pin titik temuan sampah.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-emerald-100">
              <button
                type="button"
                onClick={handleConfirmPicker}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full font-semibold text-sm bg-primary hover:bg-primary/90 text-white transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                aria-label="Simpan titik lokasi yang dipilih"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Simpan Lokasi
              </button>
              <button
                type="button"
                onClick={handleCancelPicker}
                className="inline-flex items-center justify-center h-10 px-4 rounded-full font-semibold text-sm text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer active:scale-[0.98]"
                aria-label="Batalkan pemilihan lokasi di peta"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {gpsMessage && !isPickerMode && (
          <div className="rounded-xl bg-stone-50 border border-stone-200/80 px-3 py-2 text-xs text-stone-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span className="leading-snug">{gpsMessage}</span>
          </div>
        )}

        {hasLocation && !isPickerMode && (
          <AddressSummary location={location} />
        )}

        <div
          className={`w-full rounded-xl overflow-hidden border transition-all duration-200 ${
            isPickerMode
              ? 'border-primary ring-2 ring-primary/20 cursor-crosshair shadow-sm'
              : 'border-border-warm'
          }`}
          aria-label={isPickerMode ? 'Peta interaktif: klik untuk memilih titik lokasi' : 'Pratinjau peta lokasi temuan'}
        >
          <TemukanMapPicker
            isPickerMode={isPickerMode}
            pin={isPickerMode ? tempPin : mapPin}
            hasPin={hasLocation || isPickerMode}
            onMapClick={handleMapClick}
          />
        </div>

        <p className="text-[11px] text-stone-400 leading-snug">
          {isPickerMode
            ? '* Titik pin dapat digeser kapan saja dengan mengklik area jalan atau blok peta.'
            : '* Peta di atas berfungsi sebagai konfirmasi titik koordinat laporan warga.'}
        </p>
      </div>
    </div>
  )
}
