import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLapor } from '../../context/LaporContext'
import LaporStepHeader from './components/shared/LaporStepHeader'

const MAX_DESC = 300

// Default center on mock map viewBox (560x220)
const DEFAULT_MAP_PIN = { x: 278, y: 110 }

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function formatFileSize(bytes) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Maps SVG click coordinates (viewBox 560x220) to mock Bandung coordinates
 */
function mapCoordsToLatLng(x, y) {
  // Center roughly at -6.9175, 107.6191
  const baseLat = -6.917464
  const baseLng = 107.619123
  const deltaLat = ((y - DEFAULT_MAP_PIN.y) / 220) * -0.015
  const deltaLng = ((x - DEFAULT_MAP_PIN.x) / 560) * 0.03
  return {
    lat: parseFloat((baseLat + deltaLat).toFixed(6)),
    lng: parseFloat((baseLng + deltaLng).toFixed(6)),
  }
}

/**
 * Converts geographic coordinates back to SVG map pin coordinates (viewBox 560x220)
 */
function latLngToMapCoords(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return DEFAULT_MAP_PIN
  const baseLat = -6.917464
  const baseLng = 107.619123
  const rawX = DEFAULT_MAP_PIN.x + ((lng - baseLng) / 0.03) * 560
  const rawY = DEFAULT_MAP_PIN.y + ((lat - baseLat) / -0.015) * 220
  const clampedX = Math.max(16, Math.min(544, Math.round(rawX)))
  const clampedY = Math.max(20, Math.min(200, Math.round(rawY)))
  return { x: clampedX, y: clampedY }
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

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
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
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
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
          { headers: { 'Accept-Language': 'id' } }
        )
          .then((r) => r.json())
          .then((data) => {
            if (!isMountedRef.current) return
            if (data?.display_name) {
              updateReport({
                temukan: {
                  location: { lat, lng, address: data.display_name, source: 'gps' },
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
    (pinCoords) => {
      const { lat, lng } = mapCoordsToLatLng(pinCoords.x, pinCoords.y)
      setMapPin(pinCoords)
      updateReport({
        temukan: {
          location: {
            lat,
            lng,
            address: 'Lokasi dipilih secara manual di peta',
            source: 'map',
          },
        },
      })
      setGpsStatus('map-selected')
      setGpsMessage('Lokasi titik temuan sampah berhasil disimpan dari peta.')
    },
    [updateReport]
  )

  const canContinue = Boolean(
    photo?.file &&
    typeof location.lat === 'number' &&
    typeof location.lng === 'number'
  )

  const handleContinue = useCallback(() => {
    if (!canContinue) return
    navigate('/lapor/kenali')
  }, [canContinue, navigate])

  return (
    <main
      className="min-h-[100svh] bg-[#F9F8F3] pt-24 sm:pt-28 pb-14 sm:pb-18"
      style={{ backgroundColor: '#F9F8F3' }}
      aria-label="Lapor Sampah — Langkah 1: Temukan"
    >
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <LaporStepHeader
          step={1}
          title="Temukan Sampah di Sekitarmu"
          subtitle="Konfirmasi lokasi dan tambahkan konteks jika diperlukan."
          className="pt-2 pb-2"
        />

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start">
          <PhotoCard
            photo={photo}
            onChangePhoto={() => navigate('/lapor')}
          />

          <div className="flex flex-col gap-4">
            <LocationCard
              location={location}
              gpsStatus={gpsStatus}
              gpsMessage={gpsMessage}
              mapPin={mapPin}
              onGPS={handleGPS}
              onSaveMapLocation={handleSaveMapLocation}
            />
            <DescriptionCard
              value={description.text || ''}
              onChange={handleDescChange}
              maxLength={MAX_DESC}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate('/lapor')}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
            aria-label="Kembali ke halaman foto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary" aria-hidden="true">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
              canContinue
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                : 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
            }`}
            aria-label="Lanjutkan ke Kenali"
            aria-disabled={!canContinue}
          >
            <span>Lanjutkan ke Kenali</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
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

// ---------------------------------------------------------------------------
// Photo Card
// ---------------------------------------------------------------------------

/**
 * PhotoCard — Shows the photo selected on /lapor.
 * Creates its temporary object URL locally with rigorous useState + useEffect lifecycle.
 * Preserves intrinsic aspect ratio for both portrait and landscape images.
 * Includes fallback when image rendering fails.
 */
function PhotoCard({ photo, onChangePhoto }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [failedFile, setFailedFile] = useState(null)
  const hasError = Boolean(photo?.file && failedFile === photo?.file)

  useEffect(() => {
    if (!photo?.file) {
      return
    }

    const url = URL.createObjectURL(photo.file)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [photo?.file])

  const activeUrl = photo?.file ? previewUrl : null

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary" aria-hidden="true">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          <span className="font-bold text-sm text-primary">Foto Temuan</span>
        </div>
        {photo?.file && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            Terekam
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4">
        {activeUrl && !hasError ? (
          <div className="w-full rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center">
            <img
              src={activeUrl}
              alt="Foto temuan sampah"
              onError={() => setFailedFile(photo?.file)}
              className="w-full h-auto block object-contain transition-opacity duration-200"
              style={{ maxHeight: '720px' }}
            />
          </div>
        ) : hasError ? (
          <div className="w-full rounded-xl bg-amber-50/60 border border-amber-200/80 p-6 text-center flex flex-col items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-600" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm font-semibold text-stone-700">Pratinjau foto tidak dapat ditampilkan.</p>
            <p className="text-xs text-stone-400 max-w-xs">Format file mungkin tidak didukung oleh browser Anda.</p>
            <button
              type="button"
              onClick={onChangePhoto}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              Ganti Foto
            </button>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-stone-50 border border-dashed border-stone-200 min-h-[220px] flex flex-col items-center justify-center p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-stone-300 mb-2" aria-hidden="true">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
            <p className="text-sm font-medium text-stone-400">Belum ada foto dipilih</p>
          </div>
        )}

        <div className="mt-3.5 space-y-1">
          <p className="text-xs text-stone-500 leading-relaxed">
            Foto ini akan dijadikan rujukan utama dalam analisis di langkah berikutnya.
          </p>
          {photo?.fileName && (
            <p className="text-[11px] text-stone-400 font-medium truncate">
              {photo.fileName} {photo.fileSize ? `· ${formatFileSize(photo.fileSize)}` : ''}
            </p>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onChangePhoto}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary select-none active:scale-[0.98]"
            aria-label="Ganti foto temuan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
            </svg>
            <span>Ganti Foto</span>
          </button>
          <span className="text-[11px] text-stone-400 font-medium">Foto bukti tersimpan</span>
        </div>
      </div>
    </div>
  )
}

function LocationCard({ location, gpsStatus, gpsMessage, mapPin, onGPS, onSaveMapLocation }) {
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

  // Handle map click in picker mode
  const handleMapClick = (coords) => {
    if (!isPickerMode) return
    setTempPin(coords)
  }

  // Determine status badge in header
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

    // Manual / Map selection
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
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs overflow-hidden">
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
              : 'border-[#E8E5DC]'
          }`}
          aria-label={isPickerMode ? 'Peta interaktif: klik untuk memilih titik lokasi' : 'Pratinjau peta lokasi temuan'}
        >
          <InteractiveMapSVG
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

function AddressSummary({ location }) {
  const parts = location.address ? location.address.split(',').map((p) => p.trim()) : []
  const primary = parts.slice(0, 2).join(', ') || location.address
  const secondary = parts.slice(2, 4).join(', ')

  return (
    <div className="rounded-xl border border-[#E8E5DC] bg-stone-50/70 p-3">
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
 * InteractiveMapSVG
 * Renders the clean local SVG map.
 * When isPickerMode is true, clicking anywhere calculates viewBox coordinates and calls onMapClick({x, y}).
 */
function InteractiveMapSVG({ isPickerMode, pin, hasPin, onMapClick }) {
  const svgRef = useRef(null)

  const handleClick = (e) => {
    if (!isPickerMode || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX)
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY)
    if (clientX === undefined || clientY === undefined) return

    const rawX = ((clientX - rect.left) / rect.width) * 560
    const rawY = ((clientY - rect.top) / rect.height) * 220
    const clampedX = Math.max(16, Math.min(544, Math.round(rawX)))
    const clampedY = Math.max(20, Math.min(200, Math.round(rawY)))

    onMapClick({ x: clampedX, y: clampedY })
  }

  const pinX = pin?.x ?? DEFAULT_MAP_PIN.x
  const pinY = pin?.y ?? DEFAULT_MAP_PIN.y

  return (
    <div className="relative select-none" onClick={handleClick}>
      <svg
        ref={svgRef}
        viewBox="0 0 560 220"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        aria-hidden="true"
      >
        <rect width="560" height="220" fill="#EDE9DF" />
        <rect x="0" y="0" width="560" height="220" fill="#E8E3D8" />

        {/* Major roads */}
        <rect x="0" y="58" width="560" height="14" fill="#FAFAF7" opacity="0.95" />
        <rect x="0" y="108" width="560" height="18" fill="#FAFAF7" opacity="0.95" />
        <rect x="0" y="168" width="560" height="12" fill="#FAFAF7" opacity="0.95" />
        <rect x="105" y="0" width="14" height="220" fill="#FAFAF7" opacity="0.95" />
        <rect x="268" y="0" width="18" height="220" fill="#FAFAF7" opacity="0.95" />
        <rect x="430" y="0" width="12" height="220" fill="#FAFAF7" opacity="0.95" />

        {/* Blocks & terrain */}
        <rect x="119" y="72" width="135" height="28" fill="#DDD9CE" rx="1" />
        <rect x="119" y="126" width="135" height="32" fill="#C8D4C0" rx="1" opacity="0.75" />
        <rect x="286" y="72" width="129" height="28" fill="#DDD9CE" rx="1" />
        <rect x="286" y="126" width="129" height="32" fill="#DDD9CE" rx="1" />
        <rect x="0" y="72" width="90" height="28" fill="#DDD9CE" rx="0" />
        <rect x="442" y="72" width="118" height="28" fill="#DDD9CE" rx="0" />
        <rect x="442" y="126" width="118" height="32" fill="#DDD9CE" rx="0" />

        {/* Lane markings */}
        <rect x="0" y="116" width="256" height="1.5" fill="#D4D0C8" opacity="0.7" />
        <rect x="286" y="116" width="274" height="1.5" fill="#D4D0C8" opacity="0.7" />

        {/* Water canal / river accent */}
        <path
          d="M0 25 Q 120 40, 240 20 T 480 35 T 560 22"
          fill="none"
          stroke="#BFD6D2"
          strokeWidth="6"
          opacity="0.6"
        />

        {/* Active Pin when location or picker is active */}
        {hasPin && (
          <g className="transition-all duration-150">
            <circle
              cx={pinX}
              cy={pinY}
              r={isPickerMode ? 26 : 20}
              fill="#22603B"
              opacity={isPickerMode ? 0.16 : 0.08}
            />
            <circle
              cx={pinX}
              cy={pinY}
              r={isPickerMode ? 16 : 12}
              fill="#22603B"
              opacity={isPickerMode ? 0.25 : 0.15}
            />

            <ellipse
              cx={pinX}
              cy={pinY + 14}
              rx={7}
              ry={3}
              fill="#112217"
              opacity="0.25"
            />

            <path
              d={`M${pinX} ${pinY - 24} C${pinX - 10} ${pinY - 24} ${pinX - 16} ${pinY - 16} ${pinX - 16} ${pinY - 7} C${pinX - 16} ${pinY + 5} ${pinX} ${pinY + 14} ${pinX} ${pinY + 14} C${pinX} ${pinY + 14} ${pinX + 16} ${pinY + 5} ${pinX + 16} ${pinY - 7} C${pinX + 16} ${pinY - 16} ${pinX + 10} ${pinY - 24} ${pinX} ${pinY - 24} Z`}
              fill="#22603B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <circle cx={pinX} cy={pinY - 8} r="5" fill="white" />
            <circle cx={pinX} cy={pinY - 8} r="2.5" fill="#22603B" />

            <g transform={`translate(${pinX - 40}, ${pinY + 18})`}>
              <rect
                width="80"
                height="18"
                rx="9"
                fill="#22603B"
                opacity="0.95"
              />
              <text
                x="40"
                y="12"
                textAnchor="middle"
                fill="white"
                fontSize="8.5"
                fontFamily="system-ui, sans-serif"
                fontWeight="700"
              >
                {isPickerMode ? 'Titik Dipilih' : 'Titik Sampah'}
              </text>
            </g>
          </g>
        )}

        {/* Passive placeholder marker when no location chosen yet */}
        {!hasPin && (
          <g opacity="0.4">
            <circle cx={DEFAULT_MAP_PIN.x} cy={DEFAULT_MAP_PIN.y} r="12" fill="#888" />
            <circle cx={DEFAULT_MAP_PIN.x} cy={DEFAULT_MAP_PIN.y} r="4" fill="white" />
          </g>
        )}

        {/* Zoom controls (decorative) */}
        <rect x="524" y="174" width="24" height="34" rx="6" fill="white" stroke="#D4CFC8" strokeWidth="1" />
        <line x1="536" y1="182" x2="536" y2="190" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="532" y1="186" x2="540" y2="186" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="532" y1="199" x2="540" y2="199" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />

        {/* Scale indicator */}
        <rect x="14" y="198" width="50" height="1.5" fill="#888" opacity="0.6" />
        <rect x="14" y="195" width="1.5" height="8" fill="#888" opacity="0.6" />
        <rect x="62" y="195" width="1.5" height="8" fill="#888" opacity="0.6" />
        <text x="16" y="212" fill="#777" fontSize="7.5" fontFamily="system-ui, sans-serif">200 m</text>
      </svg>

      {isPickerMode && (
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary text-white shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Klik peta untuk pindahkan pin
          </span>
        </div>
      )}
    </div>
  )
}

function DescriptionCard({ value, onChange, maxLength }) {
  const textareaRef = useRef(null)
  const remaining = maxLength - value.length

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary" aria-hidden="true">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
          </svg>
          <span className="font-bold text-sm text-primary">Deskripsi Tambahan</span>
        </div>
        <span className="text-[11px] font-medium text-stone-400">
          Opsional
        </span>
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2.5">
        <p className="text-xs text-stone-500 leading-relaxed">
          Berikan catatan ringkas yang relevan dengan kondisi fisik lapangan jika diperlukan.
        </p>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={4}
          placeholder="Contoh: Sampah kemasan menumpuk di dekat bibir selokan, berpotensi menyumbat aliran air saat hujan."
          className="w-full resize-none rounded-xl border border-[#E0DBCF] bg-stone-50/60 px-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors leading-relaxed"
          aria-label="Deskripsi tambahan temuan sampah"
        />

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            Hanya untuk keterangan tempat / situasi khusus
          </p>
          <span className={`text-[11px] font-semibold tabular-nums ${remaining < 30 ? 'text-amber-600' : 'text-stone-400'}`}>
            {value.length} / {maxLength}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LaporTemukanPage

