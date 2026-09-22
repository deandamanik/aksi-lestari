import { useEffect, useRef, useState, useCallback } from 'react'
import { Map, Marker, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  WASTE_REPORTS,
  wasteReportsToGeoJSON,
} from '../../../data/peta-sampah/wasteReportsData'
import { BANK_SAMPAH } from '../../../data/peta-sampah/bankSampahData'

setWorkerUrl(workerUrl)

/**
 * Creates a distinct circular DOM marker for waste reports (with severity color coding and subtle selection).
 */
function createWasteMarkerElement(report, isSelected, onClick) {
  const markerEl = document.createElement('div')
  markerEl.className = 'group relative cursor-pointer'
  markerEl.setAttribute('role', 'button')
  markerEl.setAttribute(
    'aria-label',
    `${report.title} (${report.category}, Tingkat: ${report.severity})`
  )
  markerEl.setAttribute(
    'title',
    `${report.title}\n${report.category} · Tingkat: ${report.severity}\n${report.address}`
  )

  // Marker color matching AksiLestari design system
  const bgColor =
    report.severity === 'tinggi'
      ? '#FFA938' // Accent warm amber
      : report.severity === 'sedang'
        ? '#7AAB2B' // Secondary green
        : '#22603B' // Primary forest green

  const initialShadow = isSelected
    ? `0 0 0 2.5px ${bgColor}, 0 3px 12px rgba(0, 0, 0, 0.35)`
    : '0 2px 8px rgba(0, 0, 0, 0.22)'
  const initialTransform = isSelected ? 'scale(1.15)' : 'scale(1)'

  markerEl.innerHTML = `
    <div style="
      width: 26px;
      height: 26px;
      background-color: ${bgColor};
      border: 2.5px solid #FFFFFF;
      border-radius: 9999px;
      box-shadow: ${initialShadow};
      transform: ${initialTransform};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.18s ease-out, box-shadow 0.18s ease-out;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: #FFFFFF;
        border-radius: 9999px;
      "></div>
    </div>
  `

  const innerBadge = markerEl.firstElementChild
  if (innerBadge) {
    innerBadge.dataset.selected = isSelected ? 'true' : 'false'
  }

  markerEl.addEventListener('mouseenter', () => {
    if (innerBadge) {
      innerBadge.style.transform = 'scale(1.22)'
      innerBadge.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.35)'
    }
  })
  markerEl.addEventListener('mouseleave', () => {
    if (innerBadge) {
      const selected = innerBadge.dataset.selected === 'true'
      innerBadge.style.transform = selected ? 'scale(1.15)' : 'scale(1)'
      innerBadge.style.boxShadow = selected
        ? `0 0 0 2.5px ${bgColor}, 0 3px 12px rgba(0, 0, 0, 0.35)`
        : '0 2px 8px rgba(0, 0, 0, 0.22)'
    }
  })

  markerEl.addEventListener('click', (e) => {
    e.stopPropagation()
    onClick?.(report)
  })

  return { markerEl, innerBadge, bgColor }
}

/**
 * Creates a dedicated blue location marker for Bank Sampah points (with subtle selection).
 */
