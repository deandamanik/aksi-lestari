import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BerandaPage from '../pages/beranda/BerandaPage'
import LaporPage from '../pages/lapor/LaporPage'
import PetaSampahPage from '../pages/peta-sampah/PetaSampahPage'
import AksiPediaPage from '../pages/aksipedia/AksiPediaPage'
import KomunitasPage from '../pages/komunitas/KomunitasPage'
import ProfilPage from '../pages/profil/ProfilPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BerandaPage />} />
        <Route path="/lapor" element={<LaporPage />} />
        <Route path="/peta-sampah" element={<PetaSampahPage />} />
        <Route path="/aksipedia" element={<AksiPediaPage />} />
        <Route path="/komunitas" element={<KomunitasPage />} />
        <Route path="/profil" element={<ProfilPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
