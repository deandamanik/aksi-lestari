export const DEFAULT_MAP_PIN = { x: 278, y: 110 }

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
