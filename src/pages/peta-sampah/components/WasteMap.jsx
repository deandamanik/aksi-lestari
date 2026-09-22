import { useEffect, useRef, useState, useCallback } from 'react'
import { Map, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { WASTE_REPORTS } from '../../../data/peta-sampah/wasteReportsData'
import { BANK_SAMPAH } from '../../../data/peta-sampah/bankSampahData'
import { RotateCcwIcon } from '../../../components/common/Icons'
import {
  INDONESIA_BOUNDS,
  INDONESIA_CENTER,
  INDONESIA_INITIAL_ZOOM,
  INDONESIA_MIN_ZOOM,
  INDONESIA_MAX_ZOOM,
  INDONESIA_INITIAL_PADDING,
  INDONESIA_MAX_BOUNDS,
  resetToInitialView,
} from './mapConstants'
import {
  renderWasteMarkers,
  renderBankMarkers,
  clearMarkers,
  updateMarkerSelectionStyles,
} from './mapMarkers'
import {
  runProgrammaticMapMove,
  getSearchCameraTarget,
  applySearchCameraTarget,
  focusMarker,
  focusGeolocation,
  setupMapRecovery,
} from './mapCamera'
import {
  addWasteHeatmapLayer,
  updateHeatmapData,
  setHeatmapVisibility,
} from './mapLayers'

setWorkerUrl(workerUrl)

/**
 * WasteMap Component
 *
 * High-level orchestration for MapLibre GL map, composed of modular
 * heatmap layers, waste report markers, Bank Sampah markers, and camera navigation.
 */
function WasteMap({
  wasteReports = WASTE_REPORTS,
  bankSampah = BANK_SAMPAH,
  searchQuery = '',
  heatmapVisible = true,
  reportsVisible = true,
  bankSampahVisible = true,
  flyToCoords = null,
  onFlyToComplete = null,
  selectedPoint = null,
  onSelectPoint = null,
}) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const mapLoadedRef = useRef(false)
  const [isMapReady, setIsMapReady] = useState(false)
  const [runtimeError, setRuntimeError] = useState(null)

  const wasteMarkersRef = useRef([])
  const wasteMarkersDataRef = useRef([])
  const bankMarkersRef = useRef([])
  const bankMarkersDataRef = useRef([])

  const selectedPointRef = useRef(selectedPoint)
  const prevSearchRef = useRef('')
  const isProgrammaticMoveRef = useRef(false)
  const isRecoveringRef = useRef(false)

  // Track latest props for map initialization callback without triggering effect re-runs
  const latestPropsRef = useRef({
    wasteReports,
    bankSampah,
    heatmapVisible,
    reportsVisible,
    bankSampahVisible,
  })

  useEffect(() => {
    latestPropsRef.current = {
      wasteReports,
      bankSampah,
      heatmapVisible,
      reportsVisible,
      bankSampahVisible,
    }
  })

  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY

  // Manual reset to canonical national Indonesia view
  const handleManualReset = useCallback(() => {
    if (!mapRef.current) return
    runProgrammaticMapMove(
      mapRef.current,
      () => resetToInitialView(mapRef.current, { duration: 700 }),
      isProgrammaticMoveRef
    )
  }, [])

  // Initialize MapLibre instance once on mount
  useEffect(() => {
    if (!mapContainerRef.current || !maptilerKey) return

    let isMounted = true
    let cleanupRecovery = null

    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
      mapLoadedRef.current = false
      setIsMapReady(false)
    }

    const map = new Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerKey}`,
      bounds: INDONESIA_BOUNDS,
      fitBoundsOptions: {
        padding: INDONESIA_INITIAL_PADDING,
        maxZoom: 5.5,
      },
      center: INDONESIA_CENTER,
      zoom: INDONESIA_INITIAL_ZOOM,
      minZoom: INDONESIA_MIN_ZOOM,
      maxZoom: INDONESIA_MAX_ZOOM,
      maxBounds: INDONESIA_MAX_BOUNDS,
      renderWorldCopies: false,
      attributionControl: true,
    })

    mapRef.current = map

    // Subtle globe projection via native MapLibre support
    map.once('style.load', () => {
      if (!isMounted) return
      try {
        map.setProjection({ type: 'globe' })
      } catch {
        // Fallback gracefully if globe projection is not supported in current environment
      }
    })

    map.on('error', (e) => {
      if (e.error?.status === 401) {
        setRuntimeError('Autentikasi MapTiler gagal. Periksa kembali validitas VITE_MAPTILER_KEY.')
      }
    })

    map.on('load', () => {
      if (!isMounted) return
      mapLoadedRef.current = true

      const {
        wasteReports: currentReports,
        heatmapVisible: currentHeatmapVisible,
        reportsVisible: currentReportsVisible,
        bankSampah: currentBanks,
        bankSampahVisible: currentBanksVisible,
      } = latestPropsRef.current

      // Ensure national initial camera composition using canonical view
      resetToInitialView(map, { duration: 0 })

      // Setup heatmap layer
      addWasteHeatmapLayer(map, currentReports, currentHeatmapVisible)

      // Setup soft recovery when user navigates far outside Indonesia bounds
      cleanupRecovery = setupMapRecovery(map, isProgrammaticMoveRef, isRecoveringRef)

      // Initial markers render
      if (currentReportsVisible) {
        renderWasteMarkers(
          map,
          currentReports,
          selectedPointRef.current,
          onSelectPoint,
          wasteMarkersRef,
          wasteMarkersDataRef
        )
      }
      if (currentBanksVisible) {
        renderBankMarkers(
          map,
          currentBanks,
          selectedPointRef.current,
          onSelectPoint,
          bankMarkersRef,
          bankMarkersDataRef
        )
      }

      setIsMapReady(true)
    })

    return () => {
      isMounted = false
      cleanupRecovery?.()
      clearMarkers(wasteMarkersRef, wasteMarkersDataRef)
      clearMarkers(bankMarkersRef, bankMarkersDataRef)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        mapLoadedRef.current = false
        setIsMapReady(false)
      }
    }
  }, [maptilerKey, onSelectPoint])

  // Tab visibility recovery: smoothly resize map canvas when returning to active tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && mapRef.current && mapLoadedRef.current) {
        requestAnimationFrame(() => {
          mapRef.current?.resize()
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Reactive toggle: Heatmap layer visibility
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    setHeatmapVisibility(mapRef.current, heatmapVisible)
  }, [isMapReady, heatmapVisible])

  // Reactive update: Heatmap data source
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    updateHeatmapData(mapRef.current, wasteReports)
  }, [isMapReady, wasteReports])

  // Reactive update: Waste report markers (re-renders only when reports list or visibility changes)
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    if (reportsVisible) {
      renderWasteMarkers(
        mapRef.current,
        wasteReports,
        selectedPointRef.current,
        onSelectPoint,
        wasteMarkersRef,
        wasteMarkersDataRef
      )
    } else {
      clearMarkers(wasteMarkersRef, wasteMarkersDataRef)
    }
  }, [isMapReady, wasteReports, reportsVisible, onSelectPoint])

  // Reactive update: Bank Sampah markers (re-renders only when banks list or visibility changes)
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    if (bankSampahVisible) {
      renderBankMarkers(
        mapRef.current,
        bankSampah,
        selectedPointRef.current,
        onSelectPoint,
        bankMarkersRef,
        bankMarkersDataRef
      )
    } else {
      clearMarkers(bankMarkersRef, bankMarkersDataRef)
    }
  }, [isMapReady, bankSampah, bankSampahVisible, onSelectPoint])

  // Reactive selection highlight update in-place without rebuilding DOM markers
  useEffect(() => {
    selectedPointRef.current = selectedPoint
    const selectedId = selectedPoint?.data?.id
    const selectedType = selectedPoint?.type

    updateMarkerSelectionStyles(wasteMarkersDataRef, selectedType, 'report', selectedId)
    updateMarkerSelectionStyles(bankMarkersDataRef, selectedType, 'bank', selectedId)
  }, [selectedPoint])

  // Reactive camera focus: Selected marker
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !selectedPoint?.data) return
    const { latitude, longitude } = selectedPoint.data
    focusMarker(mapRef.current, latitude, longitude, isProgrammaticMoveRef)
  }, [isMapReady, selectedPoint])

  // Reactive camera focus: Search query changes
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return
    const trimmed = (searchQuery || '').trim().toLowerCase()
    const prev = prevSearchRef.current

    if (trimmed === prev) return
    prevSearchRef.current = trimmed

    if (!trimmed) {
      if (prev) {
        runProgrammaticMapMove(
          mapRef.current,
          () => resetToInitialView(mapRef.current, { duration: 700 }),
          isProgrammaticMoveRef
        )
      }
      return
    }

    const target = getSearchCameraTarget(wasteReports, bankSampah)
    applySearchCameraTarget(mapRef.current, target, isProgrammaticMoveRef)
  }, [isMapReady, searchQuery, wasteReports, bankSampah])

  // Reactive camera focus: Geolocation flyTo
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !flyToCoords) return
    focusGeolocation(mapRef.current, flyToCoords, isProgrammaticMoveRef)
    onFlyToComplete?.()
  }, [isMapReady, flyToCoords, onFlyToComplete])

  const errorMessage = !maptilerKey
    ? 'MapTiler API Key tidak ditemukan. Pastikan VITE_MAPTILER_KEY telah dikonfigurasi di .env.local.'
    : runtimeError

  if (errorMessage) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-[#F9F8F3] p-6 text-center">
        <div className="max-w-md p-6 bg-white rounded-2xl border border-border-warm shadow-xs">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 text-accent flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-primary text-base mb-1">
            Konfigurasi Peta Diperlukan
          </h3>
          <p className="font-body text-stone-600 text-sm leading-relaxed mb-4">
            {errorMessage}
          </p>
          <div className="text-xs text-stone-500 bg-[#F9F8F3] p-3 rounded-lg text-left font-mono">
            VITE_MAPTILER_KEY=your_key_here
          </div>
        </div>
      </div>
    )
  }

  const isDetailOpen = Boolean(selectedPoint)

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full absolute inset-0"
      />

      {/* Manual Reset Map View Control ("Reset Peta") */}
      <div
        className={`absolute z-10 bottom-28 md:bottom-7 right-3 sm:right-4 md:right-4 lg:right-8 transition-all duration-200 ${
          isDetailOpen
            ? 'max-md:opacity-0 max-md:pointer-events-none max-md:invisible'
            : 'max-md:opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={handleManualReset}
          className="group inline-flex items-center gap-1.5 h-8 px-2.5 sm:px-3 bg-white/95 hover:bg-white active:bg-stone-100 text-stone-700 hover:text-primary font-body text-xs font-medium rounded-xl border border-border-warm shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all cursor-pointer pointer-events-auto select-none"
          title="Kembalikan tampilan peta ke wilayah Indonesia"
          aria-label="Reset tampilan peta ke Indonesia"
        >
          <RotateCcwIcon className="w-3.5 h-3.5 text-stone-500 group-hover:text-primary transition-transform duration-200 group-hover:-rotate-45" />
          <span>Reset Peta</span>
        </button>
      </div>
    </div>
  )
}

export default WasteMap
