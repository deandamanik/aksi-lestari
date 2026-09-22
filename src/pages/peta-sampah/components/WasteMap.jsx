import { useEffect, useRef, useState } from 'react'
import { Map, Marker, setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import {
  WASTE_REPORTS,
  wasteReportsToGeoJSON,
} from '../../../data/peta-sampah/wasteReportsData'

setWorkerUrl(workerUrl)

/**
 * WasteMap Component (Step 1–3 Foundation + Step 4 Heatmap)
 *
 * Renders MapLibre GL with MapTiler Dataviz basemap, custom soft editorial styling,
 * waste-report markers, and a native MapLibre heatmap density layer.
 */
function WasteMap() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [runtimeError, setRuntimeError] = useState(null)

  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY

  useEffect(() => {
    if (!mapContainerRef.current || !maptilerKey) return

    let isMounted = true

    // Clean up previous instance if any
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
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

      // =========================================================================
      // STEP 4: NATIVE MAPLIBRE HEATMAP LAYER
      // =========================================================================
      const geojsonData = wasteReportsToGeoJSON(WASTE_REPORTS)

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
              // Smooth intensity scaling tuned for 25-point dataset
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
              // Transparent -> soft sage green -> primary forest green -> warm amber -> terracotta -> deep warm focal tone
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

      // =========================================================================
      // STEP 3: WASTE REPORT MARKERS
      // =========================================================================
      // Clean up any existing markers before rendering
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      WASTE_REPORTS.forEach((report) => {
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

        markerEl.innerHTML = `
          <div style="
            width: 26px;
            height: 26px;
            background-color: ${bgColor};
            border: 2.5px solid #FFFFFF;
            border-radius: 9999px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
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

        // Add subtle hover effect via DOM styling
        const innerBadge = markerEl.firstElementChild
        markerEl.addEventListener('mouseenter', () => {
          if (innerBadge) {
            innerBadge.style.transform = 'scale(1.2)'
            innerBadge.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
          }
        })
        markerEl.addEventListener('mouseleave', () => {
          if (innerBadge) {
            innerBadge.style.transform = 'scale(1)'
            innerBadge.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.22)'
          }
        })

        const marker = new Marker({
          element: markerEl,
          anchor: 'center',
        })
          .setLngLat([report.longitude, report.latitude])
          .addTo(map)

        markersRef.current.push(marker)
      })
    })

    return () => {
      isMounted = false
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
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
          <h3 className="font-display font-bold text-primary text-lg mb-2">
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
