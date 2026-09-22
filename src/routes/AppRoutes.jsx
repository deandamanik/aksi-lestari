import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BerandaPage from '../pages/beranda/BerandaPage'
import LaporPage from '../pages/lapor/LaporPage'
import PetaSampahPage from '../pages/peta-sampah/PetaSampahPage'
import AksiPediaPage from '../pages/aksipedia/AksiPediaPage'
import ModuleListPage from '../pages/aksipedia/ModuleListPage'
import ModuleDetailPage from '../pages/aksipedia/ModuleDetailPage'
import ModuleQuizPage from '../pages/aksipedia/ModuleQuizPage'
import KomunitasPage from '../pages/komunitas/KomunitasPage'
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
          <Route path="/aksipedia/modul" element={<ModuleListPage />} />
          <Route path="/aksipedia/modul/:moduleId" element={<ModuleDetailPage />} />
          <Route path="/aksipedia/modul/:moduleId/quiz" element={<ModuleQuizPage />} />
          <Route path="/komunitas" element={<KomunitasPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
