import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LaporLayout from '../layouts/LaporLayout'
import BerandaPage from '../pages/beranda/BerandaPage'
import LaporPage from '../pages/lapor/LaporPage'
import LaporTemukanPage from '../pages/lapor/LaporTemukanPage'
import LaporKenaliPage from '../pages/lapor/LaporKenaliPage'
import LaporAksiPage from '../pages/lapor/LaporAksiPage'
import LaporSelesaiPage from '../pages/lapor/LaporSelesaiPage'
import LaporMandiriKonfirmasiPage from '../pages/lapor/LaporMandiriKonfirmasiPage'
import LaporMandiriPanduanPage from '../pages/lapor/LaporMandiriPanduanPage'
import LaporMandiriFotoPage from '../pages/lapor/LaporMandiriFotoPage'
import LaporMandiriValidasiPage from '../pages/lapor/LaporMandiriValidasiPage'
import LaporTrackingPage from '../pages/lapor/LaporTrackingPage'
import PetaSampahPage from '../pages/peta-sampah/PetaSampahPage'
import AksiPediaPage from '../pages/aksipedia/AksiPediaPage'
import ModuleListPage from '../pages/aksipedia/ModuleListPage'
import ModuleDetailPage from '../pages/aksipedia/ModuleDetailPage'
import ModuleQuizPage from '../pages/aksipedia/ModuleQuizPage'
import KomunitasPage from '../pages/komunitas/KomunitasPage'
import CommunityLeaderboardPage from '../pages/komunitas/leaderboard/CommunityLeaderboardPage'
import ProfilPage from '../pages/profil/ProfilPage'
import ProfilMisiPage from '../pages/profil/ProfilMisiPage'
import ProfilSaldoPage from '../pages/profil/ProfilSaldoPage'
import ProfilRiwayatPage from '../pages/profil/ProfilRiwayatPage'
import ProfilPengaturanPage from '../pages/profil/ProfilPengaturanPage'
import ProfileWorkspaceLayout from '../pages/profil/ProfileWorkspaceLayout'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ScrollToTop from '../components/common/ScrollToTop'

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Global application layout — persistent Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/peta-sampah" element={<PetaSampahPage />} />
          <Route path="/aksipedia" element={<AksiPediaPage />} />
          <Route path="/aksipedia/modul" element={<ModuleListPage />} />
          <Route path="/aksipedia/modul/:moduleId" element={<ModuleDetailPage />} />
          <Route path="/aksipedia/modul/:moduleId/quiz" element={<ModuleQuizPage />} />
          <Route path="/komunitas" element={<KomunitasPage />} />
          <Route path="/komunitas/leaderboard" element={<CommunityLeaderboardPage />} />

          {/* Profil Workspace routes */}
          <Route element={<ProfileWorkspaceLayout />}>
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/profil/misi" element={<ProfilMisiPage />} />
            <Route path="/profil/saldo" element={<ProfilSaldoPage />} />
            <Route path="/profil/riwayat" element={<ProfilRiwayatPage />} />
            <Route path="/profil/pengaturan" element={<ProfilPengaturanPage />} />
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

            {/* Step 04 (Mandiri) — Konfirmasi Aksi Mandiri */}
            <Route path="/lapor/mandiri/konfirmasi" element={<LaporMandiriKonfirmasiPage />} />

            {/* Step 04 (Mandiri) — Panduan Penanganan Mandiri */}
            <Route path="/lapor/mandiri/panduan" element={<LaporMandiriPanduanPage />} />

            {/* Step 04 (Mandiri) — Dokumentasi Foto Setelah */}
            <Route path="/lapor/mandiri/foto" element={<LaporMandiriFotoPage />} />

            {/* Step 04 (Mandiri) — Tracking / Validasi Aksi Mandiri */}
            <Route path="/lapor/mandiri/validasi" element={<LaporMandiriValidasiPage />} />

            {/* Tracking Laporan */}
            <Route path="/lapor/tracking" element={<LaporTrackingPage />} />
          </Route>
        </Route>

        {/* Auth routes — Standalone full-screen with dedicated interactive card */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default AppRoutes
