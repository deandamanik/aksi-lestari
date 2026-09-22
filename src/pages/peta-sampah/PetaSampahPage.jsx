import { useState, useMemo } from 'react'
import WasteMap from './components/WasteMap'
import MapControlPanel from './components/MapControlPanel'
import { WASTE_REPORTS } from '../../data/peta-sampah/wasteReportsData'
import { BANK_SAMPAH } from '../../data/peta-sampah/bankSampahData'

/**
 * PetaSampahPage Component (Step 5 Revised)
 *
 * Dedicated full-screen map experience with:
 * - Full-viewport map layer engine (WasteMap)
 * - Map layer visibility state (Heatmap, Laporan, Bank Sampah)
 * - Dual-dataset search (Waste reports & Bank Sampah)
 * - Geolocation centering ("Gunakan Lokasiku")
 */
function PetaSampahPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [heatmapVisible, setHeatmapVisible] = useState(true)
  const [reportsVisible, setReportsVisible] = useState(true)
  const [bankSampahVisible, setBankSampahVisible] = useState(true)

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
    </main>
  )
}

export default PetaSampahPage