function createBankMarkerElement(bank, isSelected, onClick) {
  const markerEl = document.createElement('div')
  markerEl.className = 'group relative cursor-pointer'
  markerEl.setAttribute('role', 'button')
  markerEl.setAttribute(
    'aria-label',
    `${bank.name} (${bank.district})`
  )
  markerEl.setAttribute(
    'title',
    `${bank.name}\n${bank.address}\nJam: ${bank.operatingHours}\nTerima: ${bank.acceptedMaterials.join(', ')}`
  )

  const initialShadow = isSelected
    ? '0 0 0 2.5px #1D70B8, 0 3px 12px rgba(29, 112, 184, 0.45)'
    : '0 2px 8px rgba(0, 0, 0, 0.25)'
  const initialTransform = isSelected ? 'scale(1.15)' : 'scale(1)'

  markerEl.innerHTML = `
    <div style="
      width: 26px;
      height: 26px;
      background-color: #1D70B8;
      border: 2.5px solid #FFFFFF;
      border-radius: 9999px;
      box-shadow: ${initialShadow};
      transform: ${initialTransform};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.18s ease-out, box-shadow 0.18s ease-out;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background-color: #FFFFFF;
        border-radius: 1.5px;
        transform: rotate(45deg);
      "></div>
    </div>
  `

  const innerBadge = markerEl.firstElementChild
  if (innerBadge) {
    innerBadge.dataset.selected = isSelected ? 'true' : 'false'
  }

  markerEl.addEventListener('mouseenter', () => {
    if (innerBadge) {
      innerBadge.style.transform = 'scale(1.22)'
      innerBadge.style.boxShadow = '0 4px 14px rgba(29, 112, 184, 0.45)'
    }
  })
  markerEl.addEventListener('mouseleave', () => {
    if (innerBadge) {
      const selected = innerBadge.dataset.selected === 'true'
      innerBadge.style.transform = selected ? 'scale(1.15)' : 'scale(1)'
      innerBadge.style.boxShadow = selected
        ? '0 0 0 2.5px #1D70B8, 0 3px 12px rgba(29, 112, 184, 0.45)'
        : '0 2px 8px rgba(0, 0, 0, 0.25)'
    }
  })

  markerEl.addEventListener('click', (e) => {
    e.stopPropagation()
    onClick?.(bank)
  })

  return { markerEl, innerBadge }
}

/**
 * WasteMap Component (Step 1–4 Foundation + Step 5 Map Layers + Step 6 Marker Selection)
 *
 * Renders MapLibre GL with MapTiler Dataviz basemap, custom soft editorial styling,
 * waste-report markers, Bank Sampah markers, native MapLibre heatmap density layer,
 * and marker click handling for the detail overlay panel.
 */
