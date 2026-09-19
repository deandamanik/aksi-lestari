import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LaporLayout from '../layouts/LaporLayout'
import BerandaPage from '../pages/beranda/BerandaPage'
import LaporPage from '../pages/lapor/LaporPage'
import LaporTemukanPage from '../pages/lapor/LaporTemukanPage'
import LaporKenaliPage from '../pages/lapor/LaporKenaliPage'
import LaporAksiPage from '../pages/lapor/LaporAksiPage'
import LaporSelesaiPage from '../pages/lapor/LaporSelesaiPage'
import PetaSampahPage from '../pages/peta-sampah/PetaSampahPage'
import AksiPediaPage from '../pages/aksipedia/AksiPediaPage'
import KomunitasPage from '../pages/komunitas/KomunitasPage'
import ProfilPage from '../pages/profil/ProfilPage'
import ScrollToTop from '../components/common/ScrollToTop'

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Non-Lapor routes — standard MainLayout (no LaporContext) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/peta-sampah" element={<PetaSampahPage />} />
          <Route path="/aksipedia" element={<AksiPediaPage />} />
          <Route path="/komunitas" element={<KomunitasPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>

        {/* Lapor flow — LaporLayout scopes LaporContext to these routes only.
            Context resets automatically when the user navigates away. */}
        <Route element={<LaporLayout />}>
          {/* Photo Entry — pre-flow, NO stepper */}
          <Route path="/lapor" element={<LaporPage />} />

          {/* Step 01 — Temukan: stepper visible */}
          <Route path="/lapor/temukan" element={<LaporTemukanPage />} />

          {/* Step 02 — Kenali */}
          <Route path="/lapor/kenali" element={<LaporKenaliPage />} />

          {/* Step 03 — Pilih Aksi */}
          <Route path="/lapor/aksi" element={<LaporAksiPage />} />

          {/* Step 04 — Selesai */}
          <Route path="/lapor/selesai" element={<LaporSelesaiPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
