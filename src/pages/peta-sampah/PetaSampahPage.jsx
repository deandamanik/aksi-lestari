import { useState, useMemo } from 'react'
import WasteMap from './components/WasteMap'
import MapControlPanel from './components/MapControlPanel'
import MapDetailPanel from './components/MapDetailPanel'
import { WASTE_REPORTS } from '../../data/peta-sampah/wasteReportsData'
import { BANK_SAMPAH } from '../../data/peta-sampah/bankSampahData'

/**
 * PetaSampahPage Component (Step 5 Layer System + Step 6 Marker Detail Panel)
 *
 * Dedicated full-screen map experience with:
 * - Full-viewport map layer engine (WasteMap)
 * - Map layer visibility state (Heatmap, Laporan, Bank Sampah)
 * - Dual-dataset search (Waste reports & Bank Sampah)
 * - Geolocation centering ("Gunakan Lokasiku")
 * - Side overlay detail sheet for selected Waste Report & Bank Sampah markers
 */
function PetaSampahPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [heatmapVisible, setHeatmapVisible] = useState(true)
  const [reportsVisible, setReportsVisible] = useState(true)
  const [bankSampahVisible, setBankSampahVisible] = useState(true)

  // Step 6: Single source of truth for active marker selection ({ type: 'report'|'bank', data })
  const [selectedPoint, setSelectedPoint] = useState(null)

  // Geolocation states
  const [flyToCoords, setFlyToCoords] = useState(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)

  // Derive visible waste reports matching search query
  const visibleWasteReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return WASTE_REPORTS

    return WASTE_REPORTS.filter((report) => {
      return (
        report.title.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.address.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  // Derive visible Bank Sampah locations matching search query
  const visibleBankSampah = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return BANK_SAMPAH

    return BANK_SAMPAH.filter((bank) => {
      const accepted = bank.acceptedMaterials ? bank.acceptedMaterials.join(' ').toLowerCase() : ''
      return (
        bank.name.toLowerCase().includes(query) ||
        bank.address.toLowerCase().includes(query) ||
        bank.district.toLowerCase().includes(query) ||
        accepted.includes(query) ||
        bank.id.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  // Step 6: Derive active selected point: validate that it still exists in the visible datasets and active layers
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

  // Geolocation trigger
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

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden">
      <WasteMap
        wasteReports={visibleWasteReports}
        bankSampah={visibleBankSampah}
        heatmapVisible={heatmapVisible}
        reportsVisible={reportsVisible}
        bankSampahVisible={bankSampahVisible}
        flyToCoords={flyToCoords}
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
        matchingReportsCount={visibleWasteReports.length}
        matchingBanksCount={visibleBankSampah.length}
        onUseMyLocation={handleUseMyLocation}
        isLocating={isLocating}
        locationError={locationError}
      />
      <MapDetailPanel
        selectedPoint={activeSelectedPoint}
        onClose={() => setSelectedPoint(null)}
      />
    </main>
  )
}

export default PetaSampahPage
