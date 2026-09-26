import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'
import PhotoUploadCard from './components/PhotoUploadCard'
import TemukanLocationCard from './components/temukan/TemukanLocationCard'
import TemukanDescriptionCard from './components/temukan/TemukanDescriptionCard'
import {
  DEFAULT_MAP_PIN,
  latLngToMapCoords,
  mapCoordsToLatLng,
  reverseGeocodeNominatim,
} from '../../utils/mapUtils'
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/common/Icons'

const MAX_DESC = 300

/**
 * LaporTemukanPage — Step 01: Temukan (/lapor/temukan)
 *
 * The first main step of the 4-step Lapor reporting flow.
 * Entered from /lapor after the user has selected a photo.
 *
 * Contains:
 *  - Left: Photo Temuan card (read-only image from context with natural aspect ratio)
 *  - Right: Lokasi Temuan card (interactive mock map picker + GPS) + Deskripsi Tambahan card
 *
 * Background: solid #F9F8F3 (no pattern, no decorative objects).
 */
function LaporTemukanPage() {
  const navigate = useNavigate()
  const { reportData, updateReport } = useLapor()

  const photo = reportData.temukan.photo
  const location = reportData.temukan.location
  const description = reportData.temukan.description

  const isMountedRef = useRef(true)
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // GPS interaction state (local UI — not stored in context)
  const [gpsStatus, setGpsStatus] = useState(
    location.lat !== null ? (location.source === 'map' ? 'map-selected' : 'success') : 'idle'
  )
  const [gpsMessage, setGpsMessage] = useState(
    location.source === 'gps'
      ? 'Lokasi saat ini berhasil digunakan.'
      : location.source === 'map'
        ? 'Lokasi dipilih secara manual di peta.'
        : ''
  )

  // Map pin position in SVG coordinates (viewBox 560x220) — initialized from existing location if available
  const [mapPin, setMapPin] = useState(() => latLngToMapCoords(location.lat, location.lng))

  // Description directly updates context — no duplicate local text state
  const handleDescChange = useCallback(
    (e) => {
      const val = e.target.value.slice(0, MAX_DESC)
      updateReport({ temukan: { description: { text: val } } })
    },
    [updateReport]
  )

  // GPS Handler: attempts browser geolocation, falls back gracefully to simulated coordinates
  const handleGPS = useCallback(() => {
    setGpsStatus('loading')
    setGpsMessage('')

    if (!navigator.geolocation) {
      // Fallback simulated GPS coordinates for testing / unsupported environments
      const simulatedLat = -6.917464
      const simulatedLng = 107.619123
      updateReport({
        temukan: {
          location: {
            lat: simulatedLat,
            lng: simulatedLng,
            address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
            source: 'gps',
          },
        },
      })
      setMapPin(DEFAULT_MAP_PIN)
      setGpsStatus('success')
      setGpsMessage('Lokasi simulasi digunakan (GPS tidak didukung oleh browser).')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!isMountedRef.current) return
        const { latitude: lat, longitude: lng } = pos.coords
        // Commit coordinates immediately
        updateReport({
          temukan: {
            location: {
              lat,
              lng,
              address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
              source: 'gps',
            },
          },
        })
        setMapPin(latLngToMapCoords(lat, lng))
        setGpsStatus('success')
        setGpsMessage('Lokasi saat ini berhasil digunakan.')

        // Attempt reverse geocoding via Nominatim
        reverseGeocodeNominatim(lat, lng)
          .then((displayName) => {
            if (!isMountedRef.current) return
            if (displayName) {
              updateReport({
                temukan: {
                  location: { lat, lng, address: displayName, source: 'gps' },
                },
              })
            }
          })
          .catch(() => {
            // Keep coordinate string if geocoding fails
          })
      },
      () => {
        if (!isMountedRef.current) return
        // When permission is denied, use transparent simulated location for testing
        const fallbackLat = -6.917464
        const fallbackLng = 107.619123
        updateReport({
          temukan: {
            location: {
              lat: fallbackLat,
              lng: fallbackLng,
              address: 'Jl. Braga No. 15, Sumur Bandung, Kota Bandung (Simulasi)',
              source: 'gps',
            },
          },
        })
        setMapPin(DEFAULT_MAP_PIN)
        setGpsStatus('success')
        setGpsMessage('Izin GPS tidak aktif. Menggunakan titik simulasi (Jl. Braga).')
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }, [updateReport])

  // Save manual location from map picker
  const handleSaveMapLocation = useCallback(
    (chosenLocation) => {
      const lat =
        typeof chosenLocation?.lat === 'number'
          ? chosenLocation.lat
          : mapCoordsToLatLng(chosenLocation.x, chosenLocation.y).lat
      const lng =
        typeof chosenLocation?.lng === 'number'
          ? chosenLocation.lng
          : mapCoordsToLatLng(chosenLocation.x, chosenLocation.y).lng
      const address =
        chosenLocation?.address || 'Lokasi dipilih secara manual di peta'

      updateReport({
        temukan: {
          location: {
            lat,
            lng,
            address,
            source: 'map',
          },
        },
      })
      setGpsStatus('map-selected')
      setGpsMessage('Lokasi titik temuan sampah berhasil disimpan dari peta.')

      // Background reverse-geocoding if address wasn't resolved yet
      if (!chosenLocation?.address || chosenLocation.address.includes(`${lat.toFixed(5)}`)) {
        reverseGeocodeNominatim(lat, lng)
          .then((displayName) => {
            if (!isMountedRef.current) return
            if (displayName) {
              updateReport({
                temukan: {
                  location: { lat, lng, address: displayName, source: 'map' },
                },
              })
            }
          })
          .catch(() => {})
      }
    },
    [updateReport]
  )

  const canContinue = Boolean(
    photo?.file &&
    typeof location.lat === 'number' &&
    typeof location.lng === 'number'
  )

  const handleContinue = useCallback(() => {
    if (!canContinue || isLoading) return
    setIsLoading(true)
    timerRef.current = setTimeout(() => {
      navigate('/lapor/kenali')
    }, 900)
  }, [canContinue, isLoading, navigate])

  return (
    <main
      className="min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-14 sm:pb-18 animate-page-enter"
      aria-label="Lapor Sampah — Langkah 1: Temukan"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <LaporStepHeader
          step={1}
          title="Temukan Sampah di Sekitarmu"
          subtitle="Konfirmasi lokasi dan tambahkan konteks jika diperlukan."
          className="pt-2 pb-2 lapor-enter-header"
        />

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <div className="lapor-enter-card">
            <PhotoUploadCard
              value={photo?.file || null}
              onReplace={() => navigate('/lapor')}
              statusText="Terekam"
              size="default"
              className="self-start"
            />
          </div>

          <div className="flex flex-col gap-4 lapor-enter-card-delay-1">
            <TemukanLocationCard
              location={location}
              gpsStatus={gpsStatus}
              gpsMessage={gpsMessage}
              mapPin={mapPin}
              onGPS={handleGPS}
              onSaveMapLocation={handleSaveMapLocation}
            />
            <TemukanDescriptionCard
              value={description.text || ''}
              onChange={handleDescChange}
              maxLength={MAX_DESC}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 lapor-enter-actions">
          <button
            type="button"
            onClick={() => navigate('/lapor')}
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 transition-colors select-none w-full sm:w-auto ${
              isLoading
                ? 'opacity-40 cursor-not-allowed pointer-events-none'
                : 'hover:bg-primary/[0.04] hover:border-primary/45 shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            }`}
            aria-label="Kembali ke halaman foto"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue || isLoading}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              canContinue && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                : 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
            }`}
            aria-label="Lanjutkan ke Kenali"
            aria-disabled={!canContinue || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span>Menyiapkan Analisis...</span>
              </>
            ) : (
              <>
                <span>Lanjutkan ke Kenali</span>
                <ArrowRightIcon className="w-4 h-4" strokeWidth={2.25} />
              </>
            )}
          </button>
        </div>

        {!canContinue && (
          <p className="mt-2 text-center text-xs text-stone-400 font-medium">
            {!photo.file
              ? 'Kembali ke halaman sebelumnya untuk memilih foto'
              : !location.lat
                ? 'Tentukan lokasi temuan sampah (GPS atau peta) untuk melanjutkan'
                : ''}
          </p>
        )}
      </div>
    </main>
  )
}

export default LaporTemukanPage
