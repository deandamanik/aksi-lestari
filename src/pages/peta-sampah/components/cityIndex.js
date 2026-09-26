/**
 * Canonical registry of major Indonesian cities & metropolitan areas for Peta Sampah.
 * Provides canonical [lng, lat] coordinates, optimal city zoom levels, and alias lookups
 * for accurate camera navigation and search filtering.
 */

export const INDONESIA_CITIES = [
  {
    id: 'jakarta',
    name: 'DKI Jakarta',
    aliases: ['jakarta', 'dki', 'jaksel', 'jakbar', 'jaktim', 'jakut', 'jakpus', 'jabodetabek'],
    center: [106.8272, -6.1751],
    zoom: 12.2,
  },
  {
    id: 'bandung',
    name: 'Kota Bandung',
    aliases: ['bandung', 'bdg', 'dayeuhkolot', 'braga', 'ciroyom'],
    center: [107.6098, -6.9147],
    zoom: 12.5,
  },
  {
    id: 'surabaya',
    name: 'Kota Surabaya',
    aliases: ['surabaya', 'sby', 'kenjeran', 'wonokromo', 'pasar keputran'],
    center: [112.7521, -7.2575],
    zoom: 12.5,
  },
  {
    id: 'yogyakarta',
    name: 'D.I. Yogyakarta',
    aliases: ['yogyakarta', 'jogja', 'yogya', 'jogjakarta', 'malioboro', 'kali code'],
    center: [110.3705, -7.7956],
    zoom: 13.0,
  },
  {
    id: 'surakarta',
    name: 'Kota Surakarta (Solo)',
    aliases: ['surakarta', 'solo', 'jebres', 'pasar gede', 'kali pepe'],
    center: [110.8243, -7.5666],
    zoom: 13.2,
  },
  {
    id: 'bali',
    name: 'Bali (Denpasar & Badung)',
    aliases: ['bali', 'denpasar', 'kuta', 'sanur', 'badung', 'gianyar', 'ubud'],
    center: [115.2167, -8.6705],
    zoom: 12.2,
  },
  {
    id: 'semarang',
    name: 'Kota Semarang',
    aliases: ['semarang', 'smg', 'tanjung mas', 'pasar johar'],
    center: [110.4208, -6.9932],
    zoom: 12.5,
  },
  {
    id: 'medan',
    name: 'Kota Medan',
    aliases: ['medan', 'sungai deli', 'belawan', 'medan maimun'],
    center: [98.6722, 3.5952],
    zoom: 12.5,
  },
  {
    id: 'makassar',
    name: 'Kota Makassar',
    aliases: ['makassar', 'pantai losari', 'sungai tallo', 'pasar terong'],
    center: [119.4327, -5.1477],
    zoom: 12.5,
  },
  {
    id: 'palembang',
    name: 'Kota Palembang',
    aliases: ['palembang', 'sungai musi', 'ampera', 'pasar 16 ilir'],
    center: [104.7565, -2.9761],
    zoom: 12.5,
  },
  {
    id: 'bogor',
    name: 'Kota Bogor',
    aliases: ['bogor', 'bgr', 'baranangsiang', 'pajajaran', 'cibinong'],
    center: [106.7972, -6.5971],
    zoom: 12.5,
  },
  {
    id: 'depok',
    name: 'Kota Depok',
    aliases: ['depok', 'margonda', 'pancoran mas', 'rawa kalong', 'cimanggis'],
    center: [106.8227, -6.4025],
    zoom: 12.5,
  },
  {
    id: 'tangerang',
    name: 'Kota Tangerang',
    aliases: ['tangerang', 'tng', 'cipondoh', 'pintu air sepuluh', 'cisadane'],
    center: [106.6319, -6.1783],
    zoom: 12.5,
  },
  {
    id: 'tangsel',
    name: 'Tangerang Selatan',
    aliases: ['tangerang selatan', 'tangsel', 'bsd', 'serpong', 'bintaro'],
    center: [106.6894, -6.2889],
    zoom: 12.5,
  },
  {
    id: 'bekasi',
    name: 'Kota Bekasi',
    aliases: ['bekasi', 'bks', 'bantargebang', 'medan satria', 'kalimalang'],
    center: [106.9924, -6.2383],
    zoom: 12.5,
  },
  {
    id: 'malang',
    name: 'Kota Malang',
    aliases: ['malang', 'kali brantas', 'klojen'],
    center: [112.6326, -7.9666],
    zoom: 12.5,
  },
  {
    id: 'cirebon',
    name: 'Kota Cirebon',
    aliases: ['cirebon', 'muara jati', 'pasar kanoman'],
    center: [108.557, -6.732],
    zoom: 12.5,
  },
  {
    id: 'balikpapan',
    name: 'Kota Balikpapan',
    aliases: ['balikpapan', 'pantai manggar', 'kampung atas air'],
    center: [116.8942, -1.2379],
    zoom: 12.5,
  },
  {
    id: 'samarinda',
    name: 'Kota Samarinda',
    aliases: ['samarinda', 'sungai mahakam', 'pasar segiri'],
    center: [117.1536, -0.5021],
    zoom: 12.5,
  },
  {
    id: 'pontianak',
    name: 'Kota Pontianak',
    aliases: ['pontianak', 'waterfront kapuas', 'pasar flamboyan'],
    center: [109.3425, -0.0263],
    zoom: 12.5,
  },
  {
    id: 'banjarmasin',
    name: 'Kota Banjarmasin',
    aliases: ['banjarmasin', 'sungai martapura'],
    center: [114.5908, -3.3194],
    zoom: 12.5,
  },
  {
    id: 'palangkaraya',
    name: 'Kota Palangkaraya',
    aliases: ['palangkaraya', 'sungai kahayan', 'dermaga rambang'],
    center: [113.9213, -2.2096],
    zoom: 12.5,
  },
  {
    id: 'banda_aceh',
    name: 'Kota Banda Aceh',
    aliases: ['banda aceh', 'aceh', 'ulee lheue', 'krueng aceh'],
    center: [95.3238, 5.5483],
    zoom: 12.5,
  },
  {
    id: 'padang',
    name: 'Kota Padang',
    aliases: ['padang', 'batang arau', 'pantai purus'],
    center: [100.3543, -0.9471],
    zoom: 12.5,
  },
  {
    id: 'pekanbaru',
    name: 'Kota Pekanbaru',
    aliases: ['pekanbaru', 'sungai siak'],
    center: [101.4478, 0.5071],
    zoom: 12.5,
  },
  {
    id: 'lampung',
    name: 'Bandar Lampung',
    aliases: ['lampung', 'bandar lampung', 'teluk lampung'],
    center: [105.258, -5.4292],
    zoom: 12.5,
  },
  {
    id: 'mataram',
    name: 'Kota Mataram (Lombok)',
    aliases: ['mataram', 'lombok', 'ampenan', 'pasar bertais'],
    center: [116.1165, -8.5772],
    zoom: 12.5,
  },
  {
    id: 'kupang',
    name: 'Kota Kupang',
    aliases: ['kupang', 'pantai pasir panjang', 'oeba'],
    center: [123.607, -10.1772],
    zoom: 12.5,
  },
  {
    id: 'manado',
    name: 'Kota Manado',
    aliases: ['manado', 'teluk manado'],
    center: [124.8488, 1.4748],
    zoom: 12.5,
  },
  {
    id: 'ambon',
    name: 'Kota Ambon',
    aliases: ['ambon', 'teluk ambon'],
    center: [128.1814, -3.6547],
    zoom: 12.5,
  },
  {
    id: 'jayapura',
    name: 'Kota Jayapura',
    aliases: ['jayapura', 'teluk yos sudarso'],
    center: [140.7181, -2.5337],
    zoom: 12.5,
  },
]

