import { useEffect, useRef, useState } from 'react'
import { Map, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { DEFAULT_COORDINATES } from '../../../../utils/mapUtils'
import { AlertCircleIcon } from '../../../../components/common/Icons'

setWorkerUrl(workerUrl)

/**
 * Creates a custom teardrop pin DOM element styled with AksiLestari branding.
 * Bottom tip of the pin aligns precisely with the selected coordinates.
 *
 * @param {boolean} isPickerMode - Whether pin is draggable
 * @returns {HTMLDivElement}
 */
function createReportMarkerElement(isPickerMode) {
  const el = document.createElement('div')
  el.className = 'report-map-marker group'
  el.setAttribute('role', 'img')
  el.setAttribute('aria-label', 'Titik lokasi laporan')
  el.innerHTML = `
    <div style="
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.28));
      transform: translate3d(0, 0, 0);
      cursor: ${isPickerMode ? 'grab' : 'default'};
    ">
      <div style="
        width: 30px;
        height: 30px;
        background: #22603B;
        border: 2.5px solid #FFFFFF;
        border-radius: 9999px 9999px 9999px 2px;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 9px;
          height: 9px;
          background: #FFFFFF;
          border-radius: 9999px;
          transform: rotate(45deg);
        "></div>
      </div>
    </div>
  `
  return el
}

/**
 * ReportMapPicker — Real Interactive Map Component for Lapor Flow
 *
 * Replaces the schematic SVG illustration with a real geographic MapLibre basemap.
 * Reuses the existing MapTiler stack, configuration, and visual language from Peta Sampah.
 *
 * Supports:
 * - Real geographic coordinates (lat, lng)
 * - Pan, zoom, and interactive navigation
 * - Click/tap on map to place or reposition marker
 * - Draggable marker in picker mode
 * - Read-only preview mode when not actively picking
 * - Automatic camera centering on coordinate updates (e.g., GPS trigger)
 *
 * @param {object} props
 * @param {{ lat?: number|null, lng?: number|null, address?: string }} [props.location] - Current report coordinates
 * @param {boolean} [props.isPickerMode=false] - Enables interactive point placement and marker dragging
 * @param {({ lat: number, lng: number }) => void} [props.onLocationSelect] - Callback when coordinates are chosen
 * @param {string} [props.className=''] - Additional container styling
 * @param {number} [props.initialZoom=15] - Initial zoom level when coordinates are present
 */
export default function ReportMapPicker({
  location,
  isPickerMode = false,
  onLocationSelect,
  className = '',
  initialZoom = 15,
}) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const isPickerModeRef = useRef(isPickerMode)
  const onLocationSelectRef = useRef(onLocationSelect)
  const [runtimeError, setRuntimeError] = useState(null)
  const [isMapReady, setIsMapReady] = useState(false)

  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY
  const isKeyMissing = !maptilerKey

  // Snapshot initial coordinates once on mount for basemap camera positioning
  const initialLocationRef = useRef({
    hasCoords: typeof location?.lat === 'number' && typeof location?.lng === 'number',
    center:
      typeof location?.lat === 'number' && typeof location?.lng === 'number'
        ? [location.lng, location.lat]
        : [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat],
    zoom: typeof location?.lat === 'number' ? initialZoom : 14,
  })

  // Keep refs synchronized with props for event listeners
  useEffect(() => {
    isPickerModeRef.current = isPickerMode
    onLocationSelectRef.current = onLocationSelect
  }, [isPickerMode, onLocationSelect])

  // Initialize MapLibre instance once on mount
  useEffect(() => {
    if (!mapContainerRef.current || !maptilerKey) return

    let isMounted = true
    const { hasCoords, center: initialCenter, zoom: startZoom } = initialLocationRef.current

    const map = new Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerKey}`,
      center: initialCenter,
      zoom: startZoom,
      minZoom: 3,
      maxZoom: 19,
      renderWorldCopies: false,
      attributionControl: false,
    })

    mapRef.current = map

    // Compact zoom navigation controls
    map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right')

    // Create marker element
    const markerEl = createReportMarkerElement(isPickerModeRef.current)
    const marker = new Marker({
      element: markerEl,
      anchor: 'bottom',
      draggable: isPickerModeRef.current,
    })
    markerRef.current = marker

    // Marker drag handling
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat()
      const coords = {
        lat: Number(lngLat.lat.toFixed(6)),
        lng: Number(lngLat.lng.toFixed(6)),
      }
      onLocationSelectRef.current?.(coords)
    })

    // Map click handling
    map.on('click', (e) => {
      if (!isPickerModeRef.current) return
      const coords = {
        lat: Number(e.lngLat.lat.toFixed(6)),
        lng: Number(e.lngLat.lng.toFixed(6)),
      }
      marker.setLngLat([coords.lng, coords.lat])
      if (!marker._map) {
        marker.addTo(map)
      }
      onLocationSelectRef.current?.(coords)
    })

    map.on('error', (e) => {
      if (e.error?.status === 401) {
        setRuntimeError('Autentikasi MapTiler gagal. Periksa kembali validitas VITE_MAPTILER_KEY.')
      }
    })

    map.on('load', () => {
      if (!isMounted) return
      setIsMapReady(true)

      // Add marker to map if coordinates exist or if in picker mode
      if (hasCoords || isPickerModeRef.current) {
        marker.setLngLat(initialCenter).addTo(map)
      }

      // Set cursor based on mode
      const canvas = map.getCanvas()
      if (canvas) {
        canvas.style.cursor = isPickerModeRef.current ? 'crosshair' : ''
      }
    })

    // Responsive container resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize()
      }
    })
    resizeObserver.observe(mapContainerRef.current)

    // Window / tab visibility change recovery
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && mapRef.current) {
        requestAnimationFrame(() => {
          mapRef.current?.resize()
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isMounted = false
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      marker.remove()
      map.remove()
      mapRef.current = null
      markerRef.current = null
      setIsMapReady(false)
    }
  }, [maptilerKey]) // Mount once

  // React to isPickerMode prop changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return
    const marker = markerRef.current
    const map = mapRef.current

    marker.setDraggable(isPickerMode)

    const canvas = map.getCanvas()
    if (canvas) {
      canvas.style.cursor = isPickerMode ? 'crosshair' : ''
    }

    // If entering picker mode and no marker is on map, add it at center
    if (isPickerMode && !marker._map) {
      const center = map.getCenter()
      marker.setLngLat(center).addTo(map)
      onLocationSelectRef.current?.({
        lat: Number(center.lat.toFixed(6)),
        lng: Number(center.lng.toFixed(6)),
      })
    }
  }, [isPickerMode])

  // React to external location updates (e.g., GPS trigger or saved draft)
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !markerRef.current) return
    if (typeof location?.lat !== 'number' || typeof location?.lng !== 'number') return

    const marker = markerRef.current
    const map = mapRef.current
    const currentMarkerLngLat = marker.getLngLat()

    const hasMoved =
      !currentMarkerLngLat ||
      Math.abs(currentMarkerLngLat.lat - location.lat) > 0.00001 ||
      Math.abs(currentMarkerLngLat.lng - location.lng) > 0.00001

    if (hasMoved) {
      marker.setLngLat([location.lng, location.lat])
      if (!marker._map) {
        marker.addTo(map)
      }
      map.easeTo({
        center: [location.lng, location.lat],
        duration: 500,
        essential: true,
      })
    }
  }, [isMapReady, location?.lat, location?.lng])

  return (
    <div
      className={`relative w-full h-[220px] sm:h-[250px] rounded-xl overflow-hidden border transition-all duration-200 select-none ${
        isPickerMode
          ? 'border-primary ring-2 ring-primary/20 shadow-sm cursor-crosshair'
          : 'border-border-warm'
      } ${className}`.trim()}
      aria-label={
        isPickerMode
          ? 'Peta interaktif: klik atau geser pin untuk memilih lokasi temuan sampah'
          : 'Pratinjau peta titik lokasi temuan sampah'
      }
    >
      {/* MapLibre WebGL container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Picker mode visual badge */}
      {isPickerMode && (
        <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary text-white shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Klik peta atau geser pin
          </span>
        </div>
      )}

      {/* Error overlay banner */}
      {(isKeyMissing || runtimeError) && (
        <div className="absolute inset-0 bg-stone-100/95 flex flex-col items-center justify-center p-4 text-center z-20">
          <AlertCircleIcon className="w-6 h-6 text-amber-600 mb-1.5" strokeWidth={2} />
          <p className="text-xs font-semibold text-stone-700">
            {isKeyMissing
              ? 'VITE_MAPTILER_KEY tidak ditemukan. Peta tidak dapat dimuat.'
              : runtimeError}
          </p>
        </div>
      )}
    </div>
  )
}
