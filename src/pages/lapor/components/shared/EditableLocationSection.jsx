import { useState, useEffect, useRef } from 'react'
import {
  MapPinIcon,
  CheckIcon,
  LocateIcon,
  MapIcon,
  CheckCircle2Icon,
} from '../../../../components/common/Icons'
import Button from '../../../../components/common/Button'
import ReportMapPicker from './ReportMapPicker'
import {
  DEFAULT_COORDINATES,
  reverseGeocodeNominatim,
  formatAddressBreakdown,
} from '../../../../utils/mapUtils'

/**
 * EditableLocationSection
 *
 * Provides read-only display by default with inline edit capability.
 * In edit mode, allows user to use browser GPS or pick a pin interactively on the real map.
 * Commits changes only on "Simpan Lokasi", preserving original context on "Batal".
 */
function EditableLocationSection({ location, onSaveLocation, className = '' }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPickerMode, setIsPickerMode] = useState(false)
  const [draftLocation, setDraftLocation] = useState(location)
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
    setIsEditing(true)
    setIsPickerMode(false)
    setGpsStatus('idle')
    setGpsMessage('')
  }

  const handleCancel = () => {
    setDraftLocation(location)
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
      const fallback = {
        lat: DEFAULT_COORDINATES.lat,
        lng: DEFAULT_COORDINATES.lng,
        address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
        source: 'gps',
      }
      setDraftLocation(fallback)
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
        setGpsStatus('success')
        setGpsMessage('Lokasi saat ini berhasil digunakan.')

        // Attempt reverse geocoding via Nominatim
        reverseGeocodeNominatim(lat, lng)
          .then((displayName) => {
            if (!isMountedRef.current) return
            if (displayName) {
              setDraftLocation((prev) => ({
                ...prev,
                address: displayName,
              }))
            }
          })
          .catch(() => {})
      },
      () => {
        if (!isMountedRef.current) return
        const fallback = {
          lat: DEFAULT_COORDINATES.lat,
          lng: DEFAULT_COORDINATES.lng,
          address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
          source: 'gps',
        }
        setDraftLocation(fallback)
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

  const handleLocationSelect = ({ lat, lng }) => {
    setDraftLocation((prev) => ({
      ...prev,
      lat,
      lng,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      source: 'map',
    }))
    setGpsStatus('map-selected')
    setGpsMessage('Titik lokasi berhasil dipilih dari peta.')

    reverseGeocodeNominatim(lat, lng)
      .then((displayName) => {
        if (!isMountedRef.current) return
        if (displayName) {
          setDraftLocation((prev) => ({
            ...prev,
            address: displayName,
          }))
        }
      })
      .catch(() => {})
  }

  const displayedLoc = isEditing ? draftLocation : location
  const { primary: primaryAddress, secondary: secondaryAddress } = formatAddressBreakdown(
    displayedLoc?.address,
    'Lokasi belum ditentukan'
  )

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
            <LocateIcon className="w-4 h-4 shrink-0" strokeWidth={2} />
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
            <MapIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
            <span>Atur Lokasi di Peta</span>
          </button>
        </div>
      )}

      {/* Status / Feedback Banner */}
      {isEditing && gpsMessage && (
        <div className="rounded-xl bg-stone-50 border border-stone-200/80 px-3 py-2 text-xs text-stone-600 flex items-center gap-2">
          <CheckCircle2Icon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
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

      {/* Real Geographic Map Component (Interactive in Picker Mode, Preview in Read-only Mode) */}
      <ReportMapPicker
        location={displayedLoc}
        isPickerMode={isEditing && isPickerMode}
        onLocationSelect={handleLocationSelect}
      />

      {/* Save & Cancel Actions (Edit Mode) */}
      {isEditing && (
        <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
          <Button
            size="sm"
            variant="primary"
            onClick={handleSave}
            aria-label="Simpan perubahan lokasi"
          >
            <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>Simpan Lokasi</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCancel}
            aria-label="Batalkan perubahan lokasi"
          >
            Batal
          </Button>
        </div>
      )}
    </div>
  )
}

export default EditableLocationSection
