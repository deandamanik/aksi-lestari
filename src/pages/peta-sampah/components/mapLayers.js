import { wasteReportsToGeoJSON } from '../../../data/peta-sampah/wasteReportsData'

export const HEATMAP_SOURCE_ID = 'waste-reports-source'
export const HEATMAP_LAYER_ID = 'waste-reports-heatmap'

/**
 * Finds the first symbol layer ID so that data layers sit below road and place labels.
 */
export function findFirstSymbolLayerId(map) {
  if (!map) return undefined
  const layers = map.getStyle()?.layers
  if (!layers) return undefined

  for (const layer of layers) {
    if (layer.type === 'symbol') {
      return layer.id
    }
  }
  return undefined
}

/**
 * Adds the native MapLibre heatmap layer with tuned environmental color stops.
 */
export function addWasteHeatmapLayer(map, initialReports = [], isVisible = true) {
  if (!map) return

  const geojsonData = wasteReportsToGeoJSON(initialReports)

  if (!map.getSource(HEATMAP_SOURCE_ID)) {
    map.addSource(HEATMAP_SOURCE_ID, {
      type: 'geojson',
      data: geojsonData,
    })
  }

  const firstSymbolId = findFirstSymbolLayerId(map)

  if (!map.getLayer(HEATMAP_LAYER_ID)) {
    map.addLayer(
      {
        id: HEATMAP_LAYER_ID,
        type: 'heatmap',
        source: HEATMAP_SOURCE_ID,
        maxzoom: 17,
        layout: {
          visibility: isVisible ? 'visible' : 'none',
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
          // Smooth intensity scaling tuned for Indonesia archipelago
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 0.9,
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
            4, 16,
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
            4, 0.75,
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
}

/**
 * Updates the GeoJSON data source for the heatmap layer.
 */
export function updateHeatmapData(map, wasteReports = []) {
  if (!map) return
  const source = map.getSource(HEATMAP_SOURCE_ID)
  if (source) {
    source.setData(wasteReportsToGeoJSON(wasteReports))
  }
}

/**
 * Reactively toggles the visibility of the heatmap layer.
 */
export function setHeatmapVisibility(map, isVisible) {
  if (!map) return
  if (map.getLayer(HEATMAP_LAYER_ID)) {
    map.setLayoutProperty(
      HEATMAP_LAYER_ID,
      'visibility',
      isVisible ? 'visible' : 'none'
    )
  }
}
