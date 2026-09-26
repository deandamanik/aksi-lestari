import { useState, useMemo } from 'react'
import WasteMap from './components/WasteMap'
import MapControlPanel from './components/MapControlPanel'
import MapDetailPanel from './components/MapDetailPanel'
import { findMatchingCity } from './components/cityIndex'
import { WASTE_REPORTS } from '../../data/peta-sampah/wasteReportsData'
import { BANK_SAMPAH } from '../../data/peta-sampah/bankSampahData'

/**
 * PetaSampahPage Component
 *
 * Dedicated full-screen map experience with:
 * - Full-viewport map layer engine (WasteMap)
 * - Map layer visibility state (Heatmap, Laporan, Bank Sampah)
 * - Dual-dataset search with canonical Indonesian city recognition
 * - Geolocation centering ("Gunakan Lokasiku")
 * - Side overlay detail sheet for selected Waste Report & Bank Sampah markers
 */
function PetaSampahPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [heatmapVisible, setHeatmapVisible] = useState(true)
  const [reportsVisible, setReportsVisible] = useState(true)
  const [bankSampahVisible, setBankSampahVisible] = useState(true)

  const [selectedPoint, setSelectedPoint] = useState(null)

  const [flyToCoords, setFlyToCoords] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)

  // Derive visible waste reports matching search query or matched canonical city
  const visibleWasteReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return WASTE_REPORTS

    const matchedCity = findMatchingCity(query)

    return WASTE_REPORTS.filter((report) => {
      const titleLower = report.title.toLowerCase()
      const catLower = report.category.toLowerCase()
      const addrLower = report.address.toLowerCase()
      const idLower = report.id.toLowerCase()

      // If matched to a specific city/region, include all reports associated with that city
      if (matchedCity) {
        if (
          addrLower.includes(matchedCity.name.toLowerCase()) ||
          matchedCity.aliases.some((alias) => {
            if (alias === 'bali') {
              return addrLower.includes('bali') && !addrLower.includes('balikpapan')
            }
            return addrLower.includes(alias) || titleLower.includes(alias)
          })
        ) {
          return true
        }
      }

      // Avoid "bali" matching "balikpapan" in generic query
      if (query === 'bali') {
        const isBaliAddr = addrLower.includes('bali') && !addrLower.includes('balikpapan')
        const isBaliTitle = titleLower.includes('bali') && !titleLower.includes('balikpapan')
        return isBaliAddr || isBaliTitle
      }

      return (
        titleLower.includes(query) ||
        catLower.includes(query) ||
        addrLower.includes(query) ||
        idLower.includes(query)
      )
    })
  }, [searchQuery])

  // Derive visible Bank Sampah locations matching search query or matched canonical city
  const visibleBankSampah = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return BANK_SAMPAH

    const matchedCity = findMatchingCity(query)

    return BANK_SAMPAH.filter((bank) => {
      const accepted = bank.acceptedMaterials ? bank.acceptedMaterials.join(' ').toLowerCase() : ''
      const nameLower = bank.name.toLowerCase()
      const addrLower = bank.address.toLowerCase()
      const distLower = (bank.district || '').toLowerCase()
      const idLower = bank.id.toLowerCase()

      if (matchedCity) {
        if (
          nameLower.includes(matchedCity.name.toLowerCase()) ||
          addrLower.includes(matchedCity.name.toLowerCase()) ||
          distLower.includes(matchedCity.name.toLowerCase()) ||
          matchedCity.aliases.some((alias) => {
            if (alias === 'bali') {
              return (
                (nameLower.includes('bali') || addrLower.includes('bali') || distLower.includes('bali')) &&
                !addrLower.includes('balikpapan') &&
                !distLower.includes('balikpapan')
              )
            }
            return nameLower.includes(alias) || addrLower.includes(alias) || distLower.includes(alias)
          })
        ) {
          return true
        }
      }

      if (query === 'bali') {
        return (
          (nameLower.includes('bali') || addrLower.includes('bali') || distLower.includes('bali')) &&
          !addrLower.includes('balikpapan') &&
          !distLower.includes('balikpapan')
        )
      }

      return (
        nameLower.includes(query) ||
        addrLower.includes(query) ||
        distLower.includes(query) ||
        accepted.includes(query) ||
        idLower.includes(query)
      )
    })
  }, [searchQuery])

  // Derive active selected point: validate that it still exists in the visible datasets and active layers
  const activeSelectedPoint = useMemo(() => {
    if (!selectedPoint) return null

    if (selectedPoint.type === 'report') {
      if (!reportsVisible) return null
      const exists = visibleWasteReports.some((r) => r.id === selectedPoint.data.id)
      return exists ? selectedPoint : null
    }

    if (selectedPoint.type === 'bank') {
      if (!bankSampahVisible) return null
      const exists = visibleBankSampah.some((b) => b.id === selectedPoint.data.id)
      return exists ? selectedPoint : null
    }

    return null
  }, [selectedPoint, reportsVisible, bankSampahVisible, visibleWasteReports, visibleBankSampah])

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Perangkat atau peramban tidak mendukung geolokasi.')
      return
    }

    setIsLocating(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false)
        setFlyToCoords([position.coords.longitude, position.coords.latitude])
      },
      (error) => {
        setIsLocating(false)
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Izin akses lokasi ditolak oleh pengguna.')
        } else {
          setLocationError('Gagal mendeteksi lokasi terkini.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const hasNoResults = visibleWasteReports.length === 0 && visibleBankSampah.length === 0

  return (
    <main data-lenis-prevent className="relative w-full h-[100dvh] overflow-hidden animate-page-enter">
      <WasteMap
        wasteReports={visibleWasteReports}
        bankSampah={visibleBankSampah}
        searchQuery={searchQuery}
        heatmapVisible={heatmapVisible}
        reportsVisible={reportsVisible}
        bankSampahVisible={bankSampahVisible}
        flyToCoords={flyToCoords}
        onFlyToComplete={() => setFlyToCoords(null)}
        selectedPoint={activeSelectedPoint}
        onSelectPoint={setSelectedPoint}
      />
      <MapControlPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        heatmapVisible={heatmapVisible}
        setHeatmapVisible={setHeatmapVisible}
        reportsVisible={reportsVisible}
        setReportsVisible={setReportsVisible}
        bankSampahVisible={bankSampahVisible}
        setBankSampahVisible={setBankSampahVisible}
        hasNoResults={hasNoResults}
        onUseMyLocation={handleUseMyLocation}
        isLocating={isLocating}
        locationError={locationError}
        isDetailOpen={Boolean(activeSelectedPoint)}
      />
      <MapDetailPanel
        selectedPoint={activeSelectedPoint}
        onClose={() => setSelectedPoint(null)}
      />
    </main>
  )
}

export default PetaSampahPage
