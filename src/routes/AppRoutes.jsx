import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BerandaPage from '../pages/beranda/BerandaPage'
import LaporPage from '../pages/lapor/LaporPage'
import PetaSampahPage from '../pages/peta-sampah/PetaSampahPage'
import AksiPediaPage from '../pages/aksipedia/AksiPediaPage'
import KomunitasPage from '../pages/komunitas/KomunitasPage'
import CommunityLeaderboardPage from '../pages/komunitas/leaderboard/CommunityLeaderboardPage'
import ProfilPage from '../pages/profil/ProfilPage'
import ScrollToTop from '../components/common/ScrollToTop'

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/lapor" element={<LaporPage />} />
          <Route path="/peta-sampah" element={<PetaSampahPage />} />
          <Route path="/aksipedia" element={<AksiPediaPage />} />
          <Route path="/komunitas" element={<KomunitasPage />} />
          <Route path="/komunitas/leaderboard" element={<CommunityLeaderboardPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