function WasteMap({
  wasteReports = WASTE_REPORTS,
  bankSampah = BANK_SAMPAH,
  heatmapVisible = true,
  reportsVisible = true,
  bankSampahVisible = true,
  flyToCoords = null,
  selectedPoint = null,
  onSelectPoint = null,
}) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const wasteMarkersRef = useRef([])
  const wasteMarkersDataRef = useRef([])
  const bankMarkersRef = useRef([])
  const bankMarkersDataRef = useRef([])
  const mapLoadedRef = useRef(false)
  const [runtimeError, setRuntimeError] = useState(null)

  const stateRef = useRef({
    wasteReports,
    bankSampah,
    heatmapVisible,
    reportsVisible,
    bankSampahVisible,
    selectedPoint,
  })

  const updateWasteMarkers = useCallback((targetMap, reportsList) => {
    wasteMarkersRef.current.forEach((marker) => marker.remove())
    wasteMarkersRef.current = []
    wasteMarkersDataRef.current = []

    const selectedId = stateRef.current.selectedPoint?.data?.id
    const selectedType = stateRef.current.selectedPoint?.type

    reportsList.forEach((report) => {
      const isSelected = selectedType === 'report' && report.id === selectedId
      const { markerEl, innerBadge, bgColor } = createWasteMarkerElement(
        report,
        isSelected,
        (rep) => {
          onSelectPoint?.({ type: 'report', data: rep })
        }
      )

      const marker = new Marker({
        element: markerEl,
        anchor: 'center',
      })
        .setLngLat([report.longitude, report.latitude])
        .addTo(targetMap)

      wasteMarkersRef.current.push(marker)
      wasteMarkersDataRef.current.push({ id: report.id, innerBadge, bgColor })
    })
  }, [onSelectPoint])

  const clearWasteMarkers = () => {
    wasteMarkersRef.current.forEach((marker) => marker.remove())
    wasteMarkersRef.current = []
    wasteMarkersDataRef.current = []
  }

  const updateBankMarkers = useCallback((targetMap, banksList) => {
    bankMarkersRef.current.forEach((marker) => marker.remove())
    bankMarkersRef.current = []
    bankMarkersDataRef.current = []

    const selectedId = stateRef.current.selectedPoint?.data?.id
    const selectedType = stateRef.current.selectedPoint?.type

    banksList.forEach((bank) => {
      const isSelected = selectedType === 'bank' && bank.id === selectedId
      const { markerEl, innerBadge } = createBankMarkerElement(
        bank,
        isSelected,
        (b) => {
          onSelectPoint?.({ type: 'bank', data: b })
        }
      )

      const marker = new Marker({
        element: markerEl,
        anchor: 'center',
      })
        .setLngLat([bank.longitude, bank.latitude])
        .addTo(targetMap)

      bankMarkersRef.current.push(marker)
      bankMarkersDataRef.current.push({ id: bank.id, innerBadge })
    })
  }, [onSelectPoint])

  const clearBankMarkers = () => {
    bankMarkersRef.current.forEach((marker) => marker.remove())
    bankMarkersRef.current = []
    bankMarkersDataRef.current = []
  }

  // Synchronize stateRef for map load callback
  useEffect(() => {
    stateRef.current = {
      wasteReports,
      bankSampah,
      heatmapVisible,
      reportsVisible,
      bankSampahVisible,
      selectedPoint,
      updateWasteMarkers,
      updateBankMarkers,
    }
  }, [
    wasteReports,
    bankSampah,
    heatmapVisible,
    reportsVisible,
    bankSampahVisible,
    selectedPoint,
    updateWasteMarkers,
    updateBankMarkers,
  ])

  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY

  // Reactive selection update when selectedPoint changes
  useEffect(() => {
    const selectedId = selectedPoint?.data?.id
    const selectedType = selectedPoint?.type

    wasteMarkersDataRef.current.forEach(({ id, innerBadge, bgColor }) => {
      const isSelected = selectedType === 'report' && id === selectedId
      if (innerBadge) {
        innerBadge.dataset.selected = isSelected ? 'true' : 'false'
        innerBadge.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)'
        innerBadge.style.boxShadow = isSelected
          ? `0 0 0 2.5px ${bgColor}, 0 3px 12px rgba(0, 0, 0, 0.35)`
          : '0 2px 8px rgba(0, 0, 0, 0.22)'
      }
    })

    bankMarkersDataRef.current.forEach(({ id, innerBadge }) => {
      const isSelected = selectedType === 'bank' && id === selectedId
      if (innerBadge) {
        innerBadge.dataset.selected = isSelected ? 'true' : 'false'
        innerBadge.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)'
        innerBadge.style.boxShadow = isSelected
          ? '0 0 0 2.5px #1D70B8, 0 3px 12px rgba(29, 112, 184, 0.45)'
          : '0 2px 8px rgba(0, 0, 0, 0.25)'
      }
    })
  }, [selectedPoint])

  // Reactive toggle: Heatmap layer visibility
  useEffect(() => {
    if (!mapLoadedRef.current || !mapRef.current) return
    if (mapRef.current.getLayer('waste-reports-heatmap')) {
      mapRef.current.setLayoutProperty(
        'waste-reports-heatmap',
        'visibility',
        heatmapVisible ? 'visible' : 'none'
      )
    }
  }, [heatmapVisible])

  // Reactive update: Heatmap data source
  useEffect(() => {
    if (!mapLoadedRef.current || !mapRef.current) return
    const source = mapRef.current.getSource('waste-reports-source')
    if (source) {
      source.setData(wasteReportsToGeoJSON(wasteReports))
    }
  }, [wasteReports])

  // Reactive update: Waste report markers
  useEffect(() => {
    if (!mapLoadedRef.current || !mapRef.current) return
    if (reportsVisible) {
      updateWasteMarkers(mapRef.current, wasteReports)
    } else {
      clearWasteMarkers()
    }
  }, [wasteReports, reportsVisible, updateWasteMarkers])

  // Reactive update: Bank Sampah markers
  useEffect(() => {
    if (!mapLoadedRef.current || !mapRef.current) return
    if (bankSampahVisible) {
      updateBankMarkers(mapRef.current, bankSampah)
    } else {
      clearBankMarkers()
    }
  }, [bankSampah, bankSampahVisible, updateBankMarkers])

  // Reactive update: Geolocation flyTo
  useEffect(() => {
    if (!mapRef.current || !flyToCoords) return
    mapRef.current.flyTo({
      center: flyToCoords,
      zoom: 14,
      essential: true,
    })
  }, [flyToCoords])

  useEffect(() => {
    if (!mapContainerRef.current || !maptilerKey) return

    let isMounted = true

    // Clean up previous instance if any
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
      mapLoadedRef.current = false
    }

    // Initialize MapLibre GL Map with MapTiler Dataviz (soft, subdued basemap)
    const map = new Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/dataviz/style.json?key=${maptilerKey}`,
      center: [106.8272, -6.1754], // Jabodetabek / Jakarta center [lng, lat]
      zoom: 11,
      minZoom: 8,
      maxZoom: 18,
      attributionControl: true,
    })

    mapRef.current = map

    // Handle map errors gracefully
    map.on('error', (e) => {
      // Ignore abort/cancel events during normal unmount or tile cancels
      if (e.error?.status === 401) {
        setRuntimeError('Autentikasi MapTiler gagal. Periksa kembali validitas VITE_MAPTILER_KEY.')
      }
    })

    map.on('load', () => {
      if (!isMounted) return
      mapLoadedRef.current = true

      const {
        wasteReports: initialWasteReports,
        bankSampah: initialBankSampah,
        heatmapVisible: initialHeatmapVisible,
        reportsVisible: initialReportsVisible,
        bankSampahVisible: initialBankVisible,
      } = stateRef.current

      // =========================================================================
      // STEP 4: NATIVE MAPLIBRE HEATMAP LAYER
      // =========================================================================
      const geojsonData = wasteReportsToGeoJSON(initialWasteReports)

      // Add single deterministic GeoJSON source
      if (!map.getSource('waste-reports-source')) {
        map.addSource('waste-reports-source', {
          type: 'geojson',
          data: geojsonData,
        })
      }

      // Find the first symbol layer so heatmap sits below road and place labels
      const layers = map.getStyle().layers
      let firstSymbolId = undefined
      if (layers) {
        for (const layer of layers) {
          if (layer.type === 'symbol') {
            firstSymbolId = layer.id
            break
          }
        }
      }

      // Add native MapLibre heatmap layer with soft editorial environmental palette
      if (!map.getLayer('waste-reports-heatmap')) {
        map.addLayer(
          {
            id: 'waste-reports-heatmap',
            type: 'heatmap',
            source: 'waste-reports-source',
            maxzoom: 17,
            layout: {
              visibility: initialHeatmapVisible ? 'visible' : 'none',
            },
            paint: {
              // Increase weight based on report severity (rendah: 0.5, sedang: 1.0, tinggi: 1.5)
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'weight'],
                0.5, 0.5,
                1.0, 1.0,
                1.5, 1.5,
              ],
              // Smooth intensity scaling tuned for Jabodetabek dataset
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                9, 1.0,
                11, 1.8,
                13, 2.6,
                15, 3.2,
              ],
              // Tuned AksiLestari environmental palette with balanced alpha
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(122, 171, 43, 0)',
                0.12, 'rgba(122, 171, 43, 0.40)',
                0.35, 'rgba(34, 96, 59, 0.58)',
                0.60, 'rgba(255, 169, 56, 0.72)',
                0.80, 'rgba(225, 115, 35, 0.80)',
                1.0, 'rgba(195, 70, 20, 0.85)',
              ],
              // Heatmap radius expanding beyond the 26px DOM markers
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                9, 24,
                11, 36,
                13, 50,
                15, 65,
              ],
              // Sustained opacity through mid zoom levels, gently softening at high zoom
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                9, 0.80,
                11, 0.80,
                13, 0.75,
                15, 0.65,
                16, 0.45,
              ],
            },
          },
          firstSymbolId
        )
      }

      // Initial marker renders based on layer visibility
      if (initialReportsVisible) {
        stateRef.current.updateWasteMarkers(map, initialWasteReports)
      }
      if (initialBankVisible) {
        stateRef.current.updateBankMarkers(map, initialBankSampah)
      }
    })

    return () => {
      isMounted = false
      clearWasteMarkers()
      clearBankMarkers()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        mapLoadedRef.current = false
      }
    }
  }, [maptilerKey])

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

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full absolute inset-0"
      />
    </div>
  )
}

export default WasteMap
