import { useState, useEffect, useRef } from 'react'
import { MapPinIcon, CheckIcon } from '../../../../components/common/Icons'
import ReportMapPreview from './ReportMapPreview'
import {
  DEFAULT_MAP_PIN,
  latLngToMapCoords,
  mapCoordsToLatLng,
} from '../../../../utils/mapUtils'

/**
 * EditableLocationSection
 *
 * Provides read-only display by default with inline edit capability.
 * In edit mode, allows user to use browser GPS or pick a pin interactively on the map.
 * Commits changes only on "Simpan Lokasi", preserving original context on "Batal".
 */
function EditableLocationSection({ location, onSaveLocation, className = '' }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPickerMode, setIsPickerMode] = useState(false)
  const [draftLocation, setDraftLocation] = useState(location)
  const [mapPin, setMapPin] = useState(() => latLngToMapCoords(location?.lat, location?.lng))
  const [gpsStatus, setGpsStatus] = useState('idle')
  const [gpsMessage, setGpsMessage] = useState('')

  const isMountedRef = useRef(true)
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleStartEdit = () => {
    setDraftLocation(location)
    setMapPin(latLngToMapCoords(location?.lat, location?.lng))
    setIsEditing(true)
    setIsPickerMode(false)
    setGpsStatus('idle')
    setGpsMessage('')
  }

  const handleCancel = () => {
    setDraftLocation(location)
    setMapPin(latLngToMapCoords(location?.lat, location?.lng))
    setIsEditing(false)
    setIsPickerMode(false)
    setGpsStatus('idle')
    setGpsMessage('')
  }

  const handleSave = () => {
    if (draftLocation && onSaveLocation) {
      onSaveLocation(draftLocation)
    }
    setIsEditing(false)
    setIsPickerMode(false)
  }

  const handleGPS = () => {
    setGpsStatus('loading')
    setGpsMessage('')
    setIsPickerMode(false)

    if (!navigator.geolocation) {
      const simulatedLat = -6.917464
      const simulatedLng = 107.619123
      const fallback = {
        lat: simulatedLat,
        lng: simulatedLng,
        address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
        source: 'gps',
      }
      setDraftLocation(fallback)
      setMapPin(DEFAULT_MAP_PIN)
      setGpsStatus('success')
      setGpsMessage('Lokasi simulasi digunakan (GPS tidak didukung oleh browser).')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!isMountedRef.current) return
        const { latitude: lat, longitude: lng } = pos.coords
        const newLoc = {
          lat,
          lng,
          address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          source: 'gps',
        }
        setDraftLocation(newLoc)
        setMapPin(latLngToMapCoords(lat, lng))
        setGpsStatus('success')
        setGpsMessage('Lokasi saat ini berhasil digunakan.')

        // Attempt reverse geocoding via Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
          { headers: { 'Accept-Language': 'id' } }
        )
          .then((r) => r.json())
          .then((data) => {
            if (!isMountedRef.current) return
            if (data?.display_name) {
              setDraftLocation((prev) => ({
                ...prev,
                address: data.display_name,
              }))
            }
          })
          .catch(() => {})
      },
      () => {
        if (!isMountedRef.current) return
        const fallbackLat = -6.917464
        const fallbackLng = 107.619123
        const fallback = {
          lat: fallbackLat,
          lng: fallbackLng,
          address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
          source: 'gps',
        }
        setDraftLocation(fallback)
        setMapPin(DEFAULT_MAP_PIN)
        setGpsStatus('success')
        setGpsMessage('Lokasi simulasi digunakan (izin GPS tidak diberikan).')
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }

  const handleStartPicker = () => {
    setIsPickerMode(true)
    setGpsStatus('idle')
    setGpsMessage('Klik atau sentuh area peta untuk menempatkan titik lokasi temuan.')
  }

  const handleMapClick = (coords) => {
    setMapPin(coords)
    const { lat, lng } = mapCoordsToLatLng(coords.x, coords.y)
    setDraftLocation({
      lat,
      lng,
      address: 'Lokasi dipilih secara manual di peta',
      source: 'map',
    })
    setGpsStatus('map-selected')
    setGpsMessage('Titik lokasi berhasil diperbarui dari peta.')
  }

  const displayedLoc = isEditing ? draftLocation : location
  const parts = displayedLoc?.address ? displayedLoc.address.split(',').map((p) => p.trim()) : []
  const primaryAddress = parts.slice(0, 2).join(', ') || displayedLoc?.address || 'Lokasi belum ditentukan'
  const secondaryAddress = parts.slice(2, 4).join(', ')

  return (
    <div className={`pt-4.5 border-t border-stone-100 flex flex-col gap-3 min-w-0 ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
          <span>Lokasi Temuan</span>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="text-[11px] font-normal leading-none tracking-normal text-stone-400 hover:text-stone-600 hover:underline transition-colors cursor-pointer shrink-0 select-none p-0 bg-transparent border-0 shadow-none"
            aria-label="Ubah lokasi di peta"
          >
            Ubah Peta
          </button>
        )}
      </div>

      {/* Edit Mode Buttons */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleGPS}
            disabled={gpsStatus === 'loading'}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 sm:py-0 sm:min-h-0 sm:h-[42px] px-4 sm:px-5 rounded-full font-semibold text-sm leading-normal sm:leading-none whitespace-nowrap transition-colors cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
              gpsStatus === 'loading'
                ? 'bg-primary/50 text-white cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white shadow-xs active:scale-[0.98]'
            }`}
            aria-label="Gunakan lokasi GPS saat ini"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <line x1="2" x2="5" y1="12" y2="12" />
              <line x1="19" x2="22" y1="12" y2="12" />
              <line x1="12" x2="12" y1="2" y2="5" />
              <line x1="12" x2="12" y1="19" y2="22" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <span>{gpsStatus === 'loading' ? 'Mendeteksi GPS…' : 'Gunakan Lokasi Saya'}</span>
          </button>

          <button
            type="button"
            onClick={handleStartPicker}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 sm:py-0 sm:min-h-0 sm:h-[42px] px-4 sm:px-5 rounded-full font-semibold text-sm leading-normal sm:leading-none whitespace-nowrap transition-colors shadow-xs cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98] ${
              isPickerMode
                ? 'text-primary bg-primary/[0.08] border border-primary ring-1 ring-primary/30'
                : 'text-primary bg-white hover:bg-primary/[0.04] border border-primary/25 hover:border-primary/45'
            }`}
            aria-label="Atur lokasi titik sampah di peta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-primary shrink-0"
              aria-hidden="true"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </svg>
            <span>Atur Lokasi di Peta</span>
          </button>
        </div>
      )}

      {/* Status / Feedback Banner */}
      {isEditing && gpsMessage && (
        <div className="rounded-xl bg-stone-50 border border-stone-200/80 px-3 py-2 text-xs text-stone-600 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-primary shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="leading-snug">{gpsMessage}</span>
        </div>
      )}

      {/* Address Details */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-stone-800 leading-snug">{primaryAddress}</p>
        {secondaryAddress && (
          <p className="text-xs text-stone-500 leading-snug">{secondaryAddress}</p>
        )}
        <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5 flex-wrap">
          {typeof displayedLoc?.lat === 'number' && typeof displayedLoc?.lng === 'number' && (
            <span className="font-mono">
              Koordinat: {displayedLoc.lat.toFixed(5)}, {displayedLoc.lng.toFixed(5)}
            </span>
          )}
          {displayedLoc?.source && (
            <>
              <span className="text-stone-300 select-none" aria-hidden="true">·</span>
              <span>
                {displayedLoc.source === 'gps' ? 'Sumber: GPS' : 'Sumber: Lokasi dipilih di peta'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Map Component (Interactive in Picker Mode, Preview in Read-only Mode) */}
      <ReportMapPreview
        location={displayedLoc}
        pin={isEditing ? mapPin : undefined}
        isPickerMode={isEditing && isPickerMode}
        onMapClick={handleMapClick}
      />

      {/* Save & Cancel Actions (Edit Mode) */}
      {isEditing && (
        <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-full font-semibold text-xs sm:text-sm bg-primary hover:bg-primary/90 text-white transition-colors cursor-pointer shadow-xs active:scale-[0.98] select-none"
            aria-label="Simpan perubahan lokasi"
          >
            <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>Simpan Lokasi</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center justify-center h-9 px-4 sm:px-5 rounded-full font-semibold text-xs sm:text-sm text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer active:scale-[0.98] select-none"
            aria-label="Batalkan perubahan lokasi"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  )
}

export default EditableLocationSection