/**
 * Searches the registry for a city matching the given query string.
 * Handles exact matches, aliases, prefixes, and word boundary matches.
 */
export function findMatchingCity(searchQuery) {
  if (!searchQuery) return null
  const q = searchQuery.trim().toLowerCase()
  if (q.length < 2) return null

  // Special-case collision guard: "bali" must NOT match "balikpapan"
  if (q === 'bali') {
    return INDONESIA_CITIES.find((c) => c.id === 'bali') || null
  }
  if (q === 'balikpapan') {
    return INDONESIA_CITIES.find((c) => c.id === 'balikpapan') || null
  }

  // 1. Exact match on city name, id, or alias
  for (const city of INDONESIA_CITIES) {
    if (city.name.toLowerCase() === q || city.id === q) return city
    if (city.aliases.includes(q)) return city
  }

  // 2. Prefix match on city name or alias (minimum 3 characters)
  if (q.length >= 3) {
    for (const city of INDONESIA_CITIES) {
      if (city.name.toLowerCase().startsWith(q)) return city
      if (city.aliases.some((alias) => alias.startsWith(q))) return city
    }
  }

  // 3. Word-boundary containment (e.g. "sampah di bandung" or "laporan jogja")
  for (const city of INDONESIA_CITIES) {
    for (const alias of city.aliases) {
      if (alias === q) return city
      // Safe word boundary check avoiding substring collision
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i')
      if (regex.test(q)) return city
    }
  }

  return null
}

/**
 * Returns a list of autocomplete city suggestions matching the query.
 */
export function filterCities(searchQuery, limit = 4) {
  if (!searchQuery) return []
  const q = searchQuery.trim().toLowerCase()
  if (q.length < 2) return []

  const results = []
  const seen = new Set()

  for (const city of INDONESIA_CITIES) {
    // Avoid "bali" matching "balikpapan" in suggestion list
    if (q === 'bali' && city.id === 'balikpapan') continue

    const nameMatch = city.name.toLowerCase().includes(q)
    const aliasMatch = city.aliases.some((a) => {
      if (q === 'bali' && a.includes('balikpapan')) return false
      return a.startsWith(q) || a.includes(q)
    })

    if (nameMatch || aliasMatch) {
      if (!seen.has(city.id)) {
        seen.add(city.id)
        results.push(city)
        if (results.length >= limit) break
      }
    }
  }

  return results
}
