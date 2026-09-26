import {
  isOutsideRecoveryBounds,
  resetToInitialView,
} from './mapConstants.js'
import { findMatchingCity } from './cityIndex.js'

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
 * Prioritizes known Indonesian cities / regencies, and falls back to marker cluster / bounds.
 */
export function getSearchCameraTarget(wasteReports = [], bankSampah = [], searchQuery = '') {
  const matchedCity = findMatchingCity(searchQuery)

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

  // Priority 1: Direct city match
  if (matchedCity) {
    let center = matchedCity.center
    const zoom = matchedCity.zoom || 12.5

    // If there are points near this matched city, use their barycenter for better framing
    if (points.length > 0) {
      const nearPoints = points.filter(([lng, lat]) => {
        return Math.hypot(lng - matchedCity.center[0], lat - matchedCity.center[1]) < 0.6
      })
      if (nearPoints.length > 0) {
        const lons = nearPoints.map((p) => p[0])
        const lats = nearPoints.map((p) => p[1])
        const avgLng = lons.reduce((a, b) => a + b, 0) / lons.length
        const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length
        center = [avgLng, avgLat]
      }
    }

    return {
      type: 'city',
      center,
      zoom,
      cityName: matchedCity.name,
    }
  }

  if (points.length === 0) return null

  if (points.length === 1) {
    return {
      type: 'single',
      center: points[0],
      zoom: 13,
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
      zoom: 13,
    }
  }

  return {
    type: 'bounds',
    bounds: [
      [minLng, minLat],
      [maxLng, maxLat],
    ],
    maxZoom: 13,
  }
}

/**
 * Smooth cubic ease-out curve for natural, gentle deceleration of camera flight.
 */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Applies search camera target smoothly with programmatic guard protection and responsive offsets.
 * Soft, gentle pacing ensures comfortable visual orientation across regional distances.
 */
export function applySearchCameraTarget(map, target, isProgrammaticMoveRef) {
  if (!map || !target) return

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768
  // Left padding clears the floating MapControlPanel on desktop (320px-360px wide)
  // Bottom padding clears the bottom card/sheet on mobile
  const padding = isDesktop
    ? { top: 70, bottom: 70, left: 360, right: 70 }
    : { top: 60, bottom: 220, left: 20, right: 20 }

  runProgrammaticMapMove(
    map,
    () => {
      if (target.type === 'city' || target.type === 'single' || target.type === 'closeCluster') {
        map.flyTo({
          center: target.center,
          zoom: target.zoom,
          padding,
          duration: 1800,
          speed: 0.85,
          curve: 1.35,
          easing: easeOutCubic,
          essential: true,
        })
      } else if (target.type === 'bounds') {
        map.fitBounds(target.bounds, {
          padding,
          maxZoom: target.maxZoom || 13,
          duration: 1600,
          easing: easeOutCubic,
          essential: true,
        })
      }
    },
    isProgrammaticMoveRef
  )
}

/**
 * Smoothly flies and zooms camera in to focus on a selected marker coordinate.
 * Uses a gentle, soft deceleration (1.6s duration) into neighborhood level (zoom 15)
 * with responsive padding so the marker lands cleanly between the floating cards.
 */
export function focusMarker(map, lat, lng, isProgrammaticMoveRef) {
  if (!map || typeof lat !== 'number' || typeof lng !== 'number') return

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768
  // On desktop: clear left control panel (340px) and right detail card (380px)
  // On mobile: clear bottom detail sheet (320px)
  const padding = isDesktop
    ? { top: 70, bottom: 70, left: 340, right: 380 }
    : { top: 60, bottom: 320, left: 20, right: 20 }

  const currentZoom = map.getZoom()
  const targetZoom = currentZoom < 14.5 ? 15 : Math.max(currentZoom, 15)

  runProgrammaticMapMove(
    map,
    () => {
      map.flyTo({
        center: [lng, lat],
        zoom: targetZoom,
        padding,
        duration: 1600,
        speed: 0.8,
        curve: 1.3,
        easing: easeOutCubic,
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
        zoom: 14.5,
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        duration: 1600,
        speed: 0.85,
        curve: 1.35,
        easing: easeOutCubic,
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
