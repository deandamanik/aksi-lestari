import { useState } from 'react'
import {
  MapPinIcon,
  CheckIcon,
  LocateIcon,
  MapIcon,
  CheckCircle2Icon,
} from '../../../../components/common/Icons'
import ReportMapPicker from '../shared/ReportMapPicker'
import {
  DEFAULT_COORDINATES,
  formatAddressBreakdown,
  reverseGeocodeNominatim,
} from '../../../../utils/mapUtils'

/**
 * AddressSummary — Presentational component displaying reverse-geocoded or coordinate address.
 */
function AddressSummary({ location }) {
  const { primary, secondary } = formatAddressBreakdown(location?.address)

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
        <MapPinIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
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
 * - Real geographic map preview & picker via ReportMapPicker
 *
 * @param {object} props
 * @param {{ lat: number|null, lng: number|null, address?: string, source?: string }} props.location
 * @param {string} props.gpsStatus
 * @param {string} props.gpsMessage
 * @param {() => void} props.onGPS
 * @param {({ lat: number, lng: number, address?: string, source?: string }) => void} props.onSaveMapLocation
 */
export default function TemukanLocationCard({
  location,
  gpsStatus,
  gpsMessage,
  onGPS,
  onSaveMapLocation,
}) {
  const hasLocation = location.lat !== null && location.lat !== undefined
  const [isPickerMode, setIsPickerMode] = useState(false)
  const [tempLocation, setTempLocation] = useState(null)

  const handleStartPicker = () => {
    setIsPickerMode(true)
    const initial = hasLocation
      ? { ...location }
      : {
          lat: DEFAULT_COORDINATES.lat,
          lng: DEFAULT_COORDINATES.lng,
          address: `${DEFAULT_COORDINATES.lat.toFixed(5)}, ${DEFAULT_COORDINATES.lng.toFixed(5)}`,
          source: 'map',
        }
    setTempLocation(initial)

    // Reverse-geocode initial coordinates if no address yet
    if (!hasLocation) {
      reverseGeocodeNominatim(DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng)
        .then((addr) => {
          if (addr) {
            setTempLocation((prev) => (prev ? { ...prev, address: addr } : prev))
          }
        })
        .catch(() => {})
    }
  }

  const handleCancelPicker = () => {
    setIsPickerMode(false)
    setTempLocation(null)
  }

  const handleConfirmPicker = () => {
    if (tempLocation) {
      onSaveMapLocation(tempLocation)
    }
    setIsPickerMode(false)
  }

  const handleLocationSelect = ({ lat, lng }) => {
    if (!isPickerMode) return
    setTempLocation((prev) => ({
      ...prev,
      lat,
      lng,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      source: 'map',
    }))

    reverseGeocodeNominatim(lat, lng)
      .then((displayName) => {
        if (displayName) {
          setTempLocation((prev) => (prev ? { ...prev, address: displayName } : prev))
        }
      })
      .catch(() => {})
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
          <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
          GPS Terdeteksi
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary">
        <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
        Lokasi Dipilih
      </span>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-primary" strokeWidth={1.75} />
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
              <LocateIcon className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span>{gpsStatus === 'loading' ? 'Mendeteksi GPS…' : 'Gunakan Lokasi Saya'}</span>
            </button>

            <button
              type="button"
              onClick={handleStartPicker}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 lg:py-0 lg:min-h-0 lg:h-[42px] px-4 sm:px-5 rounded-full font-semibold text-sm leading-normal lg:leading-none whitespace-nowrap text-primary bg-white hover:bg-primary/[0.04] border border-primary/25 hover:border-primary/45 transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
              aria-label="Atur lokasi titik sampah di peta"
            >
              <MapIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
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
                <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
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
            <CheckCircle2Icon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
            <span className="leading-snug">{gpsMessage}</span>
          </div>
        )}

        {isPickerMode && tempLocation && (
          <AddressSummary location={tempLocation} />
        )}

        {hasLocation && !isPickerMode && (
          <AddressSummary location={location} />
        )}

        <ReportMapPicker
          location={isPickerMode ? tempLocation : location}
          isPickerMode={isPickerMode}
          onLocationSelect={handleLocationSelect}
        />

        <p className="text-[11px] text-stone-400 leading-snug">
          {isPickerMode
            ? '* Titik pin dapat dipindahkan dengan mengklik area peta atau menggeser pin.'
            : '* Peta di atas menampilkan titik koordinat lokasi laporan.'}
        </p>
      </div>
    </div>
  )
}
