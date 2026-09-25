export const DEFAULT_MAP_PIN = { x: 278, y: 110 }
export const DEFAULT_COORDINATES = { lat: -6.917464, lng: 107.619123 }

export function latLngToMapCoords(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return DEFAULT_MAP_PIN
  const baseLat = -6.917464
  const baseLng = 107.619123
  const rawX = DEFAULT_MAP_PIN.x + ((lng - baseLng) / 0.03) * 560
  const rawY = DEFAULT_MAP_PIN.y + ((lat - baseLat) / -0.015) * 220
  const clampedX = Math.max(16, Math.min(544, Math.round(rawX)))
  const clampedY = Math.max(20, Math.min(200, Math.round(rawY)))
  return { x: clampedX, y: clampedY }
}

export function mapCoordsToLatLng(x, y) {
  const baseLat = -6.917464
  const baseLng = 107.619123
  const deltaLat = ((y - DEFAULT_MAP_PIN.y) / 220) * -0.015
  const deltaLng = ((x - DEFAULT_MAP_PIN.x) / 560) * 0.03
  return {
    lat: Number((baseLat + deltaLat).toFixed(6)),
    lng: Number((baseLng + deltaLng).toFixed(6)),
  }
}

/**
 * Reverse geocodes coordinates to a human-readable address using OpenStreetMap Nominatim.
 *
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string|null>} Resolved display_name string or null
 */
export async function reverseGeocodeNominatim(lat, lng) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
    { headers: { 'Accept-Language': 'id' } }
  )
  const data = await response.json()
  return data?.display_name || null
}

/**
 * Splits and formats a Nominatim comma-separated address into primary and secondary segments.
 *
 * @param {string|null|undefined} address - Full address string
 * @param {string} [fallback=''] - Optional fallback when address is empty or unresolvable
 * @returns {{ primary: string, secondary: string, parts: string[] }}
 */
export function formatAddressBreakdown(address, fallback = '') {
  if (!address || typeof address !== 'string') {
    return {
      primary: fallback,
      secondary: '',
      parts: [],
    }
  }

  const parts = address.split(',').map((p) => p.trim())
  const primary = parts.slice(0, 2).join(', ') || address || fallback
  const secondary = parts.slice(2, 4).join(', ')

  return { primary, secondary, parts }
}
