/**
 * Geographic constants and constraints for AksiLestari Peta Sampah national Indonesia map.
 * Defines archipelago bounds with comfortable ocean breathing room, canonical initial view,
 * soft recovery thresholds, and hard pan constraints.
 */

// Bounding box for Indonesia with comfortable surrounding ocean breathing room:
// Southwest: [93.5° E, -12.0° S] (ocean south of Rote Island & west of Aceh/Sabang)
// Northeast: [142.5° E, 7.5° N] (ocean north of Miangas/Aceh & east of Papua border)
export const INDONESIA_BOUNDS = [
  [93.5, -12.0],
  [142.5, 7.5],
]

// Geographic center of the Indonesian archipelago (Makassar Strait / Central Indonesia)
export const INDONESIA_CENTER = [118.0, -2.5]

// National camera zoom constraints
export const INDONESIA_MIN_ZOOM = 3.6
export const INDONESIA_MAX_ZOOM = 18
export const INDONESIA_INITIAL_ZOOM = 4.2

// Padding (in px) when fitting archipelago bounds to viewport
export const INDONESIA_INITIAL_PADDING = {
  top: 48,
  bottom: 48,
  left: 48,
  right: 48,
}

// Canonical source of truth for the national Indonesia camera view
// (Shared identically between initial load, manual reset, and soft auto-recovery)
export const INITIAL_INDONESIA_VIEW = {
  bounds: INDONESIA_BOUNDS,
  center: INDONESIA_CENTER,
  zoom: INDONESIA_INITIAL_ZOOM,
  padding: INDONESIA_INITIAL_PADDING,
  maxZoom: 5.5,
}

// Soft recovery threshold: generous buffer beyond the archipelago.
// If the user finishes navigating far beyond this area, the map smoothly guides back to Indonesia.
export const INDONESIA_RECOVERY_BOUNDS = [
  [89.0, -15.5],
  [147.0, 11.5],
]

// Hard outer pan limit (maxBounds) to prevent dragging to distant foreign continents
export const INDONESIA_MAX_BOUNDS = [
  [82.0, -20.0],
  [154.0, 16.0],
]

/**
 * Checks whether a given [longitude, latitude] coordinate is outside the recovery bounds.
 */
export function isOutsideRecoveryBounds([lng, lat]) {
  const [[minLng, minLat], [maxLng, maxLat]] = INDONESIA_RECOVERY_BOUNDS
  return lng < minLng || lng > maxLng || lat < minLat || lat > maxLat
}

/**
 * Smoothly resets or recovers the map camera back to the canonical initial Indonesia view.
 */
export function resetToInitialView(map, { duration = 700 } = {}) {
  if (!map) return
  map.fitBounds(INITIAL_INDONESIA_VIEW.bounds, {
    padding: INITIAL_INDONESIA_VIEW.padding,
    maxZoom: INITIAL_INDONESIA_VIEW.maxZoom,
    duration,
    essential: true,
  })
}
