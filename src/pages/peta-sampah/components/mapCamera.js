import {
  isOutsideRecoveryBounds,
  resetToInitialView,
} from './mapConstants'

/**
 * Safely executes a programmatic camera movement while guarding against
 * soft-recovery event loops during map 'moveend'.
 */
export function runProgrammaticMapMove(map, moveFn, isProgrammaticMoveRef) {
  if (!map) return
  if (isProgrammaticMoveRef) {
    isProgrammaticMoveRef.current = true
  }

  moveFn()

  map.once('moveend', () => {
    setTimeout(() => {
      if (isProgrammaticMoveRef) {
        isProgrammaticMoveRef.current = false
      }
    }, 100)
  })
}

/**
 * Pure calculation returning camera positioning target for search results.
 */
export function getSearchCameraTarget(wasteReports = [], bankSampah = []) {
  const points = []

  wasteReports.forEach((r) => {
    if (typeof r.longitude === 'number' && typeof r.latitude === 'number') {
      points.push([r.longitude, r.latitude])
    }
  })

  bankSampah.forEach((b) => {
    if (typeof b.longitude === 'number' && typeof b.latitude === 'number') {
      points.push([b.longitude, b.latitude])
    }
  })

  if (points.length === 0) return null

  if (points.length === 1) {
    return {
      type: 'single',
      center: points[0],
      zoom: 12,
    }
  }

  const lons = points.map((p) => p[0])
  const lats = points.map((p) => p[1])
  const minLng = Math.min(...lons)
  const maxLng = Math.max(...lons)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)

  // Avoid collapsed zero-size bounding box for points at virtually identical coordinates
  if (maxLng - minLng < 0.001 && maxLat - minLat < 0.001) {
    return {
      type: 'closeCluster',
      center: [minLng, minLat],
      zoom: 12,
    }
  }

  return {
    type: 'bounds',
    bounds: [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    padding: { top: 80, bottom: 80, left: 80, right: 80 },
    maxZoom: 13,
  }
}

/**
 * Applies search camera target smoothly with programmatic guard protection.
 */
export function applySearchCameraTarget(map, target, isProgrammaticMoveRef) {
  if (!map || !target) return

  runProgrammaticMapMove(
    map,
    () => {
      if (target.type === 'single' || target.type === 'closeCluster') {
        map.easeTo({
          center: target.center,
          zoom: target.zoom,
          duration: 700,
          essential: true,
        })
      } else if (target.type === 'bounds') {
        map.fitBounds(target.bounds, {
          padding: target.padding,
          maxZoom: target.maxZoom,
          duration: 700,
        })
      }
    },
    isProgrammaticMoveRef
  )
}

/**
 * Smoothly centers camera on a selected marker coordinate.
 */
export function focusMarker(map, lat, lng, isProgrammaticMoveRef) {
  if (!map || typeof lat !== 'number' || typeof lng !== 'number') return

  runProgrammaticMapMove(
    map,
    () => {
      map.easeTo({
        center: [lng, lat],
        duration: 500,
        essential: true,
      })
    },
    isProgrammaticMoveRef
  )
}

/**
 * Smoothly flies camera to user's detected geolocation coordinates.
 */
export function focusGeolocation(map, [lng, lat], isProgrammaticMoveRef) {
  if (!map || typeof lat !== 'number' || typeof lng !== 'number') return

  runProgrammaticMapMove(
    map,
    () => {
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
        essential: true,
      })
    },
    isProgrammaticMoveRef
  )
}

/**
 * Sets up soft auto-recovery when the user finishes navigating far outside recovery bounds.
 * Returns an unbind cleanup function.
 */
export function setupMapRecovery(map, isProgrammaticMoveRef, isRecoveringRef) {
  if (!map) return () => {}

  const handleMoveEnd = () => {
    if (isProgrammaticMoveRef.current || isRecoveringRef.current) return
    if (map.isMoving() || map.isZooming() || map.isRotating()) return

    const center = map.getCenter()
    if (isOutsideRecoveryBounds([center.lng, center.lat])) {
      isRecoveringRef.current = true
      resetToInitialView(map, { duration: 750 })
      map.once('moveend', () => {
        setTimeout(() => {
          isRecoveringRef.current = false
        }, 100)
      })
    }
  }

  map.on('moveend', handleMoveEnd)
  return () => {
    map.off('moveend', handleMoveEnd)
  }
}
